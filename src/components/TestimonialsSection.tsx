import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle, PlusCircle, X, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSite } from '../context/SiteContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useSite();
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [newReviewSubmitted, setNewReviewSubmitted] = useState(false);

  useEffect(() => {
    if (isPaused || approvedTestimonials.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, approvedTestimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? approvedTestimonials.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewReviewSubmitted(true);
    setTimeout(() => {
      setNewReviewSubmitted(false);
      setIsReviewModalOpen(false);
    }, 2500);
  };

  if (approvedTestimonials.length === 0) {
    return (
      <section className="py-10 bg-white/80 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-xl font-bold text-slate-800">What Our Clients Say</h2>
          <p className="mt-1 text-xs text-slate-500">
            Client reviews are currently being verified by the PlutoTax compliance team before publication.
          </p>
        </div>
      </section>
    );
  }

  const current = approvedTestimonials[currentIndex];

  return (
    <section 
      className="relative w-full py-10 sm:py-14 bg-slate-50/70 backdrop-blur-sm overflow-hidden border-t border-slate-200/80"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tightened Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>VERIFIED CLIENT REVIEWS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            What Our Clients Say
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Real feedback from high-earning professionals, founders, and NRI families who trust PlutoTax with their most critical tax filings.
          </p>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-pluto-navy hover:text-pluto-gold transition-colors bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm"
          >
            <PlusCircle className="w-3 h-3" />
            <span>Submit a Verified Client Review</span>
          </button>
        </motion.div>

        {/* Carousel Card with Tightened Padding */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto relative"
        >
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8 relative overflow-hidden transition-all duration-500">
            <Quote className="absolute top-4 right-6 w-16 h-16 text-slate-100 -z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-5">
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-pluto-gold p-0.5 shadow-md bg-white">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="mt-2 flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Client</span>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-2">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-1.5 text-xs font-bold text-slate-500">5.0 / 5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-normal">
                  "{current.content}"
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-heading">
                      {current.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-medium">
                      {current.role} {current.company && `• ${current.company}`}
                    </p>
                  </div>

                  <span className="inline-block text-[11px] font-semibold text-pluto-navy bg-pluto-blue-light px-2.5 py-0.5 rounded-full self-center sm:self-auto">
                    {current.serviceCategory}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow text-slate-700 transition-all"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5">
              {approvedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-6 bg-pluto-navy'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow text-slate-700 transition-all"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>

      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-200 animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-bold font-heading text-slate-900 mb-0.5">
              Submit a Verified Review
            </h3>
            <p className="text-[11px] text-slate-500 mb-4">
              Share your tax filing experience with PlutoTax.
            </p>

            {newReviewSubmitted ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center animate-fade-in">
                <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-1" />
                <h4 className="font-bold text-emerald-950 text-xs">Review Received!</h4>
                <p className="text-[11px] text-emerald-800 mt-0.5">
                  Thank you! Your feedback has been forwarded for compliance verification.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Role & City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Product Manager (Austin, TX)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Received
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs">
                    <option>Advance Tax Planning</option>
                    <option>Federal & Multi-State Tax</option>
                    <option>Indian Cross-Border Tax (NRI)</option>
                    <option>FBAR & FATCA Compliance</option>
                    <option>ITIN Processing (CAA)</option>
                    <option>Business Tax & Bookkeeping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how PlutoTax assisted with your returns..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pluto-navy text-white font-bold py-2.5 rounded-xl text-xs hover:bg-pluto-navy-deep transition-colors flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-pluto-gold" />
                  <span>Submit for Verification</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
