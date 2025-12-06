Akunne Cosmetics - Local demo

This repository contains a simple storefront and an in-memory API for the Akunne Cosmetics demo.

Requirements
- Node.js (14+ recommended)

Install and run

Open PowerShell in `akunne-cosmetics` folder and run:

```powershell
npm install
npm start
```

The site will be available at http://localhost:3000 (API at http://localhost:3000/api)

Notes
- This API uses in-memory arrays (no database). Data resets when the server restarts.
- For production you'll need to add authentication, persistent storage, and proper email handling.

Files created
- `server.js` - Express API and static file server for `public/`
- `public/index.html` - Frontend single-page site
- `public/styles.css` - Frontend styles
- `public/app.js` - Frontend JS that talks to the API

Next steps (optional)
- Add persistent DB (SQLite / MongoDB / Postgres)
- Add payment integration (Stripe)
- Add admin dashboard and product image uploads

If you want, I can add a `docker-compose` manifest to run this in a container locally.
