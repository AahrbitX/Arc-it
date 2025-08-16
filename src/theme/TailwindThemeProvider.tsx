import React, { createContext, useContext, useEffect } from 'react';
import { ThemeProvider, ThemeContext, ThemeContextType } from './ThemeProvider';
import { Theme } from './theme';
import { applyTailwindTheme, createTailwindConfig } from './tailwind';

export interface TailwindThemeContextType extends ThemeContextType {
  tailwindConfig: Record<string, any>;
  applyTailwindTheme: () => void;
}

export const TailwindThemeContext = createContext<TailwindThemeContextType | undefined>(undefined);

export interface TailwindThemeProviderProps {
  children: React.ReactNode;
  themePath?: string;
  initialPreset?: string | null;
  enableTailwind?: boolean;
}

export const TailwindThemeProvider: React.FC<TailwindThemeProviderProps> = ({
  children,
  themePath = '/content/theme.json',
  initialPreset = null,
  enableTailwind = true
}) => {
  return (
    <ThemeProvider themePath={themePath} initialPreset={initialPreset}>
      <TailwindThemeProviderInner enableTailwind={enableTailwind}>
        {children}
      </TailwindThemeProviderInner>
    </ThemeProvider>
  );
};

const TailwindThemeProviderInner: React.FC<{
  children: React.ReactNode;
  enableTailwind: boolean;
}> = ({ children, enableTailwind }) => {
  const themeContext = useContext(ThemeContext);
  
  if (!themeContext) {
    throw new Error('TailwindThemeProvider must be used within a ThemeProvider');
  }
  
  const { theme } = themeContext;
  
  // Create Tailwind config
  const tailwindConfig = createTailwindConfig(theme);
  
  // Apply Tailwind theme when theme changes
  useEffect(() => {
    if (enableTailwind) {
      applyTailwindTheme(theme);
    }
  }, [theme, enableTailwind]);
  
  const applyTailwindThemeHandler = () => {
    if (enableTailwind) {
      applyTailwindTheme(theme);
    }
  };
  
  const contextValue: TailwindThemeContextType = {
    ...themeContext,
    tailwindConfig,
    applyTailwindTheme: applyTailwindThemeHandler
  };
  
  return (
    <TailwindThemeContext.Provider value={contextValue}>
      {children}
    </TailwindThemeContext.Provider>
  );
};

/**
 * Hook to use Tailwind theme context
 */
export function useTailwindTheme(): TailwindThemeContextType {
  const context = useContext(TailwindThemeContext);
  
  if (context === undefined) {
    throw new Error('useTailwindTheme must be used within a TailwindThemeProvider');
  }
  
  return context;
}
