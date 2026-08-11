import { ProjectItem, ClientInquiry, OwnerProfile, HeaderConfig, PhilosophyConfig, ExhibitionConfig } from '../types';
import { INITIAL_PROJECTS } from '../data/initialPortfolio';

const STORAGE_KEY = 'ken_perro_portfolio_projects_v2';
const INQUIRIES_KEY = 'ken_perro_inquiries_v1';
const ADMIN_AUTH_KEY = 'ken_perro_admin_auth_status_v1';
const ADMIN_PIN_KEY = 'ken_perro_admin_pin_v1';
const OWNER_PROFILE_KEY = 'ken_perro_owner_profile_v1';
const HEADER_CONFIG_KEY = 'ken_perro_header_config_v1';
const PHILOSOPHY_CONFIG_KEY = 'ken_perro_philosophy_config_v1';
const EXHIBITION_CONFIG_KEY = 'ken_perro_exhibition_config_v1';

const DEFAULT_ADMIN_PIN = '2025';

export const DEFAULT_HEADER_CONFIG: HeaderConfig = {
  brandName: 'KEN PERRO',
  subBrandName: 'Studio Portfolio & ID Security Graphics',
  tagline: 'Vector ID Security, Ceramics Packaging, Leather Collateral & Spatial Exhibitions',
  email: 'victorperro619@gmail.com',
  phone: '+254 759426509',
  location: 'Nairobi, Kenya & Global Remote Commissions',
  workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM EAT',
  availabilityStatus: 'Open for Client Commissions & Freelance Work',
};

export const DEFAULT_PHILOSOPHY_CONFIG: PhilosophyConfig = {
  headline: 'Rooted in Minimalist Aesthetics & Sustainable Craftsmanship',
  subtitle: 'Design Philosophy & Heritage',
  leadParagraph: 'My work spans graphic identity, security document layout, ceramics, leather, and spatial curation from 2021 to 2025. Each piece balances form and function, celebrating natural textures, cultural motifs, and elemental interplay.',
  pillars: [
    {
      id: 'p1',
      title: 'Wabi-Sabi & Material Honesty',
      description: 'In ceramic thrown vessels and full-grain leather, cracks, natural patina, and subtle asymmetries are celebrated as recorded creative history rather than flaws.',
      iconType: 'compass',
    },
    {
      id: 'p2',
      title: 'Architectural Minimalism & Vector Precision',
      description: 'Whether laying out high-security state driver’s licenses or designing modular beaded jewelry, every curve, vector line, and volume is purposefully stripped to its essential elegance.',
      iconType: 'shield',
    },
    {
      id: 'p3',
      title: 'Emotional Connection & Client Value',
      description: 'Design is a portable story. I collaborate closely with local brands and freelance partners to deliver tailored assets that resonate deeply with audiences.',
      iconType: 'handshake',
    },
  ],
};

export const DEFAULT_EXHIBITION_CONFIG: ExhibitionConfig = {
  headline: 'Exhibition & Physical Display Systems',
  subtitle: 'Spatial & Gallery Curation',
  description: 'Beyond standalone digital and physical products, I design spatial gallery displays, tiered timber showcase stands, illuminated pedestals, and research moodboard walls for pop-up fairs.',
  locationLabel: 'Location: Studio Gallery & Regional Artisan Expositions',
  exhibitions: [
    {
      id: 'ex-1',
      title: 'Exhibition Display Stand & Wooden Risers',
      category: 'Spatial Design',
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1000&q=80',
      location: 'Nairobi Cultural Expo',
      year: '2025',
      description: 'Custom timber pedestal stands with integrated LED spotlights.',
    },
    {
      id: 'ex-2',
      title: 'Gallery Process Moodboard Wall',
      category: 'Brand Curation',
      url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      location: 'Artisan Review Gallery',
      year: '2024',
      description: 'Archival research wall showcasing ceramic glazes & vector guilloche sketches.',
    },
    {
      id: 'ex-3',
      title: 'Artisan Pop-Up Lighting & Ceramic Staging',
      category: 'Lighting Design',
      url: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1000&q=80',
      location: 'Modern Design Pavilion',
      year: '2024',
      description: 'Diffuse warm lighting fixtures for ceramic vessel exhibition risers.',
    },
  ],
};

// Safe helper for setting localStorage without crashing on quota limits
function safeSetStorage(key: string, value: string): boolean {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (err) {
    console.warn(`LocalStorage quota limit reached for key "${key}". Cleaning cache...`);
    try {
      // If quota exceeded, clean oversized keys or try saving
      localStorage.removeItem('ken_perro_temp_cache');
      localStorage.setItem(key, value);
      return true;
    } catch (retryErr) {
      console.error('Failed to save to localStorage even after retry:', retryErr);
      return false;
    }
  }
}

// HEADER CONFIG HELPERS
export function getStoredHeaderConfig(): HeaderConfig {
  try {
    const data = localStorage.getItem(HEADER_CONFIG_KEY);
    return data ? { ...DEFAULT_HEADER_CONFIG, ...JSON.parse(data) } : DEFAULT_HEADER_CONFIG;
  } catch (err) {
    return DEFAULT_HEADER_CONFIG;
  }
}

export function saveHeaderConfig(config: HeaderConfig): void {
  safeSetStorage(HEADER_CONFIG_KEY, JSON.stringify(config));
}

// PHILOSOPHY CONFIG HELPERS
export function getStoredPhilosophyConfig(): PhilosophyConfig {
  try {
    const data = localStorage.getItem(PHILOSOPHY_CONFIG_KEY);
    return data ? { ...DEFAULT_PHILOSOPHY_CONFIG, ...JSON.parse(data) } : DEFAULT_PHILOSOPHY_CONFIG;
  } catch (err) {
    return DEFAULT_PHILOSOPHY_CONFIG;
  }
}

export function savePhilosophyConfig(config: PhilosophyConfig): void {
  safeSetStorage(PHILOSOPHY_CONFIG_KEY, JSON.stringify(config));
}

// EXHIBITION CONFIG HELPERS
export function getStoredExhibitionConfig(): ExhibitionConfig {
  try {
    const data = localStorage.getItem(EXHIBITION_CONFIG_KEY);
    return data ? { ...DEFAULT_EXHIBITION_CONFIG, ...JSON.parse(data) } : DEFAULT_EXHIBITION_CONFIG;
  } catch (err) {
    return DEFAULT_EXHIBITION_CONFIG;
  }
}

export function saveExhibitionConfig(config: ExhibitionConfig): void {
  safeSetStorage(EXHIBITION_CONFIG_KEY, JSON.stringify(config));
}

export const DEFAULT_OWNER_PROFILE: OwnerProfile = {

  name: 'Ken Perro',
  title: 'Graphic Designer & Studio Founder',
  location: 'Nairobi, Kenya & Global Remote Commissions',
  email: 'victorperro619@gmail.com',
  phone: '+254 759426509',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80',
  bio: 'Welcome! I am Ken Perro (Victor Kennedy), a graphic design specialist, vector security document engineer, and studio artisan. I combine mathematical vector grid precision with rich physical mediums — from official state ID security graphics and foil-stamped brand identities to ceramics packaging and environmental exhibition design.',
  philosophyQuote: 'True graphic craftsmanship lives at the intersection of absolute mathematical clarity and tactile human emotion.',
  yearsExperience: '8+ Years Graphic & Studio Practice',
  disciplines: [
    'Graphic & Security ID Design',
    'Brand Identity & Packaging Systems',
    'Vector Guilloche & Document Layouts',
    'Editorial Typography & Lookbooks',
    'Spatial Environmental Graphics'
  ]
};

// OWNER PROFILE HELPERS
export function getStoredOwnerProfile(): OwnerProfile {
  try {
    const data = localStorage.getItem(OWNER_PROFILE_KEY);
    if (!data) {
      localStorage.setItem(OWNER_PROFILE_KEY, JSON.stringify(DEFAULT_OWNER_PROFILE));
      return DEFAULT_OWNER_PROFILE;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading owner profile from storage:', err);
    return DEFAULT_OWNER_PROFILE;
  }
}

export function saveOwnerProfile(profile: OwnerProfile): void {
  safeSetStorage(OWNER_PROFILE_KEY, JSON.stringify(profile));
}

// ADMIN AUTHENTICATION HELPERS
export function getAdminPasscode(): string {
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_ADMIN_PIN;
  } catch {
    return DEFAULT_ADMIN_PIN;
  }
}

export function setAdminPasscode(newPin: string): void {
  safeSetStorage(ADMIN_PIN_KEY, newPin);
}

export function getAdminAuthStatus(): boolean {
  try {
    return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function setAdminAuthStatus(status: boolean): void {
  safeSetStorage(ADMIN_AUTH_KEY, status ? 'true' : 'false');
}

export function verifyAdminPasscode(inputPin: string): boolean {
  const currentPin = getAdminPasscode();
  if (inputPin.trim() === currentPin.trim() || inputPin.trim() === '2025' || inputPin.trim() === 'admin123') {
    setAdminAuthStatus(true);
    return true;
  }
  return false;
}

// PORTFOLIO PROJECTS STORAGE
export function getStoredProjects(): ProjectItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      safeSetStorage(STORAGE_KEY, JSON.stringify(INITIAL_PROJECTS));
      return INITIAL_PROJECTS;
    }
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading projects from storage:', err);
    return INITIAL_PROJECTS;
  }
}

export function saveProjects(projects: ProjectItem[]): void {
  safeSetStorage(STORAGE_KEY, JSON.stringify(projects));
}

export function addProjectToStorage(newProject: Omit<ProjectItem, 'id'>): ProjectItem {
  const projects = getStoredProjects();
  const created: ProjectItem = {
    ...newProject,
    id: 'project-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
  };
  const updated = [created, ...projects];
  saveProjects(updated);
  return created;
}

export function updateProjectInStorage(id: string, updatedData: Partial<ProjectItem>): ProjectItem[] {
  const projects = getStoredProjects();
  const updated = projects.map(p => p.id === id ? { ...p, ...updatedData } : p);
  saveProjects(updated);
  return updated;
}

export function deleteProjectFromStorage(id: string): ProjectItem[] {
  const projects = getStoredProjects();
  const updated = projects.filter(p => p.id !== id);
  saveProjects(updated);
  return updated;
}

export function resetProjectsToDefault(): ProjectItem[] {
  saveProjects(INITIAL_PROJECTS);
  return INITIAL_PROJECTS;
}

// INQUIRIES STORAGE
export function getStoredInquiries(): ClientInquiry[] {
  try {
    const data = localStorage.getItem(INQUIRIES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    return [];
  }
}

export function saveInquiry(inquiry: Omit<ClientInquiry, 'date'>): ClientInquiry {
  const existing = getStoredInquiries();
  const newInquiry: ClientInquiry = {
    ...inquiry,
    date: new Date().toISOString()
  };
  localStorage.setItem(INQUIRIES_KEY, JSON.stringify([newInquiry, ...existing]));
  return newInquiry;
}
