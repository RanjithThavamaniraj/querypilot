type MappedError = {
  beginnerMessage: string;
  hint?: string;
};

export function mapPostgresError(message: string): MappedError {
  const lower = message.toLowerCase();

  if (lower.includes("does not exist") && lower.includes("column")) {
    const match = message.match(/column\s+"?([^"\s]+)"?/i);
    const column = match?.[1];
    return {
      beginnerMessage: column
        ? `PostgreSQL cannot find a column called \`${column}\`.`
        : "PostgreSQL cannot find one of the columns in your query.",
      hint: "Open the schema panel and check the exact column names (for example `name`, not `nam`).",
    };
  }

  if (lower.includes("does not exist") && lower.includes("relation")) {
    const match = message.match(/relation\s+"?([^"\s]+)"?/i);
    const relation = match?.[1];
    return {
      beginnerMessage: relation
        ? `PostgreSQL cannot find a table called \`${relation}\`.`
        : "PostgreSQL cannot find one of the tables in your query.",
      hint: "Available tables are `customers`, `products`, and `orders`.",
    };
  }

  if (lower.includes("syntax error")) {
    return {
      beginnerMessage: "PostgreSQL could not parse this SQL (syntax error).",
      hint: "Check commas between columns, quotes around text values, and that keywords like SELECT/FROM/WHERE are spelled correctly.",
    };
  }

  if (lower.includes("operator does not exist")) {
    return {
      beginnerMessage: "PostgreSQL cannot compare these values with that operator.",
      hint: "Text values need single quotes, like country = 'India'. Numbers usually do not need quotes.",
    };
  }

  if (lower.includes("ambiguous")) {
    return {
      beginnerMessage: "PostgreSQL does not know which table a column belongs to.",
      hint: "When tables share a column name (like `id` or `name`), qualify it: `customers.name` or `c.name`.",
    };
  }

  if (
    lower.includes("must appear in the group by") ||
    lower.includes("not in aggregate") ||
    lower.includes("grouping error")
  ) {
    return {
      beginnerMessage:
        "This column is not grouped. With GROUP BY, every selected column must be grouped or used inside an aggregate like COUNT or SUM.",
      hint: "Add the column to GROUP BY, or wrap it in COUNT/SUM/AVG/MIN/MAX.",
    };
  }

  if (lower.includes("duplicate key") || lower.includes("unique constraint")) {
    return {
      beginnerMessage: "That row would duplicate a value that must stay unique (usually an id).",
      hint: "Pick a new id that is not already in the table.",
    };
  }

  if (
    lower.includes("foreign key") ||
    lower.includes("violates foreign key") ||
    lower.includes("is not present in table")
  ) {
    return {
      beginnerMessage:
        "This change breaks a table relationship. An order must point at a real customer and product.",
      hint: "Check that customer_id and product_id exist before inserting or updating an order.",
    };
  }

  if (lower.includes("not-null") || lower.includes("null value in column")) {
    return {
      beginnerMessage: "A required column is missing a value (NULL is not allowed there).",
      hint: "Include every NOT NULL column in your INSERT, or set it in UPDATE.",
    };
  }

  if (
    lower.includes("current transaction is aborted") ||
    lower.includes("in failed sql transaction")
  ) {
    return {
      beginnerMessage:
        "An earlier statement in this transaction failed, so PostgreSQL rejected the rest.",
      hint: "ROLLBACK, fix the failing statement, then try again from BEGIN.",
    };
  }

  if (lower.includes("permission denied") || lower.includes("must be owner")) {
    return {
      beginnerMessage: "This practice role is not allowed to run that kind of statement.",
      hint: "Use SELECT, INSERT, UPDATE, or DELETE on the shop practice tables. Writes never change the shared dataset.",
    };
  }

  if (lower.includes("statement timeout") || lower.includes("canceling statement")) {
    return {
      beginnerMessage: "The query took too long and was stopped.",
      hint: "Simplify the query or add a WHERE clause. Practice queries should stay small.",
    };
  }

  if (lower.includes("permission denied to create temporary") || lower.includes("temp")) {
    return {
      beginnerMessage: "The practice database is missing temporary-table permission.",
      hint: "Re-run scripts/lab/setup.sh so querypilot_learner can use a private practice copy.",
    };
  }

  return {
    beginnerMessage: "PostgreSQL rejected this query.",
    hint: "Read the PostgreSQL error above, then compare your SQL with the lesson example.",
  };
}
