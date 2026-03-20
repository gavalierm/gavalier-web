/**
 * Scroll Utilities
 * Handles smooth scrolling and scroll-related functionality
 */

import scrollManager from './scroll-manager.js';

// REMOVED: All programmatic scroll functions
// Using native browser hash link behavior only

// Get scroll position
export function getScrollPosition() {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
}

// Check if element is in viewport
export function isInViewport(element, offset = 0) {
  if (!element) return false;

  const rect = element.getBoundingClientRect();
  return (
    rect.top >= -offset &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Throttle function for scroll events
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Debounce function for scroll events
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

// Get current section based on scroll position
export function getCurrentSection() {
  const sections = document.querySelectorAll('[data-section]');
  let currentSection = null;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const offset = window.innerHeight / 3;

    if (rect.top <= offset && rect.bottom >= offset) {
      currentSection = section.getAttribute('data-section');
    }
  });

  return currentSection;
}

// Scroll spy - update active navigation based on scroll
export function initScrollSpy() {
  const sections = document.querySelectorAll('[data-section]');
  const navLinks = document.querySelectorAll('.nav__link');

  if (sections.length === 0 || navLinks.length === 0) return;

  let lastUpdate = 0;
  const throttleDelay = 100;

  const updateActiveLink = (scrollY) => {
    const now = Date.now();
    if (now - lastUpdate < throttleDelay) return;
    lastUpdate = now;

    const currentSection = getCurrentSection();

    navLinks.forEach(link => {
      link.classList.remove('nav__link--active');

      const href = link.getAttribute('href');
      if (href && href.includes(currentSection)) {
        link.classList.add('nav__link--active');
      }
    });
  };

  // Register with scroll manager
  scrollManager.register(updateActiveLink);
  updateActiveLink(scrollManager.getScrollY()); // Initial check
}

// REMOVED: initSmoothScroll() - Hash links work natively in browsers
// No JavaScript needed for anchor navigation

// Show/hide header on scroll
export function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const updateHeader = (scrollY) => {
    if (scrollY > 100) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  };

  // Register with scroll manager
  scrollManager.register(updateHeader);
  updateHeader(scrollManager.getScrollY()); // Initial check
}
