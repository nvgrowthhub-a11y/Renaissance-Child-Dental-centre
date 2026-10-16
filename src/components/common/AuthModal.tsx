import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, User, Mail, Phone, Lock, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, login, user } = useApp();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (mode === "signup" && phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (password.length < 4) {
      setError("Password must be at least 4 characters.");
      return;
    }

    login(name || (email.split("@")[0] || "Patient"), email, phone || "08470077778");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
        {/* Backdrop click */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={closeAuthModal}
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(31,168,160,0.2)] border border-white z-10 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary-container/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Brand header */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary-container to-secondary flex items-center justify-center text-white shadow-md shadow-primary-container/30 mb-3">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#011e30] tracking-tight">
              {mode === "login" ? "Welcome Back to SmileCare" : "Create Your SmileCare Account"}
            </h2>
            <p className="text-sm text-tertiary mt-1">
              {mode === "login"
                ? "Manage your appointments, history, and dental records"
                : "Join thousands enjoying gentle, modern dental wellness"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex p-1 bg-surface-container rounded-full mb-6">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                mode === "login"
                  ? "bg-white text-primary shadow-sm"
                  : "text-tertiary hover:text-on-surface"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-full transition-all cursor-pointer ${
                mode === "signup"
                  ? "bg-white text-primary shadow-sm"
                  : "text-tertiary hover:text-on-surface"
              }`}
            >
              Register New Account
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 w-4 h-4 text-tertiary" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Rivera"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low/80 border border-surface-container text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-tertiary" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.rivera@example.com"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low/80 border border-surface-container text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white transition-all"
                />
              </div>
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Mobile Number
                </label>
                <div className="relative flex items-center">
                  <Phone className="absolute left-3.5 w-4 h-4 text-tertiary" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08470077778"
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low/80 border border-surface-container text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-on-surface">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => alert("Password reset link has been dispatched to your email address.")}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-tertiary" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface-container-low/80 border border-surface-container text-sm text-on-surface placeholder:text-tertiary focus:outline-none focus:border-primary-container focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-semibold text-sm shadow-[0_8px_20px_rgba(31,168,160,0.35)] flex items-center justify-center gap-2 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
            >
              <span>{mode === "login" ? "Sign In Securely" : "Create Account & Get Started"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo fast fill button */}
          <div className="mt-4 pt-4 border-t border-surface-container flex items-center justify-between text-xs text-tertiary">
            <span>Quick Test Demo:</span>
            <button
              type="button"
              onClick={() => {
                setName("Alex Rivera");
                setEmail("alex.rivera@example.com");
                setPhone("08470077778");
                setPassword("demo1234");
              }}
              className="font-semibold text-primary hover:underline cursor-pointer"
            >
              Fill Sample Credentials
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
