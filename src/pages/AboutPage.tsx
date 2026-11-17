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
  Users
} from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  const { openConsultationModal } = useSite();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* Page Hero */}
      <section className="relative bg-pluto-navy-deep text-white py-16 sm:py-24 overflow-hidden border-b border-pluto-gold/20">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 bg-pluto-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'About Us' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ABOUT PLUTOTAX CONSULTING & ADVISORY LLC</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Dedicated to Accuracy, Security & Strategic Tax Excellence.
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Headquartered in Austin, Texas, PlutoTax Consulting & Advisory LLC delivers comprehensive US federal, multi-state, and cross-border tax solutions designed to give individuals and growing businesses lasting financial confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Overview & Imagery */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-pluto-navy-deep">
              <img
                src="/assets/about-advisory.jpg"
                alt="PlutoTax Advisory Team at Work"
                className="w-full h-[400px] object-cover filter brightness-[1.03]"
              />
            </div>
            {/* Overlay badge */}
            <div className="absolute -bottom-6 -right-6 bg-pluto-navy text-white p-5 rounded-2xl shadow-xl border border-pluto-gold/40 hidden sm:block max-w-xs">
              <div className="flex items-center gap-2 text-pluto-gold text-xs font-bold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>IRS Authorized CAA</span>
              </div>
              <p className="text-xs text-slate-200">
                Authorized Certifying Acceptance Agent for fast Form W-7 ITIN identity validation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Our Practice & Financial Philosophy
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Taxes represent one of the single largest recurring financial considerations for high-performing professionals and business entities. Yet all too often, individuals face reactive, hurried filings, generic automated software with zero human insight, or inadequate cross-border treaty comprehension.
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              At PlutoTax, we believe in a fundamentally proactive approach. By combining seasoned CPA oversight, rigorous double-checking, and state-of-the-art secure digital infrastructure, we protect our clients against costly tax penalties while uncovering every legitimate credit and deduction available under federal and bilateral statutory provisions.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Licensed CPA Oversight</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">Every return reviewed and signed with professional accountability.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Bilateral DTAA Expertise</span>
                </h4>
                <p className="text-xs text-slate-500 mt-1">Eliminating double taxation for NRIs and visa holders.</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Vision */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-pluto-blue-light text-pluto-navy flex items-center justify-center mb-5">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                Our Vision
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To be the most trusted and transparent financial tax advisory firm for cross-border professionals, founders, and growing families, redefining the tax advisory experience through exceptional technical mastery and genuine customer dedication.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-heading">
                Our Mission
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                To empower our clients with proactive, accurate, and audit-ready tax solutions. We deliver seamless filings, complete foreign account compliance, and forward-looking strategic tax planning that legally shields wealth and maximizes lifetime returns.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Data Protection & Security Banner */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-pluto-navy-deep rounded-3xl p-8 sm:p-12 text-white border border-pluto-gold/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-pluto-gold uppercase tracking-wider mb-3">
              <Lock className="w-4 h-4" />
              <span>DATA PROTECTION & CONFIDENTIALITY</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              Your Privacy Is Governed by the Highest Legal Standards.
            </h3>
            <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              As tax practitioners, we operate under strict federal regulations, including Internal Revenue Code Section 7216 and Treasury Circular 230. We never monetize, disclose, or share your financial data or Social Security numbers with third parties. All files are encrypted at rest and in transit using 256-bit AES cryptographic protocols.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-emerald-300">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> IRC Section 7216 Protected
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> SOC-2 Compliant Cloud Architecture
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <CheckCircle2 className="w-3.5 h-3.5" /> Zero Data Selling Guarantee
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Connect with a PlutoTax Advisor Today
          </h3>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto">
            Experience the peace of mind that comes with certified public accountants who understand both domestic and global tax nuances.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openConsultationModal('About Page CTA')}
              className="w-full sm:w-auto bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep px-8 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-[1.02]"
            >
              Get a Free Consultation
            </button>
            <Link
              to="/services"
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-3.5 rounded-xl font-semibold text-sm transition-colors"
            >
              Explore Our 9 Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
