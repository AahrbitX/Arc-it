import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';
import { Theme } from './theme';
import { 
  themeToTailwindColors, 
  getTailwindColorClass, 
  getTailwindBgClass, 
  getTailwindBorderClass 
} from './tailwind';

/**
 * Hook to get Tailwind-compatible theme colors
 */
export function useTailwindColors(): Record<string, string> {
  const { theme } = useContext(ThemeContext)!;
  return themeToTailwindColors(theme);
}

/**
 * Hook to get Tailwind text color class for a theme color
 */
export function useTailwindTextClass(colorName: string, variant: string = ''): string {
  return getTailwindColorClass(colorName, variant);
}

/**
 * Hook to get Tailwind background class for a theme color
 */
export function useTailwindBgClass(colorName: string, variant: string = ''): string {
  return getTailwindBgClass(colorName, variant);
}

/**
 * Hook to get Tailwind border class for a theme color
 */
export function useTailwindBorderClass(colorName: string, variant: string = ''): string {
  return getTailwindBorderClass(colorName, variant);
}

/**
 * Hook to get all Tailwind classes for a theme color
 */
export function useTailwindColorClasses(colorName: string, variant: string = ''): {
  text: string;
  bg: string;
  border: string;
} {
  return {
    text: getTailwindColorClass(colorName, variant),
    bg: getTailwindBgClass(colorName, variant),
    border: getTailwindBorderClass(colorName, variant)
  };
}

/**
 * Hook to get Tailwind font family classes
 */
export function useTailwindFontClasses(): Record<string, string> {
  const { theme } = useContext(ThemeContext)!;
  const fontClasses: Record<string, string> = {};
  
  Object.entries(theme.fonts || {}).forEach(([key, value]) => {
    // Convert font stack to Tailwind class name
    const className = `font-${key}`;
    fontClasses[key] = className;
  });
  
  return fontClasses;
}

/**
 * Hook to get complete Tailwind theme configuration
 */
export function useTailwindConfig(): Record<string, any> {
  const { theme } = useContext(ThemeContext)!;
  
  return {
    theme: {
      extend: {
        colors: themeToTailwindColors(theme),
        fontFamily: theme.fonts || {},
      }
    }
  };
}

/**
 * Hook to get dynamic Tailwind classes based on current theme
 */
export function useDynamicTailwindClasses(): {
  primary: {
    text: string;
    bg: string;
    border: string;
  };
  background: {
    text: string;
    bg: string;
    border: string;
  };
  foreground: {
    text: string;
    bg: string;
    border: string;
  };
} {
  return {
    primary: useTailwindColorClasses('primary'),
    background: useTailwindColorClasses('background'),
    foreground: useTailwindColorClasses('foreground')
  };
}

/**
 * Hook to get responsive Tailwind classes
 */
export function useResponsiveTailwindClasses(
  baseClass: string,
  breakpoints: Record<string, string> = {
    sm: 'sm:',
    md: 'md:',
    lg: 'lg:',
    xl: 'xl:',
    '2xl': '2xl:'
  }
): Record<string, string> {
  const responsiveClasses: Record<string, string> = { base: baseClass };
  
  Object.entries(breakpoints).forEach(([breakpoint, prefix]) => {
    responsiveClasses[breakpoint] = `${prefix}${baseClass}`;
  });
  
  return responsiveClasses;
}
