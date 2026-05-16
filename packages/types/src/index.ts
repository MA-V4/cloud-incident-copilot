// ─── Log Event ────────────────────────────────────────────────────────────────

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEvent {
  projectId: string;
  eventId: string;
  timestamp: string;
  type: 'log';
  service: string;
  level: LogLevel;
  message: string;
  metadata?: Record<string, unknown>;
}

// ─── Deployment Event ─────────────────────────────────────────────────────────

export type DeploymentStatus = 'started' | 'succeeded' | 'failed' | 'rolled_back';

export interface DeploymentEvent {
  projectId: string;
  eventId: string;
  timestamp: string;
  type: 'deployment';
  service: string;
  version: string;
  status: DeploymentStatus;
  metadata?: Record<string, unknown>;
}

export type AppEvent = LogEvent | DeploymentEvent;

// ─── Incident ─────────────────────────────────────────────────────────────────

export type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
export type IncidentStatus = 'open' | 'investigating' | 'resolved';

export interface Incident {
  projectId: string;
  incidentId: string;
  title: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  affectedServices: string[];
  suspectedTrigger?: string;
  startedAt: string;
  updatedAt: string;
  resolvedAt?: string;
}

// ─── AI Report ────────────────────────────────────────────────────────────────

export interface AIReport {
  projectId: string;
  incidentId: string;
  summary: string;
  likelyRootCause: string;
  evidence: string[];
  recommendedActions: string[];
  confidence: number;
  generatedAt: string;
  mode: 'mock' | 'ollama';
}

// ─── Project & API Key ────────────────────────────────────────────────────────

export interface Project {
  projectId: string;
  name: string;
  createdAt: string;
}

export interface ApiKey {
  apiKeyHash: string;
  projectId: string;
  createdAt: string;
  lastUsedAt?: string;
}

// ─── API Payloads ─────────────────────────────────────────────────────────────

export interface IngestLogPayload {
  service: string;
  level: LogLevel;
  message: string;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

export interface IngestLogBatchPayload {
  events: IngestLogPayload[];
}

export interface IngestDeploymentPayload {
  service: string;
  version: string;
  status: DeploymentStatus;
  timestamp?: string;
  metadata?: Record<string, unknown>;
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiSuccessResponse<T = void> {
  success: true;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  details?: unknown;
}

export type ApiResponse<T = void> = ApiSuccessResponse<T> | ApiErrorResponse;
