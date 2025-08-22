# Installation Troubleshooting Guide 🚨

This guide helps resolve common installation issues with `@aahrbitx/arc-it`.

## 🚨 High Severity Vulnerabilities

### Problem
```bash
npm install @aahrbitx/arc-it
# Results in: 5 high severity vulnerabilities
```

### Root Cause
- **DevDependencies being published**: Outdated build tools are being included in the published package
- **Dependency conflicts**: Mismatched versions between your project and the package
- **npm cache issues**: Corrupted or outdated cache

### Solutions

#### **Immediate Fix (Recommended)**
```bash
# Clear npm cache
npm cache clean --force

# Remove existing installation
npm uninstall @aahrbitx/arc-it

# Install latest version
npm install @aahrbitx/arc-it@latest
```

#### **Alternative: Use Yarn**
```bash
# Install yarn if not available
npm install -g yarn

# Install package with yarn
yarn add @aahrbitx/arc-it
```

#### **Manual Dependency Management**
```bash
# Install with --legacy-peer-deps if you have React version conflicts
npm install @aahrbitx/arc-it --legacy-peer-deps

# Or force resolution
npm install @aahrbitx/arc-it --force
```

## 🐌 Slow Installation

### Problem
```bash
npm install @aahrbitx/arc-it
# Takes 10+ minutes and installs 487 packages
```

### Root Cause
- **DevDependencies included**: Build tools and development packages are being installed
- **Large dependency tree**: Unnecessary packages are being resolved
- **Network issues**: Slow npm registry or network connection

### Solutions

#### **Use Latest Version**
```bash
# Always use the latest version for best performance
npm install @aahrbitx/arc-it@latest
```

#### **Check Package Size**
```bash
# Verify package size before installation
npm view @aahrbitx/arc-it dist.size
npm view @aahrbitx/arc-it dist.unpackedSize
```

#### **Use Alternative Registries**
```bash
# Use faster npm mirrors
npm config set registry https://registry.npmjs.org/

# Or use yarn with faster mirrors
yarn config set registry https://registry.yarnpkg.com/
```

## ⚠️ Deprecation Warnings

### Common Warnings
```bash
npm warn deprecated node-domexception@1.0.0
npm warn deprecated inflight@1.6.6
npm warn deprecated glob@7.2.3
npm warn deprecated puppeteer@21.11.0
```

### Why These Happen
- **Outdated dependencies**: Some packages use deprecated versions
- **Build tool versions**: Development dependencies may be outdated
- **Security updates**: Newer versions fix security issues

### Solutions

#### **Update Your Environment**
```bash
# Update npm to latest version
npm install -g npm@latest

# Update Node.js to LTS version
# Download from: https://nodejs.org/
```

#### **Use Resolution in package.json**
```json
{
  "overrides": {
    "node-domexception": "^3.0.0",
    "inflight": "^2.0.0",
    "glob": "^10.0.0"
  }
}
```

## 🔒 Security Best Practices

### Before Installation
```bash
# Check for known vulnerabilities
npm audit

# Update npm to latest version
npm install -g npm@latest

# Clear cache
npm cache clean --force
```

### After Installation
```bash
# Run security audit
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes (use carefully)
npm audit fix --force
```

## 🛠️ Environment Setup

### Required Versions
- **Node.js**: 16.0.0 or higher
- **npm**: 8.0.0 or higher
- **React**: 18.0.0 or higher

### Check Your Environment
```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check React version in your project
npm list react
```

## 📦 Package Verification

### Verify Package Contents
```bash
# Check what's actually in the package
npm view @aahrbitx/arc-it dependencies
npm view @aahrbitx/arc-it devDependencies
npm view @aahrbitx/arc-it files
```

### Expected Package Structure
```
@aahrbitx/arc-it/
├── dist/           # Built JavaScript files
├── README.md       # Documentation
├── QUICK_START.md  # Quick start guide
└── package.json    # Package metadata
```

**❌ Should NOT include:**
- `src/` (source code)
- `node_modules/`
- Build tools
- Development dependencies

## 🔄 Reinstallation Steps

### Complete Clean Reinstall
```bash
# 1. Remove package
npm uninstall @aahrbitx/arc-it

# 2. Clear cache
npm cache clean --force

# 3. Remove lock file (optional)
rm package-lock.json

# 4. Reinstall dependencies
npm install

# 5. Install arc-it
npm install @aahrbitx/arc-it@latest
```

### Alternative: Use Yarn
```bash
# 1. Remove package
yarn remove @aahrbitx/arc-it

# 2. Clear cache
yarn cache clean

# 3. Install with yarn
yarn add @aahrbitx/arc-it
```

## 🚀 Performance Optimization

### npm Configuration
```bash
# Set npm to use latest features
npm config set fund false
npm config set audit false

# Use faster registry
npm config set registry https://registry.npmjs.org/
```

### Yarn Configuration
```bash
# Use yarn for faster installations
yarn config set network-timeout 300000
yarn config set registry https://registry.yarnpkg.com/
```

## 📞 Getting Help

### If Problems Persist
1. **Check GitHub Issues**: [Arc-it Issues](https://github.com/AahrbitX/arc-it/issues)
2. **Create New Issue**: Include your error messages and environment details
3. **Check npm Status**: [npm Status Page](https://status.npmjs.org/)

### Required Information for Support
```bash
# Run these commands and include output
node --version
npm --version
npm list react
npm audit
npm view @aahrbitx/arc-it version
```

### Common Error Patterns
- **High severity vulnerabilities**: Usually fixed in latest versions
- **Slow installation**: Network or registry issues
- **Deprecation warnings**: Normal, doesn't affect functionality
- **Peer dependency conflicts**: Version mismatch issues

## ✅ Success Checklist

After successful installation, verify:

- [ ] Package installed without errors
- [ ] No high severity vulnerabilities
- [ ] Installation completed in reasonable time (< 2 minutes)
- [ ] Package size is reasonable (~20KB)
- [ ] All peer dependencies are satisfied
- [ ] No critical warnings in console

## 🔧 Advanced Troubleshooting

### Network Issues
```bash
# Test npm connectivity
npm ping

# Check registry response time
time npm view @aahrbitx/arc-it
```

### Dependency Resolution
```bash
# Check dependency tree
npm ls @aahrbitx/arc-it

# See what's being installed
npm install @aahrbitx/arc-it --dry-run
```

### Build Issues
```bash
# Check if package builds correctly
npm run build

# Verify TypeScript compilation
npx tsc --noEmit
```

---

**Need more help?** Open an issue on [GitHub](https://github.com/AahrbitX/arc-it/issues) with your specific error details.
