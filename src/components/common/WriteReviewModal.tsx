import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Send } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { SERVICES_DATA } from "../../data/services";
import { DOCTORS_DATA } from "../../data/doctors";

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({ isOpen, onClose }) => {
  const { addReview, user } = useApp();
  const [patientName, setPatientName] = useState(user?.name || "");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [treatment, setTreatment] = useState(SERVICES_DATA[0].title);
  const [doctorName, setDoctorName] = useState(DOCTORS_DATA[0].name);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!patientName.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setError("Please write a review of at least 10 characters.");
      return;
    }

    addReview({
      patientName,
      treatment,
      rating,
      comment,
      doctorName
    });

    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(31,168,160,0.2)] border border-white z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-5">
            <h3 className="text-xl font-bold text-on-surface">Share Your Smile Experience</h3>
            <p className="text-xs text-tertiary mt-1">
              Your feedback helps future patients choose pain-free care with confidence.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Star Rating Picker */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-surface-container-low/80">
              <span className="text-xs font-semibold text-tertiary mb-2">Overall Rating</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-transform hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        (hoverRating || rating) >= star
                          ? "fill-amber-400 text-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <span className="text-xs font-bold text-primary mt-2">
                {rating === 5
                  ? "5.0 - Exceptional Experience!"
                  : rating === 4
                  ? "4.0 - Very Good"
                  : rating === 3
                  ? "3.0 - Satisfactory"
                  : `${rating}.0 Stars`}
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Your Name
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Jessica Miller"
                className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container text-sm text-on-surface focus:outline-none focus:border-primary-container focus:bg-white transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Treatment
                </label>
                <select
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Attending Doctor
                </label>
                <select
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                >
                  {DOCTORS_DATA.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                  <option value="SmileCare Clinic Team">SmileCare Clinic Team</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about the clinic environment, pain level, doctor's explanation, and your results..."
                className="w-full p-3 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs text-on-surface focus:outline-none focus:border-primary-container focus:bg-white resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-semibold text-sm shadow-[0_8px_20px_rgba(31,168,160,0.35)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>Submit Verified Review</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
