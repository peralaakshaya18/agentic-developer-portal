import { useState, useMemo } from 'react';
import { Repository } from '../types/index';
import { getStatusColor, getStatusText } from '../utils/helpers';
import '../styles/RepoList.css';

interface RepoListProps {
  repositories: Repository[];
  onSelectRepo: (repo: Repository) => void;
  selectedRepoId?: string;
}

export const RepoList: React.FC<RepoListProps> = ({
  repositories,
  onSelectRepo,
  selectedRepoId,
}) => {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'starred'>('all');

  const filteredRepos = useMemo(() => {
    let result = repositories;

    if (query) {
      const term = query.toLowerCase();
      result = result.filter(
        (repo) =>
          repo.name.toLowerCase().includes(term) ||
          repo.description.toLowerCase().includes(term)
      );
    }

    if (filterType === 'starred') {
      result = result.filter((repo) => repo.stars > 500);
    }

    return result;
  }, [repositories, query, filterType]);

  return (
    <div className="repo-list-container">
      <div className="repo-list-header">
        <div>
          <h2>📚 Your Repositories</h2>
        </div>
      </div>

      <div className="repo-list-controls">
        <input
          type="text"
          placeholder="🔍 Search repositories..."
          className="repo-search-input"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="repo-filters">
          <button
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filterType === 'starred' ? 'active' : ''}`}
            onClick={() => setFilterType('starred')}
          >
            My Starred
          </button>
        </div>
      </div>

      <div className="repo-list">
        {filteredRepos.length > 0 ? (
          filteredRepos.map((repo) => (
            <div
              key={repo.id}
              className={`repo-card ${selectedRepoId === repo.id ? 'selected' : ''}`}
              onClick={() => onSelectRepo(repo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onSelectRepo(repo);
                }
              }}
            >
              <div className="repo-card-header">
                <div className="repo-name-section">
                  <h3>{repo.name}</h3>
                  <span
                    className="repo-status-dot"
                    style={{ backgroundColor: getStatusColor(repo.status) }}
                    title={`Status: ${getStatusText(repo.status)}`}
                  ></span>
                  <span className="repo-status-text">{getStatusText(repo.status)}</span>
                </div>
                <span className="repo-last-commit">{repo.lastCommit}</span>
              </div>

              <p className="repo-description">{repo.description}</p>

              <div className="repo-card-footer">
                <div className="repo-metric">
                  <span className="metric-label">⭐ Stars</span>
                  <span className="metric-value">{repo.stars}</span>
                </div>
                <div className="repo-metric">
                  <span className="metric-label">🔗 Forks</span>
                  <span className="metric-value">{repo.forks}</span>
                </div>
                <div className="repo-metric">
                  <span className="metric-label">📋 Issues</span>
                  <span className="metric-value">{repo.issues}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No repositories found. Try adjusting your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
