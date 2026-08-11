import React from 'react';
import { ArrowUpRight, Sparkles, Tag, Layers, Eye, Edit3, Trash2, FileText } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onSelect: (p: ProjectItem) => void;
  onImagePreview: (imageUrl: string, title: string) => void;
  isAdmin?: boolean;
  onEdit?: (p: ProjectItem) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onImagePreview,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  return (
    <article className="group bg-white rounded-2xl border border-[#E0D8CE] hover:border-[#C5A059] transition-all duration-300 shadow-xs hover:shadow-xl flex flex-col overflow-hidden relative">
      
      {/* Cover Image Container */}
      <div className="relative aspect-4/3 bg-[#F5F2EC] overflow-hidden">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Top Badges Overlay */}
        <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none">
          <span className="bg-[#1A1A18]/85 backdrop-blur-md text-[#FAF8F5] text-[10px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10">
            {project.categoryLabel}
          </span>

          <div className="flex items-center space-x-1">
            {project.presentationDeck && (
              <span className="bg-[#1A1A18] text-[#C5A059] text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border border-[#C5A059]/40 flex items-center space-x-1 shadow-xs">
                <FileText className="w-3 h-3" />
                <span>PPT Deck</span>
              </span>
            )}

            {project.featured && (
              <span className="bg-[#C5A059] text-white text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs flex items-center space-x-1">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
          </div>
        </div>

        {/* Quick View Button on Image */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onImagePreview(project.coverImage, project.title);
          }}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs p-2 rounded-full text-[#1A1A18] hover:text-[#C5A059] hover:bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md"
          title="Zoom image"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Admin Quick Action Controls */}
        {isAdmin && (
          <div className="absolute bottom-3 left-3 flex items-center space-x-1.5 z-10">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(project);
                }}
                className="bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#C5A059] px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center space-x-1 shadow-md transition-colors"
                title="Edit this project"
              >
                <Edit3 className="w-3 h-3 text-[#C5A059]" />
                <span>Edit Work</span>
              </button>
            )}

            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Delete "${project.title}" from portfolio?`)) {
                    onDelete(project.id);
                  }
                }}
                className="bg-[#991B1B] text-white hover:bg-[#7F1D1D] p-1 rounded-md shadow-md transition-colors"
                title="Delete project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Reference Code & Year */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8C857B]">
            {project.referenceCode && (
              <span>Ref: {project.referenceCode}</span>
            )}
            <span>{project.year}</span>
          </div>

          {/* Project Title */}
          <h3 className="font-serif text-xl font-medium text-[#1A1A18] group-hover:text-[#C5A059] transition-colors leading-snug">
            {project.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-[#59554E] line-clamp-2 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>

        {/* Specs & Pricing Pill Row */}
        <div className="pt-2 border-t border-[#F0EAE1] flex flex-wrap gap-2 text-[11px] text-[#736E65]">
          {project.price && (
            <span className="bg-[#F5F2EC] px-2.5 py-1 rounded-md font-semibold text-[#1A1A18]">
              {project.price}
            </span>
          )}
          {project.materials && (
            <span className="bg-[#F5F2EC] px-2.5 py-1 rounded-md line-clamp-1 max-w-[200px]" title={project.materials}>
              {project.materials}
            </span>
          )}
        </div>

        {/* Trigger Case Study Action */}
        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={() => onSelect(project)}
            className="flex-1 inline-flex items-center justify-between text-xs font-semibold text-[#1A1A18] group-hover:text-[#C5A059] transition-colors"
          >
            <span>View Detailed Case Study</span>
            <div className="w-7 h-7 rounded-full bg-[#FAF8F5] group-hover:bg-[#C5A059] group-hover:text-white flex items-center justify-center transition-colors">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

      </div>

    </article>
  );
};
