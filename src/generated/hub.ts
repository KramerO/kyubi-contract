// GENERIERT aus packages/kyubi-server/contract/openapi.hub.json – nicht von Hand ändern.
// Neu erzeugen: uv run python -m kyubi_server.contract --ts

export interface ApiVersion {
  capabilities: Capabilities;
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
  version: string;
}

export interface Capabilities {
  apps: string[];
  components: string[];
  operations: string[];
}

export interface CentralProjectRow {
  head: number;
  local: boolean;
  name: string;
  role: string;
}

export interface CentralProjects {
  projects: CentralProjectRow[];
  url: string;
  user: string | null;
}

export interface Checkout {
  name: string;
  segment?: string | null;
}

export interface Connect {
  ca?: string | null;
  url: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface HubApp {
  description: string;
  description_en: string | null;
  icon: string;
  key: string;
  title: string;
}

export interface HubOverview {
  apps: HubApp[];
  can_create: boolean;
  description: string | null;
  projects: HubProjectRow[];
  segments: string[];
  version: string;
  workspace: string | null;
}

export interface HubProblem {
  diagnostics: HubProblemDiagnostic[];
  error: string;
}

export interface HubProblemDiagnostic {
  code: string;
  hint?: string | null;
  message: string;
  severity: string;
}

export interface HubProjectRow {
  description: string | null;
  graphs: number;
  includes: string[];
  jobs: number;
  name: string;
  plans: number;
  segment: string | null;
  url: string;
}

export interface LicenseInfo {
  apps?: Record<string, number>;
  compute?: Record<string, number>;
  customer?: string | null;
  days_left?: number | null;
  expires?: string | null;
  grace_ends?: string | null;
  id?: string | null;
  installed: boolean;
  problem?: string | null;
  state?: string | null;
  valid: boolean;
}

export interface Login {
  oidc?: boolean;
  password?: string | null;
  token?: string | null;
  user?: string | null;
}

export interface NewProject {
  description?: string | null;
  name: string;
  segment?: string | null;
}

export interface ProjectCreated {
  name: string;
  url: string;
  version?: number | null;
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

export interface ValidationError {
  ctx?: Record<string, unknown>;
  input?: unknown;
  loc: (string | number)[];
  msg: string;
  type: string;
}
