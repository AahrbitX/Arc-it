import React, { ReactNode } from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { ContentProvider } from './content/ContentProvider';

// ============================================================================
// DYNAMIC PROVIDER PROPS
// ============================================================================

interface DynamicProviderProps {
  children: ReactNode;
  
  // Theme configuration
  themePath?: string;
  initialThemePreset?: string | null;
  
  // Content configuration
  contentSource?: string | Record<string, any>;
  contentOptions?: {
    defaultLanguage?: string;
    supportedLanguages?: string[];
    format?: 'json' | 'markdown' | 'html' | 'text';
    baseUrl?: string;
    cacheDuration?: number;
  };
  initialLanguage?: string;
  initialContentStyle?: string;
  customContentStyles?: Array<{
    id: string;
    name: string;
    description: string;
    icon?: string;
    styles: {
      id: string;
      name: string;
      description: string;
      layout?: string;
      sections?: string[];
      metadata?: Record<string, any>;
    };
  }>;
}

// ============================================================================
// DYNAMIC PROVIDER COMPONENT
// ============================================================================

export function DynamicProvider({
  children,
  themePath = '/content/theme.json',
  initialThemePreset = null,
  contentSource = '/content/content.json',
  contentOptions = {},
  initialLanguage = 'en',
  initialContentStyle = 'default',
  customContentStyles = []
}: DynamicProviderProps) {
  return (
    <ThemeProvider 
      themePath={themePath}
      initialPreset={initialThemePreset}
    >
      <ContentProvider
        source={contentSource}
        options={contentOptions}
        initialLanguage={initialLanguage}
        initialContentStyle={initialContentStyle}
        customContentStyles={customContentStyles}
      >
        {children}
      </ContentProvider>
    </ThemeProvider>
  );
}
