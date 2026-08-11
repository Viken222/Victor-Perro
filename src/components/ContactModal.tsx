import React, { useState, useEffect } from 'react';
import { X, Mail, Phone, Send, Check, Sparkles, MapPin } from 'lucide-react';
import { saveInquiry } from '../utils/portfolioStorage';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetProjectTitle?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  presetProjectTitle,
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Graphic & ID Security System');
  const [budgetRange, setBudgetRange] = useState('$500 - $2,000');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (presetProjectTitle) {
      setMessage(`Hi Ken, I am interested in inquiring about a project similar to "${presetProjectTitle}".`);
    }
  }, [presetProjectTitle]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    saveInquiry({
      name,
      email,
      phone,
      serviceCategory,
      budgetRange,
      message,
    });

    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative">
        
        {/* Top Banner */}
        <div className="bg-[#1A1A18] text-white px-6 py-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
              Direct Commission & Freelance Inquiry
            </span>
            <h2 className="font-serif text-xl font-medium">
              Start a Project with Ken Perro
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6 text-xs text-[#1A1A18]">
          
          {sent ? (
            <div className="bg-[#F2ECE4] p-8 rounded-xl border border-[#C5A059] text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#C5A059] text-white flex items-center justify-center mx-auto">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1A1A18]">
                Inquiry Received!
              </h3>
              <p className="text-xs text-[#59554E] max-w-xs mx-auto">
                Thank you, {name}. Ken Perro will get back to you shortly at <span className="font-semibold text-[#1A1A18]">{email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Contact Info Badges */}
              <div className="grid grid-cols-2 gap-3 bg-white p-3 rounded-xl border border-[#E8E2D9] text-[11px]">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-mono truncate">victorperro619@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-[#C5A059]" />
                  <span className="font-mono">+254 759426509</span>
                </div>
              </div>

              {/* Form Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Gretchen Cadle"
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@brand.com"
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Project Category</label>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Graphic & ID Security System">Graphic & ID Security System</option>
                    <option value="Brand Identity & Typography">Brand Identity & Typography</option>
                    <option value="Ceramic Vessel Commission">Ceramic Vessel Commission</option>
                    <option value="Custom Leather Goods">Custom Leather Goods</option>
                    <option value="Architectural Jewelry">Architectural Jewelry</option>
                    <option value="Exhibition & Display Design">Exhibition & Display Design</option>
                    <option value="General Freelance Project">General Freelance Project</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Estimated Budget</label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  >
                    <option value="Under $500">Under $500</option>
                    <option value="$500 - $2,000">$500 - $2,000</option>
                    <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                    <option value="$5,000+">$5,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Project Scope / Message</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your brand, timeline, and design expectations..."
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#D5CECE] bg-white text-[#59554E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full bg-[#1A1A18] text-white font-semibold hover:bg-[#33312E] transition-all shadow-md"
                >
                  <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Send Inquiry</span>
                </button>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
