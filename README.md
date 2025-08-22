# Arc-it.js 🎨

**Modern React theming library with CSS variables and Tailwind CSS support**

[![npm version](https://badge.fury.io/js/%40aahrbitx%2Farc-it.svg)](https://www.npmjs.com/package/@aahrbitx/arc-it)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18%2B-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4%2B-blue.svg)](https://www.typescriptlang.org/)

## 🚀 Quick Start

### Installation

```bash
npm install @aahrbitx/arc-it
```

**⚠️ Important**: This package requires React 18+ and lucide-react as peer dependencies.

### Required Peer Dependencies

```bash
npm install react react-dom lucide-react
```

### Basic Usage

```tsx
import { DynamicProvider, DynamicSwitcher } from '@aahrbitx/arc-it';

function App() {
  return (
    <DynamicProvider>
      <div>
        <h1>My App</h1>
        <DynamicSwitcher />
      </div>
    </DynamicProvider>
  );
}
```

## 🔧 Features

- **🎨 Dynamic Theme Detection**: Automatically discovers themes from JSON files
- **🌙 Dark/Light Mode**: Built-in theme switching with smooth transitions
- **🌍 Multi-language Support**: Dynamic content switching
- **🎯 Tailwind CSS Integration**: Seamless Tailwind support
- **⚡ React 18+ Ready**: Concurrent features and Suspense support
- **🔒 Security Focused**: Built-in security validation
- **📱 Mobile Optimized**: Responsive design components

## 📦 Package Information

- **Size**: ~20KB gzipped
- **Dependencies**: 0 runtime dependencies (peer dependencies only)
- **Security**: Regular security audits and vulnerability scanning
- **Performance**: Optimized for modern React rendering

## 🛡️ Security & Performance

### Why Choose Arc-it?

1. **Zero Runtime Dependencies**: Only peer dependencies, no bundled packages
2. **Security Audited**: Regular npm audit and security testing
3. **Fast Installation**: Minimal package size, no unnecessary dependencies
4. **Modern Architecture**: Built for React 18+ concurrent features

### Security Features

- Input sanitization
- XSS protection
- Content validation
- Secure theme switching

## 📚 Documentation

- [Quick Start Guide](QUICK_START.md) - Get up and running in minutes
- [Content Styles](docs/CONTENT_STYLES.md) - Customize your content
- [Theme Integration](docs/REACT_COMPATIBILITY.md) - React compatibility details
- [Security Guide](docs/SECURITY.md) - Security best practices
- [Error Troubleshooting](docs/ERROR_TROUBLESHOOTING.md) - Common issues and solutions

## 🚨 Troubleshooting

### Installation Issues

If you encounter high severity vulnerabilities or slow installation:

1. **Clear npm cache**: `npm cache clean --force`
2. **Use latest version**: `npm install @aahrbitx/arc-it@latest`
3. **Check peer dependencies**: Ensure React 18+ and lucide-react are installed

### Common Issues

- **High severity vulnerabilities**: Usually caused by outdated peer dependencies
- **Slow installation**: Ensure you're using the latest package version
- **Build errors**: Check React version compatibility (18+ required)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@aahrbitx/arc-it)
- [GitHub Repository](https://github.com/AahrbitX/arc-it)
- [Documentation](https://github.com/AahrbitX/arc-it#readme)
- [Issues & Bug Reports](https://github.com/AahrbitX/arc-it/issues)

---

**Built with ❤️ by AahrbitX**
