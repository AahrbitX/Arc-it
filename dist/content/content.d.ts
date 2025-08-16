/**
 * Core content management functionality
 */
import { ContentData, ContentOptions, ContentSection, ContentSource, ContentStylePreset, ContentStyleConfig } from './types';
/**
 * Default content options
 */
export declare const DEFAULT_CONTENT_OPTIONS: ContentOptions;
/**
 * Default content styles
 */
export declare const DEFAULT_CONTENT_STYLES: ContentStylePreset[];
/**
 * Default content style configuration
 */
export declare const DEFAULT_CONTENT_STYLE_CONFIG: ContentStyleConfig;
/**
 * Load content from a source (URL or object)
 */
export declare function loadContent(source: ContentSource, options?: ContentOptions): Promise<ContentData>;
/**
 * Get a specific section from content data
 */
export declare function getContentSection(content: ContentData, section: string): ContentSection | null;
/**
 * Get localized content for the specified language
 */
export declare function getLocalizedContent(content: ContentData, language: string, fallbackLanguage?: string): ContentData;
/**
 * Parse content string with variables
 */
export declare function parseContentVariables(text: string, variables?: Record<string, string>): string;
/**
 * Clear the content cache
 */
export declare function clearContentCache(contentPath?: string): void;
/**
 * Get content style by ID
 */
export declare function getContentStyle(styleId: string, availableStyles?: ContentStylePreset[]): ContentStylePreset | null;
/**
 * Get current content style configuration
 */
export declare function getContentStyleConfig(currentStyle?: string, availableStyles?: ContentStylePreset[]): ContentStyleConfig;
/**
 * Validate content style
 */
export declare function validateContentStyle(styleId: string, availableStyles?: ContentStylePreset[]): boolean;
/**
 * Get content style metadata
 */
export declare function getContentStyleMetadata(styleId: string, availableStyles?: ContentStylePreset[]): Record<string, any> | null;
/**
 * Get content style sections
 */
export declare function getContentStyleSections(styleId: string, availableStyles?: ContentStylePreset[]): string[] | null;
//# sourceMappingURL=content.d.ts.map