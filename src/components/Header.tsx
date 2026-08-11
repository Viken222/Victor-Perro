import React, { useState } from 'react';
import { Share2, PlusCircle, Sparkles, Mail, Phone, Menu, X, ShieldCheck, Lock, Unlock, Edit3, Building, Presentation } from 'lucide-react';
import { HeaderConfig } from '../types';

interface HeaderProps {
  headerConfig: HeaderConfig;
  onOpenShare: () => void;
  onOpenCMS: () => void;
  onOpenContact: () => void;
  projectCount: number;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
  onLogoutAdmin: () => void;
  onOpenEditHeader?: () => void;
  onOpenPPTHub?: () => void;
  pptCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  headerConfig,
  onOpenShare,
  onOpenCMS,
  onOpenContact,
  projectCount,
  isAdmin,
  onOpenAdminAuth,
  onLogoutAdmin,
  onOpenEditHeader,
  onOpenPPTHub,
  pptCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center space-x-3">
          <a href="#" className="group flex flex-col">
            <span className="font-serif text-2xl font-semibold tracking-wider text-[#1A1A18] group-hover:text-[#C5A059] transition-colors">
              {headerConfig?.brandName || 'KEN PERRO'}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#736E65] font-sans truncate max-w-[220px]">
              {headerConfig?.subBrandName || 'Graphic & Studio Design'}
            </span>
          </a>

          {isAdmin && onOpenEditHeader && (
            <button
              onClick={onOpenEditHeader}
              className="p-1.5 rounded-full bg-[#F2ECE4] hover:bg-[#E0D8CE] text-[#C5A059] transition-colors hidden lg:flex items-center space-x-1 text-[11px] font-bold px-2.5 border border-[#D5CECE]"
              title="Admin: Edit Header & Contact Details"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Header</span>
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 text-sm font-medium tracking-wide text-[#4A463F]">
          <button
            onClick={() => scrollToSection('owner-profile')}
            className="hover:text-[#1A1A18] hover:underline underline-offset-8 transition-colors flex items-center space-x-1"
          >
            <span>Owner Profile</span>
          </button>
          <button
            onClick={() => scrollToSection('case-studies')}
            className="hover:text-[#1A1A18] hover:underline underline-offset-8 transition-colors"
          >
            Case Studies
          </button>
          {onOpenPPTHub && (
            <button
              onClick={onOpenPPTHub}
              className="text-[#1A1A18] hover:text-[#C5A059] font-semibold flex items-center space-x-1.5 bg-[#F2ECE4] px-3 py-1 rounded-full border border-[#D5CECE] transition-all"
              title="Access Exclusive PowerPoint Presentations"
            >
              <Presentation className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>PPT Decks</span>
              {pptCount > 0 && (
                <span className="bg-[#1A1A18] text-[#C5A059] text-[10px] px-1.5 py-0.2 rounded-full ml-1">
                  {pptCount}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => scrollToSection('philosophy')}
            className="hover:text-[#1A1A18] hover:underline underline-offset-8 transition-colors"
          >
            Philosophy
          </button>
          <button
            onClick={() => scrollToSection('exhibitions')}
            className="hover:text-[#1A1A18] hover:underline underline-offset-8 transition-colors"
          >
            Exhibitions
          </button>
        </nav>

        {/* Header Action Buttons */}
        <div className="hidden sm:flex items-center space-x-3">
          
          {/* Admin Rights Status Badge / Trigger */}
          {isAdmin ? (
            <div className="flex items-center space-x-2 bg-[#166534]/10 border border-[#166534]/30 px-3 py-1.5 rounded-full">
              <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-[#166534]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Active</span>
              </span>
              <button
                onClick={onOpenAdminAuth}
                className="text-[10px] text-[#59554E] hover:text-[#991B1B] font-semibold underline underline-offset-2 ml-1"
                title="Manage admin lock or change PIN"
              >
                Settings
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-medium rounded-full border border-[#D5CECE] bg-white hover:bg-[#F2ECE4] text-[#59554E] hover:text-[#1A1A18] transition-all"
              title="Admin Access Login (PIN: 2025)"
            >
              <Lock className="w-3 h-3 text-[#C5A059]" />
              <span>Admin Access</span>
            </button>
          )}

          {/* Share Portfolio Button */}
          <button
            onClick={onOpenShare}
            className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-full border border-[#D5CECE] bg-white text-[#2C2A29] hover:bg-[#F2ECE4] hover:border-[#C5A059] transition-all shadow-xs"
            title="Share portfolio link with clients or recruiters"
          >
            <Share2 className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Share Link</span>
          </button>

          {/* Add / Manage Work Button */}
          <button
            onClick={onOpenCMS}
            className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-medium rounded-full bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#33312E] transition-all shadow-sm"
            title={isAdmin ? "Add new work or manage existing projects" : "Admin rights required to add or edit work"}
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>{isAdmin ? '+ Add Work' : 'Manage Work'}</span>
            <span className="bg-[#3A3835] text-[#C5A059] text-[10px] px-1.5 py-0.5 rounded-full ml-1">
              {projectCount}
            </span>
          </button>

          {/* Contact Button */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center space-x-2 px-3.5 py-2 text-xs font-semibold rounded-full bg-[#C5A059] text-white hover:bg-[#B38F48] transition-all shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hire / Inquire</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center space-x-2">
          {isAdmin && onOpenEditHeader && (
            <button
              onClick={onOpenEditHeader}
              className="p-1.5 text-[#C5A059]"
              title="Edit Header"
            >
              <Edit3 className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={onOpenAdminAuth}
            className="p-2 text-[#2C2A29] hover:text-[#C5A059]"
            title="Admin Access"
          >
            {isAdmin ? <ShieldCheck className="w-5 h-5 text-green-700" /> : <Lock className="w-5 h-5" />}
          </button>

          <button
            onClick={onOpenShare}
            className="p-2 text-[#2C2A29] hover:text-[#C5A059]"
            title="Share Portfolio"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1A1A18] focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E2D9] px-4 pt-2 pb-6 space-y-4">
          <nav className="flex flex-col space-y-3 pt-2 text-base font-medium text-[#2C2A29]">
            <button
              onClick={() => scrollToSection('owner-profile')}
              className="text-left py-1 hover:text-[#C5A059] font-semibold text-[#1A1A18]"
            >
              👤 Owner Profile & Photo
            </button>
            {onOpenPPTHub && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPPTHub();
                }}
                className="text-left py-1 text-[#1A1A18] font-bold hover:text-[#C5A059] flex items-center space-x-2"
              >
                <Presentation className="w-4 h-4 text-[#C5A059]" />
                <span>📊 PowerPoint PPT Decks ({pptCount})</span>
              </button>
            )}
            <button
              onClick={() => scrollToSection('case-studies')}
              className="text-left py-1 hover:text-[#C5A059]"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              className="text-left py-1 hover:text-[#C5A059]"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-left py-1 hover:text-[#C5A059]"
            >
              Design Philosophy
            </button>
            <button
              onClick={() => scrollToSection('exhibitions')}
              className="text-left py-1 hover:text-[#C5A059]"
            >
              Exhibitions
            </button>
          </nav>
          <div className="pt-4 border-t border-[#E8E2D9] flex flex-col space-y-2">
            {isAdmin && onOpenEditHeader && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenEditHeader();
                }}
                className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-lg bg-[#F2ECE4] text-[#1A1A18] border border-[#D5CECE]"
              >
                <Edit3 className="w-4 h-4 text-[#C5A059]" />
                <span>Admin Edit Header & Contact Info</span>
              </button>
            )}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCMS();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-lg bg-[#1A1A18] text-white"
            >
              <PlusCircle className="w-4 h-4 text-[#C5A059]" />
              <span>{isAdmin ? 'Add / Manage Work' : 'Admin Work Management'} ({projectCount})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminAuth();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-medium rounded-lg border border-[#D5CECE] bg-white text-[#1A1A18]"
            >
              <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
              <span>{isAdmin ? 'Admin Mode Settings' : 'Admin Access Login (PIN: 2025)'}</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full inline-flex items-center justify-center space-x-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-[#C5A059] text-white"
            >
              <Mail className="w-4 h-4" />
              <span>Contact / Hire Me</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
