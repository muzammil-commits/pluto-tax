import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export const HeroSection: React.FC = () => {
  const { openConsultationModal } = useSite();

  return (
    <section className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[500px] lg:min-h-[560px] flex items-center bg-pluto-navy-deep">
      
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
        {/* Navy Gradient Overlay: darker on the left for crisp text contrast, feathering to transparent on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/75 to-transparent pointer-events-none" />
        
        {/* Subtle ambient light glows */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pluto-gold/15 rounded-full blur-3xl pointer-events-none animate-float-slow" />
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
      </div>

      {/* Hero Foreground Content - Tightened Spacing & Reduced Sizes */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Column: Headline, Description & CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-7 xl:col-span-7 flex flex-col items-start text-left max-w-xl"
          >
            
            {/* Small Top Label */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pluto-navy/85 border border-pluto-gold/50 text-pluto-gold text-xs font-bold tracking-wider uppercase mb-3.5 backdrop-blur-md shadow-sm"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-pluto-gold" />
              <span>YOUR TRUSTED PARTNER IN TAX PLANNING</span>
            </motion.div>

            {/* Main Headline - Properly scaled */}
            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] tracking-tight font-heading"
            >
              Smart Tax Solutions.{' '}
              <span className="block mt-1 text-pluto-gold font-extrabold drop-shadow-sm">
                Greater Financial Confidence.
              </span>
            </motion.h1>

            {/* Supporting Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="mt-3.5 text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal drop-shadow"
            >
              From US tax preparation to international compliance and strategic tax planning,
              PlutoTax delivers personalized expertise to help individuals and businesses
              navigate taxes with confidence.
            </motion.p>

            {/* Trust Badges Bar */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-slate-300 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Licensed CPA Review</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>IRS Authorized CAA</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>US-India DTAA Treaty Experts</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto"
            >
              <button
                onClick={() => openConsultationModal()}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-6 py-3 rounded-xl font-extrabold text-sm tracking-wide shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-amber-300"
              >
                <span>Get a Free Tax Quote</span>
                <ArrowRight className="w-4 h-4 text-pluto-navy-deep" />
              </button>

              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/25 hover:border-white/50 backdrop-blur-md px-5 py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-md"
              >
                <span>Explore Our Services</span>
              </Link>
            </motion.div>

            {/* Rating Strip */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65, duration: 0.5 }}
              className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2.5 text-xs text-slate-300"
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-semibold text-white">4.9 / 5.0 Rating</span>
              <span className="text-slate-500">•</span>
              <span>15,000+ Returns Filed</span>
            </motion.div>

          </motion.div>

          {/* Right Column: Kept completely empty so the background portrait of the advisor and US Capitol architecture is 100% visible without any covering boxes or text */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 min-h-[260px]" />

        </div>
      </div>

    </section>
  );
};
