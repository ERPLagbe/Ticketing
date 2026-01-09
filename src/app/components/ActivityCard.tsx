import { Link } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Activity } from '../store/slices/activitiesSlice';
import { toggleWishlist } from '../store/slices/wishlistSlice';
import { RootState } from '../store/store';
import { toast } from 'sonner';

interface ActivityCardProps {
  activity: Activity;
  showWishlist?: boolean;
}

// Glossy hover effect only (no shimmer)
const glossyStyles = `
  .activity-card-glossy {
    position: relative;
  }

  .activity-card-glossy::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 50%;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    pointer-events: none;
    border-radius: inherit;
    opacity: 0;
    transition: opacity 0.5s ease;
  }

  .group:hover .activity-card-glossy::after {
    opacity: 1;
  }
`;

export function ActivityCard({ activity, showWishlist = true }: ActivityCardProps) {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === activity.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(activity));
    
    if (isInWishlist) {
      toast.success('Removed from wishlist');
    } else {
      toast.success('Added to wishlist');
    }
  };

  return (
    <>
      <style>{glossyStyles}</style>
      <Link to={`/activity/${activity.slug}`} className="block group">
        <div 
          className="bg-white rounded-xl overflow-hidden transition-all duration-500 ease-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:-translate-y-2 group-hover:scale-[1.02] activity-card-glossy"
          style={{ 
            border: '1px solid var(--border-primary)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
            borderLeft: '3px solid transparent',
          }}
        >
          {/* Image Container */}
          <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
            <img
              src={activity.image}
              alt={activity.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
            />
            
            {/* Tour Package Badge */}
            {activity.isTourPackage && (
              <div 
                className="absolute top-3 left-3 px-3 py-1.5 rounded-full font-semibold text-xs"
                style={{
                  backgroundColor: '#FF4905',
                  color: 'white',
                  boxShadow: '0 2px 8px rgba(255, 73, 5, 0.3)',
                  letterSpacing: '0.3px',
                }}
              >
                TOUR PACKAGE
              </div>
            )}

            {/* Wishlist Button */}
            {showWishlist && (
              <button
                className="absolute bg-white rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-50 active:scale-95"
                style={{ 
                  top: '12px',
                  right: '12px',
                  width: '36px',
                  height: '36px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={handleWishlistToggle}
              >
                <Heart 
                  className={`w-4 h-4 transition-all duration-300 ${isInWishlist ? 'fill-red-500 stroke-red-500' : 'hover:fill-red-500 hover:stroke-red-500'}`}
                  style={{ color: isInWishlist ? '#ef4444' : 'var(--label-primary)', strokeWidth: 2 }}
                />
              </button>
            )}
          </div>

          {/* Card Content */}
          <div style={{ padding: 'var(--spacing-2-5x)' }}>
            {/* Category */}
            <small 
              className="transition-colors duration-300 group-hover:text-[#0066ff]"
              style={{ 
                color: 'var(--label-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: 'var(--spacing-1x)',
                display: 'block',
                fontWeight: 600,
              }}
            >
              {activity.category}
            </small>

            {/* Title */}
            <h4 
              className="line-clamp-2 transition-colors duration-300 group-hover:text-[var(--interactive-primary)]"
              style={{ 
                marginBottom: 'var(--spacing-1-5x)',
                minHeight: '42px',
              }}
            >
              {activity.title}
            </h4>

            {/* Duration and Details */}
            <p 
              className="transition-colors duration-300 group-hover:text-[var(--label-primary)]"
              style={{ 
                color: 'var(--label-secondary)',
                marginBottom: 'var(--spacing-1-5x)',
              }}
            >
              {activity.duration}
            </p>

            {/* Rating */}
            <div className="flex items-center" style={{ gap: '6px' }}>
              {/* Stars */}
              <div className="flex items-center transition-transform duration-300 group-hover:scale-105" style={{ gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="transition-all duration-300 group-hover:fill-yellow-400 group-hover:stroke-yellow-400"
                    style={{
                      width: '13px',
                      height: '13px',
                      fill: i < Math.floor(activity.rating) ? 'var(--label-primary)' : 'none',
                      stroke: i < Math.floor(activity.rating) ? 'var(--label-primary)' : '#d1d5db',
                      strokeWidth: '1.5',
                    }}
                  />
                ))}
              </div>

              {/* Rating Number */}
              <small 
                className="transition-colors duration-300 group-hover:text-[#0066ff]"
                style={{ 
                  color: 'var(--label-primary)',
                  fontWeight: 700,
                }}
              >
                {activity.rating}
              </small>

              {/* Review Count */}
              <small 
                style={{ 
                  color: 'var(--label-secondary)',
                }}
              >
                ({activity.reviewCount.toLocaleString()})
              </small>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}