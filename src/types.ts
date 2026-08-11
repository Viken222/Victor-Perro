export type CategoryType = 
  | 'all'
  | 'graphic-design'
  | 'ceramics'
  | 'leather'
  | 'jewelry'
  | 'photography'
  | 'exhibition';

export interface PPTSlide {
  slideNumber: number;
  title: string;
  subtitle?: string;
  imageUrl?: string;
  bulletPoints?: string[];
  notes?: string;
  codeOrDiagram?: string;
}

export interface PresentationDeck {
  id?: string;
  title: string;
  subtitle?: string;
  fileName?: string;
  fileSize?: string;
  pptFileUrl?: string; // Direct link or data URL of uploaded PPT/PPTX file
  slideCount: number;
  slides: PPTSlide[];
  description?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryType;
  categoryLabel: string;
  referenceCode?: string;
  client?: string;
  year: string;
  price?: string;
  materials?: string;
  dimensions?: string;
  colors?: string;
  featured: boolean;
  coverImage: string;
  galleryImages: string[];
  shortDescription: string;
  caseStudy: {
    challenge: string;
    approach: string;
    specifications: string[];
    outcome: string;
  };
  tags: string[];
  presentationDeck?: PresentationDeck;
  customFields?: { label: string; value: string }[];
}

export interface ClientInquiry {
  name: string;
  email: string;
  phone?: string;
  serviceCategory: string;
  budgetRange: string;
  message: string;
  date: string;
}

export interface OwnerProfile {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  photoUrl: string;
  bio: string;
  philosophyQuote: string;
  yearsExperience: string;
  disciplines: string[];
}

export interface HeaderConfig {
  brandName: string;
  subBrandName: string;
  tagline: string;
  email: string;
  phone: string;
  location: string;
  workingHours: string;
  availabilityStatus: string;
}

export interface PhilosophyPillar {
  id: string;
  title: string;
  description: string;
  iconType: 'compass' | 'shield' | 'handshake' | 'sparkles' | 'pen' | 'layers';
}

export interface PhilosophyConfig {
  headline: string;
  subtitle: string;
  leadParagraph: string;
  pillars: PhilosophyPillar[];
}

export interface ExhibitionItem {
  id: string;
  title: string;
  category: string;
  url: string;
  location?: string;
  year?: string;
  description?: string;
}

export interface ExhibitionConfig {
  headline: string;
  subtitle: string;
  description: string;
  locationLabel: string;
  exhibitions: ExhibitionItem[];
}

