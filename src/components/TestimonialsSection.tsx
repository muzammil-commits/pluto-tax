import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ShieldCheck, CheckCircle } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const TestimonialsSection: React.FC = () => {
  const { testimonials } = useSite();
  // Filter only approved testimonials
  const approvedTestimonials = testimonials.filter((t) => t.isApproved);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
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
        </div>

        {/* Carousel Card */}
        <div className="max-w-4xl mx-auto relative">
          
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

        </div>

      </div>

    </section>
  );
};
