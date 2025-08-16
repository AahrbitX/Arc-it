import React, { ReactNode } from 'react';
import { ContentData, ContentOptions, ContentSection, ContentStylePreset } from './types';
export interface ContentContextType {
    content: ContentData;
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
    getSection: (section: string) => ContentSection | null;
    language: string;
    setLanguage: (language: string) => void;
    languages: string[];
    currentContentStyle: string;
    availableContentStyles: ContentStylePreset[];
    setContentStyle: (styleId: string) => void;
    getContentStyle: (styleId?: string) => ContentStylePreset | null;
    resetContentStyleToDefault: () => void;
    options: ContentOptions;
    updateOptions: (newOptions: Partial<ContentOptions>) => void;
}
export declare const ContentContext: React.Context<ContentContextType | undefined>;
interface ContentProviderProps {
    children: ReactNode;
    source?: string | Record<string, any>;
    options?: Partial<ContentOptions>;
    initialLanguage?: string;
    initialContentStyle?: string;
    customContentStyles?: ContentStylePreset[];
}
export declare function ContentProvider({ children, source, options, initialLanguage, initialContentStyle, customContentStyles }: ContentProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useContentContext(): ContentContextType;
export {};
//# sourceMappingURL=ContentProvider.d.ts.map