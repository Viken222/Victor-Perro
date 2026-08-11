import { ProjectItem } from '../types';

export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'project-gd-logo-01',
    title: 'Monogram & Brand Mark Geometry - Vector Logo System',
    subtitle: 'Golden Ratio Grid Construction, Vector Bezier Nodes & Brand Guidelines in Adobe Illustrator',
    category: 'graphic-design',
    categoryLabel: 'Logo & Brand Identity Design',
    referenceCode: 'LOGO-AI-2025',
    client: 'Ken Perro Studio & Corporate Heritage Partners',
    year: '2025',
    materials: 'Adobe Illustrator Vector Artboards, Golden Ratio Grid Guides, SVG / EPS Asset Libraries',
    dimensions: 'Scalable Vector (Infinity Resolution)',
    colors: 'Pantone 7503 C (Matte Gold), Onyx Black, Studio Chalk White',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Master logo design study exploring mathematical golden ratio grid lines, custom monogram vector curves, and comprehensive brand identity guidelines created using Adobe Illustrator.',
    caseStudy: {
      challenge: 'Crafting a versatile monogram logo mark that maintains optical clarity at micro 16x16px favicon sizes, high-heat brass leather embossing, and large spatial exhibition vinyl prints.',
      approach: 'Constructed an interlocking "K" and "P" vector monogram using strict geometric circles and 45-degree angle constraints in Adobe Illustrator, accompanied by a 24-page brand style guide PowerPoint pitch deck.',
      specifications: [
        'Golden ratio circle matrix overlay with optical curvature balance',
        'Adobe Illustrator master vector file (.AI, .EPS, .SVG, .PDF)',
        'Monochrome, negative space, and foil-stamped logo variations',
        'Exclusion zone and clear space safety margins definition',
        '24-Slide Client Presentation Deck (.PPTX / .PDF Presentation)'
      ],
      outcome: 'Established an iconic brand symbol used seamlessly across physical goods, print stationery, and digital media.'
    },
    tags: ['Logo Design', 'Adobe Illustrator', 'Brand Identity', 'Vector Geometry', 'Presentation Deck'],
    presentationDeck: {
      id: 'deck-logo-01',
      title: 'Monogram & Brand Mark Master Presentation Deck',
      subtitle: 'Vector Grid Geometry & Brand Guidelines Strategy',
      fileName: 'Ken_Perro_Logo_Architecture_Presentation.pptx',
      fileSize: '14.2 MB',
      slideCount: 6,
      slides: [
        {
          slideNumber: 1,
          title: 'Brand Identity & Monogram Architecture',
          subtitle: 'Ken Perro Graphic Design Studio',
          imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Mathematical Golden Ratio Monogram Construction',
            'Adobe Illustrator Precision Bezier Node Alignment',
            'Cross-Medium Application (Embroidery, Embossing, Digital Screens)'
          ],
          notes: 'Presenter Note: Introduce the brand philosophy connecting geometric precision with physical craftsmanship.'
        },
        {
          slideNumber: 2,
          title: 'Vector Grid & Curvature Geometry',
          subtitle: 'Optical Balance & Structural Line Weights',
          imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '1.618 Golden Ratio Circle Circles Matrix',
            'Strict 45° Angle Terminal Cuts for High Legibility',
            'Zero Optical Distortion at Small Micro-Scales'
          ],
          notes: 'Highlight how the grid prevents visual sag when viewed from distance.'
        },
        {
          slideNumber: 3,
          title: 'Brand Color Harmonies & Foil Specs',
          subtitle: 'Matte Gold, Slate Black & Cream Stock',
          imageUrl: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Primary Palette: Pantone 7503 C (Rich Metallic Gold)',
            'Secondary Palette: Charcoal Onyx (C:60 M:50 Y:50 K:100)',
            'Accent: Natural Unbleached Paper Stock Cream'
          ],
          notes: 'Explain the CMYK vs Pantone spot color reproduction specs.'
        },
        {
          slideNumber: 4,
          title: 'Exclusion Zones & Scale Variations',
          subtitle: 'Minimum Size Safety Rules & Clear Space',
          imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Minimum Clear Zone = 2x Height of Monogram Cap',
            'Favicon & App Icon Scaling (16px to 512px)',
            'Incorrect Usage Guidelines (No Drop Shadows, No Distortions)'
          ],
          notes: 'Demonstrate prohibited modifications for brand compliance.'
        },
        {
          slideNumber: 5,
          title: 'Adobe Creative Cloud Vector Asset Pipeline',
          subtitle: 'Illustrator to InDesign & Photoshop Smart Objects',
          imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Master .AI Vector Libraries linked to Creative Cloud Cloud Storage',
            'Photoshop Smart Object 3D Mockup templates for client pitch',
            'InDesign Master Pages for automated stationery generation'
          ],
          notes: 'Detail the automated workflow for client deliverables.'
        },
        {
          slideNumber: 6,
          title: 'Final Implementation & Client Assets',
          subtitle: 'Package Delivery & File Handover Overview',
          imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Export formats: Vector (.AI, .EPS, .SVG) + Web (.PNG, .WEBP)',
            'CNC Die Stamping Files (.DXF / .DWG) for brass heat embossing',
            'Full PDF Brand Style Guide (24 Pages)'
          ],
          notes: 'Conclude pitch with client Q&A.'
        }
      ]
    }
  },
  {
    id: 'project-gd-color-02',
    title: 'Color Theory & Security Ink Palette Matrix',
    subtitle: 'CMYK Gamut, Pantone Spot Color Harmony & High-Contrast Print Accessibility',
    category: 'graphic-design',
    categoryLabel: 'Color Theory & Print Palette',
    referenceCode: 'COLOR-CT-2025',
    client: 'Design Academy & Print Publication House',
    year: '2025',
    materials: 'Pantone Solid Coated Swatches, CMYK Ink Density Guides, Spectrophotometer Analysis',
    dimensions: 'Custom Color Wheel & Swatch Deck',
    colors: 'Pantone 871 C Gold, Process Cyan, Security Magenta, Key Black',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'In-depth study on color theory, chromatic harmony, CMYK to Pantone spot color conversion, and WCAG AA print accessibility contrast ratios for graphic design projects.',
    caseStudy: {
      challenge: 'Resolving color gamut discrepancies between digital RGB displays and offset CMYK press reproduction for complex gradient and security printing workflows.',
      approach: 'Developed a standardized 16-color harmony matrix with precise CMYK percentages, RGB hex equivalents, and Pantone Matching System (PMS) swatches.',
      specifications: [
        '16-Color Chromatic Palette Wheel & Contrast Matrix',
        'CMYK Ink Absorption profiles for coated vs uncoated stock',
        'WCAG 2.1 AA & AAA legibility contrast verification charts',
        'Dual-tone split ink formulas for specialized security inks',
        'Presentation Deck on Print Color Theory & Press Calibration'
      ],
      outcome: 'Eliminated color shift errors during offset printing, saving press run recalculations and producing vivid, repeatable color output.'
    },
    tags: ['Color Theory', 'CMYK Print', 'Pantone', 'Graphic Design', 'Accessibility'],
    presentationDeck: {
      id: 'deck-color-02',
      title: 'Color Theory & Press Calibration Deck',
      subtitle: 'CMYK Gamut, Spot Colors & Print Production',
      fileName: 'Color_Theory_and_Security_Palette_Deck.pptx',
      fileSize: '11.8 MB',
      slideCount: 5,
      slides: [
        {
          slideNumber: 1,
          title: 'Color Theory & Print Palette Masterclass',
          subtitle: 'From Screen RGB to Offset CMYK Precision',
          imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Additive (RGB) vs Subtractive (CMYK) Color Models',
            'Pantone Matching System (PMS) Spot Color Selection',
            'Color Psychology & Emotional Resonance in Graphic Branding'
          ],
          notes: 'Overview of color science fundamentals.'
        },
        {
          slideNumber: 2,
          title: 'The Chromatic Harmony Matrix',
          subtitle: 'Triadic, Split-Complementary & Analogous Systems',
          imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Warm Gold & Cool Slate Contrast Balance',
            '60-30-10 Palette Allocation Rule for Visual Hierarchy',
            'Hue, Saturation, and Lightness (HSL) Adjustments'
          ],
          notes: 'Explain how the 60-30-10 rule governs layout harmony.'
        },
        {
          slideNumber: 3,
          title: 'Press Ink Density & Paper Absorption',
          subtitle: 'Coated vs Uncoated Cardstock Behavior',
          imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Total Ink Limit (300% TAC max for heavy solids)',
            'Dot Gain compensation in Adobe Photoshop Curves',
            'Metallic Ink & Foil Stamping Undercoat Layers'
          ],
          notes: 'Technical slide for press operators and prepress technicians.'
        },
        {
          slideNumber: 4,
          title: 'WCAG Accessibility & Readability Standards',
          subtitle: 'Contrast Ratios for Typography & UI Icons',
          imageUrl: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '4.5:1 Minimum Contrast Ratio for Normal Text',
            '3:1 Minimum Contrast Ratio for Large Headings & UI Elements',
            'Color-Blindness Simulation (Protanopia & Deuteranopia checks)'
          ],
          notes: 'Emphasize inclusive design practices.'
        },
        {
          slideNumber: 5,
          title: 'Prepress Swatch Deliverables',
          subtitle: 'Digital ASE Files & Physical Swatch Deck',
          imageUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Adobe Swatch Exchange (.ASE) palette download',
            'Color specification sheets with CMYK, RGB, HEX, and PMS codes',
            'Press proofing approval checklist'
          ],
          notes: 'Wrap-up slide for client handoff.'
        }
      ]
    }
  },
  {
    id: 'project-gd-typo-03',
    title: 'Modular Grid & Editorial Typography System',
    subtitle: '12-Column Grid Architecture, Baseline Micro-Kerning & Adobe InDesign Layouts',
    category: 'graphic-design',
    categoryLabel: 'Typography & Layout Design',
    referenceCode: 'TYPO-GR-2025',
    client: 'Ken Perro Publishing & Architectural Journal',
    year: '2025',
    materials: 'Adobe InDesign Layout Templates, Variable Font Glyphs, Custom Type Pairings',
    dimensions: 'A4 Editorial Journal (210mm x 297mm)',
    colors: 'Charcoal Black, Ivory Cream, Crimson Accent',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Comprehensive typography and grid system exploration, pairing elegant serif display fonts with clean geometric sans and monospaced technical labels in Adobe InDesign.',
    caseStudy: {
      challenge: 'Structuring dense architectural text, high-resolution photography, and technical specification tables into a harmonious, rhythmic 12-column editorial grid layout.',
      approach: 'Built a modular baseline grid system with calculated vertical rhythm, optical kerning pairs, and custom paragraph styles in Adobe InDesign.',
      specifications: [
        '12-Column baseline grid template with 5mm gutters',
        'Typographic scale pairing: Playfair Serif Display + Plus Jakarta Sans + Monospace',
        'Optical micro-kerning and leading rules for multi-column text blocks',
        'Custom drop caps, running headers, and folio numbering graphics',
        'Presentation Deck on Editorial Grid & Typographic Hierarchy'
      ],
      outcome: 'Published in an award-winning design anthology praised for its flawless readability and spatial elegance.'
    },
    tags: ['Typography', 'Editorial Layout', 'Grid System', 'Adobe InDesign', 'Publication'],
    presentationDeck: {
      id: 'deck-typo-03',
      title: 'Editorial Typography & Grid Systems Presentation',
      subtitle: 'Modular Layouts & Optical Hierarchy',
      fileName: 'Typography_and_Grid_Systems_Presentation.pptx',
      fileSize: '16.5 MB',
      slideCount: 4,
      slides: [
        {
          slideNumber: 1,
          title: 'Modular Grid Architecture & Typography',
          subtitle: 'Designing Structural Discipline in Adobe InDesign',
          imageUrl: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '12-Column Grid Flexibility for Editorial Spread Layouts',
            'Baseline Grid Alignment to Maintain Vertical Rhythm',
            'Serif & Sans-Serif Typographic Pairings'
          ],
          notes: 'Introduction to modular publication grids.'
        },
        {
          slideNumber: 2,
          title: 'Typographic Scale & Visual Hierarchy',
          subtitle: 'Proportional Font Sizing & Line Height Math',
          imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '1.333 Perfect Fourth Type Ratio Scale (36pt, 27pt, 20pt, 15pt, 11pt)',
            'Line Height multiplier (1.4x to 1.6x for body text legibility)',
            'Tracking and kerning rules for uppercase headlines'
          ],
          notes: 'Explain the mathematical ratio used for headings.'
        },
        {
          slideNumber: 3,
          title: 'Adobe InDesign Automation & Styles',
          subtitle: 'Paragraph Styles, Character Styles & Master Pages',
          imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Nested paragraph styles for automated catalog callouts',
            'GREP expressions for preventing widowed words and awkward hyphenation',
            'Master Page A/B layouts for editorial vs advertisement spreads'
          ],
          notes: 'Demonstrate time-saving InDesign features.'
        },
        {
          slideNumber: 4,
          title: 'Prepress Export & Print Finishing',
          subtitle: 'PDF/X-1a Export, Bleed & Crop Marks',
          imageUrl: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '3mm Bleed and printer crop mark configuration',
            'High-resolution PDF/X-1a print export standards',
            'Saddle-stitch vs perfect binding layout adjustments'
          ],
          notes: 'Final prepress checklist.'
        }
      ]
    }
  },
  {
    id: 'project-gd-adobe-04',
    title: 'Adobe Creative Cloud Packaging & Photorealistic Render Systems',
    subtitle: 'Photoshop 3D Smart Object Mockups, Illustrator Die-lines & Metallic Foil Layering',
    category: 'graphic-design',
    categoryLabel: 'Adobe Creative Cloud Workflows',
    referenceCode: 'ADOBE-CC-2025',
    client: 'Boutique Cosmetic & Luxury Goods Retailer',
    year: '2025',
    materials: 'Adobe Illustrator, Photoshop 3D Smart Objects, Dimension Render Engine',
    dimensions: 'Custom Die-cut Packaging Boxes & Bottles',
    colors: 'Deep Emerald Green, Metallic Gold Foil, Soft Ivory',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Advanced package design workflow using the Adobe Creative Cloud suite: Illustrator vector dielines, Photoshop Smart Object 3D realistic mockups, and metallic foil die preparation.',
    caseStudy: {
      challenge: 'Presenting realistic photorealistic packaging mockups to stakeholders prior to expensive physical box manufacturing and foil die tooling.',
      approach: 'Created precise vector dielines in Adobe Illustrator, exported spot varnish separation layers, and mapped graphics onto high-resolution 3D Photoshop Smart Object mockups with metallic reflections.',
      specifications: [
        'Vector CAD package dieline template with fold, score, and bleed lines',
        'Photoshop Smart Object template with lighting and embossed shadow controls',
        'Separation layers for spot UV, gold foil, and blind embossing',
        'Full presentation slide deck for retail buyers and distributors'
      ],
      outcome: 'Accelerated client approval cycles and secured early retail presales before physical press production.'
    },
    tags: ['Adobe Creative Cloud', 'Packaging Design', '3D Mockup', 'Photoshop', 'Illustrator'],
    presentationDeck: {
      id: 'deck-adobe-04',
      title: 'Adobe Creative Cloud Packaging Pitch Deck',
      subtitle: 'From Vector Dielines to 3D Retail Mockups',
      fileName: 'Creative_Cloud_Packaging_Pitch.pptx',
      fileSize: '18.9 MB',
      slideCount: 4,
      slides: [
        {
          slideNumber: 1,
          title: 'Adobe Creative Cloud Packaging Workflow',
          subtitle: 'Illustrator Vector Dielines & Photoshop Photorealistic Mockups',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Seamless integration between Illustrator, Photoshop & InDesign',
            'Photorealistic 3D Smart Object rendering for client approvals',
            'Die-line CAD precision for press manufacturer tooling'
          ],
          notes: 'Overview of the end-to-end design toolchain.'
        },
        {
          slideNumber: 2,
          title: 'Vector Dieline Construction in Illustrator',
          subtitle: 'Cut, Fold, Score & Bleed Line Hierarchy',
          imageUrl: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Red line = Cut boundary (Die cut blade path)',
            'Green dashed line = Crease / Fold line',
            'Cyan line = Safety margin & graphics bleed boundary'
          ],
          notes: 'Explain standard prepress line color conventions.'
        },
        {
          slideNumber: 3,
          title: 'Photoshop 3D Renderings & Foil Simulation',
          subtitle: 'Smart Object Mapping & Realistic Reflections',
          imageUrl: 'https://images.unsplash.com/photo-1583209814683-c023dd293cc6?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            'Non-destructive Smart Object artwork replacement',
            'Specular highlight and reflection mask layers',
            'Simulating gold foil stamping with metallic displacement maps'
          ],
          notes: 'Show how client mockups match physical final press runs.'
        },
        {
          slideNumber: 4,
          title: 'Manufacturer Tooling & Separation Handover',
          subtitle: 'Spot Varnish, Foil Die & Emboss PDF Handouts',
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80',
          bulletPoints: [
            '100% K Spot Color layers for brass foil die creation',
            '100% Spot Varnish Separation vector files',
            'Final prepress package folder structure and font linking'
          ],
          notes: 'Final handoff details for package manufacturing.'
        }
      ]
    }
  },
  {
    id: 'project-id-graphic-01',
    title: "Louisiana State Driver's License & Security Document Graphic System",
    subtitle: "Precision Vector Security Guilloche, Holographic Watermarks & Regulatory Typography",
    category: 'graphic-design',
    categoryLabel: 'Graphic & ID Security Design',
    referenceCode: 'ID-LA-2025',
    client: 'Civic Security & State ID Regulatory Agency',
    year: '2025',
    materials: 'Vector Guilloche Matrix, Holographic Watermark Overlay, Micro-typography',
    dimensions: 'Standard CR80 (3.370" x 2.125")',
    colors: 'Sunburst Gold, Azure Blue, Security Crimson, Slate Black',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Comprehensive graphic layout design for official state driver licenses and secure ID cards, featuring complex anti-counterfeit vector line work, state seal hierarchy, and ghosted portrait framing.',
    caseStudy: {
      challenge: 'Engineering a high-security official identification document layout that satisfies stringent regulatory readability while embedding dynamic anti-tamper vector patterns and OCR compliance.',
      approach: 'Engineered multi-layered mathematical vector guilloche line patterns in golden and azure gradients. Structured clean optical hierarchy using high-legibility sans-serif and monospace numerals for license classification, expiration, and barcode zones.',
      specifications: [
        'Mathematical Vector Guilloche fine line background matrix preventing scan replication',
        'Dual-portrait security framing (Primary 1.5" x 2" photo + ghost secondary cutout)',
        'State Motto micro-text border framing ("Don\'t Drink and Drive / Don\'t Litter Louisiana")',
        'Machine-readable OCR typography formatting for automated state scanning compliance'
      ],
      outcome: 'Delivered an official graphic layout template accepted for state identity card production with clean field organization and tamper-resistant visuals.'
    },
    tags: ['Vector Graphic', 'Security Printing', 'Guilloche Layout', 'Typography', 'ID Design']
  },
  {
    id: 'project-ce-001',
    title: 'Swirled Harmony Ceramics - Brand Identity & Package Graphic Design',
    subtitle: 'Custom Brand Logo, Foil-Stamped Label Typography & Eco Packaging System',
    category: 'ceramics',
    categoryLabel: 'Ceramics Packaging & Branding',
    referenceCode: 'PKG-CE-001',
    client: 'Swirled Harmony Studio Pottery',
    year: '2024',
    price: '$85 Valuation',
    materials: 'Recycled Uncoated Cardstock, Metallic Foil Stamping, Custom Vector Brand Mark',
    dimensions: 'Custom Box 12" x 8" x 8"',
    colors: 'Earthy Warm Cream, Deep Indigo, Matte Gold Foil',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Complete graphic branding system for an artisanal pottery line, including logo design, textured wrap-around bottle/vessel labels, and foil-stamped unboxing packaging.',
    caseStudy: {
      challenge: 'Creating a modern graphic design system for a traditional ceramic craft brand that translates organic, hand-thrown textures into crisp, premium retail packaging.',
      approach: 'Designed a vector monogram mark inspired by potter wheel motion, paired with elegant serif typography and gold-foil stamped accents on textured recycled stock.',
      specifications: [
        'Vector Brand Logo & Monogram Mark development',
        'Die-cut wrap-around vessel labels with waterproof matte lamination',
        'Custom unboxing package graphics with foil-stamped brand story insert',
        'Retail shelf tag system with barcode and clay care typography'
      ],
      outcome: 'Elevated the studio pottery brand into boutique retail outlets with a 40% increase in gift set package sales.'
    },
    tags: ['Package Design', 'Brand Identity', 'Foil Stamping', 'Label Typography', 'Ceramic Brand']
  },
  {
    id: 'project-ce-002',
    title: 'Twisted Forms Exhibition - Typographic Poster & Graphic Catalog',
    subtitle: 'Minimalist Grid Layout, Architectural Typography & Editorial Graphic Design',
    category: 'ceramics',
    categoryLabel: 'Editorial & Poster Graphics',
    referenceCode: 'GR-POST-002',
    client: 'Modern Form Gallery & Architectural Review',
    year: '2024',
    price: '$120 Edition',
    materials: 'Cotton Rag Paper, Screen Printed Ink, Modular Typographic Grid',
    dimensions: '24" x 36" Large Format Poster',
    colors: 'Charcoal Black, Chalk White, Muted Clay Tone',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Swiss-style gallery poster and accompanying exhibition brochure featuring high-contrast architectural typography and silhouette photography of sculptural forms.',
    caseStudy: {
      challenge: 'Designing a compelling visual hierarchy that showcases white unglazed porcelain forms against minimalist typography without visual clutter.',
      approach: 'Constructed an asymmetric 12-column grid layout, pairing geometric sans-serif headers with stark monochromatic silhouette photography.',
      specifications: [
        '12-column modular graphic grid system for poster and catalog layout',
        'Custom high-density screen printing on 300gsm archival cotton rag',
        'Bilingual gallery exhibition typography formatting'
      ],
      outcome: 'Featured in regional graphic design publications and selected for the gallery’s official permanent archives.'
    },
    tags: ['Poster Design', 'Grid Typography', 'Editorial Layout', 'Graphic Design', 'Exhibition Poster']
  },
  {
    id: 'project-ce-003',
    title: 'Geometric Vessel Motif - Vector Surface Pattern & Product Label Graphics',
    subtitle: 'Graphic Pattern Systems, Die-Cut Box Packaging & Product Identity',
    category: 'ceramics',
    categoryLabel: 'Pattern & Package Design',
    referenceCode: 'GR-PAT-003',
    client: 'Artisan Living Tableware Co.',
    year: '2023',
    price: '$65 Packaging Set',
    materials: 'Die-Cut Kraft Box, Seamless Vector Geometric Pattern, Water-Based Inks',
    dimensions: 'Box Dimensions: 8" x 8" x 6"',
    colors: 'Crimson Red, Chalk White, Slate Grey',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Seamless vector geometric pattern design created for application across ceramic glaze stencils and outer retail carton box packaging.',
    caseStudy: {
      challenge: 'Translating bold red-and-white geometric motifs into a scalable vector pattern system suitable for both surface printing and package artwork.',
      approach: 'Developed a tessellating vector geometric matrix that wraps dynamically around package corners and product labels.',
      specifications: [
        'Seamless vector repeating pattern asset library',
        'Die-cut kraft package template with pattern sleeve overlay',
        'Eco-friendly water-based flexographic print specifications'
      ],
      outcome: 'A striking, cohesive product line graphic identity that stands out on retail shelves and e-commerce storefronts.'
    },
    tags: ['Pattern Design', 'Vector Illustration', 'Label Design', 'Packaging Graphics']
  },
  {
    id: 'project-leather-01',
    title: 'Ken Perro Leather Goods - Brand Identity & Embossed Print Collateral',
    subtitle: 'Custom Vector Logo, Metal Stamping Dies, Hang Tags & Leather-Grain Foil Graphics',
    category: 'leather',
    categoryLabel: 'Brand Identity & Print Collateral',
    referenceCode: 'BRAND-LP-01',
    client: 'Ken Perro Heritage Leatherworks',
    year: '2024',
    materials: 'Vegetable-Tanned Leather Tags, Brass Heat-Stamp Dies, Heavyweight Uncoated Stock',
    colors: 'Saddle Tan, Espresso Brown, Warm Gold Foil',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Comprehensive graphic branding suite for leathercraft, including vector logo mark, heat-emboss stamp graphics, care cards, and blind-embossed stationery.',
    caseStudy: {
      challenge: 'Designing a rugged yet refined graphic identity that can be cleanly vector-etched into metal brass dies for high-heat leather embossing and print foil stamping.',
      approach: 'Crafted a timeless typographic mark with precise vector anchor points optimized for hot-stamping on 4oz full-grain hides without bleed or loss of detail.',
      specifications: [
        'Vector Logo Suite & Emblem for CNC metal brass die production',
        'Blind-embossed business cards on 600gsm cotton cardstock',
        'Authenticity certificates with foil-stamped serial numbering graphics',
        'Care guide accordion insert with vector line diagrams'
      ],
      outcome: 'Established a recognizable heritage brand aesthetic applied across physical goods, print packaging, and digital channels.'
    },
    tags: ['Brand Identity', 'Logo Design', 'Print Collateral', 'Embossed Foil', 'Leather Brand']
  },
  {
    id: 'project-jw-br005',
    title: 'Architectural Jewelry Collection - Editorial Lookbook & Graphic Identity',
    subtitle: 'Custom Editorial Typography, Visual Grid Layout & Retail Brand Collateral',
    category: 'jewelry',
    categoryLabel: 'Editorial Lookbook & Typography',
    referenceCode: 'LOOKBOOK-JW-05',
    client: 'Bead & Form Haute Jewelry',
    year: '2024',
    price: '$50 Retail Book',
    materials: 'Heavyweight Velvet Touch Paper, Metallic Ink Printing, Custom Sans Grid',
    dimensions: '8.5" x 11" Editorial Booklet',
    colors: 'Chalk White, Crimson Red, Onyx Black',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1611591475193-2704770284df?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1611591475193-2704770284df?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Editorial publication design and promotional lookbook created for a sculptural jewelry launch, utilizing avant-garde typography and geometric image cropping.',
    caseStudy: {
      challenge: 'Designing a print lookbook that matches the bold, architectural geometry of handmade beaded jewelry pieces.',
      approach: 'Pioneered a stark, high-contrast layout combining dramatic full-bleed macros with generous whitespace and editorial typographic callouts.',
      specifications: [
        '24-Page print lookbook layout and typography styling',
        'Custom metallic spot-ink cover accent graphics',
        'Digital PDF catalog version with interactive hyperlinks'
      ],
      outcome: 'Distributed at international fashion trade shows and credited with securing key boutique retail distribution.'
    },
    tags: ['Editorial Design', 'Lookbook Layout', 'Typography', 'Brand Identity', 'Jewelry Catalog']
  },
  {
    id: 'project-jw-ea014',
    title: 'Earthy Motifs - Vector Pattern Graphics & Artisan Brand Style Guide',
    subtitle: 'Geometric Motif Vector System, Woven Product Label & Brand Collateral',
    category: 'jewelry',
    categoryLabel: 'Vector Pattern & Brand Identity',
    referenceCode: 'STYLEGUIDE-014',
    client: 'Earthy Motifs Artisan Collective',
    year: '2024',
    price: '$42 Asset Pack',
    materials: 'Woven Fabric Labels, Digital Vector Pattern Guidelines, Stationery System',
    dimensions: 'Brand Guidelines Document & Vector Assets',
    colors: 'Crimson Red, Chalk White, Deep Earth Ochre',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Brand identity system and graphic motif kit inspired by cultural beadwork, engineered into vector assets for print collateral and woven earring backing tags.',
    caseStudy: {
      challenge: 'Codifying complex hand-woven diamond beadwork patterns into crisp, scalable vector identity guidelines.',
      approach: 'Digitized traditional geometric weave patterns into modular vector graphics, establishing rules for color usage, typography hierarchy, and product tagging.',
      specifications: [
        'Comprehensive Brand Style Guide PDF with usage rules',
        'Vector pattern library for print packaging and web banners',
        'Micro-scale woven product hangtag graphics'
      ],
      outcome: 'Streamlined production across 12 artisan product lines with uniform brand presentation.'
    },
    tags: ['Vector Pattern', 'Brand Guidelines', 'Stationery Design', 'Graphic Design']
  },
  {
    id: 'project-jw-br007',
    title: 'Luxury Gold Bangle - Rigid Box Packaging & Graphic Campaign',
    subtitle: 'Hot Foil Stamp Box Graphics, Retail Display Cards & Campaign Assets',
    category: 'jewelry',
    categoryLabel: 'Packaging & Retail Graphic Design',
    referenceCode: 'PKG-LUX-007',
    client: 'Ken Perro Luxury Accessories',
    year: '2023',
    price: '$75 Packaging Box',
    materials: 'Rigid Box Linen Paper, 18k Gold Foil Stamping, Custom Embossed Insert',
    dimensions: 'Rigid Presentation Box 4" x 4" x 2"',
    colors: 'Warm Metallic Gold, Deep Charcoal, Linen Cream',
    featured: false,
    coverImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Luxury graphic packaging suite featuring precision gold foil stamping on linen-textured rigid boxes, accompanied by counter display signage graphics.',
    caseStudy: {
      challenge: 'Designing a tactile, high-end packaging experience that communicates luxury craft through minimal graphic elements.',
      approach: 'Applied metallic gold foil stamping on matte black linen paper with ultra-clean, generous typographic spacing.',
      specifications: [
        'Rigid gift box vector layout with foil stamp die files',
        'Retail jewelry display stand graphic backdrops',
        'Custom velvet pouch heat-transfer logo art'
      ],
      outcome: 'Created a memorable unboxing experience that increased customer social media shares and unboxing engagement.'
    },
    tags: ['Box Packaging', 'Foil Stamping', 'Retail Graphics', 'Luxury Identity']
  },
  {
    id: 'project-photo-01',
    title: 'Product Photography Direction & Digital/Print Campaign Graphic System',
    subtitle: 'Art Direction, Promotional Banner Graphics, Catalog Layout & Marketing Visuals',
    category: 'photography',
    categoryLabel: 'Art Direction & Campaign Graphics',
    referenceCode: 'CAMPAIGN-2025',
    client: 'Craft Regional Marketing Catalog',
    year: '2024',
    materials: 'Digital Ad Layouts, Print Catalog Banners, Typography Overlay System',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Comprehensive graphic campaign system combining studio product photography direction with high-impact promotional banners, social graphics, and catalog layouts.',
    caseStudy: {
      challenge: 'Unifying product photography of disparate materials (jewelry, ceramics, leather) under a cohesive graphic campaign framework with consistent typography and tone.',
      approach: 'Directed soft-diffuse studio lighting setups and paired them with custom graphic overlays, subtle typography frames, and promotional campaign banners.',
      specifications: [
        'Art direction & shot composition guidelines for studio photography',
        'Social media marketing banner templates (1080x1080, 1080x1920)',
        '40-Page printed wholesale catalog layout design'
      ],
      outcome: 'Delivered 50+ campaign assets deployed across print media and digital marketing channels.'
    },
    tags: ['Art Direction', 'Marketing Graphics', 'Digital Campaign', 'Catalog Layout']
  },
  {
    id: 'project-exhibit-01',
    title: 'Spatial Exhibition - Environmental Graphic System & Typography Wall Panels',
    subtitle: 'Large-Format Wayfinding Signage, Acrylic Exhibition Wall Graphics & Staging',
    category: 'exhibition',
    categoryLabel: 'Environmental Graphic Design',
    referenceCode: 'EXHIBIT-GRAPHIC-2025',
    client: 'Regional Artisan Showcase & Pop-Up Gallery',
    year: '2025',
    materials: 'Large-Format Vinyl Graphics, Muted Matte Acrylic Panels, Wayfinding Grid',
    dimensions: '10ft x 10ft Exhibition Booth & Wall Signage',
    featured: true,
    coverImage: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80'
    ],
    shortDescription: 'Environmental graphic design system for a gallery exhibition, including large-format entryway graphics, acrylic process story walls, and directional wayfinding signage.',
    caseStudy: {
      challenge: 'Transforming a physical booth space into an immersive visual gallery experience through environmental graphic typography and wall panels.',
      approach: 'Designed 24"x36" process wall panels with high-legibility typographic hierarchy, mounted on matte acrylic panels with standoff hardware.',
      specifications: [
        'Large-format vinyl wall graphic banners',
        'Acrylic wayfinding directional signage with standoff mounts',
        'Process story wall panels documenting design research'
      ],
      outcome: 'Voted Best Exhibition Graphic Installation at the regional design expo with high visitor foot traffic.'
    },
    tags: ['Environmental Graphics', 'Wayfinding', 'Large Format Print', 'Exhibition Typography']
  }
];
