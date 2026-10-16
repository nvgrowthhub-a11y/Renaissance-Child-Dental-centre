import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, Bell, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationsAsRead } = useApp();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Mark all as read upon opening
  useEffect(() => {
    if (isOpen) {
      markNotificationsAsRead();
    }
  }, [isOpen]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleItemClick = (link?: string) => {
    onClose();
    if (link) {
      navigate(link);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={dropdownRef}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="absolute top-14 right-2 sm:right-0 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-[0_16px_40px_rgba(31,168,160,0.18)] border border-white z-50 overflow-hidden"
      >
        <div className="flex items-center justify-between pb-3 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            <span className="font-bold text-sm text-on-surface">Notifications</span>
          </div>
          <span className="text-[11px] font-semibold text-tertiary">All caught up</span>
        </div>

        <div className="flex flex-col gap-2 mt-3 max-h-72 overflow-y-auto no-scrollbar">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleItemClick(notif.link)}
              className="p-2.5 rounded-2xl hover:bg-surface-container-low transition-colors cursor-pointer flex gap-3 items-start group"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  notif.type === "appointment"
                    ? "bg-primary/10 text-primary"
                    : notif.type === "offer"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-surface-container text-tertiary"
                }`}
              >
                {notif.type === "appointment" ? (
                  <Calendar className="w-4 h-4" />
                ) : notif.type === "offer" ? (
                  <Tag className="w-4 h-4" />
                ) : (
                  <Bell className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                    {notif.title}
                  </h4>
                  <span className="text-[10px] text-tertiary shrink-0">{notif.time}</span>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-snug line-clamp-2 mt-0.5">
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 mt-2 border-t border-surface-container text-center">
          <button
            onClick={() => {
              onClose();
              navigate("/appointments");
            }}
            className="text-xs font-semibold text-primary hover:text-on-primary-container inline-flex items-center gap-1 cursor-pointer"
          >
            <span>View All Appointments</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
