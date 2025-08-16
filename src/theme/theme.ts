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
export async function loadTheme(path: string = '/content/theme.json'): Promise<Theme> {
  try {
    const res = await fetch(path);
    
    if (!res.ok) {
      throw new Error(`Failed to load theme from ${path}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('Failed to load theme:', error);
    // Return fallback theme
    return {
      colors: {
        primary: '#0070f3',
        background: '#ffffff',
        foreground: '#000000'
      },
      fonts: {
        body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }
    };
  }
}

/**
 * Apply theme to document as CSS variables
 */
export function applyThemeToDocument(theme: Theme): void {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Apply color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      root.style.setProperty(`--color-${key}`, value);
    }
  });
  
  // Apply font variables
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });
}

/**
 * Get color value from theme
 */
export function getColor(theme: Theme, colorName: string): string {
  return theme.colors[colorName] || '';
}

/**
 * Get font value from theme
 */
export function getFont(theme: Theme, fontName: string): string {
  return theme.fonts?.[fontName] || '';
}

/**
 * Apply a theme preset
 */
export function applyPreset(theme: Theme, presetName: string): Theme {
  const preset = theme.presets?.[presetName];
  if (!preset) return theme;
  
  return {
    ...theme,
    colors: {
      ...theme.colors,
      ...preset.colors
    },
    fonts: {
      ...theme.fonts,
      ...(preset.fonts || {})
    }
  };
}

/**
 * Detect if color scheme preference is dark
 */
export function prefersDarkMode(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

/**
 * Create CSS for a theme
 */
export function createThemeStyles(theme: Theme): string {
  let styles = ':root {\n';
  
  // Add color variables
  Object.entries(theme.colors).forEach(([key, value]) => {
    if (typeof value === 'string') {
      styles += `  --color-${key}: ${value};\n`;
    }
  });
  
  // Add font variables
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    styles += `  --font-${key}: ${value};\n`;
  });
  
  styles += '}\n';
  
  return styles;
}
