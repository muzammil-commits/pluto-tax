import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { 
  Search, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Calendar, 
  DollarSign,
  HelpCircle,
  PhoneCall
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useSite } from '../context/SiteContext';

export const RefundStatusPage: React.FC = () => {
  const { openConsultationModal } = useSite();
  const [selectedYear, setSelectedYear] = useState('2024 / 2025');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-white">
      
      {/* Page Hero */}
      <section className="relative bg-pluto-navy-deep text-white py-16 sm:py-24 overflow-hidden border-b border-pluto-gold/20">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#FFBF00 1.2px, transparent 1.2px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'Refund Status' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/30">
              <Search className="w-3.5 h-3.5" />
              <span>OFFICIAL IRS REFUND TRACKING GUIDANCE</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Track Your Federal Tax Refund
            </h1>

            <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Get official, transparent guidance on how to track your federal refund directly through the IRS "Where's My Refund?" gateway. We protect your security by never collecting your SSN through unverified online forms.
            </p>
          </div>
        </div>
      </section>

      {/* Main Guidance & Direct IRS Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Official Instructions & Link */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Primary Action Card: Direct IRS Official Link */}
            <div className="bg-gradient-to-br from-pluto-navy via-pluto-navy-deep to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl border-2 border-pluto-gold/40 relative overflow-hidden">
              <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                <span className="text-xs font-bold text-pluto-gold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full">
                  Official Federal Gateway
                </span>
                <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-4 h-4" /> IRS.gov Verified
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Launch IRS "Where's My Refund?" Portal
              </h2>

              <p className="mt-3 text-sm text-slate-200 leading-relaxed max-w-xl">
                The Internal Revenue Service updates refund statuses once every 24 hours, usually overnight. Click the secure link below to verify your return status directly on the official IRS portal.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={COMPANY_INFO.irsTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-8 py-4 rounded-xl font-black text-base shadow-xl transition-transform hover:scale-[1.02]"
                >
                  <span>Go to IRS Where's My Refund</span>
                  <ExternalLink className="w-5 h-5 text-pluto-navy-deep" />
                </a>

                <button
                  onClick={() => openConsultationModal('Refund Inquiry')}
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-4 rounded-xl font-bold text-sm border border-white/25 transition-colors"
                >
                  Ask PlutoTax to Check My File
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Security Notice: Only enter your SSN on the verified https://www.irs.gov website.</span>
              </div>
            </div>

            {/* Required Information Explanation */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                What Information You Need Before Checking
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                To check your refund status on IRS.gov, have your copy of Form 1040 ready with these exact details:
              </p>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-sm mb-3">
                    1
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Social Security or ITIN</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your 9-digit SSN or ITIN as entered on the first line of your Form 1040.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-sm mb-3">
                    2
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Your Filing Status</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Single, Married Filing Jointly, Married Filing Separately, or Head of Household.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-sm mb-3">
                    3
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">Exact Refund Amount</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    The exact dollar amount shown on Line 35a of your Form 1040 (without rounding).
                  </p>
                </div>

              </div>
            </div>

            {/* Official IRS Refund Milestones */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                Understanding the 3 IRS Tracking Stages
              </h3>
              <div className="mt-5 space-y-4">
                
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-sm shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Stage 1: Return Received</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      The IRS has received your e-filed tax return and is currently processing it through automated verification algorithms. This updates within 24 to 48 hours of e-filing.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Stage 2: Refund Approved</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      The IRS has reviewed your calculations and approved the calculated refund amount. A target direct deposit or check mailing date is issued.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-sm shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Stage 3: Refund Sent</h4>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      The Treasury Department has transmitted your refund via direct deposit to your designated bank account or mailed your physical paper check.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Typical IRS Timeline FAQs */}
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
                IRS Refund FAQs & Expectations
              </h3>
              <div className="mt-4 space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">How long does an IRS refund usually take?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    The IRS issues most refunds within 21 calendar days of e-filing when direct deposit is chosen. Returns with Earned Income Tax Credit (EITC) or Additional Child Tax Credit (ACTC) may require additional processing time under the PATH Act.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <h4 className="text-sm font-bold text-slate-900">What if my refund is taking longer than 21 days?</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Delays often occur if there are clerical mismatches on 1099-B cost basis, identity verification notices (IRS Letter 5071C), or prior-year adjustments. Our CPAs can pull your official IRS Account Transcript to pinpoint the exact status.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Year Selector & Assistance */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Tax Year Selector */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Filing Year Selection
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-1 mb-3">
                Select Your Tax Year
              </h4>
              <div className="space-y-2">
                {['2024 / 2025 (Current Filing Season)', '2023 (Prior Year Return)', '2022 (Prior Year Return)', '2021 (Amended Return)'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`w-full text-left p-3 rounded-xl border text-xs font-bold transition-all ${
                      selectedYear === yr
                        ? 'bg-pluto-navy text-white border-pluto-navy shadow'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-3">
                The IRS online tracking tool supports returns filed for the current year and the two immediately preceding tax years.
              </p>
            </div>

            {/* PlutoTax Client Help Desk */}
            <div className="bg-pluto-navy-deep text-white rounded-3xl p-6 sm:p-8 border border-pluto-gold/30 shadow-xl">
              <h4 className="text-lg font-bold font-heading text-white">
                Filed with PlutoTax?
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                If our firm prepared and e-filed your return, we monitor your submission ID through IRS acceptance. Log in to your client portal for continuous live updates.
              </p>
              
              <Link
                to="/portal"
                className="mt-5 block text-center bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold py-3 rounded-xl text-xs transition-colors"
              >
                Open Client Portal Status Tracker
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
