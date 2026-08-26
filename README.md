# YOUR STUDIO — Premium Digital Studio Portfolio & Website

A complete, production-grade website for an independent two-person creative technology and web engineering studio.

> **Design Philosophy**: Quiet Luxury × Premium Digital Studio × Minimal 3D.
> Built with React, TypeScript, Tailwind CSS, Three.js / WebGL, and modern web standards.

---

## 🏛️ Brand Name Centralization

The studio brand name is centralized in a single configuration file:
**[`src/config/siteConfig.ts`](./src/config/siteConfig.ts)**

```typescript
export const siteConfig: SiteConfig = {
  brandName: "YOUR STUDIO", // <-- Change this single variable to update the brand everywhere
  tagline: "Digital experiences built with intent.",
  email: "hello@example.com",
  phone: "+91 63631 94621",
  whatsappUrl: "https://wa.me/916363194621",
  ...
};
```

Changing `brandName` automatically cascades across:
- Top Navigation wordmark & branding
- Browser document titles and OpenGraph metadata
- Hero section and microcopy
- Selected work showcases and case studies
- Services, Approach, and Manifesto sections
- Contact form and direct communication cards
- Global footer and copyright notices

---

## 👥 Meet the Founders

- **Manjunath** — Founder / Lead (`+91 63631 94621`, `tel:+916363194621`, WhatsApp Lead)
- **Vishnuvardhan** — Co-Founder (`+91 73386 32238`, `tel:+917338632238`)

---

## 🚀 Available Pages & Routes

- `/` — **Home**: Hero with signature dark metallic 3D sculpture, Selected Work showcase, Services overview, Signature Manifesto, Strategic Process, Founders, and CTA.
- `/work` — **Selected Work**: Full editorial portfolio showcase.
- `/work/xyz-school` — **XYZ School Case Study**: The Challenge, The Approach, The Result, Interactive Browser Mockup, and verified live link (`https://xyz-school-website.vercel.app/`).
- `/work/swaram-music-academy` — **Swaram Music Academy Case Study**: The Challenge, The Approach, The Result, Interactive Browser Mockup.
- `/services` — **Services**: In-depth breakdown of the 6 core disciplines (Web Design, Web Development, Digital Experience, Conversion, Responsive Design, Website Support).
- `/approach` — **Approach**: The 5-step methodology ("We don't start with templates. We start with the problem.") and Studio Manifesto.
- `/about` — **About**: Honest studio positioning, 5 core beliefs, founder profiles, and transparent tech stack.
- `/contact` — **Contact & Start a Project**: Interactive, accessible enquiry form with field validation, service dropdown, direct phone lines, and WhatsApp chat integration.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Quiet Luxury Design Tokens
- **3D Engine**: Three.js WebGL with subtle mouse parallax and `prefers-reduced-motion` detection
- **Icons**: Lucide React
- **Routing**: React Router (DOM) with code splitting & lazy loading

---

## 💻 Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
