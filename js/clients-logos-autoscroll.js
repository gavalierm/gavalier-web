/**
 * Auto-scroll for client logos with step-by-step animation
 * - Jumps by 1-2 logos at a time with ease-in-out
 * - Pauses when user manually scrolls
 * - Resumes after inactivity
 */

(function() {
  'use strict';

  const grid = document.querySelector('.clients-logos__grid');
  if (!grid) return;

  const config = {
    initialDelay: 1500,          // Delay before first auto-scroll (ms)
    scrollInterval: 1600,        // Time between auto-scrolls (ms)
    itemsToScroll: 1,            // Number of logos to scroll each time
    animationDuration: 600,      // Duration of scroll animation (ms)
    pauseDuration: 4000,         // Pause after manual scroll (ms)
    resetThreshold: 0.95         // When to reset to start (95% scrolled)
  };

  let autoScrollTimer = null;
  let userInteractionTimer = null;
  let isAutoScrolling = false;
  let isPausedByUser = false;

  /**
   * Easing function for smooth scroll (ease-in-out)
   */
  function easeInOutCubic(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /**
   * Smooth scroll with custom easing
   */
  function smoothScrollTo(element, targetScroll, duration) {
    const startScroll = element.scrollLeft;
    const distance = targetScroll - startScroll;
    const startTime = performance.now();

    isAutoScrolling = true;

    function animation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      element.scrollLeft = startScroll + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        isAutoScrolling = false;
      }
    }

    requestAnimationFrame(animation);
  }

  /**
   * Calculate scroll amount based on item width
   */
  function getScrollAmount() {
    const item = grid.querySelector('.clients-logos__item');
    if (!item) return 300; // fallback

    const itemWidth = item.offsetWidth;
    const gap = parseInt(getComputedStyle(grid).gap) || 0;

    return (itemWidth + gap) * config.itemsToScroll;
  }

  /**
   * Check if scrolled to end
   */
  function isAtEnd() {
    const scrollPercentage = (grid.scrollLeft + grid.clientWidth) / grid.scrollWidth;
    return scrollPercentage >= config.resetThreshold;
  }

  /**
   * Perform auto-scroll step
   */
  function autoScrollStep() {
    if (isPausedByUser || isAutoScrolling) return;

    // Check if at end, reset to beginning
    if (isAtEnd()) {
      smoothScrollTo(grid, 0, config.animationDuration);
    } else {
      // Scroll forward
      const scrollAmount = getScrollAmount();
      const targetScroll = grid.scrollLeft + scrollAmount;
      smoothScrollTo(grid, targetScroll, config.animationDuration);
    }
  }

  /**
   * Start auto-scroll loop
   */
  function startAutoScroll() {
    stopAutoScroll(); // Clear any existing timer
    autoScrollTimer = setInterval(autoScrollStep, config.scrollInterval);
  }

  /**
   * Stop auto-scroll loop
   */
  function stopAutoScroll() {
    if (autoScrollTimer) {
      clearInterval(autoScrollTimer);
      autoScrollTimer = null;
    }
  }

  /**
   * Handle user scroll - pause auto-scroll
   */
  function handleUserScroll() {
    // Ignore if this is an auto-scroll
    if (isAutoScrolling) return;

    // User is scrolling manually
    isPausedByUser = true;
    stopAutoScroll();

    // Clear existing timer
    if (userInteractionTimer) {
      clearTimeout(userInteractionTimer);
    }

    // Resume auto-scroll after inactivity
    userInteractionTimer = setTimeout(() => {
      isPausedByUser = false;
      startAutoScroll();
    }, config.pauseDuration);
  }

  /**
   * Pause on hover (optional - enhances UX)
   */
  function handleMouseEnter() {
    isPausedByUser = true;
    stopAutoScroll();
  }

  function handleMouseLeave() {
    if (userInteractionTimer) {
      clearTimeout(userInteractionTimer);
    }

    // Resume after short delay
    userInteractionTimer = setTimeout(() => {
      isPausedByUser = false;
      startAutoScroll();
    }, 1000);
  }

  /**
   * Initialize
   */
  function init() {
    // Listen for manual scroll
    grid.addEventListener('scroll', handleUserScroll, { passive: true });

    // Pause on hover (better UX)
    grid.addEventListener('mouseenter', handleMouseEnter);
    grid.addEventListener('mouseleave', handleMouseLeave);

    // Pause on touch/pointer interaction
    grid.addEventListener('touchstart', handleMouseEnter, { passive: true });
    grid.addEventListener('touchend', handleMouseLeave, { passive: true });

    // Perform first scroll after initial delay, then start interval
    setTimeout(() => {
      autoScrollStep();
      startAutoScroll();
    }, config.initialDelay);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    stopAutoScroll();
    if (userInteractionTimer) {
      clearTimeout(userInteractionTimer);
    }
  });

})();
