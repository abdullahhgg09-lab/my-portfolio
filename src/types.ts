export type ProjectCategory = 'All' | 'Full-Stack' | 'Web App' | 'Mobile App' | 'AI & ML' | 'UI/UX Design';

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Full-Stack' | 'Web App' | 'Mobile App' | 'AI & ML' | 'UI/UX Design';
  tags: string[];
  description: string;
  fullDescription?: string;
  challengesAndSolutions?: string;
  keyFeatures?: string[];
  image: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  client?: string;
  year: string;
  role?: string;
  metrics?: string;
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  iconName: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    experience: string;
  }[];
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  shortBio: string;
  fullBio: string;
  email: string;
  phone: string;
  whatsapp: string;
  location: string;
  experienceYears: number;
  completedProjects: number;
  clientSatisfaction: number;
  availableForWork: boolean;
  avatarUrl: string;
  resumeUrl?: string;
  socialLinks: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  timeline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  text: string;
  projectTitle: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  company?: string;
  serviceType: string;
  budget: string;
  timeline: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'replied';
}
