import { useState, useEffect, useRef } from 'react';
import { ExecutionState, AgentTaskType } from '../types/index';
import {
  generateLogLines,
  formatDuration,
  getTaskDisplayName,
  simulateTaskCompletion,
} from '../utils/helpers';
import '../styles/AgentExecutionPanel.css';

interface AgentExecutionPanelProps {
  repoName: string;
  taskType: AgentTaskType;
  onClose: () => void;
  onRetry?: () => void;
}

export const AgentExecutionPanel: React.FC<AgentExecutionPanelProps> = ({
  repoName,
  taskType,
  onClose,
  onRetry,
}) => {
  const [state, setState] = useState<ExecutionState>({
    taskId: `task-${Date.now()}`,
    repoId: 'current-repo',
    taskType,
    status: 'pending',
    startTime: new Date(),
    currentStep: 0,
    totalSteps: 6,
    logs: [],
  });

  const [showDetails, setShowDetails] = useState(false);
  const [pauseLogs, setPauseLogs] = useState(false);
  const logsRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (state.status === 'running' && !pauseLogs) {
      const allLogs = generateLogLines(taskType);

      intervalRef.current = setInterval(() => {
        setState((prevState) => {
          const newLogs = [...prevState.logs];
          let newStep = prevState.currentStep;

          if (prevState.currentStep < allLogs.length) {
            const nextLog = allLogs[prevState.currentStep];
            newLogs.push({
              ...nextLog,
              status: 'done',
            });
            newStep = prevState.currentStep + 1;
          }

          const isComplete = newStep >= allLogs.length;
          let newStatus = prevState.status;

          if (isComplete) {
            // Simulate 20% chance of failure
            const shouldFail = Math.random() < 0.2;
            const result = simulateTaskCompletion(taskType, shouldFail);

            newStatus = result.status;
            newLogs.push({
              id: `log-final-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString(),
              message: shouldFail
                ? `ERROR: ${result.message}`
                : `SUCCESS: ${result.message}`,
              status: shouldFail ? 'failed' : 'done',
            });

            if (intervalRef.current) {
              clearInterval(intervalRef.current);
            }

            return {
              ...prevState,
              status: newStatus,
              logs: newLogs,
              currentStep: newStep,
              endTime: new Date(),
              successMessage: !shouldFail ? result.message : undefined,
              errorMessage: shouldFail ? result.message : undefined,
              pullRequestUrl: !shouldFail ? result.pullRequestUrl : undefined,
            };
          }

          return {
            ...prevState,
            logs: newLogs,
            currentStep: newStep,
            status: 'running',
          };
        });
      }, 1500);
    }

    if (state.status === 'pending') {
      const startDelay = setTimeout(() => {
        setState((prev) => ({
          ...prev,
          status: 'running',
        }));
      }, 300);

      return () => clearTimeout(startDelay);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [taskType, pauseLogs, state.status]);

  useEffect(() => {
    logsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [state.logs]);

  const progress = Math.min(
    (state.currentStep / state.totalSteps) * 100,
    100
  );
  const duration =
    state.endTime &&
    formatDuration(state.startTime, state.endTime);

  const getStatusBadge = () => {
    switch (state.status) {
      case 'pending':
        return <span className="status-badge pending">⏳ PENDING</span>;
      case 'running':
        return <span className="status-badge running">⏳ RUNNING</span>;
      case 'success':
        return <span className="status-badge success">✅ SUCCESS</span>;
      case 'failure':
        return <span className="status-badge failure">❌ FAILED</span>;
      default:
        return null;
    }
  };

  return (
    <div className="execution-panel-overlay">
      <div className="execution-panel">
        <div className="execution-panel-header">
          <h2>🤖 Agent Task Execution</h2>
        </div>

        <div className="execution-info">
          <div className="info-row">
            <span className="info-label">Task:</span>
            <span className="info-value">{getTaskDisplayName(taskType)}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Repository:</span>
            <span className="info-value">{repoName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">
              {state.status === 'running' ? 'Started' : 'Duration'}:
            </span>
            <span className="info-value">
              {state.status === 'running'
                ? new Date().toLocaleTimeString()
                : duration}
            </span>
          </div>
        </div>

        <div className="execution-status-section">
          <div className="status-row">
            {getStatusBadge()}
            <span className="steps-indicator">
              ({state.currentStep}/{state.totalSteps} steps complete)
            </span>
          </div>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="progress-percentage">{Math.round(progress)}%</span>
        </div>

        <div className="logs-section">
          <div className="logs-header">
            <h3>📋 Live Logs</h3>
            <button
              className="details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? '▲ Hide Details' : '▼ Show Details'}
            </button>
          </div>

          <div className="logs-container">
            {state.logs.length === 0 ? (
              <div className="logs-empty">
                <p>Initializing task execution...</p>
              </div>
            ) : (
              <>
                {state.logs.map((log) => (
                  <div key={log.id} className={`log-line log-${log.status}`}>
                    <span className="log-indicator">
                      {log.status === 'done' && '✓'}
                      {log.status === 'running' && '⟳'}
                      {log.status === 'pending' && '○'}
                      {log.status === 'failed' && '✗'}
                    </span>
                    <span className="log-timestamp">{log.timestamp}</span>
                    <span className="log-message">— {log.message}</span>
                  </div>
                ))}
                <div ref={logsRef} />
              </>
            )}
          </div>

          {showDetails && state.logs.length > 0 && (
            <div className="logs-details">
              <div className="details-content">
                <strong>Full Execution Log</strong>
                <pre>
                  {state.logs.map((log) => `[${log.timestamp}] ${log.message}`).join('\n')}
                </pre>
              </div>
            </div>
          )}
        </div>

        <div className="execution-controls">
          {state.status === 'running' && (
            <>
              <button className="control-btn cancel-btn" onClick={onClose}>
                Cancel Task
              </button>
              <button className="control-btn pause-btn" onClick={() => setPauseLogs(!pauseLogs)}>
                {pauseLogs ? '▶ Resume Logs' : '⏸ Pause Logs'}
              </button>
            </>
          )}

          {state.status === 'success' && (
            <>
              <button className="control-btn close-btn" onClick={onClose}>
                Close
              </button>
              <button className="control-btn primary-btn" onClick={onRetry}>
                Run New Task
              </button>
            </>
          )}

          {state.status === 'failure' && (
            <>
              <button className="control-btn close-btn" onClick={onClose}>
                Close
              </button>
              <button className="control-btn retry-btn" onClick={onRetry}>
                Retry Task
              </button>
            </>
          )}
        </div>

        {state.status === 'success' && state.successMessage && (
          <div className="result-section success">
            <h3>📊 Results</h3>
            <p>{state.successMessage}</p>
            {state.pullRequestUrl && (
              <a
                href={state.pullRequestUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                → View Pull Request
              </a>
            )}
          </div>
        )}

        {state.status === 'failure' && state.errorMessage && (
          <div className="result-section failure">
            <h3>⚠️ Error Details</h3>
            <p>{state.errorMessage}</p>
            <div className="suggested-actions">
              <strong>Suggested Actions:</strong>
              <ul>
                <li>Review error logs above for more context</li>
                <li>Check recent changes to the repository</li>
                <li>Try again with different task parameters</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
