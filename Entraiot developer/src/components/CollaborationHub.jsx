import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Megaphone, 
  UserCheck, 
  Clock,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

export default function CollaborationHub({ addLog }) {
  const [subTab, setSubTab] = useState('management'); // 'management', 'clients'
  
  // Management Updates State
  const [managementMessages, setManagementMessages] = useState([
    { id: 1, recipient: 'MD (Managing Director)', type: 'Daily Progress', message: 'API schemas version 1.2 completed and automated test suite integration completed.', status: 'Reviewed', timestamp: '10:30 AM' },
    { id: 2, recipient: 'CEO', type: 'Blocker Flag', message: 'AWS staging environment DB memory scaling reached 90% threshold. Requested permission to upgrade instance.', status: 'Approved', timestamp: 'Yesterday' }
  ]);
  const [mgmtRecipient, setMgmtRecipient] = useState('CEO');
  const [mgmtType, setMgmtType] = useState('Daily Progress');
  const [mgmtMsgText, setMgmtMsgText] = useState('');

  // Client Tickets State
  const [clientTickets, setClientTickets] = useState([
    { id: 101, client: 'Solis Energy Corp', topic: 'IoT Telemetry Packet Loss', description: 'Packet loss noticed on telemetry streams over WebSocket port 8084 during high load intervals.', severity: 'High', status: 'Open', response: '' },
    { id: 102, client: 'Apex Industrial Hub', topic: 'Billing API Invoice Format', description: 'Requesting JSON field documentation support for client management invoices v1.0.', severity: 'Low', status: 'Open', response: '' },
    { id: 103, client: 'Solis Energy Corp', topic: 'Expired Auth Session Token Refresh', description: 'Token validation failures occurring exactly at the 24h expiration limit.', severity: 'Medium', status: 'Resolved', response: 'Token refresh endpoint has been modified to grant extended renewal.' }
  ]);
  const [selectedTicketId, setSelectedTicketId] = useState(101);
  const [ticketReplyText, setTicketReplyText] = useState('');

  // Client Broadcast Alert
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSeverity, setBroadcastSeverity] = useState('info');
  const [broadcastHistory, setBroadcastHistory] = useState([
    { id: 1, message: 'Scheduled database maintenance on Sunday 02:00 AM UTC. Expect 15 mins api timeout.', severity: 'warning', date: 'Just now' }
  ]);

  const handleSendToManagement = (e) => {
    e.preventDefault();
    if (!mgmtMsgText.trim()) return;

    const newMessage = {
      id: Date.now(),
      recipient: mgmtRecipient,
      type: mgmtType,
      message: mgmtMsgText,
      status: 'Pending Review',
      timestamp: 'Just now'
    };

    setManagementMessages([newMessage, ...managementMessages]);
    addLog('Management Update', `Report submitted to ${mgmtRecipient}: ${mgmtType}`, 'info');
    setMgmtMsgText('');
  };

  const handleResolveTicket = (e) => {
    e.preventDefault();
    if (!ticketReplyText.trim()) return;

    setClientTickets(clientTickets.map(t => {
      if (t.id === selectedTicketId) {
        addLog('Client Support', `Ticket #${t.id} resolved for ${t.client}`, 'success');
        return { ...t, status: 'Resolved', response: ticketReplyText };
      }
      return t;
    }));
    setTicketReplyText('');
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newBroadcast = {
      id: Date.now(),
      message: broadcastMessage,
      severity: broadcastSeverity,
      date: 'Just now'
    };

    setBroadcastHistory([newBroadcast, ...broadcastHistory]);
    addLog('Client Broadcast', `Sent general update notification to all corporate portals`, 'warning');
    setBroadcastMessage('');
  };

  const activeTicket = clientTickets.find(t => t.id === selectedTicketId) || clientTickets[0];

  return (
    <div className="space-y-6">
      {/* Header Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-800/60 pb-5">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white m-0">Collaboration Hub</h1>
          <p className="text-gray-400 text-sm mt-1">Connect, report status to management, and assist corporate clients with tickets.</p>
        </div>

        <div className="flex bg-gray-950 border border-gray-800/80 p-1 rounded-xl">
          <button 
            onClick={() => setSubTab('management')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'management' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <UserCheck size={14} /> Management Channels
          </button>
          <button 
            onClick={() => setSubTab('clients')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              subTab === 'clients' ? 'bg-gray-900 border border-gray-800 text-white' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            <Users size={14} /> Corporate Client Portal
          </button>
        </div>
      </div>

      {/* Sub-tab: Management Channel */}
      {subTab === 'management' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Send Update Form */}
          <div className="lg:col-span-5 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
              <MessageSquare className="text-brand-purple" size={16} /> Update Report Terminal
            </h2>

            <form onSubmit={handleSendToManagement} className="space-y-4">
              <div className="flex items-center justify-between border border-gray-800 bg-gray-950 rounded-full px-5 py-3 focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple/20 transition-all">
                <span className="text-[9px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Report Recipient</span>
                <select 
                  value={mgmtRecipient} 
                  onChange={(e) => setMgmtRecipient(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-white focus:outline-none text-right cursor-pointer min-w-[140px]"
                >
                  <option className="bg-gray-950 text-gray-200">CEO</option>
                  <option className="bg-gray-950 text-gray-200">MD (Managing Director)</option>
                  <option className="bg-gray-950 text-gray-200">HR Team</option>
                  <option className="bg-gray-950 text-gray-200">Engineering Tech Lead</option>
                </select>
              </div>

              <div className="flex items-center justify-between border border-gray-800 bg-gray-950 rounded-full px-5 py-3 focus-within:border-brand-purple focus-within:ring-1 focus-within:ring-brand-purple/20 transition-all">
                <span className="text-[9px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Category</span>
                <select 
                  value={mgmtType} 
                  onChange={(e) => setMgmtType(e.target.value)}
                  className="bg-transparent border-none text-xs font-semibold text-white focus:outline-none text-right cursor-pointer min-w-[140px]"
                >
                  <option className="bg-gray-950 text-gray-200">Daily Progress</option>
                  <option className="bg-gray-950 text-gray-200">Blocker Flag</option>
                  <option className="bg-gray-950 text-gray-200">Infrastructure Request</option>
                  <option className="bg-gray-950 text-gray-200">Deployment Alert</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Message Details</label>
                <textarea 
                  value={mgmtMsgText}
                  onChange={(e) => setMgmtMsgText(e.target.value)}
                  placeholder="Summarize code status, requested servers, or roadblocks..."
                  className="w-full mt-1.5 h-28 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-purple custom-scrollbar"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-purple text-white font-bold text-xs hover:bg-purple-600 transition-colors flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Status Update
              </button>
            </form>
          </div>

          {/* Messages & Logs Panel */}
          <div className="lg:col-span-7 bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
            <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
              <Clock className="text-brand-cyan" size={16} /> Submission & Review Log
            </h2>

            <div className="space-y-3 max-h-[380px] overflow-y-auto custom-scrollbar">
              {managementMessages.map((msg) => (
                <div key={msg.id} className="bg-gray-900/40 border border-gray-900 p-4 rounded-xl space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-purple/15 text-brand-purple font-semibold">
                      To: {msg.recipient}
                    </span>
                    <span className="text-[9px] text-gray-500 font-mono">{msg.timestamp}</span>
                  </div>

                  <div>
                    <span className="text-xs font-bold text-gray-200 block mb-0.5">{msg.type}</span>
                    <p className="text-xs text-gray-400">{msg.message}</p>
                  </div>

                  <div className="pt-2 border-t border-gray-900/60 flex items-center justify-between">
                    <span className="text-[10px] text-gray-500">Approval / Action status</span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      msg.status === 'Approved' ? 'bg-brand-emerald/10 text-brand-emerald' : 
                      msg.status === 'Reviewed' ? 'bg-brand-cyan/10 text-brand-cyan' : 'bg-gray-900 text-gray-400'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                      {msg.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab: Corporate Client Portal */}
      {subTab === 'clients' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Ticket List */}
          <div className="lg:col-span-4 space-y-2 max-h-[460px] overflow-y-auto custom-scrollbar">
            <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block px-1 mb-2">Corporate Support Tickets</span>
            {clientTickets.map(ticket => (
              <button
                key={ticket.id}
                onClick={() => setSelectedTicketId(ticket.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col gap-1.5 ${
                  selectedTicketId === ticket.id 
                    ? 'bg-gray-900 border-gray-800 text-white' 
                    : 'bg-gray-950 border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{ticket.client}</span>
                  <span className={`px-2 py-0.2 rounded text-[9px] font-mono font-bold ${
                    ticket.severity === 'High' ? 'bg-brand-rose/15 text-brand-rose' : 
                    ticket.severity === 'Medium' ? 'bg-brand-amber/15 text-brand-amber' : 'bg-gray-900 text-gray-450'
                  }`}>
                    {ticket.severity}
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-gray-300 truncate">{ticket.topic}</span>
                <div className="flex justify-between items-center text-[9px] font-mono text-gray-500">
                  <span>Ticket #{ticket.id}</span>
                  <span className={ticket.status === 'Resolved' ? 'text-brand-emerald font-semibold' : 'text-brand-amber font-semibold'}>
                    {ticket.status}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Ticket Response Panel & Client Broadcast */}
          <div className="lg:col-span-8 space-y-6">
            {/* Active Ticket Details & Resolver Form */}
            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
              <div className="border-b border-gray-900 pb-3">
                <span className="text-[10px] uppercase text-gray-500 font-mono">Support Resolver Panel</span>
                <h3 className="text-sm font-bold text-white mt-1">Ticket #{activeTicket.id}: {activeTicket.topic}</h3>
                <span className="text-xs text-brand-cyan font-semibold block mt-0.5">{activeTicket.client}</span>
              </div>

              <div className="bg-gray-900/30 border border-gray-900 p-3.5 rounded-xl text-xs space-y-2">
                <span className="text-[10px] uppercase text-gray-500 font-bold block">Issue Description</span>
                <p className="text-gray-300 leading-relaxed font-mono text-[11px]">{activeTicket.description}</p>
              </div>

              {activeTicket.status === 'Resolved' ? (
                <div className="bg-brand-emerald/5 border border-brand-emerald/15 p-4 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-brand-emerald flex items-center gap-1"><CheckCircle2 size={12} /> Resolved Status Reply</span>
                  <p className="text-xs text-gray-400 italic">"{activeTicket.response}"</p>
                </div>
              ) : (
                <form onSubmit={handleResolveTicket} className="space-y-3">
                  <div>
                    <label className="text-[10px] uppercase text-gray-500 font-medium tracking-wider">Write Response & Mark Resolved</label>
                    <textarea 
                      value={ticketReplyText}
                      onChange={(e) => setTicketReplyText(e.target.value)}
                      placeholder="Explain solution or configuration fix deployed for client..."
                      className="w-full mt-1.5 h-20 bg-gray-900 border border-gray-800 text-gray-200 text-xs rounded-xl p-3 focus:outline-none focus:border-brand-emerald"
                      required
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-brand-emerald text-gray-950 font-bold text-xs hover:bg-emerald-600 transition-colors flex items-center gap-1.5"
                  >
                    <CheckCircle2 size={14} /> Resolve Ticket
                  </button>
                </form>
              )}
            </div>

            {/* Broadcast Update Alert */}
            <div className="bg-gray-950 border border-gray-800/80 rounded-2xl p-5 space-y-4">
              <h2 className="text-sm font-semibold text-white flex items-center gap-2 m-0 border-b border-gray-900 pb-3">
                <Megaphone className="text-brand-amber" size={16} /> Broadcast Client Update Alerts
              </h2>

              <form onSubmit={handleSendBroadcast} className="flex flex-col md:flex-row gap-4 items-stretch">
                <div className="flex-1 flex items-center justify-between border border-gray-800 bg-gray-950 rounded-full px-5 py-2.5 focus-within:border-brand-amber focus-within:ring-1 focus-within:ring-brand-amber/20 transition-all">
                  <span className="text-[9px] uppercase text-gray-500 font-mono tracking-wider font-semibold whitespace-nowrap mr-3">Message</span>
                  <input 
                    type="text" 
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="e.g. Scheduled DB maintenance..."
                    className="bg-transparent border-none text-xs text-white focus:outline-none text-right flex-1"
                    required
                  />
                </div>
                <div className="flex items-center justify-between border border-gray-800 bg-gray-950 rounded-full px-5 py-2.5 focus-within:border-brand-amber focus-within:ring-1 focus-within:ring-brand-amber/20 transition-all md:w-48">
                  <span className="text-[9px] uppercase text-gray-500 font-mono tracking-wider font-semibold">Severity</span>
                  <select 
                    value={broadcastSeverity} 
                    onChange={(e) => setBroadcastSeverity(e.target.value)}
                    className="bg-transparent border-none text-xs font-semibold text-white focus:outline-none text-right cursor-pointer"
                  >
                    <option value="info" className="bg-gray-950 text-gray-200">Info</option>
                    <option value="warning" className="bg-gray-950 text-gray-200">Warning</option>
                    <option value="error" className="bg-gray-950 text-gray-200">Critical</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-brand-amber hover:bg-amber-600 text-gray-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Megaphone size={14} /> Send
                </button>
              </form>

              {/* Broadcast history log */}
              <div className="space-y-2">
                <span className="text-[10px] uppercase text-gray-500 font-mono block">Recent Broadcasts</span>
                <div className="space-y-1.5 max-h-24 overflow-y-auto custom-scrollbar">
                  {broadcastHistory.map((bh) => (
                    <div key={bh.id} className="flex items-start gap-2 bg-gray-900/20 border border-gray-900 p-2.5 rounded-lg text-[10px]">
                      <AlertTriangle className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${
                        bh.severity === 'error' ? 'text-brand-rose' : 
                        bh.severity === 'warning' ? 'text-brand-amber' : 'text-brand-cyan'
                      }`} />
                      <div className="flex-1">
                        <span className="text-gray-300">{bh.message}</span>
                        <span className="text-gray-600 block mt-0.5 font-mono text-[9px]">{bh.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
