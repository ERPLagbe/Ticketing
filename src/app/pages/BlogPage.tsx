import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Clock, User, TrendingUp, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Top 10 Hidden Gems in Paris You Must Visit in 2024',
    excerpt: 'Discover the secret spots and lesser-known attractions that make Paris truly magical. From charming cafes to hidden gardens, explore the city like a local.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    category: 'Destinations',
    author: 'Sophie Martin',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: '2',
    title: 'Complete Guide to Dubai Desert Safari: What to Expect',
    excerpt: 'Everything you need to know about experiencing the ultimate desert adventure in Dubai, from dune bashing to traditional Bedouin dinners.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    category: 'Experiences',
    author: 'Ahmed Hassan',
    date: 'Dec 12, 2024',
    readTime: '10 min read',
    featured: true,
  },
  {
    id: '3',
    title: 'How to Plan the Perfect Italian Road Trip',
    excerpt: 'Drive through the stunning landscapes of Italy with our comprehensive guide covering routes, must-see stops, and insider tips.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    category: 'Travel Tips',
    author: 'Marco Rossi',
    date: 'Dec 10, 2024',
    readTime: '12 min read',
  },
  {
    id: '4',
    title: 'Best Time to Visit Japan for Cherry Blossoms',
    excerpt: 'Plan your Japan trip perfectly with our detailed cherry blossom forecast and regional blooming schedules for 2024.',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
    category: 'Destinations',
    author: 'Yuki Tanaka',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
    excerpt: 'Make your travels more eco-friendly with these practical tips and sustainable tourism practices that benefit local communities.',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    category: 'Travel Tips',
    author: 'Emma Green',
    date: 'Dec 5, 2024',
    readTime: '9 min read',
  },
  {
    id: '6',
    title: 'Exploring Ancient Ruins: A Guide to Machu Picchu',
    excerpt: 'Uncover the mysteries of the Incan citadel with expert tips on hiking the Inca Trail and what to expect at this world wonder.',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
    category: 'Experiences',
    author: 'Carlos Rodriguez',
    date: 'Dec 3, 2024',
    readTime: '11 min read',
  },
  {
    id: '7',
    title: 'Northern Lights Photography: Tips from a Pro',
    excerpt: 'Capture the Aurora Borealis like a professional with camera settings, location tips, and timing advice from an expert photographer.',
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
    category: 'Photography',
    author: 'Lars Eriksson',
    date: 'Nov 30, 2024',
    readTime: '7 min read',
  },
  {
    id: '8',
    title: 'Street Food Guide: Bangkok\'s Best Local Eats',
    excerpt: 'Navigate Bangkok\'s incredible street food scene with our curated list of must-try dishes and the best vendors in the city.',
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800',
    category: 'Food & Drink',
    author: 'Siriporn Wong',
    date: 'Nov 28, 2024',
    readTime: '8 min read',
  },
  {
    id: '9',
    title: 'Budget-Friendly European Backpacking Routes',
    excerpt: 'Explore Europe on a budget with these affordable routes, money-saving tips, and recommendations for budget accommodations.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
    category: 'Travel Tips',
    author: 'Anna Schmidt',
    date: 'Nov 25, 2024',
    readTime: '10 min read',
  },
];

const categories = ['All', 'Destinations', 'Experiences', 'Travel Tips', 'Food & Drink', 'Photography'];

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div style={{ paddingTop: 'var(--spacing-8x)', backgroundColor: 'var(--background-secondary)' }}>
      {/* Hero Section */}
      <div style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl">
            <h1 className="mb-4" style={{ color: 'var(--label-primary)' }}>
              Travel Stories & Guides
            </h1>
            <p className="text-lg" style={{ color: 'var(--label-secondary)' }}>
              Discover inspiring travel stories, expert guides, and insider tips to plan your next unforgettable adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div style={{ 
        backgroundColor: 'var(--background-primary)', 
        borderBottom: '1px solid var(--separator-primary)',
        position: 'sticky',
        top: '64px',
        zIndex: 40,
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 glossy-hover flex-shrink-0"
                style={{
                  backgroundColor: selectedCategory === category 
                    ? 'var(--fill-accent)' 
                    : 'transparent',
                  border: `1px solid ${selectedCategory === category 
                    ? 'var(--interactive-primary)' 
                    : 'var(--border-primary)'}`,
                  color: selectedCategory === category 
                    ? 'var(--interactive-primary)' 
                    : 'var(--label-primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                }}
              >
                <span style={{ position: 'relative', zIndex: 2 }}>{category}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Posts */}
        {selectedCategory === 'All' && searchQuery === '' && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-6 h-6" style={{ color: 'var(--decorative-guiding-red)' }} />
              <h2 style={{ color: 'var(--label-primary)' }}>Featured Stories</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                    <div className="relative h-64 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <Badge 
                        className="absolute top-4 left-4"
                        style={{ 
                          backgroundColor: 'var(--decorative-guiding-red)',
                          color: 'white',
                        }}
                      >
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--label-tertiary)' }}>
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="mb-3 group-hover:text-[var(--decorative-guiding-red)] transition-colors" style={{ color: 'var(--label-primary)' }}>
                        {post.title}
                      </h3>
                      <p className="mb-4" style={{ color: 'var(--label-secondary)' }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--label-secondary)' }}>
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--label-tertiary)' }}>
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Posts Grid */}
        <div>
          {selectedCategory === 'All' && searchQuery === '' && (
            <h2 className="mb-6" style={{ color: 'var(--label-primary)' }}>Latest Articles</h2>
          )}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg" style={{ color: 'var(--label-secondary)' }}>
                No articles found matching your criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`}>
                  <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline">{post.category}</Badge>
                        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--label-tertiary)' }}>
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="mb-3 group-hover:text-[var(--decorative-guiding-red)] transition-colors" style={{ color: 'var(--label-primary)' }}>
                        {post.title}
                      </h3>
                      <p className="mb-4 flex-1" style={{ color: 'var(--label-secondary)' }}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
                        <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--label-secondary)' }}>
                          <User className="w-4 h-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--label-tertiary)' }}>
                          <Calendar className="w-4 h-4" />
                          {post.date}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Load More */}
        {filteredPosts.length >= 9 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => alert('Load more posts')}
            >
              Load More Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}