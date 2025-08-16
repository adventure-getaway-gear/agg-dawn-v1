# Adventure Getaway Gear – Shopify Dawn Custom Theme

This repository contains a customized Shopify Dawn theme for **Adventure Getaway Gear (AGG)**.  
Our goal is to maintain a **professional, polished, and scalable storefront** with a disciplined GitHub workflow and branch protections in place.

---

## 🚀 Quick Start

1. **Work in `staging`** → never commit directly to `main`.  
2. **Make changes** → test in Shopify preview, not live, unless absolutely necessary.  
3. **Commit & Push** → clear, conventional commit messages.  
4. **Open PR to `main`** → resolve conversations, squash merge.  
5. **Pull latest `main`** → if keeping a local `main`.  

---

## 🏗 Branching Model

- **`main`** → production-ready branch (protected).  
- **`staging`** → active development branch.  
- All development flows through `staging` → PR → squash merge → `main`.

---

## 🔒 Workflow Safeguards

- Direct commits to `main` are **blocked**.  
- Force pushes to `main` are **blocked**.  
- Only **squash merges** allowed → keeps linear history.  
- PRs require:  
  - All conversations resolved before merging.  
  - Squash merge strategy enforced.  
  - Manual review if desired (configurable).

---

## 🛠 How to Work

### 1. Make Changes
- Always branch off **`staging`**.  
- Test changes in Shopify preview (`Share Preview`).  
- Publish live only if validation on live is absolutely necessary.  

### 2. Commit Style
Use [Conventional Commits](https://www.conventionalcommits.org/). Examples:  
- `feat: add hero slider section`  
- `fix: correct cart drawer styling`  
- `docs: update README with workflow & safeguards`  

### 3. Commit & Push (GitHub Desktop Steps)
- Switch to **`adventure-getaway-gear-staging`** in GitHub Desktop.  
- Stage changes (e.g., `README.md`).  
- Example commit message:  
docs: update README with workflow & safeguards

- Click **Commit to adventure-getaway-gear-staging**.  
- Click **Push origin**.  

### 4. Open PR → Merge to Main
- In GitHub Desktop: `Branch → Create Pull Request` (or click the PR link).  
- Base = `main`, Compare = `adventure-getaway-gear-staging`.  
- Create the PR → **Squash & Merge**.  
- If you keep a local `main`, pull the latest after merging.  

---

## 🧹 Repo Hygiene

- **Naming convention for custom Liquid sections**:  
`pro_agg_[section-name]` (max 20 chars).  

- **Mark AGG customizations** with clear comment blocks:
    
```liquid
<!-- AGG: start hero slider -->
{% section 'pro_agg_hero_slider' %}
<!-- AGG: end hero slider -->

- Keep commits small and focused. Avoid mixing unrelated changes.

- Prefer preview links for review and validation instead of publishing live.

## 🤝 Contributing
Always branch off staging.

PRs should include:

What changed

Why it changed

Preview link for review

Reviewers should verify:

Code follows naming and section conventions.

Commit messages follow style rules.

Changes are tested in Shopify preview.

📝 Notes
Preview vs Live:
Prefer using preview links when possible. Publish to live only if required.

Safeguards:
Repo rules ensure main stays clean and production-ready.

Future Expansion:
Repo structure and workflows are designed for scalability (camping gear, clothing, pet products in future).

📂 Standard Dawn Structure
The repo follows Shopify Dawn’s structure with AGG custom sections:

```bash
├── assets/         # Stylesheets, scripts, images
├── config/         # Theme settings
├── layout/         # Theme.liquid
├── locales/        # Multi-language support
├── sections/       # Custom + Dawn sections
│   └── pro_agg_*   # AGG-specific sections
├── snippets/       # Reusable Liquid snippets
└── templates/      # Page templates
✅ Checklist Before PR to Main
 Code tested in preview.

 Commit messages follow convention.

 Conversations resolved.

 PR description includes summary + preview link.

 Squash merge selected.

