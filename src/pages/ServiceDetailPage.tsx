import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Award,
  Check,
  Heart,
  Share2,
  ArrowRight,
  ShieldCheck,
  Info
} from "lucide-react";
import { Header } from "../components/common/Header";
import { SERVICES_DATA } from "../data/services";
import { useApp } from "../context/AppContext";

export const ServiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, showToast } = useApp();

  const service = SERVICES_DATA.find((s) => s.id === id) || SERVICES_DATA[0];
  const favorited = isFavorite(service.id);

  // Other treatments
  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `${service.title} - SmileCare Dental`,
        text: `Check out ${service.title} at SmileCare!`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast("Treatment link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header showBack pageTitle={service.title} />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-36 space-y-6 sm:space-y-8">
        {/* Main Showcase Hero Card */}
        <section className="relative w-full rounded-3xl bg-gradient-to-br from-white/95 to-surface-container-low/80 backdrop-blur-xl shadow-[0_12px_36px_rgba(31,168,160,0.12)] border border-white p-6 sm:p-8 overflow-hidden">
          {/* Top action row */}
          <div className="flex items-center justify-between mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {service.category} Special
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleFavorite(service.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                  favorited ? "bg-red-50 text-red-500" : "bg-white text-primary"
                }`}
                aria-label="Toggle favorite"
              >
                <Heart className={`w-5 h-5 ${favorited ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-white text-primary flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
                aria-label="Share treatment"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Title & 3D Visual */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
            <div className="space-y-2 text-center sm:text-left sm:max-w-md">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] leading-tight">
                {service.title}
              </h1>
              <p className="text-xs sm:text-sm text-tertiary font-medium">
                {service.subtitle}
              </p>
              <div className="pt-2 flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-3xl font-extrabold text-primary">{service.price}</span>
                <span className="text-xs text-tertiary">/ complete session</span>
              </div>
            </div>

            <div className="w-44 h-44 sm:w-52 sm:h-52 relative flex items-center justify-center shrink-0">
              <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-2xl" />
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-contain filter drop-shadow-[0_10px_24px_rgba(31,168,160,0.3)] animate-float-slow"
              />
            </div>
          </div>

          {/* 3 Mini Stats Pillars (Duration, Sessions, Results) */}
          <div className="grid grid-cols-3 gap-3 my-6">
            <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/75 backdrop-blur-sm text-center shadow-sm border border-white">
              <Clock className="w-5 h-5 text-primary mb-1" />
              <span className="text-[11px] text-tertiary">Duration</span>
              <span className="text-sm font-bold text-on-surface mt-0.5">{service.duration}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/75 backdrop-blur-sm text-center shadow-sm border border-white">
              <Calendar className="w-5 h-5 text-primary mb-1" />
              <span className="text-[11px] text-tertiary">Sessions</span>
              <span className="text-sm font-bold text-on-surface mt-0.5">{service.sessions}</span>
            </div>

            <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white/75 backdrop-blur-sm text-center shadow-sm border border-white">
              <Award className="w-5 h-5 text-primary mb-1" />
              <span className="text-[11px] text-tertiary">Results</span>
              <span className="text-sm font-bold text-on-surface mt-0.5">{service.results}</span>
            </div>
          </div>

          {/* About Treatment */}
          <div className="space-y-3 pt-2">
            <h3 className="text-lg font-bold text-on-surface">About Treatment</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              {service.about}
            </p>

            {/* Highlights Checklist */}
            <div className="pt-2 space-y-2.5">
              {service.highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary-container/20 text-primary flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 font-bold" />
                  </div>
                  <span className="text-sm font-semibold text-on-surface">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sterilization & Safety Guarantee */}
          <div className="mt-6 p-4 rounded-2xl bg-secondary-container/20 border border-secondary-container/40 flex items-center gap-3 text-xs text-on-secondary-container">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>
              All equipment undergoes strict Class-B autoclaving & 7-stage sterile packaging prior to each patient visit.
            </span>
          </div>
        </section>

        {/* Other Popular Treatments */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-lg font-bold text-on-surface">Other Treatments You May Need</h3>
            <Link
              to="/services"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {otherServices.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/services/${item.id}`)}
                className="p-3.5 rounded-2xl bg-white/85 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-low p-1.5 flex items-center justify-center shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {item.title}
                  </h4>
                  <div className="text-[11px] text-primary font-bold">{item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Bottom Floating Booking Anchor */}
      <div className="fixed bottom-16 lg:bottom-4 left-4 right-4 max-w-lg mx-auto z-40">
        <div className="flex items-center justify-between p-3 pl-5 rounded-full bg-white/95 backdrop-blur-2xl shadow-[0_12px_36px_rgba(31,168,160,0.25)] border border-white">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-[11px] text-tertiary">
              <span>Starting From</span>
              <span title="Transparent pricing with zero hidden fees">
                <Info className="w-3 h-3 text-tertiary" />
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-on-surface leading-none">
                {service.price}
              </span>
              <span className="text-[11px] text-tertiary">/session</span>
            </div>
          </div>

          <Link
            to={`/book?service=${service.id}`}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-bold shadow-[0_8px_20px_rgba(31,168,160,0.35)] hover:brightness-105 active:scale-95 transition-all"
          >
            <span>Book This Treatment</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
