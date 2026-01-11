import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedActivity, ActivityOption } from '../store/slices/activitiesSlice';
import { addToCart, openCartDrawer } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Star, Clock, MapPin, ChevronRight, Heart, Share2, X, ChevronLeft, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ReviewsSection } from '../components/ReviewsSection';

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
    height: 50%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.2),
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

  .image-glossy {
    position: relative;
    overflow: hidden;
  }

  .image-glossy::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%!important;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.3) 50%,
      transparent 100%
    );
    transition: left 0.6s ease;
    pointer-events: none;
    z-index: 1;
  }

  .image-glossy:hover::before {
    left: 100%;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .details-content h2 {
    font-size: 24px;
    font-weight: 700;
    color: var(--label-primary);
    margin-bottom: 16px;
    margin-top: 32px;
  }

  .details-content h2:first-child {
    margin-top: 0;
  }

  .details-content p {
    font-size: 15px;
    line-height: 24px;
    color: var(--label-secondary);
    margin-bottom: 16px;
  }

  .details-content ul {
    list-style: none;
    padding: 0;
    margin: 16px 0;
  }

  .details-content ul li {
    display: flex;
    align-items: start;
    gap: 12px;
    margin-bottom: 8px;
    font-size: 15px;
    color: var(--label-primary);
  }

  .details-content ul li::before {
    content: '';
    width: 6px;
    height: 6px;
    background-color: var(--label-primary);
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 8px;
  }

  .details-content strong {
    font-weight: 700;
    color: var(--label-primary);
  }
`;

export function ActivityDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedActivity } = useSelector((state: RootState) => state.activities);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<ActivityOption | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bookingDate, setBookingDate] = useState<Date>();
  const [isDatePopoverOpen, setIsDatePopoverOpen] = useState(false);
  const [showPackageOptionDropdown, setShowPackageOptionDropdown] = useState(false);

  // Sync selectedDate from Check Availability to booking card
  useEffect(() => {
    if (selectedDate) {
      setBookingDate(selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (slug) {
      dispatch(setSelectedActivity(slug));
    }
  }, [slug, dispatch]);

  // Save to recently viewed
  useEffect(() => {
    if (selectedActivity) {
      try {
        const stored = localStorage.getItem('recentlyViewed');
        let recentlyViewed = stored ? JSON.parse(stored) : [];
        
        recentlyViewed = recentlyViewed.filter((item: any) => item.id !== selectedActivity.id);
        
        recentlyViewed.push({
          id: selectedActivity.id,
          slug: selectedActivity.slug,
          title: selectedActivity.title,
          image: selectedActivity.image,
          duration: selectedActivity.duration,
          rating: selectedActivity.rating,
          reviewCount: selectedActivity.reviewCount,
        });
        
        if (recentlyViewed.length > 10) {
          recentlyViewed = recentlyViewed.slice(-10);
        }
        
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      } catch (error) {
        console.error('Error saving to recently viewed:', error);
      }
    }
  }, [selectedActivity]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (!selectedActivity?.isTourPackage && !bookingDate) {
      toast.error('Please select a date');
      return;
    }

    if (!selectedOption) {
      toast.error('Please select a package option');
      return;
    }

    const totalGuests = adults + children + infants;
    if (totalGuests === 0) {
      toast.error('Please select at least one traveler');
      return;
    }

    // For tour packages, use a placeholder date
    const selectedDate = bookingDate || new Date();

    dispatch(addToCart({
      activityId: selectedActivity!.id,
      activityTitle: selectedActivity!.title,
      startDate: format(selectedDate, 'yyyy-MM-dd'),
      endDate: format(selectedDate, 'yyyy-MM-dd'),
      adults,
      children,
      infants,
      price: selectedOption.offerPrice || selectedOption.price,
      image: selectedActivity!.image,
      isTourPackage: selectedActivity!.isTourPackage,
      packageOption: {
        id: selectedOption.id,
        title: selectedOption.title,
        timeSlot: selectedOption.timeSlot,
      },
    }));

    toast.success('Added to cart!');
  };

  const handleBookNow = () => {
    if (!selectedActivity?.isTourPackage && !bookingDate) {
      toast.error('Please select a date');
      return;
    }

    if (!selectedOption) {
      toast.error('Please select a package option');
      return;
    }

    const totalGuests = adults + children + infants;
    if (totalGuests === 0) {
      toast.error('Please select at least one traveler');
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please sign in to continue', {
        description: 'You need to be logged in to book activities',
      });
      // Navigate to login page with return URL
      navigate('/login?redirect=/checkout');
      return;
    }

    // For tour packages, use a placeholder date
    const selectedDate = bookingDate || new Date();

    dispatch(addToCart({
      activityId: selectedActivity!.id,
      activityTitle: selectedActivity!.title,
      startDate: format(selectedDate, 'yyyy-MM-dd'),
      endDate: format(selectedDate, 'yyyy-MM-dd'),
      adults,
      children,
      infants,
      price: selectedOption.offerPrice || selectedOption.price,
      image: selectedActivity!.image,
      isTourPackage: selectedActivity!.isTourPackage,
      packageOption: {
        id: selectedOption.id,
        title: selectedOption.title,
        timeSlot: selectedOption.timeSlot,
      },
    }));

    toast.success('Added to cart!', {
      description: 'Redirecting to checkout...',
    });

    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  const handleSelectOption = (option: ActivityOption) => {
    // Toggle: if clicking the same option, unselect it
    if (selectedOption?.id === option.id) {
      setSelectedOption(null);
      return;
    }
    
    setSelectedOption(option);
    // Scroll to booking card
    const bookingCard = document.getElementById('booking-card');
    if (bookingCard) {
      bookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // If no date selected in booking card but we have one in Check Availability, use it
    if (!bookingDate && selectedDate) {
      setBookingDate(selectedDate);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: selectedActivity?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  // Get available dates for the selected option
  const getAvailableDates = () => {
    if (!selectedOption) return [];
    return selectedOption.availableDates.map(dateStr => new Date(dateStr));
  };

  // Filter options based on selected date
  const getAvailableOptionsForDate = (date: Date | null) => {
    if (!selectedActivity) return [];
    if (!date) return selectedActivity.options;
    
    const dateStr = format(date, 'yyyy-MM-dd');
    return selectedActivity.options.filter(option => 
      option.availableDates.includes(dateStr)
    );
  };

  const availableOptions = getAvailableOptionsForDate(bookingDate || null);

  // Calculate total price
  const currentPrice = selectedOption ? (selectedOption.offerPrice || selectedOption.price) : selectedActivity?.price || 0;
  const totalPrice = currentPrice * (adults + children + infants);

  // Check if a date has any available options
  const isDateAvailable = (date: Date) => {
    if (!selectedActivity) return false;
    const dateStr = format(date, 'yyyy-MM-dd');
    return selectedActivity.options.some(option => 
      option.availableDates.includes(dateStr)
    );
  };

  // Get next 7 days for quick selection
  const getNext7Days = () => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const next7Days = getNext7Days();

  if (!selectedActivity) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p style={{ color: 'var(--label-secondary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{glossyStyles}</style>
      
      {/* Full Screen Photo Gallery Modal */}
      {showAllPhotos && (
        <div 
          className="fixed inset-0 z-50 bg-black flex flex-col"
          onClick={() => setShowAllPhotos(false)}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/80">
            <div className="text-white">
              <h3 className="font-semibold">{selectedActivity.title}</h3>
              <p className="text-sm text-white/70">
                {selectedImage + 1} / {selectedActivity.images.length}
              </p>
            </div>
            <button
              onClick={() => setShowAllPhotos(false)}
              className="text-white hover:text-white/70 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedActivity.images[selectedImage]}
              alt={`${selectedActivity.title} ${selectedImage + 1}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Navigation Arrows */}
          {selectedImage > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage - 1);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          
          {selectedImage < selectedActivity.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Thumbnail Strip */}
          <div className="bg-black/80 p-4 overflow-x-auto">
            <div className="flex gap-2 justify-center">
              {selectedActivity.images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all ${
                    index === selectedImage ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white" style={{ paddingTop: '16px' }}>
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--label-secondary)' }}>
            <Link to="/" className="hover:underline cursor-pointer">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/search" className="hover:underline cursor-pointer">{selectedActivity.destination}</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--label-primary)' }}>Activities</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-xl overflow-hidden h-[300px] sm:h-[400px]">
            {/* Main Image */}
            <button
              onClick={() => {
                setSelectedImage(0);
                setShowAllPhotos(true);
              }}
              className="col-span-2 row-span-2 relative group cursor-pointer image-glossy"
            >
              <img
                src={selectedActivity.images[0]}
                alt={selectedActivity.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>

            {/* Secondary Images */}
            <button
              onClick={() => {
                setSelectedImage(1);
                setShowAllPhotos(true);
              }}
              className="relative group cursor-pointer image-glossy hidden md:block"
            >
              <img
                src={selectedActivity.images[1] || selectedActivity.image}
                alt={`${selectedActivity.title} 2`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>

            <button
              onClick={() => {
                setSelectedImage(2);
                setShowAllPhotos(true);
              }}
              className="relative group cursor-pointer image-glossy hidden md:block"
            >
              <img
                src={selectedActivity.images[2] || selectedActivity.image}
                alt={`${selectedActivity.title} 3`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>

            <button
              onClick={() => {
                setSelectedImage(1);
                setShowAllPhotos(true);
              }}
              className="relative group cursor-pointer image-glossy hidden md:block"
            >
              <img
                src={selectedActivity.images[1] || selectedActivity.image}
                alt={`${selectedActivity.title} 4`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>

            <button
              onClick={() => setShowAllPhotos(true)}
              className="relative group cursor-pointer image-glossy hidden md:block"
            >
              <img
                src={selectedActivity.images[2] || selectedActivity.image}
                alt={`${selectedActivity.title} 5`}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                  selectedActivity.images.length > 5 ? 'brightness-75 group-hover:brightness-90' : ''
                }`}
              />
              {selectedActivity.images.length > 5 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    +{selectedActivity.images.length - 5} photos
                  </span>
                </div>
              )}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handleShare}
              className="flex items-center gap-1 sm:gap-2 glossy-hover text-xs sm:text-sm px-3 sm:px-4"
              style={{
                border: '1px solid var(--border-primary)',
                color: 'var(--label-primary)',
              }}
            >
              <Share2 className="w-4 h-4" style={{ position: 'relative', zIndex: 2 }} />
              <span className="hidden sm:inline" style={{ position: 'relative', zIndex: 2 }}>Share</span>
            </Button>
            <Button
              variant="outline"
              onClick={handleWishlist}
              className="flex items-center gap-1 sm:gap-2 glossy-hover text-xs sm:text-sm px-3 sm:px-4"
              style={{
                border: '1px solid var(--border-primary)',
                color: isWishlisted ? '#ef4444' : 'var(--label-primary)',
              }}
            >
              <Heart 
                className={`w-4 h-4 ${isWishlisted ? 'fill-red-500' : ''}`}
                style={{ position: 'relative', zIndex: 2 }}
              />
              <span className="hidden sm:inline" style={{ position: 'relative', zIndex: 2 }}>
                {isWishlisted ? 'Saved' : 'Save'}
              </span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {selectedActivity.isTourPackage && (
                    <span 
                      className="px-3 py-1 rounded-full text-sm font-bold"
                      style={{
                        backgroundColor: '#FF4905',
                        color: 'white',
                      }}
                    >
                      TOUR PACKAGE
                    </span>
                  )}
                  <span 
                    className="px-3 py-1 rounded-full text-sm font-semibold"
                    style={{
                      backgroundColor: 'var(--fill-accent)',
                      color: 'var(--interactive-primary)',
                    }}
                  >
                    {selectedActivity.category}
                  </span>
                </div>

                <h1 className="mb-4">{selectedActivity.title}</h1>

                <div className="flex items-center gap-3 sm:gap-6 flex-wrap text-sm sm:text-base" style={{ color: 'var(--label-secondary)' }}>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                    <span style={{ fontWeight: 700, color: 'var(--label-primary)' }}>
                      {selectedActivity.rating}
                    </span>
                    <span className="hidden sm:inline">({selectedActivity.reviewCount.toLocaleString()} reviews)</span>
                    <span className="sm:hidden">({selectedActivity.reviewCount > 999 ? `${(selectedActivity.reviewCount / 1000).toFixed(1)}k` : selectedActivity.reviewCount})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{selectedActivity.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{selectedActivity.destination}</span>
                  </div>
                </div>
              </div>

              {/* Details Content (Rich Text HTML) */}
              <div>
                <div 
                  className="details-content"
                  dangerouslySetInnerHTML={{ __html: selectedActivity.details }}
                />
              </div>

              {/* Location */}
              <div>
                <h2 
                  style={{ 
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                    marginBottom: '16px',
                  }}
                >
                  Location
                </h2>
                <p style={{ fontSize: '15px', color: 'var(--label-secondary)', marginBottom: '12px' }}>
                  {selectedActivity.location}
                </p>
                {selectedActivity.locationMapUrl && (
                  <a 
                    href={selectedActivity.locationMapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 underline hover:no-underline transition-all"
                    style={{ 
                      color: 'var(--interactive-primary)',
                      fontWeight: 600,
                      fontSize: '15px',
                      marginBottom: '16px',
                      display: 'inline-flex',
                    }}
                  >
                    Open in Google Maps
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
                {selectedActivity.locationMapUrl && (
                  <div 
                    className="rounded-xl overflow-hidden border mt-4"
                    style={{ 
                      border: '1px solid var(--border-primary)',
                      height: '400px',
                    }}
                  >
                    <iframe
                      src={(() => {
                        // Extract query from Google Maps URL
                        const url = selectedActivity.locationMapUrl;
                        const queryMatch = url.match(/[?&]query=([^&]+)/);
                        const query = queryMatch ? decodeURIComponent(queryMatch[1]) : selectedActivity.location;
                        // Use Google Maps embed-friendly format
                        return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
                      })()}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Activity Location Map"
                    />
                  </div>
                )}
              </div>

              {/* Package Options / Check Availability Section */}
              <div>
                <h2 
                  style={{ 
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                    marginBottom: '24px',
                  }}
                >
                  {selectedActivity?.isTourPackage ? 'Package Options' : 'Check availability'}
                </h2>

                {/* Date Selector - 7 Days Grid (Hidden for Tour Packages) */}
                {!selectedActivity?.isTourPackage && (
                  <div className="mb-6">
                  <div className="grid grid-cols-8 gap-2">
                    {next7Days.map((date, index) => {
                      const isSelected = selectedDate && format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
                      const available = isDateAvailable(date);
                      
                      return (
                        <button
                          key={index}
                          onClick={() => {
                            if (available) {
                              // Toggle: if already selected, unselect it
                              if (isSelected) {
                                setSelectedDate(null);
                                setBookingDate(undefined);
                              } else {
                                setSelectedDate(date);
                                setBookingDate(date);
                              }
                            }
                          }}
                          disabled={!available}
                          className="p-3 rounded-xl text-center transition-all duration-200 cursor-pointer"
                          style={{
                            border: isSelected ? '2px solid var(--interactive-primary)' : '1px solid var(--border-primary)',
                            backgroundColor: isSelected ? 'var(--fill-accent)' : available ? 'white' : '#f5f5f5',
                            opacity: available ? 1 : 0.5,
                            cursor: available ? 'pointer' : 'not-allowed',
                          }}
                        >
                          <div style={{ fontSize: '12px', color: 'var(--label-secondary)', marginBottom: '4px' }}>
                            {format(date, 'EEE')}
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: 700, color: available ? 'var(--label-primary)' : 'var(--label-secondary)' }}>
                            {format(date, 'd')}
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                            {format(date, 'MMM')}
                          </div>
                        </button>
                      );
                    })}
                    
                    {/* Calendar Picker Button */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          className="p-3 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer hover:bg-gray-50"
                          style={{
                            border: '1px solid var(--border-primary)',
                            backgroundColor: 'white',
                          }}
                        >
                          <CalendarIcon className="w-6 h-6" style={{ color: 'var(--label-primary)' }} />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="end">
                        <Calendar
                          mode="single"
                          selected={selectedDate || undefined}
                          onSelect={(date: Date | undefined) => {
                            setSelectedDate(date || null);
                            setBookingDate(date);
                          }}
                          disabled={(date) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            if (date < today) return true;
                            return !isDateAvailable(date);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                )}

                {/* Available Options Count (Hidden for Tour Packages) */}
                {!selectedActivity?.isTourPackage && selectedDate && (
                  <div className="mb-4">
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      {availableOptions.length} option{availableOptions.length !== 1 ? 's' : ''} available
                    </p>
                  </div>
                )}

                {/* Package Options - Always shown for Tour Packages, filtered by date for regular activities */}
                {(selectedActivity?.isTourPackage ? selectedActivity.options : availableOptions).length > 0 ? (
                  <div className="space-y-4">
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                      {selectedActivity?.isTourPackage ? 'Select your package' : 'Available options'}
                    </label>
                    {(selectedActivity?.isTourPackage ? selectedActivity.options : availableOptions).map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleSelectOption(option)}
                        className={`p-4 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                          selectedOption?.id === option.id ? 'ring-2 ring-blue-500' : ''
                        }`}
                        style={{
                          border: '1px solid var(--border-primary)',
                          ...(selectedOption?.id === option.id && { backgroundColor: 'var(--fill-accent)' }),
                        }}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)', marginBottom: '8px' }}>
                              {option.title}
                            </h4>
                            <p style={{ fontSize: '14px', color: 'var(--label-secondary)', lineHeight: '20px', marginBottom: '12px' }}>
                              {option.description}
                            </p>

                            <div className="flex items-center gap-4 flex-wrap text-sm" style={{ color: 'var(--label-secondary)' }}>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{option.duration}</span>
                              </div>
                              <div>
                                Time: <strong style={{ color: 'var(--label-primary)' }}>{option.timeSlot}</strong>
                              </div>
                              <div>
                                Guide: <strong style={{ color: 'var(--label-primary)' }}>{option.guide}</strong>
                              </div>
                              <div>
                                <span style={{ 
                                  color: option.slotsLeft <= 5 ? '#ef4444' : 'var(--label-secondary)',
                                  fontWeight: option.slotsLeft <= 5 ? 700 : 400
                                }}>
                                  {option.slotsLeft} spots left
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right flex-shrink-0">
                            {option.offerPrice ? (
                              <>
                                <div style={{ fontSize: '14px', color: 'var(--label-secondary)', textDecoration: 'line-through' }}>
                                  ${option.price}
                                </div>
                                <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--interactive-primary)' }}>
                                  ${option.offerPrice}
                                </div>
                                <div
                                  className="inline-block px-2 py-1 rounded text-xs font-semibold mt-1"
                                  style={{
                                    backgroundColor: '#ef4444',
                                    color: 'white',
                                  }}
                                >
                                  {Math.round((1 - option.offerPrice / option.price) * 100)}% OFF
                                </div>
                              </>
                            ) : (
                              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
                                ${option.price}
                              </div>
                            )}
                            <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                              per person
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  !selectedActivity?.isTourPackage && (
                    <div 
                      className="p-6 rounded-xl text-center"
                      style={{ 
                        backgroundColor: 'var(--fill-accent)',
                        border: '1px solid var(--border-primary)',
                      }}
                    >
                      <p style={{ color: 'var(--label-secondary)' }}>
                        {bookingDate 
                          ? 'No options available for the selected date. Please choose another date.'
                          : 'Please select a date to see available options.'}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1 hidden lg:block">
              <div 
                id="booking-card"
                className="sticky top-24 p-6 rounded-xl"
                style={{
                  border: '1px solid var(--border-primary)',
                  backgroundColor: 'white',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                }}
              >
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--label-primary)', marginBottom: '16px' }}>
                  Book this experience
                </h3>

                {/* Date Picker - Hidden for Tour Packages */}
                {!selectedActivity?.isTourPackage && (
                  <div className="mb-4">
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                      Date
                    </label>
                    <div className="relative">
                      <Popover open={isDatePopoverOpen} onOpenChange={setIsDatePopoverOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                            style={{
                              border: '1px solid var(--border-primary)',
                              color: bookingDate ? 'var(--label-primary)' : 'var(--label-secondary)',
                              paddingRight: bookingDate ? '40px' : undefined,
                            }}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {bookingDate ? format(bookingDate, 'PPP') : 'Pick a date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={bookingDate}
                            onSelect={(date: Date | undefined) => {
                              setBookingDate(date);
                              setSelectedDate(date || null);
                              setIsDatePopoverOpen(false);
                            }}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              if (date < today) return true;
                              return !isDateAvailable(date);
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {bookingDate && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setBookingDate(undefined);
                            setSelectedDate(null);
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                          style={{
                            color: 'var(--label-secondary)',
                          }}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Package Option */}
                <div className="mb-4">
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                    Package Option
                  </label>
                  <Popover open={showPackageOptionDropdown} onOpenChange={setShowPackageOptionDropdown}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        style={{
                          border: '1px solid var(--border-primary)',
                          color: selectedOption ? 'var(--label-primary)' : 'var(--label-secondary)',
                        }}
                      >
                        <span>
                          {selectedOption ? selectedOption.title : 'Select package option'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent 
                      className="w-96 max-h-96 overflow-y-auto" 
                      align="start"
                      style={{
                        border: '2px solid var(--border-primary)',
                      }}
                    >
                      <div className="space-y-2">
                        {availableOptions.length > 0 ? (
                          availableOptions.map((option) => (
                            <div
                              key={option.id}
                              onClick={() => {
                                setSelectedOption(option);
                                setShowPackageOptionDropdown(false);
                              }}
                              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-50 ${
                                selectedOption?.id === option.id ? 'ring-2 ring-blue-500' : ''
                              }`}
                              style={{
                                border: '1px solid var(--border-primary)',
                                ...(selectedOption?.id === option.id && { backgroundColor: 'var(--fill-accent)' }),
                              }}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex-1">
                                  <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--label-primary)', marginBottom: '8px' }}>
                                    {option.title}
                                  </h4>
                                  <div className="flex items-center gap-3 flex-wrap text-xs" style={{ color: 'var(--label-secondary)' }}>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{option.duration}</span>
                                    </div>
                                    <div>
                                      <strong style={{ color: 'var(--label-primary)' }}>{option.timeSlot}</strong>
                                    </div>
                                    <div>
                                      {option.guide}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right flex-shrink-0">
                                  {option.offerPrice ? (
                                    <>
                                      <div style={{ fontSize: '12px', color: 'var(--label-secondary)', textDecoration: 'line-through' }}>
                                        ${option.price}
                                      </div>
                                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--interactive-primary)' }}>
                                        ${option.offerPrice}
                                      </div>
                                    </>
                                  ) : (
                                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                                      ${option.price}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center">
                            <p style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                              {bookingDate 
                                ? 'No options available for the selected date.'
                                : 'Please select a date to see available options.'}
                            </p>
                          </div>
                        )}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Travelers */}
                <div className="mb-4">
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                    Travelers
                  </label>
                  <Popover open={showTravelerDropdown} onOpenChange={setShowTravelerDropdown}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        style={{
                          border: '1px solid var(--border-primary)',
                          color: 'var(--label-primary)',
                        }}
                      >
                        <span>
                          {[
                            adults > 0 && `${adults} Adult${adults !== 1 ? 's' : ''}`,
                            children > 0 && `${children} Child${children !== 1 ? 'ren' : ''}`,
                            infants > 0 && `${infants} Infant${infants !== 1 ? 's' : ''}`
                          ].filter(Boolean).join(', ') || 'Select travelers'}
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80" align="start">
                      <div className="space-y-4">
                        {/* Adults */}
                        <div className="flex items-center justify-between p-3 -mx-3 rounded-lg transition-colors hover:bg-gray-50">
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                              Adults
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                              Age 13+
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setAdults(Math.max(0, adults - 1))}
                              disabled={adults === 0}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              -
                            </Button>
                            <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                              {adults}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setAdults(adults + 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* Children */}
                        <div className="flex items-center justify-between p-3 -mx-3 rounded-lg transition-colors hover:bg-gray-50">
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                              Children
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                              Age 2-12
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setChildren(Math.max(0, children - 1))}
                              disabled={children === 0}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              -
                            </Button>
                            <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                              {children}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setChildren(children + 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        {/* Infants */}
                        <div className="flex items-center justify-between p-3 -mx-3 rounded-lg transition-colors hover:bg-gray-50">
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                              Infants
                            </div>
                            <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                              Under 2
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setInfants(Math.max(0, infants - 1))}
                              disabled={infants === 0}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              -
                            </Button>
                            <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                              {infants}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setInfants(infants + 1)}
                              style={{
                                width: '32px',
                                height: '32px',
                                padding: 0,
                              }}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Price Summary */}
                <div 
                  className="mb-4 p-4 rounded-lg"
                  style={{
                    backgroundColor: 'var(--fill-accent)',
                    border: '1px solid var(--border-primary)',
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                      ${currentPrice} x {adults + children + infants} {adults + children + infants === 1 ? 'guest' : 'guests'}
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div 
                    className="pt-3 mt-3 flex items-center justify-between"
                    style={{ borderTop: '1px solid var(--border-primary)' }}
                  >
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      Total
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--interactive-primary)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Button
                    onClick={handleBookNow}
                    className="w-full glossy-hover"
                    style={{
                      backgroundColor: 'var(--interactive-primary)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>Book Now</span>
                  </Button>
                  <Button
                    onClick={handleAddToCart}
                    variant="outline"
                    className="w-full glossy-hover"
                    style={{
                      border: '1px solid var(--border-primary)',
                      color: 'var(--label-primary)',
                      fontWeight: 600,
                    }}
                  >
                    <span style={{ position: 'relative', zIndex: 2 }}>Add to Cart</span>
                  </Button>
                </div>

                {/* Free Cancellation */}
                <div className="mt-4 text-center">
                  <p style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                    Free cancellation up to 24 hours before
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ratings & Reviews Section */}
      <ReviewsSection 
        reviews={selectedActivity.reviews}
        averageRating={selectedActivity.rating}
        totalReviews={selectedActivity.reviewCount}
      />

      {/* Bottom Sticky Bar (Mobile) */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-4 z-40 glossy"
        style={{ 
          borderTop: '1px solid var(--border-primary)',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
              From
            </div>
            <div className="flex items-baseline gap-1">
              <span 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  lineHeight: 1,
                }}
              >
                ${currentPrice}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                per person
              </span>
            </div>
          </div>
          <Button
            onClick={() => {
              const bookingCard = document.getElementById('booking-card');
              if (bookingCard) {
                bookingCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
            className="glossy-hover"
            style={{
              backgroundColor: 'var(--interactive-primary)',
              color: 'white',
              fontWeight: 600,
              padding: '12px 24px',
            }}
          >
            <span style={{ position: 'relative', zIndex: 2 }}>Check availability</span>
          </Button>
        </div>
      </div>
    </>
  );
}