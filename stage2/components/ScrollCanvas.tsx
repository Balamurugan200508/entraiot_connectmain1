"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import DashboardOverlay from "@/components/DashboardOverlay";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Helper component to handle script loading for Visme
const VismeEmbed = ({ url, formId, title }: { url: string; formId: string; title: string }) => {
  useEffect(() => {
    const existingScript = document.querySelector('script[src*="vismeforms-embed.js"]');
    if (existingScript) existingScript.remove();

    const script = document.createElement('script');
    script.src = 'https://static-bundles.visme.co/forms/vismeforms-embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [url, formId]);

  return (
    <div 
      className="visme_d" 
      data-title={title} 
      data-url={`${url}?fullPage=true`} 
      data-domain="forms" 
      data-full-page="true" 
      data-min-height="100vh" 
      data-form-id={formId}
    />
  );
};

const FRAME_COUNT = 179;

export default function ScrollCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [imagesLoading, setImagesLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [mgmtModalOpen, setMgmtModalOpen] = useState(false);
  const [techModalOpen, setTechModalOpen] = useState(false);
  
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Element Refs for Text Animation
  const beatARef = useRef<HTMLDivElement>(null);
  const beatBRef = useRef<HTMLDivElement>(null);
  const sign1Ref = useRef<HTMLDivElement>(null);
  const sign2Ref = useRef<HTMLDivElement>(null);
  const sign3Ref = useRef<HTMLDivElement>(null);
  const sign4Ref = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const loadImages = useCallback(async () => {
    let loaded = 0;
    const loadPromises = Array.from({ length: FRAME_COUNT }).map((_, i) => {
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadProgress(Math.floor((loaded / FRAME_COUNT) * 100));
          imagesRef.current[i] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loaded++;
          setLoadProgress(Math.floor((loaded / FRAME_COUNT) * 100));
          resolve(img); // Resolve anyway so it doesn't hang
        };
        img.src = `/way/sequence/ezgif-frame-${String(i + 2).padStart(3, '0')}.png`;
      });
    });

    await Promise.all(loadPromises);
    setImagesLoading(false);
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = imagesRef.current[index];

    if (!canvas || !ctx || !img) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Cover logic
    const ctxRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight;
    let offsetX = 0, offsetY = 0;

    if (imgRatio > ctxRatio) {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  useEffect(() => {
    imagesRef.current = new Array(FRAME_COUNT);
    loadImages().then(() => drawFrame(0));
    return () => { imagesRef.current = []; };
  }, [loadImages, drawFrame]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use GSAP to synchronize timeline accurately over scroll
  useGSAP(() => {
    if (imagesLoading) return;

    // Headless proxy object to bind 0-119 value
    const playhead = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth dampening matching our previous 100 stiffness
        onUpdate: (self) => {
          if (self.progress > 0.995 && !window.location.href.includes('/buildings')) {
            window.location.href = '/buildings';
          }
        }
      }
    });

    // Animate Frames
    tl.to(playhead, {
      frame: FRAME_COUNT - 1,
      snap: "frame",
      ease: "none",
      duration: 1, // The entire timeline acts as 1 full unit of "progress"
      onUpdate: () => drawFrame(playhead.frame)
    }, 0);

    // Scroll Indicator Hide (0 -> 10%)
    tl.to(indicatorRef.current, { opacity: 0, duration: 0.1, ease: "none" }, 0);

    // Beat A (0-20%) -> Fade in 0-5%, Holds 5-15%, Fades out 15-20%
    tl.fromTo(beatARef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.05, ease: "power1.out" }, 0);
    tl.to(beatARef.current, { opacity: 0, y: -20, duration: 0.05, ease: "power1.inOut" }, 0.15);

    // Beat B (Dashboard on Left Side, visible initially, fades out on scroll)
    tl.to(beatBRef.current, { opacity: 0, x: -20, duration: 0.05, ease: "power1.inOut" }, 0);

    // Sign 1 (Management - Left) 22-31%
    tl.fromTo(sign1Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.02, ease: "power2.out" }, 0.22);
    tl.to(sign1Ref.current, { opacity: 0, x: -50, duration: 0.02, ease: "power2.in" }, 0.31);

    // Sign 2 (Marketing - Right) 33-42%
    tl.fromTo(sign2Ref.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.02, ease: "power2.out" }, 0.33);
    tl.to(sign2Ref.current, { opacity: 0, x: 50, duration: 0.02, ease: "power2.in" }, 0.42);

    // Sign 3 (Technical - Left) 44-53%
    tl.fromTo(sign3Ref.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.02, ease: "power2.out" }, 0.44);
    tl.to(sign3Ref.current, { opacity: 0, x: -50, duration: 0.02, ease: "power2.in" }, 0.53);

    // Sign 4 (Financial - Right) 55-64%
    tl.fromTo(sign4Ref.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.02, ease: "power2.out" }, 0.55);
    tl.to(sign4Ref.current, { opacity: 0, x: 50, duration: 0.02, ease: "power2.in" }, 0.64);


  }, { dependencies: [imagesLoading, drawFrame], scope: containerRef });

  return (
    <div ref={containerRef} className="relative h-[1600vh] bg-[#050505]">
      {imagesLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <div className="text-white/60 text-sm uppercase tracking-widest mb-4 font-medium">Loading Experience</div>
          <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out" 
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      )}
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
        
        {/* Scroll Indicator */}
        <div 
          ref={indicatorRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <div className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-3 font-medium">Scroll to Explore</div>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 h-screen w-full">
          {/* Beat A */}
          <div 
            ref={beatARef}
            className="absolute inset-0 flex items-center justify-center text-center px-4 opacity-0"
          >
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white/90 drop-shadow-lg mb-6">
                ENTRAIOT SOLUTION
              </h1>
              <p className="text-xl md:text-2xl text-white/60 font-light tracking-tight">
                Empowering innovation through AI, IoT, and intelligent solutions — that’s EntraIoT.
              </p>
            </div>
          </div>

          <div 
            ref={beatBRef}
            className="absolute left-[5vw] top-1/2 -translate-y-1/2 opacity-100 pointer-events-auto z-[60]"
          >
            <DashboardOverlay 
              onOpenMgmt={() => setMgmtModalOpen(true)} 
              onOpenTech={() => setTechModalOpen(true)} 
            />
          </div>

          {/* Sign 1: Management (Left) */}
          <div ref={sign1Ref} className="absolute inset-0 flex items-center justify-center w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <a 
              href="#management-login"
              onClick={(e) => {
                e.preventDefault();
                setMgmtModalOpen(true);
              }}
              className="max-w-4xl w-full bg-[#0c0f1d]/75 backdrop-blur-3xl border border-blue-500/30 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(59,130,246,0.3)] relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-blue-500/50 hover:shadow-[0_0_80px_-10px_rgba(59,130,246,0.5)] pointer-events-auto cursor-pointer block no-underline group"
            >
              {/* Glow accents */}
              <div className="absolute top-0 right-1/4 w-96 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
              <div className="absolute -inset-20 bg-gradient-to-br from-blue-500/10 to-purple-500/5 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left content column */}
                <div className="md:col-span-7 flex flex-col text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl border border-blue-500/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">🏢</div>
                    <span className="text-[9px] tracking-[0.2em] font-extrabold text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20 uppercase">
                      ✦ Strategic Excellence
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-none">
                    Management <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">Field</span>
                  </h3>
                  
                  <div className="w-16 h-[3px] bg-blue-500 rounded mb-5" />
                  
                  <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
                    Strategizing for the future, optimizing processes, and leading the way towards comprehensive digital transformation.
                  </p>
                  
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 rounded-2xl text-white text-sm font-semibold flex items-center gap-3 w-fit shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_30px_rgba(59,130,246,0.5)] transition-all duration-300">
                    <span>Access Portal</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Right image/illustration column */}
                <div className="md:col-span-5 relative flex items-center justify-center h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-slate-950/40 border border-white/5">
                  {/* Radar Circles behind illustration */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                    <div className="absolute w-72 h-72 border border-blue-500/10 rounded-full animate-[ping_3s_infinite]" />
                    <div className="absolute w-56 h-56 border border-blue-500/15 rounded-full" />
                    <div className="absolute w-36 h-36 border border-blue-500/20 rounded-full" />
                  </div>

                  <img src="/way/image/management.webp" className="h-[80%] object-contain relative z-10 filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Management Graphic" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-15" />

                  {/* Upward overlay arrow curve */}
                  <div className="absolute top-8 right-8 text-orange-500/30 text-8xl font-thin select-none pointer-events-none z-10">↗</div>

                  {/* Mini Overlay Box */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] text-left shadow-2xl z-20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">👥</span>
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider">Unified Leadership</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-normal font-light">
                      Empowering teams and building a culture of excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Row */}
              <div className="border-t border-white/10 mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">🎯</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Strategic Planning</h4>
                    <p className="text-white/40 text-[10px] font-light">Future-ready strategies</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">📈</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Process Optimization</h4>
                    <p className="text-white/40 text-[10px] font-light">Smarter, efficient workflows</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">⚡</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Digital Transformation</h4>
                    <p className="text-white/40 text-[10px] font-light">Driving meaningful change</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Sign 2: Marketing (Right) */}
          <div ref={sign2Ref} className="absolute inset-0 flex items-center justify-center w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <div className="max-w-4xl w-full bg-[#1b0d0c]/75 backdrop-blur-3xl border border-orange-500/30 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(249,115,22,0.3)] relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-orange-500/50 hover:shadow-[0_0_80px_-10px_rgba(249,115,22,0.5)] pointer-events-auto block group">
              {/* Glow accents */}
              <div className="absolute top-0 left-1/4 w-96 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-50" />
              <div className="absolute -inset-20 bg-gradient-to-bl from-orange-500/10 to-pink-500/5 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left contents */}
                <div className="md:col-span-7 flex flex-col text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-orange-500/10 rounded-2xl border border-orange-500/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(249,115,22,0.2)]">📢</div>
                    <span className="text-[9px] tracking-[0.2em] font-extrabold text-orange-400 bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20 uppercase">
                      ✦ Global Outreach
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-none">
                    Marketing <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">Field</span>
                  </h3>
                  
                  <div className="w-16 h-[3px] bg-orange-500 rounded mb-5" />
                  
                  <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
                    Crafting compelling narratives, engaging audiences, and driving growth through data-backed market intelligence.
                  </p>
                  
                  <div className="bg-gradient-to-r from-orange-600 to-pink-600 px-8 py-3.5 rounded-2xl text-white text-sm font-semibold flex items-center gap-3 w-fit shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_4px_30px_rgba(249,115,22,0.5)] transition-all duration-300">
                    <span>Explore Insights</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Right Illustration */}
                <div className="md:col-span-5 relative flex items-center justify-center h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-slate-950/40 border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                    <div className="absolute w-72 h-72 border border-orange-500/10 rounded-full animate-[ping_3s_infinite]" />
                    <div className="absolute w-56 h-56 border border-orange-500/15 rounded-full" />
                    <div className="absolute w-36 h-36 border border-orange-500/20 rounded-full" />
                  </div>

                  <img src="/way/image/marketing.webp" className="h-[80%] object-contain relative z-10 filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Marketing Graphic" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-15" />

                  {/* Mini Overlay Box */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] text-left shadow-2xl z-20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">📣</span>
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider">Brand Resonance</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-normal font-light">
                      Connecting audiences and scaling impact globally.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Row */}
              <div className="border-t border-white/10 mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">📊</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Market Intelligence</h4>
                    <p className="text-white/40 text-[10px] font-light">Data-backed insights</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">📣</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Campaign Strategy</h4>
                    <p className="text-white/40 text-[10px] font-light">Engaging stories & reach</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-sm">🚀</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Growth Optimization</h4>
                    <p className="text-white/40 text-[10px] font-light">Maximizing ROAS & conversion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign 3: Technical (Left) */}
          <div ref={sign3Ref} className="absolute inset-0 flex items-center justify-center w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <a 
              href="#technical-login"
              onClick={(e) => {
                e.preventDefault();
                setTechModalOpen(true);
              }}
              className="max-w-4xl w-full bg-[#0b1c16]/75 backdrop-blur-3xl border border-emerald-500/30 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(16,185,129,0.3)] relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-emerald-500/50 hover:shadow-[0_0_80px_-10px_rgba(16,185,129,0.5)] pointer-events-auto cursor-pointer block no-underline group"
            >
              {/* Glow accents */}
              <div className="absolute top-0 right-1/4 w-96 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
              <div className="absolute -inset-20 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <div className="md:col-span-7 flex flex-col text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(16,185,129,0.2)]">💻</div>
                    <span className="text-[9px] tracking-[0.2em] font-extrabold text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20 uppercase">
                      ✦ Architectural Excellence
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-none">
                    Technical <span className="bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent">Field</span>
                  </h3>
                  
                  <div className="w-16 h-[3px] bg-emerald-500 rounded mb-5" />
                  
                  <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
                    Building robust architectures, engineering innovative solutions, and pushing the boundaries of modern technology.
                  </p>
                  
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-3.5 rounded-2xl text-white text-sm font-semibold flex items-center gap-3 w-fit shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.5)] transition-all duration-300">
                    <span>Access Portal</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Right Illustration */}
                <div className="md:col-span-5 relative flex items-center justify-center h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-slate-950/40 border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                    <div className="absolute w-72 h-72 border border-emerald-500/10 rounded-full animate-[ping_3s_infinite]" />
                    <div className="absolute w-56 h-56 border border-emerald-500/15 rounded-full" />
                    <div className="absolute w-36 h-36 border border-emerald-500/20 rounded-full" />
                  </div>

                  <img src="/way/image/technical.webp" className="h-[80%] object-contain relative z-10 filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Technical Graphic" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-15" />

                  {/* Mini Overlay Box */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] text-left shadow-2xl z-20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">🔧</span>
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider">Engineering Power</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-normal font-light">
                      Designing high-performance backend systems & infrastructure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Row */}
              <div className="border-t border-white/10 mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">🛠️</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Software Engineering</h4>
                    <p className="text-white/40 text-[10px] font-light">Robust, scalable architectures</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">💡</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">R&D Innovation</h4>
                    <p className="text-white/40 text-[10px] font-light">Pioneering next-gen solutions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-sm">🛡️</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Infrastructure Scaling</h4>
                    <p className="text-white/40 text-[10px] font-light">High availability & security</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Sign 4: Financial (Right) */}
          <div ref={sign4Ref} className="absolute inset-0 flex items-center justify-center w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <div className="max-w-4xl w-full bg-[#1b1509]/75 backdrop-blur-3xl border border-amber-500/30 rounded-[2.5rem] p-8 md:p-10 shadow-[0_0_60px_-15px_rgba(245,158,11,0.3)] relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:border-amber-500/50 hover:shadow-[0_0_80px_-10px_rgba(245,158,11,0.5)] pointer-events-auto block group">
              {/* Glow accents */}
              <div className="absolute top-0 left-1/4 w-96 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50" />
              <div className="absolute -inset-20 bg-gradient-to-bl from-amber-500/10 to-red-500/5 blur-3xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Content */}
                <div className="md:col-span-7 flex flex-col text-left">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center text-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">💰</div>
                    <span className="text-[9px] tracking-[0.2em] font-extrabold text-amber-400 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20 uppercase">
                      ✦ Fiscal Stability
                    </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-none">
                    Financial <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Field</span>
                  </h3>
                  
                  <div className="w-16 h-[3px] bg-amber-500 rounded mb-5" />
                  
                  <p className="text-white/75 text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
                    Ensuring sustainable growth, managing resources efficiently, and securing long-term economic stability.
                  </p>
                  
                  <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-8 py-3.5 rounded-2xl text-white text-sm font-semibold flex items-center gap-3 w-fit shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_4px_30px_rgba(245,158,11,0.5)] transition-all duration-300">
                    <span>View Statements</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
                
                {/* Right Illustration */}
                <div className="md:col-span-5 relative flex items-center justify-center h-64 md:h-80 w-full rounded-3xl overflow-hidden bg-slate-950/40 border border-white/5">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-110">
                    <div className="absolute w-72 h-72 border border-amber-500/10 rounded-full animate-[ping_3s_infinite]" />
                    <div className="absolute w-56 h-56 border border-amber-500/15 rounded-full" />
                    <div className="absolute w-36 h-36 border border-amber-500/20 rounded-full" />
                  </div>

                  <img src="/way/image/financial.webp" className="h-[80%] object-contain relative z-10 filter brightness-90 group-hover:scale-105 transition-transform duration-700" alt="Financial Graphic" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-15" />

                  {/* Mini Overlay Box */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 max-w-[200px] text-left shadow-2xl z-20">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm">📊</span>
                      <span className="text-[9px] font-bold text-white uppercase tracking-wider">Asset Management</span>
                    </div>
                    <p className="text-[10px] text-white/50 leading-normal font-light">
                      Ensuring long-term growth and capital efficiency.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Row */}
              <div className="border-t border-white/10 mt-8 pt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">💼</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Resource Allocation</h4>
                    <p className="text-white/40 text-[10px] font-light">Smart capital management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">🛡️</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Risk Management</h4>
                    <p className="text-white/40 text-[10px] font-light">Protecting assets & value</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-bold text-sm">🪙</div>
                  <div>
                    <h4 className="text-white text-xs font-semibold">Financial Growth</h4>
                    <p className="text-white/40 text-[10px] font-light">Sustainable economic scalability</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Modal */}
      {mgmtModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-[90%] max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center bg-[#8b7082] text-white px-6 py-4">
              <span className="font-bold uppercase tracking-widest text-sm">Management Portal</span>
              <button onClick={() => setMgmtModalOpen(false)} className="text-3xl leading-none">&times;</button>
            </div>
            <div className="flex-1 w-full bg-[#fafafa] overflow-auto p-4">
              <VismeEmbed 
                url="6vz8o9k7-club-membership-sign-up-form" 
                formId="177550" 
                title="Management Portal" 
              />
            </div>
          </div>
        </div>
      )}

      {/* Technical Modal */}
      {techModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-[90%] max-w-4xl h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="flex justify-between items-center bg-[#8b7082] text-white px-6 py-4">
              <span className="font-bold uppercase tracking-widest text-sm">Technical Portal</span>
              <button onClick={() => setTechModalOpen(false)} className="text-3xl leading-none">&times;</button>
            </div>
            <div className="flex-1 w-full bg-[#fafafa] overflow-auto p-4">
              <VismeEmbed 
                url="vm1nwkwd-club-membership-sign-up-form" 
                formId="180145" 
                title="Technical Portal" 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
