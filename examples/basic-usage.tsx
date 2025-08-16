import React from 'react';
import { ThemeProvider, ContentProvider, useTheme, useContent } from '../src';

/**
 * Basic usage example for the dynamic-theme-content module
 */

// Example theme file structure (would typically be loaded from JSON)
const exampleTheme = {
  colors: {
    primary: '#3498db',
    secondary: '#2ecc71',
    background: '#ffffff',
    foreground: '#333333',
    accent: '#e74c3c'
  },
  fonts: {
    body: 'Arial, sans-serif',
    heading: 'Helvetica, Arial, sans-serif'
  },
  presets: {
    dark: {
      colors: {
        background: '#121212',
        foreground: '#f5f5f5'
      }
    },
    blue: {
      colors: {
        primary: '#1e88e5',
        accent: '#42a5f5'
      }
    },
    green: {
      colors: {
        primary: '#43a047',
        accent: '#66bb6a'
      }
    }
  }
};

// Example content file structure (would typically be loaded from JSON)
const exampleContent = {
  hero: {
    title: 'Welcome to Our Website',
    subtitle: 'We provide amazing services',
    buttonText: 'Learn More'
  },
  features: [
    {
      title: 'Easy to Use',
      description: 'Our platform is designed to be intuitive and user-friendly.'
    },
    {
      title: 'Highly Customizable',
      description: 'Tailor the experience to your specific needs and preferences.'
    },
    {
      title: 'Responsive Design',
      description: 'Works seamlessly on desktop, tablet, and mobile devices.'
    }
  ],
  about: {
    title: 'About Us',
    description: 'We are a team of passionate developers creating awesome products.'
  }
};

// Example Button component using theme
const Button = ({ children, variant = 'primary' }: { children: React.ReactNode; variant?: string }) => {
  const { getColor } = useTheme();
  const primaryColor = getColor(variant);
  
  const buttonStyle = {
    backgroundColor: primaryColor,
    color: '#ffffff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold'
  };
  
  return (
    <button style={buttonStyle}>
      {children}
    </button>
  );
};

// Example content display component
const ContentSection = ({ section }: { section: string }) => {
  const { getSection } = useContent();
  const content = getSection(section);
  
  if (!content) return <div>No content available for {section}</div>;
  
  return (
    <div>
      <h2>{content.title}</h2>
      {content.subtitle && <h3>{content.subtitle}</h3>}
      {content.description && <p>{content.description}</p>}
      {content.buttonText && <Button>{content.buttonText}</Button>}
    </div>
  );
};

// Theme switcher component
const ThemeSwitcher = () => {
  const { setPreset, currentPreset, availablePresets } = useTheme();
  
  return (
    <div>
      <h3>Theme Presets</h3>
      <div style={{ display: 'flex', gap: '10px' }}>
        {availablePresets.map(preset => (
          <button
            key={preset}
            onClick={() => setPreset(preset)}
            style={{
              backgroundColor: preset === currentPreset ? '#333' : '#eee',
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

// Main App component
const App = () => {
  return (
    <ThemeProvider
      themePath="/content/theme.json" // In a real app, use actual paths
      initialPreset="blue"
    >
      <ContentProvider>
        <AppContent />
      </ContentProvider>
    </ThemeProvider>
  );
};

// App content component
const AppContent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  return (
    <div style={{ 
      fontFamily: 'var(--font-body)',
      backgroundColor: 'var(--color-background)',
      color: 'var(--color-foreground)',
      padding: '20px',
      minHeight: '100vh'
    }}>
      <header>
        <ThemeSwitcher />
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
      </header>
      
      <main>
        <ContentSection section="hero" />
        <ContentSection section="about" />
      </main>
    </div>
  );
};

// In a real app, you would export App and render it with ReactDOM
export default App;
