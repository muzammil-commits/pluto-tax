import { ProcessStepInfo, SiteStatistics } from '../types';

export const COMPANY_INFO = {
  name: "PlutoTax Consulting & Advisory LLC",
  shortName: "PlutoTax",
  tagline: "Your Trusted Partner in Tax Planning, Filing & Financial Confidence",
  address: "814 San Jacinto Suite 400, Austin, TX 78701, USA",
  phone: "+1 (254) 221-0222",
  phoneRaw: "+12542210222",
  email: "support@plutotax.com",
  whatsappUrl: "https://wa.me/12542210222",
  irsTrackingUrl: "https://irs.gov/wheres-my-refund",
  workingHours: "Monday – Friday: 8:00 AM – 7:00 PM CST | Saturday: 9:00 AM – 3:00 PM CST",
  socialLinks: {
    linkedin: "https://linkedin.com/company/plutotax",
    twitter: "https://twitter.com/plutotax",
    facebook: "https://facebook.com/plutotax",
    instagram: "https://instagram.com/plutotax",
  }
};

export const INITIAL_STATISTICS: SiteStatistics = {
  returnsFiled: "15,000+",
  refundsMaximized: "$12M+",
  clientSatisfaction: "99.8%",
  isOwnerVerified: false,
  notes: "Reference values from design mockups. Mark for business owner review before treating as verified audited claims."
};

export const PROCESS_STEPS: ProcessStepInfo[] = [
  {
    stepNumber: "01",
    title: "Register & Upload Documents",
    subtitle: "Quick, encrypted document submission",
    summary: "Create your secure PlutoTax portal account and upload your W-2s, 1099s, foreign bank statements, or business balance sheets in minutes.",
    fullDetails: "Our encrypted client portal allows you to securely drag and drop your tax forms from any device. We accept PDF, high-resolution scans, and image formats with end-to-end 256-bit AES encryption. You will receive an immediate automated confirmation and a checklist confirming that all required schedules are accounted for.",
    checklist: [
      "Create client account with two-factor authentication",
      "Upload prior year returns and current tax documents (W-2, 1099, K-1)",
      "Upload foreign account records for FBAR/FATCA if applicable",
      "Complete a simple 5-minute tax questionnaire"
    ],
    icon: "UploadCloud",
    estimatedTime: "5 - 10 Minutes"
  },
  {
    stepNumber: "02",
    title: "CPA Review & Tax Calculation",
    subtitle: "Thorough analysis & deduction maximization",
    summary: "Our certified CPAs and tax advisors analyze your tax position, identify every eligible deduction, check treaty benefits, and calculate optimal credits.",
    fullDetails: "A dedicated CPA conducts an exhaustive review of your filings, cross-referencing multi-state nexus, Foreign Tax Credit (FTC Form 1116), capital gains, RSU vestings, and small business expense deductions. We run multi-scenario calculations to ensure your tax liability is legally minimized and refund maximized.",
    checklist: [
      "In-depth review by a licensed CPA / Enrolled Agent",
      "Identification of overlooked tax credits & itemized deductions",
      "DTAA treaty optimization for cross-border income",
      "Draft return preparation across Federal and state jurisdictions"
    ],
    icon: "Calculator",
    estimatedTime: "24 - 48 Hours"
  },
  {
    stepNumber: "03",
    title: "Review & Confirmation",
    subtitle: "Complete transparency before filing",
    summary: "We walk you through your draft tax return line-by-line via the portal or an optional one-on-one call, answering every question before you sign.",
    fullDetails: "Transparency is our hallmark. You receive a comprehensive summary explaining your calculated refund or balance due, state allocations, and deductions taken. We answer your questions, make any adjustments requested, and obtain your digital Form 8879 electronic signature authorization.",
    checklist: [
      "Review draft return summary and detailed worksheets",
      "Optional phone or video consultation with your assigned CPA",
      "Approval of final figures with digital signature (Form 8879)",
      "Zero hidden fees with clear upfront pricing"
    ],
    icon: "FileCheck",
    estimatedTime: "Client-Paced"
  },
  {
    stepNumber: "04",
    title: "IRS E-Filing & Status Tracking",
    subtitle: "Fast electronic submission & real-time tracking",
    summary: "Your return is transmitted directly to the IRS and state tax departments via authorized IRS e-file channels, with live confirmation tracking.",
    fullDetails: "Once authorized, we immediately transmit your return using IRS-certified e-filing gateways. You receive the official IRS Submission ID and Department of Revenue confirmation. You can monitor your refund status directly from your portal or through our official tracking tool until your refund lands in your bank account.",
    checklist: [
      "Direct transmission via certified IRS e-file gateway",
      "Immediate e-filing acknowledgment receipt and IRS timestamp",
      "Automatic state tax department transmission for all 50 states",
      "Year-round record retention and ongoing audit support"
    ],
    icon: "Send",
    estimatedTime: "Instant E-File"
  }
];

export const CORE_VALUES = [
  {
    title: "Accuracy & Compliance",
    description: "Every return is triple-checked for statutory adherence to IRS tax code, state legislation, and foreign reporting protocols.",
    icon: "CheckCircle2"
  },
  {
    title: "Trust & Transparency",
    description: "Honest advice, no hidden costs, clear explanations of your numbers, and direct access to licensed professionals.",
    icon: "ShieldCheck"
  },
  {
    title: "Customer Satisfaction",
    description: "Dedicated account managers and CPAs who treat your financial goals with high responsiveness and genuine care.",
    icon: "Smile"
  },
  {
    title: "Data Security & Confidentiality",
    description: "Bank-grade 256-bit encryption, strict IRS Section 7216 privacy compliance, and zero third-party disclosure.",
    icon: "Lock"
  },
  {
    title: "Professional Excellence",
    description: "A seasoned roster of Certified Public Accountants (CPAs), Enrolled Agents (EAs), and Certifying Acceptance Agents (CAAs).",
    icon: "Award"
  },
  {
    title: "Global Tax Expertise",
    description: "Unrivaled proficiency in US-India cross-border tax, NRI investments, FBAR/FATCA, and international treaties.",
    icon: "Globe"
  },
  {
    title: "Integrity & Accountability",
    description: "Uncompromising ethical standards ensuring your filings withstand regulatory scrutiny and audits with confidence.",
    icon: "Scale"
  }
];
