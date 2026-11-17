import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Send, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { COMPANY_INFO } from '../data/companyData';
import { useSite } from '../context/SiteContext';

export const ConsultationSection: React.FC = () => {
  const { addEnquiry, services } = useSite();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceRequired, setServiceRequired] = useState(services[0]?.title || 'Advance Tax Planning & Tax Strategy');
  const [preferredContact, setPreferredContact] = useState<'phone' | 'email' | 'whatsapp'>('email');
  const [message, setMessage] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
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
      setIsSubmitted(true);
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 750);
  };

  return (
    <section id="consultation-section" className="relative w-full py-10 sm:py-14 bg-[#EAF3FF]/85 backdrop-blur-sm overflow-hidden border-t border-blue-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Details with Tightened Margins */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-pluto-blue-light text-pluto-navy text-xs font-bold uppercase tracking-wider mb-2.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL CONSULTATION</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Let's Simplify Your Taxes Together.
              </h2>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Whether you are filing complex US-India cross-border returns, navigating multi-state RSU equity vestings, or scaling a business, our licensed CPAs are ready to help.
              </p>

              {/* Contact Cards - Tightened */}
              <div className="mt-5 space-y-3">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/90 hover:bg-pluto-blue-light/50 border border-slate-200/80 transition-colors group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Phone Line</span>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-pluto-navy">
                      {COMPANY_INFO.phone}
                    </div>
                    <span className="text-[11px] text-slate-500">Mon - Fri: 8:00 AM – 7:00 PM CST</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-white/90 hover:bg-pluto-blue-light/50 border border-slate-200/80 transition-colors group shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Support</span>
                    <div className="text-sm font-bold text-slate-900 group-hover:text-pluto-navy">
                      {COMPANY_INFO.email}
                    </div>
                    <span className="text-[11px] text-slate-500">Response within 4 business hours</span>
                  </div>
                </a>

                {/* Office Location */}
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm">
                  <div className="w-9 h-9 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Headquarters Address</span>
                    <div className="text-xs sm:text-sm font-bold text-slate-900">
                      {COMPANY_INFO.address}
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat Button */}
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-emerald-950">Chat on WhatsApp</div>
                      <span className="text-[10px] text-emerald-700">Quick question? Chat with intake team</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                    Live Chat →
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] text-slate-500">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free 15-Minute Intake • Zero Sales Pressure • 100% Confidential</span>
            </div>
          </motion.div>

          {/* Right Column: Working Consultation Form - Tightened */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white/95 backdrop-blur-md rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-xl relative"
          >
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading mb-1">
              Request Your Free Tax Consultation
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Fill in your details below and an experienced tax advisor will reach out promptly.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold text-emerald-950">Thank You!</h4>
                <p className="mt-1 text-xs text-emerald-800 max-w-sm mx-auto leading-relaxed">
                  Your consultation request has been securely submitted to our Austin, TX advisory team. A licensed CPA will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 bg-pluto-navy text-white text-xs font-bold px-5 py-2 rounded-xl hover:bg-pluto-navy-deep transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (512) 555-0198"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Required
                  </label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  >
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                    <option value="General Tax Consultation">General Tax Consultation & Assessment</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'email', label: 'Email' },
                      { id: 'phone', label: 'Phone' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                    ].map((method) => (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPreferredContact(method.id as any)}
                        className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all ${
                          preferredContact === method.id
                            ? 'bg-pluto-navy text-white border-pluto-navy shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Tax Question / Note <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2.5}
                    required
                    placeholder="Tell us about your visa status, states worked in, foreign accounts, or business..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-1 bg-pluto-navy hover:bg-pluto-navy-deep text-white font-bold py-3 rounded-xl text-xs tracking-wide shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-pluto-gold" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
