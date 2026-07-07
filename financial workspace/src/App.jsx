import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OfficeScene } from './components/OfficeScene'
import { 
  Sun, 
  Sunset, 
  Coins, 
  Eye, 
  EyeOff, 
  MessageSquare, 
  Sparkles, 
  DollarSign, 
  Activity, 
  Percent, 
  ShieldCheck, 
  TrendingUp, 
  TrendingDown, 
  Building,
  FileText
} from 'lucide-react'

function App() {
  const [theme, setTheme] = useState('bull')
  const [cameraPreset, setCameraPreset] = useState('main')
  
  // UI Panel visibility Toggle state
  const [uiVisible, setUiVisible] = useState(true)

  // Advisor Chatbot State
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Sterling, your corporate financial advisor. Welcome to the company accountant's room. How can I help you inspect our books today?" }
  ])

  const [avatarPose, setAvatarPose] = useState('welcome')

  React.useEffect(() => {
    if (cameraPreset === 'main' || cameraPreset === 'vault') {
      setAvatarPose('welcome')
    } else if (cameraPreset === 'desk') {
      setAvatarPose('pointing')
    } else {
      setAvatarPose('explain')
    }
  }, [cameraPreset])

  const handleImageLoad = (e) => {
    const img = e.target
    if (img.src.startsWith('data:')) return

    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    try {
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imgData.data

      // Convert solid white background pixels to transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        if (r > 240 && g > 240 && b > 240) {
          data[i + 3] = 0 // Transparent alpha
        }
      }

      ctx.putImageData(imgData, 0, 0)
      img.src = canvas.toDataURL()
    } catch (err) {
      console.error("Canvas manipulation failed: ", err)
    }
  }

  const botPrompts = [
    { label: 'Inspect Accountant Desk', value: 'desk', response: 'Zooming in on the accountant desk. Here you can see the tax folders, retro calculator, and the open accounting ledger...' },
    { label: 'Check Cash Vault & Safe', value: 'vault', response: 'Swiveling to the corner vault. The safe holds company reserves, physical bullion, and backup ledgers...' },
    { label: 'Examine Filing Cabinets', value: 'files', response: 'Panning over to the wood cabinets. They store tax filings, client invoices, and transaction receipts...' },
    { label: 'Room Overview', value: 'main', response: 'Resetting to the complete overview of the cozy finance office room...' }
  ]

  const handlePromptSelect = (prompt) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: prompt.label },
      { sender: 'bot', text: prompt.response }
    ])
    setCameraPreset(prompt.value)
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ fov: 45, position: [0, 6.5, 9.5] }}>
        <OfficeScene theme={theme} cameraPreset={cameraPreset} />
      </Canvas>

      {/* Floating Toggle View Button (Top-Right) */}
      <button
        onClick={() => setUiVisible(!uiVisible)}
        className="glass-panel"
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(18, 22, 33, 0.75)',
          color: '#fff',
          border: '1.5px solid rgba(255, 255, 255, 0.15)',
          padding: '12px',
          borderRadius: '50%',
          cursor: 'pointer',
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s'
        }}
        title={uiVisible ? "Enter Full Screen (Hide UI)" : "Exit Full Screen (Show UI)"}
      >
        {uiVisible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>

      {/* Control Panel overlay (Conditional on uiVisible) */}
      {uiVisible && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '20px',
          width: '320px',
          maxHeight: 'calc(100vh - 40px)',
          overflowY: 'auto',
          color: '#f8fafc',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <FileText size={20} color="#10b981" />
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.025em', color: '#fff' }}>
                entraiot Accounting
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
              Corporate Finance & Ledger Office
            </p>
          </div>

          {/* Key Metrics Widgets */}
          <div style={{
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '12px',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', justifyShift: 'space-between', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Corporate Balance</span>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }}>$4,290,415</span>
            </div>
            <div style={{ display: 'flex', justifyShift: 'space-between', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Monthly Flow</span>
              <span style={{ fontSize: '12px', color: '#34d399', fontWeight: '700' }}>+$86,420</span>
            </div>
            <div style={{ display: 'flex', justifyShift: 'space-between', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Audit Status</span>
              <span style={{ fontSize: '11px', color: '#38bdf8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} />
                Balanced (100%)
              </span>
            </div>
          </div>

          {/* Theme select controls */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Office Environment
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button 
                onClick={() => setTheme('bull')}
                style={{
                  background: theme === 'bull' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'bull' ? '#10b981' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  transition: 'all 0.2s'
                }}
              >
                <Sun size={14} color="#10b981" />
                Daylight
              </button>
              <button 
                onClick={() => setTheme('bear')}
                style={{
                  background: theme === 'bear' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'bear' ? '#ef4444' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  transition: 'all 0.2s'
                }}
              >
                <Sunset size={14} color="#ef4444" />
                Night Cozy
              </button>
              <button 
                onClick={() => setTheme('gold')}
                style={{
                  background: theme === 'gold' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'gold' ? '#fbbf24' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '11px',
                  transition: 'all 0.2s'
                }}
              >
                <Coins size={14} color="#fbbf24" />
                Cyber Gold
              </button>
            </div>
          </div>

          {/* Camera Preset Quick Navigations */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Station Camera Hotkeys
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {[
                { id: 'main', label: 'Cozy Room Overview' },
                { id: 'desk', label: "Accountant's Desk" },
                { id: 'vault', label: 'Reserve safe Box' },
                { id: 'files', label: 'Filing Cabinet Storage' }
              ].map(p => {
                const isActive = cameraPreset === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setCameraPreset(p.id)}
                    style={{
                      width: '100%',
                      background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid ' + (isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'),
                      color: isActive ? '#fff' : '#cbd5e1',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
                      textAlign: 'left',
                      fontWeight: isActive ? '600' : '400',
                      transition: 'all 0.15s'
                    }}
                    onMouseEnter={(e) => !isActive && (e.target.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => !isActive && (e.target.style.background = 'rgba(255,255,255,0.03)')}
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE TOUR GUIDE CHATBOT OVERLAY (Conditional on uiVisible) */}
      {uiVisible && (
        chatOpen ? (
          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '350px',
            height: '420px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 20,
            color: '#f8fafc',
            overflow: 'hidden'
          }}>
            {/* Chat Header */}
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.08)',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '13px' }}>
                <Sparkles size={14} color="#10b981" />
                Financial Advisor Bot
              </div>
              <button 
                onClick={() => setChatOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Hide
              </button>
            </div>

            {/* Chat Message Stream */}
            <div style={{
              flex: 1,
              padding: '12px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {messages.map((m, idx) => (
                <div 
                  key={idx}
                  style={{
                    alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '80%',
                    background: m.sender === 'user' ? '#10b981' : 'rgba(255,255,255,0.05)',
                    border: m.sender === 'user' ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    padding: '8px 12px',
                    borderRadius: m.sender === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    fontSize: '11px',
                    lineHeight: '1.4'
                  }}
                >
                  {m.text}
                </div>
              ))}
            </div>

            {/* Guide Quick Prompt Buttons */}
            <div style={{
              padding: '8px 12px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Ask Sterling to show room
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {botPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePromptSelect(p)}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: '#fff',
                      borderRadius: '16px',
                      padding: '4px 8px',
                      fontSize: '10px',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.target.style.background = 'rgba(255,255,255,0.04)'}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setChatOpen(true)}
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '20px',
              right: '20px',
              background: 'rgba(16, 185, 129, 0.85)',
              color: '#fff',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '24px',
              cursor: 'pointer',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              fontWeight: '600'
            }}
          >
            <MessageSquare size={16} />
            Sterling Advisor Guide
          </button>
        )
      )}

      {/* 2D Office Assistant Avatar Character */}
      {uiVisible && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: chatOpen ? '390px' : '230px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 20,
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          width: '220px'
        }}>
          {/* Speech Bubble */}
          <div style={{
            position: 'relative',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1.5px solid rgba(16, 185, 129, 0.5)',
            borderRadius: '16px',
            padding: '10px 14px',
            color: '#fff',
            fontSize: '11px',
            lineHeight: '1.4',
            textAlign: 'center',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto',
            width: '100%',
            boxSizing: 'border-box',
            marginBottom: '12px'
          }}>
            <p style={{ margin: 0 }}>
              {messages.filter(m => m.sender === 'bot').slice(-1)[0]?.text || "Need help touring the office?"}
            </p>
            {/* Bubble Tail pointing down */}
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'rgba(15, 23, 42, 0.95)',
              borderRight: '1.5px solid rgba(16, 185, 129, 0.5)',
              borderBottom: '1.5px solid rgba(16, 185, 129, 0.5)'
            }} />
          </div>

          {/* Waving Assistant Cartoon Character Container to crop bottom stand */}
          <div style={{ 
            height: '215px', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'flex-start',
            pointerEvents: 'auto',
            marginBottom: '15px'
          }}>
            <img 
              src={avatarPose === 'welcome' ? import.meta.env.BASE_URL + 'office_assistant.png' : avatarPose === 'pointing' ? import.meta.env.BASE_URL + 'assistant_pointing.png' : import.meta.env.BASE_URL + 'assistant_explain.png'} 
              alt="Office Guide" 
              onLoad={handleImageLoad}
              style={{
                height: '230px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
                transform: 'scaleX(-1)' // face towards the center
              }}
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default App
