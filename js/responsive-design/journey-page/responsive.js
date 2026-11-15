(function () {
    const timeline = document.querySelector('.journey-timeline');
    const vecBox   = document.querySelector('.journey-vector');
    const svg      = vecBox && vecBox.querySelector('svg');
    if (!timeline || !svg) return;

    const VB_W  = 20;
    const NUDGE = 0;
    const GAP   = 6;

    const SECTIONS = [
        { cls: 'undergraduate-years', title: '.journey-section > .undergraduate-years > .journey-section-title' },
        { cls: 'school-years',        title: '.journey-section > .school-years > .journey-section-title' }
    ];
    const SUBSECTIONS = ['secondyear', 'firstyear', 'twelvethgrade', 'tenthgrade'].map(cls => ({
        cls, title: '.journey-subsection.' + cls + ' > .journey-subsection-title'
    }));

    const spine = svg.querySelector(':scope > path:not([class])');
    const orig  = new Map();
    svg.querySelectorAll('path').forEach(el => orig.set(el, el.getAttribute('d')));

    const sel = q => svg.querySelector(q);
    const num = (el, a) => parseFloat(el.getAttribute(a));

    function lineCentre(el, svgTop) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const rects = r.getClientRects();
        const box = rects.length ? rects[0] : el.getBoundingClientRect();
        return box.top + box.height / 2 - svgTop + NUDGE;
    }
    function centreRect(el, yc) { if (el) el.setAttribute('y', yc - num(el, 'height') / 2); }
    function leftIn(el) {
        let x = 0;
        while (el && el !== timeline) { x += el.offsetLeft; el = el.offsetParent; }
        return x;
    }
    function moveHLine(el, yc, endX) {
        if (!el) return;
        const m = orig.get(el).match(/M\s*([\d.]+)\s+[\d.]+\s*H\s*([\d.]+)/);
        if (m) el.setAttribute('d', 'M ' + m[1] + ' ' + yc + ' H ' + Math.max(endX, parseFloat(m[1]) + 2));
    }

    function update() {
        if (vecBox.offsetParent === null) return;
        const sr = svg.getBoundingClientRect();
        const s  = sr.width / VB_W;
        if (!s || !sr.height) return;
        svg.setAttribute('viewBox', '0 0 ' + VB_W + ' ' + (sr.height / s));

        let firstY = null, lastY = null;

        SECTIONS.forEach(({ cls, title }) => {
            const t = document.querySelector(title); if (!t) return;
            const yc = lineCentre(t, sr.top) / s;
            centreRect(sel('rect.journey-section-vector.' + cls), yc);
            if (firstY === null) firstY = yc;
        });

        SUBSECTIONS.forEach(({ cls, title }) => {
            const t = document.querySelector(title); if (!t) return;
            const yc = lineCentre(t, sr.top) / s;
            centreRect(sel('rect.journey-subsection-vector.' + cls), yc);
            const endX = (leftIn(t) - vecBox.offsetLeft - GAP) / s;
            moveHLine(sel('path.subsection-path.' + cls), yc, endX);
            const end = sel('rect.subsection-path-end.' + cls);
            if (end) { centreRect(end, yc); end.setAttribute('x', Math.max(endX, 2 + 2) - num(end, 'width') / 2); }
            lastY = yc;
        });

        if (spine && firstY !== null && lastY !== null)
            spine.setAttribute('d', 'M 3.64 ' + firstY + ' L 3.64 ' + lastY);
    }

    let raf = 0;
    const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };

    window.addEventListener('resize', schedule);
    window.addEventListener('load', schedule);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
    if ('ResizeObserver' in window) {
        const ro = new ResizeObserver(schedule);
        ro.observe(timeline);
        document.querySelectorAll('.journey-section-title, .journey-subsection-title, .journey-section-description')
            .forEach(el => ro.observe(el));
    }
    schedule();
})();