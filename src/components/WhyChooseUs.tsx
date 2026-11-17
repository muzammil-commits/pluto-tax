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
import { motion } from 'framer-motion';
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

const VALUE_IMAGES: { image: string; tag: string }[] = [
  {
    image: '/assets/services/federal-tax.png',
    tag: 'IRS Compliant'
  },
  {
    image: '/assets/services/audit-assistance.png',
    tag: 'Zero Hidden Fees'
  },
  {
    image: '/assets/services/wealth-advisory.png',
    tag: '99.8% Satisfaction'
  },
  {
    image: '/assets/portal-grand-preview.png',
    tag: '256-Bit TLS Vault'
  },
  {
    image: '/assets/services/tax-planning.png',
    tag: 'CPA & CAA Licensed'
  },
  {
    image: '/assets/services/nri-tax.png',
    tag: 'US-India DTAA'
  },
  {
    image: '/assets/austin-hq-banner.png',
    tag: 'Austin Headquarters'
  }
];

export const WhyChooseUs: React.FC = () => {
  const { openConsultationModal } = useSite();

  return (
    <section className="relative w-full py-12 sm:py-16 bg-pluto-navy-deep text-white overflow-hidden border-t border-pluto-gold/20">
      
      {/* Background Graphic Elements */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFBF00 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
      
      <div className="absolute top-1/3 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-pluto-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/10 border border-pluto-gold/40 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>UNCOMPROMISING STANDARDS & CORE VALUES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
            Our Core Values & Why Choose PlutoTax
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Every client engagement is built upon strict accuracy, uncompromising ethical standards, and personalized CPA advisory.
          </p>
        </motion.div>

        {/* 7 Core Values Grid with Photo Representation for each value */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {CORE_VALUES.map((val, idx) => {
            const Icon = ICON_MAP[val.icon] || ShieldCheck;
            const imgData = VALUE_IMAGES[idx] || { image: '/assets/services/federal-tax.png', tag: 'Verified Standard' };
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: idx * 0.05, duration: 0.45 }}
                className="group relative bg-pluto-navy-surface/80 hover:bg-pluto-navy-surface backdrop-blur-md rounded-2xl overflow-hidden border border-slate-700/60 hover:border-pluto-gold/80 transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Related Photo Representation Header */}
                <div className="relative h-32 w-full overflow-hidden bg-slate-800">
                  <img
                    src={imgData.image}
                    alt={val.title}
                    className="w-full h-full object-cover object-center filter brightness-[0.9] group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-pluto-navy-deep via-pluto-navy-deep/40 to-transparent" />
                  
                  {/* Floating Tag */}
                  <span className="absolute top-2.5 right-2.5 bg-pluto-navy-deep/90 border border-pluto-gold/50 text-pluto-gold text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm">
                    {imgData.tag}
                  </span>

                  {/* Icon Badge overlapping photo */}
                  <div className="absolute -bottom-3 left-4 w-9 h-9 rounded-xl bg-pluto-navy-deep group-hover:bg-pluto-gold/20 border border-pluto-gold/50 flex items-center justify-center text-pluto-gold shadow-md transition-colors">
                    <Icon className="w-4 h-4 text-pluto-gold" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 pt-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Title */}
                    <h3 className="text-base font-bold text-white group-hover:text-pluto-gold transition-colors font-heading leading-snug">
                      {val.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-slate-300 leading-relaxed font-normal">
                      {val.description}
                    </p>
                  </div>

                  {/* Subtle bottom indicator */}
                  <div className="mt-4 pt-2.5 border-t border-slate-700/40 flex items-center justify-between text-[10px] text-slate-400 font-semibold group-hover:text-pluto-gold transition-colors">
                    <span>Standard #{idx + 1}</span>
                    <span className="text-emerald-400">Verified Protocol</span>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* 8th CTA Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.45 }}
            className="group relative bg-gradient-to-br from-pluto-gold via-pluto-gold-bright to-amber-500 rounded-2xl p-5 text-pluto-navy-deep shadow-xl flex flex-col justify-between transform hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-pluto-navy-deep text-pluto-gold flex items-center justify-center mb-3 shadow-md">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black font-heading leading-tight">
                Ready for Stress-Free Tax Advisory?
              </h3>
              <p className="mt-2 text-xs text-pluto-navy-deep/90 font-medium leading-relaxed">
                Connect with our licensed CPAs and maximize every allowable credit and deduction under IRS code.
              </p>
            </div>
            
            <button
              onClick={() => openConsultationModal('Why Choose PlutoTax CTA')}
              className="mt-5 inline-flex items-center justify-center gap-1.5 bg-pluto-navy-deep hover:bg-black text-white px-4 py-3 rounded-xl font-bold text-xs shadow-md transition-transform hover:scale-[1.02]"
            >
              <span>Schedule Free Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-pluto-gold" />
            </button>
          </motion.div>

        </div>

      </div>

    </section>
  );
};
