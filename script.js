/* ===== EDIT THESE PLACEHOLDERS ===== */
const CONFIG = {
  // Country code + number, digits only, e.g. "919876543210". This value is a PLACEHOLDER.
  // The phone number on Zomato may not be a WhatsApp number, so confirm with the owner.
  whatsappNumber: "910000000000",
  whatsappMessage: "Hello Bake Street, I would like to make an enquiry.",
  // Zomato listing page, taken from the public listing URL. Verify it still works.
  zomatoUrl: "https://www.zomato.com/chennai/bake-street-ambattur",
  // Address as shown on the Zomato listing (not owner-verified).
  // Replace with the verified Google Maps share link once confirmed.
  mapUrl: "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Bake Street, No-38 Thiruverkadu Road, TNHB Colony, Dharma Nagar, Ayappakkam, Chennai 600077")
};
/* =================================== */

const MENU_BREAKPOINT = 900; // must match the nav media query in style.css

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("nav-menu");

  /* Mobile menu */
  function setMenu(open) {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });
  window.addEventListener("resize", () => { if (window.innerWidth > MENU_BREAKPOINT) setMenu(false); });

  /* Header shadow on scroll */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Menu category filtering */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const items = document.querySelectorAll(".menu-item");
  const emptyMsg = document.getElementById("menu-empty");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      filterButtons.forEach(b => {
        const active = b === btn;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", String(active));
      });
      let visible = 0;
      items.forEach(item => {
        const show = filter === "all" || item.dataset.category === filter;
        item.hidden = !show;
        if (show) visible++;
      });
      emptyMsg.hidden = visible > 0;
    });
  });

  /* WhatsApp links */
  const waUrl = "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(CONFIG.whatsappMessage);
  document.querySelectorAll("[data-whatsapp]").forEach(a => {
    a.href = waUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });
  if (CONFIG.whatsappNumber === "910000000000") {
    document.getElementById("wa-note").hidden = false;
  }

  /* Zomato links (order + reviews) */
  document.querySelectorAll("[data-zomato]").forEach(a => {
    a.href = CONFIG.zomatoUrl;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  /* Map link */
  document.getElementById("map-link").href = CONFIG.mapUrl;

  /* Graceful image failure */
  function markFailed(img) {
    const wrap = img.closest(".img-wrap");
    if (wrap) wrap.classList.add("img-failed");
  }
  document.querySelectorAll(".img-wrap img").forEach(img => {
    img.addEventListener("error", () => markFailed(img));
    if (img.complete && img.naturalWidth === 0) markFailed(img);
  });

  /* Footer year */
  document.getElementById("year").textContent = new Date().getFullYear();
});