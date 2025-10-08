# AGG Pull Request Checklist

## What’s in this PR?
<!-- Briefly describe what this PR changes, adds, or fixes. -->

## Checklist (please check off before merging)
- [ ] Shopify logs are **clean** (no Liquid/schema errors)
- [ ] Previewed in **Shopify** (desktop & mobile)
- [ ] **Accessibility**: alt text, keyboard navigation, color contrast, reduced motion
- [ ] **Performance**: images sized, lazy load, Lighthouse scores reasonable
- [ ] **Naming**: all new files/classes use `pro_agg_` prefix; display names start with `PRO‑AGG `
- [ ] **Schema**: NO `default: ""` on text/url settings
- [ ] **Commit messages** use Conventional Commits (`feat:`, `fix:`, etc.)
- [ ] No secrets, sensitive info, or third-party libs added without approval
- [ ] All Customizer changes (settings_data.json, templates/*.json) have been **pulled** locally

## Screenshots (if helpful)
<!-- Add screenshots of the feature/section in Shopify preview -->

## Anything else to note?
<!-- Add any extra notes, test steps, or links to related issues/PRs -->
