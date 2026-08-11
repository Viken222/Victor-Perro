/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { ProjectCard } from './components/ProjectCard';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AddProjectModal } from './components/AddProjectModal';
import { EditProjectModal } from './components/EditProjectModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { ShareModal } from './components/ShareModal';
import { ContactModal } from './components/ContactModal';
import { PhilosophySection } from './components/PhilosophySection';
import { ExhibitionSection } from './components/ExhibitionSection';
import { OwnerProfileSection } from './components/OwnerProfileSection';
import { EditOwnerProfileModal } from './components/EditOwnerProfileModal';
import { ImageLightbox } from './components/ImageLightbox';
import { PPTViewerModal } from './components/PPTViewerModal';
import { PPTDecksModal } from './components/PPTDecksModal';
import { PPTDecksSection } from './components/PPTDecksSection';
import { EditHeaderContactModal } from './components/EditHeaderContactModal';
import { EditPhilosophyModal } from './components/EditPhilosophyModal';
import { EditExhibitionModal } from './components/EditExhibitionModal';

import { ProjectItem, CategoryType, OwnerProfile, HeaderConfig, PhilosophyConfig, ExhibitionConfig, PresentationDeck } from './types';
import {
  getStoredProjects,
  addProjectToStorage,
  deleteProjectFromStorage,
  updateProjectInStorage,
  resetProjectsToDefault,
  getAdminAuthStatus,
  setAdminAuthStatus,
  getStoredOwnerProfile,
  saveOwnerProfile,
  DEFAULT_OWNER_PROFILE,
  getStoredHeaderConfig,
  saveHeaderConfig,
  DEFAULT_HEADER_CONFIG,
  getStoredPhilosophyConfig,
  savePhilosophyConfig,
  DEFAULT_PHILOSOPHY_CONFIG,
  getStoredExhibitionConfig,
  saveExhibitionConfig,
  DEFAULT_EXHIBITION_CONFIG,
} from './utils/portfolioStorage';
import { PlusCircle, Mail, Phone, Heart, Sparkles, ArrowUp, Lock, ShieldCheck } from 'lucide-react';

export default function App() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Admin Rights State
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);

  // Modals state
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectItem | null>(null);
  const [isCMSOpen, setIsCMSOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [presetInquiryTitle, setPresetInquiryTitle] = useState<string | undefined>(undefined);
  const [lightbox, setLightbox] = useState<{ url: string; title: string } | null>(null);
  const [activePPTDeck, setActivePPTDeck] = useState<PresentationDeck | null>(null);
  const [isPPTHubOpen, setIsPPTHubOpen] = useState(false);

  // Count projects with PPT decks
  const pptProjectsCount = useMemo(() => {
    return projects.filter(p => Boolean(p.presentationDeck)).length;
  }, [projects]);

  // Owner Profile & Editable Sections State
  const [ownerProfile, setOwnerProfile] = useState<OwnerProfile>(DEFAULT_OWNER_PROFILE);
  const [isEditOwnerModalOpen, setIsEditOwnerModalOpen] = useState(false);

  const [headerConfig, setHeaderConfig] = useState<HeaderConfig>(DEFAULT_HEADER_CONFIG);
  const [isEditHeaderOpen, setIsEditHeaderOpen] = useState(false);

  const [philosophyConfig, setPhilosophyConfig] = useState<PhilosophyConfig>(DEFAULT_PHILOSOPHY_CONFIG);
  const [isEditPhilosophyOpen, setIsEditPhilosophyOpen] = useState(false);

  const [exhibitionConfig, setExhibitionConfig] = useState<ExhibitionConfig>(DEFAULT_EXHIBITION_CONFIG);
  const [isEditExhibitionOpen, setIsEditExhibitionOpen] = useState(false);

  // Load stored configs on mount
  useEffect(() => {
    const loaded = getStoredProjects();
    setProjects(loaded);
    setIsAdmin(getAdminAuthStatus());
    setOwnerProfile(getStoredOwnerProfile());
    setHeaderConfig(getStoredHeaderConfig());
    setPhilosophyConfig(getStoredPhilosophyConfig());
    setExhibitionConfig(getStoredExhibitionConfig());
  }, []);

  const handleSaveOwnerProfile = (updated: OwnerProfile) => {
    saveOwnerProfile(updated);
    setOwnerProfile(updated);
  };

  const handleSaveHeaderConfig = (updated: HeaderConfig) => {
    saveHeaderConfig(updated);
    setHeaderConfig(updated);
  };

  const handleSavePhilosophyConfig = (updated: PhilosophyConfig) => {
    savePhilosophyConfig(updated);
    setPhilosophyConfig(updated);
  };

  const handleSaveExhibitionConfig = (updated: ExhibitionConfig) => {
    saveExhibitionConfig(updated);
    setExhibitionConfig(updated);
  };

  // Admin Access Gatekeeper Handler
  const handleOpenCMS = () => {
    if (isAdmin) {
      setIsCMSOpen(true);
    } else {
      setIsAdminAuthOpen(true);
    }
  };

  const handleAuthenticateAdmin = () => {
    setIsAdmin(true);
    setIsAdminAuthOpen(false);
    setIsCMSOpen(true);
  };

  const handleLogoutAdmin = () => {
    setAdminAuthStatus(false);
    setIsAdmin(false);
    setIsCMSOpen(false);
  };

  // Handler functions for Storage / CMS
  const handleAddProject = (newProjData: Omit<ProjectItem, 'id'>) => {
    const created = addProjectToStorage(newProjData);
    setProjects(prev => [created, ...prev]);
  };

  const handleSaveEditedProject = (id: string, updatedData: Partial<ProjectItem>) => {
    const updated = updateProjectInStorage(id, updatedData);
    setProjects(updated);
    setEditingProject(null);
  };

  const handleDeleteProject = (id: string) => {
    const updated = deleteProjectFromStorage(id);
    setProjects(updated);
  };

  const handleToggleFeatured = (id: string, current: boolean) => {
    const updated = updateProjectInStorage(id, { featured: !current });
    setProjects(updated);
  };

  const handleResetDefaults = () => {
    const defaults = resetProjectsToDefault();
    setProjects(defaults);
  };

  const handleOpenInquireForProject = (projectTitle: string) => {
    setPresetInquiryTitle(projectTitle);
    setIsContactOpen(true);
  };

  // Filtered & Sorted Projects
  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      // Category check
      if (activeCategory !== 'all' && p.category !== activeCategory) {
        return false;
      }
      // Search check
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchDesc = p.shortDescription.toLowerCase().includes(q);
        const matchClient = p.client?.toLowerCase().includes(q);
        const matchRef = p.referenceCode?.toLowerCase().includes(q);
        const matchMat = p.materials?.toLowerCase().includes(q);
        const matchTags = p.tags?.some(t => t.toLowerCase().includes(q));
        const matchChallenge = p.caseStudy.challenge.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchClient && !matchRef && !matchMat && !matchTags && !matchChallenge) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'featured') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      }
      if (sortBy === 'newest') {
        return (b.year || '').localeCompare(a.year || '');
      }
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'category') {
        return a.categoryLabel.localeCompare(b.categoryLabel);
      }
      return 0;
    });
  }, [projects, activeCategory, searchQuery, sortBy]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1A18] flex flex-col font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* Header */}
      <Header
        headerConfig={headerConfig}
        onOpenShare={() => setIsShareOpen(true)}
        onOpenCMS={handleOpenCMS}
        onOpenContact={() => {
          setPresetInquiryTitle(undefined);
          setIsContactOpen(true);
        }}
        projectCount={projects.length}
        isAdmin={isAdmin}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onLogoutAdmin={handleLogoutAdmin}
        onOpenEditHeader={() => setIsEditHeaderOpen(true)}
        onOpenPPTHub={() => setIsPPTHubOpen(true)}
        pptCount={pptProjectsCount}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* Editorial Hero */}
        <Hero
          onOpenShare={() => setIsShareOpen(true)}
          onOpenContact={() => {
            setPresetInquiryTitle(undefined);
            setIsContactOpen(true);
          }}
        />

        {/* Website Owner Profile & Introductory Picture Section */}
        <OwnerProfileSection
          profile={ownerProfile}
          isAdmin={isAdmin}
          onOpenEditModal={() => setIsEditOwnerModalOpen(true)}
          onImagePreview={(url, title) => setLightbox({ url, title })}
          onOpenContact={() => {
            setPresetInquiryTitle(undefined);
            setIsContactOpen(true);
          }}
        />

        {/* Filter & Search Bar */}
        <FilterBar
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={filteredProjects.length}
          onOpenPPTHub={() => setIsPPTHubOpen(true)}
          pptCount={pptProjectsCount}
        />

        {/* Case Studies & Portfolio Grid */}
        <section id="case-studies" className="py-16 bg-[#FAF8F5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
              <div className="space-y-1">
                <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
                  Case Studies & Work Showcase
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A18]">
                  Curated Client Graphic Design Portfolio
                </h2>
              </div>

              <button
                onClick={handleOpenCMS}
                className="inline-flex items-center space-x-2 text-xs font-semibold text-[#1A1A18] hover:text-[#C5A059] transition-colors"
              >
                <PlusCircle className="w-4 h-4 text-[#C5A059]" />
                <span>{isAdmin ? '+ Add More Graphic Work' : 'Admin Work Management'}</span>
              </button>
            </div>

            {/* Grid or Empty State */}
            {filteredProjects.length > 0 ? (
              <div id="collections" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map(p => (
                  <ProjectCard
                    key={p.id}
                    project={p}
                    onSelect={setSelectedCaseStudy}
                    onImagePreview={(url, title) => setLightbox({ url, title })}
                    isAdmin={isAdmin}
                    onEdit={(pToEdit) => setEditingProject(pToEdit)}
                    onDelete={handleDeleteProject}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-2xl border border-[#E0D8CE] text-center max-w-lg mx-auto space-y-4">
                <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto" />
                <h3 className="font-serif text-xl font-medium text-[#1A1A18]">
                  No matching projects found
                </h3>
                <p className="text-xs text-[#59554E]">
                  Try clearing your search query or selecting a different discipline filter.
                </p>
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-full bg-[#1A1A18] text-white text-xs font-semibold"
                >
                  Reset Filters
                </button>
              </div>
            )}

          </div>
        </section>

        {/* PPT Decks Exclusive Section */}
        <PPTDecksSection
          projects={projects}
          onOpenDeck={(deck) => setActivePPTDeck(deck)}
          onOpenPPTHub={() => setIsPPTHubOpen(true)}
          onSelectProjectCaseStudy={(p) => setSelectedCaseStudy(p)}
        />

        {/* Design Philosophy Section */}
        <PhilosophySection
          config={philosophyConfig}
          isAdmin={isAdmin}
          onOpenEdit={() => setIsEditPhilosophyOpen(true)}
        />

        {/* Spatial Exhibitions Section */}
        <ExhibitionSection
          config={exhibitionConfig}
          onImagePreview={(url, title) => setLightbox({ url, title })}
          isAdmin={isAdmin}
          onOpenEdit={() => setIsEditExhibitionOpen(true)}
        />

      </main>

      {/* Footer */}
      <footer className="bg-[#1A1A18] text-[#FAF8F5] py-16 border-t border-[#3A3835]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Col 1: Brand */}
            <div className="md:col-span-5 space-y-4">
              <h3 className="font-serif text-2xl font-semibold tracking-wider text-white">
                {headerConfig.brandName || 'KEN PERRO'}
              </h3>
              <p className="text-xs text-[#A69F94] leading-relaxed max-w-sm">
                Graphic design, brand identity, vector ID security systems, ceramics packaging, leather collateral, and spatial exhibition systems. Designed for client link sharing and portfolio presentation.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#C5A059]">
                <a href={`mailto:${headerConfig.contactEmail || 'victorperro619@gmail.com'}`} className="hover:underline font-mono">
                  {headerConfig.contactEmail || 'victorperro619@gmail.com'}
                </a>
                <span>•</span>
                <a href={`tel:${headerConfig.contactPhone || '+254759426509'}`} className="hover:underline font-mono">
                  {headerConfig.contactPhone || '+254 759426509'}
                </a>
              </div>
            </div>

            {/* Col 2: Quick Links */}
            <div className="md:col-span-3 space-y-3 text-xs text-[#A69F94]">
              <h4 className="font-serif font-medium text-white text-sm">
                Graphic Design Disciplines
              </h4>
              <ul className="space-y-2">
                <li><a href="#case-studies" className="hover:text-white">Graphic & Security ID Design</a></li>
                <li><a href="#case-studies" className="hover:text-white">Ceramics Packaging & Branding</a></li>
                <li><a href="#case-studies" className="hover:text-white">Brand Identity & Collateral</a></li>
                <li><a href="#case-studies" className="hover:text-white">Editorial Lookbook & Typography</a></li>
                <li><a href="#exhibitions" className="hover:text-white">Environmental Graphic Systems</a></li>
              </ul>
            </div>

            {/* Col 3: Actions */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="font-serif font-medium text-white text-sm">
                Client Direct Actions & Admin
              </h4>
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => setIsShareOpen(true)}
                  className="w-full text-left px-4 py-2.5 rounded-lg bg-[#2C2A28] hover:bg-[#3A3835] text-xs font-medium text-white transition-all flex items-center justify-between"
                >
                  <span>Share Portfolio Link & QR Code</span>
                  <span className="text-[#C5A059]">→</span>
                </button>

                {isAdmin && (
                  <button
                    onClick={() => setIsEditHeaderOpen(true)}
                    className="w-full text-left px-4 py-2.5 rounded-lg bg-[#2C2A28] hover:bg-[#3A3835] text-xs font-medium text-white transition-all flex items-center justify-between"
                  >
                    <span>Edit Header & Contact Details</span>
                    <span className="text-[#C5A059]">✏️</span>
                  </button>
                )}

                <button
                  onClick={handleOpenCMS}
                  className="w-full text-left px-4 py-2.5 rounded-lg bg-[#2C2A28] hover:bg-[#3A3835] text-xs font-medium text-white transition-all flex items-center justify-between"
                >
                  <span>{isAdmin ? '+ Add New Graphic Work' : 'Admin Work Management'}</span>
                  <span className="text-[#C5A059]">+</span>
                </button>
                <button
                  onClick={() => setIsAdminAuthOpen(true)}
                  className="w-full text-left px-4 py-2.5 rounded-lg bg-[#22211F] hover:bg-[#2C2A28] text-xs font-medium text-[#A69F94] hover:text-white transition-all flex items-center justify-between"
                >
                  <span className="flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{isAdmin ? 'Admin Rights Active (Settings)' : 'Unlock Admin Rights (PIN: 2025)'}</span>
                  </span>
                  <span>🔒</span>
                </button>
                <button
                  onClick={() => {
                    setPresetInquiryTitle(undefined);
                    setIsContactOpen(true);
                  }}
                  className="w-full text-left px-4 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#B38F48] text-xs font-semibold text-white transition-all flex items-center justify-between"
                >
                  <span>Direct Commission / Freelance Inquiry</span>
                  <span>✉</span>
                </button>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-[#2C2A28] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#736E65] gap-4">
            <div>
              © 2021–2025 {headerConfig.brandName || 'Ken Perro'}. All rights reserved.
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center space-x-1.5 hover:text-[#C5A059] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>

        </div>
      </footer>

      {/* Modals & Lightbox */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onInquire={handleOpenInquireForProject}
        onImagePreview={(url, title) => setLightbox({ url, title })}
        isAdmin={isAdmin}
        onEdit={(pToEdit) => setEditingProject(pToEdit)}
        onOpenPPTDeck={(deck) => setActivePPTDeck(deck)}
      />

      <PPTViewerModal
        isOpen={Boolean(activePPTDeck)}
        deck={activePPTDeck}
        onClose={() => setActivePPTDeck(null)}
      />

      <PPTDecksModal
        isOpen={isPPTHubOpen}
        onClose={() => setIsPPTHubOpen(false)}
        projects={projects}
        onOpenDeck={(deck) => {
          setIsPPTHubOpen(false);
          setActivePPTDeck(deck);
        }}
        isAdmin={isAdmin}
        onOpenCMS={handleOpenCMS}
        onSelectProjectCaseStudy={(p) => {
          setIsPPTHubOpen(false);
          setSelectedCaseStudy(p);
        }}
      />

      <AddProjectModal
        isOpen={isCMSOpen}
        onClose={() => setIsCMSOpen(false)}
        onAddProject={handleAddProject}
        existingProjects={projects}
        onDeleteProject={handleDeleteProject}
        onToggleFeatured={handleToggleFeatured}
        onResetDefaults={handleResetDefaults}
        onEditProject={(pToEdit) => setEditingProject(pToEdit)}
      />

      <EditProjectModal
        isOpen={Boolean(editingProject)}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSaveProject={handleSaveEditedProject}
      />

      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAuthenticated={handleAuthenticateAdmin}
        isAdmin={isAdmin}
        onLogoutAdmin={handleLogoutAdmin}
      />

      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        presetProjectTitle={presetInquiryTitle}
      />

      <EditOwnerProfileModal
        isOpen={isEditOwnerModalOpen}
        profile={ownerProfile}
        onClose={() => setIsEditOwnerModalOpen(false)}
        onSaveProfile={handleSaveOwnerProfile}
      />

      <EditHeaderContactModal
        isOpen={isEditHeaderOpen}
        config={headerConfig}
        onClose={() => setIsEditHeaderOpen(false)}
        onSaveConfig={handleSaveHeaderConfig}
      />

      <EditPhilosophyModal
        isOpen={isEditPhilosophyOpen}
        config={philosophyConfig}
        onClose={() => setIsEditPhilosophyOpen(false)}
        onSaveConfig={handleSavePhilosophyConfig}
      />

      <EditExhibitionModal
        isOpen={isEditExhibitionOpen}
        config={exhibitionConfig}
        onClose={() => setIsEditExhibitionOpen(false)}
        onSaveConfig={handleSaveExhibitionConfig}
      />

      <ImageLightbox
        imageUrl={lightbox?.url || null}
        title={lightbox?.title}
        onClose={() => setLightbox(null)}
      />

    </div>
  );
}
