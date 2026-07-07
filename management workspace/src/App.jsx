import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OfficeScene } from './components/OfficeScene'
import { Sun, Sunset, Moon, Monitor, Users, Compass, Eye, Coffee, ShieldAlert, CodeXml, UserCheck, MessageSquare, Send, Sparkles, EyeOff } from 'lucide-react'

function App() {
  const [theme, setTheme] = useState('day')
  const [cameraPreset, setCameraPreset] = useState('main')
  const [hoveredStaff, setHoveredStaff] = useState(null)
  
  // UI Full Screen visibility Toggle state
  const [uiVisible, setUiVisible] = useState(true)

  // Interactive Meeting Scheduler States
  const [meetingModalOpen, setMeetingModalOpen] = useState(false)
  const [meetingDate, setMeetingDate] = useState('')
  const [meetingTime, setMeetingTime] = useState('')
  const [meetingPlatform, setMeetingPlatform] = useState('google')
  const [scheduledMeeting, setScheduledMeeting] = useState(null)
  const [meetingActive, setMeetingActive] = useState(false)

  // Receptionist Chatbot State
  const [chatOpen, setChatOpen] = useState(true)
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm Entra Bot, your office guide. How can I help you navigate the headquarters today?" }
  ])

  const [avatarPose, setAvatarPose] = useState('welcome')

  React.useEffect(() => {
    if (cameraPreset === 'main' || cameraPreset === 'meeting') {
      setAvatarPose('welcome')
    } else if (cameraPreset === 'ceo' || cameraPreset === 'cto' || cameraPreset === 'md') {
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
        // If it's a solid white background pixel
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

  // Dynamically computed staff statuses based on meeting status
  const staffData = (() => {
    const defaultData = {
      ceo: { role: 'CEO / Founder', task: 'Reviewing quarterly roadmaps & investor decks' },
      cto: { role: 'CTO / Co-Founder', task: 'Profiling GPU compute workloads & server loads' },
      md: { role: 'Managing Director', task: 'Conducting market expansion & operations alignment' },
      hr: { role: 'HR Director', task: 'Reviewing employee policies & onboarding new hires' }
    }

    if (meetingActive) {
      return {
        ceo: { role: 'CEO / Founder', task: '🔴 In Meeting: Leading corporate alignment discussion' },
        cto: { role: 'CTO / Co-Founder', task: '🔴 In Meeting: Presenting GPU infrastructure demo' },
        md: { role: 'Managing Director', task: '🔴 In Meeting: Discussing scaling & operations budget' },
        hr: { role: 'HR Director', task: '🔴 In Meeting: Discussing workplace culture & staffing plan' }
      }
    }

    if (scheduledMeeting) {
      return {
        ceo: { role: 'CEO / Founder', task: `📅 Preparing for meeting at ${scheduledMeeting.time} (Reviewing agenda)` },
        cto: { role: 'CTO / Co-Founder', task: `📅 Preparing for meeting at ${scheduledMeeting.time} (Compiling demo)` },
        md: { role: 'Managing Director', task: `📅 Preparing for meeting at ${scheduledMeeting.time} (Formatting reports)` },
        hr: { role: 'HR Director', task: `📅 Preparing for meeting at ${scheduledMeeting.time} (Reviewing HR logs)` }
      }
    }

    return defaultData
  })()

  // Tour Guide Queries
  const botPrompts = [
    { label: 'Take me to the Meeting Room', value: 'meeting', response: 'Right away! The glass conference/meeting room is situated on the left side of the floor. Changing perspective...' },
    { label: 'Take me to the CEO', value: 'ceo', response: 'Certainly! The CEO is in the Corner Executive Suite planning the project roadmap. Rotating camera...' },
    { label: 'Show me the server room/CTO', value: 'cto', response: 'Sure thing. The CTO is running shader tests next to the server racks. Adjusting views...' },
    { label: 'Take me to the HR Room', value: 'hr', response: 'The HR Room & department are located at the front-right of the floor. Adjusting camera...' },
    { label: 'Open Workspace Overview', value: 'main', response: 'Here is the bird-eye view of the open corporate headquarters. Zooming out...' }
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
      <Canvas shadows camera={{ fov: 45, position: [0, 18, 25] }}>
        <OfficeScene 
          theme={theme} 
          cameraPreset={cameraPreset} 
          onSelectPreset={setCameraPreset} 
          onWhiteboardClick={() => setMeetingModalOpen(true)} 
          meetingActive={meetingActive}
        />
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
            <h1 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.025em', color: '#fff' }}>
              entraiot solution Headquarters
            </h1>
            <p style={{ margin: 0, fontSize: '11px', color: '#94a3b8' }}>
              Interactive 3D Multi-Suite Studio
            </p>
          </div>

          {/* Theme select controls */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Environment Lighting
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              <button 
                onClick={() => setTheme('day')}
                style={{
                  background: theme === 'day' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'day' ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.08)'),
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
                <Sun size={14} color="#fbbf24" />
                Daylight
              </button>
              <button 
                onClick={() => setTheme('sunset')}
                style={{
                  background: theme === 'sunset' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid ' + (theme === 'sunset' ? 'rgba(255,255,255,0.3)' : 'rgba(255, 255, 255, 0.08)'),
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
                <Sunset size={14} color="#f97316" />
                Sunset
              </button>
            </div>
          </div>


          {/* Staff details list */}
          <div>
            <label style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', display: 'block', marginBottom: '8px' }}>
              Interactive Directory
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.keys(staffData).map((key) => {
                const staff = staffData[key]
                return (
                  <div 
                    key={key}
                    onMouseEnter={() => setHoveredStaff(key)}
                    onMouseLeave={() => setHoveredStaff(null)}
                    style={{
                      padding: '8px 10px',
                      background: hoveredStaff === key ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.02)',
                      border: '1px solid ' + (hoveredStaff === key ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)'),
                      borderRadius: '8px',
                      transition: 'all 0.2s',
                      cursor: 'default'
                    }}
                  >
                    {staff.name && <div style={{ fontWeight: '600', fontSize: '11px' }}>{staff.name}</div>}
                    <div style={{ fontSize: '9px', color: '#38bdf8', marginBottom: '1px' }}>{staff.role}</div>
                    <div style={{ fontSize: '9px', color: '#94a3b8' }}>{staff.task}</div>
                  </div>
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
                <Sparkles size={14} color="#38bdf8" />
                Entra Bot
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
                    background: m.sender === 'user' ? '#0284c7' : 'rgba(255,255,255,0.05)',
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
                Ask Entra Bot to show room
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
              background: 'rgba(2, 132, 199, 0.85)',
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
            Entra Bot Guide
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
            border: '1.5px solid rgba(56, 189, 248, 0.5)',
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
              borderRight: '1.5px solid rgba(56, 189, 248, 0.5)',
              borderBottom: '1.5px solid rgba(56, 189, 248, 0.5)'
            }} />
          </div>

          {/* Waving Assistant Cartoon Character Container to crop bottom stand */}
          <div style={{ 
            height: '215px', 
            overflow: 'hidden', 
            display: 'flex', 
            alignItems: 'flex-start' 
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

      {/* Interactive Meeting Scheduling Modal (Glassmorphic) */}
      {meetingModalOpen && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(15, 23, 42, 0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}>
          {/* Glassmorphic Panel */}
          <div style={{
            width: '380px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '16px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            padding: '24px',
            boxSizing: 'border-box',
            animation: 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: '700', color: '#fff' }}>Schedule a Room Meeting</h2>
              <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>Select a date, time, and preferred platform.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: '600' }}>Meeting Date</label>
              <input 
                type="date" 
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  colorScheme: 'dark' // Forces native picker to render with light text/numbers on dark background
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: '600' }}>Meeting Time</label>
              <input 
                type="time" 
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '13px',
                  outline: 'none',
                  colorScheme: 'dark' // Forces native picker to render with light text/numbers on dark background
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: '600' }}>Platform</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <button
                  onClick={() => setMeetingPlatform('google')}
                  style={{
                    background: meetingPlatform === 'google' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255,255,255,0.03)',
                    border: '1.5px solid ' + (meetingPlatform === 'google' ? '#38bdf8' : 'rgba(255,255,255,0.08)'),
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  Google Meet
                </button>
                <button
                  onClick={() => setMeetingPlatform('zoom')}
                  style={{
                    background: meetingPlatform === 'zoom' ? 'rgba(2, 132, 199, 0.25)' : 'rgba(255,255,255,0.03)',
                    border: '1.5px solid ' + (meetingPlatform === 'zoom' ? '#38bdf8' : 'rgba(255,255,255,0.08)'),
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600',
                    transition: 'all 0.2s'
                  }}
                >
                  Zoom Meet
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <button
                onClick={() => setMeetingModalOpen(false)}
                style={{
                  flex: 1,
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#94a3b8',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!meetingDate || !meetingTime) {
                    alert('Please select both date and time!')
                    return
                  }
                  
                  // Format 24-hour time to 12-hour format with AM/PM
                  const formatTime12h = (time24) => {
                    const [hoursStr, minutesStr] = time24.split(':')
                    let hours = parseInt(hoursStr, 10)
                    const minutes = minutesStr
                    const ampm = hours >= 12 ? 'PM' : 'AM'
                    hours = hours % 12
                    hours = hours ? hours : 12 // 0 should be 12
                    return `${hours}:${minutes} ${ampm}`
                  }

                  const platformName = meetingPlatform === 'google' ? 'Google Meet' : 'Zoom Meet'
                  const formattedTime = formatTime12h(meetingTime)
                  
                  setScheduledMeeting({ date: meetingDate, time: formattedTime, platform: platformName })
                  setMeetingModalOpen(false)
                  setMessages((prev) => [
                    ...prev,
                    { sender: 'bot', text: `📅 Meeting Scheduled! I've reserved the room for a ${platformName} call on ${meetingDate} at ${formattedTime}.` }
                  ])
                }}
                style={{
                  flex: 1,
                  background: '#0284c7',
                  border: 'none',
                  color: '#fff',
                  padding: '10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scheduled Meeting Toast/Banner feedback in top center */}
      {scheduledMeeting && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 18px',
          zIndex: 50,
          color: '#fff',
          fontSize: '12px',
          border: '1.5px solid #22c55e',
          borderRadius: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'rgba(15, 23, 42, 0.85)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
        }}>
          <span style={{ 
            display: 'inline-block', 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            background: meetingActive ? '#ef4444' : '#22c55e',
            animation: meetingActive ? 'pulse 1.5s infinite' : 'none'
          }}></span>
          <span>
            {meetingActive ? (
              <span><strong>{scheduledMeeting.platform}</strong> is <strong>LIVE</strong></span>
            ) : (
              <span>Meeting booked: <strong>{scheduledMeeting.platform}</strong> at {scheduledMeeting.time}</span>
            )}
          </span>
          
          {/* Start/Stop Simulation button */}
          <button
            onClick={() => {
              const nextState = !meetingActive
              setMeetingActive(nextState)
              setMessages((prev) => [
                ...prev,
                { 
                  sender: 'bot', 
                  text: nextState 
                    ? `📢 Broadcast: Meeting is now LIVE! Hologram project stream has initialized.` 
                    : `📢 Broadcast: Meeting has concluded. Teams are returning to local tasks.` 
                }
              ])
            }}
            style={{
              background: meetingActive ? 'rgba(239, 68, 68, 0.2)' : 'rgba(34, 197, 94, 0.2)',
              border: '1px solid ' + (meetingActive ? '#ef4444' : '#22c55e'),
              borderRadius: '12px',
              color: '#fff',
              fontSize: '10px',
              padding: '2px 8px',
              cursor: 'pointer',
              fontWeight: '600',
              marginLeft: '4px'
            }}
          >
            {meetingActive ? 'Stop Meet' : 'Start Meet'}
          </button>

          <button 
            onClick={() => {
              setScheduledMeeting(null)
              setMeetingActive(false)
            }}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginLeft: '6px' }}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  )
}

export default App
