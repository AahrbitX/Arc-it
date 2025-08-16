import { ContentContextType } from './ContentProvider';
import { ContentSection, ContentStylePreset } from './types';
/**
 * Hook to access content and content methods
 */
export declare function useContent(): ContentContextType;
/**
 * Hook to access a specific content section
 */
export declare function useContentSection(section: string): ContentSection | null;
/**
 * Hook to access content by path
 */
export declare function useContentPath(path: string, defaultValue?: any): any;
/**
 * Hook to work with localized content
 */
export declare function useLocalizedContent(section?: string): ContentSection | null;
/**
 * Hook to reload content
 */
export declare function useReloadContent(): () => Promise<void>;
/**
 * Hook to get the current language
 */
export declare function useContentLanguage(): {
    language: string;
    setLanguage: (language: string) => void;
};
/**
 * Hook to access content style management
 */
export declare function useContentStyle(): {
    currentStyle: string;
    availableStyles: ContentStylePreset[];
    setContentStyle: (styleId: string) => void;
    getContentStyle: (styleId?: string) => ContentStylePreset | null;
    resetToDefault: () => void;
};
/**
 * Hook to get current content style
 */
export declare function useCurrentContentStyle(): ContentStylePreset | null;
/**
 * Hook to get content style by ID
 */
export declare function useContentStyleById(styleId: string): ContentStylePreset | null;
/**
 * Hook to check if a content style is active
 */
export declare function useIsContentStyleActive(styleId: string): boolean;
/**
 * Hook to get content style metadata
 */
export declare function useContentStyleMetadata(styleId?: string): Record<string, any> | null;
/**
 * Hook to get content style sections
 */
export declare function useContentStyleSections(styleId?: string): string[] | null;
/**
 * Get language name from language code
 */
export declare function getLanguageName(language: string): string;
/**
 * Get language description from language code
 */
export declare function getLanguageDescription(language: string): string;
/**
 * Hook to dynamically detect available content styles and languages from loaded content data
 * This automatically discovers content options without hardcoding them
 */
export declare const useDynamicContentDetection: () => {
    getDynamicContentInfo: () => {
        availableLanguages: string[];
        contentSections: string[];
        contentStyles: string[];
    };
    getContentMetadata: (sectionName: string) => any;
    hasContentData: boolean;
    currentContentData: import("./types").ContentData;
};
//# sourceMappingURL=hooks.d.ts.map