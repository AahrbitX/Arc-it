# Error Troubleshooting Guide

## **Common Issues & Solutions**

This guide helps you resolve common errors when using Arc-it.js in your projects.

---

## **Next.js App Router Compatibility Issues**

### **Error: React Hooks in Server Components**

**Error Message:**
```
You're importing a component that needs `createContext`. This React hook only works in a client component. 
To fix, mark the file (or its parent) with the `"use client"` directive.
```

**Root Cause:**
- Next.js App Router renders components on the server by default
- React hooks (`useState`, `useEffect`, `useContext`) can only run in the browser
- Arc-it.js uses React Context and hooks for theming functionality

**Solutions:**

#### **Option 1: Add "use client" Directive (Recommended)**
```tsx
"use client";

import { ThemeProvider } from 'arc-it';

export default function HomeSection() {
  return (
    <ThemeProvider>
      {/* Your themed content */}
    </ThemeProvider>
  );
}
```

#### **Option 2: Client Component Wrapper**
```tsx
// components/Arc-itWrapper.tsx
"use client";

import { ThemeProvider } from 'arc-it';

export function Arc-itWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
```

```tsx
// HomeSection.tsx (server component)
import { Arc-itWrapper } from './Arc-itWrapper';

export default function HomeSection() {
  return (
    <Arc-itWrapper>
      {/* Your themed content */}
    </Arc-itWrapper>
  );
}
```

#### **Option 3: Dynamic Import with Suspense**
```tsx
import dynamic from 'next/dynamic';

const Arc-itProvider = dynamic(
  () => import('arc-it').then(mod => ({ default: mod.ThemeProvider })),
  { ssr: false }
);

export default function HomeSection() {
  return (
    <Arc-itProvider>
      {/* Your themed content */}
    </Arc-itProvider>
  );
}
```

---

## **Build & Import Errors**

### **Error: Module Resolution Issues**

**Error Message:**
```
Module not found: Can't resolve 'arc-it'
```

**Solutions:**

1. **Check Installation:**
   ```bash
   npm install arc-it
   # or
   yarn add arc-it
   # or
   bun add arc-it
   ```

2. **Verify Package Name:**
   - Ensure you're using the correct package name: `arc-it`
   - Check for typos in import statements

3. **Clear Cache:**
   ```bash
   # Remove node_modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   
   # Or clear npm cache
   npm cache clean --force
   ```

4. **Check Node Version:**
   - Arc-it requires Node.js 16.0.0 or higher
   - Verify with: `node --version`

---

## **TypeScript & Type Errors**

### **Error: Type Mismatches**

**Error Message:**
```
Type 'React.ReactNode' is not assignable to type 'import(".../node_modules/@types/react/index").ReactNode'
```

**Root Cause:**
- Different React versions between packages
- TypeScript type conflicts
- Incompatible type definitions

**Solutions:**

1. **Update React Versions:**
   ```bash
   npm update react react-dom
   npm update @types/react @types/react-dom
   ```

2. **Check React Version Compatibility:**
   - Arc-it requires React 18.0.0 or higher
   - Ensure all packages use compatible React versions

3. **Type Assertion (Quick Fix):**
   ```tsx
   {children as any}
   ```

4. **Verify Package.json:**
   ```json
   {
     "dependencies": {
       "react": "^18.0.0",
       "react-dom": "^18.0.0"
     },
     "devDependencies": {
       "@types/react": "^18.0.0",
       "@types/react-dom": "^18.0.0"
     }
   }
   ```

---

## **Runtime Errors**

### **Error: Context Provider Missing**

**Error Message:**
```
useTheme must be used within a ThemeProvider
```

**Root Cause:**
- Component is trying to use theme hooks outside of a provider
- Provider component is not wrapping the component tree

**Solutions:**

1. **Wrap Your App:**
   ```tsx
   import { DynamicProvider } from 'arc-it';
   
   function App() {
     return (
       <DynamicProvider>
         <YourApp />
       </DynamicProvider>
     );
   }
   ```

2. **Check Provider Hierarchy:**
   - Ensure all components using theme hooks are children of the provider
   - Verify the provider is imported and used correctly

3. **Verify Import Path:**
   ```tsx
   // Correct
   import { DynamicProvider } from 'arc-it';
   
   // Wrong
   import { DynamicProvider } from './arc-it';
   ```

---

## **Performance Issues**

### **Problem: Slow Theme Switching**

**Symptoms:**
- Theme changes cause lag or stuttering
- Components re-render unnecessarily
- Poor user experience during theme transitions

**Solutions:**

1. **Use React.memo for Components:**
   ```tsx
   const ThemedButton = React.memo(({ children, variant }) => {
     const { getColor } = useTheme();
     return (
       <button style={{ backgroundColor: getColor(variant) }}>
         {children}
       </button>
     );
   });
   ```

2. **Debounce Theme Updates:**
   ```tsx
   import { debounce } from 'lodash';
   
   const debouncedSetTheme = debounce((theme) => {
     setTheme(theme);
   }, 100);
   ```

3. **Use CSS Transitions:**
   ```css
   * {
     transition: background-color 0.2s ease, color 0.2s ease;
   }
   ```

4. **Optimize Hook Usage:**
   - Only call theme hooks when necessary
   - Avoid calling hooks in render loops
   - Use useMemo for expensive calculations

---

## **Configuration Issues**

### **Error: Theme File Not Found**

**Error Message:**
```
Failed to load theme file: /content/theme.json
```

**Root Cause:**
- Theme file path is incorrect
- File doesn't exist at specified location
- File permissions or access issues

**Solutions:**

1. **Verify File Path:**
   - Ensure theme file exists at `/public/content/theme.json`
   - Check for typos in the path
   - Verify file permissions

2. **Check File Structure:**
   ```json
   {
     "colors": {
       "primary": "#0070f3",
       "background": "#ffffff"
     },
     "presets": {
       "default": {
         "colors": {
           "primary": "#0070f3"
         }
       }
     }
   }
   ```

3. **Use Absolute Paths:**
   ```tsx
   <DynamicProvider themePath="/content/theme.json">
     {children}
   </DynamicProvider>
   ```

4. **Check Network Tab:**
   - Open browser DevTools
   - Check Network tab for failed requests
   - Verify file is accessible via HTTP

---

## **Debugging Tips**

### **1. Enable Console Logging**
```tsx
import { useTheme } from 'arc-it';

function DebugComponent() {
  const theme = useTheme();
  
  console.log('Current theme:', theme);
  console.log('Available presets:', theme.availablePresets);
  console.log('Is dark mode:', theme.isDarkMode);
  
  return <div>Debug info in console</div>;
}
```

### **2. Check React DevTools**
- Install React Developer Tools browser extension
- Check if context providers are properly mounted
- Verify component hierarchy

### **3. Verify JSON Files**
- Check JSON syntax with online validators
- Ensure files are properly formatted
- Verify file encoding (UTF-8)

### **4. Test in Isolation**
- Create a minimal test case
- Remove other dependencies temporarily
- Test with basic theme configuration

---

## **Common Solutions Summary**

| Error | Quick Fix | Long-term Solution |
|-------|-----------|-------------------|
| "use client" required | Add `"use client"` directive | Create client wrapper component |
| Module not found | `npm install arc-it` | Verify package installation |
| Context provider missing | Wrap app in provider | Check component hierarchy |
| Type mismatches | Cast to `any` | Update React versions |
| Theme file not found | Check file path | Verify file structure and permissions |
| Performance issues | Use CSS transitions | Optimize component rendering |

---

## **Getting Help**

If you're still experiencing issues:

1. **Check the Examples:**
   - Review `examples/` directory for working implementations
   - Compare with your setup

2. **Review Documentation:**
   - Check main README.md for API reference
   - Review specific feature guides

3. **Open an Issue:**
   - Provide error message and stack trace
   - Include code snippet and configuration
   - Specify React and framework versions
   - Describe steps to reproduce

4. **Community Support:**
   - Check GitHub discussions
   - Review existing issues for similar problems

---

## **Prevention Tips**

1. **Use TypeScript** for better error detection
2. **Follow the examples** in the documentation
3. **Test incrementally** - add features one at a time
4. **Keep dependencies updated** to latest compatible versions
5. **Use the recommended setup** with DynamicProvider

Remember: Most issues can be resolved by following the setup guide and ensuring proper provider hierarchy!
