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
// SMART CONTENT INTEGRATION - Extends Your Existing Arc-it System
// ============================================================================
// This example shows how SmartContentLoader integrates with your existing:
// - ThemeProvider (themes, presets, dark/light mode)
// - ContentProvider (languages, content styles)
// - DynamicProvider (unified system)
// 
// The SmartContentLoader adds automatic:
// - SPEED: Network adaptation + smart caching
// - SEO: Automatic structured data + meta tags
// - SECURITY: Anti-scraping + rate limiting

// ============================================================================
// EXAMPLE 1: INTEGRATED WITH EXISTING SYSTEM
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
          <h1>Arc-it + Smart Content Loader</h1>
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
// EXAMPLE 2: YOUR EXISTING SYSTEM (UNCHANGED)
// ============================================================================

function ExistingSystemDemo() {
  const { currentPreset, setPreset, availablePresets } = useTheme();
  const { content, language, setLanguage, currentContentStyle } = useContent();

  return (
    <div style={{ border: '2px solid #ccc', padding: '20px', margin: '20px 0' }}>
      <h2>1. Your Existing System (Unchanged)</h2>
      <p>All your current Arc-it functionality works exactly the same:</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Theme Management</h3>
        <p>Current Preset: {currentPreset}</p>
        <p>Available Presets: {availablePresets.join(', ')}</p>
        <button onClick={() => setPreset('blue')}>Switch to Blue Theme</button>
        <button onClick={() => setPreset('green')}>Switch to Green Theme</button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Content Management</h3>
        <p>Current Language: {language}</p>
        <p>Current Style: {currentContentStyle}</p>
        <button onClick={() => setLanguage('en')}>English</button>
        <button onClick={() => setLanguage('es')}>Spanish</button>
        <button onClick={() => setLanguage('fr')}>French</button>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Dynamic Content</h3>
        <p>Title: {content[language]?.title || 'Loading...'}</p>
        <p>Description: {content[language]?.description || 'Loading...'}</p>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 3: SMART CONTENT LOADER (NEW FEATURES)
// ============================================================================

function SmartContentDemo() {
  // Create a loader instance
  const loader = React.useMemo(() => createSmartContentLoader({
    extendExisting: true
  }), []);

  const { 
    content, 
    loading, 
    error, 
    response,
    stats,
    seo,
    performance
  } = useSmartContent(loader, 'public', undefined, { extendExisting: true });

  return (
    <div style={{ border: '2px solid #4CAF50', padding: '20px', margin: '20px 0' }}>
      <h2>2. Smart Content Loader (New Features)</h2>
      <p>New capabilities that work alongside your existing system:</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Network Intelligence</h3>
        <p>Network Quality: {stats?.networkQuality || 'N/A'}</p>
        <p>Security Level: {stats?.securityLevel || 'N/A'}</p>
        <p>Status: {loading ? 'Loading...' : 'Ready'}</p>
      </div>

      {content && (
        <div style={{ margin: '20px 0' }}>
          <h3>Loaded Content</h3>
          <pre style={{ background: '#f5f5f5', padding: '10px', overflow: 'auto' }}>
            {JSON.stringify(content, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div style={{ margin: '20px 0', color: 'red' }}>
          <h3>Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div style={{ margin: '20px 0' }}>
        <h3>SEO Enhancement</h3>
        <p>Structured Data: {seo?.structuredData ? 'Yes' : 'No'}</p>
        <p>Meta Tags: {seo?.metaTags ? 'Yes' : 'No'}</p>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h3>Performance Metrics</h3>
        <p>Cache Hit Rate: {performance?.cacheHitRate || 'N/A'}%</p>
        <p>Load Time: {stats?.loadTime || 'N/A'}ms</p>
        <p>Total Requests: {performance?.totalRequests || 'N/A'}</p>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 4: COMBINED USAGE (BEST OF BOTH WORLDS)
// ============================================================================

function CombinedUsageDemo() {
  const { currentPreset, setPreset } = useTheme();
  const { language, content } = useContent();
  
  // Create loader for combined usage
  const loader = React.useMemo(() => createSmartContentLoader({
    extendExisting: true
  }), []);

  const { 
    content: enhancedContent, 
    loading, 
    error,
    stats 
  } = useSmartContent(loader, 'existing', undefined, { 
    extendExisting: true,
    enhanceSEO: true,
    enhanceSecurity: true
  });

  return (
    <div style={{ border: '2px solid #2196F3', padding: '20px', margin: '20px 0' }}>
      <h2>3. Combined Usage (Best of Both Worlds)</h2>
      <p>Use both systems together for maximum benefit:</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Existing System + Smart Enhancement</h3>
        <p>Theme: {currentPreset}</p>
        <p>Language: {language}</p>
        <p>Content: {content[language]?.title || 'Loading...'}</p>
        <p>Status: {loading ? 'Enhancing...' : 'Ready'}</p>
      </div>

      {enhancedContent && (
        <div style={{ margin: '20px 0' }}>
          <h3>Enhanced Content</h3>
          <p>Original: {content[language]?.title}</p>
          <p>Enhanced: {enhancedContent.title}</p>
          <p>Security Level: {stats?.securityLevel || 'N/A'}</p>
        </div>
      )}

      {error && (
        <div style={{ margin: '20px 0', color: 'red' }}>
          <h3>Enhancement Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div style={{ margin: '20px 0' }}>
        <h3>Real-time Monitoring</h3>
        <p>Network: {stats?.networkQuality || 'N/A'}</p>
        <p>Security: {stats?.securityLevel || 'N/A'}</p>
        <p>Status: Both systems working together seamlessly</p>
      </div>
    </div>
  );
}

// ============================================================================
// EXAMPLE 5: ADVANCED INTEGRATION (ENTERPRISE)
// ============================================================================

function AdvancedIntegrationDemo() {
  // Create custom Smart Content Loader with advanced configuration
  const customLoader = React.useMemo(() => createSmartContentLoader({
    autoOptimize: true,
    networkOptimization: true,
    enhanceSEO: true,
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
    },
    extendExisting: true // Integrate with existing providers
  }), []);

  const { 
    content: enterpriseContent, 
    loading, 
    error,
    stats,
    seo,
    performance 
  } = useSmartContent(customLoader, 'private', 'enterprise-token', {
    extendExisting: true,
    enterpriseMode: true
  });

  return (
    <div style={{ border: '2px solid #FF9800', padding: '20px', margin: '20px 0' }}>
      <h2>4. Advanced Integration (Enterprise)</h2>
      <p>Enterprise-grade configuration with full control:</p>
      
      <div style={{ margin: '20px 0' }}>
        <h3>Enterprise Configuration</h3>
        <p>Network Optimization: Enabled</p>
        <p>SEO Enhancement: Enabled</p>
        <p>Security Protection: Maximum</p>
        <p>Performance Tuning: Aggressive</p>
        <p>Status: {loading ? 'Loading...' : 'Ready'}</p>
      </div>

      {enterpriseContent && (
        <div style={{ margin: '20px 0' }}>
          <h3>Enterprise Content Loaded</h3>
          <p>Content Type: {enterpriseContent.type || 'N/A'}</p>
          <p>Security Level: {stats?.securityLevel || 'N/A'}</p>
          <p>Performance Score: {performance?.cacheHitRate || 'N/A'}%</p>
        </div>
      )}

      {error && (
        <div style={{ margin: '20px 0', color: 'red' }}>
          <h3>Enterprise Error</h3>
          <p>{error}</p>
        </div>
      )}

      <div style={{ margin: '20px 0' }}>
        <h3>Advanced Metrics</h3>
        <p>Network Quality: {stats?.networkQuality || 'N/A'}</p>
        <p>Security Level: {stats?.securityLevel || 'N/A'}</p>
        <p>SEO Score: {seo?.structuredData ? 'Optimized' : 'N/A'}</p>
        <p>Cache Hit Rate: {performance?.cacheHitRate || 'N/A'}%</p>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN EXPORT - COMPLETE INTEGRATION EXAMPLE
// ============================================================================

export default function SmartContentIntegrationApp() {
  return (
    <div>
      <h1>Arc-it + Smart Content Loader Integration</h1>
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
      <h2>Key Benefits of Integration</h2>
      <ul>
        <li><strong>No Breaking Changes:</strong> Your existing code works exactly the same</li>
        <li><strong>Enhanced Performance:</strong> Automatic network optimization and caching</li>
        <li><strong>Better SEO:</strong> Automatic structured data and meta tags</li>
        <li><strong>Enhanced Security:</strong> Anti-scraping and rate limiting</li>
        <li><strong>Keep Your Themes:</strong> All your existing theme presets work</li>
        <li><strong>Keep Your Languages:</strong> All your existing language support works</li>
        <li><strong>Keep Your Styles:</strong> All your existing content styles work</li>
      </ul>
      
      <h2>How It Works</h2>
      <ol>
        <li><strong>Install:</strong> Your existing Arc-it system continues to work</li>
        <li><strong>Add Smart Features:</strong> Import and use SmartContentLoader for additional features</li>
        <li><strong>Integrate:</strong> Connect it with your existing providers</li>
        <li><strong>Enjoy:</strong> Get Speed + SEO + Security automatically</li>
      </ol>
    </div>
  );
}
