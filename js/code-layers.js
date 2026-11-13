/* ========================================
   Kód pod povrchom (D-0013, D-0014)
   - 3D vrstvy hero: nad fotkou sa hero rozloží na vrstvy UI / CSS / HTML,
     prejdenie na spodnú vrstvu ju vytiahne hore, po odchode kurzora sa hero
     zloží naplocho do vrstvy, ktorá je navrchu.
   - Dešifrovanie nadpisov: písmená pri kurzore sa prepisujú na znaky kódu.
   Výkon: animujú sa iba transform a opacity, rozmery sa nečítajú v každom snímku.
   ======================================== */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const heroEl = document.querySelector('#hero');
  const HERO_SRC = heroEl ? heroEl.outerHTML.replace(/^ {4}/gm, '') : '';

  // spoločný kurzor a slučka
  const ptr = { x: -9999, y: -9999, t: -1e9 };
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    ptr.x = e.clientX; ptr.y = e.clientY; ptr.t = performance.now();
  }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { ptr.x = ptr.y = -9999; });
  const live = now => fine && now - ptr.t < 4000;
  const tickers = [];
  const loop = now => { for (const f of tickers) f(now); requestAnimationFrame(loop); };
  const ease = (v, target, dt, tau, eps = .002) => (Math.abs(target - v) < eps ? target : v + (target - v) * (1 - Math.exp(-dt / tau)));

  // kód hero kreslený na canvas: text nie je v DOM, vyhľadávač ho nečíta ako obsah stránky
  const TOKEN = /(<!--[\s\S]*?-->)|("[^"\n]*")|(<\/?[\w-]+|\/?>)|([\w-]+)(?==)|(\b\d[\d.]*(?:px|w)?\b)/g;
  const COLORS = ['#5c6773', '#a5e075', '#5aa9ff', '#c792ea', '#f78c6c'];
  function drawCode(cv, src) {
    const r = cv.getBoundingClientRect();
    if (!r.width) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
    const g = cv.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.font = '500 13px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    g.textBaseline = 'top';
    let y = 64;
    for (const line of src.split('\n')) {
      if (y > r.height) break;
      let x = Math.max(24, r.width * .05), last = 0, m;
      const put = (t, c) => { g.fillStyle = c; g.fillText(t, x, y); x += g.measureText(t).width; };
      TOKEN.lastIndex = 0;
      while ((m = TOKEN.exec(line))) {
        if (!m[0]) { TOKEN.lastIndex++; continue; }
        if (m.index > last) put(line.slice(last, m.index), '#c9d4e3');
        put(m[0], COLORS[m.slice(1).findIndex(v => v !== undefined)]);
        last = m.index + m[0].length;
      }
      if (last < line.length) put(line.slice(last), '#c9d4e3');
      y += 21;
    }
  }

  /* ---------- 3D vrstvy hero ---------- */
  function layers3d() {
    const top = document.querySelector('.hero__top');
    if (!top) return;
    const hintText = fine ? '&lt;/&gt; prejdi myšou po fotke' : '&lt;/&gt; ťukni na fotku';

    const ui = document.createElement('div');
    ui.className = 'cl-ui';
    while (top.firstChild) ui.appendChild(top.firstChild);

    // CSS vrstva: výkres toho istého hero, bez nadpisov (žiadny druhý h1)
    const css = document.createElement('div');
    css.className = 'cl-plane cl-css';
    css.setAttribute('aria-hidden', 'true');
    const wire = ui.cloneNode(true);
    wire.classList.add('cl-wire');
    wire.querySelectorAll('h1, p').forEach(el => {
      const d = document.createElement('div');
      d.className = el.className; d.innerHTML = el.innerHTML;
      el.replaceWith(d);
    });
    wire.querySelectorAll('img').forEach(img => { img.removeAttribute('fetchpriority'); img.loading = 'lazy'; });
    const label = (sel, txt) => wire.querySelectorAll(sel).forEach(e => e.setAttribute('data-cl', txt));
    label('.hero__byline', 'p.hero__byline');
    label('.hero__title', 'h1.hero__title');
    label('.headline-mark', 'span.headline-mark');
    wire.insertAdjacentHTML('beforeend', '<span class="cl-img-label">img.hero__portrait · 1144×1086</span>');
    css.append(wire);

    // HTML vrstva: skutočný kód hero
    const html = document.createElement('div');
    html.className = 'cl-plane cl-html';
    html.setAttribute('aria-hidden', 'true');
    const code = document.createElement('canvas');
    code.className = 'cl-code';
    html.append(code);

    css.insertAdjacentHTML('beforeend', `<span class="cl-tag">CSS</span><span class="cl-hint">${hintText}</span>`);
    html.insertAdjacentHTML('beforeend', `<span class="cl-tag">HTML</span><span class="cl-hint">${hintText}</span>`);
    ui.insertAdjacentHTML('beforeend', `<span class="cl-tag" aria-hidden="true">UI</span><span class="cl-hint" aria-hidden="true">${hintText}</span>`);

    top.append(html, css, ui);
    top.classList.add('cl-stack');
    top.closest('.hero').classList.add('cl-host');
    drawCode(code, HERO_SRC);

    const portrait = ui.querySelector('.hero__portrait');
    // rozmery v súradniciach stránky, merané iba v pokoji (bez transformácie)
    let box = null, pbox = null;
    const measure = () => {
      const r = top.getBoundingClientRect(), p = portrait.getBoundingClientRect();
      box = { l: r.left + scrollX, t: r.top + scrollY, w: r.width, h: r.height };
      pbox = { l: p.left + scrollX, t: p.top + scrollY, r: p.right + scrollX, b: p.bottom + scrollY };
    };
    measure();
    let rt;
    addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { if (flat) measure(); drawCode(code, HERO_SRC); }, 150); });
    addEventListener('load', () => { if (flat) measure(); });
    const inBox = (b, x, y, pad = 0) => {
      const px = x + scrollX, py = y + scrollY;
      return px >= b.l - pad && px <= (b.r ?? b.l + b.w) + pad && py >= b.t - pad && py <= (b.b ?? b.t + b.h) + pad;
    };

    // poradie vrstiev zdola nahor; prejdenie na spodnú vrstvu ju vytiahne hore (cyklus)
    const planes = [html, css, ui];
    let order = [html, css, ui];
    const z = new Map(planes.map(p => [p, 0]));
    const planeAt = (x, y) => {
      const el = document.elementFromPoint(x, y);
      if (!el || !top.contains(el)) return null;
      return el.closest('.cl-plane') || (el.closest('.cl-ui') === ui ? ui : null);
    };
    const cycleTo = p => {
      while (order[order.length - 1] !== p) order = [order[order.length - 1], ...order.slice(0, -1)];
      planes.forEach(q => q.classList.toggle('is-top', q === p));
    };

    const DWELL = 300, GRACE = 500;
    let s = 0, tx = 0, ty = 0, pinned = false, flat = true, open = false;
    let lastKey = '', lastInside = -1e9, hover = null, hoverSince = 0, cooldown = 0, prev = 0;
    const t0 = performance.now();
    const setOpen = on => { if (on !== open) { open = on; top.classList.toggle('is-open', on); } };
    ui.classList.add('is-top');
    // navrchu je vždy plná vrstva, ostatné podľa rozloženia (v pokoji skryté)
    const fade = () => planes.forEach(p => { p.style.opacity = p === order[2] ? '1' : Math.min(1, s * 5).toFixed(3); });
    fade();

    top.addEventListener('click', e => {
      if (open) {
        const p = planeAt(e.clientX, e.clientY);
        if (p && p !== order[2]) { cycleTo(p); cooldown = performance.now() + 500; hover = null; return; }
      }
      if (!fine && inBox(pbox, e.clientX, e.clientY)) pinned = !pinned; // dotyk: ťuknutie na fotku otvorí a zavrie
    });

    tickers.push(now => {
      const dt = Math.min(100, prev ? now - prev : 16); prev = now; // podľa času, nie počtu snímok
      if (scrollY > box.t + box.h) return;
      const on = live(now), mouse = fine && ptr.t > 0;

      // otvorí sa nad fotkou, otvorené ostane, kým je kurzor nad hero (+ GRACE ms)
      if (mouse && (open ? inBox(box, ptr.x, ptr.y, 40) : on && inBox(pbox, ptr.x, ptr.y))) lastInside = now;
      let target = pinned || now - lastInside < GRACE ? 1 : 0;
      if (!reduce && now - t0 > 900 && now - t0 < 2600) target = 1; // ukážka pri načítaní

      // spodná vrstva pod kurzorom sa vytiahne hore, keď na nej kurzor chvíľu postojí
      const key = `${ptr.x},${ptr.y}`;
      if (open && s > .9 && mouse && key !== lastKey) {
        const p = planeAt(ptr.x, ptr.y);
        if (p !== hover) { hover = p; hoverSince = now; }
      }
      lastKey = key;
      if (hover && hover !== order[2] && open && now - hoverSince > DWELL && now > cooldown) { cycleTo(hover); cooldown = now + 500; hover = null; }

      const mxT = on && target ? (ptr.x + scrollX - box.l) / box.w - .5 : 0;
      const myT = on && target ? (ptr.y + scrollY - box.t) / box.h - .5 : 0;
      const zt = p => (order.indexOf(p) - 1) * 130 * s;
      const waiting = hover && hover !== order[2] && open;
      const settled = s === target && tx === mxT && ty === myT && planes.every(p => z.get(p) === zt(p));
      if (settled && !waiting) {
        if (target === 0 && !flat) {
          planes.forEach(p => { p.style.transform = ''; });
          top.style.transform = ''; fade();
          setOpen(false); flat = true; hover = null; measure();
        }
        return;
      }
      flat = false;
      s = reduce ? target : ease(s, target, dt, target ? 240 : 220, .01);
      tx = reduce ? mxT : ease(tx, mxT, dt, 180);
      ty = reduce ? myT : ease(ty, myT, dt, 180);
      setOpen(s > .01);
      top.style.transform = `scale(${1 - .14 * s}) rotateX(${(28 - ty * 10) * s}deg) rotateY(${tx * 10 * s}deg) rotateZ(${(-7 + tx * 5) * s}deg)`;
      planes.forEach(p => {
        const zc = reduce ? zt(p) : ease(z.get(p), zt(p), dt, 200, .3);
        z.set(p, zc); p.style.transform = `translateZ(${zc.toFixed(1)}px)`;
      });
      fade();
    });
  }

  /* ---------- Dešifrovanie nadpisov ---------- */
  function scramble() {
    const G = '01<>/{}[];=$#_*+:&|~';
    const heads = [...document.querySelectorAll('.hero__title, .section-lead__headline')].filter(h => !h.closest('.cl-css'));
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
          word.className = 'cl-w'; word.setAttribute('aria-hidden', 'true');
          for (const c of part) {
            const s = document.createElement('span'); s.className = 'cl-ch'; s.textContent = c;
            word.appendChild(s); chs.push({ s, x: 0, y: 0, hot: false, until: 0 });
          }
          f.appendChild(word);
        }
        n.replaceWith(f);
      });
      all.push({ h, chs, vis: false, revealed: false, size: 40 });
    });

    // iba polohy pre vzdialenosť od kurzora; rozloženie sa nemení (znak kódu je ::after nad písmenom)
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
    if (document.fonts) document.fonts.ready.then(measure);
    addEventListener('load', measure);
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

  layers3d();
  scramble();
  requestAnimationFrame(loop);
})();
