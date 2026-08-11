import React, { useState, useEffect } from 'react';
import { X, Upload, Camera, Image, Check, RefreshCw, User, Mail, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { OwnerProfile } from '../types';

interface EditOwnerProfileModalProps {
  isOpen: boolean;
  profile: OwnerProfile;
  onClose: () => void;
  onSaveProfile: (updatedProfile: OwnerProfile) => void;
}

const PORTRAIT_PRESETS = [
  {
    label: 'Studio Director Portrait 1',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Creative Designer Portrait 2',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Studio Master Portrait 3',
    url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    label: 'Artistic Craft Portrait 4',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
  },
];

export const EditOwnerProfileModal: React.FC<EditOwnerProfileModalProps> = ({
  isOpen,
  profile,
  onClose,
  onSaveProfile,
}) => {
  const [formData, setFormData] = useState<OwnerProfile>(profile);
  const [activeTab, setActiveTab] = useState<'photo' | 'info'>('photo');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile, isOpen]);

  if (!isOpen) return null;

  // Handle direct file upload from local machine
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPEG, PNG, WEBP, etc.)');
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      setUploadError('Image size exceeds 8MB. Please select a smaller photo or compress it.');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setFormData(prev => ({
          ...prev,
          photoUrl: event.target?.result as string,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDisciplinesChange = (text: string) => {
    const list = text.split(',').map(s => s.trim()).filter(Boolean);
    setFormData(prev => ({ ...prev, disciplines: list }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-3xl border border-[#E0D8CE] shadow-2xl overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#383531]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[#2A2825] border border-[#3D3A35] text-[#C5A059]">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-medium text-white">
                Customize Website Owner Profile & Photo
              </h2>
              <p className="text-[11px] text-[#A69F94]">
                Upload your personal introductory picture & update studio founder details
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

        {/* Modal Tabs */}
        <div className="flex border-b border-[#E0D8CE] bg-[#F2ECE4] px-6 pt-3 space-x-2">
          <button
            type="button"
            onClick={() => setActiveTab('photo')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'photo'
                ? 'bg-[#FAF8F5] text-[#1A1A18] border-[#E0D8CE] shadow-2xs'
                : 'text-[#736E65] hover:text-[#1A1A18] border-transparent'
            }`}
          >
            📸 Introductory Photo
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 text-xs font-semibold rounded-t-xl transition-all border-t border-x ${
              activeTab === 'info'
                ? 'bg-[#FAF8F5] text-[#1A1A18] border-[#E0D8CE] shadow-2xs'
                : 'text-[#736E65] hover:text-[#1A1A18] border-transparent'
            }`}
          >
            👤 Owner Bio & Details
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {activeTab === 'photo' && (
            <div className="space-y-6">
              
              {/* Photo Preview & Upload Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center bg-white p-5 rounded-2xl border border-[#E0D8CE]">
                
                {/* Preview Box */}
                <div className="sm:col-span-5 flex flex-col items-center">
                  <div className="relative w-40 h-48 rounded-xl overflow-hidden bg-[#1A1A18] border-2 border-[#C5A059] shadow-lg group">
                    <img
                      src={formData.photoUrl}
                      alt="Owner preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-[10px] text-white font-semibold bg-black/70 px-2 py-1 rounded">
                        Current Photo
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] text-[#736E65] mt-2 font-mono">
                    Owner Photo Preview
                  </span>
                </div>

                {/* Upload Action Panel */}
                <div className="sm:col-span-7 space-y-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1A1A18]">
                      Option 1: Upload Photo from Your Device
                    </label>
                    <p className="text-[11px] text-[#736E65]">
                      Choose your personal introductory photo file (JPEG, PNG, WEBP).
                    </p>
                  </div>

                  <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#1A1A18] text-white hover:bg-[#33312E] text-xs font-semibold transition-all shadow-sm">
                    <Upload className="w-4 h-4 text-[#C5A059]" />
                    <span>Choose Local Image File</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  {uploadError && (
                    <div className="flex items-center space-x-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{uploadError}</span>
                    </div>
                  )}

                  <hr className="border-[#E0D8CE]" />

                  {/* URL Input */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-[#1A1A18]">
                      Option 2: Paste Image Web URL
                    </label>
                    <input
                      type="url"
                      value={formData.photoUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, photoUrl: e.target.value }))}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] text-xs bg-[#FAF8F5] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059]"
                    />
                  </div>
                </div>

              </div>

              {/* Preset Gallery */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-[#1A1A18]">
                  Option 3: Select Studio Portrait Preset
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {PORTRAIT_PRESETS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, photoUrl: preset.url }))}
                      className={`relative aspect-3/4 rounded-xl overflow-hidden border-2 transition-all ${
                        formData.photoUrl === preset.url
                          ? 'border-[#C5A059] ring-2 ring-[#C5A059]/40 scale-102 shadow-md'
                          : 'border-[#E0D8CE] opacity-80 hover:opacity-100 hover:border-[#8C6D2D]'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      {formData.photoUrl === preset.url && (
                        <div className="absolute top-2 right-2 bg-[#C5A059] text-white p-1 rounded-full shadow-sm">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] p-1 text-center font-medium truncate">
                        {preset.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-4 text-xs">
              
              {/* Row 1: Name & Title */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-[#1A1A18]">Owner Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-[#1A1A18]">Professional Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 2: Location & Experience */}
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
                  <label className="block font-bold text-[#1A1A18]">Years / Experience Badge</label>
                  <input
                    type="text"
                    value={formData.yearsExperience}
                    onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* Row 3: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block font-bold text-[#1A1A18]">Direct Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-[#1A1A18]">Direct Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                  />
                </div>
              </div>

              {/* Bio Textarea */}
              <div className="space-y-1">
                <label className="block font-bold text-[#1A1A18]">Personal Introductory Biography</label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

              {/* Philosophy Quote */}
              <div className="space-y-1">
                <label className="block font-bold text-[#1A1A18]">Owner Philosophy Quote</label>
                <input
                  type="text"
                  value={formData.philosophyQuote}
                  onChange={(e) => setFormData(prev => ({ ...prev, philosophyQuote: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none font-serif italic"
                />
              </div>

              {/* Specializations (Comma Separated) */}
              <div className="space-y-1">
                <label className="block font-bold text-[#1A1A18]">Disciplines & Specializations (comma separated)</label>
                <input
                  type="text"
                  value={formData.disciplines.join(', ')}
                  onChange={(e) => handleDisciplinesChange(e.target.value)}
                  placeholder="Graphic Design, ID Security, Ceramics, Leather..."
                  className="w-full px-3 py-2 rounded-lg border border-[#D5CECE] bg-white text-xs text-[#1A1A18] focus:ring-1 focus:ring-[#C5A059] focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* Modal Footer Controls */}
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
                  <span>Profile Saved Successfully!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Save Owner Profile & Photo</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
