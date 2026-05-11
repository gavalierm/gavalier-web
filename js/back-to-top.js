/**
 * Back to Top Button — Show/Hide
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var btn = document.querySelector('.back-to-top');
  if (!btn) return;

  var ticking = false;
  var threshold = window.innerWidth <= 768 ? 200 : 400;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    if (y > threshold) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
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
