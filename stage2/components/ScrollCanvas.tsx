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
    const STEP = 2;
    const totalToLoad = Math.ceil(FRAME_COUNT / STEP);
    const loadPromises = Array.from({ length: totalToLoad }).map((_, idx) => {
      const i = idx * STEP;
      return new Promise<HTMLImageElement>((resolve) => {
        const img = new Image();
        img.onload = () => {
          loaded++;
          setLoadProgress(Math.floor((loaded / totalToLoad) * 100));
          imagesRef.current[i] = img;
          resolve(img);
        };
        img.onerror = () => {
          console.error(`Failed to load frame ${i}`);
          loaded++;
          setLoadProgress(Math.floor((loaded / totalToLoad) * 100));
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
    const STEP = 2;
    const targetIndex = Math.floor(index / STEP) * STEP;
    const img = imagesRef.current[targetIndex];

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
          <div ref={sign1Ref} className="absolute inset-0 flex items-center justify-start w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <a 
              href="#management-login"
              onClick={(e) => {
                e.preventDefault();
                setMgmtModalOpen(true);
              }}
              className="max-w-[340px] w-full bg-[#080914]/90 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(59,130,246,0.2)] pointer-events-auto cursor-pointer block no-underline transition-all duration-300 hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">🏢</div>
                <span className="text-[7px] tracking-[0.2em] font-extrabold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20 uppercase">
                  ✦ Strategic Excellence
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-1 tracking-tight leading-none">
                Management <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">Field</span>
              </h3>
              <div className="w-6 h-[2px] bg-blue-500 rounded mb-3" />
              
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed font-light mb-4">
                Strategizing for the future, optimizing processes, and leading the way towards comprehensive digital transformation.
              </p>

              {/* Centered 3D isometric Illustration */}
              <div className="relative flex flex-col items-center justify-center w-full min-h-[140px] mb-4 select-none">
                <div className="absolute w-36 h-36 rounded-full bg-blue-500/10 blur-2xl pointer-events-none" />
                <img 
                  src="/way/image/management.webp" 
                  alt="Management illustration"
                  className="w-full h-auto object-contain max-h-[140px] drop-shadow-[0_8px_20px_rgba(59,130,246,0.25)]" 
                />
                {/* Floating Translucent Glass Badge */}
                <div className="absolute bottom-0 right-0 bg-[#0c0e20]/90 backdrop-blur-md border border-white/10 rounded-lg p-1.5 text-left shadow-xl max-w-[120px] z-20">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[8px]">👥</span>
                    <span className="text-[7px] font-bold text-white uppercase tracking-wider">Unified Leadership</span>
                  </div>
                  <p className="text-[7px] text-white/50 leading-normal font-light">
                    Empowering teams and building excellence.
                  </p>
                </div>
              </div>

              {/* Portal access button */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-4 py-2 rounded-lg text-white text-[9px] font-semibold flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-300 mb-4">
                <span>Access Portal</span>
                <span className="text-[9px]">→</span>
              </div>

              {/* Bottom features list vertically stacked */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-left relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] flex items-center justify-center text-purple-400 text-[8px]">🎯</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Strategic Planning</h4>
                    <p className="text-white/40 text-[6px] font-light">Future-ready strategies</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-blue-500/10 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)] flex items-center justify-center text-blue-400 text-[8px]">📈</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Process Optimization</h4>
                    <p className="text-white/40 text-[6px] font-light">Smarter workflows</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.1)] flex items-center justify-center text-orange-400 text-[8px]">🚀</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Digital Transformation</h4>
                    <p className="text-white/40 text-[6px] font-light">Driving meaningful change</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Sign 2: Marketing (Right) */}
          <div ref={sign2Ref} className="absolute inset-0 flex items-center justify-end w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <div 
              className="max-w-[340px] w-full bg-[#080914]/90 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(249,115,22,0.2)] pointer-events-auto block no-underline transition-all duration-300 hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">📢</div>
                <span className="text-[7px] tracking-[0.2em] font-extrabold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/20 uppercase">
                  ✦ Global Outreach
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-1 tracking-tight leading-none">
                Marketing <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-orange-500 bg-clip-text text-transparent">Field</span>
              </h3>
              <div className="w-6 h-[2px] bg-orange-500 rounded mb-3" />
              
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed font-light mb-4">
                Crafting compelling narratives, engaging audiences, and driving growth through data-backed market intelligence.
              </p>

              {/* Centered 3D isometric Illustration */}
              <div className="relative flex flex-col items-center justify-center w-full min-h-[140px] mb-4 select-none">
                <div className="absolute w-36 h-36 rounded-full bg-orange-500/10 blur-2xl pointer-events-none" />
                <img 
                  src="/way/image/marketing.webp" 
                  alt="Marketing illustration"
                  className="w-full h-auto object-contain max-h-[140px] drop-shadow-[0_8px_20px_rgba(249,115,22,0.25)]" 
                />
                {/* Floating Translucent Glass Badge */}
                <div className="absolute bottom-0 right-0 bg-[#0c0e20]/90 backdrop-blur-md border border-white/10 rounded-lg p-1.5 text-left shadow-xl max-w-[120px] z-20">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[8px]">📢</span>
                    <span className="text-[7px] font-bold text-white uppercase tracking-wider">Brand Resonance</span>
                  </div>
                  <p className="text-[7px] text-white/50 leading-normal font-light">
                    Connecting audiences and scaling impact globally.
                  </p>
                </div>
              </div>

              {/* Insights button */}
              <div className="bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-500 hover:to-pink-500 px-4 py-2 rounded-lg text-white text-[9px] font-semibold flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all duration-300 mb-4">
                <span>Explore Insights</span>
                <span className="text-[9px]">→</span>
              </div>

              {/* Bottom features list vertically stacked */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-left relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)] flex items-center justify-center text-orange-400 text-[8px]">📊</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Market Intelligence</h4>
                    <p className="text-white/40 text-[6px] font-light">Data-backed insights</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)] flex items-center justify-center text-orange-400 text-[8px]">📢</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Campaign Strategy</h4>
                    <p className="text-white/40 text-[6px] font-light">Engaging stories & reach</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-orange-500/10 border border-orange-500/20 shadow-[0_0_10px_rgba(249,115,22,0.15)] flex items-center justify-center text-orange-400 text-[8px]">🚀</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Growth Optimization</h4>
                    <p className="text-white/40 text-[6px] font-light">Maximizing conversions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sign 3: Technical (Left) */}
          <div ref={sign3Ref} className="absolute inset-0 flex items-center justify-start w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <a 
              href="#technical-login"
              onClick={(e) => {
                e.preventDefault();
                setTechModalOpen(true);
              }}
              className="max-w-[340px] w-full bg-[#080914]/90 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(16,185,129,0.2)] pointer-events-auto cursor-pointer block no-underline transition-all duration-300 hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">💻</div>
                <span className="text-[7px] tracking-[0.2em] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 uppercase">
                  ✦ Architectural Excellence
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-1 tracking-tight leading-none">
                Technical <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-emerald-500 bg-clip-text text-transparent">Field</span>
              </h3>
              <div className="w-6 h-[2px] bg-emerald-500 rounded mb-3" />
              
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed font-light mb-4">
                Building robust architectures, engineering innovative solutions, and pushing the boundaries of modern technology.
              </p>

              {/* Centered 3D isometric Illustration */}
              <div className="relative flex flex-col items-center justify-center w-full min-h-[140px] mb-4 select-none">
                <div className="absolute w-36 h-36 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none" />
                <img 
                  src="/way/image/technical.webp" 
                  alt="Technical illustration"
                  className="w-full h-auto object-contain max-h-[140px] drop-shadow-[0_8px_20px_rgba(16,185,129,0.25)]" 
                />
                {/* Floating Translucent Glass Badge */}
                <div className="absolute bottom-0 right-0 bg-[#0c0e20]/90 backdrop-blur-md border border-white/10 rounded-lg p-1.5 text-left shadow-xl max-w-[120px] z-20">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[8px]">🔧</span>
                    <span className="text-[7px] font-bold text-white uppercase tracking-wider">Engineering Power</span>
                  </div>
                  <p className="text-[7px] text-white/50 leading-normal font-light">
                    Designing high-performance backend systems & infrastructure.
                  </p>
                </div>
              </div>

              {/* Access Portal button */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-4 py-2 rounded-lg text-white text-[9px] font-semibold flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all duration-300 mb-4">
                <span>Access Portal</span>
                <span className="text-[9px]">→</span>
              </div>

              {/* Bottom features list vertically stacked */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-left relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center justify-center text-emerald-400 text-[8px]">🛠️</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Software Engineering</h4>
                    <p className="text-white/40 text-[6px] font-light">Scalable architectures</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center justify-center text-emerald-400 text-[8px]">💡</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">R&D Innovation</h4>
                    <p className="text-white/40 text-[6px] font-light">Pioneering solutions</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.15)] flex items-center justify-center text-emerald-400 text-[8px]">🛡️</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Infrastructure Scaling</h4>
                    <p className="text-white/40 text-[6px] font-light">High availability & security</p>
                  </div>
                </div>
              </div>
            </a>
          </div>

          {/* Sign 4: Financial (Right) */}
          <div ref={sign4Ref} className="absolute inset-0 flex items-center justify-end w-full px-4 md:px-24 opacity-0 pointer-events-none">
            <div 
              className="max-w-[340px] w-full bg-[#080914]/90 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 shadow-[0_8px_32px_0_rgba(245,158,11,0.2)] pointer-events-auto block no-underline transition-all duration-300 hover:scale-[1.02] text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center text-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">💰</div>
                <span className="text-[7px] tracking-[0.2em] font-extrabold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 uppercase">
                  ✦ Fiscal Stability
                </span>
              </div>
              
              <h3 className="text-xl font-extrabold text-white mb-1 tracking-tight leading-none">
                Financial <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 bg-clip-text text-transparent">Field</span>
              </h3>
              <div className="w-6 h-[2px] bg-amber-500 rounded mb-3" />
              
              <p className="text-white/70 text-[10px] md:text-xs leading-relaxed font-light mb-4">
                Ensuring sustainable growth, managing resources efficiently, and securing long-term economic stability.
              </p>

              {/* Centered 3D isometric Illustration */}
              <div className="relative flex flex-col items-center justify-center w-full min-h-[140px] mb-4 select-none">
                <div className="absolute w-36 h-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />
                <img 
                  src="/way/image/financial.webp" 
                  alt="Financial illustration"
                  className="w-full h-auto object-contain max-h-[140px] drop-shadow-[0_8px_20px_rgba(245,158,11,0.25)]" 
                />
                {/* Floating Translucent Glass Badge */}
                <div className="absolute bottom-0 right-0 bg-[#0c0e20]/90 backdrop-blur-md border border-white/10 rounded-lg p-1.5 text-left shadow-xl max-w-[120px] z-20">
                  <div className="flex items-center gap-1 mb-0.5">
                    <span className="text-[8px]">📊</span>
                    <span className="text-[7px] font-bold text-white uppercase tracking-wider">Asset Management</span>
                  </div>
                  <p className="text-[7px] text-white/50 leading-normal font-light">
                    Ensuring long-term growth and capital efficiency.
                  </p>
                </div>
              </div>

              {/* View statements button */}
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 px-4 py-2 rounded-lg text-white text-[9px] font-semibold flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all duration-300 mb-4">
                <span>View Statements</span>
                <span className="text-[9px]">→</span>
              </div>

              {/* Bottom features list vertically stacked */}
              <div className="border-t border-white/10 pt-3 flex flex-col gap-2 text-left relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center justify-center text-amber-400 text-[8px]">💼</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Resource Allocation</h4>
                    <p className="text-white/40 text-[6px] font-light">Smart capital management</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-amber-500/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center justify-center text-amber-400 text-[8px]">🛡️</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Risk Management</h4>
                    <p className="text-white/40 text-[6px] font-light">Protecting assets & value</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 border-t border-white/5 pt-2">
                  <div className="w-5 h-5 rounded-full bg-[#f59e0b]/10 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.15)] flex items-center justify-center text-amber-400 text-[8px]">🪙</div>
                  <div>
                    <h4 className="text-white text-[9px] font-semibold leading-none">Financial Growth</h4>
                    <p className="text-white/40 text-[6px] font-light">Sustainable scaling</p>
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
