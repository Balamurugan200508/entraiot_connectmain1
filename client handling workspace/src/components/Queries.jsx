import React, { useState } from 'react';
import { PlusCircle, HelpCircle, MessageSquare, AlertTriangle, CheckCircle, Send } from 'lucide-react';

export default function Queries() {
  const [tickets, setTickets] = useState([
    { 
      id: 'TCK-2041', 
      title: 'Staging build login failing with Cognito', 
      category: 'Bug', 
      priority: 'High', 
      status: 'Open', 
      date: 'June 09, 2026',
      messages: [
        { sender: 'Client', text: 'Hey team, I tried logging into the beta/staging site using Cognito, but it keeps timing out.', time: '10:30 AM' },
        { sender: 'Arun (Lead Dev)', text: 'Thanks for reporting. We verified the security group rules and found a blocked inbound port. We are working on a fix now.', time: '11:15 AM' }
      ]
    },
    { 
      id: 'TCK-2038', 
      title: 'Request to add Apple Pay support to Checkout', 
      category: 'Feature', 
      priority: 'Medium', 
      status: 'Pending Review', 
      date: 'June 07, 2026',
      messages: [
        { sender: 'Client', text: 'Our stakeholders are asking if we can support Apple Pay for mobile users.', time: 'Yesterday' }
      ]
    },
    { 
      id: 'TCK-2012', 
      title: 'Invoices for Phase 1 Milestone', 
      category: 'Billing', 
      priority: 'Low', 
      status: 'Resolved', 
      date: 'June 01, 2026',
      messages: [
        { sender: 'Client', text: 'Could you share the invoice for the wireframes completion?', time: 'June 01, 2026' },
        { sender: 'Pooja (HR / Finance)', text: 'Hi! Attached is the invoice for Phase 1. Let me know if you need anything else.', time: 'June 02, 2026' }
      ]
    }
  ]);

  const [selectedTicketId, setSelectedTicketId] = useState('TCK-2041');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Bug');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newDesc, setNewDesc] = useState('');
  const [chatInput, setChatInput] = useState('');

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) || tickets[0];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTitle || !newDesc) return;

    const newTicket = {
      id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      category: newCategory,
      priority: newPriority,
      status: 'Open',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      messages: [
        { sender: 'Client', text: newDesc, time: 'Just now' }
      ]
    };

    setTickets([newTicket, ...tickets]);
    setSelectedTicketId(newTicket.id);
    setNewTitle('');
    setNewDesc('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const updatedTickets = tickets.map(t => {
      if (t.id === selectedTicket.id) {
        const updatedMsgs = [...t.messages, { sender: 'Client', text: chatInput, time: 'Just now' }];
        
        // Setup an automated developer response 1.5 seconds later
        setTimeout(() => {
          setTickets(prevTickets => 
            prevTickets.map(pt => {
              if (pt.id === t.id) {
                return {
                  ...pt,
                  messages: [
                    ...pt.messages,
                    { 
                      sender: 'Developer Bot', 
                      text: `Got your message! A team member has been notified about: "${chatInput.substring(0, 30)}..." and will get back to you shortly.`, 
                      time: 'Just now' 
                    }
                  ]
                };
              }
              return pt;
            })
          );
        }, 1500);

        return { ...t, messages: updatedMsgs };
      }
      return t;
    });

    setTickets(updatedTickets);
    setChatInput('');
  };

  const getPriorityColor = (priority) => {
    if (priority === 'High') return 'var(--accent-error)';
    if (priority === 'Medium') return 'var(--accent-warning)';
    return 'var(--accent-secondary)';
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
      
      {/* Upper Layout: Create Ticket Form & Ticket Board */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Create Query Card */}
        <div className="glass-card" style={{ height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <PlusCircle size={20} color="var(--accent-primary)" /> Submit a Query / Ticket
          </h3>
          <form onSubmit={handleCreateTicket}>
            <div className="form-group">
              <label className="form-label">Query Title</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Brief summary of the issue..."
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="form-group">
              <div>
                <label className="form-label">Category</label>
                <select 
                  className="form-select"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option>Bug</option>
                  <option>Feature</option>
                  <option>Billing</option>
                  <option>Question</option>
                </select>
              </div>
              <div>
                <label className="form-label">Priority</label>
                <select 
                  className="form-select"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description / Details</label>
              <textarea 
                className="form-textarea" 
                rows="4" 
                placeholder="Provide details about your query..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                required
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Query</button>
          </form>
        </div>

        {/* Existing Queries List Card */}
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '520px', overflowY: 'auto' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={20} color="var(--accent-secondary)" /> Active Queries
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tickets.map((t) => (
              <div 
                key={t.id} 
                onClick={() => setSelectedTicketId(t.id)}
                style={{ 
                  padding: '16px', 
                  borderRadius: 'var(--border-radius-sm)', 
                  border: `1px solid ${selectedTicketId === t.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)'}`,
                  background: selectedTicketId === t.id ? 'rgba(124, 77, 255, 0.08)' : 'rgba(255,255,255,0.01)',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600' }}>{t.id}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '600', color: getPriorityColor(t.priority) }}>
                    ● {t.priority}
                  </span>
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '600', marginBottom: '8px', color: 'var(--text-primary)' }}>{t.title}</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="badge badge-info" style={{ fontSize: '0.75rem', padding: '3px 8px' }}>{t.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Ticket Details & Discussion Feed Card */}
      {selectedTicket && (
        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-secondary)', fontWeight: '600' }}>{selectedTicket.id}</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginTop: '4px' }}>{selectedTicket.title}</h3>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span className={`badge ${selectedTicket.status === 'Resolved' ? 'badge-success' : 'badge-warning'}`}>
                {selectedTicket.status}
              </span>
            </div>
          </div>

          {/* Conversation History */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', minHeight: '180px', maxHeight: '300px', overflowY: 'auto', padding: '8px 4px' }}>
            {selectedTicket.messages.map((msg, index) => {
              const isClient = msg.sender === 'Client';
              return (
                <div 
                  key={index} 
                  style={{ 
                    alignSelf: isClient ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    background: isClient ? 'linear-gradient(135deg, var(--accent-primary) 0%, #512da8 100%)' : 'var(--bg-tertiary)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    borderTopRightRadius: isClient ? '2px' : '12px',
                    borderTopLeftRadius: isClient ? '12px' : '2px',
                    border: isClient ? 'none' : '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <span style={{ display: 'block', fontSize: '0.75rem', color: isClient ? 'rgba(255,255,255,0.7)' : 'var(--accent-secondary)', fontWeight: '600', marginBottom: '4px' }}>
                    {msg.sender}
                  </span>
                  <p style={{ fontSize: '0.92rem', color: 'white' }}>{msg.text}</p>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: isClient ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
                    {msg.time}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Chat Form */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px' }}>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Send message to developer / handling team..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
