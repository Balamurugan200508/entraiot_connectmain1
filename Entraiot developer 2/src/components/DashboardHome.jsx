import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  AlertTriangle,
  Zap, 
  Database, 
  Clock,
  RefreshCw
} from 'lucide-react';

export default function DashboardHome({ systemStatus, dailyGoals, setDailyGoals, logs, onTabClick }) {
  const [showChecklist, setShowChecklist] = useState(false);
  const [showVitals, setShowVitals] = useState(false);

  const successMetrics = [
    { name: 'API Uptime', value: '99.98%', desc: 'Target: >99.9%', trend: '+0.02%', status: 'optimal', icon: Zap, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
    { name: 'Avg Response Time', value: `${systemStatus.latency}ms`, desc: 'Target: <150ms', trend: '-8ms', status: 'optimal', icon: Clock, color: 'text-brand-emerald', bg: 'bg-brand-emerald/10' },
    { name: 'Database Performance', value: '98.5%', desc: 'Query execution rate', trend: '+1.2%', status: 'optimal', icon: Database, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { name: 'Backup Success Rate', value: '100%', desc: 'Daily snapshot schedule', trend: 'Stable', status: 'optimal', icon: HardDrive, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10' },
    { name: 'Security Compliance', value: '100%', desc: 'Zero unpatched issues', trend: 'Secured', status: 'optimal', icon: ShieldCheck, color: 'text-brand-rose', bg: 'bg-brand-rose/10' },
    { name: 'Bug Resolution Rate', value: '92.4%', desc: 'SLA response efficiency', trend: '+4.1%', status: 'warning', icon: CheckCircle2, color: 'text-brand-amber', bg: 'bg-brand-amber/10' },
  ];

  const toggleGoal = (id) => {
    setDailyGoals(
      dailyGoals.map(g => g.id === id ? { ...g, completed: !g.completed } : g)
    );
  };

  const completedCount = dailyGoals.filter(g => g.completed).length;
  const progressPercent = Math.round((completedCount / dailyGoals.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Developer Command Center</h1>
          <p className="text-gray-400 text-sm mt-1">Real-time status overview, business metrics, and daily operations.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping"></span>
            ENV: PRODUCTION
          </div>
          <button className="p-2 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Collapsible Action Toggle Buttons */}
      <div className="flex flex-wrap gap-4 py-2">
        <button 
          onClick={() => onTabClick('metrics')}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-gray-800 font-bold text-xs bg-gray-950/60 text-gray-300 hover:border-brand-cyan hover:bg-brand-cyan/10 hover:text-white transition-all shadow-md cursor-pointer"
        >
          <Zap size={14} className="text-brand-cyan" />
          Show Metrics Summary
        </button>

        <button 
          onClick={() => setShowChecklist(!showChecklist)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-bold text-xs transition-all shadow-md cursor-pointer ${
            showChecklist 
              ? 'bg-brand-purple/25 border-brand-purple text-white shadow-brand-purple/10' 
              : 'bg-gray-950/60 border-gray-800 text-gray-300 hover:border-gray-750 hover:bg-gray-900/40'
          }`}
        >
          <CheckCircle2 size={14} className={showChecklist ? 'text-brand-purple' : 'text-gray-500'} />
          {showChecklist ? 'Hide Daily Checklist' : 'Show Daily Checklist'}
        </button>

        <button 
          onClick={() => setShowVitals(!showVitals)}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-bold text-xs transition-all shadow-md cursor-pointer ${
            showVitals 
              ? 'bg-brand-rose/25 border-brand-rose text-white shadow-brand-rose/10' 
              : 'bg-gray-950/60 border-gray-800 text-gray-300 hover:border-gray-750 hover:bg-gray-900/40'
          }`}
        >
          <Cpu size={14} className={showVitals ? 'text-brand-rose' : 'text-gray-500'} />
          {showVitals ? 'Hide Vitals & Security' : 'Show Vitals & Security'}
        </button>
      </div>

      {/* Checklist & Logs Split Panel */}
      {(showChecklist || showVitals) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-slide-in">
          {/* Daily Goals Checklist */}
          {showChecklist && (
            <div className={`${showVitals ? 'lg:col-span-7' : 'lg:col-span-12'} bg-gray-950 border border-gray-800/80 rounded-2xl p-6 flex flex-col justify-between`}>
              <div>
                <div className="flex items-center justify-between border-b border-gray-900 pb-3 mb-4">
                  <h2 className="text-base font-semibold text-white flex items-center gap-2 m-0">
                    <CheckCircle2 size={18} className="text-brand-cyan" /> Daily Goals Checklist
                  </h2>
                  <span className="text-xs font-mono px-2 py-1 rounded bg-gray-900 border border-gray-800 text-brand-cyan">
                    {completedCount}/{dailyGoals.length} Done ({progressPercent}%)
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-900 rounded-full h-1.5 mb-5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-brand-cyan to-brand-purple h-1.5 rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>

                <div className="space-y-2">
                  {dailyGoals.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-left group ${
                        goal.completed 
                          ? 'bg-gray-900/40 border-gray-900 text-gray-500 line-through' 
                          : 'bg-gray-900/10 border-gray-800/60 text-gray-300 hover:border-gray-700/80 hover:bg-gray-900/40'
                      }`}
                    >
                      <div className="flex-shrink-0">
                        {goal.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-brand-emerald" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-600 group-hover:text-brand-cyan transition-colors" />
                        )}
                      </div>
                      <span className="text-xs font-medium leading-relaxed">{goal.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Server Vital Stats & Security Feed */}
          {showVitals && (
            <div className={`${showChecklist ? 'lg:col-span-5' : 'lg:col-span-12'} flex flex-col gap-6`}>
              {/* Server Vitals */}
              <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
                <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0">
                  <Cpu size={16} className="text-brand-purple" /> Infrastructure Vitals
                </h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-900/40 border border-gray-900 p-3.5 rounded-xl">
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">CPU Load</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold font-mono text-white">{systemStatus.cpuLoad}%</span>
                      <div className="w-1.5 h-6 bg-gray-800 rounded-full overflow-hidden flex flex-col justify-end">
                        <div className="w-full bg-brand-purple rounded-full" style={{ height: `${systemStatus.cpuLoad}%` }}></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-900/40 border border-gray-900 p-3.5 rounded-xl">
                    <span className="text-[10px] uppercase text-gray-500 tracking-wider">Memory Load</span>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-lg font-bold font-mono text-white">{systemStatus.memoryLoad}%</span>
                      <div className="w-1.5 h-6 bg-gray-800 rounded-full overflow-hidden flex flex-col justify-end">
                        <div className="w-full bg-brand-cyan rounded-full" style={{ height: `${systemStatus.memoryLoad}%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Storage Metric */}
                <div className="bg-gray-900/30 border border-gray-900/80 p-3.5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">Database Storage</span>
                    <span className="font-mono text-white">41.2 GB / 100 GB (41.2%)</span>
                  </div>
                  <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-purple to-brand-cyan h-full rounded-full" style={{ width: '41.2%' }}></div>
                  </div>
                </div>
              </div>

              {/* Active Security Feeds */}
              <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 pb-3 border-b border-gray-900">
                    <AlertTriangle size={16} className="text-brand-rose" /> Security Status Alerts
                  </h2>

                  <div className="mt-4 space-y-3">
                    <div className="flex gap-3 text-xs bg-brand-rose/5 border border-brand-rose/20 p-3 rounded-xl">
                      <AlertTriangle className="w-4 h-4 text-brand-rose flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-200">Failed Admin Logins Alert</span>
                        <p className="text-gray-500 mt-0.5 font-mono text-[10px]">3 failed attempts on /admin/auth</p>
                      </div>
                    </div>

                    <div className="flex gap-3 text-xs bg-brand-emerald/5 border border-brand-emerald/20 p-3 rounded-xl">
                      <ShieldCheck className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-gray-200">System Shield Scan</span>
                        <p className="text-gray-500 mt-0.5 font-mono text-[10px]">Encryption policies audit passed successfully</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-900 flex justify-between items-center text-[10px] text-gray-500">
                  <span>Auto-refreshing every 30s</span>
                  <span className="font-mono text-brand-rose">No active security alerts pending</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
