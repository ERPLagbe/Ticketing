import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, Clock, User, Share2, Heart, Facebook, Twitter, Link2, Mail, ChevronRight, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { toast } from 'sonner';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  tags: string[];
}

const blogPosts: Record<string, BlogPost> = {
  '1': {
    id: '1',
    title: 'Top 10 Hidden Gems in Paris You Must Visit in 2024',
    excerpt: 'Discover the secret spots and lesser-known attractions that make Paris truly magical. From charming cafes to hidden gardens, explore the city like a local.',
    content: [
      'Paris is known for its iconic landmarks like the Eiffel Tower and the Louvre, but the true magic of the City of Light lies in its hidden corners and secret spots that most tourists never discover.',
      'After living in Paris for five years, I\'ve uncovered some incredible places that offer a more authentic and intimate experience of this beautiful city. Here are my top 10 hidden gems that will make your Paris trip truly unforgettable.',
      '## 1. Musée de la Chasse et de la Nature',
      'Tucked away in the Marais district, this quirky museum combines hunting artifacts with contemporary art in the most unexpected ways. The beautifully restored mansion itself is worth the visit, and you\'ll likely have the place almost to yourself.',
      '## 2. Promenade Plantée',
      'Long before New York\'s High Line, Paris created this elevated park on an old railway viaduct. Walk through green tunnels and enjoy views of the city from a completely different perspective. It\'s especially magical during spring when flowers are in bloom.',
      '## 3. La Mosquée de Paris',
      'This stunning mosque features incredible Moorish architecture and a peaceful courtyard café where you can enjoy authentic mint tea and pastries. It\'s an oasis of tranquility in the bustling Latin Quarter.',
      '## 4. Canal Saint-Martin',
      'While not entirely unknown, this canal is still less touristy than other Parisian spots. Join locals for a picnic along the water, browse vintage shops, and watch boats navigate the locks. The atmosphere here is quintessentially Parisian.',
      '## 5. Musée Nissim de Camondo',
      'This beautifully preserved mansion gives you a glimpse into aristocratic life in early 20th century Paris. The collection of 18th-century furniture and decorative arts is stunning, and the tragic family story adds depth to the experience.',
      '## 6. Parc des Buttes-Chaumont',
      'This is where Parisians go to escape tourists. Built on an old quarry, this park features dramatic cliffs, waterfalls, and a temple perched on a rocky island. Pack a picnic and spend an afternoon like a true local.',
      '## 7. Rue Crémieux',
      'This pedestrian street is one of the most colorful and photogenic spots in Paris. The pastel-painted houses look like something from a fairy tale, and it\'s completely free to visit and photograph.',
      '## 8. Le Comptoir Général',
      'This eclectic bar and cultural space is hidden behind an unmarked door on Canal Saint-Martin. Inside, you\'ll find tropical plants, vintage furniture, live music, and some of the best cocktails in Paris.',
      '## 9. Sainte-Chapelle at Night',
      'While Sainte-Chapelle itself isn\'t hidden, experiencing it during evening concerts transforms it into something magical. The stained glass windows illuminated by candlelight create an unforgettable atmosphere.',
      '## 10. Cimetière du Père-Lachaise',
      'Yes, it\'s a cemetery, but it\'s also an incredible outdoor museum and peaceful green space. Beyond the famous graves, explore the quiet corners and discover beautiful sculptures and architecture.',
      '## Final Tips',
      'To truly experience these hidden gems, go early in the morning or during weekdays when they\'re less crowded. Take your time, bring a good camera, and don\'t be afraid to get lost in the side streets – that\'s often where you\'ll find the most magical moments.',
      'Paris is a city that rewards curiosity and exploration. These hidden gems offer a glimpse into the authentic Paris that locals love, away from the tourist crowds. Each spot has its own unique charm and story to tell.',
    ],
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    category: 'Destinations',
    author: 'Sophie Martin',
    authorBio: 'Sophie is a Paris-based travel writer who has been exploring hidden corners of the City of Light for over five years. She specializes in uncovering authentic local experiences.',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    date: 'Dec 15, 2024',
    readTime: '8 min read',
    tags: ['Paris', 'Hidden Gems', 'France', 'Europe', 'City Guide'],
  },
  '2': {
    id: '2',
    title: 'Complete Guide to Dubai Desert Safari: What to Expect',
    excerpt: 'Everything you need to know about experiencing the ultimate desert adventure in Dubai, from dune bashing to traditional Bedouin dinners.',
    content: [
      'A desert safari is one of the most thrilling and culturally immersive experiences you can have in Dubai. This comprehensive guide will help you prepare for an unforgettable adventure in the Arabian Desert.',
      '## What is a Desert Safari?',
      'A desert safari typically involves a 4x4 journey into the Dubai desert, where you\'ll experience dune bashing, camel riding, sandboarding, and a traditional Bedouin-style camp with dinner and entertainment.',
      '## Best Time to Go',
      'The ideal time for a desert safari is during the cooler months from October to April. Morning safaris offer better photography light, while evening safaris include spectacular sunsets and dinner under the stars.',
      '## What to Wear',
      'Dress comfortably in loose, light clothing. Avoid white clothes as they get dirty quickly in the desert. Bring a light jacket for the evening as temperatures can drop significantly after sunset.',
      '## Activities You\'ll Experience',
      'Dune bashing is the highlight – an exhilarating 4x4 ride over sand dunes. You\'ll also try sandboarding, ride camels, and enjoy henna painting and traditional performances at the desert camp.',
      '## Food and Entertainment',
      'Most desert safaris include a buffet dinner with traditional Arabic dishes, grilled meats, and vegetarian options. You\'ll be entertained by belly dancers, fire shows, and Tanoura dance performances.',
      '## Photography Tips',
      'The desert offers incredible photo opportunities. Golden hour (just before sunset) provides the best lighting. Bring extra batteries as the extreme temperatures can drain them quickly.',
      '## Safety Considerations',
      'Choose reputable tour operators with experienced drivers. Wear your seatbelt during dune bashing, stay hydrated, and apply sunscreen regularly. If you have back problems, inform your driver.',
      '## What to Bring',
      'Essential items include sunglasses, sunscreen, a hat, camera, and cash for tipping. Leave valuable jewelry at your hotel as sand can be damaging.',
      '## Final Thoughts',
      'A desert safari is a must-do Dubai experience that combines adventure, culture, and natural beauty. Book in advance, especially during peak season, to secure your spot.',
    ],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    category: 'Experiences',
    author: 'Ahmed Hassan',
    authorBio: 'Ahmed is a Dubai native and adventure travel specialist who has been guiding desert safaris for over 10 years.',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    date: 'Dec 12, 2024',
    readTime: '10 min read',
    tags: ['Dubai', 'Desert Safari', 'Adventure', 'UAE', 'Middle East'],
  },
  '3': {
    id: '3',
    title: 'How to Plan the Perfect Italian Road Trip',
    excerpt: 'Drive through the stunning landscapes of Italy with our comprehensive guide covering routes, must-see stops, and insider tips.',
    content: [
      'Italy is a country that begs to be explored by car. From the rolling hills of Tuscany to the dramatic Amalfi Coast, a road trip allows you to discover hidden villages, stop at family-run trattorias, and experience Italy at your own pace.',
      '## Best Routes',
      'The classic Tuscany route takes you through Florence, Siena, and San Gimignano. The Amalfi Coast drive offers breathtaking coastal views. For wine lovers, explore Piedmont and the Chianti region.',
      '## When to Go',
      'Spring (April-May) and fall (September-October) offer pleasant weather and fewer crowds. Summer is busy but perfect for coastal drives. Winter can be challenging in mountainous areas.',
      '## Renting a Car',
      'Book in advance for better rates. An International Driving Permit is required. Choose manual transmission (automatic is more expensive). GPS is essential for navigating small villages.',
      '## Driving Tips',
      'ZTL (limited traffic zones) in historic centers require permits – park outside and walk in. Highways (autostrada) require toll payments. Gas stations may close during siesta hours.',
      '## Must-Stop Towns',
      'Don\'t miss Montepulciano for wine, Lucca for medieval walls, Positano for coastal beauty, and Assisi for spiritual history. Each town offers unique charm and authentic Italian experiences.',
    ],
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200',
    category: 'Travel Tips',
    author: 'Marco Rossi',
    authorBio: 'Marco is an Italian travel expert who has spent decades exploring every corner of his beautiful country by car.',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    date: 'Dec 10, 2024',
    readTime: '12 min read',
    tags: ['Italy', 'Road Trip', 'Tuscany', 'Amalfi Coast', 'Europe'],
  },
  '4': {
    id: '4',
    title: 'Best Time to Visit Japan for Cherry Blossoms',
    excerpt: 'Plan your Japan trip perfectly with our detailed cherry blossom forecast and regional blooming schedules for 2024.',
    content: [
      'Cherry blossom season (sakura) is one of the most magical times to visit Japan. The delicate pink flowers transform the country into a dreamy landscape, but timing is crucial for catching peak bloom.',
      '## Regional Blooming Schedule',
      'Southern Japan (Kyushu) blooms earliest, typically late March. Tokyo and Kyoto peak in early April. Northern regions like Hokkaido bloom in May. Plan your route north to catch multiple blooming periods.',
      '## Best Viewing Spots in Tokyo',
      'Ueno Park offers 1,000+ cherry trees and lively hanami parties. Meguro River features illuminated evening viewing. Shinjuku Gyoen provides peaceful contemplation with different cherry varieties.',
      '## Kyoto\'s Top Locations',
      'The Philosopher\'s Path is lined with hundreds of trees. Maruyama Park hosts traditional nighttime viewing. Arashiyama bamboo grove area offers cherry blossoms plus scenic mountain backdrops.',
    ],
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200',
    category: 'Destinations',
    author: 'Yuki Tanaka',
    authorBio: 'Yuki is a Japanese culture specialist who helps travelers experience authentic Japan beyond the tourist highlights.',
    authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    date: 'Dec 8, 2024',
    readTime: '6 min read',
    tags: ['Japan', 'Cherry Blossoms', 'Sakura', 'Tokyo', 'Kyoto'],
  },
  '5': {
    id: '5',
    title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
    excerpt: 'Make your travels more eco-friendly with these practical tips and sustainable tourism practices that benefit local communities.',
    content: [
      'Sustainable travel isn\'t about giving up travel – it\'s about making conscious choices that minimize environmental impact while supporting local communities and preserving destinations for future generations.',
      '## Transportation Choices',
      'Take trains instead of flights when possible. If flying, choose direct routes and economy class. Use public transportation, bikes, or walk at your destination. Offset unavoidable emissions.',
      '## Accommodation',
      'Stay at eco-certified hotels or locally-owned guesthouses. Look for properties with solar power, water conservation, and waste reduction programs. Avoid changing towels and linens daily.',
      '## Supporting Local Communities',
      'Buy from local markets and artisans. Eat at family-run restaurants. Hire local guides. Choose tour operators that pay fair wages and give back to communities.',
    ],
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200',
    category: 'Travel Tips',
    author: 'Emma Green',
    authorBio: 'Emma is a sustainable tourism advocate and environmental scientist who promotes responsible travel practices.',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    date: 'Dec 5, 2024',
    readTime: '9 min read',
    tags: ['Sustainable Travel', 'Eco Tourism', 'Travel Tips', 'Environment'],
  },
  '6': {
    id: '6',
    title: 'Exploring Ancient Ruins: A Guide to Machu Picchu',
    excerpt: 'Uncover the mysteries of the Incan citadel with expert tips on hiking the Inca Trail and what to expect at this world wonder.',
    content: [
      'Machu Picchu remains one of the world\'s most awe-inspiring archaeological sites. This comprehensive guide will help you plan your visit to the ancient Incan citadel perched high in the Peruvian Andes.',
      '## Getting There',
      'Most visitors start from Cusco. You can hike the Classic Inca Trail (4 days), take the train to Aguas Calientes, or combine shorter treks with train travel. Book permits months in advance.',
      '## Best Time to Visit',
      'The dry season (May-September) offers clearer views but more crowds. Shoulder months (April, October) balance weather and visitor numbers. Avoid the rainy season (December-March).',
      '## What to See',
      'Don\'t miss the Sun Gate (Inti Punku), Temple of the Sun, and Intihuatana stone. Climb Huayna Picchu or Machu Picchu Mountain for panoramic views (separate permits required).',
    ],
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=1200',
    category: 'Experiences',
    author: 'Carlos Rodriguez',
    authorBio: 'Carlos is a Peruvian archaeologist and trek guide who has been leading tours to Machu Picchu for over 15 years.',
    authorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200',
    date: 'Dec 3, 2024',
    readTime: '11 min read',
    tags: ['Machu Picchu', 'Peru', 'Hiking', 'Ancient Ruins', 'South America'],
  },
  '7': {
    id: '7',
    title: 'Northern Lights Photography: Tips from a Pro',
    excerpt: 'Capture the Aurora Borealis like a professional with camera settings, location tips, and timing advice from an expert photographer.',
    content: [
      'Photographing the Northern Lights is on many travelers\' bucket lists. With the right preparation, equipment, and techniques, you can capture stunning images of this natural phenomenon.',
      '## Camera Settings',
      'Use manual mode with ISO 1600-3200, aperture f/2.8 or wider, and shutter speed 15-25 seconds. Shoot in RAW format for maximum editing flexibility. Disable image stabilization on a tripod.',
      '## Essential Equipment',
      'A DSLR or mirrorless camera with manual controls is essential. Wide-angle lens (14-24mm) captures more sky. Sturdy tripod prevents blur. Extra batteries (cold drains them quickly).',
      '## Best Locations',
      'Iceland, Norwegian Arctic, Finnish Lapland, and northern Canada offer excellent viewing. Find dark locations away from light pollution. Check Aurora forecasts and clear sky predictions.',
    ],
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1200',
    category: 'Photography',
    author: 'Lars Eriksson',
    authorBio: 'Lars is a professional Aurora photographer based in Iceland who teaches photography workshops across the Arctic.',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    date: 'Nov 30, 2024',
    readTime: '7 min read',
    tags: ['Northern Lights', 'Photography', 'Aurora', 'Iceland', 'Arctic'],
  },
  '8': {
    id: '8',
    title: 'Street Food Guide: Bangkok\'s Best Local Eats',
    excerpt: 'Navigate Bangkok\'s incredible street food scene with our curated list of must-try dishes and the best vendors in the city.',
    content: [
      'Bangkok\'s street food scene is legendary. From bustling night markets to roadside stalls, the city offers an incredible culinary adventure. This guide will help you navigate the best local eats safely and deliciously.',
      '## Must-Try Dishes',
      'Pad Thai from Thip Samai, boat noodles in Old Town, mango sticky rice from Mae Varee, som tam (papaya salad), satay skewers, and coconut ice cream in fresh coconut shells.',
      '## Best Street Food Areas',
      'Yaowarat (Chinatown) for seafood and Chinese-Thai fusion. Khao San Road for late-night snacks. Chatuchak Weekend Market for variety. Sukhumvit Soi 38 for night market atmosphere.',
      '## Safety Tips',
      'Choose busy stalls with high turnover. Avoid pre-cut fruit sitting out. Drink bottled water. Start with milder dishes if you\'re sensitive to spice. Carry hand sanitizer.',
    ],
    image: 'https://images.unsplash.com/photo-1504707748692-419802cf939d?w=1200',
    category: 'Food & Drink',
    author: 'Siriporn Wong',
    authorBio: 'Siriporn is a Bangkok food blogger who has spent years documenting the city\'s best street food vendors and hidden culinary gems.',
    authorImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200',
    date: 'Nov 28, 2024',
    readTime: '8 min read',
    tags: ['Bangkok', 'Street Food', 'Thailand', 'Food Guide', 'Asia'],
  },
  '9': {
    id: '9',
    title: 'Budget-Friendly European Backpacking Routes',
    excerpt: 'Explore Europe on a budget with these affordable routes, money-saving tips, and recommendations for budget accommodations.',
    content: [
      'Backpacking through Europe doesn\'t have to break the bank. With smart planning and these budget-friendly routes, you can experience the continent\'s highlights without overspending.',
      '## Eastern Europe Route',
      'Start in Prague, explore Krakow, visit Budapest, and end in Belgrade. This route offers incredible value with stunning architecture, rich history, and delicious food at fraction of Western prices.',
      '## Budget Transportation',
      'Use buses (FlixBus, RegioJet) instead of trains. Book flights during sales. Consider night trains to save accommodation costs. Get rail passes only if they make financial sense.',
      '## Accommodation Tips',
      'Stay in hostels with kitchen facilities. Use Couchsurfing for free accommodation and local insights. Book accommodations with free breakfast. Consider work exchanges through Workaway.',
    ],
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200',
    category: 'Travel Tips',
    author: 'Anna Schmidt',
    authorBio: 'Anna is a budget travel expert who has backpacked through 40+ countries and helps others travel on a shoestring budget.',
    authorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200',
    date: 'Nov 25, 2024',
    readTime: '10 min read',
    tags: ['Europe', 'Budget Travel', 'Backpacking', 'Travel Tips', 'Eastern Europe'],
  },
};

const relatedPosts = [
  {
    id: '3',
    title: 'How to Plan the Perfect Italian Road Trip',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400',
    category: 'Travel Tips',
    readTime: '12 min read',
  },
  {
    id: '4',
    title: 'Best Time to Visit Japan for Cherry Blossoms',
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=400',
    category: 'Destinations',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'Sustainable Travel: How to Reduce Your Carbon Footprint',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400',
    category: 'Travel Tips',
    readTime: '9 min read',
  },
];

export function BlogDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = id ? blogPosts[id] : null;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ paddingTop: 'var(--spacing-8x)' }}>
        <div className="text-center">
          <h2 className="mb-4" style={{ color: 'var(--label-primary)' }}>Article not found</h2>
          <Button onClick={() => navigate('/blog')}>
            Back to Blog
          </Button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
        break;
    }
  };

  return (
    <div className="overflow-x-hidden" style={{ paddingTop: '64px', backgroundColor: 'var(--background-secondary)' }}>
      {/* Breadcrumbs */}
      <div className="border-b" style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--background-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--label-secondary)' }}>
            <Link to="/" className="hover:underline cursor-pointer">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:underline cursor-pointer">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span style={{ color: 'var(--label-primary)' }}>{post.category}</span>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col">
            <Button
              variant="ghost"
              className="mb-4 gap-2 self-start"
              onClick={() => navigate('/blog')}
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>

            <Badge 
              className="mb-6 inline-block self-start"
              style={{
                fontSize: '14px',
                fontWeight: 600,
                padding: '8px 16px',
                backgroundColor: 'var(--interactive-primary)',
                color: 'white',
                borderRadius: '6px',
              }}
            >
              {post.category}
            </Badge>
          </div>
          
          <h1 className="mb-6" style={{ color: 'var(--label-primary)' }}>
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-6" style={{ color: 'var(--label-secondary)' }}>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-3 pb-8 border-b" style={{ borderColor: 'var(--border-primary)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--label-secondary)' }}>Share:</span>
            <button
              onClick={() => handleShare('facebook')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Facebook className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Twitter className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            </button>
            <button
              onClick={() => handleShare('email')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Mail className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Link2 className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            </button>
            <button
              onClick={() => toast.success('Added to wishlist!')}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors ml-auto"
              style={{ border: '1px solid var(--border-primary)' }}
            >
              <Heart className="w-5 h-5" style={{ color: 'var(--label-secondary)' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-2xl overflow-hidden">
          <ImageWithFallback
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Card>
          <CardContent className="p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="mt-8 mb-4" style={{ color: 'var(--label-primary)' }}>
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                return (
                  <p key={index} className="mb-6 leading-relaxed" style={{ color: 'var(--label-secondary)' }}>
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-primary)' }}>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Posts */}
        <div className="mt-16">
          <h2 className="mb-6" style={{ color: 'var(--label-primary)' }}>
            Related Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <Link key={relatedPost.id} to={`/blog/${relatedPost.id}`}>
                <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 h-full">
                  <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                    <ImageWithFallback
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="outline" className="mb-2">{relatedPost.category}</Badge>
                    <h4 className="mb-2 group-hover:text-[var(--decorative-guiding-red)] transition-colors" style={{ color: 'var(--label-primary)' }}>
                      {relatedPost.title}
                    </h4>
                    <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--label-tertiary)' }}>
                      <Clock className="w-4 h-4" />
                      {relatedPost.readTime}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}