import React from 'react';
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
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ClientPortalSection: React.FC = () => {
  const { currentUser } = useAuth();

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
          
          {/* LEFT SIDE: Professional Illustration & Live Interactive Badges */}
          <div className="lg:col-span-6 relative">
            
            {/* Visual Frame */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200 bg-pluto-navy-deep group">
              <img
                src="/assets/client-portal.jpg"
                alt="PlutoTax Secure Client Portal Dashboard"
                className="w-full h-[360px] sm:h-[420px] object-cover filter brightness-[1.02] group-hover:scale-[1.02] transition-transform duration-700"
              />

              {/* Floating Overlay Badge: Live Progress */}
              <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-pluto-navy/90 backdrop-blur-md border border-pluto-gold/40 text-white p-3.5 rounded-xl shadow-xl max-w-xs animate-fade-in">
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

            </div>

            {/* Background Decorative Accent */}
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-pluto-gold/15 rounded-full blur-3xl -z-10 pointer-events-none" />

          </div>

          {/* RIGHT SIDE: Heading, Description & Feature List */}
          <div className="lg:col-span-6 flex flex-col items-start">
            
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
                  <div 
                    key={idx}
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
                  </div>
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

              <Link
                to="/portal?tab=register"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-pluto-navy border border-slate-300 hover:border-pluto-navy/30 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-sm"
              >
                <UserPlus className="w-4 h-4 text-slate-500" />
                <span>New Client? Get Started</span>
              </Link>
            </div>

            {/* Note */}
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Compliant with IRS Publication 1075 & FTC Safeguards Rule</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
