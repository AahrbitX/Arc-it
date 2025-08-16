import React from 'react';
import { DynamicProvider, DynamicSwitcher, useTheme, useContent } from '../src';

// ============================================================================
// 🎨 DYNAMIC USAGE EXAMPLE
// ============================================================================
// This example shows how the DynamicSwitcher automatically detects themes and content
// from your JSON files - no hardcoding needed!

// Example theme.json structure that will be automatically detected:
const exampleThemeStructure = {
  colors: {
    primary: '#0070f3',
    background: '#ffffff',
    foreground: '#000000'
  },
  presets: {
    // These will be automatically detected as available themes
    'green': {
      colors: { primary: '#00ff0d', background: '#f0fff0', foreground: '#003300' }
    },
    'green-light': {
      colors: { primary: '#00cc0a', background: '#ffffff', foreground: '#003300' }
    },
    'blue': {
      colors: { primary: '#3b82f6', background: '#eff6ff', foreground: '#1e3a8a' }
    },
    'blue-light': {
      colors: { primary: '#60a5fa', background: '#ffffff', foreground: '#1e3a8a' }
    },
    'orange': {
      colors: { primary: '#f59e0b', background: '#fffbeb', foreground: '#92400e' }
    },
    'orange-light': {
      colors: { primary: '#fbbf24', background: '#ffffff', foreground: '#92400e' }
    }
  }
};

// Example content.json structure that will be automatically detected:
const exampleContentStructure = {
  // These language keys will be automatically detected
  en: {
    hero: { title: 'Welcome to Our Site', subtitle: 'Dynamic content detection' },
    about: { title: 'About Us', description: 'We use smart detection' }
  },
  es: {
    hero: { title: 'Bienvenido a Nuestro Sitio', subtitle: 'Detección de contenido dinámico' },
    about: { title: 'Sobre Nosotros', description: 'Usamos detección inteligente' }
  },
  fr: {
    hero: { title: 'Bienvenue sur Notre Site', subtitle: 'Détection de contenu dynamique' },
    about: { title: 'À Propos', description: 'Nous utilisons une détection intelligente' }
  },
  // These content styles will be automatically detected
  styles: {
    'default': { name: 'Default Style', description: 'Standard content layout' },
    'marketing': { name: 'Marketing Style', description: 'Sales-focused content' },
    'portfolio': { name: 'Portfolio Style', description: 'Showcase content layout' }
  }
};

// Example component that uses the detected themes and content
const DynamicContentExample = () => {
  const { currentPreset, getColor } = useTheme();
  const { getSection, language } = useContent();
  
  const heroContent = getSection('hero');
  const aboutContent = getSection('about');
  
  return (
    <div className="min-h-screen p-8" style={{ 
      backgroundColor: getColor('background'),
      color: getColor('foreground')
    }}>
      <div className="max-w-4xl mx-auto">
        {/* Header with Dynamic Switcher */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold" style={{ color: getColor('primary') }}>
            Dynamic Theme & Content
          </h1>
          <DynamicSwitcher />
        </header>
        
        {/* Hero Section */}
        {heroContent && (
          <section className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4" style={{ color: getColor('primary') }}>
              {heroContent.title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {heroContent.subtitle}
            </p>
            <div className="mt-6">
              <span className="inline-block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                Current Language: {language}
              </span>
              <span className="inline-block ml-3 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                Current Theme: {currentPreset}
              </span>
            </div>
          </section>
        )}
        
        {/* About Section */}
        {aboutContent && (
          <section className="mb-16">
            <h3 className="text-3xl font-bold mb-4" style={{ color: getColor('primary') }}>
              {aboutContent.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {aboutContent.description}
            </p>
          </section>
        )}
        
        {/* Features Section */}
        <section className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-6 rounded-lg border" style={{ borderColor: getColor('primary') }}>
            <h4 className="text-xl font-semibold mb-3" style={{ color: getColor('primary') }}>
              🎨 Auto Theme Detection
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Themes are automatically detected from your theme.json file. 
              No need to hardcode theme names!
            </p>
          </div>
          
          <div className="p-6 rounded-lg border" style={{ borderColor: getColor('primary') }}>
            <h4 className="text-xl font-semibold mb-3" style={{ color: getColor('primary') }}>
              🌍 Auto Language Detection
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Languages are automatically detected from your content.json file. 
              Just add language keys and they appear!
            </p>
          </div>
          
          <div className="p-6 rounded-lg border" style={{ borderColor: getColor('primary') }}>
            <h4 className="text-xl font-semibold mb-3" style={{ color: getColor('primary') }}>
              📝 Auto Content Style Detection
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Content styles are automatically detected from your content.json file. 
              Add new styles and they're instantly available!
            </p>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6" style={{ color: getColor('primary') }}>
            How Dynamic Detection Works
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h4 className="font-semibold">Theme Detection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The <code>useDynamicThemeDetection</code> hook reads your theme.json file and 
                  automatically discovers all available presets (green, blue, orange, etc.)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h4 className="font-semibold">Language Detection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The <code>useDynamicContentDetection</code> hook reads your content.json file and 
                  automatically discovers all language keys (en, es, fr, etc.)
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h4 className="font-semibold">Content Style Detection</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The same hook also discovers content styles from the styles section of your content.json file
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h4 className="font-semibold">Automatic UI Generation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  The DynamicSwitcher component automatically generates the UI based on what it detects. 
                  No hardcoded buttons or options needed!
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* JSON Examples */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold mb-6" style={{ color: getColor('primary') }}>
            Your JSON Files Structure
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-3">theme.json</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{JSON.stringify(exampleThemeStructure, null, 2)}
              </pre>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">content.json</h4>
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{JSON.stringify(exampleContentStructure, null, 2)}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// Main App component
const App = () => {
  return (
    <DynamicProvider>
      <DynamicContentExample />
    </DynamicProvider>
  );
};

export default App;
