import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface LightboxModalProps {
  imageUrl: string | null;
  caption?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ imageUrl, caption, onClose }) => {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative max-w-3xl max-h-[85vh] z-10 flex flex-col items-center"
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40 transition-colors cursor-pointer"
            aria-label="Close image"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={imageUrl}
            alt={caption || "Clinic photo preview"}
            className="w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
          />

          {caption && (
            <div className="mt-3 text-center px-4 py-2 rounded-full bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-medium">
              {caption}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
