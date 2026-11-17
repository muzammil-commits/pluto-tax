import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, MessageSquare, X } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const FloatingActions: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const { openConsultationModal } = useSite();

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2 animate-fade-in">
      {isExpanded && (
        <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 mb-2 flex flex-col gap-2 animate-fade-up">
          <button
            onClick={() => {
              setIsExpanded(false);
              openConsultationModal('Floating Quick Quote');
            }}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-pluto-navy hover:bg-pluto-navy-deep text-white text-xs font-bold transition-all shadow"
          >
            <Sparkles className="w-4 h-4 text-pluto-gold" />
            <span>Get Free Tax Quote</span>
          </button>

          <a
            href="#refund-estimator"
            onClick={() => setIsExpanded(false)}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
          >
            <Calculator className="w-4 h-4 text-pluto-navy" />
            <span>Open Refund Estimator</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 bg-pluto-navy-deep hover:bg-pluto-navy text-white px-4 py-3 rounded-full shadow-2xl border border-pluto-gold/50 transition-all hover:scale-105 active:scale-95"
        aria-label="Quick Actions"
      >
        {isExpanded ? (
          <X className="w-4 h-4 text-pluto-gold" />
        ) : (
          <Sparkles className="w-4 h-4 text-pluto-gold animate-spin-slow" />
        )}
        <span className="text-xs font-extrabold tracking-wide">
          {isExpanded ? 'Close Menu' : 'Quick Tax Quote'}
        </span>
      </button>
    </div>
  );
};
