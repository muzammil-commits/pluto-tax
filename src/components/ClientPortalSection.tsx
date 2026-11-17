import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Lock, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  ArrowRight, 
  UserPlus, 
  Bell, 
  MessageSquare,
  ShieldAlert,
  Clock,
  Eye,
  X,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const ClientPortalSection: React.FC = () => {
  const { currentUser } = useAuth();
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);

  const portalFeatures = [
    { title: "Secure Client Login", desc: "Bank-grade 256-bit SSL encrypted authentication", icon: Lock },
    { title: "Upload Tax Documents", desc: "Drag & drop W-2s, 1099s, FBAR statements safely", icon: UploadCloud },
    { title: "Review Tax Filing Progress", desc: "Live stage-by-stage tracker from CPA review to IRS e-file", icon: Clock },
    { title: "Access Important Documents", desc: "24/7 access to your finalized returns and IRS receipts", icon: FileText },
    { title: "View Client Notifications", desc: "Real-time alerts for missing schedules or IRS approvals", icon: Bell },
    { title: "Communicate With the Tax Team", desc: "Direct encrypted messaging with your assigned CPA", icon: MessageSquare },
  ];

  return (
    <section className="relative w-full py-16 sm:py-24 bg-gradient-to-b from-white via-pluto-blue-soft/50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* LEFT SIDE: Professional Illustration & Live Interactive Badges with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 relative"
          >
            
            {/* Visual Frame */}
            <div 
              onClick={() => setIsPortalModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-pluto-navy-deep group cursor-pointer"
            >
              <img
                src="/assets/client-portal.jpg"
                alt="PlutoTax Secure Client Portal Dashboard"
                className="w-full h-[360px] sm:h-[420px] object-cover filter brightness-[1.02] group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Floating Overlay Badge: Live Progress */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-pluto-navy/90 backdrop-blur-md border border-pluto-gold/40 text-white p-3.5 rounded-xl shadow-xl max-w-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-pluto-gold uppercase tracking-wider mb-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-Time Filing Status</span>
                </div>
                <p className="text-xs text-slate-200 font-semibold">
                  {currentUser ? `${currentUser.name} - ${currentUser.filingStatus}` : "Ananya S. - CPA Review In Progress"}
                </p>
                <div className="w-full bg-slate-700/80 rounded-full h-1.5 mt-2 overflow-hidden">
                  <div 
                    className="bg-pluto-gold h-full rounded-full transition-all duration-1000"
                    style={{ width: currentUser ? `${currentUser.progressPercent}%` : '65%' }}
                  />
                </div>
              </div>

              {/* Floating Overlay Badge: Bank-grade Security */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-md border border-slate-200 p-3 rounded-xl shadow-xl flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">256-Bit TLS Vault</div>
                  <div className="text-[11px] text-slate-500">IRS Section 7216 Protected</div>
                </div>
              </div>

              {/* Hover Quick Preview Button */}
              <div className="absolute inset-0 bg-pluto-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 bg-white text-pluto-navy px-4 py-2 rounded-xl text-xs font-bold shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-4 h-4 text-pluto-gold" />
                  <span>Click for Interactive Portal Preview</span>
                </span>
              </div>

            </div>

            {/* Background Decorative Accent */}
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-pluto-gold/15 rounded-full blur-3xl -z-10 pointer-events-none" />

          </motion.div>

          {/* RIGHT SIDE: Heading, Description & Feature List with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            
            {/* Section Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pluto-blue-light text-pluto-navy text-xs font-bold uppercase tracking-wider mb-3">
              <Lock className="w-3.5 h-3.5 text-pluto-navy" />
              <span>SECURE CLIENT PORTAL</span>
            </div>

            {/* Section Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              Your Tax Journey, <span className="text-pluto-navy">All in One Place.</span>
            </h2>

            {/* Description */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Access your tax documents, review filing progress, communicate with our team and stay informed through your secure PlutoTax client portal.
            </p>

            {/* Features Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {portalFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08, duration: 0.5 }}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-slate-100 shadow-sm hover:shadow-md hover:border-pluto-gold/40 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-pluto-blue-light/70 flex items-center justify-center shrink-0 mt-0.5 text-pluto-navy">
                      <Icon className="w-4 h-4 text-pluto-navy" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                        <span>{feat.title}</span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                        {feat.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full">
              <Link
                to="/portal"
                className="inline-flex items-center justify-center gap-2 bg-pluto-navy hover:bg-pluto-navy-deep text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Access Client Portal</span>
                <ArrowRight className="w-4 h-4 text-pluto-gold" />
              </Link>

              <button
                type="button"
                onClick={() => setIsPortalModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-pluto-navy border border-slate-300 hover:border-pluto-navy/30 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                <Eye className="w-4 h-4 text-slate-500" />
                <span>Interactive Preview</span>
              </button>
            </div>

            {/* Compliance Note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Compliant with IRS Publication 1075 & FTC Safeguards Rule</span>
            </div>

          </motion.div>

        </div>

      </div>

      {/* =========================================================================
          INTERACTIVE PORTAL PREVIEW POPUP MODAL
          ========================================================================= */}
      {isPortalModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep p-6 text-white relative">
              <button
                onClick={() => setIsPortalModalOpen(false)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-pluto-gold uppercase tracking-wider mb-1">
                <Lock className="w-3.5 h-3.5" />
                <span>PLUTOTAX PORTAL LIVE PREVIEW</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-white">
                Inside Your Secure Tax Vault
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Explore how documents, CPA calculations, and IRS submission milestones are managed seamlessly.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Sample Filing Stages */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  1. Live Filing Status Milestones
                </h4>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-800">
                    <span>Tax Year 2024 / 2025</span>
                    <span className="text-emerald-600">Stage 2 of 5: CPA Review Active</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className="bg-pluto-gold h-full w-[65%]" />
                  </div>
                </div>
              </div>

              {/* Sample Documents */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  2. Document Vault & Verification Badges
                </h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pluto-navy" />
                      <span className="font-semibold text-slate-900">Form_W2_Wage_Statement.pdf</span>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      CPA Verified
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-pluto-navy" />
                      <span className="font-semibold text-slate-900">Foreign_Bank_FBAR_Account_Records.pdf</span>
                    </div>
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Under Review
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Link */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
                <Link
                  to="/portal?tab=register"
                  onClick={() => setIsPortalModalOpen(false)}
                  className="w-full sm:w-auto bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-bold px-6 py-3 rounded-xl text-xs transition-colors text-center"
                >
                  Create Your Client Account
                </Link>
                <Link
                  to="/portal"
                  onClick={() => setIsPortalModalOpen(false)}
                  className="w-full sm:w-auto bg-pluto-navy hover:bg-pluto-navy-deep text-white font-bold px-6 py-3 rounded-xl text-xs transition-colors text-center"
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
