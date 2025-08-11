# AGG Dawn V1 Theme

Custom Shopify theme (Dawn base) for Adventure Getaway Gear.

## Current State (Baseline Restored)
We reverted enhancement commits (video mobile auto layout, 9-point positioning system, slider step changes) to return to the earlier simpler polished baseline you requested revisiting. The following commits were reverted in sequence:

- Enhance: video playback fixes & mobile portrait auto layout (aa86a9d)
- Fix: wrap positioning logic inside liquid tag (7d147ac)
- Fix: reduce offset slider steps (69a21ac)
- Feature: 9-point positioning & offsets (508560b)

This provides a lean hero banner ready for renewed polish pass.

## Goals
- Professional, performant, vendor‑neutral foundation.
- Hero banner with image/video (next iteration), overlay, dual CTAs.
- Strong SEO (structured data, accessible labels, alt text).
- GitHub ⇄ Shopify reliable sync workflow.

## Next Steps (Planned Re-Polish)
1. Re-introduce video support with robust autoplay / manual fallback.
2. Add optional mobile portrait auto layout (opt-in) instead of forced.
3. Rebuild positioning controls in a simplified tier (e.g., basic alignment + advanced toggle).
4. Introduce text wrap & alignment options (normal / no-wrap / balance).
5. Performance: lazy loading media & reducing inline CSS duplication.

## Deployment Workflow
1. Edit locally (feature branch recommended for future iterations).
2. Commit & push; Shopify Online Store editor may add 'Update from Shopify' commits—always pull --rebase to keep linear history.
3. After validation in a preview theme, publish changes.

## Notes
If you need to fast-forward back to the advanced hero version, we can cherry-pick or revert the revert commits.

### 2025-08-10 Reset (Image-only Hero)
Simplified `hero-banner-agg.liquid` back to an image-only banner (removed video logic, 9-point positioning, mobile auto layout) to start a new approach. Previous advanced version preserved on branch `backup-hero-banner-agg-advanced`.

### 2025-08-11 Added Slideshow Hero Section
Introduced a new section `hero-banner-agg-slideshow.liquid` providing a lightweight image slideshow hero:
- Fade transition, autoplay (toggle + interval seconds)
- Optional prev/next arrows and dots
- Overlay color + opacity reuse
- Fallback single image mode if no blocks defined
This keeps the original `hero-banner-agg.liquid` untouched (still image-only) while allowing experimentation without disturbing baseline.

---
Contact: Internal build documentation. 
