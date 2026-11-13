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
    const inBox = (b, x, y, pad = 0) => {
      const px = x + scrollX, py = y + scrollY;
      return px >= b.l - pad && px <= (b.r ?? b.l + b.w) + pad && py >= b.t - pad && py <= (b.b ?? b.t + b.h) + pad;
    };

    // poradie vrstiev zdola nahor; prejdenie na vrstvu pod povrchom ju vytiahne hore (cyklus)
    const planes = [html, css, ui];
    let order = [html, css, ui];
    const z = new Map(planes.map(p => [p, 0]));
    let cooldown = 0;
    const planeAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el || !top.contains(el)) return null;
      return el.closest('.lab3d-plane') || (el.closest('.lab3d-ui') === ui ? ui : null);
    };
    const cycleTo = p => {
      while (order[order.length - 1] !== p) order = [order[order.length - 1], ...order.slice(0, -1)];
      planes.forEach(q => q.classList.toggle('is-top', q === p));
    };

    let s = 0, pinned = false, flat = true, open = false, lastKey = '';
    const t0 = performance.now();
    const setOpen = on => { if (on !== open) { open = on; top.classList.toggle('is-open', on); } };

    top.addEventListener('click', e => {
      if (open) {
        const p = planeAt(e.clientX, e.clientY);
        if (p && p !== order[2]) { cycleTo(p); cooldown = performance.now() + 700; pinned = true; return; }
      }
      if (inBox(pbox, e.clientX, e.clientY)) pinned = !pinned;
    });

    tickers.push(now => {
      if (scrollY > box.t + box.h) return;
      const on = live(now);
      // otvorí sa nad portrétom, otvorené ostane, kým je kurzor nad hero
      let target = pinned || (on && (open ? inBox(box, ptr.x, ptr.y, 40) : inBox(pbox, ptr.x, ptr.y))) ? 1 : 0;
      if (!reduce && now - t0 > 900 && now - t0 < 2600) target = 1; // ukážka pri načítaní
      const key = `${ptr.x},${ptr.y}`;
      if (open && s > .9 && on && key !== lastKey && now > cooldown) {
        const p = planeAt(ptr.x, ptr.y);
        if (p && p !== order[2]) { cycleTo(p); cooldown = now + 900; }
      }
      const zt = p => (order.indexOf(p) - 1) * 130 * s;
      const zSettled = planes.every(p => Math.abs(zt(p) - z.get(p)) < .5);
      const settled = Math.abs(target - s) < .002 && zSettled;
      if (settled && (target === 0 || key === lastKey)) {
        if (target === 0 && !flat) {
          s = 0; order = [html, css, ui]; planes.forEach(p => { z.set(p, 0); p.style.transform = ''; p.classList.remove('is-top'); });
          top.style.transform = ''; css.style.opacity = html.style.opacity = '';
          setOpen(false); flat = true; measure();
        }
        return;
      }
      lastKey = key; flat = false;
      s = reduce ? target : s + (target - s) * .08;
      setOpen(s > .01);
      const mx = on ? (ptr.x + scrollX - box.l) / box.w - .5 : 0;
      const my = on ? (ptr.y + scrollY - box.t) / box.h - .5 : 0;
      top.style.transform = `scale(${1 - .14 * s}) rotateX(${(28 - my * 10) * s}deg) rotateY(${mx * 10 * s}deg) rotateZ(${(-7 + mx * 5) * s}deg)`;
      planes.forEach(p => {
        const zc = reduce ? zt(p) : z.get(p) + (zt(p) - z.get(p)) * .12;
        z.set(p, zc); p.style.transform = `translateZ(${zc.toFixed(1)}px)`;
      });
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

    // iba polohy pre vzdialenosť od kurzora; rozloženie sa nemení (znak kódu je ::after nad pôvodným písmenom)
    function measure() {
      for (const H of all) {
        H.size = parseFloat(getComputedStyle(H.h).fontSize);
        for (const o of H.chs) {
          const r = o.s.getBoundingClientRect();
          o.x = r.left + scrollX + r.width / 2; o.y = r.top + scrollY + r.height / 2;
        }
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

    const hot = o => { o.s.dataset.g = G[Math.random() * G.length | 0]; if (!o.hot) { o.hot = true; o.s.classList.add('is-hot'); } };
    const cool = o => { o.hot = false; o.s.classList.remove('is-hot'); };

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
