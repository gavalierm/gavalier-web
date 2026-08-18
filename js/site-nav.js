/**
 * Site Navigation — hamburger toggle for the anchor menu.
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  var isOpen = false;

  function open() {
    if (isOpen) return;
    isOpen = true;
    nav.hidden = false;
    // force reflow so the transition runs from the hidden state
    void nav.offsetWidth;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Zavrieť menu');
    document.body.classList.add('nav-open');
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Otvoriť menu');
    document.body.classList.remove('nav-open');

    var done = function () {
      if (!isOpen) nav.hidden = true;
      nav.removeEventListener('transitionend', done);
    };
    nav.addEventListener('transitionend', done);
    // fallback when transitions are disabled (reduced motion)
    setTimeout(done, 300);
  }

  toggle.addEventListener('click', function () {
    if (isOpen) { close(); } else { open(); }
  });

  // Anchor clicked — let the jump happen, then close
  nav.addEventListener('click', function (e) {
    var link = e.target.closest ? e.target.closest('a[href]') : null;
    if (link) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      close();
      toggle.focus();
    }
  });

  // Anything that changes the hash from outside the panel should close it too
  window.addEventListener('hashchange', close);
})();
