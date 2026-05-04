import { LogLine, AgentTaskType } from '../types/index';
import { MOCK_LOG_TEMPLATES } from '../data/mockData';

export const generateLogLines = (taskType: AgentTaskType): LogLine[] => {
  const templates = MOCK_LOG_TEMPLATES[taskType] || MOCK_LOG_TEMPLATES.refactor;
  const now = new Date();

  return templates.map((message, index) => ({
    id: `log-${index}`,
    timestamp: new Date(now.getTime() + index * 2000).toLocaleTimeString(),
    message,
    status: 'pending' as const,
  }));
};

export const formatDuration = (startTime: Date, endTime: Date): string => {
  const durationMs = endTime.getTime() - startTime.getTime();
  const seconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(seconds / 60);

  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }
  return `${seconds}s`;
};

export const getTaskDisplayName = (taskType: AgentTaskType): string => {
  const names: Record<AgentTaskType, string> = {
    refactor: 'Code Refactoring',
    'test-run': 'Run Test Suite',
    'dependency-scan': 'Scan Dependencies',
    'dependency-upgrade': 'Upgrade Dependencies',
    documentation: 'Generate Documentation PR',
  };
  return names[taskType];
};

export const simulateTaskCompletion = (
  taskType: AgentTaskType,
  isFailure: boolean = false
): {
  status: 'success' | 'failure';
  message: string;
  pullRequestUrl?: string;
} => {
  if (isFailure) {
    const failures: Record<AgentTaskType, string> = {
      refactor: 'Code analysis encountered unexpected syntax patterns',
      'test-run': 'Test environment setup failed due to missing dependencies',
      'dependency-scan': '3 critical vulnerabilities found in dependencies',
      'dependency-upgrade':
        'Dependency conflict: lxml v4.9.0 incompatible with SQLAlchemy v1.4.x',
      documentation: 'Failed to parse API signatures from source code',
    };
    return {
      status: 'failure',
      message: failures[taskType],
    };
  }

  const successes: Record<
    AgentTaskType,
    { message: string; prUrl?: string }
  > = {
    refactor: {
      message: 'Successfully generated 12 refactored functions with 34 lines improved',
      prUrl: 'https://github.com/example/ml-pipeline-ops/pull/487',
    },
    'test-run': {
      message: 'All tests passed! 87% code coverage, 342/394 tests passing',
    },
    'dependency-scan': {
      message: '156 dependencies scanned, 2 vulnerabilities found, 3 updates available',
    },
    'dependency-upgrade': {
      message: '18 dependencies updated to latest compatible versions',
      prUrl: 'https://github.com/example/fastapi-boilerplate/pull/245',
    },
    documentation: {
      message: 'Documentation generated with 45 function signatures and 12 usage examples',
      prUrl: 'https://github.com/example/graphql-microservices/pull/156',
    },
  };

  const result = successes[taskType];
  return {
    status: 'success',
    message: result.message,
    pullRequestUrl: result.prUrl,
  };
};

export const getStatusColor = (
  status: 'green' | 'yellow' | 'red'
): string => {
  const colors: Record<'green' | 'yellow' | 'red', string> = {
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
  };
  return colors[status];
};

export const getStatusText = (status: 'green' | 'yellow' | 'red'): string => {
  const texts: Record<'green' | 'yellow' | 'red', string> = {
    green: 'Healthy',
    yellow: 'Needs attention',
    red: 'Inactive',
  };
  return texts[status];
};
