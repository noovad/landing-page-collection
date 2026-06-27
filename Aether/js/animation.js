export function initAnimations() {
  const stagger = 200;
  const animationClasses = [
    "fade-in",
    "slide-up",
    "slide-left",
    "slide-right",
    "zoom-in",
  ];

  const groups = document.querySelectorAll(".animate-on-scroll-group");
  groups.forEach((group) => {
    const items = group.querySelectorAll(
      animationClasses.map((c) => `.${c}`).join(","),
    );
    let accumulatedOffset = 0;

    items.forEach((item, index) => {
      item.classList.add("animate-on-scroll");
      if (![...item.classList].some((c) => c.startsWith("duration-"))) {
        item.classList.add("duration-700");
      }

      const delayClass = [...item.classList].find((c) =>
        c.startsWith("delay-"),
      );
      const customDelay = delayClass
        ? parseInt(delayClass.replace("delay-", ""), 10)
        : 0;
      const delay = Math.max(
        0,
        index * stagger + accumulatedOffset + customDelay,
      );
      item.style.transitionDelay = `${delay}ms`;
      accumulatedOffset += customDelay;
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((item) => {
    observer.observe(item);
  });
}
