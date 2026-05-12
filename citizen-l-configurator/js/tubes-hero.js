/**
 * Cheeto Watches hero: soft neon tubes follow cursor (threejs-components tubes1).
 * Click empty hero area to cycle curated palettes. Concept: Kevin Levron / threejs-components.
 */
const TUBES_CDN =
  "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";

const PALETTES = [
  {
    tubes: ["#d4a574", "#b8d4c8", "#c6a43f"],
    lights: {
      intensity: 88,
      colors: ["#fff9f5", "#f0d3c1", "#d4a574", "#b8d4c8"]
    }
  },
  {
    tubes: ["#e8c4a8", "#9fb8aa", "#c6a43f"],
    lights: {
      intensity: 96,
      colors: ["#fceee6", "#f0d3c1", "#c6a43f", "#e8dcc8"]
    }
  },
  {
    tubes: ["#c9a86c", "#b8d4c8", "#e6bc9a"],
    lights: {
      intensity: 82,
      colors: ["#f5ede6", "#d4a574", "#b8d4c8", "#ffffff"]
    }
  },
  {
    tubes: ["#deb892", "#a8c9bb", "#b8893a"],
    lights: {
      intensity: 92,
      colors: ["#fffdf9", "#f0d3c1", "#83c4a8", "#d4a574"]
    }
  }
];

function applyPalette(app, index) {
  const p = PALETTES[index % PALETTES.length];
  if (!app?.tubes) return;
  try {
    app.tubes.setColors(p.tubes);
    app.tubes.setLightsColors(p.lights.colors);
  } catch (_e) {
    /* library surface may vary */
  }
}

async function initHeroTubes() {
  const canvas = document.getElementById("heroTubesCanvas");
  const layer = document.getElementById("heroTubesLayer");
  const hero = document.getElementById("hero");
  if (!canvas || !layer || !hero) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    layer.classList.add("is-hidden");
    return;
  }

  let app = null;
  let paletteIndex = 0;

  try {
    const mod = await import(TUBES_CDN);
    const TubesCursor = mod.default;
    if (typeof TubesCursor !== "function") {
      layer.classList.add("is-hidden");
      return;
    }

    const initial = PALETTES[0];
    app = TubesCursor(canvas, {
      tubes: {
        colors: initial.tubes,
        lights: {
          intensity: initial.lights.intensity,
          colors: initial.lights.colors
        }
      }
    });
  } catch (_err) {
    layer.classList.add("is-hidden");
    return;
  }

  hero.addEventListener(
    "click",
    (e) => {
      if (e.target.closest("a, button, input, textarea, select, label")) return;
      paletteIndex += 1;
      applyPalette(app, paletteIndex);
    },
    { passive: true }
  );
}

initHeroTubes();
