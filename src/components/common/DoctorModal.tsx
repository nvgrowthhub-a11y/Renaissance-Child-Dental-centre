import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, CheckCircle, Calendar, GraduationCap, Award, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Doctor } from "../../types";

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
}

export const DoctorModal: React.FC<DoctorModalProps> = ({ doctor, onClose }) => {
  const navigate = useNavigate();

  if (!doctor) return null;

  const handleBook = () => {
    onClose();
    navigate(`/book?doctor=${doctor.id}`);
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
          className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(31,168,160,0.2)] border border-white z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Doctor Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="relative shrink-0">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-md"
              />
              <span className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center shadow-sm">
                <CheckCircle className="w-4 h-4" />
              </span>
            </div>
            <div className="flex flex-col min-w-0 pr-6">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-xl font-bold text-on-surface">{doctor.name}</h3>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider shrink-0">
                  Active
                </span>
              </div>
              <p className="text-sm font-semibold text-primary">{doctor.role}</p>
              <p className="text-xs text-tertiary mt-0.5">{doctor.department}</p>
              
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-0.5 rounded-md">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>{doctor.rating}</span>
                </div>
                <span className="text-xs text-tertiary">({doctor.reviewsCount} Patient Reviews)</span>
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-2xl bg-surface-container-low/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] text-tertiary">Experience</span>
                <span className="text-xs font-bold text-on-surface">{doctor.experience}</span>
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-container-low/80 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="block text-[11px] text-tertiary">Alma Mater</span>
                <span className="text-xs font-bold text-on-surface truncate block" title={doctor.education}>
                  {doctor.education.split(" ")[0]} School
                </span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-5">
            <h4 className="text-sm font-bold text-on-surface mb-1.5">Biography & Care Approach</h4>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Specialties Chips */}
          <div className="mb-5">
            <h4 className="text-sm font-bold text-on-surface mb-2">Clinical Specialties</h4>
            <div className="flex flex-wrap gap-1.5">
              {doctor.specialties.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-semibold"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>

          {/* Available Days */}
          <div className="mb-6 p-3 rounded-2xl bg-surface-container-lowest border border-surface-container flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-tertiary">
              <Calendar className="w-4 h-4 text-primary" />
              <span>Available Days:</span>
            </div>
            <div className="flex gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => {
                const isAvail = doctor.availableDays.some((d) => d.startsWith(day));
                return (
                  <span
                    key={day}
                    className={`w-7 h-7 rounded-lg text-[10px] font-bold flex items-center justify-center ${
                      isAvail
                        ? "bg-primary text-white"
                        : "bg-surface-container/60 text-gray-400 opacity-60"
                    }`}
                  >
                    {day[0]}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Book with this doctor CTA */}
          <button
            onClick={handleBook}
            className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-semibold text-sm shadow-[0_8px_20px_rgba(31,168,160,0.35)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Book Appointment with {doctor.name.split(" ")[1]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
