-- Provision QueryPilot lab database security boundary.
-- Run as a PostgreSQL superuser / database owner against querypilot_lab.
-- NEVER use this role for learner SQL at runtime.

DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'querypilot_learner') THEN
    CREATE ROLE querypilot_learner LOGIN PASSWORD 'querypilot_learner_dev';
  END IF;
END
$$;

REVOKE ALL ON DATABASE querypilot_lab FROM PUBLIC;
GRANT CONNECT ON DATABASE querypilot_lab TO querypilot_learner;

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM querypilot_learner;

GRANT USAGE ON SCHEMA shop TO querypilot_learner;
GRANT SELECT ON ALL TABLES IN SCHEMA shop TO querypilot_learner;
ALTER DEFAULT PRIVILEGES IN SCHEMA shop GRANT SELECT ON TABLES TO querypilot_learner;

ALTER ROLE querypilot_learner SET search_path TO shop;
ALTER ROLE querypilot_learner SET statement_timeout TO '2s';
