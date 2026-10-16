import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Send, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { CLINIC_CONFIG, isClinicOpenNow } from "../../config/clinic";
import { useApp } from "../../context/AppContext";

export const Footer: React.FC = () => {
  const { showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const status = isClinicOpenNow();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterEmail("");
      showToast("Thank you for subscribing to SmileCare oral wellness tips!");
    }, 800);
  };

  return (
    <footer className="bg-gradient-to-b from-surface via-surface-container-low to-surface-container/60 border-t border-primary-container/15 pt-12 pb-24 lg:pb-12 text-on-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-surface-container">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={CLINIC_CONFIG.logoUrl}
                alt="SmileCare Logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <span className="font-extrabold text-xl text-[#011e30] tracking-tight block">
                  {CLINIC_CONFIG.name}
                </span>
                <span className="text-xs text-primary font-semibold">
                  {CLINIC_CONFIG.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-tertiary max-w-sm leading-relaxed">
              Pioneering gentle, technologically advanced dental wellness that makes every visit relaxed, human, and empowering. Experience pain-free dentistry with complete care transparency.
            </p>

            {/* Live Clinic Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-primary-container/30 shadow-sm text-xs">
              <span
                className={`w-2 h-2 rounded-full ${
                  status.isOpen ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                }`}
              />
              <span className="font-bold text-[#011e30]">{status.message}</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-2">
              {CLINIC_CONFIG.socialLinks.map((soc) => (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white shadow-sm border border-surface-container flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all cursor-pointer"
                  title={soc.name}
                  aria-label={soc.name}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {soc.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#011e30] uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-tertiary">
              <li>
                <Link to="/home" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Our Team
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary transition-colors">
                  All Treatments
                </Link>
              </li>
              <li>
                <Link to="/why-us" className="hover:text-primary transition-colors">
                  Why Choose Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-primary transition-colors">
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors">
                  Dental Health Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Patient Care */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#011e30] uppercase tracking-wider">
              Patient Care
            </h4>
            <ul className="space-y-2 text-sm text-tertiary">
              <li>
                <Link to="/book" className="hover:text-primary font-semibold text-primary transition-colors flex items-center gap-1">
                  <span>Book Appointment</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link to="/appointments" className="hover:text-primary transition-colors">
                  My Appointments
                </Link>
              </li>
              <li>
                <Link to="/offers" className="hover:text-primary transition-colors">
                  Special Packages & Offers
                </Link>
              </li>
              <li>
                <Link to="/messages" className="hover:text-primary transition-colors">
                  Care Concierge Chat
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact & Locations
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-primary transition-colors">
                  Patient Records & Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#011e30] uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2 text-xs text-tertiary">
              <a
                href={CLINIC_CONFIG.phoneLink}
                className="flex items-center gap-2 hover:text-primary font-semibold text-sm text-[#011e30] transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>{CLINIC_CONFIG.phoneFormatted}</span>
              </a>

              <a
                href={CLINIC_CONFIG.tollFreeLink}
                className="block hover:text-primary transition-colors"
              >
                Toll-free: {CLINIC_CONFIG.tollFree}
              </a>

              <a
                href={CLINIC_CONFIG.emailLink}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4 text-primary" />
                <span>{CLINIC_CONFIG.email}</span>
              </a>

              <a
                href={CLINIC_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary transition-colors pt-1"
              >
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>{CLINIC_CONFIG.address}</span>
              </a>
            </div>

            {/* Newsletter */}
            <div className="pt-2">
              <span className="block text-xs font-semibold text-[#011e30] mb-1.5">
                Dental Wellness Newsletter
              </span>
              <form onSubmit={handleNewsletterSubmit} className="relative flex items-center">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full h-10 pl-3 pr-10 rounded-full bg-white border border-surface-container text-xs text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container"
                />
                <button
                  type="submit"
                  disabled={isSubscribing}
                  className="absolute right-1 w-8 h-8 rounded-full bg-primary-container text-white flex items-center justify-center hover:bg-primary transition-colors cursor-pointer"
                  aria-label="Subscribe to newsletter"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-tertiary">
          <p>© {new Date().getFullYear()} SmileCare Dental Clinic. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>HIPAA Compliant & Hospital Grade Sterilization</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <span>Made with care</span>
              <Heart className="w-3 h-3 text-red-500 fill-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
