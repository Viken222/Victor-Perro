import React, { useState } from 'react';
import { PresentationDeck, PPTSlide } from '../types';
import { Play, ChevronLeft, ChevronRight, Download, FileText, Maximize2, Sparkles, Layers, CheckCircle } from 'lucide-react';

interface PPTDeckViewerProps {
  deck: PresentationDeck;
  onImagePreview?: (url: string, title: string) => void;
}

export const PPTDeckViewer: React.FC<PPTDeckViewerProps> = ({ deck, onImagePreview }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!deck || !deck.slides || deck.slides.length === 0) return null;

  const activeSlide: PPTSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % deck.slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + deck.slides.length) % deck.slides.length);
  };

  return (
    <div className="bg-[#1A1A18] text-[#FAF8F5] rounded-3xl border border-[#3A3835] overflow-hidden shadow-2xl my-8">
      
      {/* Header bar of PPT Viewer */}
      <div className="bg-[#242220] px-5 py-4 border-b border-[#3A3835] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30">
            <PresentationIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded bg-[#C5A059] text-white text-[10px] font-bold tracking-widest uppercase">
                PPT Deck Interactive Viewer
              </span>
              {deck.fileSize && (
                <span className="text-[10px] text-[#A69F94] font-mono">
                  {deck.fileSize}
                </span>
              )}
            </div>
            <h4 className="font-serif text-base font-semibold text-white mt-0.5">
              {deck.title}
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto">
          {deck.pptFileUrl && (
            <a
              href={deck.pptFileUrl}
              download={deck.fileName || 'presentation.pptx'}
              className="px-3 py-1.5 rounded-lg bg-[#33302C] hover:bg-[#423E39] text-[#FAF8F5] text-xs font-semibold transition-colors flex items-center space-x-1.5 border border-[#4D4842]"
              title="Download raw PowerPoint file"
            >
              <Download className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Download PPTX</span>
            </a>
          )}

          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors border flex items-center space-x-1.5 ${
              showNotes
                ? 'bg-[#C5A059] text-white border-[#C5A059]'
                : 'bg-[#2A2825] text-[#A69F94] border-[#3D3A35] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Presenter Notes</span>
          </button>
        </div>

      </div>

      {/* Main Slide Screen */}
      <div className="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-gradient-to-b from-[#1A1A18] to-[#121110]">
        
        {/* Left Column: Interactive Slide Stage */}
        <div className="lg:col-span-8 flex flex-col justify-between space-y-6">
          
          <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-[#242220] border border-[#3D3A35] shadow-2xl flex flex-col justify-between p-6 sm:p-8">
            
            {/* Background Image / Texture if present */}
            {activeSlide.imageUrl && (
              <div className="absolute inset-0 z-0">
                <img
                  src={activeSlide.imageUrl}
                  alt={`Slide ${activeSlide.slideNumber}`}
                  className="w-full h-full object-cover opacity-25 filter blur-xs scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A18] via-[#1A1A18]/80 to-[#1A1A18]/60" />
              </div>
            )}

            {/* Slide Header Info */}
            <div className="relative z-10 flex items-center justify-between border-b border-[#3D3A35] pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase font-bold">
                SLIDE {activeSlide.slideNumber} OF {deck.slides.length}
              </span>
              <span className="text-xs font-serif text-[#A69F94] italic">
                {deck.title}
              </span>
            </div>

            {/* Slide Main Content Zone */}
            <div className="relative z-10 my-4 space-y-4">
              <div>
                {activeSlide.subtitle && (
                  <span className="text-[11px] font-semibold tracking-wider text-[#C5A059] uppercase block">
                    {activeSlide.subtitle}
                  </span>
                )}
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-white mt-1 leading-snug">
                  {activeSlide.title}
                </h3>
              </div>

              {/* Bullet Points */}
              {activeSlide.bulletPoints && activeSlide.bulletPoints.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {activeSlide.bulletPoints.map((bullet, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-[#E8E2D9] leading-relaxed">
                      <span className="text-[#C5A059] font-bold shrink-0 mt-0.5">◆</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Code/Diagram if present */}
              {activeSlide.codeOrDiagram && (
                <pre className="bg-black/80 p-3.5 rounded-xl border border-[#3D3A35] text-[11px] font-mono text-[#D4AF37] whitespace-pre-wrap overflow-x-auto">
                  {activeSlide.codeOrDiagram}
                </pre>
              )}
            </div>

            {/* Slide Footer Navigation Bar */}
            <div className="relative z-10 flex items-center justify-between pt-4 border-t border-[#3D3A35]">
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-lg bg-[#2D2A27] hover:bg-[#3D3A35] text-[#FAF8F5] transition-colors"
                  title="Previous Slide"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2 rounded-lg bg-[#2D2A27] hover:bg-[#3D3A35] text-[#FAF8F5] transition-colors"
                  title="Next Slide"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="text-xs font-mono text-[#A69F94] ml-2">
                  {currentSlideIndex + 1} / {deck.slides.length}
                </span>
              </div>

              {activeSlide.imageUrl && onImagePreview && (
                <button
                  onClick={() => onImagePreview(activeSlide.imageUrl!, `Slide ${activeSlide.slideNumber} - ${activeSlide.title}`)}
                  className="text-xs text-[#C5A059] hover:underline flex items-center space-x-1"
                >
                  <span>Expand Visual Slide</span>
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Presenter Notes Box (Toggleable) */}
          {showNotes && activeSlide.notes && (
            <div className="bg-[#242220] p-4 rounded-xl border border-[#3D3A35] space-y-1 animate-fade-in">
              <span className="text-[10px] font-bold text-[#C5A059] uppercase tracking-wider block">
                📝 Speaker Notes for Slide {activeSlide.slideNumber}
              </span>
              <p className="text-xs text-[#A69F94] italic leading-relaxed">
                "{activeSlide.notes}"
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Slide Thumbnails List */}
        <div className="lg:col-span-4 flex flex-col space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#3D3A35]">
            <span className="text-xs font-bold text-[#A69F94] uppercase tracking-wider flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-[#C5A059]" />
              <span>Slide Deck ({deck.slides.length})</span>
            </span>
            <span className="text-[10px] text-[#A69F94]">Click slide to jump</span>
          </div>

          <div className="space-y-2.5 overflow-y-auto max-h-[420px] pr-1 custom-scrollbar">
            {deck.slides.map((slide, idx) => {
              const isActive = idx === currentSlideIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-start space-x-3 ${
                    isActive
                      ? 'bg-[#C5A059]/15 border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30'
                      : 'bg-[#242220] border-[#3D3A35] hover:bg-[#2A2825] hover:border-[#4D4842]'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                    isActive ? 'bg-[#C5A059] text-white' : 'bg-[#1A1A18] text-[#A69F94]'
                  }`}>
                    {slide.slideNumber}
                  </div>

                  <div className="space-y-0.5 min-w-0 flex-1">
                    <h5 className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-[#E8E2D9]'}`}>
                      {slide.title}
                    </h5>
                    {slide.subtitle && (
                      <p className="text-[10px] text-[#A69F94] truncate">
                        {slide.subtitle}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
};

function PresentationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h20" />
      <path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3" />
      <path d="m7 21 5-5 5 5" />
    </svg>
  );
}
