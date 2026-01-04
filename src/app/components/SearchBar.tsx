import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search, MapPin, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { setDestination, setDate, setCategory } from '../store/slices/filtersSlice';
import { RootState } from '../store/store';

interface SearchBarProps {
  variant?: 'hero' | 'compact' | 'navbar';
  showSuggestions?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

export function SearchBar({ variant = 'hero', showSuggestions, onFocus, onBlur }: SearchBarProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.activities);
  const [destination, setDestinationValue] = useState('');
  const [date, setDateValue] = useState('');
  const [showSuggestionsDropdown, setShowSuggestionsDropdown] = useState(false);

  // Get unique cities from activities data
  const uniqueCities = Array.from(new Set(items.map(item => {
    // Extract city name from location (e.g., "Paris, France" -> "Paris")
    const cityMatch = item.location.match(/^([^,]+)/);
    return cityMatch ? cityMatch[1].trim() : item.location;
  }))).slice(0, 5);

  // Create suggestions from unique cities with country info
  const suggestions = uniqueCities.map(city => {
    const activity = items.find(item => item.location.startsWith(city));
    const location = activity?.location || city;
    // Extract country from full location
    const parts = location.split(',');
    const country = parts.length > 1 ? parts[parts.length - 1].trim() : '';
    
    return {
      name: city,
      location: country ? `City in ${country}` : 'City',
    };
  });

  // Filter suggestions based on search query
  const filteredSuggestions = destination.trim() 
    ? suggestions.filter(s => 
        s.name.toLowerCase().includes(destination.toLowerCase()) ||
        s.location.toLowerCase().includes(destination.toLowerCase())
      )
    : suggestions;

  const handleSearch = () => {
    if (destination) {
      dispatch(setDestination(destination));
    }
    if (date) {
      dispatch(setDate(date));
    }
    navigate('/search');
    setShowSuggestionsDropdown(false);
  };

  const handleSuggestionClick = (cityName: string) => {
    dispatch(setDestination(cityName));
    navigate('/search');
    setShowSuggestionsDropdown(false);
    setDestinationValue('');
  };

  // Navbar variant - compact single input
  if (variant === 'navbar') {
    return (
      <div 
        className="flex-1 relative"
        style={{
          maxWidth: '800px',
          animation: 'slideDown 0.3s ease-out',
        }}
      >
        <div 
          className="flex items-center bg-white rounded-full overflow-hidden shadow-sm"
          style={{ 
            border: showSuggestionsDropdown ? '2px solid var(--interactive-primary)' : '1px solid var(--border-primary)',
            width: '350px',
            height: '44px',
          }}
        >
          <input
            type="text"
            placeholder="Find places and things to do"
            value={destination}
            onChange={(e) => setDestinationValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            onFocus={() => {
              setShowSuggestionsDropdown(true);
              onFocus?.();
            }}
            onBlur={(e) => {
              // Delay to allow click on suggestion
              setTimeout(() => {
                setShowSuggestionsDropdown(false);
                onBlur?.();
              }, 200);
            }}
            className="flex-1 outline-none px-4"
            style={{ 
              fontSize: '14px',
              color: 'var(--label-primary)',
              fontFamily: 'var(--font-primary)',
              border: 'none',
              background: 'transparent',
            }}
          />
          <button 
            onClick={handleSearch}
            className="text-white font-medium rounded-full transition-all duration-200 hover:opacity-90 active:scale-95 flex items-center justify-center"
            style={{ 
              backgroundColor: 'var(--interactive-primary)',
              width: '36px',
              height: '36px',
              margin: '4px',
            }}
          >
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Autocomplete Suggestions */}
        {showSuggestionsDropdown && (
          <div 
            className="absolute left-0 right-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown"
            style={{ 
              top: 'calc(100% + 12px)',
              border: '1px solid var(--border-primary)',
            }}
          >
            <div 
              style={{ 
                padding: '16px 20px',
                color: 'var(--label-tertiary)',
                borderBottom: '1px solid var(--separator-primary)',
                fontSize: '13px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              Suggestions
            </div>
            {filteredSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onMouseDown={() => handleSuggestionClick(suggestion.name)}
                className="flex items-center hover:bg-gray-50 transition-all duration-150 w-full text-left"
                style={{ 
                  padding: '14px 20px',
                  borderBottom: index < filteredSuggestions.length - 1 ? '1px solid var(--separator-primary)' : 'none',
                }}
              >
                <div 
                  className="rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-105"
                  style={{ 
                    width: '44px',
                    height: '44px',
                    marginRight: '16px',
                    backgroundColor: 'var(--surface-secondary)',
                  }}
                >
                  <MapPin className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
                </div>
                <div>
                  <div 
                    className="font-medium"
                    style={{ 
                      fontSize: '16px',
                      color: 'var(--label-primary)',
                      marginBottom: '2px',
                    }}
                  >
                    {suggestion.name}
                  </div>
                  <div 
                    style={{ 
                      fontSize: '14px',
                      color: 'var(--label-secondary)',
                    }}
                  >
                    {suggestion.location}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-2 w-full max-w-2xl">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Where to?"
            value={destination}
            onChange={(e) => setDestinationValue(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={handleSearch}>
          <Search className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <label className="block text-sm mb-2">Destination</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Where to?"
              value={destination}
              onChange={(e) => setDestinationValue(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm mb-2">Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="date"
              value={date}
              onChange={(e) => setDateValue(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex items-end">
          <Button onClick={handleSearch} className="w-full h-10" size="lg">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}