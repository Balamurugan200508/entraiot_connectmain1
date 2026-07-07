import React, { useState } from 'react';
import { 
  FileText, 
  Activity, 
  ChevronRight, 
  X, 
  TrendingUp, 
  CheckCircle2, 
  Calendar,
  DollarSign
} from 'lucide-react';

export default function ReportsPanel({ addLog }) {
  const [activeReport, setActiveReport] = useState(null); // 'daily', 'weekly', 'monthly' or null

  const closeReportModal = () => {
    setActiveReport(null);
  };

  return (
    <div className="space-y-6">
      {/* 5. Performance Reports & Audits Card */}
      <div className="bg-[#080d1a]/60 border border-gray-850 rounded-3xl p-6 md:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white">5. Performance Reports & Audits</h2>
          <p className="text-gray-400 text-xs mt-2 leading-relaxed">
            Generate and review corporate audits, daily operational milestones, and weekly performance summaries. Select a timeframe below to launch the dedicated workspace overlay.
          </p>
        </div>

        {/* Status Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-gray-800/80 bg-gray-950/40 rounded-full px-6 py-3.5 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Current Period</span>
            <span className="text-xs font-bold text-white font-mono">June 2026</span>
          </div>
          <div className="border border-gray-800/80 bg-gray-950/40 rounded-full px-6 py-3.5 flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono tracking-widest text-gray-500 font-bold">Operational Metrics</span>
            <span className="text-xs font-bold text-brand-emerald font-mono">Audited & Locked</span>
          </div>
        </div>
      </div>

      {/* Grid of Report Timeframes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Daily Report Card */}
        <button 
          onClick={() => {
            setActiveReport('daily');
            addLog('Audit Panel', 'Launched Daily Operational Report workspace overlay', 'info');
          }}
          className="bg-[#080d1a]/50 border border-gray-800/60 hover:border-brand-cyan/40 rounded-2xl p-5 text-left transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-brand-cyan">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500">Daily</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
          </div>
          <div className="mt-8">
            <h3 className="text-white text-sm font-bold">Daily Operational Report</h3>
            <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">
              Today's Revenue, completed tasks, meetings, and milestone trackers.
            </p>
          </div>
        </button>

        {/* Weekly Report Card */}
        <button 
          onClick={() => {
            setActiveReport('weekly');
            addLog('Audit Panel', 'Launched Weekly Performance Report workspace overlay', 'info');
          }}
          className="bg-[#080d1a]/50 border border-gray-800/60 hover:border-brand-purple/40 rounded-2xl p-5 text-left transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-brand-purple">
              <Activity className="w-5 h-5" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500">Weekly</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
          </div>
          <div className="mt-8">
            <h3 className="text-white text-sm font-bold">Weekly Performance Report</h3>
            <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">
              Weekly Revenue, productivity averages, enterprise leads, and issue logs.
            </p>
          </div>
        </button>

        {/* Monthly Report Card */}
        <button 
          onClick={() => {
            setActiveReport('monthly');
            addLog('Audit Panel', 'Launched Monthly Growth Audit workspace overlay', 'info');
          }}
          className="bg-[#080d1a]/50 border border-gray-800/60 hover:border-brand-emerald/40 rounded-2xl p-5 text-left transition-all flex flex-col justify-between group cursor-pointer"
        >
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 text-brand-emerald">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-gray-500">Monthly</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
          </div>
          <div className="mt-8">
            <h3 className="text-white text-sm font-bold">Monthly Growth Audit</h3>
            <p className="text-gray-500 text-[10px] mt-2 leading-relaxed">
              Monthly Revenue, net profit margin, YoY growth %, and expansion updates.
            </p>
          </div>
        </button>
      </div>

      {/* Interactive Workspace Modal Overlay */}
      {activeReport && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#080d1a] border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-850 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-brand-purple" />
                <div>
                  <h3 className="text-base font-bold text-white uppercase">
                    {activeReport === 'daily' && 'Daily Operational Log'}
                    {activeReport === 'weekly' && 'Weekly Performance Audit'}
                    {activeReport === 'monthly' && 'Monthly Growth Summary'}
                  </h3>
                  <span className="text-[10px] text-gray-500 font-mono">June 2026 Audit Period</span>
                </div>
              </div>
              <button 
                onClick={closeReportModal}
                className="p-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase font-mono text-gray-500">Revenue</span>
                  <div className="text-md font-bold text-white mt-1 flex items-center gap-1 font-mono">
                    <DollarSign size={14} className="text-brand-emerald" />
                    {activeReport === 'daily' && '2,480.00'}
                    {activeReport === 'weekly' && '18,920.00'}
                    {activeReport === 'monthly' && '78,410.00'}
                  </div>
                </div>
                <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase font-mono text-gray-500">Margin</span>
                  <div className="text-md font-bold text-brand-cyan mt-1 font-mono">
                    {activeReport === 'daily' && '94.2%'}
                    {activeReport === 'weekly' && '91.8%'}
                    {activeReport === 'monthly' && '92.5%'}
                  </div>
                </div>
                <div className="bg-gray-950/50 border border-gray-900 p-4 rounded-2xl">
                  <span className="text-[9px] uppercase font-mono text-gray-500">Target</span>
                  <div className="text-md font-bold text-brand-emerald mt-1 flex items-center gap-1 font-mono">
                    <CheckCircle2 size={14} />
                    100%
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-300">Audited Milestones & Logs</h4>
                <div className="bg-gray-950/30 border border-gray-900 rounded-2xl p-4 space-y-3.5 text-xs text-gray-400">
                  {activeReport === 'daily' && (
                    <>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>All daily automated S3 backup pipelines executed successfully.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>MFA logins audit validated for all 148 active developer session states.</span>
                      </div>
                    </>
                  )}

                  {activeReport === 'weekly' && (
                    <>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>Sprint velocity targets met with 24 bug tickets successfully resolved.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>Weekly security compliance review generated zero unpatched issue flags.</span>
                      </div>
                    </>
                  )}

                  {activeReport === 'monthly' && (
                    <>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>Corporate audit finalized. Balance sheets, transaction records and database logs are signed and sealed.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                        <span>Active cloud telemetry rate limits increased to support new client sensors.</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-850 bg-gray-950/20 flex justify-end">
              <button 
                onClick={closeReportModal}
                className="bg-brand-purple hover:bg-brand-purple/80 text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
