import React, { useState } from 'react';
import { 
  Database, 
  HardDriveDownload, 
  Gauge, 
  RefreshCw, 
  Settings, 
  ChevronRight, 
  CheckCircle2, 
  Calendar,
  AlertCircle,
  FileCode,
  Loader2
} from 'lucide-react';

export default function DatabaseManager({ dbTables, setDbTables, backups, setBackups, dbMetrics, setDbMetrics, addLog }) {
  const [subTab, setSubTab] = useState('tables'); // 'tables', 'backups', 'optimization'
  
  // Actions states
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationLog, setOptimizationLog] = useState([]);
  const [optimizationMetricImprovement, setOptimizationMetricImprovement] = useState(false);

  const runBackup = () => {
    setIsBackingUp(true);
    setBackupProgress(0);
    addLog('Database Backups', 'Starting scheduled/manual system database backup...', 'info');

    const interval = setInterval(() => {
      setBackupProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            const newBackup = {
              id: Date.now(),
              date: new Date().toLocaleString(),
              size: '414.2 MB',
              location: 'AWS S3 (eu-west-1)',
              status: 'Success'
            };
            setBackups([newBackup, ...backups]);
            setIsBackingUp(false);
            addLog('Database Backups', 'Backup COMPLETED successfully. Snapshot created in S3.', 'success');
          }, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
  };

  const runOptimize = () => {
    setIsOptimizing(true);
    setOptimizationLog(['Scanning database index tables...', 'Analyzing slow query logs (>150ms)...']);
    addLog('Database Optimization', 'Executing query index optimization scans...', 'info');

    setTimeout(() => {
      setOptimizationLog(prev => [...prev, 'Found 4 duplicate indices in leads_table.', 'Pruning unused data fragments...']);
    }, 1000);

    setTimeout(() => {
      setOptimizationLog(prev => [...prev, 'Rebuilding database indexes...', 'Analyzing query execution paths...']);
    }, 2000);

    setTimeout(() => {
      setOptimizationLog(prev => [...prev, 'Index optimization COMPLETE. Average response times decreased by 12%.']);
      setIsOptimizing(false);
      setDbMetrics({
        queryPerformance: '98.5%',
        dbLoad: '18%',
        indexStatus: 'Optimized',
        storageUsage: '41.2%'
      });
      setOptimizationMetricImprovement(true);
      addLog('Database Optimization', 'Optimization finished: Indexes rebuilt, system load decreased to 18%', 'success');
    }, 3200);
  };

  return (
    <div className="space-y-6">
      {/* Header and Sub Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0 font-sans">Database Manager</h1>
          <p className="text-gray-400 text-sm mt-1">Configure business schemas, trigger backups, and optimize SQL performance.</p>
        </div>

        <div className="flex bg-gray-950 border border-gray-800/80 p-1 rounded-xl">
          <button 
            onClick={() => setSubTab('tables')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'tables' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Database size={14} /> Tables
          </button>
          <button 
            onClick={() => setSubTab('backups')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'backups' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <HardDriveDownload size={14} /> Backups
          </button>
          <button 
            onClick={() => setSubTab('optimization')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'optimization' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Gauge size={14} /> Optimization
          </button>
        </div>
      </div>

      {/* Tables Subtab */}
      {subTab === 'tables' && (
        <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-6">
          <div className="border-b border-gray-900 pb-3 mb-5">
            <h2 className="text-sm font-semibold text-white m-0">Business Relational Tables</h2>
            <p className="text-gray-500 text-xs mt-1">Core Postgres database instances used for Entraiot solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dbTables.map((table, idx) => (
              <div 
                key={idx} 
                className="bg-gray-900/10 border border-gray-800/70 hover:border-gray-700/80 rounded-xl p-4 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded bg-brand-purple/10 text-brand-purple">
                      <Database size={14} />
                    </div>
                    <span className="text-xs font-semibold text-gray-200">{table.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-gray-500">{table.recordCount.toLocaleString()} rows</span>
                </div>
                
                <div className="mt-4 space-y-2 border-t border-gray-900/60 pt-3">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Foreign Relations</span>
                    <span className="font-mono text-gray-450">{table.relations || 'None'}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-gray-500">Last Modified</span>
                    <span className="font-mono text-gray-400">{table.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Backups Subtab */}
      {subTab === 'backups' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Backup Launcher */}
          <div className="lg:col-span-4 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 flex items-center gap-2 m-0">
                <HardDriveDownload size={16} className="text-brand-cyan" /> Backup Controls
              </h2>

              <p className="text-gray-400 text-xs leading-relaxed">
                Protect databases from system corruption. System schedules snapshots daily at 00:00 UTC.
              </p>

              {isBackingUp ? (
                <div className="bg-gray-900 border border-gray-850 p-4 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Loader2 size={12} className="animate-spin text-brand-cyan" /> Archiving Schemas...
                    </span>
                    <span className="font-mono text-white">{backupProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-950 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-brand-cyan to-brand-purple h-full rounded-full transition-all duration-150" style={{ width: `${backupProgress}%` }}></div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={runBackup}
                  className="w-full py-2.5 rounded-xl bg-brand-cyan text-gray-950 hover:bg-cyan-600 transition-colors font-bold text-xs"
                >
                  Create Backup Snapshot
                </button>
              )}
            </div>

            <div className="border-t border-gray-900/60 pt-4 mt-6 text-[10px] text-gray-500 space-y-2">
              <div className="flex justify-between">
                <span>Backup Target:</span>
                <span className="font-mono text-gray-400">AWS S3 Glacier Deep</span>
              </div>
              <div className="flex justify-between">
                <span>Retention Policy:</span>
                <span className="font-mono text-gray-450">90 Days</span>
              </div>
            </div>
          </div>

          {/* Backup Log History */}
          <div className="lg:col-span-8 bg-gray-950 border border-gray-800/80 rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 mb-4">
              Database Snapshots History
            </h2>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-900 text-gray-500 font-medium">
                    <th className="py-2.5 px-3">Date & Time</th>
                    <th className="py-2.5 px-3 text-center">Snapshot Size</th>
                    <th className="py-2.5 px-3">Storage Destination</th>
                    <th className="py-2.5 px-3 text-right">Verification Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/40">
                  {backups.map(backup => (
                    <tr key={backup.id} className="hover:bg-gray-900/10">
                      <td className="py-3 px-3 font-mono text-gray-300">{backup.date}</td>
                      <td className="py-3 px-3 text-center font-mono text-gray-400">{backup.size}</td>
                      <td className="py-3 px-3 font-mono text-gray-500">{backup.location}</td>
                      <td className="py-3 px-3 text-right">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald">
                          <CheckCircle2 size={10} /> Active Recovery Validated
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Optimization Subtab */}
      {subTab === 'optimization' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Health Stats */}
          <div className="lg:col-span-4 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 flex items-center gap-2 m-0">
              <Gauge size={16} className="text-brand-purple" /> Diagnostics Console
            </h2>

            <div className="space-y-3">
              <div className="p-3 bg-gray-900/40 border border-gray-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 font-medium">Query Performance</span>
                  <div className="text-base font-bold text-white font-mono mt-0.5">{dbMetrics.queryPerformance}</div>
                </div>
                {optimizationMetricImprovement && (
                  <span className="text-[9px] bg-brand-emerald/10 border border-brand-emerald/20 text-brand-emerald font-semibold px-2 py-0.5 rounded-full">
                    +1.5% Improved
                  </span>
                )}
              </div>

              <div className="p-3 bg-gray-900/40 border border-gray-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 font-medium">Database Load</span>
                  <div className="text-base font-bold text-white font-mono mt-0.5">{dbMetrics.dbLoad}</div>
                </div>
              </div>

              <div className="p-3 bg-gray-900/40 border border-gray-900 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-gray-500 font-medium">Index Status</span>
                  <div className="text-base font-bold text-brand-cyan font-mono mt-0.5">{dbMetrics.indexStatus}</div>
                </div>
              </div>
            </div>

            <button 
              onClick={runOptimize}
              disabled={isOptimizing}
              className="w-full py-2.5 rounded-xl bg-brand-purple text-white hover:bg-purple-600 transition-colors font-bold text-xs disabled:opacity-50"
            >
              {isOptimizing ? 'Running Optimization Suite...' : 'Trigger Index & Query Tune-Up'}
            </button>
          </div>

          {/* Console Diagnostic Log */}
          <div className="lg:col-span-8 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 flex flex-col justify-between min-h-[300px]">
            <div>
              <h2 className="text-sm font-semibold text-white border-b border-gray-900 pb-3 mb-4">
                Optimization Trace Log
              </h2>

              {optimizationLog.length > 0 ? (
                <div className="space-y-2.5 font-mono text-[11px] text-gray-300 max-h-56 overflow-y-auto custom-scrollbar">
                  {optimizationLog.map((log, idx) => (
                    <div key={idx} className="flex gap-2 items-start py-0.5">
                      <ChevronRight size={12} className="text-brand-purple mt-0.5 flex-shrink-0" />
                      <span>{log}</span>
                    </div>
                  ))}
                  {isOptimizing && (
                    <div className="flex gap-2 items-center text-gray-500 animate-pulse">
                      <Loader2 size={12} className="animate-spin" />
                      <span>Optimizing business schemas...</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500 space-y-3">
                  <FileCode size={36} className="text-gray-700" />
                  <span className="text-xs">No query tuning run in this session. Trigger optimization check above.</span>
                </div>
              )}
            </div>

            <div className="text-[10px] text-gray-500 border-t border-gray-900 pt-3">
              Optimization cleans up temporary tuples and builds missing B-Tree key indices.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
