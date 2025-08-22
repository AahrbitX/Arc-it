# 🔧 Arc-it Technical Implementation Guide

## 📋 Table of Contents
1. [Core Implementation Patterns](#core-implementation-patterns)
2. [Provider Architecture](#provider-architecture)
3. [Hook Implementation](#hook-implementation)
4. [State Management](#state-management)
5. [Performance Optimizations](#performance-optimizations)
6. [Error Handling](#error-handling)
7. [Testing Strategies](#testing-strategies)
8. [Build Configuration](#build-configuration)

---

## 🏗️ Core Implementation Patterns

### 1. Context Pattern
Arc-it uses React Context for state management across the component tree.

```typescript
// Theme Context Implementation
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  themePath = '/content/theme.json',
  initialPreset = null
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [currentPreset, setCurrentPreset] = useState<string | null>(initialPreset);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Context value
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
```

### 2. Provider Composition Pattern
Multiple providers are composed together for a unified API.

```typescript
// DynamicProvider Composition
export const DynamicProvider: React.FC<DynamicProviderProps> = ({
  children,
  themePath,
  contentSource,
  initialThemePreset,
  initialLanguage,
  initialContentStyle
}) => {
  return (
    <ThemeProvider themePath={themePath} initialPreset={initialThemePreset}>
      <ContentProvider source={contentSource} initialLanguage={initialLanguage} initialStyle={initialContentStyle}>
        <TailwindThemeProvider>
          {children}
        </TailwindThemeProvider>
      </ContentProvider>
    </ThemeProvider>
  );
};
```

### 3. Hook Pattern
Custom hooks provide clean APIs for consuming components.

```typescript
// Theme Hook Implementation
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Content Hook Implementation
export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
```

---

## 🔄 Provider Architecture

### Provider Stack Implementation
```typescript
// Provider Stack with Error Boundaries
export const ProviderStack: React.FC<ProviderStackProps> = ({ children, ...props }) => {
  return (
    <ErrorBoundary fallback={<ProviderErrorFallback />}>
      <ThemeProvider {...props.theme}>
        <ErrorBoundary fallback={<ContentErrorFallback />}>
          <ContentProvider {...props.content}>
            <ErrorBoundary fallback={<TailwindErrorFallback />}>
              <TailwindThemeProvider {...props.tailwind}>
                {children}
              </TailwindThemeProvider>
            </ErrorBoundary>
          </ContentProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </ErrorBoundary>
  );
};
```

### Provider Configuration Merging
```typescript
// Configuration Merging Logic
const mergeProviderConfigs = (
  defaultConfig: ProviderConfig,
  userConfig: Partial<ProviderConfig>
): ProviderConfig => {
  return {
    theme: {
      ...defaultConfig.theme,
      ...userConfig.theme,
      presets: {
        ...defaultConfig.theme.presets,
        ...userConfig.theme?.presets
      }
    },
    content: {
      ...defaultConfig.content,
      ...userConfig.content,
      languages: [
        ...(defaultConfig.content.languages || []),
        ...(userConfig.content?.languages || [])
      ]
    }
  };
};
```

---

## 🎣 Hook Implementation

### 1. Theme Hooks

#### useTheme Hook
```typescript
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};
```

#### useDynamicThemeDetection Hook
```typescript
export const useDynamicThemeDetection = () => {
  const { theme } = useTheme();
  
  const getDynamicThemeInfo = useCallback(() => {
    const baseThemes = Object.keys(theme.presets || {})
      .filter(preset => !preset.includes('-light'))
      .sort();
    
    const colorVariants = Object.keys(theme.presets || {})
      .filter(preset => preset.includes('-light'))
      .map(preset => preset.replace('-light', ''));
    
    return { baseThemes, colorVariants };
  }, [theme.presets]);
  
  const getThemeMetadata = useCallback((presetName: string) => {
    const preset = theme.presets?.[presetName];
    return {
      name: preset?.name || presetName,
      description: preset?.description || `Theme preset: ${presetName}`,
      colors: preset?.colors || {}
    };
  }, [theme.presets]);
  
  return { getDynamicThemeInfo, getThemeMetadata };
};
```

### 2. Content Hooks

#### useContent Hook
```typescript
export const useContent = (): ContentContextType => {
  const context = useContext(ContentContext);
  
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  
  return context;
};
```

#### useContentSection Hook
```typescript
export const useContentSection = (sectionName: string) => {
  const { content, currentStyle } = useContent();
  
  const sectionContent = useMemo(() => {
    if (!content || !currentStyle) return null;
    
    const style = content.styles?.[currentStyle];
    if (!style) return null;
    
    return style.sections?.[sectionName] || null;
  }, [content, currentStyle, sectionName]);
  
  return sectionContent;
};
```

#### useContentLanguage Hook
```typescript
export const useContentLanguage = () => {
  const { language, setLanguage, languages } = useContent();
  
  const changeLanguage = useCallback((newLanguage: string) => {
    if (languages.includes(newLanguage)) {
      setLanguage(newLanguage);
    } else {
      console.warn(`Language ${newLanguage} not supported`);
    }
  }, [languages, setLanguage]);
  
  return {
    language,
    setLanguage: changeLanguage,
    languages,
    isSupported: (lang: string) => languages.includes(lang)
  };
};
```

### 3. Tailwind Hooks

#### useTailwindTheme Hook
```typescript
export const useTailwindTheme = () => {
  const { theme } = useTheme();
  const { currentStyle } = useContent();
  
  const generateTailwindClasses = useCallback((baseClasses: string) => {
    const primaryColor = theme.colors.primary;
    const secondaryColor = theme.colors.secondary;
    
    return baseClasses
      .replace(/bg-primary/g, `bg-[${primaryColor}]`)
      .replace(/text-primary/g, `text-[${primaryColor}]`)
      .replace(/border-primary/g, `border-[${primaryColor}]`)
      .replace(/bg-secondary/g, `bg-[${secondaryColor}]`)
      .replace(/text-secondary/g, `text-[${secondaryColor}]`);
  }, [theme.colors]);
  
  return { generateTailwindClasses };
};
```

---

## 📊 State Management

### 1. Theme State Management
```typescript
// Theme State with Reducer Pattern
type ThemeAction = 
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_PRESET'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'UPDATE_COLORS'; payload: Partial<ThemeColors> };

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    
    case 'SET_PRESET':
      const preset = state.theme.presets?.[action.payload];
      if (preset) {
        return {
          ...state,
          currentPreset: action.payload,
          theme: { ...state.theme, colors: { ...state.theme.colors, ...preset.colors } }
        };
      }
      return state;
    
    case 'TOGGLE_DARK_MODE':
      return { ...state, isDarkMode: !state.isDarkMode };
    
    case 'UPDATE_COLORS':
      return {
        ...state,
        theme: {
          ...state.theme,
          colors: { ...state.theme.colors, ...action.payload }
        }
      };
    
    default:
      return state;
  }
};
```

### 2. Content State Management
```typescript
// Content State with Async Actions
type ContentAction = 
  | { type: 'SET_CONTENT'; payload: Content }
  | { type: 'SET_LANGUAGE'; payload: string }
  | { type: 'SET_STYLE'; payload: string }
  | { type: 'LOADING_START' }
  | { type: 'LOADING_SUCCESS'; payload: Content }
  | { type: 'LOADING_ERROR'; payload: string };

const contentReducer = (state: ContentState, action: ContentAction): ContentState => {
  switch (action.type) {
    case 'LOADING_START':
      return { ...state, loading: true, error: null };
    
    case 'LOADING_SUCCESS':
      return { 
        ...state, 
        content: action.payload, 
        loading: false, 
        error: null 
      };
    
    case 'LOADING_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    
    case 'SET_STYLE':
      return { ...state, currentStyle: action.payload };
    
    default:
      return state;
  }
};
```

---

## ⚡ Performance Optimizations

### 1. Memoization Strategies
```typescript
// Memoized Theme Values
export const useMemoizedTheme = () => {
  const { theme, currentPreset } = useTheme();
  
  const memoizedColors = useMemo(() => {
    return {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      background: theme.colors.background,
      text: theme.colors.text
    };
  }, [theme.colors]);
  
  const memoizedPreset = useMemo(() => {
    return theme.presets?.[currentPreset || 'default'];
  }, [theme.presets, currentPreset]);
  
  return { colors: memoizedColors, preset: memoizedPreset };
};

// Memoized Content Values
export const useMemoizedContent = (sectionName: string) => {
  const { content, language, currentStyle } = useContent();
  
  const memoizedSection = useMemo(() => {
    if (!content || !currentStyle || !language) return null;
    
    const style = content.styles?.[currentStyle];
    const section = style?.sections?.[sectionName];
    
    return section?.[language] || section?.en || null;
  }, [content, currentStyle, language, sectionName]);
  
  return memoizedSection;
};
```

### 2. Debounced Updates
```typescript
// Debounced Theme Updates
export const useDebouncedThemeUpdate = (delay: number = 300) => {
  const { setPreset } = useTheme();
  
  const debouncedSetPreset = useMemo(
    () => debounce(setPreset, delay),
    [setPreset, delay]
  );
  
  useEffect(() => {
    return () => {
      debouncedSetPreset.cancel();
    };
  }, [debouncedSetPreset]);
  
  return { setPreset: debouncedSetPreset };
};

// Debounced Content Updates
export const useDebouncedContentUpdate = (delay: number = 300) => {
  const { setLanguage, setContentStyle } = useContent();
  
  const debouncedSetLanguage = useMemo(
    () => debounce(setLanguage, delay),
    [setLanguage, delay]
  );
  
  const debouncedSetContentStyle = useMemo(
    () => debounce(setContentStyle, delay),
    [setContentStyle, delay]
  );
  
  useEffect(() => {
    return () => {
      debouncedSetLanguage.cancel();
      debouncedSetContentStyle.cancel();
    };
  }, [debouncedSetLanguage, debouncedSetContentStyle]);
  
  return { 
    setLanguage: debouncedSetLanguage, 
    setContentStyle: debouncedSetContentStyle 
  };
};
```

### 3. Lazy Loading
```typescript
// Lazy Theme Loading
export const useLazyTheme = (themePath: string) => {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loadTheme = useCallback(async () => {
    if (theme) return theme; // Already loaded
    
    setLoading(true);
    setError(null);
    
    try {
      const themeData = await loadThemeFromPath(themePath);
      setTheme(themeData);
      return themeData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load theme';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [themePath, theme]);
  
  return { theme, loading, error, loadTheme };
};

// Lazy Content Loading
export const useLazyContent = (contentPath: string) => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const loadContent = useCallback(async () => {
    if (content) return content; // Already loaded
    
    setLoading(true);
    setError(null);
    
    try {
      const contentData = await loadContentFromPath(contentPath);
      setContent(contentData);
      return contentData;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load content';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [contentPath, content]);
  
  return { content, loading, error, loadContent };
};
```

---

## 🚨 Error Handling

### 1. Error Boundary Implementation
```typescript
// Theme Error Boundary
export class ThemeErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Theme Error:', error, errorInfo);
    
    // Log to error reporting service
    logError('Theme Error', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="theme-error">
          <h2>Theme Error</h2>
          <p>Something went wrong with the theme system.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Content Error Boundary
export class ContentErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Content Error:', error, errorInfo);
    
    // Log to error reporting service
    logError('Content Error', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="content-error">
          <h2>Content Error</h2>
          <p>Something went wrong with the content system.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### 2. Error Recovery Strategies
```typescript
// Theme Recovery Strategy
export const useThemeRecovery = () => {
  const { theme, setPreset } = useTheme();
  
  const recoverTheme = useCallback(async () => {
    try {
      // Try to reload the default theme
      const defaultTheme = await loadDefaultTheme();
      setPreset('default');
      return defaultTheme;
    } catch (error) {
      console.error('Theme recovery failed:', error);
      
      // Fallback to built-in theme
      const fallbackTheme = getFallbackTheme();
      setPreset('fallback');
      return fallbackTheme;
    }
  }, [setPreset]);
  
  const resetTheme = useCallback(() => {
    try {
      // Reset to initial state
      setPreset('default');
    } catch (error) {
      console.error('Theme reset failed:', error);
    }
  }, [setPreset]);
  
  return { recoverTheme, resetTheme };
};

// Content Recovery Strategy
export const useContentRecovery = () => {
  const { content, setLanguage, setContentStyle } = useContent();
  
  const recoverContent = useCallback(async () => {
    try {
      // Try to reload the default content
      const defaultContent = await loadDefaultContent();
      setLanguage('en');
      setContentStyle('default');
      return defaultContent;
    } catch (error) {
      console.error('Content recovery failed:', error);
      
      // Fallback to built-in content
      const fallbackContent = getFallbackContent();
      setLanguage('en');
      setContentStyle('fallback');
      return fallbackContent;
    }
  }, [setLanguage, setContentStyle]);
  
  const resetContent = useCallback(() => {
    try {
      // Reset to initial state
      setLanguage('en');
      setContentStyle('default');
    } catch (error) {
      console.error('Content reset failed:', error);
    }
  }, [setLanguage, setContentStyle]);
  
  return { recoverContent, resetContent };
};
```

---

## 🧪 Testing Strategies

### 1. Unit Testing Hooks
```typescript
// Testing useTheme Hook
describe('useTheme', () => {
  const mockThemeContext: ThemeContextType = {
    theme: mockTheme,
    isDarkMode: false,
    currentPreset: 'default',
    availablePresets: ['default', 'corporate'],
    setPreset: jest.fn(),
    toggleDarkMode: jest.fn(),
    getColor: jest.fn(),
    getFont: jest.fn()
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('should return theme context when used within provider', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return <div data-testid="theme">{theme.currentPreset}</div>;
    };
    
    render(
      <ThemeContext.Provider value={mockThemeContext}>
        <TestComponent />
      </ThemeContext.Provider>
    );
    
    expect(screen.getByTestId('theme')).toHaveTextContent('default');
  });
  
  it('should throw error when used outside provider', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return <div>{theme.currentPreset}</div>;
    };
    
    expect(() => render(<TestComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );
  });
});
```

### 2. Integration Testing
```typescript
// Testing Provider Integration
describe('DynamicProvider Integration', () => {
  it('should provide theme and content context', () => {
    const TestComponent = () => {
      const theme = useTheme();
      const content = useContent();
      
      return (
        <div>
          <div data-testid="theme">{theme.currentPreset}</div>
          <div data-testid="content">{content.language}</div>
        </div>
      );
    };
    
    render(
      <DynamicProvider
        themePath="/test-theme.json"
        contentSource="/test-content.json"
        initialThemePreset="corporate"
        initialLanguage="es"
      >
        <TestComponent />
      </DynamicProvider>
    );
    
    expect(screen.getByTestId('theme')).toHaveTextContent('corporate');
    expect(screen.getByTestId('content')).toHaveTextContent('es');
  });
  
  it('should handle theme switching', async () => {
    const TestComponent = () => {
      const { setPreset, currentPreset } = useTheme();
      
      return (
        <div>
          <div data-testid="current">{currentPreset}</div>
          <button onClick={() => setPreset('startup')}>Switch Theme</button>
        </div>
      );
    };
    
    render(
      <DynamicProvider
        themePath="/test-theme.json"
        contentSource="/test-content.json"
        initialThemePreset="corporate"
      >
        <TestComponent />
      </DynamicProvider>
    );
    
    expect(screen.getByTestId('current')).toHaveTextContent('corporate');
    
    fireEvent.click(screen.getByText('Switch Theme'));
    
    await waitFor(() => {
      expect(screen.getByTestId('current')).toHaveTextContent('startup');
    });
  });
});
```

---

## 🏗️ Build Configuration

### 1. Rollup Configuration
```typescript
// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

// Check if we're in development mode
const isDev = process.argv.includes('--config-dev');

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true
    }
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ 
      tsconfig: './tsconfig.json',
      outputToFilesystem: false,
      declaration: !isDev, // Skip declaration in dev mode for speed
      declarationMap: !isDev,
      sourceMap: true
    }),
    // Only minify in production builds
    ...(isDev ? [] : [terser()])
  ],
  external: ['react', 'react-dom'],
  // Development optimizations
  ...(isDev && {
    watch: {
      include: 'src/**',
      exclude: 'node_modules/**',
      clearScreen: false
    }
  })
};
```

### 2. TypeScript Configuration
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": false,
    "jsx": "react-jsx",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "**/*.test.ts", "**/*.test.tsx"]
}
```

### 3. Package Configuration
```json
// package.json scripts
{
  "scripts": {
    "build": "npx rollup -c",
    "dev": "npx rollup -c -w",
    "dev:fast": "npx rollup -c -w --config-dev",
    "dev:watch": "npx rollup -c -w",
    "dev:live": "echo '🔄 Starting Arc-it in watch mode...' && npx rollup -c -w",
    "type-check": "tsc --noEmit",
    "lint": "eslint src/**/*.{ts,tsx}",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

---

## 📚 Conclusion

This technical implementation guide covers:

- **Core Patterns**: Context, Provider Composition, and Hook patterns
- **State Management**: Reducer patterns and async state handling
- **Performance**: Memoization, debouncing, and lazy loading
- **Error Handling**: Error boundaries and recovery strategies
- **Testing**: Unit and integration testing approaches
- **Build Configuration**: Rollup, TypeScript, and package setup

For more information, see:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Complete architecture overview
- [QUICK_START.md](./QUICK_START.md) - Quick start guide
- [DEV_SETUP.md](./DEV_SETUP.md) - Development setup
- [README.md](./README.md) - Complete documentation

