import React, { useState } from 'react';
import { X, Presentation, FileText, Search, Play, Download, Sparkles, PlusCircle, ArrowRight, Layers, Eye } from 'lucide-react';
import { ProjectItem, PresentationDeck } from '../types';

interface PPTDecksModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: ProjectItem[];
  onOpenDeck: (deck: PresentationDeck) => void;
  isAdmin?: boolean;
  onOpenCMS?: () => void;
  onSelectProjectCaseStudy?: (project: ProjectItem) => void;
}

export const PPTDecksModal: React.FC<PPTDecksModalProps> = ({
  isOpen,
  onClose,
  projects,
  onOpenDeck,
  isAdmin,
  onOpenCMS,
  onSelectProjectCaseStudy,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  // Filter projects that have a presentationDeck attached
  const pptProjects = projects.filter((p) => Boolean(p.presentationDeck));

  const filteredDecks = pptProjects.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const deck = p.presentationDeck;
    if (!deck) return false;

    const matchTitle = deck.title.toLowerCase().includes(q);
    const matchSub = deck.subtitle?.toLowerCase().includes(q);
    const matchProj = p.title.toLowerCase().includes(q);
    const matchClient = p.client?.toLowerCase().includes(q);
    const matchCategory = p.categoryLabel.toLowerCase().includes(q);
    const matchSlides = deck.slides.some(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        (s.bulletPoints || []).some((b) => b.toLowerCase().includes(q))
    );

    return matchTitle || matchSub || matchProj || matchClient || matchCategory || matchSlides;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative max-h-[92vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#33312E] shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-[#2A2825] text-[#C5A059] border border-[#3D3A35]">
              <Presentation className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A059] bg-[#2A2825] px-2 py-0.5 rounded border border-[#3D3A35]">
                  Exclusive Portfolio Feature
                </span>
                <span className="text-xs font-mono text-[#A69F94]">
                  {pptProjects.length} Presentation Deck{pptProjects.length === 1 ? '' : 's'} Available
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-white">
                PowerPoint (.PPT / .PPTX) Presentation Hub
              </h2>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {isAdmin && onOpenCMS && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCMS();
                }}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold transition-colors"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>+ Upload / Attach PPT</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-[#F2ECE4] px-6 py-3 border-b border-[#E0D8CE] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C857B]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PPT decks, slide topics, clients..."
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full border border-[#D5CECE] bg-white text-[#1A1A18] focus:outline-none focus:border-[#C5A059]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C857B] hover:text-[#1A1A18]"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs text-[#736E65]">
            Click any deck to open the <strong className="text-[#1A1A18]">Full-Screen Interactive Slide Viewer</strong> with keyboard navigation & speaker notes.
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {filteredDecks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredDecks.map((project) => {
                const deck = project.presentationDeck!;
                return (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-[#E0D8CE] hover:border-[#C5A059] transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col overflow-hidden group"
                  >
                    {/* Top Image Banner */}
                    <div className="relative aspect-16/9 bg-[#1A1A18] overflow-hidden">
                      <img
                        src={project.coverImage}
                        alt={deck.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-between p-4">
                        <div className="flex items-center justify-between">
                          <span className="bg-[#C5A059] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                            {project.categoryLabel}
                          </span>
                          <span className="bg-black/70 text-white text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border border-white/20">
                            {deck.slideCount} SLIDES (.PPTX)
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] block">
                            Project: {project.title}
                          </span>
                          <h3 className="font-serif text-lg font-medium text-white leading-snug truncate">
                            {deck.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        {deck.subtitle && (
                          <p className="text-xs text-[#59554E] font-medium leading-relaxed">
                            {deck.subtitle}
                          </p>
                        )}

                        {/* First 3 Slide Titles Preview */}
                        <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9] space-y-1.5">
                          <span className="text-[10px] uppercase font-bold text-[#8C857B] block font-mono">
                            Key Slide Outlines:
                          </span>
                          <ul className="space-y-1 text-xs text-[#2C2A28]">
                            {deck.slides.slice(0, 3).map((slide, idx) => (
                              <li key={idx} className="flex items-center space-x-2 truncate">
                                <span className="text-[10px] font-mono font-bold text-[#C5A059] w-4">
                                  0{idx + 1}.
                                </span>
                                <span className="truncate">{slide.title}</span>
                              </li>
                            ))}
                            {deck.slides.length > 3 && (
                              <li className="text-[10px] text-[#8C857B] font-mono pt-0.5">
                                + {deck.slides.length - 3} more technical slides...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-2 border-t border-[#F0EAE1] flex flex-col sm:flex-row items-center gap-2">
                        <button
                          onClick={() => onOpenDeck(deck)}
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-xl bg-[#1A1A18] hover:bg-[#33312E] text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors shadow-xs"
                        >
                          <Play className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Launch Slide Viewer</span>
                        </button>

                        {onSelectProjectCaseStudy && (
                          <button
                            onClick={() => {
                              onClose();
                              onSelectProjectCaseStudy(project);
                            }}
                            className="w-full sm:w-auto py-2.5 px-3 rounded-xl bg-[#F2ECE4] hover:bg-[#E0D8CE] text-[#1A1A18] text-xs font-medium flex items-center justify-center space-x-1 transition-colors"
                            title="View full project case study"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Case Study</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white p-12 rounded-2xl border border-[#E0D8CE] text-center max-w-lg mx-auto space-y-4">
              <Presentation className="w-12 h-12 text-[#C5A059] mx-auto" />
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">
                {searchQuery ? 'No presentation decks match search query' : 'No PowerPoint decks uploaded yet'}
              </h3>
              <p className="text-xs text-[#59554E] leading-relaxed">
                {searchQuery
                  ? 'Try searching for a different keyword or topic.'
                  : 'PowerPoint presentations (.ppt / .pptx) can be converted into interactive slide decks via the Admin Work Management modal.'}
              </p>
              {isAdmin && onOpenCMS && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCMS();
                  }}
                  className="px-5 py-2.5 rounded-full bg-[#1A1A18] text-white text-xs font-semibold inline-flex items-center space-x-2"
                >
                  <PlusCircle className="w-4 h-4 text-[#C5A059]" />
                  <span>Upload .PPT / .PPTX Presentation</span>
                </button>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#F2ECE4] px-6 py-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs text-[#736E65]">
          <div>
            Powered by Ken Perro Interactive Presentation Engine.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-[#1A1A18] text-white font-medium hover:bg-[#33312E]"
          >
            Close PPT Hub
          </button>
        </div>

      </div>
    </div>
  );
};
