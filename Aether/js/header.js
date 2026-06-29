const header = document.getElementById("header");
const headerCta = document.getElementById("headerCta");
const headerNav = document.getElementById("headerNav");
const sections = document.querySelectorAll("section[data-header]");

function showCta() {
  headerCta.classList.remove("translate-x-[50vw]");
  headerCta.classList.add("ms-8");
  headerNav.classList.remove("translate-x-32");
}

function hideCta() {
  headerCta.classList.add("translate-x-[50vw]");
  headerCta.classList.remove("ms-8");
  headerNav.classList.add("translate-x-32");
}

function updateHeader() {
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 80 && rect.bottom >= 80) {
      header.className = header.className.replace(/header-(transparent|solid)/g, "").trim();
      header.classList.add(`header-${section.dataset.header}`);
      if (section.dataset.hero === "true") {
        hideCta();
      } else {
        showCta();
      }
    }
  });
}

export function initHeader() {
  updateHeader();
  window.addEventListener("scroll", updateHeader);

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
