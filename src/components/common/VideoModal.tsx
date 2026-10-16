import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { VideoTestimonial } from "../../types";

interface VideoModalProps {
  video: VideoTestimonial | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
  if (!video) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 16 }}
          className="relative w-full max-w-2xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl z-10 border border-white/20"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Player */}
          <div className="relative w-full aspect-video bg-black flex items-center justify-center">
            <video
              src={video.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support HTML5 video.
            </video>
          </div>

          {/* Video Details */}
          <div className="p-4 sm:p-5 bg-slate-950 text-white">
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-base font-bold">{video.patientName}</h4>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 font-semibold">
                {video.treatment}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-300 italic">{video.quote}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
