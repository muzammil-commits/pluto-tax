import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ShieldCheck, Lock, CheckCircle2, Server, Key, EyeOff } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export const SecurityPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      <section className="bg-pluto-navy-deep text-white py-14 sm:py-16 border-b border-pluto-gold/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Data Security & Confidentiality' }]} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Data Security & Circular 230 Standards
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
            Enterprise Security Architecture • IRS Publication 4557 Compliant
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-slate-700 space-y-8 text-sm sm:text-base leading-relaxed">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <Lock className="w-8 h-8 text-pluto-navy mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">256-Bit AES Encryption</h3>
            <p className="text-xs text-slate-500 mt-1">Bank-level cryptographic protection at rest and in transit.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <Server className="w-8 h-8 text-pluto-navy mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">SOC-2 US Cloud Vaults</h3>
            <p className="text-xs text-slate-500 mt-1">All data housed in isolated, high-security US data facilities.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <ShieldCheck className="w-8 h-8 text-pluto-navy mx-auto mb-2" />
            <h3 className="font-bold text-slate-900 text-sm">IRS Section 7216</h3>
            <p className="text-xs text-slate-500 mt-1">Strict legal penalties for unauthorized disclosure.</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">IRS Publication 4557 Compliance</h2>
          <p>
            PlutoTax adheres to the "Safeguarding Taxpayer Data" guidelines issued by the Internal Revenue Service (IRS Publication 4557). Our administrative and technical controls prevent data theft, unauthorized network intrusions, and identity compromise.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Zero Passwords in Plaintext</h2>
          <p>
            Customer portal credentials are encrypted using industry-standard salted bcrypt hashing. Two-factor authentication (2FA) is enforced across all internal CPA staff workstations to protect confidential client records.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Treasury Circular 230 Disclosure</h2>
          <p>
            Any US federal tax advice contained in communications from PlutoTax Consulting & Advisory LLC is written in accordance with the ethical obligations and practice standards established in Treasury Department Circular 230.
          </p>
        </div>

      </div>
    </div>
  );
};
