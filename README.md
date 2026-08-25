# QueryPilot

QueryPilot is a PostgreSQL learning platform. Phase 1 includes the public marketing homepage and the Foundations learning path with guest progress persistence.

## Requirements

- Node.js 20+
- PostgreSQL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template and set your local database URL:

```bash
cp .env.example .env.local
```

3. Create the database and run migrations:

```bash
createdb querypilot
npm run db:migrate
```

4. Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the homepage and [http://localhost:3000/learn](http://localhost:3000/learn) for the learning app.

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run db:generate` — generate Drizzle migrations from schema changes
- `npm run db:migrate` — apply migrations

## Phase 1 scope

- `/` — marketing homepage
- `/learn` — learning home
- `/learn/foundations` — Foundations path
- `/learn/foundations/[lessonSlug]` — lesson pages with diagrams, exercise, checkpoint quiz, and guest progress
