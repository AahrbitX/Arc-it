import React from 'react';
import { ThemeProvider, ContentProvider, useTheme, useContent } from '../src';

/**
 * Example showing how to integrate with an existing project
 */

// Assume this is your existing app's main component
const YourExistingApp = () => {
  return (
    <div>
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
};

// Example existing header component
const Header = () => {
  // Now we can use theme hooks
  const { getColor, isDarkMode, toggleDarkMode } = useTheme();
  
  const headerStyle = {
    backgroundColor: getColor('primary'),
    color: '#ffffff',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };
  
  return (
    <header style={headerStyle}>
      <h1>My Existing App</h1>
      <button onClick={toggleDarkMode}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
    </header>
  );
};

// Example existing main content
const MainContent = () => {
  // Now we can use content hooks
  const { getSection } = useContent();
  const homeContent = getSection('home');
  
  return (
    <main style={{ padding: '2rem' }}>
      <h2>{homeContent?.title || 'Welcome to Our App'}</h2>
      <p>{homeContent?.description || 'This is an example of integrating dynamic-theme-content with an existing app.'}</p>
      
      <div>
        {/* Your existing components */}
        <ExistingFeatureComponent />
      </div>
    </main>
  );
};

// Example existing feature component
const ExistingFeatureComponent = () => {
  // You can use theme values in your existing components
  const { getColor } = useTheme();
  
  return (
    <div style={{ 
      border: `1px solid ${getColor('secondary')}`,
      padding: '1rem',
      margin: '1rem 0',
      borderRadius: '4px'
    }}>
      <h3 style={{ color: getColor('accent') }}>Existing Feature</h3>
      <p>This is an existing component that now uses dynamic theming.</p>
    </div>
  );
};

// Example footer
const Footer = () => {
  // Using theme again
  const { getColor } = useTheme();
  
  return (
    <footer style={{ 
      backgroundColor: getColor('background'),
      color: getColor('foreground'),
      padding: '1rem',
      textAlign: 'center',
      borderTop: `1px solid ${getColor('secondary')}`
    }}>
      <p>© 2023 My Existing App</p>
    </footer>
  );
};

// This is how you would wrap your existing app
const AppWithDynamicThemeContent = () => {
  // Define your theme and content sources
  const themeSource = '/content/theme.json';
  const contentSource = '/content/content.json';
  
  return (
    <ThemeProvider themePath={themeSource}>
      <ContentProvider>
        <YourExistingApp />
      </ContentProvider>
    </ThemeProvider>
  );
};

// In a real app, you would export this and render it with ReactDOM
export default AppWithDynamicThemeContent;
