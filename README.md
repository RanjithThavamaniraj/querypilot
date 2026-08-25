# QueryPilot

QueryPilot is a PostgreSQL learning platform.

Phase 1: Foundations (concepts, architecture diagrams, checkpoint)
Phase 2 Module 1: SQL Fundamentals (live SELECT practice against `querypilot_lab`)

## Requirements

- Node.js 20+
- PostgreSQL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the environment template:

```bash
cp .env.example .env.local
```

3. Create the **app** database and run migrations:

```bash
createdb querypilot
npm run db:migrate
```

4. Provision the **lab** database (separate from the app DB):

```bash
chmod +x scripts/lab/setup.sh
./scripts/lab/setup.sh
```

This creates `querypilot_lab`, loads the `shop` dataset, and creates the restricted
runtime role `querypilot_learner` (SELECT-only on `shop`).

5. Confirm `.env.local` includes:

```bash
DATABASE_URL=postgresql://localhost:5432/querypilot
LAB_DATABASE_URL=postgresql://querypilot_learner:querypilot_learner_dev@localhost:5432/querypilot_lab
```

`LAB_DATABASE_URL` must use `querypilot_learner` — never a superuser or provisioning account.

6. Start the development server:

```bash
npm run dev
```

- Homepage: http://localhost:3000
- Learn: http://localhost:3000/learn
- SQL Fundamentals: http://localhost:3000/learn/sql-fundamentals

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run lint` — ESLint
- `npm run db:generate` — generate Drizzle migrations (app DB)
- `npm run db:migrate` — apply app DB migrations
- `./scripts/lab/setup.sh` — provision lab DB, schema, seed, learner role

## Security model (lab)

- App DB (`querypilot`): progress and accounts only
- Lab DB (`querypilot_lab`): educational SQL only
- Runtime learner SQL executes as `querypilot_learner` with SELECT on `shop` only
- Server-side guards: single statement, timeouts, row limits, rate limits

## Phase scope

- `/` — marketing homepage
- `/learn/foundations` — Phase 1
- `/learn/sql-fundamentals` — Phase 2 Module 1 (SQL Basics)
