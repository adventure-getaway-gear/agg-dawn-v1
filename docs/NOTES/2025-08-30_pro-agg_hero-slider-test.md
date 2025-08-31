# Notes — PRO-AGG Foundation & Hero Slider Test (2025-08-30)

## Summary
- Established a repeatable **stage-only** workflow on the **Dawn** theme.
- Created and tested `pro_agg_hero_slider` with **schema name** `PRO-AGG Hero` (≤ 20 chars).
- Fixed Liquid CTA anchor syntax and enforced display-name length to avoid Shopify validation errors.

## Decisions
- **Schema/Presets prefix**: `PRO-AGG ` (with hyphen), target ≤ 20 chars (≤ 25 hard limit).
- **Files prefix**: `pro_agg_` (lowercase, underscores) for sections/assets/templates.
- **Flow**: Create files → **git add** only → commit/push via **GitHub Desktop**.
- **Tooling**: Windows **PowerShell 7**, no Shopify CLI, GitHub → Shopify staging theme.

## Action Items
- Chris: Use Copilot Pro with the foundation rules to scaffold sections (Liquid + CSS + JSON + stage-only PS).
- Chris: Commit and push via GitHub Desktop; confirm Shopify picks up changes on the staging theme.
- Chris: Add `page.pro_agg_*` templates to quickly mount/test new sections as needed.

## Follow-ups
- Expand hero into multi-slide **blocks** with per-element 9-point positioning and animations.
- Add separate **video hero** section (`pro_agg_hero_video`) when ready.
- Keep docs updated (`docs/`) and surface links from `README.md`.
