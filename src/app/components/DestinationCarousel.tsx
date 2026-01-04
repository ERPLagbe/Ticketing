import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setDestination } from '../store/slices/filtersSlice';
import { useRef, useState, useEffect } from 'react';

interface Destination {
  name: string;
  image: string;
}

interface DestinationCarouselProps {
  title: string;
  destinations: Destination[];
}

export function DestinationCarousel({ title, destinations }: DestinationCarouselProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleDestinationClick = (destinationName: string) => {
    dispatch(setDestination(destinationName));
    navigate('/search');
  };

  const getCardWidth = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      const gap = 16; // 16px gap
      
      // Mobile: 1 card full width
      if (window.innerWidth < 640) {
        return containerWidth;
      }
      // Small tablets: 2 cards
      else if (window.innerWidth < 768) {
        return (containerWidth - gap) / 2;
      }
      // Tablets: 3 cards
      else if (window.innerWidth < 1024) {
        return (containerWidth - gap * 2) / 3;
      }
      // Desktop: 5 cards
      else {
        return (containerWidth - gap * 4) / 5;
      }
    }
    return 300;
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft - scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = getCardWidth();
      const gap = 16;
      const scrollAmount = cardWidth + gap;
      
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      
      // Calculate active index based on scroll position
      const cardWidth = getCardWidth();
      const gap = 16;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <section style={{ padding: 'var(--spacing-6x) 0', backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h2 
          style={{ 
            marginBottom: 'var(--spacing-5x)',
          }}
        >
          {title}
        </h2>

        <div className="relative">
          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ 
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {destinations.map((destination, index) => (
              <div
                key={destination.name}
                onClick={() => handleDestinationClick(destination.name)}
                className="flex-shrink-0 relative overflow-hidden rounded-lg cursor-pointer w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(20%-13px)] snap-start"
                style={{ 
                  height: '280px',
                }}
              >
                {/* Image */}
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                
                {/* City Name Badge */}
                <div
                  className="absolute"
                  style={{
                    top: '8px',
                    left: '8px',
                    backgroundColor: 'rgba(26, 43, 73, 0.9)',
                    borderRadius: '4px',
                    padding: '4px 8px',
                  }}
                >
                  <small
                    style={{
                      color: 'var(--label-quaternary)',
                      fontWeight: 700,
                    }}
                  >
                    {destination.name}
                  </small>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow - Desktop Only */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="hidden md:flex absolute left-[-20px] top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10 items-center justify-center"
              style={{
                border: '1px solid #e5e7eb',
              }}
            >
              <ChevronLeft size={24} color="#1a2b49" />
            </button>
          )}

          {/* Right Arrow - Desktop Only */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="hidden md:flex absolute right-[-20px] top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-10 items-center justify-center"
              style={{
                border: '1px solid #e5e7eb',
              }}
            >
              <ChevronRight size={24} color="#1a2b49" />
            </button>
          )}

          {/* Indicators - Mobile Only */}
          <div className="md:hidden flex justify-center gap-2 mt-4">
            {destinations.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = getCardWidth();
                    const gap = 16;
                    scrollContainerRef.current.scrollTo({
                      left: cardWidth * index + gap * index,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="transition-all duration-300"
                style={{
                  width: activeIndex === index ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  backgroundColor: activeIndex === index ? 'var(--decorative-guiding-red)' : '#d1d5db',
                  border: 'none',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}