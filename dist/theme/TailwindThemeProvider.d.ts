import React from 'react';
import { ThemeContextType } from './ThemeProvider';
export interface TailwindThemeContextType extends ThemeContextType {
    tailwindConfig: Record<string, any>;
    applyTailwindTheme: () => void;
}
export declare const TailwindThemeContext: React.Context<TailwindThemeContextType | undefined>;
export interface TailwindThemeProviderProps {
    children: React.ReactNode;
    themePath?: string;
    initialPreset?: string | null;
    enableTailwind?: boolean;
}
export declare const TailwindThemeProvider: React.FC<TailwindThemeProviderProps>;
/**
 * Hook to use Tailwind theme context
 */
export declare function useTailwindTheme(): TailwindThemeContextType;
//# sourceMappingURL=TailwindThemeProvider.d.ts.map