import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  TrendingUp, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  UserCheck, 
  UserMinus, 
  Search, 
  Filter, 
  Check, 
  X, 
  MapPin, 
  Rocket, 
  ChevronRight, 
  DollarSign, 
  Calendar,
  AlertTriangle,
  FileSpreadsheet,
  Bell,
  Activity,
  Layers,
  Sparkles,
  ChevronDown,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ArrowLeft,
  MessageSquare,
  Send,
  Bot
} from 'lucide-react';

// Mock Initial Data
const initialProjects = [
  { id: 1, name: "Smart City IoT Integration", client: "Chennai Corporation", team: "IoT Team", deadline: "2026-07-15", progress: 68, status: "Running", budget: "₹45,00,000" },
  { id: 2, name: "Agricultural Sensor Network", client: "FarmTech India", team: "IoT & Development", deadline: "2026-08-01", progress: 42, status: "Running", budget: "₹28,00,000" },
  { id: 3, name: "Enterprise SaaS CRM", client: "Vanguard Retail", team: "Development", deadline: "2026-05-30", progress: 95, status: "Delayed", delayReason: "Integration API delays from client side", escalationStatus: "High Priority - MD meeting scheduled", budget: "₹65,00,000" },
  { id: 4, name: "Industrial Telemetry System", client: "TVS Logistics", team: "IoT Team", deadline: "2026-04-10", progress: 100, status: "Completed", budget: "₹72,00,000", feedback: "Exceptional quality and timely delivery.", value: "₹72,00,000", deliveryDate: "2026-04-08" },
  { id: 5, name: "HR Management Portal", client: "Entraiot Solutions (Internal)", team: "HR & Dev Team", deadline: "2026-09-01", progress: 10, status: "Upcoming", budget: "₹12,00,000", plannedStartDate: "2026-07-01" },
  { id: 6, name: "E-Commerce App & Analytics", client: "Lotus Organics", team: "Digital Marketing & Dev", deadline: "2026-06-25", progress: 85, status: "Running", budget: "₹34,00,000" },
  { id: 7, name: "Predictive Maintenance AI Model", client: "L&T Heavy Eng", team: "Development (AI/ML)", deadline: "2026-05-15", progress: 90, status: "Delayed", delayReason: "Scope creep in client custom dashboard expectations", escalationStatus: "Medium Priority - Resolving scope creep", budget: "₹50,00,000" }
];

const initialHiringRequests = [
  { id: 1, position: "Senior IoT Engineer", department: "IoT Team", requestedBy: "Sanjay Kumar (IoT Head)", salaryRange: "₹12L - ₹15L", justification: "High workload on Chennai Smart City project.", status: "Pending" },
  { id: 2, position: "Full Stack Developer", department: "Development", requestedBy: "Meera Nair (Dev Lead)", salaryRange: "₹8L - ₹11L", justification: "Required for agricultural SaaS application.", status: "Pending" },
  { id: 3, position: "Digital Marketing Specialist", department: "Digital Marketing", requestedBy: "Rahul Verma (Marketing Head)", salaryRange: "₹5L - ₹7L", justification: "Expanding social and search campaign operations.", status: "Approved" }
];

const initialResignations = [
  { id: 1, employeeName: "Arun Joseph", role: "Junior Developer", department: "Development", noticePeriod: "60 Days", exitDate: "2026-07-30", reason: "Higher studies abroad.", replacementRequired: "Yes", status: "Pending" },
  { id: 2, employeeName: "Priya Sundar", role: "UI/UX Designer", department: "Digital Marketing", noticePeriod: "30 Days", exitDate: "2026-06-30", reason: "Personal reasons.", replacementRequired: "Yes", status: "Approved" }
];

const departmentsData = [
  { name: "Development", lead: "Meera Nair", employeesCount: 18, productivity: 92, completionRate: 94, kpi: 90 },
  { name: "IoT Team", lead: "Sanjay Kumar", employeesCount: 12, productivity: 88, completionRate: 85, kpi: 87 },
  { name: "Digital Marketing", lead: "Rahul Verma", employeesCount: 8, productivity: 95, completionRate: 98, kpi: 96 },
  { name: "Finance", lead: "Chitra Iyer", employeesCount: 4, productivity: 90, completionRate: 100, kpi: 95 },
  { name: "HR", lead: "Lakshmi Priya", employeesCount: 3, productivity: 94, completionRate: 95, kpi: 92 },
  { name: "Client Handling", lead: "Vikram Sen", employeesCount: 5, productivity: 89, completionRate: 92, kpi: 91 }
];

const employeesData = [
  { id: 1, name: "Aditya Hegde", role: "Lead Architect", department: "Development", tasksAssigned: 12, tasksCompleted: 11, attendance: "98%", productivity: 95, rating: 4.8 },
  { id: 2, name: "Divya Balan", role: "IoT Firmware Dev", department: "IoT Team", tasksAssigned: 15, tasksCompleted: 13, attendance: "94%", productivity: 87, rating: 4.2 },
  { id: 3, name: "Karthik Raj", role: "SEO Analyst", department: "Digital Marketing", tasksAssigned: 8, tasksCompleted: 8, attendance: "96%", productivity: 96, rating: 4.9 },
  { id: 4, name: "Sandhya R", role: "React Developer", department: "Development", tasksAssigned: 14, tasksCompleted: 12, attendance: "92%", productivity: 88, rating: 4.1 },
  { id: 5, name: "Manoj Swaminathan", role: "Embedded Engineer", department: "IoT Team", tasksAssigned: 10, tasksCompleted: 7, attendance: "88%", productivity: 78, rating: 3.5 }
];

const growthOpportunities = [
  { id: 1, name: "Smart Parking tender - Coimbatore Corp", type: "Government Tender", value: "₹1.2 Cr", probability: "70%", source: "Direct Sales" },
  { id: 2, name: "Enterprise IoT Logistics partnership", type: "Partnership", value: "₹85L/year", probability: "55%", source: "Inbound Referral" },
  { id: 3, name: "SaaS CRM Customization for Middle East client", type: "International Client", value: "₹45L", probability: "80%", source: "LinkedIn Outreach" }
];

const expansionPlans = [
  { id: 1, region: "Chennai HQ", status: "Fully Operational", progress: 100, staffCount: 50, notes: "Expansion of AI/ML lab completed." },
  { id: 2, region: "Tamil Nadu (Tier 2 - Madurai, Trichy)", status: "Active Setup", progress: 65, staffCount: 8, notes: "Setting up local support hubs for agri-IoT." },
  { id: 3, region: "India Metro (Bengaluru, Hyderabad)", status: "Planning Phase", progress: 30, staffCount: 2, notes: "Registering office space and initiating recruitment." },
  { id: 4, region: "International (Middle East & SEA)", status: "Feasibility Analysis", progress: 10, staffCount: 0, notes: "Evaluating partnership models and legal compliance." }
];

const newServices = [
  { id: 1, name: "AI Automation Suites", vertical: "Enterprise Software", status: "Staging Testing", date: "Q3 2026", complexity: "High" },
  { id: 2, name: "Industrial IoT Edge Gateway", vertical: "Hardware & Edge", status: "R&D Phase", date: "Q4 2026", complexity: "Extreme" },
  { id: 3, name: "Smart Agriculture Dashboard v2", vertical: "SaaS App", status: "Production Ready", date: "Launched", complexity: "Medium" }
];

// Mock Reports data
const reportsData = {
  daily: {
    title: "Daily Operational Report",
    date: "June 11, 2026",
    metrics: [
      { label: "Today's Revenue", value: "₹4,85,000" },
      { label: "Tasks Completed", value: "34/40 Tasks" },
      { label: "Employee Attendance", value: "96% (48 Present)" },
      { label: "Client Meetings", value: "4 Scheduled" },
      { label: "Project Updates", value: "2 Milestones Reached" }
    ]
  },
  weekly: {
    title: "Weekly Performance Report",
    date: "Week 23, 2026",
    metrics: [
      { label: "Weekly Revenue", value: "₹24,50,000" },
      { label: "Project Progress", value: "8 Active Tracks on Schedule" },
      { label: "Department Performance", value: "Avg. Productivity 91.3%" },
      { label: "New Leads", value: "5 Enterprise Inquiries" },
      { label: "Issues Raised", value: "1 Resolved, 1 In Progress" }
    ]
  },
  monthly: {
    title: "Monthly Growth Audit",
    date: "May 2026",
    metrics: [
      { label: "Monthly Revenue", value: "₹92,80,000" },
      { label: "Profit & Loss", value: "Net Profit Margin: +21.4%" },
      { label: "Growth %", value: "MoM Revenue Growth: +4.8%" },
      { label: "Employee Performance", value: "98% KPIs Met" },
      { label: "Client Acquisition", value: "2 New Client Retainers" },
      { label: "Business Expansion Progress", value: "Tamil Nadu Hub setup completed" }
    ]
  }
};

const sectionLabels = [
  "Overview",
  "Operations",
  "Team Management",
  "Company Growth",
  "Reports"
];

const activeCardData = [
  { tag: "OVERVIEW / METRICS", title: "1. MD Portal & Daily Goal", desc: "Overview of company performance metrics, actual vs target ARR trends, and quick approval logs." },
  { tag: "OPERATIONS / CHECKS", title: "2. Operations Center", desc: "Monitor active delivery pipelines, project completions, and high-priority escalation triggers." },
  { tag: "RESOURCES / STAFFING", title: "3. Team & Resources", desc: "Guide talent acquisition, monitor departmental productivity, and approve personnel requests." },
  { tag: "EXPANSION / TENDERS", title: "4. Growth Strategy", desc: "Track high-value business pipelines, regional operations expansions, and staging services." },
  { tag: "AUDIT / CASHFLOW", title: "5. Performance Reports", desc: "Generate and review corporate audits, daily operational milestones, and weekly performance summaries." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, operations, team, growth, reports
  const [operationsFilter, setOperationsFilter] = useState('All'); // All, Running, Delayed, Completed, Upcoming
  // Slide 2 & 3: Workspace overlay state
  const [activeWorkspace, setActiveWorkspace] = useState(null); // { slide: number, tab: string }
  const [selectedReport, setSelectedReport] = useState('daily'); // daily, weekly, monthly
  const [approvalsTab, setApprovalsTab] = useState('pending'); // pending, history
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: "Hello Shalini! I am your MD Assistant. How can I help you today? You can ask me questions about metrics or tell me to navigate somewhere." }
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  
  const [bgTime, setBgTime] = useState(0);
  const [uiVisible, setUiVisible] = useState(false);
  const [slide1UiVisible, setSlide1UiVisible] = useState(false);
  const [slide2UiVisible, setSlide2UiVisible] = useState(false);
  const [slide3UiVisible, setSlide3UiVisible] = useState(false);
  const [slide4UiVisible, setSlide4UiVisible] = useState(false);
  const [showSlide3RightContent, setShowSlide3RightContent] = useState(false);
  const bgVideoRef = useRef(null);
  
  const [projects, setProjects] = useState(initialProjects);
  const [hiringRequests, setHiringRequests] = useState(initialHiringRequests);
  const [resignations, setResignations] = useState(initialResignations);
  const [activeNotification, setActiveNotification] = useState(false);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [showGrowthDetails, setShowGrowthDetails] = useState(false);
  const [showApprovalDetails, setShowApprovalDetails] = useState(false);
  const [showProjectDetails, setShowProjectDetails] = useState(false);




  // Video playback states
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const videoRef = useRef(null);

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

  const [introStep, setIntroStep] = useState(1);

  const handleIntroVideoEnded = () => {
    if (introStep === 1) {
      setIntroStep(2);
      if (videoRef.current) {
        videoRef.current.src = "/slide0_video.mp4";
        videoRef.current.load();
        videoRef.current.play().catch(err => {
          console.log("Intro step 2 play failed:", err);
          setVideoCompleted(true);
        });
      }
    } else {
      setVideoCompleted(true);
    }
  };

  const skipVideoIntro = () => {
    setVideoCompleted(true);
  };

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
  
  // Pending actions counts
  const pendingHiring = hiringRequests.filter(r => r.status === 'Pending').length;
  const pendingResignations = resignations.filter(r => r.status === 'Pending').length;
  const totalPending = pendingHiring + pendingResignations;
 
  // Handle Approve/Reject for Hiring
  const handleHiringStatus = (id, newStatus) => {
    setHiringRequests(hiringRequests.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };
 
  // Handle Approve/Reject for Resignations
  const handleResignationStatus = (id, newStatus) => {
    setResignations(resignations.map(r => r.id === id ? { ...r, status: newStatus } : r));
  };

  const handleSendChatMessage = (text) => {
    if (!text.trim()) return;

    const updatedMessages = [...chatMessages, { sender: 'user', text }];
    setChatMessages(updatedMessages);
    setChatInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      const query = text.toLowerCase();
      let responseText = "";
      let matchedNav = false;

      // 1. Check for Navigation keywords
      if (query.includes('approv') || query.includes('hiring') || query.includes('decision') || query.includes('clearance') || query.includes('resign')) {
        setActiveWorkspace({ slide: 0, tab: 'approvals' });
        responseText = "Navigating to Pending Approvals Workspace. Here you can review hiring requests and resignation clearances.";
        matchedNav = true;
      } else if (query.includes('project') && (query.includes('portfolio') || query.includes('critical') || query.includes('monitor') || query.includes('active'))) {
        setActiveWorkspace({ slide: 0, tab: 'projects' });
        responseText = "Opening the Critical Project Portfolio Monitor workspace. Showing all running and delayed initiatives.";
        matchedNav = true;
      } else if (query.includes('employee') || query.includes('staff') || query.includes('directory') || query.includes('people')) {
        setActiveWorkspace({ slide: 2, tab: 'emp' });
        responseText = "Opening the Employee Performance Directory. You can search active staff members and see stats.";
        matchedNav = true;
      } else if (query.includes('department') || query.includes('lead') || query.includes('kpi') || query.includes('productivity')) {
        setActiveWorkspace({ slide: 2, tab: 'dept' });
        responseText = "Opening the Department Performance Metrics Workspace. Showing productivity scores and KPI trends.";
        matchedNav = true;
      } else if (query.includes('growth') || query.includes('projection') || query.includes('chart') || query.includes('value')) {
        setActiveWorkspace({ slide: 0, tab: 'growth' });
        responseText = "Navigating to Company Growth & Revenue projection charts.";
        matchedNav = true;
      } else if (query.includes('audit') || query.includes('report') || query.includes('ledger') || query.includes('export')) {
        setActiveWorkspace({ slide: 4, tab: 'daily' });
        responseText = "Opening Audits & Performance Reports workspace.";
        matchedNav = true;
      } else if (query.includes('iot active') || query.includes('iot project')) {
        setActiveWorkspace({ slide: 1, tab: 'iot_active' });
        responseText = "Opening Active IoT Delivery Pipelines.";
        matchedNav = true;
      } else if (query.includes('it active') || query.includes('it project')) {
        setActiveWorkspace({ slide: 1, tab: 'it_active' });
        responseText = "Opening Active IT Delivery Pipelines.";
        matchedNav = true;
      } else if (query.includes('opportunity') || query.includes('pipeline') || query.includes('lead')) {
        setActiveWorkspace({ slide: 3, tab: 'opportunities' });
        responseText = "Opening New Opportunities & Growth Pipeline Workspace.";
        matchedNav = true;
      } else if (query.includes('expansion') || query.includes('region') || query.includes('map')) {
        setActiveWorkspace({ slide: 3, tab: 'expansion' });
        responseText = "Opening Regional Infrastructure & Expansion Map.";
        matchedNav = true;
      }

      // Check section scrolls if not matched workspace navigation
      if (!matchedNav) {
        if (query.includes('operations') || query.includes('slide 1') || query.includes('section 1')) {
          scrollToSection(1);
          responseText = "Scrolling to Slide 2: Operations Center.";
          matchedNav = true;
        } else if (query.includes('team') || query.includes('resource') || query.includes('slide 2') || query.includes('section 2')) {
          scrollToSection(2);
          responseText = "Scrolling to Slide 3: Team & Resources.";
          matchedNav = true;
        } else if (query.includes('strategy') || query.includes('expansion') || query.includes('slide 3') || query.includes('section 3')) {
          scrollToSection(3);
          responseText = "Scrolling to Slide 4: Growth Strategy.";
          matchedNav = true;
        } else if (query.includes('report') || query.includes('audit') || query.includes('slide 4') || query.includes('section 4')) {
          scrollToSection(4);
          responseText = "Scrolling to Slide 5: Performance Reports.";
          matchedNav = true;
        } else if (query.includes('overview') || query.includes('home') || query.includes('dashboard') || query.includes('slide 0') || query.includes('section 0')) {
          scrollToSection(0);
          responseText = "Scrolling to Slide 1: Overview & Metrics dashboard.";
          matchedNav = true;
        }
      }

      // 2. Answering general doubts/metrics queries if navigation didn't consume it
      if (!matchedNav) {
        if (query.includes('meeting') || query.includes('calendar') || query.includes('schedule')) {
          responseText = "Yes, there are 4 client meetings scheduled today. This includes a High-Priority MD escalation meeting for the 'Enterprise SaaS CRM' project regarding client-side API delays.";
        } else if (query.includes('revenue') || query.includes('arr') || query.includes('money') || query.includes('cr')) {
          responseText = "Entraiot's current total revenue is ₹3.05 Cr, representing a +14% YoY increase.";
        } else if (query.includes('project') && (query.includes('count') || query.includes('how many'))) {
          responseText = "There are 7 active projects in total (1 completed and delivered, and 2 currently delayed).";
        } else if (query.includes('delay')) {
          responseText = "There are 2 delayed projects: 1. 'Enterprise SaaS CRM' (High Priority, Client integration delays), 2. 'Predictive Maintenance AI Model' (Medium Priority, scope creep).";
        } else if (query.includes('employee') || query.includes('staff') || query.includes('active employees')) {
          responseText = "We have 50 active employees across 6 critical departments, with a current attendance rate of 94%.";
        } else if (query.includes('growth') || query.includes('percentage')) {
          responseText = "Our current YoY company growth is at 24.8%, fueled by IoT & SaaS vertical contracts.";
        } else if (query.includes('hiring') || query.includes('recruit') || query.includes('requisition')) {
          responseText = "There are pending hiring requisitions for roles like Senior IoT Engineer. You can open the Approvals Workspace to view and authorize them.";
        } else if (query.includes('resign') || query.includes('exit') || query.includes('arun')) {
          responseText = "There is 1 resignation clearance request pending for Arun Joseph (Junior Developer). You can manage this request in the Approvals Workspace.";
        } else if (query.includes('daily') || query.includes('today') || query.includes('milestone') || query.includes('attendance')) {
          responseText = "Today's daily operational report shows: ₹4,85,000 in Revenue, 34/40 Tasks Completed, 96% Employee Attendance (48 Present), 4 Client Meetings, and 2 Milestones Reached.";
        } else if (query.includes('help') || query.includes('what can you do')) {
          responseText = "I can answer doubts about company statistics (revenue, employees, projects, meetings, delays, resignations, hiring) and automatically navigate you to any slide or workspace (e.g. say 'show me pending approvals', 'scroll to team slide', or 'open employee directory').";
        } else {
          responseText = "I'm not completely sure about that. Try asking about revenue, meetings, daily reports, active projects, employee count, or tell me to navigate (e.g., 'show approvals' or 'scroll to operations slide').";
        }
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: responseText }]);
      setIsBotTyping(false);
    }, 800);
  };
 
  const scrollContainerRef = useRef(null);
  const [activeScrollSection, setActiveScrollSection] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Sync background video sources and reload on scroll
  useEffect(() => {
    if (!videoCompleted || !bgVideoRef.current) return;

    // Slide 0: Video 1
    // Slide 1: Video 2
    // Slide 2: Video 3
    // Slide 3: Video 4
    // Slide 4: Video 5
    const targetSrc = activeScrollSection === 0 
      ? "/slide1_video.mp4" 
      : (activeScrollSection === 1 
        ? "/slide2_video.mp4" 
        : (activeScrollSection === 2
          ? "/slide3_video.mp4"
          : (activeScrollSection === 3
            ? "/slide4_video.mp4"
            : "/slide5_video.mp4")));

    const currentSrc = bgVideoRef.current.src;
    if (!currentSrc.endsWith(targetSrc)) {
      if (activeScrollSection === 0) {
        setUiVisible(false);
      } else if (activeScrollSection === 1) {
        setSlide1UiVisible(false);
      } else if (activeScrollSection === 2) {
        setSlide2UiVisible(false);
      } else if (activeScrollSection === 3) {
        setSlide3UiVisible(false);
      } else if (activeScrollSection === 4) {
        setSlide4UiVisible(false);
      }
      bgVideoRef.current.src = targetSrc;
      bgVideoRef.current.load();
      bgVideoRef.current.play().catch(err => {
        console.log("Video playback failed:", err);
      });
    }
  }, [activeScrollSection, videoCompleted]);

  useEffect(() => {
    if (activeScrollSection !== 3) {
      setShowSlide3RightContent(false);
    }
  }, [activeScrollSection]);

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
      if (activeIdx !== activeScrollSection && activeIdx >= 0 && activeIdx < 5) {
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
        const nextIdx = Math.min(activeScrollSection + 1, 4);
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

  // Global viewport scroll event propagation (wheel + touch swipe)
  useEffect(() => {
    let touchStartY = 0;

    const handleGlobalWheel = (e) => {
      if (!videoCompleted || activeWorkspace || isChatOpen) return;

      if (scrollContainerRef.current && !scrollContainerRef.current.contains(e.target)) {
        scrollContainerRef.current.scrollBy({
          top: e.deltaY,
          behavior: 'auto'
        });
      }
    };

    const handleGlobalTouchStart = (e) => {
      if (activeWorkspace || isChatOpen) return;
      touchStartY = e.touches[0].clientY;
    };

    const handleGlobalTouchMove = (e) => {
      if (!videoCompleted || activeWorkspace || isChatOpen) return;

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
  }, [videoCompleted, activeWorkspace, isChatOpen]);

  const renderSubPage = () => {
    if (!activeWorkspace) return null;
    const { slide, tab } = activeWorkspace;
    let title = "";
    let content = null;

    if (slide === 0) {
      if (tab === 'projects') {
        title = "Critical Project Portfolio Monitor";
        content = (
          <div className="space-y-4 p-2">
            <p className="text-xs text-slate-400">Manage running, delayed, and low-progress active initiatives</p>
            <div className="space-y-3">
              {projects.map(project => (
                <div key={project.id} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                      project.status === 'Delayed' ? 'bg-red-500/20 text-red-400' :
                      project.status === 'Completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-indigo-500/20 text-indigo-400'
                    }`}>
                      {project.status}
                    </span>
                    <p className="text-sm font-bold text-slate-200 mt-1">{project.name}</p>
                    <p className="text-xs text-slate-400">{project.client} • Budget: {project.budget} • Deadline: {project.deadline}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-300">{project.progress}% Done</p>
                    <div className="w-24 bg-slate-950 h-1.5 rounded-full mt-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${project.status === 'Delayed' ? 'bg-red-500' : 'bg-indigo-500'}`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      } else if (tab === 'approvals') {
        title = "MD Decisions & Approvals Center";
        const activeHR = hiringRequests.filter(h => h.status === 'Pending');
        const activeRes = resignations.filter(r => r.status === 'Pending');
        const historyHR = hiringRequests.filter(h => h.status !== 'Pending');
        const historyRes = resignations.filter(r => r.status !== 'Pending');

        content = (
          <div className="space-y-6 p-2 max-w-7xl mx-auto">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Pending Actions</span>
                <p className="text-3xl font-black text-indigo-400 mt-2">{totalPending}</p>
                <span className="text-[10px] text-slate-500 mt-1">Requires MD authorization</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hiring Requisitions</span>
                <p className="text-3xl font-black text-amber-400 mt-2">{activeHR.length}</p>
                <span className="text-[10px] text-amber-500 mt-1">Hiring board approvals</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Resignations & Exits</span>
                <p className="text-3xl font-black text-rose-400 mt-2">{activeRes.length}</p>
                <span className="text-[10px] text-rose-500 mt-1">Exit clearance requests</span>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Resolved Decisions</span>
                <p className="text-3xl font-black text-teal-400 mt-2">{historyHR.length + historyRes.length}</p>
                <span className="text-[10px] text-teal-500 mt-1">Logged in this session</span>
              </div>
            </div>

            {/* Tab Bar */}
            <div className="flex border-b border-slate-800 space-x-6">
              <button 
                onClick={() => setApprovalsTab('pending')}
                className={`pb-3 text-sm font-bold transition-all relative ${
                  approvalsTab === 'pending' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Pending Actions ({totalPending})
              </button>
              <button 
                onClick={() => setApprovalsTab('history')}
                className={`pb-3 text-sm font-bold transition-all relative ${
                  approvalsTab === 'history' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Decision Log / History ({historyHR.length + historyRes.length})
              </button>
            </div>

            {approvalsTab === 'pending' ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Hiring Requisitions Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <Briefcase size={16} className="text-amber-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Hiring Requisitions</h4>
                  </div>
                  <div className="space-y-4">
                    {activeHR.length === 0 ? (
                      <div className="text-slate-500 text-xs py-12 text-center bg-slate-905/30 rounded-xl border border-slate-800/40">
                        No pending hiring requisitions.
                      </div>
                    ) : (
                      activeHR.map(req => (
                        <div key={`hr-${req.id}`} className="p-5 bg-slate-900/40 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/20 hover:bg-slate-900/60 transition duration-300">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <p className="text-base font-extrabold text-slate-100">{req.position}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{req.department} • Requested by {req.requestedBy}</p>
                              </div>
                              <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">
                                {req.salaryRange}
                              </span>
                            </div>
                            
                            <div className="text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-850 text-slate-300 mt-4 leading-relaxed">
                              <span className="font-semibold text-slate-400 block mb-1">Justification:</span>
                              "{req.justification}"
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-3 mt-5 pt-4 border-t border-slate-800/60">
                            <button 
                              onClick={() => handleHiringStatus(req.id, 'Rejected')}
                              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold text-red-400 transition flex items-center space-x-1.5"
                            >
                              <X size={14} />
                              <span>Reject Request</span>
                            </button>
                            <button 
                              onClick={() => handleHiringStatus(req.id, 'Approved')}
                              className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 hover:border-teal-500/40 rounded-xl text-xs font-bold text-teal-400 transition flex items-center space-x-1.5"
                            >
                              <Check size={14} />
                              <span>Approve Requisition</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Resignations Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
                    <UserCheck size={16} className="text-rose-400" />
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Resignation Exit Requests</h4>
                  </div>
                  <div className="space-y-4">
                    {activeRes.length === 0 ? (
                      <div className="text-slate-500 text-xs py-12 text-center bg-slate-905/30 rounded-xl border border-slate-800/40">
                        No pending resignation requests.
                      </div>
                    ) : (
                      activeRes.map(req => (
                        <div key={`res-${req.id}`} className="p-5 bg-slate-900/40 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-indigo-500/20 hover:bg-slate-900/60 transition duration-300">
                          <div>
                            <div className="flex justify-between items-start gap-4">
                              <div>
                                <p className="text-base font-extrabold text-slate-100">{req.employeeName}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{req.role} • {req.department}</p>
                              </div>
                              <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded">
                                Notice: {req.noticePeriod}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/40 p-4 rounded-xl border border-slate-850 text-slate-300 mt-4">
                              <div>
                                <span className="font-semibold text-slate-400 block">Exit Target Date</span>
                                <span className="font-bold text-slate-200">{req.exitDate}</span>
                              </div>
                              <div>
                                <span className="font-semibold text-slate-400 block">Replacement Required</span>
                                <span className="font-bold text-yellow-500">{req.replacementRequired}</span>
                              </div>
                              <div className="col-span-2 pt-3 border-t border-slate-800/60">
                                <span className="font-semibold text-slate-400 block mb-1">Reason for Resignation</span>
                                <p className="italic text-slate-300">"{req.reason}"</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-end space-x-3 mt-5 pt-4 border-t border-slate-800/60">
                            <button 
                              onClick={() => handleResignationStatus(req.id, 'Rejected')}
                              className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 rounded-xl text-xs font-bold text-red-400 transition flex items-center space-x-1.5"
                            >
                              <X size={14} />
                              <span>Reject & Retain</span>
                            </button>
                            <button 
                              onClick={() => handleResignationStatus(req.id, 'Approved')}
                              className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 hover:border-teal-500/40 rounded-xl text-xs font-bold text-teal-400 transition flex items-center space-x-1.5"
                            >
                              <Check size={14} />
                              <span>Approve Exit</span>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Hiring History */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Hiring Decisions Log</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {historyHR.length === 0 ? (
                      <div className="text-slate-500 text-xs py-6 col-span-2 text-center bg-slate-900/10 rounded-xl border border-slate-850">
                        No hiring decisions logged.
                      </div>
                    ) : (
                      historyHR.map(req => (
                        <div key={`hr-hist-${req.id}`} className="p-4 bg-slate-900/20 rounded-xl border border-slate-850 flex justify-between items-center opacity-80 hover:opacity-100 transition duration-200">
                          <div>
                            <p className="text-sm font-bold text-slate-300">{req.position}</p>
                            <p className="text-xs text-slate-500">{req.department} • Requested by {req.requestedBy}</p>
                            <p className="text-[11px] text-indigo-400/80 mt-1 font-semibold">Budget: {req.salaryRange}</p>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wider border ${
                            req.status === 'Approved' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Resignation History */}
                <div className="pt-6 border-t border-slate-850">
                  <h4 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">Resignation Decisions Log</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {historyRes.length === 0 ? (
                      <div className="text-slate-500 text-xs py-6 col-span-2 text-center bg-slate-900/10 rounded-xl border border-slate-850">
                        No resignation decisions logged.
                      </div>
                    ) : (
                      historyRes.map(req => (
                        <div key={`res-hist-${req.id}`} className="p-4 bg-slate-900/20 rounded-xl border border-slate-850 flex justify-between items-center opacity-80 hover:opacity-100 transition duration-200">
                          <div>
                            <p className="text-sm font-bold text-slate-300">{req.employeeName}</p>
                            <p className="text-xs text-slate-500">{req.role} • {req.department}</p>
                            <p className="text-[11px] text-orange-400/80 mt-1 font-semibold">Notice: {req.noticePeriod}</p>
                          </div>
                          <span className={`text-[10px] px-2.5 py-1 rounded-lg font-extrabold uppercase tracking-wider border ${
                            req.status === 'Approved' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                          }`}>
                            {req.status}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      } else if (tab === 'growth') {
        title = "Company Revenue & Growth Trends";
        content = (
          <div className="space-y-6 p-2">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-sm font-bold text-slate-200">Company Revenue & Growth Chart</h4>
                  <p className="text-xs text-slate-400">Actual vs Target projections</p>
                </div>
                <div className="flex space-x-2 text-xs">
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></span> <span className="text-slate-400">Actual</span></span>
                  <span className="flex items-center space-x-1"><span className="w-2.5 h-2.5 bg-teal-400 rounded-full"></span> <span className="text-slate-400">Target</span></span>
                </div>
              </div>
              
              <div className="h-64 w-full mt-4 flex items-end">
                <svg className="w-full h-full" viewBox="0 0 500 150">
                  <defs>
                    <linearGradient id="gradient-actual-sub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4"/>
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4" />
                  <path d="M 0 130 L 100 110 L 200 118 L 300 70 L 400 65 L 500 35 L 500 150 L 0 150 Z" fill="url(#gradient-actual-sub)" />
                  <path d="M 0 140 Q 150 100 300 60 T 500 20" fill="none" stroke="#2dd4bf" strokeWidth="2" strokeDasharray="5" />
                  <path d="M 0 130 L 100 110 L 200 118 L 300 70 L 400 65 L 500 35" fill="none" stroke="#6366f1" strokeWidth="3" />
                  <circle cx="100" cy="110" r="4" fill="#6366f1" />
                  <circle cx="200" cy="118" r="4" fill="#6366f1" />
                  <circle cx="300" cy="70" r="4" fill="#6366f1" />
                  <circle cx="400" cy="65" r="4" fill="#6366f1" />
                  <circle cx="500" cy="35" r="4" fill="#6366f1" />
                </svg>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 px-1">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun (Current)</span>
              </div>
            </div>
          </div>
        );
      }
    } else if (slide === 1) {
      if (tab === 'iot_active') {
        title = "Active IoT Delivery Pipelines";
        const filtered = projects.filter(p => (p.status === 'Running' || p.status === 'Upcoming') && p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-teal-500/20 text-teal-400">
                      {project.status}
                    </span>
                    <h4 className="text-base font-bold text-slate-100 mt-2">{project.name}</h4>
                    <p className="text-xs text-slate-400">Client: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400">Value</span>
                    <p className="text-sm font-bold text-slate-200">{project.budget}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-slate-200">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-400 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-850 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Assigned Team</span>
                    <span className="text-slate-300 font-semibold">{project.team}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      {project.status === 'Upcoming' ? 'Planned Start' : 'Deadline'}
                    </span>
                    <span className="text-slate-300 font-semibold">
                      {project.status === 'Upcoming' ? project.plannedStartDate : project.deadline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'it_active') {
        title = "Active IT Delivery Pipelines";
        const filtered = projects.filter(p => (p.status === 'Running' || p.status === 'Upcoming') && !p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase bg-indigo-500/20 text-indigo-400">
                      {project.status}
                    </span>
                    <h4 className="text-base font-bold text-slate-100 mt-2">{project.name}</h4>
                    <p className="text-xs text-slate-400">Client: {project.client}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold text-slate-400">Value</span>
                    <p className="text-sm font-bold text-slate-200">{project.budget}</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Completion</span>
                    <span className="text-slate-200">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-850 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Assigned Team</span>
                    <span className="text-slate-300 font-semibold">{project.team}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">
                      {project.status === 'Upcoming' ? 'Planned Start' : 'Deadline'}
                    </span>
                    <span className="text-slate-300 font-semibold">
                      {project.status === 'Upcoming' ? project.plannedStartDate : project.deadline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'iot_delayed') {
        title = "Delayed IoT Escalations";
        const filtered = projects.filter(p => p.status === 'Delayed' && p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4 border-l-4 border-l-red-500">
                <div>
                  <h4 className="text-base font-bold text-slate-100">{project.name}</h4>
                  <p className="text-xs text-slate-400">Client: {project.client} • Value: {project.budget}</p>
                </div>
                <div className="p-4 bg-red-950/20 rounded-xl border border-red-500/20 space-y-2">
                  <div className="flex items-center space-x-1.5 text-red-400 text-xs font-bold">
                    <AlertTriangle size={14} />
                    <span>Escalation Notice Details</span>
                  </div>
                  <p className="text-xs text-red-300"><span className="font-semibold text-slate-300">Delay Reason:</span> {project.delayReason}</p>
                  <p className="text-xs text-red-300"><span className="font-semibold text-slate-300">Current Status:</span> {project.escalationStatus}</p>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'it_delayed') {
        title = "Delayed IT Escalations";
        const filtered = projects.filter(p => p.status === 'Delayed' && !p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4 border-l-4 border-l-red-500">
                <div>
                  <h4 className="text-base font-bold text-slate-100">{project.name}</h4>
                  <p className="text-xs text-slate-400">Client: {project.client} • Value: {project.budget}</p>
                </div>
                <div className="p-4 bg-red-950/20 rounded-xl border border-red-500/20 space-y-2">
                  <div className="flex items-center space-x-1.5 text-red-400 text-xs font-bold">
                    <AlertTriangle size={14} />
                    <span>Escalation Notice Details</span>
                  </div>
                  <p className="text-xs text-red-300"><span className="font-semibold text-slate-300">Delay Reason:</span> {project.delayReason}</p>
                  <p className="text-xs text-red-300"><span className="font-semibold text-slate-300">Current Status:</span> {project.escalationStatus}</p>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'iot_completed') {
        title = "Completed IoT Archives";
        const filtered = projects.filter(p => p.status === 'Completed' && p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{project.name}</h4>
                    <p className="text-xs text-slate-400">Client: {project.client} • Delivery Date: {project.deliveryDate || project.deadline}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-400">{project.budget}</span>
                </div>
                {project.feedback && (
                  <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20">
                    <span className="text-emerald-400 text-[10px] font-bold block uppercase">Client Testimonial</span>
                    <p className="text-xs italic text-emerald-300 mt-1">"{project.feedback}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      } else if (tab === 'it_completed') {
        title = "Completed IT Archives";
        const filtered = projects.filter(p => p.status === 'Completed' && !p.team.toLowerCase().includes('iot'));
        content = (
          <div className="space-y-4 p-2">
            {filtered.map(project => (
              <div key={project.id} className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-4 border-l-4 border-l-emerald-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-slate-100">{project.name}</h4>
                    <p className="text-xs text-slate-400">Client: {project.client} • Delivery Date: {project.deliveryDate || project.deadline}</p>
                  </div>
                  <span className="text-sm font-black text-emerald-400">{project.budget}</span>
                </div>
                {project.feedback && (
                  <div className="p-4 bg-emerald-950/20 rounded-xl border border-emerald-500/20">
                    <span className="text-emerald-400 text-[10px] font-bold block uppercase">Client Testimonial</span>
                    <p className="text-xs italic text-emerald-300 mt-1">"{project.feedback}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
    } else if (slide === 4) {
      const reportKey = tab; // 'daily', 'weekly', 'monthly'
      if (reportsData[reportKey]) {
        title = reportsData[reportKey].title;
        content = (
          <div className="space-y-6 p-2">
            <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 font-semibold">Report Period: {reportsData[reportKey].date}</span>
              <span className="text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 rounded-full uppercase">Audit Lock: Verified</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reportsData[reportKey].metrics.map((m, idx) => (
                <div key={idx} className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-400">{m.label}</span>
                  <span className="font-extrabold text-teal-400">{m.value}</span>
                </div>
              ))}
            </div>

            <div className="p-4 bg-indigo-950/15 rounded-xl border border-indigo-500/10 flex justify-between items-center">
              <span className="text-xs text-slate-400">Need full ledger export?</span>
              <button 
                onClick={() => alert("Excel ledger statement downloaded.")} 
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold transition"
              >
                Export PDF/XLS
              </button>
            </div>
          </div>
        );
      }
    }

    if (slide === 2) {
      if (tab === 'dept') {
        title = "Department Performance Metrics Workspace";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {departmentsData.map((dept, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-sm font-bold text-slate-100">{dept.name}</h4>
                    <span className="text-[10px] text-slate-400 mt-0.5 block">Lead: {dept.lead} • Staff: {dept.employeesCount}</span>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded font-semibold uppercase">KPI: {dept.kpi}%</span>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Department Productivity</span>
                      <span className="text-slate-200 font-bold">{dept.productivity}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full" style={{ width: `${dept.productivity}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Project Completion Rate</span>
                      <span className="text-slate-200 font-bold">{dept.completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${dept.completionRate}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'emp') {
        title = "Employee Performance Directory";
        content = (
          <div className="space-y-4 p-2">
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-850">
              <span className="text-xs text-slate-400">Search directory containing key staff members</span>
              <div className="relative w-72">
                <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                <input 
                  type="text" 
                  placeholder="Search employee or role..." 
                  value={searchEmployee}
                  onChange={(e) => setSearchEmployee(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="overflow-x-auto bg-slate-900/30 rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 bg-slate-900/50">
                    <th className="py-3 px-4">Employee</th>
                    <th className="py-3 px-4">Department / Role</th>
                    <th className="py-3 px-4 text-center">Tasks (Assigned/Done)</th>
                    <th className="py-3 px-4 text-center">Attendance</th>
                    <th className="py-3 px-4 text-center">Productivity</th>
                    <th className="py-3 px-4 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {employeesData
                    .filter(e => e.name.toLowerCase().includes(searchEmployee.toLowerCase()) || e.role.toLowerCase().includes(searchEmployee.toLowerCase()))
                    .map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-900/40 transition">
                        <td className="py-4 px-4 font-bold text-slate-200">{emp.name}</td>
                        <td className="py-4 px-4">
                          <p className="text-slate-300 font-medium">{emp.role}</p>
                          <p className="text-[10px] text-slate-500">{emp.department}</p>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span className="font-bold text-slate-300">{emp.tasksCompleted}</span>
                          <span className="text-slate-500"> / {emp.tasksAssigned}</span>
                        </td>
                        <td className="py-4 px-4 text-center text-slate-300">{emp.attendance}</td>
                        <td className="py-4 px-4 text-center">
                          <span className={`font-bold ${emp.productivity >= 90 ? 'text-teal-400' : 'text-yellow-500'}`}>
                            {emp.productivity}%
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right text-yellow-500 font-extrabold">★ {emp.rating}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      } else if (tab === 'hiring') {
        title = "Hiring Requisitions Board";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {hiringRequests.map(req => (
              <div key={req.id} className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-slate-100">{req.position}</span>
                    <p className="text-xs text-slate-400">{req.department} • Requested by {req.requestedBy}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                    req.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    req.status === 'Approved' ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="text-xs bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-slate-300">
                  <span className="font-semibold text-slate-200 block mb-1">Justification:</span>
                  "{req.justification}"
                  <span className="block mt-2 font-bold text-[10px] text-teal-400">Salary Budget: {req.salaryRange}</span>
                </div>

                {req.status === 'Pending' ? (
                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                    <button 
                      onClick={() => handleHiringStatus(req.id, 'Rejected')}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 transition"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleHiringStatus(req.id, 'Approved')}
                      className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-xs font-bold text-teal-400 transition"
                    >
                      Approve
                    </button>
                  </div>
                ) : (
                  <div className="text-right text-[10px] text-slate-500 font-bold uppercase pt-2 border-t border-slate-800">
                    Decision Logged
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      } else if (tab === 'resign') {
        title = "Resignations Board & Exit logs";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {resignations.map(req => (
              <div key={req.id} className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col justify-between gap-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs font-bold text-slate-100">{req.employeeName}</span>
                    <p className="text-xs text-slate-400">{req.role} • {req.department}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-0.5 rounded font-bold uppercase ${
                    req.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    req.status === 'Approved' ? 'bg-teal-500/20 text-teal-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950/40 p-3 rounded-lg border border-slate-850 text-slate-300">
                  <div>
                    <span className="font-semibold text-slate-400 block">Notice Period</span>
                    <span className="font-bold text-slate-200">{req.noticePeriod}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-400 block">Exit Target Date</span>
                    <span className="font-bold text-slate-200">{req.exitDate}</span>
                  </div>
                  <div className="col-span-2 pt-2 border-t border-slate-800">
                    <span className="font-semibold text-slate-400 block">Reason for Resignation</span>
                    <p className="italic">"{req.reason}"</p>
                  </div>
                  <div className="col-span-2 text-[10px] text-yellow-400 font-bold flex items-center space-x-1.5">
                    <AlertCircle size={12} />
                    <span>Immediate recruitment required: {req.replacementRequired}</span>
                  </div>
                </div>

                {req.status === 'Pending' ? (
                  <div className="flex justify-end space-x-2 pt-2 border-t border-slate-800">
                    <button 
                      onClick={() => handleResignationStatus(req.id, 'Rejected')}
                      className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-xs font-bold text-red-400 transition"
                    >
                      Reject
                    </button>
                    <button 
                      onClick={() => handleResignationStatus(req.id, 'Approved')}
                      className="px-4 py-2 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 rounded-lg text-xs font-bold text-teal-400 transition"
                    >
                      Approve Resignation
                    </button>
                  </div>
                ) : (
                  <div className="text-right text-[10px] text-slate-500 font-bold uppercase pt-2 border-t border-slate-800">
                    Decision Logged
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      }
    } else if (slide === 3) {
      if (tab === 'opportunities') {
        title = "New Opportunities & Leads Matrix";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            {growthOpportunities.map(opp => (
              <div key={opp.id} className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col justify-between h-44">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] bg-teal-500/10 text-teal-400 px-2 py-0.5 rounded-full font-bold">
                      {opp.type}
                    </span>
                    <span className="text-xs text-slate-500">Source: {opp.source}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-100 mt-4">{opp.name}</h4>
                </div>
                <div className="flex justify-between items-end border-t border-slate-800/80 pt-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Project Value</span>
                    <span className="text-sm font-black text-emerald-400">{opp.value}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">Win Rate</span>
                    <span className="text-xs font-extrabold text-slate-300">{opp.probability}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'expansion') {
        title = "Regional & Infrastructure Expansion Map";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
            {expansionPlans.map(plan => (
              <div key={plan.id} className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-xs font-extrabold text-slate-100 flex items-center space-x-1">
                      <MapPin size={14} className="text-indigo-400" />
                      <span>{plan.region}</span>
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{plan.status}</span>
                  </div>
                  <span className="text-xs font-black text-indigo-300">{plan.progress}%</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-500 to-teal-400 rounded-full" style={{ width: `${plan.progress}%` }}></div>
                </div>
                <p className="text-xs text-slate-400 italic">"{plan.notes}"</p>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'services') {
        title = "New Services & Staging Products";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
            {newServices.map(svc => (
              <div key={svc.id} className="p-5 bg-slate-900/50 rounded-2xl border border-slate-800 flex flex-col justify-between h-44">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-semibold uppercase">
                      {svc.vertical}
                    </span>
                    <h4 className="text-sm font-bold text-slate-100 mt-3">{svc.name}</h4>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                    svc.status === 'Production Ready' ? 'bg-teal-500/20 text-teal-400' :
                    svc.status === 'Staging Testing' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {svc.status}
                  </span>
                </div>
                <div className="flex justify-between items-end border-t border-slate-800/80 pt-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Launch ETA</span>
                    <span className="font-semibold text-slate-300">{svc.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Complexity</span>
                    <span className="font-semibold text-slate-300">{svc.complexity}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      } else if (tab === 'analysis') {
        title = "Competitor & Market Intelligence";
        content = (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs p-2">
            <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-teal-400 font-bold block uppercase tracking-wider text-[10px]">Macro Industry Trends</span>
              <p className="text-slate-300 leading-relaxed">
                Industrial IoT deployment demand is rising across logistics and automotive sectors in Tamil Nadu. 
                Companies seek integrated analytics dashboards rather than standalone hardware telemetry.
              </p>
            </div>
            <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-indigo-400 font-bold block uppercase tracking-wider text-[10px]">Competitor Activity</span>
              <p className="text-slate-300 leading-relaxed">
                Two regional firms expanded into agribusiness edge devices. 
                Entraiot maintains a strong lead due to our superior custom React dashboards and lower LTV support costs.
              </p>
            </div>
            <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block uppercase tracking-wider text-[10px]">Strategic Opportunity</span>
              <p className="text-slate-300 leading-relaxed">
                High potential to capture smart city municipal building subcontracts. 
                Leveraging our Chennai Corporation credentials gives us an advantage in Madurai & Coimbatore bids.
              </p>
            </div>
          </div>
        );
      }
    }

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(7, 10, 17, 0.98)',
        backdropFilter: 'blur(30px)',
        borderLeft: 'none',
        zIndex: 1000,
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.7)',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        animation: 'slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}>
        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}</style>
        
        {/* Workspace Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest block">MD WORKSPACE SYSTEM</span>
            <h3 className="text-lg font-black text-slate-100 mt-1">{title}</h3>
          </div>
          <button 
            onClick={() => setActiveWorkspace(null)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-850 rounded-xl text-xs font-bold text-slate-300 hover:text-slate-100 flex items-center space-x-2 transition duration-200"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>
        </div>

        {/* Workspace Content Panel */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }} className="w-full">
          <div className="max-w-7xl mx-auto w-full">
            {content}
          </div>
        </div>
      </div>
    );
  };

  const isCurrentUiVisible = activeScrollSection === 0 
    ? uiVisible 
    : (activeScrollSection === 1 
      ? slide1UiVisible 
      : (activeScrollSection === 2 
        ? slide2UiVisible 
        : (activeScrollSection === 3 
          ? slide3UiVisible 
          : slide4UiVisible)));

  return (
    <>
      {/* VIDEO PRELOADER AND PLAYER OVERLAY */}
      {!videoCompleted && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: '#000',
            zIndex: 9999,
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted={isVideoMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleIntroVideoEnded}
            onError={skipVideoIntro}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          >
            <source src="/Woman_CEO_speaking_to_camera_202606161724.mp4" type="video/mp4" />
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
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '24px',
                  textAlign: 'center'
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: '800', margin: 0, letterSpacing: '-0.5px', color: '#fff' }}>
                  ENTRAIOT SOLUTIONS
                </h2>
                <p style={{ color: '#94a3b8', fontSize: '14px' }}>Click to start with audio</p>
                <button
                  onClick={startVideoWithSound}
                  style={{
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '2px solid rgba(59, 130, 246, 0.7)',
                    borderRadius: '30px',
                    padding: '16px 54px',
                    color: '#3b82f6',
                    fontSize: '15px',
                    fontWeight: '800',
                    letterSpacing: '3px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.25)'
                  }}
                >
                  START
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {videoCompleted && (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row', overflow: 'hidden', background: '#090d16', padding: '24px', boxSizing: 'border-box', position: 'relative' }}>
          <video
            ref={bgVideoRef}
            autoPlay
            muted={false}
            playsInline
            onEnded={() => {
              if (activeScrollSection === 0) {
                setUiVisible(true);
              } else if (activeScrollSection === 1) {
                setSlide1UiVisible(true);
              } else if (activeScrollSection === 2) {
                setUiVisible(true); // Fallback / default
                setSlide2UiVisible(true);
              } else if (activeScrollSection === 3) {
                setSlide3UiVisible(true);
              } else if (activeScrollSection === 4) {
                setSlide4UiVisible(true);
              }
            }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
              zIndex: 0,
              opacity: (activeScrollSection === 0 
                ? uiVisible 
                : (activeScrollSection === 1 
                  ? slide1UiVisible 
                  : (activeScrollSection === 2 
                    ? slide2UiVisible 
                    : (activeScrollSection === 3 
                      ? slide3UiVisible 
                      : (activeScrollSection === 4 ? slide4UiVisible : true))))) ? 0.35 : 1.0,
              transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: 'none'
            }}
          />
          
          {/* Main Card Wrapper representing the AI-generated card frame aesthetic */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '24px',
            border: 'none',
            boxShadow: 'none',
            background: 'transparent',
            position: 'relative',
            overflow: 'hidden',
            zIndex: 1
          }}>

            {/* Left Side Header Brand Logo */}
            {activeScrollSection !== 1 && (
              <div style={{
                position: 'absolute',
                left: '4vw',
                top: '4vh',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
                  E
                </div>
                <div>
                  <h1 className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-200 to-teal-300 bg-clip-text text-transparent">
                    Entraiot
                  </h1>
                  <p className="text-[10px] text-teal-400 font-semibold uppercase tracking-widest">Solutions</p>
                </div>
              </div>
            )}

            {/* Left/Right Side Info Card (Overlay) */}
            {(activeScrollSection !== 3 && activeScrollSection !== 1) ? (
              <div style={{
                position: 'absolute',
                left: '4vw',
                bottom: '18vh',
                zIndex: 10,
                width: '380px',
                opacity: isCurrentUiVisible ? 1 : 0,
                pointerEvents: isCurrentUiVisible ? 'auto' : 'none',
                transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
              }}>
                <div
                  style={{
                    background: '#0c1222',
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
                    color: '#2dd4bf', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    display: 'block', 
                    marginBottom: '8px' 
                  }}>
                    {activeCardData[activeScrollSection]?.tag}
                  </span>
                  <h3 style={{ 
                    fontSize: '24px', 
                    fontWeight: '800', 
                    color: '#ffffff', 
                    lineHeight: '1.2',
                    margin: '0 0 8px 0'
                  }}>
                    {activeCardData[activeScrollSection]?.title}
                  </h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#94a3b8',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {activeCardData[activeScrollSection]?.desc}
                  </p>
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setShowSlide3RightContent(!showSlide3RightContent)}
                style={{
                  position: 'absolute',
                  right: '21vw',
                  bottom: '58vh',
                  zIndex: 200,
                  width: '330px',
                  cursor: 'pointer',
                  transform: 'scale(1)',
                  opacity: slide3UiVisible ? 1 : 0,
                  pointerEvents: slide3UiVisible ? 'auto' : 'none',
                  transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="hover:scale-[1.03] active:scale-[0.98]"
              >
                <div
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: 'none',
                    width: '100%'
                  }}
                >
                  <span style={{ 
                    fontSize: '10px', 
                    fontWeight: '800', 
                    color: '#2dd4bf', 
                    textTransform: 'uppercase', 
                    letterSpacing: '2px', 
                    display: 'block', 
                    marginBottom: '6px' 
                  }}>
                    {activeCardData[3]?.tag}
                  </span>
                  <h3 style={{ 
                    fontSize: '18px', 
                    fontWeight: '800', 
                    color: '#ffffff', 
                    lineHeight: '1.2',
                    margin: '0 0 6px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span>{activeCardData[3]?.title}</span>
                    <span style={{ fontSize: '11px', color: '#818cf8', fontWeight: 'bold', marginLeft: 'auto' }}>
                      {showSlide3RightContent ? 'Hide Strategy ✕' : 'View Strategy ↗'}
                    </span>
                  </h3>
                  <p style={{
                    fontSize: '12px',
                    color: '#94a3b8',
                    margin: 0,
                    lineHeight: '1.4'
                  }}>
                    {activeCardData[3]?.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Slide 2: Absolute IoT and IT Panels */}
            {activeScrollSection === 1 && (
              <>
                {/* Left Side: IoT Operations Center */}
                <div style={{
                  position: 'absolute',
                  left: '4vw',
                  top: '8vh',
                  zIndex: 10,
                  width: '390px',
                  opacity: slide1UiVisible ? 1 : 0,
                  pointerEvents: slide1UiVisible ? 'auto' : 'none',
                  transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: slide1UiVisible ? 'translateX(0)' : 'translateX(-30px)',
                }}>
                  <div 
                    style={{
                      background: 'rgba(9, 13, 24, 0.55)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(20, 184, 166, 0.3)',
                      borderLeft: '4px solid rgba(20, 184, 166, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 25px rgba(20, 184, 166, 0.15)',
                      borderRadius: '20px',
                      padding: '24px',
                    }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400">
                        <Activity size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-100">IoT Operations Center</h3>
                        <span className="text-[10px] text-teal-400 font-semibold uppercase tracking-wider">Hardware & Telemetry</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Monitor smart city integrations, sensor networks, telemetry arrays, and hardware deployments.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Running</span>
                        <span className="text-xs font-extrabold text-slate-200">
                          {projects.filter(p => p.team.toLowerCase().includes('iot') && p.status === 'Running').length}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Delayed</span>
                        <span className={`text-xs font-extrabold ${projects.filter(p => p.team.toLowerCase().includes('iot') && p.status === 'Delayed').length > 0 ? 'text-red-400' : 'text-slate-200'}`}>
                          {projects.filter(p => p.team.toLowerCase().includes('iot') && p.status === 'Delayed').length}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Completed</span>
                        <span className="text-xs font-extrabold text-emerald-400">
                          {projects.filter(p => p.team.toLowerCase().includes('iot') && p.status === 'Completed').length}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'iot_active' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-teal-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-teal-400">Active IoT Pipelines</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'iot_delayed' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-red-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-red-400">IoT Blocker Escalations</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'iot_completed' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-emerald-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-emerald-400">Completed IoT Archives</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right Side: IT Operations Center */}
                <div style={{
                  position: 'absolute',
                  right: '4vw',
                  top: '8vh',
                  zIndex: 10,
                  width: '390px',
                  opacity: slide1UiVisible ? 1 : 0,
                  pointerEvents: slide1UiVisible ? 'auto' : 'none',
                  transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: slide1UiVisible ? 'translateX(0)' : 'translateX(30px)',
                }}>
                  <div 
                    style={{
                      background: 'rgba(9, 13, 24, 0.55)',
                      backdropFilter: 'blur(12px)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      borderLeft: '4px solid rgba(99, 102, 241, 0.8)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 25px rgba(99, 102, 241, 0.15)',
                      borderRadius: '20px',
                      padding: '24px',
                    }}
                    className="space-y-5"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-100">IT & Software Operations</h3>
                        <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-wider">SaaS & Software Dev</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      Audit custom SaaS platforms, enterprise client CRM, portal customization, and AI analytics.
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-1">
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Running</span>
                        <span className="text-xs font-extrabold text-slate-200">
                          {projects.filter(p => !p.team.toLowerCase().includes('iot') && p.status === 'Running').length}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Delayed</span>
                        <span className={`text-xs font-extrabold ${projects.filter(p => !p.team.toLowerCase().includes('iot') && p.status === 'Delayed').length > 0 ? 'text-red-400' : 'text-slate-200'}`}>
                          {projects.filter(p => !p.team.toLowerCase().includes('iot') && p.status === 'Delayed').length}
                        </span>
                      </div>
                      <div className="p-3 bg-slate-950/40 rounded-xl border border-slate-850 text-center">
                        <span className="text-[9px] text-slate-500 block uppercase font-bold">Completed</span>
                        <span className="text-xs font-extrabold text-emerald-400">
                          {projects.filter(p => !p.team.toLowerCase().includes('iot') && p.status === 'Completed').length}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2">
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'it_active' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-indigo-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-indigo-400">Active IT Pipelines</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'it_delayed' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-red-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-red-400">IT Blocker Escalations</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 1, tab: 'it_completed' })}
                        className="w-full p-3.5 rounded-xl bg-slate-950/40 hover:bg-slate-950/80 border border-slate-850 hover:border-emerald-500/30 text-left flex items-center justify-between text-xs group transition duration-300"
                      >
                        <span className="text-slate-300 font-semibold group-hover:text-emerald-400">Completed IT Archives</span>
                        <ChevronRight size={14} className="text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* MD Meta Info Bottom Left */}
            <div style={{
              position: 'absolute',
              left: '4vw',
              bottom: '4vh',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center font-bold text-indigo-300">
                  S
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#090d16] rounded-full"></span>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">Shalini</p>
                <p className="text-[10px] text-indigo-400 font-medium">Managing Director</p>
              </div>
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
                      color: activeScrollSection === idx ? 'rgba(99, 102, 241, 1)' : 'rgba(255, 255, 255, 0.5)',
                      fontWeight: activeScrollSection === idx ? '800' : '400',
                      opacity: activeScrollSection === idx ? 1 : 0,
                      transition: 'all 0.3s ease',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      pointerEvents: 'none'
                    }}
                  >
                    {lbl}
                  </span>
                  
                  <div style={{
                    width: activeScrollSection === idx ? '12px' : '8px',
                    height: activeScrollSection === idx ? '12px' : '8px',
                    borderRadius: '50%',
                    background: activeScrollSection === idx ? 'rgba(99, 102, 241, 1)' : 'rgba(255, 255, 255, 0.25)',
                    border: activeScrollSection === idx ? '2px solid #000' : 'none',
                    outline: activeScrollSection === idx ? '2px solid rgba(99, 102, 241, 1)' : 'none',
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
                width: '56vw',
                overflowY: (activeWorkspace || isChatOpen) ? 'hidden' : 'scroll',
                scrollSnapType: 'none',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                height: '92vh',
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

              {/* SLIDE 0: Overview */}
              <section
                id="section-0"
                style={{
                  height: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 0',
                  boxSizing: 'border-box',
                  width: '100%',
                  background: 'transparent',
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    overflowY: 'auto', 
                    maxHeight: '100%', 
                    paddingRight: '10px',
                    opacity: uiVisible ? 1 : 0,
                    transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: uiVisible ? 'auto' : 'none'
                  }} 
                  className="space-y-8"
                >
                  {/* Core Hero Overview Row */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-teal-950/20 border border-indigo-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-200">Welcome back, Shalini.</h3>
                      <p className="text-sm text-slate-400 mt-1 max-w-xl">
                        Here is the 360° summary view of Entraiot Solutions. 
                        Manage departments, track projects, resolve delays, and handle pending requests.
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button 
                        onClick={() => scrollToSection(1)}
                        className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-xs font-semibold text-red-400 flex items-center space-x-2 transition"
                      >
                        <AlertTriangle size={14} />
                        <span>View {projects.filter(p => p.status === 'Delayed').length} Delayed Projects</span>
                      </button>
                      <button 
                        onClick={() => setActiveWorkspace({ slide: 0, tab: 'approvals' })}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-semibold text-white flex items-center space-x-2 shadow-lg shadow-indigo-600/25 transition"
                      >
                        <UserCheck size={14} />
                        <span>Manage {totalPending} Pending Approvals</span>
                      </button>
                    </div>
                  </div>

                  {/* COMPANY OVERVIEW STATS (KPI cards) */}
                  <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Total Revenue */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-indigo-550/30 transition duration-300">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-full"></div>
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Total Revenue</span>
                        <span className="text-emerald-400 bg-emerald-500/10 text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center">
                          <ArrowUpRight size={10} className="mr-0.5" /> +14%
                        </span>
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">₹3.05 Cr</p>
                      <p className="text-[10px] text-slate-500 mt-1">Ongoing & completed</p>
                    </div>

                    {/* Total Projects */}
                    <div 
                      onClick={() => setActiveWorkspace({ slide: 0, tab: 'projects' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Total Projects</span>
                        <span className="text-slate-400 text-xs font-semibold">Active: {projects.filter(p => p.status === 'Running').length}</span>
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">{projects.length}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-500">{projects.filter(p => p.status === 'Completed').length} delivered</span>
                        <span className="text-[9px] text-indigo-400 font-semibold uppercase tracking-wider">Launch Workspace ↗</span>
                      </div>
                    </div>

                    {/* Active Clients */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Active Clients</span>
                        <span className="text-indigo-400 text-[10px] font-bold">LTV: High</span>
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">18 Enterprise</p>
                      <p className="text-[10px] text-slate-500 mt-1">Across IoT & SaaS verticals</p>
                    </div>

                    {/* Employees */}
                    <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/30 transition duration-300">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Employees</span>
                        <span className="text-emerald-400 text-[10px] font-bold">94% Attend</span>
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">50 Active</p>
                      <p className="text-[10px] text-slate-500 mt-1">In 6 critical departments</p>
                    </div>

                    {/* Pending Approvals */}
                    <div 
                      onClick={() => setActiveWorkspace({ slide: 0, tab: 'approvals' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-yellow-500/40 relative overflow-hidden group hover:border-yellow-500/60 hover:scale-[1.02] active:scale-[0.98] transition duration-300 border-l-2 border-l-yellow-500/60 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Pending Approvals</span>
                        {totalPending > 0 && <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full animate-ping"></span>}
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">{totalPending}</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-yellow-500 font-medium">Action required</span>
                        <span className="text-[9px] text-yellow-400 font-semibold uppercase tracking-wider">Launch Workspace ↗</span>
                      </div>
                    </div>

                    {/* Company Growth % */}
                    <div 
                      onClick={() => setActiveWorkspace({ slide: 0, tab: 'growth' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 relative overflow-hidden group hover:border-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition duration-300 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-medium text-slate-400">Company Growth</span>
                        <span className="text-emerald-400 text-[10px] font-bold">YoY</span>
                      </div>
                      <p className="text-lg font-black text-slate-200 mt-2">24.8%</p>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-[10px] text-slate-500">Revenue & client metrics</span>
                        <span className="text-[9px] text-indigo-400 font-semibold uppercase tracking-wider">Launch Workspace ↗</span>
                      </div>
                    </div>
                  </section>
                </div>
              </section>

              {/* SLIDE 1: Operations */}
              <section
                id="section-1"
                style={{
                  height: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 0',
                  boxSizing: 'border-box',
                  width: '100%',
                  background: 'transparent',
                  position: 'relative'
                }}
              >
                <div style={{ height: '100%' }}></div>
              </section>

              {/* SLIDE 2: Team Management */}
              <section
                id="section-2"
                style={{
                  height: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 0',
                  boxSizing: 'border-box',
                  width: '100%',
                  background: 'transparent',
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    overflowY: 'auto', 
                    maxHeight: '100%', 
                    paddingRight: '10px',
                    opacity: slide2UiVisible ? 1 : 0,
                    transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: slide2UiVisible ? 'auto' : 'none'
                  }} 
                  className="space-y-8"
                >
                  {/* High-Level Overview Panel */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/60 via-indigo-950/20 to-teal-950/20 border border-slate-800 space-y-4">
                    <h3 className="text-lg font-black text-slate-100">3. Team & Resource Administration</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Manage department leads, monitor employee ratings, and resolve talent acquisition cycles. 
                      Click the options below to open dedicated management worksheets.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Departments</span>
                        <span className="text-sm font-extrabold text-slate-200">{departmentsData.length} Active</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Key Staff</span>
                        <span className="text-sm font-extrabold text-slate-200">{employeesData.length} Headcount</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Open Roles</span>
                        <span className="text-sm font-extrabold text-yellow-500">{hiringRequests.filter(r=>r.status==='Pending').length} Requisitions</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Pending Exits</span>
                        <span className="text-sm font-extrabold text-red-400">{resignations.filter(r=>r.status==='Pending').length} Exit Requests</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch Board */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Launch Card 1 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 2, tab: 'dept' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer border-l-4 border-l-indigo-500"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <Activity size={14} />
                          <span>Performance Metrics</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Department Workspace</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Audit leads, productivity, and completion rates.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 2 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 2, tab: 'emp' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer border-l-4 border-l-teal-500"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-teal-400 font-bold text-[10px] uppercase tracking-wider">
                          <Users size={14} />
                          <span>Staff Records</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Employee Directory</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Search active key roles, attendance, and task rating logs.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-teal-400 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 3 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 2, tab: 'hiring' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-yellow-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer border-l-4 border-l-yellow-500"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-yellow-500 font-bold text-[10px] uppercase tracking-wider">
                          <UserCheck size={14} />
                          <span>Talent Acquisition</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Hiring Requisitions</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Approve department budget requisitions and justifications.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-yellow-500 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 4 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 2, tab: 'resign' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-red-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer border-l-4 border-l-red-500"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-red-400 font-bold text-[10px] uppercase tracking-wider">
                          <UserMinus size={14} />
                          <span>Exit Management</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Resignations Board</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Track notices, exits, and recruitment replacement demands.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-red-500 group-hover:translate-x-1 transition duration-300" />
                    </button>
                  </div>
                </div>
              </section>

              {/* SLIDE 3: Company Growth */}
              <section
                id="section-3"
                style={{
                  height: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 0',
                  boxSizing: 'border-box',
                  width: '100%',
                  background: 'transparent',
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    overflowY: 'auto', 
                    maxHeight: '100%', 
                    paddingRight: '10px',
                    opacity: (slide3UiVisible && showSlide3RightContent) ? 1 : 0,
                    transform: (slide3UiVisible && showSlide3RightContent) ? 'translateX(0)' : 'translateX(50px)',
                    transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: (slide3UiVisible && showSlide3RightContent) ? 'auto' : 'none'
                  }} 
                  className="space-y-8"
                >
                  {/* High-Level Overview Panel */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/60 via-indigo-950/20 to-teal-950/20 border border-slate-800 space-y-4">
                    <h3 className="text-lg font-black text-slate-100">4. Future Scale & Growth Drivers</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Track market intelligence, government tenders, regional hubs, and staging products under R&D. 
                      Click the options below to open dedicated strategy workspaces.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Active Deals</span>
                        <span className="text-sm font-extrabold text-slate-200">{growthOpportunities.length} opportunities</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Planned Hubs</span>
                        <span className="text-sm font-extrabold text-slate-200">{expansionPlans.length} regions</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">R&D Staging</span>
                        <span className="text-sm font-extrabold text-teal-400">{newServices.length} services</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch Board */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Launch Card 1 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 3, tab: 'opportunities' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <Rocket size={14} />
                          <span>Sales Funnel</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">New Opportunities</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Audit active deals, project values, and win rate forecasts.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 2 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 3, tab: 'expansion' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <MapPin size={14} />
                          <span>Infrastructure</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Regional Expansion</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Check Tier-2 hub setups and staff registration plans.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 3 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 3, tab: 'services' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <Layers size={14} />
                          <span>R&D Pipeline</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">New Services Launchpad</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Review staging products, complexity scores, and launch ETAs.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                    </button>

                    {/* Launch Card 4 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 3, tab: 'analysis' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <TrendingUp size={14} />
                          <span>Intelligence</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-200 mt-2">Competitor Analysis</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Macro industry trends and strategic opportunity assessments.</p>
                      </div>
                      <ChevronRight size={18} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                    </button>
                  </div>
                </div>
              </section>

              {/* SLIDE 4: Reports */}
              <section
                id="section-4"
                style={{
                  height: '92vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  padding: '40px 0',
                  boxSizing: 'border-box',
                  width: '100%',
                  background: 'transparent',
                  position: 'relative'
                }}
              >
                <div 
                  style={{ 
                    overflowY: 'auto', 
                    maxHeight: '100%', 
                    paddingRight: '10px',
                    opacity: slide4UiVisible ? 1 : 0,
                    transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
                    pointerEvents: slide4UiVisible ? 'auto' : 'none'
                  }} 
                  className="space-y-8"
                >
                  {/* High-Level Overview Panel */}
                  <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900/60 via-indigo-950/20 to-teal-950/20 border border-slate-800 space-y-4">
                    <h3 className="text-lg font-black text-slate-100">5. Performance Reports & Audits</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Generate and review corporate audits, daily operational milestones, and weekly performance summaries. 
                      Select a timeframe below to launch the dedicated workspace overlay.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Current Period</span>
                        <span className="text-xs font-extrabold text-slate-200">June 2026</span>
                      </div>
                      <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 uppercase font-bold">Operational Metrics</span>
                        <span className="text-xs font-extrabold text-teal-400">Audited & Locked</span>
                      </div>
                    </div>
                  </div>

                  {/* Launch Board */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Launch Card 1 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 4, tab: 'daily' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex flex-col justify-between h-40 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <FileText size={14} />
                          <span>Daily</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-slate-200">Daily Operational Report</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Today's Revenue, completed tasks, meetings, and milestone trackers.</p>
                      </div>
                    </button>

                    {/* Launch Card 2 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 4, tab: 'weekly' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex flex-col justify-between h-40 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <Activity size={14} />
                          <span>Weekly</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-slate-200">Weekly Performance Report</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Weekly Revenue, productivity averages, enterprise leads, and issue logs.</p>
                      </div>
                    </button>

                    {/* Launch Card 3 */}
                    <button 
                      onClick={() => setActiveWorkspace({ slide: 4, tab: 'monthly' })}
                      className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition duration-300 text-left flex flex-col justify-between h-40 group cursor-pointer"
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2 text-indigo-400 font-bold text-[10px] uppercase tracking-wider">
                          <FileSpreadsheet size={14} />
                          <span>Monthly</span>
                        </div>
                        <ChevronRight size={16} className="text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition duration-300" />
                      </div>
                      <div className="mt-4">
                        <h4 className="text-sm font-bold text-slate-200">Monthly Growth Audit</h4>
                        <p className="text-[10px] text-slate-500 mt-1">Monthly Revenue, net profit margin, YoY growth %, and expansion updates.</p>
                      </div>
                    </button>
                  </div>
                </div>
              </section>



            </main>

            {/* Slide-out Workspace Sheet */}
            {activeWorkspace && renderSubPage()}

            {/* Chatbot Floating Widget */}
            <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 9999 }}>
              {isChatOpen ? (
                <div style={{
                  width: '360px',
                  height: '480px',
                  background: 'rgba(9, 13, 22, 0.95)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '20px',
                  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  animation: 'fadeInUp 0.3s ease-out'
                }}>
                  <style>{`
                    @keyframes fadeInUp {
                      from { opacity: 0; transform: translateY(15px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                  `}</style>
                  
                  {/* Chat Header */}
                  <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-400">
                        <Bot size={18} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-100 uppercase tracking-wider">MD Portal Assistant</h4>
                        <span className="text-[9px] text-emerald-400 flex items-center mt-0.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1 inline-block animate-pulse"></span>
                          Online & Ready
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={() => setIsChatOpen(false)}
                      className="p-1 bg-slate-950 border border-slate-850 rounded-lg text-slate-400 hover:text-slate-200 transition"
                    >
                      <X size={14} />
                    </button>
                  </div>

                  {/* Chat Messages */}
                  <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }} className="space-y-4 text-xs scrollbar-none">
                    {chatMessages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none' 
                            : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isBotTyping && (
                      <div className="flex justify-start">
                        <div className="p-3 bg-slate-900/80 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none flex items-center space-x-1">
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                          <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  <div className="px-4 py-2 border-t border-slate-800/40 bg-slate-950/20 flex flex-wrap gap-1.5">
                    {[
                      { label: "Check Approvals", query: "Open pending approvals workspace" },
                      { label: "Total Revenue", query: "What is the total revenue?" },
                      { label: "Employee Directory", query: "Open employee directory" },
                      { label: "Hiring History", query: "Show decisions log" }
                    ].map((chip, idx) => (
                      <button 
                        key={idx}
                        onClick={() => handleSendChatMessage(chip.query)}
                        className="text-[9px] font-semibold text-indigo-400 bg-indigo-500/5 hover:bg-indigo-500/10 border border-indigo-500/10 rounded-full px-2 py-0.5 transition"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendChatMessage(chatInput);
                    }}
                    className="p-3 border-t border-slate-800 bg-slate-900/30 flex items-center space-x-2"
                  >
                    <input 
                      type="text"
                      placeholder="Ask a question or enter navigation command..."
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                    />
                    <button 
                      type="submit"
                      className="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition flex items-center justify-center"
                    >
                      <Send size={14} />
                    </button>
                  </form>
                </div>
              ) : (
                <button 
                  onClick={() => setIsChatOpen(true)}
                  className="p-4 bg-indigo-600 hover:bg-indigo-500 border border-indigo-500/30 text-white rounded-full shadow-2xl hover:scale-105 active:scale-95 transition flex items-center justify-center relative group"
                >
                  <MessageSquare size={22} />
                  {totalPending > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-[10px] font-black text-slate-950 w-5 h-5 rounded-full flex items-center justify-center border border-slate-950 shadow-md">
                      {totalPending}
                    </span>
                  )}
                  <span className="absolute right-full mr-2 bg-slate-900 border border-slate-800 text-[10px] font-bold text-slate-200 px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
                    Talk to MD Assistant
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  );
}
