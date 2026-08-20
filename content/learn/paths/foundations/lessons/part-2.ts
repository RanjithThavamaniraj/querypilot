import type { LessonDefinition } from "@/lib/learn/types";

export const architectureOverview: LessonDefinition = {
  slug: "architecture-overview",
  title: "How PostgreSQL Works — Architecture Overview",
  summary:
    "Build the beginner mental model of client, server, backend, query processing, and storage.",
  estimatedMinutes: 12,
  sortOrder: 6,
  conceptIds: [
    "client-server",
    "backend-process",
    "query-flow",
    "storage-overview",
  ],
  blocks: [
    {
      type: "paragraph",
      text: "Before deeper DBA topics, you need a map. This lesson gives the beginner architecture picture QueryPilot will deepen for the rest of the curriculum.",
    },
    {
      type: "heading",
      text: "The beginner map",
    },
    {
      type: "list",
      items: [
        "Client sends SQL",
        "PostgreSQL server accepts the connection",
        "A backend process handles the session",
        "Query processing turns SQL into work",
        "Buffers and disk supply data",
        "A result returns to the client",
      ],
    },
    {
      type: "diagram",
      diagramId: "client-server",
    },
    {
      type: "diagram",
      diagramId: "query-flow",
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "concept-callout",
      conceptId: "storage-overview",
    },
    {
      type: "callout",
      tone: "note",
      text: "You do not need xmin, WAL internals, or cost models yet. Those are later layers on the same concepts.",
    },
    {
      type: "dba-later",
      text: "Every advanced topic—EXPLAIN, vacuum, replication, HA—hooks back into this map. Learn the map once; deepen it repeatedly.",
    },
  ],
};

export const whatHappensWhenYouRunSql: LessonDefinition = {
  slug: "what-happens-when-you-run-sql",
  title: "What Happens When You Run a SQL Query?",
  summary:
    "Follow one SELECT through the beginner query-flow pipeline.",
  estimatedMinutes: 10,
  sortOrder: 7,
  conceptIds: ["query-flow", "storage-overview"],
  blocks: [
    {
      type: "paragraph",
      text: "Take a simple statement and walk it through the architecture map.",
    },
    {
      type: "code",
      language: "sql",
      caption: "Example statement",
      code: `SELECT *
FROM customers
WHERE id = 100;`,
    },
    {
      type: "diagram",
      diagramId: "query-flow",
    },
    {
      type: "heading",
      text: "Step by step",
    },
    {
      type: "list",
      items: [
        "SQL arrives at your backend process",
        "Parser checks the statement structure",
        "Planner chooses a way to find matching rows",
        "Executor runs that plan",
        "Needed data pages come from buffers or disk",
        "Matching rows return as the result",
      ],
    },
    {
      type: "concept-callout",
      conceptId: "query-flow",
    },
    {
      type: "example",
      title: "What you will do later",
      body: "In Performance lessons you will run EXPLAIN on statements like this and see whether PostgreSQL chose a sequential scan or an index scan. That is the same planner step—just with more detail.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "If a query feels mysterious, return to this pipeline. Ask where the work is happening: parsing, planning, executing, or reading data.",
    },
  ],
};

export const clientAndServer: LessonDefinition = {
  slug: "client-and-server",
  title: "PostgreSQL Client and Server",
  summary:
    "Separate the tools you use from the engine that stores data.",
  estimatedMinutes: 8,
  sortOrder: 8,
  conceptIds: ["client-server", "backend-process"],
  blocks: [
    {
      type: "paragraph",
      text: "PostgreSQL is a client/server system. Mixing those roles is a common beginner confusion.",
    },
    {
      type: "diagram",
      diagramId: "client-server",
    },
    {
      type: "concept-callout",
      conceptId: "client-server",
    },
    {
      type: "heading",
      text: "Common clients",
    },
    {
      type: "list",
      items: [
        "psql — the official interactive terminal",
        "Application drivers — libraries in Python, Node.js, Go, Java, and more",
        "GUI tools — visual clients that still speak SQL over a connection",
      ],
    },
    {
      type: "heading",
      text: "The server’s job",
    },
    {
      type: "paragraph",
      text: "The server authenticates clients, manages databases in the cluster, and coordinates the work of backend processes. Your data lives under server control, not inside the client app.",
    },
    {
      type: "example",
      title: "Connection in words",
      body: "You start psql, point it at host/port/database, authenticate, and then type SQL. psql is the client. PostgreSQL is the server.",
    },
    {
      type: "dba-later",
      text: "Production systems often place a connection pooler between apps and PostgreSQL. The client/server idea remains; the path just gains another hop.",
    },
  ],
};

export const basicProcesses: LessonDefinition = {
  slug: "basic-postgresql-processes",
  title: "Basic PostgreSQL Processes",
  summary:
    "Meet the server and the backend process—enough process vocabulary for Foundations.",
  estimatedMinutes: 8,
  sortOrder: 9,
  conceptIds: ["backend-process", "client-server"],
  blocks: [
    {
      type: "paragraph",
      text: "PostgreSQL uses multiple processes. For Foundations, you only need two ideas: the server that accepts work, and the backend that handles your session.",
    },
    {
      type: "concept-callout",
      conceptId: "backend-process",
    },
    {
      type: "heading",
      text: "What to remember now",
    },
    {
      type: "list",
      items: [
        "The PostgreSQL server process manages the cluster and incoming connections",
        "Each successful client connection is associated with a backend process",
        "Your SQL for that session is processed by that backend",
        "Other specialized background processes exist—you will meet them later",
      ],
    },
    {
      type: "diagram",
      diagramId: "client-server",
    },
    {
      type: "callout",
      tone: "note",
      text: "Do not memorize checkpointer, WAL writer, or autovacuum workers yet. Those belong to later architecture layers once the beginner map is solid.",
    },
    {
      type: "example",
      title: "Why this matters",
      body: "If one query is stuck, a DBA looks at the backend for that session. If nobody can connect, the problem may be broader than one backend. Process thinking starts with that distinction.",
    },
    {
      type: "dba-later",
      text: "Later lessons cover background workers one by one: what each does, how to observe it, and what “unhealthy” looks like.",
    },
  ],
};

export const architectureBeginnerCheckpointLesson: LessonDefinition = {
  slug: "architecture-beginner-checkpoint",
  title: "PostgreSQL Architecture — Beginner Checkpoint",
  summary:
    "Verify your Foundations map with a scored quiz before moving into SQL fundamentals.",
  estimatedMinutes: 15,
  sortOrder: 10,
  conceptIds: [
    "client-server",
    "cluster-database-schema",
    "backend-process",
    "query-flow",
    "storage-overview",
  ],
  quizId: "architecture-beginner-checkpoint",
  blocks: [
    {
      type: "paragraph",
      text: "This checkpoint confirms you can explain the beginner architecture map in your own words—and pick the right concepts under pressure.",
    },
    {
      type: "heading",
      text: "You should be able to explain",
    },
    {
      type: "list",
      items: [
        "What a database and an RDBMS are",
        "Why PostgreSQL is a client/server system",
        "Cluster → Database → Schema → Table → Row",
        "What a backend process is for",
        "The beginner query-flow pipeline",
        "That buffers and disk both participate in reading data",
      ],
    },
    {
      type: "diagram",
      diagramId: "query-flow",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Passing score is 7 out of 10. You can retry. Use the explanations after each attempt—they reinforce the spine for later levels.",
    },
    {
      type: "dba-later",
      text: "After this module, SQL fundamentals begin. Architecture returns whenever we touch EXPLAIN, memory, storage, MVCC, WAL, replication, and production design.",
    },
  ],
};
