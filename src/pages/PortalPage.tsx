import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  UploadCloud, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Send, 
  ShieldCheck, 
  User, 
  LogOut, 
  Bell, 
  AlertCircle,
  FileCheck,
  Eye,
  Trash2,
  Download,
  Calendar,
  Sparkles,
  DollarSign,
  ChevronRight,
  Receipt,
  FileSpreadsheet,
  Check,
  ExternalLink,
  Info
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { 
  generateTaxOrganizerPDF, 
  generateTaxReturnSummaryPDF, 
  generateInvoicePDF 
} from '../utils/pdfGenerator';

type TaxYearType = '2024' | '2025' | '2026';
type DashboardTabType = 'Overview' | 'Upload Docs' | 'My Docs' | 'Tax Returns' | 'Invoices';

interface YearDataset {
  step: number; // 1 to 5
  statusLabel: string;
  filingBanner: string;
  federalStatus: string;
  federalRefund: string;
  stateStatus: string;
  stateRefund: string;
  documents: {
    id: string;
    name: string;
    category: string;
    size: string;
    uploadDate: string;
    status: 'Verified' | 'Pending Review';
  }[];
  returns: {
    id: string;
    title: string;
    formNumber: string;
    category: string;
    efileId: string;
    status: string;
    w2Wages: number;
    totalIncome: number;
    refundAmount: number;
  }[];
  invoices: {
    id: string;
    number: string;
    description: string;
    amount: number;
    date: string;
    status: 'PAID' | 'PENDING';
  }[];
}

const YEAR_DATA_MAP: Record<TaxYearType, YearDataset> = {
  '2024': {
    step: 5,
    statusLabel: 'E-Filing Completed (IRS Accepted)',
    filingBanner: 'Tax Year 2024 return successfully E-Filed with the IRS & State on October 14, 2024. Final Refund Deposited.',
    federalStatus: 'IRS Accepted & Processed',
    federalRefund: '$3,840.00 Direct Deposit',
    stateStatus: 'Texas (No State Income Tax)',
    stateRefund: '$0.00 (Exempt)',
    documents: [
      { id: '24-1', name: '2024_Form_W2_Microsoft_Corporation.pdf', category: 'Form W-2', size: '1.4 MB', uploadDate: '02/10/2024', status: 'Verified' },
      { id: '24-2', name: '2024_Form_1099_INT_Chase_Bank.pdf', category: 'Form 1099', size: '0.8 MB', uploadDate: '02/14/2024', status: 'Verified' },
      { id: '24-3', name: '2024_Form_1099_DIV_Vanguard.pdf', category: 'Form 1099', size: '1.1 MB', uploadDate: '02/18/2024', status: 'Verified' },
      { id: '24-4', name: '2024_FBAR_SBI_NRE_Foreign_Accounts.pdf', category: 'FBAR / Foreign Bank', size: '2.3 MB', uploadDate: '03/01/2024', status: 'Verified' },
      { id: '24-5', name: '2024_Form_1098_Mortgage_Interest_Austin.pdf', category: 'Prior Return', size: '1.2 MB', uploadDate: '03/05/2024', status: 'Verified' }
    ],
    returns: [
      {
        id: 'ret-24-1',
        title: 'Form 1040 - US Individual Income Tax Return (2024)',
        formNumber: 'Form 1040',
        category: 'Federal Tax Return',
        efileId: 'US-IRS-2024-89421-ACCEPT',
        status: 'IRS Accepted & Acknowledged',
        w2Wages: 168450,
        totalIncome: 164200,
        refundAmount: 3840
      },
      {
        id: 'ret-24-2',
        title: 'Schedule B & Form 8938 - Foreign Bank Disclosure (2024)',
        formNumber: 'FinCEN 114 / Form 8938',
        category: 'FBAR / FATCA Compliance',
        efileId: 'BSA-FBAR-2024-77192',
        status: 'FinCEN Verified & Acknowledged',
        w2Wages: 0,
        totalIncome: 14200,
        refundAmount: 0
      }
    ],
    invoices: [
      {
        id: 'inv-24-1',
        number: 'PT-2024-7841',
        description: 'US Federal Form 1040 Preparation + FBAR / DTAA Advisory',
        amount: 350.00,
        date: '04/10/2024',
        status: 'PAID'
      }
    ]
  },
  '2025': {
    step: 3,
    statusLabel: 'Review Draft (Ready for Client Review & Approval)',
    filingBanner: 'Draft Form 1040 prepared by CPA Michael Miller. Please review your draft and sign off to proceed with instant IRS E-Filing.',
    federalStatus: 'Draft Prepared — Awaiting Approval',
    federalRefund: '$2,450.00 (Estimated)',
    stateStatus: 'Texas (No State Income Tax)',
    stateRefund: '$0.00 (Exempt)',
    documents: [
      { id: '25-1', name: '2025_Form_W2_Primary_Employer.pdf', category: 'Form W-2', size: '1.6 MB', uploadDate: '01/28/2025', status: 'Verified' },
      { id: '25-2', name: '2025_Form_1099_B_ETrade_RSU_Capital_Gains.pdf', category: 'Form 1099', size: '2.8 MB', uploadDate: '02/05/2025', status: 'Verified' },
      { id: '25-3', name: '2025_ICICI_Bank_NRO_NRE_Statement.pdf', category: 'FBAR / Foreign Bank', size: '1.9 MB', uploadDate: '02/12/2025', status: 'Verified' },
      { id: '25-4', name: '2025_Travis_County_Property_Tax_Statement.pdf', category: 'Prior Return', size: '0.9 MB', uploadDate: '02/20/2025', status: 'Verified' }
    ],
    returns: [
      {
        id: 'ret-25-1',
        title: 'Form 1040 - US Individual Income Tax Return (2025)',
        formNumber: 'Form 1040 Draft',
        category: 'Federal Tax Return',
        efileId: 'US-IRS-2025-DRAFT-READY',
        status: 'Ready for Client Review & Signature',
        w2Wages: 182500,
        totalIncome: 178900,
        refundAmount: 2450
      },
      {
        id: 'ret-25-2',
        title: 'Schedule D & Form 1116 - Foreign Tax Credit DTAA (2025)',
        formNumber: 'Form 1116 DTAA',
        category: 'Cross-Border Optimization',
        efileId: 'US-IRS-2025-FTC-DRAFT',
        status: 'CPA Double-Checked',
        w2Wages: 0,
        totalIncome: 18500,
        refundAmount: 0
      }
    ],
    invoices: [
      {
        id: 'inv-25-1',
        number: 'PT-2025-8842',
        description: 'US Federal Form 1040 Preparation + FBAR / DTAA Advisory',
        amount: 350.00,
        date: '03/15/2025',
        status: 'PAID'
      }
    ]
  },
  '2026': {
    step: 2,
    statusLabel: 'Under Preparation (CPA Active Deduction Calculation)',
    filingBanner: 'Documents received. CPA Michael Miller is currently preparing your Tax Year 2026 filing and checking Foreign Tax Credit optimizations.',
    federalStatus: 'Under Active CPA Preparation',
    federalRefund: 'Calculating (W-2s Received)',
    stateStatus: 'Texas (No State Income Tax)',
    stateRefund: '$0.00 (Exempt)',
    documents: [
      { id: '26-1', name: '2026_Tax_Organizer_Intake_Packet.pdf', category: 'Prior Return', size: '1.1 MB', uploadDate: '01/15/2026', status: 'Verified' },
      { id: '26-2', name: '2026_Form_W2_Wage_Statement.pdf', category: 'Form W-2', size: '1.5 MB', uploadDate: '02/01/2026', status: 'Verified' }
    ],
    returns: [
      {
        id: 'ret-26-1',
        title: 'Form 1040 - Preliminary Tax Estimation Worksheet (2026)',
        formNumber: 'Form 1040 Worksheet',
        category: 'Work In Progress',
        efileId: 'US-IRS-2026-IN-PREPARATION',
        status: 'CPA Review In Progress',
        w2Wages: 195000,
        totalIncome: 190000,
        refundAmount: 2180
      }
    ],
    invoices: [
      {
        id: 'inv-26-1',
        number: 'PT-2026-9210',
        description: 'Tax Year 2026 Professional Filing Retainer',
        amount: 350.00,
        date: '02/01/2026',
        status: 'PENDING'
      }
    ]
  }
};

export const PortalPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') === 'register' ? 'register' : 'login';

  const {
    currentUser,
    loginClient,
    registerClient,
    logoutClient,
    uploadDocument,
    sendMessageToCPA,
  } = useAuth();

  const [authMode, setAuthMode] = useState<'login' | 'register'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [authError, setAuthError] = useState('');

  // Dashboard Tabs & Tax Year selector (matching image copy 31.png)
  const [selectedTaxYear, setSelectedTaxYear] = useState<TaxYearType>('2025');
  const [activeDashboardTab, setActiveDashboardTab] = useState<DashboardTabType>('Overview');
  const [downloadFeedback, setDownloadFeedback] = useState<string>('');
  const [previewModalDoc, setPreviewModalDoc] = useState<any | null>(null);

  // Upload modal / states
  const [isUploading, setIsUploading] = useState(false);
  const [uploadCategory, setUploadCategory] = useState<'W-2' | '1099' | 'FBAR / Foreign Bank' | 'Passport / Visa' | 'Prior Return' | 'Other'>('W-2');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  // Messaging state
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!email.trim() || !password.trim()) {
      setAuthError('Please enter both email and password.');
      return;
    }
    const success = loginClient(email, password);
    if (!success) {
      setAuthError('Invalid credentials. Please verify your email.');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPassword.trim()) {
      setAuthError('Please fill in all registration fields.');
      return;
    }
    if (password !== confirmPassword) {
      setAuthError('Passwords do not match. Please ensure Confirm Password matches.');
      return;
    }
    registerClient(fullName, email, phone, password);
  };

  const handleFileUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName.trim()) return;

    uploadDocument({
      name: uploadFileName.endsWith('.pdf') ? uploadFileName : `${uploadFileName}.pdf`,
      category: uploadCategory,
      size: `${(Math.random() * 2 + 0.8).toFixed(1)} MB`,
    });

    setUploadSuccess(`Document "${uploadFileName}" uploaded successfully!`);
    setUploadFileName('');
    setIsUploading(false);

    setTimeout(() => {
      setUploadSuccess('');
    }, 4000);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendMessageToCPA(messageInput);
    setMessageInput('');
  };

  // Trigger PDF Downloads with real document content
  const handleDownloadTaxOrganizer = () => {
    const clientName = currentUser?.name || 'Valued Client';
    const clientEmail = currentUser?.email || 'client@plutotax.com';
    generateTaxOrganizerPDF(selectedTaxYear, clientName, clientEmail);
    setDownloadFeedback(`Tax Organizer for Tax Year ${selectedTaxYear} downloaded successfully! Check your downloads.`);
    setTimeout(() => setDownloadFeedback(''), 5000);
  };

  const handleDownloadTaxReturn = (ret: any) => {
    const clientName = currentUser?.name || 'Valued Client';
    const clientEmail = currentUser?.email || 'client@plutotax.com';
    generateTaxReturnSummaryPDF({
      title: ret.title,
      year: selectedTaxYear,
      clientName,
      clientEmail,
      category: ret.category,
      filingStatus: 'Married Filing Jointly (MFJ)',
      w2Wages: ret.w2Wages,
      totalIncome: ret.totalIncome,
      refundAmount: ret.refundAmount,
      efileConfirmation: ret.efileId,
      cpaName: 'Michael Miller'
    });
    setDownloadFeedback(`Official ${ret.formNumber} for Tax Year ${selectedTaxYear} downloaded successfully!`);
    setTimeout(() => setDownloadFeedback(''), 5000);
  };

  const handleDownloadInvoice = (inv: any) => {
    const clientName = currentUser?.name || 'Valued Client';
    const clientEmail = currentUser?.email || 'client@plutotax.com';
    generateInvoicePDF(inv.number, selectedTaxYear, clientName, clientEmail, inv.amount, inv.status);
    setDownloadFeedback(`Invoice ${inv.number} downloaded successfully!`);
    setTimeout(() => setDownloadFeedback(''), 5000);
  };

  // Current year data
  const currentYearData = YEAR_DATA_MAP[selectedTaxYear];

  // 5 milestones matching image copy 31.png
  const fileStatusSteps = [
    { id: 1, title: 'Upload Documents' },
    { id: 2, title: 'Under Preparation' },
    { id: 3, title: 'Review Draft' },
    { id: 4, title: 'Payment' },
    { id: 5, title: 'E-Filing' }
  ];

  return (
    <div className="w-full bg-[#EAF3FF]/40 min-h-screen">
      
      {/* Top Header with image copy 24.png (Capitol Banner) */}
      <section className="relative bg-pluto-navy-deep text-white py-10 sm:py-14 border-b border-blue-200/80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 filter contrast-110"
          style={{
            backgroundImage: `url('/assets/hero-capitol-banner.jpg'), url('/assets/hero-capitol-banner.png')`,
            backgroundPosition: 'right 25% center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-pluto-navy-deep/95 via-pluto-navy-deep/85 to-pluto-navy-deep/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Client Portal' }]} variant="dark" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-2 border border-pluto-gold/30">
                <Lock className="w-3.5 h-3.5" />
                <span>256-BIT ENCRYPTED CLIENT PORTAL & IRS AUTHORIZED CAA</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                PlutoTax Client Dashboard
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl font-normal">
                Direct CPA communication, IRS e-file tracking, and secure document upload protected by IRS Section 7216 privacy standards.
              </p>
            </div>

            {currentUser && (
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/20">
                <div className="w-10 h-10 rounded-full bg-pluto-gold text-pluto-navy-deep flex items-center justify-center font-extrabold text-sm shadow-md">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white leading-tight">
                    Welcome, {currentUser.name}
                  </div>
                  <div className="text-[11px] text-pluto-gold font-medium">
                    Reg Date : 06-03-2025
                  </div>
                </div>
                <button
                  onClick={logoutClient}
                  className="ml-2 p-2 rounded-xl bg-white/10 hover:bg-rose-600/80 text-white transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {!currentUser ? (
          /* =========================================================================
              UNAUTHENTICATED: GRAND PORTAL 3D CARD + SIGN IN / REGISTER
              ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
            
            {/* Left Column: Grand 3D Client Portal Graphic (image copy 21.png) */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(8,43,99,0.25)] border-2 border-white bg-white ring-2 ring-blue-300/80 group">
                <img
                  src="/assets/portal-grand-preview.png"
                  alt="PlutoTax Secure Client Portal - 256-Bit Encryption & IRS CAA Verified"
                  className="w-full h-auto object-cover filter brightness-[1.03] group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> IRS Section 7216 Protected
                </span>
                <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200">
                  <Lock className="w-4 h-4 text-pluto-navy" /> 256-Bit TLS Transmission
                </span>
                <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-xl border border-blue-200">
                  <FileCheck className="w-4 h-4 text-amber-600" /> CPA Review Tracking
                </span>
              </div>
            </div>

            {/* Right Column: Sign In or Register Form */}
            <div className="lg:col-span-5 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-200">
            
            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6">
              <button
                onClick={() => { setAuthMode('login'); setAuthError(''); }}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
                  authMode === 'login'
                    ? 'border-pluto-navy text-pluto-navy'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Sign In to Portal
              </button>
              <button
                onClick={() => { setAuthMode('register'); setAuthError(''); }}
                className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
                  authMode === 'register'
                    ? 'border-pluto-navy text-pluto-navy'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                New Client Registration
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {authMode === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Client Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => alert('Password reset instructions will be sent to your registered email.')}
                      className="text-xs text-pluto-navy hover:underline font-semibold"
                    >
                      Forgot?
                    </button>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pluto-navy hover:bg-pluto-navy-deep text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.01]"
                >
                  Access My Secure Tax Portal
                </button>

                <div className="pt-4 text-center border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Need a demo login? You can sign in with any email (e.g. <code>client@example.com</code>).
                  </span>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Select Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  >
                    <option value="United States">United States (USA)</option>
                    <option value="India">India (NRI / OCI)</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="Australia">Australia</option>
                    <option value="Germany">Germany</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Other">Other Country</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (512) 555-0198"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Create Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="At least 8 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all hover:scale-[1.01]"
                >
                  Create Client Account
                </button>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted via TLS 1.3 & AES-256 Bit Standards</span>
            </div>
          </div>
        </div>
        ) : (
          /* =========================================================================
              AUTHENTICATED DASHBOARD (EXACT REFERENCE: image copy 31.png)
              ========================================================================= */
          <div className="space-y-6 animate-fade-in">
            
            {/* Feedback Alerts */}
            {downloadFeedback && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-sm font-semibold text-emerald-800 flex items-center justify-between shadow-sm animate-fade-in">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{downloadFeedback}</span>
                </div>
                <button 
                  onClick={() => setDownloadFeedback('')}
                  className="text-xs text-emerald-700 hover:text-emerald-900 font-bold ml-4"
                >
                  Dismiss
                </button>
              </div>
            )}

            {uploadSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* Top Bar Greeting: Welcome Srikanth Srikanth ( Reg Date : 06-03-2025 ) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-pluto-navy text-pluto-gold flex items-center justify-center font-black text-base shadow-sm shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-extrabold text-slate-900 font-heading">
                    Welcome {currentUser.name} <span className="text-slate-500 font-normal text-xs sm:text-sm">( Reg Date : 06-03-2025 )</span>
                  </h2>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Account Active</span>
                    <span>•</span>
                    <span>Assigned CPA: <strong>Michael Miller, CPA</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={logoutClient}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-rose-50 hover:border-rose-200 hover:text-rose-700 text-slate-600 text-xs font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs (matching image copy 31.png: Overview, Upload Docs, My Docs, Tax Returns, Invoices) */}
            <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex flex-wrap gap-2">
              {(['Overview', 'Upload Docs', 'My Docs', 'Tax Returns', 'Invoices'] as DashboardTabType[]).map((tab) => {
                const isActive = activeDashboardTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveDashboardTab(tab)}
                    className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-center ${
                      isActive
                        ? 'bg-pluto-navy text-white shadow-md'
                        : 'text-slate-600 hover:text-pluto-navy hover:bg-slate-50'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Controls Bar: Select Tax Year Dropdown (2024, 2025, 2026) + DOWNLOAD TAX ORGANIZER {year} */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              {/* Select Tax Year Dropdown */}
              <div className="flex items-center gap-3">
                <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 whitespace-nowrap">
                  Select Tax Year:
                </label>
                <div className="relative">
                  <select
                    value={selectedTaxYear}
                    onChange={(e) => setSelectedTaxYear(e.target.value as TaxYearType)}
                    className="bg-slate-50 border-2 border-pluto-navy/30 hover:border-pluto-navy text-pluto-navy font-black text-sm rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-pluto-navy cursor-pointer transition-colors shadow-sm"
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                    <option value="2024">2024</option>
                  </select>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  (Changes milestone status and documents automatically)
                </span>
              </div>

              {/* Prominent DOWNLOAD TAX ORGANIZER Button */}
              <button
                onClick={handleDownloadTaxOrganizer}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-pluto-gold via-pluto-gold-bright to-amber-400 hover:from-amber-400 hover:to-pluto-gold text-pluto-navy-deep font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-4 h-4 text-pluto-navy-deep stroke-[2.5]" />
                <span>DOWNLOAD TAX ORGANIZER {selectedTaxYear}</span>
              </button>
            </div>

            {/* "File Status" 5-Stage Tracker Card (matching image copy 31.png) */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                <div>
                  <h3 className="text-lg font-black text-slate-900 font-heading">
                    File Status
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Filing Season {selectedTaxYear} • Stage: <strong className="text-pluto-navy">{currentYearData.statusLabel}</strong>
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-pluto-blue-light text-pluto-navy px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
                  <span>Tax Year {selectedTaxYear} Active</span>
                </div>
              </div>

              {/* Connected 5-Stage Progress Visual Bar */}
              <div className="relative py-4">
                
                {/* Connecting Line Background */}
                <div className="hidden sm:block absolute top-10 left-[10%] right-[10%] h-1 bg-slate-200 z-0">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-700"
                    style={{
                      width: selectedTaxYear === '2024' ? '100%' : selectedTaxYear === '2025' ? '50%' : '25%'
                    }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative z-10">
                  {fileStatusSteps.map((step) => {
                    const isCompleted = currentYearData.step > step.id || (currentYearData.step === 5 && step.id === 5);
                    const isCurrent = currentYearData.step === step.id && currentYearData.step !== 5;

                    return (
                      <div key={step.id} className="flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
                        
                        {/* Circle Node */}
                        <div 
                          className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shadow-md transition-all shrink-0 ${
                            isCompleted
                              ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                              : isCurrent
                              ? 'bg-pluto-navy text-pluto-gold ring-4 ring-amber-100 animate-pulse'
                              : 'bg-slate-100 text-slate-400 border border-slate-300'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="w-5 h-5 stroke-[3]" />
                          ) : (
                            step.id
                          )}
                        </div>

                        {/* Title & Subtext */}
                        <div>
                          <div className={`text-xs font-black font-heading ${
                            isCurrent ? 'text-pluto-navy' : isCompleted ? 'text-slate-800' : 'text-slate-400'
                          }`}>
                            {step.title}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Explanation Banner */}
              <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-2.5">
                <Info className="w-4 h-4 text-pluto-navy shrink-0" />
                <span>{currentYearData.filingBanner}</span>
              </div>
            </div>

            {/* =====================================================================
                TAB CONTENT ROUTING
                ===================================================================== */}

            {/* TAB 1: OVERVIEW */}
            {activeDashboardTab === 'Overview' && (
              <div className="space-y-6">
                
                {/* 4 Financial & Status Snapshot Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  {/* Card 1: Federal Return */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Federal Tax ({selectedTaxYear})
                      </div>
                      <div className="text-lg font-black text-slate-900 font-heading">
                        {currentYearData.federalRefund}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{currentYearData.federalStatus}</span>
                    </div>
                  </div>

                  {/* Card 2: State Return */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        State Filing ({selectedTaxYear})
                      </div>
                      <div className="text-lg font-black text-slate-900 font-heading">
                        {currentYearData.stateStatus}
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 font-semibold flex items-center gap-1">
                      <span>{currentYearData.stateRefund}</span>
                    </div>
                  </div>

                  {/* Card 3: Vault Documents */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Document Vault
                      </div>
                      <div className="text-lg font-black text-slate-900 font-heading">
                        {currentYearData.documents.length} Files Uploaded
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-pluto-navy font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>256-Bit Encrypted</span>
                    </div>
                  </div>

                  {/* Card 4: Dedicated CPA */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Assigned Advisor
                      </div>
                      <div className="text-lg font-black text-slate-900 font-heading">
                        Michael Miller, CPA
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
                      <span>Austin Corporate HQ</span>
                      <span className="text-emerald-600 font-bold">Online</span>
                    </div>
                  </div>

                </div>

                {/* 2 Columns: Documents Vault Summary & CPA Messaging */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left Column: Recent Documents */}
                  <div className="lg:col-span-7 bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-heading flex items-center gap-2 min-w-0">
                        <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-pluto-navy shrink-0" />
                        <span className="truncate">Source Documents ({selectedTaxYear})</span>
                      </h4>
                      <button
                        onClick={() => setActiveDashboardTab('Upload Docs')}
                        className="inline-flex items-center gap-1 bg-pluto-navy/5 hover:bg-pluto-navy text-pluto-navy hover:text-white px-3 py-1.5 rounded-full text-xs font-extrabold transition-all shrink-0 whitespace-nowrap shadow-xs"
                      >
                        <span>+ Upload New</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentYearData.documents.map((doc) => (
                        <div 
                          key={doc.id}
                          className="group relative p-3 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-pluto-gold/80 bg-slate-50/60 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md flex flex-col gap-2.5"
                        >
                          {/* Top Row: Icon, File Name & Status Badge */}
                          <div className="flex items-start justify-between gap-2.5">
                            <div className="flex items-start gap-2.5 min-w-0 flex-1">
                              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-pluto-blue-light to-blue-100 text-pluto-navy flex items-center justify-center shrink-0 border border-blue-200/70 shadow-xs group-hover:scale-105 transition-transform">
                                <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-pluto-navy" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="text-xs sm:text-sm font-extrabold text-slate-900 break-words leading-snug group-hover:text-pluto-navy transition-colors">
                                  {doc.name}
                                </div>
                                
                                {/* Metadata Tags */}
                                <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-pluto-navy/5 text-pluto-navy font-bold border border-pluto-navy/10">
                                    {doc.category}
                                  </span>
                                  <span>•</span>
                                  <span>{doc.size}</span>
                                </div>
                              </div>
                            </div>

                            {/* Status Badge: Always fully visible, never clips or overflows */}
                            <span className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                              <span>{doc.status}</span>
                            </span>
                          </div>

                          {/* Action Footer: View & Download Buttons */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                            <div className="flex items-center gap-1 text-[10px] text-slate-400">
                              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                              <span>AES-256 Vault</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => setPreviewModalDoc(doc)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-pluto-navy hover:bg-slate-100 border border-slate-200 transition-colors"
                              >
                                <Eye className="w-3 h-3 text-pluto-navy" />
                                <span>View</span>
                              </button>
                              <button
                                onClick={handleDownloadTaxOrganizer}
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-pluto-navy hover:text-white bg-blue-50/80 hover:bg-pluto-navy border border-blue-200 shadow-xs transition-all"
                              >
                                <Download className="w-3 h-3" />
                                <span>Download</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setActiveDashboardTab('My Docs')}
                        className="text-xs font-extrabold text-pluto-navy hover:text-pluto-navy-deep hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <span>View All {currentYearData.documents.length} Documents in My Docs</span>
                        <ChevronRight className="w-3.5 h-3.5 text-pluto-gold" />
                      </button>
                    </div>
                  </div>

                  {/* Right Column: CPA Chat Box */}
                  <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between h-[420px]">
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                        <div>
                          <h4 className="text-base font-bold text-slate-900 font-heading">
                            Dedicated CPA Chat
                          </h4>
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>Michael Miller, CPA</span>
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2.5 overflow-y-auto max-h-[240px] pr-1">
                        {currentUser.messages.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`flex flex-col ${
                              msg.sender === 'client' ? 'items-end' : 'items-start'
                            }`}
                          >
                            <span className="text-[9px] text-slate-400 mb-0.5">
                              {msg.senderName} • {msg.timestamp}
                            </span>
                            <div 
                              className={`p-2.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                                msg.sender === 'client'
                                  ? 'bg-pluto-navy text-white rounded-br-none'
                                  : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200'
                              }`}
                            >
                              {msg.text}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <form onSubmit={handleSendMessage} className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Type message to your CPA..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                      />
                      <button
                        type="submit"
                        className="p-2 rounded-xl bg-pluto-navy hover:bg-pluto-navy-deep text-pluto-gold transition-colors shrink-0"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </form>
                  </div>

                </div>

              </div>
            )}

            {/* TAB 2: UPLOAD DOCS */}
            {activeDashboardTab === 'Upload Docs' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Upload Tax Documents for Tax Year {selectedTaxYear}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Upload your Form W-2s, 1099s, foreign bank statements, or prior year returns into your secure SOC-2 private vault.
                  </p>
                </div>

                <form onSubmit={handleFileUpload} className="p-6 rounded-2xl bg-slate-50 border-2 border-dashed border-blue-200 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Select Document Category
                      </label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value as any)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                      >
                        <option value="W-2">Form W-2 (Wage & Tax Statement)</option>
                        <option value="1099">Form 1099 (INT / DIV / B / MISC / NEC)</option>
                        <option value="FBAR / Foreign Bank">FBAR / Foreign Bank Account Statements (NRE/NRO)</option>
                        <option value="Passport / Visa">Passport / Visa (ITIN CAA Verification)</option>
                        <option value="Prior Return">Prior Year Form 1040 / Schedule K-1</option>
                        <option value="Other">Other Tax Receipt or Property Tax</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Document Description / File Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={`e.g. ${selectedTaxYear}_W2_Employer.pdf`}
                        value={uploadFileName}
                        onChange={(e) => setUploadFileName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Encrypted with AES-256 bit IRS Section 7216 compliant security.</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pluto-navy hover:bg-pluto-navy-deep text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all"
                    >
                      <UploadCloud className="w-4 h-4 text-pluto-gold" />
                      <span>Upload to {selectedTaxYear} Vault</span>
                    </button>
                  </div>
                </form>

                {/* List of documents currently in vault for this year */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-800 font-heading flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Existing Files in Tax Year {selectedTaxYear} Vault</span>
                    </h4>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-pluto-navy border border-blue-200">
                      {currentYearData.documents.length} Files
                    </span>
                  </div>

                  <div className="space-y-3">
                    {currentYearData.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="group relative p-3 sm:p-4 rounded-2xl border border-slate-200/90 hover:border-pluto-gold/80 bg-slate-50/60 hover:bg-white transition-all duration-300 shadow-xs hover:shadow-md flex flex-col gap-2.5"
                      >
                        {/* Top Row: Icon, File Name & Status Badge */}
                        <div className="flex items-start justify-between gap-2.5">
                          <div className="flex items-start gap-2.5 min-w-0 flex-1">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-pluto-blue-light to-blue-100 text-pluto-navy flex items-center justify-center shrink-0 border border-blue-200/70 shadow-xs group-hover:scale-105 transition-transform">
                              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-pluto-navy" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-xs sm:text-sm font-extrabold text-slate-900 break-words leading-snug group-hover:text-pluto-navy transition-colors">
                                {doc.name}
                              </div>
                              
                              {/* Metadata Tags */}
                              <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-pluto-navy/5 text-pluto-navy font-bold border border-pluto-navy/10">
                                  {doc.category}
                                </span>
                                <span>•</span>
                                <span>{doc.size}</span>
                                <span>•</span>
                                <span>Uploaded {doc.uploadDate}</span>
                              </div>
                            </div>
                          </div>

                          {/* Status Badge: Always fully visible, never clips or overflows */}
                          <span className="shrink-0 inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                            <span>{doc.status}</span>
                          </span>
                        </div>

                        {/* Action Footer: View & Download Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                          <div className="flex items-center gap-1 text-[10px] text-slate-400">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                            <span>AES-256 Vault</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPreviewModalDoc(doc)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-pluto-navy hover:bg-slate-100 border border-slate-200 transition-colors"
                            >
                              <Eye className="w-3 h-3 text-pluto-navy" />
                              <span>View</span>
                            </button>
                            <button
                              onClick={handleDownloadTaxOrganizer}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-pluto-navy hover:text-white bg-blue-50/80 hover:bg-pluto-navy border border-blue-200 shadow-xs transition-all"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: MY DOCS */}
            {activeDashboardTab === 'My Docs' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      My Document Repository ({selectedTaxYear})
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      All tax forms and supporting records uploaded for Tax Year {selectedTaxYear}.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadTaxOrganizer}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
                  >
                    <Download className="w-4 h-4 text-pluto-navy" />
                    <span>Download Tax Organizer {selectedTaxYear}</span>
                  </button>
                </div>

                {/* Mobile View: Grand Document Cards */}
                <div className="block md:hidden space-y-3">
                  {currentYearData.documents.map((doc) => (
                    <div 
                      key={doc.id}
                      className="group relative p-3.5 rounded-2xl border border-slate-200/90 hover:border-pluto-gold/80 bg-slate-50/60 hover:bg-white transition-all duration-300 shadow-xs flex flex-col gap-2.5"
                    >
                      <div className="flex items-start justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-pluto-blue-light to-blue-100 text-pluto-navy flex items-center justify-center shrink-0 border border-blue-200/70 shadow-xs">
                            <FileText className="w-4 h-4 text-pluto-navy" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-xs font-extrabold text-slate-900 break-words leading-snug">
                              {doc.name}
                            </div>
                            <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] text-slate-500 font-medium">
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-pluto-navy/5 text-pluto-navy font-bold border border-pluto-navy/10">
                                {doc.category}
                              </span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>{doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>

                        <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 stroke-[2.5]" />
                          <span>{doc.status}</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-1 text-[10px] text-slate-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                          <span>AES-256 Vault</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => setPreviewModalDoc(doc)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-600 hover:text-pluto-navy hover:bg-slate-100 border border-slate-200 transition-colors"
                          >
                            <Eye className="w-3 h-3 text-pluto-navy" />
                            <span>View</span>
                          </button>
                          <button
                            onClick={handleDownloadTaxOrganizer}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-pluto-navy hover:text-white bg-blue-50/80 hover:bg-pluto-navy border border-blue-200 shadow-xs transition-all"
                          >
                            <Download className="w-3 h-3" />
                            <span>Download</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop View: Full Spreadsheet Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Document Name</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Upload Date</th>
                        <th className="py-3 px-4">Size</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentYearData.documents.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-bold text-slate-900 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-pluto-navy shrink-0" />
                            <span>{doc.name}</span>
                          </td>
                          <td className="py-3 px-4 text-slate-600">{doc.category}</td>
                          <td className="py-3 px-4 text-slate-500">{doc.uploadDate}</td>
                          <td className="py-3 px-4 text-slate-500">{doc.size}</td>
                          <td className="py-3 px-4">
                            <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setPreviewModalDoc(doc)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-pluto-navy hover:bg-slate-100"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={handleDownloadTaxOrganizer}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-pluto-navy hover:bg-slate-100"
                                title="Download Document"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: TAX RETURNS */}
            {activeDashboardTab === 'Tax Returns' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    CPA-Prepared Tax Returns & Filing Records ({selectedTaxYear})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Download official Form 1040 summaries, schedules, and IRS electronic filing acknowledgment certificates.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {currentYearData.returns.map((ret) => (
                    <div 
                      key={ret.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm">
                          <FileCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="inline-block text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-100 text-pluto-navy mb-1">
                            {ret.category}
                          </div>
                          <h4 className="text-base font-bold text-slate-900 font-heading">
                            {ret.title}
                          </h4>
                          <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3 mt-1">
                            <span>Filing Status: <strong className="text-emerald-700">{ret.status}</strong></span>
                            <span>•</span>
                            <span>E-File ID: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-200">{ret.efileId}</code></span>
                            {ret.refundAmount > 0 && (
                              <>
                                <span>•</span>
                                <span className="font-bold text-emerald-600">Refund: ${ret.refundAmount.toLocaleString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadTaxReturn(ret)}
                        className="inline-flex items-center justify-center gap-2 bg-pluto-navy hover:bg-pluto-navy-deep text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all hover:scale-[1.02] shrink-0"
                      >
                        <Download className="w-4 h-4 text-pluto-gold" />
                        <span>Download Form 1040 PDF</span>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-3">
                  <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                  <span>
                    All PDF downloads generated are official, certified summary documents containing IRS e-file confirmation numbers and CPA certification blocks.
                  </span>
                </div>
              </div>
            )}

            {/* TAB 5: INVOICES */}
            {activeDashboardTab === 'Invoices' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Tax Advisory Invoices & Billing ({selectedTaxYear})
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Transparent, fixed billing receipts for professional tax preparation and foreign asset advisory.
                  </p>
                </div>

                <div className="space-y-4">
                  {currentYearData.invoices.map((inv) => (
                    <div 
                      key={inv.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <Receipt className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-slate-900">
                              Invoice #{inv.number}
                            </h4>
                            <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                              inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {inv.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{inv.description}</p>
                          <div className="text-[11px] text-slate-400 mt-1">
                            Date: {inv.date} • Amount: <strong>${inv.amount.toFixed(2)} USD</strong>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDownloadInvoice(inv)}
                        className="inline-flex items-center justify-center gap-1.5 bg-white border border-slate-300 hover:border-pluto-navy text-slate-800 hover:text-pluto-navy px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0"
                      >
                        <Download className="w-3.5 h-3.5 text-pluto-navy" />
                        <span>Download Invoice PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Document Preview Modal */}
            {previewModalDoc && (
              <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
                      <FileText className="w-5 h-5 text-pluto-navy" />
                      <span>Document Information</span>
                    </h3>
                    <button
                      onClick={() => setPreviewModalDoc(null)}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-3 text-xs text-slate-600">
                    <div>
                      <span className="font-bold text-slate-800">File Name:</span>
                      <p className="text-slate-900 font-semibold">{previewModalDoc.name}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">Category:</span>
                      <p className="text-slate-900">{previewModalDoc.category}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">File Size:</span>
                      <p className="text-slate-900">{previewModalDoc.size}</p>
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">Security Verification:</span>
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>SHA-256 Verified & Encrypted in US SOC-2 Private Vault</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                      onClick={() => setPreviewModalDoc(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        handleDownloadTaxOrganizer();
                        setPreviewModalDoc(null);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pluto-navy text-white text-xs font-bold hover:bg-pluto-navy-deep"
                    >
                      <Download className="w-3.5 h-3.5 text-pluto-gold" />
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
