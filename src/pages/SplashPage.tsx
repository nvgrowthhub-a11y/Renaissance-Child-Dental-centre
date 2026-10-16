import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Star, ShieldCheck, Heart } from "lucide-react";
import { CLINIC_CONFIG } from "../config/clinic";
import { useApp } from "../context/AppContext";

export const SplashPage: React.FC = () => {
  const navigate = useNavigate();
  const { openAuthModal } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Healthy Smile, Happy Life",
      subtitle: "Advanced dental care for you and your family.",
      tag: "Gentle & Painless",
      image: CLINIC_CONFIG.heroTooth3D,
    },
    {
      title: "Certified Dental Specialists",
      subtitle: "Experienced doctors using 3D imaging & modern laser dentistry.",
      tag: "Top Rated Care",
      image: CLINIC_CONFIG.whiteningTooth3D,
    },
    {
      title: "Transparent & Effortless",
      subtitle: "Zero hidden costs, seamless booking, and 24/7 emergency response.",
      tag: "Hospital Grade",
      image: CLINIC_CONFIG.clinicInterior,
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-[#E6F7F6] via-[#f7f9ff] to-[#CFEFEC] flex flex-col justify-between p-4 sm:p-6 lg:p-8 overflow-hidden select-none">
      {/* Ambient Serene Glow & Silhouettes */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-secondary-fixed opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-24 w-96 h-96 rounded-full bg-primary-fixed opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-secondary-container opacity-35 blur-2xl pointer-events-none" />

      {/* Decorative Botanical Leaf Silhouettes */}
      <div className="absolute top-16 -left-6 opacity-25 pointer-events-none text-primary">
        <svg fill="currentColor" height="150" viewBox="0 0 110 150" width="110">
          <path d="M0,75 C20,20 80,10 110,0 C90,45 80,110 0,150 C20,110 25,90 0,75 Z" opacity="0.6" />
          <path d="M5,40 C35,25 75,35 95,20 C70,55 50,90 5,110 Z" opacity="0.4" />
        </svg>
      </div>
      <div className="absolute top-1/2 -right-6 opacity-25 pointer-events-none text-secondary">
        <svg fill="currentColor" height="160" viewBox="0 0 120 160" width="120">
          <path d="M120,40 C90,10 30,30 0,20 C35,65 50,130 120,160 C95,110 90,85 120,40 Z" opacity="0.55" />
          <path d="M110,80 C80,60 50,75 25,65 C55,100 70,130 110,140 Z" opacity="0.35" />
        </svg>
      </div>

      {/* Top Brand Pill Header */}
      <div className="w-full max-w-md mx-auto pt-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-white/90 shadow-md p-1.5 flex items-center justify-center">
            <img
              src={CLINIC_CONFIG.logoUrl}
              alt="SmileCare Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="font-extrabold text-base text-[#011e30] leading-none">
              {CLINIC_CONFIG.name}
            </h2>
            <span className="text-[10px] text-primary font-semibold">
              Dental Excellence
            </span>
          </div>
        </div>

        <button
          onClick={() => navigate("/home")}
          className="text-xs font-bold text-primary hover:text-on-primary-container px-3 py-1.5 rounded-full bg-white/70 hover:bg-white backdrop-blur-md transition-all shadow-sm cursor-pointer"
        >
          Skip Intro →
        </button>
      </div>

      {/* Main Frosted Showcase Panel */}
      <div className="relative w-full max-w-md mx-auto my-auto rounded-[32px] bg-white/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(31,168,160,0.14)] border border-white/90 p-6 sm:p-8 flex flex-col items-center text-center z-10">
        {/* Glow wrapper for tooth icon */}
        <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-white to-surface-container-high/60 shadow-md shadow-primary/10 mb-2">
          <div className="absolute inset-0 rounded-full bg-primary-fixed-dim opacity-40 blur-md" />
          <img
            src={CLINIC_CONFIG.logoUrl}
            alt="SmileCare Brand"
            className="relative w-10 h-10 object-contain"
          />
        </div>

        {/* Centerpiece 3D Animated Illustration */}
        <div className="relative w-full max-w-[260px] h-56 sm:h-64 my-2 flex items-center justify-center">
          {/* Dynamic Ambient Halo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-56 h-56 rounded-full bg-gradient-to-b from-primary-fixed/40 to-transparent blur-xl" />
          </div>

          {/* Elliptical Glowing Orbit Rings */}
          <div className="absolute w-52 h-28 rounded-full border border-primary-fixed-dim/70 -rotate-12 scale-105 pointer-events-none" />
          <div className="absolute w-60 h-32 rounded-full border border-secondary-fixed/50 rotate-6 pointer-events-none" />

          {/* Floating Sparkles */}
          <div className="absolute top-4 left-6 text-primary-container animate-pulse">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="absolute top-10 right-8 text-secondary-fixed-dim animate-bounce">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div className="absolute bottom-8 left-8 text-primary">
            <Heart className="w-4 h-4 fill-primary/30" />
          </div>
          <div className="absolute bottom-12 right-6 text-primary-fixed-dim">
            <ShieldCheck className="w-5 h-5" />
          </div>

          {/* Floating 3D Tooth / Slide Visual */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -15 }}
              transition={{ duration: 0.4 }}
              className="relative w-44 h-44 rounded-full flex items-center justify-center animate-float-slow"
            >
              <img
                src={slides[currentSlide].image}
                alt="SmileCare 3D Dental Visual"
                className="w-40 h-40 object-contain filter drop-shadow-[0_12px_24px_rgba(31,168,160,0.3)] transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dynamic Text Information */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-1 mb-5"
          >
            <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold tracking-wide uppercase mb-1">
              {slides[currentSlide].tag}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011e30] tracking-tight leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-xs mx-auto pt-1 leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={() => navigate("/home")}
            className="w-full group relative flex items-center justify-between px-6 py-4 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white shadow-[0_10px_24px_rgba(31,168,160,0.38)] active:scale-[0.98] hover:shadow-[0_12px_30px_rgba(31,168,160,0.5)] transition-all cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            <span className="font-bold text-base tracking-wide flex-1 text-center pl-7">
              Get Started
            </span>
            <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4 font-bold" />
            </span>
          </button>

          {/* Secondary Sign In Prompt */}
          <div className="flex items-center justify-center gap-1.5 pt-1 text-center">
            <span className="text-xs sm:text-sm text-on-surface-variant">
              Already have an account?
            </span>
            <button
              onClick={openAuthModal}
              className="text-xs sm:text-sm text-primary font-bold hover:text-on-primary-container hover:underline transition-colors cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Pagination Dots (Clickable & Active Pill) */}
        <div className="flex items-center justify-center space-x-2 pt-6 pb-1">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                currentSlide === idx
                  ? "w-7 h-2 bg-primary-container shadow-sm shadow-primary/40"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom Footer Note */}
      <div className="w-full text-center py-2 text-[11px] text-tertiary z-10">
        <span>Certified Dental Health & Orthodontics • Call: 08470077778</span>
      </div>
    </div>
  );
};
