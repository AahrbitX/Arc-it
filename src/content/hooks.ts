import { useContext } from 'react';
import { ContentContext, ContentContextType } from './ContentProvider';
import { ContentSection, ContentStylePreset } from './types';

/**
 * Hook to access content and content methods
 */
export function useContent(): ContentContextType {
  const context = useContext(ContentContext);
  
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  
  return context;
}

/**
 * Hook to access a specific content section
 */
export function useContentSection(section: string): ContentSection | null {
  const { getSection } = useContent();
  return getSection(section);
}

/**
 * Hook to access content by path
 */
export function useContentPath(path: string, defaultValue?: any): any {
  const { content } = useContent();
  
  if (!path) return content;
  
  // Split path by dots and reduce through the content object
  const value = path.split('.').reduce((obj: any, key: string) => {
    return obj && typeof obj === 'object' ? obj[key] : undefined;
  }, content);
  
  return value !== undefined ? value : defaultValue;
}

/**
 * Hook to work with localized content
 */
export function useLocalizedContent(section?: string): ContentSection | null {
  const { content, language } = useContent();
  
  // Get localized content based on current language
  const localizedContent = content[language] || content;
  
  if (!section) return localizedContent;
  
  return localizedContent?.[section] || null;
}

/**
 * Hook to reload content
 */
export function useReloadContent(): () => Promise<void> {
  const { reload } = useContent();
  return reload;
}

/**
 * Hook to get the current language
 */
export function useContentLanguage(): {
  language: string;
  setLanguage: (language: string) => void;
} {
  const { language, setLanguage } = useContent();
  return { language, setLanguage };
}

// ============================================================================
// 🎨 CONTENT STYLE HOOKS
// ============================================================================

/**
 * Hook to access content style management
 */
export function useContentStyle(): {
  currentStyle: string;
  availableStyles: ContentStylePreset[];
  setContentStyle: (styleId: string) => void;
  getContentStyle: (styleId?: string) => ContentStylePreset | null;
  resetToDefault: () => void;
} {
  const { 
    currentContentStyle, 
    availableContentStyles, 
    setContentStyle, 
    getContentStyle, 
    resetContentStyleToDefault 
  } = useContent();
  
  return {
    currentStyle: currentContentStyle,
    availableStyles: availableContentStyles,
    setContentStyle,
    getContentStyle,
    resetToDefault: resetContentStyleToDefault
  };
}

/**
 * Hook to get current content style
 */
export function useCurrentContentStyle(): ContentStylePreset | null {
  const { getContentStyle, currentStyle } = useContentStyle();
  return getContentStyle(currentStyle);
}

/**
 * Hook to get content style by ID
 */
export function useContentStyleById(styleId: string): ContentStylePreset | null {
  const { getContentStyle } = useContentStyle();
  return getContentStyle(styleId);
}

/**
 * Hook to check if a content style is active
 */
export function useIsContentStyleActive(styleId: string): boolean {
  const { currentStyle } = useContentStyle();
  return currentStyle === styleId;
}

/**
 * Hook to get content style metadata
 */
export function useContentStyleMetadata(styleId?: string): Record<string, any> | null {
  const { getContentStyle } = useContentStyle();
  const style = getContentStyle(styleId);
  return style?.styles.metadata || null;
}

/**
 * Hook to get content style sections
 */
export function useContentStyleSections(styleId?: string): string[] | null {
  const { getContentStyle } = useContentStyle();
  const style = getContentStyle(styleId);
  return style?.styles.sections || null;
}

// ============================================================================
// 🎯 UTILITY FUNCTIONS
// ============================================================================

/**
 * Get language name from language code
 */
export function getLanguageName(language: string): string {
  const names: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    ru: 'Русский',
    ja: '日本語',
    ko: '한국어',
    zh: '中文'
  };
  return names[language] || language;
}

/**
 * Get language description from language code
 */
export function getLanguageDescription(language: string): string {
  const descriptions: Record<string, string> = {
    en: 'Primary language',
    es: 'Spanish language support',
    fr: 'French language support',
    de: 'German language support',
    it: 'Italian language support',
    pt: 'Portuguese language support',
    ru: 'Russian language support',
    ja: 'Japanese language support',
    ko: 'Korean language support',
    zh: 'Chinese language support'
  };
  return descriptions[language] || 'Language support';
}

/**
 * Hook to dynamically detect available content styles and languages from loaded content data
 * This automatically discovers content options without hardcoding them
 */
export const useDynamicContentDetection = () => {
  const { content, language, languages } = useContent();
  
  // Dynamically extract content information from loaded content data
  const getDynamicContentInfo = () => {
    if (!content) return { availableLanguages: [], contentSections: [], contentStyles: [] };
    
    const availableLanguages: string[] = [];
    const contentSections: string[] = [];
    const contentStyles: string[] = [];
    
    // Extract available languages from content structure
    if (typeof content === 'object') {
      // Look for language-specific content
      Object.keys(content).forEach(key => {
        if (key.length === 2 && /^[a-z]{2}$/.test(key)) {
          // This looks like a language code (en, es, fr, etc.)
          availableLanguages.push(key);
        } else if (typeof content[key] === 'object' && content[key] !== null) {
          // This looks like a content section
          contentSections.push(key);
        }
      });
    }
    
    // If no specific languages found, assume content is in current language
    if (availableLanguages.length === 0 && language) {
      availableLanguages.push(language);
    }
    
    // Extract content styles from content structure
    if (content.styles) {
      Object.keys(content.styles).forEach(styleKey => {
        contentStyles.push(styleKey);
      });
    }
    
    return { availableLanguages, contentSections, contentStyles };
  };
  
  // Get content metadata (description, icon, etc.) from content data
  const getContentMetadata = (sectionName: string) => {
    if (!content?.metadata?.[sectionName]) {
      return {
        description: `${sectionName} content`,
        icon: 'file-text',
        category: 'content'
      };
    }
    
    return content.metadata[sectionName];
  };
  
  return {
    getDynamicContentInfo,
    getContentMetadata,
    hasContentData: !!content,
    currentContentData: content
  };
};
