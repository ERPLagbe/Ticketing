import { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { Input } from './ui/input';
import { Search, Check } from 'lucide-react';
import { useLocale, currencies, Currency } from '../contexts/LocaleContext';

interface CurrencySelectorProps {
  children: React.ReactNode;
}

export function CurrencySelector({ children }: CurrencySelectorProps) {
  const { currency, setCurrency } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredCurrencies = currencies.filter(
    (curr) =>
      curr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      curr.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCurrency = (curr: Currency) => {
    setCurrency(curr);
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="p-4">
          <h3 className="mb-3" style={{ color: 'var(--label-primary)' }}>
            Select Currency
          </h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search currencies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 h-9"
            />
          </div>
        </div>
        <div className="max-h-80 overflow-auto">
          <div className="px-2 pb-2">
            {filteredCurrencies.map((curr) => (
              <button
                key={curr.code}
                onClick={() => handleSelectCurrency(curr)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-accent transition-colors"
              >
                <span style={{ fontSize: '20px' }}>{curr.flag}</span>
                <div className="flex-1 text-left">
                  <div style={{ color: 'var(--label-primary)' }}>
                    <strong>{curr.code}</strong>
                  </div>
                  <small style={{ color: 'var(--label-secondary)' }}>
                    {curr.name}
                  </small>
                </div>
                {currency.code === curr.code && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
            {filteredCurrencies.length === 0 && (
              <div className="text-center py-6">
                <p style={{ color: 'var(--label-secondary)' }}>
                  No currencies found
                </p>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}