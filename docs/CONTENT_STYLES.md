# Content Style Management

The Arc-it package now includes comprehensive content style management, allowing you to switch between different content layouts and structures alongside themes and languages.

## Features

- **Multiple Content Styles**: Pre-built styles for different use cases
- **Custom Style Support**: Add your own content styles
- **Dynamic Switching**: Change content styles on the fly
- **Icon Support**: Visual representation for each style
- **Metadata Support**: Store additional information with each style
- **Section Management**: Define which content sections each style includes

## Quick Start

### Basic Usage

```tsx
import { DynamicProvider, useContentStyle } from 'arc-it';

function App() {
  return (
    <DynamicProvider>
      <YourApp />
    </DynamicProvider>
  );
}

function MyComponent() {
  const { currentStyle, setContentStyle, availableStyles } = useContentStyle();
  
  return (
    <div>
      <h1>Current Style: {currentStyle}</h1>
      {availableStyles.map(style => (
        <button key={style.id} onClick={() => setContentStyle(style.id)}>
          {style.name}
        </button>
      ))}
    </div>
  );
}
```

### With Custom Styles

```tsx
const customStyles = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store layout',
    icon: 'shopping-cart',
    styles: {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Online store layout',
      layout: 'ecommerce',
      sections: ['products', 'cart', 'checkout']
    }
  }
];

<DynamicProvider customContentStyles={customStyles}>
  <YourApp />
</DynamicProvider>
```

## Built-in Content Styles

### 1. Default Style
- **ID**: `default`
- **Description**: Standard website content and layout
- **Layout**: Standard
- **Sections**: `['header', 'main', 'footer']`
- **Icon**: `layout`

### 2. Marketing Focus
- **ID**: `marketing`
- **Description**: Content optimized for conversions
- **Layout**: Marketing
- **Sections**: `['hero', 'features', 'cta', 'testimonials']`
- **Icon**: `file-text`

### 3. Portfolio Style
- **ID**: `portfolio`
- **Description**: Showcase-focused content layout
- **Layout**: Portfolio
- **Sections**: `['gallery', 'about', 'contact']`
- **Icon**: `image`

### 4. Business Focus
- **ID**: `business`
- **Description**: Professional business content
- **Layout**: Business
- **Sections**: `['services', 'team', 'clients', 'contact']`
- **Icon**: `briefcase`

## Hooks

### useContentStyle

The main hook for content style management:

```tsx
import { useContentStyle } from 'arc-it';

function ContentStyleSwitcher() {
  const {
    currentStyle,
    availableStyles,
    setContentStyle,
    getContentStyle,
    resetToDefault
  } = useContentStyle();
  
  return (
    <div>
      <h3>Current Style: {currentStyle}</h3>
      
      <select 
        value={currentStyle} 
        onChange={(e) => setContentStyle(e.target.value)}
      >
        {availableStyles.map(style => (
          <option key={style.id} value={style.id}>
            {style.name}
          </option>
        ))}
      </select>
      
      <button onClick={resetToDefault}>
        Reset to Default
      </button>
    </div>
  );
}
```

### useContentStyleById

Get a specific content style by ID:

```tsx
import { useContentStyleById } from 'arc-it';

function StyleInfo({ styleId }: { styleId: string }) {
  const style = useContentStyleById(styleId);
  
  if (!style) {
    return <div>Style not found</div>;
  }
  
  return (
    <div>
      <h3>{style.name}</h3>
      <p>{style.description}</p>
      <p>Layout: {style.layout}</p>
      <p>Sections: {style.sections?.join(', ')}</p>
    </div>
  );
}
```

### useIsContentStyleActive

Check if a specific style is currently active:

```tsx
import { useIsContentStyleActive } from 'arc-it';

function StyleIndicator({ styleId }: { styleId: string }) {
  const isActive = useIsContentStyleActive(styleId);
  
  return (
    <div className={isActive ? 'active' : 'inactive'}>
      {isActive ? 'Active' : 'Inactive'}
    </div>
  );
}
```

### useContentStyleMetadata

Access metadata for content styles:

```tsx
import { useContentStyleMetadata } from 'arc-it';

function StyleMetadata({ styleId }: { styleId: string }) {
  const metadata = useContentStyleMetadata(styleId);
  
  return (
    <div>
      <h4>Style Information</h4>
      <p>Category: {metadata.category}</p>
      <p>Icon: {metadata.icon}</p>
      <p>Tags: {metadata.tags?.join(', ')}</p>
    </div>
  );
}
```

### useContentStyleSections

Get sections available for a specific style:

```tsx
import { useContentStyleSections } from 'arc-it';

function StyleSections({ styleId }: { styleId: string }) {
  const sections = useContentStyleSections(styleId);
  
  return (
    <div>
      <h4>Available Sections</h4>
      <ul>
        {sections.map(section => (
          <li key={section}>{section}</li>
        ))}
      </ul>
    </div>
  );
}
```

## Types

### ContentStyle

```typescript
interface ContentStyle {
  id: string;
  name: string;
  description: string;
  layout?: string;
  sections?: string[];
  metadata?: {
    category?: string;
    icon?: string;
    tags?: string[];
    [key: string]: any;
  };
}
```

### ContentStylePreset

```typescript
interface ContentStylePreset {
  id: string;
  name: string;
  description: string;
  icon?: string;
  styles: ContentStyle;
}
```

### ContentStyleContext

```typescript
interface ContentStyleContext {
  currentContentStyle: string;
  availableContentStyles: ContentStylePreset[];
  setContentStyle: (styleId: string) => void;
  getContentStyle: (styleId?: string) => ContentStylePreset | null;
  resetContentStyleToDefault: () => void;
}
```

## Custom Style Examples

### E-commerce Style

```tsx
const ecommerceStyle = {
  id: 'ecommerce',
  name: 'E-commerce',
  description: 'Online store layout with product focus',
  icon: 'shopping-cart',
  styles: {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Online store layout with product focus',
    layout: 'ecommerce',
    sections: ['products', 'cart', 'checkout', 'account']
  }
};

<DynamicProvider customContentStyles={[ecommerceStyle]}>
  <YourApp />
</DynamicProvider>
```

### Blog Style

```tsx
const blogStyle = {
  id: 'blog',
  name: 'Blog',
  description: 'Content-focused blog layout',
  icon: 'file-text',
  styles: {
    id: 'blog',
    name: 'Blog',
    description: 'Content-focused blog layout',
    layout: 'blog',
    sections: ['posts', 'categories', 'tags', 'comments']
  }
};
```

### Landing Page Style

```tsx
const landingStyle = {
  id: 'landing',
  name: 'Landing Page',
  description: 'Conversion-focused landing page',
  icon: 'target',
  styles: {
    id: 'landing',
    name: 'Landing Page',
    description: 'Conversion-focused landing page',
    layout: 'landing',
    sections: ['hero', 'benefits', 'features', 'cta', 'footer']
  }
};
```

## Advanced Usage

### Dynamic Style Switching

```tsx
import { useContentStyle, useContent } from 'arc-it';

function DynamicLayout() {
  const { currentStyle, setContentStyle } = useContentStyle();
  const { content, language } = useContent();
  
  const renderContent = () => {
    switch (currentStyle) {
      case 'marketing':
        return <MarketingLayout content={content[language]} />;
      case 'portfolio':
        return <PortfolioLayout content={content[language]} />;
      case 'business':
        return <BusinessLayout content={content[language]} />;
      default:
        return <DefaultLayout content={content[language]} />;
    }
  };
  
  return (
    <div>
      <StyleSwitcher />
      {renderContent()}
    </div>
  );
}
```

### Conditional Rendering Based on Style

```tsx
import { useContentStyle } from 'arc-it';

function ConditionalComponent() {
  const { currentStyle } = useContentStyle();
  
  return (
    <div>
      {currentStyle === 'marketing' && (
        <div className="marketing-specific">
          <h2>Special Marketing Content</h2>
          <p>This only shows in marketing style</p>
        </div>
      )}
      
      {currentStyle === 'portfolio' && (
        <div className="portfolio-specific">
          <h2>Portfolio Gallery</h2>
          <div className="gallery-grid">
            {/* Portfolio content */}
          </div>
        </div>
      )}
    </div>
  );
}
```

### Style-Based Styling

```tsx
import { useContentStyle } from 'arc-it';

function StyleAwareComponent() {
  const { currentStyle } = useContentStyle();
  
  const getStyleClasses = () => {
    switch (currentStyle) {
      case 'marketing':
        return 'bg-gradient-to-r from-blue-500 to-purple-600 text-white';
      case 'portfolio':
        return 'bg-gray-100 text-gray-900';
      case 'business':
        return 'bg-white text-gray-900 border border-gray-200';
      default:
        return 'bg-white text-gray-900';
    }
  };
  
  return (
    <div className={`p-6 rounded-lg ${getStyleClasses()}`}>
      <h2>Style-Aware Component</h2>
      <p>This component adapts to the current content style</p>
    </div>
  );
}
```

## Best Practices

### 1. **Consistent Naming**
- Use descriptive, consistent names for styles
- Follow a naming convention (e.g., kebab-case)
- Make names user-friendly

### 2. **Metadata Organization**
- Group related styles with categories
- Use meaningful icons and descriptions
- Add tags for easy filtering

### 3. **Section Planning**
- Plan sections based on content needs
- Keep sections focused and specific
- Consider reusability across styles

### 4. **Performance**
- Avoid excessive style switching
- Use React.memo for style-aware components
- Consider lazy loading for complex styles

### 5. **User Experience**
- Provide clear style descriptions
- Show visual indicators for active styles
- Allow easy style switching

## Integration with Other Features

### Theme Integration

Content styles work seamlessly with theme switching:

```tsx
import { useTheme, useContentStyle } from 'arc-it';

function IntegratedSwitcher() {
  const { setPreset, currentPreset } = useTheme();
  const { setContentStyle, currentStyle } = useContentStyle();
  
  const switchToMarketing = () => {
    setPreset('blue'); // Set blue theme
    setContentStyle('marketing'); // Set marketing style
  };
  
  return (
    <div>
      <button onClick={switchToMarketing}>
        Switch to Blue Marketing
      </button>
    </div>
  );
}
```

### Language Integration

Content styles work with language switching:

```tsx
import { useContent, useContentStyle } from 'arc-it';

function LocalizedStyle() {
  const { language, setLanguage } = useContent();
  const { currentStyle } = useContentStyle();
  
  const getLocalizedStyleName = () => {
    const styleNames = {
      en: { marketing: 'Marketing', portfolio: 'Portfolio' },
      es: { marketing: 'Mercadeo', portfolio: 'Portafolio' }
    };
    
    return styleNames[language]?.[currentStyle] || currentStyle;
  };
  
  return (
    <div>
      <h2>Current Style: {getLocalizedStyleName()}</h2>
    </div>
  );
}
```

## Summary

Content style management in Arc-it provides:

- **Flexible Layouts**: Switch between different content structures
- **Custom Styles**: Add your own styles with metadata
- **Dynamic Switching**: Change styles on the fly
- **Integration**: Works seamlessly with themes and languages
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized for production use

This system allows you to create truly dynamic applications that can adapt their content structure based on user preferences, business needs, or any other criteria you define.
