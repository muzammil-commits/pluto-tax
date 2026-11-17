import React, { useState, useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useSite } from '../context/SiteContext';
import { 
  ShieldCheck, 
  Lock, 
  BarChart3, 
  MessageSquare, 
  Star, 
  FileEdit, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Save, 
  RotateCcw,
  Sparkles,
  LogOut,
  UserCheck
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { isAdminAuthenticated, loginAdmin, logoutAdmin } = useAuth();
  const {
    services,
    testimonials,
    statistics,
    enquiries,
    updateStatistics,
    toggleTestimonialApproval,
    updateServiceDescription,
    updateEnquiryStatus,
    resetToDefaults,
  } = useSite();

  const [adminPass, setAdminPass] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'stats' | 'enquiries' | 'testimonials' | 'services'>('stats');

  // Stats edit form
  const [returnsFiled, setReturnsFiled] = useState(statistics.returnsFiled);
  const [refundsMaximized, setRefundsMaximized] = useState(statistics.refundsMaximized);
  const [clientSatisfaction, setClientSatisfaction] = useState(statistics.clientSatisfaction);
  const [isOwnerVerified, setIsOwnerVerified] = useState(statistics.isOwnerVerified);
  const [saveMessage, setSaveMessage] = useState('');

  // Selected service editing
  const [selectedServiceId, setSelectedServiceId] = useState(services[0]?.id || '');
  const currentService = services.find((s) => s.id === selectedServiceId);
  const [editShortDesc, setEditShortDesc] = useState(currentService?.shortDescription || '');
  const [editFullDesc, setEditFullDesc] = useState(currentService?.fullDescription || '');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (currentService) {
      setEditShortDesc(currentService.shortDescription);
      setEditFullDesc(currentService.fullDescription);
    }
  }, [selectedServiceId, services]);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(adminPass);
    if (!success) {
      setAuthError('Invalid Admin Passcode. Hint: use pluto2025');
    }
  };

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    updateStatistics({
      returnsFiled,
      refundsMaximized,
      clientSatisfaction,
      isOwnerVerified,
    });
    setSaveMessage('Statistics updated and synchronized across website!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return;
    updateServiceDescription(selectedServiceId, editShortDesc, editFullDesc);
    setSaveMessage('Service description saved!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="bg-pluto-navy-deep text-white py-10 sm:py-14 border-b border-pluto-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-slate-300 mb-3">
            <Breadcrumbs items={[{ name: 'Admin Console' }]} />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-pluto-gold text-xs font-bold uppercase tracking-wider mb-2 border border-pluto-gold/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PLUTOTAX MANAGEMENT CONSOLE</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-heading">
                Administration & Content Control
              </h1>
            </div>

            {isAdminAuthenticated && (
              <button
                onClick={logoutAdmin}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-rose-500/20 text-slate-200 hover:text-rose-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Exit Admin Mode</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {!isAdminAuthenticated ? (
          /* Login Card */
          <div className="max-w-md mx-auto bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center">
            <div className="w-14 h-14 rounded-2xl bg-pluto-navy text-pluto-gold flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-heading">
              Authorized Personnel Only
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Enter your administrative credentials to manage verified statistics, consultation requests, and reviews.
            </p>

            {authError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Admin Passcode
                </label>
                <input
                  type="password"
                  placeholder="Enter passcode (e.g. pluto2025)"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-pluto-navy"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-pluto-navy hover:bg-pluto-navy-deep text-white font-extrabold py-3.5 rounded-xl text-sm shadow-md transition-all"
              >
                Unlock Admin Dashboard
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
              Demo access code: <code>pluto2025</code>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard Tabs */
          <div className="space-y-8 animate-fade-in">
            
            {saveMessage && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-sm font-semibold text-emerald-800 flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{saveMessage}</span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
              {[
                { id: 'stats', label: 'Statistics Validation', icon: BarChart3 },
                { id: 'enquiries', label: `Consultation Enquiries (${enquiries.length})`, icon: MessageSquare },
                { id: 'testimonials', label: 'Testimonials Approval', icon: Star },
                { id: 'services', label: 'Service Content Editor', icon: FileEdit },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      activeTab === tab.id
                        ? 'bg-pluto-navy text-white shadow-md'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab 1: Statistics Validation */}
            {activeTab === 'stats' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-2xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Homepage Statistics & Owner Verification
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    As required by the master brief, performance metrics must be verified before being presented as certified claims.
                  </p>
                </div>

                <form onSubmit={handleSaveStats} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Tax Returns Filed Metric
                    </label>
                    <input
                      type="text"
                      value={returnsFiled}
                      onChange={(e) => setReturnsFiled(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Refunds Maximized Metric
                    </label>
                    <input
                      type="text"
                      value={refundsMaximized}
                      onChange={(e) => setRefundsMaximized(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Client Satisfaction Metric
                    </label>
                    <input
                      type="text"
                      value={clientSatisfaction}
                      onChange={(e) => setClientSatisfaction(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isOwnerVerified}
                        onChange={(e) => setIsOwnerVerified(e.target.checked)}
                        className="w-4 h-4 text-pluto-navy rounded"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Mark as Business-Owner Verified
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Removes the "Reference metrics pending owner approval" disclaimer on the live statistics strip.
                        </div>
                      </div>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-pluto-navy text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-pluto-navy-deep transition-colors shadow"
                  >
                    <Save className="w-4 h-4 text-pluto-gold" />
                    <span>Save Statistics Changes</span>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: Consultation Enquiries */}
            {activeTab === 'enquiries' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-heading">
                      Client Consultation Requests
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      All consultation forms submitted on the website are captured here in real-time.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div 
                      key={enq.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-slate-900">{enq.fullName}</span>
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            enq.status === 'new'
                              ? 'bg-amber-100 text-amber-800'
                              : enq.status === 'contacted'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}>
                            {enq.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600">
                          <strong>Email:</strong> {enq.email} | <strong>Phone:</strong> {enq.phone}
                        </div>
                        <div className="text-xs text-pluto-navy font-semibold">
                          Service: {enq.serviceRequired} • Contact via: {enq.preferredContact.toUpperCase()}
                        </div>
                        <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 mt-2 max-w-2xl">
                          "{enq.message}"
                        </p>
                        <div className="text-[10px] text-slate-400">
                          Submitted: {new Date(enq.createdAt).toLocaleString()}
                        </div>
                      </div>

                      {/* Status switcher */}
                      <div className="flex items-center gap-2 self-start md:self-center">
                        <button
                          onClick={() => updateEnquiryStatus(enq.id, 'contacted')}
                          className="px-3 py-1.5 text-xs bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold border border-blue-200"
                        >
                          Mark Contacted
                        </button>
                        <button
                          onClick={() => updateEnquiryStatus(enq.id, 'resolved')}
                          className="px-3 py-1.5 text-xs bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold border border-emerald-200"
                        >
                          Mark Resolved
                        </button>
                      </div>
                    </div>
                  ))}

                  {enquiries.length === 0 && (
                    <div className="text-center py-12 text-slate-400 text-xs">
                      No customer enquiries received yet. Submit a test inquiry on the Contact page or Consultation modal to see it appear here!
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 3: Testimonials Approval */}
            {activeTab === 'testimonials' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Testimonials Approval Gate
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Control which reviews appear on the live homepage carousel. Only approved reviews are visible to the public.
                  </p>
                </div>

                <div className="space-y-4">
                  {testimonials.map((test) => (
                    <div 
                      key={test.id}
                      className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={test.avatar}
                          alt={test.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <div className="text-sm font-bold text-slate-900">{test.name}</div>
                          <div className="text-xs text-slate-500">{test.role} • {test.serviceCategory}</div>
                          <p className="text-xs text-slate-700 mt-1 max-w-xl italic">
                            "{test.content}"
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                          test.isApproved 
                            ? 'bg-emerald-100 text-emerald-800' 
                            : 'bg-rose-100 text-rose-800'
                        }`}>
                          {test.isApproved ? 'Published on Site' : 'Unpublished (Draft)'}
                        </span>

                        <button
                          onClick={() => toggleTestimonialApproval(test.id)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-bold border border-slate-300 bg-white hover:bg-slate-100 transition-colors"
                        >
                          {test.isApproved ? 'Unpublish' : 'Approve & Publish'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Service Content Editor */}
            {activeTab === 'services' && (
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-3xl">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    Live Service Description Editor
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Edit service text without modifying source code. Changes persist immediately across the website.
                  </p>
                </div>

                <form onSubmit={handleSaveService} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Select Service
                    </label>
                    <select
                      value={selectedServiceId}
                      onChange={(e) => setSelectedServiceId(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    >
                      {services.map((svc) => (
                        <option key={svc.id} value={svc.id}>
                          {svc.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Short Description (Card Summary)
                    </label>
                    <textarea
                      rows={3}
                      value={editShortDesc}
                      onChange={(e) => setEditShortDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Description (Dedicated Service Detail Page)
                    </label>
                    <textarea
                      rows={5}
                      value={editFullDesc}
                      onChange={(e) => setEditFullDesc(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-pluto-navy text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-pluto-navy-deep transition-colors shadow"
                  >
                    <Save className="w-4 h-4 text-pluto-gold" />
                    <span>Save Service Text</span>
                  </button>
                </form>
              </div>
            )}

            {/* Reset Defaults Action */}
            <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Want to revert all customizations back to factory default data?
              </span>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to reset all site data to default?')) {
                    resetToDefaults();
                    alert('Site data reset to defaults.');
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-800 font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Defaults</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
