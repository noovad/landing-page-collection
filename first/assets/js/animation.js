const header = document.getElementById("header");
const heroButton = document.getElementById("heroButton");
const sections = document.querySelectorAll("section");

function showButton() {
  heroButton.classList.remove("w-0", "px-0", "opacity-0", "pointer-events-none");

  heroButton.classList.add("w-24", "px-4", "opacity-100");
}

function hideButton() {
  heroButton.classList.remove("w-24", "px-4", "opacity-100");

  heroButton.classList.add("w-0", "px-0", "opacity-0", "pointer-events-none");
}

function updateHeader() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();

    if (rect.top <= 80 && rect.bottom >= 80) {
      header.classList.remove("header-light", "header-dark");

      header.classList.add(`header-${section.dataset.header}`);

      if (section.dataset.hero === "true") {
        showButton();
      } else {
        hideButton();
      }
    }
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".animate-on-scroll");

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

  elements.forEach((element) => {
    observer.observe(element);
  });
}

updateHeader();
initScrollAnimations();

window.addEventListener("scroll", updateHeader);
