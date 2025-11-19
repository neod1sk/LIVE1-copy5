const bgmTracks = [];
const sfxBaseMap = {};
const sfxBaseList = [];

let audioContext = null;
let menuBgm = null;
let playBgm = null;
let currentBgm = null;
let isMuted = false;
let bgmUnlocked = false;
let toggleButton = null;

const sfxConfig = {
  click: { src: "./sounds/click.mp3", volume: 0.55 },
  start: { src: "./sounds/start.mp3", volume: 0.7 },
  arrow: { src: "./sounds/arrow.mp3", volume: 0.6 },
  end: { src: "./sounds/end.mp3", volume: 0.65 },
  pause: { src: "./sounds/pause.mp3", volume: 0.65 },
  main: { src: "./sounds/main.mp3", volume: 0.6 },
  lightstick: { src: "./sounds/lightstick.mp3", volume: 0.6 },
  arigato: { src: "./sounds/arigato.mp3", volume: 0.6 },
  hakushu: { src: "./sounds/hakushu.mp3", volume: 0.75 },
  appeal: { src: "./sounds/appealTime.mp3", volume: 0.7 },
  hakushua: { src: "./sounds/hakushua.mp3", volume: 0.7 },
  hakushub: { src: "./sounds/hakushub.mp3", volume: 0.7 },
  yatta: { src: "./sounds/yatta.mp3", volume: 0.75 },
};

const levelUpSfxMap = [
  { maxLevel: 3, key: "hakushub" },
  { maxLevel: Infinity, key: "yatta" },
];

const createAudio = (src, volume, loop = false) => {
  const audio = new Audio(src);
  audio.loop = loop;
  audio.volume = volume;
  audio.preload = "auto";
  return audio;
};

const registerBgmTrack = (audio) => {
  if (bgmTracks.indexOf(audio) === -1) {
    bgmTracks.push(audio);
  }
};

const registerSfxBase = (audio) => {
  if (sfxBaseList.indexOf(audio) === -1) {
    sfxBaseList.push(audio);
  }
};

const getMenuBgm = () => {
  if (!menuBgm) {
    menuBgm = createAudio("./sounds/menu.mp3", 0.8, true);
    menuBgm.muted = isMuted;
    registerBgmTrack(menuBgm);
  }
  return menuBgm;
};

const getPlayBgm = () => {
  if (!playBgm) {
    playBgm = createAudio("./sounds/play.mp3", 0.8, true);
    playBgm.muted = isMuted;
    registerBgmTrack(playBgm);
  }
  return playBgm;
};

const getSfxBase = (name) => {
  if (!sfxConfig[name]) {
    return null;
  }
  if (!sfxBaseMap[name]) {
    const config = sfxConfig[name];
    const base = createAudio(config.src, config.volume);
    base.muted = isMuted;
    registerSfxBase(base);
    sfxBaseMap[name] = base;
  }
  return sfxBaseMap[name];
};

export const getOrCreateAudioContext = () => {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) {
    audioContext = new AudioCtx();
  }
  return audioContext;
};

export const resumeAudioContext = () => {
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch((error) => {
      console.warn("AudioContext resume failed:", error);
    });
  }
};

const playSfx = (name, options = {}) => {
  if (isMuted) return;
  if (options.resumeContext !== false) {
    resumeAudioContext();
  }
  const base = getSfxBase(name);
  if (!base) return;
  const instance = base.cloneNode(true);
  instance.volume = base.volume;
  instance.muted = isMuted;
  instance.currentTime = 0;
  const playPromise = instance.play();
  if (playPromise && typeof playPromise.catch === "function") {
    playPromise.catch((error) => {
      console.warn(`${name} SFX play blocked:`, error);
    });
  }
};

const updateMuteStatus = () => {
  bgmTracks.forEach((track) => {
    track.muted = isMuted;
  });
  sfxBaseList.forEach((track) => {
    track.muted = isMuted;
  });
  if (toggleButton) {
    toggleButton.textContent = isMuted ? "🔇" : "🔊";
  }
};

const handleToggleClick = () => {
  isMuted = !isMuted;
  updateMuteStatus();
};

export const initAudio = ({ toggleButton: button } = {}) => {
  toggleButton = button ?? document.getElementById("toggleBgmBtn");
  if (toggleButton) {
    toggleButton.removeEventListener("click", handleToggleClick);
    toggleButton.addEventListener("click", handleToggleClick);
  }
  updateMuteStatus();
};

export const unlockBgm = () => {
  bgmUnlocked = true;
};

export const isBgmUnlocked = () => bgmUnlocked;

export const stopAllBgm = () => {
  currentBgm = null;
  bgmTracks.forEach((track) => {
    track.pause();
    track.currentTime = 0;
  });
};

export const playMenuBgm = (isAutoAttempt = false) => {
  const bgm = getMenuBgm();
  stopAllBgm();
  currentBgm = bgm;
  bgm.currentTime = 0;
  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    return playPromise.catch((error) => {
      console.warn("Menu BGM auto-play blocked:", error);
      currentBgm = null;
      if (isAutoAttempt) {
        bgmUnlocked = false;
      }
      return undefined;
    });
  }
  return undefined;
};

export const playGameBgm = () => {
  const bgm = getPlayBgm();
  stopAllBgm();
  currentBgm = bgm;
  bgm.currentTime = 0;
  const playPromise = bgm.play();
  if (playPromise && typeof playPromise.catch === "function") {
    return playPromise.catch((error) => {
      console.warn("Play BGM auto-play blocked:", error);
      currentBgm = null;
      return undefined;
    });
  }
  return undefined;
};

export const pauseCurrentBgm = () => {
  if (!currentBgm) return;
  currentBgm.pause();
};

export const resumeCurrentBgm = () => {
  if (!currentBgm) return;
  currentBgm.play().catch((error) => {
    console.warn("Resuming BGM failed:", error);
  });
};

export const attemptAutoPlayMenuBgm = () => {
  bgmUnlocked = true;
  const autoPlayPromise = playMenuBgm(true);
  if (autoPlayPromise && typeof autoPlayPromise.catch === "function") {
    autoPlayPromise.catch(() => {});
  }
};

export const playButtonSfx = () => playSfx("click");
export const playStartSfx = () => playSfx("start");
export const playArrowSfx = () => playSfx("arrow");
export const playEndSfx = () => playSfx("end");
export const playPauseSfx = () => playSfx("pause");
export const playMainSfx = () => playSfx("main");
export const playLightstickSfx = () => playSfx("lightstick");
export const playArigatoSfx = () => playSfx("arigato");
export const playHakushuSfx = () => playSfx("hakushu");
export const playAppealTimeSfx = () => playSfx("appeal");

export const playLvupSfx = (level) => {
  const entry = levelUpSfxMap.find((item) => level <= item.maxLevel);
  if (!entry) return;
  playSfx(entry.key);
};

const getCountdownFrequency = (timeLeft) => {
  if (timeLeft === 0) {
    return 1046;
  }
  return 620 + (10 - timeLeft) * 32;
};

export const playCountdownBeep = (timeLeft) => {
  resumeAudioContext();
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + 0.01;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const isFinal = timeLeft === 0;
  const duration = isFinal ? 1 : 0.25;
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(getCountdownFrequency(timeLeft), now);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(isFinal ? 0.7 : 0.4, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration + 0.05);
};

export const playFeverCountdownChime = (timeLeft) => {
  resumeAudioContext();
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime + 0.01;
  const oscillator = ctx.createOscillator();
  const delay = ctx.createDelay();
  const feedback = ctx.createGain();
  const gain = ctx.createGain();

  const baseFreq = 840;
  const interval = timeLeft === 1 ? 1.5 : 1.25;

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(baseFreq, now);
  oscillator.detune.setValueAtTime(timeLeft === 1 ? 20 : 12, now);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.42, now + 0.02);
  gain.gain.linearRampToValueAtTime(0.0001, now + 0.3);

  delay.delayTime.value = 0.12;
  feedback.gain.value = 0.45;

  oscillator.connect(gain);
  gain.connect(ctx.destination);
  gain.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(ctx.destination);

  const harmonicOsc = ctx.createOscillator();
  const harmonicGain = ctx.createGain();
  harmonicOsc.type = "triangle";
  harmonicOsc.frequency.setValueAtTime(baseFreq * interval, now);
  harmonicGain.gain.setValueAtTime(0.0001, now);
  harmonicGain.gain.exponentialRampToValueAtTime(0.2, now + 0.02);
  harmonicGain.gain.linearRampToValueAtTime(0.0001, now + 0.25);
  harmonicOsc.connect(harmonicGain).connect(ctx.destination);

  oscillator.start(now);
  harmonicOsc.start(now);
  oscillator.stop(now + 0.35);
  harmonicOsc.stop(now + 0.3);
};



