import React, { createContext, useEffect, useState } from 'react';
import { Theme, applyPreset, applyThemeToDocument, loadTheme, prefersDarkMode } from './theme';

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

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export interface ThemeProviderProps {
  children: React.ReactNode;
  themePath?: string;
  initialPreset?: string | null;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themePath = '/content/theme.json',
  initialPreset = null
}) => {
  const [theme, setTheme] = useState<Theme>({
    colors: {
      primary: '#0070f3',
      background: '#ffffff',
      foreground: '#000000'
    },
    fonts: {
      body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      heading: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [currentPreset, setCurrentPreset] = useState<string | null>(initialPreset);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Load theme on mount
  useEffect(() => {
    const loadThemeData = async () => {
      try {
        const themeData = await loadTheme(themePath);
        setTheme(themeData);
        
        // Apply initial preset if provided
        if (initialPreset && themeData.presets?.[initialPreset]) {
          const presetTheme = applyPreset(themeData, initialPreset);
          setTheme(presetTheme);
        }
        
        // Check for dark mode preference
        const darkModePreferred = prefersDarkMode();
        setIsDarkMode(darkModePreferred);
        
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadThemeData();
  }, [themePath, initialPreset]);
  
  // Apply theme to document
  useEffect(() => {
    if (!isLoading) {
      applyThemeToDocument(theme);
    }
  }, [theme, isLoading]);
  
  // Get all available presets
  const availablePresets = theme.presets ? Object.keys(theme.presets) : [];
  
  // Set preset
  const setPreset = (preset: string) => {
    if (theme.presets?.[preset]) {
      const presetTheme = applyPreset(theme, preset);
      setTheme(presetTheme);
      setCurrentPreset(preset);
    }
  };
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    
    // Get the current base preset name (without -light suffix)
    const currentBasePreset = currentPreset?.replace('-light', '') || 'space';
    
    if (!isDarkMode) {
      // Switching to light mode - apply the light variant
      const lightPresetName = `${currentBasePreset}-light`;
      if (theme.presets?.[lightPresetName]) {
        const lightTheme = applyPreset(theme, lightPresetName);
        setTheme(lightTheme);
        setCurrentPreset(lightPresetName);
      }
    } else {
      // Switching to dark mode - apply the dark variant
      if (theme.presets?.[currentBasePreset]) {
        const darkTheme = applyPreset(theme, currentBasePreset);
        setTheme(darkTheme);
        setCurrentPreset(currentBasePreset);
      }
    }
  };
  
  // Get color from theme
  const getColor = (colorName: string) => {
    return theme.colors[colorName] || '';
  };
  
  // Get font from theme
  const getFont = (fontName: string) => {
    return theme.fonts?.[fontName] || '';
  };
  
  const contextValue: ThemeContextType = {
    theme,
    isDarkMode,
    currentPreset,
    availablePresets,
    setPreset,
    toggleDarkMode,
    getColor,
    getFont
  };
  
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
