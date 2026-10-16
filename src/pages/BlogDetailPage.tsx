import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Clock,
  Calendar,
  Bookmark,
  Share2,
  ArrowRight,
  User,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { Header } from "../components/common/Header";
import { BLOG_POSTS_DATA } from "../data/blog";
import { useApp } from "../context/AppContext";

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked, showToast } = useApp();
  const [scrollProgress, setScrollProgress] = useState(0);

  const post =
    BLOG_POSTS_DATA.find((p) => p.slug === slug) || BLOG_POSTS_DATA[0];
  const bookmarked = isBookmarked(post.id);

  // Related articles
  const relatedPosts = BLOG_POSTS_DATA.filter((p) => p.id !== post.id).slice(0, 2);

  // Reading progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: `Read "${post.title}" on SmileCare Dental!`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast("Article link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-surface-container z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary-mint to-primary-container transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header showBack pageTitle="Guide" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8">
        {/* Article Header Card */}
        <article className="rounded-3xl p-6 sm:p-10 bg-white/95 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.09)] space-y-6">
          {/* Metadata Top Bar */}
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleBookmark(post.id)}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-transform hover:scale-105 cursor-pointer ${
                  bookmarked ? "bg-primary text-white" : "bg-surface-container text-primary"
                }`}
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={handleShare}
                className="w-10 h-10 rounded-full bg-surface-container text-primary flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
                aria-label="Share article"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] leading-tight">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-surface-container">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-12 h-12 rounded-2xl object-cover shadow-sm"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-on-surface">{post.author.name}</span>
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-primary font-semibold">{post.author.role}</p>
              <div className="flex items-center gap-2 text-[11px] text-tertiary mt-0.5">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {post.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {post.readTime}
                </span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden aspect-video w-full bg-surface-container-low shadow-md">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Paragraphs */}
          <div className="prose prose-teal max-w-none space-y-4 text-sm sm:text-base text-on-surface-variant leading-relaxed">
            {post.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-4 border-t border-surface-container flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-surface-container text-xs font-semibold text-tertiary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </article>

        {/* CTA: Consultation Callout */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary-mint to-primary-container text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Your Teeth?</h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-md">
              Speak with Dr. Emma Johnson or our specialists for a personalized diagnosis and dental wellness roadmap.
            </p>
          </div>
          <Link
            to="/book"
            className="px-6 py-3.5 rounded-full bg-white text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-teal-50 active:scale-95 transition-all whitespace-nowrap"
          >
            Book In-Clinic Visit
          </Link>
        </section>

        {/* Related Articles */}
        <section className="space-y-4">
          <h3 className="text-lg font-bold text-on-surface">Related Oral Wellness Guides</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.id}
                to={`/blog/${related.slug}`}
                className="p-4 rounded-3xl bg-white/90 backdrop-blur-xl border border-white shadow-sm hover:shadow-md transition-all flex items-center gap-4 group"
              >
                <img
                  src={related.image}
                  alt={related.title}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-bold text-primary uppercase">
                    {related.category}
                  </span>
                  <h4 className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 mt-0.5">
                    {related.title}
                  </h4>
                  <span className="text-[11px] text-tertiary mt-1 block">
                    {related.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
