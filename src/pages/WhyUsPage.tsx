import React, { useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Award,
  Sparkles,
  HeartHandshake,
  ShieldCheck,
  Receipt,
  PhoneCall,
  Check,
  X,
  Star,
  Quote,
  ArrowRight
} from "lucide-react";
import { Header } from "../components/common/Header";

export const WhyUsPage: React.FC = () => {
  // Before / After Slider state (0 to 100 percentage)
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(clampedPercent);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const features = [
    {
      icon: Award,
      title: "Top Specialists",
      desc: "Board-certified dentists & orthodontists with 12+ years clinical experience.",
      tag: "Certified"
    },
    {
      icon: Sparkles,
      title: "3D Oral Tech",
      desc: "Precision 3D digital scanners, AI smile preview & guided stereotaxy.",
      tag: "Digital"
    },
    {
      icon: HeartHandshake,
      title: "100% Painless",
      desc: "Soft-tissue laser dentistry and needleless computerized local micro-anesthesia.",
      tag: "Gentle"
    },
    {
      icon: ShieldCheck,
      title: "Hospital Grade",
      desc: "Strict 7-stage autoclaving and negative-pressure sterile suites.",
      tag: "Clean"
    },
    {
      icon: Receipt,
      title: "Clear Pricing",
      desc: "Zero hidden costs, itemized quotes before treatment, and 0% EMI financing.",
      tag: "Fair"
    },
    {
      icon: PhoneCall,
      title: "24/7 On-Call",
      desc: "Instant urgent response team available around the clock for dental emergencies.",
      tag: "Support"
    }
  ];

  const comparisons = [
    {
      title: "3D Digital Smile Simulation",
      subtitle: "Preview your transformed smile before treatment starts",
      smilecare: true,
      others: false
    },
    {
      title: "100% Painless Laser Protocols",
      subtitle: "No noisy vibrating drills for soft tissue treatments",
      smilecare: true,
      others: false
    },
    {
      title: "Itemized Transparent Quotes",
      subtitle: "Clear pricing guaranteed with 0% interest EMI options",
      smilecare: true,
      others: false
    },
    {
      title: "Hospital-Grade Class-B Sterilization",
      subtitle: "7-step protocol with single-use sterile instrumentation",
      smilecare: true,
      others: false
    },
    {
      title: "24/7 Emergency Line & Weekend Care",
      subtitle: "Instant phone dispatch and Sunday on-duty dentist",
      smilecare: true,
      others: false
    }
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Intro Banner */}
        <section className="text-center max-w-2xl mx-auto pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Why Patients Trust SmileCare</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            Excellence in Every Smile
          </h1>
          <p className="text-xs sm:text-sm text-tertiary leading-relaxed">
            Pioneering gentle dentistry with advanced 3D scanning, certified university specialists, and absolute care transparency.
          </p>
        </section>

        {/* 6 Feature Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl p-5 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_12px_28px_rgba(31,168,160,0.14)] hover:-translate-y-1 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 text-primary flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-surface-container text-primary">
                      {feat.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-tertiary leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-container/60 flex items-center gap-1.5 text-xs text-primary font-semibold">
                  <Check className="w-3.5 h-3.5" />
                  <span>Standard at SmileCare</span>
                </div>
              </div>
            );
          })}
        </section>

        {/* Before / After Interactive Drag Slider */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.1)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                Clinical Results
              </span>
              <h2 className="text-lg sm:text-2xl font-bold text-on-surface">
                Clear Aligners & Laser Whitening Transformation
              </h2>
            </div>
            <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-xs font-bold text-amber-700">5.0 Verified Result</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-tertiary">
            Drag the central slider handle left and right to inspect the smile realignment and stain reduction.
          </p>

          {/* Slider Canvas */}
          <div
            ref={containerRef}
            onMouseDown={() => {
              isDragging.current = true;
            }}
            onMouseUp={() => {
              isDragging.current = false;
            }}
            onMouseLeave={() => {
              isDragging.current = false;
            }}
            onMouseMove={handleMouseMove}
            onTouchStart={() => {
              isDragging.current = true;
            }}
            onTouchEnd={() => {
              isDragging.current = false;
            }}
            onTouchMove={handleTouchMove}
            className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden select-none cursor-ew-resize border border-surface-container shadow-inner"
          >
            {/* After Image (Background) */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJLL53Vt43l_EqeYQyfzfgUf_jw7AVz1NCTeRjpyR0WUwxy50ir5Sj1y-HoCtLYKYyxZMmQcwPsqQhawMF0lu_TjmgyzTNuUjsPv-fg1EzcawY7lH5ARnqp4nPOWfC3l_zTTxOZR-Dm2DpLawrlV-XLWGhhMwAjUzyv8sUdUAaVq4p7D1v5pcBC8RDsiq6YhuRUWKd1NVFt36ZlYJsoWoqOgtlPqcQrYRQk5cUsaguy0NvVH8QVpjTNw"
              alt="After smile transformation"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Before Image (Clipped Left side) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmqy3ZtJfBMRnv9cd2jhvcHLq8p16jTwplDpIJLgYiysdnKOM6K10P3Zpg2_owyjRaBoQJ9QCw48P5bZSMdrE2Bj2W301D76z6ZdkBAE_iARTLfi-lqda5rPOmC5wC6lu7hFrpDy1YxpymSAm7crtvLM9K2tduuxMYcn5F9xZBuSKnvuNCpTcoL_24J7nZROH4UYmCoafFt62T9fmQqCh6dxTogrrNFIRpCMFNeHXkwS53ePQiMRLJqw"
                alt="Before smile transformation"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}
              />
            </div>

            {/* Badges */}
            <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold shadow-md">
              Before: Day 0
            </div>
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-white text-xs font-bold shadow-md">
              After: Day 28
            </div>

            {/* Central Divider Bar with Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)] flex items-center justify-center -translate-x-1/2 pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="w-9 h-9 rounded-full bg-white shadow-xl flex items-center justify-center text-primary border border-primary/20 pointer-events-auto cursor-ew-resize">
                <span className="material-symbols-outlined text-[18px]">code</span>
              </div>
            </div>
          </div>

          {/* Patient Quote snippet */}
          <div className="p-4 rounded-2xl bg-surface-container-low/70 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-primary">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-on-surface italic leading-relaxed">
                “Completely painless, and my confidence is through the roof! The 3D scan made seeing the projected final result so reassuring before we even touched my teeth.”
              </p>
              <span className="block text-xs font-bold text-primary mt-1">
                Sarah M. — Clear Aligners & Laser Whitening
              </span>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.08)] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg sm:text-2xl font-bold text-on-surface">
              SmileCare vs. Traditional Dental Clinics
            </h2>
            <p className="text-xs sm:text-sm text-tertiary">
              See how our digital-first, patient-centric protocols compare
            </p>
          </div>

          <div className="w-full space-y-2.5">
            {/* Table Header */}
            <div className="grid grid-cols-12 pb-2 px-3 text-tertiary text-xs font-bold uppercase tracking-wider">
              <span className="col-span-6 sm:col-span-7">Treatment Standard</span>
              <span className="col-span-3 sm:col-span-3 text-center text-primary font-extrabold">
                SmileCare
              </span>
              <span className="col-span-3 sm:col-span-2 text-center text-gray-400">
                Traditional
              </span>
            </div>

            {comparisons.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 items-center p-3.5 rounded-2xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors"
              >
                <div className="col-span-6 sm:col-span-7 pr-2">
                  <h4 className="text-xs sm:text-sm font-bold text-on-surface">
                    {row.title}
                  </h4>
                  <p className="text-[11px] text-tertiary hidden sm:block mt-0.5">
                    {row.subtitle}
                  </p>
                </div>

                <div className="col-span-3 sm:col-span-3 flex justify-center">
                  <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-white shadow-sm">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                </div>

                <div className="col-span-3 sm:col-span-2 flex justify-center text-gray-400">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary-mint to-primary-container text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold">Experience the SmileCare Difference</h3>
            <p className="text-xs sm:text-sm text-teal-100">
              Get an interactive 3D scan and tailored smile blueprint with zero commitment.
            </p>
          </div>
          <Link
            to="/book"
            className="px-6 py-3.5 rounded-full bg-white text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-teal-50 active:scale-95 transition-all whitespace-nowrap"
          >
            Book Free Consultation
          </Link>
        </section>
      </main>
    </div>
  );
};
