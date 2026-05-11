/**
 * Animation Utilities
 */

export function initLazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');

  if (images.length === 0) return;

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        if (src) {
          img.setAttribute('src', src);
          img.removeAttribute('data-src');
          img.classList.add('loaded');
        }

        observer.unobserve(img);
      }
    });
  }, {
    root: null,
    rootMargin: '50px',
    threshold: 0.01
  });

  images.forEach(image => {
    imageObserver.observe(image);
  });
}
