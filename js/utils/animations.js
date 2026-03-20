/**
 * Animation Utilities
 * Handles scroll-triggered animations using Intersection Observer
 */

import scrollManager from './scroll-manager.js';

// Intersection Observer options
const observerOptions = {
  root: null,
  rootMargin: '0px 0px 300px 0px', // Trigger 300px before element enters viewport
  threshold: 0
};

// Reveal elements on scroll - DISABLED: Show all elements immediately
export function initRevealOnScroll() {
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  // Simply add reveal--visible class to all elements immediately
  // No animations, no Intersection Observer
  revealElements.forEach(element => {
    element.classList.add('reveal--visible');
  });
}

// Lazy load images
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

// Parallax effect for hero background
export function initParallax() {
  const parallaxElements = document.querySelectorAll('.parallax');

  if (parallaxElements.length === 0) return;

  const updateParallax = (scrollY) => {
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.5;
      const yPos = -(scrollY * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  };

  // Register with scroll manager
  scrollManager.register(updateParallax);
}

// Counter animation
export function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      element.textContent = Math.ceil(current);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Animate counters when they come into view - DISABLED: Show numbers immediately
export function initCounterAnimations() {
  // Do nothing - counter animations disabled, numbers show immediately
  return;
}

// Stagger animation for lists - DISABLED: No stagger delays
export function initStaggerAnimations() {
  // Do nothing - stagger animations disabled
  return;
}

// Add animation class on element
export function addAnimation(element, animationClass) {
  if (!element) return;

  element.classList.add(animationClass);

  // Remove class after animation ends
  element.addEventListener('animationend', () => {
    element.classList.remove(animationClass);
  }, { once: true });
}

// Fade in element
export function fadeIn(element, duration = 300) {
  if (!element) return;

  element.style.opacity = 0;
  element.style.display = 'block';

  let opacity = 0;
  const increment = 16 / duration;

  const fade = () => {
    opacity += increment;

    if (opacity < 1) {
      element.style.opacity = opacity;
      requestAnimationFrame(fade);
    } else {
      element.style.opacity = 1;
    }
  };

  fade();
}

// Fade out element
export function fadeOut(element, duration = 300) {
  if (!element) return;

  let opacity = 1;
  const decrement = 16 / duration;

  const fade = () => {
    opacity -= decrement;

    if (opacity > 0) {
      element.style.opacity = opacity;
      requestAnimationFrame(fade);
    } else {
      element.style.opacity = 0;
      element.style.display = 'none';
    }
  };

  fade();
}

// Slide down element
export function slideDown(element, duration = 300) {
  if (!element) return;

  element.style.overflow = 'hidden';
  element.style.height = '0';
  element.style.display = 'block';

  const targetHeight = element.scrollHeight;
  let height = 0;
  const increment = targetHeight / (duration / 16);

  const slide = () => {
    height += increment;

    if (height < targetHeight) {
      element.style.height = `${height}px`;
      requestAnimationFrame(slide);
    } else {
      element.style.height = '';
      element.style.overflow = '';
    }
  };

  slide();
}

// Slide up element
export function slideUp(element, duration = 300) {
  if (!element) return;

  element.style.overflow = 'hidden';
  let height = element.scrollHeight;
  const decrement = height / (duration / 16);

  const slide = () => {
    height -= decrement;

    if (height > 0) {
      element.style.height = `${height}px`;
      requestAnimationFrame(slide);
    } else {
      element.style.height = '0';
      element.style.display = 'none';
      element.style.overflow = '';
    }
  };

  slide();
}
