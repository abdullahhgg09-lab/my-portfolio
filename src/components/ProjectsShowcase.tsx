import React, { useState, useMemo } from 'react';
import {
  Search,
  PlusCircle,
  ExternalLink,
  Github,
  Award,
  Layers,
  Edit2,
  Trash2,
  ArrowRight,
  LayoutGrid,
  List,
  RotateCcw,
} from 'lucide-react';
import { Project, ProjectCategory } from '../types';

interface ProjectsShowcaseProps {
  projects: Project[];
  isAdmin?: boolean;
  isVisitorPreview?: boolean;
  onOpenProjectDetail: (project: Project) => void;
  onOpenAddProject: () => void;
  onOpenEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  onResetProjects: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Full-Stack',
  'Web App',
  'Mobile App',
  'AI & ML',
  'UI/UX Design',
];

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projects,
  isAdmin = false,
  isVisitorPreview = false,
  onOpenProjectDetail,
  onOpenAddProject,
  onOpenEditProject,
  onDeleteProject,
  onResetProjects,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showManageControls, setShowManageControls] = useState(false);

  const showAdminTools = isAdmin && !isVisitorPreview;

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === 'All' || project.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        project.title.toLowerCase().includes(query) ||
        project.subtitle.toLowerCase().includes(query) ||
        project.description.toLowerCase().includes(query) ||
        (project.client && project.client.toLowerCase().includes(query)) ||
        project.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchQuery]);

  return (
    <section id="projects" className="py-24 relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-white/40">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full"></span>
              <span>INDEXED CASE STUDIES & ARCHIVES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light italic text-white/95 tracking-tight">
              Selected Works & Deliverables
            </h2>
            <p className="text-white/50 text-xs sm:text-sm max-w-2xl font-light">
              A curated collection of full-stack platforms, client systems, and responsive web products engineered with focus on performance.
            </p>
          </div>

          {/* Action Tools Header */}
          <div className="flex flex-wrap items-center gap-2.5">
            {showAdminTools && (
              <>
                <button
                  id="add-new-project-main-btn"
                  onClick={onOpenAddProject}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-bold tracking-[0.2em] uppercase transition-all cursor-pointer shadow-lg shadow-white/5"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>+ Add Project</span>
                </button>

                <button
                  onClick={() => setShowManageControls(!showManageControls)}
                  className={`px-3 py-2 text-[10px] font-mono tracking-wider uppercase border transition-colors cursor-pointer ${
                    showManageControls
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-white/5 border-white/15 text-white/70 hover:text-white hover:border-white/30'
                  }`}
                  title="Toggle Edit / Delete buttons on project cards"
                >
                  {showManageControls ? 'Done Editing' : 'Quick Manage'}
                </button>
              </>
            )}

            <div className="flex items-center bg-white/5 border border-white/10 p-0.5">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white text-black'
                    : 'text-white/50 hover:text-white'
                }`}
                title="List View"
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-3 bg-[#0E0E0E] border border-white/10 mb-8">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                id={`filter-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 text-[10px] font-mono tracking-widest uppercase whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === category
                    ? 'bg-white text-black font-bold'
                    : 'bg-transparent text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-3.5 h-3.5 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-projects-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search title, tech, client..."
              className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-white/[0.03] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/40 transition-colors font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-[10px] font-mono"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        {/* Results Counter & State */}
        <div className="flex items-center justify-between text-[11px] font-mono text-white/40 mb-6 uppercase tracking-wider">
          <div>
            Showing <span className="text-white font-bold">{filteredProjects.length}</span> / {projects.length} Entries
          </div>
          {showAdminTools && projects.length !== 6 && (
            <button
              onClick={onResetProjects}
              className="inline-flex items-center gap-1 text-white/40 hover:text-white transition-colors text-[10px] font-mono uppercase cursor-pointer"
              title="Restore original sample projects"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Archive</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 px-4 bg-[#0E0E0E] border border-white/10 space-y-4">
            <div className="w-10 h-10 border border-white/20 bg-white/5 text-white/60 flex items-center justify-center mx-auto">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-medium tracking-tight text-white uppercase">No records found</h3>
            <p className="text-xs text-white/50 max-w-sm mx-auto font-light">
              No matching projects for "{searchQuery}" in category "{selectedCategory}".
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="px-4 py-2 text-[10px] font-mono uppercase tracking-wider bg-white/5 hover:bg-white/10 text-white border border-white/15 transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
              {showAdminTools && (
                <button
                  onClick={onOpenAddProject}
                  className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider bg-white hover:bg-[#E5E5E5] text-black transition-colors cursor-pointer"
                >
                  + Add Project
                </button>
              )}
            </div>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                id={`project-card-${project.id}`}
                className="group relative flex flex-col bg-[#0E0E0E] border border-white/10 hover:border-white/30 transition-all duration-300"
              >
                {/* Thumbnail Header */}
                <div
                  className="relative h-52 w-full overflow-hidden bg-black cursor-pointer"
                  onClick={() => onOpenProjectDetail(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-black/40" />

                  {/* Top Bar inside image */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] bg-black/80 text-white/80 border border-white/20 backdrop-blur-md">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.2em] bg-white text-black font-bold flex items-center gap-1">
                        <Award className="w-2.5 h-2.5" /> Featured
                      </span>
                    )}
                  </div>

                  {/* Client & Year Badge */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-white/70">
                    <span className="truncate uppercase">{project.client || 'Client Project'}</span>
                    <span className="px-1.5 py-0.5 bg-black/80 text-white/90 border border-white/10">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] mb-1">
                      NO. {String(index + 1).padStart(2, '0')} / ARCHIVE
                    </div>
                    <h3
                      onClick={() => onOpenProjectDetail(project)}
                      className="text-base font-medium text-white group-hover:text-white/80 transition-colors cursor-pointer line-clamp-1 uppercase tracking-tight"
                    >
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/50 mt-1.5 line-clamp-2 leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  {/* Metrics Badge if exists */}
                  {project.metrics && (
                    <div className="px-2.5 py-1 bg-white/[0.02] border border-white/10 text-[10px] font-mono text-white/80 truncate">
                      ⚡ {project.metrics}
                    </div>
                  )}

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[9px] font-mono text-white/60 bg-white/[0.03] border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2 py-0.5 text-[9px] font-mono text-white/40 bg-white/[0.02]">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenProjectDetail(project)}
                      className="inline-flex items-center gap-1 text-[10px] font-mono tracking-widest uppercase text-white hover:text-white/70 transition-colors cursor-pointer"
                    >
                      <span>Case Study</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>

                    <div className="flex items-center gap-1.5">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      )}

                      {/* Edit / Delete Buttons when managing */}
                      {showAdminTools && showManageControls && (
                        <>
                          <button
                            onClick={() => onOpenEditProject(project)}
                            className="p-1.5 bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors cursor-pointer"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => onDeleteProject(project.id)}
                            className="p-1.5 bg-red-950/60 text-red-300 hover:bg-red-900/80 border border-red-800/40 transition-colors cursor-pointer"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group p-4 sm:p-5 bg-[#0E0E0E] border border-white/10 hover:border-white/30 flex flex-col sm:flex-row items-start sm:items-center gap-5 transition-all"
              >
                <div
                  className="w-full sm:w-44 h-28 overflow-hidden bg-black flex-shrink-0 cursor-pointer"
                  onClick={() => onOpenProjectDetail(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-white/40 uppercase">
                    <span className="px-2 py-0.5 bg-white/5 text-white/80 border border-white/10">
                      {project.category}
                    </span>
                    <span>
                      {project.client} • {project.year}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenProjectDetail(project)}
                    className="text-base font-medium text-white group-hover:text-white/80 transition-colors cursor-pointer uppercase tracking-tight"
                  >
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-1 font-light">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 text-[9px] font-mono text-white/60 bg-white/[0.02] border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onOpenProjectDetail(project)}
                    className="px-3.5 py-1.5 bg-white hover:bg-[#E5E5E5] text-black text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Case Study
                  </button>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {showAdminTools && showManageControls && (
                    <>
                      <button
                        onClick={() => onOpenEditProject(project)}
                        className="p-2 bg-white/10 text-white border border-white/20 cursor-pointer"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onDeleteProject(project.id)}
                        className="p-2 bg-red-950 text-red-300 border border-red-800 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
