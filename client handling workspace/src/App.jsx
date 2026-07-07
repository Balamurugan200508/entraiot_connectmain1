import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OfficeScene } from './components/OfficeScene'
import { 
  Sun, 
  Terminal, 
  Tv, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Sparkles, 
  TrendingUp,
  Clock,
  Layers,
  Send,
  User,
  ChevronRight,
  PlusCircle,
  HelpCircle,
  Activity,
  Check,
  Building,
  Briefcase
} from 'lucide-react'

export default function App() {
  const [theme, setTheme] = useState('day') // 'day' (Daylight), 'cozy' (Night Cozy), 'gold' (Cyber Gold)
  const [cameraPreset, setCameraPreset] = useState('main')
  const [uiVisible, setUiVisible] = useState(true)
  const [activePanel, setActivePanel] = useState('situation') // 'situation' (project situation), 'queries' (support tickets)
  
  // Direct Chat states
  const [activeContactId, setActiveContactId] = useState('pm')
  const [chatInput, setChatInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [chatMessages, setChatMessages] = useState({
    ceo: [
      { sender: 'them', text: "Hello Acme Corp! Vikram here. I'm currently in a sync meeting. Let me know if there are any contract or roadmap concerns.", time: 'Yesterday' }
    ],
    pm: [
      { sender: 'them', text: "Hi! Neha here. Tracking sprint 3 items. Core database optimizations are complete. How can I help you?", time: '10:00 AM' }
    ],
    tech_lead: [
      { sender: 'them', text: "Hey! Arun here. Debugging Cognito tokens on staging. Found a routing delay, fixing it now.", time: '11:00 AM' }
    ],
    hr: [
      { sender: 'them', text: "Hi, Priya here. Let me know if you need to talk about billing terms or resource allocations.", time: 'June 05, 2026' }
    ]
  })

  // Support Tickets State
  const [tickets, setTickets] = useState([
    { id: 'TCK-401', title: 'Cognito authentication sync lag', category: 'Bug', status: 'Open', date: 'June 09, 2026' },
    { id: 'TCK-398', title: 'Apply Pay gateway addition', category: 'Feature', status: 'Pending Review', date: 'June 07, 2026' }
  ])
  const [newTicketTitle, setNewTicketTitle] = useState('')

  const teamMembers = {
    ceo: { name: 'Vikram Malhotra', role: 'CEO', avatarColor: '#ff1744', reply: "Thank you for the message. I have forwarded this note to Neha and Arun for review. We will address this in our daily standup." },
    pm: { name: 'Neha Patel', role: 'Project Manager', avatarColor: '#fbbf24', reply: "Got it! I will update our project timeline and assign dev tasks. I expect a staging update by tomorrow evening." },
    tech_lead: { name: 'Arun Kumar', role: 'Lead Architect', avatarColor: '#00e676', reply: "Acknowledged. Let me look into the logs for this right now and push a hotfix to our beta cluster." },
    hr: { name: 'Priya Sharma', role: 'HR Director', avatarColor: '#00e5ff', reply: "Message received. I will check our resource count sheet and invoice logs and email you the summary." }
  }

  // Update active contact based on camera view changes
  useEffect(() => {
    if (cameraPreset === 'ceo') setActiveContactId('ceo')
    else if (cameraPreset === 'pm') setActiveContactId('pm')
    else if (cameraPreset === 'tech_lead') setActiveContactId('tech_lead')
    else if (cameraPreset === 'hr') setActiveContactId('hr')
  }, [cameraPreset])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMsg = {
      sender: 'me',
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setChatMessages(prev => ({
      ...prev,
      [activeContactId]: [...prev[activeContactId], userMsg]
    }))

    const contactReply = teamMembers[activeContactId].reply
    const targetContact = activeContactId
    setChatInput('')
    setIsTyping(true)

    // Simulate avatar response
    setTimeout(() => {
      setIsTyping(false)
      const replyMsg = {
        sender: 'them',
        text: contactReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages(prev => ({
        ...prev,
        [targetContact]: [...prev[targetContact], replyMsg]
      }))
    }, 2000)
  }

  const handleCreateTicket = (e) => {
    e.preventDefault()
    if (!newTicketTitle.trim()) return
    const newT = {
      id: `TCK-${Math.floor(400 + Math.random() * 500)}`,
      title: newTicketTitle,
      category: 'Question',
      status: 'Open',
      date: 'Just now'
    }
    setTickets([newT, ...tickets])
    setNewTicketTitle('')
  }

  const getThemeAccent = () => {
    if (theme === 'matrix') return '#10b981' // Green
    if (theme === 'synthwave') return '#ec4899' // Pink
    return '#7c4dff' // Violet
  }

  const getAccentClass = (btnType) => {
    if (btnType === 'day') return theme === 'day' ? 'env-btn active-day' : 'env-btn'
    if (btnType === 'cozy') return theme === 'cozy' ? 'env-btn active-cozy' : 'env-btn'
    if (btnType === 'gold') return theme === 'gold' ? 'env-btn active-gold' : 'env-btn'
    return 'env-btn'
  }

  const accentColor = getThemeAccent()

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Canvas Office Scene */}
      <Canvas shadows camera={{ fov: 45, position: [0, 6.8, 10.0] }}>
        <OfficeScene theme={theme} cameraPreset={cameraPreset} />
      </Canvas>

      {/* Toggle UI button */}
      <button
        onClick={() => setUiVisible(!uiVisible)}
        className="glass-panel"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(15, 18, 26, 0.86)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          padding: '12px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {uiVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>

      {/* Left Control Panel designed to match screenshot exactly */}
      {uiVisible && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '24px',
          width: '350px',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          color: '#f8fafc',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Brand Header */}
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: '700', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Briefcase size={22} color="#10b981" /> entraiot Client
            </h1>
            <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Corporate Client & Operations Space</p>
          </div>

          {/* Corporate / Project Metrics Card */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Corporate Balance</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '700' }} className="tech-font">$4,290,415</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Monthly Flow</span>
              <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '700' }} className="tech-font">+$86,420</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Audit Status</span>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
                Balanced (100%)
              </span>
            </div>
          </div>

          {/* Office Environment Controls */}
          <div>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Office Environment
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <button 
                onClick={() => setTheme('day')}
                className={getAccentClass('day')}
              >
                <Sun size={15} />
                Daylight
              </button>
              <button 
                onClick={() => setTheme('cozy')}
                className={getAccentClass('cozy')}
              >
                <Tv size={15} />
                Night Cozy
              </button>
              <button 
                onClick={() => setTheme('gold')}
                className={getAccentClass('gold')}
              >
                <Terminal size={15} />
                Cyber Gold
              </button>
            </div>
          </div>

          {/* Camera Hotkeys styled as full-width list cards matching the screenshot */}
          <div>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '10px', fontWeight: '600' }}>
              Station Camera Hotkeys
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { id: 'main', label: 'Cozy Room Overview' },
                { id: 'ceo', label: "CEO's Executive Cabin" },
                { id: 'pm', label: 'Project Manager Desk' },
                { id: 'tech_lead', label: 'Tech Lead Station' },
                { id: 'hr', label: 'HR Office Desk' }
              ].map(p => {
                const isActive = cameraPreset === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setCameraPreset(p.id)}
                    style={{
                      width: '100%',
                      background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.01)',
                      border: '1px solid ' + (isActive ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.03)'),
                      color: isActive ? '#fff' : '#cbd5e1',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: isActive ? '600' : '400',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Right Guide Bot / Chat Overlay Panel */}
      {uiVisible && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          width: '360px',
          height: '430px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 20,
          color: '#f8fafc',
          overflow: 'hidden'
        }}>
          {/* Chat Header */}
          <div style={{
            padding: '14px 18px',
            background: 'rgba(255,255,255,0.03)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '13px' }}>
              <Sparkles size={14} color="#10b981" />
              Financial Advisor Bot
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Active</span>
          </div>

          {/* Chat Message Stream */}
          <div style={{
            flex: 1,
            padding: '14px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {chatMessages[activeContactId].map((m, idx) => (
              <div 
                key={idx}
                style={{
                  alignSelf: m.sender === 'me' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  background: m.sender === 'me' ? '#10b981' : 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'me' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                  fontSize: '11.5px',
                  lineHeight: '1.4'
                }}
              >
                {m.text}
              </div>
            ))}
            {isTyping && (
              <div style={{ fontSize: '10px', color: '#64748b' }}>Sterling is typing...</div>
            )}
          </div>

          {/* Prompt Buttons / Room Actions matching bottom section of screenshot */}
          <div style={{
            padding: '10px 14px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            background: 'rgba(0,0,0,0.1)'
          }}>
            <div style={{ fontSize: '9.5px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px', fontWeight: '600' }}>
              Ask Sterling to Show Room
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {[
                { label: 'Inspect Accountant Desk', val: 'pm' },
                { label: 'Check Cash Vault & Safe', val: 'ceo' },
                { label: 'Examine Filing Cabinets', val: 'tech_lead' },
                { label: 'Room Overview', val: 'main' }
              ].map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCameraPreset(p.val)
                    setActiveContactId(p.val === 'main' ? 'pm' : p.val)
                  }}
                  style={{
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    color: '#10b981',
                    borderRadius: '16px',
                    padding: '6px 12px',
                    fontSize: '10px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input field */}
          <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '8px', padding: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <input
              type="text"
              placeholder="Message Sterling..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '8px 12px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '6px',
                color: '#fff',
                outline: 'none',
                fontSize: '11px'
              }}
            />
            <button type="submit" style={{ background: '#10b981', border: 'none', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', color: '#fff' }}>
              <Send size={12} />
            </button>
          </form>
        </div>
      )}

      {/* Guide text overlay bottom center */}
      {uiVisible && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 16px',
          fontSize: '11px',
          color: '#94a3b8',
          background: 'rgba(15, 18, 26, 0.86)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '24px',
          zIndex: 10
        }}>
          Left Click + Drag to rotate | Right Click + Drag to pan | Scroll to zoom
        </div>
      )}

    </div>
  )
}
