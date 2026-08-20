import type { ArchitectureDiagramDefinition } from "@/lib/learn/types";

export const queryFlowDiagram: ArchitectureDiagramDefinition = {
  id: "query-flow",
  title: "Query flow",
  description: "What happens after you submit SQL.",
  layout: "vertical",
  nodes: [
    {
      id: "sql",
      label: "SQL",
      explanation:
        "You send a statement such as SELECT * FROM customers WHERE id = 100. This is the starting point of the journey.",
    },
    {
      id: "parser",
      label: "Parser",
      explanation:
        "The parser checks that the SQL is syntactically valid and turns it into an internal representation PostgreSQL can work with.",
    },
    {
      id: "planner",
      label: "Planner",
      explanation:
        "The planner decides how to run the query: which tables to read, how to join, and which access methods look cheapest. Later you will inspect these decisions with EXPLAIN.",
    },
    {
      id: "executor",
      label: "Executor",
      explanation:
        "The executor carries out the chosen plan: it fetches rows, applies filters, and builds the result set.",
    },
    {
      id: "buffers",
      label: "Buffers",
      explanation:
        "PostgreSQL prefers to work with data pages already in memory buffers. If a needed page is already cached, work is faster.",
    },
    {
      id: "disk",
      label: "Disk",
      explanation:
        "If a page is not in buffers, PostgreSQL reads it from durable storage on disk. Results still return through the same pipeline.",
    },
    {
      id: "result",
      label: "Result",
      explanation:
        "The final rows (or success/error status) are sent back to your client. That completes one query cycle.",
    },
  ],
  edges: [
    { from: "sql", to: "parser" },
    { from: "parser", to: "planner" },
    { from: "planner", to: "executor" },
    { from: "executor", to: "buffers" },
    { from: "buffers", to: "disk" },
    { from: "disk", to: "result" },
  ],
};
