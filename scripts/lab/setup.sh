#!/usr/bin/env bash
set -euo pipefail

# Provision the QueryPilot lab database for Phase 2 SQL practice.
# Requires local PostgreSQL and a provisioning role that can CREATE DATABASE/ROLE.
# Runtime learner SQL must use LAB_DATABASE_URL with querypilot_learner — never this script's role.

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
ADMIN_URL="${LAB_ADMIN_DATABASE_URL:-postgresql://localhost:5432/postgres}"
LAB_DB_URL="${LAB_ADMIN_LAB_URL:-postgresql://localhost:5432/querypilot_lab}"

echo "Ensuring database querypilot_lab exists..."
psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "SELECT 1 FROM pg_database WHERE datname = 'querypilot_lab'" | grep -q 1 \
  || psql "$ADMIN_URL" -v ON_ERROR_STOP=1 -c "CREATE DATABASE querypilot_lab;"

echo "Applying shop schema..."
psql "$LAB_DB_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/content/learn/datasets/shop/schema.sql"

echo "Seeding shop data..."
psql "$LAB_DB_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/content/learn/datasets/shop/seed.sql"

echo "Provisioning restricted learner role..."
psql "$LAB_DB_URL" -v ON_ERROR_STOP=1 -f "$ROOT_DIR/scripts/lab/provision-role.sql"

echo "Lab database ready."
echo "Set LAB_DATABASE_URL to the restricted learner role, for example:"
echo "  LAB_DATABASE_URL=postgresql://querypilot_learner:querypilot_learner_dev@localhost:5432/querypilot_lab"
