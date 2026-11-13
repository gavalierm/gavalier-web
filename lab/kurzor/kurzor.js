/* ========================================
   Laboratórium: efekty podľa kurzora (prototyp, nie je súčasťou webu)
   ?fx=3d,scramble
   ======================================== */
(() => {
  const params = new URLSearchParams(location.search);
  const fx = (params.get('fx') ?? '3d,scramble').split(',').filter(Boolean);
  const has = f => fx.includes(f);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // zdroj hero pred akoukoľvek úpravou
  const heroEl = document.querySelector('#hero');
  const HERO_SRC = heroEl ? heroEl.outerHTML : '';

  const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const hl = s => esc(s).replace(
    /(&lt;!--[\s\S]*?--&gt;)|("[^"\n]*")|(&lt;\/?[\w-]+|\/?&gt;)|([\w-]+)(?==)|(\b\d[\d.]*(?:px|w)?\b)/g,
    (m, c, str, tag, attr, num) =>
      c ? `<i class="c">${c}</i>` : str ? `<i class="s">${str}</i>` : tag ? `<i class="t">${tag}</i>` :
      attr ? `<i class="a">${attr}</i>` : `<i class="n">${num}</i>`);

  // spoločný kurzor a slučka
  const ptr = { x: -9999, y: -9999, t: -1e9 };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.t = performance.now();
  }, { passive: true });
  const live = now => fine && now - ptr.t < 4000;
  const tickers = [];
  const loop = now => { for (const f of tickers) f(now); requestAnimationFrame(loop); };

  /* ---------- 07 Vrstvy v 3D ----------
     Výkon: počas animácie sa menia iba transform a opacity na vrstvách
     s vlastnou kompozičnou vrstvou (will-change), nič sa neprekresľuje.
     Rozmery sa nečítajú v každom snímku, iba v pokoji, pri scrolle a zmene veľkosti. */
  function layers3d() {
    const top = document.querySelector('.hero__top');
    if (!top) return;
    const ui = document.createElement('div');
    ui.className = 'lab3d-ui';
    while (top.firstChild) ui.appendChild(top.firstChild);

    const css = document.createElement('div');
    css.className = 'lab3d-plane lab3d-css';
    const wire = ui.cloneNode(true);
    wire.classList.add('lab-wire');
    wire.setAttribute('aria-hidden', 'true');
    const label = (sel, txt) => wire.querySelectorAll(sel).forEach(e => e.setAttribute('data-lab', txt));
    label('.hero__byline', 'p.hero__byline');
    label('.hero__title', 'h1.hero__title');
    label('.headline-mark', 'span.headline-mark');
    wire.insertAdjacentHTML('beforeend', '<span class="lab-img-label">img.hero__portrait · 1144×1086</span>');
    css.append(wire);

    const html = document.createElement('div');
    html.className = 'lab3d-plane lab3d-html lab-code';
    html.setAttribute('aria-hidden', 'true');
    html.innerHTML = `<pre>${hl(HERO_SRC.replace(/^ {4}/gm, ''))}</pre>`;

    css.insertAdjacentHTML('beforeend', '<span class="lab3d-tag">CSS</span>');
    html.insertAdjacentHTML('beforeend', '<span class="lab3d-tag">HTML</span>');
    ui.insertAdjacentHTML('beforeend', `<span class="lab3d-tag">UI</span><span class="lab3d-hint">${fine ? '&lt;/&gt; prejdi myšou po fotke' : '&lt;/&gt; ťukni na fotku'}</span>`);

    top.append(html, css, ui);
    top.classList.add('lab3d');
    top.closest('.hero').classList.add('lab3d-host');

    const portrait = ui.querySelector('.hero__portrait');
    // rozmery v súradniciach stránky, merané iba v pokoji (bez transformácie)
    let box = null, pbox = null;
    const measure = () => {
      const r = top.getBoundingClientRect(), p = portrait.getBoundingClientRect();
      box = { l: r.left + scrollX, t: r.top + scrollY, w: r.width, h: r.height };
      pbox = { l: p.left + scrollX, t: p.top + scrollY, r: p.right + scrollX, b: p.bottom + scrollY };
    };
    measure();
    addEventListener('resize', () => { if (flat) measure(); });
    addEventListener('load', () => { if (flat) measure(); });
    const overPortrait = (x, y) => {
      const px = x + scrollX, py = y + scrollY;
      return px >= pbox.l && px <= pbox.r && py >= pbox.t && py <= pbox.b;
    };
    top.addEventListener('click', e => { if (overPortrait(e.clientX, e.clientY)) pinned = !pinned; });

    let s = 0, pinned = false, flat = true, open = false, lastKey = '';
    const t0 = performance.now();
    const setOpen = on => { if (on !== open) { open = on; top.classList.toggle('is-open', on); } };

    tickers.push(now => {
      if (scrollY > box.t + box.h) return;
      let target = pinned || (live(now) && overPortrait(ptr.x, ptr.y)) ? 1 : 0;
      if (!reduce && now - t0 > 900 && now - t0 < 2600) target = 1; // ukážka pri načítaní
      const settled = Math.abs(target - s) < .002;
      const key = `${ptr.x},${ptr.y}`;
      if (settled && (target === 0 || key === lastKey)) {
        if (target === 0 && !flat) {
          s = 0; top.style.transform = ''; ui.style.transform = ''; html.style.transform = '';
          css.style.opacity = html.style.opacity = ''; setOpen(false); flat = true; measure();
        }
        return;
      }
      lastKey = key; flat = false;
      s = reduce ? target : s + (target - s) * .08;
      setOpen(s > .01);
      const mx = live(now) ? (ptr.x + scrollX - box.l) / box.w - .5 : 0;
      const my = live(now) ? (ptr.y + scrollY - box.t) / box.h - .5 : 0;
      top.style.transform = `scale(${1 - .14 * s}) rotateX(${(28 - my * 10) * s}deg) rotateY(${mx * 10 * s}deg) rotateZ(${(-7 + mx * 5) * s}deg)`;
      ui.style.transform = `translateZ(${130 * s}px)`;
      html.style.transform = `translateZ(${-130 * s}px)`;
      css.style.opacity = html.style.opacity = Math.min(1, s * 6).toFixed(3);
    });
  }

  /* ---------- 04 Dešifrovanie ---------- */
  function scramble() {
    const G = '01<>/{}[];=$#_*+:&|~';
    const heads = [...document.querySelectorAll('.hero__title, .section-lead__headline')].filter(h => !h.closest('.lab3d-css'));
    const all = [];
    heads.forEach(h => {
      h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
      const chs = [];
      const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodes = [];
      while (w.nextNode()) nodes.push(w.currentNode);
      nodes.forEach(n => {
        const f = document.createDocumentFragment();
        for (const part of n.textContent.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) { f.appendChild(document.createTextNode(part)); continue; }
          const word = document.createElement('span');
          word.className = 'lab-w'; word.setAttribute('aria-hidden', 'true');
          for (const c of part) {
            const s = document.createElement('span'); s.className = 'lab-ch'; s.textContent = c;
            word.appendChild(s); chs.push({ s, c, x: 0, y: 0, w: 0, hot: false, until: 0 });
          }
          f.appendChild(word);
        }
        n.replaceWith(f);
      });
      all.push({ h, chs, vis: false, revealed: false, size: 40 });
    });

    function measure() {
      for (const H of all) {
        H.size = parseFloat(getComputedStyle(H.h).fontSize);
        for (const o of H.chs) { o.s.textContent = o.c; o.s.classList.remove('is-hot'); o.hot = false; o.s.style.width = ''; }
        for (const o of H.chs) {
          const r = o.s.getBoundingClientRect();
          o.w = r.width; o.x = r.left + scrollX + r.width / 2; o.y = r.top + scrollY + r.height / 2;
        }
        for (const o of H.chs) o.s.style.width = o.w + 'px';
      }
    }
    measure();
    document.fonts && document.fonts.ready.then(measure);
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(measure, 150); });

    const io = new IntersectionObserver(es => es.forEach(e => {
      const H = all.find(a => a.h === e.target); H.vis = e.isIntersecting;
      if (e.isIntersecting && !H.revealed && !reduce) {
        H.revealed = true;
        const now = performance.now();
        H.chs.forEach((o, i) => { o.until = now + 250 + i * 45 + Math.random() * 250; });
      }
    }), { threshold: .6 });
    all.forEach(H => io.observe(H.h));

    const hot = o => { o.s.textContent = G[Math.random() * G.length | 0]; if (!o.hot) { o.hot = true; o.s.classList.add('is-hot'); } };
    const cool = o => { o.hot = false; o.s.textContent = o.c; o.s.classList.remove('is-hot'); };

    tickers.push(now => {
      const px = ptr.x + scrollX, py = ptr.y + scrollY, on = live(now);
      for (const H of all) {
        if (!H.vis) continue;
        const R = Math.max(90, H.size * 1.6);
        for (const o of H.chs) {
          if (o.until > now) { if (!o.hot || Math.random() < .35) hot(o); continue; }
          const d = on ? Math.hypot(o.x - px, o.y - py) : 1e9;
          if (d < R) { if (!o.hot || Math.random() < .1 + (1 - d / R) * .35) hot(o); }
          else if (o.hot && Math.random() < .18) cool(o);
        }
      }
    });
  }

  /* ---------- panel ---------- */
  function panel() {
    const p = document.createElement('aside');
    p.className = 'lab-panel';
    p.innerHTML = `<button class="lab-x" aria-label="Zbaliť">–</button>
      <b>Laboratórium efektov</b><small>Prototyp, na živom webe nie je.</small>
      <label><input type="checkbox" value="3d" ${has('3d') ? 'checked' : ''}> 07 Vrstvy v 3D (hero)</label>
      <label><input type="checkbox" value="scramble" ${has('scramble') ? 'checked' : ''}> 04 Dešifrovanie nadpisov</label>`;
    document.body.append(p);
    p.querySelector('.lab-x').addEventListener('click', () => p.classList.toggle('is-min'));
    p.addEventListener('change', () => {
      const list = [...p.querySelectorAll('input[type=checkbox]:checked')].map(i => i.value);
      location.search = '?fx=' + (list.join(',') || 'none');
    });
  }

  if (has('3d')) layers3d();
  if (has('scramble')) scramble();
  panel();
  requestAnimationFrame(loop);
})();
