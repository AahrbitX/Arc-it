import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from './ThemeProvider';
import { Theme } from './theme';

/**
 * Hook to access theme and theme methods
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

/**
 * Hook to access theme colors
 */
export function useThemeColor(colorName: string): string {
  const { theme } = useTheme();
  return theme.colors[colorName] || '';
}

/**
 * Hook to access theme fonts
 */
export function useThemeFont(fontName: string): string {
  const { theme } = useTheme();
  return theme.fonts?.[fontName] || '';
}

/**
 * Hook to check if current theme is dark mode
 */
export function useIsDarkMode(): boolean {
  const { isDarkMode } = useTheme();
  return isDarkMode;
}

/**
 * Hook to toggle dark mode
 */
export function useToggleDarkMode(): () => void {
  const { toggleDarkMode } = useTheme();
  return toggleDarkMode;
}

/**
 * Hook to get CSS variables style object for an element
 */
export function useThemeStyles(): Record<string, string> {
  const { theme } = useTheme();
  
  const styles: Record<string, string> = {};
  
  // Add color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      styles[`--color-${key}`] = value;
    }
  });
  
  // Add font variables
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    styles[`--font-${key}`] = value;
  });
  
  return styles;
}

/**
 * Hook to dynamically detect available themes from loaded theme data
 * This automatically discovers themes without hardcoding them
 */
export const useDynamicThemeDetection = () => {
  const { theme, currentPreset, availablePresets } = useTheme();
  
  // Dynamically extract theme information from loaded theme data
  const getDynamicThemeInfo = () => {
    if (!theme) return { baseThemes: [], colorVariants: [] };
    
    const baseThemes: string[] = [];
    const colorVariants: Array<{ name: string; colors: Record<string, string | undefined> }> = [];
    
    // Extract base themes from presets
    const presets = theme.presets;
    if (presets && Object.keys(presets).length > 0) {
      Object.keys(presets).forEach(presetName => {
        // Remove -light suffix to get base theme name
        const baseTheme = presetName.replace('-light', '');
        if (!baseThemes.includes(baseTheme)) {
          baseThemes.push(baseTheme);
        }
        
        // Extract color information for each theme
        const preset = presets[presetName];
        if (preset?.colors) {
          colorVariants.push({
            name: presetName,
            colors: preset.colors
          });
        }
      });
    }
    
    return { baseThemes, colorVariants };
  };
  
  // Get theme metadata (description, icon, etc.) from theme data
  const getThemeMetadata = (themeName: string) => {
    // Since metadata doesn't exist in current Theme type, provide defaults
    return {
      description: `${themeName} theme`,
      icon: 'palette',
      category: 'color'
    };
  };
  
  return {
    getDynamicThemeInfo,
    getThemeMetadata,
    hasThemeData: !!theme,
    currentThemeData: theme
  };
};
