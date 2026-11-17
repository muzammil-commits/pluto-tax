import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSite } from '../context/SiteContext';
import { 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  FileText, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall,
  Sparkles,
  Users,
  CheckCircle
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { services, openConsultationModal } = useSite();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const service = services.find((s) => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Service Not Found</h2>
        <p className="mt-2 text-slate-600">The requested tax service page does not exist.</p>
        <Link to="/services" className="mt-4 inline-block text-pluto-navy font-bold hover:underline">
          Return to Services Directory →
        </Link>
      </div>
    );
  }

  const relatedServicesList = services.filter((s) => service.relatedServices.includes(s.slug));

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="w-full bg-white">
      
      {/* 1. Premium Service-Specific Hero Section */}
      <section className="relative bg-pluto-navy-deep text-white py-14 sm:py-20 overflow-hidden border-b border-pluto-gold/20">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-pluto-gold/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs
              variant="light"
              items={[
                { name: 'Services', path: '/services' },
                { name: service.title },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Title & Overview */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PLUTOTAX SPECIALIZED PRACTICE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
                {service.title}
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {service.tagline}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-emerald-300">
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Licensed CPA Review
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> IRS E-Filing Direct
                </span>
                <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Audit Defense Included
                </span>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <button
                  onClick={() => openConsultationModal(service.title)}
                  className="bg-gradient-to-r from-pluto-gold to-pluto-gold-bright text-pluto-navy-deep px-7 py-3.5 rounded-xl font-black text-sm shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]"
                >
                  Consult a Tax Specialist
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-xl font-bold text-sm border border-white/20 transition-colors"
                >
                  <PhoneCall className="w-4 h-4 text-pluto-gold" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Service Hero Image Visual */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-2 border-pluto-gold/40 bg-pluto-navy group">
                <img
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-[280px] sm:h-[340px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Comprehensive Service Details */}
          <div className="lg:col-span-8 space-y-14">
            
            {/* 2. Detailed Service Explanation */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Comprehensive Overview
              </h2>
              <div className="mt-4 text-base text-slate-700 leading-relaxed space-y-4">
                <p>{service.fullDescription}</p>
                <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <strong className="text-slate-900">PlutoTax Quality Guarantee:</strong> Every document submitted is checked by our senior tax review panel for full compliance with the latest Treasury Regulations and state statutory provisions.
                </p>
              </div>
            </div>

            {/* 3. Who Needs This Service? */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Users className="w-6 h-6 text-pluto-navy" />
                <span>Who Needs This Service?</span>
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3">
                {service.whoNeedsThis.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-pluto-gold/60 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Key Benefits */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Key Strategic Benefits
              </h3>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.keyBenefits.map((ben, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-pluto-blue-soft/50 border border-pluto-blue-light">
                    <div className="w-8 h-8 rounded-lg bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-xs mb-2">
                      0{idx + 1}
                    </div>
                    <p className="text-sm font-semibold text-slate-900 leading-snug">
                      {ben}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. How the Process Works */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                How Our Process Works
              </h3>
              <div className="mt-6 space-y-4">
                {service.processSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-xl bg-pluto-navy-deep text-pluto-gold font-black text-lg flex items-center justify-center shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{step.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Required Documents Checklist */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <FileText className="w-6 h-6 text-pluto-navy" />
                <span>Required Documents Checklist</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Upload these forms securely into your PlutoTax portal to start your review:
              </p>
              <div className="mt-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-3">
                {service.requiredDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                      ✓
                    </div>
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 7. Frequently Asked Questions (Accordions) */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-pluto-navy" />
                <span>Frequently Asked Questions</span>
              </h3>
              <div className="mt-5 space-y-3">
                {service.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div 
                      key={idx}
                      className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 sm:p-5 text-left font-bold text-slate-900 flex items-center justify-between gap-4 hover:bg-slate-50"
                      >
                        <span className="text-sm sm:text-base">{faq.question}</span>
                        <ChevronDown 
                          className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-pluto-navy' : ''
                          }`} 
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3 bg-slate-50/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Sidebar with Actions & Related Services */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Consultation Card */}
            <div className="bg-pluto-navy-deep text-white rounded-3xl p-6 sm:p-8 border border-pluto-gold/40 shadow-xl relative overflow-hidden">
              <span className="text-xs font-bold text-pluto-gold uppercase tracking-wider">
                Speak to a CPA
              </span>
              <h4 className="text-xl font-bold font-heading text-white mt-1">
                Have questions about {service.title}?
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Connect directly with our Austin, TX advisory team for upfront pricing and personalized filing guidance.
              </p>

              <button
                onClick={() => openConsultationModal(service.title)}
                className="w-full mt-6 bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-black py-3.5 rounded-xl text-sm shadow-md transition-transform hover:scale-[1.02]"
              >
                Request Free Tax Quote
              </button>

              <div className="mt-4 pt-4 border-t border-slate-700/80 text-xs text-slate-400 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-3.5 h-3.5 text-pluto-gold" />
                  <span>Direct: {COMPANY_INFO.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-pluto-gold" />
                  <span>Hours: Mon - Fri 8am - 7pm CST</span>
                </div>
              </div>
            </div>

            {/* Related Services */}
            {relatedServicesList.length > 0 && (
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-4">
                  Related Tax Services
                </h4>
                <div className="space-y-3">
                  {relatedServicesList.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/services/${rel.slug}`}
                      className="block p-3 rounded-xl bg-white border border-slate-200 hover:border-pluto-navy transition-colors group"
                    >
                      <div className="text-sm font-bold text-slate-900 group-hover:text-pluto-navy flex items-center justify-between">
                        <span>{rel.title}</span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-pluto-navy transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-1">
                        {rel.tagline}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Client Portal Promo */}
            <div className="bg-gradient-to-br from-pluto-blue-light to-white p-6 rounded-2xl border border-pluto-blue-light text-slate-800">
              <h4 className="text-sm font-bold text-pluto-navy">
                Already registered?
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Upload your tax forms directly into your encrypted vault for immediate CPA calculation.
              </p>
              <Link
                to="/portal"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-pluto-navy hover:underline"
              >
                <span>Access Client Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
