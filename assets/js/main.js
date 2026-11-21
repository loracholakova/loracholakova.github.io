"use strict";

const nav = document.querySelector("#site-nav");
const menu = document.querySelector("#menu-toggle");
const siteHeader = menu?.closest("header");

if (nav && menu && siteHeader) {
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
      const current = nav.querySelector("a[aria-current='page'], .nav-section-active");
      (current ?? nav.querySelector("a"))?.focus();
    }
  }

  syncNavigation();
  compact.addEventListener("change", syncNavigation);
  menu.addEventListener("click", () => setMenu(nav.hidden));

  function isMenuOpen() {
    return compact.matches && !nav.hidden;
  }

  function closeMenu() {
    if (nav.contains(document.activeElement)) menu.focus();
    setMenu(false);
  }

  siteHeader.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isMenuOpen()) {
      event.preventDefault();
      closeMenu();
    }
  });

  siteHeader.addEventListener("focusout", (event) => {
    if (isMenuOpen() && event.relatedTarget && !siteHeader.contains(event.relatedTarget)) {
      setMenu(false);
    }
  });

  nav.addEventListener("click", (event) => {
    if (isMenuOpen() && event.target.closest("a[href]") &&
        event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (isMenuOpen() && !siteHeader.contains(event.target)) closeMenu();
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
