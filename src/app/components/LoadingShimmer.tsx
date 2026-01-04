// Loading shimmer component - only shows during loading states
const shimmerStyles = `
  @keyframes loading-shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .loading-shimmer {
    position: relative;
    overflow: hidden;
    background: linear-gradient(
      90deg,
      #f0f0f0 0%,
      #f0f0f0 40%,
      #e0e0e0 50%,
      #f0f0f0 60%,
      #f0f0f0 100%
    );
    background-size: 200% 100%;
    animation: shimmer-background 1.5s infinite;
  }

  @keyframes shimmer-background {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  .loading-shimmer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.6) 50%,
      transparent 100%
    );
    animation: loading-shimmer 2s infinite;
  }

  .shimmer-box {
    border-radius: 8px;
  }

  .shimmer-circle {
    border-radius: 50%;
  }

  .shimmer-line {
    border-radius: 4px;
  }
`;

export function LoadingShimmer() {
  return (
    <>
      <style>{shimmerStyles}</style>
      <div className="bg-white">
        {/* Breadcrumb Shimmer */}
        <div className="border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2">
              <div className="loading-shimmer shimmer-line h-4 w-16" />
              <div className="loading-shimmer shimmer-line h-4 w-4" />
              <div className="loading-shimmer shimmer-line h-4 w-24" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Gallery Grid Shimmer */}
          <div className="grid grid-cols-4 gap-2 mb-6" style={{ height: '500px' }}>
            <div className="col-span-2 row-span-2 loading-shimmer shimmer-box" />
            <div className="col-span-2 loading-shimmer shimmer-box" />
            <div className="loading-shimmer shimmer-box" />
            <div className="loading-shimmer shimmer-box" />
            <div className="loading-shimmer shimmer-box" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column Shimmer */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badge */}
              <div className="loading-shimmer shimmer-box h-7 w-32" />
              
              {/* Title */}
              <div className="space-y-3">
                <div className="loading-shimmer shimmer-line h-10 w-full" />
                <div className="loading-shimmer shimmer-line h-10 w-3/4" />
              </div>

              {/* Meta Info */}
              <div className="flex gap-4">
                <div className="loading-shimmer shimmer-line h-5 w-32" />
                <div className="loading-shimmer shimmer-line h-5 w-24" />
                <div className="loading-shimmer shimmer-line h-5 w-28" />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <div className="loading-shimmer shimmer-box h-10 w-40" />
                <div className="loading-shimmer shimmer-box h-10 w-28" />
              </div>

              {/* Section Blocks */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="loading-shimmer shimmer-line h-8 w-48" />
                  <div className="loading-shimmer shimmer-line h-4 w-full" />
                  <div className="loading-shimmer shimmer-line h-4 w-full" />
                  <div className="loading-shimmer shimmer-line h-4 w-2/3" />
                </div>
              ))}
            </div>

            {/* Right Column - Booking Card Shimmer */}
            <div className="lg:col-span-1">
              <div 
                className="loading-shimmer shimmer-box p-6" 
                style={{ height: '500px' }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
