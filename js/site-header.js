/**
 * Sticky Site Header — shows after scrolling past hero
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  if (!header) return;

  var ticking = false;
  var threshold = window.innerWidth <= 768 ? 300 : 500;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (y > threshold) {
      header.classList.add('show');
    } else {
      header.classList.remove('show');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  update();
})();
