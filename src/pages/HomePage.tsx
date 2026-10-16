import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  Sparkles,
  UserCheck,
  PhoneCall,
  Clock,
  ArrowRight,
  Star,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Heart,
  Share2
} from "lucide-react";
import { Header } from "../components/common/Header";
import { SearchBar } from "../components/common/SearchBar";
import { DoctorModal } from "../components/common/DoctorModal";
import { SERVICES_DATA } from "../data/services";
import { DOCTORS_DATA } from "../data/doctors";
import { BLOG_POSTS_DATA } from "../data/blog";
import { CLINIC_CONFIG } from "../config/clinic";
import { useApp } from "../context/AppContext";
import { Doctor } from "../types";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { latestUpcomingAppointment, toggleFavorite, isFavorite, showToast } = useApp();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  const handleShare = (title: string, path: string) => {
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out ${title} at SmileCare Dental!`,
        url: window.location.origin + path
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.origin + path);
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-6 sm:space-y-8">
        {/* Global Search Bar with Live Suggestions */}
        <section className="pt-2">
          <SearchBar placeholder="Search dentists, treatments (whitening, aligners)..." />
        </section>

        {/* Hero Promotional Frosted Glass Card */}
        <section className="relative overflow-hidden rounded-[28px] sm:rounded-3xl bg-gradient-to-br from-white/95 via-surface-container-low/80 to-secondary-container/25 backdrop-blur-xl shadow-[0_12px_36px_rgba(31,168,160,0.12)] border border-white/90 p-5 sm:p-8">
          {/* Ambient luminous glow auras */}
          <div className="absolute -right-8 -top-8 w-56 h-56 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none" />
          <div className="absolute -left-6 -bottom-6 w-44 h-44 rounded-full bg-primary-fixed/30 blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Promotional Content */}
            <div className="flex flex-col sm:max-w-[62%] text-center sm:text-left items-center sm:items-start">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span>Painless Dental Technology</span>
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#011e30] leading-tight tracking-tight">
                A Healthy Smile Reflects a <span className="text-primary">Healthy You</span>
              </h1>

              <p className="text-xs sm:text-sm text-tertiary mt-2 max-w-md leading-relaxed">
                Expert dental care with gentle precision, certified specialists, and transparent pricing designed to keep your family smiling bright.
              </p>

              <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  to="/book"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-semibold shadow-[0_8px_20px_rgba(31,168,160,0.35)] hover:brightness-105 active:scale-95 transition-all"
                >
                  <span>Book Appointment</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/why-us"
                  className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-white/80 hover:bg-white text-on-surface text-xs sm:text-sm font-semibold border border-surface-container shadow-sm transition-all"
                >
                  <span>See Clinical Results</span>
                </Link>
              </div>
            </div>

            {/* Right 3D Visual Shield Motif */}
            <div className="relative flex items-center justify-center shrink-0 w-36 h-36 sm:w-44 sm:h-44">
              <div className="relative w-32 h-36 sm:w-36 sm:h-40 rounded-[28px] bg-gradient-to-b from-primary-fixed/40 via-white/80 to-secondary-container/30 backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_10px_28px_rgba(0,106,101,0.12)] border border-white p-3">
                {/* Luminous Tooth Graphic */}
                <img
                  src={CLINIC_CONFIG.heroTooth3D}
                  alt="SmileCare 3D Tooth"
                  className="w-24 h-24 object-contain filter drop-shadow-[0_8px_16px_rgba(31,168,160,0.3)] animate-float-slow"
                />
                <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-white shadow-md">
                  <ShieldCheck className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid (4 Tiles) */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Find Dentist */}
          <button
            onClick={() => {
              const el = document.getElementById("specialists-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
              else navigate("/about");
            }}
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_4px_16px_rgba(31,168,160,0.06)] hover:bg-white hover:shadow-[0_8px_24px_rgba(31,168,160,0.14)] border border-white transition-all active:scale-95 cursor-pointer text-center"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
              <UserCheck className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm text-on-surface font-bold mt-2.5 leading-tight">
              Find Dentist
            </span>
            <span className="text-[10px] text-tertiary mt-0.5">Top Specialists</span>
          </button>

          {/* Appointments */}
          <Link
            to="/appointments"
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_4px_16px_rgba(31,168,160,0.06)] hover:bg-white hover:shadow-[0_8px_24px_rgba(31,168,160,0.14)] border border-white transition-all active:scale-95 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm text-on-surface font-bold mt-2.5 leading-tight">
              Appointments
            </span>
            <span className="text-[10px] text-tertiary mt-0.5">Track & Reschedule</span>
          </Link>

          {/* Treatments */}
          <Link
            to="/services"
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_4px_16px_rgba(31,168,160,0.06)] hover:bg-white hover:shadow-[0_8px_24px_rgba(31,168,160,0.14)] border border-white transition-all active:scale-95 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary-container group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-xs sm:text-sm text-on-surface font-bold mt-2.5 leading-tight">
              Treatments
            </span>
            <span className="text-[10px] text-tertiary mt-0.5">Full Catalog</span>
          </Link>

          {/* Emergency Hotline */}
          <a
            href={CLINIC_CONFIG.tollFreeLink}
            className="group flex flex-col items-center justify-center p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-[0_4px_16px_rgba(31,168,160,0.06)] hover:bg-white hover:shadow-[0_8px_24px_rgba(31,168,160,0.14)] border border-white transition-all active:scale-95 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <span className="text-xs sm:text-sm text-on-surface font-bold mt-2.5 leading-tight">
              Emergency
            </span>
            <span className="text-[10px] text-red-600 font-semibold mt-0.5">24/7 On-Call</span>
          </a>
        </section>

        {/* Upcoming Appointment Section (Live localStorage binding) */}
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base sm:text-lg font-bold text-on-surface tracking-tight">
              Upcoming Appointment
            </h2>
            <Link
              to="/appointments"
              className="text-xs font-bold text-primary flex items-center gap-0.5 hover:text-on-primary-container transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {latestUpcomingAppointment ? (
            <div className="relative rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-white/95 to-surface-container-low/75 backdrop-blur-xl shadow-[0_10px_28px_rgba(31,168,160,0.09)] border border-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={latestUpcomingAppointment.doctorImage}
                      alt={latestUpcomingAppointment.doctorName}
                      className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-container text-white rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                      {latestUpcomingAppointment.serviceName}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-on-surface truncate">
                      {latestUpcomingAppointment.doctorName}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-tertiary mt-1">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {latestUpcomingAppointment.displayDate}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        {latestUpcomingAppointment.timeSlot}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <Link
                    to="/appointments"
                    className="px-4 py-2 rounded-full bg-surface-container text-primary text-xs font-bold hover:bg-secondary-container transition-colors"
                  >
                    Manage
                  </Link>
                  <a
                    href={CLINIC_CONFIG.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl p-6 bg-white/70 backdrop-blur-md border border-white text-center flex flex-col items-center justify-center">
              <Calendar className="w-10 h-10 text-primary-container/60 mb-2" />
              <p className="text-sm font-semibold text-on-surface">No upcoming appointment scheduled</p>
              <p className="text-xs text-tertiary mt-0.5">Schedule a routine checkup or treatment consultation in seconds.</p>
              <Link
                to="/book"
                className="mt-3 px-5 py-2 rounded-full bg-primary-container text-white text-xs font-bold shadow-md hover:bg-primary transition-all"
              >
                Book Appointment Now
              </Link>
            </div>
          )}
        </section>

        {/* Popular Treatments Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Popular Dental Treatments</h2>
              <p className="text-xs text-tertiary">Precision procedures tailored for radiant healthy smiles</p>
            </div>
            <Link
              to="/services"
              className="text-xs font-bold text-primary flex items-center gap-0.5 hover:text-on-primary-container transition-colors"
            >
              <span>View All (8)</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES_DATA.slice(0, 3).map((service) => {
              const favorited = isFavorite(service.id);

              return (
                <div
                  key={service.id}
                  className="rounded-3xl p-5 bg-white/85 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] flex flex-col justify-between hover:shadow-[0_12px_32px_rgba(31,168,160,0.16)] transition-all group"
                >
                  <div>
                    {/* Top row */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-[11px] font-bold uppercase tracking-wider">
                        {service.category}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleFavorite(service.id)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                            favorited
                              ? "bg-red-50 text-red-500"
                              : "bg-surface-container text-tertiary hover:text-red-500"
                          }`}
                          aria-label="Save to favorites"
                        >
                          <Heart className={`w-4 h-4 ${favorited ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={() => handleShare(service.title, `/services/${service.id}`)}
                          className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-primary transition-colors cursor-pointer"
                          aria-label="Share service"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Image & Title */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-16 h-16 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-base font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-xs text-tertiary line-clamp-1">{service.subtitle}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs">
                          <span className="font-extrabold text-primary text-sm">{service.price}</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-tertiary">{service.duration}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                      {service.about}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-surface-container/60">
                    <Link
                      to={`/services/${service.id}`}
                      className="flex-1 py-2 text-center text-xs font-bold text-primary hover:bg-surface-container-low rounded-full transition-colors"
                    >
                      Details & Pricing
                    </Link>
                    <Link
                      to={`/book?service=${service.id}`}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Specialists Faculty (Section with Doctor Modal) */}
        <section id="specialists-section" className="space-y-4 pt-2">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Meet Our Specialists</h2>
              <p className="text-xs text-tertiary">Board-certified leaders committed to gentle, comforting care</p>
            </div>
            <Link
              to="/about"
              className="text-xs font-bold text-primary flex items-center gap-0.5 hover:text-on-primary-container transition-colors"
            >
              <span>All Doctors</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOCTORS_DATA.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="rounded-3xl p-4 bg-white/85 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="relative mb-3 rounded-2xl overflow-hidden aspect-square bg-surface-container-low">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[11px] font-bold text-on-surface shadow-sm">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{doc.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] font-semibold text-primary truncate">{doc.role}</p>
                  <p className="text-[10px] text-tertiary mt-0.5">{doc.experience}</p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-surface-container flex items-center justify-between text-xs text-primary font-bold">
                  <span>View Profile & Bio</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Quick Banner */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary to-[#004f4c] text-white shadow-[0_12px_36px_rgba(0,106,101,0.25)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold uppercase tracking-wider inline-block">
              Why Patients Choose SmileCare
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              100% Painless Laser Care & 3D Interactive Smile Previews
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-xl">
              See what your smile will look like before you begin. Join over 10,000 satisfied patients across San Francisco.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/why-us"
              className="px-5 py-3 rounded-full bg-white text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-teal-50 transition-all cursor-pointer"
            >
              Interactive Slider & Stats
            </Link>
            <Link
              to="/testimonials"
              className="px-5 py-3 rounded-full bg-white/20 text-white hover:bg-white/30 text-xs sm:text-sm font-bold transition-all"
            >
              Patient Reviews
            </Link>
          </div>
        </section>

        {/* Latest Dental Guides Preview */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Oral Wellness Guides</h2>
              <p className="text-xs text-tertiary">Doctor-verified tips for long-lasting smile health</p>
            </div>
            <Link
              to="/blog"
              className="text-xs font-bold text-primary flex items-center gap-0.5 hover:text-on-primary-container transition-colors"
            >
              <span>Explore Blog</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BLOG_POSTS_DATA.slice(0, 2).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="rounded-3xl p-4 bg-white/85 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] transition-all flex flex-col sm:flex-row gap-4 group"
              >
                <div className="w-full sm:w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-surface-container-low">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 min-w-0">
                  <div>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {post.category} • {post.readTime}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mt-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-1">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-[11px] text-tertiary">
                    <span>{post.author.name}</span>
                    <span className="text-primary font-semibold flex items-center gap-0.5">
                      Read Guide <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Doctor detail modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />
    </div>
  );
};
