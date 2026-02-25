# CSE210 Team 2 - Next.js App 
### Apache + PM2 + GitHub Actions Deploy
This repo builds our CSE210 Team2 web app using Next.js (App Router) and TypeScript, served on a DigitalOcean Ubuntu droplet with Apache as a reverse proxy and PM2 managing the Node process. We use GitHub Actions to deploy on every push to ```main``` branch.

## How to work?
### Local Development
Requirements
- Node.js 20.x
- npm

```bash
git clone https://github.com/rabongHan/CSE210-WI26-Team2.git
cd <repo>
npm install
npm run dev
```
Then open:```http://localhost:3000```

### DigitalOcean (Production)
- GitHub Actions deploys the repo to the droplet via ```rsync```.
- On the droplet, the workflow runs:
  - ```npm ci```
  - ```npm run build``` (with Turbopack disabled)
  - ```pm2 reload/start``` to run ```npm start```
- Apache listens on port 80 and reverse-proxies to the Next.js server listening on ```127.0.0.1:3000```.

> Note: the app runs under PM2 — production process manager.


### Request Flow (Production)
Browser → `https://primefactory.site/...` → Apache (port 80) → reverse proxy → Next.js (Node, `127.0.0.1:3000`) → response

> Note: The app is now live at [https://primefactory.site](https://primefactory.site)

## Tech Stack
- HTML
- Tailwind CSS (v3.x)
- Next.js (App Router)
- React
- TypeScript
- Others (Apache2, PM2, GitHub Actions for CI/CD deployment)

## Repository Structure (Updated 2026)


Our project is organized by feature/game, with each main game or section in its own folder under `app/`. Each game/feature folder contains its own components, logic, and tests. Shared UI and logic are grouped by feature, not globally.

## GitHub Actions Workflows

We use two main workflows for CI/CD:
- `.github/workflows/deploy.yml`: Deploys to production on push to `main` (see above for details).
- `.github/workflows/tests.yml`: Runs automated tests (unit/integration) on every push and pull request to ensure code quality and prevent regressions.

**Key Folders & Files:**
  ├── .github/workflows/
  │   ├── deploy.yml              # Deployment workflow (production)
  │   └── tests.yml               # Test workflow (runs on push/PR)
1. `app/` (Next.js App Router):
  - Defines routes. Every `app/**/page.tsx` is a route (e.g., `app/treasure/how-to-play/page.tsx` → `/treasure/how-to-play`).
  - Feature/game folders: `bubble/`, `prime/`, `treasure/`, each with their own `components/`, `lib/`, and sometimes `assets/` or `__tests__/`.
2. `admin/`: Meeting notes and admin docs.
3. `public/`: Static assets (images, etc).

**Example Structure:**
```
CSE210-WI26-Team2/
├── admin/
│   └── meetings/
├── app/
│   ├── layout.tsx              # Root layout (wraps all pages)
│   ├── page.tsx                # Home page (/)
│   ├── bubble/                 # Bubble game feature
│   │   ├── components/         # Bubble-specific UI
│   │   ├── lib/                # Bubble logic/context/tests
│   │   └── game/|menu/         # Bubble subpages
│   ├── prime/                  # Prime game feature
│   │   ├── components/
│   │   ├── lib/
│   │   └── ...
│   └── treasure/               # Treasure Chest game feature
│       ├── components/
│       ├── lib/
│       ├── guideline/|how-to-play/  # Subpages
│       └── assets/
├── public/
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── package.json
├── ...
```

### Important File & Folder Rules (2026)
✅ **Safe to edit often**
- `app/**` (pages, layouts, feature folders)
- `app/[feature]/components/` (feature-specific UI)
- `app/[feature]/lib/` (feature-specific logic, context, helpers, tests)
- `app/globals.css`, `tailwind.config.js` (theme, content paths)

⚠️ **Edit carefully (ask before changing):**
- `.github/workflows/deploy.yml` (production deploy)
- `package.json` (add/remove dependencies or scripts; mention in commit or chat)
- `package-lock.json` (commit if `package.json` changes; let npm update it)

❌ **Never commit / never push:**
- Anything in `.gitignore` (e.g., `node_modules/`, `.next/`, local env files)


## Adding New Pages & Components (Team Workflow)

**Rule #0:** Always test locally before pushing.

**Rule #1:** Add new pages under the relevant feature folder in `app/`.
  - Example: To add `/treasure/play`, create `app/treasure/play/page.tsx`.

**Rule #2:** Use `"use client"` at the top of a file if it uses React hooks (e.g., `useState`, `useEffect`) or context (e.g., `useGame()`, `usePrimeContext()`, etc).

**Rule #3:** Keep feature-specific UI in `app/[feature]/components/`.
  - If you see repeated UI within a game, move it to that game's `components/` folder.

**Rule #4:** Shared logic/context for a feature goes in `app/[feature]/lib/`.
  - Each game/feature manages its own state/context (e.g., `bubble-context.tsx`, `prime-context.tsx`, `treasure-context.tsx`).

**Rule #5:** TypeScript Path Alias (`@/`)
  - Use `@/` to import from the repo root. Example:
    ```ts
    import { PrimeButtons } from "@/app/prime/components/prime-buttons"
    ```
  - This works because `tsconfig.json` includes:
    ```json
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
    ```

**Rule #6:** Theme colors and Tailwind
  - Each mini-game/feature defines its own global CSS theme variables (e.g., `--background`, `--foreground`) in its own CSS file (e.g., `app/prime/globals.css`, `app/treasure/globals.css`), not in a single global file.
  - Tailwind theme tokens (e.g., `bg-background`) are mapped to these CSS variables in `tailwind.config.js`.

**Rule #7:** State Management
  - Each game/feature has its own context/provider in its `lib/` folder.
  - Providers are usually wired in the relevant layout/page, not globally.
  - Example: `bubble-context.tsx` for Bubble, `prime-context.tsx` for Prime, etc.

## Background: From static to Next.js
We originally hosted a static site in: ```/var/www/html``` (Apache serving static HTML/CSS/JS).

Then we migrated to Next.js setup and now run the app from: ```/var/www/cse210-next-app``` (Next.js app + Node server managed by PM2)

> There may still be older folders from earlier experiments (e.g., ```/var/www/cse210-next```). These are not the live app. The live app is the directory used by ```DEPLOY_PATH``` in GitHub Secrets (see Deployment section)


