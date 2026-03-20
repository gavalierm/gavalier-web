/**
 * Icon Click Animation
 * Simple click animation for ALL floating icons using event delegation
 */

export function initIconClicks() {
  // Event delegation - single listener on document
  document.addEventListener('click', (e) => {
    const icon = e.target.closest('.floating-icon');

    if (icon) {
      // Trigger escape animation
      icon.classList.add('icon-escape-active');

      // Remove class after animation completes (800ms)
      setTimeout(() => {
        icon.classList.remove('icon-escape-active');
      }, 800);
    }
  });
}
