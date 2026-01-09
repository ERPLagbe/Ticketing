import { useState } from 'react';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Review } from '../store/slices/activitiesSlice';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

export function ReviewsSection({ reviews, averageRating, totalReviews }: ReviewsSectionProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    percentage: (reviews.filter(r => r.rating === star).length / reviews.length) * 100
  }));

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!rating) {
      toast.error('Please select a rating');
      return;
    }
    
    if (!reviewTitle.trim() || !reviewComment.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // In a real app, this would submit to backend
    toast.success('Review submitted successfully!', {
      description: 'Your review will appear after moderation',
    });

    // Reset form
    setRating(0);
    setReviewTitle('');
    setReviewComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Ratings Overview */}
      <div className="mb-12">
        <h2 
          style={{ 
            fontSize: '32px',
            fontWeight: 700,
            color: 'var(--label-primary)',
            marginBottom: '32px',
          }}
        >
          Ratings & Reviews
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Average Rating */}
          <div className="lg:col-span-1">
            <div 
              className="p-8 rounded-xl text-center"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'white',
              }}
            >
              <div style={{ fontSize: '64px', fontWeight: 700, color: 'var(--label-primary)', lineHeight: 1 }}>
                {averageRating.toFixed(1)}
              </div>
              <div className="flex items-center justify-center gap-2 my-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6"
                    style={{
                      fill: i < Math.floor(averageRating) ? '#facc15' : 'none',
                      stroke: i < Math.floor(averageRating) ? '#facc15' : '#d1d5db',
                      strokeWidth: '1.5',
                    }}
                  />
                ))}
              </div>
              <div style={{ fontSize: '16px', color: 'var(--label-secondary)' }}>
                Based on {totalReviews.toLocaleString()} reviews
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="lg:col-span-2">
            <div 
              className="p-8 rounded-xl"
              style={{
                border: '1px solid var(--border-primary)',
                backgroundColor: 'white',
              }}
            >
              <div className="space-y-3">
                {ratingDistribution.map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-4">
                    <div className="flex items-center gap-1 w-16">
                      <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)' }}>
                        {star}
                      </span>
                      <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <div 
                        className="h-2 rounded-full overflow-hidden"
                        style={{ backgroundColor: '#e5e7eb' }}
                      >
                        <div 
                          className="h-full rounded-full transition-all duration-300"
                          style={{ 
                            width: `${percentage}%`,
                            backgroundColor: '#facc15',
                          }}
                        />
                      </div>
                    </div>
                    <div className="w-16 text-right">
                      <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Header with Filter and Write Review Button */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--label-primary)' }}>
            Customer Reviews ({reviews.length})
          </h3>
        </div>

        <div className="flex items-center gap-3">
          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-lg transition-colors"
            style={{
              border: '1px solid var(--border-primary)',
              color: 'var(--label-primary)',
              backgroundColor: 'white',
              fontSize: '14px',
            }}
          >
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>

          {/* Write Review Button */}
          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            style={{
              backgroundColor: 'var(--interactive-primary)',
              color: 'white',
              fontWeight: 600,
            }}
          >
            Write a Review
          </Button>
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div 
          className="mb-8 p-6 rounded-xl"
          style={{
            border: '2px solid var(--interactive-primary)',
            backgroundColor: 'var(--fill-accent)',
          }}
        >
          <h4 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--label-primary)', marginBottom: '24px' }}>
            Share Your Experience
          </h4>

          <form onSubmit={handleSubmitReview}>
            {/* Rating Stars */}
            <div className="mb-6">
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '12px' }}>
                Your Rating *
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      className="w-10 h-10 cursor-pointer"
                      style={{
                        fill: star <= (hoverRating || rating) ? '#facc15' : 'none',
                        stroke: star <= (hoverRating || rating) ? '#facc15' : '#d1d5db',
                        strokeWidth: '1.5',
                      }}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span style={{ marginLeft: '16px', fontSize: '16px', fontWeight: 600, color: 'var(--label-primary)' }}>
                    {rating === 5 ? 'Excellent!' : rating === 4 ? 'Very Good' : rating === 3 ? 'Good' : rating === 2 ? 'Fair' : 'Poor'}
                  </span>
                )}
              </div>
            </div>

            {/* Review Title */}
            <div className="mb-6">
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                Review Title *
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                placeholder="Sum up your experience..."
                className="w-full px-4 py-3 rounded-lg transition-colors"
                style={{
                  border: '1px solid var(--border-primary)',
                  color: 'var(--label-primary)',
                  backgroundColor: 'white',
                }}
              />
            </div>

            {/* Review Comment */}
            <div className="mb-6">
              <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--label-primary)', display: 'block', marginBottom: '8px' }}>
                Your Review *
              </label>
              <textarea
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows={5}
                className="w-full px-4 py-3 rounded-lg transition-colors resize-none"
                style={{
                  border: '1px solid var(--border-primary)',
                  color: 'var(--label-primary)',
                  backgroundColor: 'white',
                }}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex items-center gap-3">
              <Button
                type="submit"
                style={{
                  backgroundColor: 'var(--interactive-primary)',
                  color: 'white',
                  fontWeight: 600,
                }}
              >
                Submit Review
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowReviewForm(false)}
                style={{
                  border: '1px solid var(--border-primary)',
                  color: 'var(--label-primary)',
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-xl transition-shadow hover:shadow-md"
            style={{
              border: '1px solid var(--border-primary)',
              backgroundColor: 'white',
            }}
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {/* User Avatar */}
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--interactive-primary)',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: 700,
                  }}
                >
                  {review.userName.charAt(0)}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)' }}>
                      {review.userName}
                    </span>
                    {review.verified && (
                      <div className="flex items-center gap-1" style={{ color: '#10b981' }}>
                        <CheckCircle className="w-4 h-4" />
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>Verified</span>
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--label-secondary)' }}>
                    {format(new Date(review.date), 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4"
                    style={{
                      fill: i < review.rating ? '#facc15' : 'none',
                      stroke: i < review.rating ? '#facc15' : '#d1d5db',
                      strokeWidth: '1.5',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Review Content */}
            <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--label-primary)', marginBottom: '12px' }}>
              {review.title}
            </h4>
            <p style={{ fontSize: '14px', color: 'var(--label-secondary)', lineHeight: '24px', marginBottom: '16px' }}>
              {review.comment}
            </p>

            {/* Review Footer */}
            <div className="flex items-center justify-between pt-4" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <button 
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-gray-50"
                onClick={() => toast.success('Thank you for your feedback!')}
              >
                <ThumbsUp className="w-4 h-4" style={{ color: 'var(--label-secondary)' }} />
                <span style={{ fontSize: '14px', color: 'var(--label-secondary)' }}>
                  Helpful ({review.helpful})
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 5 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            style={{
              border: '2px solid var(--interactive-primary)',
              color: 'var(--interactive-primary)',
              fontWeight: 600,
              padding: '12px 32px',
            }}
          >
            Show More Reviews
          </Button>
        </div>
      )}
    </div>
  );
}
