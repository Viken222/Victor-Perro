import React, { useState } from 'react';
import { X, Sparkles, CheckCircle, Tag, Mail, ArrowRight, Eye, Edit3, FileText, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { ProjectItem, PresentationDeck } from '../types';

interface CaseStudyModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onInquire: (projectTitle: string) => void;
  onImagePreview: (url: string, title: string) => void;
  isAdmin?: boolean;
  onEdit?: (project: ProjectItem) => void;
  onOpenPPTDeck?: (deck: PresentationDeck) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  onClose,
  onInquire,
  onImagePreview,
  isAdmin,
  onEdit,
  onOpenPPTDeck,
}) => {
  if (!project) return null;

  const images = (project.galleryImages && project.galleryImages.length > 0)
    ? project.galleryImages
    : [project.coverImage];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const selectedImage = images[currentImgIndex] || project.coverImage;

  const handleNextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative max-h-[90vh] flex flex-col">
        
        {/* Sticky Top Header */}
        <div className="sticky top-0 z-10 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-[#E8E2D9] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="bg-[#1A1A18] text-[#FAF8F5] text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 rounded-full">
              {project.categoryLabel}
            </span>
            {project.referenceCode && (
              <span className="text-xs font-mono text-[#8C857B]">
                Ref: {project.referenceCode}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {project.presentationDeck && onOpenPPTDeck && (
              <button
                onClick={() => onOpenPPTDeck(project.presentationDeck!)}
                className="px-3 py-1.5 rounded-lg bg-[#2A2825] text-[#FAF8F5] hover:bg-[#383531] text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs border border-[#3D3A35]"
                title="View PowerPoint Presentation Deck"
              >
                <FileText className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>View PPT Deck</span>
              </button>
            )}

            {isAdmin && onEdit && (
              <button
                onClick={() => {
                  onClose();
                  onEdit(project);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
                title="Edit this project details"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Case Study</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#EAE4DC] text-[#4A463F] hover:text-[#1A1A18] transition-colors"
              title="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 space-y-8 flex-1">
          
          {/* Title & Metadata Banner */}
          <div className="space-y-3">
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A18] leading-tight">
              {project.title}
            </h2>
            {project.subtitle && (
              <p className="text-sm font-sans text-[#8C6D2D] font-medium">
                {project.subtitle}
              </p>
            )}

            {/* Spec Bar */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#59554E] border-t border-[#E8E2D9]">
              {project.client && (
                <div>
                  <span className="text-[#8C857B]">Client / Context:</span>{' '}
                  <span className="font-medium text-[#1A1A18]">{project.client}</span>
                </div>
              )}
              <div>
                <span className="text-[#8C857B]">Year:</span>{' '}
                <span className="font-medium text-[#1A1A18]">{project.year}</span>
              </div>
              {project.price && (
                <div>
                  <span className="text-[#8C857B]">Valuation / Price:</span>{' '}
                  <span className="font-semibold text-[#8C6D2D]">{project.price}</span>
                </div>
              )}
              {project.dimensions && (
                <div>
                  <span className="text-[#8C857B]">Dimensions:</span>{' '}
                  <span className="font-medium text-[#1A1A18]">{project.dimensions}</span>
                </div>
              )}
            </div>
          </div>

          {/* Presentation Deck Banner Callout */}
          {project.presentationDeck && (
            <div className="bg-[#1A1A18] text-[#FAF8F5] p-4 rounded-2xl border border-[#3A3835] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-[#2A2825] text-[#C5A059] shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                    Included PowerPoint Slide Deck ({project.presentationDeck.slideCount} Slides)
                  </span>
                  <h4 className="font-serif text-base font-medium text-white">
                    {project.presentationDeck.title}
                  </h4>
                  <p className="text-xs text-[#A69F94]">
                    {project.presentationDeck.subtitle || 'Includes technical diagrams, vector guidelines & brand strategy.'}
                  </p>
                </div>
              </div>

              {onOpenPPTDeck && (
                <button
                  onClick={() => onOpenPPTDeck(project.presentationDeck!)}
                  className="px-4 py-2 rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold shrink-0 transition-colors shadow-xs flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Launch PPT Deck Viewer</span>
                </button>
              )}
            </div>
          )}

          {/* Multi-Image Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 bg-[#1A1A18] rounded-xl overflow-hidden group shadow-md flex items-center justify-center">
              <img
                src={selectedImage}
                alt={project.title}
                className="w-full h-full object-contain cursor-pointer"
                onClick={() => onImagePreview(selectedImage, `${project.title} (Image ${currentImgIndex + 1} of ${images.length})`)}
              />

              {/* Image Counter Badge */}
              <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white px-3 py-1 rounded-full text-xs font-mono font-medium">
                Image <strong className="text-[#C5A059]">{currentImgIndex + 1}</strong> of {images.length}
              </div>

              {/* Carousel Next / Prev Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImg}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-all shadow-lg"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImg}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/60 hover:bg-black text-white transition-all shadow-lg"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <button
                onClick={() => onImagePreview(selectedImage, `${project.title} (Image ${currentImgIndex + 1})`)}
                className="absolute bottom-3 right-3 bg-white/80 hover:bg-white text-[#1A1A18] px-3 py-1.5 rounded-md text-xs font-medium backdrop-blur-xs flex items-center space-x-1.5 shadow-md"
              >
                <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Expand Fullscreen</span>
              </button>
            </div>

            {/* Thumbnail Row */}
            {images.length > 1 && (
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImgIndex(idx)}
                    className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      currentImgIndex === idx
                        ? 'border-[#C5A059] ring-2 ring-[#C5A059]/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 right-0 bg-black/70 text-white text-[9px] font-mono px-1">
                      #{idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Narrative Storytelling Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            
            {/* Column 1: The Challenge & Creative Approach */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Design Challenge</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A463F] leading-relaxed font-sans bg-white p-4 rounded-xl border border-[#E8E2D9]">
                  {project.caseStudy.challenge}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Creative Approach & Rationale</span>
                </div>
                <p className="text-xs sm:text-sm text-[#4A463F] leading-relaxed font-sans bg-white p-4 rounded-xl border border-[#E8E2D9]">
                  {project.caseStudy.approach}
                </p>
              </div>
            </div>

            {/* Column 2: Specifications & Outcome */}
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#C5A059]">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Technical & Material Specifications</span>
                </div>
                <ul className="bg-white p-4 rounded-xl border border-[#E8E2D9] space-y-2 text-xs text-[#4A463F]">
                  {project.caseStudy.specifications.map((spec, i) => (
                    <li key={i} className="flex items-start space-x-2">
                      <span className="text-[#C5A059] font-bold mt-0.5">•</span>
                      <span>{spec}</span>
                    </li>
                  ))}
                  {project.materials && (
                    <li className="pt-2 border-t border-[#F0EAE1] text-[#8C857B]">
                      <strong className="text-[#1A1A18]">Materials Used:</strong> {project.materials}
                    </li>
                  )}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs uppercase font-bold tracking-wider text-[#C5A059]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Client Outcome & Impact</span>
                </div>
                <p className="text-xs sm:text-sm text-[#1A1A18] font-medium leading-relaxed bg-[#F2ECE4] p-4 rounded-xl border border-[#E0D5C1]">
                  {project.caseStudy.outcome}
                </p>
              </div>
            </div>

          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <Tag className="w-3.5 h-3.5 text-[#8C857B]" />
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-white border border-[#E8E2D9] text-[#59554E] text-[11px] px-2.5 py-0.5 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="p-4 bg-[#F2ECE4] border-t border-[#E8E2D9] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-[#736E65]">
            Interested in a similar graphic design commission or identity project?
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#59554E] hover:text-[#1A1A18]"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onInquire(project.title);
              }}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#1A1A18] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33312E] transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Inquire About This Work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
