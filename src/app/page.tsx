"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bluetooth, User, CheckCircle, Sparkles, Send, Zap, X, Trophy, ShoppingCart } from 'lucide-react';

export default function PolaroidUltimateROIPitch() {
  const [step, setStep] = useState(0); 
  const [showNudge, setShowNudge] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [videoTime, setVideoTime] = useState(0);
  const [photoCount, setPhotoCount] = useState(0);
  const [showApertureNudge, setShowApertureNudge] = useState(false);
  const [manualModeActive, setManualModeActive] = useState(false);
  const [showFilmNudge, setShowFilmNudge] = useState(false);
  const [clv, setClv] = useState(0.00); 
  const [lastOrderValue, setLastOrderValue] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  
  // States for dynamic ROI attributes
  const [totalFilms, setTotalFilms] = useState(6);
  const [lastPurchaseDate, setLastPurchaseDate] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const eventEndRef = useRef<HTMLDivElement>(null);

  // Calculate 160 days ago
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() - 160);
    setLastPurchaseDate(date.toLocaleDateString('en-GB'));
  }, []);

  const addEvent = (payload: any) => {
    setEvents(prev => [...prev, { ...payload, timestamp: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => {
    eventEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [events]);

  const triggerConnect = () => {
    setStep(1);
    addEvent({ tealium_event: "device_connect", model: "now_plus", status: "success" });
    setTimeout(() => {
      setStep(3);
      setClv(480.92); 
      addEvent({ tealium_event: "visitor_identity_resolved", uid: "u_123456", clv: 480.92 });
      setShowNudge(true);
    }, 1500);
  };

  const handleAcceptTutorial = () => {
    setShowNudge(false);
    setIsPlayingVideo(true);
    setStep(4);
    addEvent({ tealium_event: "video_play", video_name: "Now+ Creative Tips" });
  };

  const handleVideoEnd = () => {
    setIsPlayingVideo(false);
    setStep(5);
    setTimeout(() => { setStep(6); setPhotoCount(5); addEvent({ tealium_event: "photo_taken", count: 5 }); }, 2000);
    setTimeout(() => { setPhotoCount(6); addEvent({ tealium_event: "photo_taken", count: 6 }); }, 4500);
    setTimeout(() => { setShowApertureNudge(true); }, 7000);
  };

  const handleActivateManual = () => {
    setShowApertureNudge(false);
    setManualModeActive(true);
    addEvent({ tealium_event: "feature_activated", feature: "manual_mode" });
    setTimeout(() => {
      addEvent({ tealium_event: "audience_joined", audience: "Film Replenishment" });
      setShowFilmNudge(true);
    }, 2500);
  };

  const handleOrderFilm = () => {
    setShowFilmNudge(false);
    setOrderComplete(true);
    setLastOrderValue(47.99);
    setClv(528.91); 
    setTotalFilms(7);
    setLastPurchaseDate(new Date().toLocaleDateString('en-GB'));
    addEvent({ tealium_event: "purchase", amount: 47.99, currency: "GBP", item: "i-Type Film Bundle" });
  };

  useEffect(() => {
    if (isPlayingVideo && videoRef.current) {
      const interval = setInterval(() => {
        const curr = Math.floor(videoRef.current?.currentTime || 0);
        if (curr > videoTime) {
            setVideoTime(curr);
            if (curr === 31) addEvent({ tealium_event: "video_milestone", label: "Aperture Priority" });
            if (curr === 45) addEvent({ tealium_event: "video_milestone", label: "Double Exposure" });
            if (curr === 67) addEvent({ tealium_event: "video_milestone", label: "Light Painting" });
            if (curr === 80) addEvent({ tealium_event: "video_milestone", label: "Tripod Mode" });
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlayingVideo, videoTime]);

  return (
    <main className="fixed inset-0 bg-[#051838] text-white p-4 font-sans flex flex-col overflow-hidden text-left">
      <header className="w-full max-w-7xl mx-auto mb-6 shrink-0 border-b border-[#68D8D5]/30">
        <h1 className="text-xl font-black italic tracking-tighter text-[#68D8D5] pb-2 text-left">
          Tealium + Polaroid : Capturing MORE Memorable Moments through real-time data orchestration
        </h1>
      </header>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* PANE 1: IPHONE */}
        <div className="flex flex-col h-full min-h-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 italic tracking-tighter text-left">1. Device Experience</h2>
          <div className="relative flex-1 bg-black rounded-[2.8rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden shadow-cyan-900/20 text-center">
            <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${step >= 6 ? '/NowPlus-Home-Screen.jpg' : '/app-bg.jpg'})`, opacity: isPlayingVideo ? 0 : 1 }} />
            {isPlayingVideo && (
              <video 
                ref={videoRef} 
                onEnded={handleVideoEnd} 
                autoPlay 
                className="absolute inset-0 w-full h-full object-cover z-20" 
                src="https://www.dropbox.com/scl/fi/csfmr73hwhutkxpdzxyju/NowPlus-video.MP4?rlkey=y7g4jz37z214xamyuhp84acmc&st=2wmh33ef&dl=1" 
              />
            )}
            
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-5 border-t z-10">
              {step === 0 ? (
                <motion.button 
                  onClick={triggerConnect} 
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-full py-3 bg-[#68D8D5] text-[#051838] rounded-xl font-black uppercase text-xs tracking-widest shadow-lg"
                >
                  Connect Now+
                </motion.button>
              ) : (
                <div className="text-black text-center font-black text-[10px] uppercase italic flex justify-center items-center gap-2">
                  <Zap size={14} className="text-[#68D8D5] fill-[#68D8D5]"/> Identity Secured
                </div>
              )}
            </div>

            <AnimatePresence>
              {showNudge && (
                <motion.div initial={{ y: -50 }} animate={{ y: 25 }} className="absolute top-12 left-4 right-4 bg-[#051838] text-white p-5 rounded-2xl border-l-4 border-[#68D8D5] z-50 shadow-2xl">
                   <p className="font-bold text-sm italic uppercase tracking-tighter text-[#68D8D5] text-left">Master Your Now+</p>
                   <p className="text-[11px] text-slate-200 mt-2 mb-4 leading-relaxed text-left font-medium">Master Expert creative techniques with our Tutorial.</p>
                   <button onClick={handleAcceptTutorial} className="w-full py-2.5 bg-[#68D8D5] text-[#051838] text-[11px] font-black rounded-lg uppercase shadow-lg">Watch Tutorial</button>
                </motion.div>
              )}
              {showApertureNudge && (
                <motion.div initial={{ y: 50 }} animate={{ y: -110 }} className="absolute bottom-16 left-4 right-4 bg-[#051838] text-white p-6 rounded-2xl border-t-4 border-[#68D8D5] z-50 shadow-2xl">
                   <p className="font-bold text-sm italic uppercase tracking-tighter text-[#68D8D5] text-left">Evening Capture Detected</p>
                   <p className="text-[11px] text-slate-200 mt-2 italic leading-relaxed text-left">Your film is nearly finished. Use Manual Mode aperture for better control.</p>
                   <button onClick={handleActivateManual} className="w-full mt-4 py-3 bg-[#68D8D5] text-[#051838] text-[11px] font-black rounded-lg uppercase shadow-xl">Activate Manual Mode</button>
                </motion.div>
              )}
              {showFilmNudge && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-1/2 left-4 right-4 -translate-y-1/2 bg-white text-black p-6 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[60] border-2 border-black">
                   <Trophy className="mx-auto mb-2 text-[#68D8D5]" size={32} />
                   <p className="font-black text-sm uppercase italic text-center">Creative Flow Active</p>
                   <p className="text-[11px] text-slate-600 mt-2 mb-4 font-medium leading-snug text-center">Keep the creative juices flowing. You're down to your last shot.</p>
                   <button onClick={handleOrderFilm} className="w-full py-3 bg-[#68D8D5] text-[#051838] text-[11px] font-black rounded-lg uppercase flex items-center justify-center gap-2 shadow-xl">
                     <ShoppingCart size={14} /> Order New Film Now
                   </button>
                </motion.div>
              )}
              {orderComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[70] bg-[#68D8D5] flex flex-col items-center justify-center p-8 text-[#051838]">
                  <CheckCircle size={80} className="mb-4" />
                  <p className="text-2xl font-black uppercase italic tracking-tighter text-center">Order Success</p>
                  <p className="text-xs font-bold mt-2 text-center">Film Bundle Sent to demotealium@gmail.com</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* PANE 2: EVENTSTREAM */}
        <div className="flex flex-col h-full min-h-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 italic tracking-tighter text-left">2. Tealium EventStream</h2>
          <div className="flex-1 bg-[#030d1f] rounded-xl border border-slate-700 p-4 font-mono text-[10px] overflow-y-auto scrollbar-thin text-left">
            {events.length === 0 && <div className="h-full flex items-center justify-center text-slate-700 italic">Listening for user handshake...</div>}
            {events.map((ev, i) => (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} key={i} className={`mb-4 p-3 rounded border transition-colors duration-500 ${i === events.length - 1 ? 'border-[#68D8D5] bg-blue-500/10' : 'border-slate-800 opacity-30'}`}>
                <p className={`${i === events.length - 1 ? 'text-[#68D8D5]' : 'text-slate-500'} font-bold mb-1 uppercase tracking-tighter`}>[{ev.timestamp}] Event Streamed</p>
                <pre className="text-slate-300 whitespace-pre-wrap leading-tight text-left">{JSON.stringify(ev, null, 2)}</pre>
              </motion.div>
            ))}
            <div ref={eventEndRef} />
          </div>
        </div>

        {/* PANE 3: CDP */}
        <div className="flex flex-col h-full min-h-0 text-left">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2 italic tracking-tighter text-left">3. Tealium AudienceStream</h2>
          <div className="flex-1 bg-white rounded-xl text-slate-900 flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-[#68D8D5] p-4 flex justify-between items-center border-b border-black/10 shrink-0">
               <div className="flex items-center gap-2">
                 <div className="bg-[#051838] p-1.5 rounded text-white shadow-lg"><User size={16}/></div>
                 <h3 className="font-black uppercase tracking-tight italic text-sm">Unified Profile</h3>
               </div>
               {step >= 3 && <div className="text-[8px] font-black px-2 py-1 bg-[#051838] text-white rounded">ID: u_123456</div>}
            </div>

            <div className="p-4 space-y-4 text-[10px] overflow-y-auto scrollbar-thin">
              <section>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-left">ROI & Financials</p>
                <div className="space-y-1">
                  <div className="flex justify-between items-center py-1 border-b border-slate-50">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Customer Lifetime Value</span>
                    <span className={`font-black tracking-tight transition-all duration-700 ${orderComplete ? 'text-2xl text-green-600' : 'text-[11px] text-[#051838]'}`}>
                      £{clv.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Last Order Value</span>
                    <span className={`font-black tracking-tight transition-all duration-700 ${orderComplete ? 'text-2xl text-green-600' : 'text-[11px] text-slate-400'}`}>
                      {lastOrderValue > 0 ? `£${lastOrderValue.toFixed(2)}` : "£0.00"}
                    </span>
                  </div>
                </div>
              </section>

              <section>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-left">Attributes</p>
                <div className="space-y-1">
                  <Attribute label="Last Film Purchased" value={step >= 3 ? "Colour I-Type" : "---"} />
                  <Attribute label="Last Film Purchase Date" value={step >= 3 ? lastPurchaseDate : "---"} />
                  <Attribute label="Total No. Films Purchased" value={step >= 3 ? totalFilms.toString() : "---"} />
                  <Attribute label="Email" value={step >= 3 ? "demotealium@gmail.com" : "---"} />
                  <Attribute label="Cameras Owned" value={step >= 3 ? "Flip, Now+" : "---"} />
                </div>
              </section>

              <section>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-left">Badges</p>
                <div className="grid grid-cols-2 gap-1.5 text-left">
                  <Badge label="Film Subscriber" on={false} customColor="text-slate-400 bg-slate-50 border-slate-100" />
                  <Badge label="Aperture Priority" on={videoTime >= 31} />
                  <Badge label="Double Exposure" on={videoTime >= 45} />
                  <Badge label="Light Painting" on={videoTime >= 67} />
                  <Badge label="Tripod Mode" on={videoTime >= 80} />
                  <Badge label="Manual Mode" on={manualModeActive} />
                  <Badge label="Expert Feature" on={step >= 4} />
                </div>
              </section>

              <section>
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-left text-left">Audiences</p>
                <div className="space-y-1.5 text-left text-left">
                  <div className={`p-2 rounded font-black uppercase text-[8px] border transition-all ${step >= 3 ? 'bg-[#007CC2] text-white border-[#006699]' : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'}`}>New Owner - Auto Only</div>
                  <div className={`p-2 rounded font-black uppercase text-[8px] border transition-all ${showFilmNudge || orderComplete ? 'bg-[#007CC2] text-white border-[#006699]' : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'}`}>Film Replenishment Needed</div>
                </div>
              </section>

              <section className="pb-2">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b border-slate-100 pb-1 text-left text-left">Activations</p>
                <div className="space-y-1.5 text-left text-left">
                  {step >= 3 && <div className="p-2 bg-slate-900 text-white rounded font-bold text-[8px] flex items-center justify-between"><span className="flex items-center gap-2 text-left"><Send size={10} className="text-[#68D8D5]"/> Push: Manual Onboarding</span><CheckCircle size={10} className="text-green-500"/></div>}
                  {manualModeActive && <div className="p-2 bg-slate-900 text-white rounded font-bold text-[8px] flex items-center justify-between border-l-2 border-[#68D8D5]"><span className="flex items-center gap-2 text-left"><Zap size={10} className="text-[#68D8D5]"/> Push: Night Mode Manual</span><span className="text-green-500 font-black">ACTIVE</span></div>}
                  {(showFilmNudge || orderComplete) && <div className="p-2 bg-[#051838] text-white rounded font-bold text-[8px] flex items-center justify-between border-l-2 border-[#68D8D5] shadow-lg shadow-black/30"><span className="flex items-center gap-2 text-left"><Trophy size={10} className="text-[#68D8D5]"/> Push: Film Replenishment</span><span className="text-[#68D8D5] animate-pulse">SENT</span></div>}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Attribute({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-0.5 border-b border-slate-50 text-left">
      <span className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter text-left">{label}</span>
      <span className="text-[9px] font-black tracking-tight text-right text-slate-800">{value}</span>
    </div>
  );
}

function Badge({ label, on, customColor }: { label: string, on?: boolean, customColor?: string }) {
  return (
    <div className={`p-1.5 rounded border text-[6px] font-black uppercase flex items-center gap-1.5 transition-all duration-700 ${on ? 'bg-green-100 border-green-400 text-green-800 shadow-md' : (customColor || 'bg-slate-50 border-slate-200 text-slate-500 opacity-80')}`}>
      <CheckCircle size={8} className={on ? 'text-green-600' : 'text-slate-300'} /> {label}
    </div>
  );
}