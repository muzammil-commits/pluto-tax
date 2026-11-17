import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  TrendingUp, 
  FileSpreadsheet, 
  ShieldAlert, 
  FileBadge, 
  Building2, 
  Globe2, 
  Clock, 
  ShieldCheck, 
  Coins,
  CheckCircle,
  Eye,
  X,
  PhoneCall,
  FileText,
  Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceItem } from '../types';
import { useSite } from '../context/SiteContext';

interface ServiceCardProps {
  service: ServiceItem;
  index: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  TrendingUp,
  FileSpreadsheet,
  ShieldAlert,
  FileBadge,
  Building2,
  Globe2,
  Clock,
  ShieldCheck,
  Coins,
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activePopupTab, setActivePopupTab] = useState<'overview' | 'who' | 'docs'>('overview');
  const { openConsultationModal } = useSite();
  const IconComponent = ICON_MAP[service.iconName] || TrendingUp;

  return (
    <>
      {/* Service Card with Staggered Scroll Animation and Elegant Hover */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay: (index % 3) * 0.15, duration: 0.6, ease: "easeOut" }}
        className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
      >
        {/* Top Image with Zoom Effect */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-pluto-navy-deep">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center filter brightness-[1.03] group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-pluto-navy-deep/85 via-pluto-navy-deep/30 to-transparent" />
          
          {/* Card Icon Badge */}
          <div className="absolute top-3.5 left-3.5 w-11 h-11 rounded-xl bg-pluto-navy/90 border border-pluto-gold/50 backdrop-blur-md flex items-center justify-center text-pluto-gold shadow-md">
            <IconComponent className="w-5 h-5 text-pluto-gold" />
          </div>

          {/* Service Tag */}
          <div className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-md bg-pluto-navy-deep/80 border border-white/20 backdrop-blur-md text-[11px] font-bold text-slate-200 tracking-wide">
            0{index + 1}
          </div>

          {/* Quick Preview Hover Button */}
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="absolute bottom-3 right-3 bg-white/95 hover:bg-pluto-gold text-pluto-navy-deep text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5"
            title="Quick Preview"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            {/* Title */}
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-pluto-navy transition-colors font-heading leading-snug">
              {service.title}
            </h3>

            {/* Tagline */}
            <p className="text-xs font-semibold text-pluto-gold-dark mt-1.5 line-clamp-1">
              {service.tagline}
            </p>

            {/* Short Description */}
            <p className="mt-3 text-sm text-slate-600 leading-relaxed line-clamp-3">
              {service.shortDescription}
            </p>
          </div>

          {/* Bottom Action Strip */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to={`/services/${service.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-pluto-navy group-hover:text-pluto-gold-dark transition-colors"
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setIsPreviewOpen(true)}
              className="text-xs font-bold text-slate-500 hover:text-pluto-navy flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>
          </div>

        </div>

        {/* Subtle Bottom Gold Border Highlight on Hover */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-pluto-gold via-pluto-gold-bright to-pluto-gold transition-all duration-300" />
      </motion.div>

      {/* =========================================================================
          LIVE QUICK VIEW POPUP MODAL (ENHANCED WITH TABS & POPUP ANIMATION)
          ========================================================================= */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Popup Hero Image */}
            <div className="relative h-48 sm:h-56 w-full bg-pluto-navy-deep overflow-hidden">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover filter brightness-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pluto-navy-deep/95 via-pluto-navy-deep/45 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold text-pluto-gold uppercase tracking-wider">
                  Service Snapshot & Quick Details
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-0.5 font-heading">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Modal Interactive Tabs */}
            <div className="flex border-b border-slate-200 px-6 pt-3 bg-slate-50">
              {[
                { id: 'overview', label: 'Overview & Benefits' },
                { id: 'who', label: 'Who Needs This?' },
                { id: 'docs', label: 'Required Documents' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActivePopupTab(tab.id as any)}
                  className={`py-3 px-4 text-xs font-bold border-b-2 transition-colors ${
                    activePopupTab === tab.id
                      ? 'border-pluto-navy text-pluto-navy bg-white rounded-t-lg'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Popup Body by Tab */}
            <div className="p-6 sm:p-8">
              {activePopupTab === 'overview' && (
                <div className="space-y-5 animate-fade-in">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {service.fullDescription}
                  </p>

                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Key Strategic Advantages
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.keyBenefits.map((ben, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ben}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePopupTab === 'who' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <Users className="w-4 h-4 text-pluto-navy" />
                    <span>Ideal Taxpayers for this Service</span>
                  </div>
                  {service.whoNeedsThis.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              )}

              {activePopupTab === 'docs' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    <FileText className="w-4 h-4 text-pluto-navy" />
                    <span>Forms & Records Required</span>
                  </div>
                  {service.requiredDocuments.map((doc, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </div>
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to={`/services/${service.slug}`}
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pluto-navy text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-pluto-navy-deep transition-colors"
                >
                  <span>Open Dedicated Detail Page</span>
                  <ArrowRight className="w-4 h-4 text-pluto-gold" />
                </Link>

                <button
                  onClick={() => {
                    setIsPreviewOpen(false);
                    openConsultationModal(service.title);
                  }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pluto-gold text-pluto-navy-deep px-5 py-3 rounded-xl font-bold text-sm hover:bg-pluto-gold-bright transition-colors"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Free Consultation</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
