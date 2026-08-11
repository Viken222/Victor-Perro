import React, { useState, useEffect } from 'react';
import { X, Sparkles, Check, Edit3, Mail, Phone, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { HeaderConfig } from '../types';

interface EditHeaderContactModalProps {
  isOpen: boolean;
  headerConfig: HeaderConfig;
  onClose: () => void;
  onSaveHeaderConfig: (updated: HeaderConfig) => void;
}

export const EditHeaderContactModal: React.FC<EditHeaderContactModalProps> = ({
  isOpen,
  headerConfig,
  onClose,
  onSaveHeaderConfig,
}) => {
  const [formData, setFormData] = useState<HeaderConfig>(headerConfig);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (headerConfig) {
      setFormData(headerConfig);
    }
  }, [headerConfig, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveHeaderConfig(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#383531]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#2A2825] border border-[#3D3A35] text-[#C5A059]">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-white">
                Edit Website Header & Contact Info
              </h2>
              <p className="text-[11px] text-[#A69F94]">
                Update brand title, contact phone/email, working hours, & availability
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Brand Name Header</label>
              <input
                type="text"
                required
                value={formData.brandName}
                onChange={(e) => setFormData(prev => ({ ...prev, brandName: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-serif font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Sub-Brand / Title</label>
              <input
                type="text"
                required
                value={formData.subBrandName}
                onChange={(e) => setFormData(prev => ({ ...prev, subBrandName: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Hero Tagline & Discipline Overview</label>
            <input
              type="text"
              required
              value={formData.tagline}
              onChange={(e) => setFormData(prev => ({ ...prev, tagline: e.target.value }))}
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Direct Contact Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Direct Phone / WhatsApp</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Location / Studio Base</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#1A1A18]">Working Hours</label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData(prev => ({ ...prev, workingHours: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#1A1A18]">Availability Status Badge</label>
            <input
              type="text"
              value={formData.availabilityStatus}
              onChange={(e) => setFormData(prev => ({ ...prev, availabilityStatus: e.target.value }))}
              placeholder="Open for Freelance & Custom Commissions"
              className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
            />
          </div>

          {/* Footer Controls */}
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
                  <span>Header Config Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Header & Contact Info</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
