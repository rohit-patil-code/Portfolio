# Rohit Patil | Interactive Space-Themed Developer Portfolio

Welcome to the repository for my personal portfolio! This project is a highly creative, interactive web application built to showcase my software engineering journey, skills, projects, and active coding consistency.

Rather than relying on a standard template, I engineered this portfolio from scratch, merging **modern web performance techniques** with **custom HTML5 Canvas particle systems** and **cinematic motion design** to create an deeply engaging cosmic experience.

## 🛠️ Core Tech Stack

This application is built aggressively targeting performance, type safety, and fluid interactions:

- **Framework**: [Next.js](https://nextjs.org/) (App Router) - Utilized for fast server-rendering, static site generation, and backend API route handling.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Ensuring strict type safety across complex mathematical canvas simulations and API responses.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) - For responsive, utility-first design over a fixed dark space background.
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Orchestrating everything from scroll-reveal interactions to complex multi-phase cinematic timelines.
- **Graphics & Physics**: Vanilla HTML5 Canvas (`<canvas>`) API 

---

## 🌌 The Engine: Custom Canvas & Motion Architecture

This portfolio stands out primarily due to its intricate, hand-coded background simulations and entry sequence.

### 1. The Cinematic Rocket Entry Sequence (`RocketEntry.tsx`)
When a user first loads the site, they are greeted by a fully choreographed "hyper-drive" intro sequence before the main portfolio is revealed. This is controlled via a custom state machine utilizing Framer Motion's `AnimatePresence`.

**The Timeline Phases:**
1. **`typing`**: A simulated terminal initialization ("Preparing for the journey...") powered by staggered opacity delays via Framer Motion.
2. **`ready` & `ignition`**: An SVG rocket (drawn from scratch) fades in. An animated engine exhaust flame ignites, powered by looping Framer Motion scale and blur gradients.
3. **`hyperspace`**: The HTML canvas background instantly switches gears. It generates hundreds of "light-speed" starlines that fly downwards exponentially faster. Simultaneously, the rocket begins aggressive X/Y/rotation shaking arrays to simulate turbulence.
4. **`blast`**: A massive white radial blur expands 20x its size, blinding the screen in a "Warp Blast" flash.
5. **Session Storage**: The sequence resolves, unmounting itself permanently for the user's session utilizing `sessionStorage`, seamlessly revealing the main portfolio using global CSS unlocking.

### 2. The Interactive Starfield Background (`Starfield.tsx`)
Behind the entire portfolio runs a highly optimized, full-screen HTML5 Canvas simulation looping via `requestAnimationFrame`.

**Features of the Simulation Engine:**
*   **Parallax Layers**: Generates thousands of stars (amount scales securely based on window size). Stars are mathematically distributed into 3 "Z-depths" (Z=1, 2, 3), calculating size and parallax shift differently so background stars move slower than foreground stars as you move the mouse.
*   **Pseudo-Gravitational Lensing**: In the top right quadrant lies an invisible "Black Hole". As the mouse pans the parallax grid, any star moving too close mathematically bends its trajectory around the radius of the anomaly.
*   **Space-Time Grid**: A faint blue interlocking grid is drawn iteratively via trigonometry (`Math.atan2` / `Math.hypot`). The grid intersections visibly "warp" and pull inward physically towards the black hole's coordinates.
*   **Asteroids & Comets**: 
    *   **Rotating Meteors**: Complex angular polygons dynamically generated with math functions `(Math.cos / Math.sin)`, rotating and drifting slowly across the deep space canvas. 
    *   **Shooting Stars**: Trigger on random probability intervals, flying diagonally across the screen drawing a linear gradient tail that fades opacity rapidly over frames.
*   **Accessibility**: A listener actively checks `(prefers-reduced-motion: reduce)`. If triggered by the OS, it safely disables all parallax tracking, warp animations, and high-velocity background comets to guarantee an accessible experience.

### 3. Granular Scroll Reveals (`ScrollReveal.tsx`)
As the user traverses downward through the space setting, the `Hero`, `About`, `Projects`, etc., elegantly fade upward. This is driven by an Intersection Observer hook in Framer Motion (`whileInView`), assuring components only mount and animate exactly as they cross the viewport threshold.

---

## 👨‍💻 Live Contribution Dashboards (Next.js ISR)

Beyond the aesthetics, the site acts as a live dashboard for my continuous coding metrics by seamlessly blending third-party data layers inside the dark theme.

### The Problem: LeetCode CORS Restrictions
While the **GitHub Contribution Grid** easily hooks into an external SVG renderer that accurately paints the classic GitHub green blocks, **LeetCode** does not offer an easy way to scrape calendar grids natively. Most external APIs are unreliable or bottlenecked by CORS.

### The Solution: Background Server Fetching (`/api/leetcode/route.ts`)
To solve this, I built a custom API route handler in Next.js that operates as a secure middleman:

1.  **Direct GraphQL Querying**: The Next.js Node server makes a secure `POST` fetch directly to `https://leetcode.com/graphql`, requesting my `userProfileCalendar`.
2.  **Data Transformation**: The API parses the chaotic UNIX timestamp map `{"1708992000": 2}` and structures it into a pristine array (`[{date, count, level}]`) mapping precisely identically to the `react-activity-calendar` component requirements. 
3.  **The Next.js ISR Cache Engine (`revalidate=3600`)**: If the client fetched this, the site would be slow and rate-limited. Instead, the route is configured with **Incremental Static Regeneration**. Every time someone switches the toggle to "LeetCode", Next.js instantly returns a statically cached HTML block (0ms latency). Behind the scenes, Next.js checks if the cache is older than 1 hour. If it is, the server quietly wakes up, re-queries LeetCode, parses it, and seamlessly updates the static cache for the exact next visitor.

You can switch smoothly between the **GitHub** and **LeetCode** tabs using the Lucide React iconic switch toggles.

---

*Thank you for exploring my codebase and reading about the architecture! The code should serve as an exciting demonstration of combining heavy visual CSS/Canvas rendering optimizations with modern JS framework boundaries.*
