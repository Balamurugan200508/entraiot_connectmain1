import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, MessageSquare, Shield, Code, Send, Check } from 'lucide-react';

export default function ContactHub() {
  const team = [
    { 
      id: 'ceo', 
      name: 'Vikram Malhotra', 
      role: 'CEO & Founder', 
      avatarColor: '#ff1744', 
      status: 'In Meeting', 
      email: 'vikram@apexsoftware.io', 
      phone: '+1 (555) 019-2834',
      replyTemplate: "Hello! I'm currently in a board meeting. If this is an urgent matter regarding contracts or pricing, feel free to drop me an email, otherwise, our Tech Lead and PM are on standby."
    },
    { 
      id: 'pm', 
      name: 'Neha Patel', 
      role: 'Project Manager', 
      avatarColor: '#ffea00', 
      status: 'Active Now', 
      email: 'neha.patel@apexsoftware.io', 
      phone: '+1 (555) 019-8876',
      replyTemplate: "Hi there! I was just reviewing the Gantt chart for Project Apex. The backend integration is running smoothly. How can I help you today?"
    },
    { 
      id: 'tech_lead', 
      name: 'Arun Kumar', 
      role: 'Lead Architect / Dev', 
      avatarColor: '#00e676', 
      status: 'Active Now', 
      email: 'arun.kumar@apexsoftware.io', 
      phone: '+1 (555) 019-4512',
      replyTemplate: "Hey! Just debugging a Redis cache issue on the staging env. Let me know if you hit any blocker, or if you need an API key verified."
    },
    { 
      id: 'hr', 
      name: 'Priya Sharma', 
      role: 'HR Director', 
      avatarColor: '#00e5ff', 
      status: 'Away', 
      email: 'priya.sharma@apexsoftware.io', 
      phone: '+1 (555) 019-3310',
      replyTemplate: "Hello. I am currently out of the office for recruitment training. For any resource allocations, billing queries or support, please check in with Neha."
    }
  ];

  const [selectedContactId, setSelectedContactId] = useState('pm');
  const [messages, setMessages] = useState({
    ceo: [
      { sender: 'them', text: 'Welcome to the executive channel. Happy to assist with project directions.', time: 'Yesterday' }
    ],
    pm: [
      { sender: 'them', text: 'Hi! I am tracking current sprints. Feel free to ping with any status requests.', time: '10:00 AM' }
    ],
    tech_lead: [
      { sender: 'them', text: 'Hi, dev desk here. If you find bugs, report them here or submit a ticket.', time: '11:00 AM' }
    ],
    hr: [
      { sender: 'them', text: 'HR workspace. Leave a message regarding billing cycles or resource counts.', time: 'June 05, 2026' }
    ]
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeContact = team.find(member => member.id === selectedContactId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // 1. Add user message
    const userMsg = { sender: 'me', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => ({
      ...prev,
      [selectedContactId]: [...prev[selectedContactId], userMsg]
    }));

    const textToSend = inputText;
    setInputText('');

    // 2. Trigger typing simulator
    setIsTyping(true);

    // 3. Simulate response
    setTimeout(() => {
      setIsTyping(false);
      const replyMsg = { 
        sender: 'them', 
        text: activeContact.replyTemplate, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => ({
        ...prev,
        [selectedContactId]: [...prev[selectedContactId], replyMsg]
      }));
    }, 2000);
  };

  return (
    <div className="fade-in" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px', alignItems: 'stretch' }}>
      
      {/* Team Contact Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '8px' }}>Direct Contacts</h3>
        {team.map((member) => (
          <div 
            key={member.id} 
            onClick={() => setSelectedContactId(member.id)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              padding: '16px', 
              borderRadius: 'var(--border-radius-sm)', 
              border: `1px solid ${selectedContactId === member.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.05)'}`,
              background: selectedContactId === member.id ? 'rgba(124, 77, 255, 0.08)' : 'rgba(255,255,255,0.01)',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          >
            {/* Avatar Circle */}
            <div style={{ 
              width: '44px', 
              height: '44px', 
              borderRadius: '50%', 
              background: member.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#0b0a14',
              fontSize: '1.1rem',
              flexShrink: 0
            }}>
              {member.name.split(' ').map(n => n[0]).join('')}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {member.name}
              </h4>
              <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{member.role}</span>
              <span style={{ 
                display: 'inline-block', 
                fontSize: '0.75rem', 
                color: member.status === 'Active Now' ? 'var(--accent-success)' : 'var(--text-muted)', 
                marginTop: '4px' 
              }}>
                ● {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Messaging / Direct Chat Panel */}
      <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '520px' }}>
        
        {/* Chat Header */}
        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%', 
              background: activeContact.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              color: '#0b0a14'
            }}>
              {activeContact.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>{activeContact.name}</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{activeContact.role}</span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <a href={`mailto:${activeContact.email}`} title={activeContact.email} style={{ color: 'var(--text-secondary)', hover: { color: 'white' } }}>
              <Mail size={18} />
            </a>
            <a href={`tel:${activeContact.phone}`} title={activeContact.phone} style={{ color: 'var(--text-secondary)' }}>
              <Phone size={18} />
            </a>
          </div>
        </div>

        {/* Message Log */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', paddingRight: '4px', marginBottom: '16px' }}>
          {messages[selectedContactId].map((msg, index) => {
            const isMe = msg.sender === 'me';
            return (
              <div 
                key={index} 
                style={{ 
                  alignSelf: isMe ? 'flex-end' : 'flex-start',
                  maxWidth: '75%',
                  background: isMe ? 'linear-gradient(135deg, var(--accent-primary) 0%, #6200ea 100%)' : 'rgba(255,255,255,0.03)',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  borderTopRightRadius: isMe ? '2px' : '12px',
                  borderTopLeftRadius: isMe ? '12px' : '2px',
                  border: isMe ? 'none' : '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <p style={{ fontSize: '0.92rem', color: 'white' }}>{msg.text}</p>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'right', marginTop: '4px' }}>
                  {msg.time} {isMe && <Check size={10} style={{ display: 'inline', marginLeft: '2px', color: 'var(--accent-secondary)' }} />}
                </span>
              </div>
            );
          })}
          
          {isTyping && (
            <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', paddingLeft: '8px' }}>
              <span className="badge badge-info" style={{ animation: 'pulse 1s infinite', padding: '3px 8px' }}>typing...</span>
              <span>{activeContact.name} is typing</span>
            </div>
          )}
        </div>

        {/* Input Controls */}
        <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '16px' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder={`Message ${activeContact.name.split(' ')[0]}...`}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={isTyping} style={{ padding: '0 24px' }}>
            <Send size={18} />
          </button>
        </form>

      </div>

    </div>
  );
}
