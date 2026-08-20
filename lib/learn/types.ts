export type ArchitectureConceptId =
  | "client-server"
  | "cluster-database-schema"
  | "backend-process"
  | "query-flow"
  | "storage-overview";

export type DiagramId = "cluster-objects" | "client-server" | "query-flow";

export type LessonBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "example"; title: string; body: string }
  | { type: "code"; language?: string; code: string; caption?: string }
  | { type: "callout"; tone?: "note" | "tip"; text: string }
  | { type: "diagram"; diagramId: DiagramId }
  | { type: "concept-callout"; conceptId: ArchitectureConceptId }
  | { type: "dba-later"; text: string };

export type LessonDefinition = {
  slug: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  sortOrder: number;
  conceptIds: ArchitectureConceptId[];
  blocks: LessonBlock[];
  exerciseId?: string;
  quizId?: string;
};

export type ModuleDefinition = {
  slug: string;
  title: string;
  description: string;
  lessons: LessonDefinition[];
};

export type PathDefinition = {
  slug: string;
  title: string;
  description: string;
  levelLabel: string;
  modules: ModuleDefinition[];
};

export type ArchitectureLayer = {
  layer: number;
  summary: string;
  explanation: string;
};

export type ArchitectureConcept = {
  id: ArchitectureConceptId;
  slug: ArchitectureConceptId;
  title: string;
  layers: ArchitectureLayer[];
  diagram?: DiagramId;
  dba?: {
    what: string;
    observeLater?: string;
    whenItBreaksLater?: string;
  };
  connectsTo: ArchitectureConceptId[];
};

export type DiagramNode = {
  id: string;
  label: string;
  explanation: string;
};

export type DiagramEdge = {
  from: string;
  to: string;
};

export type ArchitectureDiagramDefinition = {
  id: DiagramId;
  title: string;
  description: string;
  layout: "vertical" | "horizontal";
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  defaultHighlight?: string[];
};

export type ExerciseOption = {
  id: string;
  label: string;
};

export type ExerciseItem = {
  id: string;
  prompt: string;
  correctOptionId: string;
  explanation: string;
};

export type ExerciseDefinition = {
  id: string;
  title: string;
  instructions: string;
  options: ExerciseOption[];
  items: ExerciseItem[];
  passScore: number;
};

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
};

export type QuizDefinition = {
  id: string;
  title: string;
  description: string;
  passScore: number;
  questions: QuizQuestion[];
};

export type LessonProgressStatus = "not_started" | "in_progress" | "completed";

export type LearnerProgressSnapshot = {
  lessonStatuses: Record<string, LessonProgressStatus>;
  completedLessonCount: number;
  totalLessonCount: number;
  completionPercent: number;
  continueLessonSlug: string | null;
  bestQuizScore: number | null;
  quizPassed: boolean;
  conceptsSeen: string[];
};
