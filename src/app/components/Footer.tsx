import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, ChevronDown } from 'lucide-react';
import { useLocale, languages, currencies } from '../contexts/LocaleContext';
import logoImage from 'figma:asset/ce59eeccef0d9776fa8fba765e5d4b98cd4ae7aa.png';

export function Footer() {
  const { language, currency, setLanguage, setCurrency } = useLocale();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = languages.find(l => l.code === e.target.value);
    if (selectedLang) {
      setLanguage(selectedLang);
    }
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurr = currencies.find(c => c.code === e.target.value);
    if (selectedCurr) {
      setCurrency(selectedCurr);
    }
  };

  return (
    <footer style={{ backgroundColor: '#1a2b49', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: 'var(--spacing-6x)', paddingBottom: 'var(--spacing-4x)' }}>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Logo & Motto */}
          <div>
            <Link to="/" className="inline-block" style={{ marginBottom: 'var(--spacing-2x)' }}>
              <img 
                src="/getyourguide-logo-white.svg" 
                alt="GetYourGuide" 
                style={{ height: '32px' }}
              />
            </Link>
            <p style={{ color: 'var(--label-quaternary)', opacity: 0.8, marginTop: 'var(--spacing-1-5x)' }}>
              Unforgettable travel experiences
            </p>
          </div>

          {/* Support */}
          <div>
            <h4 style={{ color: 'var(--label-quaternary)', marginBottom: 'var(--spacing-2-5x)' }}>
              Support
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/contact" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">Contact</Link></li>
              <li><Link to="/privacy-policy" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">Privacy policy</Link></li>
              <li><Link to="/terms-conditions" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">General terms and conditions</Link></li>
              <li><Link to="/search" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">Browse Activities</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 style={{ color: 'var(--label-quaternary)', marginBottom: 'var(--spacing-2-5x)' }}>
              Company
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/about-us" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">About us</Link></li>
              <li><Link to="/blog" style={{ color: 'var(--label-quaternary)', textDecoration: 'none' }} className="hover:underline">Blog</Link></li>
            </ul>
          </div>

          {/* Language & Currency */}
          <div>
            <h4 style={{ color: 'var(--label-quaternary)', marginBottom: 'var(--spacing-2-5x)' }}>
              Language
            </h4>
            <div className="relative mb-6">
              <select 
                className="w-full px-3 py-2 pr-8 rounded appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--label-quaternary)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  outline: 'none',
                }}
                value={language.code}
                onChange={handleLanguageChange}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} style={{ backgroundColor: 'var(--label-primary)' }}>{lang.name}</option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: '16px', height: '16px', color: 'var(--label-quaternary)' }}
              />
            </div>

            <h4 style={{ color: 'var(--label-quaternary)', marginBottom: 'var(--spacing-2-5x)' }}>
              Currency
            </h4>
            <div className="relative">
              <select 
                className="w-full px-3 py-2 pr-8 rounded appearance-none cursor-pointer"
                style={{
                  backgroundColor: 'transparent',
                  color: 'var(--label-quaternary)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  outline: 'none',
                }}
                value={currency.code}
                onChange={handleCurrencyChange}
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code} style={{ backgroundColor: 'var(--label-primary)' }}>{curr.code} - {curr.name}</option>
                ))}
              </select>
              <ChevronDown 
                className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ width: '16px', height: '16px', color: 'var(--label-quaternary)' }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.2)', paddingTop: '24px' }}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            {/* Left Side - Copyright and Social */}
            <div className="flex flex-col gap-4">
              <p style={{ color: 'var(--label-quaternary)', opacity: 0.8 }}>
                © 2008–2025 GetYourGuide
              </p>
              
              {/* Social Media Icons */}
              <div className="flex gap-4">
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  <Facebook style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                </Link>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  <Instagram style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                </Link>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  <Twitter style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                </Link>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color: '#ffffff' }}>
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </Link>
                <Link to="#" className="hover:opacity-70 transition-opacity">
                  <Linkedin style={{ width: '20px', height: '20px', color: '#ffffff' }} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}