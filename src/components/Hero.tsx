import React, { useRef, useState } from 'react';
import { ArrowRight, FolderGit2, Mail, Github, Linkedin, Twitter, MessageCircle, Code, Server, ShieldCheck, Camera, Upload, CheckCircle2 } from 'lucide-react';
import { Profile } from '../types';

interface HeroProps {
  profile: Profile;
  isAdmin?: boolean;
  isVisitorPreview?: boolean;
  onOpenAddProject?: () => void;
  onOpenEditProfile?: () => void;
  onUpdateAvatar?: (avatarUrl: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  isAdmin = false,
  isVisitorPreview = false,
  onOpenAddProject,
  onOpenEditProfile,
  onUpdateAvatar,
}) => {
  const showAdminControls = isAdmin && !isVisitorPreview;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file (JPEG, PNG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl && onUpdateAvatar) {
        onUpdateAvatar(dataUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const topTech = [
    'React 19',
    'Next.js 15',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'FastAPI / Python',
    'Tailwind CSS',
    'GraphQL',
    'Docker & AWS',
  ];

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden border-b border-white/10"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-white/[0.02] blur-[140px] -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Archival / Status Eyebrow */}
            <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/15 bg-white/[0.03] text-white/70 text-[10px] tracking-[0.25em] uppercase font-mono">
              <span className={`w-1.5 h-1.5 rounded-full ${profile.availableForWork ? 'bg-orange-500 animate-pulse' : 'bg-white/40'} inline-block`}></span>
              <span>
                {profile.availableForWork ? 'Available for 2025/2026 Commissions & Contracts' : 'Currently Engaged on Active Contracts'}
              </span>
            </div>

            {/* Main Monumental Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light italic tracking-tight text-white/95 leading-[1.02]">
              Building Scalable, <br />
              <span className="text-white font-normal not-italic font-sans text-3xl sm:text-5xl lg:text-6xl tracking-tight block mt-1">
                High-Impact Web & Systems.
              </span>
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-sm sm:text-base text-white/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              {profile.shortBio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <a
                id="hero-explore-projects-btn"
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#E5E5E5] text-black font-bold text-[11px] tracking-[0.2em] uppercase transition-all transform hover:-translate-y-0.5 cursor-pointer shadow-lg shadow-white/5"
              >
                <FolderGit2 className="w-3.5 h-3.5" />
                <span>Featured Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                id="hero-hire-me-btn"
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold text-[11px] tracking-[0.15em] uppercase transition-all cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 text-white/70" />
                <span>Start Inquiry</span>
              </a>

              {profile.whatsapp && (
                <a
                  id="hero-whatsapp-btn"
                  href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(profile.name)},%20I%20reviewed%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/15 text-white/80 hover:text-white font-medium text-[11px] tracking-[0.15em] uppercase transition-colors cursor-pointer"
                  title="Direct WhatsApp Discussion"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-orange-400" />
                  <span>WhatsApp</span>
                </a>
              )}
            </div>

            {/* Quick Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-3 text-white/40">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/40">
                Index:
              </span>
              {profile.socialLinks.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socialLinks.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {profile.socialLinks.twitter && (
                <a
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 hover:border-white/30 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              )}

              {showAdminControls && onOpenEditProfile && (
                <>
                  <div className="h-4 w-[1px] bg-white/15 mx-1" />
                  <button
                    onClick={onOpenEditProfile}
                    className="text-[10px] uppercase tracking-[0.15em] text-white/60 hover:text-white font-mono underline underline-offset-4 cursor-pointer"
                  >
                    Edit Bio Info
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Hero Card / Editorial Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Card Container */}
              <div className="relative bg-[#0E0E0E] border border-white/15 p-6 sm:p-7 shadow-2xl backdrop-blur-xl">
                {/* Numbered Index Header */}
                <div className="flex items-center justify-between text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase pb-4 border-b border-white/10">
                  <span>CURATED PROFILE</span>
                  <span>VOL. 01 / 2025</span>
                </div>

                {/* Header Profile Summary & Picture Frame */}
                <div className="py-5 border-b border-white/10">
                  {/* Hidden File Input for Direct Picture Upload */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="flex items-start gap-4">
                    {/* Picture Frame with Interactive Upload Trigger */}
                    <div
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`relative group flex-shrink-0 transition-all ${
                        isDragging ? 'ring-2 ring-white scale-105' : ''
                      }`}
                    >
                      <div className="w-20 h-24 sm:w-24 sm:h-28 overflow-hidden bg-white/5 border border-white/20 group-hover:border-white/60 shadow-xl transition-all relative">
                        <img
                          src={profile.avatarUrl}
                          alt={profile.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover Overlay to Change / Upload Original Photo */}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute inset-0 bg-black/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 transition-opacity cursor-pointer text-white p-1 text-center"
                          title="Click to select or drag & drop your original photo"
                        >
                          <Camera className="w-4 h-4 text-white" />
                          <span className="text-[8px] font-mono uppercase tracking-wider font-semibold">Change Photo</span>
                        </button>
                      </div>

                      {/* Online Status Beacon */}
                      {profile.availableForWork && (
                        <span
                          className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-[#0E0E0E]"
                          title="Active & Available for commissions"
                        />
                      )}
                    </div>

                    {/* Profile Information & Actions */}
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-semibold tracking-tight text-white truncate uppercase">
                          {profile.name}
                        </h3>
                        <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      </div>
                      <p className="text-xs text-white/70 font-light truncate mt-0.5">
                        {profile.title}
                      </p>
                      <p className="text-[11px] text-white/40 flex items-center gap-1.5 mt-1 font-mono">
                        <span className="w-1.5 h-1.5 bg-orange-500 inline-block"></span>
                        {profile.location}
                      </p>

                      {/* Photo Upload Shortcut / Drag-and-Drop Prompt */}
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/15 text-[9px] font-mono uppercase tracking-wider transition-colors cursor-pointer"
                        >
                          <Upload className="w-3 h-3" />
                          <span>Upload Original Photo</span>
                        </button>
                      </div>

                      {uploadSuccess && (
                        <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Photo updated successfully!</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Core Value Pillars */}
                <div className="py-4 space-y-2.5">
                  <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
                    <div className="p-1.5 bg-white/5 text-white/80 mt-0.5">
                      <Code className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90">Modern Architecture</h4>
                      <p className="text-[11px] text-white/50 font-light">Clean, typed, modular code built for speed and maintainability.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/5 hover:border-white/15 transition-colors">
                    <div className="p-1.5 bg-white/5 text-white/80 mt-0.5">
                      <Server className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/90">Robust Cloud & APIs</h4>
                      <p className="text-[11px] text-white/50 font-light">Scalable REST/GraphQL endpoints, relational databases & real-time sync.</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-white/10 text-center">
                  <div className="p-3 bg-white/[0.02] border border-white/10">
                    <div className="text-lg sm:text-xl font-editorial font-light italic text-white">
                      {profile.experienceYears}+
                    </div>
                    <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] mt-0.5">
                      Years Exp.
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/10">
                    <div className="text-lg sm:text-xl font-editorial font-light italic text-white">
                      {profile.completedProjects}+
                    </div>
                    <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] mt-0.5">
                      Projects
                    </div>
                  </div>

                  <div className="p-3 bg-white/[0.02] border border-white/10">
                    <div className="text-lg sm:text-xl font-editorial font-light italic text-white">
                      {profile.clientSatisfaction}%
                    </div>
                    <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em] mt-0.5">
                      Satisfaction
                    </div>
                  </div>
                </div>

                {/* Footer status notice */}
                <div className="mt-4 pt-3 text-center border-t border-white/5">
                  {showAdminControls && onOpenAddProject ? (
                    <button
                      onClick={onOpenAddProject}
                      className="text-[11px] text-white/50 hover:text-white font-mono inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Need to showcase a new client project?</span>
                      <span className="text-white font-semibold underline underline-offset-2">+ Add here</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                      Available for remote & hybrid engagements worldwide
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack Banner */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-[10px] font-mono font-semibold text-white/40 uppercase tracking-[0.25em] text-center mb-4">
            Technologies & Frameworks
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {topTech.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-[11px] font-mono font-medium text-white/70 bg-white/[0.02] border border-white/10 hover:border-white/30 hover:text-white transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
