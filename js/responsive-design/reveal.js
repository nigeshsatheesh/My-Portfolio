const SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,a,button,img,li,label,input,textarea,figure";

// whole elements that animate as ONE unit (their children are skipped)
const UNITS =
  ".technical-works-card, .nontechnical-works-card, .journey-card, .journey-vector, .info";

// never animate these (or anything inside them)
const EXCLUDE = '[class*="page-vector"], [id*="page-vector"], [data-no-reveal], .email';

const units = [...document.querySelectorAll(UNITS)].filter(
  (el) => !el.closest(EXCLUDE)
);

const singles = [...document.querySelectorAll(SELECTOR)].filter(
  (el) =>
    !el.closest(EXCLUDE) &&
    !el.closest(UNITS) &&                 // inside a card/timeline: skip
    !el.parentElement.closest(SELECTOR)   // outermost only
);

const targets = [...units, ...singles];

// stagger by position within the parent
const counters = new Map();
targets.forEach((el) => {
  const n = counters.get(el.parentElement) ?? 0;
  counters.set(el.parentElement, n + 1);
  el.style.setProperty("--delay", `${Math.min(n * 0.08, 0.6)}s`);
  el.classList.add("reveal");
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add("is-visible");
      el.addEventListener("animationend", (e) => {
        if (e.target !== el) return;
        el.classList.remove("reveal", "is-visible");
      });
      observer.unobserve(el);
    });
  },
  { threshold: 0.1 }
);

targets.forEach((el) => observer.observe(el));