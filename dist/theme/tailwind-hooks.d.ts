/**
 * Hook to get Tailwind-compatible theme colors
 */
export declare function useTailwindColors(): Record<string, string>;
/**
 * Hook to get Tailwind text color class for a theme color
 */
export declare function useTailwindTextClass(colorName: string, variant?: string): string;
/**
 * Hook to get Tailwind background class for a theme color
 */
export declare function useTailwindBgClass(colorName: string, variant?: string): string;
/**
 * Hook to get Tailwind border class for a theme color
 */
export declare function useTailwindBorderClass(colorName: string, variant?: string): string;
/**
 * Hook to get all Tailwind classes for a theme color
 */
export declare function useTailwindColorClasses(colorName: string, variant?: string): {
    text: string;
    bg: string;
    border: string;
};
/**
 * Hook to get Tailwind font family classes
 */
export declare function useTailwindFontClasses(): Record<string, string>;
/**
 * Hook to get complete Tailwind theme configuration
 */
export declare function useTailwindConfig(): Record<string, any>;
/**
 * Hook to get dynamic Tailwind classes based on current theme
 */
export declare function useDynamicTailwindClasses(): {
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
};
/**
 * Hook to get responsive Tailwind classes
 */
export declare function useResponsiveTailwindClasses(baseClass: string, breakpoints?: Record<string, string>): Record<string, string>;
//# sourceMappingURL=tailwind-hooks.d.ts.map