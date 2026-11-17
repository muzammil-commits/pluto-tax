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
    }, 850);
  };

  return (
    <section id="consultation-section" className="relative w-full py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Contact Details with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-pluto-blue-light text-pluto-navy text-xs font-bold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>CONFIDENTIAL CONSULTATION</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading leading-tight">
                Let's Simplify Your Taxes Together.
              </h2>

              <p className="mt-4 text-base text-slate-600 leading-relaxed font-normal">
                Whether you are filing complex US-India cross-border returns, navigating multi-state RSU equity vestings, or scaling a business, our licensed CPAs are ready to help.
              </p>

              {/* Contact Cards */}
              <div className="mt-8 space-y-4">
                {/* Phone */}
                <a
                  href={`tel:${COMPANY_INFO.phoneRaw}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-pluto-blue-light/50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Direct Phone Line</span>
                    <div className="text-base font-bold text-slate-900 group-hover:text-pluto-navy mt-0.5">
                      {COMPANY_INFO.phone}
                    </div>
                    <span className="text-xs text-slate-500">Mon - Fri: 8:00 AM – 7:00 PM CST</span>
                  </div>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-pluto-blue-light/50 border border-slate-200/80 transition-colors group"
                >
                  <div className="w-11 h-11 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Support</span>
                    <div className="text-base font-bold text-slate-900 group-hover:text-pluto-navy mt-0.5">
                      {COMPANY_INFO.email}
                    </div>
                    <span className="text-xs text-slate-500">Response within 4 business hours</span>
                  </div>
                </a>

                {/* Office Location */}
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="w-11 h-11 rounded-xl bg-pluto-navy text-pluto-gold flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Headquarters Address</span>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      {COMPANY_INFO.address}
                    </div>
                    <span className="text-xs text-slate-500">Downtown Austin, Texas</span>
                  </div>
                </div>

                {/* WhatsApp Chat Button */}
                <a
                  href={COMPANY_INFO.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-emerald-950">Chat Instantly on WhatsApp</div>
                      <span className="text-xs text-emerald-700">Quick question? Chat with our intake coordinator</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-700 bg-emerald-200/70 px-2.5 py-1 rounded-md">
                    Live Chat →
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-emerald-600" />
              <span>Free 15-Minute Intake • Zero Sales Pressure • 100% Confidential</span>
            </div>
          </motion.div>

          {/* Right Column: Working Consultation Form with Scroll Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-200 shadow-xl relative"
          >
            
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2">
              Request Your Free Tax Consultation
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill in your details below and an experienced tax advisor will review your situation and reach out promptly.
            </p>

            {isSubmitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-emerald-950">Thank You!</h4>
                <p className="mt-2 text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Your consultation request has been securely submitted to our Austin, TX advisory team. A licensed CPA will contact you shortly via your preferred channel.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 bg-pluto-navy text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-pluto-navy-deep transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ananya Sharma"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                {/* Email and Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. ananya@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +1 (512) 555-0198"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                    />
                  </div>
                </div>

                {/* Service Required */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={serviceRequired}
                    onChange={(e) => setServiceRequired(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  >
                    {services.map((svc) => (
                      <option key={svc.id} value={svc.title}>
                        {svc.title}
                      </option>
                    ))}
                    <option value="General Tax Consultation">General Tax Consultation & Assessment</option>
                  </select>
                </div>

                {/* Preferred Contact Method */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Preferred Contact Method
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'email', label: 'Email' },
                      { id: 'phone', label: 'Phone Call' },
                      { id: 'whatsapp', label: 'WhatsApp' },
                    ].map((method) => (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setPreferredContact(method.id as any)}
                        className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                          preferredContact === method.id
                            ? 'bg-pluto-navy text-white border-pluto-navy shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {method.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Describe Your Tax Situation / Questions <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your visa status, states worked in, foreign accounts, or business entity..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-gradient-to-r from-pluto-navy-deep to-pluto-navy hover:from-pluto-navy hover:to-pluto-navy-light text-white font-extrabold py-4 rounded-xl text-sm tracking-wide shadow-xl hover:shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span>Submitting to Advisory Team...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-pluto-gold" />
                      <span>Submit Consultation Request</span>
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <span className="text-[11px] text-slate-400">
                    We respect your privacy. Under IRS Section 7216, your personal and financial details are never shared or sold.
                  </span>
                </div>

              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
};
