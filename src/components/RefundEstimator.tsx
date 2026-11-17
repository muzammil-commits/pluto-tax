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
  X 
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
    <section id="refund-estimator" className="relative w-full py-10 sm:py-14 bg-[#EAF3FF]/85 backdrop-blur-sm overflow-hidden border-b border-blue-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tightened Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pluto-blue-light border border-pluto-navy/20 text-pluto-navy text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
            <Calculator className="w-3.5 h-3.5 text-pluto-navy" />
            <span>ESTIMATE YOUR TAX POSITION</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Quick Refund Estimator
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Get a preliminary estimate of your potential tax refund using official 2024/2025 federal tax brackets. Fast, secure, and zero SSN required.
          </p>
        </motion.div>

        {/* Main 2-Column Calculator Container - Tightened Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6 }}
          className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Column: Form Controls */}
          <form onSubmit={handleCalculate} className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  Enter Your Parameters
                </h3>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  100% Anonymous
                </span>
              </div>

              {/* 1. Filing Status */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Filing Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'single', label: 'Single' },
                    { id: 'married_joint', label: 'Married Joint' },
                    { id: 'married_separate', label: 'Married Separate' },
                    { id: 'head_of_household', label: 'Head of Household' },
                  ].map((status) => (
                    <label
                      key={status.id}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
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
                        className="text-pluto-navy"
                      />
                      <span className="truncate">{status.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 2. Visa / Residency Status */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Visa / Residency Status
                </label>
                <select
                  value={formData.residencyStatus}
                  onChange={(e) => setFormData({ ...formData, residencyStatus: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800"
                >
                  <option value="citizen_resident">US Citizen or Green Card Holder</option>
                  <option value="h1b_resident">H-1B, L-1, O-1 (Resident Alien)</option>
                  <option value="f1_opt_nonresident">F-1 Student / OPT (1040-NR Non-Resident)</option>
                  <option value="dual_status">Dual-Status Tax Alien</option>
                </select>
              </div>

              {/* 3. Annual Income */}
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-700">Annual Gross Income</span>
                  <span className="font-black text-pluto-navy">${formData.annualIncome.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="400000"
                  step="5000"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ ...formData, annualIncome: Number(e.target.value) })}
                  className="w-full accent-pluto-navy cursor-pointer"
                />
              </div>

              {/* 4. Total Tax Withheld */}
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-700">Tax Withheld (Box 2 on W-2)</span>
                  <span className="font-black text-pluto-navy">${formData.taxWithheld.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={formData.taxWithheld}
                  onChange={(e) => setFormData({ ...formData, taxWithheld: Number(e.target.value) })}
                  className="w-full accent-pluto-navy cursor-pointer"
                />
              </div>

              {/* 5. Dependents */}
              <div>
                <div className="flex items-center justify-between mb-1 text-xs">
                  <span className="font-bold uppercase tracking-wider text-slate-700">Dependents</span>
                  <span className="font-black text-pluto-navy">{formData.dependents}</span>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 2, 3, 4].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, dependents: num })}
                      className={`flex-1 py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        formData.dependents === num
                          ? 'bg-pluto-navy text-white border-pluto-navy shadow'
                          : 'bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Calculate Button */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full bg-pluto-navy hover:bg-pluto-navy-deep text-white font-bold py-3 rounded-xl text-xs tracking-wide shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <Calculator className="w-4 h-4 text-pluto-gold" />
                <span>Calculate Preliminary Estimate</span>
              </button>
            </div>
          </form>

          {/* Right Column: Results Panel */}
          <div className="lg:col-span-5 bg-pluto-navy-deep text-white p-5 sm:p-7 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800 relative">
            <div className="relative z-10">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-2 mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pluto-gold">
                  Calculation Summary
                </span>
                <span className="text-[10px] text-slate-400">2024 / 2025</span>
              </div>

              {result ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-pluto-navy-surface/90 border border-pluto-gold/40 rounded-xl p-4 text-center shadow-lg">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                      {result.isRefund ? 'Estimated Tax Refund' : 'Estimated Tax Due'}
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-pluto-gold mt-1 font-heading">
                      ${result.estimatedRefundOrDue.toLocaleString()}
                    </div>
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Effective Rate: {result.effectiveTaxRate}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-900/60 rounded-xl p-3 border border-slate-800 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-300">
                      <span>Gross Income:</span>
                      <span className="font-semibold text-white">${result.calculationBreakdown.grossIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Standard Deduction:</span>
                      <span className="font-semibold text-emerald-400">-${result.standardDeduction.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Taxable Income:</span>
                      <span className="font-semibold text-white">${result.taxableIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-300 pt-1.5 border-t border-slate-800">
                      <span>Tax Liability:</span>
                      <span className="font-semibold text-white">${result.estimatedTaxLiability.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsBreakdownModalOpen(true)}
                    className="w-full flex items-center justify-center gap-1 text-[11px] text-pluto-gold hover:underline"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>View In-Depth Tax Analysis Popup</span>
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <Calculator className="w-8 h-8 text-pluto-gold mx-auto mb-2 opacity-80" />
                  <h4 className="text-sm font-bold text-white">Ready to See Your Estimate?</h4>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Adjust income and withholding on the left, then click Calculate.
                  </p>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 relative z-10">
              <button
                onClick={() => openConsultationModal('Refund Estimator Follow-up')}
                className="w-full bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-black py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Maximize Refund with a CPA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Breakdown Popup */}
      {isBreakdownModalOpen && result && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 animate-fade-up relative p-5 sm:p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="text-lg sm:text-xl font-bold font-heading text-slate-900">
                Detailed Tax Analysis Breakdown
              </h3>
              <button
                onClick={() => setIsBreakdownModalOpen(false)}
                className="p-1.5 rounded-full bg-slate-100 text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-[11px] text-slate-500">Gross Income:</span>
                  <div className="font-bold">${result.calculationBreakdown.grossIncome.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500">Standard Deduction:</span>
                  <div className="font-bold text-emerald-600">-${result.standardDeduction.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500">Taxable Income:</span>
                  <div className="font-bold">${result.taxableIncome.toLocaleString()}</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-500">Withheld:</span>
                  <div className="font-bold text-pluto-navy">${result.calculationBreakdown.withheld.toLocaleString()}</div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <div className="font-bold text-xs">
                  {result.isRefund ? 'Projected Overpayment / Refund' : 'Projected Balance Due'}
                </div>
                <div className="text-2xl font-black font-heading text-emerald-700 mt-0.5">
                  ${result.estimatedRefundOrDue.toLocaleString()}
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  onClick={() => {
                    setIsBreakdownModalOpen(false);
                    openConsultationModal('Estimator Breakdown Review');
                  }}
                  className="flex-1 bg-pluto-navy text-white font-bold py-2.5 rounded-xl text-xs"
                >
                  Claim Free CPA Return Audit
                </button>
                <button
                  onClick={() => setIsBreakdownModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-300 rounded-xl text-xs font-bold text-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
