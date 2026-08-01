# Careers CMS (Sanity) — setup for the team

This site loads open roles from **Sanity**. Editors log into Sanity Studio in the browser — no coding required to add or close jobs.

Until Sanity is configured, the website uses a local sample job so `/careers` still works.

## One-time setup (developer)

1. Create a free Sanity project: [sanity.io/manage](https://www.sanity.io/manage) → **Create project**.
2. Copy the **Project ID**.
3. In the **website root**, create `.env`:

```bash
VITE_SANITY_PROJECT_ID=your-project-id
VITE_SANITY_DATASET=production
```

4. In `studio/`, create `.env`:

```bash
SANITY_STUDIO_PROJECT_ID=your-project-id
SANITY_STUDIO_DATASET=production
```

5. Start Studio and log in:

```bash
cd studio
npm run dev
```

Open the Studio URL (usually `http://localhost:3333`), sign in with Sanity, and claim the project if prompted.

6. Add CORS origin for the website (local + production):
   - [manage.sanity.io](https://www.sanity.io/manage) → your project → **API** → **CORS origins**
   - Add `http://localhost:5173`, `http://localhost:5174` (Vite uses 5174 if 5173 is busy), and your Netlify URL (e.g. `https://sunfinity.tech`)
   - Origins must match exactly (including `http` vs `https`, and `localhost` vs `127.0.0.1`)
   - Allow credentials: not required for public read

7. Deploy Studio for the team (optional but recommended):

```bash
cd studio
npm run deploy
```

Sanity will give you a URL like `https://your-studio-name.sanity.studio` — share that with HR / managers.

8. Restart the website `npm run dev` so Vite picks up `.env`.

## Invite 3–4 people to add jobs

1. Go to [manage.sanity.io](https://www.sanity.io/manage) → your project → **Members**.
2. Invite each person by email.
3. Role: **Editor** (can create/edit/publish Job Listings; cannot change project billing).
4. Send them the Studio URL (`npm run deploy` URL, or `localhost:3333` for local-only).

They sign in with Google/email — then they can add roles.

## How editors add a job

In Studio → **Create** → **Job Listing**:

| Field | What to enter |
|---|---|
| Job ID | e.g. `SF-2026-015` |
| Job Title | e.g. `Senior Data Engineer` |
| URL slug | Generate from title (e.g. `senior-data-engineer`) |
| Location | e.g. `Pune / Hybrid` |
| Employment type | Full-time / Contract / … |
| Short summary | Card text on `/careers` |
| Job description | Full text on the detail page |
| Requirements | One bullet per line (add items) |
| HR Manager | Name + email |
| Technical Manager | Name + email |
| Active | On = shown on website; Off = hidden |

Publish. The live site shows it at:

- Listing: `/careers`
- Detail: `/careers/senior-data-engineer`

## Netlify / production

Add the same `VITE_SANITY_*` variables in Netlify → Site settings → Environment variables, then redeploy.

## Closing a role

Edit the job → turn **Active** off → Publish. It disappears from the website immediately (CDN may take a minute).
