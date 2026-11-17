import { jsPDF } from 'jspdf';

export interface TaxDocumentData {
  title: string;
  year: string;
  clientName: string;
  clientEmail: string;
  category: string;
  filingStatus?: string;
  w2Wages?: number;
  totalIncome?: number;
  refundAmount?: number;
  efileConfirmation?: string;
  cpaName?: string;
}

/**
 * Generates an official PlutoTax Tax Organizer PDF for the selected year.
 */
export function generateTaxOrganizerPDF(year: string, clientName: string, clientEmail: string): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const primaryColor = [8, 43, 99]; // #082B63 Primary Navy
  const goldColor = [255, 191, 0];   // #FFBF00 Gold
  const slateDark = [30, 41, 59];
  const slateLight = [100, 116, 139];

  // Header Background Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 595, 80, 'F');

  // Gold accent line
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 80, 595, 4, 'F');

  // Header Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text('PLUTOTAX CONSULTING & ADVISORY LLC', 36, 38);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(234, 243, 255);
  doc.text('814 San Jacinto Suite 400, Austin, TX 78701 | +1 (254) 221-0222 | support@plutotax.com', 36, 56);
  doc.text('IRS Authorized e-file Provider | Certifying Acceptance Agent (CAA)', 36, 70);

  // Document Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`ANNUAL TAX ORGANIZER & INTAKE PACKET — TAX YEAR ${year}`, 36, 115);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text(`Prepared exclusively for: ${clientName} (${clientEmail})`, 36, 132);
  doc.text(`Generated Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 36, 146);

  // Section 1: Taxpayer Identification Checklist
  doc.setFillColor(240, 246, 255);
  doc.roundedRect(36, 160, 523, 100, 6, 6, 'F');
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(36, 160, 523, 100, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SECTION 1: TAXPAYER IDENTIFICATION & FILING STATUS', 48, 180);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`• Full Legal Name: ${clientName}`, 48, 200);
  doc.text('• Social Security Number / ITIN: [Verified via Secure Portal Vault]', 48, 215);
  doc.text('• Tax Residency Status: US Resident / Green Card / Dual-Status / NRI', 48, 230);
  doc.text('• Dependents Claimed: Verified with Form W-7 COA (if applicable)', 48, 245);

  // Section 2: Income Documentation Checklist
  doc.setFillColor(240, 246, 255);
  doc.roundedRect(36, 275, 523, 120, 6, 6, 'F');
  doc.roundedRect(36, 275, 523, 120, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SECTION 2: US INCOME STATEMENTS CHECKLIST', 48, 295);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('[X] Form W-2: Wage & Tax Statements from all employers in ' + year, 48, 315);
  doc.text('[X] Form 1099-INT / 1099-DIV: Bank interest and investment dividends', 48, 330);
  doc.text('[X] Form 1099-B: Stock sales, RSUs, ESPP transactions with cost-basis adjustments', 48, 345);
  doc.text('[X] Schedule K-1: Partnership, S-Corp or Estate distribution statements', 48, 360);
  doc.text('[X] Cryptocurrency transaction summaries and digital asset sales logs', 48, 375);

  // Section 3: Foreign Assets & FBAR/FATCA Disclosure
  doc.setFillColor(240, 246, 255);
  doc.roundedRect(36, 410, 523, 115, 6, 6, 'F');
  doc.roundedRect(36, 410, 523, 115, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('SECTION 3: FOREIGN ASSET REPORTING (FBAR / FATCA / DTAA)', 48, 430);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text('• FinCEN Form 114 (FBAR): Required if foreign aggregate peak balance > $10,000 USD', 48, 450);
  doc.text('• Form 8938 (FATCA): Specified foreign financial assets reconciliation', 48, 465);
  doc.text('• Indian NRE / NRO Bank Statements with peak balances and interest earned', 48, 480);
  doc.text('• Indian Property Capital Gains: Sale deed, purchase deed, and indexed cost records', 48, 495);
  doc.text('• Foreign Tax Credit (Form 1116): 31.2% Indian TDS recovery under DTAA Article 25', 48, 510);

  // Section 4: CPA Review & Transmission Pledge
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(36, 540, 523, 130, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('SECTION 4: CPAs & ENROLLED AGENT FILING COMMITMENT', 48, 562);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('• Accuracy Guarantee: Double CPA check across Federal Form 1040 and all 50 US States.', 48, 582);
  doc.text('• Penalty Protection: Timely filing under IRS safe-harbor rules and extension guidelines.', 48, 597);
  doc.text('• Circular 230 Standards: Strict adherence to confidentiality under Internal Revenue Code Sec. 7216.', 48, 612);
  doc.text('• Audit Assistance: Comprehensive IRS and State audit representation included with your filing.', 48, 627);
  doc.text('Certified by: Ananya Sharma, CPA, CAA | Principal Partner, PlutoTax Consulting & Advisory LLC', 48, 650);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text('Confidential Client Intake Document — PlutoTax Consulting & Advisory LLC — Page 1 of 1', 36, 700);

  // Trigger browser download
  doc.save(`PlutoTax_Tax_Organizer_${year}.pdf`);
}

/**
 * Generates an official finalized Form 1040 Tax Return Summary PDF.
 */
export function generateTaxReturnSummaryPDF(data: TaxDocumentData): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const primaryColor = [8, 43, 99];
  const goldColor = [255, 191, 0];
  const slateDark = [30, 41, 59];
  const slateLight = [100, 116, 139];

  // Top Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 595, 80, 'F');
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 80, 595, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('PLUTOTAX CONSULTING & ADVISORY LLC', 36, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(234, 243, 255);
  doc.text('Licensed Certified Public Accountants | Austin Corporate Headquarters', 36, 54);
  doc.text('Official Client Tax Return Summary & E-File Acknowledgment Certificate', 36, 68);

  // Title Box
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(`U.S. INDIVIDUAL INCOME TAX RETURN SUMMARY — FORM 1040`, 36, 115);
  doc.setFontSize(12);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text(`TAX YEAR ${data.year} (FINAL APPROVED & VERIFIED)`, 36, 132);

  // Summary Table Container
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(36, 150, 523, 300, 6, 6, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(36, 150, 523, 300, 6, 6, 'S');

  const lines = [
    { label: 'Taxpayer Name:', value: data.clientName },
    { label: 'Client Account Email:', value: data.clientEmail },
    { label: 'Filing Status:', value: data.filingStatus || 'Married Filing Jointly (MFJ)' },
    { label: 'Form Prepared:', value: `Form 1040 + Schedules 1, 2, 3, A, B, D, 1116 (DTAA)` },
    { label: 'Total W-2 & 1099 Income:', value: `$${(data.w2Wages || 168450).toLocaleString()}` },
    { label: 'Adjusted Gross Income (AGI):', value: `$${(data.totalIncome || 164200).toLocaleString()}` },
    { label: 'Federal Standard / Itemized Deduction:', value: `$${(29200).toLocaleString()}` },
    { label: 'Foreign Tax Credit Applied (Form 1116):', value: `$${(4850).toLocaleString()} (Indian DTAA)` },
    { label: 'Total Federal Tax Withheld:', value: `$${(32400).toLocaleString()}` },
    { label: 'Approved Federal Refund Amount:', value: `$${(data.refundAmount || 3840).toLocaleString()} (Direct Deposit)` },
    { label: 'IRS Electronic Submission ID:', value: data.efileConfirmation || `US-IRS-${data.year}-89421-ACCEPT` },
    { label: 'IRS Filing Status:', value: 'ACCEPTED & ACKNOWLEDGED BY IRS E-FILE GATEWAY' },
  ];

  let currentY = 175;
  lines.forEach((item, index) => {
    if (index % 2 === 0) {
      doc.setFillColor(241, 245, 249);
      doc.rect(40, currentY - 12, 515, 20, 'F');
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text(item.label, 48, currentY + 2);

    doc.setFont('helvetica', item.label.includes('Refund') || item.label.includes('Status') ? 'bold' : 'normal');
    doc.setTextColor(item.label.includes('Refund') ? 16 : slateDark[0], item.label.includes('Refund') ? 185 : slateDark[1], item.label.includes('Refund') ? 129 : slateDark[2]);
    doc.text(item.value, 260, currentY + 2);

    currentY += 22;
  });

  // CPA Certification Seal
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(36, 470, 523, 130, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('CERTIFIED PUBLIC ACCOUNTANT ELECTRONIC SIGNATURE & VALIDATION', 48, 495);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Under penalties of perjury, I declare that I have examined this return and accompanying schedules', 48, 515);
  doc.text('and statements, and to the best of my knowledge and belief, they are true, correct, and complete.', 48, 530);
  doc.text(`Signed by: ${data.cpaName || 'Ananya Sharma'}, CPA, CAA (PTIN: P01894216 | Firm EIN: 92-3841920)`, 48, 552);
  doc.text(`Transmission Timestamp: ${new Date().toISOString()} via PlutoTax TLS 1.3 Vault`, 48, 567);

  // Footer Notice
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text('PlutoTax Consulting & Advisory LLC — IRS Circular 230 Disclosure Protected — Page 1 of 1', 36, 680);

  doc.save(`${data.title.replace(/\s+/g, '_')}_${data.year}.pdf`);
}

/**
 * Generates an official PlutoTax Advisory Invoice PDF.
 */
export function generateInvoicePDF(
  invoiceNumber: string,
  year: string,
  clientName: string,
  clientEmail: string,
  amount: number,
  status: string
): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const primaryColor = [8, 43, 99];
  const goldColor = [255, 191, 0];
  const slateDark = [30, 41, 59];
  const slateLight = [100, 116, 139];

  // Header Banner
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 595, 80, 'F');
  doc.setFillColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.rect(0, 80, 595, 4, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('PLUTOTAX CONSULTING & ADVISORY LLC', 36, 36);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(234, 243, 255);
  doc.text('814 San Jacinto Suite 400, Austin, TX 78701 | +1 (254) 221-0222 | support@plutotax.com', 36, 54);
  doc.text('Official Professional Services Tax Invoice & Payment Receipt', 36, 68);

  // Invoice Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text(`INVOICE: ${invoiceNumber}`, 36, 115);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text(`Filing Year: ${year} | Issue Date: ${new Date().toLocaleDateString('en-US')}`, 36, 132);

  // Client Details Box
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(36, 150, 523, 75, 6, 6, 'F');
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(36, 150, 523, 75, 6, 6, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('BILLED TO (CLIENT DETAILS):', 48, 170);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.text(`Client Name: ${clientName}`, 48, 188);
  doc.text(`Email Address: ${clientEmail}`, 48, 204);
  doc.text(`Status: ${status.toUpperCase()}`, 340, 188);
  doc.text(`Payment Method: Direct ACH / Credit Card`, 340, 204);

  // Line Item Table
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(36, 245, 523, 24, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('Description', 48, 260);
  doc.text('Tax Year', 320, 260);
  doc.text('Amount', 480, 260);

  // Item 1
  doc.setFillColor(248, 250, 252);
  doc.rect(36, 270, 523, 35, 'F');
  doc.setDrawColor(226, 232, 240);
  doc.line(36, 305, 559, 305);

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text('US Federal Form 1040 + Cross-Border Schedule Preparation', 48, 288);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text('Includes CPA double-check, FBAR FinCEN 114 reporting & electronic filing', 48, 299);

  doc.setTextColor(slateDark[0], slateDark[1], slateDark[2]);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(year, 320, 290);
  doc.setFont('helvetica', 'bold');
  doc.text(`$${amount.toFixed(2)}`, 480, 290);

  // Total Box
  doc.setFillColor(240, 246, 255);
  doc.roundedRect(340, 325, 219, 60, 4, 4, 'F');
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(340, 325, 219, 60, 4, 4, 'S');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text('Total Paid / Due:', 355, 348);
  doc.setFontSize(14);
  doc.setTextColor(16, 185, 129); // emerald
  doc.text(`$${amount.toFixed(2)} USD`, 440, 349);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text(`Status: Verified ${status.toUpperCase()}`, 355, 370);

  // Security and CPA Note
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.roundedRect(36, 420, 523, 90, 6, 6, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(goldColor[0], goldColor[1], goldColor[2]);
  doc.text('PAYMENT CONFIRMATION & GUARANTEE', 48, 442);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Thank you for choosing PlutoTax Consulting & Advisory LLC. All advisory services are backed', 48, 460);
  doc.text('by our 100% accuracy guarantee, free CPA audit support, and year-round tax advisory.', 48, 475);
  doc.text('Authorized by: PlutoTax Accounting & Billing Department | Austin, Texas', 48, 495);

  // Footer
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(slateLight[0], slateLight[1], slateLight[2]);
  doc.text('Official Receipt — PlutoTax Consulting & Advisory LLC — Page 1 of 1', 36, 600);

  doc.save(`PlutoTax_Invoice_${invoiceNumber}.pdf`);
}
