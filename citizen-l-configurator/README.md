# Cheeto Watches — Ladies Watch Configurator

A production-quality, multi-page marketing and product configurator experience for **Cheeto Watches**. The site presents three signature families (**ROUND**, **ARCLY**, **SQUARE**), a guided **watch configurator** with live pricing and preview, and an **About** narrative including founder profiles. The UI uses a cohesive **dark luxury** theme with warm gold accents, refined typography, and subtle motion.

---

## Table of contents

- [Repository](#repository)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Pages](#pages)
- [Assets and images](#assets-and-images)
- [Browser notes](#browser-notes)
- [Credits](#credits)

---

## Repository

Public source and full documentation for this static site live on GitHub:

**[https://github.com/ghaniatanveer/CHEETO-Watches-Website](https://github.com/ghaniatanveer/CHEETO-Watches-Website)**

---

## Features

- **Responsive layout** — Mobile-first navigation with collapsible menu; breakpoints at 768px and 1024px.
- **Marketing home** — Hero copy, collections overview, sustainability messaging, newsletter form, and scroll-driven reveals.
- **Hero visuals** — Optional **WebGL tube field** (`threejs-components` / Three.js from CDN) on the home hero with palette cycling; **vanilla 3D tilt** card for the hero watch image.
- **Collections** — Filterable, sortable catalog fed from client-side data; deep links to `#round`, `#arcly`, `#square`.
- **Configurator** — Three-step flow (collection → options → preview), dynamic options per collection, price animation, engraving validation (up to 3 alphanumeric characters), **localStorage** persistence, wishlist / quote toasts.
- **About** — Brand story, founder section (**Ghania Tanveer**, **Muhammad Haseeb**), craftsmanship, sustainability pledge.
- **Polish** — Particle background, back-to-top control, toast notifications, SVG fallbacks when remote images fail.

---

## Tech stack

| Area | Choice |
|------|--------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flex, `clamp`) |
| Scripting | Vanilla JavaScript (no framework) |
| 3D hero | ES module loading **threejs-components** `tubes1` from jsDelivr |
| Fonts | Google Fonts — Cormorant Garamond, Montserrat |

There is **no build step** and **no package manager** required to run the site.

---

## Project structure

```
citizen-l-configurator/
├── index.html              # Home + hero tubes + tilted card
├── collections.html        # Catalog filters / sort
├── configurator.html       # 3-step configurator
├── about.html              # Story + founders + pledge
├── README.md
├── css/
│   ├── style.css           # Global theme, layout, components
│   ├── animations.css      # Reveals, toasts, motion utilities
│   ├── configurator.css    # Configurator-specific layout
│   ├── tubes-hero.css      # Hero canvas + veil
│   └── tilted-card.css     # 3D tilt card
├── js/
│   ├── main.js             # Nav, newsletter, back-to-top, particles
│   ├── animations.js       # Scroll reveals, parallax hooks
│   ├── configurator.js     # Steps, pricing, storage, preview
│   ├── tubes-hero.js       # Hero WebGL tubes (ES module)
│   └── tilted-card.js      # Pointer-driven tilt + hover scale
└── assets/images/          # SVG fallbacks + raster hero / catalog assets
```

---

## Getting started

### Option A — Open directly

Open `index.html` in a modern desktop browser. Some features (e.g. ES module scripts) work best when the project is served over **HTTP**, not `file://`.

### Option B — Static server (recommended)

From the **repository root** or any parent directory:

```bash
npx serve "citizen-l-configurator"
```

Then visit the URL printed in the terminal (for example `http://localhost:3000`).

Other static servers (Python `http.server`, VS Code Live Server, etc.) work equally well.

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Landing: hero, tubes canvas, tilted watch, collection cards, sustainability, footer |
| `collections.html` | Full model listing with material / strap filters and sort controls |
| `configurator.html` | Interactive build-your-watch flow with live image and price |
| `about.html` | Brand positioning, founders, craft, sustainability |

---

## Assets and images

- **Remote images** — Unsplash URLs are used for several marketing and catalog shots, with **`onerror`** handlers swapping in local **SVG** placeholders where needed.
- **Local rasters** — Hero and specific catalog assets may live under `assets/images/` (for example hero tilt imagery); ensure those files are present for offline demos.

---

## Browser notes

- **JavaScript enabled** — Required for navigation, configurator, tubes hero, and animations.
- **WebGL** — The home hero tubes effect requires WebGL; if the CDN or WebGL fails, the rest of the page still renders; the canvas layer is non-blocking.
- **Network** — Tubes script and Google Fonts load from external CDNs; allow network access when demoing.

---

## Credits

- **Brand & site:** Cheeto Watches (concept project).
- **Founders (About):** Ghania Tanveer — creative direction; Muhammad Haseeb — product and technology direction.
- **Design & development:** Ghania Tanveer and Muhammad Haseeb.
- **Hero tubes inspiration:** Implementation follows the **threejs-components** cursor tubes pattern; concept lineage is noted in `js/tubes-hero.js`.

---

## License

This repository is provided as a **portfolio / educational** static site. If you fork or republish it, replace imagery and copy with your own licensed materials where appropriate.
