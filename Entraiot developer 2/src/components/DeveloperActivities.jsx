import React, { useState, useEffect } from 'react';
import { 
  GitBranch, 
  GitPullRequest, 
  Play, 
  Activity, 
  Settings, 
  Database, 
  ShieldCheck, 
  Users, 
  Flame, 
  Terminal, 
  Code2, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Cpu
} from 'lucide-react';

export default function DeveloperActivities({ addLog }) {
  const [activeStage, setActiveStage] = useState('coding');
  
  // Interactive Simulator States
  const [locCount, setLocCount] = useState(1450);
  const [prsReviewed, setPrsReviewed] = useState(12);
  const [bugsSquashed, setBugsSquashed] = useState(24);
  const [deploysCount, setDeploysCount] = useState(6);
  
  // Console log simulator state
  const [simLogs, setSimLogs] = useState([
    { id: 1, type: 'info', msg: 'System initialized. Ready for operations.' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);
  const [simName, setSimName] = useState('');

  const appendSimLog = (msg, type = 'info') => {
    setSimLogs(prev => [
      { id: Date.now() + Math.random(), type, msg: `[SIMULATOR] ${msg}` },
      ...prev.slice(0, 15)
    ]);
  };

  const runSimulation = (name, steps, onComplete) => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimName(name);
    setSimulationProgress(0);
    appendSimLog(`Starting simulation: ${name}...`, 'info');

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        appendSimLog(step.message, step.type || 'info');
        setSimulationProgress(Math.round(((currentStep + 1) / steps.length) * 100));
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);
        setSimulationProgress(100);
        appendSimLog(`Simulation ${name} completed successfully!`, 'success');
        if (onComplete) onComplete();
      }
    }, 900);
  };

  // Git Commit Simulation
  const handleGitCommit = () => {
    const steps = [
      { message: 'Staging files: git add src/components/*', type: 'info' },
      { message: 'Committed: git commit -m "feat: login schema integration v1.2"', type: 'info' },
      { message: 'Running pre-commit hooks & ESLint rules validation...', type: 'info' },
      { message: 'ESLint check: 0 errors, 2 warnings (resolved)', type: 'success' },
      { message: 'Pushing code to branch: origin/feature/auth-schema', type: 'info' },
      { message: 'GitHub: Branch updated successfully.', type: 'success' }
    ];
    runSimulation('Git Commit & Push', steps, () => {
      setLocCount(prev => prev + Math.floor(Math.random() * 120) + 40);
      addLog('Git Ops', 'Pushed feature branch origin/feature/auth-schema to remote repository', 'success');
    });
  };

  // Run Test Suite Simulation
  const handleRunTests = () => {
    const steps = [
      { message: 'Executing Jest Unit Tests: npm run test', type: 'info' },
      { message: 'PASS: src/__tests__/auth.test.js (12 specs passed)', type: 'success' },
      { message: 'PASS: src/__tests__/db-router.test.js (8 specs passed)', type: 'success' },
      { message: 'FAIL: src/__tests__/telemetry.test.js (1 spec timeout error - retrying)', type: 'warning' },
      { message: 'PASS: src/__tests__/telemetry.test.js (all 5 specs passed after retry)', type: 'success' },
      { message: 'Code Coverage: 92.4% Statements, 89.1% Branches', type: 'info' }
    ];
    runSimulation('Test Runner', steps, () => {
      setBugsSquashed(prev => prev + 1);
      addLog('Testing', 'Full system test suite passed locally with 92.4% coverage', 'info');
    });
  };

  // Deploy Code Simulation
  const handleDeploy = () => {
    const steps = [
      { message: 'Initializing CI/CD Deployment Pipeline on AWS CodePipeline', type: 'info' },
      { message: 'Building production bundle: vite build', type: 'info' },
      { message: 'Generating assets and JavaScript chunks...', type: 'info' },
      { message: 'Deploying Docker Container: entraiot-frontend:latest to ECS Cluster', type: 'info' },
      { message: 'Health checks: Routing traffic 10% -> 50% -> 100%...', type: 'info' },
      { message: 'Deployment complete! Production environments synced.', type: 'success' }
    ];
    runSimulation('Production Deployment', steps, () => {
      setDeploysCount(prev => prev + 1);
      addLog('DevOps', 'Deployed version 1.2.4 to production cluster successfully', 'success');
    });
  };

  // Review Pull Request Simulation
  const handleReviewPR = () => {
    const steps = [
      { message: 'Fetching pending Pull Requests from GitHub API...', type: 'info' },
      { message: 'PR #418: "refactor: optimize DB vacuum indexing" by Alice BE', type: 'info' },
      { message: 'Analyzing diff files: +180 lines, -45 lines', type: 'info' },
      { message: 'Suggesting fix: Replace query mapping with bulk insert for better speed', type: 'warning' },
      { message: 'PR approved and successfully merged into main branch!', type: 'success' }
    ];
    runSimulation('Code Review PR', steps, () => {
      setPrsReviewed(prev => prev + 1);
      addLog('Collaboration', 'Approved & merged PR #418: "refactor: optimize DB vacuum indexing"', 'info');
    });
  };

  // Developer activities content
  const workflowStages = {
    planning: {
      title: 'Sprint Planning & System Design',
      icon: Users,
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10',
      description: 'Aligning business priorities with engineering tasks. Developers participate in Scrum standups, estimate ticket complexity, design database models, and write technical specifications.',
      tools: ['Jira / Linear', 'Confluence', 'Figma', 'Mermaid Diagrams'],
      metrics: ['Sprint Velocity (pts)', 'Ticket Completion Rate', 'Architecture Review Approval'],
      companyImpact: 'Ensures developers build the correct features with scalable architecture, minimizing technical debt.'
    },
    coding: {
      title: 'Feature Coding & UI Implementation',
      icon: Code2,
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10',
      description: 'Writing robust, clean, and modular front-end and back-end logic. Standard actions involve implementing page routes, design-system tokens, dynamic React states, and server components.',
      tools: ['VS Code / NeoVim', 'Git / GitHub', 'ESLint / Prettier', 'Vite / Webpack'],
      metrics: ['Lines of Code (LOC)', 'Commits Per Feature', 'Linting Score'],
      companyImpact: 'Directly crafts the user interface and functionality that clients interact with.'
    },
    testing: {
      title: 'Testing & Quality Assurance',
      icon: Play,
      color: 'text-brand-emerald',
      bg: 'bg-brand-emerald/10',
      description: 'Writing test suites (unit, integration, and E2E tests) to catch regression bugs. A developer’s goal is to guarantee software works reliably under different network and environment loads.',
      tools: ['Jest / Vitest', 'Cypress / Playwright', 'React Testing Library', 'SonarQube'],
      metrics: ['Test Coverage %', 'Failed Spec Resolution Time', 'Bug Escape Rate'],
      companyImpact: 'Maintains code quality, prevents software crashes in production, and builds customer trust.'
    },
    review: {
      title: 'Peer Review & PR Collaboration',
      icon: GitPullRequest,
      color: 'text-brand-cyan',
      bg: 'bg-brand-cyan/10',
      description: 'Reviewing other team members’ pull requests (PRs) before code merges to production. Developers discuss optimizations, verify styles, check corner cases, and share core domain knowledge.',
      tools: ['GitHub Pull Requests', 'GitLab Merge Requests', 'ReviewNB'],
      metrics: ['Average PR Approval Time', 'Comments Resolved', 'PR Refactor Ratio'],
      companyImpact: 'Spreads system understanding across the engineering team, reducing single-developer dependencies.'
    },
    deploy: {
      title: 'CI/CD & DevOps Deployments',
      icon: Cpu,
      color: 'text-brand-purple',
      bg: 'bg-brand-purple/10',
      description: 'Automating the software release process. Developers configure build systems, write GitHub Action pipelines, build Docker container images, and publish packages to environments.',
      tools: ['GitHub Actions', 'Docker', 'AWS ECS / Kubernetes', 'Vercel / AWS Amplify'],
      metrics: ['Deployment Frequency', 'Change Failure Rate', 'Build Execution Time'],
      companyImpact: 'Allows safe, continuous feature delivery with automated verification guards.'
    },
    monitor: {
      title: 'Live Monitoring & Debugging',
      icon: Activity,
      color: 'text-brand-rose',
      bg: 'bg-brand-rose/10',
      description: 'Observing server telemetry logs, CPU metrics, query performance, and exception traces. When a failure occurs, the developer investigates logs to diagnose and squash bugs.',
      tools: ['Sentry / LogRocket', 'Datadog / Grafana', 'AWS CloudWatch', 'Chrome DevTools'],
      metrics: ['Mean Time to Detect (MTTD)', 'Mean Time to Resolve (MTTR)', 'Error Rate (%)'],
      companyImpact: 'Guarantees the high availability, speed, and overall security status of the software infrastructure.'
    }
  };

  const selectedStage = workflowStages[activeStage];
  const StageIcon = selectedStage.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Developer Workflow & Activities</h1>
          <p className="text-gray-400 text-sm mt-1">Explore, understand, and simulate what developers actually do in software companies.</p>
        </div>
      </div>

      {/* Top Counters Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-gray-700/80 transition-colors">
          <span className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold">Lines of Code (LOC)</span>
          <span className="text-2xl font-bold text-white font-mono mt-1">{locCount}</span>
          <span className="text-[10px] text-brand-cyan mt-1">+165 LOC today</span>
        </div>
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-gray-700/80 transition-colors">
          <span className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold">PRs Reviewed & Merged</span>
          <span className="text-2xl font-bold text-white font-mono mt-1">{prsReviewed}</span>
          <span className="text-[10px] text-brand-purple mt-1">Target: 10 per sprint</span>
        </div>
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-gray-700/80 transition-colors">
          <span className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold">Bugs Squashed</span>
          <span className="text-2xl font-bold text-white font-mono mt-1">{bugsSquashed}</span>
          <span className="text-[10px] text-brand-emerald mt-1">92.4% SLA adherence</span>
        </div>
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-4 flex flex-col justify-between hover:border-gray-700/80 transition-colors">
          <span className="text-[10px] uppercase text-gray-500 tracking-wider font-semibold">Pipelines Triggered</span>
          <span className="text-2xl font-bold text-white font-mono mt-1">{deploysCount}</span>
          <span className="text-[10px] text-brand-amber mt-1">Staging/Production env</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Stages Selector & Content */}
        <div className="lg:col-span-7 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 pb-3 border-b border-gray-900">
              <Code2 size={16} className="text-brand-cyan" /> Core Engineering Lifecycle
            </h2>
            
            {/* Horizontal stage selector tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
              {Object.keys(workflowStages).map((stageKey) => {
                const stage = workflowStages[stageKey];
                const Icon = stage.icon;
                const isActive = activeStage === stageKey;
                return (
                  <button
                    key={stageKey}
                    onClick={() => setActiveStage(stageKey)}
                    className={`flex flex-col items-center justify-center p-2 rounded-xl border text-center transition-all ${
                      isActive 
                        ? 'bg-gray-900 border-gray-800 text-white shadow-inner scale-95' 
                        : 'bg-gray-950 border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${isActive ? stage.color : 'text-gray-600'}`} />
                    <span className="text-[8px] font-semibold tracking-tight uppercase truncate w-full">{stageKey}</span>
                  </button>
                );
              })}
            </div>

            {/* Selected Stage Content Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 rounded-xl ${selectedStage.bg} ${selectedStage.color}`}>
                  <StageIcon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{selectedStage.title}</h3>
                  <span className="text-[10px] text-gray-500 font-mono">Stage: {activeStage.toUpperCase()}</span>
                </div>
              </div>

              <p className="text-xs text-gray-300 leading-relaxed">
                {selectedStage.description}
              </p>

              {/* Tools & Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-gray-900/40 border border-gray-900 p-3 rounded-xl">
                  <span className="text-[9px] uppercase text-gray-500 font-bold tracking-wider block mb-1.5">Industry Standard Tools</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStage.tools.map((tool, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-950 border border-gray-850 px-2 py-0.5 rounded text-gray-300 font-mono">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-900/40 border border-gray-900 p-3 rounded-xl">
                  <span className="text-[9px] uppercase text-gray-500 font-bold tracking-wider block mb-1.5">Key Performance Metrics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedStage.metrics.map((metric, idx) => (
                      <span key={idx} className="text-[10px] bg-gray-950 border border-gray-850 px-2 py-0.5 rounded text-brand-cyan">
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Company Impact Box */}
              <div className="bg-brand-purple/5 border border-brand-purple/15 p-3 rounded-xl text-xs">
                <strong className="text-brand-purple font-semibold">Value to Tech Companies:</strong>
                <p className="text-gray-400 mt-1">{selectedStage.companyImpact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Sandbox & Execution Console */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Interactive Sandbox Commands */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
              <Settings size={16} className="text-brand-cyan" /> Interactive Developer Simulator
            </h2>

            <p className="text-[11px] text-gray-400">
              Trigger developer command simulations to witness the build & deployment operations.
            </p>

            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={handleGitCommit}
                disabled={isSimulating}
                className="py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 text-left hover:border-brand-cyan hover:bg-gray-900/60 transition-all flex flex-col justify-between disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full">
                  <GitBranch size={16} className="text-brand-cyan" />
                  <ArrowRight size={10} className="text-gray-500" />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-white block">Git Push</span>
                  <span className="text-[8px] text-gray-500">Push changes & hooks</span>
                </div>
              </button>

              <button 
                onClick={handleRunTests}
                disabled={isSimulating}
                className="py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 text-left hover:border-brand-emerald hover:bg-gray-900/60 transition-all flex flex-col justify-between disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full">
                  <Play size={16} className="text-brand-emerald" />
                  <ArrowRight size={10} className="text-gray-500" />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-white block">Run Tests</span>
                  <span className="text-[8px] text-gray-500">Run code specs & coverage</span>
                </div>
              </button>

              <button 
                onClick={handleDeploy}
                disabled={isSimulating}
                className="py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 text-left hover:border-brand-purple hover:bg-gray-900/60 transition-all flex flex-col justify-between disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full">
                  <Cpu size={16} className="text-brand-purple" />
                  <ArrowRight size={10} className="text-gray-500" />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-white block">Deploy App</span>
                  <span className="text-[8px] text-gray-500">Trigger production build</span>
                </div>
              </button>

              <button 
                onClick={handleReviewPR}
                disabled={isSimulating}
                className="py-2.5 px-3 rounded-xl bg-gray-900 border border-gray-800 text-left hover:border-brand-cyan hover:bg-gray-900/60 transition-all flex flex-col justify-between disabled:opacity-50"
              >
                <div className="flex items-center justify-between w-full">
                  <GitPullRequest size={16} className="text-brand-cyan" />
                  <ArrowRight size={10} className="text-gray-500" />
                </div>
                <div className="mt-3">
                  <span className="text-[10px] font-bold text-white block">Review PR</span>
                  <span className="text-[8px] text-gray-500">Approve pending PRs</span>
                </div>
              </button>
            </div>
          </div>

          {/* Activity Console Output */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex-1 flex flex-col justify-between min-h-[220px]">
            <div>
              <div className="flex justify-between items-center border-b border-gray-900 pb-3">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
                  <Terminal size={14} className="text-brand-purple" /> Command Sandbox Console
                </h2>
                {isSimulating && (
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-brand-purple">{simulationProgress}%</span>
                    <RefreshCw size={12} className="animate-spin text-brand-purple" />
                  </div>
                )}
              </div>

              {/* Console logs */}
              <div className="mt-3 font-mono text-[10px] text-gray-400 space-y-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                {simLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-1">
                    <span className="text-gray-600 flex-shrink-0">&gt;</span>
                    <span className={
                      log.type === 'success' ? 'text-brand-emerald' : 
                      log.type === 'warning' ? 'text-brand-amber' : 
                      log.type === 'error' ? 'text-brand-rose' : 'text-gray-300'
                    }>
                      {log.msg}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[9px] text-gray-600 pt-2 border-t border-gray-900 flex justify-between">
              <span>{isSimulating ? `Active job: ${simName}` : 'Console Ready'}</span>
              <span>Standard Dev Shell</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
