import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ConsultationSection } from '../components/ConsultationSection';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* Page Hero */}
      <section className="relative bg-pluto-navy-deep text-white py-16 sm:py-24 overflow-hidden border-b border-pluto-gold/20">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'Contact Us' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GET IN TOUCH WITH OUR ADVISORY TEAM</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Contact PlutoTax Consulting & Advisory LLC
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Have questions regarding your US tax filing, visa residency status, or corporate bookkeeping? Reach out directly to our Austin, TX team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Consultation Section Component */}
      <ConsultationSection />

      {/* Location & Map Card */}
      <section className="py-12 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-pluto-navy uppercase tracking-wider mb-2">
                <MapPin className="w-4 h-4 text-pluto-gold" />
                <span>VISIT OUR AUSTIN OFFICE</span>
              </div>
              <h3 className="text-2xl font-bold font-heading text-slate-900">
                814 San Jacinto Suite 400
              </h3>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Located in the heart of downtown Austin, Texas, convenient to the Capitol complex and Austin financial corridor. In-person meetings are available by advance appointment for Certifying Acceptance Agent (CAA) document reviews.
              </p>
              
              <div className="mt-6 space-y-2 text-xs text-slate-600">
                <div><strong>Address:</strong> {COMPANY_INFO.address}</div>
                <div><strong>Phone:</strong> {COMPANY_INFO.phone}</div>
                <div><strong>Email:</strong> {COMPANY_INFO.email}</div>
                <div><strong>Office Hours:</strong> {COMPANY_INFO.workingHours}</div>
              </div>
            </div>

            <div className="h-64 sm:h-80 rounded-2xl bg-pluto-navy-deep p-6 text-white flex flex-col justify-between border border-pluto-gold/30 relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-xs font-bold text-pluto-gold uppercase">Corporate Headquarters</span>
                <h4 className="text-xl font-bold mt-1">Austin, Texas, USA</h4>
                <p className="text-xs text-slate-300 mt-2 max-w-xs">
                  PlutoTax Consulting & Advisory LLC maintains full state and federal authorization across all 50 US jurisdictions.
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-3">
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="bg-pluto-gold text-pluto-navy-deep px-4 py-2 rounded-lg font-bold text-xs hover:bg-pluto-gold-bright transition-colors"
                >
                  Call +1 (254) 221-0222
                </a>
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-emerald-500 transition-colors"
                >
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
