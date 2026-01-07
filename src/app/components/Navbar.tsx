import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, ShoppingCart, User, ChevronDown, Globe, Search } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { MegaMenu } from './MegaMenu';
import { LanguageModal } from './LanguageModal';
import { useLocale } from '../contexts/LocaleContext';
import { SearchBar } from './SearchBar';

export function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { items } = useSelector((state: RootState) => state.cart);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const activities = useSelector((state: RootState) => state.activities.items);
  const blogPosts = useSelector((state: RootState) => state.blog ? state.blog.posts : []);
  const { language } = useLocale();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [showSearchInNav, setShowSearchInNav] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
      style={{ 
        backgroundColor: shouldBeTransparent ? 'transparent' : 'var(--background-primary)', 
        borderBottom: shouldBeTransparent ? 'none' : '1px solid var(--separator-primary)',
      }}
      onMouseLeave={() => {
        setActiveMenu(null);
      }}
    >
      {/* Single Row - Logo + Menus (Left), Icons (Right) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo + Navigation Menu */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img src="/getyourguide-logo.svg" alt="GetYourGuide" className="h-16" />
            </Link>

            {/* Navigation Menu beside Logo (Hidden on mobile/tablet) */}
            <div className="hidden lg:flex items-center space-x-6">
              <div
                onMouseEnter={() => {
                  setActiveMenu('places');
                }}
              >
                <button 
                  className="flex items-center gap-1 py-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                  style={{ 
                    color: shouldBeTransparent ? 'white' : 'var(--label-secondary)',
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
                  className="flex items-center gap-1 py-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                  style={{ 
                    color: shouldBeTransparent ? 'white' : 'var(--label-secondary)',
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
                  className="flex items-center gap-1 py-4 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#FF6F61] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full"
                  style={{ 
                    color: shouldBeTransparent ? 'white' : 'var(--label-secondary)',
                  }}
                >
                  Trip inspiration
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

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
              style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            >
              <Search className="w-5 h-5 mb-0.5" />
              <span className="text-xs hidden sm:block">Search</span>
            </button>

            <Link 
              to="/account/wishlist" 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
              style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
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

            <Link 
              to="/checkout" 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
              style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
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
            </Link>

            <button 
              className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
              style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
              onClick={() => setLanguageModalOpen(true)}
            >
              <Globe className="w-5 h-5 mb-0.5" />
              <span className="text-xs hidden sm:block">{language.code.toUpperCase()}</span>
            </button>

            {isAuthenticated ? (
              <Link 
                to="/account/bookings" 
                className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
                style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
              >
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-xs hidden sm:block">Profile</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="flex flex-col items-center relative hover:opacity-80 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[var(--decorative-guiding-red)] after:transition-[width] after:duration-150 after:ease-in hover:after:w-full" 
                style={{ color: shouldBeTransparent ? 'white' : 'var(--label-secondary)' }}
              >
                <User className="w-5 h-5 mb-0.5" />
                <span className="text-xs hidden sm:block">Profile</span>
              </Link>
            )}
          </div>
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

      {/* Language Modal */}
      <LanguageModal
        open={languageModalOpen}
        onOpenChange={setLanguageModalOpen}
      />

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
    </nav>
  );
}