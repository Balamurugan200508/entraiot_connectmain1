import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Database, 
  HardDrive, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  Play, 
  Settings, 
  Check, 
  FileText, 
  Activity,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

export default function MetricsSummary({ systemStatus, addLog, onBack }) {
  // Simulator configurations
  const [latencySlider, setLatencySlider] = useState(systemStatus.latency);
  const [simulating, setSimulating] = useState(false);
  const [simulationLogs, setSimulationLogs] = useState([
    { time: '12:00:00', message: 'Metrics console initialized.', type: 'info' }
  ]);
  const [progress, setProgress] = useState(0);

  // Custom targets
  const [targets, setTargets] = useState({
    apiUptime: 99.9,
    latency: 150,
    dbPerf: 95.0,
  });

  const [metricsData, setMetricsData] = useState({
    apiUptime: { val: '99.98%', trend: '+0.02%', desc: 'Target: >99.9%', status: 'optimal' },
    dbPerf: { val: '98.5%', trend: '+1.2%', desc: 'Query execution rate', status: 'optimal' },
    backupSuccess: { val: '100%', trend: 'Stable', desc: 'Daily snapshot schedule', status: 'optimal' },
    securityComp: { val: '100%', trend: 'Secured', desc: 'Zero unpatched issues', status: 'optimal' },
    bugResolution: { val: '92.4%', trend: '+4.1%', desc: 'SLA response efficiency', status: 'warning' },
  });

  // Action methods
  const runSimulatedTask = (taskName, onComplete) => {
    if (simulating) return;
    setSimulating(true);
    setProgress(10);
    
    const time = new Date().toLocaleTimeString();
    setSimulationLogs(prev => [
      { time, message: `Starting task: ${taskName}...`, type: 'info' },
      ...prev
    ]);

    let currentProgress = 10;
    const interval = setInterval(() => {
      currentProgress += 30;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setSimulating(false);
          setProgress(0);
          const endTime = new Date().toLocaleTimeString();
          setSimulationLogs(prev => [
            { endTime, message: `Completed task: ${taskName} successfully.`, type: 'success' },
            ...prev
          ]);
          if (onComplete) onComplete();
        }, 400);
      } else {
        setProgress(currentProgress);
      }
    }, 300);
  };

  const handleRunHealthAudit = () => {
    runSimulatedTask('API Route Gateway & Load Balancer Audit', () => {
      setMetricsData(prev => ({
        ...prev,
        apiUptime: { ...prev.apiUptime, val: '99.99%', trend: '+0.01%' }
      }));
      addLog('Metrics Audit', 'API Route Gateway and load balancer health audit passed.', 'success');
    });
  };

  const handleClearCache = () => {
    runSimulatedTask('Global Router CDN Cache Flush', () => {
      addLog('Metrics Cache', 'Router CDN and Edge node caches purged.', 'info');
    });
  };

  const handleOptimizeDb = () => {
    runSimulatedTask('Database Vacuum & Index Rebuilder', () => {
      setMetricsData(prev => ({
        ...prev,
        dbPerf: { ...prev.dbPerf, val: '99.2%', trend: '+0.7%' }
      }));
      addLog('Database Core', 'Database vacuum complete. Inactive indexes rebuilt.', 'success');
    });
  };

  const handleTriggerBackup = () => {
    runSimulatedTask('System Snapshot S3 Backup', () => {
      setMetricsData(prev => ({
        ...prev,
        backupSuccess: { ...prev.backupSuccess, val: '100%', trend: 'Verified' }
      }));
      addLog('Backup Scheduler', 'Production daily database snapshot successfully pushed to S3.', 'success');
    });
  };

  const handleSecurityPatch = () => {
    runSimulatedTask('Deploy Firewall Policy Patches', () => {
      addLog('Security Console', 'Applied latest security headers and firewall IP restrictions.', 'success');
    });
  };

  const handleAssignBugBacklog = () => {
    runSimulatedTask('Auto-distribute SLA Backlog Tasks', () => {
      setMetricsData(prev => ({
        ...prev,
        bugResolution: { ...prev.bugResolution, val: '95.1%', trend: '+2.7%', status: 'optimal' }
      }));
      addLog('Collaboration Hub', 'Unassigned critical bugs auto-distributed to active engineers.', 'success');
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Back navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 rounded-xl bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white m-0 flex items-center gap-2">
              <Activity className="text-brand-cyan" size={22} /> Metrics Summary & Auditing
            </h1>
            <p className="text-gray-400 text-sm mt-1">Deep system analysis, simulated stress tests, and automated performance adjustments.</p>
          </div>
        </div>
        <button 
          onClick={onBack}
          className="text-xs font-mono font-bold text-brand-cyan hover:text-brand-purple transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <ArrowLeft size={12} /> Back to Dashboard
        </button>
      </div>

      {/* Stress Simulator Controls and Targets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workload Simulator */}
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
            <Settings size={16} className="text-brand-cyan" /> Workload Stress Simulator
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Drag the slider to simulate network latency spikes. Real-time monitors will update their alerts based on threshold rules.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-400 font-medium">Simulated Response Time</span>
              <span className={`font-mono font-bold ${latencySlider > targets.latency ? 'text-brand-rose' : 'text-brand-emerald'}`}>
                {latencySlider} ms
              </span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="350" 
              value={latencySlider}
              onChange={(e) => setLatencySlider(Number(e.target.value))}
              className="w-full accent-brand-cyan bg-gray-900 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-500 font-mono">
              <span>50ms (Ideal)</span>
              <span>350ms (Overloaded)</span>
            </div>
          </div>

          {latencySlider > targets.latency && (
            <div className="flex gap-2.5 text-xs bg-brand-rose/5 border border-brand-rose/25 p-3 rounded-xl animate-pulse">
              <AlertTriangle className="w-4 h-4 text-brand-rose flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-brand-rose">Latency Alert!</span>
                <p className="text-gray-400 mt-0.5 text-[11px]">System response time ({latencySlider}ms) has exceeded the threshold of {targets.latency}ms.</p>
              </div>
            </div>
          )}
        </div>

        {/* Target Thresholds */}
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
            <Check className="text-brand-emerald" size={16} /> SLA Threshold Targets
          </h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Customize target metrics. Alerts and flags are computed dynamically relative to these performance values.
          </p>

          <div className="space-y-3 pt-1">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Target Uptime (%)</span>
                <span className="text-white font-mono">{targets.apiUptime}%</span>
              </div>
              <input 
                type="range" min="99.0" max="99.99" step="0.01" 
                value={targets.apiUptime} 
                onChange={(e) => setTargets({...targets, apiUptime: Number(e.target.value)})}
                className="w-full accent-brand-emerald bg-gray-900 h-1 rounded-lg"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Latency Warning (ms)</span>
                <span className="text-white font-mono">{targets.latency}ms</span>
              </div>
              <input 
                type="range" min="100" max="250" step="5" 
                value={targets.latency} 
                onChange={(e) => setTargets({...targets, latency: Number(e.target.value)})}
                className="w-full accent-brand-purple bg-gray-900 h-1 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Live stress testing console */}
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
              <RefreshCw size={16} className={`text-brand-purple ${simulating ? 'animate-spin' : ''}`} /> stress test runner
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Initiate a high-throughput endpoint verification test suite to validate concurrency thresholds.
            </p>
          </div>

          <div className="mt-4 space-y-3">
            {simulating && (
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-gray-400">
                  <span>Testing HTTP concurrency...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-brand-cyan to-brand-purple h-full rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            <button
              onClick={() => runSimulatedTask('Full System Concurrency Stress Test')}
              disabled={simulating}
              className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                simulating
                  ? 'bg-gray-900 border border-gray-800 text-gray-500'
                  : 'bg-brand-purple/20 border border-brand-purple/40 hover:border-brand-purple hover:bg-brand-purple/30 text-white'
              }`}
            >
              <Play size={12} /> Run Concurrency Test Suite
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Metrics Cards */}
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Core Performance Modules</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* API Uptime */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-brand-emerald">
                  {metricsData.apiUptime.trend}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">API Uptime</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{metricsData.apiUptime.val}</span>
                <p className="text-gray-500 text-xs mt-1">{metricsData.apiUptime.desc}</p>
              </div>
            </div>
            <button 
              onClick={handleRunHealthAudit}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Run Route Audit
            </button>
          </div>

          {/* Avg Response Time */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-emerald/10 text-brand-emerald">
                  <Clock className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 ${latencySlider > targets.latency ? 'text-brand-rose' : 'text-brand-emerald'}`}>
                  {latencySlider > targets.latency ? 'Warning' : 'Optimal'}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Avg Response Time</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{latencySlider}ms</span>
                <p className="text-gray-500 text-xs mt-1">Dynamic from workload simulator</p>
              </div>
            </div>
            <button 
              onClick={handleClearCache}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Purge CDN Cache
            </button>
          </div>

          {/* Database Performance */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-purple/10 text-brand-purple">
                  <Database className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-brand-emerald">
                  {metricsData.dbPerf.trend}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Database Performance</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{metricsData.dbPerf.val}</span>
                <p className="text-gray-500 text-xs mt-1">{metricsData.dbPerf.desc}</p>
              </div>
            </div>
            <button 
              onClick={handleOptimizeDb}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Vacuum Indexes
            </button>
          </div>

          {/* Backup Success Rate */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-cyan/10 text-brand-cyan">
                  <HardDrive className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-brand-emerald">
                  {metricsData.backupSuccess.trend}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Backup Success Rate</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{metricsData.backupSuccess.val}</span>
                <p className="text-gray-500 text-xs mt-1">{metricsData.backupSuccess.desc}</p>
              </div>
            </div>
            <button 
              onClick={handleTriggerBackup}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Backup Snapshot
            </button>
          </div>

          {/* Security Compliance */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-rose/10 text-brand-rose">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 text-brand-emerald">
                  {metricsData.securityComp.trend}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Security Compliance</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{metricsData.securityComp.val}</span>
                <p className="text-gray-500 text-xs mt-1">{metricsData.securityComp.desc}</p>
              </div>
            </div>
            <button 
              onClick={handleSecurityPatch}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Deploy Patch
            </button>
          </div>

          {/* Bug Resolution Rate */}
          <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between hover:border-gray-700/80 transition-all duration-300">
            <div>
              <div className="flex justify-between items-start">
                <div className="p-2.5 rounded-xl bg-brand-amber/10 text-brand-amber">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-gray-900 border border-gray-800 ${metricsData.bugResolution.status === 'warning' ? 'text-brand-amber bg-brand-amber/5 border-brand-amber/20' : 'text-brand-emerald'}`}>
                  {metricsData.bugResolution.status.toUpperCase()}
                </span>
              </div>
              <div className="mt-4">
                <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider">Bug Resolution Rate</h4>
                <span className="text-2xl font-bold text-white font-mono mt-1 block">{metricsData.bugResolution.val}</span>
                <p className="text-gray-500 text-xs mt-1">{metricsData.bugResolution.desc}</p>
              </div>
            </div>
            <button 
              onClick={handleAssignBugBacklog}
              disabled={simulating}
              className="mt-5 w-full py-2 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 hover:border-gray-700 text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              Assign Backlog
            </button>
          </div>
        </div>
      </div>

      {/* Simulator logs console output */}
      <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-3">
        <h3 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
          <FileText size={16} className="text-[#06b6d4]" /> Metrics Simulation Terminal
        </h3>

        <div className="bg-[#02050e] border border-gray-900 rounded-xl p-4 font-mono text-xs h-40 overflow-y-auto space-y-2 custom-scrollbar">
          {simulationLogs.map((log, idx) => (
            <div key={idx} className="flex gap-3 leading-relaxed">
              <span className="text-gray-600">[{log.time || log.endTime}]</span>
              <span className={log.type === 'success' ? 'text-brand-emerald' : log.type === 'error' ? 'text-brand-rose' : 'text-brand-cyan'}>
                {log.message}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
