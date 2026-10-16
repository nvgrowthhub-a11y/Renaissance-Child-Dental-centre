import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { CLINIC_CONFIG } from "../config/clinic";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md rounded-3xl p-8 bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.12)] space-y-4">
        <div className="w-24 h-24 mx-auto relative flex items-center justify-center">
          <img
            src={CLINIC_CONFIG.heroTooth3D}
            alt="SmileCare Tooth"
            className="w-full h-full object-contain filter drop-shadow-md animate-bounce"
          />
        </div>

        <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
          Error 404
        </span>

        <h1 className="text-2xl font-extrabold text-[#011e30]">
          Page Lost in Cavity Search
        </h1>

        <p className="text-xs sm:text-sm text-tertiary leading-relaxed">
          The page you are looking for doesn't exist or has moved. Let's get your smile back on track!
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <Link
            to="/home"
            className="flex-1 py-3 px-5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-1.5 hover:brightness-105 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/services"
            className="py-3 px-5 rounded-full bg-surface-container text-primary font-bold text-xs sm:text-sm hover:bg-secondary-container transition-colors"
          >
            View Treatments
          </Link>
        </div>
      </div>
    </div>
  );
};
