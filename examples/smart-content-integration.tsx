import React from 'react';
import { 
  DynamicProvider, 
  DynamicSwitcher, 
  useTheme, 
  useContent,
  createSmartContentLoader, 
  useSmartContent 
} from '@aahrbitx/arc-it';

// ============================================================================
// 🚀 SMART CONTENT INTEGRATION - Extends Your Existing Arc-it System
// ============================================================================
// This example shows how SmartContentLoader integrates with your existing:
// ✅ ThemeProvider (themes, presets, dark/light mode)
// ✅ ContentProvider (languages, content styles)
// ✅ DynamicProvider (unified system)
// 
// The SmartContentLoader adds automatic:
// 🚀 SPEED: Network adaptation + smart caching
// 🔍 SEO: Automatic structured data + meta tags
// 🛡️ SECURITY: Anti-scraping + rate limiting

// ============================================================================
// 🎯 EXAMPLE 1: INTEGRATED WITH EXISTING SYSTEM
// ============================================================================

function SmartContentIntegrationExample() {
  return (
    <DynamicProvider
      themePath="/content/theme.json"
      contentSource="/content/content.json"
      initialThemePreset="green"
      initialLanguage="en"
      initialContentStyle="default"
    >
      <div>
        <header>
          <h1>🚀 Arc-it + Smart Content Loader</h1>
          <p>Your existing system + automatic Speed + SEO + Security!</p>
          <DynamicSwitcher />
        </header>
        
        <main>
          <ExistingSystemDemo />
          <SmartContentDemo />
          <CombinedUsageDemo />
        </main>
      </div>
    </DynamicProvider>
  );
}

// ============================================================================
// 🎯 EXAMPLE 2: YOUR EXISTING SYSTEM (Unchanged)
// ============================================================================

function ExistingSystemDemo() {
  const { setPreset, currentPreset, availablePresets, toggleDarkMode, isDarkMode } = useTheme();
  const { content, language, setLanguage, languages, currentStyle, setContentStyle, availableStyles } = useContent();

  return (
    <section>
      <h2>🎨 Your Existing Arc-it System (Unchanged)</h2>
      
      {/* Theme Management */}
      <div>
        <h3>Themes</h3>
        <p>Current: {currentPreset}</p>
        <div>
          {availablePresets.map(preset => (
            <button 
              key={preset} 
              onClick={() => setPreset(preset)}
              style={{ margin: '0.5rem', padding: '0.5rem 1rem' }}
            >
              {preset}
            </button>
          ))}
        </div>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
        </button>
      </div>

      {/* Language Management */}
      <div>
        <h3>Languages</h3>
        <p>Current: {language}</p>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>

      {/* Content Styles */}
      <div>
        <h3>Content Styles</h3>
        <p>Current: {currentStyle}</p>
        <select value={currentStyle || ''} onChange={(e) => setContentStyle(e.target.value)}>
          {availableStyles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>

      {/* Content Display */}
      <div>
        <h3>Content</h3>
        <h4>{content[language]?.hero?.title}</h4>
        <p>{content[language]?.hero?.subtitle}</p>
      </div>
    </section>
  );
}

// ============================================================================
// 🎯 EXAMPLE 3: SMART CONTENT LOADER (New Features)
// ============================================================================

function SmartContentDemo() {
  // Create SmartContentLoader that integrates with your existing system
  const loader = createSmartContentLoader({
    extendExisting: true,           // Extend your current system
    enhanceSEO: true,               // Add SEO to existing content
    security: {
      antiScraping: true,           // Block automated scraping
      rateLimiting: true,           // Prevent abuse
      contentObfuscation: false,    // Don't obfuscate public content
      watermarking: true            // Track usage
    }
  });

  // Use smart content loading
  const { content, loading, error, stats, seo, performance } = useSmartContent(
    loader,
    'existing',                     // Use existing ContentProvider
    undefined,                      // No auth needed for public content
    { useExisting: true }          // Integrate with existing system
  );

  if (loading) return <div>Loading with smart optimization...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section>
      <h2>🚀 Smart Content Loader (New Features)</h2>
      
      {/* Smart Content */}
      <div>
        <h3>Enhanced Content</h3>
        <h4>{content?.hero?.title}</h4>
        <p>{content?.hero?.subtitle}</p>
        
        {/* Automatic SEO data */}
        <div>
          <h4>🔍 Automatic SEO Enhancement</h4>
          <p>Structured Data: {Object.keys(seo.structuredData).length} properties</p>
          <p>Meta Tags: {Object.keys(seo.metaTags).length} tags</p>
          <p>Open Graph: {Object.keys(seo.openGraph).length} properties</p>
        </div>
      </div>

      {/* Performance Metrics */}
      <div>
        <h3>📊 Performance Metrics</h3>
        <p>Load time: {stats.loadTime}ms</p>
        <p>Network quality: {stats.networkQuality}</p>
        <p>Cache status: {stats.cacheStatus}</p>
        <p>Security level: {stats.securityLevel}</p>
        <p>SEO optimized: {stats.seoOptimized ? 'Yes' : 'No'}</p>
      </div>

      {/* System Stats */}
      <div>
        <h3>🔧 System Statistics</h3>
        <p>Total requests: {performance.totalRequests}</p>
        <p>Compression ratio: {performance.compressionRatio}</p>
        <p>Cache hit rate: {performance.cacheHitRate}</p>
        <p>Integration status: {loader.isIntegrated() ? 'Connected' : 'Standalone'}</p>
      </div>
    </section>
  );
}

// ============================================================================
// 🎯 EXAMPLE 4: COMBINED USAGE (Best of Both Worlds)
// ============================================================================

function CombinedUsageDemo() {
  const { currentPreset, isDarkMode } = useTheme();
  const { language, currentStyle } = useContent();
  
  // Create SmartContentLoader for additional features
  const loader = createSmartContentLoader({
    extendExisting: true,
    enhanceSEO: true,
    security: {
      antiScraping: true,
      rateLimiting: true,
      watermarking: true
    }
  });

  // Load additional secure content
  const { content: secureContent, loading, error } = useSmartContent(
    loader,
    'private',
    'demo-auth-token',
    { prioritize: 'security' }
  );

  return (
    <section>
      <h2>🌟 Combined Usage (Best of Both Worlds)</h2>
      
      {/* Current System State */}
      <div>
        <h3>Current Arc-it State</h3>
        <p>Theme: {currentPreset}</p>
        <p>Mode: {isDarkMode ? 'Dark' : 'Light'}</p>
        <p>Language: {language}</p>
        <p>Style: {currentStyle}</p>
      </div>

      {/* Smart Content Features */}
      <div>
        <h3>Smart Content Features</h3>
        {loading && <p>Loading secure content...</p>}
        {error && <p>Error: {error}</p>}
        {secureContent && (
          <div>
            <h4>🔒 Secure Content Loaded</h4>
            <p>Content protected with anti-scraping and watermarking</p>
            <p>Security level: {loader.getStats().security.securityLevel}</p>
          </div>
        )}
      </div>

      {/* Integration Benefits */}
      <div>
        <h3>🎯 Integration Benefits</h3>
        <ul>
          <li>✅ Keep your existing theme system</li>
          <li>✅ Keep your existing content management</li>
          <li>✅ Add automatic speed optimization</li>
          <li>✅ Add automatic SEO enhancement</li>
          <li>✅ Add automatic security protection</li>
          <li>✅ Everything works together seamlessly</li>
        </ul>
      </div>
    </section>
  );
}

// ============================================================================
// 🎯 EXAMPLE 5: ADVANCED INTEGRATION (Enterprise Use)
// ============================================================================

function AdvancedIntegrationDemo() {
  const { theme } = useTheme();
  const { content } = useContent();

  // Create enterprise-grade SmartContentLoader
  const enterpriseLoader = createSmartContentLoader({
    extendExisting: true,
    enhanceSEO: true,
    autoOptimize: true,
    networkOptimization: true,
    security: {
      antiScraping: true,
      rateLimiting: true,
      contentObfuscation: true,
      watermarking: true
    },
    performance: {
      cacheStrategy: 'aggressive',
      preloadStrategy: 'smart',
      compressionLevel: 'high'
    }
  });

  // Load enterprise content
  const { content: enterpriseContent, stats, seo } = useSmartContent(
    enterpriseLoader,
    'auto',
    'enterprise-token',
    {
      userRole: 'admin',
      prioritize: 'security'
    }
  );

  return (
    <section>
      <h2>🏢 Advanced Integration (Enterprise)</h2>
      
      {/* Enterprise Features */}
      <div>
        <h3>Enterprise Features</h3>
        <p>Network optimization: Active</p>
        <p>Security level: {stats?.securityLevel}</p>
        <p>SEO enhancement: {stats?.seoOptimized ? 'Active' : 'Inactive'}</p>
        <p>Cache strategy: Aggressive</p>
      </div>

      {/* System Integration */}
      <div>
        <h3>System Integration Status</h3>
        <p>Theme provider: Connected</p>
        <p>Content provider: Connected</p>
        <p>Smart loader: Active</p>
        <p>Integration level: Full</p>
      </div>

      {/* Performance Monitoring */}
      <div>
        <h3>Performance Monitoring</h3>
        <p>Load time: {stats?.loadTime}ms</p>
        <p>Network quality: {stats?.networkQuality}</p>
        <p>Cache status: {stats?.cacheStatus}</p>
      </div>
    </section>
  );
}

// ============================================================================
// 🎯 MAIN APP - Show All Integration Examples
// ============================================================================

export default function SmartContentIntegrationApp() {
  return (
    <div>
      <h1>🚀 Arc-it + Smart Content Loader Integration</h1>
      <p>Your existing system enhanced with automatic Speed + SEO + Security!</p>
      
      <hr />
      <h2>1. Your Existing System (Unchanged)</h2>
      <ExistingSystemDemo />
      
      <hr />
      <h2>2. Smart Content Loader (New Features)</h2>
      <SmartContentDemo />
      
      <hr />
      <h2>3. Combined Usage (Best of Both Worlds)</h2>
      <CombinedUsageDemo />
      
      <hr />
      <h2>4. Advanced Integration (Enterprise)</h2>
      <AdvancedIntegrationDemo />
      
      <hr />
      <h2>🎯 Key Benefits of Integration</h2>
      <ul>
        <li><strong>🔄 No Breaking Changes:</strong> Your existing code works exactly the same</li>
        <li><strong>🚀 Enhanced Performance:</strong> Automatic network optimization and caching</li>
        <li><strong>🔍 Better SEO:</strong> Automatic structured data and meta tags</li>
        <li><strong>🛡️ Enhanced Security:</strong> Anti-scraping and rate limiting</li>
        <li><strong>🎨 Keep Your Themes:</strong> All your existing theme presets work</li>
        <li><strong>🌍 Keep Your Languages:</strong> All your existing language support works</li>
        <li><strong>🎯 Keep Your Styles:</strong> All your existing content styles work</li>
      </ul>
      
      <h2>💡 How It Works</h2>
      <ol>
        <li><strong>Install:</strong> Your existing Arc-it system continues to work</li>
        <li><strong>Add Smart Features:</strong> Import and use SmartContentLoader for additional features</li>
        <li><strong>Integrate:</strong> Connect it with your existing providers</li>
        <li><strong>Enjoy:</strong> Get Speed + SEO + Security automatically</li>
      </ol>
    </div>
  );
}
