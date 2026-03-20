/**
 * Back to Top Button - Show/Hide only
 * No scroll manipulation - uses native hash link <a href="#top">
 */

export function initBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');

  if (!backToTopButton) return;

  // Show/hide button based on scroll position
  let ticking = false;
  const scrollThreshold = window.innerWidth <= 768 ? 200 : 400;

  function updateButtonVisibility() {
    const scrollY = window.scrollY || window.pageYOffset;

    if (scrollY > scrollThreshold) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(updateButtonVisibility);
      ticking = true;
    }
  }

  // Event listener
  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial check
  updateButtonVisibility();

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', onScroll);
  };
}
