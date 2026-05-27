# 🪐 MishtiLabs — Product Studio & Creative Tech Suite

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16%20(Turbopack)-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS v4" />
  <img src="https://img.shields.io/badge/Three.js-WebGL-orange?style=for-the-badge&logo=three.js" alt="Three.js" />
  <img src="https://img.shields.io/badge/Motion-Framer-FF007F?style=for-the-badge&logo=framer" alt="Motion" />
</p>

---

## ✦ The Vision
**MishtiLabs** is a modern, high-end interactive product studio and development agency. *Mishti* means *sweet* in Bengali—a tribute to the warmth, care, and craftsman's pride we weave into our software. 

This repository houses the studio's primary storefront: a highly aesthetic, motion-rich, 3D-integrated showcase listing our suite of 28+ products (led by **Pravah CRM** and **FlowLife**), our core capabilities, and custom development services.

---

## 🎨 Immersive Design & Interactive Highlights

### 🪐 Cosmic 3D Canvas
Powered by `@react-three/fiber` and `@react-three/drei`. Features a custom-shaded icosahedron glass core, orbiting orbital nodes, interactive sparkles, and a deep starfield, dynamically adapting to light/dark themes.

### 🌗 Dual-Mesh Theming
* **Midnight/Cosmic Mode**: Deep midnight, electric cyan, and soft violet radial glows.
* **Warm Mishti Light Mode**: Soft cream background with saffron, deep rose, and amber highlight halos.
* Handled smoothly via `next-themes` with a custom spring-rotating sun/moon switch.

### ⚡ Performance & Physics
* **Magnetic Motion**: Mouse-following pointer glows, magnetic navigations, spring-counter statistics, and infinite horizontal text marquees.
* **Fully Responsive**: Edge-to-edge layouts, smooth mobile navigation drawer, and fully optimized WebP image rendering pipelines.
* **Accessibility**: Full support for `prefers-reduced-motion` to skip intensive 3D/physics calculations.

---

## 🛠 Tech Stack

| Category | Technology | Usage |
| :--- | :--- | :--- |
| **Core Framework** | Next.js 16 (App Router) | Static export generation, page rendering, file-based routing |
| **Language** | TypeScript | Strong typing, compilation safety, code predictability |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Modern tokens, custom utility classes, theme variables |
| **3D Engine** | Three.js + React Three Fiber | Real-time WebGL rendering, 3D lighting, glass shaders |
| **Motion Physics** | Motion (Framer) | Parallax scrolling, text reveals, hover spring animations |
| **Theming** | `next-themes` | Client-side theme detection, local storage sync, SSR safety |

---

## 📂 Project Architecture

```
mishtilabs/
├── public/                 # Static assets (optimized WebP, icons, SVGs)
├── scripts/
│   └── build-images.mjs    # Build-time image optimizer and cache manager
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Core viewport, HTML structure, global fonts
│   │   ├── globals.css     # CSS variable tokens, keyframes, theme maps
│   │   └── page.tsx        # Main entrypoint composing layout sections
│   ├── components/
│   │   ├── logo.tsx        # Animated SVG brandmark with self-drawing strokes
│   │   ├── three-scene.tsx # WebGL Canvas, 3D models, orbital lighting
│   │   ├── hero.tsx        # Title section with parallax and split-text
│   │   ├── products-grid.tsx # Live/Soon catalogue with interactive categories
│   │   └── footer.tsx      # Footer with responsive layout and large wordmark
│   └── lib/
│       ├── products.ts     # Configuration schema for all studio products
│       └── utils.ts        # Tailwind merge & styling utilities
└── next.config.ts          # Custom output config, unoptimized images
```

---

## 🚀 Getting Started

### Local Development

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```

2. Run the image pre-builder (downloads and optimizes picsum seeds into `public/img/products/`):
   ```bash
   npm run build-images
   ```

3. Spin up the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it.

### Build & Export

To create a fully optimized, production-ready static export:
```bash
npm run build
```
This generates raw HTML, CSS, and JS files in the `out/` (and synced `dist/`) directory, ready to deploy to any static host (GitHub Pages, Hostinger, Vercel, etc.).

---

## 🌐 Deployment & CI/CD
This project is configured with a automated GitHub Action workflow that:
1. Triggers on any push to the `master` branch.
2. Restores dependency and Next.js caches.
3. Automatically runs the build pipeline (`build-images` + static export `build`).
4. Deploys the static bundle straight to **GitHub Pages**.

---

<p align="center">
  Crafted with sweet precision in India. • <a href="https://mishtilabs.com">mishtilabs.com</a>
</p>
