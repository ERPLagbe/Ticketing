import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivityCard } from './ActivityCard';
import { Activity } from '../store/slices/activitiesSlice';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActivityCarouselProps {
  title: string;
  activities: Activity[];
}

export function ActivityCarousel({ title, activities }: ActivityCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const navigate = useNavigate();

  // Autoplay functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const isAtEnd = scrollLeft >= scrollWidth - clientWidth - 10;
        
        if (isAtEnd) {
          // Reset to beginning
          scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next item
          scroll('right');
        }
      }
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);

  const getCardWidth = () => {
    // Card width is 290px + gap of 20px
    return 290;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      const gap = 20; // gap-5 = 20px
      const scrollAmount = cardWidth + gap;
      
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  return (
    <section 
      style={{ 
        padding: 'var(--spacing-6x) 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title and See More Button */}
        <div className="flex items-center justify-between mb-8">
          <h2>
            {title}
          </h2>
          
          {/* See More Button - Desktop Only */}
          <button
            onClick={() => navigate('/search')}
            className="hidden lg:block px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--decorative-guiding-red)',
              color: 'white',
            }}
          >
            See More
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110 active:scale-95"
              style={{ 
                border: '1px solid var(--border-primary)',
                transform: 'translateY(-50%) translateX(-50%)',
              }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="flex-shrink-0 snap-start"
                style={{ width: '290px' }}
              >
                <ActivityCard activity={activity} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-110 active:scale-95"
              style={{ 
                border: '1px solid var(--border-primary)',
                transform: 'translateY(-50%) translateX(50%)',
              }}
            >
              <ChevronRight className="w-5 h-5" style={{ color: 'var(--label-primary)' }} />
            </button>
          )}
        </div>

        {/* See More Button - Mobile Only - At the end */}
        <div className="lg:hidden mt-6 flex justify-center">
          <button
            onClick={() => navigate('/search')}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95 whitespace-nowrap"
            style={{
              backgroundColor: 'var(--decorative-guiding-red)',
              color: 'white',
            }}
          >
            See More
          </button>
        </div>
      </div>
    </section>
  );
}