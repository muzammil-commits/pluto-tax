import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  Bell, 
  MessageSquare,
  ShieldAlert,
  Clock,
  Eye,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const ClientPortalSection: React.FC = () => {
  const { currentUser } = useAuth();
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  const portalFeatures = [
    { 
      title: "Secure Client Login", 
      desc: "Bank-grade 256-bit TLS encryption protecting your credentials and sensitive tax data.", 
      icon: Lock,
      badge: "256-Bit SSL"
    },
    { 
      title: "Upload Tax Documents", 
      desc: "Safely drag & drop W-2s, 1099s, and foreign account statements into your encrypted vault.", 
      icon: UploadCloud,
      badge: "Encrypted Vault"
    },
    { 
      title: "Review Filing Progress", 
      desc: "Live stage-by-stage milestone tracker from document intake to IRS e-file acceptance.", 
      icon: Clock,
      badge: "Real-Time Tracking"
    },
    { 
      title: "Access Important Documents", 
      desc: "24/7 on-demand download access to your finalized Form 1040, schedules, and IRS receipts.", 
      icon: FileText,
      badge: "24/7 Availability"
    },
    { 
      title: "Client Notifications", 
      desc: "Instant automated alerts for CPA status updates, signature requests, and refund approvals.", 
      icon: Bell,
      badge: "Instant Alerts"
    },
    { 
      title: "Communicate with CPA", 
      desc: "Direct confidential messaging line with your assigned senior tax advisory team.", 
      icon: MessageSquare,
      badge: "Direct CPA Access"
    },
  ];

  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#EAF3FF]/90 backdrop-blur-sm overflow-hidden border-b border-blue-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: Grand 3D Client Portal Illustration (image copy 16.png) */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Grand 3D Visual Frame with Luxury Blue & Gold Ambient Glow */}
            <div 
              onClick={() => setIsPortalModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(8,43,99,0.3)] border-2 border-white/90 bg-white group cursor-pointer ring-2 ring-blue-300/80 hover:ring-pluto-gold hover:shadow-[0_30px_70px_-10px_rgba(255,191,0,0.3)] transition-all duration-300"
            >
              <img
                src="/assets/portal-grand-preview.png"
                alt="PlutoTax Secure Client Portal Dashboard - Live Status, Encrypted Vault & IRS CAA Certification"
                className="w-full h-auto object-cover filter brightness-[1.03] group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Hover Quick Preview Button */}
              <div className="absolute inset-0 bg-pluto-navy-deep/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 bg-white/95 text-pluto-navy px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-xl border border-pluto-gold/40">
                  <Eye className="w-4 h-4 text-pluto-gold" />
                  <span>Click for Interactive Portal Experience</span>
                </span>
              </div>
            </div>

            {/* Mobile quick caption */}
            <p className="mt-2 text-center text-xs text-slate-500 lg:hidden">
              Tap image above to open interactive portal preview
            </p>
          </motion.div>

          {/* RIGHT SIDE: Heading, Description & Feature List */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Section Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-pluto-blue-light text-pluto-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3 text-pluto-navy" />
              <span>SECURE CLIENT PORTAL</span>
            </div>

            {/* Section Heading */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Your Tax Journey, <span className="text-pluto-navy">All in One Place.</span>
            </h2>

            {/* Description */}
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              Access your tax documents, review filing progress, communicate with our team and stay informed through your secure PlutoTax client portal.
            </p>

            {/* Features Grid - Grand Look with Luxury Card Styling & Zero Truncation */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 w-full">
              {portalFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="group/card relative flex items-start gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200/90 shadow-[0_4px_16px_rgba(8,43,99,0.06)] hover:shadow-[0_8px_24px_rgba(8,43,99,0.12)] hover:border-pluto-gold/70 transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {/* Glowing Gradient Icon Container */}
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-pluto-navy to-pluto-navy-deep text-pluto-gold flex items-center justify-center shrink-0 shadow-md border border-pluto-gold/30 group-hover/card:scale-105 transition-transform mt-0.5">
                      <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-pluto-gold" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1.5 mb-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 font-heading leading-tight">
                          {feat.title}
                        </h4>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </div>
                      <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons with Grand Corporate Aesthetics */}
            <div className="mt-7 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
              <Link
                to="/portal"
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-pluto-navy via-pluto-navy to-pluto-navy-deep hover:from-pluto-navy-deep hover:to-pluto-navy text-white px-7 py-3 rounded-xl font-extrabold text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-pluto-gold/40"
              >
                <span>Access Client Portal</span>
                <ArrowRight className="w-4 h-4 text-pluto-gold" />
              </Link>

              <button
                type="button"
                onClick={() => setIsPortalModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-pluto-navy border-2 border-blue-200 hover:border-pluto-navy/50 px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <Eye className="w-4 h-4 text-pluto-gold" />
                <span>Interactive Live Preview</span>
              </button>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Interactive Portal Preview Modal */}
      {isPortalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep p-5 text-white relative">
              <button
                onClick={() => setIsPortalModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pluto-gold uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>PLUTOTAX PORTAL LIVE PREVIEW</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Inside Your Secure Tax Vault
              </h3>
            </div>

            <div className="p-5 sm:p-6 space-y-4">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  1. Live Filing Status Milestones
                </h4>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Tax Year 2024 / 2025</span>
                    <span className="text-emerald-600">Stage 2 of 5: CPA Review Active</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-pluto-gold h-full w-[65%]" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  2. Document Vault & Verification Badges
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pluto-navy" />
                      <span className="font-semibold text-slate-900">Form_W2_Wage_Statement.pdf</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      CPA Verified
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pluto-navy" />
                      <span className="font-semibold text-slate-900">Foreign_Bank_FBAR_Records.pdf</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Under Review
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
                <Link
                  to="/portal?tab=register"
                  onClick={() => setIsPortalModalOpen(false)}
                  className="flex-1 bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-bold py-2.5 rounded-xl text-xs transition-colors text-center"
                >
                  Create Client Account
                </Link>
                <Link
                  to="/portal"
                  onClick={() => setIsPortalModalOpen(false)}
                  className="flex-1 bg-pluto-navy hover:bg-pluto-navy-deep text-white font-bold py-2.5 rounded-xl text-xs transition-colors text-center"
                >
                  Existing Client Login →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
