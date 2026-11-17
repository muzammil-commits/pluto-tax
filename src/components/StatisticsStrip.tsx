import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Info } from 'lucide-react';

export const StatisticsStrip: React.FC = () => {
  const { statistics } = useSite();
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasAnimated(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      value: statistics.returnsFiled,
      label: "Tax Returns Filed",
      detail: "Accurately prepared across Federal & 50 States",
    },
    {
      value: statistics.refundsMaximized,
      label: "Refunds Maximized",
      detail: "Through legal deductions & treaty credits",
    },
    {
      value: statistics.clientSatisfaction,
      label: "Client Satisfaction",
      detail: "Based on certified client feedback & retention",
    },
  ];

  return (
    <section className="relative w-full bg-pluto-navy-deep text-white border-y border-pluto-gold/20 overflow-hidden py-10 sm:py-14">
      
      {/* Subtle Dotted Pattern Texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle Golden Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-24 bg-pluto-gold/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verification notice if pending owner approval */}
        {!statistics.isOwnerVerified && (
          <div className="mb-6 flex items-center justify-center gap-2 text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/20 py-1.5 px-4 rounded-full max-w-fit mx-auto">
            <Info className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Reference performance metrics — Editable & verified via Secure Admin Console</span>
          </div>
        )}

        {/* 3 Columns Grid with Thin Separators */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-700/60 items-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center px-4 py-6 md:py-4 transition-all duration-700 ${
                hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {/* Large Golden Yellow Number */}
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-pluto-gold tracking-tight drop-shadow font-heading">
                {stat.value}
              </div>

              {/* Elegant White/Light-Grey Label */}
              <div className="mt-2 text-lg sm:text-xl font-bold text-white tracking-wide">
                {stat.label}
              </div>

              {/* Supporting Subtext */}
              <div className="mt-1 text-xs sm:text-sm text-slate-300 max-w-xs font-normal">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Security / Compliance Footnote */}
        <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Strict adherence to IRS Circular 230 Standards & Gramm-Leach-Bliley Act (GLBA)</span>
        </div>

      </div>

    </section>
  );
};
