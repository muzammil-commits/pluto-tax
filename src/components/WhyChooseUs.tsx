import React from 'react';
import { CORE_VALUES } from '../data/companyData';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Smile, 
  Lock, 
  Award, 
  Globe, 
  Scale, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useSite } from '../context/SiteContext';

const ICON_MAP: Record<string, React.ElementType> = {
  CheckCircle2,
  ShieldCheck,
  Smile,
  Lock,
  Award,
  Globe,
  Scale,
};

export const WhyChooseUs: React.FC = () => {
  const { openConsultationModal } = useSite();

  return (
    <section className="relative w-full py-20 sm:py-28 bg-pluto-navy-deep text-white overflow-hidden border-t border-pluto-gold/20">
      
      {/* Background Graphic Elements */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFBF00 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pluto-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-pluto-gold/40 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>UNCOMPROMISING STANDARDS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Why Choose PlutoTax?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Your goals are our priority. We are committed to providing trusted, personalized and reliable tax solutions.
          </p>
        </div>

        {/* 7 Core Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CORE_VALUES.map((val, idx) => {
            const Icon = ICON_MAP[val.icon] || ShieldCheck;
            return (
              <div
                key={idx}
                className="group relative bg-pluto-navy-surface/70 hover:bg-pluto-navy-surface backdrop-blur-md rounded-2xl p-6 border border-slate-700/60 hover:border-pluto-gold/80 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  {/* Icon with Gold Accent */}
                  <div className="w-12 h-12 rounded-xl bg-pluto-navy-deep group-hover:bg-pluto-gold/20 border border-pluto-gold/40 flex items-center justify-center text-pluto-gold transition-colors mb-4">
                    <Icon className="w-6 h-6 text-pluto-gold" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-white group-hover:text-pluto-gold transition-colors font-heading leading-snug">
                    {val.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {val.description}
                  </p>
                </div>

                {/* Subtle bottom indicator */}
                <div className="mt-5 pt-3 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400 font-semibold group-hover:text-pluto-gold transition-colors">
                  <span>Guaranteed Standard</span>
                  <span>0{idx + 1}</span>
                </div>
              </div>
            );
          })}

          {/* 8th CTA Card */}
          <div className="group relative bg-gradient-to-br from-pluto-gold via-pluto-gold-bright to-amber-500 rounded-2xl p-6 text-pluto-navy-deep shadow-2xl flex flex-col justify-between transform hover:-translate-y-1.5 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-pluto-navy-deep text-pluto-gold flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black font-heading leading-tight">
                Ready to Experience Stress-Free Taxes?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-pluto-navy-deep/90 font-medium">
                Connect with our licensed tax professionals and see how much you can save this season.
              </p>
            </div>
            
            <button
              onClick={() => openConsultationModal('Why Choose PlutoTax CTA')}
              className="mt-6 inline-flex items-center justify-center gap-2 bg-pluto-navy-deep hover:bg-black text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-[1.02]"
            >
              <span>Schedule Consultation</span>
              <ArrowRight className="w-4 h-4 text-pluto-gold" />
            </button>
          </div>

        </div>

      </div>

    </section>
  );
};
