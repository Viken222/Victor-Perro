import React from 'react';
import { Sparkles, Compass, ShieldCheck, HeartHandshake, PenTool, Layers, Edit3 } from 'lucide-react';
import { PhilosophyConfig } from '../types';

interface PhilosophySectionProps {
  config: PhilosophyConfig;
  isAdmin?: boolean;
  onOpenEdit?: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  config,
  isAdmin,
  onOpenEdit,
}) => {
  const renderIcon = (type: string) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5" />;
      case 'handshake':
        return <HeartHandshake className="w-5 h-5" />;
      case 'pen':
        return <PenTool className="w-5 h-5" />;
      case 'layers':
        return <Layers className="w-5 h-5" />;
      case 'sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'compass':
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  return (
    <section id="philosophy" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{config.subtitle || 'Design Philosophy & Heritage'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A18] leading-tight">
              {config.headline}
            </h2>
            <p className="text-sm text-[#59554E] leading-relaxed">
              {config.leadParagraph}
            </p>
          </div>

          {isAdmin && onOpenEdit && (
            <button
              onClick={onOpenEdit}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#33312E] text-xs font-semibold shadow-xs transition-colors shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Admin Edit Philosophy</span>
            </button>
          )}
        </div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {config.pillars.map((pillar) => (
            <div key={pillar.id} className="bg-white p-6 rounded-2xl border border-[#E0D8CE] space-y-4 shadow-xs hover:border-[#C5A059] transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#F2ECE4] text-[#C5A059] flex items-center justify-center">
                {renderIcon(pillar.iconType)}
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A18]">
                {pillar.title}
              </h3>
              <p className="text-xs text-[#59554E] leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

