export const flashTargetCard = (target) => {
  if (!target) return;
  target.classList.remove("color-card--flash");
  void target.offsetWidth;
  target.classList.add("color-card--flash");
};

export const flashHudValues = (hudTargets) => {
  hudTargets.forEach(({ element, className }) => {
    if (!element) return;
    element.classList.remove(className);
    void element.offsetWidth;
    element.classList.add(className);
  });
};

export const updateCountdownEffects = (timerItem, timerValue, timeLeft) => {
  if (!timerItem || !timerValue) return;
  const isCountdown = Number.isFinite(timeLeft) && timeLeft <= 10 && timeLeft >= 0;
  timerItem.classList.toggle("is-countdown", isCountdown);
  timerValue.classList.toggle("is-countdown", isCountdown);
};

export const updatePauseButtonLabel = (button, isPaused, translate) => {
  if (!button) return;
  const key = isPaused ? "play.resume" : "play.pause";
  button.textContent = translate(key);
  button.setAttribute("aria-pressed", isPaused ? "true" : "false");
  button.dataset.state = isPaused ? "resume" : "pause";
};



