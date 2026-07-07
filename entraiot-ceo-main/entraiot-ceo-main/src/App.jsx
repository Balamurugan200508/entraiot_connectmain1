import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Radar, Doughnut } from 'react-chartjs-2';
import {
  Cpu,
  Target,
  TrendingUp,
  KeyRound,
  Users,
  LineChart,
  ShieldCheck,
  Lightbulb,
  CircleDollarSign,
  ChevronLeft,
  ChevronRight,
  Save,
  Award,
  Clock,
  ArrowDown,
  ArrowLeft,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  MessageSquare,
  Send,
  Bot,
  Sparkles,
  X
} from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Reusable Awwwards-style role exploration card
function RoleCard({ tag, title, bgImage, onClick, desc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '100%',
        height: '350px',
        borderRadius: '24px',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundImage: `url('${bgImage}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 12px 48px rgba(0,0,0,0.5)',
        border: '1px solid ' + (hovered ? 'var(--blue)' : 'rgba(255,255,255,0.05)'),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '40px 36px',
        textAlign: 'left',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: hovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)'
      }}
    >
      {/* Dark Vignette Overlay exactly like the premium reference cards */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'linear-gradient(to bottom, rgba(6, 8, 20, 0) 40%, rgba(6, 8, 20, 0.95) 100%)',
        zIndex: 1,
        transition: 'opacity 0.4s ease',
        opacity: hovered ? 0.9 : 0.95
      }} />
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <span style={{ 
          fontSize: '12px', 
          fontWeight: '800', 
          color: '#E5A43B', // Rich yellow-orange from the reference screenshot
          textTransform: 'uppercase', 
          letterSpacing: '1.5px', 
          display: 'block', 
          marginBottom: '10px' 
        }}>
          {tag}
        </span>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '800', 
          color: '#ffffff', 
          lineHeight: '1.1',
          letterSpacing: '-0.5px',
          marginBottom: '8px'
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '13px',
          color: 'var(--text-secondary)',
          margin: 0,
          opacity: hovered ? 1 : 0.8,
          transition: 'opacity 0.3s ease'
        }}>
          {desc}
        </p>
      </div>
    </div>
  );
}

function App() {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const videoRef = useRef(null);

  // Section Expansion States
  const [expandedSections, setExpandedSections] = useState({
    s1: false,
    s2: false,
    s3: false,
    s4: false,
    s5: false,
    s6: false,
    s7: false,
    s8: false
  });

  const toggleSection = (secKey, value) => {
    setExpandedSections(prev => ({ ...prev, [secKey]: value }));
  };

  // Sub-tabs states inside slides
  const [s1Sub, setS1Sub] = useState('market');
  const [s2Sub, setS2Sub] = useState('growth');
  const [s2GrowthSub, setS2GrowthSub] = useState('client');
  const [s3Sub, setS3Sub] = useState('financial');
  const [s4Sub, setS4Sub] = useState('buildteam');
  const [s5Sub, setS5Sub] = useState('revenue');
  const [s7Sub, setS7Sub] = useState('iot');
  const [s8Sub, setS8Sub] = useState('budgeting');

  // Video playback time tracker
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress || 0);
    }
  };

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  const handleVideoMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const startVideoWithSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = false;
      setIsVideoMuted(false);
      videoRef.current.play().then(() => {
        setAutoplayBlocked(false);
      }).catch(err => {
        console.log("Play failed:", err);
      });
    }
  };

  const skipVideoIntro = () => {
    setVideoCompleted(true);
  };

  const scrollContainerRef = useRef(null);
  const [activeScrollSection, setActiveScrollSection] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const [framesPreloaded, setFramesPreloaded] = useState(false);

  // Preloading walk cycle frames
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = 80;
    const preloadArray = [];
    const onLoad = () => {
      loadedCount++;
      if (loadedCount === (80 * 5 + 72 + 62 + 80)) {
        setFramesPreloaded(true);
      }
    };
    for (let i = 1; i <= totalFrames; i++) {
      const frameNum = String(i).padStart(3, '0');
      
      const img1 = new Image();
      img1.src = `/walk/ezgif-frame-${frameNum}.png`;
      img1.onload = onLoad;
      preloadArray.push(img1);

      const img2 = new Image();
      img2.src = `/walk2/ezgif-frame-${frameNum}.png`;
      img2.onload = onLoad;
      preloadArray.push(img2);

      const img3 = new Image();
      img3.src = `/walk3/ezgif-frame-${frameNum}.png`;
      img3.onload = onLoad;
      preloadArray.push(img3);

      const img4 = new Image();
      img4.src = `/walk4/ezgif-frame-${frameNum}.png`;
      img4.onload = onLoad;
      preloadArray.push(img4);

      if (i <= 72) {
        const img5 = new Image();
        img5.src = `/walk5/ezgif-frame-${frameNum}.png`;
        img5.onload = onLoad;
        preloadArray.push(img5);
      }

      const img6 = new Image();
      img6.src = `/walk6/ezgif-frame-${frameNum}.png`;
      img6.onload = onLoad;
      preloadArray.push(img6);

      if (i <= 62) {
        const img7 = new Image();
        img7.src = `/walk7/ezgif-frame-${frameNum}.png`;
        img7.onload = onLoad;
        preloadArray.push(img7);
      }

      const img8 = new Image();
      img8.src = `/walk8/ezgif-frame-${frameNum}.png`;
      img8.onload = onLoad;
      preloadArray.push(img8);
    }
  }, []);

  const handleScroll = (e) => {
    const container = e.currentTarget;
    const currentScrollTop = container.scrollTop;
    const height = container.clientHeight;
    setScrollTop(currentScrollTop);
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);

    if (height > 0) {
      const activeIdx = Math.round(currentScrollTop / height);
      if (activeIdx !== activeScrollSection && activeIdx >= 0 && activeIdx < 9) {
        setActiveScrollSection(activeIdx);
      }
    }
  };

  const scrollToSection = (idx) => {
    if (scrollContainerRef.current) {
      const section = document.getElementById(`section-${idx}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Keyboard navigation support for vertical scrolling
  useEffect(() => {
    if (!videoCompleted) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        const nextIdx = Math.min(activeScrollSection + 1, 8);
        scrollToSection(nextIdx);
        e.preventDefault();
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        const prevIdx = Math.max(activeScrollSection - 1, 0);
        scrollToSection(prevIdx);
        e.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeScrollSection, videoCompleted]);

  // Try to play video with sound on mount. If blocked, show interaction button.
  useEffect(() => {
    if (videoCompleted) return;

    const attemptPlay = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        setIsVideoMuted(false);
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Autoplay unmuted blocked by browser policy, showing play button:", error);
            setAutoplayBlocked(true);
          });
        }
      }
    };

    const timer = setTimeout(attemptPlay, 150);
    return () => clearTimeout(timer);
  }, [videoCompleted]);

  const replayVideoIntro = () => {
    setVideoCompleted(false);
    setIsVideoPlaying(true);
    setVideoProgress(0);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    }, 100);
  };


  // ------------------- DATA STATES -------------------
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [prodIndex, setProdIndex] = useState(0);

  // Chatbot State Variables
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Welcome back, MD! I am your AI Portal Assistant. Ask me questions about our stats, metrics, or departments, or tell me where to navigate (e.g. 'Show me the Q3 Budget' or 'Open Market Workspace').", sender: 'bot' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef(null);

  useEffect(() => {
    if (chatMessagesEndRef.current) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isTyping]);

  const handleChatSubmit = (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput.trim();
    const userMsg = { id: Date.now(), text: userText, sender: 'user' };
    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerText = userText.toLowerCase();
      let response = "I'm not sure how to assist with that. Try asking to navigate somewhere, e.g. 'Open Market Workspace', 'Go to Slide 8', or ask about 'Q3 Budget'.";
      
      // Intent matching
      if (lowerText.includes('market workspace') || lowerText.includes('open market') || lowerText.includes('edit seo') || lowerText.includes('edit geo') || lowerText.includes('visibility score')) {
        scrollToSection(1);
        setS1Sub('market');
        setActiveWorkspace({ slide: 1, tab: 'market' });
        response = "Opening the **Market Visibility Workspace** overlay. Here you can edit the SEO, GEO, and AEO charts/data directly in the ledger table.";
      } else if (lowerText.includes('products manager') || lowerText.includes('open products') || lowerText.includes('lifecycle') || lowerText.includes('prototype products')) {
        scrollToSection(1);
        setS1Sub('products');
        setActiveWorkspace({ slide: 1, tab: 'products' });
        response = "Opening the **Hardware Products Lifecycle Manager** workspace page to add prototypes and track product health stages.";
      } else if (lowerText.includes('growth planner') || lowerText.includes('open growth') || lowerText.includes('services growth') || lowerText.includes('it services')) {
        scrollToSection(1);
        setS1Sub('growth');
        setActiveWorkspace({ slide: 1, tab: 'growth' });
        response = "Opening the **Services & IoT Growth Portfolio Planner** workspace view.";
      } else if (lowerText.includes('slide 1') || lowerText.includes('vision') || lowerText.includes('strategy')) {
        scrollToSection(1);
        response = "Navigating to **1. Vision & Strategy** slide. Explore the IoT Digital Visibility scores and hardware mapping.";
      } else if (lowerText.includes('client list') || lowerText.includes('clients') || lowerText.includes('mahindra') || lowerText.includes('chennai smart city')) {
        scrollToSection(2);
        setS2Sub('growth');
        setS2GrowthSub('client');
        setActiveWorkspace({ slide: 2, tab: 'growth' });
        response = "Opening the **Business Growth Matrix (Clients List)** overlay. Our active client ledger includes Chennai Smart City and Mahindra.";
      } else if (lowerText.includes('expansion map') || lowerText.includes('local business') || lowerText.includes('global business') || lowerText.includes('dubai') || lowerText.includes('singapore')) {
        scrollToSection(2);
        setS2Sub('expansion');
        setActiveWorkspace({ slide: 2, tab: 'expansion' });
        response = "Opening the **Global & Local Expansion Map** where we track locations like Coimbatore, Hyderabad, Singapore, and Dubai.";
      } else if (lowerText.includes('revenue strategy') || lowerText.includes('revenue strategies') || lowerText.includes('arr projection') || lowerText.includes('arr')) {
        scrollToSection(2);
        setS2Sub('strategies');
        setActiveWorkspace({ slide: 2, tab: 'strategies' });
        response = "Opening the **Revenue Strategy Ledger** overlay with gross ARR growth projection charts.";
      } else if (lowerText.includes('slide 2') || lowerText.includes('business growth') || lowerText.includes('expansion')) {
        scrollToSection(2);
        response = "Navigating you to **2. Business Growth & Expansion** slide.";
      } else if (lowerText.includes('approvals board') || lowerText.includes('approve') || lowerText.includes('proposals') || lowerText.includes('strategic proposals')) {
        scrollToSection(3);
        setS3Sub('approvals');
        setActiveWorkspace({ slide: 3, tab: 'approvals' });
        response = "Opening the **Strategic Decisions Approvals Board**. Review the pending proposals here.";
      } else if (lowerText.includes('capital ledger') || lowerText.includes('investments ledger') || lowerText.includes('investment record') || lowerText.includes('capital allocation') || lowerText.includes('capex')) {
        scrollToSection(3);
        setS3Sub('investment');
        setActiveWorkspace({ slide: 3, tab: 'investment' });
        response = "Opening the **Capital Investments Ledger** view to manage capex funding and target ROIs.";
      } else if (lowerText.includes('slide 3') || lowerText.includes('decision') || lowerText.includes('decisions') || lowerText.includes('scope')) {
        scrollToSection(3);
        response = "Navigating to **3. Key Decisions** slide. Review approvals and operational scopes.";
      } else if (lowerText.includes('strategic objective') || lowerText.includes('goals') || lowerText.includes('company goal') || lowerText.includes('objectives')) {
        scrollToSection(4);
        setS4Sub('goals');
        setActiveWorkspace({ slide: 4, tab: 'goals' });
        response = "Opening the **Company Strategic Goals Board** where you can track objectives like the ARR target.";
      } else if (lowerText.includes('directives') || lowerText.includes('responsibilities') || lowerText.includes('send directive') || lowerText.includes('department head')) {
        scrollToSection(4);
        setS4Sub('heads');
        setActiveWorkspace({ slide: 4, tab: 'heads' });
        response = "Opening the **Directives & Responsibilities Ledger** where you can broadcast directives to heads.";
      } else if (lowerText.includes('slide 4') || lowerText.includes('team') || lowerText.includes('management') || lowerText.includes('hiring')) {
        scrollToSection(4);
        response = "Navigating to **4. Leadership & Team Management** slide. Manage staffing and strategic responsibilities.";
      } else if (lowerText.includes('revenue ledger') || lowerText.includes('monthly profit') || lowerText.includes('roi %') || lowerText.includes('expenses')) {
        scrollToSection(5);
        setS5Sub('revenue');
        setActiveWorkspace({ slide: 5, tab: 'revenue' });
        response = "Opening the **Revenue Ledger** to track month-on-month revenues, capex, and margins.";
      } else if (lowerText.includes('deadlines') || lowerText.includes('milestones') || lowerText.includes('target date')) {
        scrollToSection(5);
        setS5Sub('deadlines');
        setActiveWorkspace({ slide: 5, tab: 'deadlines' });
        response = "Opening the **Project Target Deadlines Tracker** for key delivery lock dates.";
      } else if (lowerText.includes('slide 5') || lowerText.includes('performance') || lowerText.includes('results')) {
        scrollToSection(5);
        response = "Navigating to **5. Performance & Results Monitoring** slide.";
      } else if (lowerText.includes('slide 6') || lowerText.includes('client relations') || lowerText.includes('meetings') || lowerText.includes('scheduler') || lowerText.includes('meetings ledger')) {
        scrollToSection(6);
        setActiveWorkspace({ slide: 6, tab: 'relations' });
        response = "Scrolling to **6. Client Relations** slide and opening the **Event Scheduler & Meetings Ledger**.";
      } else if (lowerText.includes('iot trends') || lowerText.includes('iot capability')) {
        scrollToSection(7);
        setS7Sub('iot');
        setActiveWorkspace({ slide: 7, tab: 'iot' });
        response = "Opening the **IoT Capability & Trends Map** workspace view.";
      } else if (lowerText.includes('ai trends') || lowerText.includes('anomalies') || lowerText.includes('tinyml')) {
        scrollToSection(7);
        setS7Sub('ai');
        setActiveWorkspace({ slide: 7, tab: 'ai' });
        response = "Opening the **AI Anomaly Detection & Trends** workspace tracker.";
      } else if (lowerText.includes('slide 7') || lowerText.includes('innovation') || lowerText.includes('pitches')) {
        scrollToSection(7);
        response = "Navigating to **7. Innovation & Company Direction** slide.";
      } else if (lowerText.includes('budgeting') || lowerText.includes('utilization') || lowerText.includes('budget slices')) {
        scrollToSection(8);
        setS8Sub('budgeting');
        setActiveWorkspace({ slide: 8, tab: 'budgeting' });
        response = "Opening the **Budgeting Allocation & Utilization** workspace view.";
      } else if (lowerText.includes('spend ledger') || lowerText.includes('capex spend') || lowerText.includes('investments tracker')) {
        scrollToSection(8);
        setS8Sub('spend');
        setActiveWorkspace({ slide: 8, tab: 'spend' });
        response = "Opening the **CapEx Spend & Investments Tracker** workspace.";
      } else if (lowerText.includes('profitability margins') || lowerText.includes('margins checklist') || lowerText.includes('yield')) {
        scrollToSection(8);
        setS8Sub('profitability');
        setActiveWorkspace({ slide: 8, tab: 'profitability' });
        response = "Opening the **Profitability Margins & Yield Check** checklist.";
      } else if (lowerText.includes('slide 8') || lowerText.includes('financial oversight') || lowerText.includes('budget')) {
        scrollToSection(8);
        response = "Navigating to **8. Financial Oversight** slide.";
      } else if (lowerText.includes('lead of r&d') || lowerText.includes('r&d lead') || lowerText.includes('who leads r&d')) {
        response = "The Research & Development department is led by Ramesh K. It currently has 58 employees with a hiring target of 12 firmware architects.";
      } else if (lowerText.includes('arr target') || lowerText.includes('what is our arr') || lowerText.includes('revenue target')) {
        response = "Our target is to achieve ₹15 Cr annual ARR by Q4 2026. The current gross ARR trend is tracking upward, starting from ₹6.8 Cr in 2023.";
      } else if (lowerText.includes('allocated budget') || lowerText.includes('allocated q3') || lowerText.includes('total budget')) {
        response = "The allocated budget for Q3 is ₹1.45 Cr. The CapEx monthly limit is capped at ₹45L, with an active utilization index of 78.4%.";
      } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
        response = "Hello MD! I'm ready to assist you. Ask me to navigate to any slide (1-8), open specific workspaces like 'Market Workspace', or check metrics.";
      } else if (lowerText.includes('pending') || lowerText.includes('todo') || lowerText.includes('to do') || lowerText.includes('tasks') || lowerText.includes('works')) {
        const pendingApprovals = approvals.filter(a => a.status === 'Pending').map(a => a.title);
        const pendingResponsibilities = responsibilities.filter(r => r.status === 'Pending').map(r => r.desc);
        
        let pendingText = "Here are the pending items currently tracked on the dashboard:\n\n";
        
        if (pendingApprovals.length > 0) {
          pendingText += "**Pending Approvals (Slide 3):**\n" + pendingApprovals.map(title => `• ${title}`).join('\n') + "\n\n";
        } else {
          pendingText += "**Pending Approvals (Slide 3):** None\n\n";
        }
        
        if (pendingResponsibilities.length > 0) {
          pendingText += "**Pending Responsibilities (Slide 4):**\n" + pendingResponsibilities.map(desc => `• ${desc}`).join('\n') + "\n\n";
        } else {
          pendingText += "**Pending Responsibilities (Slide 4):** None\n\n";
        }
        
        response = pendingText + "Would you like to navigate to Slide 3 or Slide 4 to manage these?";
      } else if (lowerText.startsWith('schedule') || lowerText.includes('add meeting') || lowerText.includes('book a') || lowerText.includes('set a meeting')) {
        let eventName = "Meeting with Team";
        let eventTime = "05:00 PM";
        
        const atIndex = lowerText.lastIndexOf(' at ');
        if (atIndex !== -1) {
          const rawTime = userText.substring(atIndex + 4).trim();
          eventTime = rawTime;
          
          let rawEvent = userText.substring(0, atIndex).trim();
          rawEvent = rawEvent.replace(/^(schedule\s+a\s+meet\s+with\s+|schedule\s+a\s+meeting\s+with\s+|schedule\s+meet\s+with\s+|schedule\s+meeting\s+|schedule\s+meet\s+|schedule\s+)/i, '');
          if (rawEvent) {
            eventName = rawEvent.charAt(0).toUpperCase() + rawEvent.slice(1);
          }
        } else {
          let rawEvent = userText.trim();
          rawEvent = rawEvent.replace(/^(schedule\s+a\s+meet\s+with\s+|schedule\s+a\s+meeting\s+with\s+|schedule\s+meet\s+with\s+|schedule\s+meeting\s+|schedule\s+meet\s+|schedule\s+)/i, '');
          if (rawEvent) {
            eventName = rawEvent.charAt(0).toUpperCase() + rawEvent.slice(1);
          }
        }
        
        const todayStr = new Date().toISOString().split('T')[0];
        const newMeetObj = {
          event: eventName,
          date: todayStr,
          time: eventTime,
          status: 'Meeting'
        };
        
        setMeetings(prev => [...prev, newMeetObj]);
        response = `Successfully scheduled **"${eventName}"** for today (${todayStr}) at **${eventTime}**. I've added it to the relations ledger!`;
      } else if (lowerText.includes('meeting') || lowerText.includes('meetings') || lowerText.includes('schedule') || lowerText.includes('events') || lowerText.includes('event')) {
        let meetingText = "Here is the schedule of meetings and events currently in the client relations ledger:\n\n";
        
        if (meetings.length > 0) {
          meetingText += meetings.map(m => `• **${m.event}**\n  Date: ${m.date} | Time: ${m.time} | Type: ${m.status}`).join('\n\n');
        } else {
          meetingText += "There are no meetings or events currently scheduled.";
        }
        
        response = meetingText + "\n\nWould you like to navigate to Slide 6 (Client Relations) to manage or schedule a new one?";
      }

      setChatMessages(prev => [...prev, { id: Date.now() + 1, text: response, sender: 'bot' }]);
      setIsTyping(false);
    }, 800);
  };

  const [newProductName, setNewProductName] = useState('');
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductCategory, setNewProductCategory] = useState('live');

  const getCategoryLabel = (cat) => {
    switch(cat) {
      case 'live': return 'Live Project';
      case 'untouched': return 'Never Touched';
      case 'todo': return 'Supposed to Do';
      case 'completed': return 'Completed';
      default: return '';
    }
  };

  const handleAddProduct = () => {
    if (!newProductName.trim()) return;
    setProductsList(prev => {
      const updatedList = { ...prev };
      updatedList[newProductCategory] = [
        ...updatedList[newProductCategory],
        { name: newProductName, desc: newProductDesc, health: getCategoryLabel(newProductCategory) }
      ];
      return updatedList;
    });
    setNewProductName('');
    setNewProductDesc('');
  };

  const handleDeleteProduct = (category, index) => {
    setProductsList(prev => {
      const updatedList = { ...prev };
      const newCategoryList = [...updatedList[category]];
      newCategoryList.splice(index, 1);
      updatedList[category] = newCategoryList;
      return updatedList;
    });
  };

  const handleMarketCellEdit = (datasetName, index, value) => {
    const numericVal = parseFloat(value) || 0;
    setMarketData(prev => {
      const updated = { ...prev };
      if (datasetName === 'seo') {
        const newSeo = [...prev.seo];
        newSeo[index] = numericVal;
        updated.seo = newSeo;
      } else if (datasetName === 'geo') {
        const newGeo = [...prev.geo];
        newGeo[index] = numericVal;
        updated.geo = newGeo;
      } else if (datasetName === 'aeo') {
        const newAeo = [...prev.aeo];
        newAeo[index] = numericVal;
        updated.aeo = newAeo;
      }
      return updated;
    });
  };

  const handleGrowthCellEdit = (datasetName, index, value) => {
    const numericVal = parseFloat(value) || 0;
    setGrowthData(prev => {
      const updated = { ...prev };
      if (datasetName === 'services') {
        const newServices = [...prev.services];
        newServices[index] = numericVal;
        updated.services = newServices;
      } else if (datasetName === 'iot') {
        const newIot = [...prev.iot];
        newIot[index] = numericVal;
        updated.iot = newIot;
      }
      return updated;
    });
  };
  const [productsList, setProductsList] = useState({
    live: [
      { name: 'EdgeSense Pro Node', desc: 'Real-time telemetry and edge analytics gateway deployed in production lines.', health: 'Live Project' },
      { name: 'EntraFlow Monitor v3', desc: 'Smart liquid flow tracking node using Bluetooth Low Energy.', health: 'Live Project' }
    ],
    untouched: [
      { name: 'Zero-Grid Power Cell', desc: 'Energy harvesting module concept awaiting prototype development.', health: 'Never Touched' },
      { name: 'MeshSense Hub V4', desc: 'Sub-GHz communication routing station planning phase.', health: 'Never Touched' }
    ],
    todo: [
      { name: 'Agricultural Soil Probe', desc: 'Moisture, pH, and nitrogen analysis sensor kit.', health: 'Supposed to Do' },
      { name: 'ThermalPredict Node', desc: 'Infrared predictive maintenance industrial node.', health: 'Supposed to Do' }
    ],
    completed: [
      { name: 'EntraGateway V1', desc: 'First-gen communication bridge. Now deprecated.', health: 'Completed' },
      { name: 'FluidFlow V2 Adapter', desc: 'Custom adapter module completed in Q4 2024.', health: 'Completed' }
    ]
  });

  const [clients, setClients] = useState([
    { name: 'Mahindra & Mahindra', industry: 'Automotive', value: '₹1.2 Cr', status: 'Active' },
    { name: 'Chennai Smart City', industry: 'Smart Cities', value: '₹3.5 Cr', status: 'Active' },
    { name: 'Sona BLW Precision', industry: 'Manufacturing', value: '₹68 L', status: 'Active' }
  ]);
  const [newClient, setNewClient] = useState({ name: '', industry: 'Automotive', value: '', status: 'Active' });

  const [targetIndustries, setTargetIndustries] = useState([
    { name: 'Precision Agriculture', notes: 'High IoT deployment potential' },
    { name: 'Connected EV Stations', notes: 'Fastest growing sector in South India' }
  ]);
  const [newIndustry, setNewIndustry] = useState({ name: '', notes: '' });

  const [partnerships, setPartnerships] = useState([
    { partner: 'AWS IoT Core Solutions', type: 'Tech & Infrastructure', share: '30%' },
    { partner: 'SolutionForge Systems', type: 'White-label Client Interface', share: '25%' }
  ]);
  const [newPartner, setNewPartner] = useState({ partner: '', type: 'White-label', share: '' });

  const [revenueArr, setRevenueArr] = useState([6.8, 9.4, 12.4, 15.0]);
  const [newLocalCity, setNewLocalCity] = useState('');
  const [newGlobalLoc, setNewGlobalLoc] = useState('');

  // Slide 3
  const [allocatedBudget, setAllocatedBudget] = useState('1.45');
  const [capacityLimit, setCapacityLimit] = useState('100');
  const [productivityIndex, setProductivityIndex] = useState('94');
  const [newInvestmentTarget, setNewInvestmentTarget] = useState('');
  const [newInvestmentAmount, setNewInvestmentAmount] = useState('');
  const [newInvestmentRoi, setNewInvestmentRoi] = useState('');
  const [newInvestmentStatus, setNewInvestmentStatus] = useState('Pending');

  // Slide 5
  const [newRevenueMonth, setNewRevenueMonth] = useState('');
  const [newRevenueVal, setNewRevenueVal] = useState('');
  const [newRevenueExp, setNewRevenueExp] = useState('');
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [newProjectDeadline, setNewProjectDeadline] = useState('');
  const [newProjectDeadlineName, setNewProjectDeadlineName] = useState('');

  // Slide 7
  const [newAiTrendText, setNewAiTrendText] = useState('');
  const [newAiTrendRelevance, setNewAiTrendRelevance] = useState('High');
  const [newPitchTitle, setNewPitchTitle] = useState('');
  const [newPitchSummary, setNewPitchSummary] = useState('');

  // Slide 8
  const [monthlyCap, setMonthlyCap] = useState('45');
  const [utilizationIndex, setUtilizationIndex] = useState('78.4');
  const [newSpendSector, setNewSpendSector] = useState('');
  const [newSpendAmt, setNewSpendAmt] = useState('');
  const [newSpendProg, setNewSpendProg] = useState('');
  const [profitabilityPoints, setProfitabilityPoints] = useState([
    { text: 'Gross Margins track at 32% limits.', checked: true },
    { text: 'R&D investments yield is standing at 2.4x.', checked: true }
  ]);
  const [newProfitPoint, setNewProfitPoint] = useState('');

  const [localExpansion, setLocalExpansion] = useState([
    { city: 'Chennai', status: 'Completed' },
    { city: 'Coimbatore', status: 'Completed' },
    { city: 'Bengaluru', status: 'Completed' },
    { city: 'Pune', status: 'Completed' },
    { city: 'Hyderabad', status: 'Completed' },
    { city: 'Delhi', status: 'Not Done Yet' },
    { city: 'Mumbai', status: 'Not Done Yet' },
    { city: 'Kolkata', status: 'Not Done Yet' }
  ]);

  const [globalExpansion, setGlobalExpansion] = useState([
    { location: 'Dubai, UAE', status: 'Completed' },
    { location: 'Singapore', status: 'Completed' },
    { location: 'Germany', status: 'Not Done Yet' },
    { location: 'USA', status: 'Not Done Yet' }
  ]);

  const [approvals, setApprovals] = useState([
    { id: 1, title: 'EdgeSense Pro Launch — ₹42L Investment', type: 'Investment', status: 'Pending' },
    { id: 2, title: 'Tata AutoComp Strategic Partnership', type: 'Partnership', status: 'Pending' },
    { id: 3, title: 'AWS Cloud Premium Upgrade — ₹8L', type: 'Financial', status: 'Approved' },
    { id: 4, title: 'Legacy Backup Storage Server', type: 'Operational', status: 'Dropped' }
  ]);

  const [investments, setInvestments] = useState([
    { id: 1, target: 'Edge R&D Lab', amount: '35', roi: '180', status: 'Approved' },
    { id: 2, target: 'Vibration Sensors', amount: '12', roi: '120', status: 'Pending' },
    { id: 3, target: 'HR Recruitment Drive', amount: '8', roi: '—', status: 'Approved' }
  ]);

  const [departments, setDepartments] = useState([
    { name: 'Research & Development', lead: 'Dev Lead', employees: 58, targetHiring: 12, higherNeeded: 'Lead Firmware Architect', fireListCount: 0, trophy: true, bestEmployee: 'Ramesh K.' },
    { name: 'Industrial IoT Delivery', lead: 'IoT Lead', employees: 42, targetHiring: 8, higherNeeded: 'IoT Integration Engineer', fireListCount: 2, trophy: false, bestEmployee: 'Priya M.' },
    { name: 'Sales & Marketing', lead: 'Sales Head', employees: 22, targetHiring: 4, higherNeeded: 'Enterprise Sales Manager', fireListCount: 1, trophy: false, bestEmployee: 'Anand S.' },
    { name: 'Operations & HR', lead: 'HR Head', employees: 14, targetHiring: 2, higherNeeded: 'Talent Acquisition Partner', fireListCount: 0, trophy: false, bestEmployee: 'Sujatha V.' }
  ]);

  const [responsibilities, setResponsibilities] = useState([
    { id: 1, department: 'R&D', desc: 'EdgeSense V3 Firmware Delivery', status: 'Handled' },
    { id: 2, department: 'IIoT Delivery', desc: 'Chennai Smart City Pilot Completion', status: 'Pending' },
    { id: 3, department: 'Sales', desc: 'Q3 Enterprise Client Pipeline Lock', status: 'Not Taken Yet' }
  ]);
  const [feedbackInput, setFeedbackInput] = useState({ dept: 'R&D', msg: '' });

  const [companyGoals, setCompanyGoals] = useState([
    { id: 1, title: 'Achieve ₹15 Cr annual ARR target', status: 'Active', targetDate: 'Q4 2026' },
    { id: 2, title: 'Certify with ISO 27001 Data Security', status: 'Active', targetDate: 'Q3 2025' }
  ]);
  const [newGoalText, setNewGoalText] = useState('');
  const [newGoalQuarter, setNewGoalQuarter] = useState('Q4 2025');

  const [revenueRoi, setRevenueRoi] = useState([
    { month: 'January', revenue: 95, expenses: 68, roi: 40 },
    { month: 'February', revenue: 104, expenses: 70, roi: 48 },
    { month: 'March', revenue: 120, expenses: 74, roi: 62 },
    { month: 'April', revenue: 110, expenses: 72, roi: 53 },
    { month: 'May', revenue: 125, expenses: 76, roi: 64 }
  ]);

  const [performanceProjects, setPerformanceProjects] = useState([
    { name: 'Mahindra Smart Factory Integration', client: 'Mahindra & Mahindra', status: 'In Progress' },
    { name: 'Water Flow telemetry network', client: 'Chennai Smart City', status: 'In Progress' },
    { name: 'Automotive Sensor Alignment', client: 'TVS Motor', status: 'Planning' }
  ]);

  const [projectDeadlines, setProjectDeadlines] = useState([
    { project: 'Smart City Gateways Delivery', deadline: '2026-06-30', targetMet: '85%' },
    { project: 'EdgeSense V3 Firmware Lock', deadline: '2026-07-15', targetMet: '60%' },
    { project: 'M&M Production Setup Calibration', deadline: '2026-06-20', targetMet: '95%' }
  ]);

  const [meetings, setMeetings] = useState([
    { event: 'Tata AutoComp JV Finalization', date: '2026-06-15', time: '11:00 AM', status: 'Deal' },
    { event: 'Smart City India Expo 2026 Presentation', date: '2026-06-22', time: '02:30 PM', status: 'Event' },
    { event: 'Series A Funding Pitch - Tiger Global', date: '2026-07-05', time: '10:00 AM', status: 'Meeting' }
  ]);
  const [newMeeting, setNewMeeting] = useState({ event: '', date: '', time: '', status: 'Meeting' });

  const [iotTrends, setIotTrends] = useState([
    { trend: 'NB-IoT Smart Infrastructure Nodes', relevance: 'High' },
    { trend: 'Energy Harvesting Telemetry', relevance: 'Medium' }
  ]);
  const [newIotTrend, setNewIotTrend] = useState('');

  const [aiTrends, setAiTrends] = useState([
    { trend: 'Edge TinyML anomalies detection algorithms', relevance: 'Critical' },
    { trend: 'AI Predictive Maintenance for motor temperature spikes', relevance: 'High' }
  ]);

  const [innovationPitches, setInnovationPitches] = useState([
    { title: 'Zero-Battery Solar Sensors', summary: 'Harnessing energy to remove lithium dependence on remote sensor logs.' },
    { title: 'ThermalSense anomaly engine', summary: 'Vibration and thermographic joint ML telemetry models.' }
  ]);

  const [budgetData, setBudgetData] = useState([35, 20, 25, 10, 10]);

  const budgetAllocation = {
    labels: ['R&D Hardware', 'Cloud Infrastructure', 'Personnel / HR', 'Operations & Admin', 'Marketing / Sales'],
    datasets: [{
      data: budgetData,
      backgroundColor: ['#7b61ff', '#00d4ff', '#10b981', '#f59e0b', '#ef4444'],
      borderWidth: 0
    }]
  };

  const [investmentSpend, setInvestmentSpend] = useState([
    { sector: 'Edge Computing hardware components', spend: '₹22L', progress: '90%' },
    { sector: 'AWS cloud architecture capacity expansion', spend: '₹8L', progress: '100%' },
    { sector: 'Coimbatore R&D workspace setup', spend: '₹14L', progress: '45%' }
  ]);

  // Refs to keep track of latest state in event listeners without re-registering
  const videoCompletedRef = useRef(videoCompleted);
  const activeWorkspaceRef = useRef(activeWorkspace);

  useEffect(() => {
    videoCompletedRef.current = videoCompleted;
  }, [videoCompleted]);

  useEffect(() => {
    activeWorkspaceRef.current = activeWorkspace;
  }, [activeWorkspace]);

  // Global viewport scroll event propagation (wheel + touch swipe)
  useEffect(() => {
    let touchStartY = 0;

    const handleGlobalWheel = (e) => {
      if (!videoCompletedRef.current || activeWorkspaceRef.current) return;
      if (e.target.closest('.chatbot-container')) return;

      if (scrollContainerRef.current && !scrollContainerRef.current.contains(e.target)) {
        scrollContainerRef.current.scrollBy({
          top: e.deltaY,
          behavior: 'auto'
        });
      }
    };

    const handleGlobalTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleGlobalTouchMove = (e) => {
      if (!videoCompletedRef.current || activeWorkspaceRef.current) return;
      if (e.target.closest('.chatbot-container')) return;

      if (scrollContainerRef.current && !scrollContainerRef.current.contains(e.target)) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;
        scrollContainerRef.current.scrollBy({
          top: deltaY,
          behavior: 'auto'
        });
        touchStartY = touchY;
      }
    };

    window.addEventListener('wheel', handleGlobalWheel, { passive: true });
    window.addEventListener('touchstart', handleGlobalTouchStart, { passive: true });
    window.addEventListener('touchmove', handleGlobalTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleGlobalWheel);
      window.removeEventListener('touchstart', handleGlobalTouchStart);
      window.removeEventListener('touchmove', handleGlobalTouchMove);
    };
  }, []);

  // ------------------- EVENT HANDLERS -------------------
  const handleSaveClient = () => {
    if (!newClient.name) return;
    setClients([...clients, newClient]);
    setNewClient({ name: '', industry: 'Automotive', value: '', status: 'Active' });
  };

  const handleSaveIndustry = () => {
    if (!newIndustry.name) return;
    setTargetIndustries([...targetIndustries, newIndustry]);
    setNewIndustry({ name: '', notes: '' });
  };

  const handleSavePartner = () => {
    if (!newPartner.partner) return;
    setPartnerships([...partnerships, newPartner]);
    setNewPartner({ partner: '', type: 'White-label', share: '' });
  };

  const handleDecisionAction = (id, actionStatus) => {
    setApprovals(approvals.map(a => a.id === id ? { ...a, status: actionStatus } : a));
  };

  const handleInvestmentChange = (index, field, val) => {
    const updated = [...investments];
    updated[index][field] = val;
    setInvestments(updated);
  };

  const handleAddGoal = () => {
    if (!newGoalText) return;
    setCompanyGoals([...companyGoals, { id: companyGoals.length + 1, title: newGoalText, status: 'Active', targetDate: newGoalQuarter }]);
    setNewGoalText('');
  };

  const handleSendFeedback = () => {
    if (!feedbackInput.msg) return;
    alert(`Query broadcasted to the ${feedbackInput.dept} department head.`);
    setFeedbackInput({ ...feedbackInput, msg: '' });
  };

  const handleRevenueLedgerChange = (idx, field, val) => {
    const updated = [...revenueRoi];
    const numericVal = parseFloat(val) || 0;
    updated[idx][field] = numericVal;

    if (field === 'revenue' || field === 'expenses') {
      const profit = updated[idx].revenue - updated[idx].expenses;
      updated[idx].roi = updated[idx].expenses > 0 
        ? Math.round((profit / updated[idx].expenses) * 100)
        : 0;
    }
    setRevenueRoi(updated);
  };

  const handleSaveMeeting = () => {
    if (!newMeeting.event) return;
    setMeetings([...meetings, newMeeting]);
    setNewMeeting({ event: '', date: '', time: '', status: 'Meeting' });
  };

  const handleAddIotTrend = () => {
    if (!newIotTrend) return;
    setIotTrends([...iotTrends, { trend: newIotTrend, relevance: 'Medium' }]);
    setNewIotTrend('');
  };

  // ------------------- DATA STATES (CHARTS) -------------------
  const [marketData, setMarketData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    seo: [75, 78, 80, 84, 85, 88],
    geo: [58, 60, 62, 68, 70, 74],
    aeo: [50, 55, 60, 65, 71, 75]
  });

  const [growthData, setGrowthData] = useState({
    labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
    services: [12, 14, 18, 22, 25],
    iot: [18, 22, 28, 34, 38]
  });

  const marketChartData = {
    labels: marketData.labels,
    datasets: [
      { label: 'IoT SEO Visibility', data: marketData.seo, borderColor: '#00d4ff', backgroundColor: 'rgba(0,212,255,0.05)', tension: 0.3, fill: true },
      { label: 'IoT GEO Presence', data: marketData.geo, borderColor: '#7b61ff', backgroundColor: 'rgba(123,97,255,0.05)', tension: 0.3, fill: true },
      { label: 'IoT AEO Search Citations', data: marketData.aeo, borderColor: '#00ffe0', backgroundColor: 'rgba(0,255,224,0.05)', tension: 0.3, fill: true }
    ]
  };

  const growthServicesData = {
    labels: growthData.labels,
    datasets: [
      { label: 'IT Services Projects', data: growthData.services, borderColor: '#7b61ff', backgroundColor: '#7b61ff', borderWidth: 2 },
      { label: 'IoT Projects (Core)', data: growthData.iot, borderColor: '#00d4ff', backgroundColor: '#00d4ff', borderWidth: 2 }
    ]
  };

  const revenueStrategiesData = {
    labels: ['2023', '2024', '2025', '2026 (Strategic Goal)'],
    datasets: [{
      label: 'Gross ARR (in ₹ Cr)',
      data: revenueArr,
      backgroundColor: 'rgba(0, 212, 255, 0.4)',
      borderColor: 'var(--blue)',
      borderWidth: 2,
      fill: true
    }]
  };

  const performanceChartData = {
    labels: revenueRoi.map(r => r.month),
    datasets: [
      {
        label: 'Gross Profit ROI %',
        type: 'line',
        data: revenueRoi.map(r => r.roi),
        borderColor: '#00ffe0',
        borderWidth: 3,
        yAxisID: 'y1'
      },
      {
        label: 'Active Delivery Projects',
        type: 'bar',
        data: [22, 26, 31, 35, 38],
        backgroundColor: 'rgba(123, 97, 255, 0.5)',
        yAxisID: 'y'
      }
    ]
  };

  const sectionLabels = [
    "Start",
    "1. Vision & Strategy",
    "2. Growth & Expansion",
    "3. Key Decisions",
    "4. Team Management",
    "5. Performance & Results",
    "6. Client Relations",
    "7. Innovation Direction",
    "8. Financial Oversight"
  ];

  const activeCardData = [
    { tag: "STRATEGY / DIRECTION", title: "1. Vision & Strategy", desc: "Define and drive the company’s vision, mission, and long-term goals." },
    { tag: "EXPANSION / ARR", title: "2. Business Growth", desc: "Identify new opportunities, global expansion routes and ARR strategies." },
    { tag: "DECISIONS / APPROVALS", title: "3. Key Decisions", desc: "Review strategic proposals, manage capital approvals and check investment ledgers." },
    { tag: "LEADERSHIP / HR", title: "4. Team Management", desc: "Build the core team, assign responsibilities and map company goals." },
    { tag: "RESULTS / DEADLINES", title: "5. Performance Monitoring", desc: "Track company returns, delivery projects and target deadlines." },
    { tag: "RELATIONS / DEALS", title: "6. Client Relations", desc: "Coordinate strategic deals, schedule high-level meetings and map partnerships." },
    { tag: "IoT / AI TRENDS", title: "7. Innovation Direction", desc: "Track new IoT and AI capabilities and manage R&D project pitches." },
    { tag: "OVERSIGHT / BUDGETS", title: "8. Financial Oversight", desc: "Monitor budgeting structures, capital expenditure spends and profit checklists." }
  ];

  const getCEOFramePath = () => {
    const height = scrollContainerRef.current?.clientHeight || window.innerHeight || 800;
    if (scrollTop <= height) {
      const progress = Math.min(1, Math.max(0, scrollTop / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 2 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - height) / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk2/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 3 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 2 * height) / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk3/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 4 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 3 * height) / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk4/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 5 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 4 * height) / height));
      const frameNum = String(Math.min(72, Math.floor(progress * 71) + 1)).padStart(3, '0');
      return `/walk5/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 6 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 5 * height) / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk6/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 7 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 6 * height) / height));
      const frameNum = String(Math.min(62, Math.floor(progress * 61) + 1)).padStart(3, '0');
      return `/walk7/ezgif-frame-${frameNum}.png`;
    } else if (scrollTop <= 8 * height) {
      const progress = Math.min(1, Math.max(0, (scrollTop - 7 * height) / height));
      const frameNum = String(Math.min(80, Math.floor(progress * 79) + 1)).padStart(3, '0');
      return `/walk8/ezgif-frame-${frameNum}.png`;
    }
    return `/walk8/ezgif-frame-080.png`;
  };

  // Premium 3D-deck slide transitions
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      rotateY: dir > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { type: "spring", stiffness: 300, damping: 30 },
        rotateY: { type: "spring", stiffness: 300, damping: 30 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      rotateY: dir < 0 ? 45 : -45,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.25 },
        scale: { type: "spring", stiffness: 300, damping: 30 },
        rotateY: { type: "spring", stiffness: 300, damping: 30 }
      }
    })
  };

  const renderActiveCard = (index) => {
    switch(index) {
      case 0:
        return (
          <RoleCard 
            tag="STRATEGY / DIRECTION"
            title="1. Vision & Strategy"
            desc="Define and drive the company’s vision, mission, and long-term goals."
            bgImage="/images/vision_strategy.png"
            onClick={null}
          />
        );
      case 1:
        return (
          <RoleCard 
            tag="EXPANSION / ARR"
            title="2. Business Growth"
            desc="Identify new opportunities, global expansion routes and ARR strategies."
            bgImage="/images/business_growth.png"
            onClick={null}
          />
        );
      case 2:
        return (
          <RoleCard 
            tag="DECISIONS / APPROVALS"
            title="3. Key Decisions"
            desc="Review strategic proposals, manage capital approvals and check investment ledgers."
            bgImage="/images/key_decisions.png"
            onClick={null}
          />
        );
      case 3:
        return (
          <RoleCard 
            tag="LEADERSHIP / HR"
            title="4. Team Management"
            desc="Build the core team, assign responsibilities and map company goals."
            bgImage="/images/team_management.png"
            onClick={null}
          />
        );
      case 4:
        return (
          <RoleCard 
            tag="RESULTS / DEADLINES"
            title="5. Performance Monitoring"
            desc="Track company returns, delivery projects and target deadlines."
            bgImage="/images/performance_monitoring.png"
            onClick={null}
          />
        );
      case 5:
        return (
          <RoleCard 
            tag="RELATIONS / DEALS"
            title="6. Client Relations"
            desc="Coordinate strategic deals, schedule high-level meetings and map partnerships."
            bgImage="/images/client_relations.png"
            onClick={null}
          />
        );
      case 6:
        return (
          <RoleCard 
            tag="IoT / AI TRENDS"
            title="7. Innovation Direction"
            desc="Track new IoT and AI capabilities and manage R&D project pitches."
            bgImage="/images/innovation_direction.png"
            onClick={null}
          />
        );
      case 7:
        return (
          <RoleCard 
            tag="OVERSIGHT / BUDGETS"
            title="8. Financial Oversight"
            desc="Monitor budgeting structures, capital expenditure spends and profit checklists."
            bgImage="/images/financial_oversight.png"
            onClick={null}
          />
        );
      default:
        return null;
    }
  };

  const renderActivePanel = (index) => {
    if (index === 0) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', opacity: 0.6 }}>
          <p style={{ fontSize: '15px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--blue)', fontWeight: '800', marginBottom: '16px' }}>Let's Go</p>
          <ArrowDown size={28} style={{ color: 'var(--blue)', animation: 'bounce 2s infinite' }} />
          <style>{`
            @keyframes bounce {
              0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
              40% { transform: translateY(-10px); }
              60% { transform: translateY(-5px); }
            }
          `}</style>
        </div>
      );
    }
    switch(index - 1) {
      case 0:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>1. Vision & Strategy</h2>
            
            {/* Sub content navigation buttons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS1Sub('market'); setActiveWorkspace({ slide: 1, tab: 'market' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Market Workspace ↗</button>
              <button className="btn-primary" onClick={() => { setS1Sub('products'); setActiveWorkspace({ slide: 1, tab: 'products' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Products Manager ↗</button>
              <button className="btn-primary" onClick={() => { setS1Sub('growth'); setActiveWorkspace({ slide: 1, tab: 'growth' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Growth Planner ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s1Sub === 'market' && (
                <div style={{ height: '100%', minHeight: '260px' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--blue)', fontWeight: '700', marginBottom: '8px' }}>IoT Digital Visibility Score (SEO/GEO/AEO)</h4>
                  <div style={{ height: '220px', position: 'relative' }}>
                    <Line data={marketChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              )}

              {s1Sub === 'products' && (
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: '800' }}>Products Slide Mapping</h4>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={() => setProdIndex(prev => Math.max(0, prev - 1))} disabled={prodIndex === 0}>‹</button>
                      <button className="btn-secondary" style={{ padding: '4px 8px' }} onClick={() => setProdIndex(prev => Math.min(3, prev + 1))} disabled={prodIndex === 3}>›</button>
                    </div>
                  </div>

                  {prodIndex === 0 && (
                    <div>
                      <h5 style={{ color: 'var(--green)', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>Live Current Projects</h5>
                      {productsList.live.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px', borderLeft: '2px solid var(--green)', paddingLeft: '8px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {prodIndex === 1 && (
                    <div>
                      <h5 style={{ color: 'var(--orange)', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>Never Touched Yet</h5>
                      {productsList.untouched.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px', borderLeft: '2px solid var(--orange)', paddingLeft: '8px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {prodIndex === 2 && (
                    <div>
                      <h5 style={{ color: 'var(--blue)', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>Supposed to Do</h5>
                      {productsList.todo.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px', borderLeft: '2px solid var(--blue)', paddingLeft: '8px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {prodIndex === 3 && (
                    <div>
                      <h5 style={{ color: 'var(--purple)', fontSize: '12px', fontWeight: '800', marginBottom: '6px' }}>Completed</h5>
                      {productsList.completed.map((p, i) => (
                        <div key={i} style={{ marginBottom: '8px', borderLeft: '2px solid var(--purple)', paddingLeft: '8px' }}>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>{p.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{p.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {s1Sub === 'growth' && (
                <div style={{ height: '100%', minHeight: '260px' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--purple)', fontWeight: '700', marginBottom: '8px' }}>Services Growth Portfolio (IT vs Core IoT)</h4>
                  <div style={{ height: '220px', position: 'relative' }}>
                    <Line data={growthServicesData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              )}
            </div>
            
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Define and drive the company’s vision, mission, and long-term goals. Focus on emerging industrial IoT sectors, brand authority, and strategic market positioning.
            </p>
          </div>
        );
      case 1:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>2. Business Growth & Expansion</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS2Sub('growth'); setActiveWorkspace({ slide: 2, tab: 'growth' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Business Growth ↗</button>
              <button className="btn-primary" onClick={() => { setS2Sub('expansion'); setActiveWorkspace({ slide: 2, tab: 'expansion' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Expansion Map ↗</button>
              <button className="btn-primary" onClick={() => { setS2Sub('strategies'); setActiveWorkspace({ slide: 2, tab: 'strategies' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Revenue Strategies ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s2Sub === 'growth' && (
                <div>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
                    <button className={`btn-secondary ${s2GrowthSub === 'client' ? 'btn-primary' : ''}`} onClick={() => setS2GrowthSub('client')} style={{ fontSize: '11px', padding: '4px 10px' }}>Client</button>
                    <button className={`btn-secondary ${s2GrowthSub === 'industries' ? 'btn-primary' : ''}`} onClick={() => setS2GrowthSub('industries')} style={{ fontSize: '11px', padding: '4px 10px' }}>Industries</button>
                    <button className={`btn-secondary ${s2GrowthSub === 'partnerships' ? 'btn-primary' : ''}`} onClick={() => setS2GrowthSub('partnerships')} style={{ fontSize: '11px', padding: '4px 10px' }}>Partnership</button>
                  </div>

                  {s2GrowthSub === 'client' && (
                    <div className="dashboard-grid">
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Add Client</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <input className="input-field" placeholder="Client Name" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
                          <button className="btn-primary" onClick={handleSaveClient}>Save Client</button>
                        </div>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Client List</h4>
                        <div className="excel-table-container" style={{ maxHeight: '120px' }}>
                          <table className="excel-table">
                            <tbody>
                              {clients.map((c, i) => (
                                  <tr key={i}>
                                    <td>{c.name}</td>
                                    <td>{c.value}</td>
                                  </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {s2GrowthSub === 'industries' && (
                    <div className="dashboard-grid">
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Target Sector</h4>
                        <input className="input-field" placeholder="Industry Name" value={newIndustry.name} onChange={e => setNewIndustry({ ...newIndustry, name: e.target.value })} />
                        <button className="btn-primary" style={{ marginTop: '6px' }} onClick={handleSaveIndustry}>Add Sector</button>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Target Sectors</h4>
                        <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '12px' }}>
                          {targetIndustries.map((ind, i) => (
                            <div key={i} style={{ padding: '4px 0' }}>{ind.name}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {s2GrowthSub === 'partnerships' && (
                    <div className="dashboard-grid">
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Add Alliance</h4>
                        <input className="input-field" placeholder="Partner Alliance Name" value={newPartner.partner} onChange={e => setNewPartner({ ...newPartner, partner: e.target.value })} />
                        <button className="btn-primary" style={{ marginTop: '6px' }} onClick={handleSavePartner}>Add Partner</button>
                      </div>
                      <div>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Alliances List</h4>
                        <div style={{ maxHeight: '120px', overflowY: 'auto', fontSize: '12px' }}>
                          {partnerships.map((p, i) => (
                            <div key={i} style={{ padding: '4px 0' }}>{p.partner}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {s2Sub === 'expansion' && (
                <div className="dashboard-grid">
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--blue)', marginBottom: '8px' }}>Local Business</h4>
                    <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '12px' }}>
                      {localExpansion.map((e, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', padding: '4px 0' }}>
                          <span>{e.city}</span>
                          <span style={{ color: e.status === 'Completed' ? 'var(--green)' : 'var(--orange)' }}>{e.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '800', color: 'var(--purple)', marginBottom: '8px' }}>Global Business</h4>
                    <div style={{ maxHeight: '150px', overflowY: 'auto', fontSize: '12px' }}>
                      {globalExpansion.map((e, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', padding: '4px 0' }}>
                          <span>{e.location}</span>
                          <span style={{ color: e.status === 'Completed' ? 'var(--green)' : 'var(--orange)' }}>{e.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {s2Sub === 'strategies' && (
                <div style={{ height: '100%', minHeight: '240px' }}>
                  <h4 style={{ fontSize: '14px', color: 'var(--cyan)', fontWeight: '700', marginBottom: '8px' }}>Revenue Strategy Map</h4>
                  <div style={{ height: '200px', position: 'relative' }}>
                    <Line data={revenueStrategiesData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Identify new opportunities, global expansion routes and ARR strategies. Chart growth paths in automotive, smart cities, and heavy manufacturing.
            </p>
          </div>
        );
      case 2:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>3. Key Decisions</h2>
            
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS3Sub('financial'); setActiveWorkspace({ slide: 3, tab: 'financial' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Financial Scope ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('operational'); setActiveWorkspace({ slide: 3, tab: 'operational' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Operational Limits ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('strategic'); setActiveWorkspace({ slide: 3, tab: 'strategic' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Strategic Goals ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('approvals'); setActiveWorkspace({ slide: 3, tab: 'approvals' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Approvals Board ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('investment'); setActiveWorkspace({ slide: 3, tab: 'investment' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Capital Ledger ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('partnership'); setActiveWorkspace({ slide: 3, tab: 'partnership' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Alliances Tracker ↗</button>
              <button className="btn-primary" onClick={() => { setS3Sub('overall'); setActiveWorkspace({ slide: 3, tab: 'overall' }); }} style={{ padding: '8px 12px', fontSize: '11.5px' }}>Decisions Overview ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s3Sub === 'financial' && (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Financial Alignment Details</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Allocated budget for Q3: ₹1.45 Cr. Capex bounds are active.</p>
                </div>
              )}

              {s3Sub === 'operational' && (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Operational Capacity Limits</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Assembly plant capacity: 100%. Productivity index is at 94%.</p>
                </div>
              )}

              {s3Sub === 'strategic' && (
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Strategic Objectives Map</h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Targeting complete core IoT shift. JV negotiations prioritised.</p>
                </div>
              )}

              {s3Sub === 'approvals' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '200px', overflowY: 'auto' }}>
                  {approvals.map(app => (
                    <div key={app.id} style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', fontSize: '13px', background: 'rgba(255,255,255,0.02)', padding: '6px 10px', borderRadius: '6px' }}>
                      <span>{app.title}</span>
                      {app.status === 'Pending' ? (
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button className="btn-primary" style={{ padding: '2px 6px', background: 'var(--green)', fontSize: '10px' }} onClick={() => handleDecisionAction(app.id, 'Approved')}>✓</button>
                          <button className="btn-secondary" style={{ padding: '2px 6px', color: 'var(--red)', borderColor: 'var(--red)', fontSize: '10px' }} onClick={() => handleDecisionAction(app.id, 'Dropped')}>✗</button>
                        </div>
                      ) : (
                        <span style={{ fontWeight: '700', color: app.status === 'Approved' ? 'var(--green)' : 'var(--red)' }}>{app.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {s3Sub === 'investment' && (
                <div className="excel-table-container">
                  <table className="excel-table">
                    <thead>
                      <tr>
                        <th>Target</th>
                        <th>Capital (₹L)</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investments.map((inv, idx) => (
                        <tr key={inv.id}>
                          <td contentEditable suppressContentEditableWarning={true} onBlur={e => handleInvestmentChange(idx, 'target', e.target.innerText)}>{inv.target}</td>
                          <td contentEditable suppressContentEditableWarning={true} onBlur={e => handleInvestmentChange(idx, 'amount', e.target.innerText)}>{inv.amount}</td>
                          <td contentEditable suppressContentEditableWarning={true} onBlur={e => handleInvestmentChange(idx, 'status', e.target.innerText)}>{inv.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s3Sub === 'partnership' && (
                <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  {partnerships.map((p, idx) => (
                    <div key={idx} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                      <strong>{p.partner}</strong> - Share: {p.share}
                    </div>
                  ))}
                </div>
              )}

              {s3Sub === 'overall' && (
                <div className="dashboard-grid-4">
                  <div className="panel" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Approved</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--green)' }}>{approvals.filter(a => a.status === 'Approved').length}</h3>
                  </div>
                  <div className="panel" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pending</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--blue)' }}>{approvals.filter(a => a.status === 'Pending').length}</h3>
                  </div>
                  <div className="panel" style={{ padding: '12px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Dropped</span>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--red)' }}>{approvals.filter(a => a.status === 'Dropped').length}</h3>
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Review strategic proposals, manage capital approvals and check investment ledgers. Authorize funds, track capex limits, and govern commercial proposals.
            </p>
          </div>
        );
      case 3:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>4. Leadership & Team Management</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS4Sub('buildteam'); setActiveWorkspace({ slide: 4, tab: 'buildteam' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Build Team ↗</button>
              <button className="btn-primary" onClick={() => { setS4Sub('heads'); setActiveWorkspace({ slide: 4, tab: 'heads' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Department Head ↗</button>
              <button className="btn-primary" onClick={() => { setS4Sub('goals'); setActiveWorkspace({ slide: 4, tab: 'goals' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Company Goal ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s4Sub === 'buildteam' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {departments.map((d, i) => (
                    <div key={i} style={{ fontSize: '12px', background: 'rgba(255,255,255,0.02)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: '700', display: 'flex', justifyContext: 'space-between' }}>
                        <span>{d.name}</span>
                        {d.trophy && <span style={{ color: 'var(--orange)' }}>🏆 Trophy</span>}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Employees: {d.employees} | Target: {d.targetHiring} | Fire: {d.fireListCount}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {s4Sub === 'heads' && (
                <div className="dashboard-grid">
                  <div className="excel-table-container">
                    <table className="excel-table">
                      <tbody>
                        {responsibilities.map((r) => (
                          <tr key={r.id}>
                            <td>{r.department}</td>
                            <td>{r.desc}</td>
                            <td style={{ color: r.status === 'Handled' ? 'var(--green)' : 'var(--orange)' }}>{r.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '4px' }}>Send Question</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <textarea className="input-field" rows="2" placeholder="Write query directive..." value={feedbackInput.msg} onChange={e => setFeedbackInput({ ...feedbackInput, msg: e.target.value })}></textarea>
                      <button className="btn-primary" onClick={handleSendFeedback}>Send</button>
                    </div>
                  </div>
                </div>
              )}

              {s4Sub === 'goals' && (
                <div className="dashboard-grid">
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Active Goals</h4>
                    {companyGoals.map(g => (
                      <div key={g.id} style={{ fontSize: '12px', padding: '4px 0' }}>{g.title}</div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Add Goal</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <input className="input-field" placeholder="Goal objective..." value={newGoalText} onChange={e => setNewGoalText(e.target.value)} />
                      <button className="btn-primary" onClick={handleAddGoal}>Add</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Build the core team, assign responsibilities and map company goals. Guide talent acquisition, check departmental progress, and coordinate feedback.
            </p>
          </div>
        );
      case 4:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>5. Performance & Results Monitoring</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS5Sub('revenue'); setActiveWorkspace({ slide: 5, tab: 'revenue' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Revenue Ledger ↗</button>
              <button className="btn-primary" onClick={() => { setS5Sub('projects'); setActiveWorkspace({ slide: 5, tab: 'projects' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Active Projects ↗</button>
              <button className="btn-primary" onClick={() => { setS5Sub('growth'); setActiveWorkspace({ slide: 5, tab: 'growth' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Growth Trends ↗</button>
              <button className="btn-primary" onClick={() => { setS5Sub('deadlines'); setActiveWorkspace({ slide: 5, tab: 'deadlines' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Target Deadlines ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s5Sub === 'revenue' && (
                <div className="excel-table-container">
                  <table className="excel-table">
                    <thead>
                      <tr>
                        <th>Month</th>
                        <th>Revenue (₹L)</th>
                        <th>Expenses (₹L)</th>
                        <th>ROI %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {revenueRoi.map((item, idx) => (
                        <tr key={idx}>
                          <td>{item.month}</td>
                          <td contentEditable suppressContentEditableWarning={true} onBlur={e => handleRevenueLedgerChange(idx, 'revenue', e.target.innerText)}>{item.revenue}</td>
                          <td contentEditable suppressContentEditableWarning={true} onBlur={e => handleRevenueLedgerChange(idx, 'expenses', e.target.innerText)}>{item.expenses}</td>
                          <td style={{ color: 'var(--green)' }}>{item.roi}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s5Sub === 'projects' && (
                <div className="excel-table-container">
                  <table className="excel-table">
                    <tbody>
                      {performanceProjects.map((p, idx) => (
                        <tr key={idx}>
                          <td>{p.name}</td>
                          <td>{p.client}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s5Sub === 'growth' && (
                <div style={{ height: '100%', minHeight: '240px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--blue)', fontWeight: '700', marginBottom: '8px' }}>Active Projects Growth Trend</h4>
                  <div style={{ height: '180px', position: 'relative' }}>
                    <Bar data={performanceChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                  </div>
                </div>
              )}

              {s5Sub === 'deadlines' && (
                <div className="excel-table-container">
                  <table className="excel-table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Deadline</th>
                        <th>Met %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projectDeadlines.map((pd, idx) => (
                        <tr key={idx}>
                          <td>{pd.project}</td>
                          <td>{pd.deadline}</td>
                          <td style={{ color: 'var(--green)' }}>{pd.targetMet}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Track company returns, delivery projects and target deadlines. Keep tabs on ROI percentages, project timelines, and delivery milestones.
            </p>
          </div>
        );
      case 5:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', margin: 0 }}>6. Client Relations</h2>
              <button className="btn-primary" onClick={() => setActiveWorkspace({ slide: 6, tab: 'relations' })} style={{ padding: '10px 18px', fontSize: '13px' }}>Open Workspace ↗</button>
            </div>
            
            <div className="dashboard-grid" style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>Schedule High-Level Deal / Event</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input className="input-field" placeholder="Event Name" value={newMeeting.event} onChange={e => setNewMeeting({ ...newMeeting, event: e.target.value })} />
                  <input className="input-field" type="date" value={newMeeting.date} onChange={e => setNewMeeting({ ...newMeeting, date: e.target.value })} />
                  <input className="input-field" type="time" value={newMeeting.time} onChange={e => setNewMeeting({ ...newMeeting, time: e.target.value })} />
                  <button className="btn-primary" onClick={handleSaveMeeting}>Confirm Schedule</button>
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '8px' }}>High-Level Relations Ledger</h4>
                <div className="excel-table-container" style={{ maxHeight: '180px' }}>
                  <table className="excel-table">
                    <tbody>
                      {meetings.map((m, idx) => (
                        <tr key={idx}>
                          <td>{m.event}</td>
                          <td>{m.date} | {m.time}</td>
                          <td style={{ color: 'var(--blue)' }}>{m.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Coordinate strategic deals, schedule high-level meetings and map partnerships. Foster enterprise relations, organize partner events, and schedule key discussions.
            </p>
          </div>
        );
      case 6:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>7. Innovation & Company Direction</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS7Sub('iot'); setActiveWorkspace({ slide: 7, tab: 'iot' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>IoT Trends ↗</button>
              <button className="btn-primary" onClick={() => { setS7Sub('ai'); setActiveWorkspace({ slide: 7, tab: 'ai' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>AI Trends ↗</button>
              <button className="btn-primary" onClick={() => { setS7Sub('incubation'); setActiveWorkspace({ slide: 7, tab: 'incubation' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Innovation Pitches ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s7Sub === 'iot' && (
                <div className="dashboard-grid">
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Add IoT Trend</h4>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input className="input-field" placeholder="Protocol..." value={newIotTrend} onChange={e => setNewIotTrend(e.target.value)} />
                      <button className="btn-primary" onClick={handleAddIotTrend}>Add</button>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>IoT Capability Map</h4>
                    {iotTrends.map((t, idx) => (
                      <div key={idx} style={{ padding: '2px 0', fontSize: '12px' }}>{t.trend}</div>
                    ))}
                  </div>
                </div>
              )}

              {s7Sub === 'ai' && (
                <div style={{ maxHeight: '180px', overflowY: 'auto' }}>
                  {aiTrends.map((t, idx) => (
                    <div key={idx} style={{ padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                      {t.trend}
                    </div>
                  ))}
                </div>
              )}

              {s7Sub === 'incubation' && (
                <div style={{ display: 'flex', gap: '16px' }}>
                  {innovationPitches.map((p, idx) => (
                    <div key={idx} style={{ flex: 1, background: 'rgba(255,255,255,0.02)', padding: '10px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                      <div style={{ fontWeight: '700', fontSize: '13px' }}>{p.title}</div>
                      <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>{p.summary}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Track new IoT and AI capabilities and manage R&D project pitches. Investigate edge TinyML capabilities, solar sensors, and incubation pitches.
            </p>
          </div>
        );
      case 7:
        return (
          <div className="panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>8. Financial Oversight</h2>
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <button className="btn-primary" onClick={() => { setS8Sub('budgeting'); setActiveWorkspace({ slide: 8, tab: 'budgeting' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Monitor Budgeting ↗</button>
              <button className="btn-primary" onClick={() => { setS8Sub('spend'); setActiveWorkspace({ slide: 8, tab: 'spend' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Investment CapEx ↗</button>
              <button className="btn-primary" onClick={() => { setS8Sub('profitability'); setActiveWorkspace({ slide: 8, tab: 'profitability' }); }} style={{ padding: '10px 18px', fontSize: '13px' }}>Profitability Margins ↗</button>
            </div>

            <div style={{ flex: 1, minHeight: 0, overflowY: 'auto' }}>
              {s8Sub === 'budgeting' && (
                <div className="dashboard-grid">
                  <div style={{ height: '220px', display: 'flex', justifyContext: 'center', alignItems: 'center' }}>
                    <div style={{ width: '160px', height: '160px' }}>
                      <Doughnut data={budgetAllocation} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', center: 'center', fontSize: '13px' }}>
                    <div>Budget Monthly Cap: <strong>₹45L</strong></div>
                    <div>Utilization Index: <strong>78.4%</strong></div>
                  </div>
                </div>
              )}

              {s8Sub === 'spend' && (
                <div className="excel-table-container">
                  <table className="excel-table">
                    <thead>
                      <tr>
                        <th>Sector</th>
                        <th>Spend</th>
                        <th>Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {investmentSpend.map((s, idx) => (
                        <tr key={idx}>
                          <td>{s.sector}</td>
                          <td>{s.spend}</td>
                          <td>{s.progress}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {s8Sub === 'profitability' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                  <div>✓ Gross Margins track at 32% limits.</div>
                  <div>✓ R&D investments yield is standing at 2.4x.</div>
                </div>
              )}
            </div>

            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--border)', lineHeight: '1.5' }}>
              Monitor budgeting structures, capital expenditure spends and profit checklists. Enforce monthly caps, audit sector spends, and verify profitability indices.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderSubPage = () => {
    let title = "";
    let content = null;
    const { slide, tab } = activeWorkspace || {};

    if (slide === 1) {
      if (tab === 'market') {
        title = "Market Visibility Workspace";
        content = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--blue)', fontWeight: '700', marginBottom: '16px' }}>IoT Digital Visibility Score (SEO/GEO/AEO)</h4>
              <div style={{ height: '320px', position: 'relative' }}>
                <Line data={marketChartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Metric / Dataset</th>
                    <th>Jan</th>
                    <th>Feb</th>
                    <th>Mar</th>
                    <th>Apr</th>
                    <th>May</th>
                    <th>Jun</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--blue)' }}>IoT SEO Visibility</td>
                    {marketData.seo.map((val, idx) => (
                      <td
                        key={`seo-${idx}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleMarketCellEdit('seo', idx, e.target.innerText)}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--purple)' }}>IoT GEO Presence</td>
                    {marketData.geo.map((val, idx) => (
                      <td
                        key={`geo-${idx}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleMarketCellEdit('geo', idx, e.target.innerText)}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--cyan)' }}>IoT AEO Search Citations</td>
                    {marketData.aeo.map((val, idx) => (
                      <td
                        key={`aeo-${idx}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleMarketCellEdit('aeo', idx, e.target.innerText)}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'products') {
        title = "Hardware Products Lifecycle Manager";
        content = (
          <div className="dashboard-grid" style={{ alignItems: 'start', gap: '32px' }}>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', borderBottom: '1px solid var(--border)', paddingBottom: '10px', color: 'var(--blue)' }}>
                Add Prototype Product
              </h3>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Product Name</label>
                <input
                  className="input-field"
                  placeholder="e.g. Agricultural Soil Probe"
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Stage / Status</label>
                <select
                  className="input-field"
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value)}
                  style={{ background: '#0a0f24', color: '#fff', border: '1px solid var(--border)' }}
                >
                  <option value="live">Live Current Projects</option>
                  <option value="untouched">Never Touched Yet</option>
                  <option value="todo">Supposed to Do</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Description</label>
                <textarea
                  className="input-field"
                  rows="4"
                  placeholder="Product specifications..."
                  value={newProductDesc}
                  onChange={(e) => setNewProductDesc(e.target.value)}
                  style={{ resize: 'none' }}
                />
              </div>
              <button className="btn-primary" onClick={handleAddProduct}>
                Add to Lifecycle Map
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {['live', 'untouched', 'todo', 'completed'].map((cat) => (
                <div key={cat} className="panel" style={{ padding: '20px' }}>
                  <h4 style={{
                    fontSize: '14px',
                    fontWeight: '800',
                    textTransform: 'uppercase',
                    marginBottom: '12px',
                    color: cat === 'live' ? 'var(--green)' : cat === 'untouched' ? 'var(--orange)' : cat === 'todo' ? 'var(--blue)' : 'var(--purple)'
                  }}>
                    {getCategoryLabel(cat)} ({productsList[cat].length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {productsList[cat].map((prod, index) => (
                      <div key={index} style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '12px 16px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.04)', display: 'flex', justifyContext: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '14px', fontWeight: '700' }}>{prod.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{prod.desc}</div>
                        </div>
                        <button className="btn-secondary" onClick={() => handleDeleteProduct(cat, index)} style={{ padding: '4px 10px', fontSize: '11px', color: 'var(--red)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (tab === 'growth') {
        title = "Services & IoT Growth Portfolio Planner";
        content = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%' }}>
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--purple)', fontWeight: '700', marginBottom: '16px' }}>Services Growth Portfolio (IT vs Core IoT)</h4>
              <div style={{ height: '320px', position: 'relative' }}>
                <Line data={growthServicesData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>

            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Portfolio / Segment</th>
                    <th>Q1 2025</th>
                    <th>Q2 2025</th>
                    <th>Q3 2025</th>
                    <th>Q4 2025</th>
                    <th>Q1 2026</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--purple)' }}>IT Services Projects</td>
                    {growthData.services.map((val, idx) => (
                      <td
                        key={`services-${idx}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleGrowthCellEdit('services', idx, e.target.innerText)}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--blue)' }}>IoT Projects (Core)</td>
                    {growthData.iot.map((val, idx) => (
                      <td
                        key={`iot-${idx}`}
                        contentEditable
                        suppressContentEditableWarning
                        onBlur={(e) => handleGrowthCellEdit('iot', idx, e.target.innerText)}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    } else if (slide === 2) {
      if (tab === 'growth') {
        title = "Business Growth Matrix";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Manage Clients</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input className="input-field" placeholder="Client Name" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} />
                <input className="input-field" placeholder="Industry" value={newClient.industry} onChange={e => setNewClient({ ...newClient, industry: e.target.value })} />
                <input className="input-field" placeholder="Value (e.g. ₹1.5 Cr)" value={newClient.value} onChange={e => setNewClient({ ...newClient, value: e.target.value })} />
                <button className="btn-primary" onClick={handleSaveClient}>Save Client</button>
              </div>
              <div className="excel-table-container" style={{ marginTop: '16px' }}>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Industry</th>
                      <th>Value</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((c, i) => (
                      <tr key={i}>
                        <td>{c.name}</td>
                        <td>{c.industry}</td>
                        <td>{c.value}</td>
                        <td>
                          <button className="btn-secondary" onClick={() => setClients(clients.filter((_, idx) => idx !== i))} style={{ padding: '2px 8px', color: 'var(--red)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Target Sectors</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="input-field" placeholder="Sector Name" value={newIndustry.name} onChange={e => setNewIndustry({ ...newIndustry, name: e.target.value })} />
                <button className="btn-primary" onClick={handleSaveIndustry}>Add</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {targetIndustries.map((ind, i) => (
                  <div key={i} style={{ display: 'flex', justifyContext: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <span>{ind.name}</span>
                    <button className="btn-secondary" onClick={() => setTargetIndustries(targetIndustries.filter((_, idx) => idx !== i))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (tab === 'expansion') {
        title = "Global & Local Expansion Map";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Local Expansion Cities</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="input-field" placeholder="City Name" value={newLocalCity} onChange={e => setNewLocalCity(e.target.value)} />
                <button className="btn-primary" onClick={() => {
                  if(!newLocalCity) return;
                  setLocalExpansion([...localExpansion, { city: newLocalCity, status: 'Not Done Yet' }]);
                  setNewLocalCity('');
                }}>Add City</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {localExpansion.map((e, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <span>{e.city}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select 
                        value={e.status} 
                        onChange={(ev) => {
                          const updated = [...localExpansion];
                          updated[idx].status = ev.target.value;
                          setLocalExpansion(updated);
                        }}
                        style={{ background: '#0a0f24', color: '#fff', border: '1px solid var(--border)', padding: '4px', borderRadius: '4px' }}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Not Done Yet">Not Done Yet</option>
                      </select>
                      <button className="btn-secondary" onClick={() => setLocalExpansion(localExpansion.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Global Hubs</h4>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input className="input-field" placeholder="Location Name" value={newGlobalLoc} onChange={e => setNewGlobalLoc(e.target.value)} />
                <button className="btn-primary" onClick={() => {
                  if(!newGlobalLoc) return;
                  setGlobalExpansion([...globalExpansion, { location: newGlobalLoc, status: 'Not Done Yet' }]);
                  setNewGlobalLoc('');
                }}>Add Location</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {globalExpansion.map((e, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <span>{e.location}</span>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <select 
                        value={e.status} 
                        onChange={(ev) => {
                          const updated = [...globalExpansion];
                          updated[idx].status = ev.target.value;
                          setGlobalExpansion(updated);
                        }}
                        style={{ background: '#0a0f24', color: '#fff', border: '1px solid var(--border)', padding: '4px', borderRadius: '4px' }}
                      >
                        <option value="Completed">Completed</option>
                        <option value="Not Done Yet">Not Done Yet</option>
                      </select>
                      <button className="btn-secondary" onClick={() => setGlobalExpansion(globalExpansion.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (tab === 'strategies') {
        title = "Revenue Strategy Ledger";
        content = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--cyan)', fontWeight: '700', marginBottom: '16px' }}>ARR Growth Projection Chart</h4>
              <div style={{ height: '300px', position: 'relative' }}>
                <Line data={revenueStrategiesData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Year / Target</th>
                    <th>2023</th>
                    <th>2024</th>
                    <th>2025</th>
                    <th>2026 (Strategic Goal)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: '700', color: 'var(--blue)' }}>Gross ARR (in ₹ Cr)</td>
                    {revenueArr.map((val, idx) => (
                      <td 
                        key={idx} 
                        contentEditable 
                        suppressContentEditableWarning 
                        onBlur={(e) => {
                          const updated = [...revenueArr];
                          updated[idx] = parseFloat(e.target.innerText) || 0;
                          setRevenueArr(updated);
                        }}
                        style={{ cursor: 'cell' }}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    } else if (slide === 3) {
      if (tab === 'financial' || tab === 'operational' || tab === 'strategic' || tab === 'overall') {
        title = "Strategic Capital & Operational Scope";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--blue)' }}>Financial Limits</h3>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Allocated Q3 Budget (in ₹ Cr)</label>
                <input className="input-field" value={allocatedBudget} onChange={e => setAllocatedBudget(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Operational Capacity Limit (%)</label>
                <input className="input-field" value={capacityLimit} onChange={e => setCapacityLimit(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Productivity Index (%)</label>
                <input className="input-field" value={productivityIndex} onChange={e => setProductivityIndex(e.target.value)} />
              </div>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--purple)' }}>Approvals Executive Summary</h3>
              <div className="dashboard-grid-4" style={{ gap: '12px', marginBottom: 0 }}>
                <div className="panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Approved</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--green)' }}>{approvals.filter(a => a.status === 'Approved').length}</h3>
                </div>
                <div className="panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Pending</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--blue)' }}>{approvals.filter(a => a.status === 'Pending').length}</h3>
                </div>
                <div className="panel" style={{ padding: '12px', background: 'rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Dropped</span>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--red)' }}>{approvals.filter(a => a.status === 'Dropped').length}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      } else if (tab === 'approvals') {
        title = "Strategic Decisions Approvals Board";
        content = (
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Review Proposals</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {approvals.map(app => (
                <div key={app.id} style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div>
                    <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--purple)', display: 'block', marginBottom: '2px' }}>{app.type}</span>
                    <strong style={{ fontSize: '14px' }}>{app.title}</strong>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-primary" style={{ padding: '6px 14px', background: 'var(--green)', fontSize: '12px' }} onClick={() => handleDecisionAction(app.id, 'Approved')}>Approve</button>
                    <button className="btn-secondary" style={{ padding: '6px 14px', color: 'var(--red)', borderColor: 'rgba(239, 68, 68, 0.2)' }} onClick={() => handleDecisionAction(app.id, 'Dropped')}>Reject</button>
                    <button className="btn-secondary" style={{ padding: '6px 14px' }} onClick={() => setApprovals(approvals.filter(a => a.id !== app.id))}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (tab === 'investment') {
        title = "Capital Investments Ledger";
        content = (
          <div className="dashboard-grid" style={{ alignItems: 'start' }}>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add Capital Allocation</h4>
              <input className="input-field" placeholder="Target Sector / Hub" value={newInvestmentTarget} onChange={e => setNewInvestmentTarget(e.target.value)} />
              <input className="input-field" placeholder="Capital Amount (₹L)" value={newInvestmentAmount} onChange={e => setNewInvestmentAmount(e.target.value)} />
              <input className="input-field" placeholder="ROI % Target" value={newInvestmentRoi} onChange={e => setNewInvestmentRoi(e.target.value)} />
              <select className="input-field" value={newInvestmentStatus} onChange={e => setNewInvestmentStatus(e.target.value)} style={{ background: '#0a0f24', color: '#fff', border: '1px solid var(--border)' }}>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Dropped">Dropped</option>
              </select>
              <button className="btn-primary" onClick={() => {
                if(!newInvestmentTarget) return;
                setInvestments([...investments, { id: Date.now(), target: newInvestmentTarget, amount: newInvestmentAmount, roi: newInvestmentRoi, status: newInvestmentStatus }]);
                setNewInvestmentTarget('');
                setNewInvestmentAmount('');
                setNewInvestmentRoi('');
              }}>Add Investment Record</button>
            </div>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Target Sector</th>
                    <th>Capital (₹L)</th>
                    <th>ROI %</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv, idx) => (
                    <tr key={inv.id}>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleInvestmentChange(idx, 'target', e.target.innerText)}>{inv.target}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleInvestmentChange(idx, 'amount', e.target.innerText)}>{inv.amount}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleInvestmentChange(idx, 'roi', e.target.innerText)}>{inv.roi}%</td>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleInvestmentChange(idx, 'status', e.target.innerText)}>{inv.status}</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setInvestments(investments.filter(i => i.id !== inv.id))} style={{ padding: '2px 8px', color: 'var(--red)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'partnership') {
        title = "Alliances & Partnership Tracker";
        content = (
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Strategic Alliances</h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input className="input-field" placeholder="Partner Name" value={newPartner.partner} onChange={e => setNewPartner({ ...newPartner, partner: e.target.value })} />
              <input className="input-field" placeholder="Strategic Share %" value={newPartner.share} onChange={e => setNewPartner({ ...newPartner, share: e.target.value })} />
              <button className="btn-primary" onClick={handleSavePartner}>Add Alliance</button>
            </div>
            <div className="excel-table-container" style={{ marginTop: '16px' }}>
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Alliance / Partner</th>
                    <th>Share %</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {partnerships.map((p, idx) => (
                    <tr key={idx}>
                      <td>{p.partner}</td>
                      <td>{p.share}</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setPartnerships(partnerships.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    } else if (slide === 4) {
      if (tab === 'buildteam') {
        title = "Department staffing & Hirings";
        content = (
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Department staffing list</h4>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Department</th>
                    <th>Employees</th>
                    <th>Hiring Target</th>
                    <th>Key Role Needed</th>
                    <th>Trophy</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d, i) => (
                    <tr key={i}>
                      <td>{d.name}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...departments];
                        updated[i].employees = parseInt(e.target.innerText) || 0;
                        setDepartments(updated);
                      }}>{d.employees}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...departments];
                        updated[i].targetHiring = parseInt(e.target.innerText) || 0;
                        setDepartments(updated);
                      }}>{d.targetHiring}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...departments];
                        updated[i].higherNeeded = e.target.innerText;
                        setDepartments(updated);
                      }}>{d.higherNeeded}</td>
                      <td>
                        <button 
                          className="btn-secondary" 
                          onClick={() => {
                            const updated = [...departments];
                            updated[i].trophy = !updated[i].trophy;
                            setDepartments(updated);
                          }}
                          style={{ padding: '4px 10px', color: d.trophy ? 'var(--orange)' : 'var(--text-muted)' }}
                        >
                          {d.trophy ? '🏆 Active' : 'None'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'heads') {
        title = "Directives & Operational Responsibilities";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Directives Broadcast</h4>
              <textarea className="input-field" rows="4" placeholder="Type directive message..." value={feedbackInput.msg} onChange={e => setFeedbackInput({ ...feedbackInput, msg: e.target.value })} style={{ resize: 'none' }} />
              <button className="btn-primary" onClick={handleSendFeedback}>Send Directive to Dept Heads</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Responsibilities Ledger</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input className="input-field" id="new-resp-dept" placeholder="Dept" />
                <input className="input-field" id="new-resp-desc" placeholder="Responsibility description" />
                <button className="btn-primary" onClick={() => {
                  const dept = document.getElementById('new-resp-dept').value;
                  const desc = document.getElementById('new-resp-desc').value;
                  if(!desc) return;
                  setResponsibilities([...responsibilities, { id: Date.now(), department: dept, desc: desc, status: 'Pending' }]);
                  document.getElementById('new-resp-dept').value = '';
                  document.getElementById('new-resp-desc').value = '';
                }}>Add</button>
              </div>
              <div className="excel-table-container" style={{ marginTop: '16px' }}>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Dept</th>
                      <th>Description</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {responsibilities.map((r, i) => (
                      <tr key={r.id}>
                        <td>{r.department}</td>
                        <td>{r.desc}</td>
                        <td>
                          <button 
                            className="btn-secondary" 
                            style={{ padding: '2px 8px', color: r.status === 'Handled' ? 'var(--green)' : 'var(--orange)' }}
                            onClick={() => {
                              const updated = [...responsibilities];
                              updated[i].status = updated[i].status === 'Handled' ? 'Pending' : 'Handled';
                              setResponsibilities(updated);
                            }}
                          >
                            {r.status}
                          </button>
                        </td>
                        <td>
                          <button className="btn-secondary" onClick={() => setResponsibilities(responsibilities.filter(resp => resp.id !== r.id))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      } else if (tab === 'goals') {
        title = "Company Strategic Goals Board";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add Strategic Objective</h4>
              <input className="input-field" placeholder="Goal objective..." value={newGoalText} onChange={e => setNewGoalText(e.target.value)} />
              <input className="input-field" placeholder="Quarter / Timeline" value={newGoalQuarter} onChange={e => setNewGoalQuarter(e.target.value)} />
              <button className="btn-primary" onClick={handleAddGoal}>Add Company Goal</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Active Company Objectives</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {companyGoals.map(g => (
                  <div key={g.id} style={{ display: 'flex', justifyContext: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--blue)' }}>Timeline: {g.targetDate}</span>
                      <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>{g.title}</div>
                    </div>
                    <button className="btn-secondary" onClick={() => setCompanyGoals(companyGoals.filter(goal => goal.id !== g.id))} style={{ padding: '4px 10px', color: 'var(--red)' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    } else if (slide === 5) {
      if (tab === 'revenue') {
        title = "Monthly Revenue Ledger";
        content = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="panel" style={{ display: 'flex', gap: '10px' }}>
              <input className="input-field" placeholder="Month" value={newRevenueMonth} onChange={e => setNewRevenueMonth(e.target.value)} />
              <input className="input-field" placeholder="Revenue (₹L)" value={newRevenueVal} onChange={e => setNewRevenueVal(e.target.value)} />
              <input className="input-field" placeholder="Expenses (₹L)" value={newRevenueExp} onChange={e => setNewRevenueExp(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newRevenueMonth) return;
                const r = parseFloat(newRevenueVal) || 0;
                const ex = parseFloat(newRevenueExp) || 0;
                const profit = r - ex;
                const roi = ex > 0 ? Math.round((profit / ex) * 100) : 0;
                setRevenueRoi([...revenueRoi, { month: newRevenueMonth, revenue: r, expenses: ex, roi: roi }]);
                setNewRevenueMonth('');
                setNewRevenueVal('');
                setNewRevenueExp('');
              }}>Add Record</button>
            </div>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Revenue (₹L)</th>
                    <th>Expenses (₹L)</th>
                    <th>ROI %</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {revenueRoi.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.month}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleRevenueLedgerChange(idx, 'revenue', e.target.innerText)}>{item.revenue}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={e => handleRevenueLedgerChange(idx, 'expenses', e.target.innerText)}>{item.expenses}</td>
                      <td style={{ color: 'var(--green)' }}>{item.roi}%</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setRevenueRoi(revenueRoi.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'projects') {
        title = "Active Delivery Projects Board";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Register New Project</h4>
              <input className="input-field" placeholder="Project Name" value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
              <input className="input-field" placeholder="Client Name" value={newProjectClient} onChange={e => setNewProjectClient(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newProjectName) return;
                setPerformanceProjects([...performanceProjects, { name: newProjectName, client: newProjectClient }]);
                setNewProjectName('');
                setNewProjectClient('');
              }}>Register Project</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Active Operations Pipeline</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {performanceProjects.map((p, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Client: {p.client}</span>
                      <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>{p.name}</div>
                    </div>
                    <button className="btn-secondary" onClick={() => setPerformanceProjects(performanceProjects.filter((_, i) => i !== idx))} style={{ padding: '4px 10px', color: 'var(--red)' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (tab === 'growth') {
        title = "Active Projects Growth Trends";
        content = (
          <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '24px', borderRadius: '16px', border: '1px solid var(--border)' }}>
            <h4 style={{ fontSize: '16px', color: 'var(--blue)', fontWeight: '700', marginBottom: '16px' }}>Active Projects Growth Trend</h4>
            <div style={{ height: '320px', position: 'relative' }}>
              <Bar data={performanceChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        );
      } else if (tab === 'deadlines') {
        title = "Project Target Deadlines Tracker";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add Deadline Metric</h4>
              <input className="input-field" placeholder="Project Name" value={newProjectDeadlineName} onChange={e => setNewProjectDeadlineName(e.target.value)} />
              <input className="input-field" type="date" value={newProjectDeadline} onChange={e => setNewProjectDeadline(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newProjectDeadlineName) return;
                setProjectDeadlines([...projectDeadlines, { project: newProjectDeadlineName, deadline: newProjectDeadline, targetMet: '0%' }]);
                setNewProjectDeadlineName('');
                setNewProjectDeadline('');
              }}>Set Target</button>
            </div>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Target Date</th>
                    <th>Completion %</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projectDeadlines.map((pd, idx) => (
                    <tr key={idx}>
                      <td>{pd.project}</td>
                      <td>{pd.deadline}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...projectDeadlines];
                        updated[idx].targetMet = e.target.innerText;
                        setProjectDeadlines(updated);
                      }} style={{ color: 'var(--green)' }}>{pd.targetMet}</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setProjectDeadlines(projectDeadlines.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      }
    } else if (slide === 6) {
      title = "Client Relations & Event Scheduler";
      content = (
        <div className="dashboard-grid" style={{ alignItems: 'start', gap: '32px' }}>
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Schedule High-Level Deal / Event</h4>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Event / Meeting Name</label>
              <input className="input-field" placeholder="Event Name" value={newMeeting.event} onChange={e => setNewMeeting({ ...newMeeting, event: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Date</label>
              <input className="input-field" type="date" value={newMeeting.date} onChange={e => setNewMeeting({ ...newMeeting, date: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Time</label>
              <input className="input-field" type="time" value={newMeeting.time} onChange={e => setNewMeeting({ ...newMeeting, time: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Category Status</label>
              <select className="input-field" value={newMeeting.status} onChange={e => setNewMeeting({ ...newMeeting, status: e.target.value })} style={{ background: '#0a0f24', color: '#fff', border: '1px solid var(--border)' }}>
                <option value="Meeting">Meeting</option>
                <option value="Deal">Deal</option>
                <option value="Event">Event</option>
              </select>
            </div>
            <button className="btn-primary" onClick={handleSaveMeeting}>Confirm Schedule</button>
          </div>

          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700', borderBottom: '1px solid var(--border)', paddingBottom: '10px' }}>Meetings Ledger</h4>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Event / Meeting</th>
                    <th>Date / Time</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {meetings.map((m, idx) => (
                    <tr key={idx}>
                      <td>{m.event}</td>
                      <td>{m.date} | {m.time}</td>
                      <td style={{ color: 'var(--blue)' }}>{m.status}</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setMeetings(meetings.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    } else if (slide === 7) {
      if (tab === 'iot') {
        title = "IoT capability & Trends Map";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add IoT Trend</h4>
              <input className="input-field" placeholder="Protocol / Trend (e.g. NB-IoT Node)" value={newIotTrend} onChange={e => setNewIotTrend(e.target.value)} />
              <button className="btn-primary" onClick={handleAddIotTrend}>Add Capability</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>IoT Capability Map</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {iotTrends.map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <span>{t.trend}</span>
                    <button className="btn-secondary" onClick={() => setIotTrends(iotTrends.filter((_, i) => i !== idx))} style={{ padding: '4px 10px', color: 'var(--red)' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (tab === 'ai') {
        title = "AI anomaly detection & Predict trends";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add AI Anomaly Metric</h4>
              <input className="input-field" placeholder="Algorithm / Model..." value={newAiTrendText} onChange={e => setNewAiTrendText(e.target.value)} />
              <input className="input-field" placeholder="Relevance (e.g. Critical)" value={newAiTrendRelevance} onChange={e => setNewAiTrendRelevance(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newAiTrendText) return;
                setAiTrends([...aiTrends, { trend: newAiTrendText, relevance: newAiTrendRelevance }]);
                setNewAiTrendText('');
              }}>Save AI Trend</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>AI Core Capabilties</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {aiTrends.map((t, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '12px 18px', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--cyan)' }}>Relevance: {t.relevance}</span>
                      <div style={{ fontSize: '14px', fontWeight: '700', marginTop: '2px' }}>{t.trend}</div>
                    </div>
                    <button className="btn-secondary" onClick={() => setAiTrends(aiTrends.filter((_, i) => i !== idx))} style={{ padding: '4px 10px', color: 'var(--red)' }}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (tab === 'incubation') {
        title = "Incubation Pitches R&D Board";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>New Incubation Pitch</h4>
              <input className="input-field" placeholder="Pitch Title" value={newPitchTitle} onChange={e => setNewPitchTitle(e.target.value)} />
              <textarea className="input-field" rows="4" placeholder="Summary..." value={newPitchSummary} onChange={e => setNewPitchSummary(e.target.value)} style={{ resize: 'none' }} />
              <button className="btn-primary" onClick={() => {
                if(!newPitchTitle) return;
                setInnovationPitches([...innovationPitches, { title: newPitchTitle, summary: newPitchSummary }]);
                setNewPitchTitle('');
                setNewPitchSummary('');
              }}>Add Pitch</button>
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>R&D Incubation Pitches</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {innovationPitches.map((p, idx) => (
                  <div key={idx} style={{ background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '15px' }}>{p.title}</strong>
                      <button className="btn-secondary" onClick={() => setInnovationPitches(innovationPitches.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>{p.summary}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    } else if (slide === 8) {
      if (tab === 'budgeting') {
        title = "Budgeting allocation & utilization";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Budget values (in %)</h4>
              {['R&D Hardware', 'Cloud Infrastructure', 'Personnel / HR', 'Operations & Admin', 'Marketing / Sales'].map((label, idx) => (
                <div key={idx}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{label}</label>
                  <input 
                    className="input-field" 
                    type="number"
                    value={budgetData[idx]} 
                    onChange={e => {
                      const updated = [...budgetData];
                      updated[idx] = parseFloat(e.target.value) || 0;
                      setBudgetData(updated);
                    }} 
                  />
                </div>
              ))}
            </div>
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--purple)', fontWeight: '700' }}>Budget Allocation Chart</h4>
              <div style={{ width: '220px', height: '220px' }}>
                <Doughnut data={budgetAllocation} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Monthly Cap Limit (₹L)</label>
                  <input className="input-field" value={monthlyCap} onChange={e => setMonthlyCap(e.target.value)} />
                </div>
                <div>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Utilization index (%)</label>
                  <input className="input-field" value={utilizationIndex} onChange={e => setUtilizationIndex(e.target.value)} />
                </div>
              </div>
            </div>
          </div>
        );
      } else if (tab === 'spend') {
        title = "CapEx spend & Investments tracker";
        content = (
          <div className="dashboard-grid">
            <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h4 style={{ fontSize: '15px', color: 'var(--blue)', fontWeight: '700' }}>Add Spend Ledger Record</h4>
              <input className="input-field" placeholder="Sector Name" value={newSpendSector} onChange={e => setNewSpendSector(e.target.value)} />
              <input className="input-field" placeholder="Spend Value (₹L)" value={newSpendAmt} onChange={e => setNewSpendAmt(e.target.value)} />
              <input className="input-field" placeholder="Progress (in %)" value={newSpendProg} onChange={e => setNewSpendProg(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newSpendSector) return;
                setInvestmentSpend([...investmentSpend, { sector: newSpendSector, spend: newSpendAmt, progress: newSpendProg }]);
                setNewSpendSector('');
                setNewSpendAmt('');
                setNewSpendProg('');
              }}>Save Record</button>
            </div>
            <div className="excel-table-container">
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Sector</th>
                    <th>Spend</th>
                    <th>Progress</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {investmentSpend.map((s, idx) => (
                    <tr key={idx}>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...investmentSpend];
                        updated[idx].sector = e.target.innerText;
                        setInvestmentSpend(updated);
                      }}>{s.sector}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...investmentSpend];
                        updated[idx].spend = e.target.innerText;
                        setInvestmentSpend(updated);
                      }}>{s.spend}</td>
                      <td contentEditable suppressContentEditableWarning onBlur={(e) => {
                        const updated = [...investmentSpend];
                        updated[idx].progress = e.target.innerText;
                        setInvestmentSpend(updated);
                      }}>{s.progress}</td>
                      <td>
                        <button className="btn-secondary" onClick={() => setInvestmentSpend(investmentSpend.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'profitability') {
        title = "Profitability margins & Yield check";
        content = (
          <div className="panel" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h4 style={{ fontSize: '15px', color: 'var(--green)', fontWeight: '700' }}>Margins Checklist</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input className="input-field" placeholder="Margin checklist item..." value={newProfitPoint} onChange={e => setNewProfitPoint(e.target.value)} />
              <button className="btn-primary" onClick={() => {
                if(!newProfitPoint) return;
                setProfitabilityPoints([...profitabilityPoints, { text: newProfitPoint, checked: true }]);
                setNewProfitPoint('');
              }}>Add Item</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
              {profitabilityPoints.map((p, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContext: 'space-between', padding: '12px 18px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input 
                      type="checkbox" 
                      checked={p.checked} 
                      onChange={() => {
                        const updated = [...profitabilityPoints];
                        updated[idx].checked = !updated[idx].checked;
                        setProfitabilityPoints(updated);
                      }} 
                    />
                    <span style={{ fontSize: '14px', textDecoration: p.checked ? 'none' : 'line-through', color: p.checked ? '#fff' : 'var(--text-muted)' }}>{p.text}</span>
                  </div>
                  <button className="btn-secondary" onClick={() => setProfitabilityPoints(profitabilityPoints.filter((_, i) => i !== idx))} style={{ padding: '2px 8px', color: 'var(--red)' }}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        );
      }
    }

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 999,
          background: 'rgba(6, 8, 20, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          overflowY: 'auto',
          padding: '60px 80px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ width: '100%', maxWidth: '1200px', position: 'relative' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContext: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid var(--border)', paddingBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#E5A43B', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
                Slide {slide} Workspace / Planner
              </span>
              <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#fff', margin: 0, letterSpacing: '-0.5px' }}>
                {title}
              </h1>
            </div>
            
            <button
              onClick={() => setActiveWorkspace(null)}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                borderRadius: '30px',
                borderColor: 'var(--blue)',
                color: 'var(--blue)',
                boxShadow: '0 0 15px rgba(0, 212, 255, 0.15)'
              }}
            >
              <ArrowLeft size={16} /> Back to Dashboard
            </button>
          </div>

          {/* Main workspace content */}
          <div style={{ width: '100%', paddingBottom: '40px' }}>
            {content}
          </div>

        </div>
      </motion.div>
    );
  };

  return (
    <div style={{ color: '#fff', overflowX: 'hidden', minHeight: '100vh', background: '#000000' }}>
      
      {/* VIDEO PRELOADER AND PLAYER OVERLAY */}
      <AnimatePresence>
        {!videoCompleted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: '#000',
              zIndex: 9999,
              overflow: 'hidden'
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted={isVideoMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={skipVideoIntro}
              onError={skipVideoIntro}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            >
              <source src="/CEO_introduction.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {autoplayBlocked && (
              <div
                onClick={startVideoWithSound}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(0, 0, 0, 0.85)',
                  backdropFilter: 'blur(12px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10001,
                  cursor: 'pointer',
                  transition: 'all 0.5s ease'
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '24px',
                    textAlign: 'center'
                  }}
                >
                  <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px' }}>
                    ENTRAIOT SOLUTIONS
                  </h2>
                  <button
                    onClick={startVideoWithSound}
                    style={{
                      background: 'rgba(0, 212, 255, 0.08)',
                      border: '2px solid rgba(0, 212, 255, 0.7)',
                      borderRadius: '30px',
                      padding: '16px 54px',
                      color: '#00d4ff',
                      fontSize: '15px',
                      fontWeight: '800',
                      letterSpacing: '3px',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.25)',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--blue)';
                      e.currentTarget.style.color = '#000';
                      e.currentTarget.style.boxShadow = '0 0 45px rgba(0, 212, 255, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0, 212, 255, 0.08)';
                      e.currentTarget.style.color = '#00d4ff';
                      e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.25)';
                    }}
                  >
                    START
                  </button>
                </motion.div>
              </div>
            )}


          </motion.div>
        )}
      </AnimatePresence>

      {/* SCROLL-SNAPPING DASHBOARD LAYOUT */}
      {videoCompleted && (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden', background: '#000000', padding: '24px', boxSizing: 'border-box', position: 'relative' }}>
          
          {/* Main Card Wrapper representing the AI-generated card frame aesthetic */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: 'inset 0 0 100px rgba(0, 212, 255, 0.02), 0 0 50px rgba(0, 0, 0, 0.8)',
            background: '#000000',
            position: 'relative',
            overflow: 'hidden'
          }}>

            {/* Background CEO walking cycle - Shifted to the left */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: '4vw',
              width: '38vw',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              zIndex: 1,
              pointerEvents: 'none',
              background: 'transparent'
            }}>
              <img 
                src={getCEOFramePath()} 
                alt="CEO Walking" 
                style={{ 
                  height: '92%', 
                  width: 'auto'
                }} 
              />
            </div>

            {/* Left Side Info Card (Overlay) - Positioned relative to left edge */}
            <div style={{
              position: 'absolute',
              left: '4vw',
              bottom: '6vh',
              zIndex: 10,
              width: '360px',
              pointerEvents: 'none'
            }}>
              <AnimatePresence mode="wait">
                {activeScrollSection > 0 && (
                  <motion.div
                    key={activeScrollSection}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      background: '#000000',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '20px',
                      padding: '24px',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
                      width: '100%'
                    }}
                  >
                    <span style={{ 
                      fontSize: '11px', 
                      fontWeight: '800', 
                      color: '#E5A43B', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px', 
                      display: 'block', 
                      marginBottom: '8px' 
                    }}>
                      {activeCardData[activeScrollSection - 1]?.tag}
                    </span>
                    <h3 style={{ 
                      fontSize: '24px', 
                      fontWeight: '800', 
                      color: '#ffffff', 
                      lineHeight: '1.2',
                      margin: '0 0 8px 0'
                    }}>
                      {activeCardData[activeScrollSection - 1]?.title}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: 'var(--text-secondary)',
                      margin: 0,
                      lineHeight: '1.4'
                    }}>
                      {activeCardData[activeScrollSection - 1]?.desc}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating Vertical Indicator dots */}
            <div style={{
              position: 'absolute',
              right: '24px',
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              zIndex: 100
            }}>
              {sectionLabels.map((lbl, idx) => (
                <div
                  key={idx}
                  onClick={() => scrollToSection(idx)}
                  className="dot-container"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    justifyContent: 'flex-end',
                  }}
                >
                  <span 
                    className="dot-label"
                    style={{
                      fontSize: '11px',
                      color: activeScrollSection === idx ? 'var(--blue)' : 'rgba(255, 255, 255, 0.5)',
                      fontWeight: activeScrollSection === idx ? '800' : '400',
                      opacity: activeScrollSection === idx ? 1 : 0,
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      pointerEvents: 'none'
                    }}
                  >
                    {lbl.split('. ')[1]}
                  </span>
                  
                  <div style={{
                    width: activeScrollSection === idx ? '12px' : '8px',
                    height: activeScrollSection === idx ? '12px' : '8px',
                    borderRadius: '50%',
                    background: activeScrollSection === idx ? 'var(--blue)' : 'rgba(255, 255, 255, 0.25)',
                    border: activeScrollSection === idx ? '2px solid #000' : 'none',
                    outline: activeScrollSection === idx ? '2px solid var(--blue)' : 'none',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
              ))}
            </div>

            {/* Scrollable Container with hide scrollbar CSS */}
            <main
              ref={scrollContainerRef}
              onScroll={handleScroll}
              style={{
                position: 'absolute',
                right: '48px',
                top: '4vh',
                width: '48vw',
                overflowY: 'scroll',
                scrollSnapType: 'none',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                height: '84vh',
                background: 'transparent',
                scrollBehavior: 'auto',
                zIndex: 5
              }}
            >
              <style>{`
                main::-webkit-scrollbar {
                  display: none;
                }
                .dot-container:hover .dot-label {
                  opacity: 1 !important;
                }
              `}</style>
              
              {sectionLabels.map((label, idx) => (
                <section
                  key={idx}
                  id={`section-${idx}`}
                  style={{
                    height: '84vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '40px 24px',
                    boxSizing: 'border-box',
                    width: '100%',
                    background: 'transparent',
                    position: 'relative'
                  }}
                >
                  {/* Interactive Dashboard Panel with reveal animation */}
                  <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.95 }}
                    animate={
                      activeScrollSection === idx && !isScrolling
                        ? { opacity: 1, x: 0, scale: 1 }
                        : { opacity: 0, x: 50, scale: 0.95 }
                    }
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%', width: '100%' }}
                  >
                    {renderActivePanel(idx)}
                  </motion.div>
                </section>
              ))}
            </main>

            <AnimatePresence>
              {activeWorkspace && renderSubPage()}
            </AnimatePresence>

            {/* AI Chatbot Widget */}
            <div className="chatbot-container">
              <AnimatePresence>
                {isChatOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 50, scale: 0.9 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="chat-window"
                  >
                    {/* Header */}
                    <div className="chat-header">
                      <div className="chat-header-info">
                        <Bot size={20} style={{ color: 'var(--blue)' }} />
                        <div>
                          <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#fff', margin: 0 }}>Portal Assistant</h4>
                          <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <span className="chat-header-status" /> Online
                          </span>
                        </div>
                      </div>
                      <button onClick={() => setIsChatOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                        <X size={16} />
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="chat-messages">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
                          {msg.text.includes('**') ? (
                            // Simple parser for **bold text**
                            msg.text.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} style={{ color: 'var(--blue)' }}>{part}</strong> : part)
                          ) : (
                            msg.text
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="chat-bubble bot" style={{ display: 'flex', gap: '4px', alignItems: 'center', padding: '12px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'chat-dot-bounce 1.4s infinite ease-in-out' }} />
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'chat-dot-bounce 1.4s infinite ease-in-out 0.2s' }} />
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'chat-dot-bounce 1.4s infinite ease-in-out 0.4s' }} />
                          <style>{`
                            @keyframes chat-dot-bounce {
                              0%, 80%, 100% { transform: scale(0); }
                              40% { transform: scale(1.0); }
                            }
                          `}</style>
                        </div>
                      )}
                      <div ref={chatMessagesEndRef} />
                    </div>

                    {/* Suggestions */}
                    <div className="chat-suggestions">
                      <button className="chat-suggestion-chip" onClick={() => { setChatInput("Open Market Workspace"); setTimeout(() => handleChatSubmit(), 50); }}>Market Workspace</button>
                      <button className="chat-suggestion-chip" onClick={() => { setChatInput("Go to Slide 8"); setTimeout(() => handleChatSubmit(), 50); }}>Q3 Budget</button>
                      <button className="chat-suggestion-chip" onClick={() => { setChatInput("Show Clients list"); setTimeout(() => handleChatSubmit(), 50); }}>Clients</button>
                    </div>

                    {/* Input */}
                    <form className="chat-input-area" onSubmit={handleChatSubmit}>
                      <input
                        type="text"
                        className="chat-input-field"
                        placeholder="Ask me to show metrics or go to slides..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                      />
                      <button type="submit" className="chat-send-btn">
                        <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Float Toggle Button */}
              <button 
                onClick={() => setIsChatOpen(!isChatOpen)} 
                className={`chatbot-btn ${!isChatOpen ? 'chatbot-btn-pulse' : ''}`}
              >
                {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default App;
