import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, User, Star } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Paris You Must Visit in 2024',
    excerpt: 'Discover the secret spots and lesser-known attractions that make Paris truly magical.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    category: 'Destinations',
    author: 'Sophie Martin',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Complete Guide to Dubai Desert Safari: What to Expect',
    excerpt: 'Everything you need to know about experiencing the ultimate desert adventure in Dubai.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    category: 'Experiences',
    author: 'Ahmed Hassan',
    date: 'Dec 12, 2024',
    readTime: '10 min read',
  },
  {
    id: '3',
    title: 'How to Plan the Perfect Italian Road Trip',
    excerpt: 'Drive through the stunning landscapes of Italy with our comprehensive guide.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    category: 'Travel Tips',
    author: 'Marco Rossi',
    date: 'Dec 8, 2024',
    readTime: '12 min read',
  },
  {
    id: '4',
    title: 'Best Time to Visit Japan: A Seasonal Guide',
    excerpt: 'From cherry blossoms to autumn leaves, discover the perfect season for your Japan adventure.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
    category: 'Travel Tips',
    author: 'Yuki Tanaka',
    date: 'Dec 5, 2024',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'Exploring Iceland: The Ultimate 7-Day Itinerary',
    excerpt: 'Experience the land of fire and ice with this comprehensive week-long adventure guide.',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800',
    category: 'Destinations',
    author: 'Erik Jonsson',
    date: 'Dec 1, 2024',
    readTime: '15 min read',
  },
  {
    id: '6',
    title: 'Street Food Adventures in Bangkok',
    excerpt: 'Navigate Bangkok\'s vibrant street food scene like a pro with our insider tips.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    category: 'Food & Culture',
    author: 'Niran Patel',
    date: 'Nov 28, 2024',
    readTime: '9 min read',
  },
  {
    id: '7',
    title: 'The Ultimate Guide to Hiking Machu Picchu',
    excerpt: 'Everything you need to know before embarking on this incredible Peruvian adventure.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    category: 'Experiences',
    author: 'Carlos Rodriguez',
    date: 'Nov 25, 2024',
    readTime: '11 min read',
  },
  {
    id: '8',
    title: 'Luxury Travel on a Budget: Expert Tips',
    excerpt: 'Discover how to experience luxury travel without breaking the bank.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800',
    category: 'Travel Tips',
    author: 'Emily Chen',
    date: 'Nov 22, 2024',
    readTime: '6 min read',
  },
];

export function OriginalsSection() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: 'var(--spacing-6x) 0', backgroundColor: '#fff' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and See More Button */}
        <div className="flex items-center justify-between mb-6">
          <h2>
            Travel Stories & Guides
          </h2>
          
          {/* See More Button - Desktop Only */}
          <button
            onClick={() => navigate('/blog')}
            className="hidden lg:block px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--decorative-guiding-red)',
              color: 'white',
            }}
          >
            See More
          </button>
        </div>

        {/* Grid */}
        <div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {blogPosts.slice(0, 4).map((post) => (
            <Link 
              key={post.id} 
              to={`/blog/${post.id}`} 
              className="block group"
            >
              <div 
                className="bg-white rounded-xl overflow-hidden transition-all duration-500 ease-out group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:-translate-y-1"
                style={{ 
                  border: '1px solid var(--border-primary)',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                  height: '200px',
                }}
              >
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Container */}
                  <div className="relative overflow-hidden w-full sm:w-64 h-48 sm:h-full flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
                    />
                    
                    {/* Category Badge */}
                    <small 
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-white font-semibold"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {post.category}
                    </small>
                  </div>

                  {/* Card Content */}
                  <div className="flex-1 flex flex-col justify-between" style={{ padding: '24px' }}>
                    <div>
                      {/* Title */}
                      <h4 
                        className="line-clamp-2 transition-colors duration-300 group-hover:text-[var(--interactive-primary)] mb-3"
                      >
                        {post.title}
                      </h4>

                      {/* Excerpt */}
                      <p 
                        className="line-clamp-2 mb-4"
                        style={{
                          color: 'var(--label-secondary)',
                        }}
                      >
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-xs pt-4 border-t" style={{ color: 'var(--label-tertiary)', borderColor: 'var(--border-primary)' }}>
                      <div className="flex items-center gap-1">
                        <Clock style={{ width: '14px', height: '14px' }} />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User style={{ width: '14px', height: '14px' }} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar style={{ width: '14px', height: '14px' }} />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* See More Button - Mobile Only - At the end */}
        <div className="lg:hidden mt-6 flex justify-center">
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-md hover:scale-105 active:scale-95"
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