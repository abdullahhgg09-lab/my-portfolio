import React from 'react';
import { ArrowUp, Github, Linkedin, Twitter, Dribbble, Lock, LayoutDashboard, LogOut } from 'lucide-react';
import { Profile } from '../types';

interface FooterProps {
  profile: Profile;
  isAdmin?: boolean;
  isVisitorPreview?: boolean;
  onOpenAdminAuth: () => void;
  onOpenDashboard?: () => void;
  onOpenAddProject?: () => void;
  onOpenEditProfile?: () => void;
  onLogout?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  isAdmin = false,
  isVisitorPreview = false,
  onOpenAdminAuth,
  onOpenDashboard,
  onOpenAddProject,
  onOpenEditProfile,
  onLogout,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showAdminControls = isAdmin && !isVisitorPreview;

  return (
    <footer id="portfolio-footer" className="bg-[#080808] border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Bio Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 border border-white/20 bg-white text-black flex items-center justify-center font-bold text-xs">
                {profile.name.charAt(0)}
              </div>
              <span className="font-mono text-xs font-bold tracking-[0.25em] uppercase text-white">
                {profile.name}
              </span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-light">
              {profile.tagline}
            </p>
            <div className="flex items-center gap-2 pt-2 text-white/60">
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socialLinks.dribbble && (
                <a
                  href={profile.socialLinks.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-colors"
                  aria-label="Dribbble"
                >
                  <Dribbble className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40">
              Navigation Index
            </h4>
            <ul className="space-y-2 text-xs font-mono text-white/60">
              <li>
                <a href="#projects" className="hover:text-white transition-colors uppercase">
                  Selected Works
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors uppercase">
                  Technical Stack
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors uppercase">
                  Client Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-white transition-colors uppercase">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors uppercase">
                  Direct Dispatch
                </a>
              </li>
            </ul>
          </div>

          {/* Owner Dashboard & Controls Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40">
              {showAdminControls ? 'Studio Management' : 'Owner Portal'}
            </h4>
            <p className="text-xs text-white/50 font-light">
              {showAdminControls
                ? 'Manage your portfolio archives, update client inquiries, and edit profile details in real-time.'
                : 'Protected management workspace for portfolio owner and administrative controls.'}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {showAdminControls ? (
                <>
                  {onOpenDashboard && (
                    <button
                      onClick={onOpenDashboard}
                      className="px-3 py-1.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <LayoutDashboard className="w-3 h-3" />
                      <span>Studio Dashboard</span>
                    </button>
                  )}
                  {onOpenAddProject && (
                    <button
                      onClick={onOpenAddProject}
                      className="px-3 py-1.5 bg-white/5 border border-white/15 text-white/80 hover:text-white text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      + Add Project
                    </button>
                  )}
                  {onLogout && (
                    <button
                      onClick={onLogout}
                      className="px-2.5 py-1.5 bg-red-950/40 border border-red-800/40 text-red-300 hover:bg-red-900/60 text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1"
                      title="Lock & Log Out"
                    >
                      <LogOut className="w-3 h-3" />
                    </button>
                  )}
                </>
              ) : (
                <button
                  id="footer-owner-login-btn"
                  onClick={onOpenAdminAuth}
                  className="px-3.5 py-2 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white/70 hover:text-white text-[10px] font-mono uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Lock className="w-3 h-3 text-orange-400" />
                  <span>Owner Login / Dashboard</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/40 uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} {profile.name}. All Rights Reserved.</span>
            {!showAdminControls && (
              <button
                onClick={onOpenAdminAuth}
                className="text-white/30 hover:text-white/70 transition-colors inline-flex items-center gap-1 cursor-pointer"
                title="Protected Admin Access"
              >
                <Lock className="w-2.5 h-2.5" />
                <span>Admin</span>
              </button>
            )}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-white/50 hover:text-white transition-colors cursor-pointer"
          >
            <span>Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>
    </footer>
  );
};
