import { Theme } from './theme';
/**
 * Generate complete Tailwind CSS with theme integration
 */
export declare function generateTailwindCSS(theme: Theme, options?: {
    includeBase?: boolean;
    includeComponents?: boolean;
    includeUtilities?: boolean;
    customCSS?: string;
}): string;
/**
 * Generate Tailwind config file content
 */
export declare function generateTailwindConfigFile(theme: Theme): string;
/**
 * Generate PostCSS config for Tailwind
 */
export declare function generatePostCSSConfig(): string;
/**
 * Generate package.json scripts for Tailwind
 */
export declare function generatePackageScripts(): Record<string, string>;
//# sourceMappingURL=tailwind-css.d.ts.map