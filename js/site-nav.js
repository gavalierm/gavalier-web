/**
 * Site Navigation
 * - mobil: hamburger + celoobrazovkový panel (#siteNav)
 * - desktop: rozbaľovací panel Služby (.site-menu__trigger + #servicesPanel)
 * Standalone (no ES module) so it works on file:// origin too.
 */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia ? window.matchMedia('(min-width: 1024px)') : null;

  /* ---------- Mobilný panel ---------- */
  var toggle = document.getElementById('menuToggle');
  var nav = document.getElementById('siteNav');
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

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      if (isOpen) { close(); } else { open(); }
    });

    // Odkaz v paneli: nechaj skok prebehnúť a zavri panel
    nav.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href]') : null;
      if (link) close();
    });

    // Anything that changes the hash from outside the panel should close it too
    window.addEventListener('hashchange', close);
  }

  /* ---------- Desktopový panel Služby ---------- */
  var trigger = document.getElementById('servicesToggle');
  var panel = document.getElementById('servicesPanel');
  var panelOpen = false;
  var hoverTimer = null;
  var openedByHover = false;

  function openPanel() {
    if (panelOpen || !trigger || !panel) return;
    clearTimeout(hoverTimer);
    panelOpen = true;
    panel.hidden = false;
    void panel.offsetWidth;
    panel.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  function closePanel() {
    if (!panelOpen) return;
    openedByHover = false;
    clearTimeout(hoverTimer);
    panelOpen = false;
    panel.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    var done = function () {
      if (!panelOpen) panel.hidden = true;
      panel.removeEventListener('transitionend', done);
    };
    panel.addEventListener('transitionend', done);
    setTimeout(done, 250);
  }

  if (trigger && panel) {
    var item = trigger.parentNode;

    trigger.addEventListener('click', function () {
      // Panel otvorený hoverom a hneď klik: nechaj ho otvorený (inak by klik myšou panel zavrel)
      if (panelOpen && openedByHover) { openedByHover = false; return; }
      if (panelOpen) { closePanel(); } else { openPanel(); }
    });

    // Klávesnica: šípka dole otvorí panel a presunie fokus na prvý odkaz
    trigger.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openPanel();
        var first = panel.querySelector('a[href]');
        if (first) first.focus();
      }
    });

    // Hover (iba myš): otvor po vstupe, zatvor s malým oneskorením po odchode
    function onEnter(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer);
      if (!panelOpen) { openPanel(); openedByHover = true; }
    }
    function onLeave(e) {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(closePanel, 150);
    }
    item.addEventListener('pointerenter', onEnter);
    item.addEventListener('pointerleave', onLeave);

    // Fokus odišiel mimo položky: zatvor
    item.addEventListener('focusout', function (e) {
      var next = e.relatedTarget;
      if (next && item.contains(next)) return;
      if (!next) return; // klik do prázdna rieši handler nižšie
      closePanel();
    });

    // Klik mimo zatvorí
    document.addEventListener('click', function (e) {
      if (panelOpen && !item.contains(e.target)) closePanel();
    });

    // Odkaz v paneli zatvorí panel (skok na kotvu na tej istej stránke)
    panel.addEventListener('click', function (e) {
      var link = e.target.closest ? e.target.closest('a[href]') : null;
      if (link) closePanel();
    });
  }

  /* ---------- Spoločné ---------- */
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (isOpen) {
      close();
      if (toggle) toggle.focus();
    } else if (panelOpen) {
      closePanel();
      if (trigger) trigger.focus();
    }
  });

  // Po zväčšení okna na desktop zavri mobilný panel
  if (DESKTOP && DESKTOP.addEventListener) {
    DESKTOP.addEventListener('change', function (e) {
      if (e.matches) close(); else closePanel();
    });
  }
})();
