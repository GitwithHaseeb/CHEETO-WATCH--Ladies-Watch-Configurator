const configuratorRoot = document.getElementById("collectionOptions");

if (configuratorRoot) {
  const data = {
    ROUND: {
      base: 495,
      preview: "https://images.unsplash.com/photo-1619134778706-7015533a6150?auto=format&fit=crop&w=1000&q=80",
      previewFallback: "assets/images/placeholder-watch.svg",
      caseColor: ["Silver", "Rose Gold", "Two-tone"],
      dialColor: ["White Pearl", "Blush", "Mother of Pearl"],
      strapType: ["Leather Cream", "Leather Taupe", "Leather Blush", "Metal Bracelet", "Mesh"],
      crystal: ["Sapphire"]
    },
    ARCLY: {
      base: 610,
      preview: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80",
      previewFallback: "assets/images/catalog-arcly.svg",
      caseColor: ["Rose Gold", "Champagne"],
      dialColor: ["Champagne", "Sunray", "White"],
      strapType: ["Leather Rose", "Leather Cream", "Metal"],
      crystal: ["Sapphire + AR Coating"]
    },
    SQUARE: {
      base: 530,
      preview: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=1000&q=80",
      previewFallback: "assets/images/catalog-square.svg",
      caseColor: ["Silver", "Rose Gold"],
      dialColor: ["White", "Grey", "Blue"],
      strapType: ["Leather Black", "Leather Cream", "Metal Bracelet"],
      crystal: ["Sapphire", "Sapphire + Diamond"]
    }
  };

  const steps = {
    1: document.getElementById("step1"),
    2: document.getElementById("step2"),
    3: document.getElementById("step3")
  };

  const progress = document.querySelectorAll(".progress-step");
  const toast = document.getElementById("toast");

  const state = {
    collection: "",
    caseColor: "",
    dialColor: "",
    strapType: "",
    crystal: "",
    engraving: "",
    total: 0
  };

  const ids = ["caseColor", "dialColor", "strapType", "crystal"];
  const optionLabels = {
    caseColor: "Case color",
    dialColor: "Dial color",
    strapType: "Strap",
    crystal: "Crystal"
  };
  const collectionNames = Object.keys(data);

  const showToast = (text) => {
    toast.textContent = text;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1400);
  };

  const setStep = (num) => {
    Object.values(steps).forEach((el) => el.classList.add("hidden"));
    steps[num].classList.remove("hidden");
    progress.forEach((p) => p.classList.toggle("active", Number(p.dataset.step) === num));
  };

  configuratorRoot.innerHTML = collectionNames.map((name) => `<div class="option-card" data-name="${name}"><strong>${name}</strong><br><small>${name === "ROUND" ? "Happiness Blossoms" : name === "ARCLY" ? "Light Your Spirit" : "Stylish and Radiant"}</small></div>`).join("");

  configuratorRoot.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("click", () => {
      configuratorRoot.querySelectorAll(".option-card").forEach((c) => c.classList.remove("active"));
      card.classList.add("active");
      state.collection = card.dataset.name;
      showToast(`${state.collection} selected`);
    });
  });

  const fillOptions = () => {
    const selected = data[state.collection];
    ids.forEach((id) => {
      const select = document.getElementById(id);
      select.innerHTML = selected[id].map((opt) => `<option value="${opt}">${opt}</option>`).join("");
      state[id] = selected[id][0];
    });
  };

  const computePrice = () => {
    let total = data[state.collection].base;
    if (state.engraving.length > 0) total += 50;
    if (state.crystal.includes("Diamond")) total += 120;
    state.total = total;

    const priceEl = document.getElementById("price");
    priceEl.classList.remove("price-flip");
    void priceEl.offsetWidth;
    priceEl.classList.add("price-flip");
    priceEl.textContent = `$${total}`;
  };

  const updatePreview = () => {
    const loader = document.getElementById("previewLoader");
    const preview = document.getElementById("watchPreview");
    const summary = document.getElementById("configSummary");

    loader.classList.remove("hidden");
    setTimeout(() => {
      const row = data[state.collection];
      preview.onerror = () => {
        preview.onerror = null;
        preview.src = row.previewFallback;
      };
      preview.src = row.preview;
      loader.classList.add("hidden");
    }, 450);

    summary.textContent = `${state.collection} | ${state.caseColor} case | ${state.dialColor} dial | ${state.strapType} | ${state.crystal}${state.engraving ? ` | Engraving: ${state.engraving}` : ""}`;
    computePrice();
  };

  document.getElementById("toStep2").addEventListener("click", () => {
    if (!state.collection) {
      showToast("Please choose a collection");
      return;
    }
    fillOptions();
    setStep(2);
  });

  document.getElementById("backTo1").addEventListener("click", () => setStep(1));
  document.getElementById("backTo2").addEventListener("click", () => setStep(2));

  ids.forEach((id) => {
    document.getElementById(id).addEventListener("change", (e) => {
      state[id] = e.target.value;
      showToast(`${optionLabels[id] || id} updated`);
    });
  });

  const engraving = document.getElementById("engraving");
  engraving.addEventListener("input", () => {
    const valid = /^[A-Za-z0-9]{0,3}$/.test(engraving.value);
    engraving.setCustomValidity(valid ? "" : "Use up to 3 letters or numbers.");
    state.engraving = engraving.value.toUpperCase();
  });

  document.getElementById("toStep3").addEventListener("click", () => {
    const form = document.getElementById("configForm");
    if (!form.reportValidity()) return;

    ids.forEach((id) => state[id] = document.getElementById(id).value);
    state.engraving = engraving.value.toUpperCase();
    updatePreview();
    localStorage.setItem("citizenLConfig", JSON.stringify(state));
    setStep(3);
    showToast("Configuration saved");
  });

  const saveAction = (label) => {
    showToast(`${label} saved`);
    localStorage.setItem("citizenLConfig", JSON.stringify(state));
  };

  document.getElementById("wishlistBtn").addEventListener("click", () => saveAction("Wishlist"));
  document.getElementById("quoteBtn").addEventListener("click", () => saveAction("Quote request"));

  const existing = localStorage.getItem("citizenLConfig");
  if (existing) {
    try {
      const parsed = JSON.parse(existing);
      if (parsed.collection && data[parsed.collection]) {
        state.collection = parsed.collection;
        configuratorRoot.querySelector(`[data-name="${state.collection}"]`)?.classList.add("active");
      }
    } catch (_e) {
      localStorage.removeItem("citizenLConfig");
    }
  }
}
