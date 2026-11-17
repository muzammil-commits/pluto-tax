import React, { useState } from 'react';
import { ServiceCard } from './ServiceCard';
import { useSite } from '../context/SiteContext';
import { Sparkles, ArrowRight, TableProperties, X, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ServicesSection: React.FC = () => {
  const { services, openConsultationModal } = useSite();
  const [filter, setFilter] = useState<'all' | 'individual' | 'business' | 'international'>('all');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

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
    <section id="services-section" className="relative w-full py-10 sm:py-14 bg-slate-50/70 backdrop-blur-sm border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tightened Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pluto-blue-light border border-pluto-navy/20 text-pluto-navy text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>EXPERT FINANCIAL ADVISORY & COMPLIANCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Professional Services
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Comprehensive tax solutions for individuals, families and businesses. Each service is executed by certified professionals adhering to strict IRS code and bilateral international treaties.
          </p>

          {/* Filter Pills & Compare Button */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All 9 Services' },
              { id: 'individual', label: 'Individual & Wealth' },
              { id: 'international', label: 'Cross-Border & NRI' },
              { id: 'business', label: 'Business & Corporate' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${
                  filter === tab.id
                    ? 'bg-pluto-navy text-white shadow-md'
                    : 'bg-white text-slate-600 hover:text-pluto-navy hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}

            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white text-pluto-navy hover:bg-pluto-blue-light border border-pluto-navy/30 transition-all shadow-sm"
            >
              <TableProperties className="w-3.5 h-3.5 text-pluto-gold" />
              <span>Compare All Matrix</span>
            </button>
          </div>

        </motion.div>

        {/* 9 Services Cards Grid - Tightened Gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredServices.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Bottom Banner with Reduced Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-pluto-gold/30"
        >
          <div className="max-w-xl text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Not sure which service fits your tax situation?
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Schedule a preliminary 15-minute consultation with our senior tax team. We will review your filing requirements with zero obligation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => openConsultationModal('General Tax Assessment')}
              className="bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
            >
              Request Free Assessment
            </button>
            <Link
              to="/about"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-4 py-3 rounded-xl border border-white/20 text-center transition-colors"
            >
              Why Choose PlutoTax →
            </Link>
          </div>
        </motion.div>

      </div>

      {/* Compare Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-5">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                  Service Feature Comparison Matrix
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Comprehensive breakdown of all 9 PlutoTax services.
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Service</th>
                    <th className="py-2.5 px-3">CPA Review</th>
                    <th className="py-2.5 px-3">IRS Direct E-File</th>
                    <th className="py-2.5 px-3">DTAA / Cross-Border</th>
                    <th className="py-2.5 px-3">Audit Defense</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {services.map((svc) => (
                    <tr key={svc.id} className="hover:bg-slate-50">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{svc.title}</td>
                      <td className="py-2.5 px-3 text-emerald-600"><Check className="w-3.5 h-3.5" /></td>
                      <td className="py-2.5 px-3 text-emerald-600"><Check className="w-3.5 h-3.5" /></td>
                      <td className="py-2.5 px-3">
                        {['fbar-fatca', 'nri-tax-solutions', 'itin-processing', 'federal-tax-preparation'].includes(svc.slug) ? (
                          <span className="text-emerald-600 font-bold">Yes</span>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-emerald-600"><Check className="w-3.5 h-3.5" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => {
                  setIsCompareModalOpen(false);
                  openConsultationModal('Comparison Matrix Assessment');
                }}
                className="bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-bold px-5 py-2 rounded-xl text-xs transition-colors"
              >
                Schedule Consultation
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
