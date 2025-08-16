# Arc-it.js

> **The easiest way to add dynamic theming to your React app!**

A flexible theming library that gives you **both CSS variables AND Tailwind CSS** in one package. Perfect for developers who want the best of both worlds without the complexity.

## **Why Choose This Library?**

- **1 Provider = Everything** - CSS variables + Tailwind CSS + Content management
- **Zero Configuration** - Works out of the box
- **Real-time Updates** - Change themes instantly
- **Responsive Ready** - Built-in responsive utilities
- **Flexible** - Use one approach or mix both together
- **Performance** - Optimized for production
- **TypeScript** - Full type safety included
- **React 8+ Ready** - Compatible with React 18, 19, and future versions
- **Enterprise Security** - XSS prevention, injection protection, input validation

## **Super Quick Start (30 seconds!)**

### **Step 1: Install**
```bash
npm install arc-it
```

### **Step 2: Wrap Your App**
```tsx
import { DynamicProvider } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <YourApp />
    </DynamicProvider>
  );
}
```

### **Step 3: Create JSON Files**
Create `public/content/theme.json`:
```json
{
  "colors": {
    "primary": "#0070f3",
    "background": "#ffffff",
    "foreground": "#000000"
  },
  "presets": {
    "green": { "colors": { "primary": "#00ff0d" } },
    "blue": { "colors": { "primary": "#3b82f6" } },
    "orange": { "colors": { "primary": "#f59e0b" } }
  }
}
```

Create `public/content/content.json`:
```json
{
  "en": { "hero": { "title": "Welcome" } },
  "es": { "hero": { "title": "Bienvenido" } },
  "styles": {
    "default": { "name": "Default Style", "description": "Standard layout" },
    "marketing": { "name": "Marketing Style", "description": "Sales-focused" }
  }
}
```

### **Step 4: Add Dynamic Switcher**
```tsx
import { DynamicSwitcher } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <header>
        <DynamicSwitcher /> {/* Automatically detects themes, languages, and content styles! */}
      </header>
      <YourApp />
    </DynamicProvider>
  );
}
```

**That's it!** Your app now automatically detects and switches between:
- **Themes** (green, blue, orange + light/dark variants)
- **Languages** (English, Spanish, etc.)
- **Content Styles** (default, marketing, etc.)

**No hardcoding needed - everything is discovered automatically from your JSON files!**

## Features

- **Dynamic Detection System**: Automatically discovers themes, languages, and content styles from JSON files
- **Zero Hardcoding**: No need to manually list available options - everything is detected automatically
- **Smart Theme Switching**: Automatic light/dark variant detection and switching
- **Multi-language Support**: Automatic language detection and switching
- **Content Style Management**: Dynamic content style switching with metadata
- **TypeScript Support**: Full TypeScript definitions included
- **Performance Optimized**: Efficient updates and minimal re-renders
- **Lightweight**: Small bundle size with tree-shaking support

## **Dynamic Detection System**

The Arc-it package includes a **revolutionary Dynamic Detection System** that automatically discovers themes, languages, and content styles from your JSON files. This means **zero hardcoding** - everything is automatically detected and available!

### **What Gets Detected Automatically:**

- **Themes**: All presets from your `theme.json` file
- **Languages**: All language keys from your `content.json` file  
- **Content Styles**: All styles from your `content.json` file
- **Light/Dark Variants**: Automatic detection of theme variants

### **How It Works:**

1. **Theme Detection**: Reads `theme.json` and discovers all available presets
2. **Language Detection**: Reads `content.json` and discovers all language keys
3. **Style Detection**: Reads `content.json` and discovers all content styles
4. **UI Generation**: Automatically generates the switcher UI based on detected options

### **Example JSON Structure:**

```json
// theme.json
{
  "presets": {
    "green": { "colors": { "primary": "#00ff0d" } },
    "blue": { "colors": { "primary": "#3b82f6" } }
  }
}

// content.json  
{
  "en": { "hero": { "title": "Welcome" } },
  "es": { "hero": { "title": "Bienvenido" } },
  "styles": {
    "default": { "name": "Default", "description": "Standard layout" }
  }
}
```

**Result**: The system automatically detects 2 themes, 2 languages, and 1 content style - no code changes needed!

For detailed information, see [Dynamic Detection Guide](docs/DYNAMIC_DETECTION.md).

## Installation

```bash
npm install arc-it
# or
yarn add arc-it
# or
bun add arc-it
```

## **React Compatibility**

This library is **100% compatible** with React 18+ and future versions:

- **React 18** (Stable & Latest) - **Required minimum**
- **React 19+** (Future versions - when stable)
- **React 20+** (Future versions)

**React 18+ Required** - This library leverages modern React features for optimal performance.

**Modern React Features Enabled:**
- **Concurrent Rendering** - Smoother user experience
- **Automatic Batching** - Better performance
- **Suspense** - Advanced loading states
- **Strict Mode** - Better development experience

For detailed compatibility information, see [React Compatibility Guide](docs/REACT_COMPATIBILITY.md).

## **Error Troubleshooting & Solutions**

### **Common Error: "use client" Directive Required**

**Error Message:**
```
You're importing a component that needs `createContext`. This React hook only works in a client component. 
To fix, mark the file (or its parent) with the "use client" directive.
```

**Why This Happens:**
- React hooks (`useState`, `useEffect`, `createContext`) only work in client components
- Server components (default in Next.js 13+ App Router) can't use hooks
- Theme providers use React Context internally

**Solutions:**

#### **Solution 1: Create Client Wrapper (Recommended)**

Create a separate client component for theme providers:

```tsx
// src/components/ThemeWrapper.tsx
"use client";

import { DynamicProvider } from 'arc-it';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DynamicProvider>
      {children}
    </DynamicProvider>
  );
}
```

Keep your layout as a server component:

```tsx
// src/app/layout.tsx (NO "use client")
import ThemeWrapper from "@/components/ThemeWrapper";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}
```

#### **Solution 2: Move to Page Component**

If you don't want to wrap the entire layout:

```tsx
// src/app/page.tsx
"use client";

import { DynamicProvider } from 'arc-it';

export default function HomePage() {
  return (
    <DynamicProvider>
      <main>
        {/* Your page content */}
      </main>
    </DynamicProvider>
  );
}
```

#### **Solution 3: Dynamic Import with Suspense**

For better performance and code splitting:

```tsx
// src/components/ThemeWrapper.tsx
"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicProvider = dynamic(() => 
  import('arc-it').then(mod => ({ default: mod.DynamicProvider }))
);

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading theme...</div>}>
      <DynamicProvider>
        {children}
      </DynamicProvider>
    </Suspense>
  );
}
```

### **Common Error: Hydration Mismatch**

**Error Message:**
```
Hydration failed because the server rendered HTML didn't match the client.
```

**Why This Happens:**
- Server renders without theme context
- Client tries to render with theme context
- Different HTML between server and client

**Solution:**
Use **Solution 1** above - create a client wrapper component. This ensures:
- Server and client render consistently
- No hydration mismatches
- Theme functionality works properly

### **Common Error: React Version Mismatch**

**Error Message:**
```
Type 'React.ReactNode' is not assignable to type 'import(".../node_modules/@types/react/index").ReactNode'
```

**Why This Happens:**
- Different React versions between packages
- TypeScript type conflicts

**Solutions:**

#### **Fix 1: Cast to any (Quick Fix)**
```tsx
{children as any}
```

#### **Fix 2: Update React versions (Recommended)**
```bash
npm update react react-dom
npm update @types/react @types/react-dom
```

#### **Fix 3: Use peer dependencies**
Ensure your project uses the same React version as Arc-it.

### **Common Error: Module Not Found**

**Error Message:**
```
Module not found: Can't resolve 'arc-it'
```

**Solutions:**

#### **Fix 1: Install the package**
```bash
npm install arc-it
```

#### **Fix 2: Check import path**
```tsx
// Correct
import { DynamicProvider } from 'arc-it';

// Wrong
import { DynamicProvider } from './arc-it';
```

#### **Fix 3: Clear cache and reinstall**
```bash
rm -rf node_modules package-lock.json
npm install
```

### **Performance Issues**

**Problem:** Theme switching causes performance issues

**Solutions:**

#### **Fix 1: Use React.memo for components**
```tsx
const ThemedButton = React.memo(({ children, variant }) => {
  const { getColor } = useTheme();
  return (
    <button style={{ backgroundColor: getColor(variant) }}>
      {children}
    </button>
  );
});
```

#### **Fix 2: Debounce theme updates**
```tsx
import { debounce } from 'lodash';

const debouncedSetTheme = debounce((theme) => {
  setTheme(theme);
}, 100);
```

#### **Fix 3: Use CSS transitions**
```css
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

### **Debugging Tips**

#### **1. Check Console for Errors**
Look for React warnings and errors in browser console.

#### **2. Verify Provider Hierarchy**
Ensure theme providers wrap all components that use theme hooks.

#### **3. Check Import Statements**
Verify all imports are correct and from the right package.

#### **4. Use React DevTools**
Check if context providers are properly mounted.

#### **5. Verify File Paths**
Ensure theme and content JSON files exist at specified paths.

### **Still Having Issues?**

1. **Check the examples** in the `examples/` directory
2. **Review the documentation** for your specific use case
3. **Open an issue** on GitHub with:
   - Error message
   - Code snippet
   - React version
   - Framework version (Next.js, etc.)
   - Steps to reproduce

## **Security Features**

This library is built with **enterprise-grade security**:

- **XSS Prevention** - All inputs are HTML escaped and validated
- **CSS Injection Protection** - Dangerous CSS properties are blocked
- **Input Validation** - Colors, fonts, and values are strictly validated
- **Security Monitoring** - Security events are logged and monitored
- **OWASP Compliance** - Follows security best practices

**Run security tests:**
```bash
npm run test:security          # Test all security features - 100% passing
npm run security:audit         # Full security audit - 0 vulnerabilities
npm run security:check         # Complete security check - All tests pass
```

For detailed security information, see [Security Documentation](docs/SECURITY.md).

## **Documentation**

- **[Quick Start Guide](QUICK_START.md)** - Get up and running in minutes
- **[JSON Schema](docs/JSON_SCHEMA.md)** - Complete theme and content structure
- **[Quick Reference](docs/QUICK_REFERENCE.md)** - Developer reference card
- **[React Compatibility](docs/REACT_COMPATIBILITY.md)** - Version compatibility guide
- **[Security Features](docs/SECURITY.md)** - Security implementation details
- **[Error Troubleshooting](docs/ERROR_TROUBLESHOOTING.md)** - Common issues and solutions
- **[Testing Summary](docs/TESTING_SUMMARY.md)** - Security and compatibility test results

## Quick Start

### Option 1: CSS Variables Approach (Original)

```tsx
import { ThemeProvider, useTheme } from 'arc-it';

function App() {
  return (
    <ThemeProvider themePath="/content/theme.json">
      <MyComponent />
    </ThemeProvider>
  );
}

function MyComponent() {
  const { getColor, getFont } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: getColor('background'),
      color: getColor('foreground'),
      fontFamily: getFont('body')
    }}>
      <h1>Hello World</h1>
    </div>
  );
}
```

### Option 2: Dynamic Provider Approach (Recommended)

```tsx
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
  const { setPreset, toggleDarkMode } = useTheme();
  const { content } = useContent();
  const { setContentStyle, currentStyle } = useContentStyle();
  
  return (
    <div>
      <button onClick={() => setPreset('green')}>Green Theme</button>
      <button onClick={toggleDarkMode}>Toggle Light/Dark</button>
      <button onClick={() => setContentStyle('marketing')}>Marketing Style</button>
      <h1>{content.title}</h1>
    </div>
  );
}
```

## Theme Configuration

Create a `theme.json` file in your public directory:

```json
{
  "colors": {
    "primary": "#0070f3",
    "secondary": "#7928ca",
    "background": "#ffffff",
    "foreground": "#000000",
    "accent": "#f81ce5"
  },
  "fonts": {
    "body": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "heading": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  },
  "presets": {
    "dark": {
      "colors": {
        "background": "#121212",
        "foreground": "#ffffff"
      }
    }
  }
}
```

## API Reference

### Providers

#### `ThemeProvider`
The original provider for CSS variables approach.

```tsx
<ThemeProvider 
  themePath="/content/theme.json"
  initialPreset="dark"
>
  {children}
</ThemeProvider>
```

#### `DynamicProvider`
Extended provider with content management support.

```tsx
<DynamicProvider 
  themePath="/content/theme.json"
  contentSource="/content/content.json"
  initialThemePreset="dark"
  initialLanguage="en"
  initialContentStyle="default"
>
  {children}
</DynamicProvider>
```

### Hooks

#### CSS Variables Hooks
```tsx
import { useTheme, useThemeColor, useThemeFont } from 'arc-it';

function Component() {
  const { theme, getColor, getFont, toggleDarkMode } = useTheme();
  const primaryColor = useThemeColor('primary');
  const bodyFont = useThemeFont('body');
  
  // ... use the hooks
}
```

#### Content Management Hooks
```tsx
import { 
  useContent, 
  useContentStyle, 
  useContentLanguage 
} from 'arc-it';

function Component() {
  const { content } = useContent();
  const { currentStyle, setContentStyle } = useContentStyle();
  const { language, setLanguage } = useContentLanguage();
  
  // ... use the hooks
}
```

#### Dynamic Detection Hooks
```tsx
import { 
  useDynamicThemeDetection, 
  useDynamicContentDetection 
} from 'arc-it';

function Component() {
  const { getDynamicThemeInfo, getThemeMetadata } = useDynamicThemeDetection();
  const { getDynamicContentInfo, getContentMetadata } = useDynamicContentDetection();
  
  const { baseThemes, colorVariants } = getDynamicThemeInfo();
  const { availableLanguages, contentStyles } = getDynamicContentInfo();
  
  // ... use the hooks
}
```

## Advanced Usage

### Theme Presets
```tsx
function Component() {
  const { setPreset, availablePresets, currentPreset } = useTheme();
  
  return (
    <div>
      <select onChange={(e) => setPreset(e.target.value)} value={currentPreset || ''}>
        {availablePresets.map(preset => (
          <option key={preset} value={preset}>{preset}</option>
        ))}
      </select>
    </div>
  );
}
```

### Dark Mode Toggle
```tsx
function Component() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Light' : 'Dark'}
    </button>
  );
}
```

### Content Style Switching
```tsx
function Component() {
  const { currentStyle, setContentStyle, availableStyles } = useContentStyle();
  
  return (
    <div>
      <select onChange={(e) => setContentStyle(e.target.value)} value={currentStyle}>
        {availableStyles.map(style => (
          <option key={style.id} value={style.id}>{style.name}</option>
        ))}
      </select>
    </div>
  );
}
```

## Examples

Check out the `examples/` directory for comprehensive usage examples:

- `basic-usage.tsx` - Basic usage patterns
- `existing-project-integration.tsx` - Integration with existing projects

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
