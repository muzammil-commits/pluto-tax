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
  PhoneCall
} from 'lucide-react';
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
  const { openConsultationModal } = useSite();
  const IconComponent = ICON_MAP[service.iconName] || TrendingUp;

  return (
    <>
      {/* Service Card with Elegant Hover Animation */}
      <div 
        className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
      >
        {/* Top Image with Zoom Effect */}
        <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-pluto-navy-deep">
          <img
            src={service.heroImage}
            alt={service.title}
            className="w-full h-full object-cover object-center filter brightness-[1.02] group-hover:scale-108 transition-transform duration-700 ease-out"
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
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-pluto-gold text-pluto-navy-deep text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5"
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
              onClick={() => openConsultationModal(service.title)}
              className="text-xs font-semibold text-slate-500 hover:text-pluto-navy hover:underline"
            >
              Consult CPA
            </button>
          </div>

        </div>

        {/* Subtle Bottom Gold Border Highlight on Hover */}
        <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-pluto-gold via-pluto-gold-bright to-pluto-gold transition-all duration-300" />
      </div>

      {/* =========================================================================
          LIVE QUICK VIEW POPUP MODAL
          ========================================================================= */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative"
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
            <div className="relative h-48 w-full bg-pluto-navy-deep">
              <img
                src={service.heroImage}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pluto-navy-deep/90 via-pluto-navy-deep/40 to-transparent" />
              <div className="absolute bottom-4 left-6 right-6">
                <span className="text-xs font-bold text-pluto-gold uppercase tracking-wider">
                  Service Snapshot
                </span>
                <h3 className="text-2xl font-bold text-white mt-0.5">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Popup Body */}
            <div className="p-6 sm:p-8">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Key Benefits */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Advantages
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {service.keyBenefits.map((ben, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  to={`/services/${service.slug}`}
                  onClick={() => setIsPreviewOpen(false)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pluto-navy text-white px-6 py-3 rounded-xl font-bold text-sm shadow hover:bg-pluto-navy-deep transition-colors"
                >
                  <span>Open Dedicated Page</span>
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
