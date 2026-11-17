import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: 'light' | 'dark'; // 'light' for dark hero backgrounds, 'dark' for white/light surfaces
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, variant = 'light' }) => {
  const isLight = variant === 'light';

  return (
    <nav className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2 flex-wrap" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className={`transition-colors flex items-center gap-1 ${
          isLight ? 'text-slate-300 hover:text-pluto-gold' : 'text-slate-500 hover:text-pluto-navy'
        }`}
      >
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isLight ? 'text-slate-400' : 'text-slate-400'}`} />
          {item.path ? (
            <Link 
              to={item.path} 
              className={`transition-colors truncate max-w-xs ${
                isLight ? 'text-slate-300 hover:text-pluto-gold' : 'text-slate-600 hover:text-pluto-navy'
              }`}
            >
              {item.name}
            </Link>
          ) : (
            <span className={`font-bold truncate max-w-xs ${
              isLight ? 'text-pluto-gold drop-shadow-sm' : 'text-slate-900'
            }`}>
              {item.name}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
