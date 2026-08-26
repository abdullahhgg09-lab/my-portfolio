import React, { useEffect } from 'react';
import { X, Download, ShieldCheck, MapPin, Eye } from 'lucide-react';
import { Profile } from '../types';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  profile,
}) => {
  // Listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (!profile.avatarUrl) return;
    const a = document.createElement('a');
    a.href = profile.avatarUrl;
    a.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_photo.jpg`;
    a.target = '_blank';
    a.click();
  };

  return (
    <div
      id="photo-lightbox-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-xl w-full bg-[#0E0E0E] border border-white/20 shadow-2xl overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#080808] border-b border-white/10">
          <div className="flex items-center gap-2">
            <Eye className="w-3.5 h-3.5 text-white/60" />
            <span className="text-[10px] font-mono tracking-[0.2em] text-white/60 uppercase">
              PORTFOLIO PROFILE PHOTO
            </span>
          </div>

          <div className="flex items-center gap-2">
            {profile.avatarUrl && (
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer"
                title="Download full size photo"
              >
                <Download className="w-3 h-3" />
                <span>Save</span>
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close (Esc)"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Large High-Res Picture Display */}
        <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden group">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="max-h-[62vh] w-auto max-w-full object-contain rounded-none border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-64 h-64 flex items-center justify-center bg-white/5 text-white/30 font-mono text-sm">
              No photo configured
            </div>
          )}
        </div>

        {/* Bottom Profile Info Footer */}
        <div className="p-4 sm:p-5 bg-[#0A0A0A] border-t border-white/10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white uppercase tracking-tight truncate">
                {profile.name}
              </h3>
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            </div>
            <p className="text-xs text-white/70 font-light truncate mt-0.5">
              {profile.title}
            </p>
            <p className="text-[11px] text-white/40 font-mono flex items-center gap-1.5 mt-1">
              <MapPin className="w-3 h-3 text-orange-500" />
              <span>{profile.location}</span>
            </p>
          </div>

          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            {profile.availableForWork && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/60 border border-emerald-800/60 text-emerald-300 text-[10px] font-mono uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for hire
              </span>
            )}
            <span className="text-[9px] font-mono text-white/30 uppercase">
              {profile.experienceYears}+ YRS EXPERIENCE
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
