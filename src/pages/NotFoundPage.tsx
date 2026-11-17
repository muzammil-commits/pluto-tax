import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50">
      <div className="w-20 h-20 rounded-3xl bg-pluto-navy text-pluto-gold flex items-center justify-center font-black text-3xl mb-6 shadow-xl font-heading">
        404
      </div>
      <h1 className="text-3xl font-extrabold text-slate-900 font-heading">
        Page Not Found
      </h1>
      <p className="mt-2 text-slate-600 max-w-md">
        The page you are looking for may have moved or no longer exists. Return to the PlutoTax homepage or browse our services directory.
      </p>
      <div className="mt-6 flex items-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-pluto-navy text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow hover:bg-pluto-navy-deep transition-colors"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-300 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-100 transition-colors"
        >
          <span>View All Services</span>
        </Link>
      </div>
    </div>
  );
};
