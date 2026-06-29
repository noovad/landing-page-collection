const easeOutCubic = (t) => 1 - (1 - t) ** 3;

function animateCounter(element, target, duration) {
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);

    element.textContent = Math.floor(easeOutCubic(progress) * target).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target.toLocaleString();
    }
  }

  requestAnimationFrame(update);
}

export function initCounters() {
  document.querySelectorAll(".counter").forEach((counter) => {
    const target = Number(counter.dataset.target);
    const duration = Number(counter.dataset.duration) || 2000;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        animateCounter(counter, target, duration);
        observer.unobserve(counter);
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
}
