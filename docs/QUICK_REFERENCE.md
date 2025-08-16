# Quick Reference Card

## Essential JSON Structure

### **Minimal Theme (Required)**
```json
{
  "colors": {
    "primary": "#0070f3",
    "background": "#ffffff",
    "foreground": "#000000"
  }
}
```

### **Standard Theme**
```json
{
  "colors": {
    "primary": "#0070f3",
    "secondary": "#7928ca",
    "background": "#ffffff",
    "foreground": "#000000",
    "accent": "#f81ce5",
    "success": "#10b981",
    "warning": "#f59e0b",
    "error": "#ef4444"
  },
  "fonts": {
    "body": "system-ui, sans-serif",
    "heading": "Inter, system-ui, sans-serif"
  }
}
```

## Color Quick Reference

### **Semantic Colors**
```json
{
  "colors": {
    "primary": "#0070f3",      // Main brand
    "secondary": "#7928ca",    // Secondary brand
    "accent": "#f81ce5",       // Highlights
    "background": "#ffffff",   // Main background
    "foreground": "#000000",   // Main text
    "surface": "#f8fafc",      // Cards/surfaces
    "muted": "#f1f5f9",       // Subtle elements
    "border": "#e2e8f0"       // Borders
  }
}
```

### **Color Scale (Optional)**
```json
{
  "colors": {
    "primary": "#0070f3",
    "primary-50": "#eff6ff",
    "primary-100": "#dbeafe",
    "primary-200": "#bfdbfe",
    "primary-300": "#93c5fd",
    "primary-400": "#60a5fa",
    "primary-500": "#3b82f6",
    "primary-600": "#2563eb",
    "primary-700": "#1d4ed8",
    "primary-800": "#1e40af",
    "primary-900": "#1e3a8a"
  }
}
```

## Font Quick Reference

### **Basic Fonts**
```json
{
  "fonts": {
    "body": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "heading": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
  }
}
```

### **Extended Fonts**
```json
{
  "fonts": {
    "body": "system-ui, sans-serif",
    "heading": "Inter, system-ui, sans-serif",
    "mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, monospace",
    "display": "Playfair Display, Georgia, serif"
  }
}
```

## Preset Quick Reference

### **Dark Theme Preset**
```json
{
  "presets": {
    "dark": {
      "name": "Dark Theme",
      "description": "Dark color scheme",
      "colors": {
        "background": "#121212",
        "foreground": "#ffffff",
        "surface": "#1e1e1e",
        "border": "#2e2e2e"
      }
    }
  }
}
```

### **Light/Dark Variants**
```json
{
  "presets": {
    "green": {
      "name": "Green Theme",
      "colors": {
        "primary": "#00ff0d",
        "background": "#000000"
      }
    },
    "green-light": {
      "name": "Green Light",
      "colors": {
        "primary": "#00cc0a",
        "background": "#ffffff"
      }
    }
  }
}
```

## Content Quick Reference

### **Basic Content Structure**
```json
{
  "en": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started"
    }
  },
  "es": {
    "hero": {
      "title": "Bienvenido",
      "subtitle": "Comienza"
    }
  }
}
```

### **Content Styles**
```json
{
  "styles": {
    "default": {
      "name": "Default Style",
      "description": "Standard layout",
      "layout": "default",
      "sections": ["header", "main", "footer"]
    },
    "marketing": {
      "name": "Marketing Style",
      "description": "Sales-focused",
      "layout": "marketing",
      "sections": ["hero", "features", "cta"]
    }
  }
}
```

## React Component Usage

### **Basic Provider Setup**
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

### **Theme Hooks**
```tsx
import { useTheme } from 'arc-it';

function Component() {
  const { 
    getColor, 
    setPreset, 
    currentPreset, 
    availablePresets,
    toggleDarkMode,
    isDarkMode 
  } = useTheme();
  
  return (
    <div style={{ backgroundColor: getColor('background') }}>
      <button onClick={() => setPreset('green')}>
        Green Theme
      </button>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light' : 'Dark'}
      </button>
    </div>
  );
}
```

### **Content Hooks**
```tsx
import { useContent, useContentStyle } from 'arc-it';

function Component() {
  const { content, language, setLanguage } = useContent();
  const { currentStyle, setContentStyle, availableStyles } = useContentStyle();
  
  return (
    <div>
      <h1>{content[language]?.hero?.title}</h1>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </div>
  );
}
```

### **Dynamic Detection Hooks**
```tsx
import { useDynamicThemeDetection, useDynamicContentDetection } from 'arc-it';

function Component() {
  const { getDynamicThemeInfo } = useDynamicThemeDetection();
  const { getDynamicContentInfo } = useDynamicContentDetection();
  
  const { baseThemes } = getDynamicThemeInfo();
  const { availableLanguages, contentStyles } = getDynamicContentInfo();
  
  return (
    <div>
      <p>Themes: {baseThemes.join(', ')}</p>
      <p>Languages: {availableLanguages.join(', ')}</p>
      <p>Styles: {contentStyles.join(', ')}</p>
    </div>
  );
}
```

## File Structure

### **Required Files**
```
public/
└── content/
    ├── theme.json          # Theme configuration
    └── content.json        # Content and languages
```

### **Optional Structure**
```
public/
└── content/
    ├── theme.json
    ├── content.json
    ├── presets/            # Additional theme presets
    │   ├── seasonal.json
    │   └── corporate.json
    └── locales/            # Additional language files
        ├── fr.json
        └── de.json
```

## Common Patterns

### **Theme Switching**
```tsx
function ThemeSwitcher() {
  const { setPreset, availablePresets, currentPreset } = useTheme();
  
  return (
    <select value={currentPreset || ''} onChange={(e) => setPreset(e.target.value)}>
      {availablePresets.map(preset => (
        <option key={preset} value={preset}>{preset}</option>
      ))}
    </select>
  );
}
```

### **Language Switching**
```tsx
function LanguageSwitcher() {
  const { language, setLanguage } = useContent();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' }
  ];
  
  return (
    <select value={language} onChange={(e) => setLanguage(e.target.value)}>
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.name}</option>
      ))}
    </select>
  );
}
```

### **Content Style Switching**
```tsx
function StyleSwitcher() {
  const { currentStyle, setContentStyle, availableStyles } = useContentStyle();
  
  return (
    <select value={currentStyle} onChange={(e) => setContentStyle(e.target.value)}>
      {availableStyles.map(style => (
        <option key={style.id} value={style.id}>{style.name}</option>
      ))}
    </select>
  );
}
```

### **Conditional Rendering**
```tsx
function ConditionalComponent() {
  const { currentPreset } = useTheme();
  const { currentStyle } = useContentStyle();
  
  return (
    <div>
      {currentPreset === 'green' && (
        <div className="green-specific">Green theme content</div>
      )}
      
      {currentStyle === 'marketing' && (
        <div className="marketing-specific">Marketing content</div>
      )}
    </div>
  );
}
```

## Utility Functions

### **Color Utilities**
```tsx
import { useThemeColor } from 'arc-it';

function ColoredButton({ variant }: { variant: string }) {
  const color = useThemeColor(variant);
  
  return (
    <button style={{ backgroundColor: color }}>
      {variant} Button
    </button>
  );
}
```

### **Font Utilities**
```tsx
import { useThemeFont } from 'arc-it';

function StyledText({ variant }: { variant: string }) {
  const font = useThemeFont(variant);
  
  return (
    <p style={{ fontFamily: font }}>
      Text with {variant} font
    </p>
  );
}
```

### **Theme Styles**
```tsx
import { useThemeStyles } from 'arc-it';

function ThemedElement() {
  const styles = useThemeStyles();
  
  return (
    <div style={styles}>
      Element with theme CSS variables
    </div>
  );
}
```

## Error Handling

### **Provider Context Error**
```tsx
function SafeComponent() {
  try {
    const { getColor } = useTheme();
    return <div style={{ backgroundColor: getColor('primary') }}>Content</div>;
  } catch (error) {
    return <div>Theme not available</div>;
  }
}
```

### **Fallback Values**
```tsx
function Component() {
  const { getColor } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: getColor('primary') || '#0070f3',
      color: getColor('foreground') || '#000000'
    }}>
      Content with fallbacks
    </div>
  );
}
```

## Performance Tips

### **Memoization**
```tsx
import React from 'react';
import { useTheme } from 'arc-it';

const ThemedButton = React.memo(({ children, variant }) => {
  const { getColor } = useTheme();
  
  return (
    <button style={{ backgroundColor: getColor(variant) }}>
      {children}
    </button>
  );
});
```

### **CSS Transitions**
```css
* {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

## Quick Start Checklist

- [ ] Install: `npm install arc-it`
- [ ] Create `public/content/theme.json`
- [ ] Create `public/content/content.json`
- [ ] Wrap app with `<DynamicProvider>`
- [ ] Use `useTheme()` hook for colors
- [ ] Use `useContent()` hook for content
- [ ] Use `useContentStyle()` hook for styles
- [ ] Test theme switching
- [ ] Test language switching
- [ ] Test content style switching

## Common Issues

### **"use client" Required**
- Add `"use client"` directive to component files
- Or create client wrapper component

### **Provider Context Missing**
- Ensure `<DynamicProvider>` wraps your app
- Check import statements

### **Theme Not Loading**
- Verify file paths are correct
- Check JSON syntax
- Ensure files are accessible

### **Colors Not Updating**
- Check theme preset names
- Verify color property names
- Ensure provider is re-rendering

## Summary

This quick reference covers:
- **JSON Structure**: Theme and content configuration
- **React Hooks**: All available hooks and their usage
- **Common Patterns**: Theme, language, and style switching
- **File Structure**: Required and optional files
- **Error Handling**: Common issues and solutions
- **Performance**: Optimization tips and best practices

For detailed information, see the full documentation files.
