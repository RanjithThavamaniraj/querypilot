import type { ExerciseDefinition } from "@/lib/learn/types";

export const objectHierarchyExercise: ExerciseDefinition = {
  id: "map-object-hierarchy",
  title: "Map the object hierarchy",
  instructions:
    "Match each description to the correct PostgreSQL concept. Use Cluster, Database, Schema, Table, or Row.",
  passScore: 4,
  options: [
    { id: "cluster", label: "Cluster" },
    { id: "database", label: "Database" },
    { id: "schema", label: "Schema" },
    { id: "table", label: "Table" },
    { id: "row", label: "Row" },
  ],
  items: [
    {
      id: "q1",
      prompt: "One PostgreSQL installation and the databases it manages.",
      correctOptionId: "cluster",
      explanation:
        "A cluster is the whole server instance—one data directory managing one or more databases.",
    },
    {
      id: "q2",
      prompt: "The named container your application usually connects to.",
      correctOptionId: "database",
      explanation:
        "Clients typically connect to a single database inside the cluster.",
    },
    {
      id: "q3",
      prompt: "A namespace organization for tables and other objects inside a database.",
      correctOptionId: "schema",
      explanation:
        "Schemas group objects. Think of them as folders inside a database.",
    },
    {
      id: "q4",
      prompt: "A structured collection of related columns that stores many records.",
      correctOptionId: "table",
      explanation:
        "Tables define columns and hold the data you query with SQL.",
    },
    {
      id: "q5",
      prompt: "One individual record inside a table.",
      correctOptionId: "row",
      explanation:
        "Each row is one record. Columns are the fields; rows are the values.",
    },
  ],
};
