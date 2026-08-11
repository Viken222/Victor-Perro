import React, { useState } from 'react';
import { X, Copy, Check, Share2, Mail, MessageSquare, ExternalLink, QrCode, FileText, Printer } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-dev.run.app';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const emailSubject = encodeURIComponent("Portfolio Showcase: Ken Perro Graphic Design & Visual Craft");
  const emailBody = encodeURIComponent(
    `Hello,\n\nI would like to share my graphic design, brand security, and artisanal product case study portfolio with you:\n\n${shareUrl}\n\nDesigner: Ken Perro (Victor Perro)\nContact: victorperro619@gmail.com | +254 759426509\n\nLooking forward to collaborating!`
  );

  const whatsappText = encodeURIComponent(
    `Check out Ken Perro's Graphic Design & Studio Portfolio:\n${shareUrl}`
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative">
        
        {/* Top Header */}
        <div className="bg-[#1A1A18] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Share2 className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif text-lg font-medium">
              Share Portfolio Link
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 text-xs text-[#1A1A18]">
          
          <div className="space-y-2">
            <p className="text-[#59554E] font-sans">
              This digital portfolio is configured for direct client sending via link, WhatsApp, or email pitch.
            </p>

            {/* Link Box */}
            <div className="flex items-center space-x-2 bg-white p-2.5 rounded-xl border border-[#D5CECE]">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 bg-transparent font-mono text-[11px] text-[#1A1A18] focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-[#1A1A18] text-white font-semibold text-[11px] hover:bg-[#33312E] transition-all shrink-0"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Direct Share Options */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-3 bg-white rounded-xl border border-[#E0D8CE] hover:border-[#C5A059] hover:bg-[#F2ECE4] transition-all font-semibold"
            >
              <Mail className="w-4 h-4 text-[#C5A059]" />
              <span>Send via Email</span>
            </a>

            <a
              href={`https://api.whatsapp.com/send?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 p-3 bg-white rounded-xl border border-[#E0D8CE] hover:border-[#25D366] hover:bg-[#F2ECE4] transition-all font-semibold"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              <span>Share WhatsApp</span>
            </a>
          </div>

          {/* QR Code Section */}
          <div className="bg-white p-4 rounded-xl border border-[#E8E2D9] flex items-center space-x-4">
            <div className="w-20 h-20 bg-[#FAF8F5] border border-[#E0D8CE] rounded-lg p-2 flex items-center justify-center shrink-0">
              {/* Styled QR visual */}
              <div className="grid grid-cols-4 gap-1 w-full h-full">
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#C5A059] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-transparent"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#C5A059] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-transparent"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#1A1A18] rounded-xs"></div>
                <div className="bg-[#C5A059] rounded-xs"></div>
              </div>
            </div>

            <div className="space-y-1">
              <h4 className="font-serif font-medium text-sm text-[#1A1A18]">
                Scan QR Code
              </h4>
              <p className="text-[11px] text-[#736E65]">
                Ideal for pitch decks, business cards, or printed client proposals.
              </p>
            </div>
          </div>

          {/* Printable Action */}
          <button
            onClick={handlePrint}
            className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl border border-[#D5CECE] bg-white text-[#59554E] hover:bg-[#F2ECE4] hover:text-[#1A1A18] transition-all font-medium"
          >
            <Printer className="w-4 h-4 text-[#C5A059]" />
            <span>Print or Save as PDF Summary</span>
          </button>

        </div>

      </div>
    </div>
  );
};
