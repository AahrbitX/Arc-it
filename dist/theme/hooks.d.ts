import { ThemeContextType } from './ThemeProvider';
import { Theme } from './theme';
/**
 * Hook to access theme and theme methods
 */
export declare function useTheme(): ThemeContextType;
/**
 * Hook to access theme colors
 */
export declare function useThemeColor(colorName: string): string;
/**
 * Hook to access theme fonts
 */
export declare function useThemeFont(fontName: string): string;
/**
 * Hook to check if current theme is dark mode
 */
export declare function useIsDarkMode(): boolean;
/**
 * Hook to toggle dark mode
 */
export declare function useToggleDarkMode(): () => void;
/**
 * Hook to get CSS variables style object for an element
 */
export declare function useThemeStyles(): Record<string, string>;
/**
 * Hook to dynamically detect available themes from loaded theme data
 * This automatically discovers themes without hardcoding them
 */
export declare const useDynamicThemeDetection: () => {
    getDynamicThemeInfo: () => {
        baseThemes: string[];
        colorVariants: {
            name: string;
            colors: Record<string, string | undefined>;
        }[];
    };
    getThemeMetadata: (themeName: string) => {
        description: string;
        icon: string;
        category: string;
    };
    hasThemeData: boolean;
    currentThemeData: Theme;
};
//# sourceMappingURL=hooks.d.ts.map