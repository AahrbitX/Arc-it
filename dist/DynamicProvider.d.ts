import { ReactNode } from 'react';
interface DynamicProviderProps {
    children: ReactNode;
    themePath?: string;
    initialThemePreset?: string | null;
    contentSource?: string | Record<string, any>;
    contentOptions?: {
        defaultLanguage?: string;
        supportedLanguages?: string[];
        format?: 'json' | 'markdown' | 'html' | 'text';
        baseUrl?: string;
        cacheDuration?: number;
    };
    initialLanguage?: string;
    initialContentStyle?: string;
    customContentStyles?: Array<{
        id: string;
        name: string;
        description: string;
        icon?: string;
        styles: {
            id: string;
            name: string;
            description: string;
            layout?: string;
            sections?: string[];
            metadata?: Record<string, any>;
        };
    }>;
}
export declare function DynamicProvider({ children, themePath, initialThemePreset, contentSource, contentOptions, initialLanguage, initialContentStyle, customContentStyles }: DynamicProviderProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=DynamicProvider.d.ts.map