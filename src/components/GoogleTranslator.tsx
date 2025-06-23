import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Globe, X, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  native: string;
}

const GoogleTranslator = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);

  const languages: Language[] = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  ];

  useEffect(() => {
    // Load Google Translate script
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);

      // Define the callback function
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          autoDisplay: false,
          includedLanguages: languages.map(lang => lang.code).join(','),
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
      };
    }

    // Get current language from cookie or use default
    const savedLanguage = getCurrentLanguageFromCookie();
    if (savedLanguage && savedLanguage !== 'en') {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const getCurrentLanguageFromCookie = (): string => {
    const match = document.cookie.match(/(^|;)\s*googtrans=([^;]+)/);
    if (match && match[2]) {
      const parts = match[2].split('/');
      return parts.length >= 3 ? parts[2] : 'en';
    }
    return 'en';
  };

  const changeLanguage = (langCode: string) => {
    if (currentLanguage === langCode) {
      setIsModalOpen(false);
      return;
    }

    setIsTranslating(true);
    setCurrentLanguage(langCode);

    if (langCode === 'en') {
      // Clear translation cookies to reset to English
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' + window.location.hostname;
      document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname;
      
      // Force reload to English without showing Google interface
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // Set translation cookie
      const cookieValue = `/en/${langCode}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
      
      // Try to trigger translation without showing Google UI
      const triggerTranslation = () => {
        const translateElement = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (translateElement) {
          // Hide the element before triggering translation
          translateElement.style.display = 'none';
          translateElement.value = langCode;
          translateElement.dispatchEvent(new Event('change'));
          
          // Wait for translation to complete
          setTimeout(() => {
            setIsTranslating(false);
            // Double check that Google elements are hidden
            const googleElements = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate, .goog-te-gadget');
            googleElements.forEach(el => {
              (el as HTMLElement).style.display = 'none';
              (el as HTMLElement).style.visibility = 'hidden';
            });
          }, 1000);
        } else {
          // Fallback: Set cookie and reload
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      };

      // Wait for Google Translate to initialize
      setTimeout(triggerTranslation, 300);
    }

    setIsModalOpen(false);
  };

  const getCurrentLanguageName = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.name : 'English';
  };

  const getCurrentLanguageNative = () => {
    const lang = languages.find(l => l.code === currentLanguage);
    return lang ? lang.native : 'English';
  };

  return (
    <>
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      
      {/* Translate Button */}
      <Button
        ref={setButtonRef}
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        className="ml-4 bg-white hover:bg-orange-50 border-orange-200 text-orange-700 hover:text-orange-800 hover:border-orange-300 transition-all duration-200 relative"
        disabled={isTranslating}
      >
        {isTranslating ? (
          <div className="animate-spin h-4 w-4 mr-2 border-2 border-orange-600 border-t-transparent rounded-full"></div>
        ) : (
          <Globe className="h-4 w-4 mr-2" />
        )}
        {getCurrentLanguageNative()}
      </Button>

      {/* Translator Modal */}
      {isModalOpen && buttonRef && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-transparent" 
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Dropdown positioned below button */}
          <div 
            className="absolute bg-white rounded-xl shadow-2xl w-96 transform transition-all scale-100 border border-gray-200"
            style={{
              top: buttonRef.getBoundingClientRect().bottom + window.scrollY + 8,
              left: Math.min(
                buttonRef.getBoundingClientRect().left + window.scrollX,
                window.innerWidth - 400
              ),
            }}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Globe className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Select Language</h3>
                  <p className="text-sm text-gray-500">Choose your preferred language</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full p-2 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Language Grid */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`group relative p-3 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
                      currentLanguage === lang.code
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-gray-200 hover:border-orange-300 hover:bg-orange-25'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm text-gray-900 group-hover:text-orange-700">
                          {lang.name}
                        </div>
                        <div className="text-xs text-gray-600 mt-1">
                          {lang.native}
                        </div>
                      </div>
                      {currentLanguage === lang.code && (
                        <Check className="h-4 w-4 text-orange-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      )}

      {/* Enhanced CSS to hide Google Translate elements */}
      <style>{`
        /* Hide ALL Google Translate elements and branding - Enhanced */
        .skiptranslate,
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        .goog-te-gadget-icon,
        .goog-te-gadget,
        .goog-logo-link,
        .goog-te-combo,
        .goog-te-menu-value,
        .goog-te-menu-frame,
        iframe.goog-te-banner-frame,
        .VIpgJd-ZVi9od-ORHb-OEVmcd,
        .goog-te-ftab,
        [id^="google_translate_element"] .skiptranslate,
        [id^="google_translate_element"] .goog-te-gadget,
        div.goog-te-gadget,
        .goog-te-banner-frame.skiptranslate,
        iframe[src*="translate.google"],
        .goog-te-spinner,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          height: 0 !important;
          width: 0 !important;
          overflow: hidden !important;
          position: absolute !important;
          left: -9999px !important;
          top: -9999px !important;
        }
        
        /* Prevent Google Translate from showing any interface */
        body.goog-te-banner-frame {
          top: 0 !important;
        }
        
        /* Remove Google Translate effects on body */
        body {
          top: 0 !important;
          position: static !important;
        }
        
        /* Hide notification bars and popups */
        .goog-te-banner-frame,
        .goog-te-menu-frame {
          visibility: hidden !important;
          display: none !important;
        }
        
        /* Remove any Google branding text */
        span:contains("Powered by"),
        span:contains("Google Translate"),
        a[href*="translate.google"] {
          display: none !important;
        }
        
        /* Force hide any remaining Google elements */
        [class*="goog-te"] {
          display: none !important;
        }
        
        /* Hide iframe content that might flash */
        iframe[name^="goog_te"] {
          display: none !important;
        }
        
        /* Custom scrollbar removed since no longer needed */
        
        /* Animation classes */
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default GoogleTranslator;