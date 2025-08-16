/**
 * Utility functions for theme handling
 */
import { Theme } from './theme';
/**
 * Generate a CSS variable reference
 */
export declare function cssVar(name: string): string;
/**
 * Generate a CSS color variable reference
 */
export declare function colorVar(name: string): string;
/**
 * Generate a CSS font variable reference
 */
export declare function fontVar(name: string): string;
/**
 * Convert a hex color to RGB values
 */
export declare function hexToRgb(hex: string): {
    r: number;
    g: number;
    b: number;
} | null;
/**
 * Create a theme variant with modified colors
 */
export declare function createThemeVariant(theme: Theme, modifications: Partial<Theme>): Theme;
/**
 * Adjust color brightness
 * @param hex Hex color code
 * @param percent -100 to 100
 */
export declare function adjustBrightness(hex: string, percent: number): string;
//# sourceMappingURL=utils.d.ts.map