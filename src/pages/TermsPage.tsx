import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { COMPANY_INFO } from '../data/companyData';

export const TermsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      <section className="bg-pluto-navy-deep text-white py-14 sm:py-16 border-b border-pluto-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Terms & Conditions' }]} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Terms of Service & Engagement Standards
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            PlutoTax Consulting & Advisory LLC • Austin, TX 78701
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing this website, utilizing our online client portal, or engaging PlutoTax Consulting & Advisory LLC for tax preparation or advisory services, you agree to comply with these terms, IRS Circular 230 regulations, and applicable engagement letters.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Nature of Professional Services</h2>
          <p>
            Tax preparation and consultation are provided based upon the facts, documentation, and representations supplied by the taxpayer. The taxpayer retains legal responsibility under penalties of perjury for the completeness and accuracy of all records provided.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. Estimates & Estimator Tools</h2>
          <p>
            All figures generated via our Quick Refund Estimator or initial phone consultations are preliminary estimates based upon standard parameters. They do not constitute a formal guarantee of a refund or final tax liability determination.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">4. Electronic Authorizations (Form 8879)</h2>
          <p>
            In accordance with IRS e-file mandates, no tax return is transmitted electronically until the client has reviewed the draft return and executed IRS Form 8879 (IRS e-file Signature Authorization).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">5. Governing Law</h2>
          <p>
            These terms are governed by the laws of the State of Texas and applicable United States Federal tax statutes, without regard to conflict of law principles.
          </p>
        </div>
      </div>
    </div>
  );
};
