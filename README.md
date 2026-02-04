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
Browser → ```http://<OUR IP>/...``` → Apache (port 80) → reverse proxy → Next.js (Node, ```127.0.0.1:3000```) → response 

> TODO: change IP address to domain name

## Tech Stack
- HTML
- Tailwind CSS (v3.x)
- Next.js (App Router)
- React
- TypeScript
- Others (Apache2, PM2, GitHub Actions for CI/CD deployment)

## Repository Structure
1. ```app/```(Next.js App Router):
It defines routes; every ```app/**/page.tsx``` becomes a route (e.g., ```app/treasure/how-to-play/page.tsx``` → ```/treasure/how-to-play``` for actual address)
2. ```components/```: It is reusable UI that is not a route (e.g., ```components/game/*``` = game-specific shared components, such as nav and vuttons)
3. ```lib/```: It is shared logic / state (context, helpers, constants) (e.g., ```lib/game-context.tsx``` provides ```GameProvider``` and ```useGame()```)

```
cse210-next-app/
├── .github/workflows
│   ├── deploy.yml              # GitHub Actions deployment workflow
├── app
│   ├── globals.css             # Tailwind directives + CSS variables
│   ├── layout.tsx              # Root layout 
│   ├── page.tsx                # Home page (/)
│   └── treasure                # For Treasure Chest Game 
│       └── how-to-play         # /treasure/how-to-play
│           └── page.tsx
├── components
│   └── game
│       ├── game-buttons.tsx    # PrimaryButton / SecondaryButton components  
│       └── game-nav.tsx        # Shared navigation for game pages
├── lib
│   └── game-context.tsx        # Global game state provider + useGame() hook
├── next-env.d.ts
├── package-lock.json
├── package.json
├── postcss.config.js           # PostCSS config
├── tailwind.config.js          # Tailwind config and theme color mappings
├── tsconfig.json               # TypeScript config
└── ...
```
### Important Files & Rules 
✅ Safe to edit often
- ```app/**``` (pages/layout)
- ```components/**```
- ```lib/**```
- ```app/globals.css```
- ```tailwind.config.js``` (Tailwind theme, content paths)

⚠️ Edit carefully (ask before changing)
- ```.github/workflows/deploy.yml```; this controls production deploy
- ```package.json```; try to only change when you intentionally add/remove a dependency or script, and mention it in the commit message or group chat
- ```package-lock.json```; If ```package.json``` changes, this must be committed too (let npm update it automatically)

❌ Never commit / never push
- anything that is written in ```.gitignore``` (e.g., ```node_modules/```, ```.next/```, local env files)

## Adding New Pages (Team Workflow)
### Rule #0: Always test locally before pushing
### Rule #1: Add pages under ```app/```
To add, for example, ```/treasures/play```, create:
```bash
app/treasure/play/page.tsx
```
### Rule #2: Use ```"use client"``` when needed
Add ```"use client"``` at the top of a file if it uses:
- React hooks (```useState```, ```useEffect```)
- context (```useGame()```)

### Rule #3: Keep shared UI in ```components/```
If you see repeated UI across pages:
- move to ```components/game/*``` (game-specific)

### Rule #4: TypeScript Path Alias (```@/```)
We use ```@/``` to import from the repo root. Example:
```ts
import { GameNav } from "@/components/game/game-nav"
```
This can be done since we included following in ```tsconfig.json```:
```json
"baseUrl": ".",
"paths": {
  "@/*": ["./*"]
}
```

### Rule #5: Keep the theme colors in ```app/globals.css```
- ```app/globals.css``` defines global CSS theme variables (e.g., ```--background```, ```--foreground```, etc)
- Additionally, if you are using Tailwind theme tokens such as ```bg-background```, you also need to map Tailwind color keys to those CSS variables in ```tailwind.config.js```

### Rule #6: State Management
We currently use a global context pattern:
- ```lib/game-context.tsx``` exports:
  - ```GameProvider```
  - ```useGame()```

```GameProvider``` is wired in ```app/layout.tsx```, so all pages can call ```useGame()```
As we implement actual game logic, we will expand this. 

## Background: From static to Next.js
We originally hosted a static site in: ```/var/www/html``` (Apache serving static HTML/CSS/JS).

Then we migrated to Next.js setup and now run the app from: ```/var/www/cse210-next-app``` (Next.js app + Node server managed by PM2)

> There may still be older folders from earlier experiments (e.g., ```/var/www/cse210-next```). These are not the live app. The live app is the directory used by ```DEPLOY_PATH``` in GitHub Secrets (see Deployment section)


