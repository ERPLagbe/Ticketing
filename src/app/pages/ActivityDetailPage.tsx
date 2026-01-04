import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setSelectedActivity } from '../store/slices/activitiesSlice';
import { addToCart } from '../store/slices/cartSlice';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Star, Clock, MapPin, Users, Check, Calendar as CalendarIcon, Shield, Award, ChevronRight, Heart, Share2, X, ChevronLeft } from 'lucide-react';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';
import { format } from 'date-fns';
import { LoadingShimmer } from '../components/LoadingShimmer';
import { toast } from 'sonner';

// Glossy hover effect (not constant shimmer)
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
    width: 100%;
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
`;

export function ActivityDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedActivity } = useSelector((state: RootState) => state.activities);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [pickupTime, setPickupTime] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [showTravelerDropdown, setShowTravelerDropdown] = useState(false);
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [dateScrollPosition, setDateScrollPosition] = useState(0);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTourOption, setSelectedTourOption] = useState<number | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

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
        
        // Remove if already exists to avoid duplicates
        recentlyViewed = recentlyViewed.filter((item: any) => item.id !== selectedActivity.id);
        
        // Add to the end
        recentlyViewed.push({
          id: selectedActivity.id,
          slug: selectedActivity.slug,
          title: selectedActivity.title,
          image: selectedActivity.image,
          duration: selectedActivity.duration,
          rating: selectedActivity.rating,
          reviewCount: selectedActivity.reviewCount,
        });
        
        // Keep only last 10 items
        if (recentlyViewed.length > 10) {
          recentlyViewed = recentlyViewed.slice(-10);
        }
        
        localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
      } catch (error) {
        console.error('Error saving to recently viewed:', error);
      }
    }
  }, [selectedActivity]);

  const handleBookNow = () => {
    if (!selectedActivity || !startDate || !endDate) {
      toast.error('Please select dates for your booking');
      return;
    }

    if (!pickupTime) {
      toast.error('Please select a pickup time');
      return;
    }

    dispatch(addToCart({
      activityId: selectedActivity.id,
      activityTitle: selectedActivity.title,
      startDate: format(startDate, 'yyyy-MM-dd'),
      endDate: format(endDate, 'yyyy-MM-dd'),
      pickupTime,
      adults,
      children,
      infants,
      price: selectedActivity.price,
      image: selectedActivity.image,
    }));

    toast.success('Added to cart!', {
      description: 'Redirecting to checkout...',
    });

    setTimeout(() => {
      navigate('/checkout');
    }, 1000);
  };

  if (!selectedActivity) {
    return <LoadingShimmer />;
  }

  const totalPrice = selectedActivity.price * (adults + children + infants);

  // Mock data for additional sections
  const includedItems = [
    'Skip-the-line tickets',
    'Professional guide',
    'Audio headsets (if needed)',
    'All fees and taxes',
    'Free cancellation up to 24 hours'
  ];

  const notIncluded = [
    'Hotel pickup and drop-off',
    'Food and drinks',
    'Gratuities (optional)'
  ];

  const mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      country: 'United States',
      date: '2 weeks ago',
      rating: 5,
      title: 'Absolutely Amazing Experience!',
      content: 'This was the highlight of our trip! Our guide was incredibly knowledgeable and made the experience so much more meaningful. The skip-the-line access was worth every penny. Highly recommend!'
    },
    {
      id: 2,
      author: 'James T.',
      country: 'United Kingdom',
      date: '1 month ago',
      rating: 5,
      title: 'Best tour we\'ve ever taken',
      content: 'Everything was perfectly organized. The guide was engaging and we learned so much. The views were breathtaking and the whole experience exceeded our expectations.'
    },
    {
      id: 3,
      author: 'Maria G.',
      country: 'Spain',
      date: '2 months ago',
      rating: 4,
      title: 'Great value for money',
      content: 'Really enjoyed this tour. The guide was excellent and the pace was just right. Only minor issue was the meeting point was a bit confusing to find, but once we started, everything was perfect.'
    },
    {
      id: 4,
      author: 'David L.',
      country: 'Canada',
      date: '3 weeks ago',
      rating: 5,
      title: 'Unforgettable experience',
      content: 'From start to finish, this tour was exceptional. The guide\'s passion and knowledge really shone through. Would definitely book again!'
    },
    {
      id: 5,
      author: 'Emma R.',
      country: 'Australia',
      date: '1 week ago',
      rating: 5,
      title: 'Perfect day out',
      content: 'Couldn\'t have asked for a better experience. Everything was seamless and the guide made it so enjoyable. Highly recommended for families!'
    },
    {
      id: 6,
      author: 'Lucas B.',
      country: 'Germany',
      date: '5 weeks ago',
      rating: 4,
      title: 'Very good tour',
      content: 'Really enjoyed the tour. The guide was knowledgeable and friendly. Only slight improvement would be a bit more time at each location.'
    },
    {
      id: 7,
      author: 'Sophie K.',
      country: 'France',
      date: '2 weeks ago',
      rating: 5,
      title: 'Outstanding!',
      content: 'This exceeded all our expectations. The skip-the-line feature alone made it worthwhile, but the guide and overall experience were incredible.'
    },
    {
      id: 8,
      author: 'Michael C.',
      country: 'Ireland',
      date: '4 days ago',
      rating: 5,
      title: 'Highly recommend',
      content: 'Fantastic tour from beginning to end. Our guide was amazing and really brought the history to life. Worth every cent!'
    }
  ];

  // Generate next 7 days for date selector
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Mock tour options with available dates
  const tourOptions = [
    {
      id: 1,
      title: 'English Guided Tour of 2 Sites (no Basilica)',
      description: 'Make the most of your day with skip-the-line access to the Vatican Museums and Sistine Chapel on this English-guided tour.',
      duration: '2.5 hours',
      guide: 'English',
      meetingPoint: 'Via Mocenigo, 15, 00192 Roma RM, Italy',
      price: 71.44,
      originalPrice: 142.88,
      discount: 50,
      freeCancellation: true,
      likelyToSellOut: false,
      availableDays: [1, 3, 6], // Mon, Wed, Sat
      availableTickets: 15,
    },
    {
      id: 2,
      title: 'English 2-Hour Guided Tour of 2 Sites (no Basilica)',
      description: 'Experience the Vatican Museums and Sistine Chapel with an official English guide on a focused 2-hour tour. Skip the line, enjoy expert insights and discover masterpieces.',
      duration: '2 hours',
      guide: 'English',
      meetingPoint: 'Via Mocenigo, 15, 00192 Roma RM, Italy',
      price: 71.44,
      originalPrice: 142.88,
      discount: 50,
      freeCancellation: true,
      likelyToSellOut: true,
      availableDays: [2, 4], // Tue, Thu only
      availableTickets: 3,
    },
    {
      id: 3,
      title: 'English Guided Tour of All 3 Sites',
      description: 'Complete Vatican experience including Museums, Sistine Chapel and St. Peter\'s Basilica with skip-the-line access.',
      duration: '3 hours',
      guide: 'English',
      meetingPoint: 'Via Mocenigo, 15, 00192 Roma RM, Italy',
      price: 89.99,
      originalPrice: 179.98,
      discount: 50,
      freeCancellation: true,
      likelyToSellOut: true,
      availableDays: [0], // Sunday only
      availableTickets: 0,
    },
  ];

  // Filter tour options based on selected date
  const filteredTourOptions = selectedDate 
    ? tourOptions.filter(option => option.availableDays.includes(selectedDate.getDay()))
    : tourOptions;

  // Check if a date has available tour options
  const isDateAvailable = (date: Date) => {
    const dayOfWeek = date.getDay();
    return tourOptions.some(option => option.availableDays.includes(dayOfWeek) && option.availableTickets > 0);
  };

  const scrollDates = (direction: 'left' | 'right') => {
    const container = document.getElementById('date-scroll-container');
    if (container) {
      const scrollAmount = 120;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleSelectTourOption = (optionId: number) => {
    setSelectedTourOption(optionId);
    // Scroll to booking card
    const bookingCard = document.getElementById('booking-card');
    if (bookingCard) {
      bookingCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // If no date selected, set today as default
    if (!startDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setStartDate(tomorrow);
    }
    if (!endDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setEndDate(tomorrow);
    }
    // Set default pickup time
    if (!pickupTime) {
      setPickupTime('09:00');
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!');
  };

  const handleShare = () => {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: selectedActivity?.title,
        text: 'Check out this amazing activity!',
        url: url,
      }).catch(() => {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <>
      <style>{glossyStyles}</style>
      <div className="bg-white">
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
              className="text-white hover:text-white/70 transition-colors p-2"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image Display */}
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
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="w-6 h-6 rotate-180" />
            </button>
          )}
          
          {selectedImage < selectedActivity.images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(selectedImage + 1);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 transition-colors"
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
                    selectedImage === index ? 'ring-2 ring-white scale-105' : 'opacity-60 hover:opacity-100'
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

      {/* Breadcrumbs */}
      <div className="border-b" style={{ borderColor: 'var(--border-primary)', paddingTop: 'var(--spacing-8x)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm overflow-x-auto no-scrollbar" style={{ color: 'var(--label-secondary)' }}>
            <Link to="/" className="hover:underline">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/search" className="hover:underline">{selectedActivity.location}</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--label-primary)' }}>Activities</span>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
        {/* Desktop Gallery - 4 column grid */}
        <div className="hidden md:grid grid-cols-4 gap-2 mb-6" style={{ height: '500px' }}>
          {/* Main large image - takes 2x2 grid */}
          <div 
            className="col-span-2 row-span-2 rounded-xl overflow-hidden relative group cursor-pointer image-glossy"
            onClick={() => setShowAllPhotos(true)}
          >
            <img
              src={selectedActivity.images[0]}
              alt={selectedActivity.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Top right image */}
          <div 
            className="col-span-2 rounded-xl overflow-hidden relative group cursor-pointer image-glossy"
            onClick={() => setShowAllPhotos(true)}
          >
            <img
              src={selectedActivity.images[1] || selectedActivity.image}
              alt={`${selectedActivity.title} 2`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Bottom right - 2 small images */}
          <div 
            className="rounded-xl overflow-hidden relative group cursor-pointer image-glossy"
            onClick={() => setShowAllPhotos(true)}
          >
            <img
              src={selectedActivity.images[2] || selectedActivity.image}
              alt={`${selectedActivity.title} 3`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Last image with "See all photos" overlay */}
          <div 
            className="rounded-xl overflow-hidden relative group cursor-pointer image-glossy"
            onClick={() => setShowAllPhotos(true)}
          >
            <img
              src={selectedActivity.images[3] || selectedActivity.image}
              alt={`${selectedActivity.title} 4`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div 
              className="absolute inset-0 flex flex-col items-center justify-center transition-all duration-300"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
              }}
            >
              <svg 
                className="w-8 h-8 mb-2" 
                style={{ color: 'white' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span 
                className="text-white font-semibold"
                style={{ fontSize: '15px' }}
              >
                See all photos
              </span>
              <span 
                className="text-white/80 mt-1"
                style={{ fontSize: '13px' }}
              >
                +{selectedActivity.images.length - 4} more
              </span>
            </div>
          </div>
        </div>

        {/* Mobile Gallery - Grid layout: 1 image top, 2 images bottom */}
        <div className="md:hidden mb-6">
          <div className="space-y-2">
            {/* First row - Main large image */}
            <div 
              className="relative rounded-xl overflow-hidden cursor-pointer image-glossy"
              style={{ height: '240px' }}
              onClick={() => setShowAllPhotos(true)}
            >
              <img
                src={selectedActivity.images[0]}
                alt={selectedActivity.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Second row - 2 images side by side */}
            <div className="grid grid-cols-2 gap-2">
              {/* Second image */}
              <div 
                className="relative rounded-xl overflow-hidden cursor-pointer image-glossy"
                style={{ height: '160px' }}
                onClick={() => setShowAllPhotos(true)}
              >
                <img
                  src={selectedActivity.images[1] || selectedActivity.image}
                  alt={`${selectedActivity.title} 2`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Third image with "See all photos" overlay */}
              <div 
                className="relative rounded-xl overflow-hidden cursor-pointer image-glossy"
                style={{ height: '160px' }}
                onClick={() => setShowAllPhotos(true)}
              >
                <img
                  src={selectedActivity.images[2] || selectedActivity.image}
                  alt={`${selectedActivity.title} 3`}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay matching desktop design */}
                <div 
                  className="absolute inset-0 flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  <svg 
                    className="w-8 h-8 mb-2" 
                    style={{ color: 'white' }}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span 
                    className="text-white font-semibold"
                    style={{ fontSize: '15px' }}
                  >
                    See all photos
                  </span>
                  {selectedActivity.images.length > 3 && (
                    <span 
                      className="text-white/80 mt-1"
                      style={{ fontSize: '13px' }}
                    >
                      +{selectedActivity.images.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Category Badge */}
            <div>
              <Badge 
                style={{ 
                  backgroundColor: 'var(--fill-accent)',
                  color: 'var(--interactive-primary)',
                  fontSize: '13px',
                  fontWeight: 600,
                  padding: '6px 12px',
                }}
              >
                {selectedActivity.category}
              </Badge>
            </div>

            {/* Title & Meta Info */}
            <div>
              <h1 
                className="text-2xl sm:text-3xl"
                style={{ 
                  fontWeight: 700,
                  lineHeight: '40px',
                  color: 'var(--label-primary)',
                  marginBottom: '16px',
                }}
              >
                {selectedActivity.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4" style={{ fontSize: '14px' }}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ fill: 'var(--label-primary)', stroke: 'var(--label-primary)' }} />
                    <span style={{ fontWeight: 700, color: 'var(--label-primary)' }}>{selectedActivity.rating}</span>
                  </div>
                  <span style={{ color: 'var(--label-secondary)' }}>
                    ({selectedActivity.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>
                
                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                  <MapPin className="w-4 h-4" />
                  <span>{selectedActivity.location}</span>
                </div>
                
                <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                  <Clock className="w-4 h-4" />
                  <span>{selectedActivity.duration}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <Button
                  onClick={handleWishlist}
                  variant="outline"
                  className="gap-2 glossy-hover flex-1 sm:flex-initial"
                  style={{
                    border: '1px solid var(--border-primary)',
                    color: isWishlisted ? '#dc2626' : 'var(--label-primary)',
                    backgroundColor: isWishlisted ? '#fee2e2' : 'white',
                  }}
                >
                  <Heart 
                    className="w-4 h-4" 
                    fill={isWishlisted ? 'currentColor' : 'none'}
                  />
                  <span className="hidden sm:inline">{isWishlisted ? 'Saved' : 'Save to wishlist'}</span>
                  <span className="sm:hidden">{isWishlisted ? 'Saved' : 'Save'}</span>
                </Button>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="gap-2 glossy-hover flex-1 sm:flex-initial"
                  style={{
                    border: '1px solid var(--border-primary)',
                    color: 'var(--label-primary)',
                  }}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Check Availability Section */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '24px',
                }}
              >
                Check availability
              </h2>

              {/* Date Selector */}
              <div className="relative mb-6">
                <div className="flex items-center gap-2">
                  {/* Scroll Left Button */}
                  <button
                    onClick={() => scrollDates('left')}
                    className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
                    style={{ border: '1px solid var(--border-primary)' }}
                  >
                    <ChevronLeft className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
                  </button>

                  {/* Date Scroll Container */}
                  <div 
                    id="date-scroll-container"
                    className="flex gap-2 overflow-x-auto no-scrollbar flex-1"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {availableDates.map((date, index) => {
                      const isSelected = selectedDate && 
                        date.toDateString() === selectedDate.toDateString();
                      const dayName = format(date, 'EEE');
                      const dayNumber = format(date, 'd');
                      const monthName = format(date, 'MMM');
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);
                      const isPast = date < today;
                      const hasAvailability = isDateAvailable(date);
                      const isDisabled = isPast || !hasAvailability;

                      return (
                        <button
                          key={index}
                          onClick={() => !isDisabled && setSelectedDate(date)}
                          disabled={isDisabled}
                          className="flex-shrink-0 text-center px-4 py-3 rounded-xl border transition-all"
                          style={{
                            minWidth: '90px',
                            backgroundColor: isSelected 
                              ? 'var(--interactive-primary)' 
                              : isDisabled 
                                ? 'var(--fill-accent)' 
                                : 'white',
                            border: `1px solid ${isSelected ? 'var(--interactive-primary)' : 'var(--border-primary)'}`,
                            color: isSelected 
                              ? 'white' 
                              : isDisabled 
                                ? 'var(--label-tertiary)' 
                                : 'var(--label-primary)',
                            cursor: isDisabled ? 'not-allowed' : 'pointer',
                            opacity: isDisabled ? 0.5 : 1,
                          }}
                        >
                          <div style={{ fontSize: '14px', fontWeight: 600 }}>{dayName}</div>
                          <div style={{ fontSize: '24px', fontWeight: 700, margin: '4px 0' }}>{dayNumber}</div>
                          <div style={{ fontSize: '12px' }}>{monthName}</div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Scroll Right Button */}
                  <button
                    onClick={() => scrollDates('right')}
                    className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
                    style={{ border: '1px solid var(--border-primary)' }}
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
                  </button>

                  {/* Calendar Icon Button */}
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <button
                        className="flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50 transition-colors"
                        style={{ border: '1px solid var(--border-primary)' }}
                      >
                        <CalendarIcon className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="end">
                      <Calendar
                        mode="single"
                        selected={selectedDate || undefined}
                        onSelect={(date) => {
                          setSelectedDate(date || null);
                          setShowCalendar(false);
                        }}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const isPast = date < today;
                          const hasAvailability = isDateAvailable(date);
                          return isPast || !hasAvailability;
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Tour Options */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {selectedDate && (
                      <div 
                        style={{ 
                          fontSize: '14px',
                          color: 'var(--label-secondary)',
                          marginBottom: '8px',
                        }}
                      >
                        Showing options for <strong style={{ color: 'var(--label-primary)' }}>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</strong>
                      </div>
                    )}
                    <h3 
                      style={{ 
                        fontSize: '18px',
                        fontWeight: 700,
                        color: 'var(--label-primary)',
                      }}
                    >
                      Choose from {filteredTourOptions.length} available option{filteredTourOptions.length !== 1 ? 's' : ''}
                    </h3>
                  </div>
                  {selectedDate && (
                    <Button
                      variant="outline"
                      onClick={() => setSelectedDate(null)}
                      className="glossy-hover"
                      style={{
                        border: '1px solid var(--border-primary)',
                        color: 'var(--label-primary)',
                        fontSize: '14px',
                        fontWeight: 600,
                      }}
                    >
                      Clear filter
                    </Button>
                  )}
                </div>

                {filteredTourOptions.length === 0 ? (
                  <div 
                    className="border rounded-xl p-12 text-center"
                    style={{ 
                      border: '1px solid var(--border-primary)',
                      backgroundColor: 'var(--fill-accent)',
                    }}
                  >
                    <CalendarIcon 
                      className="w-12 h-12 mx-auto mb-4" 
                      style={{ color: 'var(--label-tertiary)' }} 
                    />
                    <h4 
                      style={{ 
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--label-primary)',
                        marginBottom: '8px',
                      }}
                    >
                      No tours available on this date
                    </h4>
                    <p style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                      Please select a different date to see available options
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTourOptions.map((option) => (
                    <div
                      key={option.id}
                      className="border rounded-xl p-6 hover:shadow-md transition-shadow"
                      style={{ 
                        border: '1px solid var(--border-primary)',
                        backgroundColor: 'white',
                      }}
                    >
                      {/* Title and Badge */}
                      <div className="mb-3">
                        <div className="flex items-center gap-2 mb-2">
                          {option.likelyToSellOut && (
                            <Badge 
                              style={{ 
                                backgroundColor: '#dc2626',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px',
                              }}
                            >
                              Likely to sell out
                            </Badge>
                          )}
                          {option.availableTickets === 0 ? (
                            <Badge 
                              style={{ 
                                backgroundColor: '#6b7280',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px',
                              }}
                            >
                              Sold Out
                            </Badge>
                          ) : option.availableTickets <= 5 ? (
                            <Badge 
                              style={{ 
                                backgroundColor: '#f59e0b',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px',
                              }}
                            >
                              Only {option.availableTickets} tickets left
                            </Badge>
                          ) : (
                            <Badge 
                              variant="outline"
                              style={{ 
                                borderColor: '#10b981',
                                color: '#10b981',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '4px 8px',
                              }}
                            >
                              {option.availableTickets} tickets available
                            </Badge>
                          )}
                        </div>
                        <h4 
                          style={{ 
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--label-primary)',
                            marginBottom: '8px',
                          }}
                        >
                          {option.title}
                        </h4>
                        <p style={{ fontSize: '14px', color: 'var(--label-secondary)', lineHeight: '20px' }}>
                          {option.description}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap items-center gap-4 mb-4" style={{ fontSize: '14px' }}>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-primary)' }}>
                          <Clock className="w-4 h-4" />
                          <span>{option.duration}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-primary)' }}>
                          <Users className="w-4 h-4" />
                          <span>Guide: {option.guide}</span>
                        </div>
                      </div>

                      {/* Meeting Point */}
                      <div className="flex items-start gap-2 mb-4" style={{ fontSize: '13px' }}>
                        <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: 'var(--label-secondary)' }} />
                        <span style={{ color: 'var(--label-primary)', textDecoration: 'underline' }}>
                          {option.meetingPoint}
                        </span>
                      </div>

                      {/* Price and Select Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 pt-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
                        <div>
                          <div className="flex items-baseline gap-2 mb-1">
                            <span 
                              style={{ 
                                fontSize: '28px',
                                fontWeight: 700,
                                color: '#dc2626',
                                lineHeight: 1,
                              }}
                            >
                              ${option.price}
                            </span>
                            <span 
                              style={{ 
                                fontSize: '16px',
                                color: 'var(--label-tertiary)',
                                textDecoration: 'line-through',
                              }}
                            >
                              ${option.originalPrice}
                            </span>
                            <Badge 
                              style={{ 
                                backgroundColor: '#dc2626',
                                color: 'white',
                                fontSize: '11px',
                                fontWeight: 600,
                                padding: '2px 6px',
                              }}
                            >
                              -{option.discount}%
                            </Badge>
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                            1 Adult x ${option.price}
                          </div>
                          <div style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                            All taxes and fees included
                          </div>
                        </div>

                        <div className="sm:text-right w-full sm:w-auto">
                          <Button
                            onClick={() => handleSelectTourOption(option.id)}
                            disabled={option.availableTickets === 0}
                            className="glossy-hover mb-2 w-full sm:w-auto"
                            style={{
                              backgroundColor: option.availableTickets === 0
                                ? '#d1d5db'
                                : selectedTourOption === option.id 
                                  ? '#059669' 
                                  : 'var(--interactive-primary)',
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '16px',
                              padding: '12px 32px',
                              borderRadius: '8px',
                              cursor: option.availableTickets === 0 ? 'not-allowed' : 'pointer',
                              opacity: option.availableTickets === 0 ? 0.6 : 1,
                            }}
                          >
                            {option.availableTickets === 0 
                              ? 'Sold Out' 
                              : selectedTourOption === option.id 
                                ? 'Selected ✓' 
                                : 'Select'}
                          </Button>
                          {option.freeCancellation && (
                            <div className="flex items-center gap-1 sm:justify-end" style={{ fontSize: '13px' }}>
                              <Check className="w-4 h-4" style={{ color: '#10b981' }} />
                              <span style={{ color: 'var(--label-secondary)' }}>Free cancellation</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                )}
              </div>
            </div>

            {/* Overview */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '16px',
                }}
              >
                Overview
              </h2>
              <p style={{ color: 'var(--label-secondary)' }}>
                {selectedActivity.description}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '16px',
                }}
              >
                Highlights
              </h2>
              <ul className="space-y-2">
                {selectedActivity.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span 
                      className="flex-shrink-0 mt-1"
                      style={{ 
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--label-primary)',
                      }}
                    />
                    <span style={{ fontSize: '15px', color: 'var(--label-primary)', lineHeight: '24px' }}>
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Description */}
            <div>
              <h2 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  marginBottom: '16px',
                }}
              >
                Full description
              </h2>
              <div style={{ fontSize: '15px', lineHeight: '24px', color: 'var(--label-primary)' }}>
                <p>
                  {selectedActivity.description} This experience offers a unique opportunity to explore one of the world's most iconic landmarks. With skip-the-line access and expert guides, you'll make the most of your time and learn fascinating details about the history, architecture, and cultural significance.
                </p>
                <button 
                  className="mt-3 underline"
                  style={{ 
                    color: 'var(--label-primary)',
                    fontWeight: 600,
                  }}
                >
                  See more
                </button>
              </div>
            </div>

            {/* Includes */}
            <div>
              <h2 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  marginBottom: '16px',
                }}
              >
                Includes
              </h2>
              <ul className="space-y-2">
                {includedItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#10b981' }} />
                    <span style={{ fontSize: '15px', color: 'var(--label-primary)' }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '24px',
                }}
              >
                Itinerary
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Timeline */}
                <div>
                  {/* Starting Location */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div 
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--interactive-primary)',
                          color: 'white',
                          fontWeight: 700,
                        }}
                      >
                        G
                      </div>
                      <div 
                        className="flex-1 w-1"
                        style={{
                          backgroundColor: 'var(--interactive-primary)',
                          minHeight: '60px',
                          marginTop: '4px',
                          marginBottom: '4px',
                        }}
                      />
                    </div>
                    <div className="flex-1 pt-2">
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                        Starting location:
                      </div>
                      <div style={{ fontSize: '15px', color: 'var(--label-secondary)', marginTop: '4px' }}>
                        {selectedActivity.location}
                      </div>
                    </div>
                  </div>

                  {/* Stop Location */}
                  <div className="flex gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div 
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--label-primary)',
                          border: '3px solid white',
                          boxShadow: '0 0 0 2px var(--label-primary)',
                        }}
                      />
                      <div 
                        className="flex-1 w-1"
                        style={{
                          backgroundColor: 'var(--interactive-primary)',
                          minHeight: '60px',
                          marginTop: '4px',
                          marginBottom: '4px',
                        }}
                      />
                    </div>
                    <div className="flex-1 pt-2">
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                        {selectedActivity.title.split(':')[0]}
                      </div>
                      <div style={{ fontSize: '15px', color: 'var(--label-secondary)', marginTop: '4px' }}>
                        Main experience ({selectedActivity.duration})
                      </div>
                    </div>
                  </div>

                  {/* End Location */}
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div 
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--interactive-primary)',
                        }}
                      />
                    </div>
                    <div className="flex-1 pt-2">
                      <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                        Arrive back at:
                      </div>
                      <div style={{ fontSize: '15px', color: 'var(--label-secondary)', marginTop: '4px' }}>
                        {selectedActivity.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div>
                  <div 
                    className="rounded-xl overflow-hidden relative"
                    style={{ 
                      height: '320px',
                      backgroundColor: '#f5f5f5',
                      border: '1px solid var(--border-primary)',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&h=400&fit=crop"
                      alt="Map"
                      className="w-full h-full object-cover"
                      style={{ filter: 'grayscale(0.2)' }}
                    />
                    <button
                      className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-md hover:shadow-lg transition-shadow"
                      style={{ border: '1px solid var(--border-primary)' }}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                    </button>
                  </div>
                  
                  <div 
                    className="flex items-center gap-2 mt-3"
                    style={{ fontSize: '14px', color: 'var(--label-secondary)' }}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Main stop</span>
                  </div>
                </div>
              </div>

              <div 
                className="flex items-start gap-2 mt-6 p-3 rounded-lg"
                style={{ 
                  backgroundColor: 'var(--fill-accent)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <svg 
                  className="w-5 h-5 flex-shrink-0 mt-0.5" 
                  style={{ color: 'var(--label-secondary)' }}
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                  For reference only. Itineraries are subject to change.
                </span>
              </div>
            </div>

            {/* Meeting Point */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '16px',
                }}
              >
                Meeting point
              </h2>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedActivity.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 underline hover:no-underline transition-all"
                style={{ 
                  color: 'var(--label-primary)',
                  fontWeight: 600,
                  fontSize: '15px',
                }}
              >
                Open in Google Maps
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

            {/* Important Information */}
            <div>
              <h2 
                style={{ 
                  marginBottom: '16px',
                }}
              >
                Important information
              </h2>
              
              <div className="space-y-6">
                {/* Not Allowed */}
                <div>
                  <h3 
                    style={{ 
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    Not allowed
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3">
                      <span 
                        className="flex-shrink-0 mt-1"
                        style={{ 
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--label-primary)',
                        }}
                      />
                      <span style={{ fontSize: '15px', color: 'var(--label-primary)' }}>Pets</span>
                    </li>
                  </ul>
                </div>

                {/* Know Before You Go */}
                <div>
                  <h3 
                    style={{ 
                      fontSize: '18px',
                      fontWeight: 700,
                      color: 'var(--label-primary)',
                      marginBottom: '12px',
                    }}
                  >
                    Know before you go
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <span 
                        className="flex-shrink-0 mt-1"
                        style={{ 
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--label-primary)',
                        }}
                      />
                      <span style={{ fontSize: '15px', color: 'var(--label-primary)', lineHeight: '24px' }}>
                        The tour for children up to the age of 3 is free, but must be mentioned at the time of purchase.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span 
                        className="flex-shrink-0 mt-1"
                        style={{ 
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--label-primary)',
                        }}
                      />
                      <span style={{ fontSize: '15px', color: 'var(--label-primary)', lineHeight: '24px' }}>
                        Minimum numbers apply. In the event that there are not enough passengers to meet the minimum requirements, the activity may be cancelled and you will be...
                      </span>
                    </li>
                  </ul>
                  <button 
                    className="mt-3 underline"
                    style={{ 
                      color: 'var(--label-primary)',
                      fontWeight: 600,
                      fontSize: '15px',
                    }}
                  >
                    See more
                  </button>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 
                  style={{ 
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--label-primary)',
                  }}
                >
                  Reviews ({selectedActivity.reviewCount.toLocaleString()})
                </h2>
              </div>

              {/* Rating Summary */}
              <div 
                className="p-6 rounded-xl mb-6"
                style={{ 
                  backgroundColor: 'var(--fill-accent)',
                  border: '1px solid var(--border-primary)',
                }}
              >
                <div className="flex items-center gap-8">
                  <div className="text-center">
                    <div 
                      style={{ 
                        fontSize: '48px',
                        fontWeight: 700,
                        color: 'var(--label-primary)',
                        lineHeight: 1,
                      }}
                    >
                      {selectedActivity.rating}
                    </div>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="w-4 h-4" 
                          style={{ 
                            fill: i < Math.floor(selectedActivity.rating) ? 'var(--label-primary)' : 'none',
                            stroke: i < Math.floor(selectedActivity.rating) ? 'var(--label-primary)' : '#d1d5db',
                          }}
                        />
                      ))}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--label-tertiary)', marginTop: '4px' }}>
                      {selectedActivity.reviewCount.toLocaleString()} reviews
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3">
                        <span style={{ fontSize: '13px', color: 'var(--label-secondary)', width: '60px' }}>
                          {stars} stars
                        </span>
                        <div className="flex-1 h-2 rounded-full" style={{ backgroundColor: 'var(--border-primary)' }}>
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${stars === 5 ? 85 : stars === 4 ? 12 : 3}%`,
                              backgroundColor: 'var(--interactive-primary)',
                            }}
                          />
                        </div>
                        <span style={{ fontSize: '13px', color: 'var(--label-tertiary)', width: '40px' }}>
                          {stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="space-y-6">
                {mockReviews.slice(0, visibleReviews).map((review) => (
                  <div 
                    key={review.id}
                    className="pb-6"
                    style={{ borderBottom: '1px solid var(--border-primary)' }}
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ 
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--interactive-primary)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      >
                        {review.author[0]}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ fontWeight: 600, color: 'var(--label-primary)' }}>
                            {review.author}
                          </span>
                          <span style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                            • {review.country}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-3.5 h-3.5" 
                                style={{ 
                                  fill: i < review.rating ? 'var(--label-primary)' : 'none',
                                  stroke: i < review.rating ? 'var(--label-primary)' : '#d1d5db',
                                }}
                              />
                            ))}
                          </div>
                          <span style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                            {review.date}
                          </span>
                        </div>
                        
                        <h4 style={{ fontWeight: 600, color: 'var(--label-primary)', marginBottom: '8px' }}>
                          {review.title}
                        </h4>
                        
                        <p style={{ fontSize: '14px', lineHeight: '22px', color: 'var(--label-secondary)' }}>
                          {review.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {visibleReviews < mockReviews.length && (
                <Button 
                  variant="outline" 
                  className="w-full mt-6 glossy-hover"
                  style={{
                    border: '2px solid var(--border-primary)',
                    color: 'var(--label-primary)',
                    fontWeight: 600,
                  }}
                  onClick={() => setVisibleReviews(prev => Math.min(prev + 3, mockReviews.length))}
                >
                  Load more reviews
                </Button>
              )}
            </div>

            {/* FAQ */}
            <div>
              <h2 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  marginBottom: '16px',
                }}
              >
                Frequently asked questions
              </h2>
              <Accordion type="single" collapsible className="space-y-3">
                <AccordionItem 
                  value="item-1"
                  style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '0 16px' }}
                >
                  <AccordionTrigger style={{ fontSize: '15px', fontWeight: 600 }}>
                    Can I cancel my booking?
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    Yes, you can cancel your booking up to 24 hours before the experience for a full refund.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-2"
                  style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '0 16px' }}
                >
                  <AccordionTrigger style={{ fontSize: '15px', fontWeight: 600 }}>
                    Is this suitable for children?
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    Yes, this experience is family-friendly and suitable for all ages.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-3"
                  style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '0 16px' }}
                >
                  <AccordionTrigger style={{ fontSize: '15px', fontWeight: 600 }}>
                    What languages are available?
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    Tours are available in English, Spanish, French, German, and Italian.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem 
                  value="item-4"
                  style={{ border: '1px solid var(--border-primary)', borderRadius: '8px', padding: '0 16px' }}
                >
                  <AccordionTrigger style={{ fontSize: '15px', fontWeight: 600 }}>
                    Do I need to print my ticket?
                  </AccordionTrigger>
                  <AccordionContent style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                    No, you can show your mobile ticket on your smartphone.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Right Column - Sticky Booking Card */}
          <div className="lg:col-span-1">
            <Card 
              id="booking-card"
              className="lg:sticky rounded-xl"
              style={{ 
                top: '100px',
                border: '1px solid var(--border-primary)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              }}
            >
              <CardContent className="p-6">
                <div className="mb-6">
                  <div style={{ fontSize: '13px', color: 'var(--label-tertiary)', marginBottom: '4px' }}>
                    From
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span 
                      style={{ 
                        fontSize: '36px',
                        fontWeight: 700,
                        color: 'var(--label-primary)',
                        lineHeight: 1,
                      }}
                    >
                      ${selectedActivity.price}
                    </span>
                    <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                      per person
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Date Range */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        Start date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            style={{
                              border: '1px solid var(--border-primary)',
                              color: startDate ? 'var(--label-primary)' : 'var(--label-tertiary)',
                            }}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDate ? format(startDate, 'MMM dd') : <span>Start</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={startDate}
                            onSelect={setStartDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label 
                        className="block mb-2"
                        style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                      >
                        End date
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start"
                            style={{
                              border: '1px solid var(--border-primary)',
                              color: endDate ? 'var(--label-primary)' : 'var(--label-tertiary)',
                            }}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDate ? format(endDate, 'MMM dd') : <span>End</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={endDate}
                            onSelect={setEndDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Pickup Time */}
                  <div>
                    <label 
                      className="block mb-2"
                      style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                    >
                      Pickup time
                    </label>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="w-full h-9 px-3 rounded-md"
                      style={{
                        border: '1px solid var(--border-primary)',
                        color: pickupTime ? 'var(--label-primary)' : 'var(--label-tertiary)',
                        fontSize: '14px',
                      }}
                    >
                      <option value="">Select time</option>
                      <option value="08:00">08:00 AM</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:00">02:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="16:00">04:00 PM</option>
                    </select>
                  </div>

                  {/* Travelers Dropdown */}
                  <div className="relative">
                    <label 
                      className="block mb-2"
                      style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}
                    >
                      Travelers
                    </label>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => setShowTravelerDropdown(!showTravelerDropdown)}
                      style={{
                        border: '1px solid var(--border-primary)',
                        color: 'var(--label-primary)',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>
                          {adults > 0 && `Adult x ${adults}`}
                          {children > 0 && `, Child x ${children}`}
                          {infants > 0 && `, Infant x ${infants}`}
                        </span>
                      </div>
                      <ChevronRight 
                        className="w-4 h-4 transition-transform duration-200" 
                        style={{ 
                          transform: showTravelerDropdown ? 'rotate(90deg)' : 'rotate(0deg)',
                        }}
                      />
                    </Button>

                    {/* Traveler Dropdown Panel */}
                    {showTravelerDropdown && (
                      <div
                        className="absolute z-50 w-full mt-2 rounded-xl"
                        style={{
                          backgroundColor: 'white',
                          border: '1px solid var(--border-primary)',
                          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <div className="p-4 space-y-4">
                          {/* Adults */}
                          <div className="flex items-center justify-between">
                            <div>
                              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--label-primary)' }}>
                                Adult
                              </div>
                              <div style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                                (Age 13-99)
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setAdults(Math.max(1, adults - 1))}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--border-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: adults <= 1 ? 'var(--fill-accent)' : 'white',
                                }}
                                disabled={adults <= 1}
                              >
                                -
                              </button>
                              <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                                {adults}
                              </span>
                              <button
                                onClick={() => setAdults(adults + 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--interactive-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: 'white',
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div 
                            className="flex items-center justify-between pt-4"
                            style={{ borderTop: '1px solid var(--border-primary)' }}
                          >
                            <div>
                              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--label-primary)' }}>
                                Child
                              </div>
                              <div style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                                (Age 4-12)
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setChildren(Math.max(0, children - 1))}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--border-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: children <= 0 ? 'var(--fill-accent)' : 'white',
                                }}
                                disabled={children <= 0}
                              >
                                -
                              </button>
                              <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                                {children}
                              </span>
                              <button
                                onClick={() => setChildren(children + 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--interactive-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: 'white',
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Infants */}
                          <div 
                            className="flex items-center justify-between pt-4"
                            style={{ borderTop: '1px solid var(--border-primary)' }}
                          >
                            <div>
                              <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--label-primary)' }}>
                                Infant
                              </div>
                              <div style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
                                (Age 3 and younger)
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => setInfants(Math.max(0, infants - 1))}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--border-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: infants <= 0 ? 'var(--fill-accent)' : 'white',
                                }}
                                disabled={infants <= 0}
                              >
                                -
                              </button>
                              <span style={{ fontSize: '15px', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                                {infants}
                              </span>
                              <button
                                onClick={() => setInfants(infants + 1)}
                                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                                style={{
                                  border: '1px solid var(--interactive-primary)',
                                  color: 'var(--interactive-primary)',
                                  backgroundColor: 'white',
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div 
                  className="py-4 mb-4"
                  style={{ borderTop: '1px solid var(--border-primary)' }}
                >
                  <div className="flex justify-between mb-3">
                    <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                      ${selectedActivity.price} × {adults} travelers
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      Total
                    </span>
                    <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full glossy-hover"
                  size="lg"
                  onClick={handleBookNow}
                  disabled={!startDate}
                  style={{
                    backgroundColor: 'var(--interactive-primary)',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '16px',
                    height: '48px',
                  }}
                >
                  Book Now
                </Button>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center gap-2" style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                    <Shield className="w-4 h-4" style={{ color: 'var(--interactive-primary)' }} />
                    <span>Free cancellation up to 24 hours before</span>
                  </div>
                  <div className="flex items-center gap-2" style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                    <Award className="w-4 h-4" style={{ color: 'var(--interactive-primary)' }} />
                    <span>Reserve now & pay later</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>

      {/* Mobile Booking Bar - Fixed at bottom */}
      <div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 p-4"
        style={{
          backgroundColor: 'white',
          borderTop: '1px solid var(--border-primary)',
          boxShadow: '0 -4px 12px rgba(0, 0, 0, 0.08)',
        }}
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <div style={{ fontSize: '13px', color: 'var(--label-tertiary)' }}>
              From
            </div>
            <div className="flex items-baseline gap-2">
              <span 
                style={{ 
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--label-primary)',
                  lineHeight: 1,
                }}
              >
                ${selectedActivity.price}
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