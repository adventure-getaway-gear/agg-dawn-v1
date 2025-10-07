# Adventure Getaway Gear – Shopify Dawn Custom Theme

**Source of truth:** Work on dventure-getaway-gear-staging; ship to main via Pull Request.  
**Theme connections:** Live → main, Staging → dventure-getaway-gear-staging.

---

## 🔧 Daily Workflow
1. Confirm Current branch = dventure-getaway-gear-staging (GitHub Desktop).
2. Edit locally; **after any Shopify editor/AI change on the staging theme: Fetch → Pull** to sync.
3. Commit & Push to staging → preview on the staging theme.
4. Open PR staging → main and merge to ship. **Never push to main directly**.

---

## 🛡️ Branching Model & Guardrails
- main = production (protected).
- dventure-getaway-gear-staging = active development.
- **PR‑first**: all production changes flow staging → PR → main.
- Protection on main:
  - Require pull request before merging
  - Require conversation resolution
  - Block force pushes
  - (Optional) Require status checks / Theme Check
  - Prefer **Squash merge** for clean history

---

## 🧩 Shopify Editor / AI (Sidekick/Magic)
- Code edits in the **Shopify editor on the staging theme** create commits on the **staging branch**.
- **Always Fetch → Pull after editor/AI work** before continuing local edits (prevents drift).

### Deleting a section safely (JSON rule)
1. **Delete the section in the Shopify editor (staging)** → **Save**  
   (Shopify updates 	emplates/*.json and config/settings_data.json.)
2. **Pull** in GitHub Desktop to bring those JSON changes locally.
3. Delete the .liquid (+ assets) **locally** on staging → commit & push.
4. Ship via PR to main.

> Skipping step 1 leaves dangling JSON → “section failed to load.”

---

## 🧱 Naming & Structure
- Custom sections: sections/pro_agg_[feature].liquid (display names begin **“PRO‑AGG ”**, ≤ 20 chars).
- Scoped CSS/JS per section via .section-{{ section.id }} or ssets/pro_agg_[feature].css(.js) + sset_url.
- Blocks: unique id values; set sensible max_blocks.

---

## 📝 Commits & PRs
- Conventional commits (eat:, ix:, docs:, chore:).
- Keep diffs focused; don’t mix unrelated changes.
- Use the PR checklist in .github/pull_request_template.md.

---

## 📁 Repo Layout (Dawn)
assets/ · config/ · layout/ · locales/ · sections/ · snippets/ · templates/

---

## 🔄 Recovery
- If **not pushed** to main: git reset --hard origin/main to drop a local mistake.
- If **pushed**: Revert on GitHub, then Pull. Re‑apply on **staging** and open a PR to main.
