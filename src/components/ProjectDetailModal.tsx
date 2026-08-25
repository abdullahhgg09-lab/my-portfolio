import React from 'react';
import { X, ExternalLink, Github, CheckCircle2, Calendar, User, Briefcase, Award, TrendingUp, Layers } from 'lucide-react';
import { Project } from '../types';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectContactWithProject: (projectName: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onSelectContactWithProject,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        id="project-detail-dialog"
        className="relative w-full max-w-4xl bg-[#0E0E0E] border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-project-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/80 hover:bg-black text-white/60 hover:text-white border border-white/20 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Hero Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-[#0E0E0E]/40 to-transparent" />

          {/* Badge Overlays */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.2em] bg-black/80 text-white/90 border border-white/20 backdrop-blur-md">
                {project.category}
              </span>
              {project.featured && (
                <span className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.2em] bg-white text-black font-bold flex items-center gap-1">
                  <Award className="w-3 h-3" /> Featured Record
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-mono uppercase tracking-wider border border-white/20 transition-colors"
                >
                  <Github className="w-3 h-3" />
                  <span>Code</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Header Info */}
          <div>
            <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.3em] mb-1">
              ARCHIVED SPECIFICATION
            </div>
            <h2 className="text-2xl sm:text-4xl font-editorial font-light italic text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1 font-light">
              {project.subtitle}
            </p>
          </div>

          {/* Quick Metadata Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/[0.02] border border-white/10 text-xs font-mono">
            {project.client && (
              <div>
                <span className="text-white/40 uppercase text-[9px] block">
                  Client / Entity:
                </span>
                <span className="text-white/90 mt-0.5 block truncate">{project.client}</span>
              </div>
            )}
            <div>
              <span className="text-white/40 uppercase text-[9px] block">
                Timeline / Year:
              </span>
              <span className="text-white/90 mt-0.5 block">{project.year}</span>
            </div>
            {project.role && (
              <div>
                <span className="text-white/40 uppercase text-[9px] block">
                  Role:
                </span>
                <span className="text-white/90 mt-0.5 block">{project.role}</span>
              </div>
            )}
            {project.metrics && (
              <div>
                <span className="text-white/40 uppercase text-[9px] block">
                  Key Metric:
                </span>
                <span className="text-white/90 mt-0.5 block truncate" title={project.metrics}>
                  {project.metrics}
                </span>
              </div>
            )}
          </div>

          {/* Project Narrative */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" /> Specification & Overview
            </h3>
            <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
              {project.fullDescription || project.description}
            </p>
          </div>

          {/* Key Features */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40">
                Core Deliverables & Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 bg-white/[0.02] border border-white/10 text-xs text-white/70 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-white/40 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges and Solutions */}
          {project.challengesAndSolutions && (
            <div className="p-4 bg-white/[0.02] border border-white/10 space-y-2">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/60">
                Engineering Challenge & Solution
              </h4>
              <p className="text-xs text-white/60 leading-relaxed font-light">
                {project.challengesAndSolutions}
              </p>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-white/40">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-[9px] font-mono text-white/70 bg-white/[0.03] border border-white/10"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-light text-white/50 text-center sm:text-left">
              Interested in building a similar solution for your business?
            </p>
            <button
              onClick={() => {
                onClose();
                onSelectContactWithProject(project.title);
              }}
              className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#E5E5E5] text-black font-bold text-[10px] uppercase tracking-[0.2em] transition-all cursor-pointer"
            >
              Discuss Project Like This
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
