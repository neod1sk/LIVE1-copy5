export const bindTapSafeActivation = (button, action, { resumeAudio } = {}) => {
  if (!button || typeof action !== "function") return;
  let skipNextClick = false;

  const invoke = () => {
    if (typeof resumeAudio === "function") {
      resumeAudio();
    }
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
};



