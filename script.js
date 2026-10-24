/*
  Portfolio behaviour
  -------------------
  This file handles:
  1. Light / dark theme, saved in localStorage
  2. Mobile navigation open / close
  3. Instant project search
  4. Footer year

  There is no chatbot and no API key in this file.
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
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === "light" || saved === "dark") {
        return saved;
      }
    } catch (error) {
      // Ignore storage errors and keep the default dark theme.
    }
    return "dark";
  }

  function applyTheme(theme) {
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
    } else {
      html.removeAttribute("data-theme");
    }

    if (!themeToggle) {
      return;
    }

    const isLight = theme === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute(
      "aria-label",
      isLight ? "Switch to dark mode" : "Switch to light mode"
    );
    if (themeToggleText) {
      themeToggleText.textContent = isLight ? "Dark" : "Light";
    }

    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // Theme still changes on screen even if it cannot be saved.
    }
  }

  applyTheme(getPreferredTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const next = html.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });
  }

  // --- Mobile navigation ---
  function setNavOpen(isOpen) {
    if (!siteNav || !navToggle) {
      return;
    }
    siteNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setNavOpen(!isOpen);
    });

    siteNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });
  }

  // Close the menu with the Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      setNavOpen(false);
    }
  });

  // Close the menu if the window is resized back to desktop width
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      setNavOpen(false);
    }
  });

  // --- Project search ---
  // Matches against title, description, and technology on each card.
  function filterProjects() {
    if (!searchInput || !noResults) {
      return;
    }

    const query = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(function (card) {
      const haystack = [
        card.getAttribute("data-title") || "",
        card.getAttribute("data-description") || "",
        card.getAttribute("data-tech") || "",
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

  // Listen to input, search, and change so filtering runs while typing
  // and also when the search field is cleared.
  if (searchInput) {
    searchInput.addEventListener("input", filterProjects);
    searchInput.addEventListener("search", filterProjects);
    searchInput.addEventListener("change", filterProjects);
  }

  // --- Footer year ---
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
