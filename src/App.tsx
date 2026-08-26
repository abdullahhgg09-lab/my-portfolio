import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsSection } from './components/SkillsSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectEditorModal } from './components/ProjectEditorModal';
import { ProfileEditorModal } from './components/ProfileEditorModal';
import { InquiriesModal } from './components/InquiriesModal';
import { PhotoLightboxModal } from './components/PhotoLightboxModal';
import { AdminTopBar } from './components/AdminTopBar';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboard } from './components/AdminDashboard';

import {
  initialProfile,
  initialProjects,
  initialSkillCategories,
  initialServices,
  initialTestimonials,
  initialInquiries,
} from './data/initialData';
import { Profile, Project, ContactInquiry } from './types';

const STORAGE_KEYS = {
  PROJECTS: 'abdullah_portfolio_projects_v1',
  PROFILE: 'abdullah_portfolio_profile_v1',
  INQUIRIES: 'abdullah_portfolio_inquiries_v1',
  ADMIN_AUTH: 'abdullah_portfolio_admin_auth_v1',
  ADMIN_PIN: 'abdullah_portfolio_admin_pin_v1',
};

export default function App() {
  // --- Persistent Portfolio State ---
  const [profile, setProfile] = useState<Profile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure new WhatsApp number is synced if old dummy number existed
        if (parsed.whatsapp === '+923001234567' || !parsed.whatsapp) {
          parsed.whatsapp = '+923001424623';
          parsed.phone = '+92 300 1424623';
        }
        // Ensure new photo is synced if old unsplash placeholder existed
        if (!parsed.avatarUrl || parsed.avatarUrl.includes('unsplash.com/photo-1534528741775-53994a69daeb')) {
          parsed.avatarUrl = '/avatar.jpg';
        }
        return parsed;
      }
      return initialProfile;
    } catch {
      return initialProfile;
    }
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  // --- Admin Authentication & Access State ---
  const [adminPin, setAdminPin] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_PIN);
      if (!saved || saved === 'admin123') {
        return 'dawood';
      }
      return saved;
    } catch {
      return 'dawood';
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Toggle to view site exactly as a visitor even when logged in as admin
  const [isVisitorPreview, setIsVisitorPreview] = useState<boolean>(false);

  // --- Modals State ---
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [selectedDetailProject, setSelectedDetailProject] = useState<Project | null>(null);
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);
  const [isInquiriesModalOpen, setIsInquiriesModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  // --- Form Prefill Triggers ---
  const [prefilledSubject, setPrefilledSubject] = useState<string>('');
  const [prefilledService, setPrefilledService] = useState<string>('');

  // Persist State Changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed saving profile', e);
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error('Failed saving projects', e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error('Failed saving inquiries', e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_PIN, adminPin);
    } catch (e) {
      console.error('Failed saving admin pin', e);
    }
  }, [adminPin]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, String(isAdminAuthenticated));
    } catch (e) {
      console.error('Failed saving admin auth state', e);
    }
  }, [isAdminAuthenticated]);

  // --- Admin Authentication Handlers ---
  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsAdminAuthModalOpen(false);
    setIsVisitorPreview(false);
    setIsAdminDashboardOpen(true);
  };

  const handleLogout = () => {
    setIsAdminAuthenticated(false);
    setIsVisitorPreview(false);
    setIsAdminDashboardOpen(false);
  };

  const handleChangeAdminPin = (newPin: string) => {
    setAdminPin(newPin);
  };

  const handleResetPinToDefault = () => {
    setAdminPin('dawood');
  };

  const handleToggleVisitorPreview = () => {
    setIsVisitorPreview((prev) => !prev);
  };

  // --- Project CRUD Handlers ---
  const handleOpenAddProject = () => {
    setProjectToEdit(null);
    setIsProjectEditorOpen(true);
  };

  const handleOpenEditProject = (project: Project) => {
    setProjectToEdit(project);
    setIsProjectEditorOpen(true);
  };

  const handleSaveProject = (savedProject: Project) => {
    setProjects((prev) => {
      const existingIdx = prev.findIndex((p) => p.id === savedProject.id);
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx] = savedProject;
        return updated;
      } else {
        return [savedProject, ...prev];
      }
    });
  };

  const handleDeleteProject = (projectId: string) => {
    if (window.confirm('Are you sure you want to remove this project from your portfolio?')) {
      setProjects((prev) => prev.filter((p) => p.id !== projectId));
    }
  };

  const handleToggleFeatureProject = (projectId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return { ...p, featured: !p.featured };
        }
        return p;
      })
    );
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset all projects back to the initial sample projects?')) {
      setProjects(initialProjects);
    }
  };

  // --- Profile & Inquiry Handlers ---
  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleNewInquiry = (newInquiry: ContactInquiry) => {
    setInquiries((prev) => [newInquiry, ...prev]);
  };

  const handleDeleteInquiry = (inquiryId: string) => {
    setInquiries((prev) => prev.filter((i) => i.id !== inquiryId));
  };

  const handleToggleInquiryStatus = (inquiryId: string) => {
    setInquiries((prev) =>
      prev.map((i) => {
        if (i.id === inquiryId) {
          const nextStatus = i.status === 'replied' ? 'new' : 'replied';
          return { ...i, status: nextStatus };
        }
        return i;
      })
    );
  };

  const handleClearAllInquiries = () => {
    if (window.confirm('Are you sure you want to clear all inquiries?')) {
      setInquiries([]);
    }
  };

  // --- Contact Prefill Handlers ---
  const handleSelectContactWithProject = (projectName: string) => {
    setPrefilledSubject(projectName);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setPrefilledService(serviceTitle);
    const contactElement = document.getElementById('contact');
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F0F0F0] selection:bg-white selection:text-black font-sans">
      {/* 1. Admin Top Bar (Visible only when Owner is authenticated) */}
      <AdminTopBar
        profile={profile}
        isAdmin={isAdminAuthenticated}
        isVisitorPreview={isVisitorPreview}
        unreadInquiriesCount={unreadInquiriesCount}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenAddProject={handleOpenAddProject}
        onOpenEditProfile={() => setIsProfileEditorOpen(true)}
        onOpenInquiries={() => setIsInquiriesModalOpen(true)}
        onToggleVisitorPreview={handleToggleVisitorPreview}
        onLogout={handleLogout}
      />

      {/* 2. Public / Main Navigation Bar */}
      <Navbar
        profile={profile}
        isAdmin={isAdminAuthenticated}
        isVisitorPreview={isVisitorPreview}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenAddProject={handleOpenAddProject}
        onOpenEditProfile={() => setIsProfileEditorOpen(true)}
        inquiriesCount={unreadInquiriesCount}
        onOpenInquiries={() => setIsInquiriesModalOpen(true)}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
      />

      {/* 3. Main Portfolio Content Sections */}
      <main id="main-content">
        {/* Hero Section */}
        <Hero
          profile={profile}
          isAdmin={isAdminAuthenticated}
          isVisitorPreview={isVisitorPreview}
          onOpenAddProject={handleOpenAddProject}
          onOpenEditProfile={() => setIsProfileEditorOpen(true)}
          onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        />

        {/* Selected Works & Deliverables Showcase */}
        <ProjectsShowcase
          projects={projects}
          isAdmin={isAdminAuthenticated}
          isVisitorPreview={isVisitorPreview}
          onOpenProjectDetail={(proj) => setSelectedDetailProject(proj)}
          onOpenAddProject={handleOpenAddProject}
          onOpenEditProject={handleOpenEditProject}
          onDeleteProject={handleDeleteProject}
          onResetProjects={handleResetProjects}
        />

        {/* Technical Stack & Capabilities */}
        <SkillsSection skillCategories={initialSkillCategories} />

        {/* Services & Engagement Models */}
        <ServicesSection
          services={initialServices}
          onSelectService={handleSelectService}
        />

        {/* Client Endorsements & Testimonials */}
        <TestimonialsSection testimonials={initialTestimonials} />

        {/* Professional Direct Contact & Inquiries Form */}
        <ContactSection
          profile={profile}
          isAdmin={isAdminAuthenticated}
          isVisitorPreview={isVisitorPreview}
          prefilledSubject={prefilledSubject}
          prefilledService={prefilledService}
          onNewInquiry={handleNewInquiry}
          onOpenInquiries={() => setIsInquiriesModalOpen(true)}
          inquiriesCount={inquiries.length}
        />
      </main>

      {/* 4. Portfolio Footer with Owner Portal Trigger */}
      <Footer
        profile={profile}
        isAdmin={isAdminAuthenticated}
        isVisitorPreview={isVisitorPreview}
        onOpenAdminAuth={() => setIsAdminAuthModalOpen(true)}
        onOpenDashboard={() => setIsAdminDashboardOpen(true)}
        onOpenAddProject={handleOpenAddProject}
        onOpenEditProfile={() => setIsProfileEditorOpen(true)}
        onLogout={handleLogout}
      />

      {/* ================= MODALS & OVERLAYS ================= */}

      {/* A. Case Study Detail Modal (Public) */}
      <ProjectDetailModal
        project={selectedDetailProject}
        onClose={() => setSelectedDetailProject(null)}
        onSelectContactWithProject={handleSelectContactWithProject}
      />

      {/* B. Add / Edit Project Modal */}
      <ProjectEditorModal
        isOpen={isProjectEditorOpen}
        projectToEdit={projectToEdit}
        onClose={() => {
          setIsProjectEditorOpen(false);
          setProjectToEdit(null);
        }}
        onSave={handleSaveProject}
      />

      {/* C. Profile & Bio Editor Modal */}
      <ProfileEditorModal
        isOpen={isProfileEditorOpen}
        profile={profile}
        onClose={() => setIsProfileEditorOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* C2. High-Res Photo Lightbox Modal (For Visitors & Owner) */}
      <PhotoLightboxModal
        isOpen={isPhotoModalOpen}
        profile={profile}
        onClose={() => setIsPhotoModalOpen(false)}
      />

      {/* D. Client Inquiries Quick Modal */}
      <InquiriesModal
        isOpen={isInquiriesModalOpen}
        inquiries={inquiries}
        onClose={() => setIsInquiriesModalOpen(false)}
        onDeleteInquiry={handleDeleteInquiry}
        onToggleStatus={handleToggleInquiryStatus}
        onClearAll={handleClearAllInquiries}
      />

      {/* E. Admin Authentication Modal (Protected PIN Access) */}
      <AdminAuthModal
        isOpen={isAdminAuthModalOpen}
        onClose={() => setIsAdminAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        adminPin={adminPin}
        onResetPinToDefault={handleResetPinToDefault}
      />

      {/* F. Comprehensive Admin Studio Dashboard */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => setIsAdminDashboardOpen(false)}
        profile={profile}
        projects={projects}
        inquiries={inquiries}
        onSaveProfile={handleSaveProfile}
        onOpenAddProject={handleOpenAddProject}
        onOpenEditProject={handleOpenEditProject}
        onDeleteProject={handleDeleteProject}
        onToggleFeatureProject={handleToggleFeatureProject}
        onResetProjects={handleResetProjects}
        onDeleteInquiry={handleDeleteInquiry}
        onToggleInquiryStatus={handleToggleInquiryStatus}
        onClearAllInquiries={handleClearAllInquiries}
        adminPin={adminPin}
        onChangePin={handleChangeAdminPin}
        onLogout={handleLogout}
        onOpenPublicPreview={() => {
          setIsAdminDashboardOpen(false);
          setIsVisitorPreview(true);
        }}
      />
    </div>
  );
}
