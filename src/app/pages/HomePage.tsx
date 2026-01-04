import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { setCategory } from '../store/slices/filtersSlice';
import { SearchBar } from '../components/SearchBar';
import { ActivityCard } from '../components/ActivityCard';
import { ActivityCarousel } from '../components/ActivityCarousel';
import { DestinationCarousel } from '../components/DestinationCarousel';
import { OriginalsSection } from '../components/OriginalsSection';
import { TopAttractionsSection } from '../components/TopAttractionsSection';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Star, TrendingUp, Award, Shield, CheckCircle2, Clock } from 'lucide-react';
import { HeroBanner } from '../components/HeroBanner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';

export function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.activities);

  const handleCategoryClick = (categoryName: string) => {
    dispatch(setCategory(categoryName));
    navigate('/search');
  };

  const categories = [
    { name: 'Attractions & Museums', image: 'https://images.unsplash.com/photo-1643820509303-79e98ac7e006?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBhcnQlMjBnYWxsZXJ5fGVufDF8fHx8MTc2NjAxNjQzNnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Tours & Sightseeing', image: 'https://images.unsplash.com/photo-1723324527602-4346f0acdb2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwdG91ciUyMHNpZ2h0c2VlaW5nfGVufDF8fHx8MTc2NjA1MzQ0Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Cruises & Water Tours', image: 'https://images.unsplash.com/photo-1722203229062-ee4e8110c80c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcnVpc2UlMjBib2F0JTIwd2F0ZXJ8ZW58MXx8fHwxNzY2MDUzNDQzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Food & Drink', image: 'https://images.unsplash.com/photo-1667388968964-4aa652df0a9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZGluaW5nJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NjU5NTQ0ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Cultural & Theme Tours', image: 'https://images.unsplash.com/photo-1760637625758-3c3a4c0ffb53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdWx0dXJhbCUyMGV4cGVyaWVuY2UlMjB0cmFkaXRpb25hbHxlbnwxfHx8fDE3NjYwNTM0NDR8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Outdoor Activities', image: 'https://images.unsplash.com/photo-1581153438971-3222a5814529?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdXRkb29yJTIwYWR2ZW50dXJlJTIwaGlraW5nfGVufDF8fHx8MTc2NTk4OTI4OXww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Day Trips & Excursions', image: 'https://images.unsplash.com/photo-1755184848988-a398675f4d34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBkYXklMjB0cmlwfGVufDF8fHx8MTc2NjA1MzQ0NHww&ixlib=rb-4.1.0&q=80&w=1080' },
    { name: 'Classes & Workshops', image: 'https://images.unsplash.com/photo-1706226096304-0bed2d0baeae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdGVyJTIwcGVyZm9ybWFuY2UlMjBzaG93fGVufDF8fHx8MTc2NjA1MzQ0M3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  ];

  const destinations = [
    { name: 'Rome', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600' },
    { name: 'Paris', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600' },
    { name: 'London', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600' },
    { name: 'New York City', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600' },
    { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600' },
    { name: 'Barcelona', image: 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=600' },
    { name: 'Tokyo', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600' },
    { name: 'Amsterdam', image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600' },
    { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600' },
    { name: 'Istanbul', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600' },
  ];

  return (
    <div>
      {/* Hero Banner */}
      <HeroBanner />

      {/* Categories */}
      <section className="bg-gradient-to-b from-gray-50 to-white" style={{ padding: 'var(--spacing-6x) 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            className="mb-8 transition-colors duration-200 opacity-0 animate-fadeInUp" 
            style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
          >
            Browse by category
          </h2>
          
          <div 
            className="opacity-0 animate-fadeInUp" 
            style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
          >
            <Carousel
              opts={{
                align: "start",
                loop: false,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {categories.map((category, index) => (
                  <CarouselItem key={category.name} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <button 
                      onClick={() => handleCategoryClick(category.name)}
                      className="block group w-full"
                    >
                      <div 
                        className="relative h-48 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl"
                        style={{
                          animationDelay: `${0.3 + index * 0.05}s`,
                        }}
                      >
                        {/* Category Image */}
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        
                        {/* Category Name */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 
                            className="text-white transition-transform duration-300 group-hover:translate-y-[-4px] text-left"
                            style={{ fontSize: '18px', fontWeight: 600, lineHeight: '1.3' }}
                          >
                            {category.name}
                          </h3>
                        </div>
                      </div>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-2 md:-left-4" />
              <CarouselNext className="-right-2 md:-right-4" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Featured Activities */}
      <ActivityCarousel 
        title="Based on your search in Porto" 
        activities={items.slice(0, 8)} 
      />

      {/* Popular Destinations */}
      <DestinationCarousel
        title="Things to do wherever you're going"
        destinations={destinations}
      />

      {/* Originals Section */}
      <OriginalsSection />

      {/* Top Attractions Tabs Section */}
      <TopAttractionsSection />

      {/* Trust & Benefits Section - Minimal Design */}
      <section className="bg-white border-t border-gray-200" style={{ padding: 'var(--spacing-6x) 0' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div 
              className="flex flex-col items-center text-center md:border-r md:border-gray-200 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-110">
                <Star className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: 600, color: '#1a2b49' }}>
                Trusted reviews
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                100M+ real reviews
              </p>
            </div>

            {/* Column 2 */}
            <div 
              className="flex flex-col items-center text-center md:border-r md:border-gray-200 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-110">
                <Shield className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: 600, color: '#1a2b49' }}>
                Quality assured
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Verified suppliers
              </p>
            </div>

            {/* Column 3 */}
            <div 
              className="flex flex-col items-center text-center md:border-r md:border-gray-200 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-110">
                <TrendingUp className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: 600, color: '#1a2b49' }}>
                Best price guarantee
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                Price match promise
              </p>
            </div>

            {/* Column 4 */}
            <div 
              className="flex flex-col items-center text-center opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4 transition-transform duration-200 hover:scale-110">
                <CheckCircle2 className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="mb-2" style={{ fontSize: '16px', fontWeight: 600, color: '#1a2b49' }}>
                24/7 support
              </h3>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}