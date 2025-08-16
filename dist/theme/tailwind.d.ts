import { Theme } from './theme';
/**
 * Tailwind CSS integration utilities
 */
export interface TailwindThemeConfig {
    colors: {
        primary: string;
        secondary?: string;
        background: string;
        foreground: string;
        accent?: string;
        [key: string]: string | undefined;
    };
    spacing?: Record<string, string>;
    borderRadius?: Record<string, string>;
    boxShadow?: Record<string, string>;
    fontSize?: Record<string, string>;
    fontFamily?: Record<string, string>;
}
/**
 * Convert theme colors to Tailwind-compatible format
 */
export declare function themeToTailwindColors(theme: Theme): Record<string, string>;
/**
 * Apply theme to Tailwind CSS variables
 */
export declare function applyTailwindTheme(theme: Theme): void;
/**
 * Create Tailwind CSS configuration object
 */
export declare function createTailwindConfig(theme: Theme): Record<string, any>;
/**
 * Get Tailwind class for a theme color
 */
export declare function getTailwindColorClass(colorName: string, variant?: string): string;
/**
 * Get Tailwind background class for a theme color
 */
export declare function getTailwindBgClass(colorName: string, variant?: string): string;
/**
 * Get Tailwind border class for a theme color
 */
export declare function getTailwindBorderClass(colorName: string, variant?: string): string;
/**
 * Hook to get Tailwind-compatible theme styles
 */
export declare function useTailwindThemeStyles(): Record<string, string>;
//# sourceMappingURL=tailwind.d.ts.map