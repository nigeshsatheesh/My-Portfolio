const descriptionClampQuery = window.matchMedia("(max-width: 700px)");

document
    .querySelectorAll(".technical-card-content .description, .nontechnical-card-content .description")
    .forEach((description) => {
        description.addEventListener("click", (event) => {
            if (!descriptionClampQuery.matches) return;

            const isExpanded = description.classList.contains("expanded");
            const isTruncated = description.scrollHeight > description.clientHeight;

            if (!isExpanded && !isTruncated) return;

            event.stopPropagation();
            description.classList.toggle("expanded");
        });
    });

document
    .querySelectorAll(".technical-works-card, .nontechnical-works-card")
    .forEach((card) => {
        card.addEventListener("click", () => {
            if (!descriptionClampQuery.matches) return;

            card
                .querySelectorAll(".description.expanded")
                .forEach((description) => description.classList.remove("expanded"));
        });
    });

const NUDGES = [
    [1101, 1365,   44, 46],   // small laptop 1280
    [1366, 1439,   33.5, 33.5],   // laptop 1366
    [1440, 1919,   -4, -4],   // MacBook 1440 / 1536
    [1920, 2559, 2, -3],   // Full HD 1920  <- right vector sits too low, so start negative
    [2560, 3839,   -16, -26],   // QHD 2560
    [3840, 99999,  -37, -50.5],   // 4K 3840
  ];
  const DESKTOP_MIN = 1101;
  const BASE_W = 1536;
  const vecSel = '.workspage-vector .right-vector, .workspage-vector .left-vector';

  const getNudge = () => {
    const w = window.innerWidth;
    const row = NUDGES.find(([a, b]) => w >= a && w <= b);
    return row ? { r: row[2], l: row[3] } : { r: 0, l: 0 };
  };

  function measure() {
    const hrTop = document.querySelector('.skills-hr');
    const hrBot = document.querySelector('.works-hr');
    const r = document.querySelector('.workspage-vector .first.right-vector');
    const l = document.querySelector('.workspage-vector .first.left-vector');
    if (!hrTop || !hrBot || !r || !l) return null;
    document.querySelectorAll(vecSel).forEach(el => el.style.translate = '');
    return {
      hrTopBottom: hrTop.getBoundingClientRect().bottom,
      hrBotTop:    hrBot.getBoundingClientRect().top,
      rTop:        r.getBoundingClientRect().top,
      lBottom:     l.getBoundingClientRect().bottom
    };
  }

  function align() {
    if (window.innerWidth < DESKTOP_MIN) {
      document.querySelectorAll(vecSel).forEach(el => el.style.translate = '');
      return;
    }
    const m = measure();
    if (!m) return;
    const u = window.innerWidth / BASE_W;
    const n = getNudge();

    const dyRight = (m.hrTopBottom + n.r * u) - m.rTop;
    const dyLeft  = (m.hrBotTop    + n.l * u) - m.lBottom;

    document.querySelectorAll('.workspage-vector .right-vector')
      .forEach(el => el.style.translate = `0px ${dyRight}px`);
    document.querySelectorAll('.workspage-vector .left-vector')
      .forEach(el => el.style.translate = `0px ${dyLeft}px`);
  }

  /* Optional: shows the nudge values that reproduce the CSS-only position at the current width */
  window.calibrateVectors = () => {
    const m = measure();
    if (!m) return console.warn('hr or vector element not found');
    const u = window.innerWidth / BASE_W;
    console.log(`Width ${window.innerWidth}px -> RIGHT: ${((m.rTop - m.hrTopBottom) / u).toFixed(2)}, LEFT: ${((m.lBottom - m.hrBotTop) / u).toFixed(2)}`);
    align();
  };

  let raf;
  const schedule = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(align); };
  window.addEventListener('DOMContentLoaded', schedule);
  window.addEventListener('load', schedule);
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(document.body);
  schedule();