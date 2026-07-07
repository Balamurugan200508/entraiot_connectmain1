import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, Navigation } from 'lucide-react';

export default function DeveloperChatbot({ activeTab, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hello! I am your ENTRA AI Assistant. Ask me anything about the developer command center, or ask me to navigate to any section (e.g., 'show metrics summary', 'go to projects')!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const quickPrompts = [
    { text: "Open Metrics Summary", action: "Navigate" },
    { text: "Go to Projects Registry", action: "Navigate" },
    { text: "How do I optimize DB?", action: "Question" },
    { text: "Show Performance Reports", action: "Navigate" }
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Trigger typing simulation
    setIsTyping(true);

    setTimeout(() => {
      processBotResponse(text);
    }, 800);
  };

  const processBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();
    let reply = "";
    let shouldNavigate = null;
    let targetTabName = "";

    // 1. Navigation checks
    if (lowerQuery.includes('metric') || lowerQuery.includes('performance') || lowerQuery.includes('latency') || lowerQuery.includes('speed')) {
      shouldNavigate = 'metrics';
      targetTabName = 'Metrics Summary';
    } else if (lowerQuery.includes('activities') || lowerQuery.includes('activity') || lowerQuery.includes('workflow') || lowerQuery.includes('git') || lowerQuery.includes('commit') || lowerQuery.includes('docker')) {
      shouldNavigate = 'activities';
      targetTabName = 'Developer Activities';
    } else if (lowerQuery.includes('collab') || lowerQuery.includes('team') || lowerQuery.includes('discussion') || lowerQuery.includes('chat') || lowerQuery.includes('collaboration')) {
      shouldNavigate = 'collaboration';
      targetTabName = 'Collaboration Hub';
    } else if (lowerQuery.includes('report') || lowerQuery.includes('audit') || lowerQuery.includes('cashflow') || lowerQuery.includes('finance')) {
      shouldNavigate = 'reports';
      targetTabName = 'Performance Reports';
    } else if (lowerQuery.includes('project') || lowerQuery.includes('registry') || lowerQuery.includes('workspace')) {
      shouldNavigate = 'projects';
      targetTabName = 'Projects Registry';
    } else if (lowerQuery.includes('dashboard') || lowerQuery.includes('home') || lowerQuery.includes('overview') || lowerQuery.includes('command center')) {
      shouldNavigate = 'dashboard';
      targetTabName = 'Command Overview';
    }

    // 2. Answering technical questions
    if (shouldNavigate) {
      reply = `Sure! I am navigating you to the **${targetTabName}** section right now. Let me know if you need help with anything else there!`;
      onNavigate(shouldNavigate);
    } else if (lowerQuery.includes('db') || lowerQuery.includes('database') || lowerQuery.includes('vacuum') || lowerQuery.includes('optimize')) {
      reply = "To optimize the database, go to the **Metrics Summary** section and click the **'Vacuum Indexes'** button under the Database Performance card. This rebuilds inactive indexes and cleans up disk page space.";
    } else if (lowerQuery.includes('mfa') || lowerQuery.includes('security') || lowerQuery.includes('firewall')) {
      reply = "You can audit active security parameters directly in the **Infrastructure Vitals** panel on the Dashboard, or apply custom policies from the **Metrics Summary** page using the **'Deploy Patch'** utility.";
    } else if (lowerQuery.includes('checklist') || lowerQuery.includes('goal')) {
      reply = "You can view and complete your active daily checklist on the **Dashboard** under the **'Show Daily Checklist'** section. Complete goals to increase daily operational speed.";
    } else if (lowerQuery.includes('commit') || lowerQuery.includes('build')) {
      reply = "To simulate git commits, code compiles, or docker image deployments, check out the **Developer Activities** panel from the sidebar dot menu.";
    } else if (lowerQuery.includes('uptime')) {
      reply = "Our core Gateway Router uptime target is **>99.9%**. You can check the current health status of all edge routers and load balancers inside the full-page **Metrics Summary** panel.";
    } else {
      reply = "I'm not completely sure about that. But you can ask me to navigate to any section (e.g., 'go to projects', 'show metrics'), check database performance, or ask about daily goals checklist!";
    }

    setIsTyping(false);
    setMessages(prev => [
      ...prev,
      {
        id: Date.now() + 1,
        sender: 'bot',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start font-sans">
      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[480px] bg-gray-950/95 border border-gray-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden mb-4 backdrop-blur-xl animate-slide-in">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#0b1329] to-gray-950 border-b border-gray-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-brand-cyan/10 text-brand-cyan relative">
                <Bot size={18} />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-brand-emerald ring-2 ring-gray-950 animate-pulse"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider m-0">ENTRA AI Assistant</h4>
                <span className="text-[10px] font-mono text-brand-emerald">Agent Active</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg hover:bg-gray-900 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Messages List */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 custom-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-brand-cyan to-brand-purple text-white rounded-tr-none' 
                      : 'bg-gray-900 border border-gray-850 text-gray-200 rounded-tl-none font-medium'
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/'(.*?)'/g, '<code>$1</code>')
                  }}
                />
                <span className="text-[9px] text-gray-500 font-mono mt-1 px-1">
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="bg-gray-900 border border-gray-850 text-gray-400 rounded-2xl rounded-tl-none px-3.5 py-2.5 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-100"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Container */}
          <div className="p-3 border-t border-gray-900 bg-gray-950/60 flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt.text)}
                className="text-[10px] font-semibold text-gray-400 hover:text-white bg-gray-900 hover:bg-gray-850 border border-gray-850 hover:border-brand-cyan/40 px-2.5 py-1 rounded-full transition-all cursor-pointer flex items-center gap-1"
              >
                {prompt.action === 'Navigate' && <Navigation size={8} className="text-brand-cyan" />}
                {prompt.action === 'Question' && <Sparkles size={8} className="text-brand-purple" />}
                {prompt.text}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
            className="p-3 bg-[#080d1a] border-t border-gray-900 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask a question or enter a command..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-505 focus:outline-none focus:border-brand-cyan transition-colors"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-gradient-to-r from-brand-cyan to-brand-purple hover:scale-105 transition-transform text-white cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple p-[1.5px] shadow-lg shadow-brand-cyan/20 hover:scale-105 transition-transform duration-300 flex items-center justify-center cursor-pointer border border-white/5 group relative"
      >
        <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-white relative">
          {isOpen ? <X size={20} /> : <MessageSquare size={20} className="group-hover:rotate-3 transition-transform" />}
          
          {/* Notification Indicator Dot */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-brand-rose border border-gray-950 animate-pulse"></span>
          )}
        </div>
      </button>
    </div>
  );
}
