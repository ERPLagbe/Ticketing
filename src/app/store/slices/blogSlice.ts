import { createSlice } from '@reduxjs/toolkit';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
  location: string;
  readTime: string;
  publishedDate: string;
  tags: string[];
  featured?: boolean;
}

interface BlogState {
  posts: BlogPost[];
}

const initialState: BlogState = {
  posts: [
    {
      id: '1',
      title: 'Top 10 Hidden Gems in Paris You Must Visit in 2024',
      slug: 'top-10-hidden-gems-paris',
      excerpt: 'Discover the secret spots and lesser-known attractions that make Paris truly magical. From charming cafes to hidden gardens, explore the city like a local.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      author: {
        name: 'Sophie Martin',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
      },
      category: 'Destinations',
      location: 'Paris, France',
      readTime: '8 min read',
      publishedDate: 'Dec 15, 2024',
      tags: ['Paris', 'Hidden Gems', 'France', 'Europe', 'City Guide'],
      featured: true,
    },
    {
      id: '2',
      title: 'Complete Guide to Dubai Desert Safari: What to Expect',
      slug: 'dubai-desert-safari-guide',
      excerpt: 'Everything you need to know about experiencing the ultimate desert adventure in Dubai, from dune bashing to traditional Bedouin dinners.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      author: {
        name: 'Ahmed Hassan',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      },
      category: 'Experiences',
      location: 'Dubai, UAE',
      readTime: '10 min read',
      publishedDate: 'Dec 12, 2024',
      tags: ['Dubai', 'Desert Safari', 'UAE', 'Adventure'],
      featured: true,
    },
    {
      id: '3',
      title: 'How to Plan the Perfect Italian Road Trip',
      slug: 'perfect-italian-road-trip',
      excerpt: 'Drive through the stunning landscapes of Italy with our comprehensive guide covering routes, must-see stops, and insider tips.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
      author: {
        name: 'Marco Rossi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      },
      category: 'Travel Tips',
      location: 'Italy',
      readTime: '12 min read',
      publishedDate: 'Dec 10, 2024',
      tags: ['Italy', 'Road Trip', 'Europe', 'Travel Guide'],
    },
    {
      id: '4',
      title: 'Best Time to Visit Japan for Cherry Blossoms',
      slug: 'japan-cherry-blossoms-guide',
      excerpt: 'Plan your Japan trip perfectly with our detailed cherry blossom forecast and regional blooming schedules for 2024.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800',
      author: {
        name: 'Yuki Tanaka',
        avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100',
      },
      category: 'Destinations',
      location: 'Japan',
      readTime: '6 min read',
      publishedDate: 'Dec 8, 2024',
      tags: ['Japan', 'Cherry Blossoms', 'Asia', 'Spring'],
    },
    {
      id: '5',
      title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
      slug: 'sustainable-travel-carbon-footprint',
      excerpt: 'Make your travels more eco-friendly with these practical tips and sustainable tourism practices that benefit local communities.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
      author: {
        name: 'Emma Green',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      },
      category: 'Travel Tips',
      location: 'Global',
      readTime: '9 min read',
      publishedDate: 'Dec 5, 2024',
      tags: ['Sustainability', 'Eco-Friendly', 'Travel Tips', 'Environment'],
    },
    {
      id: '6',
      title: 'Exploring Ancient Ruins: A Guide to Machu Picchu',
      slug: 'machu-picchu-guide',
      excerpt: 'Uncover the mysteries of the Incan citadel with expert tips on hiking the Inca Trail and what to expect at this world wonder.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800',
      author: {
        name: 'Carlos Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
      },
      category: 'Experiences',
      location: 'Peru',
      readTime: '11 min read',
      publishedDate: 'Dec 3, 2024',
      tags: ['Peru', 'Machu Picchu', 'Hiking', 'Ancient Ruins'],
    },
    {
      id: '7',
      title: 'Northern Lights Photography: Tips from a Pro',
      slug: 'northern-lights-photography',
      excerpt: 'Capture the Aurora Borealis like a professional with camera settings, location tips, and timing advice from an expert photographer.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800',
      author: {
        name: 'Lars Eriksson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      },
      category: 'Photography',
      location: 'Iceland',
      readTime: '7 min read',
      publishedDate: 'Nov 30, 2024',
      tags: ['Photography', 'Northern Lights', 'Iceland', 'Aurora'],
    },
    {
      id: '8',
      title: 'Street Food Guide: Bangkok\'s Best Local Eats',
      slug: 'bangkok-street-food-guide',
      excerpt: 'Navigate Bangkok\'s incredible street food scene with our curated list of must-try dishes and the best vendors in the city.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=800',
      author: {
        name: 'Siriporn Wong',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100',
      },
      category: 'Food & Drink',
      location: 'Bangkok, Thailand',
      readTime: '8 min read',
      publishedDate: 'Nov 28, 2024',
      tags: ['Bangkok', 'Thailand', 'Street Food', 'Food Guide'],
    },
    {
      id: '9',
      title: 'Budget-Friendly European Backpacking Routes',
      slug: 'budget-european-backpacking',
      excerpt: 'Explore Europe on a budget with these affordable routes, money-saving tips, and recommendations for budget accommodations.',
      content: 'Full article content...',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800',
      author: {
        name: 'Anna Schmidt',
        avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100',
      },
      category: 'Travel Tips',
      location: 'Europe',
      readTime: '10 min read',
      publishedDate: 'Nov 25, 2024',
      tags: ['Europe', 'Backpacking', 'Budget Travel', 'Travel Tips'],
    },
  ],
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
});

export default blogSlice.reducer;