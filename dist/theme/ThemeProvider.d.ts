import React from 'react';
import { Theme } from './theme';
export interface ThemeContextType {
    theme: Theme;
    isDarkMode: boolean;
    currentPreset: string | null;
    availablePresets: string[];
    setPreset: (preset: string) => void;
    toggleDarkMode: () => void;
    getColor: (colorName: string) => string;
    getFont: (fontName: string) => string;
}
export declare const ThemeContext: React.Context<ThemeContextType | undefined>;
export interface ThemeProviderProps {
    children: React.ReactNode;
    themePath?: string;
    initialPreset?: string | null;
}
export declare const ThemeProvider: React.FC<ThemeProviderProps>;
//# sourceMappingURL=ThemeProvider.d.ts.map