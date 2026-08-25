import React from 'react';
import { LayoutDashboard, PlusCircle, User, Inbox, LogOut, Eye, Shield, Lock } from 'lucide-react';
import { Profile } from '../types';

interface AdminTopBarProps {
  profile: Profile;
  isAdmin: boolean;
  isVisitorPreview: boolean;
  unreadInquiriesCount: number;
  onOpenDashboard: () => void;
  onOpenAddProject: () => void;
  onOpenEditProfile: () => void;
  onOpenInquiries: () => void;
  onToggleVisitorPreview: () => void;
  onLogout: () => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  profile,
  isAdmin,
  isVisitorPreview,
  unreadInquiriesCount,
  onOpenDashboard,
  onOpenAddProject,
  onOpenEditProfile,
  onOpenInquiries,
  onToggleVisitorPreview,
  onLogout,
}) => {
  if (!isAdmin) return null;

  return (
    <div
      id="admin-top-bar"
      className="bg-[#080808] border-b border-white/20 text-white py-2 px-4 sm:px-6 relative z-50 transition-all font-mono text-[11px]"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Status Indicator */}
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            ADMIN STUDIO
          </span>
          <span className="text-white/40 hidden sm:inline">• Logged in as Owner ({profile.name})</span>
          {isVisitorPreview && (
            <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[9px] uppercase tracking-wider font-bold">
              [Visitor Preview Active]
            </span>
          )}
        </div>

        {/* Quick Action Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenDashboard}
            className="px-2.5 py-1 bg-white text-black font-bold uppercase text-[10px] tracking-wider hover:bg-[#E5E5E5] transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
            title="Open comprehensive Admin Management Dashboard"
          >
            <LayoutDashboard className="w-3 h-3" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={onOpenAddProject}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white uppercase text-[10px] tracking-wider border border-white/20 transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            <PlusCircle className="w-3 h-3" />
            <span className="hidden md:inline">+ Add Project</span>
          </button>

          <button
            onClick={onOpenEditProfile}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white uppercase text-[10px] tracking-wider border border-white/20 transition-colors cursor-pointer inline-flex items-center gap-1"
            title="Edit Personal Profile"
          >
            <User className="w-3 h-3" />
            <span className="hidden md:inline">Profile</span>
          </button>

          <button
            onClick={onOpenInquiries}
            className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white uppercase text-[10px] tracking-wider border border-white/20 transition-colors cursor-pointer inline-flex items-center gap-1"
            title="View Inquiries Inbox"
          >
            <Inbox className="w-3 h-3" />
            <span>Inbox</span>
            {unreadInquiriesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-orange-500 text-black text-[9px] font-bold rounded-sm">
                {unreadInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={onToggleVisitorPreview}
            className={`px-2.5 py-1 uppercase text-[10px] tracking-wider border transition-colors cursor-pointer inline-flex items-center gap-1 ${
              isVisitorPreview
                ? 'bg-amber-500 text-black border-amber-400 font-bold'
                : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border-white/20'
            }`}
            title="Toggle between seeing the site as a regular visitor vs admin mode"
          >
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">{isVisitorPreview ? 'Exit Preview' : 'Visitor View'}</span>
          </button>

          <button
            onClick={onLogout}
            className="p-1 bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors cursor-pointer"
            title="Lock and sign out of admin mode"
          >
            <LogOut className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
