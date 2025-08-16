/**
 * Core content management functionality
 */

import { ContentData, ContentOptions, ContentSection, ContentSource, ContentStylePreset, ContentStyleConfig } from './types';

/**
 * Default content options
 */
export const DEFAULT_CONTENT_OPTIONS: ContentOptions = {
  defaultLanguage: 'en',
  format: 'json',
  cacheDuration: 3600000 // 1 hour
};

/**
 * Default content styles
 */
export const DEFAULT_CONTENT_STYLES: ContentStylePreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Standard website content and layout',
    icon: 'layout',
    styles: {
      id: 'default',
      name: 'Default',
      description: 'Standard website content and layout',
      layout: 'standard',
      sections: ['header', 'main', 'footer']
    }
  },
  {
    id: 'marketing',
    name: 'Marketing Focus',
    description: 'Content optimized for conversions',
    icon: 'file-text',
    styles: {
      id: 'marketing',
      name: 'Marketing Focus',
      description: 'Content optimized for conversions',
      layout: 'marketing',
      sections: ['hero', 'features', 'cta', 'testimonials']
    }
  },
  {
    id: 'portfolio',
    name: 'Portfolio Style',
    description: 'Showcase-focused content layout',
    icon: 'image',
    styles: {
      id: 'portfolio',
      name: 'Portfolio Style',
      description: 'Showcase-focused content layout',
      layout: 'portfolio',
      sections: ['gallery', 'about', 'contact']
    }
  },
  {
    id: 'business',
    name: 'Business Focus',
    description: 'Professional business content',
    icon: 'briefcase',
    styles: {
      id: 'business',
      name: 'Business Focus',
      description: 'Professional business content',
      layout: 'business',
      sections: ['services', 'team', 'clients', 'contact']
    }
  }
];

/**
 * Default content style configuration
 */
export const DEFAULT_CONTENT_STYLE_CONFIG: ContentStyleConfig = {
  currentStyle: 'default',
  availableStyles: DEFAULT_CONTENT_STYLES,
  defaultStyle: 'default'
};

/**
 * Cache for content data
 */
interface ContentCache {
  [key: string]: {
    data: ContentData;
    timestamp: number;
  };
}

const contentCache: ContentCache = {};

/**
 * Load content from a source (URL or object)
 */
export async function loadContent(
  source: ContentSource,
  options: ContentOptions = DEFAULT_CONTENT_OPTIONS
): Promise<ContentData> {
  // If source is already an object, return it directly
  if (typeof source !== 'string') {
    return source as ContentData;
  }
  
  const contentPath = source;
  
  // Check cache if available and not expired
  const cacheKey = contentPath;
  const now = Date.now();
  const cachedContent = contentCache[cacheKey];
  
  if (
    cachedContent &&
    options.cacheDuration &&
    now - cachedContent.timestamp < options.cacheDuration
  ) {
    return cachedContent.data;
  }
  
  try {
    // Fetch content from URL
    const response = await fetch(contentPath);
    
    if (!response.ok) {
      throw new Error(`Failed to load content from ${contentPath}`);
    }
    
    let contentData: ContentData;
    
    // Process based on format
    switch (options.format) {
      case 'json':
        contentData = await response.json();
        break;
      case 'text':
      case 'markdown':
      case 'html':
        const text = await response.text();
        contentData = { content: { text } };
        break;
      default:
        contentData = await response.json();
    }
    
    // Cache the content
    contentCache[cacheKey] = {
      data: contentData,
      timestamp: now
    };
    
    return contentData;
  } catch (error) {
    console.error('Failed to load content:', error);
    // Return empty content data as fallback
    return {};
  }
}

/**
 * Get a specific section from content data
 */
export function getContentSection(content: ContentData, section: string): ContentSection | null {
  return content[section] || null;
}

/**
 * Get localized content for the specified language
 */
export function getLocalizedContent(
  content: ContentData,
  language: string,
  fallbackLanguage: string = 'en'
): ContentData {
  // Check if content has languages
  if (content.languages && content[language]) {
    return content[language] as ContentData;
  }
  
  // Check if content has fallback language
  if (content.languages && content[fallbackLanguage]) {
    return content[fallbackLanguage] as ContentData;
  }
  
  // Return the content as is if no language structure is found
  return content;
}

/**
 * Parse content string with variables
 */
export function parseContentVariables(text: string, variables: Record<string, string> = {}): string {
  if (!text || typeof text !== 'string') return '';
  
  return text.replace(/\{\{(.*?)\}\}/g, (match, key) => {
    const trimmedKey = key.trim();
    return variables[trimmedKey] !== undefined ? variables[trimmedKey] : match;
  });
}

/**
 * Clear the content cache
 */
export function clearContentCache(contentPath?: string): void {
  if (contentPath) {
    delete contentCache[contentPath];
  } else {
    // Clear all cache
    Object.keys(contentCache).forEach(key => {
      delete contentCache[key];
    });
  }
}

// ============================================================================
// 🎨 CONTENT STYLE MANAGEMENT FUNCTIONS
// ============================================================================

/**
 * Get content style by ID
 */
export function getContentStyle(styleId: string, availableStyles: ContentStylePreset[] = DEFAULT_CONTENT_STYLES): ContentStylePreset | null {
  return availableStyles.find(style => style.id === styleId) || null;
}

/**
 * Get current content style configuration
 */
export function getContentStyleConfig(
  currentStyle: string = 'default',
  availableStyles: ContentStylePreset[] = DEFAULT_CONTENT_STYLES
): ContentStyleConfig {
  return {
    currentStyle,
    availableStyles,
    defaultStyle: 'default'
  };
}

/**
 * Validate content style
 */
export function validateContentStyle(styleId: string, availableStyles: ContentStylePreset[] = DEFAULT_CONTENT_STYLES): boolean {
  return availableStyles.some(style => style.id === styleId);
}

/**
 * Get content style metadata
 */
export function getContentStyleMetadata(styleId: string, availableStyles: ContentStylePreset[] = DEFAULT_CONTENT_STYLES): Record<string, any> | null {
  const style = getContentStyle(styleId, availableStyles);
  return style?.styles.metadata || null;
}

/**
 * Get content style sections
 */
export function getContentStyleSections(styleId: string, availableStyles: ContentStylePreset[] = DEFAULT_CONTENT_STYLES): string[] | null {
  const style = getContentStyle(styleId, availableStyles);
  return style?.styles.sections || null;
}
