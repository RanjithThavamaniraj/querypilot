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

  if (lower.includes("permission denied") || lower.includes("must be owner")) {
    return {
      beginnerMessage: "This practice role is not allowed to run that kind of statement.",
      hint: "In Module 1, stick to SELECT queries that read from the shop tables.",
    };
  }

  if (lower.includes("statement timeout") || lower.includes("canceling statement")) {
    return {
      beginnerMessage: "The query took too long and was stopped.",
      hint: "Simplify the query or add a WHERE clause. Practice queries should stay small.",
    };
  }

  return {
    beginnerMessage: "PostgreSQL rejected this query.",
    hint: "Read the PostgreSQL error above, then compare your SQL with the lesson example.",
  };
}
