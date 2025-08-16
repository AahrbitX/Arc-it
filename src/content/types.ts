/**
 * Content management type definitions
 */

export type ContentPath = string;

export type ContentSource = ContentPath | Record<string, any>;

export interface ContentSection {
  [key: string]: any;
}

export interface ContentData {
  [section: string]: ContentSection;
}

export type ContentFormat = 'json' | 'markdown' | 'html' | 'text';

export interface ContentOptions {
  defaultLanguage?: string;
  supportedLanguages?: string[];
  format?: ContentFormat;
  baseUrl?: string;
  cacheDuration?: number;
}

// ============================================================================
// 🎨 CONTENT STYLE MANAGEMENT
// ============================================================================

export interface ContentStyle {
  id: string;
  name: string;
  description: string;
  icon?: string;
  layout?: string;
  sections?: string[];
  metadata?: Record<string, any>;
}

export interface ContentStylePreset {
  id: string;
  name: string;
  description: string;
  icon?: string;
  styles: ContentStyle;
}

export interface ContentStyleConfig {
  currentStyle: string;
  availableStyles: ContentStylePreset[];
  defaultStyle: string;
}

export interface ContentStyleContext {
  currentStyle: string;
  availableStyles: ContentStylePreset[];
  setContentStyle: (styleId: string) => void;
  getContentStyle: (styleId?: string) => ContentStylePreset | null;
  resetToDefault: () => void;
}
