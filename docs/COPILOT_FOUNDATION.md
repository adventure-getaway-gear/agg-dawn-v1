# Shopify Dawn — Copilot Pro Foundation (PRO-AGG)

## Environment
- Theme: Shopify **Dawn** (fresh)
- Local repo: `C:\WebProjects\agg-dawn-v1`
- Branch: `adventure-getaway-gear-staging`
- Shell: Windows **PowerShell 7**
- Deployment: GitHub → Shopify **staging** theme (no Shopify CLI)
- Workflow: **Stage-only** in terminal; **commit/push in GitHub Desktop**

## Naming Rules
- File/asset/template prefix: `pro_agg_` (lowercase, underscores)
- Schema & Presets display names:
  - Must begin with **"PRO-AGG "** (hyphen)
  - Must be **≤ 20 characters** total (≤ 25 hard limit)
  - Examples: `PRO-AGG Hero`, `PRO-AGG Banner`

## Output Expectations (for any new section/component)
1. **LIQUID** file in `/sections` with valid schema + presets (Dawn-compatible)
2. **CSS** file in `/assets` (scoped to the section; no theme-wide bleed)
3. **JSON page template** in `/templates` that mounts the section for quick testing
4. **PowerShell (stage-only)** block that:
   - checks out the staging branch and pulls latest
   - writes files using UTF-8 **no BOM** and **LF** line endings
   - runs **git add** on those files ONLY (**no commit, no push**)
5. Suggested **commit summaries** (single-commit and two-commit styles)
6. A short **validation checklist** for Shopify

## Guardrails
- Do not modify Dawn core structure; no external libraries
- Never output commit or push commands
- Enforce display name length limit (target **≤ 20** chars)
- Use UTF-8 **no BOM** + **LF** line endings for all files
