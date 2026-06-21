const header = document.getElementById("header");
const heroButton = document.getElementById("heroButton");
const headerNav = document.getElementById("headerNav");
const sections = document.querySelectorAll("section");

function showButton() {
  heroButton.classList.remove("translate-x-120", "opacity-100");
  heroButton.classList.add("opacity-100", "ms-8");
  headerNav.classList.remove("translate-x-36");
}

function hideButton() {
  heroButton.classList.add("translate-x-120", "opacity-0");
  heroButton.classList.remove("opacity-100", "ms-8");
  headerNav.classList.add("translate-x-36");
}

function updateHeader() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 80 && rect.bottom >= 80) {
      header.classList.remove("header-light", "header-dark");

      header.classList.add(`header-${section.dataset.header}`);

      if (section.dataset.hero === "true") {
        hideButton();
      } else {
        showButton();
      }
    }
  });
}

function initScrollAnimations() {
  const stagger = 200;

  const animationClasses = ["fade-in", "slide-up", "slide-left", "slide-right", "zoom-in"];

  document.querySelectorAll(".animate-on-scroll-group").forEach((group) => {
    const items = group.querySelectorAll(animationClasses.map((c) => `.${c}`).join(","));

    let accumulatedOffset = 0;

    items.forEach((item, index) => {
      item.classList.add("animate-on-scroll");

      const delayClass = [...item.classList].find((c) => c.startsWith("delay-"));

      const customDelay = delayClass ? parseInt(delayClass.replace("delay-", ""), 10) : 0;

      const delay = Math.max(0, index * stagger + accumulatedOffset + customDelay);

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
    {
      threshold: 0.5,
    },
  );

  document.querySelectorAll(".animate-on-scroll").forEach((item) => {
    observer.observe(item);
  });
}

updateHeader();
initScrollAnimations();

window.addEventListener("scroll", updateHeader);
