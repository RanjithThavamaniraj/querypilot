import type { LessonDefinition } from "@/lib/learn/types";

export const whatIsADatabase: LessonDefinition = {
  slug: "what-is-a-database",
  title: "What is a Database?",
  summary:
    "Understand what a database is, why applications need one, and how it differs from files or spreadsheets.",
  estimatedMinutes: 7,
  sortOrder: 1,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "A database is an organized system for storing, retrieving, and updating data. Applications rely on databases so information stays consistent, searchable, and durable—even when many users work at once.",
    },
    {
      type: "heading",
      text: "Why not just use files?",
    },
    {
      type: "paragraph",
      text: "You can store data in text files or spreadsheets. That works for tiny personal lists. It breaks down when you need concurrent updates, relationships between records, fast lookups, permissions, or recovery after a crash.",
    },
    {
      type: "list",
      items: [
        "Find one customer among millions without scanning everything by hand",
        "Keep orders linked to the correct customers",
        "Prevent two people from overwriting the same record blindly",
        "Survive restarts without losing committed work",
      ],
    },
    {
      type: "example",
      title: "Everyday example",
      body: "An online shop stores customers, products, and orders. When you place an order, the application writes related records and later reads them back for shipping and invoices. The database is the system of record behind that flow.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "As you learn PostgreSQL, keep asking: what data am I storing, how is it related, and how will I look it up again?",
    },
  ],
};

export const whatIsPostgresql: LessonDefinition = {
  slug: "what-is-postgresql",
  title: "What is PostgreSQL?",
  summary:
    "Meet PostgreSQL as an open-source relational database used from learning projects to production systems.",
  estimatedMinutes: 7,
  sortOrder: 2,
  conceptIds: ["client-server"],
  blocks: [
    {
      type: "paragraph",
      text: "PostgreSQL (often nicknamed Postgres) is a powerful open-source relational database. You interact with it using SQL, and it runs as a server that clients connect to.",
    },
    {
      type: "heading",
      text: "What makes PostgreSQL popular?",
    },
    {
      type: "list",
      items: [
        "Strong SQL support and relational integrity",
        "Reliability and a long history in production",
        "Rich features that grow with you: indexes, JSON, extensions, replication, and more",
        "A large community and ecosystem of tools",
      ],
    },
    {
      type: "concept-callout",
      conceptId: "client-server",
    },
    {
      type: "example",
      title: "How you will use it",
      body: "You might open psql in a terminal, connect to a local PostgreSQL server, create a database, create a table, and run SELECT statements. Later, applications will do the same over a network connection.",
    },
    {
      type: "dba-later",
      text: "Later, as a DBA, you will care about versions, extensions, configuration, backups, and how your apps connect. For now, treat PostgreSQL as the server that stores and serves your relational data.",
    },
  ],
};

export const dbmsVsRdbms: LessonDefinition = {
  slug: "dbms-vs-rdbms",
  title: "DBMS vs RDBMS",
  summary:
    "Learn the difference between a general database system and a relational one.",
  estimatedMinutes: 6,
  sortOrder: 3,
  conceptIds: [],
  blocks: [
    {
      type: "paragraph",
      text: "DBMS means Database Management System: software that stores data and lets you create, read, update, and delete it under managed rules.",
    },
    {
      type: "paragraph",
      text: "RDBMS means Relational Database Management System: a DBMS that organizes data primarily as tables (relations) and connects those tables with keys. PostgreSQL is an RDBMS.",
    },
    {
      type: "heading",
      text: "Relational ideas you will use constantly",
    },
    {
      type: "list",
      items: [
        "Tables hold rows and columns",
        "Primary keys uniquely identify rows",
        "Foreign keys relate rows across tables",
        "SQL is the language for querying and changing data",
      ],
    },
    {
      type: "example",
      title: "Relational thinking",
      body: "Customers live in one table. Orders live in another. Each order points to a customer. That relationship is the heart of relational modeling.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Not every database is relational. Document stores and key-value stores solve different problems. QueryPilot focuses on PostgreSQL’s relational model first.",
    },
  ],
};

export const clusterDatabaseSchema: LessonDefinition = {
  slug: "cluster-database-schema",
  title: "PostgreSQL Cluster, Database and Schema",
  summary:
    "Learn the hierarchy that organizes everything you create in PostgreSQL.",
  estimatedMinutes: 10,
  sortOrder: 4,
  conceptIds: ["cluster-database-schema"],
  blocks: [
    {
      type: "paragraph",
      text: "PostgreSQL uses a clear hierarchy. If you remember only one structure from Foundations, remember this map.",
    },
    {
      type: "diagram",
      diagramId: "cluster-objects",
    },
    {
      type: "concept-callout",
      conceptId: "cluster-database-schema",
    },
    {
      type: "heading",
      text: "Plain-language definitions",
    },
    {
      type: "list",
      items: [
        "Cluster: one PostgreSQL server instance and the databases it manages",
        "Database: a named container you usually connect to",
        "Schema: a namespace inside a database for organizing objects",
        "Table: a structured collection of rows",
        "Row: one record",
      ],
    },
    {
      type: "example",
      title: "A mental picture",
      body: "Think of a cluster as an apartment building, a database as an apartment, a schema as a labeled closet, a table as a labeled box, and a row as one item in that box.",
    },
    {
      type: "callout",
      tone: "tip",
      text: "Beginners often confuse “database” with “table.” In PostgreSQL, a database can contain many schemas, and each schema can contain many tables.",
    },
    {
      type: "dba-later",
      text: "Later you will manage search_path, multiple schemas for multi-tenant designs, and privileges per database or schema. The hierarchy stays the same.",
    },
  ],
  exerciseId: "map-object-hierarchy",
};

export const tablesRowsColumns: LessonDefinition = {
  slug: "tables-rows-columns",
  title: "Tables, Rows and Columns",
  summary:
    "See how tabular data is shaped before you write your first serious SQL.",
  estimatedMinutes: 8,
  sortOrder: 5,
  conceptIds: ["cluster-database-schema"],
  blocks: [
    {
      type: "paragraph",
      text: "A table defines columns (the fields) and stores rows (the records). This is the working surface of almost every SQL lesson that follows.",
    },
    {
      type: "heading",
      text: "Columns define the shape",
    },
    {
      type: "paragraph",
      text: "Each column has a name and a data type. For a customers table you might have id, name, and email. Types tell PostgreSQL what kind of value belongs in each field.",
    },
    {
      type: "heading",
      text: "Rows hold the values",
    },
    {
      type: "paragraph",
      text: "Each row is one customer, one order, or one product. When you SELECT, you ask PostgreSQL which rows to return and which columns to include.",
    },
    {
      type: "code",
      language: "sql",
      caption: "A conceptual table definition",
      code: `CREATE TABLE customers (
  id    integer,
  name  text,
  email text
);`,
    },
    {
      type: "example",
      title: "Reading the table",
      body: "If customers has three rows, a SELECT without filters conceptually returns all three. Filters (WHERE) and projections (column lists) come in SQL fundamentals next.",
    },
    {
      type: "callout",
      tone: "note",
      text: "Primary keys, foreign keys, and constraints arrive soon. For now, focus on the table as a grid of typed columns filled with rows.",
    },
  ],
};
