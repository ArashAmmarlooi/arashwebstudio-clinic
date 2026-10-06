# Clinique Élan — Clinic Website Template

Modern bilingual (EN/FR) clinic template with GSAP scroll animations, light/dark mode, online booking, and a visual studio for #336699 brand overlays.

## Deploy on Vercel

Same pattern as the restaurant demo: this app is its **own Vercel project**. Your main site at `arashwebstudio.com` can redirect `/clinic` to it.

### 1. Deploy the clinic (this folder)

1. Push this folder to GitHub (own repo or monorepo subfolder).
2. [Vercel](https://vercel.com) → **Add New → Project** → import the repo.
3. If the repo root is not this folder, set **Root Directory** to `Templates/Clinic` (or wherever this project lives).
4. Framework preset: **Vite** (auto-detected). Build: `npm run build`, output: `dist`.
5. Deploy. Note the URL, e.g. `https://arashwebstudio-clinic.vercel.app`.

Optional: in the Vercel project **Settings → General**, set **Project Name** to `arashwebstudio-clinic` so the URL matches.

### 2. Link from your main website

In the **arashwebstudio** Next.js project (already on Vercel):

1. **Settings → Environment Variables** → add:
   - `NEXT_PUBLIC_CLINIC_DEMO_URL` = your clinic Vercel URL (no trailing slash)
2. Redeploy the main site.

Then visitors can open:

- **https://www.arashwebstudio.com/clinic** (also `/clinic-demo`)

They are redirected to the live clinic template, like `/restaurant-demo`.

### CLI (optional)

From this folder, after `npm i -g vercel` and `vercel login`:

```bash
npm install
vercel --prod
```

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Customize

- Brand color: `src/data/site.ts` and CSS variables in `src/styles/global.css`
- Copy & translations: `src/i18n/translations.ts`
- Replace images in `public/images/` or use **Visual studio** (`/studio`)

Bookings are stored in `localStorage` under `clinique-elan-bookings` for demo purposes.
