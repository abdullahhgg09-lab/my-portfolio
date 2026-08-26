import React, { useState, useEffect } from 'react';
import { Menu, X, PlusCircle, User, MessageSquare, ArrowUpRight, ShieldCheck, LayoutDashboard } from 'lucide-react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  isAdmin?: boolean;
  isVisitorPreview?: boolean;
  onOpenDashboard?: () => void;
  onOpenAddProject?: () => void;
  onOpenEditProfile?: () => void;
  inquiriesCount?: number;
  onOpenInquiries?: () => void;
  onOpenPhotoModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  isAdmin = false,
  isVisitorPreview = false,
  onOpenDashboard,
  onOpenAddProject,
  onOpenEditProfile,
  inquiriesCount = 0,
  onOpenInquiries,
  onOpenPhotoModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Services', href: '#services' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  const showAdminControls = isAdmin && !isVisitorPreview;

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent border-b border-white/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo & Avatar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onOpenPhotoModal}
              className="relative group focus:outline-none cursor-pointer block"
              title="Click to view full profile photo"
            >
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 object-cover border border-white/20 group-hover:border-white/70 group-hover:scale-105 transition-all shadow-md"
                />
              ) : (
                <div className="w-9 h-9 border border-white/20 bg-white/5 flex items-center justify-center text-sm font-semibold tracking-tighter text-white group-hover:border-white/60 transition-colors">
                  {profile.name.charAt(0)}
                </div>
              )}
              {profile.availableForWork && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-[#0A0A0A]" title="Available for commissions" />
              )}
            </button>

            <a
              id="brand-logo-link"
              href="#"
              className="group focus:outline-none"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs tracking-[0.25em] font-bold text-white/40 uppercase block">
                  {profile.title.split(' ')[0] || 'ENGINEER'}
                </span>
              </div>
              <h1 className="text-sm font-medium tracking-tight text-white group-hover:text-white/80 transition-colors uppercase">
                {profile.name}
              </h1>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[11px] tracking-[0.2em] font-semibold text-white/60">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase()}`}
                href={link.href}
                className="hover:text-white transition-colors uppercase relative py-1 hover:border-b hover:border-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Show Admin Management shortcuts only if Admin mode is active */}
            {showAdminControls && (
              <>
                {onOpenDashboard && (
                  <button
                    id="navbar-dashboard-btn"
                    onClick={onOpenDashboard}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-bold text-black bg-white hover:bg-[#E5E5E5] transition-colors cursor-pointer"
                    title="Open Admin Management Dashboard"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span>Studio Dashboard</span>
                  </button>
                )}

                {onOpenAddProject && (
                  <button
                    id="navbar-add-project-btn"
                    onClick={onOpenAddProject}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] tracking-[0.15em] uppercase font-semibold text-white/80 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-colors cursor-pointer"
                    title="Add a new project"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-white/70" />
                    <span>+ Project</span>
                  </button>
                )}

                {onOpenInquiries && (
                  <button
                    id="navbar-inquiries-btn"
                    onClick={onOpenInquiries}
                    className="relative inline-flex items-center justify-center p-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-colors cursor-pointer"
                    title="View Client Inquiries"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    {inquiriesCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-orange-500 text-black rounded-full text-[9px] font-bold flex items-center justify-center">
                        {inquiriesCount}
                      </span>
                    )}
                  </button>
                )}
              </>
            )}

            {/* Primary Hire Me / Inquire CTA (Visible to all) */}
            <a
              id="navbar-contact-cta"
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-[10px] font-bold tracking-[0.25em] uppercase text-black bg-white hover:bg-[#E5E5E5] transition-colors cursor-pointer"
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            {showAdminControls && onOpenDashboard && (
              <button
                onClick={onOpenDashboard}
                className="p-2 text-black bg-white text-[10px] font-bold"
                title="Admin Dashboard"
              >
                <LayoutDashboard className="w-4 h-4" />
              </button>
            )}
            <button
              id="navbar-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white/80 hover:text-white bg-white/5 border border-white/15 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-nav-menu"
            className="lg:hidden mt-3 pt-4 pb-5 px-3 bg-[#0E0E0E] border border-white/10 shadow-2xl backdrop-blur-xl animate-in fade-in duration-150"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2">
              {showAdminControls ? (
                <>
                  {onOpenDashboard && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenDashboard();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-black bg-white cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      <span>Open Admin Dashboard</span>
                    </button>
                  )}

                  {onOpenAddProject && (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onOpenAddProject();
                      }}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase text-white/80 bg-white/5 border border-white/15"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>+ Add New Project</span>
                    </button>
                  )}
                </>
              ) : null}

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 text-[10px] font-bold tracking-[0.25em] uppercase text-black bg-white hover:bg-[#E5E5E5] transition-colors"
              >
                <span>Start an Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
