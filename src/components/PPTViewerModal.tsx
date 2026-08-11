import React, { useState, useEffect } from 'react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Download,
  FileText,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  Info,
  Check
} from 'lucide-react';
import { PresentationDeck, PPTSlide } from '../types';

interface PPTViewerModalProps {
  deck: PresentationDeck | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PPTViewerModal: React.FC<PPTViewerModalProps> = ({
  deck,
  isOpen,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setCurrentSlideIndex(0);
    setIsPlaying(false);
  }, [deck, isOpen]);

  // Slideshow timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && deck && deck.slides.length > 0) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % deck.slides.length);
      }, 4000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, deck]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !deck) return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, deck, isFullscreen, onClose]);

  if (!isOpen || !deck || deck.slides.length === 0) return null;

  const currentSlide: PPTSlide = deck.slides[currentSlideIndex] || deck.slides[0];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, deck.slides.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleDownloadDeck = () => {
    if (deck.pptFileUrl) {
      const link = document.createElement('a');
      link.href = deck.pptFileUrl;
      link.download = deck.fileName || `${deck.title.replace(/\s+/g, '_')}.pptx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Generate simulated PPT text document summary download if no raw file URL exists
      const content = `PRESENTATION DECK: ${deck.title}\nSubtitle: ${deck.subtitle || ''}\nFileName: ${deck.fileName || 'Presentation.pptx'}\nTotal Slides: ${deck.slideCount}\n\n` +
        deck.slides.map(s => `SLIDE ${s.slideNumber}: ${s.title}\n${s.subtitle || ''}\nKey Points:\n${(s.bulletPoints || []).map(b => `- ${b}`).join('\n')}\nNotes: ${s.notes || 'N/A'}\n\n`).join('---\n\n');
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = deck.fileName || `${deck.title.replace(/\s+/g, '_')}_Deck_Summary.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden transition-all duration-300 ${isFullscreen ? 'p-0' : ''}`}>
      <div className={`relative w-full ${isFullscreen ? 'h-screen rounded-none' : 'max-w-5xl bg-[#1A1A18] rounded-3xl border border-[#3A3835]'} shadow-2xl overflow-hidden flex flex-col max-h-[95vh]`}>
        
        {/* Top Navigation Bar */}
        <div className="bg-[#111110] text-[#FAF8F5] px-4 sm:px-6 py-3.5 flex items-center justify-between border-b border-[#2C2A28] shrink-0">
          <div className="flex items-center space-x-3 truncate mr-2">
            <div className="p-2 rounded-xl bg-[#2A2825] text-[#C5A059] shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] bg-[#22201D] px-2 py-0.5 rounded border border-[#3D3A35]">
                  PowerPoint Slide Deck
                </span>
                {deck.fileName && (
                  <span className="text-[11px] font-mono text-[#A69F94] hidden sm:inline truncate">
                    {deck.fileName} {deck.fileSize ? `(${deck.fileSize})` : ''}
                  </span>
                )}
              </div>
              <h2 className="font-serif text-base sm:text-lg font-medium text-white truncate">
                {deck.title}
              </h2>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleDownloadDeck}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] text-xs font-semibold transition-colors shadow-xs"
              title="Download PowerPoint Presentation File"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PPT</span>
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 rounded-full hover:bg-[#2C2A28] text-[#A69F94] hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Full Screen' : 'Full Screen Slide Mode'}
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#2C2A28] text-[#A69F94] hover:text-white transition-colors"
              title="Close Presentation Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Presentation Stage */}
        <div className="flex-1 bg-[#0D0D0C] p-4 sm:p-6 overflow-y-auto flex flex-col items-center justify-center relative">
          
          {/* Slide Frame (16:9 Aspect Ratio Container) */}
          <div className="w-full max-w-4xl bg-[#FAF8F5] text-[#1A1A18] rounded-2xl shadow-2xl border border-[#33312E] overflow-hidden flex flex-col md:flex-row aspect-auto md:aspect-16/9 min-h-[360px] relative transition-all">
            
            {/* Slide Graphic / Background Image (If present) */}
            {currentSlide.imageUrl ? (
              <div className="md:w-1/2 bg-[#111110] relative overflow-hidden flex items-center justify-center p-4">
                <img
                  src={currentSlide.imageUrl}
                  alt={currentSlide.title}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                />
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-xs text-[#C5A059] px-2.5 py-1 rounded text-[10px] font-mono font-bold">
                  Slide {currentSlideIndex + 1} Visual Asset
                </div>
              </div>
            ) : null}

            {/* Slide Content Box */}
            <div className={`p-6 sm:p-8 flex flex-col justify-between space-y-6 ${currentSlide.imageUrl ? 'md:w-1/2' : 'w-full'}`}>
              
              {/* Slide Header */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8C6D2D] font-mono font-bold tracking-widest border-b border-[#E0D8CE] pb-2">
                  <span>KEN PERRO PRESENTATION DECK</span>
                  <span>SLIDE {currentSlideIndex + 1} / {deck.slides.length}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A18] leading-snug">
                  {currentSlide.title}
                </h3>

                {currentSlide.subtitle && (
                  <p className="text-xs sm:text-sm font-medium text-[#736E65]">
                    {currentSlide.subtitle}
                  </p>
                )}
              </div>

              {/* Bullet Points List */}
              {currentSlide.bulletPoints && currentSlide.bulletPoints.length > 0 && (
                <div className="space-y-2.5 my-auto">
                  {currentSlide.bulletPoints.map((bullet, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#2C2A28]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-2 shrink-0" />
                      <span className="leading-relaxed">{bullet}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Code or Diagram Snippet (If any) */}
              {currentSlide.codeOrDiagram && (
                <pre className="p-3 rounded-lg bg-[#1A1A18] text-[#C5A059] font-mono text-[11px] overflow-x-auto">
                  <code>{currentSlide.codeOrDiagram}</code>
                </pre>
              )}

              {/* Footer Stamp */}
              <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between text-[10px] text-[#8C857B] font-mono">
                <span>© Ken Perro Design Presentation</span>
                <span>PowerPoint Deck Viewer</span>
              </div>

            </div>

          </div>

          {/* Speaker Notes Box */}
          {showNotes && currentSlide.notes && (
            <div className="w-full max-w-4xl mt-4 p-3.5 bg-[#1F1E1B] text-[#D4CECE] rounded-xl border border-[#3A3835] text-xs flex items-start space-x-2.5 animate-fade-in">
              <Info className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-[#FAF8F5] block font-mono text-[10px] uppercase">
                  Speaker Notes:
                </span>
                <p className="leading-relaxed text-[11px]">{currentSlide.notes}</p>
              </div>
            </div>
          )}

        </div>

        {/* Presentation Controls Bar */}
        <div className="bg-[#111110] px-4 sm:px-6 py-3 border-t border-[#2C2A28] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          {/* Left Controls: Slideshow Play/Pause & Speaker Notes Toggle */}
          <div className="flex items-center space-x-3 text-xs">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                isPlaying ? 'bg-[#C5A059] text-white' : 'bg-[#2A2825] text-[#FAF8F5] hover:bg-[#383531]'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Slideshow' : 'Play Slideshow (4s)'}</span>
            </button>

            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                showNotes ? 'text-[#C5A059] bg-[#22201D] border border-[#383531]' : 'text-[#A69F94] hover:text-white'
              }`}
            >
              Speaker Notes {showNotes ? 'On' : 'Off'}
            </button>
          </div>

          {/* Center: Slide Step Counter & Arrows */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handlePrev}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-full bg-[#2A2825] hover:bg-[#383531] disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
              title="Previous Slide (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-xs font-mono text-[#FAF8F5] tracking-wider">
              Slide <strong className="text-[#C5A059]">{currentSlideIndex + 1}</strong> of {deck.slides.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentSlideIndex === deck.slides.length - 1}
              className="p-2 rounded-full bg-[#2A2825] hover:bg-[#383531] disabled:opacity-30 disabled:pointer-events-none text-white transition-colors"
              title="Next Slide (Right Arrow or Space)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Quick Download */}
          <div className="text-xs text-[#A69F94] hidden md:block">
            Use <kbd className="px-1.5 py-0.5 bg-[#2A2825] text-white rounded font-mono text-[10px]">←</kbd>{' '}
            <kbd className="px-1.5 py-0.5 bg-[#2A2825] text-white rounded font-mono text-[10px]">→</kbd> keys to navigate
          </div>

        </div>

        {/* Bottom Thumbnail Strip */}
        <div className="bg-[#0A0A09] px-4 py-2 border-t border-[#22201D] overflow-x-auto flex items-center space-x-2 shrink-0">
          {deck.slides.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`shrink-0 w-20 h-12 rounded-lg border text-[9px] p-1 text-left flex flex-col justify-between overflow-hidden transition-all ${
                idx === currentSlideIndex
                  ? 'border-[#C5A059] bg-[#22201D] text-white ring-1 ring-[#C5A059]'
                  : 'border-[#2A2825] bg-[#111110] text-[#8C857B] hover:text-white hover:border-[#383531]'
              }`}
            >
              <span className="font-mono text-[#C5A059] font-bold">Slide {idx + 1}</span>
              <span className="truncate font-serif font-medium">{s.title}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
