import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Check, Sparkles, Trash2, Edit3, Presentation, FileText } from 'lucide-react';
import { ProjectItem, CategoryType, PresentationDeck } from '../types';
import { compressImage, compressMultipleImages } from '../utils/imageCompressor';
import { parseAndConvertPPTFile } from '../utils/pptConverter';

interface EditProjectModalProps {
  isOpen: boolean;
  project: ProjectItem | null;
  onClose: () => void;
  onSaveProject: (id: string, updatedData: Partial<ProjectItem>) => void;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  isOpen,
  project,
  onClose,
  onSaveProject,
}) => {
  if (!isOpen || !project) return null;

  // Form States prefilled from project
  const [title, setTitle] = useState(project.title);
  const [subtitle, setSubtitle] = useState(project.subtitle || '');
  const [category, setCategory] = useState<CategoryType>(project.category);
  const [referenceCode, setReferenceCode] = useState(project.referenceCode || '');
  const [client, setClient] = useState(project.client || '');
  const [year, setYear] = useState(project.year || '');
  const [price, setPrice] = useState(project.price || '');
  const [materials, setMaterials] = useState(project.materials || '');
  const [dimensions, setDimensions] = useState(project.dimensions || '');
  const [colors, setColors] = useState(project.colors || '');
  const [coverImage, setCoverImage] = useState(project.coverImage || '');
  const [galleryImagesList, setGalleryImagesList] = useState<string[]>(project.galleryImages || []);
  const [shortDescription, setShortDescription] = useState(project.shortDescription || '');
  const [challenge, setChallenge] = useState(project.caseStudy?.challenge || '');
  const [approach, setApproach] = useState(project.caseStudy?.approach || '');
  const [specsText, setSpecsText] = useState((project.caseStudy?.specifications || []).join('\n'));
  const [outcome, setOutcome] = useState(project.caseStudy?.outcome || '');
  const [featured, setFeatured] = useState(project.featured || false);
  const [tagsInput, setTagsInput] = useState((project.tags || []).join(', '));

  // PPT State
  const [presentationDeck, setPresentationDeck] = useState<PresentationDeck | undefined>(project.presentationDeck);
  const [isProcessingPPT, setIsProcessingPPT] = useState(false);
  const [pptStatusMsg, setPptStatusMsg] = useState('');

  const [saveSuccess, setSaveSuccess] = useState('');

  // Sync state if selected project changes
  useEffect(() => {
    if (project) {
      setTitle(project.title);
      setSubtitle(project.subtitle || '');
      setCategory(project.category);
      setReferenceCode(project.referenceCode || '');
      setClient(project.client || '');
      setYear(project.year || '');
      setPrice(project.price || '');
      setMaterials(project.materials || '');
      setDimensions(project.dimensions || '');
      setColors(project.colors || '');
      setCoverImage(project.coverImage || '');
      setGalleryImagesList(project.galleryImages || []);
      setShortDescription(project.shortDescription || '');
      setChallenge(project.caseStudy?.challenge || '');
      setApproach(project.caseStudy?.approach || '');
      setSpecsText((project.caseStudy?.specifications || []).join('\n'));
      setOutcome(project.caseStudy?.outcome || '');
      setFeatured(project.featured || false);
      setTagsInput((project.tags || []).join(', '));
      setPresentationDeck(project.presentationDeck);
      setSaveSuccess('');
      setPptStatusMsg('');
    }
  }, [project]);

  const categoryLabels: Record<CategoryType, string> = {
    'all': 'All Work',
    'graphic-design': 'Graphic & ID Security Design',
    'ceramics': 'Ceramics Packaging & Branding',
    'leather': 'Brand Identity & Print Collateral',
    'jewelry': 'Editorial Lookbook & Typography',
    'photography': 'Art Direction & Campaign Graphics',
    'exhibition': 'Environmental Graphic Design',
  };

  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files) as File[];
    const compressedImages = await compressMultipleImages(fileList, 1000, 0.7);

    if (!coverImage && compressedImages.length > 0) {
      setCoverImage(compressedImages[0]);
    }

    setGalleryImagesList(prev => [...prev, ...compressedImages]);
  };

  const handlePPTFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingPPT(true);
    setPptStatusMsg(`Converting presentation "${file.name}" into interactive deck...`);

    try {
      const deck = await parseAndConvertPPTFile(file);
      setPresentationDeck(deck);
      setPptStatusMsg(`✓ PPT deck converted successfully with ${deck.slides.length} slides.`);
    } catch (err) {
      console.error('PPT Conversion error:', err);
      setPptStatusMsg('Failed to parse presentation file.');
    } finally {
      setIsProcessingPPT(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    setGalleryImagesList(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    const finalGallery = [
      ...(coverImage ? [coverImage] : []),
      ...galleryImagesList.filter(img => img !== coverImage)
    ];

    const specsArray = specsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const updatedData: Partial<ProjectItem> = {
      title,
      subtitle: subtitle || undefined,
      category,
      categoryLabel: categoryLabels[category] || 'Graphic & ID Security Design',
      referenceCode: referenceCode || undefined,
      client: client || undefined,
      year: year || new Date().getFullYear().toString(),
      price: price || undefined,
      materials: materials || undefined,
      dimensions: dimensions || undefined,
      colors: colors || undefined,
      featured,
      coverImage: coverImage || project.coverImage,
      galleryImages: finalGallery.length > 0 ? finalGallery : [coverImage],
      shortDescription,
      caseStudy: {
        challenge: challenge || 'Designing a graphic layout solution under client parameters.',
        approach: approach || 'Applied typographic grid, color strategy, and vector layout.',
        specifications: specsArray.length > 0 ? specsArray : ['Graphic design specification'],
        outcome: outcome || 'Successful project execution.'
      },
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      presentationDeck
    };

    onSaveProject(project.id, updatedData);
    setSaveSuccess('Work changes saved successfully!');

    setTimeout(() => {
      setSaveSuccess('');
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative max-h-[90vh] flex flex-col">
        
        {/* Modal Top Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-4 flex items-center justify-between border-b border-[#33312E]">
          <div className="flex items-center space-x-2">
            <Edit3 className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif text-lg font-medium text-white">
              Admin Editor: Edit "{project.title}"
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Form Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6 text-xs text-[#1A1A18]">
          
          {saveSuccess && (
            <div className="bg-[#F0FDF4] border border-[#86EFAC] text-[#166534] p-3 rounded-lg flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#16A34A]" />
              <span>{saveSuccess}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Project Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Discipline Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as CategoryType)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                >
                  <option value="graphic-design">Graphic & ID Security Design</option>
                  <option value="ceramics">Ceramics Packaging & Branding</option>
                  <option value="leather">Brand Identity & Print Collateral</option>
                  <option value="jewelry">Editorial Lookbook & Typography</option>
                  <option value="photography">Art Direction & Campaign Graphics</option>
                  <option value="exhibition">Environmental Graphic Design</option>
                </select>
              </div>
            </div>

            {/* Subtitle */}
            <div className="space-y-1">
              <label className="font-semibold text-[#4A463F]">Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Precision Vector Security Guilloche & Regulatory Typography"
                className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Ref Code, Client, Year, Price */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Reference Code</label>
                <input
                  type="text"
                  value={referenceCode}
                  onChange={(e) => setReferenceCode(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Client / Agency</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Year</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Price / Valuation</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Materials, Dimensions, Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Materials / Medium</label>
                <input
                  type="text"
                  value={materials}
                  onChange={(e) => setMaterials(e.target.value)}
                  placeholder="e.g. Vector Guilloche Art, Foil Stamp"
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Dimensions</label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="e.g. 24 x 36 Inches or Standard CR80"
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#4A463F]">Color Palette</label>
                <input
                  type="text"
                  value={colors}
                  onChange={(e) => setColors(e.target.value)}
                  placeholder="e.g. Sunburst Gold, Azure Blue"
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>
            </div>

            {/* Cover Image & Gallery Upload */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E8E2D9]">
              <div className="flex items-center justify-between">
                <label className="font-bold text-[#1A1A18] block">Cover Image & Multiple Gallery Images</label>
                <span className="text-[10px] text-[#8C857B]">Auto-compressed</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  type="text"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="flex-1 p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  placeholder="Main cover image URL..."
                />

                <label className="cursor-pointer inline-flex items-center space-x-1.5 px-4 py-2.5 bg-[#1A1A18] hover:bg-[#33312E] text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs">
                  <Upload className="w-4 h-4 text-[#C5A059]" />
                  <span>Upload Images</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Gallery Thumbnails */}
              {galleryImagesList.length > 0 && (
                <div className="space-y-1.5 pt-2">
                  <span className="text-[10px] font-bold text-[#1A1A18] block">
                    Gallery Images ({galleryImagesList.length}):
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
                    {galleryImagesList.map((imgUrl, idx) => (
                      <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#E0D8CE] shrink-0 group">
                        <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => handleRemoveGalleryImage(idx)}
                          className="absolute top-0.5 right-0.5 p-0.5 bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove image"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* PPT Presentation Upload */}
            <div className="space-y-3 bg-[#FAF3E8] p-4 rounded-xl border border-[#E0C080]">
              <div className="flex items-center space-x-2 text-[#7A5200]">
                <Presentation className="w-5 h-5 text-[#C5A059]" />
                <h4 className="font-serif font-bold text-sm text-[#1A1A18]">
                  PowerPoint (.ppt / .pptx) Interactive Presentation Deck
                </h4>
              </div>

              <div className="flex items-center space-x-3">
                <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-[#C5A059] hover:bg-[#B38F48] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs">
                  <Upload className="w-4 h-4" />
                  <span>{presentationDeck ? 'Replace PPT Presentation' : 'Upload .PPT / .PPTX Presentation'}</span>
                  <input
                    type="file"
                    accept=".ppt,.pptx,.pdf"
                    onChange={handlePPTFileUpload}
                    className="hidden"
                  />
                </label>

                {isProcessingPPT && (
                  <span className="text-xs text-[#8C6D2D] font-mono animate-pulse">
                    Processing presentation file...
                  </span>
                )}
              </div>

              {pptStatusMsg && (
                <div className="text-xs text-[#1A1A18] font-mono bg-white p-2.5 rounded-lg border border-[#E0C080]">
                  {pptStatusMsg}
                </div>
              )}

              {presentationDeck && (
                <div className="bg-white p-3 rounded-lg border border-[#C5A059]/40 flex items-center justify-between">
                  <div>
                    <span className="font-serif font-bold text-xs text-[#1A1A18] block">
                      {presentationDeck.title}
                    </span>
                    <span className="text-[10px] text-[#736E65]">
                      {presentationDeck.slideCount} slides converted • {presentationDeck.fileSize}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPresentationDeck(undefined)}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Remove Deck
                  </button>
                </div>
              )}
            </div>

            {/* Short Description */}
            <div className="space-y-1">
              <label className="font-semibold text-[#4A463F]">Short Description *</label>
              <textarea
                required
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
              />
            </div>

            {/* Case Study Narrative */}
            <div className="space-y-3 bg-[#F5F2EC] p-4 rounded-xl border border-[#E0D8CE]">
              <h4 className="font-serif font-medium text-[#1A1A18] text-sm">
                Case Study Storytelling Breakdown
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#4A463F] block mb-1">Design Challenge</label>
                  <textarea
                    rows={3}
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A463F] block mb-1">Creative Approach & Rationale</label>
                  <textarea
                    rows={3}
                    value={approach}
                    onChange={(e) => setApproach(e.target.value)}
                    className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-[#4A463F] block mb-1">Specifications (one per line)</label>
                <textarea
                  rows={3}
                  value={specsText}
                  onChange={(e) => setSpecsText(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#4A463F] block mb-1">Outcome & Impact</label>
                <textarea
                  rows={2}
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                />
              </div>
            </div>

            {/* Tags & Featured */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div>
                <label className="font-semibold text-[#4A463F] block mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Vector Graphic, Identity, Packaging"
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white"
                />
              </div>

              <div className="pt-4 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                <label htmlFor="edit-featured-check" className="font-medium text-[#1A1A18] cursor-pointer">
                  Feature prominently on portfolio grid
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#E8E2D9]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-full border border-[#D5CECE] bg-white text-[#59554E]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] font-semibold hover:bg-[#33312E] inline-flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Save Changes</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};
