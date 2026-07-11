export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const selector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden") && el.offsetParent !== null
  );
}

export function lockBodyScroll() {
  if (typeof document === "undefined") return () => {};

  const originalStyle = window.getComputedStyle(document.body).overflow;
  const originalPadding = window.getComputedStyle(document.body).paddingRight;
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

  document.body.style.overflow = "hidden";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `calc(${originalPadding || '0px'} + ${scrollbarWidth}px)`;
  }

  return () => {
    document.body.style.overflow = originalStyle;
    document.body.style.paddingRight = originalPadding;
  };
}
