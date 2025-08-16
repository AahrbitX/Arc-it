import React from 'react';
import { DynamicProvider, useTheme, useTailwindTheme } from '../src';

// 🚀 SUPER SIMPLE EXAMPLE - Just 3 components!

// 1. CSS Variables Component
function CSSButton() {
  const { getColor } = useTheme();
  
  return (
    <button style={{ 
      backgroundColor: getColor('primary'),
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px'
    }}>
      CSS Variables Button
    </button>
  );
}

// 2. Tailwind CSS Component
function TailwindButton() {
  return (
    <button className="bg-primary text-white px-6 py-3 rounded-lg text-base font-medium hover:opacity-90">
      Tailwind CSS Button
    </button>
  );
}

// 3. Hybrid Component (Best of Both)
function HybridButton() {
  const { getColor } = useTheme();
  
  return (
    <button 
      className="px-6 py-3 rounded-lg text-base font-medium hover:opacity-90" // Tailwind for layout
      style={{ 
        backgroundColor: getColor('primary'), // CSS variables for colors
        color: 'white'
      }}
    >
      Hybrid Button
    </button>
  );
}

// 🎯 MAIN APP - Just wrap with DynamicProvider!
export function SuperSimpleApp() {
  return (
    <DynamicProvider>
      <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px', color: '#333' }}>
          🎨 Dynamic Theme Content - Super Simple!
        </h1>
        
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <CSSButton />
          <TailwindButton />
          <HybridButton />
        </div>
        
        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <p>✨ That's it! All 3 approaches working together.</p>
          <p>🎯 Change your theme.json file and watch the magic happen!</p>
        </div>
      </div>
    </DynamicProvider>
  );
}

// 🚀 EVEN SIMPLER - Just 1 component!
export function OneLinerExample() {
  return (
    <DynamicProvider>
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>🎉 One Provider = Everything!</h1>
        <p>Your app now supports CSS variables AND Tailwind CSS theming.</p>
      </div>
    </DynamicProvider>
  );
}
