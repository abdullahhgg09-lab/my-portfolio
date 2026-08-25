import React, { useState, useEffect, useRef } from 'react';
import { X, User, Check, AlertCircle, Save, Globe, Mail, Phone, MapPin, Sparkles, Upload, Camera, Image } from 'lucide-react';
import { Profile } from '../types';

interface ProfileEditorModalProps {
  isOpen: boolean;
  profile: Profile;
  onClose: () => void;
  onSave: (updatedProfile: Profile) => void;
}

const AVATAR_PRESETS = [
  '/avatar.jpg',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
];

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Profile>(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFormData(profile);
  }, [profile, isOpen]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please choose an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setFormData((prev) => ({ ...prev, avatarUrl: result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        id="profile-editor-modal"
        className="relative w-full max-w-2xl bg-[#0E0E0E] border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 text-white/80 border border-white/10">
              <User className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em]">CREATOR SETTINGS</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">Customize Personal Profile</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Your Full Name / Brand Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Professional Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Full-Stack Developer & Software Engineer"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>
          </div>

          {/* Short Bio / Intro */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Hero Introduction Bio
            </label>
            <textarea
              rows={2}
              value={formData.shortBio}
              onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
              className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                WhatsApp Number
              </label>
              <input
                type="text"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+923001234567"
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Worldwide / Remote"
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Key Metrics Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Years Exp.
              </label>
              <input
                type="number"
                min="0"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Projects Done
              </label>
              <input
                type="number"
                min="0"
                value={formData.completedProjects}
                onChange={(e) => setFormData({ ...formData, completedProjects: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Satisfaction %
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.clientSatisfaction}
                onChange={(e) => setFormData({ ...formData, clientSatisfaction: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">GitHub Profile</label>
              <input
                type="url"
                value={formData.socialLinks.github || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, github: e.target.value } })}
                placeholder="https://github.com/yourhandle"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">LinkedIn Profile</label>
              <input
                type="url"
                value={formData.socialLinks.linkedin || ''}
                onChange={(e) => setFormData({ ...formData, socialLinks: { ...formData.socialLinks, linkedin: e.target.value } })}
                placeholder="https://linkedin.com/in/yourhandle"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Avatar Photo */}
          <div className="space-y-3 pt-2 p-3 bg-white/[0.02] border border-white/10">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/80 font-bold">
                Profile Photo / Frame Image
              </label>
              <span className="text-[9px] font-mono text-white/40">Upload or enter image link</span>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />

            <div className="flex items-center gap-4">
              <div className="relative w-16 h-20 bg-white/5 border border-white/20 overflow-hidden flex-shrink-0">
                <img
                  src={formData.avatarUrl}
                  alt="Avatar preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-black text-[10px] font-mono uppercase font-bold tracking-wider hover:bg-[#E0E0E0] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Phone / PC</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase">Or Image URL:</span>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="Paste image URL (e.g. /avatar.jpg or https://...)"
                    className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-white/5">
              <span className="text-[9px] font-mono text-white/40 uppercase">Default Presets:</span>
              {AVATAR_PRESETS.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData({ ...formData, avatarUrl: preset })}
                  className="w-7 h-8 overflow-hidden border border-white/15 hover:border-white/40 cursor-pointer"
                >
                  <img src={preset} alt="" className="w-full h-full object-cover object-top" />
                </button>
              ))}
            </div>
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10">
            <input
              type="checkbox"
              id="avail-checkbox"
              checked={formData.availableForWork}
              onChange={(e) => setFormData({ ...formData, availableForWork: e.target.checked })}
              className="w-4 h-4 bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
            />
            <label htmlFor="avail-checkbox" className="text-xs font-mono text-white/70 cursor-pointer">
              <span className="font-bold text-white uppercase">Available for new client commissions</span> (Shows status beacon across header & hero)
            </label>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-black bg-white hover:bg-[#E5E5E5] transition-all cursor-pointer"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
