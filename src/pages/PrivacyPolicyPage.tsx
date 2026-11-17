import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      <section className="bg-pluto-navy-deep text-white py-14 sm:py-16 border-b border-pluto-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Privacy Policy' }]} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Client Privacy Policy & IRC Section 7216 Notice
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Last Updated: {new Date().getFullYear()} • PlutoTax Consulting & Advisory LLC
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <div className="p-4 rounded-xl bg-pluto-blue-light/50 border border-pluto-blue-light text-pluto-navy text-xs sm:text-sm">
          <strong>Internal Revenue Code Section 7216 Statement:</strong> Federal law provides that tax return preparers who disclose or use tax return information for purposes other than preparing tax returns without your prior written consent are subject to criminal penalties. PlutoTax strictly adheres to IRC § 7216 and never sells or discloses your tax records.
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">1. Scope & Governance</h2>
          <p>
            PlutoTax Consulting & Advisory LLC ("PlutoTax", "we", "us", or "our"), headquartered at 814 San Jacinto Suite 400, Austin, TX 78701, is committed to safeguarding personal identification numbers, tax documents, and financial information collected during federal and state tax consulting.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">2. Information We Collect</h2>
          <p>To prepare your filings and verify compliance under Treasury regulations, we collect:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
            <li>Personal Identifiers: Legal names, SSN, ITIN, dates of birth, contact details.</li>
            <li>Financial Data: W-2s, 1099s, K-1s, brokerage statements, foreign bank accounts (FBAR).</li>
            <li>Immigration/Visa Records: Passports, Form I-94 arrival/departure records for Substantial Presence Test.</li>
            <li>Corporate Records: Entity EINs, operating agreements, profit and loss ledgers.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">3. How Information Is Handled</h2>
          <p>
            Information collected is strictly utilized to prepare, review, and e-file your returns with the IRS and applicable State Departments of Revenue, and to provide strategic tax advisory. We do not distribute client lists or monetize personal records.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">4. Data Encryption & Storage</h2>
          <p>
            All electronic documents uploaded through our client portal are encrypted at rest using AES-256 and in transit using TLS 1.3 cryptographic protocols. Access is restricted to licensed CPAs, EAs, and authorized intake personnel.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">5. Inquiries & Contact</h2>
          <p>
            For questions regarding this policy or to request records access, contact our Privacy Officer at{' '}
            <a href={`mailto:${COMPANY_INFO.email}`} className="text-pluto-navy font-bold underline">
              {COMPANY_INFO.email}
            </a>{' '}
            or call {COMPANY_INFO.phone}.
          </p>
        </div>

      </div>
    </div>
  );
};
