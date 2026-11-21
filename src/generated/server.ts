// GENERIERT aus packages/kyubi-server/contract/openapi.server.json – nicht von Hand ändern.
// Neu erzeugen: uv run python -m kyubi_server.contract --ts

export interface AiModels {
  models: string[];
  online: boolean;
}

export interface AiStatus {
  host: string;
  models: string[];
  online: boolean;
}

export interface ApiVersion {
  capabilities: Capabilities;
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
  version: string;
}

export interface AttemptRow {
  attempt: number;
  ended_at: string | null;
  job: string;
  message: string | null;
  run_id: string | null;
  started_at: string | null;
  state: string;
}

export interface Breadcrumb {
  id: string;
  label: string;
}

export interface CanvasNote {
  id: string;
  position: number[];
  text: string;
}

export interface Capabilities {
  apps: string[];
  components: string[];
  operations: string[];
}

export interface CatalogEntry {
  category: string | null;
  description: string | null;
  description_en: string | null;
  icon: string | null;
  inputs: CatalogInput[];
  origin: string;
  outputs: CatalogOutput[];
  parameters: Record<string, unknown>[];
  type: string;
}

export interface CatalogInput {
  multi: boolean;
  name: string;
  optional: boolean;
}

export interface CatalogOutput {
  name: string;
  optional: boolean;
}

export interface ChangesetResult {
  applied: boolean;
  diagnostics?: Diagnostic[];
  diff?: string;
  files?: string[];
  ok: boolean;
  results: OpResult[];
}

export interface ChatRequest {
  message: string;
  model?: string | null;
  session?: string;
}

export interface ComponentLogs {
  component: string;
  instances: InstanceLogs[];
}

export interface Connect {
  ca?: string | null;
  url: string;
}

export interface DbtExportResult {
  kept: string[];
  placeholders: string[];
  project: string;
  removed: string[];
  target: string;
  written: string[];
}

export interface Diagnostic {
  code: string;
  col?: number | null;
  file?: string | null;
  hint?: string | null;
  line?: number | null;
  message: string;
  path?: string | null;
  severity?: Severity;
}

export interface DiagnosticOut {
  code: string;
  col?: number | null;
  file?: string | null;
  hint?: string | null;
  line?: number | null;
  message: string;
  path?: string | null;
  severity: string;
}

export interface EventRow {
  actor: string | null;
  at: string | null;
  from: string | null;
  job: string | null;
  reason: string | null;
  seq: number;
  to: string | null;
}

export interface ExportBody {
  graphs?: string[];
  schema_name?: string;
  target?: string;
}

export interface FileEntry {
  is_dir: boolean;
  name: string;
  path: string;
  size: number | null;
}

export interface FilesListing {
  dir: string;
  entries: FileEntry[];
  parent: string | null;
}

export interface GraphEdge {
  checkpoint: boolean;
  descending?: boolean | null;
  diagnostics: DiagnosticOut[];
  id: string;
  partitions?: number[] | null;
  route?: string | null;
  route_keys?: string[] | null;
  schema: string | null;
  source: string;
  source_port: string;
  status: string;
  target: string;
  target_port: string;
  viewer: number | null;
}

export interface GraphLog {
  run_id: string;
  text: string;
}

export interface GraphNode {
  category: string | null;
  composite: boolean;
  description: string | null;
  diagnostics: DiagnosticOut[];
  group: unknown;
  id: string;
  inputs: NodePort[];
  label: string;
  layout: Record<string, string>[] | null;
  outputs: NodePort[];
  params: Record<string, unknown>;
  partitions: number | null;
  phase: number | null;
  position: number[];
  status: string;
  template_params: Record<string, unknown> | null;
  type: string;
}

export interface GraphView {
  breadcrumb: Breadcrumb[];
  description: string | null;
  diagnostics: DiagnosticOut[];
  edges: GraphEdge[];
  inside: string | null;
  name: string;
  nodes: GraphNode[];
  notes: CanvasNote[];
  ok: boolean;
  package: string | null;
  parameters: Record<string, unknown>[];
  path: string | null;
  phase_count: number;
  readonly: boolean;
  sandbox: string | null;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface Health {
  ok: boolean;
  project: string;
  version: string;
}

export interface InstanceDetail {
  attempts: AttemptRow[];
  business_date: string;
  created_at: string | null;
  ended_at: string | null;
  events: EventRow[];
  held: boolean;
  id: string;
  job_count: number;
  job_details: JobDetail[];
  jobs: Record<string, number>;
  message: string | null;
  param_set: string | null;
  params: Record<string, unknown>;
  plan: string;
  plan_missing: boolean;
  sandbox: Record<string, string>;
  scheduled_at: string | null;
  sla: string | null;
  state: string;
  timezone: string;
  trigger: string;
}

export interface InstanceLog {
  instance: string;
  text: string;
}

export interface InstanceLogs {
  instance: string;
  log: string;
  stderr: string;
}

export interface InstanceRow {
  business_date: string;
  created_at: string | null;
  ended_at: string | null;
  held: boolean;
  id: string;
  job_count: number;
  jobs: Record<string, number>;
  message: string | null;
  param_set: string | null;
  params: Record<string, unknown>;
  plan: string;
  sandbox: Record<string, string>;
  scheduled_at: string | null;
  sla: string | null;
  state: string;
  trigger: string;
}

export interface JobDetail {
  attempt: number;
  cancel_requested: boolean;
  depends_on: string[];
  ended_at: string | null;
  file: string | null;
  graph: string | null;
  kind: string;
  message: string | null;
  name: string;
  not_before: string | null;
  param_set: string | null;
  plan: string | null;
  resources: Record<string, number>;
  retries: number;
  run_id: string | null;
  sla: string | null;
  sla_deadline: string | null;
  started_at: string | null;
  state: string;
  timeout: string | null;
}

export interface LastInstance {
  business_date: string;
  id: string;
  state: string;
}

export interface Login {
  oidc?: boolean;
  password?: string | null;
  token?: string | null;
  user?: string | null;
}

export interface MappingDetail {
  code: string | null;
  diagnostics: DiagnosticOut[];
  execution: MappingExecution | null;
  input: SchemaTreeNode[] | null;
  mapping: Record<string, unknown>;
  name: string;
  output: SchemaTreeNode[] | null;
  readonly: boolean;
  source_map: Record<string, string>;
  status: Record<string, string>;
  vectorized: boolean;
}

export interface MappingExecution {
  arrow_fields?: string[] | null;
  mode: string;
  python_columns?: string[] | null;
  python_fields?: string[] | null;
}

export interface MappingListItem {
  description: string | null;
  input: string;
  name: string;
  output: string;
  readonly?: boolean | null;
  sandbox?: string | null;
  shadowed?: boolean | null;
}

export interface MappingPreview {
  diagnostics: DiagnosticOut[];
  dropped: unknown;
  logs: unknown;
  ok: boolean;
  outputs: Record<string, unknown>[];
  rejected: PreviewRejected[];
  rows_in: number;
}

export interface NodePort {
  connected: boolean;
  multi?: boolean | null;
  name: string;
  optional: boolean;
  schema: string | null;
}

export interface OkResult {
  ok: boolean;
}

export interface OpResult {
  changed?: boolean;
  data?: Record<string, unknown>;
  diagnostics?: Diagnostic[];
  ok?: boolean;
  op: string;
}

export interface OperationInfo {
  description: string;
  input: Record<string, unknown>;
  name: string;
  permission: string;
}

export interface PlanRow {
  calendar: string | null;
  description: string | null;
  enabled: boolean;
  error?: string | null;
  jobs: string[];
  last: LastInstance | null;
  name: string;
  next_business_date: string | null;
  next_fire: string | null;
  schedule: Record<string, unknown> | null;
}

export interface PreviewInput {
  file?: string | null;
  format?: string | Record<string, unknown> | null;
  limit?: number;
  params?: Record<string, string>;
  rows?: Record<string, unknown>[] | null;
}

export interface PreviewRejected {
  reason: string;
  row: number;
}

export interface Problem {
  code: string;
  error: string;
  hint?: string | null;
}

export interface ProjectObject {
  description: string | null;
  name: string;
  path: string | null;
  readonly?: boolean | null;
  sandbox?: string | null;
  shadowed?: boolean | null;
}

export interface ProjectView {
  default_profile: string | null;
  diagnostics: DiagnosticOut[];
  name: string;
  objects: Record<string, ProjectObject[]>;
  projects: string[];
  root: string;
  sandboxes: SandboxInfo[];
  segment: string | null;
  uses: string[];
  workspace: string | null;
}

export interface ProposalDetail {
  author: string;
  created: string;
  description: string | null;
  diagnostics: DiagnosticOut[];
  diff: string;
  files: string[];
  graphs: string[];
  id: string;
  ok: boolean;
  ops: ProposedOpOut[];
  status: "draft" | "open" | "accepted" | "rejected";
  title: string;
  updated: string;
}

export interface ProposalSummary {
  author: string;
  created: string;
  description: string | null;
  id: string;
  op_count: number;
  status: "draft" | "open" | "accepted" | "rejected";
  title: string;
  updated: string;
}

export interface ProposedOpOut {
  input: Record<string, unknown>;
  op: string;
}

export interface Push {
  message?: string;
  paths?: string[] | null;
  release?: boolean;
}

export interface RemoteConnected {
  ca?: string | null;
  configured: boolean;
  login_error?: string | null;
  login_pending?: boolean | null;
  url?: string | null;
  user?: string | null;
  version?: string | null;
}

export interface RemoteInfo {
  ca?: string | null;
  configured: boolean;
  login_error?: string | null;
  login_pending?: boolean | null;
  url?: string | null;
  user?: string | null;
}

export interface RemoteProblem {
  code: string;
  error: string;
  hint?: string | null;
}

export interface RemotePush {
  files: string[];
  pulled: string[];
  version: number;
}

export interface RunCommandResult {
  data?: Record<string, unknown> | null;
  diagnostics: DiagnosticOut[];
  ok: boolean;
}

export interface RunRow {
  finished: string | null;
  graph: string | null;
  host: string | null;
  profile: string | null;
  run_id: string | null;
  started: string | null;
  status: string | null;
  user: string | null;
}

export interface RunStatus {
  diagnostics?: DiagnosticOut[] | null;
  event?: Record<string, unknown> | null;
  finished?: string | null;
  graph: string | null;
  host?: string | null;
  profile?: string | null;
  report?: Record<string, unknown> | null;
  run_id: string | null;
  started?: string | null;
  status: string | null;
  user?: string | null;
}

export interface SampleColumn {
  name: string;
  type: string;
}

export interface SampleInfo {
  component: string;
  port: string;
  rows: number;
}

export interface SampleView {
  columns: SampleColumn[];
  component: string;
  port: string;
  rows: Record<string, unknown>[];
  sampled: number;
}

export interface SandboxInfo {
  alias: string;
  name: string;
  objects: number;
}

export interface SchedulerOverview {
  errors: string[];
  instances: InstanceRow[];
  leader: boolean | null;
  now: string | null;
  plans: PlanRow[];
  running: boolean;
}

export interface SchedulerRunning {
  running: boolean;
}

export interface SchemaTreeNode {
  default: unknown;
  description: string | null;
  fields?: SchemaTreeNode[] | null;
  items?: SchemaTreeNode | null;
  name: string | null;
  nullable: boolean;
  type: string;
}

export type Severity = "error" | "warning" | "info";

export interface Snippet {
  category: string;
  category_en?: string | null;
  code: string;
  description: string | null;
  description_en?: string | null;
  name: string;
  name_en?: string | null;
  origin: string;
  problem: string | null;
}

export interface StartRun {
  components?: string[] | null;
  from_run?: string | null;
  graph: string;
  keep_flows?: boolean;
  param_set?: string | null;
  params?: Record<string, unknown>;
  profile?: string | null;
  scope?: "only" | "upstream" | "downstream";
  viewers?: boolean;
}

export interface ValidationError {
  ctx?: Record<string, unknown>;
  input?: unknown;
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ViewerFlow {
  flow: string;
  from: string | null;
  partition_info: ViewerPartition[];
  partitions: number;
  rows: number;
  seen: number;
  to: string | null;
  truncated: boolean;
}

export interface ViewerPage {
  columns: SampleColumn[];
  flow: string;
  limit: number;
  offset: number;
  partition: string;
  returned_rows: number;
  rows: Record<string, unknown>[];
  seen: number;
  statistics: Record<string, unknown>;
  total_rows: number;
  truncated: boolean;
  written: number;
}

export interface ViewerPartition {
  partition: string;
  rows: number;
  seen: number;
  truncated: boolean;
}
