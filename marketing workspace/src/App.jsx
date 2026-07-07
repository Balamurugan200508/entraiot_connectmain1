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
  Target,
  Megaphone,
  Share2,
  Users
} from 'lucide-react'

function App() {
  const [theme, setTheme] = useState('day') // 'day' (Daylight), 'sunset' (Night Cozy), 'cyber' (Cyber Gold)
  const [cameraPreset, setCameraPreset] = useState('main')
  const [uiVisible, setUiVisible] = useState(true)
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hey! I'm Nova, your creative marketing strategist. Welcome to the marketing agency room. Ready to viral-launch our next campaign?" }
  ])

  const [avatarPose, setAvatarPose] = useState('welcome')

  React.useEffect(() => {
    if (cameraPreset === 'main' || cameraPreset === 'lounge') {
      setAvatarPose('welcome')
    } else if (cameraPreset === 'desk' || cameraPreset === 'whiteboard') {
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
    { label: 'Creative Workstation', value: 'desk', response: 'Zooming in on the main workstation. Here, our designers shape brand aesthetics with drawing tablets and dual high-res monitors...' },
    { label: 'Campaign Pitch Board', value: 'whiteboard', response: 'Focusing on the presentation board. Here we map demographics, pitch concepts, and structure the viral flow...' },
    { label: 'Social Metrics Monitor', value: 'monitors', response: 'Swiveling to the active social rack. It tracks live Instagram hearts, YouTube impressions, and trending campaign indexes...' },
    { label: 'Brainstorming Lounge', value: 'lounge', response: 'Panning over to the purple lounge. This cozy spot is where we gather for coffee and freeform creative brainstorming sessions...' },
    { label: 'Studio Overview', value: 'main', response: 'Resetting to the overview of our creative marketing studio workspace...' }
  ]

  const handlePromptSelect = (prompt) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: prompt.label },
      { sender: 'bot', text: prompt.response }
    ])
    setCameraPreset(prompt.value)
  }

  // Get active color based on theme
  const getThemeAccent = () => {
    if (theme === 'sunset') return '#ef4444' // Night Cozy (Red)
    if (theme === 'cyber') return '#fbbf24' // Cyber Gold (Gold)
    return '#10b981' // Daylight (Green)
  }

  const accentColor = getThemeAccent()

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
              <Megaphone size={20} color={accentColor} />
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.025em', color: '#fff' }}>
                entraiot Marketing
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
              Creative Agency & Campaign Studio
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
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Ad ROI</span>
              <span style={{ fontSize: '12px', color: accentColor, fontWeight: '700' }}>4.8x Return</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Conversions</span>
              <span style={{ fontSize: '12px', color: theme === 'sunset' ? '#ef4444' : '#34d399', fontWeight: '700' }}>18,420 (+12.4%)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase' }}>Monthly Ad Spend</span>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '700' }}>$34,200</span>
            </div>
          </div>

          {/* Theme select controls */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Office Environment
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button 
                onClick={() => setTheme('day')}
                style={{
                  background: theme === 'day' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'day' ? '#10b981' : 'rgba(255, 255, 255, 0.08)'),
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
                onClick={() => setTheme('sunset')}
                style={{
                  background: theme === 'sunset' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'sunset' ? '#ef4444' : 'rgba(255, 255, 255, 0.08)'),
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
                onClick={() => setTheme('cyber')}
                style={{
                  background: theme === 'cyber' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'cyber' ? '#fbbf24' : 'rgba(255, 255, 255, 0.08)'),
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
                { id: 'main', label: 'Studio Overview' },
                { id: 'desk', label: 'Creative Workstation' },
                { id: 'whiteboard', label: 'Campaign Pitch Board' },
                { id: 'monitors', label: 'Social Metrics Monitor' },
                { id: 'lounge', label: 'Brainstorming Lounge' }
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
                  >
                    {p.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tour Guide Chatbot Overlay */}
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
                <Sparkles size={14} color={accentColor} />
                Nova Strategy Bot
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
                    background: m.sender === 'user' ? accentColor : 'rgba(255,255,255,0.05)',
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
                Ask Nova to tour the studio
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
              background: accentColor,
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
            Nova Strategy Guide
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
            background: 'rgba(10, 12, 18, 0.95)',
            border: '1.5px solid ' + accentColor,
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
              {messages.filter(m => m.sender === 'bot').slice(-1)[0]?.text || "Need marketing strategy insights?"}
            </p>
            <div style={{
              position: 'absolute',
              bottom: '-6px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'rgba(10, 12, 18, 0.95)',
              borderRight: '1.5px solid ' + accentColor,
              borderBottom: '1.5px solid ' + accentColor
            }} />
          </div>

          {/* Waving Assistant Cartoon Character */}
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

      {/* Navigation Tips overlay at bottom center */}
      {uiVisible && (
        <div className="glass-panel" style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 16px',
          fontSize: '11px',
          color: '#94a3b8',
          pointerEvents: 'none',
          zIndex: 10
        }}>
          Left Click + Drag to rotate | Right Click + Drag to pan | Scroll to zoom
        </div>
      )}

    </div>
  )
}

export default App
