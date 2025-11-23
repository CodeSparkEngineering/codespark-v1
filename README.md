<div align="center">
  <br />
    <a href="#" target="_blank">
      <img src="https://via.placeholder.com/1200x400/050505/00f3ff?text=CodeSpark+Engineering+Project+Banner" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
    <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
    <img src="https://img.shields.io/badge/-Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white" />
    <img src="https://img.shields.io/badge/-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
    <img src="https://img.shields.io/badge/-Zustand-443E38?style=for-the-badge&logo=react&logoColor=white" />
  </div>

  <h3 align="center">CodeSpark Engineering | Corporate Immersive Platform</h3>

  <div align="center">
    The official high-performance landing page for CodeSpark Engineering. <br/>
    Built for the future of <b>AI, Cybersecurity, and Software Development</b>.
  </div>
</div>

## 📋 <a name="table">Table of Contents</a>

1. ⚡ [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🏗️ [Architecture](#architecture)
5. 🤸 [Quick Start](#quick-start)
6. 🚀 [Deployment](#deployment)

## <a name="introduction">⚡ Introduction</a>

**CodeSpark Engineering** is a next-generation corporate website designed to convey authority in Artificial Intelligence and Offensive Cybersecurity.

This project moves away from traditional static layouts, implementing a **Cyberpunk/High-Tech aesthetic** powered by WebGL. It features a fully interactive 3D particle neural network, glassmorphism UI elements, and scroll-driven reveals, all while maintaining high performance and accessibility.

The goal is to provide an immersive user experience (UX) that reflects the company's motto: *"Security First. Innovation Always."*

## <a name="tech-stack">⚙️ Tech Stack</a>

- **[React 18](https://react.dev/)** - The core library for building the component-based user interface, utilizing the latest hooks and concurrent features for smooth rendering.
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling. Chosen for its lightning-fast HMR (Hot Module Replacement) and optimized production builds.
- **[Three.js](https://threejs.org/) & [R3F](https://docs.pmnd.rs/react-three-fiber)** - Powers the **Hero Section**. We use React Three Fiber to render the interactive 3D particle globe representing global data connections.
- **[GSAP](https://gsap.com/)** - The industry standard for high-performance animations. We utilize **ScrollTrigger** to orchestrate complex entrance animations and pinning effects without layout thrashing.
- **[Tailwind CSS](https://tailwindcss.com/)** - A utility-first CSS framework used for rapid UI development, handling the complex "Neon & Dark Mode" color palette and responsive grid layouts.
- **[Zustand](https://zustand-demo.pmnd.rs/)** - A small, fast, and scalable bearbones state-management solution. It handles the global UI state (menu toggles, modal states).
- **[Immer](https://immerjs.github.io/immer/)** - Integrated with Zustand to allow working with immutable state in a more convenient way (mutating the draft state).

## <a name="features">🔋 Features</a>

👉 **Interactive 3D Neural Network**:  A custom Three.js shader implementation that reacts to mouse movement, symbolizing the "Spark" of AI.

👉 **Cyberpunk Glassmorphism UI**: Heavy use of `backdrop-filter: blur()` combined with neon borders (`#00f3ff`) to create a futuristic, depth-rich interface.

👉 **High-Order Component (HOC) Animations**: A custom `withScrollReveal` HOC that wraps functional components to automatically apply GSAP enter-animations.

👉 **Reactive Global State**: Seamless state management for complex UI interactions using Zustand + Immer middleware.

👉 **Performance Optimized**: Lazy loading of 3D assets and code-splitting to ensure high Core Web Vitals scores despite heavy visuals.

👉 **Mobile-First Responsiveness**: A fluid layout that adapts the 3D canvas and grid systems for touch devices.

## <a name="architecture">🏗️ Architecture</a>

This project follows a scalable feature-based structure:

```bash
src/
├── components/        # Reusable UI components (Buttons, Cards)
├── features/          # Feature specific components (Hero3D, ServicesGrid)
├── hocs/              # High-Order Components (withScrollReveal)
├── store/             # Zustand stores (useUIStore)
├── styles/            # Tailwind custom config & Global CSS
└── App.jsx            # Main entry point
