import React, { useState } from 'react';
import { User, Camera, Upload, Edit3, Mail, Phone, MapPin, Award, Sparkles, CheckCircle2, Quote, Eye } from 'lucide-react';
import { OwnerProfile } from '../types';

interface OwnerProfileSectionProps {
  profile: OwnerProfile;
  isAdmin: boolean;
  onOpenEditModal: () => void;
  onImagePreview: (url: string, title: string) => void;
  onOpenContact: () => void;
}

export const OwnerProfileSection: React.FC<OwnerProfileSectionProps> = ({
  profile,
  isAdmin,
  onOpenEditModal,
  onImagePreview,
  onOpenContact,
}) => {
  return (
    <section id="owner-profile" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D9] relative overflow-hidden">
      
      {/* Subtle Background Accent Lines */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#1A1A18_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#E8E2D9] pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 text-xs uppercase font-bold tracking-widest text-[#C5A059]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Meet The Studio Founder & Owner</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1A1A18]">
              About {profile.name}
            </h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={onOpenEditModal}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#33312E] text-xs font-semibold transition-all shadow-sm"
              title="Change owner picture, bio, and details"
            >
              <Camera className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{isAdmin ? 'Edit Owner Picture & Profile' : 'Update Owner Photo & Profile'}</span>
            </button>
          </div>
        </div>

        {/* Profile Card Layout */}
        <div className="bg-white rounded-3xl border border-[#E0D8CE] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 sm:p-10 items-center">
          
          {/* Column 1: Personal Introductory Picture Staging */}
          <div className="lg:col-span-5 relative group">
            
            {/* Picture Container Frame */}
            <div className="relative aspect-4/5 rounded-2xl overflow-hidden bg-[#1A1A18] border-2 border-[#E0D8CE] shadow-2xl">
              <img
                src={profile.photoUrl}
                alt={`Owner profile photo - ${profile.name}`}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Gradient Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Bottom Picture Label & Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div className="text-white space-y-0.5">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059] block">
                    Website Owner & Lead Designer
                  </span>
                  <h3 className="font-serif text-xl font-medium drop-shadow-sm">
                    {profile.name}
                  </h3>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onImagePreview(profile.photoUrl, `${profile.name} - Introductory Photo`)}
                    className="p-2.5 rounded-full bg-white/90 text-[#1A1A18] hover:bg-white hover:text-[#C5A059] shadow-md backdrop-blur-xs transition-colors"
                    title="View full-size photo"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onOpenEditModal}
                    className="p-2.5 rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] shadow-md transition-colors"
                    title="Replace or upload new introductory photo"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Verified Owner Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 text-[10px] font-bold text-[#1A1A18] flex items-center space-x-1.5 shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>Verified Website Owner</span>
              </div>
            </div>

            {/* Quick Upload Hint Tag */}
            <div className="mt-3 text-center sm:text-left flex items-center justify-between text-[11px] text-[#736E65]">
              <span>Click <strong className="text-[#1A1A18]">Camera Icon</strong> or button to upload your picture</span>
              <button
                onClick={onOpenEditModal}
                className="text-[#8C6D2D] hover:underline font-semibold"
              >
                Upload Photo →
              </button>
            </div>

          </div>

          {/* Column 2: Biography & Studio Credentials */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Experience Badge */}
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-[#F2ECE4] text-[#8C6D2D] text-xs font-semibold">
                <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{profile.yearsExperience}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#1A1A18]">
                {profile.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#736E65] pt-1">
                <span className="flex items-center space-x-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{profile.location}</span>
                </span>
                <span>•</span>
                <a href={`mailto:${profile.email}`} className="flex items-center space-x-1 hover:text-[#1A1A18] underline">
                  <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{profile.email}</span>
                </a>
              </div>
            </div>

            {/* Bio Body */}
            <div className="prose prose-stone text-xs sm:text-sm text-[#4A463F] leading-relaxed bg-[#FAF8F5] p-5 rounded-2xl border border-[#E8E2D9]">
              <p>{profile.bio}</p>
            </div>

            {/* Philosophy Quote Box */}
            {profile.philosophyQuote && (
              <div className="p-4 rounded-xl bg-[#1A1A18] text-[#FAF8F5] border border-[#383531] relative flex items-start space-x-3">
                <Quote className="w-6 h-6 text-[#C5A059] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-serif italic text-xs sm:text-sm text-[#E8E2D9] leading-snug">
                    "{profile.philosophyQuote}"
                  </p>
                  <span className="text-[10px] text-[#A69F94] block uppercase font-bold tracking-wider">
                    — {profile.name}, Owner Philosophy
                  </span>
                </div>
              </div>
            )}

            {/* Disciplines Chips */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-[#8C857B] uppercase tracking-wider block">
                Core Specializations
              </span>
              <div className="flex flex-wrap gap-2">
                {profile.disciplines.map((disc, idx) => (
                  <span
                    key={idx}
                    className="bg-white border border-[#E0D8CE] text-[#1A1A18] text-xs font-medium px-3 py-1 rounded-full shadow-2xs"
                  >
                    ✓ {disc}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="px-6 py-2.5 rounded-full bg-[#C5A059] hover:bg-[#B38F48] text-white text-xs font-semibold transition-all shadow-sm flex items-center space-x-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact {profile.name}</span>
              </button>

              <button
                onClick={onOpenEditModal}
                className="px-5 py-2.5 rounded-full border border-[#D5CECE] bg-white hover:bg-[#F2ECE4] text-[#1A1A18] text-xs font-semibold transition-all flex items-center space-x-2"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Customize Profile & Photo</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
