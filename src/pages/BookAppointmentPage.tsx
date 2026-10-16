import React, { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Video,
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { Header } from "../components/common/Header";
import { DOCTORS_DATA } from "../data/doctors";
import { SERVICES_DATA } from "../data/services";
import { useApp } from "../context/AppContext";

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, bookAppointment, showToast } = useApp();

  // Selected treatment query parameter
  const initialServiceId = searchParams.get("service") || "teeth-whitening";
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);

  // Selected doctor query parameter
  const initialDoctorId = searchParams.get("doctor") || "dr-emma-johnson";
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);

  // Appointment Type: In-Clinic vs Video Consultation
  const [appointmentType, setAppointmentType] = useState<"In-Clinic Visit" | "Video Consultation">("In-Clinic Visit");

  // Generate the next 14 calendar dates starting from today
  const availableDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      // Disable Sundays for routine (Sunday is emergency only)
      const isSunday = d.getDay() === 0;

      dates.push({
        iso: d.toISOString().split("T")[0],
        dayName: dayNames[d.getDay()],
        dayNum: d.getDate(),
        monthName: monthNames[d.getMonth()],
        year: d.getFullYear(),
        display: `${dayNames[d.getDay()]}, ${monthNames[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`,
        disabled: isSunday
      });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState(
    availableDates.find((d) => !d.disabled)?.iso || availableDates[0].iso
  );

  // Time slots
  const timeSlots = [
    { time: "09:00 AM", isBooked: false },
    { time: "10:30 AM", isBooked: false },
    { time: "12:00 PM", isBooked: true }, // simulated booked slot
    { time: "02:00 PM", isBooked: false },
    { time: "03:30 PM", isBooked: false },
    { time: "05:00 PM", isBooked: false },
  ];

  const [selectedTime, setSelectedTime] = useState("10:30 AM");

  // Patient details form
  const [patientName, setPatientName] = useState(user?.name || "");
  const [patientPhone, setPatientPhone] = useState(user?.phone || "");
  const [patientEmail, setPatientEmail] = useState(user?.email || "");
  const [notes, setNotes] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Selected Service & Doctor Objects
  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  const selectedDoctor = DOCTORS_DATA.find((d) => d.id === selectedDoctorId) || DOCTORS_DATA[0];

  const selectedDateObj = availableDates.find((d) => d.iso === selectedDate) || availableDates[0];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!patientName.trim()) {
      setFormError("Please enter patient name.");
      return;
    }
    if (!patientPhone.trim() || patientPhone.length < 8) {
      setFormError("Please enter a valid mobile number.");
      return;
    }
    if (!patientEmail.trim() || !patientEmail.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const newApt = bookAppointment({
        patientName,
        patientPhone,
        patientEmail,
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        doctorImage: selectedDoctor.image,
        serviceId: selectedService.id,
        serviceName: selectedService.title,
        servicePrice: selectedService.price,
        appointmentType,
        date: selectedDate,
        displayDate: selectedDateObj.display,
        timeSlot: selectedTime,
        notes
      });

      setIsSubmitting(false);
      navigate("/booking-success", { state: { appointment: newApt } });
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header showBack pageTitle="Book Appointment" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 space-y-6 sm:space-y-8">
        {/* Top Header */}
        <div className="text-center sm:text-left space-y-1">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">
            Quick Appointment Booking
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#011e30] tracking-tight">
            Reserve Your Smile Session
          </h1>
          <p className="text-xs sm:text-sm text-tertiary">
            Choose your preferred doctor, treatment, date and time slot.
          </p>
        </div>

        {formError && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {formError}
          </div>
        )}

        <form onSubmit={handleBooking} className="space-y-6">
          {/* 1. Doctor Highlight Card & Selector */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                Select Attending Dentist
              </span>
              <span className="text-[11px] font-semibold text-primary">
                {DOCTORS_DATA.length} Available
              </span>
            </div>

            {/* Doctor Options Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {DOCTORS_DATA.map((doc) => {
                const isSelected = selectedDoctorId === doc.id;

                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between ${
                      isSelected
                        ? "bg-secondary-container/20 border-primary-container shadow-sm scale-102"
                        : "bg-surface-container-low/60 border-transparent hover:bg-surface-container-low"
                    }`}
                  >
                    <div className="relative mb-2">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-14 h-14 rounded-full object-cover shadow-sm mx-auto"
                      />
                      {isSelected && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-container text-white rounded-full flex items-center justify-center shadow-sm">
                          <Check className="w-3.5 h-3.5 font-bold" />
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-on-surface truncate max-w-[120px]">
                        {doc.name}
                      </h4>
                      <span className="text-[10px] text-primary truncate block max-w-[120px]">
                        {doc.role.split("&")[0]}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 2. Select Treatment Dropdown & Card */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <label className="block text-xs font-bold text-tertiary uppercase tracking-wider">
              Select Dental Treatment
            </label>
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-surface-container-low border border-surface-container text-sm font-semibold text-on-surface focus:outline-none focus:border-primary-container focus:bg-white transition-all cursor-pointer"
            >
              {SERVICES_DATA.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.price}) — {s.duration}
                </option>
              ))}
            </select>
          </section>

          {/* 3. Horizontal Date Strip Picker */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                Select Date
              </span>
              <span className="text-xs font-bold text-primary flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5" />
                <span>{selectedDateObj.monthName} {selectedDateObj.year}</span>
              </span>
            </div>

            <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1">
              {availableDates.map((item) => {
                const isSelected = selectedDate === item.iso;

                return (
                  <button
                    key={item.iso}
                    type="button"
                    disabled={item.disabled}
                    onClick={() => setSelectedDate(item.iso)}
                    className={`flex-1 min-w-[64px] py-3 rounded-2xl flex flex-col items-center justify-center transition-all cursor-pointer ${
                      item.disabled
                        ? "opacity-35 cursor-not-allowed bg-gray-100"
                        : isSelected
                        ? "bg-primary-container text-white shadow-[0_8px_20px_rgba(31,168,160,0.35)] scale-105"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container"
                    }`}
                  >
                    <span className={`text-[11px] ${isSelected ? "text-teal-100 font-semibold" : "text-tertiary"}`}>
                      {item.dayName}
                    </span>
                    <span className="text-base font-extrabold mt-0.5">
                      {item.dayNum}
                    </span>
                    <span className={`text-[10px] ${isSelected ? "text-teal-100" : "text-tertiary"}`}>
                      {item.disabled ? "Off" : item.monthName}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* 4. Select Time Slots Grid */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
                Select Time Slot
              </span>
              <span className="text-xs text-tertiary">
                5 slots open today
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
              {timeSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;

                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.isBooked}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-3 px-2 rounded-2xl text-xs font-bold transition-all text-center ${
                      slot.isBooked
                        ? "bg-gray-100 text-gray-400 line-through cursor-not-allowed"
                        : isSelected
                        ? "bg-primary-container text-white shadow-md scale-102 cursor-pointer"
                        : "bg-surface-container-low text-on-surface hover:bg-surface-container cursor-pointer"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </section>

          {/* 5. Appointment Type (In-Clinic vs Video) */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
              Appointment Type
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option 1 */}
              <div
                onClick={() => setAppointmentType("In-Clinic Visit")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  appointmentType === "In-Clinic Visit"
                    ? "bg-secondary-container/20 border-primary-container shadow-sm"
                    : "bg-surface-container-low/70 border-transparent hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">In-Clinic Visit</h4>
                    <span className="text-xs text-tertiary">Visit at San Francisco Suite 300</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    appointmentType === "In-Clinic Visit"
                      ? "bg-primary-container text-white"
                      : "bg-surface-container"
                  }`}
                >
                  {appointmentType === "In-Clinic Visit" && <Check className="w-3.5 h-3.5 font-bold" />}
                </div>
              </div>

              {/* Option 2 */}
              <div
                onClick={() => setAppointmentType("Video Consultation")}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  appointmentType === "Video Consultation"
                    ? "bg-secondary-container/20 border-primary-container shadow-sm"
                    : "bg-surface-container-low/70 border-transparent hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-on-surface">Video Consultation</h4>
                    <span className="text-xs text-tertiary">Consult remotely via HD Video Link</span>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    appointmentType === "Video Consultation"
                      ? "bg-primary-container text-white"
                      : "bg-surface-container"
                  }`}
                >
                  {appointmentType === "Video Consultation" && <Check className="w-3.5 h-3.5 font-bold" />}
                </div>
              </div>
            </div>
          </section>

          {/* 6. Patient Details Form */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-4">
            <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
              Patient Contact Information
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Full Name *
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-tertiary" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Alex Rivera"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Phone Number *
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-tertiary" />
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="08470077778"
                    className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Email Address *
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-tertiary" />
                <input
                  type="email"
                  required
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  className="w-full h-11 pl-10 pr-3 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">
                Special Requests or Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any tooth sensitivity, allergies, or questions for your doctor..."
                className="w-full p-3 rounded-xl bg-surface-container-low border border-surface-container text-xs text-on-surface focus:outline-none focus:border-primary-container focus:bg-white resize-none"
              />
            </div>
          </section>

          {/* 7. Fee Breakdown & Confirm Booking Action */}
          <section className="rounded-3xl p-5 sm:p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] space-y-3">
            <span className="text-xs font-bold text-tertiary uppercase tracking-wider">
              Fee Summary
            </span>

            <div className="space-y-2 text-xs text-tertiary">
              <div className="flex items-center justify-between">
                <span>{selectedService.title} Fee</span>
                <span className="font-bold text-on-surface">{selectedService.price}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Clinical Sterilization & Sanitization</span>
                <span className="font-bold text-primary">FREE</span>
              </div>
              <div className="flex items-center justify-between">
                <span>3D Digital Oral Scan</span>
                <span className="font-bold text-primary">FREE (Included)</span>
              </div>
              <div className="pt-2 border-t border-surface-container flex items-center justify-between text-base font-extrabold text-[#011e30]">
                <span>Total Amount Due at Clinic</span>
                <span className="text-xl text-primary">{selectedService.price}</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-sm sm:text-base shadow-[0_10px_26px_rgba(31,168,160,0.4)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined text-[20px] animate-spin">
                      progress_activity
                    </span>
                    <span>Securing Slot with {selectedDoctor.name.split(" ")[1]}...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Booking</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-tertiary text-center">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>Free cancellation up to 4 hours before your scheduled session.</span>
            </div>
          </section>
        </form>
      </main>
    </div>
  );
};
