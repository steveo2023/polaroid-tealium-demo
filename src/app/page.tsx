"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CheckCircle, Send, Zap, Trophy, ShoppingCart } from 'lucide-react';

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
  
  const [totalFilms, setTotalFilms] = useState(6);
  const [lastFilmDate, setLastFilmDate] = useState("");
  const [lastCameraDate, setLastCameraDate] = useState("");
  const [firstPurchaseDate, setFirstPurchaseDate] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);
  const eventEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const now = new Date();
    const filmDate = new Date(); filmDate.setDate(now.getDate() - 160);
    setLastFilmDate(filmDate.toLocaleDateString('en-GB'));
    const cameraDate = new Date(); cameraDate.setDate(now.getDate() - 45);
    setLastCameraDate(cameraDate.toLocaleDateString('en-GB'));
    const firstDate = new Date(); firstDate.setDate(now.getDate() - 400);
    setFirstPurchaseDate(firstDate.toLocaleDateString('en-GB'));
  }, []);

  const addEvent = (payload: any) => {
    setEvents(prev => [...prev, { ...payload, timestamp: new Date().toLocaleTimeString() }]);
  };

  useEffect(() => { eventEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [events]);

  const triggerConnect = () => {
    setStep(1);
    addEvent({ tealium_event: "device_connect", model: "now_plus", status: "success" });
    setTimeout(() => {
      setStep(3); setClv(480.92); setLastOrderValue(16.99);
      addEvent({ tealium_event: "visitor_identity_resolved", uid: "u_123456", clv: 480.92 });
      setShowNudge(true);
    }, 1500);
  };

  const handleAcceptTutorial = () => {
    setShowNudge(false); setIsPlayingVideo(true); setStep(4);
    addEvent({ tealium_event: "video_play", video_name: "Now+ Creative Tips" });
  };

  const handleVideoEnd = () => {
    setIsPlayingVideo(false); setStep(5);
    setTimeout(() => { setStep(6); setPhotoCount(5); addEvent({ tealium_event: "photo_taken", count: 5 }); }, 1500);
    setTimeout(() => { setPhotoCount(6); addEvent({ tealium_event: "photo_taken", count: 6 }); }, 4000);
    setTimeout(() => { setShowApertureNudge(true); }, 6500);
  };

  const handleActivateManual = () => {
    setShowApertureNudge(false); setManualModeActive(true);
    addEvent({ tealium_event: "feature_activated", feature: "manual_mode" });
    setTimeout(() => {
      addEvent({ tealium_event: "audience_joined", audience: "Film Replenishment" });
      setShowFilmNudge(true);
    }, 2500);
  };

  const handleOrderFilm = () => {
    setShowFilmNudge(false); setOrderComplete(true); setLastOrderValue(47.99); setClv(528.91); 
    setTotalFilms(7); setLastFilmDate(new Date().toLocaleDateString('en-GB'));
    addEvent({ tealium_event: "purchase", amount: 47.99, currency: "GBP", item: "i-Type Film Bundle" });
  };

  return (
    <main className="fixed inset-0 bg-[#051838] text-white p-4 font-sans flex flex-col overflow-hidden text-left">
      <header className="w-full max-w-7xl mx-auto mb-3 shrink-0 border-b border-[#68D8D5]/30">
        <h1 className="text-2xl font-black italic tracking-tighter text-[#68D8D5] pb-2">
          Tealium + Polaroid : Capturing MORE Memorable Moments
        </h1>
      </header>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        
        {/* PANE 1: IPHONE */}
        <div className="flex flex-col h-full min-h-0">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 italic">1. Device Experience</h2>
          <div className="relative flex-1 bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-top" style={{ backgroundImage: `url(${step >= 6 ? '/NowPlus-Home-Screen.jpg' : '/app-bg.jpg'})`, opacity: isPlayingVideo ? 0 : 1 }} />
            {isPlayingVideo && (
              <video ref={videoRef} onEnded={handleVideoEnd} autoPlay className="absolute inset-0 w-full h-full object-cover z-20" src="https://www.dropbox.com/scl/fi/csfmr73hwhutkxpdzxyju/NowPlus-video.MP4?rlkey=y7g4jz37z214xamyuhp84acmc&st=2wmh33ef&dl=1" />
            )}
            {step === 6 && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/15">
                <motion.span key={photoCount} initial={{ scale: 0.1 }} animate={{ scale: 1 }} className="text-[12rem] font-black text-black leading-none drop-shadow-md">{photoCount}</motion.span>
                <p className="text-black font-black uppercase tracking-[0.25em] text-lg -mt-2 italic">Photos Taken</p>
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-white/95 p-6 border-t z-10">
              {step === 0 ? (
                <motion.button onClick={triggerConnect} className="w-full py-4 bg-[#68D8D5] text-[#051838] rounded-2xl font-black uppercase text-sm tracking-widest shadow-lg">Connect Now+</motion.button>
              ) : (
                <div className="text-black text-center font-black text-xs uppercase italic flex justify-center items-center gap-2"><Zap size={14} className="text-[#68D8D5] fill-[#68D8D5]"/> Identity Secured</div>
              )}
            </div>
            <AnimatePresence>
              {showApertureNudge && (
                <motion.div initial={{ y: 50 }} animate={{ y: -120 }} className="absolute bottom-16 left-4 right-4 bg-[#051838] text-white p-6 rounded-3xl border-t-4 border-[#68D8D5] z-50 shadow-2xl">
                   <p className="font-black text-base italic uppercase tracking-widest text-[#68D8D5] mb-2">EVENING CAPTURE DETECTED</p>
                   <p className="text-sm text-slate-100 font-medium leading-relaxed mb-4 text-left">We&apos;ve detected that your shooting at night. Why not try Manual Mode to get more control over your photos.</p>
                   <button onClick={handleActivateManual} className="w-full py-4 bg-[#68D8D5] text-[#051838] text-sm font-black rounded-xl uppercase shadow-xl tracking-wider">Activate Manual Mode</button>
                </motion.div>
              )}
              {showFilmNudge && (
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="absolute top-1/2 left-4 right-4 -translate-y-1/2 bg-white text-black p-8 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.6)] z-[60] border-2 border-black text-center">
                   <Trophy className="mx-auto mb-3 text-[#68D8D5]" size={40} />
                   <p className="font-black text-lg uppercase italic">Creative Flow Active</p>
                   <p className="text-sm text-slate-600 mt-2 mb-6 font-medium leading-snug text-center">Keep the creative juices flowing. You&apos;re down to your last few shot. Only 2 pictures left on the film.</p>
                   <button onClick={handleOrderFilm} className="w-full py-4 bg-[#68D8D5] text-[#051838] text-sm font-black rounded-xl uppercase flex items-center justify-center gap-2 shadow-xl"><ShoppingCart size={18} /> Order New Film Now</button>
                </motion.div>
              )}
              {orderComplete && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 z-[70] bg-[#68D8D5] flex flex-col items-center justify-center p-8 text-[#051838] text-center">
                  <CheckCircle size={100} className="mb-6" />
                  <p className="text-4xl font-black uppercase italic tracking-tighter mb-4">ORDER SUCCESS</p>
                  <p className="text-lg font-bold italic leading-tight px-6 underline decoration-4 underline-offset-8">Seizing the moment in real-time just resulted in 11% increase in CLV</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* PANE 2: EVENTSTREAM */}
        <div className="flex flex-col h-full min-h-0 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 italic">2. Tealium EventStream</h2>
          <div className="flex-1 bg-[#030d1f] rounded-2xl border border-slate-700 p-4 font-mono text-xs overflow-y-auto scrollbar-thin">
            {events.map((ev, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 rounded-lg border border-slate-800 bg-blue-500/5">
                <p className="text-[#68D8D5] font-bold mb-1 uppercase tracking-tighter">[{ev.timestamp}] Event Streamed</p>
                <pre className="text-slate-300 whitespace-pre-wrap leading-tight">{JSON.stringify(ev, null, 2)}</pre>
              </motion.div>
            ))}
            <div ref={eventEndRef} />
          </div>
        </div>

        {/* PANE 3: CDP - REDESIGNED FOR MAX LEGIBILITY */}
        <div className="flex flex-col h-full min-h-0 text-left">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 italic">3. Tealium AudienceStream</h2>
          <div className="flex-1 bg-white rounded-3xl text-slate-900 flex flex-col shadow-2xl overflow-hidden">
            <div className="bg-[#68D8D5] p-4 flex justify-between items-center border-b border-black/10 shrink-0">
               <div className="flex items-center gap-3 text-[#051838] font-black uppercase italic text-base"><User size={20}/> Unified Profile</div>
               {step >= 3 && <div className="text-xs font-black px-3 py-1 bg-[#051838] text-white rounded-full shadow-lg">ID: u_123456</div>}
            </div>

            <div className="p-4 flex flex-col justify-between h-full">
              {/* ROI & VISITOR ATTRIBUTES */}
              <section className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer Lifetime Value</span>
                    <span className={`font-black transition-all duration-700 ${orderComplete ? 'text-3xl text-green-600' : 'text-xl text-[#051838]'}`}>£{clv.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Last Order Value</span>
                    <span className={`font-black transition-all duration-700 ${orderComplete ? 'text-3xl text-green-600' : 'text-xl text-slate-400'}`}>{lastOrderValue > 0 ? `£${lastOrderValue.toFixed(2)}` : "£0.00"}</span>
                  </div>
                  <Attribute label="First Purchase Date" value={step >= 3 ? firstPurchaseDate : "---"} />
                  <Attribute label="Last Film Purchased" value={step >= 3 ? "Colour I-Type" : "---"} />
                  <Attribute label="Last Film Purchase Date" value={step >= 3 ? lastFilmDate : "---"} />
                  <Attribute label="Total No. Films Purchased" value={step >= 3 ? totalFilms.toString() : "---"} />
                  <Attribute label="Last Camera Purchase" value={step >= 3 ? "Polaroid Now+" : "---"} />
                  <Attribute label="Cameras Owned" value={step >= 3 ? "Flip, Now+" : "---"} />
                  <Attribute label="Email" value={step >= 3 ? "demotealium@gmail.com" : "---"} />
                </div>
              </section>

              {/* BADGES - 2 COLUMN GRID FOR SIZE */}
              <section>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 border-b pb-1">Badges</p>
                <div className="grid grid-cols-2 gap-2">
                  <Badge label="Confirmed User" on={step >= 3} />
                  <Badge label="Confirmed Buyer" on={step >= 3} />
                  <Badge label="Aperture Priority" on={videoTime >= 31} />
                  <Badge label="Double Exposure" on={videoTime >= 45} />
                  <Badge label="Manual Mode" on={manualModeActive} />
                  <Badge label="Expert Feature" on={step >= 4} />
                  <Badge label="Film Subscriber" on={false} />
                  <Badge label="Now+ Lens Filters" on={false} />
                </div>
              </section>

              {/* AUDIENCES & ACTIVATIONS */}
              <div className="grid grid-cols-1 gap-4">
                <section>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Audiences</p>
                  <div className={`p-2 rounded-xl font-black uppercase text-[10px] border shadow-sm ${step >= 3 ? 'bg-[#007CC2] text-white border-[#006699]' : 'bg-slate-50 text-slate-300'}`}>New Owner - Auto Only</div>
                </section>

                <section>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Activations</p>
                  <div className="space-y-2">
                    {step >= 3 && <div className="p-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs flex justify-between border-l-4 border-[#68D8D5] shadow-lg"><span><Send size={14} className="inline mr-2 text-[#68D8D5]"/> Onboarding</span><CheckCircle size={14} className="text-green-500"/></div>}
                    {(showFilmNudge || orderComplete) && <div className="p-2.5 bg-[#051838] text-white rounded-xl font-bold text-xs flex justify-between border-l-4 border-[#68D8D5] shadow-lg"><span><Trophy size={14} className="inline mr-2 text-[#68D8D5]"/> Replenishment</span><span className="text-[#68D8D5] animate-pulse">SENT</span></div>}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Attribute({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex justify-between items-center py-1 border-b border-slate-50 last:border-0">
      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">{label}</span>
      <span className="text-sm font-black text-slate-800">{value}</span>
    </div>
  );
}

function Badge({ label, on }: { label: string, on?: boolean }) {
  return (
    <div className={`p-2 rounded-xl border text-[9px] font-black uppercase flex items-center justify-center text-center shadow-sm transition-all duration-700 ${on ? 'bg-green-100 border-green-400 text-green-800' : 'bg-red-50 border-red-200 text-red-500 opacity-90'}`}>
       {label}
    </div>
  );
}