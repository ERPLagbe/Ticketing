import { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDestination, setCategory } from '../store/slices/filtersSlice';
import { RootState } from '../store/store';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type TabType = 'attractions' | 'destinations' | 'categories';

export function TopAttractionsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('attractions');
  const tabsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: activities } = useSelector((state: RootState) => state.activities);

  // Calculate real data from activities
  const { attractionsData, destinationsData, categoriesData } = useMemo(() => {
    // Extract unique attractions (activity titles) with their slugs
    const attractions = activities.map(activity => ({
      name: activity.title,
      location: activity.location,
      slug: activity.slug,
      tours: 1, // Each activity represents 1 tour
    }));

    // Group activities by destination (city name from location)
    const destinationMap = new Map<string, number>();
    activities.forEach(activity => {
      const city = activity.location.split(',')[0].trim(); // Extract city name
      destinationMap.set(city, (destinationMap.get(city) || 0) + 1);
    });
    const destinations = Array.from(destinationMap.entries())
      .map(([name, tours]) => ({ name, tours }))
      .sort((a, b) => b.tours - a.tours);

    // Extract unique categories
    const categoryMap = new Map<string, number>();
    activities.forEach(activity => {
      categoryMap.set(activity.category, (categoryMap.get(activity.category) || 0) + 1);
    });
    const categories = Array.from(categoryMap.entries())
      .map(([name, tours]) => ({ name, tours }))
      .sort((a, b) => b.tours - a.tours);

    return {
      attractionsData: attractions,
      destinationsData: destinations,
      categoriesData: categories,
    };
  }, [activities]);

  const handleDestinationClick = (destinationName: string) => {
    dispatch(setDestination(destinationName));
    navigate('/search');
  };

  const handleCategoryClick = (categoryName: string) => {
    dispatch(setCategory(categoryName));
    navigate('/search');
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    const tabs: TabType[] = ['attractions', 'destinations', 'categories'];
    const currentIndex = tabs.indexOf(activeTab);
    
    if (direction === 'right' && currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1]);
      // Scroll the next tab into view
      setTimeout(() => {
        const tabButtons = tabsRef.current?.querySelectorAll('button');
        if (tabButtons && tabButtons[currentIndex + 1]) {
          tabButtons[currentIndex + 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 50);
    } else if (direction === 'left' && currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1]);
      // Scroll the previous tab into view
      setTimeout(() => {
        const tabButtons = tabsRef.current?.querySelectorAll('button');
        if (tabButtons && tabButtons[currentIndex - 1]) {
          tabButtons[currentIndex - 1].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
      }, 50);
    }
  };

  const tabs: TabType[] = ['attractions', 'destinations', 'categories'];
  const currentIndex = tabs.indexOf(activeTab);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < tabs.length - 1;

  return (
    <section style={{ backgroundColor: '#f7f7f7', padding: 'var(--spacing-6x) 0', display: 'none' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tabs with Navigation Arrows (Mobile) */}
        <div className="relative mb-10">
          {/* Mobile: Scrollable tabs with arrows */}
          <div className="lg:hidden flex items-center gap-2" style={{ borderBottom: '1px solid #dcdfe4' }}>
            <button
              onClick={() => scrollTabs('left')}
              disabled={!canGoLeft}
              className="flex-shrink-0 pb-4 transition-colors duration-200"
              style={{
                background: 'none',
                border: 'none',
                cursor: canGoLeft ? 'pointer' : 'not-allowed',
                color: canGoLeft ? '#1a2b49' : '#dcdfe4',
                opacity: canGoLeft ? 1 : 0.5,
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div 
              ref={tabsRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide flex-1"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              <button
                onClick={() => setActiveTab('attractions')}
                className="pb-4 px-1 transition-all duration-200 relative flex-shrink-0"
                style={{
                  color: activeTab === 'attractions' ? '#1a2b49' : '#6b7280',
                  fontSize: '15px',
                  fontWeight: activeTab === 'attractions' ? 700 : 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Top attractions worldwide
                {activeTab === 'attractions' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#ff6f00',
                    }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('destinations')}
                className="pb-4 px-1 transition-all duration-200 relative flex-shrink-0"
                style={{
                  color: activeTab === 'destinations' ? '#1a2b49' : '#6b7280',
                  fontSize: '15px',
                  fontWeight: activeTab === 'destinations' ? 700 : 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Top destinations
                {activeTab === 'destinations' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#ff6f00',
                    }}
                  />
                )}
              </button>
              
              <button
                onClick={() => setActiveTab('categories')}
                className="pb-4 px-1 transition-all duration-200 relative flex-shrink-0"
                style={{
                  color: activeTab === 'categories' ? '#1a2b49' : '#6b7280',
                  fontSize: '15px',
                  fontWeight: activeTab === 'categories' ? 700 : 500,
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Top attraction categories
                {activeTab === 'categories' && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '-1px',
                      left: 0,
                      right: 0,
                      height: '3px',
                      backgroundColor: '#ff6f00',
                    }}
                  />
                )}
              </button>
            </div>

            <button
              onClick={() => scrollTabs('right')}
              disabled={!canGoRight}
              className="flex-shrink-0 pb-4 transition-colors duration-200"
              style={{
                background: 'none',
                border: 'none',
                cursor: canGoRight ? 'pointer' : 'not-allowed',
                color: canGoRight ? '#1a2b49' : '#dcdfe4',
                opacity: canGoRight ? 1 : 0.5,
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop: Normal tabs */}
          <div className="hidden lg:flex gap-10" style={{ borderBottom: '1px solid #dcdfe4' }}>
            <button
              onClick={() => setActiveTab('attractions')}
              className="pb-5 px-1 transition-all duration-200 relative"
              style={{
                color: activeTab === 'attractions' ? '#1a2b49' : '#6b7280',
                fontSize: '15px',
                fontWeight: activeTab === 'attractions' ? 700 : 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Top attractions worldwide
              {activeTab === 'attractions' && (
                <div
                  className="animate-slideInBottom"
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#1a2b49',
                  }}
                />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('destinations')}
              className="pb-5 px-1 transition-all duration-200 relative"
              style={{
                color: activeTab === 'destinations' ? '#1a2b49' : '#6b7280',
                fontSize: '15px',
                fontWeight: activeTab === 'destinations' ? 700 : 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Top destinations
              {activeTab === 'destinations' && (
                <div
                  className="animate-slideInBottom"
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#1a2b49',
                  }}
                />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('categories')}
              className="pb-5 px-1 transition-all duration-200 relative"
              style={{
                color: activeTab === 'categories' ? '#1a2b49' : '#6b7280',
                fontSize: '15px',
                fontWeight: activeTab === 'categories' ? 700 : 500,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Top attraction categories
              {activeTab === 'categories' && (
                <div
                  className="animate-slideInBottom"
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    left: 0,
                    right: 0,
                    height: '3px',
                    backgroundColor: '#1a2b49',
                  }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'attractions' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-6 animate-fadeIn">
            {attractionsData.map((attraction, index) => (
              <button
                key={index}
                onClick={() => navigate(`/activity/${attraction.slug}`)}
                className={`block py-2 text-left w-full ${index >= 12 ? 'hidden md:block' : ''}`}
                style={{ color: '#1a2b49', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                  {attraction.name}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  {attraction.location}
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'destinations' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-6 animate-fadeIn">
            {destinationsData.map((destination, index) => (
              <button
                key={index}
                onClick={() => handleDestinationClick(destination.name)}
                className={`block py-2 text-left w-full ${index >= 12 ? 'hidden md:block' : ''}`}
                style={{ color: '#1a2b49', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}>
                  {destination.name}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  {destination.tours} tours & activities
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 lg:gap-x-10 gap-y-6 animate-fadeIn">
            {categoriesData.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category.name)}
                className={`block py-2 text-left w-full ${index >= 12 ? 'hidden md:block' : ''}`}
                style={{ color: '#1a2b49', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '15px', fontWeight: 700 }}>
                  {category.name}
                </div>
                <div style={{ fontSize: '13px', color: '#6b7280' }}>
                  {category.tours} tours & activities
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}