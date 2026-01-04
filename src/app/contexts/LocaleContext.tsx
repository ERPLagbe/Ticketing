import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh-CN', name: 'Chinese (Simplified)', nativeName: '简体中文' },
  { code: 'zh-TW', name: 'Chinese (Traditional)', nativeName: '繁體中文' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'da', name: 'Danish', nativeName: 'Dansk' },
  { code: 'fi', name: 'Finnish', nativeName: 'Suomi' },
  { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
  { code: 'cs', name: 'Czech', nativeName: 'Čeština' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
  { code: 'he', name: 'Hebrew', nativeName: 'עברית' },
  { code: 'th', name: 'Thai', nativeName: 'ไทย' },
  { code: 'vi', name: 'Vietnamese', nativeName: 'Tiếng Việt' },
  { code: 'id', name: 'Indonesian', nativeName: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Malay', nativeName: 'Bahasa Melayu' },
  { code: 'ro', name: 'Romanian', nativeName: 'Română' },
  { code: 'hu', name: 'Hungarian', nativeName: 'Magyar' },
  { code: 'uk', name: 'Ukrainian', nativeName: 'Українська' },
];

export const currencies: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
  { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
  { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
  { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  { code: 'DKK', symbol: 'kr', name: 'Danish Krone' },
  { code: 'MXN', symbol: 'Mex$', name: 'Mexican Peso' },
  { code: 'BRL', symbol: 'R$', name: 'Brazilian Real' },
  { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
  { code: 'KRW', symbol: '₩', name: 'South Korean Won' },
  { code: 'THB', symbol: '฿', name: 'Thai Baht' },
  { code: 'PLN', symbol: 'zł', name: 'Polish Złoty' },
  { code: 'TRY', symbol: '₺', name: 'Turkish Lira' },
];

interface LocaleContextType {
  language: Language;
  currency: Currency;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: Currency) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('selectedLanguage');
    return saved ? JSON.parse(saved) : languages[0]; // Default to English
  });

  const [currency, setCurrencyState] = useState<Currency>(() => {
    const saved = localStorage.getItem('selectedCurrency');
    return saved ? JSON.parse(saved) : currencies[0]; // Default to USD
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', JSON.stringify(lang));
    
    // Use Google Translate URL hash method (same as browser extension)
    if (lang.code === 'en') {
      // Reset to original English
      const hash = window.location.hash;
      if (hash.includes('googtrans')) {
        window.location.hash = '';
        window.location.reload();
      }
    } else {
      // Set the Google Translate hash
      // Format: #googtrans(source|target) e.g., #googtrans(en|es)
      window.location.hash = `#googtrans(en|${lang.code})`;
      // Reload to apply translation
      window.location.reload();
    }
  };

  const setCurrency = (curr: Currency) => {
    setCurrencyState(curr);
    localStorage.setItem('selectedCurrency', JSON.stringify(curr));
  };

  useEffect(() => {
    // Load Google Translate script
    const addScript = () => {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    // Initialize Google Translate
    (window as any).googleTranslateElementInit = function() {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: languages.map(l => l.code).join(','),
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    // Check if script already exists
    const existingScript = document.querySelector('script[src*="translate.google.com"]');
    if (!existingScript) {
      addScript();
    } else if ((window as any).google?.translate) {
      (window as any).googleTranslateElementInit();
    }

    // Check if there's a hash on load and apply translation
    const hash = window.location.hash;
    if (hash.includes('googtrans')) {
      const match = hash.match(/#googtrans\(en\|([a-z-]+)\)/i);
      if (match && match[1]) {
        const langCode = match[1];
        const savedLang = languages.find(l => l.code === langCode);
        if (savedLang) {
          setLanguageState(savedLang);
          localStorage.setItem('selectedLanguage', JSON.stringify(savedLang));
        }
      }
    }
  }, []);

  return (
    <LocaleContext.Provider value={{ language, currency, setLanguage, setCurrency }}>
      {children}
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" style={{ display: 'none', position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
      
      {/* Hide Google Translate branding */}
      <style>{`
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
        }
        body {
          top: 0px !important;
        }
        .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-tooltip {
          display: none !important;
        }
        .goog-tooltip:hover {
          display: none !important;
        }
        .goog-text-highlight {
          background-color: transparent !important;
          border: none !important; 
          box-shadow: none !important;
        }
      `}</style>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    // Return default values if provider is not available (e.g., during hot reload)
    if (process.env.NODE_ENV === 'development') {
      console.warn('useLocale must be used within LocaleProvider. Using default values.');
    }
    return {
      language: languages[0],
      currency: currencies[0],
      setLanguage: () => {},
      setCurrency: () => {},
    };
  }
  return context;
}

// Utility function to format price with currency
export function formatPrice(amount: number, currency: Currency): string {
  return `${currency.symbol}${amount.toFixed(2)}`;
}