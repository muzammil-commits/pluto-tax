import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, closeConsultationModal, preselectedService, services, addEnquiry } = useSite();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState(preselectedService || services[0]?.title || '');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'whatsapp'>('email');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setServiceRequired(preselectedService);
    }
  }, [preselectedService]);

  if (!isConsultationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      addEnquiry({
        fullName,
        email,
        phone,
        serviceRequired,
        preferredContact,
        message,
      });

      setIsLoading(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    closeConsultationModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-fade-up relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep p-6 text-white relative">
          <button
            onClick={handleModalClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 text-xs text-pluto-gold font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CONFIDENTIAL ADVISORY INTAKE</span>
          </div>
          <h3 className="text-2xl font-bold font-heading text-white">
            Schedule a Free Tax Consultation
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Connect directly with a licensed CPA or EA to review your specific tax requirements.
          </p>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {isSuccess ? (
            <div className="py-6 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900">Request Confirmed!</h4>
              <p className="mt-2 text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you, {fullName || 'valued client'}. Your consultation inquiry has been routed to our senior tax strategy team. We will reach out promptly.
              </p>
              <button
                onClick={handleModalClose}
                className="mt-6 bg-pluto-navy text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-pluto-navy-deep transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service of Interest
                </label>
                <select
                  value={serviceRequired}
                  onChange={(e) => setServiceRequired(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                >
                  {services.map((svc) => (
                    <option key={svc.id} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="General Tax Consultation">General Assessment & Quote</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Brief Tax Summary or Question <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Provide context regarding your visa status, states worked, RSU vesting, or foreign accounts..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-pluto-navy-deep to-pluto-navy text-white font-extrabold py-3.5 rounded-xl text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-pluto-gold" />
                    <span>Submit Free Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
