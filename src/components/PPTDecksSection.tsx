import React from 'react';
import { Presentation, FileText, Play, Download, Sparkles, ArrowRight, Eye } from 'lucide-react';
import { ProjectItem, PresentationDeck } from '../types';

interface PPTDecksSectionProps {
  projects: ProjectItem[];
  onOpenDeck: (deck: PresentationDeck) => void;
  onOpenPPTHub: () => void;
  onSelectProjectCaseStudy?: (project: ProjectItem) => void;
}

export const PPTDecksSection: React.FC<PPTDecksSectionProps> = ({
  projects,
  onOpenDeck,
  onOpenPPTHub,
  onSelectProjectCaseStudy,
}) => {
  // Get all projects with presentation decks
  const pptProjects = projects.filter((p) => Boolean(p.presentationDeck));

  if (pptProjects.length === 0) return null;

  return (
    <section id="ppt-decks-section" className="py-16 bg-[#1A1A18] text-[#FAF8F5] relative overflow-hidden">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#33312E] pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#C5A059] bg-[#2A2825] px-3 py-1 rounded-full border border-[#3D3A35]">
              <Presentation className="w-3.5 h-3.5" />
              <span>Exclusive Presentation Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-white">
              PowerPoint (.PPT / .PPTX) Slide Decks
            </h2>
            <p className="text-xs sm:text-sm text-[#A69F94] max-w-2xl leading-relaxed">
              Explore interactive PowerPoint presentation decks, vector ID security blueprints, ceramics brand strategy decks, and client pitch lookbooks crafted with precise typography and technical diagrams.
            </p>
          </div>

          <button
            onClick={onOpenPPTHub}
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold transition-all shadow-md shrink-0 self-start sm:self-end"
          >
            <span>Open Exclusive PPT Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Presentation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pptProjects.map((project) => {
            const deck = project.presentationDeck!;
            return (
              <div
                key={project.id}
                className="bg-[#22201D] rounded-2xl border border-[#3D3A35] hover:border-[#C5A059] transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group"
              >
                {/* Thumbnail Header */}
                <div className="relative aspect-16/9 bg-[#0D0D0C] overflow-hidden">
                  <img
                    src={project.coverImage}
                    alt={deck.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-70"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#22201D] via-[#22201D]/40 to-transparent p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="bg-[#1A1A18]/90 text-[#C5A059] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border border-[#3D3A35]">
                        {project.categoryLabel}
                      </span>
                      <span className="bg-[#C5A059] text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-full shadow-xs">
                        {deck.slideCount} SLIDES
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-[#A69F94] font-mono block">
                        Client: {project.client || 'Ken Perro Studio'}
                      </span>
                      <h3 className="font-serif text-base font-medium text-white line-clamp-1">
                        {deck.title}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-[#D4CECE] line-clamp-2 leading-relaxed">
                    {deck.subtitle || project.shortDescription}
                  </p>

                  {/* Bullet Summary */}
                  {deck.slides.length > 0 && (
                    <div className="bg-[#181715] p-3 rounded-xl border border-[#2A2825] space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#C5A059] font-mono block">
                        Included Slide Topics:
                      </span>
                      <p className="text-[11px] text-[#A69F94] truncate">
                        • {deck.slides[0]?.title} {deck.slides[1] ? `| • ${deck.slides[1]?.title}` : ''}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 border-t border-[#33312E] flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenDeck(deck)}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Launch PPT Viewer</span>
                    </button>

                    {onSelectProjectCaseStudy && (
                      <button
                        onClick={() => onSelectProjectCaseStudy(project)}
                        className="py-2 px-3 rounded-xl bg-[#2A2825] hover:bg-[#383531] text-[#FAF8F5] text-xs font-medium flex items-center justify-center transition-colors border border-[#3D3A35]"
                        title="View full project details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
