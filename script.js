"use strict";

/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.querySelector(".menu");
const navigation = document.querySelector(".navigation");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", String(isOpen));

    menuButton.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );

    menuButton.innerHTML = isOpen
      ? '<i class="fa-solid fa-xmark"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu after clicking a navigation link

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");

      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");

      menuButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });
}

/* =========================================
   ACTIVE NAVIGATION LINK
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navigation a");

if ("IntersectionObserver" in window) {
  const navigationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },

    {
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    },
  );

  sections.forEach((section) => {
    navigationObserver.observe(section);
  });
}

/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          observer.unobserve(entry.target);
        }
      });
    },

    {
      threshold: 0.12,
    },
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}

/* =========================================
   DARK AND LIGHT THEME
========================================= */

const themeButton = document.querySelector(".theme");

if (themeButton) {
  const themeIcon = themeButton.querySelector("i");

  themeButton.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light");

    themeButton.setAttribute("aria-pressed", String(isLight));

    themeButton.setAttribute(
      "aria-label",
      isLight ? "Switch to dark theme" : "Switch to light theme",
    );

    themeIcon.className = isLight ? "fa-solid fa-sun" : "fa-regular fa-moon";
  });
}

/* =========================================
   AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* =========================================
   PROFILE IMAGE FALLBACK
========================================= */

const profileImage = document.querySelector(".profile-photo");

if (profileImage) {
  profileImage.addEventListener("error", () => {
    profileImage.alt = "Profile picture not yet uploaded";

    profileImage.style.objectFit = "contain";

    profileImage.style.padding = "20px";
  });
}
