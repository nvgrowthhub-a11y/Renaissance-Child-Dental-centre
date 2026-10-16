import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  MessageSquare,
  Mail,
  AlertCircle,
  MapPin,
  Clock,
  Send,
  ChevronDown,
  CheckCircle2,
  ExternalLink,
  MessageCircle,
  Headphones,
  Check
} from "lucide-react";
import { Header } from "../components/common/Header";
import { CLINIC_CONFIG, isClinicOpenNow } from "../config/clinic";
import { SERVICES_DATA } from "../data/services";
import { FAQS_DATA } from "../data/faqs";
import { useApp } from "../context/AppContext";

export const ContactPage: React.FC = () => {
  const { showToast, saveContactSubmission } = useApp();
  const status = isClinicOpenNow();

  // Contact Form state
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: SERVICES_DATA[0].title,
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState<string | null>(FAQS_DATA[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      setFormError("Please enter a valid phone number.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!formData.message.trim() || formData.message.length < 10) {
      setFormError("Please describe your dental inquiry in at least 10 characters.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      saveContactSubmission(formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      showToast("Thank you! Our dental care team will reach out within 15 minutes.");
    }, 1000);
  };

  const handleSendViaWhatsApp = () => {
    if (!formData.name.trim()) {
      showToast("Please enter your name first.", "error");
      return;
    }
    const text = encodeURIComponent(
      `Hello SmileCare! My name is ${formData.name}. Phone: ${formData.phone || "N/A"}. Service of interest: ${formData.service}. Inquiry: ${formData.message || "I would like to book a consultation."}`
    );
    window.open(`https://wa.me/918470077778?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Intro */}
        <section className="text-center sm:text-left pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-4 h-4 text-primary" />
            <span>24/7 Patient Concierge</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            We're Here for Your Smile
          </h1>
          <p className="text-xs sm:text-sm text-tertiary max-w-xl leading-relaxed">
            Have questions about cosmetic makeovers, insurance coverage, or urgent dental emergencies? Reach our friendly care team anytime.
          </p>
        </section>

        {/* 5 Quick Contact Action Cards */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Call */}
          <a
            href={CLINIC_CONFIG.phoneLink}
            className="rounded-3xl p-4 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-on-surface">Call Us Direct</h3>
              <p className="text-[11px] text-tertiary mt-0.5 truncate">{CLINIC_CONFIG.phoneFormatted}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-container flex items-center gap-1 text-xs font-bold text-primary">
              <span>Tap to Call</span>
            </div>
          </a>

          {/* Toll-Free */}
          <a
            href={CLINIC_CONFIG.tollFreeLink}
            className="rounded-3xl p-4 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-secondary-container/50 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Headphones className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-on-surface">Toll-Free Helpline</h3>
              <p className="text-[11px] text-tertiary mt-0.5 truncate">{CLINIC_CONFIG.tollFree}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-container flex items-center gap-1 text-xs font-bold text-primary">
              <span>Free Consultation</span>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={CLINIC_CONFIG.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-3xl p-4 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-on-surface">WhatsApp Chat</h3>
              <p className="text-[11px] text-tertiary mt-0.5 truncate">Care Concierge</p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-container flex items-center gap-1 text-xs font-bold text-emerald-600">
              <span>Reply &lt; 5 mins</span>
            </div>
          </a>

          {/* Email */}
          <a
            href={CLINIC_CONFIG.emailLink}
            className="rounded-3xl p-4 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] hover:-translate-y-1 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-on-surface">Email Inquiries</h3>
              <p className="text-[11px] text-tertiary mt-0.5 truncate">{CLINIC_CONFIG.email}</p>
            </div>
            <div className="mt-3 pt-2 border-t border-surface-container flex items-center gap-1 text-xs font-bold text-sky-600">
              <span>Send Message</span>
            </div>
          </a>

          {/* Emergency 24/7 */}
          <a
            href={CLINIC_CONFIG.tollFreeLink}
            className="rounded-3xl p-4 bg-gradient-to-br from-red-500 to-rose-600 text-white shadow-[0_8px_24px_rgba(225,29,72,0.3)] hover:-translate-y-1 transition-all flex flex-col justify-between group col-span-2 sm:col-span-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 text-white flex items-center justify-center">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
              </div>
              <h3 className="text-sm font-bold">24/7 Emergency</h3>
              <p className="text-[11px] text-white/80 mt-0.5">Immediate Triage</p>
            </div>
            <div className="mt-3 pt-2 border-t border-white/20 flex items-center gap-1 text-xs font-bold text-white">
              <span>Priority Hotline</span>
            </div>
          </a>
        </section>

        {/* Contact Form & Working Hours Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
          {/* Form (Col 7) */}
          <div className="lg:col-span-7 rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(31,168,160,0.08)]">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
                Send Us a Message
              </h2>
              <p className="text-xs sm:text-sm text-tertiary mt-1">
                Fill in your details below and our doctor on duty will respond promptly.
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
                {formError}
              </div>
            )}

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center rounded-2xl bg-emerald-50 border border-emerald-100 space-y-3"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Message Dispatched!</h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                  Thank you, {formData.name}. We have logged your request in our clinic care system. You will receive an SMS/WhatsApp response shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: "",
                      phone: "",
                      email: "",
                      service: SERVICES_DATA[0].title,
                      message: ""
                    });
                  }}
                  className="mt-2 px-5 py-2 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Rivera"
                      className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 08470077778"
                      className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex.rivera@example.com"
                      className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1.5">
                      Treatment of Interest
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full h-11 px-3 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs text-on-surface focus:outline-none focus:border-primary-container focus:bg-white"
                    >
                      {SERVICES_DATA.map((s) => (
                        <option key={s.id} value={s.title}>
                          {s.title}
                        </option>
                      ))}
                      <option value="General Checkup">General Routine Checkup</option>
                      <option value="Second Opinion">Second Opinion Consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1.5">
                    Your Message / Symptoms *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your questions, symptoms, or preferred visit timings..."
                    className="w-full p-3.5 rounded-xl bg-surface-container-low/80 border border-surface-container text-xs sm:text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white resize-none"
                  />
                </div>

                {/* Submit & Optional WhatsApp Actions */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:flex-1 h-12 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs sm:text-sm shadow-[0_8px_20px_rgba(31,168,160,0.35)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">
                        progress_activity
                      </span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="w-full sm:w-auto h-12 px-5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Working Hours & Clinic Location Card (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Working Hours Card */}
            <div className="rounded-3xl p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(31,168,160,0.08)]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-on-surface">Working Hours</h3>
                </div>

                {/* Live Open / Closed Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                    status.isOpen
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                    }`}
                  />
                  <span>{status.message}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {CLINIC_CONFIG.hours.map((h) => (
                  <div
                    key={h.day}
                    className="flex items-center justify-between py-1.5 border-b border-surface-container/50 last:border-none"
                  >
                    <span className="font-semibold text-on-surface">{h.day}</span>
                    <span className={h.isEmergencyOnly ? "text-amber-600 font-bold" : "text-tertiary"}>
                      {h.isEmergencyOnly ? "10:00 AM - 4:00 PM (Emergency Only)" : `${h.open} AM - 8:00 PM`}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Google Map Card */}
            <div className="rounded-3xl p-6 bg-white/95 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(31,168,160,0.08)] space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-on-surface">Clinic Location</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold">
                  Suite 300
                </span>
              </div>

              <p className="text-xs text-tertiary leading-relaxed">
                {CLINIC_CONFIG.address}
              </p>

              {/* Map Preview iframe / Card */}
              <div className="relative w-full h-44 rounded-2xl overflow-hidden shadow-inner border border-surface-container">
                <iframe
                  title="SmileCare Dental Clinic Location"
                  src={CLINIC_CONFIG.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>

              <a
                href={CLINIC_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-full bg-surface-container hover:bg-secondary-container/40 text-primary text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* FAQ Accordion Section */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(31,168,160,0.06)] space-y-4">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-tertiary mt-1">
              Quick answers about clinic appointments, painless protocols, and insurance
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaq === faq.id;

              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-surface-container overflow-hidden bg-white/70"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-4 text-left flex items-center justify-between gap-3 hover:bg-surface-container-low transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-on-surface">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-primary shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 pt-1 text-xs text-on-surface-variant leading-relaxed border-t border-surface-container/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
};
