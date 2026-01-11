import { useState, useEffect, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { logout } from '../store/slices/authSlice';
import { openCartDrawer } from '../store/slices/cartSlice';
import { 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  X, 
  Globe, 
  Search, 
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  Compass,
  Gift,
  Briefcase,
  BookOpen,
  Info,
  Mail,
  LogOut,
  LayoutDashboard,
  Clock,
  Check
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { MegaMenu } from './MegaMenu';
import { SearchBar } from './SearchBar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { LanguageModal } from './LanguageModal';
import { useLocale } from '../contexts/LocaleContext';
import { Logo } from './Logo';

export function Navbar() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const activities = useSelector((state: RootState) => state.activities.items);
  const blogPosts = useSelector((state: RootState) => state.blog ? state.blog.posts : []);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [showSearchInNav, setShowSearchInNav] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [bookingIdInput, setBookingIdInput] = useState('');
  const [searchedBooking, setSearchedBooking] = useState<any>(null);
  const [searchError, setSearchError] = useState('');
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const { language } = useLocale();

  // Mock bookings database for tracking (public access)
  const mockBookingsDatabase = [
    {
      id: '1',
      confirmationCode: 'GYG-VM-123456',
      activityTitle: 'Vatican Museums & Sistine Chapel Skip-the-Line Tour',
      location: 'Vatican City, Rome',
      date: '2024-12-28',
      time: '09:00 AM',
      travelers: 2,
      price: 142.88,
      bookingStatus: 'booking_successful',
      paymentStatus: 'pending',
      image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=300&fit=crop',
    },
    {
      id: '2',
      confirmationCode: 'GYG-COL-789012',
      activityTitle: 'Colosseum Underground & Ancient Rome Tour',
      location: 'Colosseum, Rome',
      date: '2024-12-30',
      time: '02:00 PM',
      travelers: 4,
      price: 319.96,
      bookingStatus: 'ticket_delivered',
      paymentStatus: 'paid',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    },
  ];

  const isHomePage = location.pathname === '/';
  const shouldBeTransparent = isHomePage && isDesktop && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Show search in navbar when scrolled past hero (540px is hero height)
      if (isHomePage && window.scrollY > 300) {
        setShowSearchInNav(true);
      } else {
        setShowSearchInNav(false);
      }
    };

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isHomePage]);

  // Generate dynamic mega menu data from activities
  const placesToSeeByRegion: Record<string, { icon: string; title: string; subtitle: string; link: string }[]> = useMemo(() => {
    // Group activities by region based on location
    const grouped: Record<string, { icon: string; title: string; subtitle: string; link: string }[]> = {
      'Top attractions': [],
      'North America': [],
      'Europe': [],
      'Africa': [],
      'Central & South America': [],
      'Asia': [],
      'Australia & the Pacific': [],
    };

    // Create a map of locations to track unique destinations
    const locationMap = new Map<string, { icon: string; title: string; subtitle: string; link: string }>();

    activities.forEach(activity => {
      const location = activity.location;
      const city = location.split(',')[0].trim();
      const key = location;

      if (!locationMap.has(key)) {
        const item = {
          icon: activity.image,
          title: `${city} Tours`,
          subtitle: `Destination in ${location}`,
          link: `/search?location=${encodeURIComponent(location)}`,
        };
        locationMap.set(key, item);

        // Categorize by region
        if (location.includes('France') || location.includes('Italy') || location.includes('Spain') || 
            location.includes('UK') || location.includes('Netherlands') || location.includes('Greece')) {
          grouped['Europe'].push(item);
        } else if (location.includes('USA') || location.includes('United States')) {
          grouped['North America'].push(item);
        } else if (location.includes('UAE') || location.includes('Dubai') || location.includes('Japan') || 
                   location.includes('Thailand') || location.includes('Singapore')) {
          grouped['Asia'].push(item);
        } else if (location.includes('Australia')) {
          grouped['Australia & the Pacific'].push(item);
        }
      }
    });

    // Top attractions - get highest rated activities
    const topAttractions = [...activities]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 18)
      .map(activity => ({
        icon: activity.image,
        title: activity.title,
        subtitle: `Attraction in ${activity.location}`,
        link: `/activity/${activity.slug}`,
      }));

    grouped['Top attractions'] = topAttractions;

    // Fill empty regions with default data if needed
    if (grouped['North America'].length === 0) {
      grouped['North America'] = [
        { icon: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=100', title: 'New York City Tours', subtitle: 'City in United States', link: '/search?location=New York City, USA' },
      ];
    }

    if (grouped['Africa'].length === 0) {
      grouped['Africa'] = [
        { icon: 'https://images.unsplash.com/photo-1589911973078-37dd37464c6d?w=100', title: 'Cairo Tours', subtitle: 'City in Egypt', link: '/search?location=Cairo, Egypt' },
      ];
    }

    if (grouped['Central & South America'].length === 0) {
      grouped['Central & South America'] = [
        { icon: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=100', title: 'Rio de Janeiro Tours', subtitle: 'City in Brazil', link: '/search?location=Rio de Janeiro, Brazil' },
      ];
    }

    return grouped;
  }, [activities]);

  // Generate dynamic "Things to Do" data from activities by category
  const thingsToDoByRegion: Record<string, { icon: string; title: string; subtitle?: string; link: string }[]> = useMemo(() => {
    const grouped: Record<string, { icon: string; title: string; subtitle?: string; link: string }[]> = {
      'Top experiences': [],
      'North America': [],
      'Europe': [],
      'Africa': [],
      'Central & South America': [],
      'Asia': [],
      'Australia & the Pacific': [],
    };

    // Top experiences - group by category
    const categoryMap = new Map<string, { icon: string; title: string; subtitle?: string; link: string }>();

    activities.forEach(activity => {
      const categoryKey = activity.category;
      const location = activity.location;

      if (!categoryMap.has(categoryKey)) {
        categoryMap.set(categoryKey, {
          icon: activity.image,
          title: activity.category,
          subtitle: `Experiences worldwide`,
          link: `/search?category=${encodeURIComponent(activity.category)}`,
        });
      }

      // Also categorize experiences by region
      const experienceItem = {
        icon: activity.image,
        title: activity.title,
        subtitle: activity.category,
        link: `/activity/${activity.slug}`,
      };

      if (location.includes('France') || location.includes('Italy') || location.includes('Spain') || 
          location.includes('UK') || location.includes('Netherlands') || location.includes('Greece')) {
        if (grouped['Europe'].length < 18) grouped['Europe'].push(experienceItem);
      } else if (location.includes('USA') || location.includes('United States')) {
        if (grouped['North America'].length < 18) grouped['North America'].push(experienceItem);
      } else if (location.includes('UAE') || location.includes('Dubai') || location.includes('Japan') || 
                 location.includes('Thailand') || location.includes('Singapore')) {
        if (grouped['Asia'].length < 18) grouped['Asia'].push(experienceItem);
      } else if (location.includes('Australia')) {
        if (grouped['Australia & the Pacific'].length < 18) grouped['Australia & the Pacific'].push(experienceItem);
      }
    });

    // Top experiences from categories
    grouped['Top experiences'] = Array.from(categoryMap.values()).slice(0, 18);

    // Add activities sorted by rating if categories are empty
    if (grouped['Top experiences'].length === 0) {
      grouped['Top experiences'] = [...activities]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 18)
        .map(activity => ({
          icon: activity.image,
          title: activity.title,
          subtitle: activity.category,
          link: `/activity/${activity.slug}`,
        }));
    }

    // Fill empty regions with default data
    if (grouped['North America'].length === 0) {
      grouped['North America'] = [
        { icon: 'https://images.unsplash.com/photo-1597423244036-ef5020e83f3c?w=100', title: 'Las Vegas Shows & musicals', link: '/search' },
      ];
    }

    if (grouped['Africa'].length === 0) {
      grouped['Africa'] = [
        { icon: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=100', title: 'Marrakesh Desert safaris', link: '/search' },
      ];
    }

    if (grouped['Central & South America'].length === 0) {
      grouped['Central & South America'] = [
        { icon: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=100', title: 'Rio de Janeiro Tours', link: '/search' },
      ];
    }

    return grouped;
  }, [activities]);

  const thingsToDoItems = thingsToDoByRegion['Top experiences'] || [];

  // Categories for mega menu
  const categories = useMemo(() => {
    // Get unique categories from activities
    const categorySet = new Set<string>();
    const categoryData: { icon: string; title: string; subtitle: string; link: string }[] = [];
    
    activities.forEach(activity => {
      if (!categorySet.has(activity.category)) {
        categorySet.add(activity.category);
        categoryData.push({
          icon: activity.image,
          title: activity.category,
          subtitle: 'Browse all experiences',
          link: `/search?category=${encodeURIComponent(activity.category)}`,
        });
      }
    });
    
    return categoryData;
  }, [activities]);

  // Trip inspiration from blog posts
  const tripInspirationItems = useMemo(() => {
    return blogPosts.map(post => ({
      icon: post.image,
      title: post.title,
      subtitle: post.readTime,
      link: `/blog/${post.id}`,
    }));
  }, [blogPosts]);

  const regionCategories = [
    'North America',
    'Europe',
    'Africa',
    'Central & South America',
    'Asia',
    'Australia & the Pacific',
  ];

  const handleTrackBooking = () => {
    if (!bookingIdInput.trim()) {
      setSearchError('Please enter a booking ID');
      return;
    }

    // Search for booking by confirmation code or ID
    const booking = mockBookingsDatabase.find(
      b => b.confirmationCode.toLowerCase() === bookingIdInput.trim().toLowerCase() || 
           b.id === bookingIdInput.trim()
    );

    if (booking) {
      setSearchedBooking(booking);
      setSearchError('');
    } else {
      setSearchedBooking(null);
      setSearchError('Booking not found. Please check your booking ID and try again.');
    }
  };

  const handleCloseTrackingModal = () => {
    setTrackingModalOpen(false);
    setBookingIdInput('');
    setSearchedBooking(null);
    setSearchError('');
  };

  const getBookingStatusBadge = (bookingStatus: string) => {
    const statusConfig = {
      booking_successful: { bg: '#fef3c7', color: '#92400e', text: 'Booking Successful' },
      booking_confirmed: { bg: '#10b981', color: 'white', text: 'Booking Confirmed' },
      cancelled: { bg: '#fee2e2', color: '#991b1b', text: 'Cancelled' },
      ticket_pending: { bg: '#dbeafe', color: '#1e40af', text: 'Ticket Pending' },
      ticket_delivered: { bg: '#a7f3d0', color: '#047857', text: 'Ticket Delivered' },
    };

    const config = statusConfig[bookingStatus as keyof typeof statusConfig] || statusConfig.booking_successful;

    return (
      <Badge 
        className="flex-shrink-0"
        style={{ 
          backgroundColor: config.bg,
          color: config.color,
          fontWeight: 600,
        }}
      >
        {config.text}
      </Badge>
    );
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    if (paymentStatus === 'paid') {
      return (
        <Badge 
          className="flex-shrink-0"
          style={{ 
            backgroundColor: '#10b981',
            color: 'white',
            fontWeight: 600,
          }}
        >
          <Check className="w-3 h-3 mr-1" />
          Paid
        </Badge>
      );
    } else {
      return (
        <Badge 
          className="flex-shrink-0"
          style={{ 
            backgroundColor: '#fef3c7',
            color: '#92400e',
            fontWeight: 600,
          }}
        >
          Payment Pending
        </Badge>
      );
    }
  };

  return (
    <nav 
      className={`${isScrolled ? 'fixed' : 'relative'} top-0 left-0 right-0 z-50 transition-all duration-300`} 
      style={{ 
        backgroundColor: 'var(--background-primary)', 
        borderBottom: '1px solid var(--separator-primary)',
      }}
      onMouseLeave={() => {
        setActiveMenu(null);
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Row - Logo (Left), Icons (Right) */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <Logo />
          </Link>

          {/* Search Bar - Appears when scrolled - Desktop Only */}
          {showSearchInNav && isDesktop && (
            <div className="mx-8">
              <SearchBar variant="navbar" />
            </div>
          )}

          {/* Right Side Icons */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-3x)' }}>
            {/* Mobile Search Icon - Only visible on mobile/tablet */}
            <button 
              className="lg:hidden flex flex-col items-center relative hover:opacity-80" 
              style={{ color: 'var(--label-secondary)' }}
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span className="text-xs hidden sm:block">Search</span>
            </button>

            <Link 
              to="/account/wishlist" 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
              style={{ color: 'var(--label-secondary)' }}
            >
              <div className="relative">
                <Heart className="w-5 h-5 mb-0.5" />
                {wishlistItems.length > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium" 
                    style={{ backgroundColor: 'var(--decorative-guiding-red)' }}
                  >
                    {wishlistItems.length}
                  </span>
                )}
              </div>
              <span className="text-xs hidden sm:block">Wishlist</span>
            </Link>

            <button 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full cursor-pointer" 
              style={{ color: 'var(--label-secondary)' }}
              onClick={(e) => {
                e.preventDefault();
                dispatch(openCartDrawer());
              }}
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 mb-0.5" />
                {items.length > 0 && (
                  <span 
                    className="absolute -top-2 -right-2 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium" 
                    style={{ backgroundColor: 'var(--decorative-guiding-red)' }}
                  >
                    {items.length}
                  </span>
                )}
              </div>
              <span className="text-xs hidden sm:block">Cart</span>
            </button>

            {/* Track a booking button */}
            <button 
              className="hidden md:flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full cursor-pointer" 
              style={{ color: 'var(--label-secondary)' }}
              onClick={() => setTrackingModalOpen(true)}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span className="text-xs whitespace-nowrap">Track Booking</span>
            </button>

            {/* Language Selector Button */}
            <button 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full cursor-pointer" 
              style={{ color: 'var(--label-secondary)' }}
              onClick={() => setLanguageModalOpen(true)}
            >
              <Globe className="w-5 h-5 mb-0.5" />
              <span className="text-xs hidden sm:block">{language.code.toUpperCase()}</span>
            </button>

            {isAuthenticated ? (
              <Link 
                to="/account/bookings" 
                className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
                style={{ color: 'var(--label-secondary)' }}
              >
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-xs hidden sm:block">Profile</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
                style={{ color: 'var(--label-secondary)' }}
              >
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-xs hidden sm:block">Profile</span>
              </Link>
            )}
          </div>
        </div>

        {/* Second Row - Navigation Menu Dropdowns (Left), Become an Affiliate (Right) - Desktop Only */}
        <div className="hidden lg:flex items-center justify-between h-12 border-t" style={{ borderColor: 'var(--separator-primary)' }}>
          {/* Navigation Menu Dropdowns */}
          <div className="flex items-center space-x-6">
            <div
              onMouseEnter={() => {
                setActiveMenu('places');
              }}
            >
              <button 
                className="flex items-center gap-1 py-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                style={{ 
                  color: 'var(--label-secondary)',
                  fontSize: '14px',
                }}
              >
                Places to see
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div
              onMouseEnter={() => {
                setActiveMenu('things');
              }}
            >
              <button 
                className="flex items-center gap-1 py-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                style={{ 
                  color: 'var(--label-secondary)',
                  fontSize: '14px',
                }}
              >
                Things to do
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div
              onMouseEnter={() => setActiveMenu('inspiration')}
            >
              <button 
                className="flex items-center gap-1 py-3 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                style={{ 
                  color: 'var(--label-secondary)',
                  fontSize: '14px',
                }}
              >
                Trip inspiration
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Become an Affiliate Button */}
          <Link 
            to="/partner" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#FF4905',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            Become an Affiliate
          </Link>
        </div>

        {/* Second Row - Mobile/Tablet - Become an Affiliate Button Centered */}
        <div className="lg:hidden flex items-center justify-start h-10 border-t px-4 sm:px-6" style={{ borderColor: 'var(--separator-primary)' }}>
          <Link 
            to="/partner" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:opacity-90"
            style={{ 
              backgroundColor: '#FF4905',
              color: 'white',
              fontSize: '13px',
              fontWeight: 600,
            }}
          >
            Become an Affiliate
          </Link>
        </div>
      </div>

      {/* Mega Menus - Positioned relative to this container */}
      {activeMenu === 'places' && (
        <MegaMenu
          title="Top attractions"
          items={placesToSeeByRegion['Top attractions']}
          showExploreAll
        />
      )}
      {activeMenu === 'things' && (
        <MegaMenu
          title="Browse by category"
          items={categories}
          showExploreAll
        />
      )}
      {activeMenu === 'inspiration' && (
        <MegaMenu
          title="Travel guides & inspiration"
          items={tripInspirationItems}
          showExploreAll
        />
      )}

      {/* Mobile Search Dropdown */}
      {mobileSearchOpen && (
        <div 
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
          style={{ 
            animation: 'slideDown 0.2s ease-out',
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <SearchBar 
              variant="navbar"
              onFocus={() => {}}
              onBlur={() => setTimeout(() => setMobileSearchOpen(false), 300)}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Tracking Modal */}
      <Dialog open={trackingModalOpen} onOpenChange={handleCloseTrackingModal}>
        <DialogContent 
          className="sm:max-w-[600px]"
          style={{
            maxHeight: '90vh',
            overflowY: 'auto',
          }}
        >
          <DialogHeader>
            <DialogTitle style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
              Track Your Booking
            </DialogTitle>
            <DialogDescription style={{ fontSize: '14px', color: 'var(--label-secondary)', marginTop: '8px' }}>
              Enter your booking ID or confirmation code to view your booking status
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4" style={{ marginTop: '24px' }}>
            <div className="flex gap-2">
              <Input 
                type="text" 
                placeholder="e.g., GYG-VM-123456" 
                value={bookingIdInput} 
                onChange={(e) => setBookingIdInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleTrackBooking();
                  }
                }}
                style={{
                  height: '48px',
                  fontSize: '15px',
                  border: '1px solid var(--border-primary)',
                }}
              />
              <Button 
                onClick={handleTrackBooking}
                className="glossy-hover"
                style={{
                  backgroundColor: 'var(--interactive-primary)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '15px',
                  padding: '12px 24px',
                  height: '48px',
                }}
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>

            {searchError && (
              <div 
                className="p-3 rounded-lg flex items-start gap-2"
                style={{ backgroundColor: '#fee2e2', border: '1px solid #fecaca' }}
              >
                <X className="w-5 h-5 mt-0.5" style={{ color: '#dc2626' }} />
                <p style={{ fontSize: '14px', color: '#dc2626', fontWeight: 500 }}>
                  {searchError}
                </p>
              </div>
            )}

            {searchedBooking && (
              <Card 
                className="overflow-hidden"
                style={{ border: '1px solid var(--border-primary)', borderRadius: '12px' }}
              >
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row gap-4 p-6">
                    <img
                      src={searchedBooking.image}
                      alt={searchedBooking.activityTitle}
                      className="w-full sm:w-32 h-32 sm:h-32 rounded-lg object-cover flex-shrink-0"
                      style={{ border: '1px solid var(--border-primary)' }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)', flex: 1 }}>
                          {searchedBooking.activityTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {getBookingStatusBadge(searchedBooking.bookingStatus)}
                          {getPaymentStatusBadge(searchedBooking.paymentStatus)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <MapPin className="w-4 h-4 flex-shrink-0" />
                          <span style={{ fontSize: '14px' }}>{searchedBooking.location}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span style={{ fontSize: '14px' }}>
                            {new Date(searchedBooking.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span style={{ fontSize: '14px' }}>{searchedBooking.time}</span>
                        </div>
                        <div className="flex items-center gap-2" style={{ color: 'var(--label-secondary)' }}>
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span style={{ fontSize: '14px' }}>
                            {searchedBooking.travelers} traveler{searchedBooking.travelers > 1 ? 's' : ''}
                          </span>
                        </div>
                      </div>

                      <div 
                        className="mt-4 p-3 rounded-lg"
                        style={{ backgroundColor: 'var(--fill-accent)' }}
                      >
                        <p style={{ fontSize: '13px', color: 'var(--label-secondary)' }}>
                          Confirmation code: <strong style={{ color: 'var(--label-primary)' }}>{searchedBooking.confirmationCode}</strong>
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between items-center" style={{ borderColor: 'var(--border-primary)' }}>
                        <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>Total Amount</span>
                        <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
                          ${searchedBooking.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button 
              variant="outline"
              onClick={handleCloseTrackingModal}
              style={{
                fontWeight: 600,
                fontSize: '15px',
                padding: '12px 24px',
                borderRadius: '8px',
                border: '1px solid var(--border-primary)',
              }}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Language Modal */}
      <LanguageModal open={languageModalOpen} onOpenChange={setLanguageModalOpen} />
    </nav>
  );
}