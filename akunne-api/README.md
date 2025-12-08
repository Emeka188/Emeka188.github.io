Akunne Cosmetics API

This is a small Express + SQLite API used by the static `cosmetics.html` frontend for demo purposes.

Quick start (requires Node.js >= 14 and npm):

```markdown
Akunne Cosmetics API

This is a small Express + SQLite API used by the static `cosmetics.html` frontend for demo purposes.

Quick start (requires Node.js >= 14 and npm):

```powershell
cd akunne-api
npm install
npm run init-db
npm start
```

The server will listen on port `4000` by default.

Endpoints:
- `GET /api/products` — list products
- `GET /api/products/:id` — product detail
- `POST /api/orders` — create an order (body: `{items, total}`)
- `GET /api/orders/:id` — fetch order
- `POST /api/contact` — contact form (body: `{name,email,message}`)

Notes:
- The project uses `better-sqlite3` and stores `db.sqlite` inside this folder.
- For deployment use Render, Fly, or Docker (add a `Dockerfile` or simple `Procfile`).

Docker (no host Node required)
-----------------------------
This repository includes a `Dockerfile` and `docker-compose.yml` in the `akunne-api/` folder so you can run the API inside a container.

From the repository root run (PowerShell):

```powershell
Set-Location -LiteralPath .\akunne-api
docker compose up --build -d
# Wait a few seconds then test:
Invoke-WebRequest http://localhost:4000/api/products | Select-Object -ExpandProperty Content
```

The compose service maps port `4000` on the host to the container. The `docker-entrypoint.sh` runs `init-db.js` automatically if `db.sqlite` is not present.

If you prefer not to use Docker, follow the Node quick start above.

```
