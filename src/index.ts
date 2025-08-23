// ============================================================================
// THEME SYSTEM
// ============================================================================

export { ThemeProvider } from './theme/ThemeProvider';
export { useTheme, useDynamicThemeDetection } from './theme/hooks';
export type { ThemeContextType } from './theme/ThemeProvider';

// ============================================================================
// CONTENT SYSTEM
// ============================================================================

export { ContentProvider, useContentContext } from './content/ContentProvider';
export * from './content/types';
export { 
  useContent, 
  useContentSection, 
  useContentPath, 
  useLocalizedContent, 
  useReloadContent,
  useContentLanguage,
  useContentStyle,
  useCurrentContentStyle,
  useContentStyleById,
  useIsContentStyleActive,
  useContentStyleMetadata,
  useContentStyleSections,
  useDynamicContentDetection
} from './content/hooks';

// ============================================================================
// DYNAMIC PROVIDER
// ============================================================================

export { DynamicProvider } from './DynamicProvider';

// ============================================================================
// READY-TO-USE COMPONENTS
// ============================================================================

export { default as DynamicSwitcher } from './components/DynamicSwitcher';

// ============================================================================
// TYPES
// ============================================================================

export type { 
  ContentStyle, 
  ContentStylePreset, 
  ContentStyleConfig, 
  ContentStyleContext 
} from './content/types';

// ============================================================================
// UTILITIES
// ============================================================================

export { getLanguageName, getLanguageDescription } from './content/hooks';

// ============================================================================
// SMART CONTENT LOADER - The Ultimate Solution
// ============================================================================

export { 
  createSmartContentLoader, 
  useSmartContent,
  SmartContentLoader 
} from './content/SmartContentLoader';
export type { SmartContentConfig, ContentResponse } from './content/SmartContentLoader';

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
BASIC THEME USAGE:

import { ThemeProvider, useTheme } from 'arc-it';

function App() {
  return (
    <ThemeProvider themePath="/content/theme.json">
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { setPreset, currentPreset, toggleLightDark } = useTheme();
  
  return (
    <div>
      <button onClick={() => setPreset('green')}>Green Theme</button>
      <button onClick={() => setPreset('blue')}>Blue Theme</button>
      <button onClick={toggleLightDark}>Toggle Light/Dark</button>
    </div>
  );
}

BASIC CONTENT USAGE:

import { ContentProvider, useContent, useContentLanguage } from 'arc-it';

function App() {
  return (
    <ContentProvider source="/content/content.json">
      <MyComponent />
    </ContentProvider>
  );
}

function MyComponent() {
  const { content } = useContent();
  const { language, setLanguage, languages } = useContentLanguage();
  
  return (
    <div>
      <h1>{content[language]?.title}</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}

COMPLETE USAGE WITH DYNAMIC PROVIDER:

import { DynamicProvider, useTheme, useContent, useContentStyle } from 'arc-it';

function App() {
  return (
    <DynamicProvider
      themePath="/content/theme.json"
      contentSource="/content/content.json"
      initialThemePreset="green"
      initialLanguage="en"
      initialContentStyle="default"
    >
      <MyComponent />
    </DynamicProvider>
  );
}

function MyComponent() {
  const { setPreset, toggleLightDark } = useTheme();
  const { content } = useContent();
  const { setContentStyle, currentStyle } = useContentStyle();
  
  return (
    <div>
      <button onClick={() => setPreset('green')}>Green Theme</button>
      <button onClick={toggleLightDark}>Toggle Light/Dark</button>
      <button onClick={() => setContentStyle('marketing')}>Marketing Style</button>
      <h1>{content.title}</h1>
    </div>
  );
}

READY-TO-USE COMPONENT:

import { DynamicProvider, ContentStyleSwitcher } from 'arc-it';

function App() {
  return (
    <DynamicProvider
      themePath="/content/theme.json"
      contentSource="/content/content.json"
      initialThemePreset="green"
      initialLanguage="en"
      initialContentStyle="default"
    >
      <div>
        <h1>My App</h1>
        <ContentStyleSwitcher />
      </div>
    </DynamicProvider>
  );
}
*/
