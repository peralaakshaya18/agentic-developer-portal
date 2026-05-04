# AI Developer Portal

A UI prototype for running AI-powered tasks on your repositories. Pick a repo, trigger an agent task (refactoring, testing, dependency updates), and watch it execute in real-time with live logs.

## What's Inside

- **Repository Browser** - Search and filter your repos, see health status at a glance
- **Repository Overview** - View metrics (PRs, issues, tests, coverage) and recent activity
- **Task Execution** - Real-time streaming logs, progress bar, step-by-step visibility
- **Success/Failure States** - View results, links to PRs, or retry on errors

## Getting Started

### Prerequisites
- Node.js 14+ installed

### Installation

```bash
npm install
```

### Run It

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app reloads when you make changes.

## Project Structure

```
src/
  components/       # React components (RepoList, RepoOverview, AgentExecutionPanel)
  types/           # TypeScript interfaces
  data/            # Mock data and templates
  utils/           # Helper functions (log generation, formatting, etc)
  styles/          # CSS files for each component
  App.tsx          # Main app component (handles navigation)
  index.tsx        # React entry point
```

## Features

- **Live Log Streaming** - Simulated logs arriving in ~1.5 second intervals
- **Task Simulation** - Mock execution with realistic outputs, 20% failure rate for realism
- **Progress Tracking** - Visual progress bar with step counter
- **Pause/Resume** - Pause logs if they're scrolling too fast
- **Control Buttons** - Cancel task, pause logs, retry on failure

## Mock Data

Everything is mocked:
- 6 sample repositories
- 5 task types (refactoring, test runs, scans, etc)
- Realistic log messages per task type
- Generated success/failure results

## Customization

Want to change something? Here's where to look:

- **Add/modify repos** - Edit `src/data/mockData.ts`
- **Change task types** - Update `AgentTaskType` in `src/types/index.ts`
- **Adjust log messages** - Modify `MOCK_LOG_TEMPLATES` in mockData
- **Update styling** - Edit CSS files in `src/styles/`

## Available Scripts

```bash
npm start      # Run dev server
npm run build  # Create production build
npm test       # Run tests
```




