export interface TaxCalculationInput {
  filingStatus: 'single' | 'married_joint' | 'married_separate' | 'head_of_household';
  residencyStatus: 'citizen_resident' | 'h1b_resident' | 'f1_opt_nonresident' | 'dual_status';
  annualIncome: number;
  taxWithheld: number;
  dependents: number;
}

export interface TaxCalculationResult {
  estimatedTaxLiability: number;
  estimatedRefundOrDue: number; // positive = refund, negative = due
  isRefund: boolean;
  effectiveTaxRate: number;
  standardDeduction: number;
  taxableIncome: number;
  totalCredits: number;
  calculationBreakdown: {
    grossIncome: number;
    deductionUsed: number;
    taxBeforeCredits: number;
    childCredits: number;
    netTax: number;
    withheld: number;
  };
  disclaimer: string;
}

// 2024 / 2025 Standard Deductions
const STANDARD_DEDUCTIONS = {
  single: 14600,
  married_joint: 29200,
  married_separate: 14600,
  head_of_household: 21900,
};

// 2024 Tax Brackets for Single
const BRACKETS_SINGLE = [
  { rate: 0.10, min: 0, max: 11600 },
  { rate: 0.12, min: 11600, max: 47150 },
  { rate: 0.22, min: 47150, max: 100525 },
  { rate: 0.24, min: 100525, max: 191950 },
  { rate: 0.32, min: 191950, max: 243725 },
  { rate: 0.35, min: 243725, max: 609350 },
  { rate: 0.37, min: 609350, max: Infinity },
];

// 2024 Tax Brackets for Married Filing Jointly
const BRACKETS_JOINT = [
  { rate: 0.10, min: 0, max: 23200 },
  { rate: 0.12, min: 23200, max: 94300 },
  { rate: 0.22, min: 94300, max: 201050 },
  { rate: 0.24, min: 201050, max: 383900 },
  { rate: 0.32, min: 383900, max: 487450 },
  { rate: 0.35, min: 487450, max: 731200 },
  { rate: 0.37, min: 731200, max: Infinity },
];

export function calculateEstimatedTax(input: TaxCalculationInput): TaxCalculationResult {
  const { filingStatus, residencyStatus, annualIncome, taxWithheld, dependents } = input;

  // Non-resident aliens on Form 1040-NR generally cannot take standard deduction unless under India Article 21(2) or specific treaties
  let deduction = STANDARD_DEDUCTIONS[filingStatus] || 14600;
  if (residencyStatus === 'f1_opt_nonresident') {
    // Under US-India treaty article 21(2), students from India can claim standard deduction, but general 1040-NR is limited.
    // For estimate, apply standard deduction with treaty notation
    deduction = STANDARD_DEDUCTIONS['single'];
  }

  const taxableIncome = Math.max(0, annualIncome - deduction);

  // Compute Federal Income Tax using progressive brackets
  const brackets = filingStatus === 'married_joint' ? BRACKETS_JOINT : BRACKETS_SINGLE;
  let taxBeforeCredits = 0;

  for (const b of brackets) {
    if (taxableIncome > b.min) {
      const taxableInBracket = Math.min(taxableIncome, b.max) - b.min;
      taxBeforeCredits += taxableInBracket * b.rate;
    }
  }

  // Child Tax Credit: $2,000 per qualifying dependent (subject to phaseouts above $200k/$400k)
  const childCreditMax = dependents * 2000;
  const netTax = Math.max(0, taxBeforeCredits - childCreditMax);

  const diff = taxWithheld - netTax;
  const isRefund = diff >= 0;
  const effectiveRate = annualIncome > 0 ? (netTax / annualIncome) * 100 : 0;

  return {
    estimatedTaxLiability: Math.round(netTax),
    estimatedRefundOrDue: Math.round(Math.abs(diff)),
    isRefund,
    effectiveTaxRate: parseFloat(effectiveRate.toFixed(1)),
    standardDeduction: deduction,
    taxableIncome: Math.round(taxableIncome),
    totalCredits: childCreditMax,
    calculationBreakdown: {
      grossIncome: annualIncome,
      deductionUsed: deduction,
      taxBeforeCredits: Math.round(taxBeforeCredits),
      childCredits: childCreditMax,
      netTax: Math.round(netTax),
      withheld: taxWithheld,
    },
    disclaimer: "This estimate is for guidance and illustrative purposes based on standard 2024/2025 federal tax parameters. It does not account for state income taxes, FICA/self-employment taxes, itemized deductions, foreign tax credits, or specific treaty positions. It is not an official IRS tax determination. Consult our licensed CPAs for an audit-ready tax filing."
  };
}
