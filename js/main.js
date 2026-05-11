/**
 * Main JavaScript Entry Point
 */

import { initLazyLoadImages } from './utils/animations.js';
import { initMagneticElements, initRippleEffect } from './utils/cursor.js';
import { initScrollAnimationPause } from './utils/scroll-animation-pause.js';
import { initThemeSwitcher } from './utils/theme-switcher.js';

function initCritical() {
  initLazyLoadImages();
  initMagneticElements();
  initRippleEffect();
  initScrollAnimationPause();
  initThemeSwitcher();
}

async function initNonCritical() {
  const [scrollModule, backToTopModule] = await Promise.all([
    import('./utils/scroll.js'),
    import('./utils/back-to-top.js')
  ]);

  scrollModule.initScrollSpy();
  backToTopModule.initBackToTop();
}

function init() {
  initCritical();
  requestIdleCallback ? requestIdleCallback(initNonCritical) : setTimeout(initNonCritical, 1);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
