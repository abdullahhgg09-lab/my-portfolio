import React, { useState } from 'react';
import {
  LayoutDashboard,
  FolderPlus,
  User,
  Inbox,
  Lock,
  LogOut,
  Eye,
  PlusCircle,
  Edit2,
  Trash2,
  ExternalLink,
  Github,
  Star,
  CheckCircle2,
  AlertCircle,
  Download,
  Upload,
  RefreshCw,
  Mail,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  X,
  Search,
  KeyRound,
  Check
} from 'lucide-react';
import { Profile, Project, ContactInquiry } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  projects: Project[];
  inquiries: ContactInquiry[];
  onSaveProfile: (profile: Profile) => void;
  onOpenAddProject: () => void;
  onOpenEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onToggleFeatureProject: (projectId: string) => void;
  onResetProjects: () => void;
  onDeleteInquiry: (inquiryId: string) => void;
  onToggleInquiryStatus: (inquiryId: string) => void;
  onClearAllInquiries: () => void;
  adminPin: string;
  onChangePin: (newPin: string) => void;
  onLogout: () => void;
  onOpenPublicPreview: () => void;
}

type TabType = 'overview' | 'projects' | 'profile' | 'inquiries' | 'security';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  profile,
  projects,
  inquiries,
  onSaveProfile,
  onOpenAddProject,
  onOpenEditProject,
  onDeleteProject,
  onToggleFeatureProject,
  onResetProjects,
  onDeleteInquiry,
  onToggleInquiryStatus,
  onClearAllInquiries,
  adminPin,
  onChangePin,
  onLogout,
  onOpenPublicPreview,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [projectSearch, setProjectSearch] = useState('');
  const [projectCategoryFilter, setProjectCategoryFilter] = useState('All');

  // Security state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [pinChangeMessage, setPinChangeMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile quick editing state inside dashboard
  const [profileForm, setProfileForm] = useState<Profile>(profile);
  const [profileSavedNotice, setProfileSavedNotice] = useState(false);

  if (!isOpen) return null;

  const unreadInquiries = inquiries.filter((i) => i.status === 'new');
  const featuredProjectsCount = projects.filter((p) => p.featured).length;

  const filteredProjects = projects.filter((p) => {
    const matchesCat = projectCategoryFilter === 'All' || p.category === projectCategoryFilter;
    const matchesSearch =
      !projectSearch ||
      p.title.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.description.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.client && p.client.toLowerCase().includes(projectSearch.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(profileForm);
    setProfileSavedNotice(true);
    setTimeout(() => setProfileSavedNotice(false), 3000);
  };

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentPinInput !== adminPin) {
      setPinChangeMessage({ type: 'error', text: 'Current PIN is incorrect.' });
      return;
    }
    if (newPinInput.length < 4) {
      setPinChangeMessage({ type: 'error', text: 'New PIN must be at least 4 characters.' });
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setPinChangeMessage({ type: 'error', text: 'New PIN and confirmation do not match.' });
      return;
    }

    onChangePin(newPinInput);
    setCurrentPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setPinChangeMessage({ type: 'success', text: 'Admin PIN updated successfully!' });
    setTimeout(() => setPinChangeMessage(null), 4000);
  };

  // Export JSON
  const handleExportData = () => {
    const data = {
      profile,
      projects,
      inquiries,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-in fade-in duration-200">
      <div
        id="admin-dashboard-panel"
        className="relative w-full max-w-6xl bg-[#0C0C0C] border border-white/15 shadow-2xl overflow-hidden my-4 sm:my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-white/10 bg-[#080808] gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white text-black font-bold">
              <LayoutDashboard className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-[0.25em] font-bold">
                  ● ADMIN ACCESS UNLOCKED
                </span>
                <span className="text-[9px] font-mono text-white/40">| OWNER CONTROL CENTER</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
                {profile.name} — Portfolio Studio Dashboard
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPublicPreview}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/15 transition-colors cursor-pointer"
              title="Close dashboard and preview how public visitors see your site"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Visitor Preview</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors cursor-pointer"
              title="Lock and sign out of admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock / Sign Out</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors cursor-pointer ml-1"
              title="Close Dashboard view"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 px-6 border-b border-white/10 bg-[#0E0E0E] overflow-x-auto scrollbar-none">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-white text-white font-bold bg-white/5'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'projects'
                ? 'border-white text-white font-bold bg-white/5'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Projects Manager ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-white text-white font-bold bg-white/5'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Profile & Bio</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'inquiries'
                ? 'border-white text-white font-bold bg-white/5'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries Inbox ({inquiries.length})</span>
            {unreadInquiries.length > 0 && (
              <span className="px-1.5 py-0.2 bg-white text-black text-[9px] font-bold">
                {unreadInquiries.length} new
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-mono uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-white text-white font-bold bg-white/5'
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Security & Data</span>
          </button>
        </div>

        {/* Dashboard Main Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Total Published Projects</span>
                  <div className="text-3xl font-mono font-bold text-white">{projects.length}</div>
                  <span className="text-[10px] font-mono text-white/50 block">
                    {featuredProjectsCount} marked as featured
                  </span>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Client Inquiries</span>
                  <div className="text-3xl font-mono font-bold text-white">{inquiries.length}</div>
                  <span className="text-[10px] font-mono text-emerald-400 block font-bold">
                    {unreadInquiries.length} unread / new
                  </span>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Designated Email</span>
                  <div className="text-sm font-mono font-bold text-white truncate">{profile.email}</div>
                  <span className="text-[10px] font-mono text-white/50 block">Form destination</span>
                </div>

                <div className="p-5 bg-white/[0.02] border border-white/10 space-y-1">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">Commission Availability</span>
                  <div className="flex items-center gap-2 pt-1">
                    <span className={`w-2.5 h-2.5 rounded-full ${profile.availableForWork ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
                    <span className="text-xs font-mono font-bold uppercase text-white">
                      {profile.availableForWork ? 'Open for Work' : 'Unavailable'}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-white/50 block">
                    {profile.experienceYears}+ yrs experience
                  </span>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="p-6 bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">QUICK ACTIONS</span>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                      Manager Shortcuts
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-white/40">Only visible to you</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <button
                    onClick={onOpenAddProject}
                    className="p-4 bg-white hover:bg-[#E5E5E5] text-black text-left transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between pb-2">
                      <FolderPlus className="w-5 h-5" />
                      <span className="text-xs font-mono font-bold uppercase">+ Add</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide">Publish Project</p>
                    <p className="text-[10px] text-black/70 mt-0.5">Upload new case study or client deliverable</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('profile')}
                    className="p-4 bg-white/[0.04] hover:bg-white/[0.08] text-white text-left border border-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between pb-2 text-white/70">
                      <User className="w-5 h-5" />
                      <span className="text-xs font-mono uppercase">Edit</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide">Update Profile</p>
                    <p className="text-[10px] text-white/50 mt-0.5">Edit bio, title, WhatsApp, and avatar</p>
                  </button>

                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="p-4 bg-white/[0.04] hover:bg-white/[0.08] text-white text-left border border-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between pb-2 text-white/70">
                      <Inbox className="w-5 h-5" />
                      <span className="text-xs font-mono uppercase">Inbox</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide">View Inquiries</p>
                    <p className="text-[10px] text-white/50 mt-0.5">{unreadInquiries.length} unread incoming client leads</p>
                  </button>

                  <button
                    onClick={onOpenPublicPreview}
                    className="p-4 bg-white/[0.04] hover:bg-white/[0.08] text-white text-left border border-white/15 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between pb-2 text-white/70">
                      <Eye className="w-5 h-5" />
                      <span className="text-xs font-mono uppercase">Live</span>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-wide">Preview Visitor View</p>
                    <p className="text-[10px] text-white/50 mt-0.5">Inspect site without admin controls</p>
                  </button>
                </div>
              </div>

              {/* Recent Inquiries Preview */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-white/60">
                    Recent Contact Submissions ({inquiries.slice(0, 3).length})
                  </h3>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="text-[10px] font-mono uppercase text-white/60 hover:text-white underline cursor-pointer"
                  >
                    View all ({inquiries.length}) →
                  </button>
                </div>

                {inquiries.length === 0 ? (
                  <div className="p-8 text-center bg-white/[0.01] border border-white/10 text-xs font-mono text-white/40">
                    No contact inquiries submitted yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold text-white">{inq.name}</span>
                            <span className="text-[10px] font-mono text-white/50">({inq.email})</span>
                            <span
                              className={`px-1.5 py-0.2 text-[9px] font-mono uppercase ${
                                inq.status === 'new' ? 'bg-white text-black font-bold' : 'bg-white/10 text-white/60'
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-white/80 line-clamp-1">
                            <strong className="text-white font-medium">{inq.subject}</strong> — {inq.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <a
                            href={`mailto:${inq.email}?subject=Re:%20${encodeURIComponent(inq.subject || inq.serviceType)}`}
                            className="px-3 py-1.5 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider inline-flex items-center gap-1"
                          >
                            <Mail className="w-3 h-3" />
                            <span>Reply</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS MANAGER */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="text"
                      value={projectSearch}
                      onChange={(e) => setProjectSearch(e.target.value)}
                      placeholder="Search projects..."
                      className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={onOpenAddProject}
                    className="px-4 py-2 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>+ Add New Project</span>
                  </button>
                  <button
                    onClick={onResetProjects}
                    className="px-3 py-2 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-[10px] font-mono uppercase tracking-wider border border-white/10 cursor-pointer"
                    title="Restore default sample projects"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Projects Table / List */}
              <div className="space-y-3">
                {filteredProjects.length === 0 ? (
                  <div className="p-12 text-center bg-white/[0.01] border border-white/10 space-y-2">
                    <p className="text-xs font-mono uppercase text-white/60">No projects match your filter.</p>
                    <button
                      onClick={onOpenAddProject}
                      className="text-xs font-mono text-white underline"
                    >
                      Create one now
                    </button>
                  </div>
                ) : (
                  filteredProjects.map((project, idx) => (
                    <div
                      key={project.id}
                      className="p-4 bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-[10px] font-mono text-white/40 hidden sm:inline-block w-8">
                          [ {String(idx + 1).padStart(2, '0')} ]
                        </span>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-16 h-12 object-cover border border-white/10 flex-shrink-0 filter grayscale"
                        />
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-mono font-bold text-white truncate">{project.title}</h4>
                            {project.featured && (
                              <span className="px-1.5 py-0.2 bg-orange-500 text-black text-[9px] font-mono font-bold uppercase">
                                Featured
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-mono text-white/50 truncate">
                            {project.category} • {project.year} {project.client ? `• ${project.client}` : ''}
                          </p>
                          <p className="text-xs text-white/60 line-clamp-1 font-light">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                        <button
                          onClick={() => onToggleFeatureProject(project.id)}
                          className={`p-2 border transition-colors cursor-pointer ${
                            project.featured
                              ? 'bg-orange-500/20 text-orange-300 border-orange-500/40'
                              : 'bg-white/5 text-white/40 border-white/10 hover:text-white'
                          }`}
                          title={project.featured ? 'Unmark featured' : 'Mark as featured'}
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onOpenEditProject(project)}
                          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider border border-white/15 transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => onDeleteProject(project.id)}
                          className="p-1.5 text-white/40 hover:text-rose-400 border border-white/10 hover:border-rose-500/40 transition-colors cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE & BIO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleUpdateProfile} className="space-y-5 max-w-3xl">
              {profileSavedNotice && (
                <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Full Name / Brand
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
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
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                  Tagline
                </label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                  Short Hero Bio
                </label>
                <textarea
                  rows={3}
                  value={profileForm.shortBio}
                  onChange={(e) => setProfileForm({ ...profileForm, shortBio: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Designated Email (Inquiries Target)
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={profileForm.whatsapp}
                    onChange={(e) => setProfileForm({ ...profileForm, whatsapp: e.target.value })}
                    placeholder="+923001234567"
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Years Experience
                  </label>
                  <input
                    type="number"
                    value={profileForm.experienceYears}
                    onChange={(e) => setProfileForm({ ...profileForm, experienceYears: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Completed Projects
                  </label>
                  <input
                    type="number"
                    value={profileForm.completedProjects}
                    onChange={(e) => setProfileForm({ ...profileForm, completedProjects: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Client Satisfaction %
                  </label>
                  <input
                    type="number"
                    value={profileForm.clientSatisfaction}
                    onChange={(e) => setProfileForm({ ...profileForm, clientSatisfaction: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                  />
                </div>
              </div>

              {/* Avatar / Profile Picture */}
              <div className="p-4 bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/80 font-bold">
                    Portfolio Picture & Frame Image
                  </label>
                  <span className="text-[9px] font-mono text-white/40">Upload your original photo</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 bg-white/5 border border-white/20 overflow-hidden flex-shrink-0 relative">
                    <img
                      src={profileForm.avatarUrl}
                      alt="Profile preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <div>
                      <input
                        type="file"
                        id="dash-avatar-upload"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const result = event.target?.result as string;
                              if (result) {
                                setProfileForm((prev) => ({ ...prev, avatarUrl: result }));
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById('dash-avatar-upload')?.click()}
                        className="px-3 py-1.5 bg-white text-black text-[10px] font-mono uppercase font-bold tracking-wider hover:bg-[#E0E0E0] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Upload from Device</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-white/40 uppercase">Image URL or Local Path:</span>
                      <input
                        type="text"
                        value={profileForm.avatarUrl}
                        onChange={(e) => setProfileForm({ ...profileForm, avatarUrl: e.target.value })}
                        placeholder="Image URL or /avatar.jpg"
                        className="w-full px-3.5 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-3 p-3.5 bg-white/[0.02] border border-white/10">
                <input
                  type="checkbox"
                  id="dash-available"
                  checked={profileForm.availableForWork}
                  onChange={(e) => setProfileForm({ ...profileForm, availableForWork: e.target.checked })}
                  className="w-4 h-4 bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
                />
                <label htmlFor="dash-available" className="text-xs font-mono text-white/80 cursor-pointer">
                  <span className="font-bold text-white uppercase">Available for new client commissions</span> (Enables status indicator across public navbar and hero)
                </label>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all cursor-pointer inline-flex items-center gap-2"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Profile Changes</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/40">COMMISSION DISPATCH REGISTRY</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                    Incoming Client Leads & Inquiries ({inquiries.length})
                  </h3>
                </div>
                {inquiries.length > 0 && (
                  <button
                    onClick={onClearAllInquiries}
                    className="text-[10px] font-mono uppercase tracking-wider text-white/40 hover:text-rose-400 transition-colors cursor-pointer"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="p-12 text-center bg-white/[0.01] border border-white/10 space-y-2">
                  <Mail className="w-6 h-6 mx-auto text-white/30" />
                  <p className="text-xs font-mono uppercase text-white/60">No client messages in inbox.</p>
                  <p className="text-[10px] font-mono text-white/40">
                    When visitors submit the contact form on your portfolio, their communications will appear here and in {profile.email}.
                  </p>
                </div>
              ) : (
                inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`p-5 border transition-all ${
                      inq.status === 'new'
                        ? 'bg-white/[0.04] border-white/30'
                        : 'bg-white/[0.01] border-white/10 opacity-75'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white font-mono">{inq.name}</h4>
                          {inq.company && (
                            <span className="text-xs font-mono text-white/50">/ {inq.company}</span>
                          )}
                          <span
                            className={`px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider ${
                              inq.status === 'new' ? 'bg-white text-black font-bold' : 'bg-white/10 text-white/70'
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
                        {new Date(inq.createdAt).toLocaleString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                    </div>

                    {inq.subject && (
                      <div className="pt-2">
                        <p className="text-xs font-mono font-medium text-white">
                          <span className="text-white/40 font-normal uppercase text-[9px] mr-1.5">[Subject]</span>
                          {inq.subject}
                        </p>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-2 pt-2 text-[10px] font-mono">
                      <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10">
                        Service: <strong className="text-white font-normal">{inq.serviceType}</strong>
                      </span>
                      <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10">
                        Budget: <strong className="text-white font-normal">{inq.budget}</strong>
                      </span>
                      <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10">
                        Timeline: <strong className="text-white font-normal">{inq.timeline}</strong>
                      </span>
                    </div>

                    <div className="mt-3 p-3 bg-black/40 border border-white/5 text-xs font-mono text-white/80 leading-relaxed whitespace-pre-wrap">
                      {inq.message}
                    </div>

                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onToggleInquiryStatus(inq.id)}
                          className="text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          Mark as {inq.status === 'replied' ? 'New' : 'Replied'}
                        </button>
                        <a
                          href={`mailto:${inq.email}?subject=Re:%20${encodeURIComponent(inq.subject || inq.serviceType)}`}
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-white text-black hover:bg-[#E5E5E5] inline-flex items-center gap-1.5 transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Reply via Mail</span>
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
                ))
              )}
            </div>
          )}

          {/* TAB 5: SECURITY & DATA */}
          {activeTab === 'security' && (
            <div className="space-y-8 max-w-2xl">
              {/* PIN Change Form */}
              <form onSubmit={handlePinUpdate} className="space-y-4 p-6 bg-white/[0.02] border border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <KeyRound className="w-4 h-4" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Change Owner Admin PIN
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 font-light">
                    Update the password required to access this dashboard.
                  </p>
                </div>

                {pinChangeMessage && (
                  <div
                    className={`p-3 text-xs font-mono flex items-center gap-2 ${
                      pinChangeMessage.type === 'success'
                        ? 'bg-emerald-950/40 border border-emerald-800/40 text-emerald-300'
                        : 'bg-red-950/40 border border-red-800/40 text-red-300'
                    }`}
                  >
                    {pinChangeMessage.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    )}
                    <span>{pinChangeMessage.text}</span>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                    Current PIN
                  </label>
                  <input
                    type="password"
                    value={currentPinInput}
                    onChange={(e) => setCurrentPinInput(e.target.value)}
                    placeholder="Enter current PIN"
                    className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                      New PIN
                    </label>
                    <input
                      type="password"
                      value={newPinInput}
                      onChange={(e) => setNewPinInput(e.target.value)}
                      placeholder="At least 4 characters"
                      className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                      Confirm New PIN
                    </label>
                    <input
                      type="password"
                      value={confirmPinInput}
                      onChange={(e) => setConfirmPinInput(e.target.value)}
                      placeholder="Repeat new PIN"
                      className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] transition-all cursor-pointer"
                >
                  Update Admin PIN
                </button>
              </form>

              {/* Data Backup & Export */}
              <div className="space-y-3 p-6 bg-white/[0.02] border border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-white">
                    <Download className="w-4 h-4" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider">
                      Portfolio Backup & Export
                    </h3>
                  </div>
                  <p className="text-xs text-white/50 font-light">
                    Export your complete portfolio data (projects, profile, and inquiries) to a JSON file.
                  </p>
                </div>

                <button
                  onClick={handleExportData}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-[10px] font-mono uppercase tracking-wider border border-white/15 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Backup JSON</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Footer Bar */}
        <div className="px-6 py-3 border-t border-white/10 bg-[#080808] flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
          <div>Admin Mode Active • Changes save automatically to browser storage</div>
          <button
            onClick={onClose}
            className="text-white hover:underline cursor-pointer"
          >
            Close Dashboard ✕
          </button>
        </div>
      </div>
    </div>
  );
};
