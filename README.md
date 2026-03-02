# VR Consultancy – Next.js 14 (App Router)

Premium “VR Consultancy” marketing site for US study abroad counseling, built with **Next.js 14 (App Router) + TypeScript + Tailwind + shadcn-style UI components** and ready for **GitHub → Vercel** deployment.

---

## Tech stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS
- **UI**: Lightweight shadcn-style components (buttons, cards, dialogs, tabs, badges)
- **Forms**: Simple HTML forms + Zod validation on the API
- **Lead capture**: Server-side POST to Google Sheets (Apps Script webhook)
- **State / browser storage**: `localStorage` for mock lead admin
- **Icons**: `lucide-react`

Branding:

- **Primary Red**: `#D11A2A`
- **Secondary Blue**: `#0B3D91`
- **Typography**: Inter (UI/body), Playfair Display (headings)
- **Dark mode**: Enabled via `next-themes`

---

## Getting started locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create your env file

Copy `.env.example` to `.env.local` and fill in values:

```bash
cp .env.example .env.local
```

Required for lead capture:

- **`GOOGLE_SHEETS_WEBHOOK_URL`** – Your Google Apps Script Web App `/exec` URL which writes rows into a Google Sheet.

Optional:

- **`WHATSAPP_NUMBER`** – E.g. `919030293217`. If set, a premium floating WhatsApp button is shown site‑wide.
- **`ADMIN_KEY`** – If set, `/admin/leads` is protected by a simple key gate. If omitted, `/admin/leads` is open (useful in dev).

> The app runs fine with only `GOOGLE_SHEETS_WEBHOOK_URL` configured. No database or other services are required to boot.

### 3. Run the dev server

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

## Lead capture – Google Sheets webhook

### API route

- **Endpoint**: `POST /api/leads`
- **Location**: `app/api/leads/route.ts`

Expected JSON payload:

```json
{
  "source": "enquire_modal | counseling_booking | contact_page | apply_flow",
  "name": "string",
  "email": "string",
  "phone": "string",
  "city": "string (optional)",
  "preferredIntake": "string (optional)",
  "interest": "string (optional)",
  "notes": "string (optional)",
  "utm": {
    "source": "string (optional)",
    "medium": "string (optional)",
    "campaign": "string (optional)"
  },
  "pageUrl": "string (optional)"
}
```

Server‑side behavior:

- Validates input with **Zod** (name, email, phone required).
- Builds a payload with `submittedAt` timestamp.
- Sends a **server‑to‑server** `POST` request to `process.env.GOOGLE_SHEETS_WEBHOOK_URL` (no CORS issues).
- If the webhook responds with `2xx`, returns:

```json
{ "ok": true }
```

- If validation fails, returns `400` with:

```json
{ "ok": false, "errors": { ...zodFlattenedErrors } }
```

- If the webhook fails or is unreachable, returns `500` with:

```json
{ "ok": false, "error": "message..." }
```

### Client helper

- **Location**: `lib/submit-lead.ts`
- **Signature**: `submitLead(payload)`

Responsibilities:

- Validates on the client with the same Zod schema.
- Calls `POST /api/leads` with the payload.
- On success:
  - Appends a lead object with `id` + `createdAt` timestamp to `localStorage` under key **`vr_leads`** (for `/admin/leads`).
  - Triggers a premium toast (success).
- On failure:
  - Triggers a toast with an appropriate error message.

### Where leads are submitted from

`submitLead` is wired into the following entry points:

1. **Programs Enquire modal** – `app/programs/page.tsx` + `components/program-enquire-modal.tsx`
2. **Contact page form** – `app/contact/page.tsx` + `components/contact-form.tsx`
3. **Counseling booking form** – `app/counseling/page.tsx` + `components/counseling-booking.tsx`
4. **Apply flow final submit** – `app/apply/page.tsx` + `components/apply-flow.tsx`

Each of these also passes along basic UTM params (`utm_source`, `utm_medium`, `utm_campaign`) from the URL when present.

Persistence note: in production you should back `/api/leads` with a real database (e.g. Postgres/Supabase). The current `localStorage` usage powers only the mock admin view.

---

## WhatsApp click‑to‑chat button

- **Env**: `WHATSAPP_NUMBER` (e.g. `919030293217`)
- **Implementation**:
  - Resolved in `app/layout.tsx` and passed to the global `SiteShell`.
  - Rendered site‑wide from `components/site-shell.tsx` as a floating button in the bottom‑right.
- **Link format**:

`https://wa.me/<number>?text=Hi%20VR%20Consultancy%2C%20I%E2%80%99m%20interested%20in%20studying%20in%20the%20USA.%20Please%20guide%20me.`

Styling:

- Rounded pill button with subtle shadow, using WhatsApp green and fitting into the overall red/blue VR brand.

If `WHATSAPP_NUMBER` is not set, the button is hidden automatically.

---

## Admin leads page (mock)

- **Route**: `/admin/leads`
- **Server file**: `app/admin/leads/page.tsx`
- **Client component**: `components/admin-leads-client.tsx`

Behavior:

- Reads leads from **`localStorage["vr_leads"]`** (the array written by `submitLead`).
- Shows a premium table with:
  - `timestamp`, `source`, `name`, `email`, `phone`
  - `city`, `preferredIntake`, `interest`, `notes`, `pageUrl`
  - UTM fields: `utm_source`, `utm_medium`, `utm_campaign`
- Features:
  - **Search** by name/email/phone
  - **Filter by source**
  - Sorted **newest first**
  - **Export CSV** (client‑side)
  - **Clear local leads** with confirm dialog (localStorage only – does not affect Google Sheets)

### Admin gate

- If **`ADMIN_KEY`** is set:
  - `/admin/leads` first shows a small login card.
  - The key is verified via `POST /api/admin/verify-key` against server‑side `process.env.ADMIN_KEY`.
  - On success, a flag is stored in `sessionStorage` and the leads table is shown.
- If **`ADMIN_KEY`** is **not** set:
  - The admin page is open (dev‑friendly default).

An “Admin” link is shown in the footer when `ADMIN_KEY` is set or when running in non‑production mode.

---

## Health, sitemap, robots

- **Health check route**: `app/api/health/route.ts`

```ts
GET /api/health -> { status: "ok" }
```

- **Sitemap**: `app/sitemap.ts` – generates a simple sitemap including core marketing and admin routes.
- **Robots**: `app/robots.ts` – allows all crawlers and points to `/sitemap.xml`.

These are all Vercel‑friendly (no custom server).

---

## Vercel deployment

This project is ready for **GitHub → Vercel** with zero custom server configuration.

### 1. Ensure scripts in `package.json`

Already configured:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 2. Push to GitHub

1. Create a new GitHub repository (e.g. `vr-consultancy`).
2. Initialize and push:

```bash
git init
git add .
git commit -m "Initial VR Consultancy site"
git branch -M main
git remote add origin git@github.com:<your-username>/vr-consultancy.git
git push -u origin main
```

### 3. Import into Vercel

1. Go to Vercel and click **“New Project” → “Import Git Repository”**.
2. Select your `vr-consultancy` repo.
3. Framework preset: **Next.js**.
4. Build command: **`npm run build`**.
5. Output: **Next.js default** (no custom output folder).
6. Node version: **18+** (or 20).

### 4. Configure environment variables in Vercel

In the project **Settings → Environment Variables**, add:

- `GOOGLE_SHEETS_WEBHOOK_URL` – your Apps Script Web App URL
- `WHATSAPP_NUMBER` – (optional) WhatsApp number for click‑to‑chat
- `ADMIN_KEY` – (optional) simple admin gate key

Re‑deploy after adding/updating env vars.

**Note:** Tailwind CSS, PostCSS, and Autoprefixer are in `dependencies` (not `devDependencies`) so they are installed on Vercel when `NODE_ENV=production`. This ensures the production CSS is built and the site is fully styled.

### 5. Verify deployment

Once deployment finishes, verify:

1. **Health** – visit `/api/health` to confirm you get:

```json
{ "status": "ok" }
```

2. **Leads API** – submit any of the forms (Programs, Contact, Counseling, Apply) and check that:
   - You see a success toast.
   - A new row appears in your Google Sheet.
   - `/admin/leads` shows the lead in the local table.

---

## Production notes

- The current lead persistence for the admin UI uses `localStorage` only; for real production use, connect `/api/leads` to a database.
- The Google Sheets webhook is ideal for light‑weight teams and early launches; plan a migration path to a database as volumes grow.
- All secrets (`GOOGLE_SHEETS_WEBHOOK_URL`, `ADMIN_KEY`) live strictly on the server (env vars) and are **never** exposed in client bundles.

---

## Scripts reference

- `npm run dev` – start local dev server
- `npm run build` – build for production (used by Vercel)
- `npm run start` – run the production build locally
- `npm run lint` – run linting via `eslint-config-next`

