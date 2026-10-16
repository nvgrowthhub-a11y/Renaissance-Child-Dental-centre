import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Home,
  Info,
  Sparkles,
  Award,
  Star,
  BookOpen,
  MapPin,
  Calendar,
  Tag,
  MessageSquare,
  User,
  Phone,
  ArrowRight
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CLINIC_CONFIG } from "../../config/clinic";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/home", icon: Home },
    { name: "About Clinic", path: "/about", icon: Info },
    { name: "Services & Treatments", path: "/services", icon: Sparkles },
    { name: "Why Choose Us", path: "/why-us", icon: Award },
    { name: "Patient Reviews", path: "/testimonials", icon: Star },
    { name: "Blog & Oral Guides", path: "/blog", icon: BookOpen },
    { name: "Contact & Clinic Location", path: "/contact", icon: MapPin },
    { name: "Special Offers", path: "/offers", icon: Tag },
    { name: "Care Concierge Chat", path: "/messages", icon: MessageSquare },
    { name: "My Appointments", path: "/appointments", icon: Calendar },
    { name: "Patient Profile", path: "/profile", icon: User },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Drawer content */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 280 }}
            className="relative w-80 max-w-[85vw] h-full bg-white/95 backdrop-blur-2xl shadow-2xl flex flex-col z-10 border-r border-white/60 overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-surface-container flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={CLINIC_CONFIG.logoUrl}
                  alt={CLINIC_CONFIG.name}
                  className="w-9 h-9 object-contain"
                />
                <div>
                  <h3 className="font-extrabold text-base text-[#011e30] leading-tight">
                    {CLINIC_CONFIG.name}
                  </h3>
                  <span className="text-[11px] text-primary font-semibold">
                    {CLINIC_CONFIG.tagline}
                  </span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav list */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1 no-scrollbar">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                      isActive
                        ? "bg-gradient-to-r from-primary-mint/20 to-primary-container/20 text-primary font-bold shadow-sm"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-primary"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isActive
                            ? "bg-primary-container text-white shadow-sm"
                            : "bg-surface-container text-tertiary"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span>{item.name}</span>
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-primary-container" />}
                  </Link>
                );
              })}
            </div>

            {/* Quick Contact & Book CTA */}
            <div className="p-4 bg-surface-container-low/70 border-t border-surface-container space-y-2.5">
              <Link
                to="/book"
                onClick={onClose}
                className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-semibold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-tertiary">
                <a
                  href={CLINIC_CONFIG.phoneLink}
                  className="flex items-center gap-1 hover:text-primary font-medium"
                >
                  <Phone className="w-3.5 h-3.5 text-primary" />
                  <span>08470077778</span>
                </a>
                <a
                  href={CLINIC_CONFIG.tollFreeLink}
                  className="hover:text-primary font-medium"
                >
                  Toll-Free: 1800 4123 0923
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
