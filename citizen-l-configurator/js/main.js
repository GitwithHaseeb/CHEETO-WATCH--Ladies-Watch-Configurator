const backToTop = document.getElementById("backToTop");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const setMenuOpen = (open) => {
  if (!navLinks || !menuToggle) return;
  navLinks.classList.toggle("open", open);
  menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Menu");
};

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => setMenuOpen(!navLinks.classList.contains("open")));
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });
}

window.addEventListener("scroll", () => {
  if (!backToTop) return;
  backToTop.classList.toggle("visible", window.scrollY > 380);
});

if (backToTop) {
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to Cheeto Watches.");
    newsletterForm.reset();
  });
}

/** Unsplash first (original look); local SVG if CDN/network blocks. */
const FB = {
  round: "assets/images/placeholder-watch.svg",
  arcly: "assets/images/catalog-arcly.svg",
  square: "assets/images/catalog-square.svg"
};

const models = [
  { c: "round", model: "ROUND - EM0503-85D", features: ["Eco-Drive", "Sapphire Glass", "Case 30mm"], material: "steel", strap: "bracelet", price: 495, date: "2026-03-20", image: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=900&q=80" },
  { c: "round", model: "ROUND - EM0406-79A", features: ["Eco-Drive", "Diamond Markers", "Case 29mm"], material: "rose-gold", strap: "metal", price: 575, date: "2026-04-01", image: "assets/images/round-em0406.png" },
  { c: "round", model: "ROUND - EM0910-80Y", features: ["Eco-Drive", "Sapphire Glass", "Case 31mm"], material: "two-tone", strap: "bracelet", price: 540, date: "2025-11-15", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=900&q=80" },

  { c: "arcly", model: "ARCLY - EM1093-61X", features: ["Eco-Drive", "Arc Case", "Case 28mm"], material: "rose-gold", strap: "leather", price: 610, date: "2026-01-30", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80" },
  { c: "arcly", model: "ARCLY - EM1102-68D", features: ["AR Coating", "Sunray Dial", "Case 27mm"], material: "steel", strap: "metal", price: 585, date: "2026-03-01", image: "https://images.unsplash.com/photo-1619946794135-5bc917a27793?auto=format&fit=crop&w=900&q=80" },
  { c: "arcly", model: "ARCLY - EM1150-74P", features: ["Eco-Drive", "Sapphire Crystal", "Case 29mm"], material: "two-tone", strap: "bracelet", price: 650, date: "2025-12-10", image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=80" },

  { c: "square", model: "SQUARE - EW5600-87L", features: ["Eco-Drive", "Rounded Square", "Case 26mm"], material: "steel", strap: "leather", price: 530, date: "2026-02-05", image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80" },
  { c: "square", model: "SQUARE - EW5622-06A", features: ["Sapphire + Diamond", "Curved Glass", "Case 27mm"], material: "rose-gold", strap: "leather", price: 690, date: "2026-04-10", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80" },
  { c: "square", model: "SQUARE - EW5701-58H", features: ["Eco-Drive", "Sapphire Crystal", "Case 28mm"], material: "two-tone", strap: "bracelet", price: 640, date: "2025-10-19", image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80" }
];

const collectionContainers = document.querySelectorAll(".models");
if (collectionContainers.length) {
  const materialFilter = document.getElementById("materialFilter");
  const strapFilter = document.getElementById("strapFilter");
  const sortBy = document.getElementById("sortBy");

  const renderCollections = () => {
    let filtered = [...models];

    if (materialFilter.value !== "all") filtered = filtered.filter((m) => m.material === materialFilter.value);
    if (strapFilter.value !== "all") filtered = filtered.filter((m) => m.strap === strapFilter.value);

    if (sortBy.value === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sortBy.value === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sortBy.value === "newest") filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    collectionContainers.forEach((container) => {
      const key = container.dataset.collection;
      const group = filtered.filter((m) => m.c === key);
      container.innerHTML = group.map((m) => `
        <article class="watch-card model-item reveal visible">
          <img src="${m.image}" alt="${m.model}" width="900" height="600" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${FB[m.c]}'" />
          <div class="card-content">
            <h3>${m.model}</h3>
            <ul>${m.features.map((f) => `<li>${f}</li>`).join("")}</ul>
            <p class="tagline">$${m.price}</p>
            <a class="btn btn-primary" href="configurator.html">Customize</a>
          </div>
        </article>
      `).join("");
    });
  };

  [materialFilter, strapFilter, sortBy].forEach((el) => el.addEventListener("change", renderCollections));
  renderCollections();
}
