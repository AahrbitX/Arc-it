import React from 'react';
import {
  // Original approach
  ThemeProvider,
  useTheme,
  useThemeColor,
  
  // Tailwind approach
  TailwindThemeProvider,
  useTailwindTheme,
  useTailwindColors,
  useTailwindColorClasses,
  useDynamicTailwindClasses,
  
  // CSS generation
  generateTailwindCSS,
  generateTailwindConfigFile
} from '../src';

// Example theme data
const exampleTheme = {
  colors: {
    primary: '#0070f3',
    secondary: '#7928ca',
    background: '#ffffff',
    foreground: '#000000',
    accent: '#f81ce5'
  },
  fonts: {
    body: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  }
};

// Example 1: Using the original CSS variables approach
export function OriginalApproachExample() {
  return (
    <ThemeProvider themePath="/content/theme.json">
      <OriginalComponent />
    </ThemeProvider>
  );
}

function OriginalComponent() {
  const { theme, getColor, getFont } = useTheme();
  const primaryColor = useThemeColor('primary');
  
  return (
    <div style={{ 
      backgroundColor: getColor('background'),
      color: getColor('foreground'),
      fontFamily: getFont('body'),
      padding: '1rem'
    }}>
      <h1 style={{ fontFamily: getFont('heading') }}>
        Original CSS Variables Approach
      </h1>
      <p>Primary color: {primaryColor}</p>
      <button style={{ 
        backgroundColor: getColor('primary'),
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.375rem'
      }}>
        Styled Button
      </button>
    </div>
  );
}

// Example 2: Using the new Tailwind approach
export function TailwindApproachExample() {
  return (
    <TailwindThemeProvider themePath="/content/theme.json" enableTailwind={true}>
      <TailwindComponent />
    </TailwindThemeProvider>
  );
}

function TailwindComponent() {
  const { theme, tailwindConfig } = useTailwindTheme();
  const tailwindColors = useTailwindColors();
  const primaryClasses = useTailwindColorClasses('primary');
  const dynamicClasses = useDynamicTailwindClasses();
  
  return (
    <div className="bg-background text-foreground font-body p-4">
      <h1 className="font-heading text-2xl mb-4">
        Tailwind CSS Approach
      </h1>
      
      <div className="space-y-4">
        <p>Primary color: {tailwindColors.primary}</p>
        
        {/* Using dynamic Tailwind classes */}
        <button className={`${primaryClasses.bg} text-white px-4 py-2 rounded-md hover:opacity-90`}>
          Primary Button
        </button>
        
        {/* Using predefined dynamic classes */}
        <div className={`${dynamicClasses.primary.bg} ${dynamicClasses.primary.text} p-4 rounded-lg`}>
          Dynamic Primary Card
        </div>
        
        {/* Using Tailwind utilities with theme colors */}
        <div className="bg-secondary text-white p-4 rounded-lg">
          Secondary Card
        </div>
        
        <div className="bg-accent text-white p-4 rounded-lg">
          Accent Card
        </div>
      </div>
    </div>
  );
}

// Example 3: Using both approaches together
export function HybridApproachExample() {
  return (
    <TailwindThemeProvider themePath="/content/theme.json" enableTailwind={true}>
      <HybridComponent />
    </TailwindThemeProvider>
  );
}

function HybridComponent() {
  const { theme, getColor, getFont } = useTheme(); // Original approach
  const tailwindColors = useTailwindColors(); // Tailwind approach
  
  return (
    <div className="bg-background text-foreground p-4">
      <h1 className="font-heading text-2xl mb-4">
        Hybrid Approach - Best of Both Worlds
      </h1>
      
      <div className="space-y-4">
        {/* Mix Tailwind classes with CSS variables */}
        <div 
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: getColor('primary'),
            borderColor: getColor('secondary'),
            color: 'white'
          }}
        >
          <p>Mixed approach: Tailwind classes + CSS variables</p>
        </div>
        
        {/* Use Tailwind for layout, CSS variables for colors */}
        <div className="grid grid-cols-2 gap-4">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('accent') }}
          >
            Grid Item 1
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: getColor('secondary') }}
          >
            Grid Item 2
          </div>
        </div>
        
        {/* Responsive design with Tailwind */}
        <div className="flex flex-col md:flex-row gap-4">
          <div 
            className="flex-1 p-4 rounded-lg"
            style={{ backgroundColor: getColor('primary') }}
          >
            Responsive Item 1
          </div>
          <div 
            className="flex-1 p-4 rounded-lg"
            style={{ backgroundColor: getColor('accent') }}
          >
            Responsive Item 2
          </div>
        </div>
      </div>
    </div>
  );
}

// Example 4: Generating Tailwind CSS and config files
export function ConfigurationExample() {
  const { theme } = useTailwindTheme();
  
  // Generate Tailwind CSS
  const tailwindCSS = generateTailwindCSS(theme, {
    includeBase: true,
    includeComponents: true,
    includeUtilities: true
  });
  
  // Generate Tailwind config
  const tailwindConfig = generateTailwindConfigFile(theme);
  
  const handleDownloadCSS = () => {
    const blob = new Blob([tailwindCSS], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind-theme.css';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  const handleDownloadConfig = () => {
    const blob = new Blob([tailwindConfig], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tailwind.config.js';
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="bg-background text-foreground p-4">
      <h1 className="font-heading text-2xl mb-4">
        Configuration Generation
      </h1>
      
      <div className="space-y-4">
        <div className="flex gap-4">
          <button 
            onClick={handleDownloadCSS}
            className="bg-primary text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Download Tailwind CSS
          </button>
          
          <button 
            onClick={handleDownloadConfig}
            className="bg-secondary text-white px-4 py-2 rounded-md hover:opacity-90"
          >
            Download Tailwind Config
          </button>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Generated Tailwind CSS Preview:</h3>
          <pre className="text-sm overflow-auto max-h-64">
            {tailwindCSS.substring(0, 500)}...
          </pre>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Generated Tailwind Config Preview:</h3>
          <pre className="text-sm overflow-auto max-h-64">
            {tailwindConfig.substring(0, 500)}...
          </pre>
        </div>
      </div>
    </div>
  );
}

// Main App component showing all approaches
export function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Dynamic Theme Content - Tailwind Integration
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Original CSS Variables Approach</h2>
          <OriginalApproachExample />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Tailwind CSS Approach</h2>
          <TailwindApproachExample />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Hybrid Approach</h2>
          <HybridApproachExample />
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Configuration Generation</h2>
          <ConfigurationExample />
        </div>
      </div>
    </div>
  );
}
