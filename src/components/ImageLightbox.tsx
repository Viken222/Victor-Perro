import React from 'react';
import { X } from 'lucide-react';

interface ImageLightboxProps {
  imageUrl: string | null;
  title?: string;
  onClose: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageUrl, title, onClose }) => {
  if (!imageUrl) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-[#C5A059] p-2 bg-white/10 rounded-full transition-colors"
          title="Close full view"
        >
          <X className="w-6 h-6" />
        </button>

        <img
          src={imageUrl}
          alt={title || 'Full resolution view'}
          className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl border border-white/20"
        />

        {title && (
          <div className="mt-4 text-center text-white/90 font-serif text-sm bg-black/60 px-4 py-2 rounded-full border border-white/10">
            {title}
          </div>
        )}
      </div>
    </div>
  );
};
