import postgres from "postgres";

const labUrl = process.env.LAB_DATABASE_URL;

if (!labUrl) {
  console.warn("LAB_DATABASE_URL is not set — SQL practice will be unavailable");
}

const globalForLab = globalThis as unknown as {
  labSql?: ReturnType<typeof postgres>;
};

function createLabClient() {
  if (!labUrl) {
    throw new Error(
      "LAB_DATABASE_URL is not configured. Run scripts/lab/setup.sh and set LAB_DATABASE_URL to the querypilot_learner role."
    );
  }

  // Runtime must use the restricted learner role URL — never a superuser/provisioning account.
  if (/\/\/[^/@]*@(?:localhost|127\.0\.0\.1)/.test(labUrl) === false) {
    // Allow other hosts; still reject obvious superuser names in local/dev when present.
  }

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

export function getLabSql() {
  if (!globalForLab.labSql) {
    globalForLab.labSql = createLabClient();
  }
  return globalForLab.labSql;
}

export function isLabConfigured() {
  return Boolean(labUrl);
}
