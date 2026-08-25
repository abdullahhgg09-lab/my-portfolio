import React, { useState } from 'react';
import { Lock, KeyRound, X, AlertCircle, CheckCircle2, Shield, Eye, EyeOff } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  adminPin: string;
  onResetPinToDefault: () => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  adminPin,
  onResetPinToDefault,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [resetNotice, setResetNotice] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin.trim()) {
      setError('');
      setPinInput('');
      onLoginSuccess();
    } else {
      setError('Incorrect admin PIN/Password. Please try again.');
    }
  };

  const handleQuickReset = () => {
    onResetPinToDefault();
    setPinInput('dawood');
    setResetNotice(true);
    setError('');
    setTimeout(() => setResetNotice(false), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        id="admin-auth-modal"
        className="relative w-full max-w-md bg-[#0E0E0E] border border-white/15 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A0A0A]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 text-white/80 border border-white/10">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em]">PRIVATE ACCESS</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                Owner / Admin Login
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

        {/* Form Body */}
        <form onSubmit={handleLogin} className="p-6 space-y-5">
          <div className="space-y-1">
            <p className="text-xs text-white/60 font-light leading-relaxed">
              Enter your secret owner PIN or password to unlock the <strong>Admin Dashboard</strong>, manage projects, edit profile, and view incoming client inquiries.
            </p>
            <p className="text-[10px] font-mono text-white/40 pt-1">
              Default password: <span className="text-white font-bold font-mono">dawood</span> (changeable in Dashboard settings)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-800/50 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {resetNotice && (
            <div className="p-3 bg-emerald-950/50 border border-emerald-800/50 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>PIN reset to default: <strong>dawood</strong></span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Admin Password / PIN
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="Enter PIN (e.g. admin123)"
                className="w-full px-3.5 py-2.5 text-xs font-mono bg-white/[0.03] border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-white/50 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-white/10">
            <button
              type="button"
              onClick={handleQuickReset}
              className="text-[10px] font-mono text-white/40 hover:text-white underline transition-colors cursor-pointer"
            >
              Reset PIN to default
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-[10px] font-mono uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-[#E5E5E5] transition-all cursor-pointer inline-flex items-center gap-1.5"
              >
                <KeyRound className="w-3 h-3" />
                <span>Unlock Studio</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
