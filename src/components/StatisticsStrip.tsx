import React, { useState, useEffect } from 'react';
import { useSite } from '../context/SiteContext';
import { ShieldCheck, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// Live Typewriter / Counting Component
const CountingTypewriter: React.FC<{ target: string; isTriggered: boolean }> = ({ target, isTriggered }) => {
  const [displayValue, setDisplayValue] = useState('0');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isTriggered) return;
    setIsTyping(true);

    let end = 0;
    let isFloat = false;
    let prefix = '';
    let suffix = '';

    if (target.includes('15,000') || target.includes('15000')) {
      end = 15000;
      suffix = '+';
    } else if (target.includes('12')) {
      prefix = '$';
      end = 12;
      suffix = 'M+';
    } else if (target.includes('99.8')) {
      end = 99.8;
      isFloat = true;
      suffix = '%';
    } else {
      // General fallback
      setDisplayValue(target);
      setIsTyping(false);
      return;
    }

    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      // Exponential ease-out
      const factor = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = end * factor;

      if (isFloat) {
        setDisplayValue(`${prefix}${current.toFixed(1)}${suffix}`);
      } else if (end >= 1000) {
        setDisplayValue(`${prefix}${Math.round(current).toLocaleString()}${suffix}`);
      } else {
        setDisplayValue(`${prefix}${Math.round(current)}${suffix}`);
      }

      if (step >= steps) {
        clearInterval(interval);
        setDisplayValue(target);
        setIsTyping(false);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, [isTriggered, target]);

  return (
    <span className="relative inline-flex items-center">
      <span>{displayValue}</span>
      {isTyping && (
        <span className="ml-1 inline-block w-1 h-8 sm:h-10 bg-pluto-gold animate-pulse" />
      )}
    </span>
  );
};

export const StatisticsStrip: React.FC = () => {
  const { statistics } = useSite();
  const [isVisible, setIsVisible] = useState(false);

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
    <section 
      className="relative w-full bg-pluto-navy-deep text-white border-y border-pluto-gold/30 overflow-hidden py-8 sm:py-10"
    >
      {/* Subtle Dotted Pattern & Ambient Glow (No ghosted background images) */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255, 191, 0, 0.3) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Subtle Golden Glow Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-16 bg-pluto-gold/15 blur-2xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Verification notice if pending owner approval */}
        {!statistics.isOwnerVerified && (
          <motion.div 
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-4 flex items-center justify-center gap-2 text-[11px] text-amber-300/90 bg-amber-500/10 border border-amber-500/20 py-1 px-3.5 rounded-full max-w-fit mx-auto"
          >
            <Info className="w-3 h-3 text-amber-400 shrink-0" />
            <span>Reference performance metrics — Editable via Admin Console</span>
          </motion.div>
        )}

        {/* 3 Columns Grid with Counting Mode like Typing */}
        <motion.div 
          onViewportEnter={() => setIsVisible(true)}
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-700/60 items-center"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4 py-4 group"
            >
              {/* Typewriter Counter Number */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black text-pluto-gold tracking-tight drop-shadow font-heading">
                <CountingTypewriter target={stat.value} isTriggered={isVisible} />
              </div>

              {/* Elegant White Label */}
              <div className="mt-1.5 text-base sm:text-lg font-bold text-white tracking-wide">
                {stat.label}
              </div>

              {/* Supporting Subtext */}
              <div className="mt-0.5 text-xs text-slate-300 max-w-xs font-normal">
                {stat.detail}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Security / Compliance Footnote */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict adherence to IRS Circular 230 Standards & Gramm-Leach-Bliley Act (GLBA)</span>
        </div>

      </div>

    </section>
  );
};
