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
  Code,
  Database,
  Cpu,
  RefreshCw,
  GitBranch,
  Layers
} from 'lucide-react'

function App() {
  const [theme, setTheme] = useState('day') // 'day' (Daylight), 'matrix' (Matrix Cyber), 'synthwave' (Synthwave Midnight)
  const [cameraPreset, setCameraPreset] = useState('main')
  const [uiVisible, setUiVisible] = useState(true)
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Archie, your technical lead. Welcome to the technical workspace. We have dedicated Frontend, Backend, and Full Stack cabins ready. What should we audit today?" }
  ])
  const [avatarPose, setAvatarPose] = useState('welcome')
  const [commits, setCommits] = useState([
    { id: 1, text: "feat: implement Tailwind custom tokens", time: "Just now" },
    { id: 2, text: "fix: resolve PostgreSQL connection pool timeout", time: "2m ago" },
    { id: 3, text: "refactor: migrate client requests to react-query", time: "10m ago" }
  ])

  // Periodic random commit generator to make the workspace look active & alive
  useEffect(() => {
    const mockCommits = [
      "feat: optimize R3F render loops and geometries",
      "fix: update Dockerfile multi-stage builds",
      "chore: bump vite plugins and rollup bundle optimizer",
      "docs: document microservices architecture in index.md",
      "feat: add custom webgl shaders to skyline backdrop",
      "fix: patch auth middleware cookie serialization"
    ]
    
    const interval = setInterval(() => {
      const randomMsg = mockCommits[Math.floor(Math.random() * mockCommits.length)]
      setCommits((prev) => [
        { id: Date.now(), text: randomMsg, time: "Just now" },
        ...prev.slice(0, 3)
      ])
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (cameraPreset === 'main') {
      setAvatarPose('welcome')
    } else if (cameraPreset === 'frontend' || cameraPreset === 'server') {
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
    { label: 'Frontend Cabin', value: 'frontend', response: 'Zooming in on the Frontend Developer cabin. Responsive layout design with R3F models, wireframe displays, and performance optimization charts are live here.' },
    { label: 'Backend Cabin', value: 'backend', response: 'Swiveling to the Backend Developer cabin. Blazing fast database schemas, persistent cylinders, and real-time query terminal logs are setup on the monitors.' },
    { label: 'Full Stack Cabin', value: 'fullstack', response: 'Focusing on the Full Stack desk. Blends UI grids with CI/CD build cycles, system architectural layouts, and branching git visual flows.' },
    { label: 'Server Room', value: 'server', response: 'Checking server cabinets. Flashing system LEDs, load balancers, and active server blades monitoring query traffic.' },
    { label: 'Studio Overview', value: 'main', response: 'Resetting to the main overview of our technical dev room workspace...' }
  ]

  const handlePromptSelect = (prompt) => {
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: prompt.label },
      { sender: 'bot', text: prompt.response }
    ])
    setCameraPreset(prompt.value)
  }

  const getThemeAccent = () => {
    if (theme === 'matrix') return '#10b981' // Green
    if (theme === 'synthwave') return '#ec4899' // Pink/Magenta
    return '#06b6d4' // Cyan
  }

  const accentColor = getThemeAccent()

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Canvas */}
      <Canvas shadows camera={{ fov: 45, position: [0, 6.8, 10.0] }}>
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
          background: 'rgba(8, 10, 16, 0.82)',
          color: '#fff',
          border: '1px solid rgba(255, 255, 255, 0.15)',
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

      {/* Left Control Panel */}
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
              <Code size={20} color={accentColor} />
              <h1 style={{ margin: 0, fontSize: '18px', fontWeight: '700', letterSpacing: '-0.025em', color: '#fff' }}>
                entraiot Technical
              </h1>
            </div>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
              Multi-Cabin Developer Workspace
            </p>
          </div>

          {/* Dev Metrics Panel */}
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
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Cpu size={12} /> API Latency
              </span>
              <span style={{ fontSize: '12px', color: accentColor, fontWeight: '700' }} className="tech-font">18ms (Avg)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Database size={12} /> DB Connections
              </span>
              <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '700' }} className="tech-font">10 / 10 active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <RefreshCw size={12} /> Build Status
              </span>
              <span style={{ fontSize: '12px', color: '#38bdf8', fontWeight: '700' }} className="tech-font">Deploy Passing</span>
            </div>
          </div>

          {/* Live Git Commit Stream */}
          <div>
            <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Live Commit Log
            </label>
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              maxHeight: '140px',
              overflowY: 'auto',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              {commits.map((c) => (
                <div key={c.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '11px', color: '#f1f5f9', wordBreak: 'break-word' }} className="tech-font">
                    {c.text}
                  </span>
                  <span style={{ fontSize: '9px', color: '#64748b' }}>{c.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme select controls */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Environment Space
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              <button 
                onClick={() => setTheme('day')}
                style={{
                  background: theme === 'day' ? 'rgba(6, 182, 212, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'day' ? '#06b6d4' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <Sun size={14} color="#06b6d4" />
                Daylight
              </button>
              <button 
                onClick={() => setTheme('matrix')}
                style={{
                  background: theme === 'matrix' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'matrix' ? '#10b981' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <Terminal size={14} color="#10b981" />
                Matrix Cyber
              </button>
              <button 
                onClick={() => setTheme('synthwave')}
                style={{
                  background: theme === 'synthwave' ? 'rgba(236, 72, 153, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'synthwave' ? '#ec4899' : 'rgba(255, 255, 255, 0.08)'),
                  color: '#fff',
                  padding: '8px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  transition: 'all 0.2s'
                }}
              >
                <Tv size={14} color="#ec4899" />
                Synthwave
              </button>
            </div>
          </div>

          {/* Camera Preset Buttons */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Camera Presets
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {[
                { id: 'main', label: 'Overview' },
                { id: 'frontend', label: 'Frontend' },
                { id: 'backend', label: 'Backend' },
                { id: 'fullstack', label: 'Full Stack' },
                { id: 'server', label: 'Server Rack' }
              ].map(p => {
                const isActive = cameraPreset === p.id
                return (
                  <button
                    key={p.id}
                    onClick={() => setCameraPreset(p.id)}
                    style={{
                      background: isActive ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid ' + (isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.06)'),
                      color: isActive ? '#fff' : '#cbd5e1',
                      padding: '8px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '11px',
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

      {/* Guide Bot Chat Overlay */}
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
                Archie Strategy Guide
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

            {/* Prompt Buttons */}
            <div style={{
              padding: '8px 12px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Request Cabin Auditing
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
            Archie Tech Assistant
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
              {messages.filter(m => m.sender === 'bot').slice(-1)[0]?.text || "Need technical workspace audit assistance?"}
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

          {/* Character cartoon avatar */}
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
              alt="Archie Assistant" 
              onLoad={handleImageLoad}
              style={{
                height: '230px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.5))',
                transform: 'scaleX(-1)'
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
