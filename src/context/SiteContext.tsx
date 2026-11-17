import React, { createContext, useContext, useState, useEffect } from 'react';
import { ConsultationEnquiry, ServiceItem, SiteStatistics, Testimonial } from '../types';
import { SERVICES_DATA } from '../data/servicesData';
import { INITIAL_TESTIMONIALS } from '../data/testimonialsData';
import { INITIAL_STATISTICS } from '../data/companyData';

interface SiteContextType {
  services: ServiceItem[];
  testimonials: Testimonial[];
  statistics: SiteStatistics;
  enquiries: ConsultationEnquiry[];
  isConsultationModalOpen: boolean;
  preselectedService: string;
  openConsultationModal: (serviceName?: string) => void;
  closeConsultationModal: () => void;
  addEnquiry: (enquiry: Omit<ConsultationEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateStatistics: (newStats: Partial<SiteStatistics>) => void;
  toggleTestimonialApproval: (id: string) => void;
  updateServiceDescription: (id: string, shortDesc: string, fullDesc: string) => void;
  updateEnquiryStatus: (id: string, status: 'new' | 'contacted' | 'resolved') => void;
  resetToDefaults: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SERVICES: 'plutotax_services_v1',
  TESTIMONIALS: 'plutotax_testimonials_v1',
  STATS: 'plutotax_stats_v1',
  ENQUIRIES: 'plutotax_enquiries_v1',
};

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : SERVICES_DATA;
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [statistics, setStatistics] = useState<SiteStatistics>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STATS);
    return saved ? JSON.parse(saved) : INITIAL_STATISTICS;
  });

  const [enquiries, setEnquiries] = useState<ConsultationEnquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return saved ? JSON.parse(saved) : [];
  });

  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(statistics));
  }, [statistics]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
  }, [enquiries]);

  const openConsultationModal = (serviceName?: string) => {
    if (serviceName) setPreselectedService(serviceName);
    setIsConsultationModalOpen(true);
  };

  const closeConsultationModal = () => {
    setIsConsultationModalOpen(false);
    setPreselectedService('');
  };

  const addEnquiry = (data: Omit<ConsultationEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: ConsultationEnquiry = {
      ...data,
      id: 'enq-' + Date.now(),
      createdAt: new Date().toISOString(),
      status: 'new',
    };
    setEnquiries(prev => [newEnquiry, ...prev]);
  };

  const updateStatistics = (newStats: Partial<SiteStatistics>) => {
    setStatistics(prev => ({ ...prev, ...newStats }));
  };

  const toggleTestimonialApproval = (id: string) => {
    setTestimonials(prev =>
      prev.map(t => (t.id === id ? { ...t, isApproved: !t.isApproved } : t))
    );
  };

  const updateServiceDescription = (id: string, shortDesc: string, fullDesc: string) => {
    setServices(prev =>
      prev.map(s => (s.id === id ? { ...s, shortDescription: shortDesc, fullDescription: fullDesc } : s))
    );
  };

  const updateEnquiryStatus = (id: string, status: 'new' | 'contacted' | 'resolved') => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status } : e))
    );
  };

  const resetToDefaults = () => {
    setServices(SERVICES_DATA);
    setTestimonials(INITIAL_TESTIMONIALS);
    setStatistics(INITIAL_STATISTICS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.STATS);
  };

  return (
    <SiteContext.Provider
      value={{
        services,
        testimonials,
        statistics,
        enquiries,
        isConsultationModalOpen,
        preselectedService,
        openConsultationModal,
        closeConsultationModal,
        addEnquiry,
        updateStatistics,
        toggleTestimonialApproval,
        updateServiceDescription,
        updateEnquiryStatus,
        resetToDefaults,
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within a SiteProvider');
  return context;
};
