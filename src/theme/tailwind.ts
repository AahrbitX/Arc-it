import { Theme, ThemeColors } from './theme';

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
export function themeToTailwindColors(theme: Theme): Record<string, string> {
  const tailwindColors: Record<string, string> = {};
  
  // Map theme colors to Tailwind color scale
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      // Create a full color scale based on the base color
      const colorScale = generateColorScale(value);
      tailwindColors[key] = value;
      
      // Add color scale variants
      Object.entries(colorScale).forEach(([variant, colorValue]) => {
        tailwindColors[`${key}-${variant}`] = colorValue;
      });
    }
  });
  
  return tailwindColors;
}

/**
 * Generate a color scale from a base color (50-900)
 */
function generateColorScale(baseColor: string): Record<string, string> {
  // This is a simplified color scale generation
  // In a real implementation, you might want to use a color manipulation library
  const scale: Record<string, string> = {};
  
  // Generate lighter variants (50-400)
  for (let i = 50; i <= 400; i += 50) {
    const lightness = Math.min(100, 90 - (i - 50) * 0.1);
    scale[i.toString()] = adjustColorLightness(baseColor, lightness);
  }
  
  // Generate darker variants (500-900)
  for (let i = 500; i <= 900; i += 100) {
    const lightness = Math.max(0, 50 - (i - 500) * 0.1);
    scale[i.toString()] = adjustColorLightness(baseColor, lightness);
  }
  
  return scale;
}

/**
 * Adjust color lightness (simplified implementation)
 */
function adjustColorLightness(color: string, lightness: number): string {
  // This is a simplified implementation
  // In production, consider using a proper color manipulation library
  if (color.startsWith('#')) {
    // Convert hex to HSL, adjust lightness, convert back
    // For now, return a simple variation
    return color;
  }
  return color;
}

/**
 * Apply theme to Tailwind CSS variables
 */
export function applyTailwindTheme(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply color variables in Tailwind format
  const tailwindColors = themeToTailwindColors(theme);
  Object.entries(tailwindColors).forEach(([key, value]) => {
    root.style.setProperty(`--tw-color-${key}`, value);
  });
  
  // Apply font variables
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    root.style.setProperty(`--tw-font-${key}`, value);
  });
}

/**
 * Create Tailwind CSS configuration object
 */
export function createTailwindConfig(theme: Theme): Record<string, any> {
  const tailwindColors = themeToTailwindColors(theme);
  
  return {
    theme: {
      extend: {
        colors: tailwindColors,
        fontFamily: theme.fonts || {},
      }
    }
  };
}

/**
 * Get Tailwind class for a theme color
 */
export function getTailwindColorClass(colorName: string, variant: string = ''): string {
  const className = variant ? `${colorName}-${variant}` : colorName;
  return `text-${className}`;
}

/**
 * Get Tailwind background class for a theme color
 */
export function getTailwindBgClass(colorName: string, variant: string = ''): string {
  const className = variant ? `${colorName}-${variant}` : colorName;
  return `bg-${className}`;
}

/**
 * Get Tailwind border class for a theme color
 */
export function getTailwindBorderClass(colorName: string, variant: string = ''): string {
  const className = variant ? `${colorName}-${variant}` : colorName;
  return `border-${className}`;
}

/**
 * Hook to get Tailwind-compatible theme styles
 */
export function useTailwindThemeStyles(): Record<string, string> {
  // This would be used in a React component context
  // For now, return an empty object
  return {};
}
