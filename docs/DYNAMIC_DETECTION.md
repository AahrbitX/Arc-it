# Dynamic Detection System

The Arc-it package now includes a **Dynamic Detection System** that automatically discovers themes, languages, and content styles from your JSON files. This means **no more hardcoding** - everything is automatically detected and available!

## What is Dynamic Detection?

Instead of manually defining which themes, languages, or content styles are available, the system automatically reads your JSON files and discovers what's available. This makes your application truly dynamic and configurable without code changes.

## How Theme Detection Works

### 1. Automatic Theme Discovery

The `useDynamicThemeDetection` hook automatically reads your `theme.json` file and discovers all available theme presets:

```json
// theme.json
{
  "colors": { "primary": "#0070f3" },
  "presets": {
    "green": { "colors": { "primary": "#00ff0d" } },
    "green-light": { "colors": { "primary": "#00cc0a" } },
    "blue": { "colors": { "primary": "#3b82f6" } },
    "blue-light": { "colors": { "primary": "#60a5fa" } },
    "orange": { "colors": { "primary": "#f59e0b" } }
  }
}
```

**Result**: The system automatically detects 3 base themes: `green`, `blue`, `orange` (plus their light variants)

### 2. Smart Light/Dark Detection

The system automatically detects light/dark variants by looking for `-light` suffixes:
- `green` → Dark variant
- `green-light` → Light variant
- `blue` → Dark variant  
- `blue-light` → Light variant

## How Language Detection Works

### 1. Automatic Language Discovery

The `useDynamicContentDetection` hook automatically reads your `content.json` file and discovers all available languages:

```json
// content.json
{
  "en": { "hero": { "title": "Welcome" } },
  "es": { "hero": { "title": "Bienvenido" } },
  "fr": { "hero": { "title": "Bienvenue" } },
  "de": { "hero": { "title": "Willkommen" } }
}
```

**Result**: The system automatically detects 4 languages: `en`, `es`, `fr`, `de`

### 2. Language Key Detection

The system uses smart detection to identify language keys:
- Looks for 2-letter keys that match language codes
- Automatically provides language names and descriptions
- Supports 10+ languages out of the box

## How Content Style Detection Works

### 1. Automatic Style Discovery

The same hook also discovers content styles from your `content.json`:

```json
// content.json
{
  "en": { "hero": { "title": "Welcome" } },
  "styles": {
    "default": { "name": "Default Style", "description": "Standard layout" },
    "marketing": { "name": "Marketing Style", "description": "Sales-focused" },
    "portfolio": { "name": "Portfolio Style", "description": "Showcase layout" }
  }
}
```

**Result**: The system automatically detects 3 content styles: `default`, `marketing`, `portfolio`

## Using the Dynamic Detection Hooks

### Theme Detection Hook

```typescript
import { useDynamicThemeDetection } from 'arc-it';

function MyComponent() {
  const { getDynamicThemeInfo, getThemeMetadata } = useDynamicThemeDetection();
  
  // Get all discovered themes
  const { baseThemes, colorVariants } = getDynamicThemeInfo();
  
  // Get metadata for a specific theme
  const metadata = getThemeMetadata('green');
  
  return (
    <div>
      <h3>Available Themes: {baseThemes.length}</h3>
      {baseThemes.map(theme => (
        <div key={theme}>
          <strong>{theme}</strong>
          <p>{metadata.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### Content Detection Hook

```typescript
import { useDynamicContentDetection } from 'arc-it';

function MyComponent() {
  const { getDynamicContentInfo, getContentMetadata } = useDynamicContentDetection();
  
  // Get all discovered content options
  const { availableLanguages, contentStyles } = getDynamicContentInfo();
  
  return (
    <div>
      <h3>Languages: {availableLanguages.length}</h3>
      {availableLanguages.map(lang => (
        <div key={lang}>
          <strong>{lang}</strong>
        </div>
      ))}
      
      <h3>Content Styles: {contentStyles.length}</h3>
      {contentStyles.map(style => (
        <div key={style}>
          <strong>{style}</strong>
          <p>{getContentMetadata(style).description}</p>
        </div>
      ))}
    </div>
  );
}
```

## Complete Example with DynamicSwitcher

The `DynamicSwitcher` component automatically uses these hooks to create a complete UI:

```tsx
import { DynamicSwitcher } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <header>
        {/* This automatically shows all detected themes, languages, and content styles */}
        <DynamicSwitcher />
      </header>
      <main>
        {/* Your app content */}
      </main>
    </DynamicProvider>
  );
}
```

## Benefits of Dynamic Detection

### 1. **Zero Hardcoding**
- No need to manually list available themes
- No need to manually list available languages
- No need to manually list available content styles

### 2. **Automatic Updates**
- Add new themes to `theme.json` → automatically appears in UI
- Add new languages to `content.json` → automatically appears in UI
- Add new content styles to `content.json` → automatically appears in UI

### 3. **Configuration-Driven**
- Everything is controlled by JSON files
- No code changes needed for new options
- Perfect for content management systems

### 4. **Type Safety**
- Full TypeScript support
- Automatic type inference from JSON structure
- Compile-time error checking

## Advanced Usage

### Custom Theme Metadata

You can extend the theme detection with custom metadata:

```json
// theme.json
{
  "presets": {
    "green": { 
      "colors": { "primary": "#00ff0d" },
      "metadata": {
        "description": "Fresh and vibrant green theme",
        "category": "nature",
        "icon": "leaf"
      }
    }
  }
}
```

### Custom Content Metadata

Similarly for content styles:

```json
// content.json
{
  "styles": {
    "default": {
      "name": "Default Style",
      "description": "Standard layout for general use",
      "metadata": {
        "category": "layout",
        "icon": "grid",
        "tags": ["general", "standard"]
      }
    }
  }
}
```

## Implementation Details

### How It Works Internally

1. **Theme Detection**: 
   - Reads `theme.presets` object
   - Extracts base theme names (removes `-light` suffix)
   - Provides metadata access

2. **Language Detection**:
   - Scans content object for 2-letter keys
   - Filters out non-language keys
   - Provides language utilities

3. **Content Style Detection**:
   - Reads `content.styles` object
   - Extracts style IDs and metadata
   - Provides style management

### Performance Considerations

- **Lazy Loading**: Detection happens only when hooks are called
- **Memoization**: Results are cached to prevent unnecessary recalculations
- **Efficient**: Minimal overhead, optimized for production use

## Troubleshooting

### Common Issues

1. **No themes detected**: Check that `theme.json` has a `presets` object
2. **No languages detected**: Check that `content.json` has language keys (en, es, fr, etc.)
3. **No content styles detected**: Check that `content.json` has a `styles` object

### Debug Mode

Enable debug logging to see what's being detected:

```typescript
const { getDynamicThemeInfo } = useDynamicThemeDetection();
const { getDynamicContentInfo } = useDynamicContentDetection();

// Log detected information
console.log('Themes:', getDynamicThemeInfo());
console.log('Content:', getDynamicContentInfo());
```

## Summary

The Dynamic Detection System provides:

- **Automatic discovery** of all available options
- **Zero configuration** required
- **Real-time updates** when JSON files change
- **Type-safe** access to all detected options
- **Performance optimized** for production use

This system makes Arc-it truly dynamic and eliminates the need for hardcoded theme, language, and content style lists in your application.
