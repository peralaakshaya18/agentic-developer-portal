export interface Repository {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  issues: number;
  size: string;
  branch: string;
  lastCommit: string;
  pullRequests: number;
  testsCoverage: number;
  testsPassing: number;
  status: 'green' | 'yellow' | 'red';
}

export type AgentTaskType =
  | 'refactor'
  | 'test-run'
  | 'dependency-scan'
  | 'dependency-upgrade'
  | 'documentation';

export interface AgentTask {
  id: string;
  type: AgentTaskType;
  name: string;
  description: string;
}

export type ExecutionStatus = 'pending' | 'running' | 'success' | 'failure';

export type LogLineStatus = 'done' | 'running' | 'pending' | 'failed';

export interface LogLine {
  id: string;
  timestamp: string;
  message: string;
  status: LogLineStatus;
}

export interface ExecutionState {
  taskId: string;
  repoId: string;
  taskType: AgentTaskType;
  status: ExecutionStatus;
  startTime: Date;
  endTime?: Date;
  currentStep: number;
  totalSteps: number;
  logs: LogLine[];
  successMessage?: string;
  errorMessage?: string;
  pullRequestUrl?: string;
}
