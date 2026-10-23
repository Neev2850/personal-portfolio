/*
  Portfolio behaviour
  -------------------
  This file handles:
  1. Light / dark theme, saved in localStorage
  2. Mobile navigation open / close
  3. Instant project search
  4. Footer year
*/

(function () {
  const THEME_KEY = "portfolio-theme";
  const html = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeToggleText = document.querySelector(".theme-toggle-text");
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector("#site-nav");
  const searchInput = document.querySelector("#project-search");
  const cards = document.querySelectorAll(".project-card");
  const noResults = document.querySelector("#no-results");
  const yearSpan = document.querySelector("#year");

  // --- Theme ---
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }

    const isLight = theme === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    themeToggleText.textContent = isLight ? "Dark" : "Light";
    localStorage.setItem(THEME_KEY, theme);
  }

  applyTheme(getPreferredTheme());

  themeToggle.addEventListener("click", function () {
    const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(next);
  });

  // --- Mobile navigation ---
  function setNavOpen(isOpen) {
    siteNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  navToggle.addEventListener("click", function () {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavOpen(!isOpen);
  });

  siteNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setNavOpen(false);
    });
  });

  // Close the menu if the window is resized back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      setNavOpen(false);
    }
  });

  // --- Project search ---
  function filterProjects() {
    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const haystack = [
        card.getAttribute("data-title") || "",
        card.getAttribute("data-description") || "",
        card.getAttribute("data-tech") || "",
        card.textContent || "",
      ]
        .join(" ")
        .toLowerCase();

      const matches = query === "" || haystack.indexOf(query) !== -1;
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
      }
    });

    noResults.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", filterProjects);

  // --- Footer year ---
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
