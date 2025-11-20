export const flashTargetCard = (target) => {
  if (!target) return;
  target.classList.remove("color-card--flash");
  requestAnimationFrame(() => {
    target.classList.add("color-card--flash");
  });
};

export const flashHudValues = (hudTargets) => {
  hudTargets.forEach(({ element, className }) => {
    if (!element) return;
    element.classList.remove(className);
    requestAnimationFrame(() => {
      element.classList.add(className);
    });
  });
};



