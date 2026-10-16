import React, { useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Download,
  ArrowRight,
  Home,
  Sparkles,
  Share2
} from "lucide-react";
import { Header } from "../components/common/Header";
import { CLINIC_CONFIG } from "../config/clinic";
import { Appointment } from "../types";
import { useApp } from "../context/AppContext";

export const BookingSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useApp();

  const appointment: Appointment = location.state?.appointment || {
    id: "SC-98421",
    patientName: "Alex Rivera",
    patientPhone: "08470077778",
    patientEmail: "alex.rivera@example.com",
    doctorId: "dr-emma-johnson",
    doctorName: "Dr. Emma Johnson",
    doctorImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuCyH-rt7rzFPLnj_pbloc83_iuZD-x0KWnCHms-1lJqhlifisG1HWDqtizvnGBL6yiEQgyFvmNvPsQ3lhXWCLZDp9-PRFzZlQVmanrsEtUYF-KNT57o7WfOj2aRFAtWz4qdpAL3N29vlJJUcQfCUxy4z0xdOw_Izr3vFkDdQQCV7yZ0zeLMYt6e4EFFE3z7pEmVOf04j21xuB2Am0nhhRLQoxU8xme_-b-ymbZtp6678bpQsHs6ENORDQ",
    serviceId: "teeth-whitening",
    serviceName: "Teeth Whitening",
    servicePrice: "$150",
    appointmentType: "In-Clinic Visit",
    date: "2026-10-24",
    displayDate: "Sat, Oct 24, 2026",
    timeSlot: "10:30 AM",
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  // Launch celebration confetti
  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#1FA8A0", "#2BB5AA", "#78f4e7", "#80f6ec"]
      });
    } catch {
      // ignore
    }
  }, []);

  // Download .ics Calendar event
  const handleDownloadICS = () => {
    const title = `SmileCare: ${appointment.serviceName} with ${appointment.doctorName}`;
    const description = `Appointment ID: ${appointment.id}\\nService: ${appointment.serviceName}\\nDoctor: ${appointment.doctorName}\\nType: ${appointment.appointmentType}\\nAddress: ${CLINIC_CONFIG.address}\\nClinic Phone: 08470077778`;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//SmileCare Dental Clinic//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${title}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${CLINIC_CONFIG.address}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SmileCare_Appointment_${appointment.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Calendar invite downloaded (.ics)!");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-28 space-y-6">
        {/* Animated Celebration Card */}
        <div className="rounded-[32px] p-6 sm:p-10 bg-white/95 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(31,168,160,0.16)] text-center flex flex-col items-center">
          {/* Checkmark Icon with Glow */}
          <div className="relative mb-4 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary-mint to-primary-container text-white flex items-center justify-center shadow-lg shadow-primary-container/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
          </div>

          <span className="inline-block px-3.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-2">
            Appointment Confirmed
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011e30] tracking-tight">
            You're All Set for a Brighter Smile!
          </h1>
          <p className="text-xs sm:text-sm text-tertiary mt-1.5 max-w-md">
            We have emailed and texted your visit confirmation. We look forward to welcoming you at SmileCare.
          </p>

          {/* Booking ID Badge */}
          <div className="mt-4 px-4 py-2 rounded-2xl bg-surface-container-low border border-surface-container flex items-center gap-2">
            <span className="text-xs text-tertiary font-semibold">Booking ID:</span>
            <span className="text-sm font-extrabold text-primary tracking-wide">
              {appointment.id}
            </span>
          </div>

          {/* Appointment Summary Box */}
          <div className="w-full mt-6 p-5 rounded-2xl bg-surface-container-low/70 border border-surface-container/60 text-left space-y-3.5">
            <div className="flex items-center gap-3.5 pb-3 border-b border-surface-container/60">
              <img
                src={appointment.doctorImage}
                alt={appointment.doctorName}
                className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold text-primary uppercase">
                  {appointment.serviceName}
                </span>
                <h3 className="text-sm font-bold text-on-surface truncate">
                  {appointment.doctorName}
                </h3>
                <span className="text-xs text-tertiary">{appointment.appointmentType}</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-extrabold text-primary">
                  {appointment.servicePrice}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-on-surface">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-semibold">{appointment.displayDate}</span>
              </div>
              <div className="flex items-center gap-2 text-on-surface">
                <Clock className="w-4 h-4 text-primary" />
                <span className="font-semibold">{appointment.timeSlot}</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-tertiary pt-1">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{CLINIC_CONFIG.address}</span>
            </div>
          </div>

          {/* Quick Actions Row */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-6">
            <button
              onClick={handleDownloadICS}
              className="py-3 px-4 rounded-full bg-white hover:bg-surface-container-low text-primary border border-surface-container font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Add to Calendar</span>
            </button>

            <a
              href={CLINIC_CONFIG.phoneLink}
              className="py-3 px-4 rounded-full bg-white hover:bg-surface-container-low text-primary border border-surface-container font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic</span>
            </a>

            <a
              href={CLINIC_CONFIG.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-full bg-white hover:bg-surface-container-low text-primary border border-surface-container font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Get Directions</span>
            </a>
          </div>

          {/* Navigation Action Buttons */}
          <div className="w-full flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-surface-container">
            <Link
              to="/appointments"
              className="flex-1 py-3.5 px-6 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
            >
              <span>View My Appointments</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/home"
              className="py-3.5 px-6 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
