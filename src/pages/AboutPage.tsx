import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Smile,
  Star,
  CheckCircle2,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { Header } from "../components/common/Header";
import { DoctorModal } from "../components/common/DoctorModal";
import { LightboxModal } from "../components/common/LightboxModal";
import { DOCTORS_DATA } from "../data/doctors";
import { CLINIC_CONFIG } from "../config/clinic";
import { Doctor } from "../types";

export const AboutPage: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [lightboxCaption, setLightboxCaption] = useState<string>("");

  // Animated numbers state
  const [counters, setCounters] = useState({
    years: 0,
    patients: 0,
    doctors: 0,
    rating: 0
  });

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      setCounters({
        years: Math.min(15, Math.floor((start / 30) * 15)),
        patients: Math.min(10, Math.floor((start / 30) * 10)),
        doctors: Math.min(25, Math.floor((start / 30) * 25)),
        rating: Math.min(4.9, Number(((start / 30) * 4.9).toFixed(1)))
      });
      if (start >= 30) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const galleryImages = [
    {
      url: CLINIC_CONFIG.clinicInterior,
      caption: "Our modern, skylit dental sanctuary and ergonomic patient suites."
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEBFWyg-J8ziS3WuIcfbtD57Eks6WIS07v6ncVQNTpETNvZCyzijCteJ_YyfvsWEihh0y5bPwUzXBBQclymLx5aH5PGxFKPcDKLJUB4WlZWxYTGJK0EsjJmU3efrHr9grzGpBvfCoXPzwwDBhLGkjlTK1_0Tq8jmG_q_F02JcwKL9oKkA9s5Fc9VPYjUjxSOALVTvfpX8dp-N1PkhMQuowXcx37Is0aUuJpLAgRkUfCz056B07HwL4Q",
      caption: "Sterile surgical operatory with 3D CBCT digital scanner."
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLL53Vt43l_EqeYQyfzfgUf_jw7AVz1NCTeRjpyR0WUwxy50ir5Sj1y-HoCtLYKYyxZMmQcwPsqQhawMF0lu_TjmgyzTNuUjsPv-fg1EzcawY7lH5ARnqp4nPOWfC3l_zTTxOZR-Dm2DpLawrlV-XLWGhhMwAjUzyv8sUdUAaVq4p7D1v5pcBC8RDsiq6YhuRUWKd1NVFt36ZlYJsoWoqOgtlPqcQrYRQk5cUsaguy0NvVH8QVpjTNw",
      caption: "High-definition aesthetic smile design lab."
    },
    {
      url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCUjUS9RAW-7Qf1tsVxvYN1evTKVdMx2nKiDGnjhTJmE6Ha1upryfztZ_LljBA0Szn2aYiJgAN4cxjbeH_9undfV9yacN-iQL3XXMUAXVuQ7hwW_thvB32KRcRKBgbaRb0Xa086r_Z8gNtGMt_Yv7UZkD9VN_tQrwO05B1csOxgDHEfpW5OxFmgMreGpRzAWooO5hASE-Se_Gsehu8Nonjz26Dnj4FYjhc_aDbMiQE9D00RxBhmYn0X5o_LdjJ6QuCZT8M",
      caption: "Relaxing pediatric dental lounge with anxiety-free amenities."
    }
  ];

  const openLightbox = (url: string, caption: string) => {
    setLightboxImage(url);
    setLightboxCaption(caption);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Top Hero Section */}
        <section className="relative rounded-3xl p-6 sm:p-10 overflow-hidden bg-gradient-to-br from-white/95 via-surface-container-low/80 to-surface-container/60 shadow-[0_10px_30px_rgba(31,168,160,0.08)] backdrop-blur-xl border border-white">
          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Our Clinic & Mission</span>
            </div>

            <div className="max-w-2xl space-y-2">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight leading-tight">
                Caring for Smiles Since 2010
              </h1>
              <p className="text-sm sm:text-base text-tertiary leading-relaxed">
                Dedicated to gentle, technologically advanced dental wellness that makes every visit relaxed, human, and empowering. We eliminate clinical anxiety through transparent communication, cutting-edge technology, and genuine human warmth.
              </p>
            </div>

            {/* Clinic Hero Banner with Lightbox trigger */}
            <div
              onClick={() => openLightbox(CLINIC_CONFIG.clinicInterior, "SmileCare flagship dental sanctuary")}
              className="w-full mt-2 rounded-2xl overflow-hidden relative shadow-md group cursor-pointer"
            >
              <img
                src={CLINIC_CONFIG.clinicInterior}
                alt="SmileCare Dental Clinic Sanctuary"
                className="w-full h-52 sm:h-80 object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-4 sm:p-6 text-white">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-teal-300" />
                  <span className="text-xs sm:text-sm font-semibold">
                    Certified Center of Dental Excellence • San Francisco
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs bg-white/20 backdrop-blur-md px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Tap to Enlarge</span>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Animated Key Metrics Row */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-lg shadow-[0_4px_16px_rgba(31,168,160,0.06)] border border-white flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-2">
              <Award className="w-5 h-5" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              {counters.years}+
            </span>
            <span className="text-xs sm:text-sm font-bold text-on-surface mt-1">Years of Care</span>
            <span className="text-[11px] text-tertiary">Clinical excellence</span>
          </div>

          <div className="rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-lg shadow-[0_4px_16px_rgba(31,168,160,0.06)] border border-white flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary mb-2">
              <Smile className="w-5 h-5" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              {counters.patients}k+
            </span>
            <span className="text-xs sm:text-sm font-bold text-on-surface mt-1">Happy Smiles</span>
            <span className="text-[11px] text-tertiary">Patients revitalized</span>
          </div>

          <div className="rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-lg shadow-[0_4px_16px_rgba(31,168,160,0.06)] border border-white flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-secondary mb-2">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
              {counters.doctors}+
            </span>
            <span className="text-xs sm:text-sm font-bold text-on-surface mt-1">Specialists</span>
            <span className="text-[11px] text-tertiary">Certified team</span>
          </div>

          <div className="rounded-3xl p-5 sm:p-6 bg-white/90 backdrop-blur-lg shadow-[0_4px_16px_rgba(31,168,160,0.06)] border border-white flex flex-col items-center text-center">
            <div className="w-11 h-11 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container mb-2">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
              {counters.rating.toFixed(1)}
            </span>
            <span className="text-xs sm:text-sm font-bold text-on-surface mt-1">Star Rating</span>
            <span className="text-[11px] text-tertiary">328+ Verified reviews</span>
          </div>
        </section>

        {/* Guiding Pillars */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">Our Guiding Pillars</h2>
            <span className="text-xs font-semibold text-tertiary">Philosophy of Care</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-3xl p-6 bg-white/85 backdrop-blur-xl border border-white shadow-sm flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">Gentle Precision</h3>
                <p className="text-xs sm:text-sm text-tertiary leading-relaxed">
                  Redefining clinical care through gentle laser protocols, micro-dentistry, and sincere human warmth that calms anxiety. We treat patients, not just teeth.
                </p>
              </div>
            </div>

            <div className="rounded-3xl p-6 bg-white/85 backdrop-blur-xl border border-white shadow-sm flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-on-surface">Lifelong Confidence</h3>
                <p className="text-xs sm:text-sm text-tertiary leading-relaxed">
                  Empowering our community with preventive habits, proactive oral wellness plans, and smile transformations engineered to endure for decades.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Specialists Team (Cards open DoctorModal) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Meet Our Specialists</h2>
              <p className="text-xs text-tertiary">Click any doctor card to view bio & book a consultation</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
              Active Faculty
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCTORS_DATA.map((doc) => (
              <div
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className="rounded-3xl p-5 bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.06)] hover:shadow-[0_12px_32px_rgba(31,168,160,0.14)] transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center shadow-sm">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h3 className="text-base sm:text-lg font-bold text-on-surface truncate group-hover:text-primary transition-colors">
                        {doc.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-primary-container shrink-0">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{doc.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-primary">{doc.role}</p>
                    <p className="text-[11px] text-tertiary mt-0.5">{doc.education}</p>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                      {doc.bio}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-bold text-primary">
                  <span>View Full Profile</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Book with this Doctor <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Clinic Photo Gallery (Opens in Lightbox) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Clinic Tour & Gallery</h2>
              <p className="text-xs text-tertiary">Take a look inside our calming, serene clinical suites</p>
            </div>
            <span className="text-xs text-tertiary">Tap to view</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(img.url, img.caption)}
                className="relative rounded-2xl overflow-hidden aspect-video sm:aspect-square bg-surface-container-low shadow-sm cursor-pointer group"
              >
                <img
                  src={img.url}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Maximize2 className="w-6 h-6" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary-mint to-primary-container text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Ready to Experience Relaxed Dental Care?</h3>
            <p className="text-xs sm:text-sm text-teal-100">
              Schedule your first appointment today. Free cancellation up to 4 hours in advance.
            </p>
          </div>
          <Link
            to="/book"
            className="px-6 py-3.5 rounded-full bg-white text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-teal-50 active:scale-95 transition-all whitespace-nowrap"
          >
            Book Free Consultation
          </Link>
        </section>
      </main>

      {/* Doctor Modal */}
      <DoctorModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
      />

      {/* Lightbox Modal */}
      <LightboxModal
        imageUrl={lightboxImage}
        caption={lightboxCaption}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
};
