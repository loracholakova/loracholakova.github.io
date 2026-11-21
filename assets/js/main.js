"use strict";

const nav = document.querySelector("#site-nav");
const menu = document.querySelector("#menu-toggle");

if (nav && menu) {
  const compact = window.matchMedia("(max-width: 54rem)");

  function setMenu(open) {
    nav.hidden = !open;
    menu.setAttribute("aria-expanded", String(open));
  }

  function syncNavigation() {
    if (compact.matches && nav.contains(document.activeElement)) {
      menu.hidden = false;
      menu.focus();
    }

    const menuHadFocus = document.activeElement === menu;
    menu.hidden = !compact.matches;
    nav.classList.toggle("is-collapsible", compact.matches);
    setMenu(!compact.matches);

    if (!compact.matches && menuHadFocus) {
      nav.querySelector("a[aria-current='page']").focus();
    }
  }

  syncNavigation();
  compact.addEventListener("change", syncNavigation);
  menu.addEventListener("click", () => setMenu(nav.hidden));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && compact.matches && !nav.hidden) {
      setMenu(false);
      menu.focus();
    }
  });
}

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

if (motion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (motion.matches) entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}
