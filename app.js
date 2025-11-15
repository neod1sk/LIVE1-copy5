const colors = [
  { name: "RED", code: "#FF0000" },
  { name: "BLUE", code: "#0047FF" },
  { name: "WHITE", code: "#FFFFFF" },
  { name: "ORANGE", code: "#FFA500" },
  { name: "GREEN", code: "#00C853" },
  { name: "PURPLE", code: "#8000FF" },
  { name: "PINK", code: "#FF69B4" },
  { name: "YELLOW", code: "#FFEA00" },
  { name: "LIGHT GREEN", code: "#90EE90" },
  { name: "LIGHT BLUE", code: "#87CEFA" },
  { name: "LIGHT PINK", code: "#FFB6C1" },
  { name: "VIOLET", code: "#EE82EE" },
  { name: "LIME", code: "#32CD32" },
  { name: "TURQUOISE", code: "#40E0D0" },
  { name: "HOT PINK", code: "#FF1493" },
];

const levelTable = [
  {
    key: "lv1",
    max: 100,
    name: "初心オタク",
    levelClass: "level-1",
    names: { ja: "初心オタク", en: "Rookie Ota", ko: "초심 오타쿠" },
  },
  {
    key: "lv2",
    max: 130,
    name: "にわかオタク",
    levelClass: "level-1",
    names: { ja: "にわかオタク", en: "Casual Ota", ko: "니와카 오타쿠" },
  },
  {
    key: "lv3",
    max: 160,
    name: "ぽんこつオタク",
    levelClass: "level-1",
    names: { ja: "ぽんこつオタク", en: "Clumsy Ota", ko: "폰코츠 오타쿠" },
  },
  {
    key: "lv4",
    max: 190,
    name: "修行中オタク",
    levelClass: "level-1",
    names: { ja: "修行中オタク", en: "Training Ota", ko: "수련 중 오타쿠" },
  },
  {
    key: "lv5",
    max: 220,
    name: "最前オタク",
    levelClass: "level-1",
    names: { ja: "最前オタク", en: "Front-Row Ota", ko: "최전열 오타쿠" },
  },
  {
    key: "lv6",
    max: 250,
    name: "安定オタク",
    levelClass: "level-2",
    names: { ja: "安定オタク", en: "Steady Ota", ko: "안정 오타쿠" },
  },
  {
    key: "lv7",
    max: 280,
    name: "フロアの要オタク",
    levelClass: "level-2",
    names: { ja: "フロアの要オタク", en: "Floor Anchor Ota", ko: "플로어 핵심 오타쿠" },
  },
  {
    key: "lv8",
    max: 310,
    name: "ベテランオタク",
    levelClass: "level-2",
    names: { ja: "ベテランオタク", en: "Veteran Ota", ko: "베테랑 오타쿠" },
  },
  {
    key: "lv9",
    max: 340,
    name: "熟練オタク",
    levelClass: "level-2",
    names: { ja: "熟練オタク", en: "Skilled Ota", ko: "숙련 오타쿠" },
  },
  {
    key: "lv10",
    max: 370,
    name: "尊いオタク",
    levelClass: "level-2",
    names: { ja: "尊いオタク", en: "Blessed Ota", ko: "토토이 오타쿠" },
  },
  {
    key: "lv11",
    max: 400,
    name: "爆レスオタク",
    levelClass: "level-2",
    names: { ja: "爆レスオタク", en: "Burst Response Ota", ko: "폭발 레스 오타쿠" },
  },
  {
    key: "lv12",
    max: 430,
    name: "伝説のオタク",
    levelClass: "level-2",
    names: { ja: "伝説のオタク", en: "Legendary Ota", ko: "전설의 오타쿠" },
  },
  {
    key: "lv13",
    max: 460,
    name: "異次元オタク",
    levelClass: "level-2",
    names: { ja: "異次元オタク", en: "Otherworldly Ota", ko: "이차원 오타쿠" },
  },
  {
    key: "lv14",
    max: 499,
    name: "神オタク",
    levelClass: "level-2",
    names: { ja: "神オタク", en: "Godly Ota", ko: "신 오타쿠" },
  },
  {
    key: "lv15",
    max: Infinity,
    name: "天界オタク",
    levelClass: "level-3",
    names: { ja: "天界オタク", en: "Celestial Ota", ko: "천계 오타쿠" },
  },
];

const modeScore = {
  easy: 6,
  normal: 10,
  hard: 13,
};

const translations = {
  ja: {
    "hero.title": "推しライト LIVE!!",
    "hero.subtitle": "ペンライトを合わせて推しのレスをつかめ!🔥",
    "top.start": "ゲームスタート",
    "top.howto": "操作説明",
    "top.ranking": "ランキングを見る（近日公開）",
    "settings.title": "難易度・設定",
    "mode.easy.title": "🔰EASY",
    "mode.easy.desc": "+6点／色見本付き練習モード！",
    "mode.normal.title": "⚡NORMAL",
    "mode.normal.desc": "+10点／色順を覚えてガチ勝負！",
    "mode.hard.title": "🔥HARD",
    "mode.hard.desc": "+13点／ボタンの故障を乗り越え高得点を狙え！",
    "howto.title": "操作ガイド",
    "howto.step1": "スタート後、中央の「お題カラー」をチェック。",
    "howto.step2": "左右のボタンで順番にペンライトを回して一致させます。",
    "howto.step3": "2 秒以内に 3 回連続成功でフィーバー突入！",
    "howto.step4": "フィーバー中はスワイプ（左右往復）でポイントとレス演出を稼ごう。",
    "howto.imageNote": "操作説明画像は後日差し替え予定",
    "hud.scoreLabel": "スコア",
    "hud.successLabel": "成功回数",
    "hud.timeLabel": "残り時間",
    "target.title": "TARGET COLOR",
    "controls.turnLeft": "逆回し",
    "controls.turnRight": "順回し",
    "play.showResult": "終了する",
    "play.pause": "中断する",
    "play.resume": "再開する",
    "play.retry": "もう一度プレイ",
    "play.toTop": "トップに戻る",
    "fever.title": "アピールタイム！",
    "fever.message": "ペンライトをたくさん振って爆レスをもらおう！",
    "fever.swipe": "左右にスワイプ！",
    "fever.timerUnit": "秒",
    "fever.countUnit": "往復",
    "fever.stage": "認知 Lv.{level}",
    "result.title": "ライブ結果",
    "result.scoreLabel": "トータルスコア",
    "result.levelLabel": "オタレベル",
    "result.successLabel": "成功回数",
    "result.responsesLabel": "レス獲得数",
    "share.button": "Xでシェア",
    "share.note": "スクショを添えて、あなたの輝きを見せよう!✨",
    "history.title": "最近のスコア",
    "history.empty": "初プレイを記録しよう！",
    "history.pointsUnit": "点",
    "toast.glitch": "ボタンが故障！連打で復旧しよう…",
    "toast.match": "ナイス！ +{points} 点",
    "toast.feverStart": "アピールタイム突入！",
    "toast.feverLevelUp": "認知レベルアップ！",
    "toast.feverEnd": "アピールタイム終了！",
    "share.template":
      "オタクレベル「{levelName}」！トータルスコア{score}！\n{responses}回 推しにレスもらったよ😭💕 #推しライトLIVE #ライブアイドル",
    "penlight.off": "OFF",
      "transition.resultTitle": "結果発表✨",
      "transition.resultSubtitle": "あなたのオタクレベルは？？",
  },
  en: {
    "hero.title": "OshiLight LIVE!!",
    "hero.subtitle": "Sync Your Light stick and Catch Your Oshi’s Reaction!🔥",
    "top.start": "Start Game",
    "top.howto": "How to Play",
    "top.ranking": "View Ranking (Coming Soon)",
    "settings.title": "Difficulty & Settings",
    "mode.easy.title": "🔰EASY",
    "mode.easy.desc": "+6 pts / Practice with color hints!",
    "mode.normal.title": "⚡NORMAL",
    "mode.normal.desc": "+10 pts / Remember the colors and challenge yourself!",
    "mode.hard.title": "🔥HARD",
    "mode.hard.desc": "+13 pts / Beat the glitches and hit the high score!",
    "howto.title": "How to Play",
    "howto.step1": "After starting, check the target color at the top.",
    "howto.step2": "Spin the penlight left/right to match the target color.",
    "howto.step3": "Match 3 times within 2 seconds to trigger Fever Time!",
    "howto.step4": "During Fever, swipe left and right to pile up points and responses.",
    "howto.imageNote": "A detailed how-to image will be added soon.",
    "hud.scoreLabel": "Score",
    "hud.successLabel": "Matches",
    "hud.timeLabel": "Time Left",
    "target.title": "TARGET COLOR",
    "controls.turnLeft": "Spin Left",
    "controls.turnRight": "Spin Right",
    "play.showResult": "Exit",
    "play.pause": "Pause",
    "play.resume": "Resume",
    "play.retry": "Play Again",
    "play.toTop": "Back to Top",
    "fever.title": "Appeal Time!",
    "fever.message": "Swing your Light Stick like crazy and earn mega reactions!",
    "fever.swipe": "Swipe left and right!",
    "fever.timerUnit": "sec",
    "fever.countUnit": "swings",
    "fever.stage": "RECOGNITION Lv.{level}",
    "result.title": "Live Results",
    "result.scoreLabel": "Total Score",
    "result.levelLabel": "Ota Level",
    "result.successLabel": "Matches",
    "result.responsesLabel": "Responses",
    "share.button": "Share on X",
    "share.note": "Add a screenshot to make it shine brighter!✨",
    "history.title": "Recent Scores",
    "history.empty": "Play once to record your first score!",
    "history.pointsUnit": "pts",
    "toast.glitch": "Button malfunction! Tap rapidly to fix...",
    "toast.match": "Nice! +{points} pts",
    "toast.feverStart": "Appeal Time Start!",
    "toast.feverLevelUp": "RECOGNITION LEVEL UP!",
    "toast.feverEnd": "Appeal Time End!",
    "share.template":
      'Ota Level "{levelName}"! Total score {score}!\nGot {responses} responses from my idol 😭💕 #OshiLightLIVE #IdolLive',
    "penlight.off": "OFF",
      "transition.resultTitle": "RESULT!!",
      "transition.resultSubtitle": "What’s Your Ota Level??",
  },
  ko: {
    "hero.title": "오시 라이트 LIVE!!",
    "hero.subtitle": "응원봉을 맞추고 오시의 레스를 잡아라!🔥",
    "top.start": "게임 시작",
    "top.howto": "조작 안내",
    "top.ranking": "랭킹 보기 (준비 중)",
    "settings.title": "난이도 · 설정",
    "mode.easy.title": "🔰EASY",
    "mode.easy.desc": "+6점 / 색상 예시가 있는 연습 모드!",
    "mode.normal.title": "⚡NORMAL",
    "mode.normal.desc": "+10점 / 색 순서를 외우고 진짜 승부!",
    "mode.hard.title": "🔥HARD",
    "mode.hard.desc": "+13점 / 버튼 오류를 뚫고 최고 점수 도전!",
    "howto.title": "플레이 방법",
    "howto.step1": "시작 후 상단의 목표 색을 확인하세요.",
    "howto.step2": "좌우 버튼으로 펜라이트를 돌려 색을 맞춥니다.",
    "howto.step3": "2초 안에 3회 연속 성공 시 피버 타임 진입!",
    "howto.step4": "피버 중에는 좌우 스와이프로 포인트와 레스를 모으세요.",
    "howto.imageNote": "조작 설명 이미지는 추후 교체 예정",
    "hud.scoreLabel": "스코어",
    "hud.successLabel": "성공 횟수",
    "hud.timeLabel": "남은 시간",
    "target.title": "TARGET COLOR",
    "controls.turnLeft": "왼쪽 회전",
    "controls.turnRight": "오른쪽 회전",
    "play.showResult": "종료하기",
    "play.pause": "중단하기",
    "play.resume": "재개하기",
    "play.retry": "다시 플레이",
    "play.toTop": "처음으로 돌아가기",
    "fever.title": "어필 타임!",
    "fever.message": "응원봉을 힘껏 흔들어서 폭레스를 받아라!",
    "fever.swipe": "좌우로 스와이프!",
    "fever.timerUnit": "초",
    "fever.countUnit": "회",
    "fever.stage": "인지도 Lv.{level}",
    "result.title": "라이브 결과",
    "result.scoreLabel": "토탈 스코어",
    "result.levelLabel": "오타 레벨",
    "result.successLabel": "성공 횟수",
    "result.responsesLabel": "레스 획득수",
    "share.button": "X에 공유",
    "share.note": "스크린샷을 첨부하면 더 빛나요!✨",
    "history.title": "최근 스코어",
    "history.empty": "첫 플레이를 기록해보자!",
    "history.pointsUnit": "점",
    "toast.glitch": "버튼이 고장났어! 연타해서 복구하자…",
    "toast.match": "좋아! +{points}점",
    "toast.feverStart": "어필타임 시작!",
    "toast.feverLevelUp": "인지도 레벨업!",
    "toast.feverEnd": "어필타임 끝!",
    "share.template":
      '오타쿠 레벨 "{levelName}"! 토탈 스코어 {score}!\n{responses}번 오시에게서 레스를 받았어 😭💕 #오시라이트LIVE #아이돌라이브',
    "penlight.off": "OFF",
      "transition.resultTitle": "결과 발표✨",
      "transition.resultSubtitle": "당신의 오타 레벨은??",
  },
};

const supportedLanguages = Object.keys(translations);
let langButtons = [];
let currentLang = (() => {
  try {
    const stored = localStorage.getItem("oshiLang");
    if (stored && supportedLanguages.includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn("Language preference read failed:", error);
  }
  return "ja";
})();

const translateTemplate = (template, params = {}) =>
  template.replace(/\{(\w+)\}/g, (_, key) =>
    Object.prototype.hasOwnProperty.call(params, key) ? params[key] : `{${key}}`
  );

const t = (key, params = {}) => {
  const langPack = translations[currentLang] || translations.ja;
  const fallback = translations.ja || {};
  const template = langPack[key] ?? fallback[key] ?? key;
  return translateTemplate(template, params);
};

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

const deepClone = (value) => JSON.parse(JSON.stringify(value));

const getLevelInfoByScore = (score) =>
  levelTable.find((entry) => score <= entry.max) || levelTable[levelTable.length - 1];

const getLevelName = (levelInfo, lang = currentLang) => {
  if (!levelInfo) return "";
  if (levelInfo.names && levelInfo.names[lang]) return levelInfo.names[lang];
  if (levelInfo.names && levelInfo.names.ja) return levelInfo.names.ja;
  return levelInfo.name || "";
};

const getLevelNameByKey = (key, lang = currentLang) => {
  const info = levelTable.find((entry) => entry.key === key);
  return getLevelName(info, lang);
};

class GameStore {
  constructor() {
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
        responseStage: 1,
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
    const existingTimer = this.state?.hardGlitch?.timerId;
    if (existingTimer) {
      clearTimeout(existingTimer);
    }
    this.state = deepClone(this.initialState);
    this.state.targetIndex = this.randomTargetIndex();
    this.emit();
  }

  randomTargetIndex() {
    return Math.floor(Math.random() * colors.length);
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
          (workingState.currentIndex + direction + colors.length) % colors.length;
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
    } else if (!glitch.cooling && Math.random() < 0.25) {
      glitch.pendingPresses = Math.floor(Math.random() * 3) + 2;
      glitch.cooling = true;
      skip = true;
      glitch.timerId = setTimeout(() => {
        this.update((s) => ({
          ...s,
          hardGlitch: { ...s.hardGlitch, cooling: false, timerId: null },
        }));
      }, 2000);
      showToast(t("toast.glitch"), "danger");
    }

    return {
      state: { ...state, hardGlitch: glitch },
      skip,
    };
  }

  handleMatch() {
    const { mode } = this.state;
    const points = modeScore[mode] || 0;
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

    flashHudValues();
    flashTargetCard();

    if (!this.state.fever.active) {
      showToast(t("toast.match", { points }), "success", { placement: "stage" });
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
        responseStage: 1,
      },
    }));
    this.clearTimer("main");
    this.startFeverTimer();
    showToast(t("toast.feverStart"), "success");
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
      const swingCount = state.fever.swingCount + 1;
      let { responseStage } = state.fever;
      let score = state.score;
      let responses = state.responses;

      if (swingCount % 10 === 0) {
        score += 10;
        responses += 1;
        responseStage = Math.min(4, responseStage + 1);
        showToast(t("toast.feverLevelUp"), "success");
      }

      return {
        ...state,
        score,
        responses,
        fever: {
          ...state.fever,
          swingCount,
          responseStage,
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
        responseStage: 1,
      },
      streak: 0,
      lastSuccessTimes: [],
    }));
    this.startMainTimer();
    showToast(t("toast.feverEnd"), "success");
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
    screens.showTransition();
    const transitionDuration = 1000;
    const finalizeResult = () => {
      this.update((state) => ({
        ...state,
        isTransitioning: false,
      }));
      screens.showResult(this.state);
      saveHistory(this.state);
    };
    this.transitionTimeout = setTimeout(finalizeResult, transitionDuration);
  }
}

const game = new GameStore();

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
let audioContext = null;

const isResultScreenActive = () => screens && screens.result && !screens.result.hidden;

const handleHeroClick = () => {
  if (!isResultScreenActive()) return;
  screens.showTop();
};

const handleHeroKeydown = (event) => {
  if (!isResultScreenActive()) return;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
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
  updatePauseButtonLabel(state.paused);
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
  updateCountdownEffects(state.timeLeft);
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

  applyPenlightAppearance(feverPenlight, currentColor?.code || null);
  if (!state.fever.active) {
    setFeverPenlightMotion(null);
  }

  targetColor.querySelector(".color-card__swatch").style.background =
    colors[state.targetIndex].code;
  targetColor.querySelector(".color-card__name").textContent =
    colors[state.targetIndex].name;

  easyGuide.hidden = state.mode !== "easy";

  feverLayer.hidden = !state.fever.active;
  const swingLabel = t("fever.countUnit");
  const stageText = t("fever.stage", { level: state.fever.responseStage || 1 });
  feverCount.textContent = `${state.fever.swingCount} ${swingLabel}`;
  feverStage.textContent = stageText;
  if (state.fever.active) {
    feverTime.textContent = state.fever.timeLeft;
  }
  const feverLowTime =
    state.fever?.active && Number.isFinite(state.fever.timeLeft) && state.fever.timeLeft <= 3;
  if (feverTimer) {
    feverTimer.classList.toggle("fever__timer--glow", feverLowTime);
    if (feverLowTime) {
      const feverGlowSpeed = Math.max(
        0.4,
        Math.min(0.6, 0.4 + (state.fever.timeLeft / 10) * 0.2)
      );
      feverTimer.style.setProperty("--fever-glow-speed", `${feverGlowSpeed.toFixed(2)}s`);
    } else {
      feverTimer.style.removeProperty("--fever-glow-speed");
    }
  }
  const feverTimeChanged = lastFeverCountdownTime !== (state.fever?.timeLeft ?? null);
  if (state.fever?.active) {
    if (
      feverTimeChanged &&
      Number.isFinite(state.fever.timeLeft) &&
      state.fever.timeLeft <= 3 &&
      state.fever.timeLeft >= 0
    ) {
      playFeverCountdownChime(state.fever.timeLeft);
    }
    if (feverTimeChanged) {
      lastFeverCountdownTime = state.fever.timeLeft;
    }
  } else {
    lastFeverCountdownTime = null;
  }
}

function flashTargetCard() {
  if (!targetColor) return;
  targetColor.classList.remove("color-card--flash");
  void targetColor.offsetWidth;
  targetColor.classList.add("color-card--flash");
}

function flashHudValues() {
  hudFlashTargets.forEach(({ element, className }) => {
    if (!element) return;
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  });
}

function updateCountdownEffects(timeLeft) {
  if (!hudTimerItem || !hudTime) return;
  const isCountdown = Number.isFinite(timeLeft) && timeLeft <= 10 && timeLeft >= 0;
  hudTimerItem.classList.toggle("is-countdown", isCountdown);
  hudTime.classList.toggle("is-countdown", isCountdown);
}

function updatePauseButtonLabel(isPaused) {
  if (!pauseButton) return;
  const key = isPaused ? "play.resume" : "play.pause";
  pauseButton.textContent = t(key);
  pauseButton.setAttribute("aria-pressed", isPaused ? "true" : "false");
  pauseButton.dataset.state = isPaused ? "resume" : "pause";
}

function populateResult(state) {
  resultScore.textContent = state.score;
  const levelInfo = getLevelInfoByScore(state.score);
  const levelName = getLevelName(levelInfo);
  resultLevel.textContent = levelName;
  resultCard.classList.remove("level-1", "level-2", "level-3");
  if (levelInfo?.levelClass) {
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
    levelKey: levelInfo?.key ?? null,
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
  langButtons.forEach((btn) => {
    const isActive = btn.dataset.lang === currentLang;
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
    if (key === "penlight.off" && game?.state?.currentIndex !== null) {
      return;
    }
    const translation = t(key);
    if (translation !== undefined) {
      node.textContent = translation;
    }
  });
}

function setLanguage(lang) {
  const nextLang = supportedLanguages.includes(lang) ? lang : "ja";
  currentLang = nextLang;
  try {
    localStorage.setItem("oshiLang", nextLang);
  } catch (error) {
    console.warn("Language preference write failed:", error);
  }
  document.documentElement.setAttribute("lang", nextLang);
  applyTranslations();
  updateLangButtons();
  restoreHistory();
  if (game?.state) {
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

function getOrCreateAudioContext() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioContext) {
    audioContext = new AudioCtx();
  }
  return audioContext;
}

function resumeAudioContext() {
  const ctx = getOrCreateAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") {
    ctx.resume().catch((error) => {
      console.warn("AudioContext resume failed:", error);
    });
  }
}

function getCountdownFrequency(timeLeft) {
  if (timeLeft === 0) {
    return 1046;
  }
  return 620 + (10 - timeLeft) * 32;
}

function playCountdownBeep(timeLeft) {
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
}

function playFeverCountdownChime(timeLeft) {
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
}

function bindTapSafeActivation(button, action) {
  if (!button || typeof action !== "function") return;
  let skipNextClick = false;

  const invoke = () => {
    resumeAudioContext();
    action();
  };

  if (window.PointerEvent) {
    button.addEventListener(
      "pointerdown",
      (event) => {
        if (event.pointerType === "touch" || event.pointerType === "pen") {
          event.preventDefault();
          skipNextClick = true;
          invoke();
        } else {
          skipNextClick = false;
        }
      },
      { passive: false }
    );
    button.addEventListener("pointercancel", () => {
      skipNextClick = false;
    });
  } else {
    button.addEventListener(
      "touchstart",
      (event) => {
        event.preventDefault();
        skipNextClick = true;
        invoke();
      },
      { passive: false }
    );
  }

  button.addEventListener("click", () => {
    if (skipNextClick) {
      skipNextClick = false;
      return;
    }
    invoke();
  });
}

function attachEventListeners() {
  document.getElementById("btn-start").addEventListener("click", showScreenPlay);
  document.getElementById("btn-end").addEventListener("click", endGame);
  document.getElementById("btn-retry").addEventListener("click", showScreenPlay);
  document.getElementById("btn-top").addEventListener("click", () => screens.showTop());
  document.getElementById("btn-share").addEventListener("click", shareOnX);
  bindTapSafeActivation(document.getElementById("btn-left"), () => game.rotate(-1));
  bindTapSafeActivation(document.getElementById("btn-right"), () => game.rotate(1));
  if (pauseButton) {
    bindTapSafeActivation(pauseButton, () => game.togglePause());
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
  document.getElementById("btn-howto").addEventListener("click", () => {
    howtoModal.hidden = false;
  });
  document.getElementById("btn-close-howto").addEventListener("click", () => {
    howtoModal.hidden = true;
  });
  howtoModal.addEventListener("click", (e) => {
    if (e.target === howtoModal || e.target.classList.contains("howto-modal__backdrop")) {
      howtoModal.hidden = true;
    }
  });

  if (langButtons.length) {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
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
  setLanguage(currentLang);
  attachEventListeners();
  mountStore();
  screens.showTop();
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

