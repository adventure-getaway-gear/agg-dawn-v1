# AGG Copilot Coding Agent Instructions (Lite)

**Project:** Adventure Getaway Gear (AGG) – Shopify Dawn theme  
**Goal:** Tell Copilot exactly how to work in this repo.

## Golden Rules
- Never push directly to `main` (live).  
- Staging branch name is **exactly** `adventure-getaway-gear-staging` (never rename).  
- Standard flow: `feature` → PR → `adventure-getaway-gear-staging` → PR → `main`.  
- Use GitHub Desktop for commit/push (visual, safe).  
- If you use the Shopify Customizer, it edits files (e.g., `config/settings_data.json`, `templates/*.json`). **Pull those changes** before more local edits.  
- Accessibility + SEO always required. Performance matters (images sized, lazy load, good Lighthouse).

## Naming &amp; Theme Conventions
- All custom files/classes **prefix**: `pro_agg_` (e.g., `sections/pro_agg_hero_slider.liquid`).  
- Section **display names** start with `PRO‑AGG ` and must be ≤ 20 chars.  
- Themes:
  - `main` → **AGG Live (GitHub)**
  - `adventure-getaway-gear-staging` → **AGG Staging (GitHub)**
  - Temporary preview themes may point to feature branches.

## PR Workflow
- Open **draft PRs** from feature branch → `adventure-getaway-gear-staging`.  
- Keep pushing until Shopify logs are **clean** and previews look right.  
- Flip to **Ready for review** → **Merge** to staging.  
- Later: PR `staging` → `main` to go live.

## Commits (Conventional)
- `feat:` new section/feature  
- `fix:` bug/syntax/validator fixes  
- `docs:` dev logs/readme  
- `chore:` housekeeping

**Examples**
- `feat(hero-slider): add PRO‑AGG hero slider (section+CSS+JS)`  
- `fix(hero-slider/schema): remove empty defaults; set non-empty cta2_text`

## Shopify Coding Standards (Dawn)
- **Sections** in `sections/` (`*.liquid`); **assets** in `assets/` (`*.css`, `*.js`); **templates** in `templates/*.json`.  
- **Schema rule:** NO `default: ""` on `text` or `url` settings.  
  - For `text`: either omit `default` or use a non-empty string.  
  - For `url`: omit the `default` key.  
- `<picture>` with optional mobile `<source>`. First slide `loading="eager"`, others `lazy`.  
- A11y: alt text fallback to heading, ARIA labels, keyboard nav, `prefers-reduced-motion`.  
- No third‑party libs unless requested.

## Hero Slider (canonical requirements)
- Slides as blocks: desktop/mobile image, heading, subheading, up to 2 CTAs.  
- 9‑point positioning (desktop + mobile variants).  
- CTA layout: side-by-side (desktop) / stacked (mobile); hide CTA2 on mobile option.  
- Separate text colors for desktop vs mobile.  
- Adjustable min heights (desktop/mobile).  
- Transition type: slide/fade; autoplay toggle; arrows/dots; pause on hover.  
- Respect reduced motion; optimize images.

## Error Fix Patterns
- "Invalid block… default can't be blank" → remove empty default or set a non‑empty string; omit defaults for `url`.  
- Liquid syntax around `<picture>`: ensure filters + tags are not broken or HTML‑escaped.  
- After editing in Customizer: **pull** `settings_data.json` and `templates/*.json`.

## Do
- Use feature branches; small, focused PRs.  
- Keep schema minimal + helpful labels.  
- Provide commit messages that explain the change.

## Don't
- ❌ Push to `main`.  
- ❌ Rename `adventure-getaway-gear-staging`.  
- ❌ Force‑push or rewrite history.  
- ❌ Add GitHub Actions, secrets, or third‑party libs without explicit approval.  
- ❌ Commit secrets or private data.

**Support email:** support@adventuregetawaygear.com
