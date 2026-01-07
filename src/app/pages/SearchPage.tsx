import { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { setPriceRange, setRating, setDuration, setSortBy, setCategory, setDestination } from '../store/slices/filtersSlice';
import { ActivityCard } from '../components/ActivityCard';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Calendar } from '../components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '../components/ui/sheet';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import { 
  SlidersHorizontal, 
  ChevronDown,
  ChevronUp,
  Calendar as CalendarIcon,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';
import { format } from 'date-fns';

// Glossy hover effect (no continuous shimmer)
const glossyStyles = `
  .glossy-hover {
    position: relative;
    transition: all 0.3s ease;
  }

  .glossy-hover::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 40%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.15),
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: inherit;
  }

  .glossy-hover:hover::after {
    opacity: 1;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

export function SearchPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { items } = useSelector((state: RootState) => state.activities);
  const filters = useSelector((state: RootState) => state.filters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string[]>([]);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Filter expansion states
  const [priceExpanded, setPriceExpanded] = useState(true);
  const [durationExpanded, setDurationExpanded] = useState(true);
  const [ratingExpanded, setRatingExpanded] = useState(true);
  const [categoryExpanded, setCategoryExpanded] = useState(true);
  const [destinationExpanded, setDestinationExpanded] = useState(true);
  
  // Local filter states
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(filters.priceRange);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Horizontal scroll state
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Check scroll position for arrows
  const checkScroll = () => {
    if (categoryScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoryScrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollCategories = (direction: 'left' | 'right') => {
    if (categoryScrollRef.current) {
      const scrollAmount = 300;
      categoryScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScroll, 100);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const categoryTabs = [
    { id: 'all', label: 'All' },
    { id: 'Attractions & Museums', label: 'Attractions & Museums' },
    { id: 'Tours & Sightseeing', label: 'Tours & Sightseeing' },
    { id: 'Cruises & Water Tours', label: 'Cruises & Water Tours' },
    { id: 'Food & Drink', label: 'Food & Drink' },
    { id: 'Cultural & Theme Tours', label: 'Cultural & Theme Tours' },
    { id: 'Outdoor Activities', label: 'Outdoor Activities' },
    { id: 'Day Trips & Excursions', label: 'Day Trips & Excursions' },
    { id: 'Classes & Workshops', label: 'Classes & Workshops' },
  ];

  const durations = [
    { id: '0-1', label: 'Up to 1 hour', min: 0, max: 60 },
    { id: '1-4', label: '1 to 4 hours', min: 60, max: 240 },
    { id: '4-8', label: '4 to 8 hours', min: 240, max: 480 },
    { id: '8+', label: 'Full day (8+ hours)', min: 480, max: 1440 },
    { id: 'multi', label: 'Multi-day', min: 1440, max: 99999 },
  ];

  const categories = [
    'Attractions & Museums',
    'Tours & Sightseeing',
    'Cruises & Water Tours',
    'Food & Drink',
    'Cultural & Theme Tours',
    'Outdoor Activities',
    'Day Trips & Excursions',
    'Classes & Workshops',
  ];

  const ratings = [
    { value: 4.5, label: '4.5 & up' },
    { value: 4.0, label: '4.0 & up' },
    { value: 3.5, label: '3.5 & up' },
    { value: 3.0, label: '3.0 & up' },
  ];

  const destinations = [
    'Paris',
    'Rome',
    'London',
    'Barcelona',
    'Amsterdam',
    'Dubai',
    'New York',
    'Tokyo',
  ];

  const filteredActivities = useMemo(() => {
    let filtered = [...items];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(activity =>
        activity.title.toLowerCase().includes(query) ||
        activity.location.toLowerCase().includes(query) ||
        activity.category.toLowerCase().includes(query) ||
        activity.description.toLowerCase().includes(query)
      );
    }

    // Apply tab filter
    if (selectedTab.length > 0) {
      filtered = filtered.filter(activity => {
        const activityCategory = activity.category.toLowerCase();
        return selectedTab.some(tabId => {
          const tabIdLower = tabId.toLowerCase();
          return activityCategory.includes(tabIdLower) || tabIdLower.includes(activityCategory);
        });
      });
    }

    // Apply filters
    if (filters.destination) {
      filtered = filtered.filter(activity =>
        activity.location.toLowerCase().includes(filters.destination.toLowerCase())
      );
    }

    // Category filter from Redux (from HomePage)
    if (filters.category) {
      filtered = filtered.filter(activity =>
        activity.category.toLowerCase().includes(filters.category.toLowerCase()) ||
        filters.category.toLowerCase().includes(activity.category.toLowerCase())
      );
    }

    // Price filter - use localPriceRange for immediate filtering
    filtered = filtered.filter(activity =>
      activity.price >= localPriceRange[0] && activity.price <= localPriceRange[1]
    );

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(activity => activity.rating >= filters.rating);
    }

    // Duration filter
    if (selectedDurations.length > 0) {
      filtered = filtered.filter(activity => {
        // Parse duration string (e.g., "2 hours", "3.5 hours", "1 day")
        const durationStr = activity.duration.toLowerCase();
        let activityDurationMinutes = 0;
        
        // Handle different duration formats
        if (durationStr.includes('day')) {
          const days = parseFloat(durationStr);
          activityDurationMinutes = days * 24 * 60;
        } else if (durationStr.includes('hour')) {
          const hours = parseFloat(durationStr);
          activityDurationMinutes = hours * 60;
        } else if (durationStr.includes('min')) {
          activityDurationMinutes = parseFloat(durationStr);
        } else {
          // Default to 2 hours if unable to parse
          activityDurationMinutes = 120;
        }
        
        return selectedDurations.some(durationId => {
          const duration = durations.find(d => d.id === durationId);
          if (!duration) return false;
          return activityDurationMinutes >= duration.min && activityDurationMinutes <= duration.max;
        });
      });
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(activity =>
        selectedCategories.some(cat => 
          activity.category.toLowerCase().includes(cat.toLowerCase()) ||
          cat.toLowerCase().includes(activity.category.toLowerCase())
        )
      );
    }

    // Date range filter
    if (dateRange.from) {
      filtered = filtered.filter(activity => {
        if (!activity.availability) return true; // If no availability data, show the activity
        
        const selectedStart = dateRange.from!;
        const selectedEnd = dateRange.to || dateRange.from!;
        const availStart = new Date(activity.availability.startDate);
        const availEnd = new Date(activity.availability.endDate);
        
        // Check if selected date range overlaps with availability
        return selectedStart <= availEnd && selectedEnd >= availStart;
      });
    }

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return filtered;
  }, [items, filters, selectedTab, selectedCategories, localPriceRange, selectedDurations, dateRange, searchQuery]);

  const handleApplyFilters = () => {
    dispatch(setPriceRange(localPriceRange));
    setMobileFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setLocalPriceRange([0, 500]);
    dispatch(setPriceRange([0, 500]));
    dispatch(setRating(0));
    dispatch(setSortBy('popular'));
    dispatch(setCategory(''));
    dispatch(setDestination(''));
    setSelectedDurations([]);
    setSelectedCategories([]);
    setDateRange({});
    setSelectedTab([]);
  };

  const FiltersContent = () => (
    <div className="space-y-0">
      {/* Destination */}
      <Collapsible open={destinationExpanded} onOpenChange={setDestinationExpanded}>
        <div 
          className="py-4 px-6"
          style={{ borderBottom: '1px solid var(--border-primary)' }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
              Destination
            </h3>
            {destinationExpanded ? (
              <ChevronUp className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            ) : (
              <ChevronDown className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            {destinations.map((destination) => (
              <div key={destination} className="flex items-center gap-3">
                <Checkbox
                  id={`destination-${destination}`}
                  checked={filters.destination === destination}
                  onCheckedChange={(checked) => {
                    dispatch(setDestination(checked ? destination : ''));
                  }}
                />
                <label
                  htmlFor={`destination-${destination}`}
                  className="cursor-pointer flex-1"
                  style={{ fontSize: '15px', color: 'var(--label-primary)' }}
                >
                  {destination}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Price Range */}
      <Collapsible open={priceExpanded} onOpenChange={setPriceExpanded}>
        <div 
          className="py-4 px-6"
          style={{ borderBottom: '1px solid var(--border-primary)' }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
              Price range
            </h3>
            {priceExpanded ? (
              <ChevronUp className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            ) : (
              <ChevronDown className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <Slider
              min={0}
              max={500}
              step={10}
              value={localPriceRange}
              onValueChange={(value) => setLocalPriceRange(value as [number, number])}
              className="mb-4"
            />
            <div className="flex items-center justify-between">
              <div 
                className="px-3 py-2 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--fill-accent)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--label-primary)', fontWeight: 600 }}>
                  ${localPriceRange[0]}
                </span>
              </div>
              <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>to</span>
              <div 
                className="px-3 py-2 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--fill-accent)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <span style={{ fontSize: '14px', color: 'var(--label-primary)', fontWeight: 600 }}>
                  ${localPriceRange[1]}
                </span>
              </div>
            </div>
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Duration */}
      <Collapsible open={durationExpanded} onOpenChange={setDurationExpanded}>
        <div 
          className="py-4 px-6"
          style={{ borderBottom: '1px solid var(--border-primary)' }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
              Duration
            </h3>
            {durationExpanded ? (
              <ChevronUp className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            ) : (
              <ChevronDown className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            {durations.map((duration) => (
              <div key={duration.id} className="flex items-center gap-3">
                <Checkbox
                  id={`duration-${duration.id}`}
                  checked={selectedDurations.includes(duration.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedDurations([...selectedDurations, duration.id]);
                    } else {
                      setSelectedDurations(selectedDurations.filter(d => d !== duration.id));
                    }
                  }}
                />
                <label
                  htmlFor={`duration-${duration.id}`}
                  className="cursor-pointer flex-1"
                  style={{ fontSize: '15px', color: 'var(--label-primary)' }}
                >
                  {duration.label}
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>

      {/* Rating */}
      <Collapsible open={ratingExpanded} onOpenChange={setRatingExpanded}>
        <div 
          className="py-4 px-6"
          style={{ borderBottom: '1px solid var(--border-primary)' }}
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full">
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
              Rating
            </h3>
            {ratingExpanded ? (
              <ChevronUp className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            ) : (
              <ChevronDown className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 space-y-3">
            {ratings.map((rating) => (
              <div key={rating.value} className="flex items-center gap-3">
                <Checkbox
                  id={`rating-${rating.value}`}
                  checked={filters.rating === rating.value}
                  onCheckedChange={(checked) => {
                    dispatch(setRating(checked ? rating.value : 0));
                  }}
                />
                <label
                  htmlFor={`rating-${rating.value}`}
                  className="cursor-pointer flex items-center gap-2 flex-1"
                  style={{ fontSize: '15px', color: 'var(--label-primary)' }}
                >
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{rating.label}</span>
                  </div>
                </label>
              </div>
            ))}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );

  // Sync Redux category filter with local selectedCategories on mount and when filters.category changes
  useEffect(() => {
    if (filters.category) {
      // Find matching category in sidebar categories list
      const matchingCategory = categories.find(cat => 
        cat.toLowerCase().includes(filters.category.toLowerCase()) ||
        filters.category.toLowerCase().includes(cat.toLowerCase())
      );
      
      if (matchingCategory && !selectedCategories.includes(matchingCategory)) {
        setSelectedCategories([matchingCategory]);
        // Expand category section when auto-selected
        setCategoryExpanded(true);
      }

      // Also sync with the category tabs in the filter bar
      const matchingTab = categoryTabs.find(tab => 
        tab.id !== 'all' && (
          tab.id.toLowerCase().includes(filters.category.toLowerCase()) ||
          filters.category.toLowerCase().includes(tab.id.toLowerCase())
        )
      );
      
      if (matchingTab && !selectedTab.includes(matchingTab.id)) {
        setSelectedTab([matchingTab.id]);
      }
    }
  }, [filters.category]);

  // Read URL parameters on mount and apply filters
  useEffect(() => {
    const category = searchParams.get('category');
    const location = searchParams.get('location');
    
    if (category) {
      dispatch(setCategory(category));
    }
    
    if (location) {
      dispatch(setDestination(location));
    }
  }, [searchParams, dispatch]);

  // Remove individual filter
  const removeDestination = () => {
    dispatch(setDestination(''));
  };

  const removeCategory = () => {
    dispatch(setCategory(''));
    setSelectedCategories([]);
  };

  const removeRating = () => {
    dispatch(setRating(0));
  };

  return (
    <div className="bg-white" style={{ paddingTop: '64px' }}>
      <style>{glossyStyles}</style>
      
      {/* Combined Title + Search Section */}
      <div 
        className="border-b"
        style={{ 
          borderColor: 'var(--border-primary)',
          backgroundColor: 'white',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Title and Search Bar Row */}
          <div className="flex items-center justify-between gap-4">
            {/* Title */}
            <h1 className="flex-shrink-0">
              All Destinations
            </h1>

            {/* Right Side Controls Group */}
            <div className="flex items-center gap-2">
              {/* Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for activities..."
                  className="w-64 h-10 px-4 pr-10 rounded-lg transition-all"
                  style={{
                    border: '1px solid var(--border-primary)',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    color: 'var(--label-primary)',
                  }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'var(--interactive-primary)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 123, 255, 0.1)';
                    setShowSuggestions(true);
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border-primary)';
                    e.target.style.boxShadow = 'none';
                    setTimeout(() => setShowSuggestions(false), 200);
                  }}
                />
                <div 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  style={{ color: 'var(--label-secondary)' }}
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 20 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                
                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery && (
                  <div 
                    className="absolute z-20 mt-2 w-full bg-white rounded-lg shadow-lg overflow-hidden"
                    style={{
                      border: '1px solid var(--border-primary)',
                      maxHeight: '400px',
                      overflowY: 'auto',
                    }}
                  >
                    {filteredActivities.length > 0 ? (
                      <div>
                        {filteredActivities.slice(0, 5).map((activity) => (
                          <button
                            key={activity.id}
                            onMouseDown={() => {
                              navigate(`/activity/${activity.slug}`);
                              setShowSuggestions(false);
                              setSearchQuery('');
                            }}
                            className="w-full px-4 py-3 hover:bg-gray-50 flex items-start gap-3 text-left transition-colors"
                            style={{ borderBottom: '1px solid var(--border-primary)' }}
                          >
                            <img 
                              src={activity.image}
                              alt={activity.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', marginBottom: '4px' }}>
                                {activity.title}
                              </div>
                              <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                                {activity.location} • ${activity.price}
                              </div>
                            </div>
                          </button>
                        ))}
                        {filteredActivities.length > 5 && (
                          <div 
                            className="px-4 py-2 text-center"
                            style={{ 
                              fontSize: '13px',
                              color: 'var(--label-secondary)',
                              backgroundColor: 'var(--fill-accent)',
                            }}
                          >
                            +{filteredActivities.length - 5} more results
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="px-4 py-8 text-center" style={{ color: 'var(--label-secondary)' }}>
                        No activities found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Date Picker */}
              <Popover open={dateDialogOpen} onOpenChange={setDateDialogOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 px-4 h-10 rounded-lg whitespace-nowrap transition-all duration-200 glossy-hover"
                    style={{
                      backgroundColor: dateRange.from ? 'var(--fill-accent)' : 'transparent',
                      border: `1px solid ${dateRange.from ? 'var(--interactive-primary)' : 'var(--border-primary)'}`,
                      color: dateRange.from ? 'var(--interactive-primary)' : 'var(--label-primary)',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    <CalendarIcon className="w-4 h-4" />
                    <span style={{ position: 'relative', zIndex: 2 }}>
                      {dateRange.from ? (
                        dateRange.to ? (
                          `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}`
                        ) : (
                          format(dateRange.from, 'MMM d, yyyy')
                        )
                      ) : (
                        'Dates'
                      )}
                    </span>
                    {dateRange.from && (
                      <X
                        className="w-4 h-4 ml-1"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDateRange({});
                        }}
                      />
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={(range: any) => {
                      setDateRange(range || {});
                      if (range?.from && range?.to) {
                        setDateDialogOpen(false);
                      }
                    }}
                    numberOfMonths={1}
                    className="rounded-md"
                  />
                </PopoverContent>
              </Popover>

              {/* Filters Button */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 px-4 h-10 glossy-hover"
                    style={{
                      border: '1px solid var(--border-primary)',
                      color: 'var(--label-primary)',
                      fontWeight: 600,
                      fontSize: '14px',
                    }}
                  >
                    <SlidersHorizontal className="w-4 h-4" style={{ position: 'relative', zIndex: 2 }} />
                    <span style={{ position: 'relative', zIndex: 2 }}>Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent 
                  side="right" 
                  className="w-full sm:max-w-md p-0 flex flex-col"
                  style={{ backgroundColor: 'white' }}
                >
                  <SheetHeader 
                    className="px-6 py-4 flex-shrink-0 glossy" 
                    style={{ borderBottom: '1px solid var(--border-primary)' }}
                  >
                    <SheetTitle style={{ fontSize: '20px', fontWeight: 700, position: 'relative', zIndex: 2 }}>Filters</SheetTitle>
                    <SheetDescription className="sr-only">
                      Filter activities by price, duration, rating, category, and cancellation policy
                    </SheetDescription>
                  </SheetHeader>
                  
                  {/* Scrollable Content */}
                  <div className="flex-1 overflow-y-auto">
                    <FiltersContent />
                  </div>

                  {/* Footer with Apply/Clear buttons */}
                  <div 
                    className="flex items-center gap-3 p-6 flex-shrink-0 glossy"
                    style={{ 
                      borderTop: '1px solid var(--border-primary)',
                      backgroundColor: 'white',
                    }}
                  >
                    <Button
                      variant="outline"
                      onClick={handleClearFilters}
                      className="flex-1 glossy-hover"
                      style={{
                        border: '1px solid var(--border-primary)',
                        color: 'var(--label-primary)',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 2 }}>Clear all</span>
                    </Button>
                    <Button
                      onClick={handleApplyFilters}
                      className="flex-1 glossy-hover"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ position: 'relative', zIndex: 2 }}>Show results</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Tabs - Compact */}
      <div 
        className="border-b sticky top-[64px] bg-white z-10"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative py-2">
            {/* Left Arrow */}
            {showLeftArrow && (
              <button
                onClick={() => scrollCategories('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                style={{ border: '1px solid var(--border-primary)' }}
              >
                <ChevronLeft className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
              </button>
            )}

            {/* Scrollable Categories Container */}
            <div 
              ref={categoryScrollRef}
              onScroll={checkScroll}
              className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth"
              style={{ 
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: showLeftArrow ? '40px' : '0',
                paddingRight: showRightArrow ? '40px' : '0',
              }}
            >
              {/* All Button */}
              <button
                onClick={() => setSelectedTab([])}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 glossy-hover flex-shrink-0"
                style={{
                  backgroundColor: selectedTab.length === 0 ? 'var(--fill-accent)' : 'transparent',
                  border: `1px solid ${selectedTab.length === 0 ? 'var(--interactive-primary)' : 'var(--border-primary)'}`,
                  color: selectedTab.length === 0 ? 'var(--interactive-primary)' : 'var(--label-primary)',
                  fontWeight: 600,
                  fontSize: '13px',
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>All</span>
              </button>

              {/* All Category Tabs */}
              {categoryTabs.filter(tab => tab.id !== 'all').map((tab) => {
                const isSelected = selectedTab.includes(tab.id);
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedTab(selectedTab.filter(t => t !== tab.id));
                        dispatch(setCategory(''));
                        setSelectedCategories([]);
                      } else {
                        setSelectedTab([...selectedTab, tab.id]);
                      }
                    }}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full whitespace-nowrap transition-all duration-200 glossy-hover flex-shrink-0"
                    style={{
                      backgroundColor: isSelected ? 'var(--fill-accent)' : 'transparent',
                      border: `1px solid ${isSelected ? 'var(--interactive-primary)' : 'var(--border-primary)'}`,
                      color: isSelected ? 'var(--interactive-primary)' : 'var(--label-primary)',
                      fontWeight: 600,
                      fontSize: '13px',
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>{tab.label}</span>
                    {isSelected && (
                      <X
                        className="w-3.5 h-3.5"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTab(selectedTab.filter(t => t !== tab.id));
                          dispatch(setCategory(''));
                          setSelectedCategories([]);
                        }}
                        style={{ position: 'relative', zIndex: 2 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Arrow */}
            {showRightArrow && (
              <button
                onClick={() => scrollCategories('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                style={{ border: '1px solid var(--border-primary)' }}
              >
                <ChevronRight className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
              </button>
            )}
          </div>

          {/* Inline Active Filters Bar - Moved below categories */}
          <div className="flex items-center justify-between gap-4 pb-3 border-t" style={{ borderColor: 'var(--border-primary)', paddingTop: '12px' }}>
          {/* Left: Active Filters + Results Count */}
          <div className="flex items-center gap-3 flex-wrap flex-1 min-w-0">
            {/* Results Count */}
            <div style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
              <span style={{ fontWeight: 600 }}>{filteredActivities.length}</span> results
            </div>

            {/* Show separator and active filters only if there are any */}
            {(filters.destination || 
              filters.rating > 0 || 
              selectedTab.length > 0 || 
              dateRange.from || 
              selectedDurations.length > 0 ||
              (localPriceRange[0] > 0 || localPriceRange[1] < 500)) && (
              <>
                <div style={{ width: '1px', height: '20px', backgroundColor: 'var(--border-primary)' }} />
                
                {/* Active Filters Label */}
                <span style={{ fontSize: '14px', color: 'var(--label-secondary)', fontWeight: 600 }}>
                  Active Filters:
                </span>
                
                {/* Destination Filter */}
                {filters.destination && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeDestination();
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--interactive-primary)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>{filters.destination}</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                
                {/* Category Filters from Tabs */}
                {selectedTab.map((tabId) => {
                  const tab = categoryTabs.find(t => t.id === tabId);
                  if (!tab) return null;
                  return (
                    <button
                      key={tabId}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedTab(selectedTab.filter(t => t !== tabId));
                        if (selectedTab.length === 1) {
                          dispatch(setCategory(''));
                          setSelectedCategories([]);
                        }
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <span>{tab.label}</span>
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                
                {/* Date Range Filter */}
                {dateRange.from && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDateRange({});
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--interactive-primary)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <CalendarIcon className="w-3 h-3" />
                    <span>
                      {dateRange.to 
                        ? `${format(dateRange.from, 'MMM d')} - ${format(dateRange.to, 'MMM d')}`
                        : format(dateRange.from, 'MMM d, yyyy')}
                    </span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                
                {/* Price Range Filter */}
                {(localPriceRange[0] > 0 || localPriceRange[1] < 500) && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setLocalPriceRange([0, 500]);
                      dispatch(setPriceRange([0, 500]));
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--interactive-primary)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <span>${localPriceRange[0]} - ${localPriceRange[1]}</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                
                {/* Duration Filters */}
                {selectedDurations.map((durationId) => {
                  const duration = durations.find(d => d.id === durationId);
                  if (!duration) return null;
                  return (
                    <button
                      key={durationId}
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedDurations(selectedDurations.filter(d => d !== durationId));
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                      style={{
                        backgroundColor: 'var(--interactive-primary)',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <span>{duration.label}</span>
                      <X className="w-3 h-3" />
                    </button>
                  );
                })}
                
                {/* Rating Filter */}
                {filters.rating > 0 && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeRating();
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-all duration-200 hover:opacity-80"
                    style={{
                      backgroundColor: 'var(--interactive-primary)',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    <Star className="w-3 h-3 fill-white text-white" />
                    <span>{filters.rating}+</span>
                    <X className="w-3 h-3" />
                  </button>
                )}
                
                {/* Clear All Button */}
                <button
                  onClick={handleClearFilters}
                  className="text-sm transition-colors hover:underline"
                  style={{
                    color: 'var(--interactive-primary)',
                    fontWeight: 600,
                  }}
                >
                  Clear all
                </button>
              </>
            )}
          </div>

          {/* Right: Sort By */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>Sort by:</span>
            <Select
              value={filters.sortBy}
              onValueChange={(value) => dispatch(setSortBy(value as any))}
            >
              <SelectTrigger 
                className="w-[160px] border-none"
                style={{
                  fontWeight: 600,
                  color: 'var(--label-primary)',
                }}
              >
                <SelectValue placeholder="Recommended" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Activity Grid with reduced gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--label-secondary)' }}>
              No experiences found. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}