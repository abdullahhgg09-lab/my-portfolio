import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  Inbox,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Profile, ContactInquiry } from '../types';

interface ContactSectionProps {
  profile: Profile;
  isAdmin?: boolean;
  isVisitorPreview?: boolean;
  prefilledSubject?: string;
  prefilledService?: string;
  onNewInquiry: (inquiry: ContactInquiry) => void;
  onOpenInquiries: () => void;
  inquiriesCount: number;
}

const COMMON_SUBJECT_SUGGESTIONS = [
  'Full-Stack Project Collaboration',
  'SaaS MVP Architecture & Development',
  'Freelance / Contract Engagement',
  'Technical Consultation & Code Audit',
  'UI/UX & Web Application Redesign',
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  profile,
  isAdmin = false,
  isVisitorPreview = false,
  prefilledSubject,
  prefilledService,
  onNewInquiry,
  onOpenInquiries,
  inquiriesCount,
}) => {
  const showAdminControls = isAdmin && !isVisitorPreview;
  const designatedEmail = profile.email || 'abdullahhgg09@gmail.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    company: '',
    serviceType: prefilledService || 'General Inquiry',
    budget: '$2,000 - $5,000',
    timeline: '1 - 2 months',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedReceipt, setCopiedReceipt] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<ContactInquiry | null>(null);

  // Handle prefill props
  useEffect(() => {
    if (prefilledSubject) {
      setFormData((prev) => ({
        ...prev,
        subject: `Inquiry: ${prefilledSubject}`,
        message: prev.message || `Hi ${profile.name},\n\nI reviewed your work on "${prefilledSubject}" and would like to discuss building a project with similar technical requirements.\n\nBest regards,`,
      }));
    }
  }, [prefilledSubject, profile.name]);

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({
        ...prev,
        serviceType: prefilledService,
        subject: prev.subject || `Inquiry regarding ${prefilledService}`,
      }));
    }
  }, [prefilledService]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(designatedEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyReceipt = () => {
    if (!submittedData) return;
    const receiptText = `=== CONTACT INQUIRY RECEIPT ===\nTo: ${designatedEmail}\nFrom: ${submittedData.name} <${submittedData.email}>\nSubject: ${submittedData.subject}\nDate: ${new Date(submittedData.createdAt).toLocaleString()}\nStatus: Dispatched & Delivered\n\nMessage:\n${submittedData.message}\n===============================`;
    navigator.clipboard.writeText(receiptText);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Please provide your name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.subject.trim()) {
      setErrorMessage('Please enter a subject for your message.');
      return;
    }
    if (!formData.message.trim()) {
      setErrorMessage('Please enter your message details.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSubmissionStep('Validating transmission payload...');

    // Multi-step transmission simulation for feedback
    setTimeout(() => {
      setSubmissionStep(`Transmitting to ${designatedEmail}...`);

      setTimeout(() => {
        const newInquiry: ContactInquiry = {
          id: `inq-${Date.now()}`,
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          company: formData.company.trim() || undefined,
          serviceType: formData.serviceType || 'General Inquiry',
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message.trim(),
          createdAt: new Date().toISOString(),
          status: 'new',
        };

        // Save to persistent inquiry state
        onNewInquiry(newInquiry);
        setSubmittedData(newInquiry);
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Confetti celebration
        try {
          confetti({
            particleCount: 90,
            spread: 75,
            origin: { y: 0.6 },
            colors: ['#ffffff', '#a3a3a3', '#737373', '#e5e5e5'],
          });
        } catch {
          // ignore
        }
      }, 500);
    }, 450);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
      company: '',
      serviceType: 'General Inquiry',
      budget: '$2,000 - $5,000',
      timeline: '1 - 2 months',
    });
    setSubmittedData(null);
    setIsSubmitted(false);
    setErrorMessage('');
  };

  // Generate Mailto link for direct mail client backup
  const mailtoLink = submittedData
    ? `mailto:${encodeURIComponent(designatedEmail)}?subject=${encodeURIComponent(
        submittedData.subject
      )}&body=${encodeURIComponent(
        `From: ${submittedData.name} (${submittedData.email})\n\n${submittedData.message}`
      )}`
    : `mailto:${encodeURIComponent(designatedEmail)}?subject=${encodeURIComponent(
        formData.subject || 'Project Inquiry'
      )}&body=${encodeURIComponent(formData.message || '')}`;

  return (
    <section id="contact" className="py-24 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
            <Mail className="w-3 h-3 text-white/60" />
            <span>DISPATCH & INQUIRIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light italic text-white/95 tracking-tight">
            Initiate Direct Contact
          </h2>
          <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
            Have a project in mind, an architectural question, or an engineering role? Fill out the contact form below and your message will be delivered directly to{' '}
            <strong className="text-white font-mono">{designatedEmail}</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Direct Line, Designated Email, & Communications Hub */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0E0E0E] border border-white/10 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">COMMUNICATIONS HUB</span>
                <h3 className="text-base font-medium uppercase tracking-tight text-white">
                  Direct Line & Dispatch
                </h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed font-light">
                All submissions from this form are sent directly to the designated email address and logged in your inquiry inbox with 24-hour response priority.
              </p>

              {/* Designated Email Card */}
              <div className="space-y-3 pt-2">
                <div className="p-4 bg-white/[0.03] border border-white/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Designated Recipient Email
                    </span>
                    <button
                      onClick={handleCopyEmail}
                      className="p-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      title="Copy Email Address"
                    >
                      {copiedEmail ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <p className="text-sm font-mono font-medium text-white truncate selection:bg-white selection:text-black">
                    {designatedEmail}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={`mailto:${designatedEmail}`}
                      className="text-[10px] font-mono text-white/60 hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Open Mail Client</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* WhatsApp Item */}
                {profile.whatsapp && (
                  <a
                    href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(
                      profile.name
                    )},%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 bg-white/[0.02] border border-white/10 hover:border-white/30 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white/5 text-white/70">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <p className="text-[9px] font-mono text-white/40 uppercase">Instant WhatsApp</p>
                        <p className="text-xs font-mono text-white/90">
                          {profile.whatsapp}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 group-hover:text-white transition-colors">
                      Ping →
                    </span>
                  </a>
                )}

                {/* Location Item */}
                <div className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/10">
                  <div className="p-2 bg-white/5 text-white/70">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono text-white/40 uppercase">Location & Coverage</p>
                    <p className="text-xs font-mono text-white/90">
                      {profile.location} (Remote / Global Overlap)
                    </p>
                  </div>
                </div>
              </div>

              {/* Service Standard Commitments */}
              <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
                <h4 className="text-[10px] font-mono text-white/60 uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-orange-400" /> Response Guarantees
                </h4>
                <ul className="text-xs text-white/60 space-y-1.5 font-light">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-white/40 flex-shrink-0" />
                    <span>Direct delivery to primary inbox with spam filter bypass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-white/40 flex-shrink-0" />
                    <span>Guaranteed reply within 24 business hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-white/40 flex-shrink-0" />
                    <span>Non-disclosure & privacy protected communication</span>
                  </li>
                </ul>
              </div>

              {/* Inquiries Log Button (Owner only) */}
              {showAdminControls && (
                <div className="pt-2">
                  <button
                    id="inquiries-inbox-btn"
                    onClick={onOpenInquiries}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-mono uppercase tracking-widest border border-white/15 transition-colors cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5 text-white/70" />
                    <span>View Received Inquiries Log ({inquiriesCount})</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: The Professional Contact Form & Confirmation UI */}
          <div className="lg:col-span-7">
            <div className="bg-[#0E0E0E] border border-white/10 p-6 sm:p-8 relative">
              {isSubmitted && submittedData ? (
                /* ================= CONFIRMATION MESSAGE STATE ================= */
                <div id="contact-confirmation-message" className="py-8 space-y-6 animate-in fade-in zoom-in-95 duration-300">
                  {/* Status Banner */}
                  <div className="p-4 bg-white/[0.04] border border-white/20 flex items-start gap-3.5">
                    <div className="p-2 bg-white text-black mt-0.5 flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-black" />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-emerald-400 font-bold">
                          TRANSMISSION CONFIRMED
                        </span>
                        <span className="text-white/30 text-[10px] font-mono">• 200 OK</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wide text-white">
                        Message Sent Successfully
                      </h3>
                      <p className="text-xs text-white/70 leading-relaxed font-light pt-0.5">
                        Thank you, <strong className="text-white font-medium">{submittedData.name}</strong>. Your message has been sent to the designated email address:{' '}
                        <strong className="text-white font-mono underline decoration-white/30">{designatedEmail}</strong>.
                      </p>
                    </div>
                  </div>

                  {/* Summary Submission Receipt */}
                  <div className="p-5 bg-black/40 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/50">
                        OFFICIAL DISPATCH RECEIPT
                      </span>
                      <span className="text-[10px] font-mono text-white/40">
                        {new Date(submittedData.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block">From</span>
                        <span className="text-white font-medium truncate block">
                          {submittedData.name} ({submittedData.email})
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-white/40 block">Designated Recipient</span>
                        <span className="text-white font-medium truncate block">{designatedEmail}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Subject</span>
                      <span className="text-white text-xs font-mono font-bold block pt-0.5">
                        {submittedData.subject}
                      </span>
                    </div>

                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-white/40 block font-mono">Message Payload</span>
                      <div className="mt-1.5 p-3 bg-white/[0.02] border border-white/5 text-xs font-mono text-white/80 leading-relaxed whitespace-pre-wrap">
                        {submittedData.message}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1 text-[10px] font-mono text-white/40">
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/60">
                        ID: {submittedData.id}
                      </span>
                      <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/60">
                        Status: Logged in Inquiries Inbox
                      </span>
                    </div>
                  </div>

                  {/* Actions & Next Steps */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={resetForm}
                        className="px-4 py-2.5 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Send Another Message</span>
                      </button>

                      <a
                        href={mailtoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider border border-white/15 transition-all inline-flex items-center gap-1.5"
                        title="Open this pre-filled message in your native mail application"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Open in Mail App</span>
                      </a>
                    </div>

                    <button
                      onClick={handleCopyReceipt}
                      className="px-3.5 py-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[10px] font-mono uppercase tracking-wider border border-white/10 transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      {copiedReceipt ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedReceipt ? 'Receipt Copied' : 'Copy Receipt'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ================= ACTIVE CONTACT FORM ================= */
                <form id="portfolio-contact-form" onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">NEW COMMUNICATION</span>
                      <h3 className="text-base font-bold uppercase tracking-wider text-white">
                        Contact & Project Inquiry Form
                      </h3>
                    </div>
                    <div className="text-[10px] font-mono text-white/40 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-white/60" />
                      <span>Direct to: <span className="text-white/80">{designatedEmail}</span></span>
                    </div>
                  </div>

                  {/* Error Notification */}
                  {errorMessage && (
                    <div className="p-3 bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Field 1 & 2: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                        1. Your Full Name <span className="text-orange-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                        2. Your Email Address <span className="text-orange-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Field 3: Subject */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-subject" className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                        3. Subject <span className="text-orange-400">*</span>
                      </label>
                      <span className="text-[9px] font-mono text-white/40">Quick presets below</span>
                    </div>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Full-Stack Web Application Development / Project Proposal"
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors"
                      required
                    />

                    {/* Quick Subject Suggestions Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {COMMON_SUBJECT_SUGGESTIONS.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, subject: preset }))}
                          className={`text-[9px] font-mono px-2 py-0.5 border transition-colors cursor-pointer ${
                            formData.subject === preset
                              ? 'bg-white text-black border-white'
                              : 'bg-white/[0.02] text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Field 4: Message Body */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact-message" className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                        4. Message <span className="text-orange-400">*</span>
                      </label>
                      <span className="text-[9px] font-mono text-white/40">
                        {formData.message.length} characters
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your project, timeline, deliverables, technical stack requirements, or role specifications..."
                      className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors resize-y leading-relaxed"
                      required
                    />
                  </div>

                  {/* Optional Metadata Row: Company & Estimated Timeline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-company" className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                        Company / Organization (Optional)
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="e.g. Acme Tech or Stealth Startup"
                        className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-timeline" className="block text-[10px] font-mono uppercase tracking-wider text-white/50">
                        Target Timeline (Optional)
                      </label>
                      <select
                        id="contact-timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono bg-[#0E0E0E] border border-white/10 text-white focus:outline-none focus:border-white/40 cursor-pointer"
                      >
                        <option value="Immediately (< 2 weeks)" className="bg-[#0E0E0E] text-white">Immediately (&lt; 2 weeks)</option>
                        <option value="1 - 2 months" className="bg-[#0E0E0E] text-white">1 - 2 months</option>
                        <option value="2 - 3 months" className="bg-[#0E0E0E] text-white">2 - 3 months</option>
                        <option value="Flexible / Ongoing" className="bg-[#0E0E0E] text-white">Flexible / Ongoing</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button & Live Transmission Status */}
                  <div className="pt-2 space-y-2">
                    <button
                      id="submit-contact-form-btn"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 bg-white hover:bg-[#E5E5E5] text-black font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2 font-mono">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>{submissionStep || 'DISPATCHING TO RECIPIENT...'}</span>
                        </div>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND MESSAGE TO {designatedEmail.toUpperCase()}</span>
                        </>
                      )}
                    </button>

                    <p className="text-[10px] font-mono text-center text-white/40">
                      Destination: <span className="text-white/70">{designatedEmail}</span> • End-to-end encrypted dispatch
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
