import { Theme } from './theme';
import { themeToTailwindColors } from './tailwind';

/**
 * Generate complete Tailwind CSS with theme integration
 */
export function generateTailwindCSS(theme: Theme, options: {
  includeBase?: boolean;
  includeComponents?: boolean;
  includeUtilities?: boolean;
  customCSS?: string;
} = {}): string {
  const {
    includeBase = true,
    includeComponents = true,
    includeUtilities = true,
    customCSS = ''
  } = options;

  const tailwindColors = themeToTailwindColors(theme);
  
  let css = '';
  
  // CSS Variables
  css += generateCSSVariables(theme, tailwindColors);
  
  // Base styles
  if (includeBase) {
    css += generateBaseStyles(theme);
  }
  
  // Component styles
  if (includeComponents) {
    css += generateComponentStyles(theme, tailwindColors);
  }
  
  // Utility styles
  if (includeUtilities) {
    css += generateUtilityStyles(tailwindColors);
  }
  
  // Custom CSS
  if (customCSS) {
    css += `\n/* Custom CSS */\n${customCSS}\n`;
  }
  
  return css;
}

/**
 * Generate CSS variables for the theme
 */
function generateCSSVariables(theme: Theme, tailwindColors: Record<string, string>): string {
  let css = ':root {\n';
  
  // Add Tailwind color variables
  Object.entries(tailwindColors).forEach(([key, value]) => {
    css += `  --tw-color-${key}: ${value};\n`;
  });
  
  // Add font variables
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    css += `  --tw-font-${key}: ${value};\n`;
  });
  
  css += '}\n\n';
  
  return css;
}

/**
 * Generate base styles
 */
function generateBaseStyles(theme: Theme): string {
  let css = '/* Base styles */\n';
  
  // Body styles
  css += `body {\n`;
  css += `  font-family: var(--tw-font-body, system-ui, sans-serif);\n`;
  css += `  background-color: var(--tw-color-background, #ffffff);\n`;
  css += `  color: var(--tw-color-foreground, #000000);\n`;
  css += `}\n\n`;
  
  // Heading styles
  css += `h1, h2, h3, h4, h5, h6 {\n`;
  css += `  font-family: var(--tw-font-heading, system-ui, sans-serif);\n`;
  css += `  color: var(--tw-color-foreground, #000000);\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate component styles
 */
function generateComponentStyles(theme: Theme, tailwindColors: Record<string, string>): string {
  let css = '/* Component styles */\n';
  
  // Button styles
  css += `.btn {\n`;
  css += `  padding: 0.5rem 1rem;\n`;
  css += `  border-radius: 0.375rem;\n`;
  css += `  font-weight: 500;\n`;
  css += `  transition: all 0.2s;\n`;
  css += `}\n\n`;
  
  css += `.btn-primary {\n`;
  css += `  background-color: var(--tw-color-primary, #0070f3);\n`;
  css += `  color: white;\n`;
  css += `}\n\n`;
  
  css += `.btn-primary:hover {\n`;
  css += `  background-color: var(--tw-color-primary-600, #0056b3);\n`;
  css += `}\n\n`;
  
  // Card styles
  css += `.card {\n`;
  css += `  background-color: var(--tw-color-background, #ffffff);\n`;
  css += `  border: 1px solid var(--tw-color-border, #e5e7eb);\n`;
  css += `  border-radius: 0.5rem;\n`;
  css += `  padding: 1rem;\n`;
  css += `}\n\n`;
  
  return css;
}

/**
 * Generate utility styles
 */
function generateUtilityStyles(tailwindColors: Record<string, string>): string {
  let css = '/* Utility styles */\n';
  
  // Color utilities
  Object.entries(tailwindColors).forEach(([key, value]) => {
    css += `.bg-${key} { background-color: var(--tw-color-${key}); }\n`;
    css += `.text-${key} { color: var(--tw-color-${key}); }\n`;
    css += `.border-${key} { border-color: var(--tw-color-${key}); }\n`;
  });
  
  css += '\n';
  
  // Spacing utilities
  const spacing = ['0', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '32', '40', '48', '56', '64'];
  spacing.forEach(space => {
    const value = `${parseInt(space) * 0.25}rem`;
    css += `.p-${space} { padding: ${value}; }\n`;
    css += `.m-${space} { margin: ${value}; }\n`;
  });
  
  css += '\n';
  
  // Flexbox utilities
  css += '.flex { display: flex; }\n';
  css += '.flex-col { flex-direction: column; }\n';
  css += '.items-center { align-items: center; }\n';
  css += '.justify-center { justify-content: center; }\n';
  css += '.justify-between { justify-content: space-between; }\n';
  
  return css;
}

/**
 * Generate Tailwind config file content
 */
export function generateTailwindConfigFile(theme: Theme): string {
  const tailwindColors = themeToTailwindColors(theme);
  
  let config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
`;

  // Add theme colors
  Object.entries(tailwindColors).forEach(([key, value]) => {
    config += `        "${key}": "${value}",\n`;
  });
  
  config += `      },
      fontFamily: {
`;

  // Add font families
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    config += `        "${key}": [${value.split(',').map(font => `"${font.trim()}"`).join(', ')}],\n`;
  });
  
  config += `      },
    },
  },
  plugins: [],
}
`;

  return config;
}

/**
 * Generate PostCSS config for Tailwind
 */
export function generatePostCSSConfig(): string {
  return `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
`;
}

/**
 * Generate package.json scripts for Tailwind
 */
export function generatePackageScripts(): Record<string, string> {
  return {
    "build:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch",
    "build:css:prod": "tailwindcss -i ./src/input.css -o ./dist/output.css --minify",
    "dev:css": "tailwindcss -i ./src/input.css -o ./dist/output.css --watch"
  };
}
