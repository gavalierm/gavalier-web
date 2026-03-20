/**
 * Main JavaScript Entry Point
 * Initializes all modules and components
 */

// Critical imports - needed for LCP
import {
  initRevealOnScroll,
  initLazyLoadImages,
  initCounterAnimations,
  initStaggerAnimations
} from './utils/animations.js';

import { initTypewriter } from './utils/typewriter.js';
import { initMagneticElements, initRippleEffect } from './utils/cursor.js';
import { initScrollAnimationPause } from './utils/scroll-animation-pause.js';
import { initIconClicks } from './utils/icon-click.js';
import { initThemeSwitcher } from './utils/theme-switcher.js';

// Non-critical imports will be loaded dynamically
let initScrollSpy;
let initBackToTop;

/**
 * Initialize critical functionality immediately
 */
function initCritical() {
  // Critical animations for LCP
  initRevealOnScroll();
  initLazyLoadImages();
  initCounterAnimations();
  initStaggerAnimations();

  // Critical typewriter effect
  initTypewriter();

  // Magnetic cursor effects - important for UX
  initMagneticElements();
  initRippleEffect();

  // Scroll animation pause - CRITICAL for smooth scroll on macOS
  initScrollAnimationPause();

  // Icon click animations - must be ready immediately for user interaction
  initIconClicks();

  // Theme switcher
  initThemeSwitcher();

  // Contact form
  initContactForm();

  console.log('✅ Critical initialization complete');
}

/**
 * Initialize non-critical functionality with dynamic imports
 */
async function initNonCritical() {
  // Load non-critical modules in parallel
  const [
    scrollModule,
    backToTopModule
  ] = await Promise.all([
    import('./utils/scroll.js'),
    import('./utils/back-to-top.js')
  ]);

  // Initialize scroll spy only (smooth scroll is native browser behavior)
  scrollModule.initScrollSpy();

  // Initialize back to top button visibility (UI only, no scroll manipulation)
  backToTopModule.initBackToTop();

  console.log('✅ Non-critical initialization complete');
}

/**
 * Initialize all functionality
 */
function init() {
  // Initialize critical functionality immediately
  initCritical();

  // Initialize non-critical functionality after a short delay
  requestIdleCallback ? requestIdleCallback(initNonCritical) : setTimeout(initNonCritical, 1);
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Basic validation
    if (!validateForm(data)) {
      return;
    }

    // Clear previous errors
    clearFormErrors();

    try {
      // For now, just show success message (no backend yet)
      // In production, you would send data to a backend or service like EmailJS

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success message
      successMessage.classList.add('form-success--visible');
      form.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove('form-success--visible');
      }, 5000);

      console.log('Form submitted:', data);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Nastala chyba pri odosielaní správy. Skúste to prosím znova.');
    }
  });
}

/**
 * Validate contact form
 */
function validateForm(data) {
  let isValid = true;

  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    showFieldError('name');
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    showFieldError('email');
    isValid = false;
  }

  // Subject validation
  if (!data.subject || data.subject.trim().length < 3) {
    showFieldError('subject');
    isValid = false;
  }

  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    showFieldError('message');
    isValid = false;
  }

  return isValid;
}

/**
 * Show field error
 */
function showFieldError(fieldName) {
  const input = document.getElementById(fieldName);
  if (!input) return;

  const formGroup = input.closest('.form-group');
  if (formGroup) {
    formGroup.classList.add('form-group--error');
  }
}

/**
 * Clear all form errors
 */
function clearFormErrors() {
  const errorGroups = document.querySelectorAll('.form-group--error');
  errorGroups.forEach(group => {
    group.classList.remove('form-group--error');
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// Handle page visibility change (pause animations when tab is hidden)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('Page hidden - pausing animations');
  } else {
    console.log('Page visible - resuming animations');
  }
});
