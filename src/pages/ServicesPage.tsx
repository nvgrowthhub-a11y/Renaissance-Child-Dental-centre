import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Heart,
  Share2,
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  X
} from "lucide-react";
import { Header } from "../components/common/Header";
import { SERVICES_DATA } from "../data/services";
import { useApp } from "../context/AppContext";
import { ServiceCategory } from "../types";

export const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories: ServiceCategory[] = [
    "All",
    "Cosmetic",
    "General",
    "Orthodontics",
    "Surgery",
    "Pediatric"
  ];

  const filteredServices = SERVICES_DATA.filter((service) => {
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.about.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleShare = (serviceTitle: string, serviceId: string) => {
    const url = `${window.location.origin}/services/${serviceId}`;
    if (navigator.share) {
      navigator.share({
        title: `${serviceTitle} - SmileCare`,
        text: `Check out ${serviceTitle} treatment at SmileCare Dental Clinic!`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast("Treatment link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-6 sm:space-y-8">
        {/* Page Title & Intro */}
        <section className="text-center sm:text-left pt-2">
          <span className="inline-block px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider mb-2">
            Clinical Catalog
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            Comprehensive Dental Services
          </h1>
          <p className="text-xs sm:text-sm text-tertiary mt-1.5 max-w-xl">
            From laser teeth whitening to invisible aligners and guided implants, explore all treatments tailored to your comfort.
          </p>
        </section>

        {/* Live Search & Filter Bar */}
        <section className="space-y-3">
          <div className="relative flex items-center w-full h-12 rounded-full bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(31,168,160,0.06)] px-4 border border-white">
            <Search className="w-5 h-5 text-primary shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search treatments, symptoms, duration..."
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-tertiary focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-on-surface"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal Category Filter Chips with Animated Highlight */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary-container text-white shadow-[0_6px_16px_rgba(31,168,160,0.35)]"
                      : "bg-white/80 backdrop-blur-md text-tertiary hover:bg-white hover:text-primary shadow-sm"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Special Showcase Card (Teeth Whitening) */}
        {selectedCategory === "All" && !searchQuery && (
          <section className="relative w-full rounded-3xl bg-gradient-to-br from-white/95 to-surface-container-low/80 backdrop-blur-xl shadow-[0_12px_32px_rgba(31,168,160,0.12)] border border-white p-6 sm:p-8 overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Featured Special
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleFavorite("teeth-whitening")}
                  className={`w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                    isFavorite("teeth-whitening")
                      ? "bg-red-50 text-red-500"
                      : "bg-white text-primary"
                  }`}
                  aria-label="Favorite featured treatment"
                >
                  <Heart className={`w-4 h-4 ${isFavorite("teeth-whitening") ? "fill-current" : ""}`} />
                </button>
                <button
                  onClick={() => handleShare("Teeth Whitening", "teeth-whitening")}
                  className="w-9 h-9 rounded-full bg-white text-primary flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
                  aria-label="Share featured treatment"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center sm:text-left sm:max-w-md">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#011e30] leading-tight">
                  Teeth <span className="text-primary">Whitening</span>
                </h2>
                <p className="text-xs sm:text-sm text-tertiary">
                  Brighter Smile, Greater Confidence in under 60 minutes with safe cold-light laser activation.
                </p>

                {/* 3 Mini Pillars */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div className="p-2.5 rounded-2xl bg-white/70 text-center shadow-sm">
                    <span className="block text-[10px] text-tertiary">Duration</span>
                    <span className="text-xs font-bold text-on-surface">45-60m</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/70 text-center shadow-sm">
                    <span className="block text-[10px] text-tertiary">Sessions</span>
                    <span className="text-xs font-bold text-on-surface">1 - 2</span>
                  </div>
                  <div className="p-2.5 rounded-2xl bg-white/70 text-center shadow-sm">
                    <span className="block text-[10px] text-tertiary">Results</span>
                    <span className="text-xs font-bold text-on-surface">Instant</span>
                  </div>
                </div>

                <div className="pt-3 flex items-center gap-3">
                  <Link
                    to="/services/teeth-whitening"
                    className="px-5 py-2.5 rounded-full bg-white text-primary text-xs font-bold border border-surface-container shadow-sm hover:bg-surface-container-low transition-colors"
                  >
                    View Details
                  </Link>
                  <Link
                    to="/book?service=teeth-whitening"
                    className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs font-bold shadow-md hover:brightness-105 transition-all"
                  >
                    Book Now ($150)
                  </Link>
                </div>
              </div>

              <div className="w-40 h-40 sm:w-48 sm:h-48 relative flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-2xl" />
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpc804NWYJDx9YGiaxcCQyiwdA_eac8BtJHPinp146dpg05FNsYg6wwZaJUzbLVMwpP7LeTBXdqF_UmwOE36RSzBnsCdj6r4nq57k5OWPHFMhj-KP1crR-8h4tX5TeGqI5mMc3v6cvb3R-auqEZMAJhIJfK1w0UkdxVnsypQgjjJIcsbvAw5Y8zh73P0JxdPm41DfvJTfOus85rK3-zZ9Ilwe6x6APgMLgCRSH50Mf8fginQlrHceS_Q"
                  alt="3D Teeth Whitening Model"
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(31,168,160,0.3)] animate-float-slow"
                />
              </div>
            </div>
          </section>
        )}

        {/* Services List / Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              {selectedCategory === "All" ? "All Treatments Catalog" : `${selectedCategory} Treatments`}
            </h2>
            <span className="text-xs font-semibold text-tertiary">
              {filteredServices.length} {filteredServices.length === 1 ? "treatment" : "treatments"} available
            </span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="p-8 text-center rounded-3xl bg-white/70 border border-white">
              <p className="text-sm font-semibold text-on-surface">No treatments match your criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-2 text-xs font-bold text-primary hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredServices.map((service) => {
                  const favorited = isFavorite(service.id);

                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-3xl p-4 sm:p-5 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_12px_32px_rgba(31,168,160,0.14)] transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Top header row inside card */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-3 py-0.5 rounded-full bg-surface-container text-primary text-[11px] font-bold uppercase tracking-wider">
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
                              onClick={() => handleShare(service.title, service.id)}
                              className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-primary transition-colors cursor-pointer"
                              aria-label="Share treatment"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Title & Image row */}
                        <div className="flex items-center gap-4 mb-3">
                          <div className="w-16 h-16 rounded-2xl bg-surface-container-low p-2 flex items-center justify-center shrink-0">
                            <img
                              src={service.image}
                              alt={service.title}
                              className="w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                            />
                          </div>

                          <div className="min-w-0">
                            <Link
                              to={`/services/${service.id}`}
                              className="text-base font-bold text-on-surface hover:text-primary transition-colors block truncate"
                            >
                              {service.title}
                            </Link>
                            <p className="text-xs text-tertiary line-clamp-1">{service.subtitle}</p>

                            <div className="flex items-center gap-2 mt-1 text-xs">
                              <span className="font-extrabold text-primary text-sm">{service.price}</span>
                              <span className="text-gray-300">•</span>
                              <span className="text-tertiary flex items-center gap-0.5">
                                <Clock className="w-3 h-3 text-primary" /> {service.duration}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-xs text-on-surface-variant line-clamp-2 mb-4 leading-relaxed">
                          {service.about}
                        </p>
                      </div>

                      {/* Card bottom buttons */}
                      <div className="flex items-center gap-2 pt-3 border-t border-surface-container/60">
                        <Link
                          to={`/services/${service.id}`}
                          className="flex-1 py-2 text-center text-xs font-bold text-primary hover:bg-surface-container-low rounded-full transition-colors"
                        >
                          View Details
                        </Link>
                        <Link
                          to={`/book?service=${service.id}`}
                          className="px-5 py-2 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <span>Book</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
