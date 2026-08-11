import React from 'react';
import { Share2, ArrowDown, Mail, Phone, Award, Sparkles, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenShare: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenShare, onOpenContact }) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 bg-radial from-[#FFFDF9] via-[#FAF8F5] to-[#F3EFEA] border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Eyebrow Badge */}
        <div className="flex items-center justify-center sm:justify-start space-x-2 mb-6">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#F2ECE4] text-[#8C6D2D] border border-[#E0D5C1]">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Collection 2021 – 2025</span>
          </span>
          <span className="hidden sm:inline-block text-xs text-[#8C857B]">|</span>
          <span className="hidden sm:inline-block text-xs font-medium text-[#59554E]">
            Client & Freelance Case Studies
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-7 space-y-6 text-center sm:text-left">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl tracking-tight text-[#1A1A18] leading-[1.15]">
              Visual Storytelling & <br className="hidden sm:block" />
              <span className="italic font-normal text-[#C5A059]">Artisanal Precision.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A463F] max-w-2xl leading-relaxed font-sans">
              Welcome to my client portfolio. I synthesize graphic identity design, security vector layouts, ceramic vessels, full-grain leathercraft, and spatial exhibition systems into memorable visual narratives that connect form with purpose.
            </p>

            {/* Designer Metadata Pill Bar */}
            <div className="pt-2 flex flex-wrap gap-4 items-center justify-center sm:justify-start text-xs text-[#59554E]">
              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#E8E2D9]">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" />
                <a href="mailto:victorperro619@gmail.com" className="hover:underline font-mono">
                  victorperro619@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#E8E2D9]">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <a href="tel:+254759426509" className="hover:underline font-mono">
                  +254 759426509
                </a>
              </div>

              <div className="flex items-center space-x-1.5 bg-white/80 backdrop-blur-xs px-3 py-1.5 rounded-md border border-[#E8E2D9]">
                <Award className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Ken Perro / Victor Perro Studio</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap gap-3 justify-center sm:justify-start">
              <a
                href="#case-studies"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#1A1A18] text-white text-sm font-medium hover:bg-[#33312E] transition-all shadow-md group"
              >
                <span>Explore Case Studies</span>
                <ArrowDown className="w-4 h-4 text-[#C5A059] group-hover:translate-y-0.5 transition-transform" />
              </a>

              <button
                onClick={onOpenShare}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-white border border-[#D5CECE] text-[#1A1A18] text-sm font-medium hover:bg-[#F2ECE4] hover:border-[#C5A059] transition-all shadow-xs"
              >
                <Share2 className="w-4 h-4 text-[#C5A059]" />
                <span>Share Portfolio Link</span>
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#8C6D2D] text-sm font-semibold hover:bg-[#C5A059]/20 transition-all"
              >
                <span>Direct Commission</span>
              </button>
            </div>
          </div>

          {/* Right Highlight Frame - Graphic & Product Composite */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none bg-white p-4 sm:p-6 rounded-2xl border border-[#E0D8CE] shadow-xl">
              
              {/* Main Preview Cards Stack */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl bg-[#F5F2EC] aspect-4/3 group">
                  <img
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                    alt="Graphic ID Security System Design"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#C5A059]">
                      Featured Graphic Design
                    </span>
                    <h3 className="font-serif text-white text-lg font-medium">
                      Driver's License & Security Layout Scheme
                    </h3>
                  </div>
                </div>

                {/* Sub Showcase Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative overflow-hidden rounded-lg aspect-square bg-[#F5F2EC]">
                    <img
                      src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=400&q=80"
                      alt="Ceramic Art"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded font-serif">
                      Swirled Harmony Vessel
                    </div>
                  </div>

                  <div className="relative overflow-hidden rounded-lg aspect-square bg-[#F5F2EC]">
                    <img
                      src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80"
                      alt="Full Grain Leather"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-1 rounded font-serif">
                      Full-Grain Leathercraft
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Quality Tag */}
              <div className="absolute -bottom-5 -left-5 bg-[#1A1A18] text-[#FAF8F5] p-3 rounded-xl border border-[#3D3A35] shadow-lg hidden sm:flex items-center space-x-3">
                <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
                <div className="text-left">
                  <p className="text-xs font-semibold">100% Client Proven</p>
                  <p className="text-[10px] text-[#A69F94]">Freelaner & Brand Case Studies</p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
