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
    { title: "Secure Client Login", desc: "256-bit SSL encrypted auth", icon: Lock },
    { title: "Upload Tax Documents", desc: "Drag & drop W-2s, 1099s safely", icon: UploadCloud },
    { title: "Review Filing Progress", desc: "Live stage-by-stage tracker", icon: Clock },
    { title: "Access Documents", desc: "24/7 access to returns & receipts", icon: FileText },
    { title: "Client Notifications", desc: "Real-time IRS approval alerts", icon: Bell },
    { title: "Communicate with CPA", desc: "Direct messaging with CPA team", icon: MessageSquare },
  ];

  return (
    <section className="relative w-full py-10 sm:py-14 bg-white/85 backdrop-blur-sm overflow-hidden border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT SIDE: Professional Illustration & Live Interactive Badges */}
          <motion.div 
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            {/* Visual Frame */}
            <div 
              onClick={() => setIsPortalModalOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-pluto-navy-deep group cursor-pointer"
            >
              <img
                src="/assets/client-portal.jpg"
                alt="PlutoTax Secure Client Portal Dashboard"
                className="w-full h-[260px] sm:h-[320px] object-cover filter brightness-[1.02] group-hover:scale-[1.03] transition-transform duration-700"
              />

              {/* Floating Overlay Badge: Live Progress */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-pluto-navy/90 backdrop-blur-md border border-pluto-gold/40 text-white p-2.5 sm:p-3 rounded-xl shadow-lg max-w-[240px]">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-pluto-gold uppercase tracking-wider mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Real-Time Filing Status</span>
                </div>
                <p className="text-xs text-slate-200 font-semibold truncate">
                  {currentUser ? `${currentUser.name} - ${currentUser.filingStatus}` : "Ananya S. - CPA Review Active"}
                </p>
                <div className="w-full bg-slate-700/80 rounded-full h-1.5 mt-1.5 overflow-hidden">
                  <div 
                    className="bg-pluto-gold h-full rounded-full transition-all duration-1000"
                    style={{ width: currentUser ? `${currentUser.progressPercent}%` : '65%' }}
                  />
                </div>
              </div>

              {/* Floating Overlay Badge: Security */}
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 bg-white/95 backdrop-blur-md border border-slate-200 p-2.5 rounded-xl shadow-md flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                  <ShieldAlert className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 leading-none">256-Bit TLS Vault</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">IRS Section 7216</div>
                </div>
              </div>

              {/* Hover Quick Preview Button */}
              <div className="absolute inset-0 bg-pluto-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-1.5 bg-white text-pluto-navy px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-lg">
                  <Eye className="w-3.5 h-3.5 text-pluto-gold" />
                  <span>Click for Interactive Portal Preview</span>
                </span>
              </div>
            </div>
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

            {/* Features Grid - Tightened Spacing */}
            <div className="mt-5 grid grid-cols-2 gap-2.5 w-full">
              {portalFeatures.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div 
                    key={idx}
                    className="flex items-start gap-2 p-2.5 rounded-xl bg-white/90 border border-slate-200/80 shadow-sm hover:border-pluto-gold/50 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-pluto-blue-light flex items-center justify-center shrink-0 mt-0.5 text-pluto-navy">
                      <Icon className="w-3.5 h-3.5 text-pluto-navy" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1">
                        <span className="truncate">{feat.title}</span>
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 leading-snug">
                        {feat.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              <Link
                to="/portal"
                className="inline-flex items-center justify-center gap-2 bg-pluto-navy hover:bg-pluto-navy-deep text-white px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Access Client Portal</span>
                <ArrowRight className="w-4 h-4 text-pluto-gold" />
              </Link>

              <button
                type="button"
                onClick={() => setIsPortalModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-pluto-navy border border-slate-300 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all shadow-sm"
              >
                <Eye className="w-3.5 h-3.5 text-slate-500" />
                <span>Interactive Preview</span>
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
