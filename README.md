# CSE210 Team 2 - Next.js App 
### Apache + PM2 + GitHub Actions Deploy
This repo builds our CSE210 Team2 web app using Next.js (App Router) and TypeScript, served on a DigitalOcean Ubuntu droplet with Apache as a reverse proxy and PM2 managing the Node process. We use GitHub Actions to deploy on every push to ```main``` branch.

## How to work?
### Local Development
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


## Background: From static to Next.js
We originally hosted a static site in: ```/var/www/html``` (Apache serving static HTML/CSS/JS).

Then we migrated to Next.js setup and now run the app from: ```/var/www/cse210-next-app``` (Next.js app + Node server managed by PM2)

> There may still be older folders from earlier experiments (e.g., ```/var/www/cse210-next```). These are not the live app. The live app is the directory used by ```DEPLOY_PATH``` in GitHub Secrets (see Deployment section)


