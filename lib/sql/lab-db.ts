import postgres from "postgres";

const globalForLab = globalThis as unknown as {
  labSql?: ReturnType<typeof postgres>;
};

function createLabClient() {
  const labUrl = process.env.LAB_DATABASE_URL;
  if (!labUrl) {
    throw new Error(
      "LAB_DATABASE_URL is not configured. Run scripts/lab/setup.sh and set LAB_DATABASE_URL to the querypilot_learner role."
    );
  }

  // Runtime must use the restricted learner role URL — never a superuser/provisioning account.
  const forbiddenUser = /:\/\/(postgres|root|admin|supabase_admin):/i.test(labUrl);
  if (forbiddenUser) {
    throw new Error(
      "LAB_DATABASE_URL must not use a superuser/admin account. Use the querypilot_learner role."
    );
  }

  return postgres(labUrl, {
    max: 5,
    prepare: false,
    connection: {
      application_name: "querypilot-lab-learner",
    },
  });
}

/**
 * Lazy lab SQL accessor for the pooled read path.
 * Lazy accessor — LAB_DATABASE_URL is read on first runtime use, not at import time.
 */
export function getLabSql() {
  if (!globalForLab.labSql) {
    globalForLab.labSql = createLabClient();
  }
  return globalForLab.labSql;
}

export function getLabUrl() {
  const labUrl = process.env.LAB_DATABASE_URL;
  if (!labUrl) {
    throw new Error(
      "LAB_DATABASE_URL is not configured. Run scripts/lab/setup.sh and set LAB_DATABASE_URL to the querypilot_learner role."
    );
  }
  return labUrl;
}

export function isLabConfigured() {
  return Boolean(process.env.LAB_DATABASE_URL);
}
