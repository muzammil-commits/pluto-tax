import React from 'react';
import { MapPin, Phone, Mail, UserCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';

export const TopContactBar: React.FC = () => {
  return (
    <div className="bg-pluto-navy-deep text-slate-200 border-b border-pluto-navy-border/60 text-xs py-1.5 sm:py-2 px-3 sm:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
        {/* Left on Desktop: Location */}
        <div className="hidden md:flex items-center gap-2 text-slate-300 hover:text-pluto-gold transition-colors">
          <MapPin className="w-3.5 h-3.5 text-pluto-gold shrink-0" />
          <span className="font-medium tracking-wide truncate max-w-md">
            {COMPANY_INFO.address}
          </span>
        </div>

        {/* Left on Mobile: Phone & Email (as marked in green in image copy 28.png) */}
        <div className="flex md:hidden items-center gap-2.5">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-1 text-[11px] font-bold text-slate-200 hover:text-pluto-gold transition-colors"
          >
            <Phone className="w-3 h-3 text-pluto-gold shrink-0" />
            <span>(254) 221-0222</span>
          </a>
          <span className="text-slate-600">•</span>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-pluto-gold transition-colors"
            title={COMPANY_INFO.email}
          >
            <Mail className="w-3 h-3 text-pluto-gold shrink-0" />
            <span className="hidden xs:inline">Email</span>
          </a>
        </div>

        {/* Center on Desktop: Phone & Email */}
        <div className="hidden md:flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
          <a
            href={`tel:${COMPANY_INFO.phoneRaw}`}
            className="flex items-center gap-1.5 text-slate-200 hover:text-pluto-gold font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-pluto-gold shrink-0" />
            <span>{COMPANY_INFO.phone}</span>
          </a>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <a
            href={`mailto:${COMPANY_INFO.email}`}
            className="flex items-center gap-1.5 text-slate-200 hover:text-pluto-gold transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-pluto-gold shrink-0" />
            <span>{COMPANY_INFO.email}</span>
          </a>
        </div>

        {/* Right: Client Portal & Security Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>IRS Authorized e-file Provider</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <Link
            to="/portal"
            className="inline-flex items-center gap-1.5 bg-pluto-navy-light/90 hover:bg-pluto-gold hover:text-pluto-navy-deep text-pluto-gold px-2.5 sm:px-3 py-1 rounded font-semibold text-[11px] sm:text-xs transition-all border border-pluto-gold/30 shadow-sm"
          >
            <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Client Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
