import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-lg border backdrop-blur-xl ${
              toast.type === "error"
                ? "bg-red-50/95 border-red-200 text-red-900"
                : toast.type === "info"
                ? "bg-sky-50/95 border-sky-200 text-sky-900"
                : "bg-white/95 border-[#1fa8a0]/30 text-[#011e30] shadow-[0_8px_24px_rgba(31,168,160,0.15)]"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              {toast.type === "error" ? (
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
              ) : toast.type === "info" ? (
                <Info className="w-5 h-5 text-sky-500 shrink-0" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary-container flex items-center justify-center text-white shrink-0 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              <span className="text-sm font-medium leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded-full hover:bg-black/5 text-gray-400 hover:text-gray-700 transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
