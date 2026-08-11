import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Edit3, Plus, Trash2, Camera, Upload } from 'lucide-react';
import { ExhibitionConfig, ExhibitionItem } from '../types';
import { compressImage } from '../utils/imageCompressor';

interface EditExhibitionModalProps {
  isOpen: boolean;
  exhibitionConfig: ExhibitionConfig;
  onClose: () => void;
  onSaveExhibitionConfig: (updated: ExhibitionConfig) => void;
}

export const EditExhibitionModal: React.FC<EditExhibitionModalProps> = ({
  isOpen,
  exhibitionConfig,
  onClose,
  onSaveExhibitionConfig,
}) => {
  const [formData, setFormData] = useState<ExhibitionConfig>(exhibitionConfig);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (exhibitionConfig) {
      setFormData(exhibitionConfig);
    }
  }, [exhibitionConfig, isOpen]);

  if (!isOpen) return null;

  const handleExhibitionChange = (index: number, field: keyof ExhibitionItem, value: string) => {
    const updated = [...formData.exhibitions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData(prev => ({ ...prev, exhibitions: updated }));
  };

  const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const compressed = await compressImage(file, 1000, 0.7);
    handleExhibitionChange(index, 'url', compressed);
  };

  const handleAddExhibition = () => {
    const newItem: ExhibitionItem = {
      id: 'ex-' + Date.now(),
      title: 'New Spatial Exhibition',
      category: 'Gallery Graphic & Spatial Systems',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      location: 'Studio Gallery, Nairobi',
      year: '2026',
      description: 'Custom spatial exhibition signage, wall graphics, and installation displays.'
    };
    setFormData(prev => ({ ...prev, exhibitions: [...prev.exhibitions, newItem] }));
  };

  const handleDeleteExhibition = (index: number) => {
    setFormData(prev => ({ ...prev, exhibitions: prev.exhibitions.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveExhibitionConfig(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#383531]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#2A2825] border border-[#3D3A35] text-[#C5A059]">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-white">
                Edit Spatial Exhibitions & Display Systems
              </h2>
              <p className="text-[11px] text-[#A69F94]">
                Manage gallery showcases, venue locations, & exhibition cover images
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#2A2825] text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Eyebrow Subtitle</label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none uppercase tracking-wider font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Section Headline</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-serif font-bold text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Section Description</label>
            <textarea
              rows={2}
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          {/* Exhibitions List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-[#E0D8CE] pb-2">
              <span className="font-bold text-[#1A1A18] uppercase tracking-wider text-[11px]">
                Exhibition Showcases ({formData.exhibitions.length})
              </span>
              <button
                type="button"
                onClick={handleAddExhibition}
                className="px-3 py-1 rounded-full bg-[#1A1A18] text-white text-[10px] font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3 h-3 text-[#C5A059]" />
                <span>Add Exhibition</span>
              </button>
            </div>

            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {formData.exhibitions.map((item, idx) => (
                <div key={item.id || idx} className="p-4 bg-white rounded-2xl border border-[#E0D8CE] space-y-3 relative shadow-2xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center space-x-3 w-full">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#1A1A18] shrink-0 border border-[#C5A059]/40">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        <label className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer text-white">
                          <Camera className="w-4 h-4" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(idx, e)}
                            className="hidden"
                          />
                        </label>
                      </div>

                      <div className="space-y-1 w-full">
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleExhibitionChange(idx, 'title', e.target.value)}
                          placeholder="Exhibition Title"
                          className="w-full font-serif font-bold text-xs text-[#1A1A18] border-b border-[#E0D8CE] focus:border-[#C5A059] focus:outline-none"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={item.location || ''}
                            onChange={(e) => handleExhibitionChange(idx, 'location', e.target.value)}
                            placeholder="Venue Location"
                            className="text-[10px] bg-[#FAF8F5] p-1.5 rounded border border-[#E0D8CE] focus:outline-none"
                          />
                          <input
                            type="text"
                            value={item.year || ''}
                            onChange={(e) => handleExhibitionChange(idx, 'year', e.target.value)}
                            placeholder="Year (e.g. 2026)"
                            className="text-[10px] bg-[#FAF8F5] p-1.5 rounded border border-[#E0D8CE] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteExhibition(idx)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete Exhibition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <input
                    type="text"
                    value={item.description || ''}
                    onChange={(e) => handleExhibitionChange(idx, 'description', e.target.value)}
                    placeholder="Short description of spatial graphics or display arrangement..."
                    className="w-full text-xs text-[#59554E] p-2 rounded-lg bg-[#FAF8F5] border border-[#E0D8CE] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-[#E0D8CE] flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#D5CECE] bg-white hover:bg-[#F2ECE4] text-xs font-semibold text-[#1A1A18] transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#33312E] text-xs font-semibold transition-all shadow-md flex items-center space-x-2"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 text-[#C5A059]" />
                  <span>Exhibitions Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Spatial Exhibitions</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
