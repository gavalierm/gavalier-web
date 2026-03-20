/**
 * Theme Switcher - Light/Dark Mode Toggle
 * Persists user preference in localStorage
 */

class ThemeSwitcher {
  constructor() {
    this.toggleButton = document.getElementById('themeToggle');
    this.currentTheme = this.getStoredTheme() || 'light';
    this.init();
  }

  init() {
    // Apply stored theme immediately
    this.applyTheme(this.currentTheme, false);

    // Add event listener to toggle button
    if (this.toggleButton) {
      this.toggleButton.addEventListener('click', () => this.toggleTheme());
      console.log('✅ Theme switcher initialized');
    } else {
      console.warn('⚠️ Theme toggle button not found');
    }

    // Listen for system theme changes (optional)
    this.watchSystemTheme();
  }

  /**
   * Get stored theme preference from localStorage
   */
  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  /**
   * Save theme preference to localStorage
   */
  setStoredTheme(theme) {
    localStorage.setItem('theme', theme);
  }

  /**
   * Get system theme preference
   */
  getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  /**
   * Watch for system theme changes
   */
  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    mediaQuery.addEventListener('change', (e) => {
      // Only apply if user hasn't set a preference
      if (!this.getStoredTheme()) {
        const newTheme = e.matches ? 'light' : 'dark';
        this.applyTheme(newTheme, false);
      }
    });
  }

  /**
   * Apply theme to document
   */
  applyTheme(theme, animate = true) {
    const body = document.body;
    const html = document.documentElement;

    // Add switching animation class
    if (animate && this.toggleButton) {
      this.toggleButton.classList.add('theme-toggle--switching');
      setTimeout(() => {
        this.toggleButton.classList.remove('theme-toggle--switching');
      }, 500);
    }

    // Apply theme class
    if (theme === 'light') {
      body.classList.add('light-theme');
      html.setAttribute('data-theme', 'light');
    } else {
      body.classList.remove('light-theme');
      html.setAttribute('data-theme', 'dark');
    }

    // Update meta theme-color for browser UI
    this.updateMetaThemeColor(theme);

    // Update current theme
    this.currentTheme = theme;

    console.log(`✅ Theme applied: ${theme}`);
  }

  /**
   * Update meta theme-color tag for browser UI
   */
  updateMetaThemeColor(theme) {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'light' ? '#FAFAFA' : '#007AFF');
    }
  }

  /**
   * Toggle between light and dark theme
   */
  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme, true);
    this.setStoredTheme(newTheme);
  }

  /**
   * Manually set theme
   */
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      console.error('Invalid theme:', theme);
      return;
    }
    this.applyTheme(theme, true);
    this.setStoredTheme(theme);
  }

  /**
   * Get current active theme
   */
  getTheme() {
    return this.currentTheme;
  }
}

/**
 * Initialize theme switcher
 */
export function initThemeSwitcher() {
  return new ThemeSwitcher();
}
