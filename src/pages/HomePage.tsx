import React, { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatisticsStrip } from '../components/StatisticsStrip';
import { ClientPortalSection } from '../components/ClientPortalSection';
import { ServicesSection } from '../components/ServicesSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { ProcessSection } from '../components/ProcessSection';
import { RefundEstimator } from '../components/RefundEstimator';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { ConsultationSection } from '../components/ConsultationSection';

export const HomePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full flex flex-col">
      {/* 1. Hero Section (Desktop background: image copy 3.png bright animated; Mobile background: image copy 4.png bright animated) */}
      <HeroSection />

      {/* 2. Statistics Strip (IMMEDIATELY BELOW HERO SECTION - As strictly required) */}
      <StatisticsStrip />

      {/* 3. Dedicated Client Portal Section (Directly below statistics strip) */}
      <ClientPortalSection />

      {/* 4. Our Professional Services (9 Cards with unique images & dedicated pages) */}
      <ServicesSection />

      {/* 5. Why Choose PlutoTax? (Navy & Gold Core Values) */}
      <WhyChooseUs />

      {/* 6. Simple 4-Step Process (Interactive with modal popups) */}
      <ProcessSection />

      {/* 7. Quick Refund Estimator (Navy & Gold interactive calculator) */}
      <RefundEstimator />

      {/* 8. What Our Clients Say (Approved Reviews Carousel) */}
      <TestimonialsSection />

      {/* 9. Let's Simplify Your Taxes Together (Consultation & Contact Form) */}
      <ConsultationSection />
    </div>
  );
};
