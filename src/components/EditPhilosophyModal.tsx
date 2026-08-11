import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Edit3, Plus, Trash2 } from 'lucide-react';
import { PhilosophyConfig, PhilosophyPillar } from '../types';

interface EditPhilosophyModalProps {
  isOpen: boolean;
  philosophyConfig: PhilosophyConfig;
  onClose: () => void;
  onSavePhilosophyConfig: (updated: PhilosophyConfig) => void;
}

export const EditPhilosophyModal: React.FC<EditPhilosophyModalProps> = ({
  isOpen,
  philosophyConfig,
  onClose,
  onSavePhilosophyConfig,
}) => {
  const [formData, setFormData] = useState<PhilosophyConfig>(philosophyConfig);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (philosophyConfig) {
      setFormData(philosophyConfig);
    }
  }, [philosophyConfig, isOpen]);

  if (!isOpen) return null;

  const handlePillarChange = (index: number, field: keyof PhilosophyPillar, value: string) => {
    const updatedPillars = [...formData.pillars];
    updatedPillars[index] = { ...updatedPillars[index], [field]: value };
    setFormData(prev => ({ ...prev, pillars: updatedPillars }));
  };

  const handleAddPillar = () => {
    const newPillar: PhilosophyPillar = {
      id: 'p-' + Date.now(),
      title: 'New Craft Pillar',
      description: 'Describe your design philosophy pillar here...',
      iconType: 'sparkles'
    };
    setFormData(prev => ({ ...prev, pillars: [...prev.pillars, newPillar] }));
  };

  const handleDeletePillar = (index: number) => {
    setFormData(prev => ({ ...prev, pillars: prev.pillars.filter((_, i) => i !== index) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSavePhilosophyConfig(formData);
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
                Edit Design Philosophy & Craft Methodology
              </h2>
              <p className="text-[11px] text-[#A69F94]">
                Customize core statements, lead paragraphs, & studio philosophy pillars
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
            <label className="block font-bold text-[#1A1A18]">Section Eyebrow Subtitle</label>
            <input
              type="text"
              required
              value={formData.subtitle}
              onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none uppercase tracking-wider font-bold"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Main Section Headline</label>
            <input
              type="text"
              required
              value={formData.headline}
              onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-serif font-bold text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Lead Philosophy Statement Paragraph</label>
            <textarea
              rows={3}
              required
              value={formData.leadParagraph}
              onChange={(e) => setFormData(prev => ({ ...prev, leadParagraph: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none leading-relaxed"
            />
          </div>

          {/* Pillars List */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between border-b border-[#E0D8CE] pb-2">
              <span className="font-bold text-[#1A1A18] uppercase tracking-wider text-[11px]">
                Philosophy Pillars ({formData.pillars.length})
              </span>
              <button
                type="button"
                onClick={handleAddPillar}
                className="px-3 py-1 rounded-full bg-[#1A1A18] text-white text-[10px] font-semibold flex items-center space-x-1"
              >
                <Plus className="w-3 h-3 text-[#C5A059]" />
                <span>Add Pillar</span>
              </button>
            </div>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {formData.pillars.map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-3 bg-white rounded-xl border border-[#E0D8CE] space-y-2 relative">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => handlePillarChange(idx, 'title', e.target.value)}
                      placeholder="Pillar Title"
                      className="w-full font-bold text-xs text-[#1A1A18] border-b border-transparent focus:border-[#C5A059] focus:outline-none bg-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeletePillar(idx)}
                      className="p-1 rounded text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete Pillar"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={pillar.description}
                    onChange={(e) => handlePillarChange(idx, 'description', e.target.value)}
                    placeholder="Pillar description..."
                    className="w-full text-xs text-[#59554E] p-2 rounded-md bg-[#FAF8F5] border border-[#E0D8CE] focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
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
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Philosophy Section</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
