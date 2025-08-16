# Complete JSON Schema Documentation

## **Dynamic Detection System**

The Arc-it package automatically discovers themes, languages, and content styles from your JSON files. This means **zero hardcoding** - everything is automatically detected and available!

### **What Gets Detected Automatically:**

- **Themes**: All presets from your `theme.json` file
- **Languages**: All language keys from your `content.json` file  
- **Content Styles**: All styles from your `content.json` file
- **Light/Dark Variants**: Automatic detection of theme variants

### **How It Works:**

1. **Theme Detection**: Reads `theme.json` and discovers all available presets
2. **Language Detection**: Reads `content.json` and discovers all language keys
3. **Style Detection**: Reads `content.json` and discovers all content styles
4. **UI Generation**: Automatically generates the switcher UI based on detected options

For detailed information, see [Dynamic Detection Guide](DYNAMIC_DETECTION.md).

## Theme Configuration Structure

This document provides a complete reference for all JSON configurations used in Dynamic Theme Content.

## File Structure

```
public/
└── content/
    ├── theme.json          # Main theme configuration
    ├── content.json        # Content management
    └── presets/           # Theme preset collections
        ├── dark.json
        ├── light.json
        └── custom.json
```

## Main Theme Configuration (`theme.json`)

### **Basic Structure**
```json
{
  "colors": {},
  "fonts": {},
  "presets": {},
  "metadata": {},
  "options": {}
}
```

### **Complete Example**
```json
{
  "name": "Default Theme",
  "version": "1.0.0",
  "description": "Main application theme with light and dark variants",
  
  "colors": {
    "primary": "#0070f3",
    "primary-50": "#eff6ff",
    "primary-100": "#dbeafe",
    "primary-200": "#bfdbfe",
    "primary-300": "#93c5fd",
    "primary-400": "#60a5fa",
    "primary-500": "#3b82f6",
    "primary-600": "#2563eb",
    "primary-700": "#1d4ed8",
    "primary-800": "#1e40af",
    "primary-900": "#1e3a8a",
    
    "secondary": "#7928ca",
    "secondary-50": "#faf5ff",
    "secondary-100": "#f3e8ff",
    "secondary-200": "#e9d5ff",
    "secondary-300": "#d8b4fe",
    "secondary-400": "#c084fc",
    "secondary-500": "#a855f7",
    "secondary-600": "#9333ea",
    "secondary-700": "#7c3aed",
    "secondary-800": "#6b21a8",
    "secondary-900": "#581c87",
    
    "background": "#ffffff",
    "foreground": "#000000",
    "surface": "#f8fafc",
    "surface-foreground": "#0f172a",
    
    "accent": "#f81ce5",
    "accent-foreground": "#ffffff",
    
    "success": "#10b981",
    "success-foreground": "#ffffff",
    
    "warning": "#f59e0b",
    "warning-foreground": "#ffffff",
    
    "error": "#ef4444",
    "error-foreground": "#ffffff",
    
    "muted": "#6b7280",
    "muted-foreground": "#9ca3af",
    
    "border": "#e5e7eb",
    "input": "#ffffff",
    "ring": "#0070f3"
  },
  
  "fonts": {
    "body": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "heading": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace"
  },
  
  "presets": {
    "default": {
      "name": "Default Theme",
      "description": "Standard light theme with blue accent",
      "colors": {
        "primary": "#0070f3",
        "background": "#ffffff",
        "foreground": "#000000"
      }
    },
    
    "dark": {
      "name": "Dark Theme",
      "description": "Dark theme with blue accent",
      "colors": {
        "primary": "#3b82f6",
        "background": "#121212",
        "foreground": "#ffffff",
        "surface": "#1e1e1e",
        "surface-foreground": "#ffffff",
        "border": "#2e2e2e",
        "input": "#2e2e2e",
        "muted": "#404040",
        "muted-foreground": "#a0a0a0"
      }
    },
    
    "green": {
      "name": "Green Theme",
      "description": "Green accent theme",
      "colors": {
        "primary": "#00ff0d",
        "primary-50": "#f0fff0",
        "primary-100": "#dcfce7",
        "primary-200": "#bbf7d0",
        "primary-300": "#86efac",
        "primary-400": "#4ade80",
        "primary-500": "#22c55e",
        "primary-600": "#16a34a",
        "primary-700": "#15803d",
        "primary-800": "#166534",
        "primary-900": "#14532d"
      }
    },
    
    "green-light": {
      "name": "Green Light Theme",
      "description": "Light green theme variant",
      "colors": {
        "primary": "#00cc0a",
        "background": "#ffffff",
        "foreground": "#000000"
      }
    },
    
    "orange": {
      "name": "Orange Theme",
      "description": "Orange accent theme",
      "colors": {
        "primary": "#f59e0b",
        "primary-50": "#fffbeb",
        "primary-100": "#fef3c7",
        "primary-200": "#fde68a",
        "primary-300": "#fcd34d",
        "primary-400": "#fbbf24",
        "primary-500": "#f59e0b",
        "primary-600": "#d97706",
        "primary-700": "#b45309",
        "primary-800": "#92400e",
        "primary-900": "#78350f"
      }
    },
    
    "orange-light": {
      "name": "Orange Light Theme",
      "description": "Light orange theme variant",
      "colors": {
        "primary": "#d97706",
        "background": "#fffbeb",
        "foreground": "#78350f",
        "surface": "#fef3c7",
        "surface-foreground": "#92400e"
      }
    },
    
    "red": {
      "name": "Red Theme",
      "description": "Red accent theme",
      "colors": {
        "primary": "#ef4444",
        "primary-50": "#fef2f2",
        "primary-100": "#fee2e2",
        "primary-200": "#fecaca",
        "primary-300": "#fca5a5",
        "primary-400": "#f87171",
        "primary-500": "#ef4444",
        "primary-600": "#dc2626",
        "primary-700": "#b91c1c",
        "primary-800": "#991b1b",
        "primary-900": "#7f1d1d"
      }
    },
    
    "blue": {
      "name": "Blue Theme",
      "description": "Blue accent theme",
      "colors": {
        "primary": "#3b82f6",
        "primary-50": "#eff6ff",
        "primary-100": "#dbeafe",
        "primary-200": "#bfdbfe",
        "primary-300": "#93c5fd",
        "primary-400": "#60a5fa",
        "primary-500": "#3b82f6",
        "primary-600": "#2563eb",
        "primary-700": "#1d4ed8",
        "primary-800": "#1e40af",
        "primary-900": "#1e3a8a"
      }
    },
    
    "blue-light": {
      "name": "Blue Light Theme",
      "description": "Light blue theme variant",
      "colors": {
        "primary": "#60a5fa",
        "background": "#eff6ff",
        "foreground": "#1e3a8a",
        "surface": "#dbeafe",
        "surface-foreground": "#1e40af"
      }
    }
  },
  
  "metadata": {
    "author": "Arc-it Team",
    "license": "MIT",
    "repository": "https://github.com/AahrbitX/arc-it",
    "tags": ["modern", "accessible", "responsive"]
  },
  
  "options": {
    "enableAnimations": true,
    "enableTransitions": true,
    "defaultPreset": "default",
    "autoDetectDarkMode": true
  }
}
```

## Color System

### **Color Format Support**

Arc-it supports multiple color formats:

```json
{
  "colors": {
    "hex": "#0070f3",           // Hex colors (6-digit)
    "hex-short": "#f0f",        // Short hex (3-digit)
    "rgb": "rgb(0, 112, 243)", // RGB values
    "rgba": "rgba(0, 112, 243, 0.8)", // RGBA with alpha
    "hsl": "hsl(210, 100%, 48%)", // HSL values
    "hsla": "hsla(210, 100%, 48%, 0.8)", // HSLA with alpha
    "named": "blue"             // CSS named colors
  }
}
```

### **Color Scale System**

Use the 50-900 scale for consistent color variations:

```json
{
  "colors": {
    "primary": {
      "50": "#eff6ff",   // Lightest
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",  // Base color
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a"   // Darkest
    }
  }
}
```

### **Semantic Color Names**

Use semantic names for better maintainability:

```json
{
  "colors": {
    "primary": "#0070f3",      // Main brand color
    "secondary": "#7928ca",    // Secondary brand color
    "accent": "#f81ce5",       // Accent/highlight color
    
    "background": "#ffffff",   // Page background
    "foreground": "#000000",   // Main text color
    "surface": "#f8fafc",      // Card/surface background
    "surface-foreground": "#0f172a", // Surface text color
    
    "success": "#10b981",      // Success states
    "warning": "#f59e0b",      // Warning states
    "error": "#ef4444",        // Error states
    
    "muted": "#6b7280",        // Muted text
    "muted-foreground": "#9ca3af", // Muted text on colored backgrounds
    
    "border": "#e5e7eb",       // Borders and dividers
    "input": "#ffffff",        // Form input backgrounds
    "ring": "#0070f3"          // Focus ring color
  }
}
```

## Font System

### **Font Family Configuration**

```json
{
  "fonts": {
    "body": "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "heading": "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    "mono": "ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace",
    "serif": "Georgia, Cambria, 'Times New Roman', Times, serif"
  }
}
```

### **Font Weight Support**

```json
{
  "fonts": {
    "body": {
      "family": "system-ui, sans-serif",
      "weights": [400, 500, 600, 700],
      "default": 400
    },
    "heading": {
      "family": "Inter, sans-serif",
      "weights": [600, 700, 800],
      "default": 600
    }
  }
}
```

## Preset System

### **Preset Structure**

```json
{
  "presets": {
    "presetName": {
      "name": "Display Name",
      "description": "Description of the preset",
      "colors": {
        "primary": "#color",
        "background": "#color"
      },
      "fonts": {
        "body": "font-family",
        "heading": "font-family"
      },
      "metadata": {
        "category": "category",
        "tags": ["tag1", "tag2"],
        "icon": "icon-name"
      }
    }
  }
}
```

### **Light/Dark Variants**

Use the `-light` suffix for automatic light/dark detection:

```json
{
  "presets": {
    "green": {
      "name": "Green Theme",
      "description": "Dark green theme",
      "colors": {
        "primary": "#00ff0d",
        "background": "#000000",
        "foreground": "#ffffff"
      }
    },
    "green-light": {
      "name": "Green Light Theme",
      "description": "Light green theme",
      "colors": {
        "primary": "#00cc0a",
        "background": "#ffffff",
        "foreground": "#000000"
      }
    }
  }
}
```

### **Preset Inheritance**

Presets can inherit from base colors and fonts:

```json
{
  "colors": {
    "primary": "#0070f3",
    "background": "#ffffff"
  },
  "fonts": {
    "body": "system-ui, sans-serif"
  },
  "presets": {
    "blue": {
      "colors": {
        "primary": "#3b82f6"  // Override primary only
        // background and fonts inherited from base
      }
    }
  }
}
```

## Content Configuration (`content.json`)

### **Basic Structure**

```json
{
  "en": {
    "hero": {
      "title": "Welcome to Arc-it",
      "subtitle": "Dynamic theming made simple"
    },
    "features": {
      "title": "Features",
      "items": [
        "Dynamic themes",
        "Content management",
        "Multi-language support"
      ]
    }
  },
  "es": {
    "hero": {
      "title": "Bienvenido a Arc-it",
      "subtitle": "Tematización dinámica simplificada"
    }
  },
  "ar": {
    "language": "العربية",
    "direction": "rtl",
    "hero": {
      "title": "مرحباً",
      "subtitle": "ابدأ مع Arc-it"
    }
  },
  "styles": {
    "default": {
      "name": "Default Style",
      "description": "Standard layout for general use",
      "layout": "default",
      "sections": ["header", "main", "footer"]
    },
    "marketing": {
      "name": "Marketing Style",
      "description": "Sales-focused content layout",
      "layout": "marketing",
      "sections": ["hero", "features", "cta", "testimonials"]
    }
  }
}
```

### **Language Structure**

```json
{
  "en": {
    "language": "English",
    "direction": "ltr",
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started with Arc-it"
    }
  },
  "es": {
    "language": "Español",
    "direction": "ltr",
    "hero": {
      "title": "Bienvenido",
      "subtitle": "Comienza con Arc-it"
    }
  },
  "ar": {
    "language": "العربية",
    "direction": "rtl",
    "hero": {
      "title": "مرحباً",
      "subtitle": "ابدأ مع Arc-it"
    }
  }
}
```

### **Content Style Structure**

```json
{
  "styles": {
    "styleId": {
      "name": "Display Name",
      "description": "Description of the style",
      "layout": "layout-type",
      "sections": ["section1", "section2"],
      "metadata": {
        "category": "category",
        "icon": "icon-name",
        "tags": ["tag1", "tag2"],
        "priority": 1
      }
    }
  }
}
```

## Advanced Configuration

### **Theme Variants**

Create multiple variants of the same theme:

```json
{
  "presets": {
    "corporate": {
      "name": "Corporate Theme",
      "description": "Professional business theme",
      "colors": {
        "primary": "#1f2937",
        "secondary": "#6b7280"
      }
    },
    "corporate-light": {
      "name": "Corporate Light",
      "description": "Light corporate variant",
      "colors": {
        "primary": "#374151",
        "background": "#f9fafb"
      }
    },
    "corporate-dark": {
      "name": "Corporate Dark",
      "description": "Dark corporate variant",
      "colors": {
        "primary": "#f3f4f6",
        "background": "#111827"
      }
    }
  }
}
```

### **Conditional Colors**

Use conditional logic for responsive colors:

```json
{
  "presets": {
    "adaptive": {
      "colors": {
        "primary": {
          "light": "#0070f3",
          "dark": "#60a5fa"
        },
        "background": {
          "light": "#ffffff",
          "dark": "#121212"
        }
      }
    }
  }
}
```

### **Custom Properties**

Add custom properties for advanced use cases:

```json
{
  "presets": {
    "custom": {
      "colors": {
        "primary": "#0070f3"
      },
      "custom": {
        "borderRadius": "12px",
        "shadow": "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        "animation": "fadeIn 0.3s ease-in-out"
      }
    }
  }
}
```

## Best Practices

### **1. Color Naming**

- Use semantic names (primary, secondary, success, error)
- Follow a consistent naming convention
- Use the 50-900 scale for color variations
- Provide both light and dark variants

### **2. Font Management**

- Use system fonts for better performance
- Include fallback fonts for cross-platform compatibility
- Limit the number of custom fonts
- Use appropriate font weights

### **3. Preset Organization**

- Group related presets together
- Use descriptive names and descriptions
- Include metadata for better organization
- Provide light/dark variants for each theme

### **4. Content Structure**

- Use consistent section naming
- Provide translations for all content
- Include metadata for content styles
- Plan for scalability

### **5. Performance**

- Keep JSON files reasonably sized
- Use efficient color formats
- Minimize duplicate data
- Consider lazy loading for large themes

## Advanced Features

### **Dynamic Theme Generation**

```json
{
  "presets": {
    "dynamic": {
      "generator": "hsl",
      "baseHue": 210,
      "saturation": 100,
      "lightness": 50,
      "variations": 10
    }
  }
}
```

### **Theme Composition**

```json
{
  "presets": {
    "composed": {
      "extends": ["base", "accent"],
      "overrides": {
        "colors": {
          "primary": "#custom-color"
        }
      }
    }
  }
}
```

### **Responsive Themes**

```json
{
  "presets": {
    "responsive": {
      "breakpoints": {
        "sm": {
          "colors": {
            "primary": "#0070f3"
          }
        },
        "md": {
          "colors": {
            "primary": "#3b82f6"
          }
        },
        "lg": {
          "colors": {
            "primary": "#60a5fa"
          }
        }
      }
    }
  }
}
```

## Validation

### **Required Fields**

- `colors`: At least one color definition
- `presets`: At least one preset
- `fonts`: At least one font family

### **Optional Fields**

- `metadata`: Additional information
- `options`: Configuration options
- `custom`: Custom properties

### **Validation Rules**

- Colors must be valid CSS color values
- Font families must be valid CSS font-family values
- Preset names must be unique
- Language codes must be valid ISO 639-1 codes

## Summary

The JSON schema for Arc-it provides:

- **Flexible Theme System**: Support for multiple color formats and scales
- **Font Management**: System fonts and custom font support
- **Preset System**: Theme variants with inheritance
- **Content Management**: Multi-language and content style support
- **Advanced Features**: Conditional colors, responsive themes, and custom properties
- **Validation**: Built-in validation and error handling

This schema allows you to create comprehensive, maintainable theme configurations that work seamlessly with the Arc-it system.
