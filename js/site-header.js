/**
 * Site Header — hlavička je viditeľná hneď (lepiaca hore).
 * Skript iba pridá triedu is-scrolled (jemný tieň), keď sa stránka posunie.
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  if (!header) return;

  var ticking = false;

  function update() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle('is-scrolled', y > 4);
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
