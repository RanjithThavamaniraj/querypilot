import type { ArchitectureDiagramDefinition } from "@/lib/learn/types";

export const clusterObjectsDiagram: ArchitectureDiagramDefinition = {
  id: "cluster-objects",
  title: "Object hierarchy",
  description:
    "How PostgreSQL nests cluster, database, schema, table, and row.",
  layout: "vertical",
  nodes: [
    {
      id: "cluster",
      label: "Cluster",
      explanation:
        "A cluster is one PostgreSQL server installation’s data directory and the databases it manages. When people say “a PostgreSQL instance,” they often mean a cluster.",
    },
    {
      id: "database",
      label: "Database",
      explanation:
        "A database is a named container inside the cluster. Applications usually connect to one database at a time.",
    },
    {
      id: "schema",
      label: "Schema",
      explanation:
        "A schema organizes objects inside a database—like folders for tables, views, and functions. The default schema is often called public.",
    },
    {
      id: "table",
      label: "Table",
      explanation:
        "A table stores related data in columns. Each table belongs to a schema.",
    },
    {
      id: "row",
      label: "Row",
      explanation:
        "A row is one record in a table. Columns define the fields; rows hold the values.",
    },
  ],
  edges: [
    { from: "cluster", to: "database" },
    { from: "database", to: "schema" },
    { from: "schema", to: "table" },
    { from: "table", to: "row" },
  ],
};
