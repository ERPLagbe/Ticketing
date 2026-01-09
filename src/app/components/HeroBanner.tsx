import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setDestination } from '../store/slices/filtersSlice';
import bungeeImg from "figma:asset/0cd7c086d4b18cd5bd598ccb942bc6784ba1582e.png";
import scubaDivingImg from "figma:asset/4457214d538d4773604717d048d6b83cc443c7b7.png";

interface RecentActivity {
  id: string;
  slug: string;
  title: string;
  image: string;
  duration: string;
  rating: number;
  reviewCount: number;
}

export function HeroBanner() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.activities);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const searchContainerRef = useRef<HTMLDivElement>(null);

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
  const filteredSuggestions = searchQuery.trim() 
    ? suggestions.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : suggestions;

  const handleSearch = () => {
    if (searchQuery) {
      dispatch(setDestination(searchQuery));
    }
    navigate('/search');
    setShowSuggestions(false);
  };

  const handleSuggestionClick = (cityName: string) => {
    dispatch(setDestination(cityName));
    navigate('/search');
    setShowSuggestions(false);
    setSearchQuery('');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    // Load recent activities from local storage
    const loadRecentActivities = () => {
      try {
        const stored = localStorage.getItem('recentlyViewed');
        if (stored) {
          const parsed = JSON.parse(stored);
          // Get last 4 items
          setRecentActivities(parsed.slice(-4).reverse());
        } else {
          // Set some initial mock data if nothing exists
          const mockData = [
            {
              id: '1',
              slug: 'eiffel-tower-skip-line',
              title: 'Eiffel Tower Skip-the-Line',
              image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
              duration: '2 hours',
              rating: 4.8,
              reviewCount: 3245
            },
            {
              id: '2',
              slug: 'louvre-museum-tour',
              title: 'Louvre Museum Guided Tour',
              image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400',
              duration: '3 hours',
              rating: 4.7,
              reviewCount: 2890
            },
            {
              id: '3',
              slug: 'seine-river-cruise',
              title: 'Seine River Evening Cruise',
              image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
              duration: '1.5 hours',
              rating: 4.6,
              reviewCount: 1567
            },
            {
              id: '4',
              slug: 'versailles-palace-tour',
              title: 'Versailles Palace Day Trip',
              image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
              duration: '6 hours',
              rating: 4.9,
              reviewCount: 4123
            }
          ];
          setRecentActivities(mockData);
          localStorage.setItem('recentlyViewed', JSON.stringify(mockData));
        }
      } catch (error) {
        console.error('Error loading recent activities:', error);
      }
    };

    loadRecentActivities();

    // Listen for storage events to update when activities are viewed
    window.addEventListener('storage', loadRecentActivities);
    return () => window.removeEventListener('storage', loadRecentActivities);
  }, []);

  return (
    <>
      {/* ========== NEW ORIGINAL-STYLE HERO SECTION ========== */}
      <div 
        className="relative"
        style={{
          minHeight: '500px',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('https://images.unsplash.com/photo-1761496921386-81d399db4df9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBhaXIlMjBiYWxsb29uJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc2NzgxNTA4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          paddingTop: '100px',
          paddingBottom: '80px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Centered Title */}
          <h1 
            className="text-white text-center mb-8"
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: '1.1',
              textShadow: '0 2px 16px rgba(0, 0, 0, 0.4)',
            }}
          >
            Book tours, activities & experiences worldwide
          </h1>

          {/* Centered Search Bar */}
          <div className="max-w-2xl mx-auto mb-12" ref={searchContainerRef}>
            <div 
              className="flex items-center bg-white rounded-full shadow-2xl overflow-hidden"
              style={{ 
                border: showSuggestions ? '2px solid var(--interactive-primary)' : 'none',
                height: '56px',
              }}
            >
              <input
                type="text"
                placeholder="Find places and things to do"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                className="flex-1 outline-none px-6"
                style={{ 
                  fontSize: '15px',
                  color: 'var(--label-primary)',
                  fontFamily: 'var(--font-primary)',
                }}
              />
              <button 
                className="text-white font-medium rounded-full transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ 
                  backgroundColor: 'var(--interactive-primary)',
                  padding: '12px 32px',
                  margin: '4px',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            {/* Autocomplete Suggestions */}
            {showSuggestions && (
              <div 
                className="absolute left-0 right-0 bg-white rounded-xl shadow-2xl overflow-hidden z-50 animate-slideDown max-w-2xl mx-auto"
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
                  <Link
                    key={index}
                    to={`/search?location=${suggestion.name}`}
                    className="flex items-center hover:bg-gray-50 transition-all duration-150"
                    style={{ 
                      padding: '14px 20px',
                      borderBottom: index < filteredSuggestions.length - 1 ? '1px solid var(--separator-primary)' : 'none',
                    }}
                    onClick={() => handleSuggestionClick(suggestion.name)}
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
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Continue Planning Section */}
          {recentActivities.length > 0 && (
            <div>
              <h3 className="text-white mb-4" style={{ fontSize: '18px', fontWeight: 600 }}>
                Continue planning your trip
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {recentActivities.slice(0, 4).map((activity) => (
                  <Link 
                    key={activity.id}
                    to={`/activity/${activity.slug}`}
                    className="block bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center" style={{ padding: '12px' }}>
                      {/* Small Image on the left */}
                      <img 
                        src={activity.image}
                        alt={activity.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        style={{ marginRight: '12px' }}
                      />
                      
                      {/* Content on the right */}
                      <div className="flex-1 min-w-0">
                        <h4 
                          className="font-semibold truncate"
                          style={{ 
                            fontSize: '14px',
                            marginBottom: '4px',
                            color: 'var(--label-primary)',
                          }}
                        >
                          {activity.title}
                        </h4>
                        <div 
                          style={{ 
                            fontSize: '12px',
                            marginBottom: '6px',
                            color: 'var(--label-secondary)',
                          }}
                        >
                          {activity.duration}
                        </div>
                        <div className="flex items-center">
                          <div className="flex items-center" style={{ marginRight: '4px' }}>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-3 h-3"
                                fill={i < Math.floor(activity.rating) ? 'var(--decorative-basking-yellow)' : 'none'}
                                stroke={i < Math.floor(activity.rating) ? 'var(--decorative-basking-yellow)' : 'var(--border-primary)'}
                                strokeWidth={1.5}
                              />
                            ))}
                          </div>
                          <span 
                            className="font-medium"
                            style={{ 
                              fontSize: '12px',
                              color: 'var(--label-primary)',
                            }}
                          >
                            {activity.rating}
                          </span>
                          <span 
                            style={{ 
                              fontSize: '12px',
                              marginLeft: '4px',
                              color: 'var(--label-secondary)',
                            }}
                          >
                            ({activity.reviewCount.toLocaleString()})
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== COMMENTED OUT: PREVIOUS HERO WITH POLAROID COLLAGE ========== */}
      {/* 
      <div 
        className="relative transition-all duration-700"
        style={{
          backgroundColor: 'var(--decorative-midnight-blue)',
          minHeight: '680px',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: '100px', paddingBottom: '48px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            <div className="lg:col-span-2 text-center lg:text-left w-full">
              <h1 
                className="text-white mb-8 animate-fadeIn"
                style={{ 
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  fontWeight: 700,
                  lineHeight: '1.1',
                  textShadow: '0 2px 16px rgba(0, 0, 0, 0.2)',
                  letterSpacing: '-0.02em',
                }}
              >
                Book activities & tours worldwide
              </h1>

              <div className="w-full max-w-[400px] relative mb-8" ref={searchContainerRef}>
                <div 
                  className="flex items-center bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-200"
                  style={{ 
                    border: showSuggestions ? '2px solid var(--interactive-primary)' : 'none',
                    height: '64px',
                    boxShadow: showSuggestions ? '0 12px 32px rgba(0, 0, 0, 0.25)' : '0 8px 24px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search destinations"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                    className="flex-1 outline-none px-6"
                    style={{ 
                      fontSize: '15px',
                      color: 'var(--label-primary)',
                      fontFamily: 'var(--font-primary)',
                    }}
                  />
                  <button 
                    className="text-white font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ 
                      backgroundColor: 'var(--interactive-primary)',
                      padding: '14px 20px',
                      margin: '6px',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                    onClick={handleSearch}
                  >
                    <span className="hidden sm:inline">Search</span>
                    <Search className="w-5 h-5 sm:hidden" />
                  </button>
                </div>

                {showSuggestions && (
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
                      <Link
                        key={index}
                        to={`/search?location=${suggestion.name}`}
                        className="flex items-center hover:bg-gray-50 transition-all duration-150"
                        style={{ 
                          padding: '14px 20px',
                          borderBottom: index < filteredSuggestions.length - 1 ? '1px solid var(--separator-primary)' : 'none',
                        }}
                        onClick={() => handleSuggestionClick(suggestion.name)}
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
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {recentActivities.length > 0 && (
                <div className="w-full max-w-[400px]">
                  <div className="text-white font-semibold text-center lg:text-left" style={{ fontSize: '16px', marginBottom: '16px', opacity: 0.95 }}>
                    Continue planning your trip
                  </div>
                  <div className="flex flex-col gap-3">
                    {recentActivities.slice(0, 2).map((activity) => (
                      <Link 
                        key={activity.id}
                        to={`/activity/${activity.slug}`}
                        className="block bg-white bg-opacity-95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:bg-opacity-100 transition-all duration-300"
                      >
                        <div className="flex items-center" style={{ padding: '12px' }}>
                          <img
                            src={activity.image}
                            alt={activity.title}
                            className="rounded-lg object-cover"
                            style={{ 
                              width: '64px',
                              height: '64px',
                              marginRight: '12px',
                            }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 
                              className="font-semibold truncate"
                              style={{ 
                                fontSize: '14px',
                                marginBottom: '4px',
                                color: 'var(--label-primary)',
                              }}
                            >
                              {activity.title}
                            </h3>
                            <div 
                              style={{ 
                                fontSize: '12px',
                                marginBottom: '4px',
                                color: 'var(--label-secondary)',
                              }}
                            >
                              {activity.duration}
                            </div>
                            <div className="flex items-center">
                              <div className="flex items-center" style={{ marginRight: '4px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-3 h-3"
                                    fill={i < Math.floor(activity.rating) ? 'var(--decorative-basking-yellow)' : 'none'}
                                    stroke={i < Math.floor(activity.rating) ? 'var(--decorative-basking-yellow)' : 'var(--border-primary)'}
                                    strokeWidth={1.5}
                                  />
                                ))}
                              </div>
                              <span 
                                className="font-medium"
                                style={{ 
                                  fontSize: '12px',
                                  color: 'var(--label-primary)',
                                }}
                              >
                                {activity.rating}
                              </span>
                              <span 
                                style={{ 
                                  fontSize: '12px',
                                  marginLeft: '4px',
                                  color: 'var(--label-secondary)',
                                }}
                              >
                                ({activity.reviewCount.toLocaleString()})
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 relative hidden lg:flex items-center justify-center w-full" style={{ minHeight: '550px' }}>
              <div className="relative" style={{ width: '710px', height: '520px' }}>
                
                <div 
                  className="absolute overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: '352px',
                    height: '264px',
                    left: '0',
                    top: '0',
                    transform: 'rotate(2deg)',
                    transformOrigin: 'center center',
                    backgroundColor: 'white',
                    padding: '8px',
                    zIndex: 2,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1721418582804-95473ab2b4d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXZlciUyMGNydWlzZSUyMGJvYXR8ZW58MXx8fHwxNzY3ODk3OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="River Cruising"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div 
                  className="absolute overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: '352px',
                    height: '264px',
                    right: '0',
                    top: '0',
                    transform: 'rotate(-6deg)',
                    transformOrigin: 'center center',
                    backgroundColor: 'white',
                    padding: '8px',
                    zIndex: 3,
                  }}
                >
                  <img
                    src={scubaDivingImg}
                    alt="Scuba Diving"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div 
                  className="absolute overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: '352px',
                    height: '264px',
                    left: '0',
                    bottom: '0',
                    transform: 'rotate(-4deg)',
                    transformOrigin: 'center center',
                    backgroundColor: 'white',
                    padding: '8px',
                    zIndex: 4,
                  }}
                >
                  <img
                    src={bungeeImg}
                    alt="Bungee Jumping"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div 
                  className="absolute overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300"
                  style={{ 
                    width: '352px',
                    height: '264px',
                    right: '0',
                    bottom: '0',
                    transform: 'rotate(2deg)',
                    transformOrigin: 'center center',
                    backgroundColor: 'white',
                    padding: '8px',
                    zIndex: 1,
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1570097703229-b195d6dd291f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFaWZmZWwlMjBUb3dlciUyMFBhcmlzfGVufDF8fHx8MTc2NzgyMjAwOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Eiffel Tower"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      */}
    </>
  );
}