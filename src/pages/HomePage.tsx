import React, { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatisticsStrip } from '../components/StatisticsStrip';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessSection } from '../components/ProcessSection';
import { RefundEstimator } from '../components/RefundEstimator';
import { ConsultationSection } from '../components/ConsultationSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section (Desktop background: image copy 3.png bright animated; Mobile background: image copy 4.png bright animated) */}
      <HeroSection />

      {/* 2. Statistics Strip (IMMEDIATELY BELOW HERO SECTION - Sky Blue Professional Theme) */}
      <StatisticsStrip />

      {/* 3. Our Professional Services */}
      <ServicesSection />

      {/* 4. Why Choose PlutoTax? (Core Values & Professional Standards) */}
      <WhyChooseUs />

      {/* 5. Simple 4-Step Process (Interactive with modal popups) */}
      <ProcessSection />

      {/* 6. Quick Refund Estimator (Interactive calculator) */}
      <RefundEstimator />

      {/* 7. Let's Simplify Your Taxes Together (Consultation & Contact Form) */}
      <ConsultationSection />
    </div>
  );
};
