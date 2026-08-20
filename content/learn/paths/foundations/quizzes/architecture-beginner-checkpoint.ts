import type { QuizDefinition } from "@/lib/learn/types";

export const architectureBeginnerCheckpoint: QuizDefinition = {
  id: "architecture-beginner-checkpoint",
  title: "PostgreSQL Architecture — Beginner Checkpoint",
  description:
    "Confirm the Foundations map: databases, PostgreSQL structure, client/server, and query flow.",
  passScore: 7,
  questions: [
    {
      id: "q1",
      prompt: "What is a database, in practical terms?",
      options: [
        { id: "a", label: "A single Excel cell" },
        { id: "b", label: "An organized system for storing and retrieving data" },
        { id: "c", label: "Only a backup file" },
        { id: "d", label: "A programming language" },
      ],
      correctOptionId: "b",
      explanation:
        "A database stores data with structure and rules so applications can retrieve and update it reliably.",
    },
    {
      id: "q2",
      prompt: "PostgreSQL is best described as:",
      options: [
        { id: "a", label: "A spreadsheet application" },
        { id: "b", label: "A NoSQL document store only" },
        { id: "c", label: "An open-source relational database system" },
        { id: "d", label: "A JavaScript framework" },
      ],
      correctOptionId: "c",
      explanation:
        "PostgreSQL is a powerful open-source relational (SQL) database used in many production systems.",
    },
    {
      id: "q3",
      prompt: "What does RDBMS stand for?",
      options: [
        { id: "a", label: "Remote Disk Backup Management System" },
        { id: "b", label: "Relational Database Management System" },
        { id: "c", label: "Runtime Data Buffer Matching Service" },
        { id: "d", label: "Row-Driven Binary Memory Store" },
      ],
      correctOptionId: "b",
      explanation:
        "An RDBMS manages relational databases—tables related by keys, queried with SQL.",
    },
    {
      id: "q4",
      prompt: "Which order correctly describes PostgreSQL’s object hierarchy?",
      options: [
        { id: "a", label: "Row → Table → Schema → Database → Cluster" },
        { id: "b", label: "Cluster → Database → Schema → Table → Row" },
        { id: "c", label: "Schema → Cluster → Row → Database → Table" },
        { id: "d", label: "Database → Cluster → Row → Schema → Table" },
      ],
      correctOptionId: "b",
      explanation:
        "A cluster contains databases; databases contain schemas; schemas contain tables; tables contain rows.",
    },
    {
      id: "q5",
      prompt: "In a table, what do columns represent?",
      options: [
        { id: "a", label: "One entire database backup" },
        { id: "b", label: "The fields or attributes of each record" },
        { id: "c", label: "Only primary keys" },
        { id: "d", label: "Network ports" },
      ],
      correctOptionId: "b",
      explanation:
        "Columns define the shape of the data. Rows hold one value per column.",
    },
    {
      id: "q6",
      prompt: "What is the client in a PostgreSQL connection?",
      options: [
        { id: "a", label: "The disk that stores WAL files" },
        { id: "b", label: "The program that sends SQL, such as psql or an app" },
        { id: "c", label: "Only the PostgreSQL background writer" },
        { id: "d", label: "A schema named public" },
      ],
      correctOptionId: "b",
      explanation:
        "Clients initiate connections and send SQL. The server processes those requests.",
    },
    {
      id: "q7",
      prompt: "After you connect, which process typically handles your SQL for that session?",
      options: [
        { id: "a", label: "A spreadsheet macro" },
        { id: "b", label: "A backend process" },
        { id: "c", label: "The DNS server" },
        { id: "d", label: "Your browser’s CSS engine" },
      ],
      correctOptionId: "b",
      explanation:
        "PostgreSQL assigns a backend process to the connection. That backend runs your queries for the session.",
    },
    {
      id: "q8",
      prompt: "Which beginner-friendly sequence describes query flow?",
      options: [
        {
          id: "a",
          label: "SQL → Parser → Planner → Executor → Buffers/Disk → Result",
        },
        { id: "b", label: "Disk → Result → Planner → SQL → Parser" },
        { id: "c", label: "Result → Executor → Cluster → Schema → SQL" },
        { id: "d", label: "Planner → Client → Schema → Row → Disk" },
      ],
      correctOptionId: "a",
      explanation:
        "SQL is parsed, planned, executed, reads data via buffers or disk, then returns a result.",
    },
    {
      id: "q9",
      prompt: "Why should a beginner care about the architecture map?",
      options: [
        {
          id: "a",
          label: "So later topics like EXPLAIN, vacuum, and replication have a place to attach",
        },
        { id: "b", label: "Because beginners must memorize WAL page formats first" },
        { id: "c", label: "Because SQL is optional in PostgreSQL" },
        { id: "d", label: "Because clusters only store one row forever" },
      ],
      correctOptionId: "a",
      explanation:
        "The beginner map is the spine. Deeper lessons revisit the same concepts with more detail.",
    },
    {
      id: "q10",
      prompt: "At the beginner level, what should you remember about buffers and disk?",
      options: [
        {
          id: "a",
          label: "PostgreSQL may use memory buffers and falls back to disk for durable data",
        },
        { id: "b", label: "PostgreSQL never uses memory" },
        { id: "c", label: "All data lives only in the client browser" },
        { id: "d", label: "Disk is unused after installation" },
      ],
      correctOptionId: "a",
      explanation:
        "Buffers speed access; disk keeps data durable. Internals come later—this overview is enough for now.",
    },
  ],
};
