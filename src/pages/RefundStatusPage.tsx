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
  PhoneCall,
  Sparkles,
  MapPin,
  AlertTriangle,
  Building2,
  FileCheck2
} from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { useSite } from '../context/SiteContext';

export const RefundStatusPage: React.FC = () => {
  const { openConsultationModal } = useSite();
  const [selectedYear, setSelectedYear] = useState('2024 / 2025');
  const [selectedState, setSelectedState] = useState('California');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const STATE_PORTALS: Record<string, { agency: string; url: string; time: string }> = {
    'California': { agency: 'Franchise Tax Board (FTB)', url: 'https://www.ftb.ca.gov/online/refund/index.asp', time: 'Up to 3 weeks for e-filed returns' },
    'New York': { agency: 'Department of Taxation and Finance', url: 'https://www.tax.ny.gov/pit/file/refund.htm', time: 'Typically within 2-4 weeks' },
    'Texas': { agency: 'Comptroller of Public Accounts (No Personal Income Tax)', url: 'https://comptroller.texas.gov/', time: 'No State Personal Income Tax Return Required' },
    'Illinois': { agency: 'Department of Revenue (MyTax Illinois)', url: 'https://mytax.illinois.gov/', time: '2 to 3 weeks for direct deposit' },
    'New Jersey': { agency: 'Division of Taxation', url: 'https://www.state.nj.us/treasury/taxation/', time: 'Around 4 weeks from e-file' },
    'Washington': { agency: 'Department of Revenue (Working Families Credit)', url: 'https://dor.wa.gov/', time: 'No State Income Tax; WFTC verified in 30 days' },
    'Virginia': { agency: 'Department of Taxation (Where\'s My Refund)', url: 'https://www.tax.virginia.gov/wheres-my-refund', time: 'Up to 4 weeks' },
    'Massachusetts': { agency: 'Department of Revenue (MassTaxConnect)', url: 'https://mtc.dor.state.ma.us/', time: 'Usually within 10-14 business days' },
  };

  return (
    <div className="w-full bg-[#EAF3FF]/40 text-slate-800">
      
      {/* =========================================================================
          SECTION 1: HERO SECTION with image copy 24.png (Capitol + Sky Banner)
          ========================================================================= */}
      <section className="relative w-full min-h-[400px] sm:min-h-[440px] flex items-center overflow-hidden border-b border-blue-200/80 bg-pluto-navy-deep">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 ease-out transform scale-105 hover:scale-100"
          style={{
            backgroundImage: `url('/assets/hero-capitol-banner.jpg'), url('/assets/hero-capitol-banner.png')`,
            backgroundPosition: 'right 25% center',
            filter: 'brightness(1.08) contrast(1.05)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/80 to-transparent pointer-events-none" />
        <div className="md:hidden absolute inset-0 bg-pluto-navy-deep/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 w-full">
          <div className="text-slate-300 mb-4">
            <Breadcrumbs items={[{ name: 'Refund Status' }]} />
          </div>

          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-pluto-gold text-xs font-bold uppercase tracking-wider mb-4 border border-pluto-gold/40 shadow-sm">
              <Search className="w-3.5 h-3.5" />
              <span>OFFICIAL FEDERAL & STATE REFUND GATEWAY</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight drop-shadow-sm">
              Track Your Tax Refund Status
            </h1>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-slate-200 leading-relaxed font-normal drop-shadow">
              Verify your official refund timeline through the verified IRS "Where's My Refund?" tool and individual state taxation departments. PlutoTax ensures your SSN stays private and never collected across unverified web portals.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: PRIMARY ACTION CARD & REQUIRED INFO
          ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Launch Card */}
            <div className="bg-gradient-to-br from-pluto-navy via-pluto-navy-deep to-slate-900 rounded-3xl p-6 sm:p-10 text-white shadow-xl border-2 border-pluto-gold/40 relative overflow-hidden">
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

              <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
                The Internal Revenue Service updates refund statuses once every 24 hours, usually overnight. Click the secure link below to verify your return status directly on the official IRS portal.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={COMPANY_INFO.irsTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-xl transition-transform hover:scale-[1.02] border border-amber-300"
                >
                  <span>Go to IRS Where's My Refund</span>
                  <ExternalLink className="w-4 h-4 text-pluto-navy-deep" />
                </a>

                <button
                  onClick={() => openConsultationModal('Refund Inquiry')}
                  className="bg-white/10 hover:bg-white/20 text-white px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm border border-white/25 transition-colors"
                >
                  Ask PlutoTax to Check My File
                </button>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-700/80 text-[11px] text-slate-400 flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Security Notice: Only enter your SSN on the verified https://www.irs.gov website.</span>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white/90 rounded-2xl p-6 border border-blue-200/80 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                3 Key Details Needed Before Checking
              </h3>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="w-7 h-7 rounded-lg bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-xs mb-2">
                    1
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">SSN or ITIN</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Your 9-digit identification number on Form 1040.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="w-7 h-7 rounded-lg bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-xs mb-2">
                    2
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Filing Status</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Single, MFJ, MFS, or Head of Household as filed.</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100">
                  <div className="w-7 h-7 rounded-lg bg-pluto-navy text-pluto-gold flex items-center justify-center font-bold text-xs mb-2">
                    3
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">Exact Refund $</h4>
                  <p className="text-[11px] text-slate-600 mt-0.5">Exact refund shown on Line 35a without rounding.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Year Selection & Portal Quick Access */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white/90 rounded-2xl p-6 border border-blue-200/80 shadow-sm">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Filing Season
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 mb-3">
                Select Your Tax Year
              </h4>
              <div className="space-y-2">
                {['2024 / 2025 (Current Season)', '2023 (Prior Year Return)', '2022 (Prior Year Return)', '2021 (Amended Return)'].map((yr) => (
                  <button
                    key={yr}
                    onClick={() => setSelectedYear(yr)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedYear === yr
                        ? 'bg-pluto-navy text-white border-pluto-navy shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-pluto-navy-deep text-white rounded-2xl p-6 border border-pluto-gold/30 shadow-md">
              <h4 className="text-base font-bold font-heading text-white">
                Filed with PlutoTax?
              </h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Log in to your client portal for continuous live milestone updates and direct CPA messaging.
              </p>
              <Link
                to="/portal"
                className="mt-4 block text-center bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold py-2.5 rounded-xl text-xs transition-colors"
              >
                Access Secure Portal
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THREE IRS PROCESSING STAGES
          ========================================================================= */}
      <section className="py-12 bg-white/90 border-y border-blue-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Understanding the 3 IRS Tracking Stages
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              What each milestone means as your return moves through IRS validation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-[#EAF3FF]/60 border border-blue-200">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900">Stage 1: Return Received</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                The IRS received your e-filed return and runs automated math and anti-fraud checks. Updates within 24 to 48 hours of transmission.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAF3FF]/60 border border-blue-200">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs mb-3">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900">Stage 2: Refund Approved</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                IRS has verified calculations and approved your refund. A target direct deposit or check mailing date is issued.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#EAF3FF]/60 border border-blue-200">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs mb-3">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900">Stage 3: Refund Sent</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Treasury transmitted your refund via direct deposit. Banks typically post funds within 1 to 5 business days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: STATE-BY-STATE REFUND LOOKUP
          ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
            State Tax Agency Refund Tracker
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            State refunds are issued separately from federal refunds. Select your state to access the official department portal.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-blue-200/80 shadow-sm max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {Object.keys(STATE_PORTALS).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedState(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedState === st
                    ? 'bg-pluto-navy text-white shadow-xs'
                    : 'bg-blue-50 text-slate-700 hover:bg-blue-100'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-bold text-pluto-navy uppercase bg-white px-2 py-0.5 rounded border border-slate-200">
                {selectedState} State Department
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {STATE_PORTALS[selectedState]?.agency}
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Expected Processing Time: {STATE_PORTALS[selectedState]?.time}
              </p>
            </div>

            <a
              href={STATE_PORTALS[selectedState]?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-pluto-navy hover:bg-pluto-navy-deep text-white px-4 py-2 rounded-xl text-xs font-bold transition-colors shrink-0"
            >
              <span>Visit Official State Tracker</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: COMMON DELAYS, PATH ACT & NOTICE EXPLANATION
          ========================================================================= */}
      <section className="py-12 bg-[#EAF3FF]/80 border-t border-blue-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Common Refund Delays & Explanations
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Why some returns take longer than the standard 21-day window.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "PATH Act Mandatory Holds",
                desc: "By federal law, IRS cannot issue refunds claiming Earned Income Tax Credit (EITC) or Additional Child Tax Credit (ACTC) before mid-February, even if e-filed early."
              },
              {
                title: "Identity Verification Notices (Letter 5071C / 4883C)",
                desc: "If identity filters trigger, the IRS mails a letter asking you to verify your identity on id.me or by phone before processing resumes."
              },
              {
                title: "Brokerage 1099-B Cost Basis Discrepancies",
                desc: "Unreported cost basis on stock sales (e.g. RSUs or crypto) causes IRS matching algorithms to freeze refunds for manual verification."
              },
              {
                title: "Prior-Year Unfiled Returns or Offsets",
                desc: "If past years are open or federal student loans/child support offsets apply, the Bureau of the Fiscal Service may withhold all or part of your refund."
              }
            ].map((d, i) => (
              <div key={i} className="p-4 rounded-xl bg-white border border-blue-200/80 shadow-xs">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <h4 className="text-sm font-bold text-slate-900">{d.title}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: DIRECT DEPOSIT SCHEDULE & BANK PROCESSING
          ========================================================================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-blue-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-xs font-bold text-pluto-navy uppercase bg-blue-50 px-3 py-1 rounded-full">
              PAYMENT METHODOLOGY
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-slate-900 mt-2">
              Direct Deposit vs Physical Paper Checks
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Choosing direct deposit is the fastest, safest method. The IRS deposits 8 out of 10 refunds electronically. Paper checks can take an extra 3 to 6 weeks to arrive by mail.
            </p>
            <div className="mt-4 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Supports up to 3 separate accounts (Checking, Savings, IRA) via Form 8888</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero risk of mail theft, postal misdelivery, or check reissue delays</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-pluto-navy-deep text-white">
            <h4 className="text-sm font-bold text-pluto-gold uppercase">Deposit Timeline Guide</h4>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-300">E-File Accepted</span>
                <span className="font-semibold text-white">Day 1 - 2</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-300">IRS Algorithm Processing</span>
                <span className="font-semibold text-white">Day 3 - 14</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-700">
                <span className="text-slate-300">Refund Approved & Sent</span>
                <span className="font-semibold text-emerald-400">Day 14 - 21</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-300">Bank ACH Post</span>
                <span className="font-semibold text-pluto-gold">Within 1-5 Days</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: PLUTOTAX ADVOCACY & TRANSCRIPT PULLS
          ========================================================================= */}
      <section className="py-12 bg-[#EAF3FF]/80 border-t border-blue-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <span className="text-xs font-bold text-pluto-navy uppercase bg-white px-3 py-1 rounded-full border border-blue-200">
            NEED DEDICATED ASSISTANCE?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading mt-2">
            Is Your Refund Delayed Beyond 21 Days?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            As authorized CPA and Enrolled Agent representatives, PlutoTax can pull your official IRS Return and Account Transcripts directly through e-Services to identify freeze codes (such as TC 570 or TC 420) and contact the IRS Practitioner Priority Service on your behalf.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => openConsultationModal('Delayed Refund Transcript Request')}
              className="bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-[1.02]"
            >
              Request CPA Transcript Review
            </button>
            <Link
              to="/portal"
              className="bg-pluto-navy hover:bg-pluto-navy-deep text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-colors"
            >
              Open Client Portal
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: CONTACT SUPPORT CTA
          ========================================================================= */}
      <section className="py-12 bg-white border-t border-slate-200 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h3 className="text-lg font-bold text-slate-900 font-heading">
            Questions Regarding Your Tax Return?
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Our Austin, Texas client service desk is available Monday through Friday.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4 text-xs font-bold text-pluto-navy">
            <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:underline">
              {COMPANY_INFO.phone}
            </a>
            <span>•</span>
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:underline">
              {COMPANY_INFO.email}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
