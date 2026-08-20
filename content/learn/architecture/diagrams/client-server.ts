import type { ArchitectureDiagramDefinition } from "@/lib/learn/types";

export const clientServerDiagram: ArchitectureDiagramDefinition = {
  id: "client-server",
  title: "Client and server",
  description: "How applications connect into PostgreSQL.",
  layout: "vertical",
  nodes: [
    {
      id: "client",
      label: "Application / psql",
      explanation:
        "The client is the program you use: a terminal with psql, a web app, a notebook, or a GUI. It sends connection requests and SQL statements.",
    },
    {
      id: "server",
      label: "PostgreSQL Server",
      explanation:
        "The PostgreSQL server listens for connections, authenticates clients, and manages databases in the cluster.",
    },
    {
      id: "backend",
      label: "Backend Process",
      explanation:
        "After a successful connection, one backend process handles that session. Your SQL for that connection is processed here.",
    },
  ],
  edges: [
    { from: "client", to: "server" },
    { from: "server", to: "backend" },
  ],
};
