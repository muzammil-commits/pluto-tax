import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO, CORE_VALUES } from '../data/companyData';
import { 
  ShieldCheck, 
  Target, 
  Compass, 
  Award, 
  Lock, 
  Globe2, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  Building2,
  FileCheck,
  Scale,
  DollarSign,
  Briefcase
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const { openConsultationModal } = useSite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#EAF3FF]/40 text-slate-800">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION with image copy 24.png (Capitol + Sky Banner)
          ========================================================================= */}
      <section className="relative w-full min-h-[420px] sm:min-h-[460px] flex items-center overflow-hidden border-b border-blue-200/80 bg-pluto-navy-deep">
        {/* Background Image: image copy 24.png with Capitol dome on right & US flag */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('/assets/hero-capitol-banner.jpg'), url('/assets/hero-capitol-banner.png')`,
            backgroundPosition: 'right 25% center',
            filter: 'brightness(1.08) contrast(1.05)',
          }}
        />
        
        {/* Responsive Gradient Overlay: provides high-contrast readability on the left while keeping Capitol visible on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/80 to-transparent pointer-events-none" />
        <div className="md:hidden absolute inset-0 bg-pluto-navy-deep/60 pointer-events-none" />

        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pluto-gold/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'About Us' }]} />
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT PLUTOTAX CONSULTING & ADVISORY LLC</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
              Dedicated to Accuracy, Security & Strategic Tax Excellence.
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal drop-shadow">
              Headquartered in Austin, Texas, PlutoTax Consulting & Advisory LLC delivers comprehensive US federal, multi-state, and cross-border tax solutions designed to give individuals and growing businesses lasting financial confidence.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => openConsultationModal('About Page Hero')}
                className="bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-6 py-3 rounded-xl font-extrabold text-sm shadow-lg transition-transform hover:scale-[1.02] border border-amber-300"
              >
                Schedule Free Consultation
              </button>
              <Link
                to="/services"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-5 py-3 rounded-xl font-bold text-sm transition-all"
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: CORPORATE OVERVIEW & THE PLUTOTAX DIFFERENCE
          ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-2 border-white/80 bg-white ring-1 ring-blue-200">
              <img
                src="/assets/services/tax-planning.jpg"
                alt="PlutoTax Advisory Team at Work"
                className="w-full h-[320px] sm:h-[380px] object-cover filter brightness-[1.03]"
              />
            </div>
            {/* Floating Trust Badge */}
            <div className="absolute -bottom-5 -right-3 sm:-bottom-6 sm:-right-6 bg-pluto-navy-deep text-white p-4 sm:p-5 rounded-2xl shadow-xl border border-pluto-gold/40 max-w-[260px] sm:max-w-xs">
              <div className="flex items-center gap-2 text-pluto-gold text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>IRS Authorized CAA</span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-200 leading-snug">
                Authorized Certifying Acceptance Agent for expedited Form W-7 ITIN document verification without mailing passports.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-pluto-navy text-xs font-bold uppercase tracking-wider mb-2">
              <Building2 className="w-3.5 h-3.5 text-pluto-navy" />
              <span>WHO WE ARE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our Practice & Financial Philosophy
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              Taxes represent one of the single largest recurring financial considerations for high-performing professionals and business entities. Yet all too often, individuals face reactive, hurried filings, generic automated software with zero human insight, or inadequate cross-border treaty comprehension.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              At PlutoTax, we believe in a fundamentally proactive approach. By combining seasoned CPA oversight, rigorous double-checking, and state-of-the-art secure digital infrastructure, we protect our clients against costly tax penalties while uncovering every legitimate credit and deduction available under federal and bilateral statutory provisions.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-3.5 rounded-xl bg-white/90 border border-blue-200/60 shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Licensed CPA Oversight</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Every return is prepared or reviewed by credentialed CPAs and Enrolled Agents.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/90 border border-blue-200/60 shadow-sm">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Bilateral DTAA Fluency</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Specialized reconciliation of Indian and international assets under US tax treaties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: MISSION, VISION & THE FOUR STRATEGIC PILLARS
          ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#EAF3FF]/80 border-y border-blue-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our Vision & Guiding Mission
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              The foundational principles that guide every client interaction and filing strategy at PlutoTax.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Vision Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-pluto-navy mb-4">
                <Compass className="w-6 h-6 text-pluto-navy" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Our Vision
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                To stand as the nation's premier US corporate and cross-border tax advisory—delivering absolute precision, effortless digital workflows, and proactive financial confidence for individuals, families, and high-growth enterprises worldwide.
              </p>
            </div>

            {/* Mission Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 mb-4">
                <Target className="w-6 h-6 text-pluto-gold" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Our Mission
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                To empower our clients with proactive, accurate, and audit-ready tax solutions. We deliver seamless filings, complete foreign account compliance, and forward-looking strategic tax planning that legally shields wealth and maximizes lifetime returns.
              </p>
            </div>
          </div>

          {/* 4 Pillars Strip */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: "Zero Error Accuracy", desc: "Rigorous CPA double-review protocol on all federal & state schedules." },
              { title: "Proactive Strategy", desc: "Year-round guidance before major financial decisions and equity events." },
              { title: "Complete Compliance", desc: "Strict adherence to FinCEN, FATCA, and IRS Circular 230 ethical rules." },
              { title: "Client First Service", desc: "Dedicated human tax advisor assigned to guide you step-by-step." }
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white border border-blue-100 text-center shadow-xs">
                <h4 className="text-xs sm:text-sm font-extrabold text-pluto-navy">{p.title}</h4>
                <p className="text-[11px] text-slate-500 mt-1 leading-snug">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: CORE VALUES MATRIX
          ========================================================================= */}
      <section className="py-12 sm:py-16 bg-pluto-navy-deep text-white border-y border-pluto-gold/20 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFBF00 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-pluto-gold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full border border-pluto-gold/30">
              OUR CORE VALUES
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-3">
              The Principles That Anchor PlutoTax
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-pluto-gold/50 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-pluto-gold" />
                  <h3 className="text-base font-bold text-white font-heading">{val.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: DATA PROTECTION, ENCRYPTION & CIRCULAR 230
          ========================================================================= */}
      <section className="py-12 sm:py-16 bg-[#EAF3FF]/80 border-t border-blue-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-pluto-navy-deep rounded-3xl p-6 sm:p-10 text-white border border-pluto-gold/30 shadow-xl relative overflow-hidden">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-pluto-gold uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4" />
                <span>CONFIDENTIALITY & LEGAL MANDATE</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Your Privacy Is Protected by Strict Federal Statute.
              </h3>
              <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                As licensed tax practitioners, our practice is strictly governed by Internal Revenue Code Section 7216 and Treasury Circular 230 regulations. We never monetize, share, or disclose client financial records or identity numbers to third-party data brokers. All digital records are protected by bank-level 256-bit AES encryption at rest and in transit.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-semibold text-emerald-300">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> IRC Section 7216 Protected
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SOC-2 Compliant Cloud Vault
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Data Selling Guarantee
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FREE CONSULTATION CTA STRIP
          ========================================================================= */}
      <section className="py-14 sm:py-18 bg-white border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>LET'S BUILD FINANCIAL CONFIDENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading">
            Connect with a PlutoTax Senior Advisor Today
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Experience the peace of mind that comes with certified public accountants who understand both domestic and global tax nuances.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => openConsultationModal('About Page Bottom CTA')}
              className="w-full sm:w-auto bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all hover:scale-[1.02] border border-amber-300"
            >
              Get a Free Consultation
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl font-bold text-sm transition-colors shadow-xs"
            >
              Explore Our 9 Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
