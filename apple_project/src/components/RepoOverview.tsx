import { useState } from 'react';
import { Repository, AgentTaskType } from '../types/index';
import { AGENT_TASKS } from '../data/mockData';
import '../styles/RepoOverview.css';

interface RepoOverviewProps {
  repository: Repository;
  onBackToList: () => void;
  onRunTask: (taskType: AgentTaskType) => void;
  isLoading?: boolean;
}

export const RepoOverview: React.FC<RepoOverviewProps> = ({
  repository,
  onBackToList,
  onRunTask,
  isLoading = false,
}) => {
  const [selectedTask, setSelectedTask] = useState<AgentTaskType | null>(null);

  const handleRunTask = () => {
    if (selectedTask) {
      onRunTask(selectedTask);
    }
  };

  return (
    <div className="repo-overview-container">
      <div className="repo-overview-header">
        <button className="back-button" onClick={onBackToList}>
          ← Back to Repos
        </button>
      </div>

      <div className="repo-overview-content">
        <div className="repo-title-section">
          <h1>📦 {repository.name}</h1>
          <p className="repo-overview-desc">{repository.description}</p>
        </div>

        <div className="repo-meta-bar">
          <span>Primary Branch: <strong>{repository.branch}</strong></span>
          <span>Language: <strong>{repository.language}</strong></span>
          <span>Size: <strong>{repository.size}</strong></span>
        </div>

        <div className="insights-section">
          <h2>📊 Quick Insights</h2>
          <div className="insights-grid">
            <div className="insight-card">
              <span className="insight-label">Pull Requests</span>
              <span className="insight-value">{repository.pullRequests}</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Issues</span>
              <span className="insight-value">{repository.issues}</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Tests Passing</span>
              <span className="insight-value">{repository.testsPassing}%</span>
            </div>
            <div className="insight-card">
              <span className="insight-label">Coverage</span>
              <span className="insight-value">{repository.testsCoverage}%</span>
            </div>
          </div>
        </div>

        <div className="activity-section">
          <h2>📝 Recent Activity</h2>
          <ul className="activity-list">
            <li>• Merged: Fix: data validation edge case (2h ago)</li>
            <li>• Opened: Optimize pipeline logging (4h ago)</li>
            <li>• Closed: Support for async operations (1d ago)</li>
          </ul>
        </div>

        <div className="task-selection-section">
          <h2>🤖 Trigger Agent Task</h2>
          <div className="task-selection-card">
            <label htmlFor="task-select">Select an action:</label>
            <select
              id="task-select"
              className="task-select"
              value={selectedTask || ''}
              onChange={(e) => setSelectedTask(e.target.value as AgentTaskType)}
            >
              <option value="">-- Choose a task --</option>
              {AGENT_TASKS.map((task) => (
                <option key={task.id} value={task.type}>
                  {task.name}
                </option>
              ))}
            </select>

            {selectedTask && (
              <div className="task-description">
                <p>
                  {AGENT_TASKS.find((t) => t.type === selectedTask)?.description}
                </p>
              </div>
            )}

            <button
              className="run-task-button"
              onClick={handleRunTask}
              disabled={!selectedTask || isLoading}
            >
              {isLoading ? 'Launching...' : 'Run Agent Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
