import { useState } from 'react';
import { Repository, AgentTaskType } from './types/index';
import { MOCK_REPOSITORIES } from './data/mockData';
import { RepoList } from './components/RepoList';
import { RepoOverview } from './components/RepoOverview';
import { AgentExecutionPanel } from './components/AgentExecutionPanel';
import './styles/App.css';

type AppScreen = 'repo-list' | 'repo-overview' | 'execution';

function App() {
  const [screen, setScreen] = useState<AppScreen>('repo-list');
  const [repo, setRepo] = useState<Repository | null>(null);
  const [taskType, setTaskType] = useState<AgentTaskType | null>(null);

  const handleSelectRepo = (selected: Repository) => {
    setRepo(selected);
    setScreen('repo-overview');
  };

  const handleRunTask = (task: AgentTaskType) => {
    setTaskType(task);
    setScreen('execution');
  };

  const handleBackToList = () => {
    setScreen('repo-list');
    setRepo(null);
  };

  const handleExecutionClose = () => {
    setScreen('repo-overview');
    setTaskType(null);
  };

  const handleRetryTask = () => {
    if (taskType) {
      setScreen('execution');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <h1>🚀 AI Agent Developer Portal</h1>
        </div>
        <div className="app-settings">
          <button className="settings-btn">⚙️ Settings</button>
        </div>
      </header>

      <main className="app-main">
        {screen === 'repo-list' && (
          <RepoList
            repositories={MOCK_REPOSITORIES}
            onSelectRepo={handleSelectRepo}
            selectedRepoId={repo?.id}
          />
        )}

        {screen === 'repo-overview' && repo && (
          <RepoOverview
            repository={repo}
            onBackToList={handleBackToList}
            onRunTask={handleRunTask}
          />
        )}

        {screen === 'execution' && repo && taskType && (
          <AgentExecutionPanel
            repoName={repo.name}
            taskType={taskType}
            onClose={handleExecutionClose}
            onRetry={handleRetryTask}
          />
        )}
      </main>
    </div>
  );
}

export default App;
