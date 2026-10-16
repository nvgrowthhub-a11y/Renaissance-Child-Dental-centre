import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Bookmark,
  Share2,
  Clock,
  Sparkles,
  ArrowRight,
  BookOpen,
  Send,
  X
} from "lucide-react";
import { Header } from "../components/common/Header";
import { BLOG_POSTS_DATA } from "../data/blog";
import { useApp } from "../context/AppContext";

export const BlogPage: React.FC = () => {
  const { toggleBookmark, isBookmarked, showToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All Articles");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const categories = [
    "All Articles",
    "Oral Hygiene",
    "Teeth Whitening",
    "Aligners & Braces",
    "Kids Dental"
  ];

  const filteredPosts = BLOG_POSTS_DATA.filter((post) => {
    const matchesCategory =
      selectedCategory === "All Articles" || post.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const featuredPost = BLOG_POSTS_DATA.find((p) => p.isFeatured) || BLOG_POSTS_DATA[0];

  const handleShare = (e: React.MouseEvent, title: string, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${window.location.origin}/blog/${slug}`;
    if (navigator.share) {
      navigator.share({
        title,
        text: `Check out this guide from SmileCare: ${title}`,
        url
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      showToast("Article link copied to clipboard!");
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setNewsletterEmail("");
    showToast("Thank you for subscribing to SmileCare Guides!");
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Intro */}
        <section className="text-center sm:text-left pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-primary" />
            <span>Oral Wellness Library</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            Dental Health Guides & Insights
          </h1>
          <p className="text-xs sm:text-sm text-tertiary max-w-xl leading-relaxed">
            Evidence-backed advice, brushing techniques, myth busters, and treatment tips curated by our dental faculty.
          </p>
        </section>

        {/* Search & Categories Filter */}
        <section className="space-y-3">
          <div className="relative flex items-center w-full h-12 rounded-full bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(31,168,160,0.06)] px-4 border border-white">
            <Search className="w-5 h-5 text-primary shrink-0 mr-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, enamel, braces, whitening..."
              className="w-full bg-transparent text-sm text-on-surface placeholder:text-tertiary focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-on-surface cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shrink-0 transition-all cursor-pointer ${
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

        {/* Featured Guide Banner (Editor's Pick) */}
        {selectedCategory === "All Articles" && !searchQuery && (
          <section className="relative rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white shadow-[0_12px_36px_rgba(31,168,160,0.12)]">
            <div className="relative w-full h-64 sm:h-80 overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#011e30]/90 via-[#011e30]/40 to-transparent" />

              {/* Floating Tag */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
                <span className="text-xs font-bold text-primary uppercase">
                  Editor's Pick • {featuredPost.readTime}
                </span>
              </div>

              {/* Bookmark on image */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBookmark(featuredPost.id);
                }}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer ${
                  isBookmarked(featuredPost.id)
                    ? "bg-primary text-white"
                    : "bg-white/80 text-on-surface hover:bg-white"
                }`}
                aria-label="Bookmark article"
              >
                <Bookmark className={`w-5 h-5 ${isBookmarked(featuredPost.id) ? "fill-current" : ""}`} />
              </button>

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white space-y-1">
                <span className="inline-block px-3 py-1 rounded-lg bg-teal-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider mb-1">
                  {featuredPost.category}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold leading-tight">
                  {featuredPost.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <p className="text-xs sm:text-sm text-on-surface-variant max-w-xl leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="flex items-center gap-2.5">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <span className="block text-xs font-bold text-on-surface">
                      {featuredPost.author.name}
                    </span>
                    <span className="text-[11px] text-tertiary">
                      {featuredPost.date}
                    </span>
                  </div>
                </div>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs sm:text-sm font-semibold shadow-md flex items-center gap-1.5 hover:brightness-105 active:scale-95 transition-all"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Article Cards Grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg sm:text-xl font-bold text-on-surface">
              {selectedCategory === "All Articles" ? "All Oral Guides" : `${selectedCategory}`}
            </h2>
            <span className="text-xs text-tertiary font-semibold">
              {filteredPosts.length} Guides Found
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => {
              const bookmarked = isBookmarked(post.id);

              return (
                <div
                  key={post.id}
                  className="rounded-3xl overflow-hidden bg-white/90 backdrop-blur-xl border border-white shadow-[0_6px_20px_rgba(31,168,160,0.06)] hover:shadow-[0_12px_28px_rgba(31,168,160,0.14)] transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Media */}
                    <div className="relative w-full h-44 overflow-hidden bg-surface-container-low">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold uppercase tracking-wider shadow-sm">
                        {post.category}
                      </span>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(post.id);
                        }}
                        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer ${
                          bookmarked
                            ? "bg-primary text-white"
                            : "bg-white/80 text-tertiary hover:text-primary"
                        }`}
                        aria-label="Bookmark article"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center gap-1.5 text-[11px] text-tertiary mb-1.5">
                        <Clock className="w-3.5 h-3.5 text-primary" />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>

                      <Link
                        to={`/blog/${post.slug}`}
                        className="text-base font-bold text-on-surface hover:text-primary transition-colors line-clamp-2 leading-snug"
                      >
                        {post.title}
                      </Link>

                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-5 pb-5 pt-2 border-t border-surface-container/60 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <span className="font-semibold text-on-surface">{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => handleShare(e, post.title, post.slug)}
                        className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-primary cursor-pointer"
                        aria-label="Share article"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="font-bold text-primary hover:underline flex items-center gap-0.5"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Newsletter Callout Card */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary to-[#004f4c] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Stay Updated with Oral Care Guides</h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-md">
              Receive monthly clinical guides, home care routines, and exclusive dental checkup discount coupons.
            </p>
          </div>

          <form onSubmit={handleNewsletter} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 min-w-[200px] h-11 px-4 rounded-full bg-white text-on-surface text-xs placeholder:text-tertiary focus:outline-none"
            />
            <button
              type="submit"
              className="px-5 h-11 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};
