# AGG Dawn V1 Theme

Custom Shopify theme (Dawn base) for Adventure Getaway Gear.

## Highlights
- Slideshow hero (`sections/hero-banner-agg-slideshow.liquid`) with autoplay, dots/arrows, swipe, progress bar, and per-slide content (headline, subheadline, two CTAs).
- Image animations: Ken Burns, Ambient Drift, Parallax, Zoom, Blur/Focus, Crossfade, Light Sweep, swipe cover/uncover, and mouse parallax.
- Text animations per element (headline/subheadline): fade variants and shimmer with glint + sparkles (aka “dazzle”).
- Shimmer controls: global color/speed, density, glint strength/width, twinkle enable + speed; per-slide overrides; per-element twinkle toggles for headline and subheadline.
- Header “tuck under” and adjustable header bottom offset to remove top gap.
- Accessibility (ARIA carousel, keyboard) and SEO (JSON-LD for gallery/single image).

## Using the Slideshow Hero
1. Add “AGG Slideshow Hero” on the home page.
2. Add slides (blocks). For each slide you can set:
	- Image animation, optional directional slide-in and easing.
	- Headline/Subheadline text, position, sizes, colors.
	- Text animation: choose Shimmer to enable shimmer for that element.
	- Per-element twinkle: toggle “Headline: enable twinkle overlay” or “Subheadline: enable twinkle overlay” to force twinkle for that element (overrides global twinkle).
	- CTA buttons: size, style (3D variants), and animation styles.
3. In section settings (left panel):
	- Text Shimmer: set global color/speed; toggle hover-only/once.
	- Sparkle density, Glint strength/width control the dazzle look.
	- Twinkle overlay: enable/disable globally and adjust Twinkle speed (ms).
	- Tuck under sticky header and Header bottom offset (px) remove top gap.

Notes on shimmer vs. twinkle:
- Shimmer provides the moving glint and static sparkles in the text fill.
- Twinkle is an extra animated sparkle overlay; disabling twinkle now keeps static sparkles visible.
- Per-element twinkle toggles let headline/subheadline opt in regardless of global.

## GitHub ⇄ Shopify Workflow
1. Commit changes locally; pull with rebase to resolve “Update from Shopify” commits.
2. Push to `main`; the Online Store editor live theme will sync your changes.
3. Use the provided VS Code tasks or the `scripts/git-commit-push.ps1` helper for one-step commit/pull --rebase/push.

## Change Log
### 2025-08-11
- Slideshow: Improved shimmer/dazzle by staggering three hbTwinkle passes for visible sparkle twinkle.
- Added independent twinkle opacity control so base sparkles remain when twinkle is off.
- Per-element twinkle toggles for headline and subheadline (`data-text-twinkle`) with block-level schema controls.
- Header gap polish: tuck-under + header bottom offset slider.

### 2025-08-10
- Reset `hero-banner-agg.liquid` to image-only baseline for a lean foundation.

---
Internal build documentation. 
