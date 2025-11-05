(function () {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const serviceToggle = document.getElementById("serviceToggle");
  const serviceDropdown = document.getElementById("serviceDropdown");
  const servicesItem = document.getElementById("servicesItem");
  const homeLink = document.getElementById("homeLink");

  // 1) Hamburger toggle -> opens mobile menu and changes to X
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.classList.toggle("open");
    navLinks.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", isOpen);
  });

  // 2) Service toggle (behaves as accordion on mobile; no-op on wide screens)
  serviceToggle.addEventListener("click", (e) => {
    // prevent page navigation if it's an anchor (we used a button)
    const isMobile = window.matchMedia("(max-width: 899px)").matches;
    if (!isMobile) return; // on desktop the hover handles dropdown
    const isOpen = serviceToggle.getAttribute("aria-expanded") === "true";
    serviceToggle.setAttribute("aria-expanded", !isOpen);
    serviceDropdown.classList.toggle("open", !isOpen);
    serviceDropdown.setAttribute("aria-hidden", isOpen);
    e.stopPropagation();
  });

  // 3) Close menu when clicking outside (mobile)
  document.addEventListener("click", (e) => {
    const target = e.target;
    const isClickInside =
      navLinks.contains(target) || navToggle.contains(target);
    if (!isClickInside) {
      // close mobile menu
      if (navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", false);
      }
      // close services accordion
      if (serviceDropdown.classList.contains("open")) {
        serviceDropdown.classList.remove("open");
        serviceDropdown.setAttribute("aria-hidden", true);
        serviceToggle.setAttribute("aria-expanded", false);
      }
    }
  });

  // 4) Optional: close dropdown when resizing from mobile -> desktop
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 900px)").matches) {
      // ensure mobile states reset
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", false);

      serviceDropdown.classList.remove("open");
      serviceDropdown.setAttribute("aria-hidden", true);
      serviceToggle.setAttribute("aria-expanded", false);
    }
  });

  // 5) Prevent underline on focus causing weird underline: keep no-decoration
  // (Most browsers respect CSS but we ensure keyboard focus still visible via outline)
  const allLinks = document.querySelectorAll(
    ".nav-link, .dropdown-link, .service-toggle"
  );
  allLinks.forEach((el) => {
    el.addEventListener(
      "focus",
      () => (el.style.outline = "2px solid rgba(11,102,255,0.15)")
    );
    el.addEventListener("blur", () => (el.style.outline = "none"));
  });
})();

// hero section
// Add a little scroll reveal animation
window.addEventListener("scroll", () => {
  const heroText = document.querySelector(".hero-content");
  const position = heroText.getBoundingClientRect().top;
  const screenHeight = window.innerHeight / 1.3;

  if (position < screenHeight) {
    heroText.classList.add("visible");
  }
});

// Smooth scroll when clicking the button
document.getElementById("exploreBtn").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth",
  });
});
// JS code for active navbar link
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach((link) => {
  link.addEventListener("click", function () {
    navLink.forEach((l) => l.classList.remove("active")); // remove from all
    this.classList.add("active"); // add to current
  });
});
