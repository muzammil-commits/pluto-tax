import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ServiceCard } from '../components/ServiceCard';
import { useSite } from '../context/SiteContext';
import { Sparkles, Search, Check, ArrowRight } from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const { services, openConsultationModal } = useSite();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = services.filter((svc) => {
    const matchesSearch =
      svc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      svc.tagline.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'individual') {
      return ['tax-planning', 'federal-tax-preparation', 'tax-extension', 'wealth-advisory'].includes(svc.slug);
    }
    if (categoryFilter === 'international') {
      return ['fbar-fatca', 'nri-tax-solutions', 'itin-processing', 'federal-tax-preparation'].includes(svc.slug);
    }
    if (categoryFilter === 'business') {
      return ['business-tax', 'tax-planning', 'tax-extension', 'audit-assistance'].includes(svc.slug);
    }
    return true;
  });

  return (
    <div className="w-full bg-[#EAF3FF]/40">
      
      {/* Page Hero with image copy 24.png (Capitol + Sky Banner) */}
      <section className="relative w-full min-h-[380px] sm:min-h-[420px] flex items-center overflow-hidden border-b border-blue-200/80 bg-pluto-navy-deep">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('/assets/hero-capitol-banner.jpg'), url('/assets/hero-capitol-banner.png')`,
            backgroundPosition: 'right 25% center',
            filter: 'brightness(1.08) contrast(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/80 to-transparent pointer-events-none" />
        <div className="md:hidden absolute inset-0 bg-pluto-navy-deep/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 w-full">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'Services' }]} />
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPREHENSIVE TAX & ADVISORY PORTFOLIO</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
              Our Nine Professional Tax Specialties
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal drop-shadow">
              Whether you need strategic wealth planning, federal return preparation, NRI cross-border optimization, or business bookkeeping, each service is led by certified professionals with unmatched technical precision.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-slate-50 border-b border-slate-200 sticky top-16 md:top-20 z-30 backdrop-blur-md bg-slate-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', label: 'All Services (9)' },
              { id: 'individual', label: 'Individual & Wealth' },
              { id: 'international', label: 'Cross-Border & NRI' },
              { id: 'business', label: 'Business & Corporate' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  categoryFilter === cat.id
                    ? 'bg-pluto-navy text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search services or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pluto-navy"
            />
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-slate-600 font-medium">No services match your search keyword "{searchTerm}".</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setCategoryFilter('all');
              }}
              className="mt-3 text-sm font-bold text-pluto-navy hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Comparison Matrix Overview */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
              Service Feature Matrix
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every engagement with PlutoTax includes our baseline quality assurances.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-4 px-6">Service Category</th>
                  <th className="py-4 px-6">CPA Review</th>
                  <th className="py-4 px-6">IRS E-Filing</th>
                  <th className="py-4 px-6">Audit Defense Support</th>
                  <th className="py-4 px-6">Direct Messaging</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-slate-900">{svc.title}</td>
                    <td className="py-3.5 px-6 text-emerald-600"><Check className="w-4 h-4" /></td>
                    <td className="py-3.5 px-6 text-emerald-600"><Check className="w-4 h-4" /></td>
                    <td className="py-3.5 px-6 text-emerald-600"><Check className="w-4 h-4" /></td>
                    <td className="py-3.5 px-6 text-emerald-600"><Check className="w-4 h-4" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-pluto-gold/30">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading">
              Ready to file with confidence?
            </h3>
            <p className="mt-2 text-sm text-slate-300 max-w-xl">
              Get in touch with our team today for an upfront quote and personalized filing plan.
            </p>
          </div>
          <button
            onClick={() => openConsultationModal('Services Page Banner')}
            className="shrink-0 bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold px-8 py-4 rounded-xl text-sm shadow-xl transition-transform hover:scale-[1.02]"
          >
            Get a Free Consultation
          </button>
        </div>
      </section>

    </div>
  );
};
