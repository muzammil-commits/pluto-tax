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
    <section className="relative w-full py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-pluto-gold fill-pluto-gold" />
            <span>STREAMLINED EXPERIENCE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Our Simple 4-Step Process
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Get your taxes done with ease. Click any step below to explore the detailed workflow, required documents, and CPA review timeline.
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-xs text-pluto-navy font-semibold bg-pluto-blue-light/70 px-3 py-1 rounded-full">
            <MousePointerClick className="w-3.5 h-3.5 text-pluto-navy" />
            <span>Interactive: Click any card for step-by-step breakdown</span>
          </div>
        </div>

        {/* 4 Process Cards with Connecting Line */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-1 bg-gradient-to-r from-pluto-navy via-pluto-gold to-pluto-navy -translate-y-12 z-0 opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const Icon = ICON_MAP[step.icon] || CheckCircle;
              return (
                <div
                  key={step.stepNumber}
                  onClick={() => handleOpenStep(idx)}
                  className="group cursor-pointer bg-white rounded-2xl p-6 border-2 border-slate-200/90 hover:border-pluto-gold shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-2 relative"
                >
                  {/* Top Step Badge & Icon */}
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-pluto-navy group-hover:bg-pluto-gold text-pluto-gold group-hover:text-pluto-navy-deep flex items-center justify-center transition-colors shadow-md">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-black text-slate-300 group-hover:text-pluto-gold transition-colors font-heading">
                        {step.stepNumber}
                      </span>
                    </div>

                    {/* Step Title */}
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-pluto-navy transition-colors font-heading leading-snug">
                      {step.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-xs font-semibold text-pluto-gold-dark mt-1">
                      {step.subtitle}
                    </p>

                    {/* Summary */}
                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.summary}
                    </p>
                  </div>

                  {/* Bottom Interactive Trigger */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pluto-navy group-hover:text-pluto-gold-dark transition-colors">
                    <span>Explore Step Details</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                  </div>

                  {/* Subtle top indicator pip */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-pluto-gold flex items-center justify-center text-[10px] font-bold text-pluto-navy shadow-sm">
                    {idx + 1}
                  </div>

                </div>
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
