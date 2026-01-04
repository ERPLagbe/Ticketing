import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { Input } from './ui/input';
import { Search, Check } from 'lucide-react';
import { useLocale, languages, Language } from '../contexts/LocaleContext';

interface LanguageModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LanguageModal({ open, onOpenChange }: LanguageModalProps) {
  const { language, setLanguage } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);

  const filteredLanguages = languages.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectLanguage = (lang: Language) => {
    setIsTranslating(true);
    setLanguage(lang);
    
    // Show translating message briefly
    setTimeout(() => {
      setIsTranslating(false);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle style={{ fontSize: '24px', fontWeight: 700, color: '#1a2b49' }}>
            Select Language
          </DialogTitle>
          <DialogDescription style={{ fontSize: '14px', color: '#6b7280' }}>
            Choose your preferred language for the application.
          </DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search languages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            style={{ fontSize: '15px' }}
          />
        </div>

        {/* Language List */}
        <div className="overflow-y-auto flex-1 -mx-6 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang)}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#1a2b49' }}>
                      {lang.nativeName}
                    </span>
                    {lang.code !== lang.name.toLowerCase() && (
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>
                        ({lang.name})
                      </span>
                    )}
                  </div>
                </div>
                
                {language.code === lang.code && (
                  <Check className="w-5 h-5 text-blue-600 ml-2" />
                )}
              </button>
            ))}
          </div>

          {filteredLanguages.length === 0 && (
            <div className="text-center py-8">
              <p style={{ fontSize: '15px', color: '#6b7280' }}>
                No languages found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p style={{ fontSize: '13px', color: '#6b7280', textAlign: 'center' }}>
            Translations are powered by Google Translate
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}