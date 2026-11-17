import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Lock, 
  ArrowUpRight, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram,
  UserCog
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-pluto-navy-deep text-slate-300 border-t-2 border-pluto-gold/30 overflow-hidden">
      
      {/* Decorative Golden Arch / Waves Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-pluto-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Logo (Without Patchwork) */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <Link to="/" className="inline-block group mb-4">
              <div className="h-11 sm:h-12 max-w-[260px]">
                <img
                  src="/assets/logo-white.png"
                  alt="PlutoTax Consulting & Advisory LLC"
                  className="h-full w-auto object-contain filter drop-shadow-md transition-transform duration-300 group-hover:scale-102"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('logo.png')) {
                      target.src = '/assets/logo.png';
                    }
                  }}
                />
              </div>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed font-normal max-w-sm">
              {COMPANY_INFO.tagline}
            </p>

            {/* Certifications and Compliance */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>IRS Authorized CAA</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-pluto-gold bg-pluto-navy/80 border border-pluto-gold/30 px-3 py-1.5 rounded-lg">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Vault</span>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-4 leading-relaxed">
              Serving US citizens, Green Card holders, H-1B / L-1 / F-1 visa professionals, small businesses, and NRI cross-border taxpayers worldwide.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-pluto-gold pl-3">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-300 hover:text-pluto-gold transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-pluto-gold transition-colors flex items-center gap-1.5">
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-300 hover:text-pluto-gold transition-colors flex items-center gap-1.5">
                  <span>Our 9 Tax Services</span>
                </Link>
              </li>
              <li>
                <Link to="/refund-status" className="text-slate-300 hover:text-pluto-gold transition-colors flex items-center gap-1.5">
                  <span>Refund Status Tracker</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-pluto-gold transition-colors flex items-center gap-1.5">
                  <span>Contact Us</span>
                </Link>
              </li>
              <li>
                <Link to="/portal" className="text-pluto-gold font-bold hover:underline flex items-center gap-1.5 pt-1">
                  <span>Secure Client Portal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-slate-300 text-xs flex items-center gap-1 pt-2">
                  <UserCog className="w-3 h-3" />
                  <span>Admin Console</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-pluto-gold pl-3">
              Contact Information
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-pluto-gold shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {COMPANY_INFO.address}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-pluto-gold shrink-0" />
                <a 
                  href={`tel:${COMPANY_INFO.phoneRaw}`} 
                  className="text-slate-300 hover:text-pluto-gold font-semibold transition-colors"
                >
                  {COMPANY_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-pluto-gold shrink-0" />
                <a 
                  href={`mailto:${COMPANY_INFO.email}`} 
                  className="text-slate-300 hover:text-pluto-gold transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
              </div>

              <div className="pt-2 text-xs text-slate-400">
                <div className="font-semibold text-slate-300">Office Hours:</div>
                <div>{COMPANY_INFO.workingHours}</div>
              </div>
            </div>
          </div>

          {/* Column 4: Stay Connected & Socials */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 border-l-2 border-pluto-gold pl-3">
              Stay Connected
            </h4>
            
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Follow PlutoTax for timely IRS deadline updates, foreign asset compliance alerts, and tax planning strategies.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pluto-navy-surface hover:bg-pluto-gold hover:text-pluto-navy-deep border border-slate-700 flex items-center justify-center text-slate-300 transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pluto-navy-surface hover:bg-pluto-gold hover:text-pluto-navy-deep border border-slate-700 flex items-center justify-center text-slate-300 transition-all shadow-sm"
                aria-label="Twitter / X"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pluto-navy-surface hover:bg-pluto-gold hover:text-pluto-navy-deep border border-slate-700 flex items-center justify-center text-slate-300 transition-all shadow-sm"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-pluto-navy-surface hover:bg-pluto-gold hover:text-pluto-navy-deep border border-slate-700 flex items-center justify-center text-slate-300 transition-all shadow-sm"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>

            <div className="mt-5">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-700/80 hover:bg-emerald-600 text-white text-xs font-bold px-3 py-2 rounded-lg transition-colors border border-emerald-500/30"
              >
                <span>WhatsApp Live Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} PlutoTax Consulting & Advisory LLC. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <Link to="/privacy-policy" className="hover:text-pluto-gold transition-colors">
              Privacy Policy
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/terms-and-conditions" className="hover:text-pluto-gold transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-slate-700">•</span>
            <Link to="/security" className="hover:text-pluto-gold transition-colors">
              Data Security & Circular 230
            </Link>
          </div>
        </div>

      </div>

    </footer>
  );
};
