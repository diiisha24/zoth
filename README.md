# Token Sale Landing Page

A single-page token-sale landing page built from the provided Figma design. It uses Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui. Live sale data comes from a mock API route through TanStack Query, and the stage countdown updates every second.

**Live demo:** https://zoth-seven.vercel.app/
**Repository:** https://github.com/diiisha24/zoth

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js 15.5.28 (App Router), React 19.1.10 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS 4, design tokens in `src/app/globals.css` |
| UI primitives | shadcn/ui (new-york style): Button, Progress, Input, Skeleton |
| Data fetching | TanStack Query 5 |
| Icons | lucide-react (ISC) |

All dependencies use permissive licenses (MIT, ISC or Apache-2.0).

## Getting started

Requirements: Node.js 20 or later, and npm 10.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
```

No environment variables are needed.

## Project structure

```text
src/
  app/
    api/sale/route.ts       GET  – mock sale snapshot (no-store)
    api/subscribe/route.ts  POST – mock newsletter signup (validates only)
    layout.tsx              fonts, metadata, providers
    page.tsx                page composition
    providers.tsx           TanStack QueryClientProvider
    globals.css             theme tokens, container utility, marquee
  components/
    ui/                     shadcn/ui primitives
    landing/                page sections (header, hero, buy panel, countdown,
                            partner strip, sale details, footer, …)
  hooks/
    use-sale.ts             useQuery wrapper with polling and response checks
    use-countdown.ts        1-second ticker with clock-skew correction
  lib/
    sale.ts                 types + deterministic mock data generator
    format.ts               Intl number/currency helpers
```

## Key decisions

### Data flow
- **The mock API is a pure function of time.** `getSaleSnapshot(now)` derives every value from the current timestamp. Raised amount, tokens sold and participant count all grow through a stage, so the 30-second polling shows the page updating live.
- **The deadline rolls forward.** Each stage lasts three days, measured from a fixed anchor date. The countdown therefore never reaches zero for good on a long-lived deployment. When it does hit zero, the query is invalidated and the next deadline loads.
- **Responses are checked at runtime.** `isSaleSnapshot` guards the parsed JSON, so a malformed response shows up as a query error instead of a broken UI. That error state shows a **Retry** button.
- **Loading states.** Every live value renders a skeleton of matching size until data arrives, which avoids layout shift.

### Countdown
- **No hydration mismatch.** The timer renders `--` on the server and starts ticking only after mount.
- **Clock-skew correction.** The API returns `serverTime`, and the client offsets its own clock by the difference. Visitors with a wrong device clock still see the correct remaining time.
- **No drift.** Ticks are aligned to wall-clock second boundaries.
- **Screen-reader friendly.** Screen readers get a minute-level summary instead of an announcement every second.

### Design fidelity
- **Copy and layout.** Copy follows the Figma placeholders ("Demo", "Lorem ipsum"). Only the `[XX]` slots are filled with live values from the API. Sizes, colors, spacing and the 1386px content column follow the exported measurements.
- **Recreated assets.** The Figma export referenced PNG/SVG slices that were not supplied. These were rebuilt in code: the perspective grid background (generated SVG), corner-tick frames, bracket badge, glow, and the timer and detail icons (lucide).
- **Partner logos.** These are neutral "Demo" placeholder marks. Real partner logos need marketing/legal approval before use.
- **Fonts.** Roobert and SF Pro are commercial fonts, so they are replaced with Inter Tight (display) and Inter (body), both under the Open Font License.
- **Footer.** The large "DEMO" wordmark at the bottom of the footer was removed at the client's request.

### Responsive behavior
- One column on mobile; the hero becomes two columns at `lg`, and sale details at `xl`.
- Below `lg`, the nav collapses into a menu button. Below `md`, the milestones switch to a vertical timeline.
- The page was checked at 390px, 820px and 1698px with no horizontal overflow.

### Accessibility
- Semantic landmarks and heading order.
- `aria-pressed` on the option toggles, a `role="timer"` countdown, and real `progressbar` semantics through Radix.
- Visible focus rings, and Escape closes the mobile menu.
- The marquee stops when the user prefers reduced motion.

### Security and privacy
- The newsletter endpoint validates input server-side and **stores nothing**. Connect a real email provider and record consent before launch (GDPR / DPDP).
- No secrets are used; the `X-Powered-By` header is turned off.
- Dependencies are pinned to patched releases: Next.js 15.5.28 (fixes CVE-2025-66478 and later advisories), React 19.1.10 and sharp 0.35.5.
- One audit finding remains: a `postcss` copy bundled inside Next.js. It runs only at build time on our own CSS, and fixing it needs a breaking Next.js upgrade, so it is accepted for now. Review it when moving to Next.js 16.

## Known limitations and next steps
- The purchase options are UI-only. Wallet or card checkout integration is out of scope.
- Footer and document links are placeholders (`#`).
- Real copy, partner logos and legal disclaimer text are needed from the client.
- Possible additions: unit tests for `getSaleSnapshot` and `getCountdownParts`, and Playwright visual regression tests.

## Deployment

The project is ready to deploy on Vercel with zero configuration: import the repository and keep the default Next.js settings.
