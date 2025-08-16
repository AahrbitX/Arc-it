import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ContentData, ContentOptions, ContentSection, ContentStylePreset, ContentStyleConfig } from './types';
import { loadContent, DEFAULT_CONTENT_OPTIONS, DEFAULT_CONTENT_STYLES, DEFAULT_CONTENT_STYLE_CONFIG, getContentStyle } from './content';

// ============================================================================
// 🎨 CONTENT CONTEXT TYPES
// ============================================================================

export interface ContentContextType {
  // Content management
  content: ContentData;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
  getSection: (section: string) => ContentSection | null;
  
  // Language management
  language: string;
  setLanguage: (language: string) => void;
  languages: string[];
  
  // Content style management
  currentContentStyle: string;
  availableContentStyles: ContentStylePreset[];
  setContentStyle: (styleId: string) => void;
  getContentStyle: (styleId?: string) => ContentStylePreset | null;
  resetContentStyleToDefault: () => void;
  
  // Configuration
  options: ContentOptions;
  updateOptions: (newOptions: Partial<ContentOptions>) => void;
}

// ============================================================================
// 🎨 CONTENT CONTEXT
// ============================================================================

export const ContentContext = createContext<ContentContextType | undefined>(undefined);

// ============================================================================
// 🎨 CONTENT PROVIDER PROPS
// ============================================================================

interface ContentProviderProps {
  children: ReactNode;
  source?: string | Record<string, any>;
  options?: Partial<ContentOptions>;
  initialLanguage?: string;
  initialContentStyle?: string;
  customContentStyles?: ContentStylePreset[];
}

// ============================================================================
// 🎨 CONTENT PROVIDER COMPONENT
// ============================================================================

export function ContentProvider({
  children,
  source = '/content/content.json',
  options = {},
  initialLanguage = 'en',
  initialContentStyle = 'default',
  customContentStyles = []
}: ContentProviderProps) {
  // ============================================================================
  // 🎯 STATE MANAGEMENT
  // ============================================================================
  
  const [content, setContent] = useState<ContentData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState(initialLanguage);
  const [currentContentStyle, setCurrentContentStyle] = useState(initialContentStyle);
  
  // Merge default options with provided options
  const mergedOptions = { ...DEFAULT_CONTENT_OPTIONS, ...options };
  
  // Merge default content styles with custom ones
  const availableContentStyles = [
    ...DEFAULT_CONTENT_STYLES,
    ...customContentStyles
  ];
  
  // ============================================================================
  // 🎯 CONTENT LOADING
  // ============================================================================
  
  const loadContentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const contentData = await loadContent(source, mergedOptions);
      setContent(contentData);
      
      // Validate initial content style
      if (!validateContentStyle(initialContentStyle, availableContentStyles)) {
        console.warn(`Invalid initial content style: ${initialContentStyle}, falling back to default`);
        setCurrentContentStyle('default');
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
      console.error('Content loading error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // ============================================================================
  // 🎯 CONTENT STYLE VALIDATION
  // ============================================================================
  
  const validateContentStyle = (styleId: string, styles: ContentStylePreset[]): boolean => {
    return styles.some(style => style.id === styleId);
  };
  
  // ============================================================================
  // 🎯 CONTENT STYLE MANAGEMENT
  // ============================================================================
  
  const handleSetContentStyle = (styleId: string) => {
    if (validateContentStyle(styleId, availableContentStyles)) {
      setCurrentContentStyle(styleId);
    } else {
      console.warn(`Invalid content style: ${styleId}`);
    }
  };
  
  const handleGetContentStyle = (styleId?: string): ContentStylePreset | null => {
    const targetStyle = styleId || currentContentStyle;
    return getContentStyle(targetStyle, availableContentStyles);
  };
  
  const handleResetContentStyleToDefault = () => {
    setCurrentContentStyle(mergedOptions.defaultLanguage || 'default');
  };
  
  // ============================================================================
  // 🎯 LANGUAGE MANAGEMENT
  // ============================================================================
  
  const handleSetLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };
  
  // Get available languages from content
  const languages = Object.keys(content.languages || {});
  
  // ============================================================================
  // 🎯 CONTENT SECTION MANAGEMENT
  // ============================================================================
  
  const getSection = (section: string): ContentSection | null => {
    if (!content) return null;
    
    // Try to get section from current language first
    if (content.languages && content.languages[language]) {
      const localizedContent = content.languages[language] as ContentData;
      if (localizedContent[section]) {
        return localizedContent[section] as ContentSection;
      }
    }
    
    // Fallback to main content
    return content[section] || null;
  };
  
  // ============================================================================
  // 🎯 EFFECTS
  // ============================================================================
  
  useEffect(() => {
    loadContentData();
  }, [source]);
  
  // ============================================================================
  // 🎯 CONTEXT VALUE
  // ============================================================================
  
  const contextValue: ContentContextType = {
    // Content management
    content,
    loading,
    error,
    reload: loadContentData,
    getSection,
    
    // Language management
    language,
    setLanguage: handleSetLanguage,
    languages,
    
    // Content style management
    currentContentStyle,
    availableContentStyles,
    setContentStyle: handleSetContentStyle,
    getContentStyle: handleGetContentStyle,
    resetContentStyleToDefault: handleResetContentStyleToDefault,
    
    // Configuration
    options: mergedOptions,
    updateOptions: (newOptions: Partial<ContentOptions>) => {
      Object.assign(mergedOptions, newOptions);
    }
  };
  
  // ============================================================================
  // 🎨 RENDER
  // ============================================================================
  
  return (
    <ContentContext.Provider value={contextValue}>
      {children}
    </ContentContext.Provider>
  );
}

// ============================================================================
// 🎯 CONTEXT CONSUMER HOOK
// ============================================================================

export function useContentContext(): ContentContextType {
  const context = useContext(ContentContext);
  
  if (context === undefined) {
    throw new Error('useContentContext must be used within a ContentProvider');
  }
  
  return context;
}
