# H2GO Mobile Wash — Design Explorations

Four landing page concepts for [H2GO Mobile Wash](https://h2gomobilewash.com/), each built from a different visual reference. Every concept is a complete, animated page using real H2GO photography, services and copy.

| Route | Concept | Reference | Direction |
| --- | --- | --- | --- |
| `/design-1` | **Evergreen** | Cleanora (Webflow template) | Forest-green hero card, lime accents, staggered photo strip, animated stats, HomeCare Club block |
| `/design-2` | **Meadow** | Finaro | Paper card floating on ocean blue, floating pill nav, concentric rings, bento cards with live UI, stats grid |
| `/design-3` | **Northlight** | Upmind | Full-bleed photographic hero with floating tags, electric-blue-on-midnight partnerships band, editorial services |
| `/design-4` | **Signal** | Rachel (coaching template) | Vivid blue frame, black canvas, portrait hero with booking card, oversized quote, founder story |

`/` is an index linking the four. A floating switcher at the bottom of every concept lets you jump between them.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind CSS v4 (design tokens live in `src/app/globals.css`)
- Framer Motion for reveals, word-splitting, counters, parallax, clip-path image reveals, magnetic buttons
- `lucide-react` icons

## Run locally

```bash
npm install
npm run dev
```

The dev server runs on [http://localhost:4173](http://localhost:4173).

## Structure

```
src/
  app/
    page.tsx               # index of the four concepts
    design-1/evergreen.tsx
    design-2/meadow.tsx
    design-3/northlight.tsx
    design-4/signal.tsx
    globals.css            # tokens + keyframes
  components/
    motion.tsx             # Reveal, Stagger, SplitWords, Counter, ClipReveal, Parallax, Marquee, Magnetic
    design-switcher.tsx    # floating concept switcher
  lib/
    content.ts             # shared H2GO copy, services, stats, testimonial
public/h2go/               # imagery pulled from h2gomobilewash.com
```

## Background video

Concepts 03 (hero + closing CTA) and 04 (hero) use H2GO's own footage as looping, muted backgrounds via `src/components/video-background.tsx`:

- **Fleet Wash Service** (YouTube `5u_iE_hFCF4`) → 03 hero
- **Monument Restoration** (YouTube `TeDnoR-ewlI`) → 03 closing section
- **12-Story Apartment Building Wash** (YouTube `L95M-ExvsrM`) → 04 hero

The component keeps the still photo as a poster until the YouTube IFrame API reports playback, then cross-fades. To use self-hosted files instead (recommended for production), drop MP4s into `public/h2go/video/` with the names listed in `public/h2go/video/README.txt`; they are detected automatically and take precedence over the embeds.

## Notes

- Imagery is sourced from h2gomobilewash.com and is used here for concept work only.
- Statistics, review counts and "trusted by" names are placeholders and should be confirmed with H2GO before any of this ships.
