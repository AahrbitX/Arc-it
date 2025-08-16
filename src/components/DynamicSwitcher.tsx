import React, { useState } from 'react';
import { 
  useTheme, 
  useDynamicThemeDetection
} from '../theme/hooks';
import { 
  useContent, 
  useContentStyle,
  useDynamicContentDetection
} from '../content/hooks';
import { 
  Settings, 
  Palette, 
  Globe, 
  FileText, 
  Sun, 
  Moon, 
  ChevronDown,
  Check,
  Sparkles
} from 'lucide-react';

// ============================================================================
// DYNAMIC SWITCHER COMPONENT - Lure-TechSolutions Style
// ============================================================================
// This component automatically detects available themes and content from JSON files
// No hardcoded values - everything is discovered dynamically!

export default function DynamicSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'languages' | 'content'>('themes');
  
  // Core hooks
  const { setPreset, currentPreset, toggleDarkMode, availablePresets } = useTheme();
  const { language, setLanguage } = useContent();
  const { currentStyle, setContentStyle } = useContentStyle();
  
  // Dynamic detection hooks - these automatically discover what's available
  const { getDynamicThemeInfo, getThemeMetadata } = useDynamicThemeDetection();
  const { getDynamicContentInfo, getContentMetadata } = useDynamicContentDetection();
  
  // Get dynamically detected information
  const { baseThemes, colorVariants } = getDynamicThemeInfo();
  const { availableLanguages, contentSections, contentStyles } = getDynamicContentInfo();
  
  // Enhanced dark mode detection based on current preset
  const isCurrentlyDarkMode = !currentPreset?.includes('-light');
  
  // Debug logging
  console.log('Current preset:', currentPreset);
  console.log('Is dark mode:', isCurrentlyDarkMode);
  console.log('Base themes:', baseThemes);
  console.log('Available presets:', availablePresets);
  
  // Improved dark mode toggle handler
  const handleDarkModeToggle = () => {
    try {
      // Get the current base theme name (remove -light suffix if present)
      const currentBaseTheme = currentPreset?.replace('-light', '') || 'green';
      
      console.log('Current preset:', currentPreset);
      console.log('Current base theme:', currentBaseTheme);
      console.log('Is currently dark mode:', isCurrentlyDarkMode);
      console.log('Available presets:', availablePresets);
      
      if (isCurrentlyDarkMode) {
        // Currently in dark mode, switch to light mode
        const lightPreset = `${currentBaseTheme}-light`;
        console.log('Switching to light mode:', lightPreset);
        
        // Check if the light preset exists
        if (availablePresets.includes(lightPreset)) {
          setPreset(lightPreset);
        } else {
          console.warn(`Light preset ${lightPreset} not found. Available:`, availablePresets);
          // Try to find any light preset
          const anyLightPreset = availablePresets.find(preset => preset.includes('-light'));
          if (anyLightPreset) {
            setPreset(anyLightPreset);
          }
        }
      } else {
        // Currently in light mode, switch to dark mode
        console.log('Switching to dark mode:', currentBaseTheme);
        
        // Check if the dark preset exists
        if (availablePresets.includes(currentBaseTheme)) {
          setPreset(currentBaseTheme);
        } else {
          console.warn(`Dark preset ${currentBaseTheme} not found. Available:`, availablePresets);
          // Try to find any dark preset (without -light suffix)
          const anyDarkPreset = availablePresets.find(preset => !preset.includes('-light'));
          if (anyDarkPreset) {
            setPreset(anyDarkPreset);
          }
        }
      }
    } catch (error) {
      console.error('Error in handleDarkModeToggle:', error);
    }
  };

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handleThemeChange = (preset: string) => {
    // If user is currently in light mode, apply the light variant
    // If user is currently in dark mode, apply the dark variant
    const isCurrentlyLight = currentPreset?.includes('-light');
    const themeToApply = isCurrentlyLight ? `${preset}-light` : preset;
    
    setPreset(themeToApply);
    setIsOpen(false);
  };

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const handleContentStyleChange = (styleId: string) => {
    setContentStyle(styleId);
    setIsOpen(false);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  // ============================================================================
  // RENDER
  // ============================================================================

  return (

    <div className="relative">
      {/* Main Button */}
      <button
        onClick={toggleOpen}
        className="group relative flex items-center gap-3 px-4 py-3 bg-white rounded-2xl"
      >
        <Settings className="w-5 h-5 text-black" />
        <span className="hidden sm:inline font-semibold">Customize</span>
        <ChevronDown className={`w-4 h-4 text-black transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50">

          <div className="py-2 flex">
            {/* Themes Tab */}
            <button
              onClick={() => setActiveTab('themes')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'themes' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <Palette className="w-5 h-5 text-black" />
              <div className="flex-1">
                <span className="text-sm font-medium text-black">Themes</span>
              </div>
              {baseThemes.length > 0 && (
                <span className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full font-medium">
                  {baseThemes.length}
                </span>
              )}
            </button>

            {/* Languages Tab */}
            <button
              onClick={() => setActiveTab('languages')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'languages' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <Globe className="w-5 h-5 text-black" />
              <div className="flex-1">
                <span className="text-sm font-medium text-black">Languages</span>
              </div>
              {availableLanguages.length > 0 && (
                <span className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full font-medium">
                  {availableLanguages.length}
                </span>
              )}
            </button>

            {/* Content Tab */}
            <button
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeTab === 'content' ? 'bg-blue-50 border-r-2 border-blue-500' : ''
              }`}
            >
              <FileText className="w-5 h-5 text-black" />
              <div className="flex-1">
                <span className="text-sm font-medium text-black">Content</span>
              </div>
              {contentStyles.length > 0 && (
                <span className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full font-medium">
                  {contentStyles.length}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={handleDarkModeToggle}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors"
            >
              {isCurrentlyDarkMode ? (
                <Sun className="w-5 h-5 text-black" />
              ) : (
                <Moon className="w-5 h-5 text-black" />
              )}
            </button>
          </div>

           {(activeTab === 'themes' || activeTab === 'languages' || activeTab === 'content') && (
             <div className="max-h-64 overflow-y-auto px-4 py-4">
               {activeTab === 'themes' && (
                 <div className="px-6">
                   <h4 className="text-sm font-semibold text-black mb-3 justify-center">
                     Available Themes ({baseThemes.length})
                   </h4>
                   {baseThemes.length > 0 ? (
                     <div className="space-y-2">
                       {baseThemes.map((baseTheme) => {
                         const isCurrentTheme = currentPreset === baseTheme || currentPreset === `${baseTheme}-light`;
                         const metadata = getThemeMetadata(baseTheme);
                         
                         return (
                          <button
                               key={baseTheme}
                               onClick={() => handleThemeChange(baseTheme)}
                               className={`w-full text-left p-3 rounded-lg px-4 py-2`}
                             >
                               <div className="flex items-center gap-3">
                                 <div 
                                   className="w-6 h-6 rounded-full border-2 border-gray-300 flex-shrink-0"
                                   style={{backgroundColor: getThemeColor(baseTheme)}}
                                 ></div>
                                 
                                 <div className="flex-1">
                                   <div className="flex items-center justify-between">
                                     <span className="capitalize text-black font-medium text-sm">{baseTheme}</span>
                                     {isCurrentTheme && (
                                       <Check className="w-4 h-4 text-black" />
                                     )}
                                   </div>
                                   <p className="text-xs text-black mt-1">
                                     {metadata.description}
                                   </p>
                                 </div>
                               </div>
                             </button>
                         );
                       })}
                     </div>
                   ) : (
                     <div className="text-center py-6 text-black">
                       <Palette className="w-8 h-8 mx-auto mb-2 text-black" />
                       <p className="text-sm text-black">No themes detected</p>
                       <p className="text-xs text-black">Add presets to your theme.json file</p>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'languages' && (
                 <div className="p-4">
                   <h4 className="text-sm font-semibold text-black mb-3 justify-center px-4">
                     Available Languages ({availableLanguages.length})
                   </h4>
                   {availableLanguages.length > 0 ? (
                     <div className="space-y-2">
                       {availableLanguages.map((lang: string) => (
                         <button
                           key={lang}
                           onClick={() => handleLanguageChange(lang)}
                            className={`w-full text-left p-3 rounded-lg px-4 py-2`}
                         >
                           <div className="flex items-center justify-between">
                             <span className="capitalize text-black font-medium text-sm">{getLanguageName(lang)}</span>
                             {language === lang && (
                               <Check className="w-4 h-4 text-blue-600" />
                             )}
                           </div>
                           <p className="text-xs text-black mt-1">
                             {getLanguageDescription(lang)}
                           </p>
                         </button>
                       ))}
                     </div>
                   ) : (
                     <div className="text-center py-6 text-black">
                       <Globe className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                       <p className="text-sm">No languages detected</p>
                       <p className="text-xs">Add language keys to your content.json file</p>
                     </div>
                   )}
                 </div>
               )}

               {activeTab === 'content' && (
                 <div className="p-4">
                   <h4 className="text-sm font-semibold text-black mb-3 justify-center px-4">
                     Content Styles ({contentStyles.length})
                   </h4>
                   {contentStyles.length > 0 ? (
                     <div className="space-y-2">
                       {contentStyles.map((styleId: string) => {
                         const metadata = getContentMetadata(styleId);
                         const isCurrentStyle = currentStyle === styleId;
                         
                         return (
                           <button
                             key={styleId}
                             onClick={() => handleContentStyleChange(styleId)}
                             className={`w-full text-left p-3 rounded-lg px-4 py-2`}
                           >
                             <div className="flex items-center justify-between">
                               <span className="capitalize text-black font-medium text-sm">{styleId}</span>
                               {isCurrentStyle && (
                                 <Check className="w-4 h-4 text-blue-600" />
                               )}
                             </div>
                             <p className="text-xs text-black mt-1">
                               {metadata.description}
                             </p>
                           </button>
                         );
                       })}
                     </div>
                   ) : (
                     <div className="text-center py-6 text-black">
                       <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                       <p className="text-sm">No content styles detected</p>
                       <p className="text-xs">Add styles to your content.json file</p>
                     </div>
                   )}
                 </div>
               )}
             </div>
           )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function getLanguageName(language: string): string {
  const names: Record<string, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    it: 'Italiano',
    pt: 'Português',
    ja: '日本語',
    ko: '한국어',
    zh: '中文',
    ar: 'العربية'
  };
  return names[language] || language;
}

function getLanguageDescription(language: string): string {
  const descriptions: Record<string, string> = {
    en: 'Primary language',
    es: 'Spanish language support',
    fr: 'French language support',
    de: 'German language support',
    it: 'Italian language support',
    pt: 'Portuguese language support',
    ja: 'Japanese language support',
    ko: 'Korean language support',
    zh: 'Chinese language support',
    ar: 'Arabic language support'
  };
  return descriptions[language] || 'Language support';
}

function getThemeColor(themeName: string): string {
  const themeColors: Record<string, string> = {
    green: '#00ff0d',
    orange: '#f59e0b',
    red: '#ef4444',
    blue: '#3b82f6',
    purple: '#8b5cf6',
    pink: '#ec4899',
    yellow: '#eab308',
    teal: '#14b8a6',
    indigo: '#6366f1',
    gray: '#6b7280'
  };
  return themeColors[themeName] || '#000000'; // Default to black if theme not found
}
