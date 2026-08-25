import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Image, Sparkles, Check, AlertCircle, Link2, FolderPlus, Tag } from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectEditorModalProps {
  isOpen: boolean;
  projectToEdit?: Project | null;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const CATEGORIES: ProjectCategory[] = ['Full-Stack', 'Web App', 'Mobile App', 'AI & ML', 'UI/UX Design'];

const PRESET_IMAGES = [
  { label: 'SaaS Analytics Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80' },
  { label: 'AI Generative Canvas', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80' },
  { label: 'FinTech Banking & Crypto', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Modern E-Commerce Store', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Healthcare & Telehealth', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Design System & UI Kit', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Mobile App Showcase', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80' },
  { label: 'Cloud Infrastructure Portal', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80' },
];

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  projectToEdit,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    subtitle: '',
    category: 'Full-Stack',
    tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    description: '',
    fullDescription: '',
    challengesAndSolutions: '',
    keyFeatures: ['Modern, responsive user interface', 'Fast API response times & optimized database queries', 'Secure authentication and data persistence'],
    image: PRESET_IMAGES[0].url,
    liveUrl: '',
    githubUrl: '',
    client: '',
    year: new Date().getFullYear().toString(),
    role: 'Lead Developer',
    metrics: '',
    featured: false,
  });

  const [tagInput, setTagInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        ...projectToEdit,
        keyFeatures: projectToEdit.keyFeatures || [],
      });
    } else {
      setFormData({
        title: '',
        subtitle: '',
        category: 'Full-Stack',
        tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
        description: '',
        fullDescription: '',
        challengesAndSolutions: '',
        keyFeatures: ['Modern, responsive user interface', 'Fast API response times & optimized database queries', 'Secure authentication and data persistence'],
        image: PRESET_IMAGES[0].url,
        liveUrl: '',
        githubUrl: '',
        client: '',
        year: new Date().getFullYear().toString(),
        role: 'Lead Developer',
        metrics: '',
        featured: false,
      });
    }
    setError('');
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    const currentTags = formData.tags || [];
    if (!currentTags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...currentTags, tagInput.trim()] });
    }
    setTagInput('');
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: (formData.tags || []).filter((t) => t !== tagToRemove),
    });
  };

  const handleAddFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeatures = formData.keyFeatures || [];
    setFormData({ ...formData, keyFeatures: [...currentFeatures, featureInput.trim()] });
    setFeatureInput('');
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      keyFeatures: (formData.keyFeatures || []).filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setError('Project Title is required');
      return;
    }
    if (!formData.description?.trim()) {
      setError('Project Short Description is required');
      return;
    }

    const newProject: Project = {
      id: projectToEdit ? projectToEdit.id : `proj-${Date.now()}`,
      title: formData.title.trim(),
      subtitle: formData.subtitle?.trim() || formData.title.trim(),
      category: (formData.category as Project['category']) || 'Full-Stack',
      tags: formData.tags && formData.tags.length > 0 ? formData.tags : ['TypeScript', 'React'],
      description: formData.description.trim(),
      fullDescription: formData.fullDescription?.trim() || formData.description.trim(),
      challengesAndSolutions: formData.challengesAndSolutions?.trim() || '',
      keyFeatures: formData.keyFeatures || [],
      image: formData.image || PRESET_IMAGES[0].url,
      liveUrl: formData.liveUrl?.trim() || '',
      githubUrl: formData.githubUrl?.trim() || '',
      client: formData.client?.trim() || 'Client Project',
      year: formData.year?.trim() || new Date().getFullYear().toString(),
      role: formData.role?.trim() || 'Full-Stack Developer',
      metrics: formData.metrics?.trim() || '',
      featured: !!formData.featured,
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        id="project-editor-modal"
        className="relative w-full max-w-3xl bg-[#0E0E0E] border border-white/10 shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0E0E0E]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-white/5 text-white/80 border border-white/10">
              <FolderPlus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-[0.25em]">CATALOG MANAGER</div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-white">
                {projectToEdit ? 'Edit Archive Record' : 'Create New Project Record'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/40 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-8 space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Project Title <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. HealthVibe - Telemedicine & Patient Portal"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
                required
              />
            </div>

            <div className="sm:col-span-4 space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Project['category'] })}
                className="w-full px-3 py-2 text-xs font-mono bg-[#0E0E0E] border border-white/10 text-white focus:outline-none focus:border-white/40 cursor-pointer"
              >
                {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                  <option key={cat} value={cat} className="bg-[#0E0E0E] text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subtitle */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Short Tagline / Subtitle
            </label>
            <input
              type="text"
              value={formData.subtitle || ''}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="e.g. Real-time patient appointment booking and HIPAA video calls"
              className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Card Overview / Summary <span className="text-orange-400">*</span>
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief summary displayed on project card..."
              className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              required
            />
          </div>

          {/* Full Case Study Description */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Detailed Case Study & Architecture (Optional)
            </label>
            <textarea
              rows={3}
              value={formData.fullDescription || ''}
              onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
              placeholder="Full case study explanation for the detail popup..."
              className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
            />
          </div>

          {/* Thumbnail / Image Selector */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 flex items-center justify-between">
              <span>Cover Image Selection</span>
              <span className="text-[9px] text-white/40">Select preset or paste URL</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_IMAGES.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData({ ...formData, image: preset.url })}
                  className={`relative overflow-hidden border text-left p-1 transition-all ${
                    formData.image === preset.url
                      ? 'border-white bg-white/10'
                      : 'border-white/10 hover:border-white/30 bg-white/[0.02]'
                  }`}
                >
                  <img src={preset.url} alt={preset.label} className="w-full h-12 object-cover filter grayscale" />
                  <p className="text-[9px] font-mono text-white/70 truncate mt-1 px-0.5">
                    {preset.label}
                  </p>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="url"
                value={formData.image || ''}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="Or paste custom image URL (https://...)"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Links: Live Demo & GitHub */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1">
                <Link2 className="w-3 h-3 text-white/60" /> Live Demo URL (Optional)
              </label>
              <input
                type="url"
                value={formData.liveUrl || ''}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://your-demo-app.com"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60 flex items-center gap-1">
                <Link2 className="w-3 h-3 text-white/60" /> GitHub Repository (Optional)
              </label>
              <input
                type="url"
                value={formData.githubUrl || ''}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/project"
                className="w-full px-3.5 py-2 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Client, Year, Role & Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">Client / Org</label>
              <input
                type="text"
                value={formData.client || ''}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                placeholder="Acme Corp"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">Year</label>
              <input
                type="text"
                value={formData.year || ''}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                placeholder="2025"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">Your Role</label>
              <input
                type="text"
                value={formData.role || ''}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Lead Developer"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">Key Metric</label>
              <input
                type="text"
                value={formData.metrics || ''}
                onChange={(e) => setFormData({ ...formData, metrics: e.target.value })}
                placeholder="+45% Speed"
                className="w-full px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white focus:outline-none focus:border-white/40"
              />
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Tech Stack Badges
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Type tech (e.g. Next.js, Redis) & press Enter"
                className="flex-1 px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-3 py-1.5 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {(formData.tags || []).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-mono bg-white/5 text-white/80 border border-white/10"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-white transition-colors"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Key Features List */}
          <div className="space-y-2">
            <label className="block text-[10px] font-mono uppercase tracking-wider text-white/60">
              Key Features / Deliverables
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddFeature();
                  }
                }}
                placeholder="Add a key feature or milestone..."
                className="flex-1 px-3 py-1.5 text-xs font-mono bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/15 text-white text-[10px] font-mono uppercase tracking-wider cursor-pointer"
              >
                + Add
              </button>
            </div>

            <div className="space-y-1.5">
              {(formData.keyFeatures || []).map((feat, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white/[0.02] border border-white/10 text-xs font-mono text-white/70">
                  <span className="truncate">{feat}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="text-white/40 hover:text-white p-1"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3 p-3 bg-white/[0.02] border border-white/10">
            <input
              type="checkbox"
              id="featured-checkbox"
              checked={formData.featured || false}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 bg-black border-white/20 text-white focus:ring-0 cursor-pointer"
            />
            <label htmlFor="featured-checkbox" className="text-xs font-mono text-white/70 cursor-pointer">
              <span className="font-bold text-white uppercase">Feature this project</span> (Prioritizes at top of showcase)
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
              {projectToEdit ? 'Save Record' : 'Publish Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
