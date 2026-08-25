import React from 'react';
import { X, Mail, MessageSquare, Trash2, CheckCircle2, Clock, DollarSign, Calendar, ExternalLink } from 'lucide-react';
import { ContactInquiry } from '../types';

interface InquiriesModalProps {
  isOpen: boolean;
  inquiries: ContactInquiry[];
  onClose: () => void;
  onDeleteInquiry: (id: string) => void;
  onToggleStatus: (id: string) => void;
  onClearAll: () => void;
}

export const InquiriesModal: React.FC<InquiriesModalProps> = ({
  isOpen,
  inquiries,
  onClose,
  onDeleteInquiry,
  onToggleStatus,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        id="inquiries-modal"
        className="relative w-full max-w-3xl bg-[#0E0E0E] border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 text-white/80 border border-white/10">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em]">COMMISSION REGISTRY</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Client Inquiries Inbox ({inquiries.length})
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {inquiries.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-white/5 border border-white/10 text-white/40 flex items-center justify-center mx-auto">
                <Mail className="w-5 h-5" />
              </div>
              <p className="text-xs font-mono font-bold uppercase tracking-wider text-white">Registry is empty</p>
              <p className="text-xs font-mono text-white/40 max-w-xs mx-auto">
                When prospective clients submit inquiries through your portfolio, communications will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className={`p-5 border transition-all ${
                    inq.status === 'new'
                      ? 'bg-white/[0.04] border-white/30'
                      : inq.status === 'replied'
                      ? 'bg-white/[0.01] border-white/5 opacity-60'
                      : 'bg-white/[0.02] border-white/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white tracking-wide">{inq.name}</h4>
                        {inq.company && (
                          <span className="text-xs font-mono text-white/50">
                            / <span className="text-white/80">{inq.company}</span>
                          </span>
                        )}
                        <span
                          className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${
                            inq.status === 'new'
                              ? 'bg-white text-black font-bold'
                              : inq.status === 'replied'
                              ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-500/30'
                              : 'bg-white/10 text-white/70'
                          }`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <a
                        href={`mailto:${inq.email}?subject=Re:%20${encodeURIComponent(inq.subject || inq.serviceType)}`}
                        className="text-xs font-mono text-white/60 hover:text-white inline-flex items-center gap-1 mt-0.5"
                      >
                        <Mail className="w-3 h-3" />
                        <span>{inq.email}</span>
                      </a>
                    </div>

                    <div className="text-[10px] font-mono text-white/40">
                      {new Date(inq.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>

                  {/* Subject Line */}
                  {inq.subject && (
                    <div className="pt-2.5">
                      <p className="text-xs font-mono font-medium text-white">
                        <span className="text-white/40 font-normal uppercase text-[9px] mr-1.5">[Subject]</span>
                        {inq.subject}
                      </p>
                    </div>
                  )}

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                    <span className="px-2 py-1 bg-white/5 text-white/70 border border-white/10">
                      Service: <strong className="text-white font-normal">{inq.serviceType}</strong>
                    </span>
                    <span className="px-2 py-1 bg-white/5 text-white/70 border border-white/10">
                      Budget: <strong className="text-white font-normal">{inq.budget}</strong>
                    </span>
                    <span className="px-2 py-1 bg-white/5 text-white/70 border border-white/10">
                      Timeline: <strong className="text-white font-normal">{inq.timeline}</strong>
                    </span>
                  </div>

                  {/* Message Body */}
                  <div className="mt-3 p-3 bg-black/40 border border-white/5 text-xs font-mono text-white/80 leading-relaxed">
                    "{inq.message}"
                  </div>

                  {/* Action Bar */}
                  <div className="mt-4 flex items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onToggleStatus(inq.id)}
                        className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                      >
                        Mark as {inq.status === 'replied' ? 'New' : 'Replied'}
                      </button>
                      <a
                        href={`mailto:${inq.email}?subject=Re:%20${encodeURIComponent(inq.serviceType)}`}
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-white text-black hover:bg-[#E5E5E5] inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Reply by Email</span>
                      </a>
                    </div>

                    <button
                      onClick={() => onDeleteInquiry(inq.id)}
                      className="p-1.5 text-white/30 hover:text-rose-400 transition-colors cursor-pointer"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0E0E0E] flex items-center justify-between">
          {inquiries.length > 0 && (
            <button
              onClick={onClearAll}
              className="text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
            >
              Clear All Messages
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-auto px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold bg-white text-black hover:bg-[#E5E5E5] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
