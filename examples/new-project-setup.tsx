import React from 'react';
import { ThemeProvider, ContentProvider, useTheme, useContent, useContentSection } from '../src';

/**
 * Example showing how to setup a new project with dynamic-theme-content
 */

// Step 1: Create sample JSON theme file (in a real project, this would be in public/content/theme.json)
const themeFile = {
  "colors": {
    "primary": "#0070f3",
    "secondary": "#ff4081",
    "background": "#ffffff",
    "foreground": "#333333",
    "accent": "#7928ca",
    "error": "#d32f2f",
    "success": "#388e3c",
    "warning": "#f57c00"
  },
  "fonts": {
    "body": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "heading": "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    "monospace": "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace"
  },
  "presets": {
    "dark": {
      "colors": {
        "background": "#121212",
        "foreground": "#e0e0e0",
        "primary": "#90caf9",
        "secondary": "#ff80ab"
      }
    },
    "light": {
      "colors": {
        "background": "#ffffff",
        "foreground": "#333333",
        "primary": "#0070f3",
        "secondary": "#ff4081"
      }
    },
    "purple": {
      "colors": {
        "background": "#ffffff",
        "foreground": "#333333",
        "primary": "#9c27b0",
        "accent": "#d500f9"
      }
    }
  }
};

// Step 2: Create sample content file (in a real project, this would be in public/content/content.json)
const contentFile = {
  "home": {
    "hero": {
      "title": "Build Beautiful Websites",
      "subtitle": "Dynamic theming and content management made easy",
      "cta": "Get Started"
    },
    "features": [
      {
        "title": "Dynamic Theming",
        "description": "Switch between multiple theme presets or create custom themes",
        "icon": "palette"
      },
      {
        "title": "Content Management",
        "description": "Easily manage and update content without changing code",
        "icon": "description"
      },
      {
        "title": "Localization",
        "description": "Support multiple languages with content localization",
        "icon": "language"
      }
    ]
  },
  "about": {
    "title": "About Our Platform",
    "content": "We provide a comprehensive solution for dynamic theming and content management in React applications."
  }
};

// Step 3: Define components for your new application

// Hero Component
const Hero = () => {
  const heroContent = useContentSection('home')?.hero;
  const { getColor } = useTheme();
  
  if (!heroContent) return null;
  
  return (
    <section style={{
      backgroundColor: getColor('background'),
      padding: '4rem 2rem',
      textAlign: 'center'
    }}>
      <h1 style={{ 
        color: getColor('primary'),
        fontFamily: 'var(--font-heading)',
        fontSize: '3rem',
        marginBottom: '1rem'
      }}>
        {heroContent.title}
      </h1>
      <h2 style={{ 
        color: getColor('foreground'),
        fontFamily: 'var(--font-body)',
        fontSize: '1.5rem',
        marginBottom: '2rem',
        fontWeight: 'normal'
      }}>
        {heroContent.subtitle}
      </h2>
      <button style={{
        backgroundColor: getColor('accent'),
        color: '#ffffff',
        padding: '12px 24px',
        fontSize: '1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
      }}>
        {heroContent.cta}
      </button>
    </section>
  );
};

// Feature Component
const Feature = ({ feature }) => {
  const { getColor } = useTheme();
  
  return (
    <div style={{
      backgroundColor: 'rgba(0,0,0,0.03)',
      padding: '1.5rem',
      borderRadius: '8px',
      margin: '1rem',
      flex: '1',
      minWidth: '200px'
    }}>
      <div style={{
        color: getColor('primary'),
        fontSize: '1.5rem',
        marginBottom: '0.5rem'
      }}>
        {/* Placeholder for icon */}
        {feature.icon}
      </div>
      <h3 style={{
        color: getColor('foreground'),
        marginBottom: '1rem'
      }}>
        {feature.title}
      </h3>
      <p style={{
        color: getColor('foreground'),
        opacity: 0.8
      }}>
        {feature.description}
      </p>
    </div>
  );
};

// Features Section
const Features = () => {
  const homeContent = useContentSection('home');
  const features = homeContent?.features || [];
  
  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        Features
      </h2>
      <div style={{ 
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {features.map((feature, index) => (
          <Feature key={index} feature={feature} />
        ))}
      </div>
    </section>
  );
};

// Theme Switcher
const ThemeSwitcher = () => {
  const { availablePresets, currentPreset, setPreset, isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px',
      zIndex: 100,
      backgroundColor: 'rgba(255,255,255,0.9)',
      padding: '10px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <div style={{ marginBottom: '10px' }}>
        <button 
          onClick={toggleDarkMode}
          style={{
            padding: '5px 10px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: isDarkMode ? '#fff' : '#333',
            color: isDarkMode ? '#333' : '#fff',
            cursor: 'pointer'
          }}
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
      
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        gap: '5px'
      }}>
        {availablePresets.map(preset => (
          <button
            key={preset}
            onClick={() => setPreset(preset)}
            style={{
              backgroundColor: preset === currentPreset ? '#0070f3' : '#eee',
              color: preset === currentPreset ? '#fff' : '#333',
              padding: '5px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <ThemeProvider
      // In a real app, use actual paths
      // themePath="/content/theme.json"
      // For this example, we're passing objects directly
      themePath={themeFile}
      initialPreset="light"
    >
      <ContentProvider
        // In a real app, use actual paths
        // contentSource="/content/content.json"
        // For this example, we're passing objects directly
        contentSource={contentFile}
        initialLanguage="en"
      >
        <AppContent />
      </ContentProvider>
    </ThemeProvider>
  );
};

// App Content
const AppContent = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-foreground)',
      fontFamily: 'var(--font-body)',
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      <ThemeSwitcher />
      <Hero />
      <Features />
      
      <footer style={{ 
        padding: '2rem', 
        textAlign: 'center',
        marginTop: '2rem',
        borderTop: '1px solid rgba(0,0,0,0.1)'
      }}>
        <p>Built with dynamic-theme-content</p>
      </footer>
    </div>
  );
};

export default App;
