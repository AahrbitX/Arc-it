/**
 * Core theme functionality
 */
export type ThemeColors = {
    primary: string;
    secondary?: string;
    background: string;
    foreground: string;
    accent?: string;
    [key: string]: string | undefined;
};
export type ThemePreset = {
    colors: ThemeColors;
    fonts?: Record<string, string>;
    name?: string;
};
export type Theme = {
    colors: ThemeColors;
    fonts: Record<string, string>;
    presets?: Record<string, ThemePreset>;
};
/**
 * Load theme from a JSON file or URL
 */
export declare function loadTheme(path?: string): Promise<Theme>;
/**
 * Apply theme to document as CSS variables
 */
export declare function applyThemeToDocument(theme: Theme): void;
/**
 * Get color value from theme
 */
export declare function getColor(theme: Theme, colorName: string): string;
/**
 * Get font value from theme
 */
export declare function getFont(theme: Theme, fontName: string): string;
/**
 * Apply a theme preset
 */
export declare function applyPreset(theme: Theme, presetName: string): Theme;
/**
 * Detect if color scheme preference is dark
 */
export declare function prefersDarkMode(): boolean;
/**
 * Create CSS for a theme
 */
export declare function createThemeStyles(theme: Theme): string;
//# sourceMappingURL=theme.d.ts.map