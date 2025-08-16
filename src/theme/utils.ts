/**
 * Utility functions for theme handling
 */

import { Theme } from './theme';

/**
 * Generate a CSS variable reference
 */
export function cssVar(name: string): string {
  return `var(--${name})`;
}

/**
 * Generate a CSS color variable reference
 */
export function colorVar(name: string): string {
  return cssVar(`color-${name}`);
}

/**
 * Generate a CSS font variable reference
 */
export function fontVar(name: string): string {
  return cssVar(`font-${name}`);
}

/**
 * Convert a hex color to RGB values
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  // Remove # if present
  hex = hex.replace(/^#/, '');
  
  // Parse 3-digit hex
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Check if parsing was successful
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  
  return { r, g, b };
}

/**
 * Create a theme variant with modified colors
 */
export function createThemeVariant(theme: Theme, modifications: Partial<Theme>): Theme {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...(modifications.colors || {})
    },
    fonts: {
      ...theme.fonts,
      ...(modifications.fonts || {})
    }
  };
}

/**
 * Adjust color brightness
 * @param hex Hex color code
 * @param percent -100 to 100
 */
export function adjustBrightness(hex: string, percent: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  
  const { r, g, b } = rgb;
  
  const amount = Math.floor(255 * (percent / 100));
  
  const newR = Math.max(0, Math.min(255, r + amount));
  const newG = Math.max(0, Math.min(255, g + amount));
  const newB = Math.max(0, Math.min(255, b + amount));
  
  return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
}
