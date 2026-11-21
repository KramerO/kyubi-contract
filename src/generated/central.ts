// GENERIERT aus packages/kyubi-server/contract/openapi.central.json – nicht von Hand ändern.
// Neu erzeugen: uv run python -m kyubi_server.contract --ts

export interface ApiVersion {
  capabilities: Capabilities;
  major: number;
  minor: number;
  patch: number;
  prerelease: string | null;
  version: string;
}

export interface AuditEntryOut {
  action: string;
  actor: string;
  at: string;
  detail: Record<string, unknown>;
  id: number;
  target: string;
}

export interface AuditLog {
  entries: AuditEntryOut[];
}

export interface BlobStored {
  sha: string;
}

export interface Capabilities {
  apps: string[];
  components: string[];
  operations: string[];
}

export interface CentralHealth {
  status: string;
  version: string;
}

export interface CentralInfo {
  name: string;
  oidc: boolean;
  schema: number | string;
  storage: string;
  version: string;
}

export interface ChangeUser {
  disabled?: boolean | null;
  display?: string | null;
  roles?: Record<string, string | null>;
}

export interface Exchange {
  code: string;
  label?: string;
}

export interface HTTPValidationError {
  detail?: ValidationError[];
}

export interface LockList {
  locks: LockOut[];
}

export interface LockOut {
  note: string;
  path: string;
  since: string;
  user: string;
}

export interface LockRequest {
  force?: boolean;
  note?: string;
  paths: string[];
}

export interface LocksReleased {
  released: string[];
}

export interface Login {
  name: string;
  password: string;
}

export interface Manifest {
  files: Record<string, string>;
  version: number;
}

export interface Missing {
  shas: string[];
}

export interface MissingBlobs {
  missing: string[];
}

export interface NewPassword {
  current?: string | null;
  password: string;
}

export interface NewProject {
  name: string;
}

export interface NewToken {
  label: string;
}

export interface NewUser {
  admin?: boolean;
  display?: string | null;
  name: string;
  password?: string | null;
}

export interface OidcExchange {
  token: string;
  user: string;
}

export interface OkResult {
  ok: boolean;
}

export interface Problem {
  code: string;
  error: string;
  hint?: string | null;
}

export interface ProjectCreated {
  head: number;
  name: string;
}

export interface ProjectDetail {
  head: number;
  name: string;
  role: string | null;
  versions: VersionOut[];
}

export interface ProjectList {
  projects: ProjectRow[];
}

export interface ProjectRow {
  head: number;
  name: string;
  role: string | null;
}

export interface Push {
  base: number;
  changes: Record<string, string | null>;
  message?: string;
  release?: boolean;
}

export interface PushResult {
  released: string[];
  version: number;
}

export interface TokenCreated {
  label: string;
  token: string;
}

export interface TokenList {
  tokens: TokenRow[];
}

export interface TokenRow {
  created: string;
  id: number;
  label: string;
  last_used: string | null;
}

export interface UserList {
  users: UserOut[];
}

export interface UserOut {
  disabled: boolean;
  display: string | null;
  name: string;
  roles: Record<string, string>;
}

export interface UserResponse {
  user: UserOut;
}

export interface ValidationError {
  ctx?: Record<string, unknown>;
  input?: unknown;
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface VersionOut {
  author: string;
  created: string;
  message: string;
  number: number;
}
