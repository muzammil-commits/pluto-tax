import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Star, Award, TrendingUp } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const HeroSection: React.FC = () => {
  const { openConsultationModal } = useSite();

  return (
    <section className="relative w-full overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center bg-pluto-navy-deep">
      
      {/* =========================================================================
          DESKTOP BACKGROUND: image copy 3.png (Bright Look & Animated)
          ========================================================================= */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105 hover:scale-100 animate-pulse-subtle"
          style={{
            backgroundImage: `url('/assets/hero-desktop-bg-bright.png')`,
            backgroundPosition: 'center 35%',
            filter: 'brightness(1.08) contrast(1.05)',
          }}
        />
        {/* Subtle Navy Gradient Overlay to ensure text readability while keeping the bright look */}
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/92 via-pluto-navy-deep/75 to-pluto-navy-deep/30 pointer-events-none" />
        
        {/* Animated ambient light glow effect */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-pluto-gold/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-10 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* =========================================================================
          MOBILE BACKGROUND: image copy 4.png (Bright Look & Animated)
          ========================================================================= */}
      <div className="md:hidden absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-in-out animate-pulse-subtle"
          style={{
            backgroundImage: `url('/assets/hero-mobile-bg-bright.png')`,
            backgroundPosition: 'center top',
            filter: 'brightness(1.08) contrast(1.04)',
          }}
        />
        {/* Mobile Gradient Overlay: readable text on top, visual brightness below */}
        <div className="absolute inset-0 bg-gradient-to-b from-pluto-navy-deep/95 via-pluto-navy-deep/80 to-pluto-navy-deep/60 pointer-events-none" />
        <div className="absolute top-12 right-6 w-56 h-56 bg-pluto-gold/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start text-left">
            
            {/* Small Top Label */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pluto-navy/80 border border-pluto-gold/40 text-pluto-gold text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-sm">
              <ShieldCheck className="w-4 h-4 text-pluto-gold" />
              <span>YOUR TRUSTED PARTNER IN TAX PLANNING</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] tracking-tight font-heading">
              Smart Tax Solutions.{' '}
              <span className="block mt-1 sm:mt-2 text-pluto-gold font-extrabold drop-shadow-sm">
                Greater Financial Confidence.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-2xl font-normal drop-shadow">
              From US tax preparation to international compliance and strategic tax planning,
              PlutoTax delivers personalized expertise to help individuals and businesses
              navigate taxes with confidence.
            </p>

            {/* Trust Badges Bar */}
            <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Licensed CPA Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>IRS Authorized CAA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>US-India DTAA Treaty Experts</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => openConsultationModal()}
                className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-7 py-4 rounded-xl font-extrabold text-base tracking-wide shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-amber-300"
              >
                <span>Get a Free Tax Quote</span>
                <ArrowRight className="w-5 h-5 text-pluto-navy-deep" />
              </button>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 backdrop-blur-md px-6 py-4 rounded-xl font-bold text-base transition-all duration-200 shadow-md"
              >
                <span>Explore Our Services</span>
              </Link>
            </div>

            {/* Rating Strip */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">4.9 / 5.0 Rating</span>
              <span className="text-slate-400 text-xs hidden sm:inline">|</span>
              <span className="text-xs text-slate-300 hidden sm:inline">Trusted by 15,000+ US & International Taxpayers</span>
            </div>

          </div>

          {/* Right Column: Floating Highlights Card (Desktop & Tablet) */}
          <div className="hidden lg:flex lg:col-span-5 xl:col-span-4 flex-col gap-4">
            
            {/* Glass Highlight Card 1 */}
            <div className="bg-pluto-navy-surface/80 backdrop-blur-md border border-pluto-gold/30 p-5 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-pluto-gold/20 flex items-center justify-center border border-pluto-gold/40">
                  <Award className="w-5 h-5 text-pluto-gold" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">IRS Certifying Acceptance Agent</h3>
                  <p className="text-xs text-slate-300">Form W-7 Certified without mailing passports</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 pl-13">
                Authorized identity verification for spouses and dependents with fast-track processing.
              </p>
            </div>

            {/* Glass Highlight Card 2 */}
            <div className="bg-pluto-navy-surface/80 backdrop-blur-md border border-white/20 p-5 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center border border-emerald-400/40">
                  <TrendingUp className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Cross-Border US-India DTAA</h3>
                  <p className="text-xs text-slate-300">Article 25 Foreign Tax Credit Optimization</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mt-2 pl-13">
                Complete reconciliation of Indian property sales, NRE/NRO interest, and FBAR disclosures.
              </p>
            </div>

            {/* Fast Quick Link to Refund Status */}
            <div className="bg-gradient-to-r from-pluto-navy to-pluto-navy-light/90 border border-pluto-gold/20 p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-pluto-gold tracking-wider">Already Filed with us?</span>
                <p className="text-sm font-semibold text-white">Track Your IRS Refund Status</p>
              </div>
              <Link
                to="/refund-status"
                className="bg-white/10 hover:bg-pluto-gold hover:text-pluto-navy text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors"
              >
                Track Now →
              </Link>
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
