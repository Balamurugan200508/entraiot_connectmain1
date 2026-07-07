import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHome from './components/DashboardHome';
import MetricsSummary from './components/MetricsSummary';
import DeveloperChatbot from './components/DeveloperChatbot';

import ReportsPanel from './components/ReportsPanel';
import DeveloperActivities from './components/DeveloperActivities';
import CollaborationHub from './components/CollaborationHub';
import ProjectsManager from './components/ProjectsManager';
import { Terminal, Shield, Bell, RefreshCw, X, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [toasts, setToasts] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [introPlayed, setIntroPlayed] = useState(false);
  const [showSlide1, setShowSlide1] = useState(false);
  const [slide1Finished, setSlide1Finished] = useState(false);
  const [showSlide2, setShowSlide2] = useState(false);
  const [slide2Finished, setSlide2Finished] = useState(false);
  const [showSlide3, setShowSlide3] = useState(false);
  const [slide3Finished, setSlide3Finished] = useState(false);
  const [showSlide4, setShowSlide4] = useState(false);
  const [slide4Finished, setSlide4Finished] = useState(false);
  const [showSlide5, setShowSlide5] = useState(false);
  const [slide5Finished, setSlide5Finished] = useState(false);
  const [isIntroMuted, setIsIntroMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const introVideoRef = useRef(null);
  const slide1VideoRef = useRef(null);
  const slide2VideoRef = useRef(null);
  const slide3VideoRef = useRef(null);
  const slide4VideoRef = useRef(null);
  const slide5VideoRef = useRef(null);
  const prevTabRef = useRef(activeTab);

  // Auto-play unmuted or fallback to muted play on load for intro video (runs after interaction)
  useEffect(() => {
    if (hasInteracted) {
      console.log("Interaction detected. Setting up intro timers...");
      
      const backupTimer = setTimeout(() => {
        console.log("Intro backup timer fired.");
        handleIntroEnded();
      }, 10000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (introVideoRef.current) {
          introVideoRef.current.muted = false;
          introVideoRef.current.play()
            .then(() => setIsIntroMuted(false))
            .catch(err => {
              console.log('Unmuted autoplay blocked, falling back to muted:', err);
              if (introVideoRef.current) {
                introVideoRef.current.muted = true;
                introVideoRef.current.play()
                  .then(() => setIsIntroMuted(true))
                  .catch(e => console.log('Autoplay completely blocked:', e));
              }
            });

          durationHandler = () => {
            const seconds = introVideoRef.current ? introVideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 500;
            activeTimer.current = setTimeout(() => {
              handleIntroEnded();
            }, ms);
          };

          if (introVideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            introVideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (introVideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (introVideoRef.current && durationHandler) {
          introVideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [hasInteracted]);

  // Autoplay slide 1 video when it becomes active (unmuted)
  useEffect(() => {
    if (showSlide1) {
      const backupTimer = setTimeout(() => {
        handleSlide1Ended();
      }, 8000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (slide1VideoRef.current) {
          slide1VideoRef.current.muted = false;
          slide1VideoRef.current.play().catch(err => {
            console.log('Slide 1 autoplay unmuted blocked, falling back to muted:', err);
            if (slide1VideoRef.current) {
              slide1VideoRef.current.muted = true;
              slide1VideoRef.current.play().catch(e => console.log('Muted slide 1 failed:', e));
            }
          });

          durationHandler = () => {
            const seconds = slide1VideoRef.current ? slide1VideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 1000;
            activeTimer.current = setTimeout(() => {
              handleSlide1Ended();
            }, ms);
          };

          if (slide1VideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            slide1VideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (slide1VideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (slide1VideoRef.current && durationHandler) {
          slide1VideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [showSlide1]);

  // Autoplay slide 2 video when it becomes active (unmuted)
  useEffect(() => {
    if (showSlide2) {
      const backupTimer = setTimeout(() => {
        handleSlide2Ended();
      }, 8000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (slide2VideoRef.current) {
          slide2VideoRef.current.muted = false;
          slide2VideoRef.current.play().catch(err => {
            console.log('Slide 2 autoplay unmuted blocked, falling back to muted:', err);
            if (slide2VideoRef.current) {
              slide2VideoRef.current.muted = true;
              slide2VideoRef.current.play().catch(e => console.log('Muted slide 2 failed:', e));
            }
          });

          durationHandler = () => {
            const seconds = slide2VideoRef.current ? slide2VideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 1000;
            activeTimer.current = setTimeout(() => {
              handleSlide2Ended();
            }, ms);
          };

          if (slide2VideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            slide2VideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (slide2VideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (slide2VideoRef.current && durationHandler) {
          slide2VideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [showSlide2]);

  // Autoplay slide 3 video when it becomes active (unmuted)
  useEffect(() => {
    if (showSlide3) {
      const backupTimer = setTimeout(() => {
        handleSlide3Ended();
      }, 8000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (slide3VideoRef.current) {
          slide3VideoRef.current.muted = false;
          slide3VideoRef.current.play().catch(err => {
            console.log('Slide 3 autoplay unmuted blocked, falling back to muted:', err);
            if (slide3VideoRef.current) {
              slide3VideoRef.current.muted = true;
              slide3VideoRef.current.play().catch(e => console.log('Muted slide 3 failed:', e));
            }
          });

          durationHandler = () => {
            const seconds = slide3VideoRef.current ? slide3VideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 1000;
            activeTimer.current = setTimeout(() => {
              handleSlide3Ended();
            }, ms);
          };

          if (slide3VideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            slide3VideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (slide3VideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (slide3VideoRef.current && durationHandler) {
          slide3VideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [showSlide3]);

  // Autoplay slide 4 video when it becomes active (unmuted)
  useEffect(() => {
    if (showSlide4) {
      const backupTimer = setTimeout(() => {
        handleSlide4Ended();
      }, 8000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (slide4VideoRef.current) {
          slide4VideoRef.current.muted = false;
          slide4VideoRef.current.play().catch(err => {
            console.log('Slide 4 autoplay unmuted blocked, falling back to muted:', err);
            if (slide4VideoRef.current) {
              slide4VideoRef.current.muted = true;
              slide4VideoRef.current.play().catch(e => console.log('Muted slide 4 failed:', e));
            }
          });

          durationHandler = () => {
            const seconds = slide4VideoRef.current ? slide4VideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 1000;
            activeTimer.current = setTimeout(() => {
              handleSlide4Ended();
            }, ms);
          };

          if (slide4VideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            slide4VideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (slide4VideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (slide4VideoRef.current && durationHandler) {
          slide4VideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [showSlide4]);

  // Autoplay slide 5 video when it becomes active (unmuted)
  useEffect(() => {
    if (showSlide5) {
      const backupTimer = setTimeout(() => {
        handleSlide5Ended();
      }, 8000);

      const activeTimer = { current: null };
      let durationHandler = null;

      const attemptPlay = () => {
        if (slide5VideoRef.current) {
          slide5VideoRef.current.muted = false;
          slide5VideoRef.current.play().catch(err => {
            console.log('Slide 5 autoplay unmuted blocked, falling back to muted:', err);
            if (slide5VideoRef.current) {
              slide5VideoRef.current.muted = true;
              slide5VideoRef.current.play().catch(e => console.log('Muted slide 5 failed:', e));
            }
          });

          durationHandler = () => {
            const seconds = slide5VideoRef.current ? slide5VideoRef.current.duration : 6;
            const ms = (seconds || 6) * 1000 + 1000;
            activeTimer.current = setTimeout(() => {
              handleSlide5Ended();
            }, ms);
          };

          if (slide5VideoRef.current.readyState >= 1) {
            durationHandler();
          } else {
            slide5VideoRef.current.addEventListener('loadedmetadata', durationHandler);
          }
        }
      };

      attemptPlay();
      const retryInterval = setInterval(() => {
        if (slide5VideoRef.current) {
          attemptPlay();
          clearInterval(retryInterval);
        }
      }, 100);

      return () => {
        clearInterval(retryInterval);
        if (slide5VideoRef.current && durationHandler) {
          slide5VideoRef.current.removeEventListener('loadedmetadata', durationHandler);
        }
        if (activeTimer.current) clearTimeout(activeTimer.current);
        clearTimeout(backupTimer);
      };
    }
  }, [showSlide5]);

  // Replay slide videos when switching tabs
  useEffect(() => {
    if (introPlayed) {
      if (activeTab === 'dashboard' && prevTabRef.current !== 'dashboard') {
        setShowSlide1(true);
        setSlide1Finished(false);
        setShowSlide2(false);
        setSlide2Finished(false);
        setShowSlide3(false);
        setSlide3Finished(false);
        setShowSlide4(false);
        setSlide4Finished(false);
        setShowSlide5(false);
        setSlide5Finished(false);
      } else if (activeTab === 'activities' && prevTabRef.current !== 'activities') {
        setShowSlide2(true);
        setSlide2Finished(false);
        setShowSlide1(false);
        setSlide1Finished(false);
        setShowSlide3(false);
        setSlide3Finished(false);
        setShowSlide4(false);
        setSlide4Finished(false);
        setShowSlide5(false);
        setSlide5Finished(false);
      } else if (activeTab === 'collaboration' && prevTabRef.current !== 'collaboration') {
        setShowSlide3(true);
        setSlide3Finished(false);
        setShowSlide1(false);
        setSlide1Finished(false);
        setShowSlide2(false);
        setSlide2Finished(false);
        setShowSlide4(false);
        setSlide4Finished(false);
        setShowSlide5(false);
        setSlide5Finished(false);
      } else if (activeTab === 'reports' && prevTabRef.current !== 'reports') {
        setShowSlide4(true);
        setSlide4Finished(false);
        setShowSlide1(false);
        setSlide1Finished(false);
        setShowSlide2(false);
        setSlide2Finished(false);
        setShowSlide3(false);
        setSlide3Finished(false);
        setShowSlide5(false);
        setSlide5Finished(false);
      } else if (activeTab === 'projects' && prevTabRef.current !== 'projects') {
        setShowSlide5(true);
        setSlide5Finished(false);
        setShowSlide1(false);
        setSlide1Finished(false);
        setShowSlide2(false);
        setSlide2Finished(false);
        setShowSlide3(false);
        setSlide3Finished(false);
        setShowSlide4(false);
        setSlide4Finished(false);
      }
    }
    prevTabRef.current = activeTab;
  }, [activeTab, introPlayed]);

  const handleIntroEnded = () => {
    setShowIntro(false);
    setIntroPlayed(true);
    setShowSlide1(true);
  };

  const handleSlide1Ended = () => {
    setShowSlide1(false);
    setSlide1Finished(true);
  };

  const handleSlide2Ended = () => {
    setShowSlide2(false);
    setSlide2Finished(true);
  };

  const handleSlide3Ended = () => {
    setShowSlide3(false);
    setSlide3Finished(true);
  };

  const handleSlide4Ended = () => {
    setShowSlide4(false);
    setSlide4Finished(true);
  };

  const handleSlide5Ended = () => {
    setShowSlide5(false);
    setSlide5Finished(true);
  };

  // Toast Notification Trigger
  const showToast = (title, message, type = 'info') => {
    const newToast = { id: Date.now(), title, message, type };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== newToast.id));
    }, 5000);
  };

  // Helper to add reports logs
  const addLog = (module, message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    setServerLogs(prev => [
      { id: Date.now(), timestamp, message: `[${module.toUpperCase()}] ${message}`, type },
      ...prev
    ]);
    showToast(module, message, type);
  };

  // 1. System Status
  const [systemStatus, setSystemStatus] = useState({
    cpuLoad: 24,
    memoryLoad: 48,
    latency: 112,
    uptime: '14d 08h 12m'
  });

  // Dynamic system stats simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => {
        const cpuDelta = Math.floor(Math.random() * 7) - 3; // -3 to +3
        const memDelta = Math.floor(Math.random() * 3) - 1; // -1 to +1
        const latencyDelta = Math.floor(Math.random() * 15) - 7;

        return {
          ...prev,
          cpuLoad: Math.min(Math.max(prev.cpuLoad + cpuDelta, 12), 65),
          memoryLoad: Math.min(Math.max(prev.memoryLoad + memDelta, 40), 55),
          latency: Math.min(Math.max(prev.latency + latencyDelta, 80), 150)
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // 2. Daily Goals Checklist
  const [dailyGoals, setDailyGoals] = useState([
    { id: 1, text: 'Audit and update Login API schemas to v1.2', completed: true },
    { id: 2, text: 'Check production DB load and storage metrics', completed: false },
    { id: 3, text: 'Verify automated daily S3 backup success', completed: true },
    { id: 4, text: 'Verify active MFA settings and failed login events', completed: false },
    { id: 5, text: 'Review resolve pending server errors in logs', completed: false },
    { id: 6, text: 'Rebuild inactive indexes on clients table', completed: false }
  ]);







  // 8. Reports Panel Datasets
  const apiUptime = [
    { name: 'Gateway Auth Server', availability: '99.99%', successRate: '99.98%', latency: '42ms' },
    { name: 'Client Manager Router', availability: '100%', successRate: '100%', latency: '82ms' },
    { name: 'Employee Portal API', availability: '99.95%', successRate: '99.91%', latency: '94ms' },
    { name: 'Telemetry Collector Svc', availability: '99.98%', successRate: '99.99%', latency: '12ms' }
  ];

  const [errorLogs, setErrorLogs] = useState([
    { id: 1042, type: 'DB_TIMEOUT', message: 'Failed to obtain query lock on leads table within 2000ms', time: '16:04:12', module: 'Database Core', assignedTo: '', status: 'Pending' },
    { id: 1041, type: 'JWT_EXPIRED', message: 'Token parse failed: Signature verification failed for token hash', time: '15:58:20', module: 'Authentication Router', assignedTo: 'Alice BE', status: 'Pending' },
    { id: 1040, type: 'S3_UPLOAD_ERROR', message: 'AWS Glacier upload timed out after 3 retries', time: '12:00:14', module: 'Backup cron scheduler', assignedTo: '', status: 'Pending' }
  ]);

  const [serverLogs, setServerLogs] = useState([
    { id: 1, timestamp: '16:12:20', message: 'IP: 182.16.8.21 - User: ceo@entraiot.com - Request: GET /api/v1/client/list - Status: 200', type: 'success' },
    { id: 2, timestamp: '16:12:05', message: 'IP: 182.16.8.21 - User: ceo@entraiot.com - Request: POST /api/v1/auth/login - Status: 200', type: 'success' },
    { id: 3, timestamp: '16:11:42', message: 'CRON TASK: Executing telemetry database vacuum check...', type: 'info' },
    { id: 4, timestamp: '16:09:41', message: 'IP: 182.16.8.99 - User: employee.04@entraiot.com - Request: POST /api/v1/employee/create - Status: 201', type: 'success' },
    { id: 5, timestamp: '16:04:12', message: 'DATABASE ERROR: Failed to obtain query lock on leads table within 2000ms', type: 'error' }
  ]);

  // Tab click handler
  const handleTabClick = (id) => {
    setActiveTab(id);
  };

  const getToastColor = (type) => {
    switch (type) {
      case 'success': return 'border-brand-emerald bg-brand-emerald/10 text-brand-emerald';
      case 'warning': return 'border-brand-amber bg-brand-amber/10 text-brand-amber';
      case 'error': return 'border-brand-rose bg-brand-rose/10 text-brand-rose';
      default: return 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan';
    }
  };

  const getTabContext = (tab) => {
    switch (tab) {
      case 'dashboard':
        return {
          tag: 'DASHBOARD / OVERVIEW',
          title: '1. Command Overview',
          desc: 'Monitor real-time system latency, daily checklist progress, database resource statistics, and infrastructure alerts.'
        };
      case 'metrics':
        return {
          tag: 'METRICS / PERFORMANCE',
          title: '1.5. Metrics Summary',
          desc: 'Analyze server response limits, audit database schema index, check security compliance rate, and execute concurrent testing.'
        };
      case 'activities':
        return {
          tag: 'WORKFLOW / LIFECYCLE',
          title: '2. Developer Activities',
          desc: 'Explore the full lifecycle of software releases. Simulate git commits, test suite runners, and Docker deployments.'
        };
      case 'collaboration':
        return {
          tag: 'TEAMS / SYNC',
          title: '3. Collaboration Hub',
          desc: 'Coordinate pull request reviews, check team discussions, assign backlog tasks, and track merge speeds.'
        };



      case 'reports':
        return {
          tag: 'AUDIT / CASHFLOW',
          title: '7. Performance Reports',
          desc: 'Generate and review corporate audits, daily operational milestones, and weekly performance summaries.'
        };
      case 'projects':
        return {
          tag: 'WORKSPACES / PLANS',
          title: '8. Projects Registry',
          desc: 'Track and manage active corporate workspaces, project ownership, progress bars, milestones, and upcoming initiatives.'
        };



      default:
        return {
          tag: 'SYSTEM',
          title: 'Developer Hub',
          desc: 'Manage and coordinate industrial IoT platforms and developer environments.'
        };
    }
  };

  return (
    <div className="bg-[#030712] min-h-screen text-gray-100 antialiased font-sans relative overflow-hidden flex items-stretch">
      {/* 0. User Interaction Splash Overlay (to unlock browser unmuted audio) */}
      {!hasInteracted && (
        <div className="fixed inset-0 z-[10000] bg-[#030712] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.15),transparent_60%)]"></div>
          <div className="relative z-10 text-center space-y-6 max-w-md px-6">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-[1.5px] flex items-center justify-center shadow-lg shadow-brand-cyan/20 animate-pulse">
              <div className="w-full h-full rounded-[22px] bg-[#030712] flex items-center justify-center font-bold text-white text-xl">
                E
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold tracking-tight text-white m-0">ENTRAIOT</h1>
              <p className="text-gray-400 text-xs font-mono tracking-widest uppercase">SOLUTIONS CENTER</p>
            </div>
            <button 
              onClick={() => setHasInteracted(true)}
              className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-cyan to-brand-purple text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-cyan/25 hover:scale-105 transition-transform duration-300 cursor-pointer border border-white/10 uppercase"
            >
              Enter Command Center
            </button>
          </div>
        </div>
      )}

      {showIntro && hasInteracted && (
        <div className="fixed inset-0 z-[9999] bg-[#030712] flex items-center justify-center overflow-hidden">
          <video 
            ref={introVideoRef}
            src="introduction.mp4" 
            onEnded={handleIntroEnded}
            onError={handleIntroEnded}
            className="absolute inset-0 w-full h-full object-cover"
            playsInline
            autoPlay
            muted={isIntroMuted}
          />
        </div>
      )}

      {/* 2. Fullscreen Slide1 Overlay */}
      {(showSlide1 || slide1Finished) && activeTab === 'dashboard' && (
        <div className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          slide1Finished ? 'opacity-15 z-0 pointer-events-none' : 'opacity-100 z-[9998]'
        }`}>
          <video 
            ref={slide1VideoRef}
            src="slide1.mp4" 
            onEnded={handleSlide1Ended}
            onError={handleSlide1Ended}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}

      {/* 3. Fullscreen Slide2 Overlay */}
      {(showSlide2 || slide2Finished) && activeTab === 'activities' && (
        <div className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          slide2Finished ? 'opacity-15 z-0 pointer-events-none' : 'opacity-100 z-[9998]'
        }`}>
          <video 
            ref={slide2VideoRef}
            src="slide2.mp4" 
            onEnded={handleSlide2Ended}
            onError={handleSlide2Ended}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}

      {/* 4. Fullscreen Slide3 Overlay */}
      {(showSlide3 || slide3Finished) && activeTab === 'collaboration' && (
        <div className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          slide3Finished ? 'opacity-15 z-0 pointer-events-none' : 'opacity-100 z-[9998]'
        }`}>
          <video 
            ref={slide3VideoRef}
            src="slide3.mp4" 
            onEnded={handleSlide3Ended}
            onError={handleSlide3Ended}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}

      {/* 5. Fullscreen Slide4 Overlay */}
      {(showSlide4 || slide4Finished) && activeTab === 'reports' && (
        <div className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          slide4Finished ? 'opacity-15 z-0 pointer-events-none' : 'opacity-100 z-[9998]'
        }`}>
          <video 
            ref={slide4VideoRef}
            src="slide4.mp4" 
            onEnded={handleSlide4Ended}
            onError={handleSlide4Ended}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}

      {/* 6. Fullscreen Slide5 Overlay */}
      {(showSlide5 || slide5Finished) && activeTab === 'projects' && (
        <div className={`fixed inset-0 overflow-hidden bg-black transition-all duration-1000 ${
          slide5Finished ? 'opacity-15 z-0 pointer-events-none' : 'opacity-100 z-[9998]'
        }`}>
          <video 
            ref={slide5VideoRef}
            src="slide5.mp4" 
            onEnded={handleSlide5Ended}
            onError={handleSlide5Ended}
            className="w-full h-full object-cover"
            playsInline
            autoPlay
            muted
          />
        </div>
      )}

      {/* 7. Main Site Content Overlay */}
      <div className={`flex flex-col md:flex-row bg-transparent min-h-screen text-gray-100 antialiased font-sans transition-all duration-1000 relative z-10 w-full ${
        introPlayed && !showSlide1 && !showSlide2 && !showSlide3 && !showSlide4 && !showSlide5 ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
      {/* Toast notifications container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div 
            key={toast.id} 
            className={`pointer-events-auto border p-4 rounded-2xl shadow-xl backdrop-blur-md flex items-start justify-between gap-3 transform translate-x-0 transition-transform duration-300 animate-slide-in ${getToastColor(toast.type)}`}
          >
            <div>
              <span className="font-bold text-xs uppercase tracking-wider">{toast.title}</span>
              <p className="text-xs mt-1 text-gray-200">{toast.message}</p>
            </div>
            <button 
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="text-gray-400 hover:text-white"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Left Column Layout from Screenshot */}
      {activeTab !== 'metrics' && (
        <aside className="w-full md:w-80 lg:w-96 bg-transparent p-6 md:p-8 flex flex-col justify-between md:min-h-screen flex-shrink-0 animate-slide-in">
          {/* Brand Header */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-cyan to-brand-purple p-[1.5px] flex items-center justify-center">
              <div className="w-full h-full rounded-[14px] bg-[#030712] flex items-center justify-center font-bold text-white text-lg">
                E
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-white tracking-wide text-md">Entraiot</span>
              <span className="text-[9px] text-[#06b6d4] font-mono tracking-widest font-bold">SOLUTIONS</span>
            </div>
          </div>

          {/* Content Highlight Card */}
          <div className="my-8 md:my-auto">
            <div className="bg-[#0b1329]/40 border border-gray-900/80 rounded-3xl p-6 glow-cyan">
              <span className="text-[9px] font-mono tracking-widest text-[#06b6d4] font-bold block mb-3 uppercase">
                {getTabContext(activeTab).tag}
              </span>
              <h2 className="text-xl font-bold text-white leading-tight">
                {getTabContext(activeTab).title}
              </h2>
              <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                {getTabContext(activeTab).desc}
              </p>
            </div>
          </div>

          {/* User Card */}
          <div className="flex items-center gap-3.5 pt-4 border-t border-gray-900">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-rose flex items-center justify-center text-white font-bold text-sm shadow-md border border-gray-800">
              DEV
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-xs font-bold text-gray-200 truncate">
                Senior Developer
              </span>
              <span className="text-[10px] text-gray-500 truncate">
                entraiot.dev@internal
              </span>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content Workspace Area - Renders only the active tab */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen custom-scrollbar pr-20 md:pr-24 lg:pr-28 relative z-10 w-full">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'dashboard' && (
            <section id="dashboard" className="animate-slide-in">
              <DashboardHome 
                systemStatus={systemStatus} 
                dailyGoals={dailyGoals} 
                setDailyGoals={setDailyGoals} 
                logs={serverLogs} 
                onTabClick={handleTabClick}
              />
            </section>
          )}

          {activeTab === 'metrics' && (
            <section id="metrics" className="animate-slide-in">
              <MetricsSummary 
                systemStatus={systemStatus} 
                addLog={addLog}
                onBack={() => handleTabClick('dashboard')}
              />
            </section>
          )}

          {activeTab === 'activities' && (
            <section id="activities" className="animate-slide-in">
              <DeveloperActivities 
                addLog={addLog} 
              />
            </section>
          )}

          {activeTab === 'collaboration' && (
            <section id="collaboration" className="animate-slide-in">
              <CollaborationHub 
                addLog={addLog} 
              />
            </section>
          )}



          {activeTab === 'reports' && (
            <section id="reports" className="animate-slide-in">
              <ReportsPanel 
                addLog={addLog} 
              />
            </section>
          )}

          {activeTab === 'projects' && (
            <section id="projects" className="animate-slide-in">
              <ProjectsManager 
                addLog={addLog} 
              />
            </section>
          )}
        </div>
      </main>

      {/* Right Vertical Dot Navigation */}
      <Sidebar 
        activeTab={activeTab} 
        onTabClick={handleTabClick} 
      />

      {/* AI Developer Chatbot Assistant */}
      <DeveloperChatbot 
        activeTab={activeTab} 
        onNavigate={handleTabClick} 
      />
      </div>
    </div>
  );
}
