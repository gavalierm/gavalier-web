/**
 * Theme Switcher — Light/Dark Mode Toggle
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var btn = document.getElementById('themeToggle');
  var html = document.documentElement;
  var body = document.body;
  var stored;
  try { stored = localStorage.getItem('theme'); } catch (e) {}
  var theme = stored || 'light';

  function apply(t) {
    if (t === 'light') {
      body.classList.add('light-theme');
      html.setAttribute('data-theme', 'light');
    } else {
      body.classList.remove('light-theme');
      html.setAttribute('data-theme', 'dark');
    }
  }

  apply(theme);

  if (!btn) return;

  btn.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    apply(theme);
    try { localStorage.setItem('theme', theme); } catch (e) {}
  });
})();
