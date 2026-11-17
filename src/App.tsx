import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteContext';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { BackToTop } from './components/BackToTop';
import { FloatingActions } from './components/FloatingActions';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { RefundStatusPage } from './pages/RefundStatusPage';
import { ContactPage } from './pages/ContactPage';
import { PortalPage } from './pages/PortalPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { SecurityPage } from './pages/SecurityPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <SiteProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="relative min-h-screen bg-[#EAF3FF] text-slate-800 selection:bg-pluto-gold selection:text-pluto-navy-deep overflow-x-hidden">
            
            {/* =========================================================================
                GLOBAL WHOLE-WEBSITE BACKGROUND: image copy 5.png
                Set across the entire website on both desktop and mobile view
                ========================================================================= */}
            <div 
              className="fixed inset-0 pointer-events-none z-0 bg-cover bg-center md:bg-fixed opacity-35 filter contrast-105"
              style={{
                backgroundImage: `url('/assets/site-bg.jpg'), url('/assets/site-bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />

            {/* Main Application Container */}
            <div className="relative z-10 flex flex-col min-h-screen">
              {/* Top Contact Bar & Sticky Navbar */}
              <Header />

              {/* Main Page Routing */}
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/services/:slug" element={<ServiceDetailPage />} />
                  <Route path="/refund-status" element={<RefundStatusPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/portal" element={<PortalPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-and-conditions" element={<TermsPage />} />
                  <Route path="/security" element={<SecurityPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>

              {/* Global Deep Navy Footer */}
              <Footer />

              {/* Global Interactive Modals & Floating Utilities */}
              <ConsultationModal />
              <BackToTop />
              <FloatingActions />
            </div>

          </div>
        </BrowserRouter>
      </AuthProvider>
    </SiteProvider>
  );
}

export default App;
