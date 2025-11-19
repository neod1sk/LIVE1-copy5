import { deepClone } from "../utils/object.js";

const noop = () => {};

const defaultEffects = {
  onPause: noop,
  onResume: noop,
  onHudFlash: noop,
  onTargetFlash: noop,
  onMatchToast: noop,
  onGlitchToast: noop,
  onFeverStart: noop,
  onFeverLevelUp: noop,
  onFeverEnd: noop,
  onFeverSwing: noop,
  onTransitionStart: noop,
  onTransitionComplete: noop,
};

export class GameStore {
  constructor({
    colors,
    modeScore,
    t,
    random = Math.random,
    effects = {},
  }) {
    this.colors = colors;
    this.modeScore = modeScore;
    this.translate = t;
    this.random = random;
    this.effects = { ...defaultEffects, ...effects };

    this.initialState = {
      mode: "easy",
      timeLeft: 60,
      score: 0,
      successCount: 0,
      streak: 0,
      paused: false,
      currentIndex: null,
      targetIndex: 0,
      responses: 0,
      lastSuccessTimes: [],
      fever: {
        active: false,
        timeLeft: 10,
        swingCount: 0,
        responseStage: 0,
      },
      isTransitioning: false,
      hardGlitch: {
        cooling: false,
        pendingPresses: 0,
        timerId: null,
      },
      timers: {
        main: null,
        fever: null,
      },
    };
    this.state = deepClone(this.initialState);
    this.listeners = new Set();
    this.transitionTimeout = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  set(partial) {
    this.state = { ...this.state, ...partial };
    this.emit();
  }

  update(mapper) {
    this.state = mapper({ ...this.state });
    this.emit();
  }

  emit() {
    this.listeners.forEach((listener) => listener(this.state));
  }

  reset() {
    this.clearTimers();
    const existingTimer =
      this.state && this.state.hardGlitch ? this.state.hardGlitch.timerId : undefined;
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    this.state = deepClone(this.initialState);
    this.state.targetIndex = this.randomTargetIndex();
    this.emit();
  }

  randomTargetIndex() {
    return Math.floor(this.random() * this.colors.length);
  }

  start(mode) {
    this.reset();
    this.update((state) => ({
      ...state,
      mode,
      timeLeft: 60,
      currentIndex: null,
      targetIndex: this.randomTargetIndex(),
      paused: false,
    }));
    this.startMainTimer();
  }

  startMainTimer() {
    this.clearTimer("main");
    const tick = () => {
      this.update((state) => {
        if (state.paused) return state;
        if (state.fever.active) return state;
        const nextTime = state.timeLeft - 1;
        if (nextTime <= 0) {
          this.finish();
          return { ...state, timeLeft: 0 };
        }
        return { ...state, timeLeft: nextTime };
      });
    };
    this.state.timers.main = setInterval(tick, 1000);
  }

  clearTimer(key) {
    if (this.state.timers[key]) {
      clearInterval(this.state.timers[key]);
      this.state.timers[key] = null;
    }
  }

  clearTimers() {
    Object.keys(this.state.timers).forEach((key) => this.clearTimer(key));
  }

  togglePause() {
    if (this.state.paused) {
      this.resume();
    } else {
      this.pause();
    }
  }

  pause() {
    if (this.state.paused) return;
    this.effects.onPause(this.state);
    this.clearTimers();
    this.update((state) => ({
      ...state,
      paused: true,
      timers: { ...state.timers, main: null, fever: null },
    }));
  }

  resume() {
    if (!this.state.paused) return;
    this.update((state) => ({
      ...state,
      paused: false,
    }));
    if (this.state.fever.active) {
      this.startFeverTimer();
    } else if (this.state.timeLeft > 0) {
      this.startMainTimer();
    }
    this.effects.onResume(this.state);
  }

  rotate(direction) {
    let matched = false;
    this.update((state) => {
      if (state.paused) return state;
      if (state.fever.active) return state;

      let workingState = state;
      if (state.mode === "hard" && workingState.currentIndex !== null) {
        const handled = this.handleHardGlitch(state);
        workingState = handled.state;
        if (handled.skip) {
          return workingState;
        }
      }

      let nextIndex;
      if (workingState.currentIndex === null) {
        nextIndex = 0;
      } else {
        nextIndex =
          (workingState.currentIndex + direction + this.colors.length) %
          this.colors.length;
      }

      matched = nextIndex === workingState.targetIndex;
      return { ...workingState, currentIndex: nextIndex };
    });

    if (matched) {
      this.handleMatch();
    }
  }

  handleHardGlitch(state) {
    const glitch = { ...state.hardGlitch };
    let skip = false;

    if (glitch.pendingPresses > 0) {
      glitch.pendingPresses -= 1;
      skip = true;
    } else if (!glitch.cooling && this.random() < 0.25) {
      glitch.pendingPresses = Math.floor(this.random() * 3) + 2;
      glitch.cooling = true;
      skip = true;
      glitch.timerId = setTimeout(() => {
        this.update((s) => ({
          ...s,
          hardGlitch: { ...s.hardGlitch, cooling: false, timerId: null },
        }));
      }, 2000);
      this.effects.onGlitchToast({
        message: this.translate("toast.glitch"),
        variant: "danger",
      });
    }

    return {
      state: { ...state, hardGlitch: glitch },
      skip,
    };
  }

  handleMatch() {
    const { mode } = this.state;
    const points = this.modeScore[mode] || 0;
    const now = Date.now();

    this.update((state) => {
      const lastSuccessTimes = [...state.lastSuccessTimes, now].filter(
        (t) => now - t <= 2000
      );
      const streak = state.streak + 1;
      const newScore = state.score + points;
      const successCount = state.successCount + 1;

      return {
        ...state,
        score: newScore,
        successCount,
        streak,
        lastSuccessTimes,
        targetIndex: this.randomTargetIndex(),
      };
    });

    this.effects.onHudFlash();
    this.effects.onTargetFlash();

    if (!this.state.fever.active) {
      this.effects.onMatchToast({
        message: this.translate("toast.match", { points }),
        variant: "success",
        options: { placement: "stage" },
      });
    }

    const { fever, lastSuccessTimes, streak } = this.state;
    if (!fever.active && lastSuccessTimes.length >= 3 && streak >= 3) {
      this.enterFever();
    }
  }

  enterFever() {
    this.update((state) => ({
      ...state,
      fever: {
        active: true,
        timeLeft: 10,
        swingCount: 0,
        responseStage: 0,
      },
    }));
    this.clearTimer("main");
    this.startFeverTimer();
    this.effects.onFeverStart({
      message: this.translate("toast.feverStart"),
    });
  }

  startFeverTimer() {
    this.clearTimer("fever");
    this.state.timers.fever = setInterval(() => {
      this.update((state) => {
        if (!state.fever.active) return state;
        if (state.paused) return state;
        const nextTime = state.fever.timeLeft - 1;
        if (nextTime <= 0) {
          this.exitFever();
          return {
            ...state,
            fever: { ...state.fever, active: false, timeLeft: 0 },
          };
        }
        return {
          ...state,
          fever: { ...state.fever, timeLeft: nextTime },
        };
      });
    }, 1000);
  }

  swing(direction) {
    if (!this.state.fever.active || this.state.paused) return;
    this.update((state) => {
      const swingCountRaw = state.fever.swingCount + 1;
      const completedRoundTrip = swingCountRaw % 2 === 0;
      const roundTripCount = Math.floor(swingCountRaw / 2);
      if (completedRoundTrip) {
        this.effects.onFeverSwing({ roundTripCount });
      }
      const previousRoundTrips = Math.floor(state.fever.swingCount / 2);
      let { responseStage } = state.fever;
      let score = state.score;
      let responses = state.responses;

      if (completedRoundTrip && roundTripCount > 0 && roundTripCount % 10 === 0) {
        score += 10;
        responses += 1;
      }

      if (
        completedRoundTrip &&
        roundTripCount > 0 &&
        roundTripCount % 10 === 0 &&
        previousRoundTrips % 10 !== 0
      ) {
        responseStage += 1;
        this.effects.onFeverLevelUp({
          message: this.translate("toast.feverLevelUp"),
          level: responseStage,
        });
      }

      return {
        ...state,
        score,
        responses,
        fever: {
          ...state.fever,
          swingCount: swingCountRaw,
          responseStage: responseStage,
        },
      };
    });
  }

  exitFever() {
    this.clearTimer("fever");
    this.update((state) => ({
      ...state,
      fever: {
        ...state.fever,
        active: false,
        timeLeft: 10,
        swingCount: 0,
        responseStage: 0,
      },
      streak: 0,
      lastSuccessTimes: [],
    }));
    this.startMainTimer();
    this.effects.onFeverEnd({
      message: this.translate("toast.feverEnd"),
    });
  }

  finish() {
    this.clearTimers();
    if (this.transitionTimeout) {
      clearTimeout(this.transitionTimeout);
      this.transitionTimeout = null;
    }
    this.update((state) => ({
      ...state,
      paused: false,
      timers: { ...state.timers, main: null, fever: null },
      isTransitioning: true,
    }));
    this.effects.onTransitionStart();
    const transitionDuration = 1000;
    const finalizeResult = () => {
      this.update((state) => ({
        ...state,
        isTransitioning: false,
      }));
      this.effects.onTransitionComplete(this.state);
    };
    this.transitionTimeout = setTimeout(finalizeResult, transitionDuration);
  }
}

