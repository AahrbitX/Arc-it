# Installation Troubleshooting Guide

## Common Installation Issues and Solutions

This guide helps resolve common issues when installing and using Arc-it 1.1.0 with Smart Content Loading features.

---

## Package Installation Issues

### High Severity Vulnerabilities

**Problem**: `npm audit` shows high severity vulnerabilities during installation.

**Cause**: Previous versions included devDependencies in the published package.

**Solution**: 
1. Update to Arc-it 1.1.0 or later
2. Run `npm audit fix` to resolve remaining issues
3. The package now properly externalizes build tools

**Verification**:
```bash
npm install @aahrbitx/arc-it@1.1.0
npm audit
```

### Slow Installation (487+ packages)

**Problem**: Installation takes a very long time and installs many unnecessary packages.

**Cause**: Previous versions bundled build tools and dependencies.

**Solution**: 
1. Use Arc-it 1.1.0+ which has optimized package size
2. Clear npm cache: `npm cache clean --force`
3. The package now only includes essential runtime files

**Expected Result**: Installation should complete in under 1 minute with ~10-15 packages.

### Deprecation Warnings

**Problem**: Warnings about deprecated packages like `node-domexception`, `inflight`, `glob`, `puppeteer`.

**Cause**: These are build-time dependencies that shouldn't be in the final package.

**Solution**: 
1. Update to Arc-it 1.1.0+
2. These warnings should no longer appear
3. The package now properly excludes build tools

---

## Runtime Issues

### Module Import Errors

**Problem**: `Module not found` or import errors when using the library.

**Solution**:
1. Ensure you have the required peer dependencies:
```bash
npm install react react-dom lucide-react
```

2. Check your import statements:
```tsx
// Correct imports
import { DynamicProvider, useTheme, useContent } from '@aahrbitx/arc-it';
import { createSmartContentLoader, useSmartContent } from '@aahrbitx/arc-it';
```

3. Verify your package.json has the correct version:
```json
{
  "dependencies": {
    "@aahrbitx/arc-it": "^1.1.0"
  }
}
```

### TypeScript Errors

**Problem**: TypeScript compilation errors or missing type definitions.

**Solution**:
1. Ensure you have TypeScript 5.4+ installed
2. Check that your tsconfig.json includes the library
3. The package includes full TypeScript definitions

**tsconfig.json example**:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  }
}
```

### Build Tool Conflicts

**Problem**: Conflicts with Rollup, Webpack, or other build tools.

**Solution**:
1. The package is built with Rollup but works with any bundler
2. Ensure your bundler can handle ES modules
3. Check for duplicate React installations

**Webpack configuration**:
```javascript
module.exports = {
  resolve: {
    alias: {
      'react': path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    }
  }
};
```

---

## Smart Content Loader Issues

### Integration Problems

**Problem**: Smart Content Loader not working with existing Arc-it system.

**Solution**:
1. Ensure `extendExisting: true` is set:
```tsx
const loader = createSmartContentLoader({
  extendExisting: true
});
```

2. Check that providers are properly wrapped:
```tsx
<DynamicProvider>
  <YourComponent />
</DynamicProvider>
```

3. Use the correct hook:
```tsx
const { loadContent } = useSmartContent();
```

### Performance Issues

**Problem**: No performance improvement or slower loading.

**Solution**:
1. Check network quality assessment:
```tsx
const { networkQuality } = useSmartContent();
console.log('Network quality:', networkQuality);
```

2. Verify cache configuration:
```tsx
const loader = createSmartContentLoader({
  performance: {
    cacheStrategy: 'aggressive',
    preloadStrategy: 'smart'
  }
});
```

3. Monitor cache hit rates:
```tsx
const stats = loader.getStats();
console.log('Cache hit rate:', stats.cacheStats.hitRate);
```

### Security False Positives

**Problem**: Legitimate users being blocked by security features.

**Solution**:
1. Adjust rate limiting thresholds:
```tsx
const loader = createSmartContentLoader({
  security: {
    rateLimiting: {
      maxRequests: 100,
      windowMs: 60000
    }
  }
});
```

2. Review bot detection settings:
```tsx
const loader = createSmartContentLoader({
  security: {
    antiScraping: {
      userAgentCheck: false,
      suspiciousPatternCheck: true
    }
  }
});
```

3. Enable debug mode for troubleshooting:
```tsx
const loader = createSmartContentLoader({
  debug: true,
  logLevel: 'verbose'
});
```

---

## Environment-Specific Issues

### Next.js Applications

**Problem**: Issues with server-side rendering or build process.

**Solution**:
1. Ensure proper import in Next.js:
```tsx
import dynamic from 'next/dynamic';

const DynamicProvider = dynamic(
  () => import('@aahrbitx/arc-it').then(mod => ({ default: mod.DynamicProvider })),
  { ssr: false }
);
```

2. Check Next.js configuration for module resolution

### Create React App

**Problem**: Build errors or module resolution issues.

**Solution**:
1. Ensure CRA version supports ES modules
2. Check for conflicting dependencies
3. Clear build cache: `npm run build -- --reset-cache`

### Vite Applications

**Problem**: Import or build issues with Vite.

**Solution**:
1. Vite should work out of the box with ES modules
2. Check vite.config.js for any module resolution settings
3. Ensure proper import statements

---

## Version Compatibility

### React Version Requirements

**Minimum**: React 18.0.0
**Recommended**: React 18.2.0+

**Check your React version**:
```bash
npm list react
```

**Update React if needed**:
```bash
npm install react@^18.2.0 react-dom@^18.2.0
```

### Node.js Version Requirements

**Minimum**: Node.js 16.0.0
**Recommended**: Node.js 18.0.0+

**Check your Node.js version**:
```bash
node --version
```

### Package Manager Compatibility

**npm**: 7.0.0+
**yarn**: 1.22.0+
**pnpm**: 6.0.0+

---

## Debugging Steps

### 1. Check Package Installation

```bash
# Verify package is installed correctly
npm list @aahrbitx/arc-it

# Check package contents
npm explore @aahrbitx/arc-it -- ls

# Verify package.json
npm explore @aahrbitx/arc-it -- cat package.json
```

### 2. Check Dependencies

```bash
# Check for duplicate React installations
npm ls react

# Check peer dependencies
npm ls react react-dom lucide-react
```

### 3. Check Build Output

```bash
# Clear build cache
npm run build -- --reset-cache

# Check build output
ls -la dist/
```

### 4. Enable Debug Logging

```tsx
// Enable debug mode
const loader = createSmartContentLoader({
  debug: true,
  logLevel: 'verbose'
});

// Check console for detailed logs
```

---

## Getting Help

### 1. Check Documentation

- [README.md](../README.md) - Complete documentation
- [QUICK_START.md](../QUICK_START.md) - Quick start guide
- [SMART_CONTENT_INTEGRATION.md](./SMART_CONTENT_INTEGRATION.md) - Smart Content Loading guide

### 2. Check GitHub Issues

Visit the GitHub repository to search for similar issues or report new ones.

### 3. Check NPM Package

Verify you have the latest version:
```bash
npm view @aahrbitx/arc-it version
npm install @aahrbitx/arc-it@latest
```

### 4. Minimal Reproduction

Create a minimal example to reproduce the issue:
```tsx
import React from 'react';
import { DynamicProvider } from '@aahrbitx/arc-it';

function MinimalExample() {
  return (
    <DynamicProvider>
      <div>Hello World</div>
    </DynamicProvider>
  );
}
```

---

## Common Solutions Summary

| Issue | Solution |
|-------|----------|
| High severity vulnerabilities | Update to 1.1.0+, run `npm audit fix` |
| Slow installation | Update to 1.1.0+, clear npm cache |
| Deprecation warnings | Update to 1.1.0+ |
| Module not found | Install peer dependencies, check imports |
| TypeScript errors | Check TypeScript version, tsconfig.json |
| Build conflicts | Ensure single React installation |
| Integration issues | Set `extendExisting: true` |
| Performance problems | Check network quality, cache settings |
| Security blocks | Adjust thresholds, enable debug mode |

---

## Prevention

### 1. **Use Latest Version**
Always use the latest stable version of Arc-it.

### 2. **Check Peer Dependencies**
Ensure React, React-DOM, and lucide-react are properly installed.

### 3. **Follow Integration Guide**
Use the integration guide for Smart Content Loader setup.

### 4. **Test in Development**
Test thoroughly in development before deploying to production.

### 5. **Monitor Performance**
Use built-in performance tracking to monitor improvements.

---

This troubleshooting guide should resolve most common issues. If you continue to experience problems, please check the GitHub repository for additional support.
