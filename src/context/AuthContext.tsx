import React, { createContext, useContext, useState, useEffect } from 'react';
import { ClientDocument, ClientMessage, ClientUser } from '../types';

interface AuthContextType {
  currentUser: ClientUser | null;
  isAdminAuthenticated: boolean;
  loginClient: (email: string, pass: string) => boolean;
  registerClient: (name: string, email: string, phone: string, pass: string) => boolean;
  logoutClient: () => void;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  uploadDocument: (file: { name: string; category: ClientDocument['category']; size: string }) => void;
  sendMessageToCPA: (text: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: ClientUser = {
  id: 'usr-101',
  email: 'client@example.com',
  name: 'Ananya Sharma',
  phone: '+1 (512) 555-0198',
  taxYear: '2024 / 2025',
  filingStatus: 'CPA Review',
  progressPercent: 65,
  documents: [
    {
      id: 'doc-1',
      name: 'Form_W2_Google_2024.pdf',
      category: 'W-2',
      uploadDate: '2025-02-10',
      size: '1.4 MB',
      status: 'Verified',
    },
    {
      id: 'doc-2',
      name: 'Form_1099_Morgan_Stanley_RSU.pdf',
      category: '1099',
      uploadDate: '2025-02-12',
      size: '2.1 MB',
      status: 'Verified',
    },
    {
      id: 'doc-3',
      name: 'HDFC_NRE_NRO_Bank_Statements_2024.pdf',
      category: 'FBAR / Foreign Bank',
      uploadDate: '2025-02-14',
      size: '4.8 MB',
      status: 'Under Review',
    },
  ],
  messages: [
    {
      id: 'msg-1',
      sender: 'cpa',
      senderName: 'Michael Miller, CPA',
      text: 'Hello Ananya! I have received your Google W-2 and Morgan Stanley 1099-B statements. I am currently reconciling your RSU cost basis and Foreign Tax Credit under US-India DTAA.',
      timestamp: 'Yesterday at 3:15 PM',
    },
    {
      id: 'msg-2',
      sender: 'client',
      senderName: 'Ananya Sharma',
      text: 'Thank you Michael! I just uploaded my HDFC NRE interest certificate as well for the FBAR disclosure.',
      timestamp: 'Today at 10:20 AM',
    },
  ],
};

const USER_STORAGE_KEY = 'plutotax_client_user';
const ADMIN_STORAGE_KEY = 'plutotax_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<ClientUser | null>(() => {
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEMO_USER;
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(ADMIN_STORAGE_KEY) === 'true';
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(ADMIN_STORAGE_KEY, isAdminAuthenticated ? 'true' : 'false');
  }, [isAdminAuthenticated]);

  const loginClient = (email: string, _pass: string) => {
    // For demo/production preview: allow login or return demo user
    if (currentUser && currentUser.email.toLowerCase() === email.toLowerCase()) {
      return true;
    }
    const newUser: ClientUser = {
      ...DEMO_USER,
      email,
      name: email.split('@')[0].toUpperCase(),
    };
    setCurrentUser(newUser);
    return true;
  };

  const registerClient = (name: string, email: string, phone: string, _pass: string) => {
    const registered: ClientUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone,
      taxYear: '2024 / 2025',
      filingStatus: 'Documents Uploaded',
      progressPercent: 25,
      documents: [],
      messages: [
        {
          id: 'welcome-1',
          sender: 'cpa',
          senderName: 'PlutoTax Senior Advisor',
          text: `Welcome to PlutoTax, ${name}! Your secure portal is active. Please upload your W-2s, 1099s, or prior year returns to begin your review.`,
          timestamp: 'Just now',
        },
      ],
    };
    setCurrentUser(registered);
    return true;
  };

  const logoutClient = () => {
    setCurrentUser(null);
  };

  const loginAdmin = (pass: string) => {
    // Standard secure admin passcode
    if (pass === 'pluto2025' || pass === 'admin123') {
      setIsAdminAuthenticated(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
  };

  const uploadDocument = (file: { name: string; category: ClientDocument['category']; size: string }) => {
    if (!currentUser) return;
    const newDoc: ClientDocument = {
      id: 'doc-' + Date.now(),
      name: file.name,
      category: file.category,
      uploadDate: new Date().toISOString().split('T')[0],
      size: file.size,
      status: 'Received',
    };
    setCurrentUser({
      ...currentUser,
      documents: [newDoc, ...currentUser.documents],
    });
  };

  const sendMessageToCPA = (text: string) => {
    if (!currentUser || !text.trim()) return;
    const clientMsg: ClientMessage = {
      id: 'msg-' + Date.now(),
      sender: 'client',
      senderName: currentUser.name,
      text,
      timestamp: 'Just now',
    };
    setCurrentUser({
      ...currentUser,
      messages: [...currentUser.messages, clientMsg],
    });

    // Auto-respond for realistic customer experience after 1.5s
    setTimeout(() => {
      setCurrentUser(prev => {
        if (!prev) return null;
        const cpaReply: ClientMessage = {
          id: 'msg-reply-' + Date.now(),
          sender: 'cpa',
          senderName: 'Michael Miller, CPA',
          text: 'Thank you for your message! Our tax team has logged this in your tax file and will incorporate it into your draft return.',
          timestamp: 'Just now',
        };
        return {
          ...prev,
          messages: [...prev.messages, cpaReply],
        };
      });
    }, 1500);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdminAuthenticated,
        loginClient,
        registerClient,
        logoutClient,
        loginAdmin,
        logoutAdmin,
        uploadDocument,
        sendMessageToCPA,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
