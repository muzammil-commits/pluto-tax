import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 py-3" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-pluto-navy transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {item.path ? (
            <Link to={item.path} className="hover:text-pluto-navy transition-colors truncate max-w-xs">
              {item.name}
            </Link>
          ) : (
            <span className="font-semibold text-slate-900 truncate max-w-xs">{item.name}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};
