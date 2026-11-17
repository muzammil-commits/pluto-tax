import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Star, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export const HeroSection: React.FC = () => {
  const { openConsultationModal } = useSite();

  return (
    <section className="relative w-full overflow-hidden min-h-[580px] lg:min-h-[680px] flex items-center bg-pluto-navy-deep">
      
      {/* =========================================================================
          DESKTOP BACKGROUND: image copy 3.png (Bright Look & Unobstructed)
          ========================================================================= */}
      <div className="hidden md:block absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105 hover:scale-100 animate-pulse-subtle"
          style={{
            backgroundImage: `url('/assets/hero-desktop-bg-bright.png')`,
            backgroundPosition: 'right 20% center',
            filter: 'brightness(1.12) contrast(1.06)',
          }}
        />
        {/* Navy Gradient Overlay: darker on the left for crisp text contrast, feathering to transparent on the right so the advisor portrait is 100% visible and bright */}
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/75 to-transparent pointer-events-none" />
        
        {/* Subtle ambient gold and blue light glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pluto-gold/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
        <div className="absolute -bottom-10 left-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
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
            filter: 'brightness(1.10) contrast(1.05)',
          }}
        />
        {/* Mobile Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-pluto-navy-deep/95 via-pluto-navy-deep/80 to-pluto-navy-deep/60 pointer-events-none" />
        <div className="absolute top-12 right-6 w-56 h-56 bg-pluto-gold/20 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headline, Description & CTAs (Clean & Uncluttered) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left max-w-2xl"
          >
            
            {/* Small Top Label */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pluto-navy/85 border border-pluto-gold/50 text-pluto-gold text-xs sm:text-sm font-bold tracking-wider uppercase mb-5 backdrop-blur-md shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-pluto-gold" />
              <span>YOUR TRUSTED PARTNER IN TAX PLANNING</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.14] tracking-tight font-heading"
            >
              Smart Tax Solutions.{' '}
              <span className="block mt-1 sm:mt-2 text-pluto-gold font-extrabold drop-shadow-sm">
                Greater Financial Confidence.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mt-5 text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed max-w-xl font-normal drop-shadow"
            >
              From US tax preparation to international compliance and strategic tax planning,
              PlutoTax delivers personalized expertise to help individuals and businesses
              navigate taxes with confidence.
            </motion.p>

            {/* Trust Badges Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mt-6 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-medium"
            >
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
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 w-full sm:w-auto"
            >
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
            </motion.div>

            {/* Rating Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-8 pt-6 border-t border-white/10 flex items-center gap-3"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">4.9 / 5.0 Rating</span>
              <span className="text-slate-400 text-xs hidden sm:inline">|</span>
              <span className="text-xs text-slate-300 hidden sm:inline">Trusted by 15,000+ Taxpayers</span>
            </motion.div>

          </motion.div>

          {/* Right Column: Kept completely empty so the background portrait of the advisor and US Capitol architecture is 100% visible without any covering boxes or text */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 min-h-[300px]" />

        </div>
      </div>

    </section>
  );
};
