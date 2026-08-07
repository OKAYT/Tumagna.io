/* =========================================================
   ALFRED TUMAGNA — PORTFOLIO INTERACTIONS
   Vanilla JS, no dependencies. Handles:
   1. Active nav link highlighting based on the current page
   2. Scroll-reveal fade-ins (skips animation if reduced motion)
   3. Auto-closing the mobile menu after a link is tapped
   ========================================================= */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- 1. ACTIVE NAV LINK BY CURRENT PAGE ---------- */
  function initActiveNav() {
    var navLinks = document.querySelectorAll(".nav-links a");
    if (!navLinks.length) return;

    var path = window.location.pathname.split("/").pop();
    if (path === "") path = "index.html";

    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === path) {
        link.classList.add("is-active");
      }
    });
  }

  /* ---------- 2. SCROLL-REVEAL ---------- */
  function initScrollReveal() {
    var revealTargets = document.querySelectorAll(
      ".skill-row, .project-row, .contact-card, .about-grid, .section-block-head"
    );

    if (!revealTargets.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealTargets.forEach(function (el) {
        el.classList.add("in-view");
      });
      return;
    }

    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- 3. CLOSE MOBILE MENU ON LINK TAP ---------- */
  function initMobileMenuClose() {
    var toggle = document.getElementById("nav-toggle");
    var navLinks = document.querySelectorAll(".nav-links a");

    if (!toggle || !navLinks.length) return;

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        toggle.checked = false;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initActiveNav();
    initScrollReveal();
    initMobileMenuClose();
  });
})();
