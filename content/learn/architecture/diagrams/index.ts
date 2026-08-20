import { clientServerDiagram } from "./client-server";
import { clusterObjectsDiagram } from "./cluster-objects";
import { queryFlowDiagram } from "./query-flow";
import type { ArchitectureDiagramDefinition, DiagramId } from "@/lib/learn/types";

export const architectureDiagrams: ArchitectureDiagramDefinition[] = [
  clusterObjectsDiagram,
  clientServerDiagram,
  queryFlowDiagram,
];

export function getDiagram(id: DiagramId) {
  const diagram = architectureDiagrams.find((item) => item.id === id);
  if (!diagram) {
    throw new Error(`Unknown architecture diagram: ${id}`);
  }
  return diagram;
}
