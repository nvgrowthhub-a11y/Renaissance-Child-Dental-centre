import React, { useState } from "react";
import {
  Star,
  ShieldCheck,
  Play,
  Edit3,
  CheckCircle2,
  Filter,
  MessageSquareQuote
} from "lucide-react";
import { Header } from "../components/common/Header";
import { WriteReviewModal } from "../components/common/WriteReviewModal";
import { VideoModal } from "../components/common/VideoModal";
import { RATING_STATS, VIDEO_TESTIMONIALS } from "../data/reviews";
import { useApp } from "../context/AppContext";
import { VideoTestimonial } from "../types";

export const TestimonialsPage: React.FC = () => {
  const { reviews } = useApp();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<VideoTestimonial | null>(null);

  const filters = [
    "All",
    "5 Stars",
    "Whitening",
    "Aligners",
    "Implants",
    "Painless Care"
  ];

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === "All") return true;
    if (selectedFilter === "5 Stars") return rev.rating === 5;
    return (
      rev.treatment.toLowerCase().includes(selectedFilter.toLowerCase()) ||
      rev.comment.toLowerCase().includes(selectedFilter.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-32 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Hero Header */}
        <section className="text-center sm:text-left pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Verified Patient Feedback</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            Patient Stories & Reviews
          </h1>
          <p className="text-xs sm:text-sm text-tertiary max-w-xl leading-relaxed">
            Real smile transformations, pain-free experiences, and candid patient reflections from our clinic family.
          </p>
        </section>

        {/* Rating Breakdown Hero Card */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.08)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Big Score Block */}
            <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-white to-surface-container-low border border-surface-container/60 shadow-sm text-center">
              <span className="text-5xl font-black text-[#011e30] tracking-tight leading-none">
                {RATING_STATS.overall}
              </span>
              <div className="flex items-center gap-1 my-2 text-amber-400">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-tertiary">out of 5.0 rating</span>
              <span className="mt-2 text-xs text-primary font-bold px-3 py-1 rounded-full bg-primary/10">
                {reviews.length} Verified Reviews
              </span>
            </div>

            {/* Breakdown Progress Bars */}
            <div className="md:col-span-8 flex flex-col gap-2.5">
              {RATING_STATS.breakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs">
                  <span className="w-12 font-bold text-on-surface flex items-center gap-1">
                    <span>{item.stars}</span>
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  </span>

                  <div className="flex-1 h-3 rounded-full bg-surface-container overflow-hidden shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary-mint to-primary-container transition-all duration-1000 ease-out"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>

                  <span className="w-12 text-right font-semibold text-tertiary">
                    {item.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials Showcase */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center">
                <Play className="w-3.5 h-3.5 fill-current" />
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Video Stories</h2>
            </div>
            <span className="text-xs text-tertiary font-semibold">Tap to watch story</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {VIDEO_TESTIMONIALS.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video)}
                className="rounded-3xl p-3 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_10px_28px_rgba(31,168,160,0.14)] transition-all cursor-pointer flex flex-col group"
              >
                <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-900 mb-3">
                  <img
                    src={video.thumbnail}
                    alt={video.patientName}
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center text-white shadow-lg group-hover:scale-115 transition-transform">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold">
                    {video.duration}
                  </span>
                </div>

                <div className="px-1 pb-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-on-surface">{video.patientName}</h3>
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {video.treatment}
                    </span>
                  </div>
                  <p className="text-xs text-tertiary italic line-clamp-2">
                    {video.quote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Filter Chips & Reviews List */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-primary" />
              <h2 className="text-lg sm:text-xl font-bold text-on-surface">Patient Reviews</h2>
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all cursor-pointer ${
                    selectedFilter === filter
                      ? "bg-primary-container text-white shadow-sm"
                      : "bg-white text-tertiary hover:bg-surface-container hover:text-primary border border-surface-container"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="rounded-3xl p-5 bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] flex flex-col justify-between"
              >
                <div>
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-container to-secondary text-white font-bold text-sm flex items-center justify-center shadow-sm">
                        {rev.initials}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-on-surface">{rev.patientName}</h3>
                          {rev.verified && (
                            <CheckCircle2 className="w-4 h-4 text-primary" />
                          )}
                        </div>
                        <span className="text-[11px] text-tertiary">{rev.treatment}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-3">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-2.5 border-t border-surface-container/60 flex items-center justify-between text-[11px] text-tertiary">
                  <span>{rev.doctorName ? `Care by ${rev.doctorName}` : "SmileCare Clinic"}</span>
                  <span className="font-medium">{rev.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Floating "Write a Review" Action Button */}
      <div className="fixed bottom-20 lg:bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={() => setIsWriteModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-bold shadow-[0_10px_26px_rgba(31,168,160,0.4)] hover:brightness-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
        >
          <Edit3 className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Modals */}
      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
      />

      <VideoModal
        video={activeVideo}
        onClose={() => setActiveVideo(null)}
      />
    </div>
  );
};
