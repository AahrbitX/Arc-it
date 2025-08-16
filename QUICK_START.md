# Quick Start - Dynamic Theme & Content

## **1-Line Setup (Recommended)**

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

That's it! Your app now automatically detects and switches between themes, languages, and content styles from your JSON files.

## **Dynamic Detection System**

The **DynamicSwitcher** component automatically discovers everything from your JSON files:

```tsx
import { DynamicSwitcher } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <header>
        <DynamicSwitcher /> {/* Automatically shows all detected options */}
      </header>
      <YourApp />
    </DynamicProvider>
  );
}
```

**What gets detected automatically:**
- **Themes**: All presets from `theme.json`
- **Languages**: All language keys from `content.json`
- **Content Styles**: All styles from `content.json`
- **Light/Dark Variants**: Automatic theme variant detection

## **Choose Your Approach**

### **Option A: Everything Together (Easiest)**
```tsx
<DynamicProvider>
  <YourApp />
</DynamicProvider>
```

### **Option B: CSS Variables Only**
```tsx
<ThemeProvider>
  <YourApp />
</ThemeProvider>
```

### **Option C: Content Management Only**
```tsx
<ContentProvider>
  <YourApp />
</ContentProvider>
```

## **Create Theme File**

Create `public/content/theme.json`:

```json
{
  "colors": {
    "primary": "#0070f3",
    "secondary": "#7928ca",
    "background": "#ffffff",
    "foreground": "#000000"
  },
  "fonts": {
    "body": "system-ui, sans-serif",
    "heading": "Inter, system-ui, sans-serif"
  },
  "presets": {
    "green": {
      "colors": {
        "primary": "#00ff0d",
        "secondary": "#00cc0a"
      }
    },
    "blue": {
      "colors": {
        "primary": "#3b82f6",
        "secondary": "#1d4ed8"
      }
    }
  }
}
```

## **Create Content File**

Create `public/content/content.json`:

```json
{
  "en": {
    "hero": {
      "title": "Welcome to Arc-it",
      "subtitle": "Dynamic theming made simple"
    }
  },
  "es": {
    "hero": {
      "title": "Bienvenido a Arc-it",
      "subtitle": "Tematización dinámica simplificada"
    }
  },
  "styles": {
    "default": {
      "name": "Default Style",
      "description": "Standard layout for general use"
    },
    "marketing": {
      "name": "Marketing Style", 
      "description": "Sales-focused content layout"
    }
  }
}
```

## **Use in Components**

### **CSS Variables Approach**
```tsx
import { useTheme } from 'arc-it';

function Button() {
  const { getColor } = useTheme();
  
  return (
    <button style={{ backgroundColor: getColor('primary') }}>
      Click me!
    </button>
  );
}
```

### **Content Management Approach**
```tsx
import { useContent, useContentStyle } from 'arc-it';

function Hero() {
  const { content, language } = useContent();
  const { currentStyle, setContentStyle } = useContentStyle();
  
  return (
    <div>
      <h1>{content[language]?.hero?.title}</h1>
      <p>{content[language]?.hero?.subtitle}</p>
      
      <select value={currentStyle} onChange={(e) => setContentStyle(e.target.value)}>
        <option value="default">Default</option>
        <option value="marketing">Marketing</option>
      </select>
    </div>
  );
}
```

### **Theme Switching**
```tsx
import { useTheme } from 'arc-it';

function ThemeSwitcher() {
  const { setPreset, availablePresets, currentPreset } = useTheme();
  
  return (
    <div>
      <select value={currentPreset || ''} onChange={(e) => setPreset(e.target.value)}>
        {availablePresets.map(preset => (
          <option key={preset} value={preset}>{preset}</option>
        ))}
      </select>
    </div>
  );
}
```

### **Dark Mode Toggle**
```tsx
import { useTheme } from 'arc-it';

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
}
```

## **Complete Example**

```tsx
import { DynamicProvider, DynamicSwitcher, useTheme, useContent } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <header>
        <DynamicSwitcher />
      </header>
      <main>
        <Hero />
        <ThemeSwitcher />
        <DarkModeToggle />
      </main>
    </DynamicProvider>
  );
}

function Hero() {
  const { getColor } = useTheme();
  const { content, language } = useContent();
  
  return (
    <div style={{ 
      backgroundColor: getColor('background'),
      color: getColor('foreground')
    }}>
      <h1>{content[language]?.hero?.title}</h1>
      <p>{content[language]?.hero?.subtitle}</p>
    </div>
  );
}

function ThemeSwitcher() {
  const { setPreset, availablePresets, currentPreset } = useTheme();
  
  return (
    <div>
      <h3>Choose Theme:</h3>
      {availablePresets.map(preset => (
        <button 
          key={preset} 
          onClick={() => setPreset(preset)}
          style={{ 
            margin: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: currentPreset === preset ? '#0070f3' : '#f0f0f0',
            color: currentPreset === preset ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {preset}
        </button>
      ))}
    </div>
  );
}

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <button 
      onClick={toggleDarkMode}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: isDarkMode ? '#f0f0f0' : '#333',
        color: isDarkMode ? '#333' : '#f0f0f0',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}
    >
      {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
}
```

## **What Happens Automatically**

1. **Theme Detection**: Reads `theme.json` and discovers all presets
2. **Language Detection**: Reads `content.json` and discovers all languages
3. **Style Detection**: Reads `content.json` and discovers all content styles
4. **UI Generation**: Creates tabs for themes, languages, and content styles
5. **Smart Switching**: Handles light/dark variants automatically
6. **Real-time Updates**: Changes reflect immediately

## **Next Steps**

- **Customize Themes**: Add more presets to `theme.json`
- **Add Languages**: Add more language keys to `content.json`
- **Create Styles**: Add more content styles to `content.json`
- **Advanced Usage**: See the full documentation for advanced features

## **Troubleshooting**

### **No themes detected?**
- Check that `theme.json` has a `presets` object
- Ensure the file path is correct (`/content/theme.json`)

### **No languages detected?**
- Check that `content.json` has language keys (en, es, fr, etc.)
- Ensure language keys are 2-letter codes

### **No content styles detected?**
- Check that `content.json` has a `styles` object
- Ensure each style has a `name` and `description`

### **Component not updating?**
- Make sure your component is wrapped in the provider
- Check that you're using the correct hooks
- Verify the JSON files are accessible

## **Advanced Features**

- **Custom Metadata**: Add descriptions, icons, and categories to themes and styles
- **Dynamic Detection**: Everything is discovered automatically - no hardcoding needed
- **Type Safety**: Full TypeScript support with automatic type inference
- **Performance**: Optimized for production with minimal re-renders

That's it! You now have a fully dynamic theming and content management system that works automatically with your JSON files.
