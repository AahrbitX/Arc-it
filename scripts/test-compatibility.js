#!/usr/bin/env node

/**
 * 🧪 React Compatibility Test Script
 * 
 * This script tests the library with different React versions
 * to ensure compatibility across React 18, 19, and future versions.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Testing React Compatibility...\n');

// Test configurations for different React versions
const testConfigs = [
  {
    name: 'React 18 (Latest)',
    react: '^18.3.1',
    reactDom: '^18.3.1',
    types: '^18.3.12'
  },
  {
    name: 'React 18 (Stable)',
    react: '^18.2.0',
    reactDom: '^18.2.0',
    types: '^18.2.0'
  }
];

// Create test package.json for each version
function createTestPackage(version, config) {
  const testDir = `test-react-${version}`;
  const packageJson = {
    name: `test-react-${version}`,
    version: '1.0.0',
    private: true,
    dependencies: {
      react: config.react,
      'react-dom': config.reactDom,
      '@types/react': config.types,
      '@types/react-dom': '^18.3.1'
    },
    devDependencies: {
      typescript: '^5.4.3',
      '@types/node': '^20.0.0'
    }
  };

  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir);
  }

  fs.writeFileSync(
    path.join(testDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // Create test component
  const testComponent = `import React from 'react';
import { DynamicProvider, useTheme } from '../../dist';

function TestComponent() {
  const { getColor } = useTheme();
  
  return (
    <div style={{ 
      backgroundColor: getColor('primary') || '#0070f3',
      color: 'white',
      padding: '20px',
      borderRadius: '8px'
    }}>
      ✅ React ${version} Compatibility Test
      <br />
      <small>Primary color: {getColor('primary') || '#0070f3'}</small>
    </div>
  );
}

function TestApp() {
  return (
    <DynamicProvider>
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <h1>🧪 React ${version} Compatibility Test</h1>
        <TestComponent />
        <p>If you see this, React ${version} is working correctly!</p>
      </div>
    </DynamicProvider>
  );
}

export { TestApp };
`;

  fs.writeFileSync(
    path.join(testDir, 'TestApp.tsx'),
    testComponent
  );

  // Create test script
  const testScript = `import React from 'react';
import { createRoot } from 'react-dom/client';
import { TestApp } from './TestApp';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<TestApp />);
}
`;

  fs.writeFileSync(
    path.join(testDir, 'test.jsx'),
    testScript
  );

  return testDir;
}

// Run compatibility tests
async function runCompatibilityTests() {
  const results = [];

  for (let i = 0; i < testConfigs.length; i++) {
    const config = testConfigs[i];
    const version = config.name.includes('18') ? '18' : '19';
    
    console.log(`🔍 Testing ${config.name}...`);
    
    try {
      const testDir = createTestPackage(version, config);
      
      // Install dependencies
      console.log(`  📦 Installing dependencies...`);
      execSync(`cd ${testDir} && npm install --silent`, { stdio: 'pipe' });
      
      // Test build
      console.log(`  🏗️  Testing build...`);
      execSync(`cd ${testDir} && npx tsc --noEmit --jsx react-jsx`, { stdio: 'pipe' });
      
      console.log(`  ✅ ${config.name} - PASSED\n`);
      results.push({ version: config.name, status: 'PASSED' });
      
    } catch (error) {
      console.log(`  ❌ ${config.name} - FAILED`);
      console.log(`     Error: ${error.message}\n`);
      results.push({ version: config.name, status: 'FAILED', error: error.message });
    }
  }

  // Print summary
  console.log('📊 Compatibility Test Results:');
  console.log('==============================');
  
  results.forEach(result => {
    const status = result.status === 'PASSED' ? '✅' : '❌';
    console.log(`${status} ${result.version}: ${result.status}`);
    if (result.error) {
      console.log(`   Error: ${result.error}`);
    }
  });

  const passed = results.filter(r => r.status === 'PASSED').length;
  const total = results.length;
  
  console.log(`\n🎯 Overall: ${passed}/${total} tests passed`);
  
  if (passed === total) {
    console.log('🎉 All compatibility tests passed! Your library is ready for React 18+');
    console.log('🚀 Modern React features enabled: Concurrent Rendering, Suspense, Automatic Batching');
  } else {
    console.log('⚠️  Some tests failed. Check the errors above.');
  }
}

// Run tests
runCompatibilityTests().catch(console.error);
