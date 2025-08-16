/**
 * 🔒 Security Utilities for Dynamic Theme Content
 *
 * This module provides comprehensive security measures including:
 * - Input validation and sanitization
 * - XSS prevention
 * - CSS injection protection
 * - Safe JSON parsing
 */
/**
 * Validates and sanitizes color values
 */
export declare function validateColor(color: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
};
/**
 * Validates and sanitizes font values
 */
export declare function validateFont(font: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
};
/**
 * Validates and sanitizes numeric values
 */
export declare function validateNumeric(value: string): {
    isValid: boolean;
    sanitized?: string;
    error?: string;
};
/**
 * Escapes HTML to prevent XSS
 */
export declare function escapeHtml(text: string): string;
/**
 * Sanitizes CSS to prevent injection
 */
export declare function sanitizeCSS(css: string): string;
/**
 * Safely parses JSON with security checks
 */
export declare function safeJSONParse(jsonString: string, maxDepth?: number): any;
/**
 * Validates entire theme object
 */
export declare function validateTheme(theme: any): {
    isValid: boolean;
    errors: string[];
    sanitized?: any;
};
/**
 * Security event logger
 */
export declare class SecurityLogger {
    private static instance;
    private events;
    private constructor();
    static getInstance(): SecurityLogger;
    logSecurityEvent(type: string, message: string, data?: any): void;
    getSecurityEvents(): Array<{
        timestamp: Date;
        type: string;
        message: string;
        data?: any;
    }>;
    clearEvents(): void;
}
/**
 * Wraps a function with security validation
 */
export declare function withSecurityValidation<T extends (...args: any[]) => any>(fn: T, validator: (args: Parameters<T>) => {
    isValid: boolean;
    error?: string;
}): T;
/**
 * Creates a secure theme loader
 */
export declare function createSecureThemeLoader(): {
    loadTheme: (themeData: string) => any;
};
/**
 * Security checklist for the library
 */
export declare const SECURITY_CHECKLIST: {
    features: string[];
    protections: string[];
};
declare const _default: {
    validateColor: typeof validateColor;
    validateFont: typeof validateFont;
    validateNumeric: typeof validateNumeric;
    escapeHtml: typeof escapeHtml;
    sanitizeCSS: typeof sanitizeCSS;
    safeJSONParse: typeof safeJSONParse;
    validateTheme: typeof validateTheme;
    SecurityLogger: typeof SecurityLogger;
    withSecurityValidation: typeof withSecurityValidation;
    createSecureThemeLoader: typeof createSecureThemeLoader;
    SECURITY_CHECKLIST: {
        features: string[];
        protections: string[];
    };
};
export default _default;
//# sourceMappingURL=security.d.ts.map