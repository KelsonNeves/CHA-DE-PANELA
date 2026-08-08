// ============================================================
// K&E — Wedding site shared script
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTopNavScroll();
  initMobileMenu();
  initReveal();
  initSideNav();
  initCountdown();
  initCarousel();
  initBackToTop();
  initPixCopy();
  markActiveTopNavLink();
});

// ---- Top nav: shrink + glass on scroll ----
function initTopNavScroll() {
  const nav = document.querySelector(".top-nav");
  if (!nav) return;
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// ---- Mobile hamburger menu ----
function initMobileMenu() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;
  toggle.addEventListener("click", () => {
    toggle.classList.toggle("open");
    links.classList.toggle("open");
  });
  links.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.classList.remove("open");
      links.classList.remove("open");
    })
  );
}

// ---- Highlight current page link in top nav ----
function markActiveTopNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });
}

// ---- Fade-in reveal on scroll ----
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  items.forEach((item) => io.observe(item));
}

// ---- Side dot nav: click to scroll + active state tracking ----
// Uses a scroll-position line (rather than IntersectionObserver thresholds)
// so it works reliably even for sections taller than the viewport.
function initSideNav() {
  const sideItems = document.querySelectorAll(".side-nav-item");
  if (!sideItems.length) return;

  sideItems.forEach((item) => {
    item.addEventListener("click", () => {
      const targetId = item.getAttribute("data-target");
      const target = document.getElementById(targetId);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  const sections = Array.from(sideItems)
    .map((item) => ({
      item,
      el: document.getElementById(item.getAttribute("data-target")),
    }))
    .filter((entry) => entry.el);

  if (!sections.length) return;

  let ticking = false;

  function updateActive() {
    ticking = false;
    const line = window.innerHeight * 0.35;
    let current = sections[0];

    for (const entry of sections) {
      const rect = entry.el.getBoundingClientRect();
      if (rect.top <= line) {
        current = entry;
      }
    }

    sideItems.forEach((item) => item.classList.remove("active"));
    current.item.classList.add("active");
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActive);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateActive();
}

// ---- Countdown timer ----
// EDIT THIS DATE to change the wedding date/time shown in the countdown.
function initCountdown() {
  const el = document.querySelector("[data-countdown]");
  if (!el) return;

  const targetDate = new Date("2026-09-07T16:00:00-03:00").getTime();

  const daysEl = el.querySelector("[data-days]");
  const hoursEl = el.querySelector("[data-hours]");
  const minutesEl = el.querySelector("[data-minutes]");
  const secondsEl = el.querySelector("[data-seconds]");

  function tick() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// ---- Photo carousel ----
function initCarousel() {
  const track = document.querySelector("[data-carousel-track]");
  const prev = document.querySelector("[data-carousel-prev]");
  const next = document.querySelector("[data-carousel-next]");
  if (!track) return;

  const scrollByAmount = () => {
    const item = track.querySelector(".carousel-item");
    if (!item) return track.clientWidth * 0.8;
    const style = window.getComputedStyle(track);
    const gap = parseInt(style.columnGap || style.gap || "20", 10);
    return item.getBoundingClientRect().width + gap;
  };

  prev?.addEventListener("click", () => {
    track.scrollBy({ left: -scrollByAmount(), behavior: "smooth" });
  });
  next?.addEventListener("click", () => {
    track.scrollBy({ left: scrollByAmount(), behavior: "smooth" });
  });
}

// ---- Back to top button ----
function initBackToTop() {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  const onScroll = () => {
    if (window.scrollY > 700) btn.classList.add("visible");
    else btn.classList.remove("visible");
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- Copy Pix key ----
function initPixCopy() {
  const btn = document.querySelector("[data-copy-pix]");
  const keyEl = document.querySelector("[data-pix-key]");
  if (!btn || !keyEl) return;

  btn.addEventListener("click", async () => {
    const text = btn.getAttribute("data-pix-payload") || keyEl.textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      const range = document.createRange();
      range.selectNode(keyEl);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      document.execCommand("copy");
    }
    const originalText = btn.textContent;
    btn.textContent = "Chave copiada";
    btn.classList.add("copied");
    setTimeout(() => {
      btn.textContent = originalText;
      btn.classList.remove("copied");
    }, 2200);
  });
}

// ---- Subtle parallax on hero image ----
window.addEventListener(
  "scroll",
  () => {
    const media = document.querySelector(".hero-media img, .hero-media .photo-placeholder");
    if (!media) return;
    const offset = window.scrollY;
    if (offset < window.innerHeight) {
      media.style.transform = `scale(1.08) translateY(${offset * 0.15}px)`;
    }
  },
  { passive: true }
);