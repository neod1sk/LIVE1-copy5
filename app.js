import { PENLIGHT_COLORS } from "./src/constants/colors.js";
import { LEVEL_TABLE } from "./src/constants/levels.js";
import { MODE_SCORE } from "./src/constants/modeScore.js";
import { createI18n } from "./src/i18n/index.js";
import { GameStore } from "./src/state/gameStore.js";
import {
  initAudio,
  unlockBgm,
  isBgmUnlocked,
  playMenuBgm,
  playGameBgm,
  pauseCurrentBgm,
  resumeCurrentBgm,
  attemptAutoPlayMenuBgm,
  playButtonSfx,
  playStartSfx,
  playArrowSfx,
  playEndSfx,
  playPauseSfx,
  playMainSfx,
  playLightstickSfx,
  playArigatoSfx,
  playHakushuSfx,
  playAppealTimeSfx,
  playLvupSfx,
  playCountdownBeep,
  playFeverCountdownChime,
  resumeAudioContext,
} from "./src/audio/audioManager.js";
import {
  flashTargetCard,
  flashHudValues,
  updateCountdownEffects,
  updatePauseButtonLabel,
} from "./src/ui/effects.js";
import { bindTapSafeActivation } from "./src/input/touch.js";

const colors = PENLIGHT_COLORS;
const levelTable = LEVEL_TABLE;
const modeScore = MODE_SCORE;

const { t, setLanguage, getLanguage, supportedLanguages } = createI18n();
let langButtons = [];

const hexToRgb = (hex) => {
  if (!hex) return { r: 0, g: 0, b: 0 };
  let sanitized = hex.replace("#", "");
  if (sanitized.length === 3) {
    sanitized = sanitized
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  const intVal = parseInt(sanitized, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return { r, g, b };
};

const hexToRgba = (hex, alpha = 1) => {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const applyPenlightAppearance = (element, colorCode) => {
  if (!element) return;
  const tube = element.querySelector(".penlight__tube");
  if (!tube) return;
  if (!colorCode) {
    element.classList.add("penlight--off");
    element.style.setProperty("--tube-color", "#dbe1f2");
    tube.style.backgroundColor = "";
    tube.style.boxShadow =
      "inset 0 0 18px rgba(255,255,255,0.65), 0 12px 22px rgba(0,0,0,0.22)";
    return;
  }
  element.classList.remove("penlight--off");
  element.style.setProperty("--tube-color", colorCode);
  tube.style.backgroundColor = colorCode;
  tube.style.boxShadow = `0 18px 40px rgba(0,0,0,0.35), 0 0 32px ${hexToRgba(
    colorCode,
    0.55
  )}`;
};

const randomBetween = (min, max) => Math.random() * (max - min) + min;

const setFeverPenlightMotion = (direction = null) => {
  if (!feverPenlight) return;
  if (!direction) {
    feverPenlight.style.setProperty("--fever-penlight-translate", "0px");
    feverPenlight.style.setProperty("--fever-penlight-rotate", "0deg");
    if (feverParticles) {
      feverParticles.querySelectorAll(".fever__particle").forEach((node) => {
        if (!node.dataset.persist) {
          node.remove();
        }
      });
    }
    return;
  }
  const translate = direction === "left" ? "-16px" : "16px";
  const rotate = direction === "left" ? "-12deg" : "12deg";
  feverPenlight.style.setProperty("--fever-penlight-translate", translate);
  feverPenlight.style.setProperty("--fever-penlight-rotate", rotate);
  spawnFeverParticles(direction);
};

const spawnFeverParticles = (direction) => {
  if (!feverParticles) return;
  const count = Math.floor(randomBetween(4, 6));
  const baseAngle = direction === "left" ? Math.PI - Math.PI / 8 : Math.PI / 8;
  const spread = Math.PI / 5;
  for (let i = 0; i < count; i += 1) {
    const particle = document.createElement("span");
    const variantRand = Math.random();
    let variantClass = "fever__particle";
    if (variantRand < 0.25) {
      variantClass += " fever__particle--star";
    } else if (variantRand < 0.65) {
      variantClass += " fever__particle--spark";
    }
    particle.className = variantClass;
    const angle = baseAngle + randomBetween(-spread, spread);
    const distance = randomBetween(32, 56);
    const tx = Math.cos(angle) * distance;
    const ty = -Math.abs(Math.sin(angle) * distance * 0.75) - randomBetween(6, 18);
    const duration = randomBetween(0.5, 0.7);
    const scale = randomBetween(0.5, 0.9);
    particle.style.setProperty("--particle-tx", `${tx.toFixed(2)}px`);
    particle.style.setProperty("--particle-ty", `${ty.toFixed(2)}px`);
    particle.style.setProperty("--particle-duration", `${duration.toFixed(2)}s`);
    particle.style.setProperty("--particle-scale", scale.toFixed(2));
    feverParticles.appendChild(particle);
    particle.addEventListener(
      "animationend",
      () => {
        particle.remove();
      },
      { once: true }
    );
  }
};

const getLuminance = (hex) => {
  const { r, g, b } = hexToRgb(hex);
  const srgb = [r, g, b].map((value) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
};

const getLevelInfoByScore = (score) =>
  levelTable.find((entry) => score <= entry.max) || levelTable[levelTable.length - 1];

const getLevelName = (levelInfo, lang = getLanguage()) => {
  if (!levelInfo) return "";
  if (levelInfo.names && levelInfo.names[lang]) return levelInfo.names[lang];
  if (levelInfo.names && levelInfo.names.ja) return levelInfo.names.ja;
  return levelInfo.name || "";
};

const getLevelNameByKey = (key, lang = getLanguage()) => {
  const info = levelTable.find((entry) => entry.key === key);
  return getLevelName(info, lang);
};

const screens = {
  top: document.getElementById("screen-top"),
  play: document.getElementById("screen-play"),
  result: document.getElementById("screen-result"),
  langSwitcher: document.getElementById("lang-switcher"),
  hero: document.querySelector(".hero"),
  transition: document.getElementById("transition-result"),
  lockScroll() {
    document.body.classList.add("scroll-lock");
  },
  unlockScroll() {
    document.body.classList.remove("scroll-lock");
  },
  showTop() {
    setHeroInteractive(false);
    this.unlockScroll();
    this.top.hidden = false;
    this.play.hidden = true;
    this.result.hidden = true;
    if (this.langSwitcher) {
      this.langSwitcher.hidden = false;
    }
    if (this.hero) {
      this.hero.hidden = false;
    }
    this.hideTransition();
    if (isBgmUnlocked()) {
      playMenuBgm(); // メニュー画面表示時のBGM（ユーザー操作後のみ）
    }
    if (bgmToggleButton) {
      bgmToggleButton.hidden = false;
    }
  },
  showPlay() {
    resetViewportScroll(this.play);
    this.lockScroll();
    this.top.hidden = true;
    this.play.hidden = false;
    this.result.hidden = true;
    if (this.langSwitcher) {
      this.langSwitcher.hidden = true;
    }
    if (this.hero) {
      this.hero.hidden = true;
    }
    this.hideTransition();
    if (isBgmUnlocked()) {
      playGameBgm(); // プレイ画面表示時のBGM（ユーザー操作後のみ）
    }
    if (bgmToggleButton) {
      bgmToggleButton.hidden = false;
    }
  },
  showResult(state) {
    setHeroInteractive(true);
    this.unlockScroll();
    this.top.hidden = true;
    this.play.hidden = true;
    this.result.hidden = false;
    if (this.langSwitcher) {
      this.langSwitcher.hidden = false;
    }
    if (this.hero) {
      this.hero.hidden = false;
    }
    this.hideTransition();
    populateResult(state);
    if (isBgmUnlocked()) {
      playMenuBgm(); // 結果画面表示時のBGM（メニューと同じ曲）
    }
    if (bgmToggleButton) {
      bgmToggleButton.hidden = false;
    }
  },
  showTransition() {
    this.lockScroll();
    this.top.hidden = true;
    this.play.hidden = true;
    this.result.hidden = true;
    if (this.transition) {
      this.transition.hidden = false;
    }
  },
  hideTransition() {
    if (this.transition) {
      this.transition.hidden = true;
    }
  },
};

const game = new GameStore({
  colors,
  modeScore,
  t,
  effects: {
    onPause: () => {
      pauseCurrentBgm();
    },
    onResume: () => {
      if (isBgmUnlocked()) {
        resumeCurrentBgm();
      }
    },
    onHudFlash: () => {
      flashHudValues(hudFlashTargets);
    },
    onTargetFlash: () => {
      flashTargetCard(targetColor);
    },
    onMatchToast: ({ message, variant, options }) => {
      showToast(message, variant, options);
    },
    onGlitchToast: ({ message, variant }) => {
      showToast(message, variant);
    },
    onFeverStart: ({ message }) => {
      showToast(message, "success");
      playAppealTimeSfx();
    },
    onFeverLevelUp: ({ message, level }) => {
      showToast(message, "success");
      playLvupSfx(level);
    },
    onFeverEnd: ({ message }) => {
      showToast(message, "success");
    },
    onFeverSwing: () => {
      playLightstickSfx();
    },
    onTransitionStart: () => {
      screens.showTransition();
    },
    onTransitionComplete: (state) => {
      screens.showResult(state);
      playHakushuSfx();
      saveHistory(state);
    },
  },
});

const hudScore = document.getElementById("hud-score");
const hudSuccess = document.getElementById("hud-success");
const hudTime = document.getElementById("hud-time");
const hudTimerItem = document.getElementById("hud-timer-item");
const targetColor = document.getElementById("target-color");
const penlight = document.getElementById("penlight");
const feverPenlight = document.getElementById("fever-penlight");
const feverParticles = document.getElementById("fever-particles");
const feverTimer = document.querySelector(".fever__timer");
const penlightLabel = document.getElementById("penlight-label");
const feverLayer = document.getElementById("fever");
const feverTime = document.getElementById("fever-time");
const feverCount = document.getElementById("fever-count");
const feverStage = document.getElementById("fever-stage");
const easyGuide = document.getElementById("easy-guide");
const previewBar = document.getElementById("preview-bar");
const historyList = document.getElementById("history-list");
const resultCard = document.getElementById("result-card");
const resultScore = document.getElementById("result-score");
const resultLevel = document.getElementById("result-level");
const resultSuccess = document.getElementById("result-success");
const resultResponses = document.getElementById("result-responses");
const pauseButton = document.getElementById("btn-pause");
const stageToastLayer = document.getElementById("stage-toast-layer");
const hero = document.querySelector(".hero");
const heroTitle = document.querySelector(".hero__title");
const heroSubtitle = document.querySelector(".hero__subtitle");
const heroInteractiveElements = [heroTitle, heroSubtitle];
const appealImageArea = document.getElementById("appeal-image-area");
const appealImage = document.getElementById("appeal-image");
const appealImageSources = [
  "./images/reactionaa.jpg",
  "./images/reactionbb.jpg",
  "./images/reactioncc.jpg",
  "./images/reactiondd.jpg",
];

function resetViewportScroll(target) {
  if (typeof window !== "undefined" && typeof window.scrollTo === "function") {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (error) {
      window.scrollTo(0, 0);
    }
  }

  if (!target) return;
  try {
    if (typeof target.scrollTo === "function") {
      target.scrollTo({ top: 0, left: 0, behavior: "auto" });
      return;
    }
  } catch (error) {
    // ignore and fall through
  }
  target.scrollTop = 0;
  target.scrollLeft = 0;
}

let lastSwingDirection = null;
let previewItems = [];
let lastCountdownTime = null;
let lastFeverCountdownTime = null;
let lastAppealLevel = null;

const bgmToggleButton = document.getElementById("toggleBgmBtn");

const isResultScreenActive = () => screens && screens.result && !screens.result.hidden;

const handleHeroClick = () => {
  if (!isResultScreenActive()) return;
  playButtonSfx();
  screens.showTop();
};

const handleHeroKeydown = (event) => {
  if (!isResultScreenActive()) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    playButtonSfx();
    screens.showTop();
  }
};

heroInteractiveElements.forEach((element) => {
  if (!element) return;
  element.addEventListener("click", handleHeroClick);
  element.addEventListener("keydown", handleHeroKeydown);
});

function setHeroInteractive(enabled) {
  if (!hero) return;
  hero.classList.toggle("hero--interactive", enabled);
  heroInteractiveElements.forEach((element) => {
    if (!element) return;
    if (enabled) {
      element.setAttribute("role", "button");
      element.setAttribute("tabindex", "0");
    } else {
      element.removeAttribute("role");
      element.removeAttribute("tabindex");
      if (document.activeElement === element) {
        element.blur();
      }
    }
  });
}

if (targetColor) {
  targetColor.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === "targetCardFlash") {
        targetColor.classList.remove("color-card--flash");
      }
    },
    { passive: true }
  );
}

const hudFlashTargets = [
  { element: hudScore, className: "hud__value--flash-score", animation: "hudValueFlashScore" },
  {
    element: hudSuccess,
    className: "hud__value--flash-success",
    animation: "hudValueFlashSuccess",
  },
];

hudFlashTargets.forEach(({ element, className, animation }) => {
  if (!element) return;
  element.addEventListener(
    "animationend",
    (event) => {
      if (event.animationName === animation) {
        element.classList.remove(className);
      }
    },
    { passive: true }
  );
});

function initUI() {
  const reversedColors = [...colors].reverse();
  previewBar.innerHTML = reversedColors
    .map((color, idx) => {
      const originalIndex = colors.length - 1 - idx;
      return `<div class="preview-bar__item" data-color-index="${originalIndex}" data-name="${color.name}" style="--preview-color:${color.code}"></div>`;
    })
    .join("");
  previewItems = Array.from(previewBar.querySelectorAll(".preview-bar__item"));
  restoreHistory();
}

function updateUI(state) {
  hudScore.textContent = state.score.toString().padStart(4, "0");
  hudSuccess.textContent = state.successCount;
  hudTime.textContent = state.timeLeft;
  updatePauseButtonLabel(pauseButton, state.paused, t);
  const isLowTime =
    Number.isFinite(state.timeLeft) && state.timeLeft <= 3 && state.timeLeft >= 0;
  if (hudTimerItem) {
    hudTimerItem.classList.toggle("fever__timer--glow", isLowTime);
    if (isLowTime) {
      const glowSpeed = Math.max(0.4, Math.min(0.6, 0.4 + (state.timeLeft / 10) * 0.2));
      hudTimerItem.style.setProperty("--fever-glow-speed", `${glowSpeed.toFixed(2)}s`);
    } else {
      hudTimerItem.style.removeProperty("--fever-glow-speed");
    }
  }
  const timeChanged = lastCountdownTime !== state.timeLeft;
  updateCountdownEffects(hudTimerItem, hudTime, state.timeLeft);
  if (
    timeChanged &&
    Number.isFinite(state.timeLeft) &&
    state.timeLeft <= 10 &&
    state.timeLeft >= 0
  ) {
    playCountdownBeep(state.timeLeft);
  }
  if (timeChanged) {
    lastCountdownTime = state.timeLeft;
  }

  const isPenlightOff = state.currentIndex === null;
  const currentColor = isPenlightOff ? null : colors[state.currentIndex];

  const tube = penlight.querySelector(".penlight__tube");
  if (isPenlightOff) {
    penlight.classList.add("penlight--off");
    penlight.style.setProperty("--tube-color", "#dbe1f2");
    if (tube) {
      tube.style.backgroundColor = "";
      tube.style.boxShadow =
        "inset 0 0 18px rgba(255,255,255,0.65), 0 12px 22px rgba(0,0,0,0.22)";
    }
    penlightLabel.textContent = t("penlight.off");
    penlightLabel.style.color = "rgba(255,255,255,0.65)";
    penlightLabel.style.textShadow = "none";
    if (previewItems.length) {
      previewItems.forEach((item) =>
        item.classList.remove("preview-bar__item--active")
      );
    }
  } else {
    penlight.classList.remove("penlight--off");
    penlight.style.setProperty("--tube-color", currentColor.code);
    if (tube) {
      tube.style.backgroundColor = currentColor.code;
      tube.style.boxShadow = `0 18px 40px rgba(0,0,0,0.35), 0 0 32px ${hexToRgba(
        currentColor.code,
        0.55
      )}`;
    }
    const labelColor = "#ffffff";
    const labelShadow = "0 0 6px rgba(0,0,0,0.45)";
    penlightLabel.textContent = currentColor.name;
    penlightLabel.style.color = labelColor;
    penlightLabel.style.textShadow = labelShadow;
    if (previewItems.length) {
      previewItems.forEach((item) =>
        item.classList.toggle(
          "preview-bar__item--active",
          Number(item.dataset.colorIndex) === state.currentIndex
        )
      );
    }
  }

  const feverColorCode = currentColor ? currentColor.code : null;
  applyPenlightAppearance(feverPenlight, feverColorCode);
  if (!state.fever.active) {
    setFeverPenlightMotion(null);
  }

  targetColor.querySelector(".color-card__swatch").style.background =
    colors[state.targetIndex].code;
  targetColor.querySelector(".color-card__name").textContent =
    colors[state.targetIndex].name;
  targetColor.hidden = !!state.fever.active;

  easyGuide.hidden = state.mode !== "easy";

  const feverState = state.fever;
  feverLayer.hidden = !(feverState && feverState.active);
  const swingLabel = t("fever.countUnit");
  const swingRoundTrips = Math.floor(((feverState && feverState.swingCount) || 0) / 2);
  const rawStageLevel =
    feverState && feverState.responseStage != null ? feverState.responseStage : 0;
  const stageLevel = Math.max(0, rawStageLevel);
  const stageText = t("fever.stage", { level: stageLevel });
  feverCount.textContent = `${swingRoundTrips} ${swingLabel}`;
  feverStage.textContent = stageText;
  if (appealImageArea && appealImage) {
    if (state.fever.active && stageLevel >= 1) {
      const imageIndex = Math.min(stageLevel - 1, appealImageSources.length - 1);
      const nextSrc = appealImageSources[imageIndex];
      if (appealImage.getAttribute("src") !== nextSrc) {
        appealImage.setAttribute("src", nextSrc);
      }
      appealImage.alt = stageText;
      appealImageArea.hidden = false;
      appealImageArea.classList.add("is-visible");
      const levelChanged = lastAppealLevel !== stageLevel;
      if (levelChanged) {
        appealImageArea.classList.remove("is-flash");
        void appealImageArea.offsetWidth;
        appealImageArea.classList.add("is-flash");
        const stars = appealImageArea.querySelector(".appeal-stars");
        if (stageLevel >= 4) {
          appealImageArea.classList.add("is-epic");
          if (stars) {
            stars.classList.remove("is-bursting");
            void stars.offsetWidth;
            stars.classList.add("is-bursting");
          }
        } else {
          appealImageArea.classList.remove("is-epic");
          if (stars) {
            stars.classList.remove("is-bursting");
          }
        }
        setTimeout(() => {
          appealImageArea.classList.remove("is-flash");
        }, 700);
        lastAppealLevel = stageLevel;
      }
    } else {
      appealImageArea.hidden = true;
      appealImageArea.classList.remove("is-visible");
      appealImageArea.classList.remove("is-flash", "is-epic");
      const stars = appealImageArea.querySelector(".appeal-stars");
      if (stars) {
        stars.classList.remove("is-bursting");
        void stars.offsetWidth;
        stars.classList.remove("is-bursting");
      }
      appealImage.removeAttribute("src");
      appealImage.alt = "";
      lastAppealLevel = null;
    }
  }
  if (feverState && feverState.active) {
    feverTime.textContent = feverState.timeLeft;
  }
  const feverLowTime =
    feverState &&
    feverState.active &&
    Number.isFinite(feverState.timeLeft) &&
    feverState.timeLeft <= 3;
  if (feverTimer) {
    feverTimer.classList.toggle("fever__timer--glow", feverLowTime);
    if (feverLowTime) {
      const feverGlowSpeed = Math.max(
        0.4,
        Math.min(0.6, 0.4 + (feverState.timeLeft / 10) * 0.2)
      );
      feverTimer.style.setProperty("--fever-glow-speed", `${feverGlowSpeed.toFixed(2)}s`);
    } else {
      feverTimer.style.removeProperty("--fever-glow-speed");
    }
  }
  const currentFeverTime = feverState && feverState.timeLeft != null ? feverState.timeLeft : null;
  const feverTimeChanged = lastFeverCountdownTime !== currentFeverTime;
  if (feverState && feverState.active) {
    if (
      feverTimeChanged &&
      Number.isFinite(feverState.timeLeft) &&
      feverState.timeLeft <= 3 &&
      feverState.timeLeft >= 0
    ) {
      playFeverCountdownChime(feverState.timeLeft);
    }
    if (feverTimeChanged) {
      lastFeverCountdownTime = feverState.timeLeft;
    }
  } else {
    lastFeverCountdownTime = null;
  }
}

function populateResult(state) {
  resultScore.textContent = state.score;
  const levelInfo = getLevelInfoByScore(state.score);
  const levelName = getLevelName(levelInfo);
  resultLevel.textContent = levelName;
  resultCard.classList.remove("level-1", "level-2", "level-3");
  if (levelInfo && levelInfo.levelClass) {
    resultCard.classList.add(levelInfo.levelClass);
  }
  resultSuccess.textContent = state.successCount;
  resultResponses.textContent = state.responses;
}

function handleFeverSwing(e) {
  if (!game.state.fever.active || game.state.paused) return;
  if (e.type === "pointerdown") {
    if (e.currentTarget.setPointerCapture) {
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    lastSwingDirection = null;
    setFeverPenlightMotion(null);
  } else if (e.type === "pointermove") {
    const rect = e.currentTarget.getBoundingClientRect();
    const center = rect.left + rect.width / 2;
    const direction = e.clientX < center ? "left" : "right";
    if (lastSwingDirection !== direction) {
      setFeverPenlightMotion(direction);
      if (lastSwingDirection) {
        game.swing(direction);
      }
    } else if (!lastSwingDirection) {
      setFeverPenlightMotion(direction);
    }
    lastSwingDirection = direction;
  } else if (e.type === "pointerup" || e.type === "pointercancel") {
    lastSwingDirection = null;
    setFeverPenlightMotion(null);
  }
}

function showScreenPlay() {
  resumeAudioContext();
  if (!isBgmUnlocked()) {
    unlockBgm(); // 初回のユーザー操作でBGM再生を解禁
  }
  if (hudTimerItem) {
    hudTimerItem.classList.remove("is-countdown");
  }
  if (hudTime) {
    hudTime.classList.remove("is-countdown");
  }
  lastCountdownTime = null;
  screens.lockScroll();
  screens.showPlay();
  const selectedMode = document.querySelector('input[name="mode"]:checked').value;
  game.start(selectedMode);
}

function endGame() {
  game.finish();
}

function saveHistory(state) {
  const levelInfo = getLevelInfoByScore(state.score);
  const entry = {
    score: state.score,
    success: state.successCount,
    responses: state.responses,
    levelKey: levelInfo && levelInfo.key != null ? levelInfo.key : null,
    date: new Date().toLocaleString(),
  };
  const history = JSON.parse(localStorage.getItem("oshiHistory") || "[]");
  history.unshift(entry);
  localStorage.setItem("oshiHistory", JSON.stringify(history.slice(0, 5)));
  restoreHistory();
}

function restoreHistory() {
  const history = JSON.parse(localStorage.getItem("oshiHistory") || "[]");
  if (!history.length) {
    historyList.innerHTML = `<li>${t("history.empty")}</li>`;
    return;
  }
  const pointsUnit = t("history.pointsUnit");
  historyList.innerHTML = history
    .map((item) => {
      const levelName =
        item.levelKey !== undefined && item.levelKey !== null
          ? getLevelNameByKey(item.levelKey)
          : item.level || getLevelName(getLevelInfoByScore(item.score));
      const dateLabel = item.date || "";
      return `<li><strong>${item.score}</strong> ${pointsUnit} / ${levelName}<br><small>${dateLabel}</small></li>`;
    })
    .join("");
}

function updateLangButtons() {
  if (!langButtons || !langButtons.length) return;
  const activeLang = getLanguage();
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === activeLang;
    btn.classList.toggle("lang-switcher__btn--active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
    const flag =
      btn.dataset.lang === "ja"
        ? "🇯🇵"
        : btn.dataset.lang === "en"
        ? "🇺🇸"
        : btn.dataset.lang === "ko"
        ? "🇰🇷"
        : btn.textContent;
    btn.textContent = flag;
  });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (!key) return;
    if (
      key === "penlight.off" &&
      game &&
      game.state &&
      game.state.currentIndex !== null
    ) {
      return;
    }
    const translation = t(key);
    if (translation !== undefined) {
      node.textContent = translation;
    }
  });
}

function changeLanguage(lang) {
  const nextLang = supportedLanguages.includes(lang) ? lang : "ja";
  setLanguage(nextLang);
  applyTranslations();
  updateLangButtons();
  restoreHistory();
  if (game && game.state) {
    updateUI(game.state);
  }
}

function shareOnX() {
  const score = game.state.score;
  const responses = game.state.responses;
  const levelName = getLevelName(getLevelInfoByScore(score));
  const text = encodeURIComponent(t("share.template", { levelName, score, responses }));
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
}

function showToast(message, variant = "success", options = {}) {
  const { placement = "global", duration = 1800 } = options;
  const container =
    placement === "stage" && stageToastLayer ? stageToastLayer : document.body;
  const toast = document.createElement("div");
  const extraClass =
    placement === "stage"
      ? ` toast--stage${
          variant === "success"
            ? message === t("toast.feverStart") || message === t("toast.feverEnd")
              ? " toast--stage-success-pink"
              : " toast--stage-success"
            : ""
        }`
      : "";
  toast.className = `toast toast--${variant}${extraClass}`;
  toast.textContent = message;
  if (placement === "stage" && stageToastLayer) {
    stageToastLayer.querySelectorAll(".toast").forEach((node) => node.remove());
  }
  container.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add("is-visible"));
  setTimeout(() => {
    toast.classList.remove("is-visible");
    toast.addEventListener("transitionend", () => toast.remove(), { once: true });
  }, duration);
}

function attachEventListeners() {
  const btnStart = document.getElementById("btn-start");
  if (btnStart) {
    btnStart.addEventListener("click", () => {
      playStartSfx();
      showScreenPlay();
    });
  }
  const btnEnd = document.getElementById("btn-end");
  if (btnEnd) {
    btnEnd.addEventListener("click", () => {
      playEndSfx();
      endGame();
    });
  }
  const btnRetry = document.getElementById("btn-retry");
  if (btnRetry) {
    btnRetry.addEventListener("click", () => {
      playStartSfx();
      showScreenPlay();
    });
  }
  const btnTop = document.getElementById("btn-top");
  if (btnTop) {
    btnTop.addEventListener("click", () => {
      playMainSfx();
      screens.showTop();
    });
  }
  const btnShare = document.getElementById("btn-share");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      playArigatoSfx();
      shareOnX();
    });
  }
  const btnRanking = document.getElementById("btn-ranking");
  if (btnRanking) {
    btnRanking.addEventListener("click", () => {
      playMainSfx();
      showToast(t("top.ranking"), "success");
    });
  }
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  modeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      playMainSfx();
    });
  });
  bindTapSafeActivation(
    document.getElementById("btn-left"),
    () => {
    playArrowSfx();
    game.rotate(-1);
    },
    { resumeAudio: resumeAudioContext }
  );
  bindTapSafeActivation(
    document.getElementById("btn-right"),
    () => {
    playArrowSfx();
    game.rotate(1);
    },
    { resumeAudio: resumeAudioContext }
  );
  if (pauseButton) {
    bindTapSafeActivation(
      pauseButton,
      () => {
      playPauseSfx();
      game.togglePause();
      },
      { resumeAudio: resumeAudioContext }
    );
  }

  document.addEventListener("keydown", (e) => {
    if (screens.play.hidden) return;
    if (e.key === "Escape") {
      game.togglePause();
      return;
    }
    if (game.state.paused) return;
    if (e.key === "ArrowLeft") game.rotate(-1);
    if (e.key === "ArrowRight") game.rotate(1);
  });

  const feverZone = document.getElementById("fever-zone");
  ["pointerdown", "pointermove", "pointerup", "pointercancel"].forEach((type) => {
    feverZone.addEventListener(type, handleFeverSwing);
  });

  const howtoModal = document.getElementById("howto-modal");
  const btnHowto = document.getElementById("btn-howto");
  if (btnHowto) {
    btnHowto.addEventListener("click", () => {
      playMainSfx();
      howtoModal.hidden = false;
    });
  }
  const btnCloseHowto = document.getElementById("btn-close-howto");
  if (btnCloseHowto) {
    btnCloseHowto.addEventListener("click", () => {
      playMainSfx();
      howtoModal.hidden = true;
    });
  }
  howtoModal.addEventListener("click", (e) => {
    if (e.target === howtoModal || e.target.classList.contains("howto-modal__backdrop")) {
      playMainSfx();
      howtoModal.hidden = true;
    }
  });

  if (langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        playMainSfx();
        changeLanguage(btn.dataset.lang);
      });
    });
  }
}

function mountStore() {
  game.subscribe((state) => {
    updateUI(state);
  });
}

function init() {
  initUI();
  langButtons = Array.from(document.querySelectorAll("[data-lang]"));
  initAudio({ toggleButton: bgmToggleButton });
  changeLanguage(getLanguage());
  attachEventListeners();
  mountStore();
  screens.showTop();
  if (!isBgmUnlocked()) {
    attemptAutoPlayMenuBgm();
  }
}

document.addEventListener("DOMContentLoaded", init);

const toastStyle = document.createElement("style");
toastStyle.innerHTML = `
.toast {
  position: fixed;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  padding: 12px 18px;
  border-radius: 999px;
  background: rgba(20, 12, 35, 0.94);
  color: white;
  box-shadow: 0 12px 30px rgba(0,0,0,0.35);
  opacity: 0;
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 50;
  font-size: 0.9rem;
}
.toast--success {
  border: 1px solid rgba(87, 242, 135, 0.65);
}
.toast--danger {
  border: 1px solid rgba(255, 59, 107, 0.65);
  color: #ffb3c7;
}
.toast.is-visible {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
.toast--stage {
  position: relative;
  left: auto;
  bottom: auto;
  transform: translateY(12px);
  padding: 8px 12px;
  border-radius: 14px;
  background: rgba(20, 9, 45, 0.92);
  box-shadow: 0 12px 24px rgba(13, 5, 32, 0.4);
  font-size: 0.8rem;
  min-width: 120px;
  opacity: 0;
  white-space: nowrap;
}
.toast--stage-success {
  border: 1px solid rgba(87, 242, 135, 0.65);
  color: #d4ffe5;
  text-shadow: 0 0 8px rgba(87, 242, 135, 0.4);
  box-shadow: 0 14px 28px rgba(20, 60, 40, 0.45), 0 0 20px rgba(87, 242, 135, 0.35);
  background: linear-gradient(140deg, rgba(30, 80, 50, 0.4), rgba(20, 9, 45, 0.92));
}

.toast--stage-success-pink {
  border: 1px solid rgba(255, 110, 210, 0.7);
  color: #ffd8ff;
  text-shadow: 0 0 8px rgba(255, 120, 220, 0.6);
  box-shadow: 0 14px 28px rgba(120, 20, 90, 0.35), 0 0 20px rgba(255, 110, 210, 0.3);
  background: linear-gradient(140deg, rgba(255, 120, 230, 0.18), rgba(40, 0, 70, 0.9));
}
.toast--stage.is-visible {
  transform: translateY(0);
  opacity: 1;
}
`;
document.head.appendChild(toastStyle);

document.addEventListener(
  "gesturestart",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener(
  "gesturechange",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

document.addEventListener(
  "gestureend",
  (event) => {
    event.preventDefault();
  },
  { passive: false }
);

function allowsDoubleTap() {
  return false;
}

let lastTouchTime = 0;

document.addEventListener(
  "touchstart",
  (event) => {
    if (allowsDoubleTap(event.target)) return;
    if (event.touches.length > 1) {
      event.preventDefault();
      return;
    }
    const now = Date.now();
    if (now - lastTouchTime <= 350) {
      event.preventDefault();
      return;
    }
    lastTouchTime = now;
  },
  { passive: false }
);

["touchmove", "touchend"].forEach((type) => {
  document.addEventListener(
    type,
    (event) => {
      if (allowsDoubleTap(event.target)) return;
      if (event.touches && event.touches.length > 1) {
        event.preventDefault();
      }
    },
    { passive: false }
  );
});

document.addEventListener(
  "dblclick",
  (event) => {
    if (allowsDoubleTap(event.target)) return;
    event.preventDefault();
  },
  { passive: false }
);

