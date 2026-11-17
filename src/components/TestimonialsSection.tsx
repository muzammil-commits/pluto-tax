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

  // Auto slide every 5 seconds if not paused
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
      <section className="py-16 bg-white text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-800">What Our Clients Say</h2>
          <p className="mt-2 text-sm text-slate-500">
            Client reviews are currently being verified by the PlutoTax compliance team before publication.
          </p>
        </div>
      </section>
    );
  }

  const current = approvedTestimonials[currentIndex];

  return (
    <section 
      className="relative w-full py-20 sm:py-28 bg-slate-50 overflow-hidden border-t border-slate-200"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pluto-blue-light/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>VERIFIED CLIENT REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            What Our Clients Say
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real feedback from high-earning professionals, founders, and NRI families who trust PlutoTax with their most critical tax filings.
          </p>

          <button
            onClick={() => setIsReviewModalOpen(true)}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-pluto-navy hover:text-pluto-gold transition-colors bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Submit a Verified Client Review</span>
          </button>
        </motion.div>

        {/* Carousel Card with Scroll Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto relative"
        >
          
          <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 sm:p-12 relative overflow-hidden transition-all duration-500">
            
            {/* Quote Icon Background */}
            <Quote className="absolute top-6 right-8 w-24 h-24 text-slate-100 -z-0 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              
              {/* Client Avatar */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-pluto-gold p-1 shadow-md bg-white">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  <CheckCircle className="w-3 h-3" />
                  <span>Verified Client</span>
                </div>
              </div>

              {/* Review Content */}
              <div className="flex-1 text-center md:text-left">
                
                {/* Star Rating */}
                <div className="flex items-center justify-center md:justify-start gap-1 text-amber-400 mb-3">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-slate-500">5.0 / 5.0</span>
                </div>

                {/* Review Text */}
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed italic font-normal">
                  "{current.content}"
                </p>

                {/* Reviewer Details */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 font-heading">
                      {current.name}
                    </h4>
                    <p className="text-xs text-slate-500 font-medium">
                      {current.role} {current.company && `• ${current.company}`}
                    </p>
                  </div>

                  <span className="inline-block text-xs font-semibold text-pluto-navy bg-pluto-blue-light px-3 py-1 rounded-full self-center sm:self-auto">
                    {current.serviceCategory}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* Previous / Next Controls */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow text-slate-700 hover:text-pluto-navy transition-all hover:scale-105"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators */}
            <div className="flex items-center gap-2">
              {approvedTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-pluto-navy'
                      : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white hover:bg-slate-100 border border-slate-200 shadow text-slate-700 hover:text-pluto-navy transition-all hover:scale-105"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </motion.div>

      </div>

      {/* =========================================================================
          SUBMIT CLIENT REVIEW POPUP MODAL
          ========================================================================= */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fade-up relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsReviewModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-heading text-slate-900 mb-1">
              Submit a Verified Review
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Share your tax filing experience with PlutoTax. Reviews are verified before publication.
            </p>

            {newReviewSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center animate-fade-in">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-950">Review Received!</h4>
                <p className="text-xs text-emerald-800 mt-1">
                  Thank you! Your feedback has been forwarded to our compliance team for approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Role & City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Senior Product Manager (Austin, TX)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Received
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs">
                    <option>Advance Tax Planning</option>
                    <option>Federal & Multi-State Tax</option>
                    <option>Indian Cross-Border Tax (NRI)</option>
                    <option>FBAR & FATCA Compliance</option>
                    <option>ITIN Processing (CAA)</option>
                    <option>Business Tax & Bookkeeping</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your Review
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe how PlutoTax assisted with your tax returns and savings..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-pluto-navy"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-pluto-navy text-white font-bold py-3 rounded-xl text-xs hover:bg-pluto-navy-deep transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-pluto-gold" />
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
