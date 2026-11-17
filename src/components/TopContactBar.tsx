import React from 'react';
import { MapPin, Phone, Mail, UserCheck, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { COMPANY_INFO } from '../data/companyData';

export const TopContactBar: React.FC = () => {
  return (
    <div className="bg-pluto-navy-deep text-slate-200 border-b border-pluto-navy-border/60 text-xs py-2 px-4 sm:px-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Left: Location */}
        <div className="flex items-center gap-2 text-slate-300 hover:text-pluto-gold transition-colors">
          <MapPin className="w-3.5 h-3.5 text-pluto-gold shrink-0" />
          <span className="font-medium tracking-wide truncate max-w-md">
            {COMPANY_INFO.address}
          </span>
        </div>

        {/* Center: Phone & Email */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
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
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
            <Shield className="w-3 h-3 text-emerald-400" />
            <span>IRS Authorized e-file Provider</span>
          </div>
          <span className="text-slate-600 hidden lg:inline">•</span>
          <Link
            to="/portal"
            className="inline-flex items-center gap-1.5 bg-pluto-navy-light/90 hover:bg-pluto-gold hover:text-pluto-navy-deep text-pluto-gold px-3 py-1 rounded font-semibold transition-all border border-pluto-gold/30 shadow-sm"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Client Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
