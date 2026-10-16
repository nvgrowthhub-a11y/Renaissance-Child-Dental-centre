import React, { useState, useRef, useEffect } from "react";
import { Search, Sparkles, User, BookOpen, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SERVICES_DATA } from "../../data/services";
import { DOCTORS_DATA } from "../../data/doctors";
import { BLOG_POSTS_DATA } from "../../data/blog";

export const SearchBar: React.FC<{ placeholder?: string; autoFocus?: boolean }> = ({
  placeholder = "Search dentists, treatments, guides...",
  autoFocus = false
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Filter items
  const cleanQuery = query.toLowerCase().trim();

  const matchedServices = cleanQuery
    ? SERVICES_DATA.filter(
        (s) =>
          s.title.toLowerCase().includes(cleanQuery) ||
          s.subtitle.toLowerCase().includes(cleanQuery) ||
          s.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 3)
    : [];

  const matchedDoctors = cleanQuery
    ? DOCTORS_DATA.filter(
        (d) =>
          d.name.toLowerCase().includes(cleanQuery) ||
          d.role.toLowerCase().includes(cleanQuery) ||
          d.specialties.some((sp) => sp.toLowerCase().includes(cleanQuery))
      ).slice(0, 2)
    : [];

  const matchedBlogs = cleanQuery
    ? BLOG_POSTS_DATA.filter(
        (b) =>
          b.title.toLowerCase().includes(cleanQuery) ||
          b.category.toLowerCase().includes(cleanQuery)
      ).slice(0, 2)
    : [];

  const totalResults = matchedServices.length + matchedDoctors.length + matchedBlogs.length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setQuery("");
    navigate(url);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative flex items-center w-full h-12 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-[0_4px_20px_rgba(31,168,160,0.08)] px-4 transition-all focus-within:shadow-[0_8px_28px_rgba(31,168,160,0.2)] focus-within:bg-white border border-white">
        <Search className="w-5 h-5 text-primary-container shrink-0 mr-3" />
        <input
          type="text"
          value={query}
          autoFocus={autoFocus}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-on-surface placeholder:text-tertiary focus:outline-none"
        />

        {query ? (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="w-7 h-7 rounded-full bg-surface-container flex items-center justify-center text-tertiary hover:text-on-surface shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => navigate("/services")}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary hover:bg-secondary-container transition-colors shrink-0 ml-1 cursor-pointer"
            aria-label="View treatments filter"
          >
            <span className="material-symbols-outlined text-[18px]">tune</span>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && cleanQuery && (
        <div className="absolute top-14 left-0 right-0 bg-white/95 backdrop-blur-2xl rounded-3xl p-4 shadow-[0_16px_40px_rgba(31,168,160,0.2)] border border-white z-50 overflow-hidden">
          {totalResults === 0 ? (
            <div className="p-4 text-center text-xs text-tertiary">
              No matching dental services, doctors, or guides found for "{query}".
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto no-scrollbar">
              {/* Treatments */}
              {matchedServices.length > 0 && (
                <div>
                  <span className="block text-[11px] font-bold text-tertiary uppercase tracking-wider px-2 mb-1.5">
                    Treatments & Services
                  </span>
                  <div className="space-y-1">
                    {matchedServices.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => handleSelect(`/services/${srv.id}`)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-on-surface">{srv.title}</div>
                            <div className="text-[11px] text-tertiary">{srv.category} • {srv.price}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors */}
              {matchedDoctors.length > 0 && (
                <div>
                  <span className="block text-[11px] font-bold text-tertiary uppercase tracking-wider px-2 mb-1.5">
                    Dentists & Specialists
                  </span>
                  <div className="space-y-1">
                    {matchedDoctors.map((doc) => (
                      <div
                        key={doc.id}
                        onClick={() => handleSelect(`/about`)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={doc.image}
                            alt={doc.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <div className="text-xs font-bold text-on-surface">{doc.name}</div>
                            <div className="text-[11px] text-primary">{doc.role}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Blog articles */}
              {matchedBlogs.length > 0 && (
                <div>
                  <span className="block text-[11px] font-bold text-tertiary uppercase tracking-wider px-2 mb-1.5">
                    Oral Health Guides
                  </span>
                  <div className="space-y-1">
                    {matchedBlogs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => handleSelect(`/blog/${b.slug}`)}
                        className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-container-low cursor-pointer transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-secondary-container/40 text-secondary flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold text-on-surface truncate">
                              {b.title}
                            </div>
                            <div className="text-[11px] text-tertiary">{b.readTime}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
