import React from "react";
import { Link } from "react-router-dom";
import { Tag, Sparkles, Copy, Check, ArrowRight, ShieldCheck } from "lucide-react";
import { Header } from "../components/common/Header";
import { OFFERS_DATA } from "../data/offers";
import { useApp } from "../context/AppContext";

export const OffersPage: React.FC = () => {
  const { showToast } = useApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      <Header pageTitle="Offers" />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-28 lg:pb-16 space-y-8 sm:space-y-10">
        {/* Intro */}
        <section className="text-center sm:text-left pt-2 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
            <Tag className="w-4 h-4 text-primary" />
            <span>Special Dental Packages</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#011e30] tracking-tight">
            Exclusive Smile Deals & Packages
          </h1>
          <p className="text-xs sm:text-sm text-tertiary max-w-xl leading-relaxed">
            Take advantage of special savings on teeth whitening, clear aligners, family preventive checkups, and 3D consultations.
          </p>
        </section>

        {/* Offers Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OFFERS_DATA.map((offer) => {
            const isCopied = copiedCode === offer.code;

            return (
              <div
                key={offer.id}
                className="rounded-3xl p-6 sm:p-7 bg-white/90 backdrop-blur-xl border border-white shadow-[0_8px_24px_rgba(31,168,160,0.08)] hover:shadow-[0_14px_36px_rgba(31,168,160,0.16)] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container text-xs font-bold uppercase tracking-wider">
                      {offer.badge}
                    </span>
                    <span className="text-2xl font-black text-primary">
                      {offer.discount}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-on-surface group-hover:text-primary transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-tertiary mt-2 leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-surface-container/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-tertiary font-semibold">{offer.validUntil}</span>
                    <button
                      onClick={() => handleCopy(offer.code)}
                      className="px-3 py-1.5 rounded-xl bg-surface-container hover:bg-secondary-container/40 text-primary text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Code: {offer.code}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <Link
                    to="/book"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-primary-mint to-primary-container text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
                  >
                    <span>Claim Offer & Book Visit</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </section>

        {/* Free Consultation Guarantee Banner */}
        <section className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary to-[#004f4c] text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-bold">Have Questions About Packages?</h3>
            <p className="text-xs sm:text-sm text-teal-100 max-w-md">
              Our financial concierge is happy to review your dental insurance coverage and 0% EMI financing plans.
            </p>
          </div>
          <Link
            to="/contact"
            className="px-6 py-3.5 rounded-full bg-white text-primary text-xs sm:text-sm font-bold shadow-md hover:bg-teal-50 active:scale-95 transition-all whitespace-nowrap"
          >
            Contact Billing Team
          </Link>
        </section>
      </main>
    </div>
  );
};
