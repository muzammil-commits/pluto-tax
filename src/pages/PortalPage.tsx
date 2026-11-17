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
  Sparkles
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

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
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [authError, setAuthError] = useState('');

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
    if (!fullName.trim() || !email.trim() || !phone.trim() || !password.trim()) {
      setAuthError('Please fill in all registration fields.');
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

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Top Header */}
      <section className="bg-pluto-navy-deep text-white py-10 sm:py-14 border-b border-pluto-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Client Portal' }]} />
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-2 border border-pluto-gold/30">
                <Lock className="w-3.5 h-3.5" />
                <span>256-BIT ENCRYPTED CLIENT PORTAL</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                PlutoTax Client Dashboard
              </h1>
            </div>

            {currentUser && (
              <div className="flex items-center gap-3 bg-white/10 p-2 sm:p-3 rounded-2xl border border-white/20">
                <div className="w-10 h-10 rounded-xl bg-pluto-gold text-pluto-navy-deep flex items-center justify-center font-bold text-sm">
                  {currentUser.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{currentUser.name}</div>
                  <div className="text-xs text-slate-300">{currentUser.email}</div>
                </div>
                <button
                  onClick={logoutClient}
                  className="ml-3 p-2 rounded-lg bg-white/10 hover:bg-rose-500/20 text-slate-300 hover:text-rose-400 transition-colors"
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
              UNAUTHENTICATED: LOGIN OR REGISTER CARD
              ========================================================================= */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200">
            
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
        ) : (
          /* =========================================================================
              AUTHENTICATED DASHBOARD
              ========================================================================= */
          <div className="space-y-8 animate-fade-in">
            
            {uploadSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* 1. Live Filing Progress Tracker */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Filing Season: {currentUser.taxYear}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Current Stage: <span className="text-pluto-navy">{currentUser.filingStatus}</span>
                  </h3>
                </div>
                <div className="inline-flex items-center gap-2 bg-pluto-blue-light text-pluto-navy font-bold text-xs px-3.5 py-1.5 rounded-full">
                  <Clock className="w-4 h-4" />
                  <span>Completion: {currentUser.progressPercent}%</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden mb-6">
                <div 
                  className="bg-gradient-to-r from-pluto-navy via-pluto-gold to-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${currentUser.progressPercent}%` }}
                />
              </div>

              {/* 5 Milestone Steps */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
                {[
                  { step: '1', title: 'Upload Docs', active: true },
                  { step: '2', title: 'CPA Review', active: currentUser.progressPercent >= 40 },
                  { step: '3', title: 'Client Review', active: currentUser.progressPercent >= 70 },
                  { step: '4', title: 'IRS E-Filed', active: currentUser.progressPercent >= 90 },
                  { step: '5', title: 'Refund Complete', active: currentUser.progressPercent >= 100 },
                ].map((m, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1.5 ${
                        m.active 
                          ? 'bg-pluto-navy text-pluto-gold' 
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {m.step}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{m.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2 Columns: Documents Vault & Secure CPA Messaging */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Document Vault (Left Column) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
                        <FileText className="w-5 h-5 text-pluto-navy" />
                        <span>Secure Document Vault</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {currentUser.documents.length} Files Uploaded for Tax Year {currentUser.taxYear}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsUploading(!isUploading)}
                      className="inline-flex items-center gap-1.5 bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep px-4 py-2 rounded-xl text-xs font-bold shadow-sm transition-transform hover:scale-[1.02]"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Tax Form</span>
                    </button>
                  </div>

                  {/* Upload Form (Expandable) */}
                  {isUploading && (
                    <form onSubmit={handleFileUpload} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 space-y-3 animate-fade-in">
                      <div className="font-bold text-xs text-slate-800">Upload New Tax Document</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            Document Category
                          </label>
                          <select
                            value={uploadCategory}
                            onChange={(e) => setUploadCategory(e.target.value as any)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs"
                          >
                            <option value="W-2">Form W-2 (Wage Statement)</option>
                            <option value="1099">Form 1099 (INT / DIV / B / NEC)</option>
                            <option value="FBAR / Foreign Bank">FBAR / Foreign Bank Account</option>
                            <option value="Passport / Visa">Passport / Visa (ITIN CAA)</option>
                            <option value="Prior Return">Prior Year Form 1040</option>
                            <option value="Other">Other Schedule or Receipt</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                            File Title / Description
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. 2024_W2_Microsoft.pdf"
                            value={uploadFileName}
                            onChange={(e) => setUploadFileName(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsUploading(false)}
                          className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-1.5 text-xs bg-pluto-navy text-white rounded-lg font-bold"
                        >
                          Confirm & Store in Vault
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Documents List */}
                  <div className="space-y-3">
                    {currentUser.documents.map((doc) => (
                      <div 
                        key={doc.id}
                        className="flex items-center justify-between p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-pluto-blue-light text-pluto-navy flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-slate-900">{doc.name}</div>
                            <div className="text-[11px] text-slate-500 flex items-center gap-2">
                              <span>{doc.category}</span>
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>Uploaded {doc.uploadDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span 
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              doc.status === 'Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {doc.status}
                          </span>
                        </div>
                      </div>
                    ))}

                    {currentUser.documents.length === 0 && (
                      <div className="text-center py-8 text-slate-400 text-xs">
                        No tax documents uploaded yet. Click "Upload Tax Form" above to begin.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-400">
                  <Lock className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Files stored in encrypted US SOC-2 compliant private data center</span>
                </div>
              </div>

              {/* Secure CPA Messaging (Right Column) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between h-[520px]">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 font-heading">
                        Dedicated CPA Messenger
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Michael Miller, CPA (Assigned Advisor)</span>
                      </div>
                    </div>
                  </div>

                  {/* Messages Scroll Area */}
                  <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                    {currentUser.messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex flex-col ${
                          msg.sender === 'client' ? 'items-end' : 'items-start'
                        }`}
                      >
                        <span className="text-[10px] text-slate-400 mb-1 px-1">
                          {msg.senderName} • {msg.timestamp}
                        </span>
                        <div 
                          className={`p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
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

                {/* Send Message Input Form */}
                <form onSubmit={handleSendMessage} className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type message to your CPA..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                  <button
                    type="submit"
                    className="p-2.5 rounded-xl bg-pluto-navy hover:bg-pluto-navy-deep text-pluto-gold transition-colors shrink-0"
                    title="Send"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};
