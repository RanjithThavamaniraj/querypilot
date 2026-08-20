import type { ArchitectureConcept } from "@/lib/learn/types";

export const architectureConcepts: ArchitectureConcept[] = [
  {
    id: "client-server",
    slug: "client-server",
    title: "Client and Server",
    layers: [
      {
        layer: 0,
        summary: "Your tools talk to a PostgreSQL server process.",
        explanation:
          "A client is anything that sends SQL to PostgreSQL—psql, an app, or a GUI. The server receives those requests, handles them, and sends results back. Beginners should remember: you almost never work “inside the database file” directly; you talk to a server.",
      },
    ],
    diagram: "client-server",
    dba: {
      what: "Separates applications from the database engine.",
      observeLater: "Connection counts, session views, and pooler metrics.",
      whenItBreaksLater: "Too many clients, auth failures, or network issues.",
    },
    connectsTo: ["backend-process", "query-flow"],
  },
  {
    id: "cluster-database-schema",
    slug: "cluster-database-schema",
    title: "Cluster, Database, and Schema",
    layers: [
      {
        layer: 0,
        summary: "PostgreSQL organizes data in a clear hierarchy.",
        explanation:
          "A PostgreSQL installation manages a cluster. Inside a cluster you create databases. Inside a database you use schemas to organize objects. Tables live inside schemas. Rows live inside tables. This hierarchy is how you keep related objects tidy.",
      },
    ],
    diagram: "cluster-objects",
    dba: {
      what: "Defines how objects are grouped and named.",
      observeLater: "\\l, \\dn, search_path, and catalog tables.",
      whenItBreaksLater: "Wrong database, wrong schema, or search_path surprises.",
    },
    connectsTo: ["storage-overview"],
  },
  {
    id: "backend-process",
    slug: "backend-process",
    title: "Backend Process",
    layers: [
      {
        layer: 0,
        summary: "Each connection is handled by a dedicated backend process.",
        explanation:
          "When your client connects successfully, PostgreSQL assigns a backend process to that session. That process receives your SQL, runs the query-processing steps, and returns results. Later you will learn about many other background processes; for now, remember the backend is “your connection’s worker.”",
      },
    ],
    diagram: "client-server",
    dba: {
      what: "Owns one client session’s work.",
      observeLater: "pg_stat_activity and process monitoring.",
      whenItBreaksLater: "Stuck queries, idle sessions, or connection storms.",
    },
    connectsTo: ["client-server", "query-flow"],
  },
  {
    id: "query-flow",
    slug: "query-flow",
    title: "Query Flow",
    layers: [
      {
        layer: 0,
        summary: "SQL travels through a predictable pipeline before results return.",
        explanation:
          "At a beginner level, think of this pipeline: SQL arrives, PostgreSQL parses it, plans how to run it, executes that plan, reads data through buffers or disk, and returns a result. You do not need the internals yet—just the map.",
      },
    ],
    diagram: "query-flow",
    dba: {
      what: "Explains how a statement becomes a result.",
      observeLater: "EXPLAIN, EXPLAIN ANALYZE, and planner statistics.",
      whenItBreaksLater: "Slow plans, missing indexes, or unexpected scan choices.",
    },
    connectsTo: ["backend-process", "storage-overview"],
  },
  {
    id: "storage-overview",
    slug: "storage-overview",
    title: "Storage Overview",
    layers: [
      {
        layer: 0,
        summary: "PostgreSQL keeps working data in memory buffers and durable data on disk.",
        explanation:
          "When PostgreSQL needs table data, it often finds pages already in shared buffers (memory). If not, it reads from disk. Beginners only need this idea: results come from data managed by the server, not from a spreadsheet you edit by hand.",
      },
    ],
    diagram: "query-flow",
    dba: {
      what: "Separates cached pages from durable storage.",
      observeLater: "Shared buffers, cache hit ratios, and disk I/O.",
      whenItBreaksLater: "Disk pressure, cache thrashing, or tablespace issues.",
    },
    connectsTo: ["query-flow", "cluster-database-schema"],
  },
];

export function getConcept(id: string) {
  return architectureConcepts.find((concept) => concept.id === id);
}

export function getConceptLayer(id: string, layer = 0) {
  const concept = getConcept(id);
  return concept?.layers.find((item) => item.layer === layer) ?? concept?.layers[0];
}
