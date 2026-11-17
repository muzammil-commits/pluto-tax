import React from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  UploadCloud, 
  Calculator, 
  FileCheck, 
  Send 
} from 'lucide-react';
import { ProcessStepInfo } from '../types';

interface ProcessModalProps {
  step: ProcessStepInfo;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onGetStarted: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  UploadCloud,
  Calculator,
  FileCheck,
  Send,
};

export const ProcessModal: React.FC<ProcessModalProps> = ({
  step,
  isOpen,
  onClose,
  onNext,
  onPrev,
  hasPrev,
  hasNext,
  onGetStarted,
}) => {
  if (!isOpen) return null;

  const IconComponent = ICON_MAP[step.icon] || CheckCircle2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-fade-up relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-pluto-navy-deep via-pluto-navy to-pluto-navy-deep p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl font-black text-pluto-gold font-heading">
              STEP {step.stepNumber}
            </span>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 rounded-full font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Est. Time: {step.estimatedTime}</span>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
            {step.title}
          </h3>
          <p className="text-sm text-slate-300 mt-1">
            {step.subtitle}
          </p>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Detailed Explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Detailed Process Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {step.fullDetails}
            </p>
          </div>

          {/* Action Checklist */}
          <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/80">
            <h4 className="text-xs font-bold uppercase tracking-wider text-pluto-navy mb-3 flex items-center gap-2">
              <IconComponent className="w-4 h-4 text-pluto-gold" />
              <span>What Happens in This Step:</span>
            </h4>
            <div className="space-y-2.5">
              {step.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation & Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Step Prev/Next */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                hasPrev
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold border transition-colors ${
                hasNext
                  ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                  : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-50'
              }`}
            >
              <span>Next Step</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => {
              onClose();
              onGetStarted();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-pluto-gold hover:bg-pluto-gold-bright text-pluto-navy-deep px-6 py-2.5 rounded-lg font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
          >
            <span>Start Step {step.stepNumber} Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </div>
    </div>
  );
};
