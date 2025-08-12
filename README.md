# AGG Dawn V1 Theme

Custom Shopify theme (Dawn base) for Adventure Getaway Gear.

## Highlights
- Slideshow hero (`sections/hero-banner-agg-slideshow.liquid`) with autoplay, dots/arrows, swipe, keyboard nav, ARIA, progress bar, per-slide content (headline, subheadline, two CTAs).
- Image animations: Ken Burns, Ambient Drift, Parallax, Zoom, Blur/Focus, Crossfade, Light Sweep, swipe cover/uncover, Gradient Drift, Lens Flare, Mist/Fog, Mouse Parallax.
- Text animations per element: fade variants and Shimmer (moving glint + sparkles), plus distinct Text FX (Sparkle/Glitter) rendered inside glyphs with background-clip.
- Canvas-optional sparkle/glitter patterns with caching, driven by size/frequency sliders (global and per-slide).
- Button effects: 3D visual styles (raised/inset/neumorphic/glass/embossed), animation styles (shimmer/pulse/glow/lift) with per-mode speeds; shimmer band width controls (global, per-variant, per-slide for primary/secondary).
 - Button effects: 3D visual styles (raised/inset/neumorphic/glass/embossed), animation styles (shimmer/pulse/glow/lift) with per-mode speeds; shimmer band width controls (global, per-variant, per-slide for primary/secondary); per-variant shimmer speed multipliers.
- Header “tuck under” + adjustable header bottom offset to eliminate sticky-header gap.
- Accessibility and SEO: ARIA carousel, keyboard/swipe, lazy/decoding, JSON-LD for gallery/single image.

## Settings Panel (Overview)
Grouped headers keep controls scannable:
- SEO & Accessibility: fallback image/alt, ARIA label.
- Ambient & Text Shimmer: global shimmer color/speed, sparkle density, glint strength/width, twinkle toggle + speed, tuck-under header + offset.
- Effect Customization Controls
	- Global Image Effects: default/force, sparkle/glitter color, density/intensity, speed.
	- Global Text Effects (Sparkle/Glitter): default/force, color, intensity, speed, position, size, frequency.
	- Button Effects: global animation styles and speeds, per-variant shimmer speed multipliers, shimmer band width fallback + per-variant widths, CTA gap, global 3D style.
- Global Content Positioning

Per-slide block controls:
- Image Animation: type, intensity, speed (+ custom), slide-in styles with easing, sparkle/glitter per-slide options.
- Headline/Subheadline: text, sizes/colors/positions; text animation type/speed/easing; shimmer color/speed; twinkle enable; sparkle density, glint strength/width. Text FX (Sparkle/Glitter) with color/intensity/speed/position and size/frequency.
- CTA Buttons: variant, size, per-CTA animation styles (cont/hover/click) and enable toggles; per-mode speeds; per-slide shimmer band width for primary/secondary; optional visual overrides (borders, size, gradients); layout gap overrides.
 - Advanced: Toggle “Show Advanced Settings” in the section to reveal deeper/technical controls (for reference; Shopify doesn’t allow true conditional hiding, so info hints indicate when a field applies).
- Reset: “Reset to global defaults” disables slide-level shimmer/twinkle/CTA overrides and size/color overrides.

Notes on shimmer vs. twinkle and Text FX:
- Shimmer is the moving sheen and base sparkles in the text; Twinkle adds extra animated sparkle pops on top.
- Text FX (Sparkle/Glitter) are separate visual fills rendered in the glyphs; they can be used with or without Shimmer.

## Performance & Accessibility
- Images use responsive `srcset`, `sizes="100vw"`, `decoding="async"`, and `loading="eager"` for the first slide then `lazy` for others; `fetchpriority=high` for the first slide.
- Animations respect `prefers-reduced-motion: reduce` to minimize motion.
- CSS uses variables and efficient keyframes; optional canvas patterns are tiny tiles with a JS-side cache.
- Carousel supports keyboard arrows, labeled dots with `role=tab`, and live region announcements.

## SEO & Metadata
- Per-section JSON-LD: `ImageGallery` (multiple slides) or `ImageObject` (single slide) with name/description and image URLs.
- Add descriptive Alt text per slide (`slide_alt`) for accessibility; ARIA label override available.
- Open Graph: Use your theme’s existing OG tags; hero images will be present in markup and can be referenced in your theme head if desired.

## Using the Slideshow Hero
1. Add “AGG Slideshow Hero” on the home page.
2. Add slides and set image, alt, link, and animation. Then add headline/subheadline + text/FX.
3. Configure Button Effects: choose animation styles, adjust per-mode speeds, and set shimmer band widths (global fallback, per-variant, and per-slide primary/secondary as needed).
4. Use Reset in a slide to quickly revert to global defaults.

## Tips & Tweaks
- Keep shimmer subtle on mobile; reduce shimmer band width to ~140–200px for smaller buttons.
- For dense glitter on large fonts, increase Text FX size to ~24–32 and frequency to ~16–24.
- Prefer `raised` or `glass` 3D styles for bright hero imagery; use `inset` on darker backgrounds.

## GitHub ⇄ Shopify Workflow
1. Commit locally; pull with rebase; push to `main`.
2. Use `scripts/git-commit-push.ps1 -Message "..." -NoPrompt` for one-step commit/pull --rebase/push.

## Change Log
### 2025-08-12
- CTA shimmer: wired global fallback band width and added per-variant (primary/secondary) + per-slide overrides.
- Consolidated Button Effects header; added info hints and UI polish.
 - Added per-variant shimmer speed multipliers; added Show Advanced Settings toggle (UX hint).

### 2025-08-11
- Twinkle stagger, independent opacity, per-element toggles; header gap polish.

---
Internal build documentation.
