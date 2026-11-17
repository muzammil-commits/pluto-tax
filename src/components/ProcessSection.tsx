import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/companyData';
import { ProcessStepInfo } from '../types';
import { ProcessModal } from './ProcessModal';
import { 
  UploadCloud, 
  Calculator, 
  FileCheck, 
  Send, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  MousePointerClick
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ElementType> = {
  UploadCloud,
  Calculator,
  FileCheck,
  Send,
};

export const ProcessSection: React.FC = () => {
  const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleOpenStep = (idx: number) => {
    setSelectedStepIndex(idx);
  };

  const handleClose = () => {
    setSelectedStepIndex(null);
  };

  const handleNext = () => {
    if (selectedStepIndex !== null && selectedStepIndex < PROCESS_STEPS.length - 1) {
      setSelectedStepIndex(selectedStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedStepIndex !== null && selectedStepIndex > 0) {
      setSelectedStepIndex(selectedStepIndex - 1);
    }
  };

  const handleGetStarted = () => {
    navigate('/portal?tab=register');
  };

  const activeStep: ProcessStepInfo | null =
    selectedStepIndex !== null ? PROCESS_STEPS[selectedStepIndex] : null;

  return (
    <section className="relative w-full py-10 sm:py-14 bg-[#EAF3FF]/85 backdrop-blur-sm overflow-hidden border-b border-blue-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Tightened Margins */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-8 sm:mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>STREAMLINED EXPERIENCE</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Simple 4-Step Process
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Get your taxes done with ease. Click any step below to explore the detailed workflow, required documents, and CPA review timeline.
          </p>

          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-pluto-navy font-semibold bg-pluto-blue-light/70 px-3 py-0.5 rounded-full">
            <MousePointerClick className="w-3 h-3 text-pluto-navy" />
            <span>Interactive: Click any card for step-by-step breakdown</span>
          </div>
        </motion.div>

        {/* 4 Process Cards with Connecting Line */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-pluto-navy via-pluto-gold to-pluto-navy -translate-y-8 z-0 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.icon] || CheckCircle;
              return (
                <motion.div
                  key={step.stepNumber}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  onClick={() => handleOpenStep(idx)}
                  className="group cursor-pointer bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-5 border-2 border-slate-200/90 hover:border-pluto-gold shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5 relative"
                >
                  {/* Top Step Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <div className="w-10 h-10 rounded-xl bg-pluto-navy group-hover:bg-pluto-gold text-pluto-gold group-hover:text-pluto-navy-deep flex items-center justify-center transition-colors shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-black text-slate-300 group-hover:text-pluto-gold transition-colors font-heading">
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-pluto-navy transition-colors font-heading leading-snug">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-[11px] font-semibold text-pluto-gold-dark mt-0.5">
                      {step.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {step.summary}
                    </p>
                  </div>

                  {/* Bottom Interactive Trigger */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pluto-navy group-hover:text-pluto-gold-dark transition-colors">
                    <span>Explore Step Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>

                  {/* Subtle top indicator pip */}
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white border-2 border-pluto-gold flex items-center justify-center text-[9px] font-bold text-pluto-navy shadow-sm">
                    {idx + 1}
                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Interactive Step Modal Popup */}
      {activeStep && (
        <ProcessModal
          step={activeStep}
          isOpen={selectedStepIndex !== null}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
          hasPrev={selectedStepIndex !== null && selectedStepIndex > 0}
          hasNext={selectedStepIndex !== null && selectedStepIndex < PROCESS_STEPS.length - 1}
          onGetStarted={handleGetStarted}
        />
      )}

    </section>
  );
};
