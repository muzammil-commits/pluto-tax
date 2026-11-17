export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  heroImage: string;
  iconName: string;
  tagline: string;
  whoNeedsThis: string[];
  keyBenefits: string[];
  processSteps: { step: string; title: string; description: string }[];
  requiredDocuments: string[];
  faqs: { question: string; answer: string }[];
  relatedServices: string[];
}

export interface ConsultationEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceRequired: string;
  preferredContact: 'phone' | 'email' | 'whatsapp';
  message: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'resolved';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatar: string;
  rating: number;
  content: string;
  isApproved: boolean;
  serviceCategory: string;
}

export interface SiteStatistics {
  returnsFiled: string;
  refundsMaximized: string;
  clientSatisfaction: string;
  isOwnerVerified: boolean;
  notes: string;
}

export interface ProcessStepInfo {
  stepNumber: string;
  title: string;
  subtitle: string;
  summary: string;
  fullDetails: string;
  checklist: string[];
  icon: string;
  estimatedTime: string;
}

export interface ClientDocument {
  id: string;
  name: string;
  category: 'W-2' | '1099' | 'FBAR / Foreign Bank' | 'Passport / Visa' | 'Prior Return' | 'Other';
  uploadDate: string;
  size: string;
  status: 'Received' | 'Under Review' | 'Verified' | 'Needs Clarification';
}

export interface ClientMessage {
  id: string;
  sender: 'client' | 'cpa';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ClientUser {
  id: string;
  email: string;
  name: string;
  phone: string;
  taxYear: string;
  filingStatus: 'Documents Uploaded' | 'CPA Review' | 'Client Review' | 'IRS E-Filed' | 'Accepted & Complete';
  progressPercent: number;
  documents: ClientDocument[];
  messages: ClientMessage[];
}
