import React, { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";
import { CLINIC_CONFIG } from "../../config/clinic";

export const FloatingActions: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed right-4 bottom-20 lg:bottom-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      {/* Quick Tooltip */}
      {showTooltip && (
        <div className="pointer-events-auto bg-[#0F2A3D] text-white text-xs px-3 py-1.5 rounded-xl shadow-lg mb-1 flex items-center gap-1.5 animate-bounce">
          <span>Need immediate appointment help?</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="hover:text-teal-300 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Call Button */}
      <a
        href={CLINIC_CONFIG.phoneLink}
        className="pointer-events-auto w-12 h-12 rounded-full bg-white text-primary border border-primary-container/30 shadow-[0_6px_20px_rgba(31,168,160,0.25)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
        title="Call Clinic: 08470077778"
        aria-label="Call clinic directly"
      >
        <Phone className="w-5 h-5 text-primary group-hover:animate-pulse" />
      </a>

      {/* Floating WhatsApp Button */}
      <a
        href={CLINIC_CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="pointer-events-auto w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_24px_rgba(37,211,102,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all relative group"
        title="Chat on WhatsApp"
        aria-label="Chat with SmileCare on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20" />
      </a>
    </div>
  );
};
