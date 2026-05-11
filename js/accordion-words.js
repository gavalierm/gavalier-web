/**
 * Accordion Per-Word Reveal (standalone, no ES module)
 * Loaded via plain <script> so it works on file:// origin too
 * (ES modules require HTTP origin due to CORS).
 *
 * Preserves inline elements like <strong>, <em>, <a> while wrapping text
 * nodes in word spans.
 */
(function () {
  'use strict';

  var SELECTORS = '.section__content .article__title, .section__content .article__text';

  function wrapTextNode(node, counterRef) {
    var text = node.nodeValue;
    if (!text || !/\S/.test(text)) return;

    var tokens = text.match(/\S+|\s+/g) || [];
    var frag = document.createDocumentFragment();

    tokens.forEach(function (tok) {
      if (/\S/.test(tok)) {
        var span = document.createElement('span');
        span.className = 'word';
        span.style.setProperty('--word-i', counterRef.value);
        span.textContent = tok;
        counterRef.value += 1;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(tok));
      }
    });

    node.parentNode.replaceChild(frag, node);
  }

  function walkAndWrap(node, counterRef) {
    var children = Array.prototype.slice.call(node.childNodes);
    children.forEach(function (child) {
      if (child.nodeType === 3) {
        wrapTextNode(child, counterRef);
      } else if (child.nodeType === 1) {
        walkAndWrap(child, counterRef);
      }
    });
  }

  function wrapWords(el, counterRef) {
    if (el.dataset.wordsWrapped === 'true') return;
    walkAndWrap(el, counterRef);
    el.dataset.wordsWrapped = 'true';
  }

  function replayReveal(details) {
    var words = details.querySelectorAll('.word');
    words.forEach(function (w) { w.classList.remove('word--in'); });
    void details.offsetWidth;
    requestAnimationFrame(function () {
      words.forEach(function (w) { w.classList.add('word--in'); });
    });
  }

  function init() {
    var accordions = document.querySelectorAll('details.section__accordion');
    if (accordions.length === 0) return;

    accordions.forEach(function (details) {
      var counter = { value: 0 };
      details.querySelectorAll(SELECTORS).forEach(function (el) {
        wrapWords(el, counter);
      });

      if (details.open) replayReveal(details);

      details.addEventListener('toggle', function () {
        if (details.open) replayReveal(details);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
