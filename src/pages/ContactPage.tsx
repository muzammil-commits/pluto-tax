import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConsultationSection } from '../components/ConsultationSection';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  Building2,
  FileCheck2,
  CheckCircle2,
  Calendar,
  Navigation
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#EAF3FF]/40 text-slate-800">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION with image copy 24.png (Capitol + Sky Banner)
          ========================================================================= */}
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
            <Breadcrumbs items={[{ name: 'Contact Us' }]} />
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/40 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GET IN TOUCH WITH OUR ADVISORY TEAM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
              Contact PlutoTax Consulting & Advisory LLC
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal drop-shadow">
              Have questions regarding your US tax filing, visa residency status, or corporate bookkeeping? Reach out directly to our Austin, TX team for confidential guidance.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MAIN INQUIRY & CONSULTATION FORM
          ========================================================================= */}
      <ConsultationSection />

      {/* =========================================================================
          SECTION 3: AUSTIN HEADQUARTERS with image copy 26.png (Grand Composite)
          ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-2 border-white ring-1 ring-blue-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Details */}
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-pluto-navy uppercase tracking-wider bg-blue-100/80 px-3 py-1 rounded-full">
              <MapPin className="w-3.5 h-3.5 text-pluto-gold" />
              <span>VISIT OUR AUSTIN OFFICE</span>
            </div>
            
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-slate-900">
              814 San Jacinto Suite 400
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Located in the heart of downtown Austin, Texas, convenient to the Capitol complex and Austin financial corridor. In-person meetings are available by advance appointment for Certifying Acceptance Agent (CAA) document reviews.
            </p>
            
            <div className="pt-2 space-y-2 text-xs text-slate-600 border-t border-slate-100">
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 min-w-20">Address:</strong> 
                <span>814 San Jacinto Suite 400, Austin, TX 78701, USA</span>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 min-w-20">Phone:</strong> 
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-pluto-navy font-bold hover:underline">+1 (254) 221-0222</a>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 min-w-20">Email:</strong> 
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-pluto-navy font-bold hover:underline">support@plutotax.com</a>
              </div>
              <div className="flex items-start gap-2">
                <strong className="text-slate-900 min-w-20">Hours:</strong> 
                <span>Monday – Friday: 8:00 AM – 7:00 PM CST | Saturday: 9:00 AM – 3:00 PM CST</span>
              </div>
            </div>
          </div>

          {/* Right Corporate Box with image copy 26.png */}
          <div className="lg:col-span-6 h-72 sm:h-96 rounded-2xl overflow-hidden relative shadow-lg border border-pluto-gold/40 flex flex-col justify-between p-6 sm:p-8 bg-pluto-navy-deep text-white group">
            {/* Background image 26 */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-7000 ease-out transform group-hover:scale-105"
              style={{
                backgroundImage: `url('/assets/austin-hq-banner.jpg'), url('/assets/austin-hq-banner.png')`,
                backgroundPosition: 'center',
                filter: 'brightness(1.06) contrast(1.05)',
              }}
            />
            {/* Gradient overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-pluto-navy-deep/95 via-pluto-navy-deep/60 to-pluto-navy-deep/30 pointer-events-none" />

            <div className="relative z-10">
              <span className="text-[11px] font-extrabold text-pluto-gold uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-pluto-gold/40">
                Corporate Headquarters
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold mt-2 font-heading text-white">
                Austin, Texas, USA
              </h4>
              <p className="text-xs text-slate-200 mt-1 max-w-sm leading-relaxed drop-shadow">
                PlutoTax Consulting & Advisory LLC maintains full state and federal tax authorization across all 50 US jurisdictions.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-4">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-4 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all hover:scale-[1.02] border border-amber-300"
              >
                Call +1 (254) 221-0222
              </a>
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-colors shadow-sm"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
