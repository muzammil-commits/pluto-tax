import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useSite } from '../context/SiteContext';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesSection: React.FC = () => {
  const { services, openConsultationModal } = useSite();
  const [filter, setFilter] = useState<'all' | 'individual' | 'business' | 'international'>('all');

  const filteredServices = services.filter((svc) => {
    if (filter === 'all') return true;
    if (filter === 'individual') {
      return ['tax-planning', 'federal-tax-preparation', 'tax-extension', 'wealth-advisory'].includes(svc.slug);
    }
    if (filter === 'business') {
      return ['business-tax', 'tax-planning', 'tax-extension', 'audit-assistance'].includes(svc.slug);
    }
    if (filter === 'international') {
      return ['fbar-fatca', 'nri-tax-solutions', 'itin-processing', 'federal-tax-preparation'].includes(svc.slug);
    }
    return true;
  });

  return (
    <section id="services-section" className="relative w-full py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pluto-blue-light/50 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pluto-blue-light border border-pluto-navy/20 text-pluto-navy text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>EXPERT FINANCIAL ADVISORY & COMPLIANCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Professional Services
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Comprehensive tax solutions for individuals, families and businesses. Each service is executed by certified professionals adhering to strict IRS code and bilateral international treaties.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {[
              { id: 'all', label: 'All 9 Services' },
              { id: 'individual', label: 'Individual & Wealth' },
              { id: 'international', label: 'Cross-Border & NRI' },
              { id: 'business', label: 'Business & Corporate' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-pluto-navy text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-pluto-navy hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* 9 Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep rounded-2xl p-8 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-pluto-gold/30">
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-2xl font-bold font-heading text-white">
              Not sure which service fits your tax situation?
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              Schedule a preliminary 15-minute consultation with our senior tax team. We will review your filing requirements and recommend the optimal solution with zero obligation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => openConsultationModal('General Tax Assessment')}
              className="bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold text-sm px-6 py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
            >
              Request Free Assessment
            </button>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-xl border border-white/20 text-center transition-colors"
            >
              Why Choose PlutoTax →
            </Link>
          </div>
        </div>

      </div>

    </section>
  );
};
