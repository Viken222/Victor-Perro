import React, { useState } from 'react';
import { X, Plus, Trash2, RefreshCw, Upload, Check, Sparkles, Image as ImageIcon, Layers, Edit3, Presentation, FileText } from 'lucide-react';
import { ProjectItem, CategoryType, PresentationDeck } from '../types';
import { compressImage, compressMultipleImages } from '../utils/imageCompressor';
import { parseAndConvertPPTFile } from '../utils/pptConverter';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProject: (project: Omit<ProjectItem, 'id'>) => void;
  existingProjects: ProjectItem[];
  onDeleteProject: (id: string) => void;
  onToggleFeatured: (id: string, current: boolean) => void;
  onResetDefaults: () => void;
  onEditProject?: (project: ProjectItem) => void;
}

export const AddProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onClose,
  onAddProject,
  existingProjects,
  onDeleteProject,
  onToggleFeatured,
  onResetDefaults,
  onEditProject,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'add' | 'manage'>('add');

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<CategoryType>('graphic-design');
  const [referenceCode, setReferenceCode] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [price, setPrice] = useState('');
  const [materials, setMaterials] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [galleryImagesList, setGalleryImagesList] = useState<string[]>([]);
  const [shortDescription, setShortDescription] = useState('');
  const [challenge, setChallenge] = useState('');
  const [approach, setApproach] = useState('');
  const [specificationsText, setSpecificationsText] = useState('');
  const [outcome, setOutcome] = useState('');
  const [featured, setFeatured] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  // PPT Deck State
  const [presentationDeck, setPresentationDeck] = useState<PresentationDeck | undefined>(undefined);
  const [isProcessingPPT, setIsProcessingPPT] = useState(false);
  const [pptStatusMsg, setPptStatusMsg] = useState('');

  const [successMsg, setSuccessMsg] = useState('');

  // Sample Image Presets for rapid testing
  const PRESET_IMAGES = [
    { label: 'Vector ID Security', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80' },
    { label: 'Branding & Packaging', url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80' },
    { label: 'Leather Collateral', url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80' },
    { label: 'Editorial Lookbook', url: 'https://images.unsplash.com/photo-1611591475193-2704770284df?auto=format&fit=crop&w=800&q=80' },
    { label: 'Campaign Graphics', url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80' },
  ];

  const categoryLabels: Record<CategoryType, string> = {
    'all': 'All Work',
    'graphic-design': 'Graphic & ID Security Design',
    'ceramics': 'Ceramics Packaging & Branding',
    'leather': 'Brand Identity & Print Collateral',
    'jewelry': 'Editorial Lookbook & Typography',
    'photography': 'Art Direction & Campaign Graphics',
    'exhibition': 'Environmental Graphic Design',
  };

  // Multiple Image Upload Handler
  const handleMultipleImagesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const compressedImages = await compressMultipleImages(fileList, 1000, 0.7);

    if (!coverImage && compressedImages.length > 0) {
      setCoverImage(compressedImages[0]);
    }

    setGalleryImagesList(prev => [...prev, ...compressedImages]);
  };

  // PPT File Upload & Converter Handler
  const handlePPTFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingPPT(true);
    setPptStatusMsg(`Converting PPT deck "${file.name}" into interactive presentation viewer...`);

    try {
      const deck = await parseAndConvertPPTFile(file);
      setPresentationDeck(deck);
      setPptStatusMsg(`✓ PPT converted successfully! ${deck.slides.length} interactive slides generated.`);
    } catch (err) {
      console.error('PPT Conversion error:', err);
      setPptStatusMsg('Failed to process PPT file. Please check file format.');
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

    const specsArray = specificationsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newProject: Omit<ProjectItem, 'id'> = {
      title,
      subtitle: subtitle || undefined,
      category,
      categoryLabel: categoryLabels[category] || 'Graphic & ID Security Design',
      referenceCode: referenceCode || `PROJECT-${Math.floor(Math.random() * 900 + 100)}`,
      client: client || 'Freelance Client',
      year: year || new Date().getFullYear().toString(),
      price: price || undefined,
      materials: materials || undefined,
      dimensions: dimensions || undefined,
      featured,
      coverImage: coverImage || PRESET_IMAGES[0].url,
      galleryImages: finalGallery.length > 0 ? finalGallery : [coverImage || PRESET_IMAGES[0].url],
      shortDescription,
      caseStudy: {
        challenge: challenge || 'Designing a vector graphic layout solution according to client parameters.',
        approach: approach || 'Applied typographic grid, layout balance, and brand identity principles.',
        specifications: specsArray.length > 0 ? specsArray : ['Vector graphic design specification', 'High-resolution print export'],
        outcome: outcome || 'Successful graphic design project delivery meeting client specifications.'
      },
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
      presentationDeck
    };

    onAddProject(newProject);
    setSuccessMsg('Project & PowerPoint deck successfully added to your portfolio!');
    
    // Reset form fields
    setTimeout(() => {
      setSuccessMsg('');
      setTitle('');
      setSubtitle('');
      setReferenceCode('');
      setClient('');
      setPrice('');
      setMaterials('');
      setCoverImage('');
      setGalleryImagesList([]);
      setPresentationDeck(undefined);
      setPptStatusMsg('');
      setShortDescription('');
      setChallenge('');
      setApproach('');
      setSpecificationsText('');
      setOutcome('');
      setTagsInput('');
      setActiveTab('manage');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div className="bg-[#FAF8F5] w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden border border-[#E0D8CE] relative max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#1A1A18] text-[#FAF8F5] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-[#C5A059]" />
            <h2 className="font-serif text-lg font-medium text-white">
              Graphic Design Portfolio Manager & Admin CMS
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#A69F94] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#F2ECE4] px-6 py-2 border-b border-[#E8E2D9] flex space-x-4 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('add')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'add'
                ? 'bg-white text-[#1A1A18] shadow-xs'
                : 'text-[#736E65] hover:text-[#1A1A18]'
            }`}
          >
            + Add New Graphic Work & PPT
          </button>
          <button
            onClick={() => setActiveTab('manage')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'manage'
                ? 'bg-white text-[#1A1A18] shadow-xs'
                : 'text-[#736E65] hover:text-[#1A1A18]'
            }`}
          >
            Manage & Edit Current Work ({existingProjects.length})
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 flex-1 space-y-6">
          
          {successMsg && (
            <div className="bg-[#E0F2FE] border border-[#38BDF8] text-[#0369A1] p-3 rounded-lg text-xs flex items-center space-x-2">
              <Check className="w-4 h-4 text-[#0284C7]" />
              <span>{successMsg}</span>
            </div>
          )}

          {activeTab === 'add' ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs text-[#1A1A18]">
              
              {/* Basic Meta */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. State Security ID Vector Graphic System"
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Reference Code</label>
                  <input
                    type="text"
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                    placeholder="e.g. ID-2025 or GR-005"
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Client / Context</label>
                  <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="e.g. Local Brand / Civic Agency"
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#4A463F]">Price / Valuation</label>
                  <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. Commission or $1,200 Project"
                    className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Multiple Image Upload & Gallery */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-[#E8E2D9]">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-[#1A1A18] block">
                    Upload Multiple Project Images (Scrollable Gallery)
                  </label>
                  <span className="text-[10px] text-[#8C857B]">Auto-compressed to prevent quota errors</span>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Paste main cover image URL..."
                    className="flex-1 p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                  />

                  <label className="cursor-pointer inline-flex items-center space-x-1.5 px-4 py-2.5 bg-[#1A1A18] hover:bg-[#33312E] text-white rounded-lg text-xs font-semibold shrink-0 transition-colors shadow-xs">
                    <Upload className="w-4 h-4 text-[#C5A059]" />
                    <span>Upload Multiple Images</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleMultipleImagesUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Thumbnails preview */}
                {galleryImagesList.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] font-bold text-[#1A1A18] block">
                      Uploaded Gallery Images ({galleryImagesList.length}):
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

              {/* PPT Presentation File Upload & Converter */}
              <div className="space-y-3 bg-[#FAF3E8] p-4 rounded-xl border border-[#E0C080]">
                <div className="flex items-center space-x-2 text-[#7A5200]">
                  <Presentation className="w-5 h-5 text-[#C5A059]" />
                  <h4 className="font-serif font-bold text-sm text-[#1A1A18]">
                    PowerPoint (.ppt / .pptx) Works Upload & Conversion
                  </h4>
                </div>
                <p className="text-[11px] text-[#59554E]">
                  Upload your slide deck file. The app will convert it into an interactive multi-slide viewer for your portfolio visitors.
                </p>

                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer inline-flex items-center space-x-2 px-4 py-2 bg-[#C5A059] hover:bg-[#B38F48] text-white rounded-lg text-xs font-semibold transition-colors shadow-xs">
                    <Upload className="w-4 h-4" />
                    <span>Select & Convert .PPT / .PPTX File</span>
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
                      Remove PPT
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
                  placeholder="Summary of graphic design work for grid cards..."
                  className="w-full p-2.5 rounded-lg border border-[#D5CECE] bg-white focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Case Study Details */}
              <div className="space-y-3 bg-[#F5F2EC] p-4 rounded-xl border border-[#E0D8CE]">
                <h4 className="font-serif font-medium text-[#1A1A18] text-sm">
                  Graphic Design Case Study Narrative
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#4A463F] block mb-1">The Challenge</label>
                    <textarea
                      rows={2}
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      placeholder="What was the client problem or graphic constraint?"
                      className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-[#4A463F] block mb-1">Approach & Rationale</label>
                    <textarea
                      rows={2}
                      value={approach}
                      onChange={(e) => setApproach(e.target.value)}
                      placeholder="How did your graphic design solution solve it?"
                      className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#4A463F] block mb-1">Specifications (one per line)</label>
                  <textarea
                    rows={2}
                    value={specificationsText}
                    onChange={(e) => setSpecificationsText(e.target.value)}
                    placeholder="e.g. Vector Guilloche fine line matrix&#10;Custom Typography Grid&#10;CMYK Print Color Profiles"
                    className="w-full p-2 rounded-lg border border-[#D5CECE] bg-white"
                  />
                </div>
              </div>

              {/* Featured Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-[#C5A059] focus:ring-[#C5A059]"
                />
                <label htmlFor="featured-check" className="font-medium text-[#1A1A18] cursor-pointer">
                  Feature this project prominently on the homepage hero/top grid
                </label>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-full border border-[#D5CECE] bg-white text-[#59554E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-full bg-[#1A1A18] text-[#FAF8F5] font-semibold hover:bg-[#33312E]"
                >
                  Publish To Portfolio
                </button>
              </div>

            </form>
          ) : (
            /* Manage Existing Projects Tab */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D9]">
                <span className="text-xs text-[#736E65]">
                  Active projects in your current portfolio: <strong className="text-[#1A1A18]">{existingProjects.length}</strong>
                </span>

                <button
                  onClick={onResetDefaults}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs bg-white border border-[#D5CECE] text-[#8C6D2D] hover:bg-[#F2ECE4]"
                  title="Reset to default graphic design collection"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Restore Graphic Design Defaults</span>
                </button>
              </div>

              <div className="space-y-3">
                {existingProjects.map(p => (
                  <div
                    key={p.id}
                    className="bg-white p-3.5 rounded-xl border border-[#E8E2D9] flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={p.coverImage}
                        alt=""
                        className="w-12 h-12 object-cover rounded-lg border border-[#E0D8CE] shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="font-serif font-medium text-sm text-[#1A1A18] truncate">
                          {p.title}
                        </h4>
                        <div className="flex items-center space-x-2 text-[10px] text-[#8C857B]">
                          <span>{p.categoryLabel}</span>
                          <span>•</span>
                          <span>Ref: {p.referenceCode || 'N/A'}</span>
                          {p.presentationDeck && (
                            <span className="text-[#C5A059] font-bold">★ Has PPT Deck</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      {onEditProject && (
                        <button
                          onClick={() => {
                            onClose();
                            onEditProject(p);
                          }}
                          className="px-2.5 py-1.5 rounded-lg text-xs bg-[#1A1A18] text-[#FAF8F5] hover:bg-[#C5A059] flex items-center space-x-1 transition-colors"
                          title="Edit this project details"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>Edit</span>
                        </button>
                      )}

                      <button
                        onClick={() => onToggleFeatured(p.id, p.featured)}
                        className={`px-2.5 py-1.5 rounded-lg text-[10px] font-semibold ${
                          p.featured
                            ? 'bg-[#C5A059] text-white'
                            : 'bg-[#F2ECE4] text-[#59554E] hover:bg-[#E8E2D9]'
                        }`}
                      >
                        {p.featured ? '★ Featured' : 'Feature'}
                      </button>

                      <button
                        onClick={() => onDeleteProject(p.id)}
                        className="p-1.5 text-[#991B1B] hover:bg-[#FEE2E2] rounded-lg transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
