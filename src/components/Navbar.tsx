import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, PhoneCall, Sparkles } from 'lucide-react';
import { useSite } from '../context/SiteContext';
import { COMPANY_INFO } from '../data/companyData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const location = useLocation();
  const { services, openConsultationModal } = useSite();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Refund Status', path: '/refund-status' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2 border-b border-slate-200'
          : 'bg-white py-3 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 md:h-16">
          
          {/* Logo Section - Without Patchwork */}
          <Link
            to="/"
            className="flex items-center gap-3 shrink-0 group focus:outline-none focus:ring-2 focus:ring-pluto-gold/50 rounded-lg p-1"
          >
            <div className="relative flex items-center h-10 md:h-12 max-w-[200px] sm:max-w-[260px] md:max-w-[310px]">
              <img
                src="/assets/logo.png"
                alt="PlutoTax Consulting & Advisory LLC"
                className="h-full w-auto object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-[1.02]"
                onError={(e) => {
                  // Fallback to original image if transparent variant fails
                  const target = e.target as HTMLImageElement;
                  if (!target.src.includes('logo-original')) {
                    target.src = '/assets/logo-original.png';
                  }
                }}
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.name}
                    className="relative group"
                    onMouseEnter={() => setIsServicesDropdownOpen(true)}
                    onMouseLeave={() => setIsServicesDropdownOpen(false)}
                  >
                    <Link
                      to={link.path}
                      className={`flex items-center gap-1 px-3 py-2 text-[15px] font-semibold tracking-wide rounded-md transition-colors ${
                        isActive(link.path)
                          ? 'text-pluto-navy font-bold border-b-2 border-pluto-gold'
                          : 'text-slate-700 hover:text-pluto-navy hover:bg-slate-50'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-pluto-navy transition-transform duration-200 group-hover:rotate-180" />
                    </Link>

                    {/* Services Dropdown Menu */}
                    {isServicesDropdownOpen && (
                      <div className="absolute top-full left-0 w-80 bg-white rounded-xl shadow-2xl border border-slate-200/80 py-3 z-50 animate-fade-in">
                        <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Our 9 Tax Specialties</span>
                          <span className="text-[11px] font-semibold text-pluto-navy bg-pluto-blue-light px-2 py-0.5 rounded-full">IRS & DTAA</span>
                        </div>
                        <div className="py-1 max-h-[420px] overflow-y-auto">
                          {services.map((svc) => (
                            <Link
                              key={svc.id}
                              to={`/services/${svc.slug}`}
                              className="block px-4 py-2.5 hover:bg-pluto-blue-soft/70 transition-colors group/item"
                            >
                              <div className="text-sm font-semibold text-slate-800 group-hover/item:text-pluto-navy">
                                {svc.title}
                              </div>
                              <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                                {svc.tagline}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <div className="px-4 pt-2 mt-1 border-t border-slate-100">
                          <Link
                            to="/services"
                            className="block text-center text-xs font-bold text-pluto-navy hover:text-pluto-gold hover:underline py-1"
                          >
                            View All Services & Comparison →
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 text-[15px] font-semibold tracking-wide rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-pluto-navy font-bold border-b-2 border-pluto-gold'
                      : 'text-slate-700 hover:text-pluto-navy hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right Action: Get a Free Consultation */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => openConsultationModal()}
              className="relative inline-flex items-center gap-2 bg-gradient-to-r from-pluto-gold to-pluto-gold-bright text-pluto-navy-deep px-5 py-2.5 rounded-lg font-bold text-sm tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-amber-300"
            >
              <Sparkles className="w-4 h-4 text-pluto-navy-deep fill-pluto-navy-deep" />
              <span>Get a Free Consultation</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => openConsultationModal()}
              className="sm:hidden bg-pluto-gold text-pluto-navy-deep px-3 py-1.5 rounded-md font-bold text-xs shadow"
            >
              Consult
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-pluto-navy hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-pluto-navy" />
              ) : (
                <Menu className="w-6 h-6 text-pluto-navy" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-fade-in">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-2.5 rounded-md text-base font-semibold ${
                  isActive(link.path)
                    ? 'bg-pluto-blue-light text-pluto-navy font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Services Fast Links */}
          <div className="mt-3 pt-3 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
              Our 9 Tax Services
            </div>
            <div className="grid grid-cols-1 gap-1 pl-2">
              {services.map((svc) => (
                <Link
                  key={svc.id}
                  to={`/services/${svc.slug}`}
                  className="text-sm py-1.5 px-2 text-slate-600 hover:text-pluto-navy hover:font-medium flex items-center justify-between"
                >
                  <span>{svc.title}</span>
                  <span className="text-xs text-pluto-gold font-semibold">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openConsultationModal();
              }}
              className="w-full text-center bg-pluto-gold text-pluto-navy-deep font-bold py-3 rounded-lg shadow-md"
            >
              Get a Free Consultation
            </button>
            <Link
              to="/portal"
              className="block w-full text-center bg-pluto-navy text-white font-semibold py-2.5 rounded-lg"
            >
              Access Secure Client Portal
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 text-sm text-slate-700 font-semibold py-2"
            >
              <PhoneCall className="w-4 h-4 text-pluto-gold" />
              <span>Call Us: {COMPANY_INFO.phone}</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
