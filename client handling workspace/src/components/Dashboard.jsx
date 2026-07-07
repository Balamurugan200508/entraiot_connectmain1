import React from 'react';
import { 
  TrendingUp, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Milestone, 
  Activity,
  Layers
} from 'lucide-react';

export default function Dashboard() {
  const milestones = [
    { id: 1, title: 'Requirement Analysis & Wireframes', date: 'May 12, 2026', status: 'completed' },
    { id: 2, title: 'Core UI/UX & Component Design', date: 'May 28, 2026', status: 'completed' },
    { id: 3, title: 'Database Schema & Server Integration', date: 'June 08, 2026', status: 'completed' },
    { id: 4, title: 'Client Feedback Loop & Adjustments', date: 'June 18, 2026', status: 'in-progress' },
    { id: 5, title: 'Beta Deployment & QA Testing', date: 'June 25, 2026', status: 'pending' },
    { id: 6, title: 'Final Production Handover & Launch', date: 'July 05, 2026', status: 'pending' }
  ];

  const activities = [
    { id: 1, user: 'Arun (Lead Dev)', action: 'merged Database optimization branch', time: '2 hours ago' },
    { id: 2, user: 'Sarah (UI Designer)', action: 'updated Dashboard design mockups', time: '5 hours ago' },
    { id: 3, user: 'System Bot', action: 'deployed auto-build v0.4.2 to staging', time: 'Yesterday' },
    { id: 4, user: 'Vikram (CEO)', action: 'scheduled Project Status Sync Call', time: '2 days ago' }
  ];

  return (
    <div className="fade-in" style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
      
      {/* Overview / Project Header Card */}
      <div className="glass-card" style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span className="badge badge-info"><Layers size={14} /> Phase 2: Beta</span>
            <span className="badge badge-success"><CheckCircle2 size={14} /> Health: Stable</span>
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '4px' }}>Project Apex Portal</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Enterprise Client Dashboard & Operations Management Platform</p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Completion Rate</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>72%</span>
          </div>
          <div style={{ textAlign: 'right', borderLeft: '1px solid var(--border-color)', paddingLeft: '20px' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Delivery</span>
            <span style={{ fontSize: '1.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>July 05</span>
          </div>
        </div>
      </div>

      {/* Progress Metric Card */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <TrendingUp size={20} color="var(--accent-secondary)" /> Progress & Delivery
        </h3>
        
        {/* Visual Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Overall Completion</span>
            <span style={{ fontWeight: '600', color: 'var(--accent-secondary)' }}>72%</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)', borderRadius: '4px' }}></div>
          </div>
        </div>

        {/* Quick statistics */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={12} /> Total Effort
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: '600', display: 'block', marginTop: '4px' }}>148 hrs</span>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '12px', borderRadius: 'var(--border-radius-sm)', border: '1px solid rgba(255,255,255,0.04)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={12} /> Days Left
            </span>
            <span style={{ fontSize: '1.2rem', fontWeight: '600', display: 'block', marginTop: '4px' }}>26 days</span>
          </div>
        </div>
      </div>

      {/* Recent Updates & Activity Logs */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={20} color="var(--accent-primary)" /> Latest Activity Log
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activities.map((act) => (
            <div key={act.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', marginTop: '6px', flexShrink: 0 }}></div>
              <div style={{ fontSize: '0.92rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{act.user} </span>
                <span style={{ color: 'var(--text-secondary)' }}>{act.action}</span>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{act.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Milestones Timeline */}
      <div className="glass-card" style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Milestone size={20} color="var(--accent-secondary)" /> Project Milestone Roadmap
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', paddingLeft: '8px' }}>
          {/* Vertical line connecting milestones */}
          <div style={{ position: 'absolute', left: '19px', top: '12px', bottom: '12px', width: '2px', background: 'var(--bg-tertiary)', zIndex: 1 }}></div>

          {milestones.map((m) => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '20px', zIndex: 2, position: 'relative' }}>
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                background: m.status === 'completed' ? 'var(--accent-success)' : m.status === 'in-progress' ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: m.status === 'in-progress' ? '0 0 10px var(--accent-primary)' : 'none',
                flexShrink: 0
              }}>
                {m.status === 'completed' && <CheckCircle2 size={14} color="#0b0a14" strokeWidth={3} />}
                {m.status === 'in-progress' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white', animation: 'pulse 1.5s infinite' }}></div>}
              </div>

              <div style={{ 
                display: 'flex', 
                flex: 1, 
                justifyContent: 'space-between', 
                alignItems: 'center',
                background: 'rgba(255,255,255,0.01)', 
                padding: '12px 18px', 
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid rgba(255,255,255,0.03)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '500', color: m.status === 'pending' ? 'var(--text-muted)' : 'var(--text-primary)' }}>{m.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Target Completion: {m.date}</span>
                </div>
                <div>
                  {m.status === 'completed' && <span className="badge badge-success">Completed</span>}
                  {m.status === 'in-progress' && <span className="badge badge-info">In Progress</span>}
                  {m.status === 'pending' && <span className="badge" style={{ color: 'var(--text-muted)', border: '1px solid rgba(255,255,255,0.05)' }}>Upcoming</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
