import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, Bell, User as UserIcon, Calendar, Phone } from "lucide-react";
import { CLINIC_CONFIG } from "../../config/clinic";
import { useApp } from "../../context/AppContext";
import { NotificationDropdown } from "./NotificationDropdown";
import { SideDrawer } from "./SideDrawer";

interface HeaderProps {
  pageTitle?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ pageTitle, showBack = false }) => {
  const { user, openAuthModal, unreadNotificationsCount } = useApp();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Desktop navigation links
  const desktopNavItems = [
    { name: "Home", path: "/home" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Why Us", path: "/why-us" },
    { name: "Reviews", path: "/testimonials" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  const currentPageName =
    pageTitle ||
    (location.pathname === "/home"
      ? "Home"
      : location.pathname === "/about"
      ? "About Us"
      : location.pathname === "/services"
      ? "Services"
      : location.pathname === "/why-us"
      ? "Why Us"
      : location.pathname === "/testimonials"
      ? "Reviews"
      : location.pathname === "/blog"
      ? "Blog & Guides"
      : location.pathname === "/contact"
      ? "Contact"
      : location.pathname === "/book"
      ? "Book Visit"
      : location.pathname === "/appointments"
      ? "Appointments"
      : location.pathname === "/offers"
      ? "Offers"
      : location.pathname === "/messages"
      ? "Concierge"
      : location.pathname === "/profile"
      ? "Profile"
      : "SmileCare");

  return (
    <>
      <header className="fixed top-0 left-0 right-0 w-full z-50 pt-safe bg-surface/85 backdrop-blur-xl shadow-[0_1px_12px_rgba(31,168,160,0.06)] border-b border-primary-container/10">
        {/* Mobile top system simulation strip */}
        <div className="lg:hidden h-5 px-margin flex items-center justify-between text-on-surface text-[11px] font-semibold tracking-tight select-none pt-0.5">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-on-surface">
            <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
            <span className="material-symbols-outlined text-[14px]">wifi</span>
            <span className="material-symbols-outlined text-[16px]">battery_full</span>
          </div>
        </div>

        {/* Desktop Top Utility Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-xs text-tertiary bg-surface-container-low/60 border-b border-surface-container/50">
          <div className="flex items-center gap-6">
            <a
              href={CLINIC_CONFIG.phoneLink}
              className="flex items-center gap-1.5 text-primary hover:text-on-primary-container font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {CLINIC_CONFIG.phoneFormatted}</span>
            </a>
            <span>•</span>
            <a
              href={CLINIC_CONFIG.tollFreeLink}
              className="hover:text-primary transition-colors"
            >
              Toll-free: {CLINIC_CONFIG.tollFree}
            </a>
            <span>•</span>
            <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={CLINIC_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              Get Directions
            </a>
            <span className="text-gray-300">|</span>
            <Link to="/contact" className="hover:text-primary transition-colors font-medium">
              San Francisco Flagship
            </Link>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-14 sm:h-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left Brand / Back button */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            {showBack ? (
              <button
                onClick={() => navigate(-1)}
                className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container/60 transition-colors cursor-pointer"
                aria-label="Go back"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
            ) : (
              <button
                onClick={() => setIsDrawerOpen(true)}
                className="lg:hidden w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container/60 transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-on-surface" />
              </button>
            )}

            <Link to="/home" className="flex items-center gap-2.5 min-w-0 group">
              <img
                src={CLINIC_CONFIG.logoUrl}
                alt="SmileCare Logo"
                className="h-8 w-auto object-contain shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-base sm:text-lg text-primary tracking-tight truncate leading-tight">
                    {CLINIC_CONFIG.name}
                  </span>
                  <span className="text-tertiary text-xs opacity-40 font-light hidden sm:inline">
                    /
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-on-surface truncate leading-tight hidden sm:inline">
                    {currentPageName}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] text-tertiary truncate leading-tight font-medium">
                  {CLINIC_CONFIG.tagline}
                </span>
              </div>
            </Link>
          </div>

          {/* Center Links (Desktop only) */}
          <nav className="hidden lg:flex items-center gap-1">
            {desktopNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-primary-mint/15 to-primary-container/20 text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:text-primary hover:bg-surface-container/50"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Auth */}
          <div className="relative flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Book Appointment CTA (Desktop) */}
            <Link
              to="/book"
              className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-semibold shadow-[0_6px_16px_rgba(31,168,160,0.32)] hover:brightness-105 active:scale-95 transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </Link>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen((prev) => !prev)}
                aria-label="Notifications"
                className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-container/60 transition-colors cursor-pointer"
              >
                <Bell className="w-5 h-5" />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-white animate-pulse" />
                )}
              </button>

              <NotificationDropdown
                isOpen={isNotifOpen}
                onClose={() => setIsNotifOpen(false)}
              />
            </div>

            {/* Profile Avatar / Login */}
            {user ? (
              <Link
                to="/profile"
                className="w-10 h-10 flex items-center justify-center cursor-pointer group"
                title={`${user.name} - View Profile`}
              >
                <div className="p-0.5 rounded-full ring-2 ring-primary-container/30 group-hover:ring-primary-container transition-all">
                  <img
                    src={user.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzLWKAbtJOQXTooSQOL0xL21LaLo5SW2SXPwgS2XaJGTDSfKMJEsWtIqoH0FPelbdRFT5ulmuZuC4E1LOT1ICQXpmyHLPyRyjZCHqp0ZYLiiVvA0e9g85xAWPBITff5m45MmcNM3_b6faLwv8gk7im2dJNeJQuaQ8fEOKeq9o-Rj5sfHmxG2_gPoeKa4ZSr9QXC_9dZCE2oBAzOPTNZ-t95cdocw9nPThfGkTg39_qMlhr7XtNt_jzQ"}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
              </Link>
            ) : (
              <button
                onClick={openAuthModal}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container hover:bg-secondary-container/40 text-primary text-xs font-bold transition-all cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Side drawer for mobile navigation */}
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
};
