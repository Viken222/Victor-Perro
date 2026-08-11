import React from 'react';
import { Sparkles, Eye, MapPin, Grid, Edit3 } from 'lucide-react';
import { ExhibitionConfig } from '../types';

interface ExhibitionSectionProps {
  config: ExhibitionConfig;
  onImagePreview: (url: string, title: string) => void;
  isAdmin?: boolean;
  onOpenEdit?: () => void;
}

export const ExhibitionSection: React.FC<ExhibitionSectionProps> = ({
  config,
  onImagePreview,
  isAdmin,
  onOpenEdit,
}) => {
  return (
    <section id="exhibitions" className="py-20 bg-[#F5F2EC] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{config.subtitle || 'Spatial & Gallery Curation'}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A18]">
              {config.headline}
            </h2>
            <p className="text-sm text-[#59554E]">
              {config.description}
            </p>
          </div>

          <div className="flex flex-col md:items-end space-y-2 shrink-0">
            <div className="text-xs text-[#8C857B] font-mono">
              {config.locationLabel}
            </div>
            {isAdmin && onOpenEdit && (
              <button
                onClick={onOpenEdit}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#33312E] text-xs font-semibold shadow-xs transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Admin Edit Exhibitions</span>
              </button>
            )}
          </div>
        </div>

        {/* Exhibition Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {config.exhibitions.map((item, idx) => (
            <div
              key={item.id || idx}
              className="group relative overflow-hidden rounded-2xl bg-[#1A1A18] aspect-4/3 border border-[#E0D8CE] shadow-md cursor-pointer hover:border-[#C5A059] transition-all"
              onClick={() => onImagePreview(item.url, item.title)}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent p-5 flex flex-col justify-end space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#C5A059]">
                    {item.category}
                  </span>
                  {item.year && (
                    <span className="text-[10px] font-mono text-white/70">
                      {item.year}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-white text-base font-medium leading-snug">
                  {item.title}
                </h3>
                {item.location && (
                  <p className="text-[11px] text-[#A69F94] font-sans truncate">
                    📍 {item.location}
                  </p>
                )}
              </div>
              <div className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-[#1A1A18] opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

