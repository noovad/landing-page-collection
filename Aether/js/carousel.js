function initLogoCarousel() {
  const track = document.getElementById("logoTrack");
  if (!track) return;

  const original = Array.from(track.children);
  if (original.length === 0) return;

  original.forEach((item) => {
    track.appendChild(item.cloneNode(true));
  });

  const style = getComputedStyle(track);
  const gap = parseFloat(style.gap) || 0;

  const setWidth = original.reduce((total, item, index) => {
    total += item.getBoundingClientRect().width;
    if (index < original.length - 1) total += gap;
    return total;
  }, 0);

  let offset = 0;
  let paused = false;
  const speed = 0.5;

  track.addEventListener("mouseenter", () => {
    paused = true;
  });

  track.addEventListener("mouseleave", () => {
    paused = false;
  });

  function tick() {
    if (!paused) {
      offset += speed;

      if (offset >= setWidth) {
        offset -= setWidth;
      }
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initTestimonialCarousel() {
  const data = document.getElementById("testimonialTrack");
  const prevBtn = document.getElementById("testimonialPrev");
  const nextBtn = document.getElementById("testimonialNext");
  if (!data) return;

  const original = Array.from(data.children);
  const count = original.length;
  const gap = 32;
  let current = 0;

  function cardW() {
    return data.children[0].getBoundingClientRect().width + gap;
  }

  function updateTransform(smooth) {
    const w = cardW();
    data.style.transition = smooth ? "transform 500ms ease" : "none";
    data.style.transform = `translateX(-${current * w}px)`;
    if (!smooth) data.offsetHeight;
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (current <= 0) return;

      current--;
      updateTransform(true);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (current >= count - 1) return;

      current++;
      updateTransform(true);
    });
  }
}

export function initCarousel() {
  initLogoCarousel();
  initTestimonialCarousel();
}
