# H2GO — direction review

## Scope

Build one cohesive direction from Evergreen rather than four competing concepts. The homepage is now `/`; the original concept gallery is retained at `/concepts` and the four original `/design-*` routes remain available.

## Feedback applied

Scott's Figma comments were read from the Comments panel on 2026-11-10. Threads have been left open for review, not marked resolved.

| Comment | Implementation |
| --- | --- |
| #1: headers cut off | Semantic, unsplit headings in the new templates; responsive sizes and unclipped text. |
| #2: bolder sans-serif / italic | Inter Tight 600 and italic accents; Inter for body copy. No serif in the new direction. |
| #3: services below fold | Service cards are the first section after the hero. |
| #4 and reply: larger trust line + interactive proof | Dedicated Southern Ontario section, selectable project tabs, manual previous/next arrows and playable videos. Mike Holmes is selected first. No automatic advance while reading or watching. |
| #5: about becomes third section | Hero → service verticals → about. |
| #6: Evergreen brand | Navy, cyan, paper and blue tokens reused consistently. |
| #7: compare homepage heroes | Evergreen/Film selector for direction review. This is not a live randomized A/B experiment. |
| #8 and reply: Signal service hero + CTA stepper | Full-bleed background video, Evergreen palette, location → service → contact flow. |
| #9 and reply: interactive service grid | Image cards expand details with service-page and quote links. Every catalog offering has its own route. |
| #10: before/after; no pricing | Keyboard-accessible comparison concept on deck/patio detail page. Clearly labeled single-photo illustration pending paired assets. No pricing estimator. |

## Representative hierarchy

Three verticals, twenty specific service examples, one reusable detail template. Property management is mentioned on the source website but its final position awaits Anthony's category confirmation. This prototype does not claim to migrate the entire source site.

## Source and asset notes

- https://h2gomobilewash.com/ — brand, contact, HomeCare Club.
- https://h2gomobilewash.com/residential/ — residential taxonomy and residential video kBQDeD4Wipw.
- https://h2gomobilewash.com/commercial/ — commercial taxonomy and client/project context.
- https://h2gomobilewash.com/industrial/ — industrial taxonomy.
- https://h2gomobilewash.com/residential/driveway-cleaning/ — detail-page reference.
- https://h2gomobilewash.com/mike-holmes/ — project and video DVD1lJkS-b0.
- Existing repo video references: fleet washing 5u_iE_hFCF4, building wash L95M-ExvsrM, Hamilton hospital Vimeo 237971079.
- Instagram references in comments could not be retrieved; interaction choices follow Scott's written descriptions and call notes, without claiming to have viewed the reels.
- Industrial hero currently uses the existing fleet/equipment technology film pending a dedicated industrial film.
- Hamilton hospital's poster now uses the official thumbnail for the actual Vimeo project (237971079), retrieved through Vimeo's oEmbed API.
- The previous unverified numeric stats, fictional client labels and paraphrased quote presented as a direct testimonial are not used in the new direction.

## Integration and review needs

Quote form validates input, preserves earlier steps, preselects detail services, and produces a mailto draft addressed to H2GO. Nothing is posted or silently stored; the final state explicitly says it has not been submitted. Connect the lead API/CRM before production.

Production A/B testing needs analytics, agreed conversion events and an experiment plan. Current switch is only a review control.

## Design polish pass

- Removed italic type from the consolidated homepage, service and detail templates, and brand guide; retained the existing logo artwork.
- Reduced excessive tracking, increased supporting text sizes, and standardized spacing, buttons and heading line heights.
- Removed the review controls above the homepage hero. The film alternative remains at `/?hero=video`, linked from the brand guide.
- Aligned the four hero photos and removed staggered images overlapping the bottom band.
- Made service cards consistent: image, title, summary, expandable help, and a persistent detail link.
- Turned project selectors into clearer tabs and framed the active story as one card.
- Replaced the hospital placeholder image with the actual project's video thumbnail.
- Added named quote stages and descriptive progression buttons; HomeCare Club inquiries now arrive with the membership option selected.
- Simplified detail-page titles and added practical service assurances.
- Replaced the synthetic footer wordmark with the actual logo and customer-facing service/quote links.

Validation: production build and targeted ESLint passed. Homepage, service, service detail and brand guide checked at 1440px, 768px and 390px: no horizontal overflow, off-screen headings, or italic heading/accents. Mobile service expansion and HomeCare Club preselection verified. Quote draft behavior and project tab selection remain functional.

The Figma code layer imported before this polish pass is a snapshot of the previous revision; these refinements are in the local repository and running preview.

Final content, property-management taxonomy, dedicated industrial film, matched before/after photography and Chris's full SEO JSON are still needed. New service routes are prototype routes; existing production URLs should be preserved or mapped during migration.
