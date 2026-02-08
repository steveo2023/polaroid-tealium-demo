"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, CheckCircle, Send, Zap, Trophy, ShoppingCart, Target, TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function PolaroidUltimateROIPitch() {
  const [showIntro, setShowIntro] = useState(true); // New State for Intro Overlay
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

  // SEQUENCE TRIGGER 1: Connect
  const triggerConnect = () => {
    setStep(1);
    addEvent({ tealium_event: "device_connect", model: "now_plus", status: "success" });
    setTimeout(() => {
      setStep(3); 
      setClv(480.92); 
      setLastOrderValue(16.99);
      addEvent({ tealium_event: "visitor_identity_resolved", uid: "u_123456", clv: 480.92 });
      setShowNudge(true); 
    }, 1500);
  };

  // SEQUENCE TRIGGER 2: Play Video
  const handleAcceptTutorial = () => {
    setShowNudge(false); 
    setIsPlayingVideo(true); 
    setStep(4);
    addEvent({ tealium_event: "video_play", video_name: "Now+ Creative Tips" });
  };

  // SEQUENCE TRIGGER 3: Video Ends -> Photos -> Evening Nudge
  const handleVideoEnd = () => {
    setIsPlayingVideo(false); 
    setStep(5);
    setTimeout(() => { 
        setStep(6); 
        setPhotoCount(5); 
        addEvent({ tealium_event: "photo_taken", count: 5 }); 
    }, 1000);
    
    setTimeout(() => { 
        setPhotoCount(6); 
        addEvent({ tealium_event: "photo_taken", count: 6 }); 
    }, 3500);

    setTimeout(() => { 
        setShowApertureNudge(true); 
    }, 6000); 
  };

  // SEQUENCE TRIGGER 4: Manual Mode -> Film Nudge
  const handleActivateManual = () => {
    setShowApertureNudge(false); 
    setManualModeActive(true);
    addEvent({ tealium_event: "feature_activated", feature: "manual_mode" });
    setTimeout(() => {
      addEvent({ tealium_event: "audience_joined", audience: "Film Replenishment" });
      setShowFilmNudge(true); 
    }, 2000);
  };

  // SEQUENCE TRIGGER 5: Purchase
  const handleOrderFilm = () => {
    setShowFilmNudge(false); 
    setOrderComplete(true); 
    setLastOrderValue(47.99); 
    setClv(528.91); 
    setTotalFilms(7); 
    setLastFilmDate(new Date().toLocaleDateString('en-GB'));
    addEvent({ tealium_event: "purchase", amount: 47.99, currency: "GBP", item: "i-Type Film Bundle" });
  };

  // Video Progress Tracker for Badges
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
      
      {/* STRATEGIC OVERLAY */}
      <AnimatePresence>
        {showIntro && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, y: -50 }}
            className="fixed inset-0 z-[100] bg-[#051838]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="max-w-3xl w-full border border-[#68D8D5]/30 p-10 rounded-3xl bg-[#051838] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#68D8D5] to-blue-600"></div>
              
              <h1 className="text-4xl font-black italic tracking-tighter text-white mb-6">
                Polaroid's North Star: <span className="text-[#68D8D5]">Capturing Memorable Moments</span>
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light">
                To achieve this, your platform must ingest events, resolve identity, and evaluate the next best action <strong className="text-white font-bold">in real-time.</strong>
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Clock className="text-[#68D8D5] mb-3" size={32} />
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-2">The Urgency</h3>
                  <p className="text-xs text-slate-400">You must seize the moment <em className="text-white">now</em>. Evaluating data an hour later is too late.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <Target className="text-[#68D8D5] mb-3" size={32} />
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-2">The Action</h3>
                  <p className="text-xs text-slate-400">Nudging users to utilize <strong className="text-white">Expert Features</strong> (e.g., Manual Mode) exactly when they need them.</p>
                </div>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <TrendingUp className="text-[#68D8D5] mb-3" size={32} />
                  <h3 className="font-bold text-sm uppercase tracking-widest mb-2">The Result</h3>
                  <p className="text-xs text-slate-400">Driving <strong className="text-white">Film Subscriptions</strong> & Retention, directly increasing Customer Lifetime Value.</p>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowIntro(false)}
                className="group relative px-8 py-4 bg-[#68D8D5] text-[#051838] font-black text-sm uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(104,216,213,0.4)] flex items-center gap-3 mx-auto"
              >
                Continue to Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="w-full max-w-7xl mx-auto mb-2 shrink-0 border-b border-[#68D8D5]/30 text-left">
        <h1 className="text-xl font-black italic tracking-tighter text-[#68D8D5] pb-1">
          Tealium + Polaroid : Capturing MORE Memorable Moments
        </h1>
      </header>

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 text-left">
        {/* PANE 1: IPHONE */}
        <div className="flex flex-col h-full min-h-0">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1 italic">1. Device Experience</h2>
          <div className="relative flex-1 bg-black rounded-[2.5rem] border-[6px] border-slate-800 shadow-2xl overflow-hidden