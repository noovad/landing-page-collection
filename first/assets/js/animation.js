const header = document.getElementById("header");
const heroButton = document.getElementById("heroButton");
const headerNav = document.getElementById("headerNav");
const sections = document.querySelectorAll("section");

function showButton() {
  heroButton.classList.remove("translate-x-120", "opacity-100");
  heroButton.classList.add("opacity-100");
  headerNav.classList.add("-translate-x-12");
}

function hideButton() {
  heroButton.classList.add("translate-x-120", "opacity-0");
  heroButton.classList.remove("opacity-100");
  headerNav.classList.remove("-translate-x-12");
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
