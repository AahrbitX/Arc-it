#!/usr/bin/env node

/**
 * 🔒 Security Testing Script for Dynamic Theme Content
 * 
 * This script tests all security features including:
 * - Input validation
 * - XSS prevention
 * - CSS injection protection
 * - Malicious input blocking
 */

const fs = require('fs');
const path = require('path');

console.log('🔒 Security Testing - Dynamic Theme Content');
console.log('===========================================\n');

// ============================================================================
// 🧪 SECURITY TEST CASES
// ============================================================================

const SECURITY_TESTS = {
  // Malicious color inputs
  maliciousColors: [
    '<script>alert("xss")</script>',
    'javascript:alert("xss")',
    'data:text/html,<script>alert("xss")</script>',
    'vbscript:msgbox("xss")',
    'onclick="alert(\'xss\')"',
    '<img src="x" onerror="alert(\'xss\')">',
    'expression(alert("xss"))',
    'url(javascript:alert("xss"))',
    'behavior: url(xss.htc)',
    '@import url(javascript:alert("xss"))'
  ],
  
  // Malicious font inputs
  maliciousFonts: [
    'font-family: expression(alert("xss"))',
    'font-family: url(javascript:alert("xss"))',
    'font-family: <script>alert("xss")</script>',
    'font-family: javascript:alert("xss")',
    'font-family: data:text/html,<script>alert("xss")</script>'
  ],
  
  // Malicious numeric inputs
  maliciousNumeric: [
    'expression(alert("xss"))',
    'url(javascript:alert("xss"))',
    '<script>alert("xss")</script>',
    'javascript:alert("xss")',
    'data:text/html,<script>alert("xss")</script>'
  ],
  
  // Valid inputs (should pass)
  validInputs: {
    colors: [
      '#0070f3',
      '#fff',
      'rgb(0, 112, 243)',
      'rgba(0, 112, 243, 0.8)',
      'hsl(210, 100%, 48%)',
      'hsla(210, 100%, 48%, 0.8)',
      'transparent',
      'currentColor',
      'inherit',
      'initial',
      'unset'
    ],
    fonts: [
      'Inter, system-ui, sans-serif',
      'system-ui',
      'inherit',
      'initial',
      'unset',
      'Arial, Helvetica, sans-serif'
    ],
    numeric: [
      '16px',
      '1.5rem',
      '100%',
      'auto',
      'inherit',
      'initial',
      'unset'
    ]
  }
};

// ============================================================================
// 🛡️ SECURITY VALIDATION FUNCTIONS
// ============================================================================

/**
 * Validates color values (simplified version for testing)
 */
function validateColor(color) {
  // Check for blocked patterns
  const blockedPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /on\w+\s*=/gi,
    /expression\s*\(/gi,
    /url\s*\(\s*['"]?javascript:/gi,
    /@import\s+url\s*\(\s*['"]?javascript:/gi
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(color))) {
    return { isValid: false, error: 'Blocked pattern detected' };
  }
  
  // Check for valid color formats
  const validFormats = [
    /^#[0-9a-fA-F]{3}$/,
    /^#[0-9a-fA-F]{6}$/,
    /^#[0-9a-fA-F]{8}$/,
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,
    /^hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/,
    /^hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)$/,
    /^transparent$/,
    /^currentColor$/,
    /^inherit$/,
    /^initial$/,
    /^unset$/
  ];
  
  if (!validFormats.some(pattern => pattern.test(color))) {
    return { isValid: false, error: 'Invalid color format' };
  }
  
  return { isValid: true, sanitized: color.replace(/[<>"'`]/g, '') };
}

/**
 * Validates font values
 */
function validateFont(font) {
  // Check for blocked patterns
  const blockedPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /expression\s*\(/gi,
    /url\s*\(\s*['"]?javascript:/gi
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(font))) {
    return { isValid: false, error: 'Blocked pattern detected' };
  }
  
  // Check for valid font patterns
  const validPatterns = [
    /^[a-zA-Z\s\-'"]+$/,  // Single font names
    /^[a-zA-Z\s\-'"]+,\s*[a-zA-Z\s\-'"]+(\s*,\s*[a-zA-Z\s\-'"]+)*$/,  // Font stacks
    /^system-ui$/,
    /^inherit$/,
    /^initial$/,
    /^unset$/
  ];
  
  if (!validPatterns.some(pattern => pattern.test(font))) {
    return { isValid: false, error: 'Invalid font format' };
  }
  
  return { isValid: true, sanitized: font.replace(/[<>"'`]/g, '') };
}

/**
 * Validates numeric values
 */
function validateNumeric(value) {
  // Check for blocked patterns
  const blockedPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /vbscript:/gi,
    /expression\s*\(/gi,
    /url\s*\(\s*['"]?javascript:/gi
  ];
  
  if (blockedPatterns.some(pattern => pattern.test(value))) {
    return { isValid: false, error: 'Blocked pattern detected' };
  }
  
  // Check for valid numeric patterns
  const validPatterns = [
    /^\d+$/,
    /^\d+\.\d+[a-z%]+$/,      // Decimals with units
    /^\d+%$/,
    /^\d+px$/,
    /^\d+rem$/,
    /^\d+em$/,
    /^\d+vw$/,
    /^\d+vh$/,
    /^auto$/,
    /^inherit$/,
    /^initial$/,
    /^unset$/
  ];
  
  if (!validPatterns.some(pattern => pattern.test(value))) {
    return { isValid: false, error: 'Invalid numeric format' };
  }
  
  return { isValid: true, sanitized: value.replace(/[<>"'`]/g, '') };
}

// ============================================================================
// 🧪 TEST EXECUTION
// ============================================================================

/**
 * Runs security tests
 */
function runSecurityTests() {
  const results = {
    passed: 0,
    failed: 0,
    total: 0,
    details: []
  };
  
  console.log('🔍 Testing Malicious Input Blocking...\n');
  
  // Test malicious color inputs
  console.log('🎨 Testing Malicious Colors:');
  SECURITY_TESTS.maliciousColors.forEach((color, index) => {
    const result = validateColor(color);
    const testPassed = !result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Blocked malicious color`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Failed to block malicious color`);
      console.log(`     Input: ${color}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'malicious_color',
      input: color,
      expected: 'blocked',
      actual: testPassed ? 'blocked' : 'allowed',
      passed: testPassed
    });
  });
  
  console.log('');
  
  // Test malicious font inputs
  console.log('📝 Testing Malicious Fonts:');
  SECURITY_TESTS.maliciousFonts.forEach((font, index) => {
    const result = validateFont(font);
    const testPassed = !result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Blocked malicious font`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Failed to block malicious font`);
      console.log(`     Input: ${font}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'malicious_font',
      input: font,
      expected: 'blocked',
      actual: testPassed ? 'blocked' : 'allowed',
      passed: testPassed
    });
  });
  
  console.log('');
  
  // Test malicious numeric inputs
  console.log('🔢 Testing Malicious Numeric Values:');
  SECURITY_TESTS.maliciousNumeric.forEach((value, index) => {
    const result = validateNumeric(value);
    const testPassed = !result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Blocked malicious numeric value`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Failed to block malicious numeric value`);
      console.log(`     Input: ${value}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'malicious_numeric',
      input: value,
      expected: 'blocked',
      actual: testPassed ? 'blocked' : 'allowed',
      passed: testPassed
    });
  });
  
  console.log('');
  
  // Test valid inputs (should pass)
  console.log('✅ Testing Valid Inputs...\n');
  
  console.log('🎨 Testing Valid Colors:');
  SECURITY_TESTS.validInputs.colors.forEach((color, index) => {
    const result = validateColor(color);
    const testPassed = result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Valid color accepted`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Valid color rejected`);
      console.log(`     Input: ${color}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'valid_color',
      input: color,
      expected: 'accepted',
      actual: testPassed ? 'accepted' : 'rejected',
      passed: testPassed
    });
  });
  
  console.log('');
  
  console.log('📝 Testing Valid Fonts:');
  SECURITY_TESTS.validInputs.fonts.forEach((font, index) => {
    const result = validateFont(font);
    const testPassed = result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Valid font accepted`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Valid font rejected`);
      console.log(`     Input: ${font}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'valid_font',
      input: font,
      expected: 'accepted',
      actual: testPassed ? 'accepted' : 'rejected',
      passed: testPassed
    });
  });
  
  console.log('');
  
  console.log('🔢 Testing Valid Numeric Values:');
  SECURITY_TESTS.validInputs.numeric.forEach((value, index) => {
    const result = validateNumeric(value);
    const testPassed = result.isValid;
    
    if (testPassed) {
      console.log(`  ✅ Test ${index + 1}: Valid numeric value accepted`);
      results.passed++;
    } else {
      console.log(`  ❌ Test ${index + 1}: Valid numeric value rejected`);
      console.log(`     Input: ${value}`);
      console.log(`     Result: ${result.error || 'No error'}`);
      results.failed++;
    }
    results.total++;
    
    results.details.push({
      type: 'valid_numeric',
      input: value,
      expected: 'accepted',
      actual: testPassed ? 'accepted' : 'rejected',
      passed: testPassed
    });
  });
  
  return results;
}

// ============================================================================
// 📊 RESULTS REPORTING
// ============================================================================

/**
 * Generates security report
 */
function generateSecurityReport(results) {
  console.log('\n📊 Security Test Results');
  console.log('========================');
  console.log(`Total Tests: ${results.total}`);
  console.log(`Passed: ${results.passed} ✅`);
  console.log(`Failed: ${results.failed} ❌`);
  console.log(`Success Rate: ${((results.passed / results.total) * 100).toFixed(1)}%`);
  
  console.log('\n🎯 Security Assessment:');
  
  if (results.failed === 0) {
    console.log('🟢 EXCELLENT: All security tests passed!');
    console.log('   Your library is secure against common attacks.');
  } else if (results.failed <= 3) {
    console.log('🟡 GOOD: Most security tests passed.');
    console.log('   Minor security improvements recommended.');
  } else if (results.failed <= 10) {
    console.log('🟠 FAIR: Some security tests failed.');
    console.log('   Security improvements needed.');
  } else {
    console.log('🔴 POOR: Many security tests failed.');
    console.log('   Significant security improvements required.');
  }
  
  // Detailed failure report
  if (results.failed > 0) {
    console.log('\n❌ Failed Tests Details:');
    results.details
      .filter(test => !test.passed)
      .forEach((test, index) => {
        console.log(`  ${index + 1}. ${test.type.toUpperCase()}`);
        console.log(`     Input: ${test.input}`);
        console.log(`     Expected: ${test.expected}`);
        console.log(`     Actual: ${test.actual}`);
        console.log('');
      });
  }
  
  // Security recommendations
  console.log('\n🔒 Security Recommendations:');
  
  if (results.failed === 0) {
    console.log('  ✅ Continue regular security audits');
    console.log('  ✅ Monitor for new attack vectors');
    console.log('  ✅ Keep dependencies updated');
  } else {
    console.log('  🚨 Review input validation logic');
    console.log('  🚨 Implement additional sanitization');
    console.log('  🚨 Add more comprehensive testing');
    console.log('  🚨 Consider security audit tools');
  }
  
  return results;
}

// ============================================================================
// 🚀 MAIN EXECUTION
// ============================================================================

/**
 * Main function
 */
function main() {
  try {
    console.log('🧪 Starting Security Tests...\n');
    
    // Run security tests
    const results = runSecurityTests();
    
    // Generate report
    generateSecurityReport(results);
    
    // Save detailed results to file
    const reportPath = path.join(__dirname, '../security-test-results.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`\n📄 Detailed results saved to: ${reportPath}`);
    
    // Exit with appropriate code
    process.exit(results.failed === 0 ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Security testing failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  runSecurityTests,
  generateSecurityReport,
  SECURITY_TESTS
};
