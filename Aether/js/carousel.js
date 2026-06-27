function initLogoCarousel() {
  const track = document.querySelector(".logo-track");
  if (!track) return;

  track.style.animation = "none";

  const items = Array.from(track.children);
  items.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });
  items.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  const setWidth = track.scrollWidth / 3;
  let position = 0;
  let rafId = null;
  let paused = false;
  const speed = 1.2;

  track.addEventListener("mouseenter", () => {
    paused = true;
  });
  track.addEventListener("mouseleave", () => {
    paused = false;
  });

  function tick() {
    if (!paused) {
      position -= speed;
      if (Math.abs(position) >= setWidth) {
        position += setWidth;
      }
      track.style.transform = `translateX(${position}px)`;
    }
    rafId = requestAnimationFrame(tick);
  }

  rafId = requestAnimationFrame(tick);
}

function initTestimonialCarousel() {
  const track = document.getElementById("testimonialTrack");
  const dotsEl = document.getElementById("testimonialDots");
  if (!track || !dotsEl) return;

  const original = Array.from(track.children);
  const count = original.length;
  let current = 0;
  let autoTimer = null;

  original.forEach((card) => {
    track.appendChild(card.cloneNode(true));
  });

  original.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.className =
      "w-2.5 h-2.5 rounded-full transition-all duration-300 " +
      (i === 0 ? "bg-secondary w-6" : "bg-border");
    dot.setAttribute("aria-label", `Go to testimonial ${i + 1}`);
    dot.addEventListener("click", () => {
      goTo(i);
      restartAuto();
    });
    dotsEl.appendChild(dot);
  });

  function getCardWidth() {
    const card = track.children[0];
    const style = getComputedStyle(track);
    const gap = parseInt(style.gap, 10) || 0;
    return card.getBoundingClientRect().width + gap;
  }

  function updateDots() {
    const idx = current % count;
    Array.from(dotsEl.children).forEach((d, i) => {
      d.className =
        "w-2.5 h-2.5 rounded-full transition-all duration-300 " +
        (i === idx ? "bg-secondary w-6" : "bg-border");
    });
  }

  function updateTransform(smooth) {
    const w = getCardWidth();
    track.style.transition = smooth ? "transform 500ms ease" : "none";
    track.style.transform = `translateX(-${current * w}px)`;
    if (!smooth) track.offsetHeight;
  }

  function goTo(index) {
    current = index;
    updateTransform(true);
    updateDots();
  }

  function next() {
    const w = getCardWidth();
    current++;
    track.style.transition = "transform 500ms ease";
    track.style.transform = `translateX(-${current * w}px)`;
  }

  track.addEventListener("transitionend", () => {
    if (current >= count) {
      current -= count;
      updateTransform(false);
      updateDots();
    }
  });

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 4000);
  }

  function stopAuto() {
    if (autoTimer) clearInterval(autoTimer);
  }

  function restartAuto() {
    startAuto();
  }

  track.addEventListener("mouseenter", stopAuto);
  track.addEventListener("mouseleave", startAuto);

  startAuto();
}

export function initCarousel() {
  initLogoCarousel();
  initTestimonialCarousel();
}
