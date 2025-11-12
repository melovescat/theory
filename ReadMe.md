# Simulation Theory

Simulation Theory is a web-based hardware simulation environment that fuses schematic authoring, 3D spatial planning, and a curated catalog of development boards, sensors, and modules. The application ships as a modern Vite + React single-page application that can be deployed directly to GitHub Pages.

## Features

- **Comprehensive board catalog:** 300 curated platforms spanning Arduino, Raspberry Pi / SBC, and FPGA ecosystems with footprints and quick specs.
- **Module & sensor explorer:** Searchable library with compatibility hints, datasheet links, and one-click importing into the workspace.
- **Datasheet-aware importing:** Paste any module URL to automatically fetch (via the `r.jina.ai` open proxy) and build a placeholder component with schematic + 3D metadata. Graceful fallback ensures a placeholder module is always added, even when the fetch is blocked.
- **Schematic workspace:** Drag-and-drop canvas with grid snapping for arranging boards and modules, suitable for wiring plans and top-down documentation.
- **3D studio:** Orbit around a three.js powered preview that extrudes each module into volumetric geometry for fit and clearance checks.
- **Module inspector:** Fine-tune XYZ offsets and Euler rotations, and remove modules when no longer required.
- **Simulation console:** At-a-glance metrics for power budget, IO utilization, and platform context.
- **Interactive onboarding:** A guided tour highlights key regions of the interface for first-time visitors.
- **Modern UI:** Tailwind CSS powered glassmorphism aesthetic that remains beginner friendly and keyboard accessible.

## Project Structure

```
└─ simulation-theory/
   ├─ src/
   │  ├─ App.tsx                # Root application shell
   │  ├─ main.tsx               # React entry point
   │  ├─ components/            # Presentational and workspace components
   │  ├─ data/                  # Board and module catalog definitions
   │  ├─ hooks/                 # Import + utility hooks
   │  ├─ state/                 # Zustand store for simulator state
   │  ├─ styles/                # Tailwind entry point and shared styles
   │  └─ types.ts               # Shared TypeScript interfaces
   ├─ public/                   # Static assets (logo, favicons)
   ├─ index.html                # Vite index file
   ├─ package.json              # Scripts & dependencies
   └─ tailwind.config.js        # Tailwind theme configuration
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   The app is available at [http://localhost:5173](http://localhost:5173).

3. **Build for production**

   ```bash
   npm run build
   ```

   Output assets are emitted to `dist/` and can be hosted on GitHub Pages.

4. **Preview the production build**

   ```bash
   npm run preview
   ```

## Deployment to GitHub Pages

The repository ships with a GitHub Actions workflow that builds the Vite project and publishes the `dist/` folder to the `gh-pages` environment. Static assets are referenced with relative paths (`base: './'` in `vite.config.ts`), so the bundle works automatically under project pages such as `https://username.github.io/simulation-theory/`.

1. Push the project to GitHub with a default branch named `main`.
2. Navigate to **Settings → Pages** and choose **GitHub Actions** as the deployment source. The included `Deploy Simulation Theory to GitHub Pages` workflow will appear in the history.
3. Trigger a deployment by pushing to `main` or by running the workflow manually via **Actions → Deploy Simulation Theory to GitHub Pages → Run workflow**.
4. Wait for the workflow to finish; GitHub will display the live URL once the `deploy` job completes.

## Importing Modules from the Web

The importer relies on the free [`r.jina.ai`](https://r.jina.ai/) proxy to bypass common CORS restrictions for public datasheets. For private endpoints, or if the proxy is unavailable, Simulation Theory automatically creates a placeholder module so you can continue planning without interruption.

You can extend the importer to call any LLM or custom API by editing `src/hooks/useModuleImport.ts` and injecting your own transformation logic.

## License

Released under the MIT License. Customize and extend the experience to suit your hardware prototyping workflows.
