# 🪐 MishtiLabs — Product Studio & Creative Tech Suite

<p align="center">
  <img src="https://raw.githubusercontent.com/mishtilabs/mishtilabs/master/public/img/studio/banner.png" alt="MishtiLabs Banner" width="100%" />
</p>

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

Through **MishtiLabs**, we build and operate 28+ internal products and help ambitious companies scale their technical architectures from zero to millions of users.

---

## 🚀 Featured Offerings

We build, operate, and maintain 28+ in-house offerings. Here are our highlighted projects:

| Product | Description | Status | Website |
| :--- | :--- | :--- | :--- |
| **Pravah** | India-first CRM featuring multilingual pipelines, native WhatsApp messaging, and GST invoicing. | ![Live](https://img.shields.io/badge/Live-22c55e?style=flat-square&logo=whatsapp&logoColor=white) | [pravah.mishtilabs.com ↗](https://pravah.mishtilabs.com/) |
| **FlowLife** | Unified personal finance and productivity suite connecting expense tracking and task flows. | ![Live](https://img.shields.io/badge/Live-22c55e?style=flat-square&logo=googlepay&logoColor=white) | [flowlife.mishtilabs.com ↗](https://flowlife.mishtilabs.com/) |
| **GrowRight** | Gentle parent companion app for milestones, pediatrician logs, and sleep tracking. | ![Soon](https://img.shields.io/badge/Soon-a78bfa?style=flat-square) | — |
| **WeddingVerse** | End-to-end wedding planning toolkit for modern couples and planners. | ![Soon](https://img.shields.io/badge/Soon-a78bfa?style=flat-square) | — |
| **Vidya AI** | Socratic learning pathways and rubric-based grading engines. | ![Soon](https://img.shields.io/badge/Soon-a78bfa?style=flat-square) | — |

---

## 🛠 Skills & Technology Suite

### Frontend & Creative Engineering
<p align="left">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Three.js-black?style=flat-square&logo=threedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Framer_Motion-black?style=flat-square&logo=framer&logoColor=white" />
</p>

### Backend & Platform Engineering
<p align="left">
  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" />
  <img src="https://img.shields.io/badge/Rust-000000?style=flat-square&logo=rust&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Kubernetes-326CE5?style=flat-square&logo=kubernetes&logoColor=white" />
  <img src="https://img.shields.io/badge/Terraform-7B42BC?style=flat-square&logo=terraform&logoColor=white" />
</p>

---

## 📈 GitHub Metrics

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=mishtilabs&show_icons=true&theme=tokyonight&count_private=true" alt="MishtiLabs GitHub Stats" />
  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=mishtilabs&layout=compact&theme=tokyonight" alt="Top Languages" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=mishtilabs&theme=tokyonight" alt="GitHub Streak" />
</p>

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
