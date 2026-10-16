import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  Heart,
  Bookmark,
  Calendar,
  LogOut,
  Edit2,
  Check,
  ShieldCheck,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { Header } from "../components/common/Header";
import { useApp } from "../context/AppContext";
import { SERVICES_DATA } from "../data/services";
import { BLOG_POSTS_DATA } from "../data/blog";

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout, openAuthModal, favorites, bookmarks, toggleFavorite } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user?.name || "Alex Rivera");
  const [phone, setPhone] = useState(user?.phone || "+91 84700 77778");
  const [email, setEmail] = useState(user?.email || "alex.rivera@example.com");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || "O+");
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || "08470077778");

  const favoriteServices = SERVICES_DATA.filter((s) => favorites.includes(s.id));
  const bookmarkedPosts = BLOG_POSTS_DATA.filter((b) => bookmarks.includes(b.id));

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      phone,
      email,
      bloodGroup,
      emergencyContact
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <Header pageTitle="Patient Profile" />
        <main className="flex-1 max-w-md w-full mx-auto px-4 pt-28 pb-20 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center text-primary mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-on-surface">Sign In to View Your Profile</h2>
          <p className="text-xs text-tertiary">
            Access your appointments history, saved treatments, and medical records securely.
          </p>
          <button
            onClick={openAuthModal}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all cursor-pointer"
          >
            Sign In / Register
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header pageTitle="My Profile" />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 space-y-8">
        {/* Profile Header Card */}
        <section className="rounded-3xl p-6 sm:p-8 bg-white/95 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(31,168,160,0.08)] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="relative">
              <img
                src={user.avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBHzLWKAbtJOQXTooSQOL0xL21LaLo5SW2SXPwgS2XaJGTDSfKMJEsWtIqoH0FPelbdRFT5ulmuZuC4E1LOT1ICQXpmyHLPyRyjZCHqp0ZYLiiVvA0e9g85xAWPBITff5m45MmcNM3_b6faLwv8gk7im2dJNeJQuaQ8fEOKeq9o-Rj5sfHmxG2_gPoeKa4ZSr9QXC_9dZCE2oBAzOPTNZ-t95cdocw9nPThfGkTg39_qMlhr7XtNt_jzQ"}
                alt={user.name}
                className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-primary-container/30"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-primary-container text-white flex items-center justify-center shadow-sm">
                <Check className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl sm:text-2xl font-bold text-on-surface">{user.name}</h1>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                  Verified Patient
                </span>
              </div>
              <p className="text-xs text-tertiary mt-0.5">{user.email}</p>
              <p className="text-xs text-tertiary">{user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-full bg-surface-container hover:bg-secondary-container/40 text-primary text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
            </button>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </section>

        {/* Profile Edit / Details Form */}
        {isEditing && (
          <section className="rounded-3xl p-6 bg-white/95 backdrop-blur-xl border border-white shadow-sm space-y-4">
            <h3 className="text-base font-bold text-on-surface">Update Patient Details</h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">
                  Blood Group
                </label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low border border-surface-container text-xs sm:text-sm text-on-surface focus:outline-none focus:border-primary-container"
                />
              </div>

              <div className="sm:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition-all"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Saved Favorites Treatments */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-lg font-bold text-on-surface">Saved Treatments</h2>
            </div>
            <Link to="/services" className="text-xs font-bold text-primary hover:underline">
              Browse All
            </Link>
          </div>

          {favoriteServices.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/70 border border-white text-center text-xs text-tertiary">
              No saved treatments yet. Tap the heart icon on any treatment to bookmark it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {favoriteServices.map((service) => (
                <div
                  key={service.id}
                  className="p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-sm flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-12 h-12 rounded-xl object-contain bg-surface-container-low p-1 shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                        {service.title}
                      </h4>
                      <span className="text-xs font-extrabold text-primary">{service.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/book?service=${service.id}`}
                      className="px-3.5 py-1.5 rounded-full bg-primary-container text-white text-xs font-bold hover:bg-primary transition-colors"
                    >
                      Book
                    </Link>
                    <button
                      onClick={() => toggleFavorite(service.id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                      title="Remove from saved"
                    >
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bookmarked Guides */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-primary fill-primary" />
              <h2 className="text-lg font-bold text-on-surface">Bookmarked Guides</h2>
            </div>
            <Link to="/blog" className="text-xs font-bold text-primary hover:underline">
              Read More
            </Link>
          </div>

          {bookmarkedPosts.length === 0 ? (
            <div className="p-6 rounded-2xl bg-white/70 border border-white text-center text-xs text-tertiary">
              No bookmarked guides yet. Tap the bookmark ribbon on blog articles to save them here.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookmarkedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white shadow-sm hover:shadow-md transition-all flex items-center gap-3 group"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-14 h-14 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-primary uppercase">
                      {post.category}
                    </span>
                    <h4 className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">
                      {post.title}
                    </h4>
                    <span className="text-[11px] text-tertiary">{post.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
