import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  X,
  RefreshCw,
  AlertTriangle,
  Plus,
  CheckCircle2,
  Phone
} from "lucide-react";
import { Header } from "../components/common/Header";
import { useApp } from "../context/AppContext";
import { CLINIC_CONFIG } from "../config/clinic";
import { Appointment } from "../types";

export const AppointmentsPage: React.FC = () => {
  const { appointments, cancelAppointment, rescheduleAppointment } = useApp();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Reschedule state
  const [reschedulingApt, setReschedulingApt] = useState<Appointment | null>(null);
  const [newDate, setNewDate] = useState("2026-10-28");
  const [newDisplayDate, setNewDisplayDate] = useState("Wed, Oct 28, 2026");
  const [newTime, setNewTime] = useState("02:00 PM");

  // Cancel confirmation state
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const upcomingList = appointments.filter(
    (a) => a.status === "confirmed" || a.status === "rescheduled"
  );
  const pastList = appointments.filter(
    (a) => a.status === "completed" || a.status === "cancelled"
  );

  const handleConfirmReschedule = () => {
    if (!reschedulingApt) return;
    rescheduleAppointment(reschedulingApt.id, newDate, newDisplayDate, newTime);
    setReschedulingApt(null);
  };

  const handleConfirmCancel = () => {
    if (!cancellingId) return;
    cancelAppointment(cancellingId);
    setCancellingId(null);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header pageTitle="Appointments" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 space-y-6">
        {/* Header Title & Book CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011e30] tracking-tight">
              My Dental Appointments
            </h1>
            <p className="text-xs sm:text-sm text-tertiary mt-1">
              Track upcoming visits, reschedule times, or review past care records.
            </p>
          </div>

          <Link
            to="/book"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-bold shadow-md hover:brightness-105 active:scale-95 transition-all self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Book New Visit</span>
          </Link>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1.5 bg-surface-container rounded-2xl max-w-xs">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "upcoming"
                ? "bg-white text-primary shadow-sm"
                : "text-tertiary hover:text-on-surface"
            }`}
          >
            Upcoming ({upcomingList.length})
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === "past"
                ? "bg-white text-primary shadow-sm"
                : "text-tertiary hover:text-on-surface"
            }`}
          >
            History & Cancelled ({pastList.length})
          </button>
        </div>

        {/* Appointment Cards List */}
        <div className="space-y-4">
          {(activeTab === "upcoming" ? upcomingList : pastList).length === 0 ? (
            <div className="rounded-3xl p-8 sm:p-12 bg-white/70 backdrop-blur-md border border-white text-center space-y-3">
              <CalendarIcon className="w-12 h-12 text-primary-container/50 mx-auto" />
              <h3 className="text-base font-bold text-on-surface">
                {activeTab === "upcoming"
                  ? "No upcoming appointments found."
                  : "No past appointments found."}
              </h3>
              <p className="text-xs text-tertiary max-w-sm mx-auto">
                Need a dental cleaning, braces consultation, or laser whitening? Schedule a slot today.
              </p>
              <Link
                to="/book"
                className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-primary-container text-white text-xs font-bold shadow-md hover:bg-primary transition-all"
              >
                <span>Book Appointment</span>
              </Link>
            </div>
          ) : (
            (activeTab === "upcoming" ? upcomingList : pastList).map((apt) => (
              <div
                key={apt.id}
                className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.06)] hover:shadow-[0_12px_32px_rgba(31,168,160,0.12)] transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Status & ID Row */}
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-container/60">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-tertiary">ID:</span>
                      <span className="text-xs font-extrabold text-primary">{apt.id}</span>
                    </div>

                    <span
                      className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                        apt.status === "confirmed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : apt.status === "rescheduled"
                          ? "bg-sky-50 text-sky-700 border border-sky-200"
                          : apt.status === "completed"
                          ? "bg-surface-container text-tertiary"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </div>

                  {/* Doctor & Service Details */}
                  <div className="flex items-start gap-4 mb-4">
                    <img
                      src={apt.doctorImage}
                      alt={apt.doctorName}
                      className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover shadow-sm shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] font-bold text-primary uppercase">
                        {apt.serviceName}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-on-surface truncate">
                        {apt.doctorName}
                      </h3>
                      <span className="text-xs text-tertiary">{apt.appointmentType}</span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-xs">
                        <div className="flex items-center gap-1.5 text-on-surface font-semibold">
                          <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                          <span>{apt.displayDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-on-surface font-semibold">
                          <Clock className="w-3.5 h-3.5 text-primary" />
                          <span>{apt.timeSlot}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-base sm:text-lg font-extrabold text-primary">
                        {apt.servicePrice}
                      </span>
                    </div>
                  </div>

                  {apt.notes && (
                    <div className="p-3 rounded-xl bg-surface-container-low/70 text-xs text-tertiary mb-3">
                      <span className="font-semibold text-on-surface">Patient Notes: </span>
                      <span>{apt.notes}</span>
                    </div>
                  )}
                </div>

                {/* Actions Bottom Bar */}
                {activeTab === "upcoming" && (
                  <div className="pt-3 border-t border-surface-container flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setReschedulingApt(apt)}
                        className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Reschedule</span>
                      </button>

                      <button
                        onClick={() => setCancellingId(apt.id)}
                        className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={CLINIC_CONFIG.phoneLink}
                        className="px-3.5 py-2 rounded-full bg-surface-container-low hover:bg-surface-container text-tertiary hover:text-primary text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call</span>
                      </a>
                      <a
                        href={CLINIC_CONFIG.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 shadow-sm transition-colors"
                      >
                        Directions
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>

      {/* Reschedule Modal */}
      {reschedulingApt && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-white space-y-4">
            <button
              onClick={() => setReschedulingApt(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-on-surface"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <h3 className="text-lg font-bold text-on-surface">Reschedule Appointment</h3>
              <p className="text-xs text-tertiary">
                Choose a new date and time for your visit with {reschedulingApt.doctorName}.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Select New Date
              </label>
              <select
                value={newDate}
                onChange={(e) => {
                  setNewDate(e.target.value);
                  setNewDisplayDate(e.target.options[e.target.selectedIndex].text);
                }}
                className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface font-semibold"
              >
                <option value="2026-10-26">Mon, Oct 26, 2026</option>
                <option value="2026-10-27">Tue, Oct 27, 2026</option>
                <option value="2026-10-28">Wed, Oct 28, 2026</option>
                <option value="2026-10-29">Thu, Oct 29, 2026</option>
                <option value="2026-10-30">Fri, Oct 30, 2026</option>
                <option value="2026-10-31">Sat, Oct 31, 2026</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Select Time Slot
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["09:00 AM", "10:30 AM", "02:00 PM", "03:30 PM", "05:00 PM"].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setNewTime(slot)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      newTime === slot
                        ? "bg-primary-container text-white border-primary-container shadow-sm"
                        : "bg-surface-container-low text-on-surface border-surface-container"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => setReschedulingApt(null)}
                className="flex-1 py-3 rounded-full bg-surface-container text-tertiary font-semibold text-xs"
              >
                Keep Current
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs shadow-md"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancellingId && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-white text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-on-surface">Cancel This Appointment?</h3>
              <p className="text-xs text-tertiary mt-1">
                Are you sure you wish to cancel booking {cancellingId}? You can reschedule anytime for free.
              </p>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setCancellingId(null)}
                className="flex-1 py-2.5 rounded-full bg-surface-container text-on-surface font-semibold text-xs"
              >
                Keep Booking
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2.5 rounded-full bg-red-600 text-white font-bold text-xs hover:bg-red-700 shadow-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
