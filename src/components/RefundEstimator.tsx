import React, { useState } from 'react';
import { 
  Calculator, 
  DollarSign, 
  Users, 
  HelpCircle, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Maximize2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateEstimatedTax, TaxCalculationInput, TaxCalculationResult } from '../utils/taxCalculator';
import { useSite } from '../context/SiteContext';

export const RefundEstimator: React.FC = () => {
  const { openConsultationModal } = useSite();

  const [formData, setFormData] = useState<TaxCalculationInput>({
    filingStatus: 'single',
    residencyStatus: 'citizen_resident',
    annualIncome: 125000,
    taxWithheld: 22000,
    dependents: 0,
  });

  const [result, setResult] = useState<TaxCalculationResult | null>(null);
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const calculated = calculateEstimatedTax(formData);
    setResult(calculated);
  };

  return (
    <section id="refund-estimator" className="relative w-full py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
      
      {/* Decorative Orbs */}
      <div className="absolute top-12 left-10 w-80 h-80 bg-pluto-blue-light/70 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-12 right-10 w-80 h-80 bg-amber-50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pluto-blue-light border border-pluto-navy/20 text-pluto-navy text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-pluto-navy" />
            <span>ESTIMATE YOUR TAX POSITION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Quick Refund Estimator
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Get a preliminary estimate of your potential tax refund using official 2024/2025 federal tax brackets. Fast, secure, and zero SSN required.
          </p>
        </motion.div>

        {/* Main 2-Column Calculator Container with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          
          {/* Left Column: Form Controls */}
          <form onSubmit={handleCalculate} className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span>Enter Your Tax Parameters</span>
                </h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                  100% Private & Anonymous
                </span>
              </div>

              {/* 1. Filing Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Filing Status
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { id: 'single', label: 'Single' },
                    { id: 'married_joint', label: 'Married Filing Jointly' },
                    { id: 'married_separate', label: 'Married Filing Separately' },
                    { id: 'head_of_household', label: 'Head of Household' },
                  ].map((status) => (
                    <label
                      key={status.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs sm:text-sm font-semibold cursor-pointer transition-all ${
                        formData.filingStatus === status.id
                          ? 'border-pluto-navy bg-pluto-blue-light/50 text-pluto-navy'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="filingStatus"
                        value={status.id}
                        checked={formData.filingStatus === status.id}
                        onChange={() => setFormData({ ...formData, filingStatus: status.id as any })}
                        className="text-pluto-navy focus:ring-pluto-navy"
                      />
                      <span>{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Visa / Residency Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Visa / Residency Status
                </label>
                <select
                  value={formData.residencyStatus}
                  onChange={(e) => setFormData({ ...formData, residencyStatus: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                >
                  <option value="citizen_resident">US Citizen or Lawful Permanent Resident (Green Card)</option>
                  <option value="h1b_resident">H-1B, L-1, O-1 (US Resident Alien under Substantial Presence)</option>
                  <option value="f1_opt_nonresident">F-1 Student / OPT / J-1 (Form 1040-NR Non-Resident)</option>
                  <option value="dual_status">Dual-Status Tax Alien (First Year or Transition Year)</option>
                </select>
              </div>

              {/* 3. Annual Income */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Annual Gross Income (W-2 + 1099 + Investments)
                  </label>
                  <span className="text-sm font-black text-pluto-navy">
                    ${formData.annualIncome.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={formData.annualIncome}
                    onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
                <input
                  type="range"
                  min="20000"
                  max="400000"
                  step="5000"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                  className="w-full mt-2 accent-pluto-navy cursor-pointer"
                />
              </div>

              {/* 4. Total Tax Withheld */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Total Federal Tax Already Withheld (Box 2 on W-2s)
                  </label>
                  <span className="text-sm font-black text-pluto-navy">
                    ${formData.taxWithheld.toLocaleString()}
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={formData.taxWithheld}
                    onChange={(e) => setFormData({ ...formData, taxWithheld: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-4 py-3 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
              </div>

              {/* 5. Qualifying Dependents */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Qualifying Dependents (Child Tax Credit)
                  </label>
                  <span className="text-sm font-black text-pluto-navy">
                    {formData.dependents} {formData.dependents === 1 ? 'Dependent' : 'Dependents'}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, dependents: num })}
                      className={`flex-1 py-2.5 rounded-xl border text-sm font-bold transition-all ${
                        formData.dependents === num
                          ? 'bg-pluto-navy text-white border-pluto-navy shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculate Button */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-pluto-navy-deep to-pluto-navy hover:from-pluto-navy hover:to-pluto-navy-light text-white font-extrabold py-4 rounded-xl text-base tracking-wide shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5 text-pluto-gold" />
                <span>Calculate Preliminary Estimate</span>
              </button>
            </div>
          </form>

          {/* Right Column: Results Panel (Navy & Gold Theme) */}
          <div className="lg:col-span-5 bg-pluto-navy-deep text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            
            {/* Background Texture */}
            <div 
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#FFBF00 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-pluto-gold">
                  Calculation Summary
                </span>
                <span className="text-[11px] text-slate-400">IRS Tax Year 2024 / 2025</span>
              </div>

              {result ? (
                <div className="space-y-6 animate-fade-in">
                  {/* Estimated Refund / Balance Due Box */}
                  <div className="bg-pluto-navy-surface/90 border border-pluto-gold/40 rounded-2xl p-6 text-center shadow-xl">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                      {result.isRefund ? 'Estimated Tax Refund' : 'Estimated Tax Due'}
                    </span>
                    <div className="text-4xl sm:text-5xl font-black text-pluto-gold mt-2 font-heading">
                      ${result.estimatedRefundOrDue.toLocaleString()}
                    </div>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Effective Tax Rate: {result.effectiveTaxRate}%</span>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-800 text-xs space-y-2.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Gross Annual Income:</span>
                      <span className="font-semibold text-white">${result.calculationBreakdown.grossIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Standard Deduction:</span>
                      <span className="font-semibold text-emerald-400">-${result.standardDeduction.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Net Taxable Income:</span>
                      <span className="font-semibold text-white">${result.taxableIncome.toLocaleString()}</span>
                    </div>
                    {result.totalCredits > 0 && (
                      <div className="flex justify-between text-slate-300">
                        <span>Child Tax Credits:</span>
                        <span className="font-semibold text-emerald-400">-${result.totalCredits.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-300 pt-2 border-t border-slate-800">
                      <span>Calculated Tax Liability:</span>
                      <span className="font-semibold text-white">${result.estimatedTaxLiability.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Taxes Already Withheld:</span>
                      <span className="font-semibold text-pluto-gold">${result.calculationBreakdown.withheld.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pop up full breakdown button */}
                  <button
                    type="button"
                    onClick={() => setIsBreakdownModalOpen(true)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs text-pluto-gold hover:underline py-1"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>View In-Depth Tax Analysis Popup</span>
                  </button>

                  {/* Disclaimer */}
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      {result.disclaimer}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-pluto-navy-surface border border-pluto-gold/30 flex items-center justify-center text-pluto-gold mb-4">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Ready to See Your Estimate?</h4>
                  <p className="text-xs text-slate-300 max-w-xs mt-2">
                    Adjust your income, filing status, and withholding on the left, then click Calculate to view your projected return.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom CTA in Result Panel */}
            <div className="mt-8 pt-6 border-t border-slate-800 relative z-10">
              <button
                onClick={() => openConsultationModal('Refund Estimator Follow-up')}
                className="w-full bg-gradient-to-r from-pluto-gold to-pluto-gold-bright hover:from-pluto-gold-bright hover:to-pluto-gold text-pluto-navy-deep font-black py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>Maximize Refund with a CPA</span>
                <ArrowRight className="w-4 h-4 text-pluto-navy-deep" />
              </button>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero obligation • Licensed CPA review</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>

      {/* =========================================================================
          DETAILED TAX BREAKDOWN POPUP MODAL
          ========================================================================= */}
      {isBreakdownModalOpen && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
              <div>
                <span className="text-xs font-bold text-pluto-navy uppercase tracking-wider">
                  Official 2024/2025 Parameters
                </span>
                <h3 className="text-2xl font-bold font-heading text-slate-900 mt-0.5">
                  Detailed Tax Analysis Breakdown
                </h3>
              </div>
              <button
                onClick={() => setIsBreakdownModalOpen(false)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-xs text-slate-500">Gross Income:</span>
                  <div className="text-lg font-bold text-slate-900">${result.calculationBreakdown.grossIncome.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Standard Deduction:</span>
                  <div className="text-lg font-bold text-emerald-600">-${result.standardDeduction.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Net Taxable Income:</span>
                  <div className="text-lg font-bold text-slate-900">${result.taxableIncome.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-xs text-slate-500">Total Tax Withheld:</span>
                  <div className="text-lg font-bold text-pluto-navy">${result.calculationBreakdown.withheld.toLocaleString()}</div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950">
                <div className="font-bold text-sm mb-1">
                  {result.isRefund ? 'Projected Overpayment / Refund' : 'Projected Balance Due'}
                </div>
                <div className="text-3xl font-black font-heading text-emerald-700">
                  ${result.estimatedRefundOrDue.toLocaleString()}
                </div>
                <p className="text-xs text-emerald-800 mt-2">
                  Our CPAs routinely discover an average of $2,400+ in overlooked deductions, multi-state tax allocations, and treaty credits.
                </p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setIsBreakdownModalOpen(false);
                    openConsultationModal('Estimator Breakdown Review');
                  }}
                  className="flex-1 bg-pluto-navy text-white font-bold py-3 rounded-xl text-xs sm:text-sm hover:bg-pluto-navy-deep transition-colors text-center"
                >
                  Claim Free CPA Return Audit
                </button>
                <button
                  onClick={() => setIsBreakdownModalOpen(false)}
                  className="px-5 py-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
