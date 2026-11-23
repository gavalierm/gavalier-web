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

  // Fotka (oko) v hlavičke sa ukáže, až keď je portrét v hero mimo obrazovky.
  // Stránka bez hero (podstránky) ju má viditeľnú stále.
  var hero = document.querySelector('.hero__top') || document.querySelector('.hero');
  if (!hero || !('IntersectionObserver' in window)) return;

  header.classList.add('has-hero');
  var headerH = header.offsetHeight || 64;
  new IntersectionObserver(function (entries) {
    header.classList.toggle('hero-out', !entries[0].isIntersecting);
  }, { rootMargin: '-' + headerH + 'px 0px 0px 0px' }).observe(hero);
})();
