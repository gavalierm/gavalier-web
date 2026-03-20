/**
 * Centralized Scroll Manager
 * Consolidates all scroll event listeners into a single optimized handler
 * Performance: Single scroll listener instead of multiple, shared RAF
 */

class ScrollManager {
  constructor() {
    this.callbacks = new Set();
    this.ticking = false;
    this.scrollY = 0;
    this.init();
  }

  init() {
    // Single scroll event listener for all callbacks
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });

    // Initial call - defer to avoid forced reflow on page load
    requestAnimationFrame(() => {
      this.scrollY = window.pageYOffset;
      this.executeCallbacks();
    });
  }

  onScroll() {
    this.scrollY = window.pageYOffset;

    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.executeCallbacks();
        this.ticking = false;
      });
      this.ticking = true;
    }
  }

  executeCallbacks() {
    this.callbacks.forEach(callback => {
      try {
        callback(this.scrollY);
      } catch (error) {
        console.error('Scroll callback error:', error);
      }
    });
  }

  /**
   * Register a scroll callback
   * @param {Function} callback - Function to call on scroll, receives scrollY as parameter
   * @returns {Function} Unregister function
   */
  register(callback) {
    if (typeof callback !== 'function') {
      console.warn('ScrollManager: callback must be a function');
      return () => {};
    }

    this.callbacks.add(callback);

    // Return unregister function
    return () => this.unregister(callback);
  }

  /**
   * Unregister a scroll callback
   * @param {Function} callback - Callback to remove
   */
  unregister(callback) {
    this.callbacks.delete(callback);
  }

  /**
   * Get current scroll position
   * @returns {number} Current scrollY position
   */
  getScrollY() {
    return this.scrollY;
  }

  /**
   * Clear all callbacks
   */
  clear() {
    this.callbacks.clear();
  }
}

// Create singleton instance
const scrollManager = new ScrollManager();

export default scrollManager;
