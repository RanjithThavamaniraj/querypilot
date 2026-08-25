import { assertSafeLearnerSql } from "@/lib/sql/guards";
import { executeLearnerSql, normalizeResultRows } from "@/lib/sql/execute";
import type { SqlChallengeDefinition } from "@/lib/learn/types";

export type ValidationResult = {
  passed: boolean;
  feedback: string;
  hint?: string;
  learnerOutcome: Awaited<ReturnType<typeof executeLearnerSql>>;
  referenceRowCount?: number;
};

function hasWriteOrTransaction(sql: string) {
  try {
    return assertSafeLearnerSql(sql).some((statement) =>
      /^(insert|update|delete|begin|start)\b/i.test(statement) ||
      (/^with\b/i.test(statement) &&
        /\b(insert|update|delete)\b/i.test(statement))
    );
  } catch {
    return false;
  }
}

export async function validateSqlChallenge(
  challenge: SqlChallengeDefinition,
  learnerSql: string,
  rateKey: string
): Promise<ValidationResult> {
  const inspectSQL = challenge.inspectSQL;

  if (inspectSQL && !hasWriteOrTransaction(learnerSql)) {
    return {
      passed: false,
      feedback: challenge.failureFeedback,
      hint:
        challenge.hint ??
        "This challenge expects INSERT, UPDATE, DELETE, or a transaction script—not a SELECT alone.",
      learnerOutcome: {
        ok: false,
        postgresMessage: "Write or transaction statement required",
        beginnerMessage:
          "This challenge expects a data-change or transaction script, not only SELECT.",
        hint: challenge.hint,
      },
    };
  }

  const learnerOutcome = await executeLearnerSql(learnerSql, rateKey, {
    inspectSQL,
  });
  if (!learnerOutcome.ok) {
    return {
      passed: false,
      feedback: learnerOutcome.beginnerMessage,
      hint: learnerOutcome.hint ?? challenge.hint,
      learnerOutcome,
    };
  }

  const referenceOutcome = await executeLearnerSql(
    challenge.referenceSQL,
    `${rateKey}:reference`,
    { inspectSQL }
  );

  if (!referenceOutcome.ok) {
    return {
      passed: false,
      feedback: "The reference solution failed to run. Please try again later.",
      learnerOutcome,
    };
  }

  const learnerNorm = normalizeResultRows(learnerOutcome.result, {
    requiresOrder: challenge.requiresOrder,
    expectedColumns: challenge.expectedColumns,
  });
  const referenceNorm = normalizeResultRows(referenceOutcome.result, {
    requiresOrder: challenge.requiresOrder,
    expectedColumns: challenge.expectedColumns,
  });

  if (learnerNorm.columns.length !== referenceNorm.columns.length) {
    return {
      passed: false,
      feedback: challenge.failureFeedback,
      hint:
        challenge.hint ??
        `Expected ${referenceNorm.columns.length} column(s), but your result has ${learnerNorm.columns.length}.`,
      learnerOutcome,
      referenceRowCount: referenceOutcome.result.rowCount,
    };
  }

  if (challenge.expectedColumns?.length) {
    const missing = challenge.expectedColumns.filter(
      (column) =>
        !learnerOutcome.result.columns.some(
          (item) => item.name.toLowerCase() === column.toLowerCase()
        )
    );
    if (missing.length) {
      return {
        passed: false,
        feedback: challenge.failureFeedback,
        hint: `Your result is missing column(s): ${missing.join(", ")}.`,
        learnerOutcome,
        referenceRowCount: referenceOutcome.result.rowCount,
      };
    }
  }

  const sameRows =
    learnerNorm.rows.length === referenceNorm.rows.length &&
    learnerNorm.rows.every(
      (row, index) => row.join("\u0000") === referenceNorm.rows[index].join("\u0000")
    );

  if (!sameRows) {
    return {
      passed: false,
      feedback: challenge.failureFeedback,
      hint:
        challenge.hint ??
        `Expected ${referenceNorm.rows.length} row(s). Your query returned ${learnerNorm.rows.length}.`,
      learnerOutcome,
      referenceRowCount: referenceOutcome.result.rowCount,
    };
  }

  return {
    passed: true,
    feedback: challenge.successFeedback,
    learnerOutcome,
    referenceRowCount: referenceOutcome.result.rowCount,
  };
}
