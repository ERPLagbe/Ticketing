import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string; // ISO date string
  title: string;
  comment: string;
  helpful: number;
  verified: boolean;
}

export interface ActivityOption {
  id: string;
  title: string;
  duration: string;
  timeSlot: string;
  description: string;
  guide: string;
  price: number;
  offerPrice?: number;
  slotsLeft: number;
  availableDates: string[]; // ISO date strings
}

export interface Activity {
  id: string;
  slug: string;
  title: string;
  category: string;
  destination: string;
  location: string;
  locationMapUrl?: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  image: string;
  images: string[];
  details: string; // Rich text HTML
  paymentDeadlineDays?: number;
  isTourPackage?: boolean; // Flag for tour packages (no date selection needed)
  reviews: Review[];
  options: ActivityOption[];
}

interface ActivitiesState {
  items: Activity[];
  selectedActivity: Activity | null;
  loading: boolean;
}

// Helper to get specific weekdays for next 90 days (0=Sunday, 1=Monday, etc.)
const getNext90DaysForWeekdays = (weekdays: number[]): string[] => {
  const dates: string[] = [];
  const today = new Date();
  for (let i = 0; i < 90; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    if (weekdays.includes(date.getDay())) {
      dates.push(date.toISOString().split('T')[0]);
    }
  }
  return dates;
};

// Helper to generate sample reviews
const generateSampleReviews = (activityId: string, count: number = 5): Review[] => {
  const names = [
    'Sarah Martinez', 'James Thompson', 'Emily Chen', 'Michael Rodriguez', 'Lisa Anderson',
    'David Kim', 'Jennifer Wilson', 'Robert Taylor', 'Amanda Brown', 'Christopher Lee',
    'Jessica Moore', 'Daniel Garcia', 'Michelle White', 'Andrew Martin', 'Sophia Clark'
  ];
  
  const titles = [
    'Amazing experience!', 'Highly recommended!', 'Worth every penny',
    'Absolutely loved it!', 'Fantastic tour', 'Great value', 'Memorable experience',
    'Would do it again!', 'Exceeded expectations', 'Perfect activity',
    'Outstanding service', 'A must-do!', 'Simply wonderful', 'Incredible!',
    'Best experience ever!'
  ];
  
  const comments = [
    'This was one of the highlights of our trip. Everything was well organized and the guide was knowledgeable and friendly.',
    'We had an amazing time! The experience exceeded our expectations in every way. Would definitely recommend to friends and family.',
    'Great value for money. The entire experience was smooth from start to finish. Very professional service.',
    'Absolutely loved it! The attention to detail and quality of service was outstanding. Worth every dollar spent.',
    'This is a must-do activity. We learned so much and had a wonderful time. The guide was excellent and very accommodating.',
    'Highly recommend this experience. It was well-organized, informative, and a lot of fun. Would do it again!',
    'Everything was perfect! From booking to the actual experience, everything went smoothly. Great customer service.',
    'We had such a good time! The itinerary was perfect and we got to see everything we wanted. Very satisfied.',
    'This exceeded all our expectations. The guide was knowledgeable and the whole experience was memorable.',
    'One of the best activities we did. Professional, fun, and informative. Would definitely book again!'
  ];
  
  const reviews: Review[] = [];
  for (let i = 0; i < Math.min(count, names.length); i++) {
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 60) - 1);
    
    reviews.push({
      id: `${activityId}-r${i + 1}`,
      userName: names[i],
      rating: Math.random() > 0.3 ? 5 : (Math.random() > 0.5 ? 4 : 3),
      date: date.toISOString().split('T')[0],
      title: titles[i % titles.length],
      comment: comments[i % comments.length],
      helpful: Math.floor(Math.random() * 50) + 5,
      verified: Math.random() > 0.2,
    });
  }
  
  return reviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const mockActivities: Activity[] = [
  {
    id: '1',
    slug: 'paris-eiffel-tower-skip-line',
    title: 'Eiffel Tower: Skip-the-Line Tickets & Summit Access',
    category: 'Attractions & Museums',
    destination: 'Paris, France',
    location: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Eiffel+Tower+Paris',
    rating: 4.6,
    reviewCount: 12847,
    duration: '2 hours',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    images: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Avoid the long lines at the Eiffel Tower with skip-the-line tickets. Take the elevator to the summit for incredible views of Paris. Experience one of the world's most iconic landmarks without the wait.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Skip-the-line access to the Eiffel Tower</li>
        <li>Elevator to the summit</li>
        <li>Audio guide in multiple languages</li>
        <li>Breathtaking views of Paris</li>
      </ul>
      
      <h2>Important Information</h2>
      <p><strong>Not allowed:</strong></p>
      <ul>
        <li>Large bags or luggage</li>
        <li>Pets</li>
      </ul>
      <p><strong>Know before you go:</strong></p>
      <ul>
        <li>Security checks may cause short delays</li>
        <li>Weather conditions may affect visibility</li>
        <li>Please arrive 15 minutes before your scheduled time</li>
      </ul>
    `,
    paymentDeadlineDays: 14,
    options: [
      {
        id: '1-1',
        title: 'Standard Access with Audio Guide',
        duration: '2 hours',
        timeSlot: '10:00 AM',
        description: 'Skip-the-line access to the second floor with multilingual audio guide',
        guide: 'English',
        price: 45.99,
        slotsLeft: 25,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '1-2',
        title: 'Summit Access with Priority Entry',
        duration: '2.5 hours',
        timeSlot: '2:00 PM',
        description: 'Priority access all the way to the summit including second floor and top level',
        guide: 'English',
        price: 89.99,
        offerPrice: 69.99,
        slotsLeft: 15,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '1-3',
        title: 'Sunset Experience',
        duration: '2 hours',
        timeSlot: '6:00 PM',
        description: 'Evening access to enjoy the sunset and city lights from the Eiffel Tower',
        guide: 'English',
        price: 65.99,
        slotsLeft: 8,
        availableDates: getNext90DaysForWeekdays([4, 5, 6]), // Thu, Fri, Sat
      },
    ],
    reviews: generateSampleReviews('1'),
  },
  {
    id: '2',
    slug: 'rome-colosseum-tour',
    title: 'Colosseum & Roman Forum: Guided Tour',
    category: 'Tours & Sightseeing',
    destination: 'Rome, Italy',
    location: 'Piazza del Colosseo, 1, 00184 Roma RM, Italy',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Colosseum+Rome',
    rating: 4.8,
    reviewCount: 8654,
    duration: '3 hours',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Explore ancient Rome with a knowledgeable guide. Visit the Colosseum, Roman Forum, and Palatine Hill on this comprehensive walking tour.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Expert local guide</li>
        <li>Skip-the-line access to all sites</li>
        <li>Visit to Colosseum, Roman Forum & Palatine Hill</li>
        <li>Small group tour (maximum 20 people)</li>
        <li>Audio headsets for groups over 10</li>
      </ul>
      
      <h2>Itinerary</h2>
      <p><strong>Stop 1:</strong> Colosseum - Learn about gladiator battles and Roman entertainment (60 minutes)</p>
      <p><strong>Stop 2:</strong> Roman Forum - Walk through ancient Rome's political center (60 minutes)</p>
      <p><strong>Stop 3:</strong> Palatine Hill - Explore where emperors lived (45 minutes)</p>
      
      <h2>Important Information</h2>
      <p><strong>What to bring:</strong></p>
      <ul>
        <li>Comfortable walking shoes</li>
        <li>Water bottle</li>
        <li>Sun protection in summer</li>
      </ul>
    `,
    paymentDeadlineDays: 7,
    options: [
      {
        id: '2-1',
        title: 'Morning Guided Tour',
        duration: '3 hours',
        timeSlot: '9:00 AM',
        description: 'Complete tour of Colosseum, Forum and Palatine Hill with expert guide',
        guide: 'English',
        price: 59.99,
        slotsLeft: 18,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '2-2',
        title: 'Afternoon Small Group Tour',
        duration: '3 hours',
        timeSlot: '2:30 PM',
        description: 'Intimate small group experience (max 12 people) with licensed archaeologist',
        guide: 'English',
        price: 79.99,
        offerPrice: 64.99,
        slotsLeft: 6,
        availableDates: getNext90DaysForWeekdays([2, 4, 6]), // Tue, Thu, Sat
      },
    ],
    reviews: generateSampleReviews('2'),
  },
  {
    id: '5',
    slug: 'amsterdam-canal-cruise',
    title: 'Amsterdam Canal Cruise with Audio Guide',
    category: 'Cruises & Water Tours',
    destination: 'Amsterdam, Netherlands',
    location: 'Damrak Pier 5, 1012 LG Amsterdam, Netherlands',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Damrak+Pier+Amsterdam',
    rating: 4.4,
    reviewCount: 9876,
    duration: '1 hour',
    price: 18.50,
    image: 'https://images.unsplash.com/photo-1741290607214-4165d5e969fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXN0ZXJkYW0lMjBjYW5hbCUyMGJvYXQlMjBjcnVpc2V8ZW58MXx8fHwxNzY3ODYxNjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1741290607214-4165d5e969fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbXN0ZXJkYW0lMjBjYW5hbCUyMGJvYXQlMjBjcnVpc2V8ZW58MXx8fHwxNzY3ODYxNjkzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>See the city from the water on a relaxing canal cruise with multilingual audio commentary. Discover Amsterdam's UNESCO-listed canal ring and iconic architecture.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>1-hour classic canal cruise</li>
        <li>Audio guide in 19 languages</li>
        <li>See famous landmarks and bridges</li>
        <li>Open-air boat option (weather permitting)</li>
      </ul>
      
      <h2>Highlights</h2>
      <p>Cruise past the Anne Frank House, the Skinny Bridge, the Golden Bend, and Amsterdam's historic merchant houses.</p>
    `,
    options: [
      {
        id: '5-1',
        title: 'Standard Canal Cruise',
        duration: '1 hour',
        timeSlot: '11:00 AM',
        description: 'Classic canal cruise with audio guide in 19 languages',
        guide: 'Audio Guide',
        price: 18.50,
        slotsLeft: 45,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '5-2',
        title: 'Sunset Canal Cruise',
        duration: '1 hour',
        timeSlot: '7:00 PM',
        description: 'Evening cruise to see Amsterdam at golden hour',
        guide: 'Audio Guide',
        price: 22.50,
        slotsLeft: 30,
        availableDates: getNext90DaysForWeekdays([5, 6, 0]), // Fri, Sat, Sun
      },
    ],
    reviews: generateSampleReviews('5'),
  },
  {
    id: '10',
    slug: 'tokyo-food-tour',
    title: 'Tokyo: Street Food Walking Tour',
    category: 'Food & Drink',
    destination: 'Tokyo, Japan',
    location: 'Shibuya Station Hachiko Exit, Tokyo 150-0043, Japan',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Shibuya+Station+Tokyo',
    rating: 4.8,
    reviewCount: 5234,
    duration: '3 hours',
    price: 68.00,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Discover Tokyo's best street food with a local guide. Try authentic Japanese dishes and snacks while exploring hidden neighborhoods.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Local food expert guide</li>
        <li>8+ food and drink tastings</li>
        <li>Visit to hidden local spots</li>
        <li>Small group tour (max 10 people)</li>
        <li>Cultural insights and recommendations</li>
      </ul>
      
      <h2>Sample Foods</h2>
      <p>Takoyaki, yakitori, ramen, taiyaki, matcha desserts, sake tasting, and seasonal specialties.</p>
      
      <h2>Important Information</h2>
      <ul>
        <li>Vegetarian options available with advance notice</li>
        <li>Not suitable for those with severe food allergies</li>
        <li>Please inform us of dietary restrictions when booking</li>
      </ul>
    `,
    options: [
      {
        id: '10-1',
        title: 'Evening Street Food Tour',
        duration: '3 hours',
        timeSlot: '6:00 PM',
        description: 'Experience Tokyo nightlife and street food culture',
        guide: 'English',
        price: 68.00,
        slotsLeft: 8,
        availableDates: getNext90DaysForWeekdays([2, 4, 5, 6]), // Tue, Thu, Fri, Sat
      },
      {
        id: '10-2',
        title: 'Lunch Street Food Tour',
        duration: '3 hours',
        timeSlot: '11:30 AM',
        description: 'Daytime food adventure through Tokyo markets',
        guide: 'English',
        price: 68.00,
        slotsLeft: 10,
        availableDates: getNext90DaysForWeekdays([1, 3, 6, 0]), // Mon, Wed, Sat, Sun
      },
    ],
    reviews: generateSampleReviews('10'),
  },
  {
    id: '11',
    slug: 'sydney-opera-house',
    title: 'Sydney Opera House: Guided Tour',
    category: 'Attractions & Museums',
    destination: 'Sydney, Australia',
    location: 'Bennelong Point, Sydney NSW 2000, Australia',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Sydney+Opera+House',
    rating: 4.6,
    reviewCount: 9876,
    duration: '1 hour',
    price: 42.00,
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
      'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=800',
      'https://images.unsplash.com/photo-1545044896-b6dfaad8aaea?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Go behind the scenes at the iconic Sydney Opera House with an expert guide. Learn about the history, architecture, and cultural significance of this UNESCO World Heritage site.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Behind-the-scenes access to restricted areas</li>
        <li>Expert guide with architectural insights</li>
        <li>Visit to concert halls and theaters</li>
        <li>Stories about performances and events</li>
      </ul>
      
      <h2>Highlights</h2>
      <p>Explore multiple performance venues, learn about Jørn Utzon's revolutionary design, and enjoy stunning harbor views.</p>
    `,
    options: [
      {
        id: '11-1',
        title: 'Standard Guided Tour',
        duration: '1 hour',
        timeSlot: '10:00 AM',
        description: 'Comprehensive tour of the Opera House with expert guide',
        guide: 'English',
        price: 42.00,
        slotsLeft: 22,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '11-2',
        title: 'Backstage Tour',
        duration: '2 hours',
        timeSlot: '2:00 PM',
        description: 'Extended tour with exclusive backstage access',
        guide: 'English',
        price: 75.00,
        offerPrice: 62.00,
        slotsLeft: 12,
        availableDates: getNext90DaysForWeekdays([3, 5, 0]), // Wed, Fri, Sun
      },
    ],
    reviews: generateSampleReviews('11'),
  },
  {
    id: '12',
    slug: 'thailand-elephant-sanctuary',
    title: 'Chiang Mai: Ethical Elephant Sanctuary Visit',
    category: 'Outdoor Activities',
    destination: 'Chiang Mai, Thailand',
    location: 'Mae Taeng District, Chiang Mai 50150, Thailand',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Elephant+Sanctuary+Chiang+Mai',
    rating: 5.0,
    reviewCount: 4321,
    duration: 'Full day',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1732272823287-024c713741f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHNhbmN0dWFyeSUyMHRoYWlsYW5kfGVufDF8fHx8MTc2Nzg2MTY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    images: [
      'https://images.unsplash.com/photo-1732272823287-024c713741f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVwaGFudCUyMHNhbmN0dWFyeSUyMHRoYWlsYW5kfGVufDF8fHx8MTc2Nzg2MTY5M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800',
      'https://images.unsplash.com/photo-1551244032-e58a2bc994e3?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Spend a day with rescued elephants in an ethical sanctuary. Feed, bathe, and learn about elephant conservation in a natural forest environment.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Ethical sanctuary visit (no riding)</li>
        <li>Feed and bathe elephants</li>
        <li>Traditional Thai lunch</li>
        <li>Hotel pickup and drop-off</li>
        <li>Professional guide and photographer</li>
        <li>Sanctuary support donation</li>
      </ul>
      
      <h2>Conservation Commitment</h2>
      <p>This sanctuary rescues elephants from tourism and logging industries. No riding, no shows - just natural interaction and care.</p>
      
      <h2>What to Bring</h2>
      <ul>
        <li>Change of clothes</li>
        <li>Swimwear for bathing elephants</li>
        <li>Waterproof bag</li>
        <li>Sunscreen and insect repellent</li>
      </ul>
    `,
    options: [
      {
        id: '12-1',
        title: 'Full Day Sanctuary Experience',
        duration: '7 hours',
        timeSlot: '8:00 AM',
        description: 'Complete day with elephants including feeding, bathing, and conservation talk',
        guide: 'English',
        price: 85.00,
        slotsLeft: 10,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
    ],
    reviews: generateSampleReviews('12'),
  },
  {
    id: '18',
    slug: 'london-harry-potter-tour',
    title: 'Harry Potter Warner Bros Studio Tour with Transport',
    category: 'Entertainment & Shows',
    destination: 'London, UK',
    location: 'Warner Bros. Studio Tour, Leavesden WD25 7LR, UK',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Warner+Bros+Studio+Tour+London',
    rating: 4.9,
    reviewCount: 22456,
    duration: '7 hours',
    price: 115.00,
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
    images: [
      'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
      'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Visit the actual sets, costumes, and props from the Harry Potter films. Includes round-trip luxury coach transport from central London.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Round-trip luxury coach transport</li>
        <li>Explore authentic film sets</li>
        <li>See original props and costumes</li>
        <li>Complimentary Butterbeer</li>
        <li>4 hours at the studio</li>
        <li>Interactive exhibits and special effects</li>
      </ul>
      
      <h2>Highlights</h2>
      <p>Walk through the Great Hall, Diagon Alley, Platform 9¾, Dumbledore's office, and discover the secrets of special effects and animatronics.</p>
      
      <h2>Important Information</h2>
      <ul>
        <li>Duration: 7 hours total (including transport)</li>
        <li>Photography allowed throughout</li>
        <li>Café and gift shop on-site</li>
        <li>Suitable for all ages</li>
      </ul>
    `,
    isTourPackage: true,
    options: [
      {
        id: '18-1',
        title: 'Standard Studio Tour with Transport',
        duration: '7 hours',
        timeSlot: '9:00 AM',
        description: 'Complete studio experience with luxury coach from London',
        guide: 'Self-guided',
        price: 115.00,
        slotsLeft: 35,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '18-2',
        title: 'Breakfast & Studio Tour Package',
        duration: '8 hours',
        timeSlot: '8:00 AM',
        description: 'Early access with breakfast at the studio café before general opening',
        guide: 'Self-guided',
        price: 145.00,
        offerPrice: 125.00,
        slotsLeft: 20,
        availableDates: getNext90DaysForWeekdays([6, 0]), // Sat, Sun
      },
    ],
    reviews: generateSampleReviews('18'),
  },
  {
    id: '21',
    slug: 'dubai-desert-safari',
    title: 'Dubai: Desert Safari with BBQ Dinner & Entertainment',
    category: 'Adventure & Outdoor',
    destination: 'Dubai, UAE',
    location: 'Dubai Desert Conservation Reserve, Dubai, UAE',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Dubai+Desert+Safari',
    rating: 4.7,
    reviewCount: 13245,
    duration: '6 hours',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Experience the Arabian desert with dune bashing, camel rides, and a BBQ dinner under the stars. Enjoy traditional entertainment including belly dancing and Tanoura shows.</p>
      
      <h2>What's Included</h2>
      <ul>
        <li>Dune bashing adventure in 4x4</li>
        <li>Camel riding experience</li>
        <li>BBQ dinner buffet with unlimited soft drinks</li>
        <li>Live entertainment (belly dance, Tanoura show, fire show)</li>
        <li>Hotel pickup and drop-off in Dubai</li>
        <li>Henna painting and traditional dress photo opportunities</li>
        <li>Sandboarding</li>
      </ul>
      
      <h2>Itinerary</h2>
      <p><strong>3:00 PM:</strong> Hotel pickup</p>
      <p><strong>4:00 PM:</strong> Dune bashing and sandboarding</p>
      <p><strong>6:00 PM:</strong> Camel riding and sunset photo stop</p>
      <p><strong>7:30 PM:</strong> BBQ dinner and live shows</p>
      <p><strong>9:30 PM:</strong> Return to hotel</p>
      
      <h2>Important Information</h2>
      <ul>
        <li>Not recommended for pregnant women or those with back problems</li>
        <li>Alcohol available for purchase</li>
        <li>Vegetarian options available</li>
      </ul>
    `,
    options: [
      {
        id: '21-1',
        title: 'Standard Desert Safari',
        duration: '6 hours',
        timeSlot: '3:00 PM',
        description: 'Classic desert experience with all activities and BBQ dinner',
        guide: 'English',
        price: 75.00,
        slotsLeft: 40,
        availableDates: getNext90DaysForWeekdays([1, 3, 5, 6]), // Mon, Wed, Fri, Sat
      },
      {
        id: '21-2',
        title: 'VIP Desert Safari',
        duration: '6 hours',
        timeSlot: '3:00 PM',
        description: 'Premium experience with private table, upgraded menu, and falcon photography',
        guide: 'English',
        price: 120.00,
        offerPrice: 99.00,
        slotsLeft: 15,
        availableDates: getNext90DaysForWeekdays([4, 5, 6]), // Thu, Fri, Sat
      },
    ],
    reviews: generateSampleReviews('21'),
  },
  // Tour Package Activities
  {
    id: 'tour-1',
    slug: 'nepal-tour-package',
    title: 'Nepal: 10 Days Kathmandu, Pokhara & Chitwan Tour Package',
    category: 'Tour Packages',
    destination: 'Nepal',
    location: 'Kathmandu, Pokhara, Chitwan - Nepal',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Kathmandu+Nepal',
    rating: 4.9,
    reviewCount: 3456,
    duration: '10 days / 9 nights',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1605640840605-14ac1855827b?w=800',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800',
      'https://images.unsplash.com/photo-1512273222628-aa7adcbcad2d?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Discover the beauty and spirituality of Nepal on this comprehensive 10-day tour package. Explore ancient temples in Kathmandu, witness stunning Himalayan views in Pokhara, and experience wildlife safari in Chitwan National Park.</p>
      
      <h2>Itinerary Highlights</h2>
      <p><strong>Day 1-3: Kathmandu</strong></p>
      <ul>
        <li>Visit UNESCO World Heritage Sites: Pashupatinath, Boudhanath, Swayambhunath</li>
        <li>Explore Kathmandu Durbar Square</li>
        <li>Traditional Nepali welcome dinner</li>
      </ul>
      
      <p><strong>Day 4-7: Pokhara</strong></p>
      <ul>
        <li>Sunrise view of Annapurna and Dhaulagiri ranges</li>
        <li>Boat ride on Phewa Lake</li>
        <li>Visit Peace Pagoda and Davis Falls</li>
        <li>Optional paragliding (additional cost)</li>
      </ul>
      
      <p><strong>Day 8-9: Chitwan National Park</strong></p>
      <ul>
        <li>Jungle safari to spot rhinos, elephants, and tigers</li>
        <li>Canoe ride on Rapti River</li>
        <li>Cultural Tharu dance performance</li>
      </ul>
      
      <p><strong>Day 10: Departure</strong></p>
      <ul>
        <li>Transfer to airport</li>
        <li>Farewell and safe journey</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>9 nights accommodation in 3-star hotels</li>
        <li>Daily breakfast and selected meals</li>
        <li>All transfers and transportation in private vehicle</li>
        <li>English-speaking tour guide</li>
        <li>All entrance fees and permits</li>
        <li>Jungle safari activities in Chitwan</li>
        <li>Airport pickup and drop-off</li>
      </ul>
      
      <h2>Important Information</h2>
      <p><strong>What to Bring:</strong></p>
      <ul>
        <li>Valid passport with 6 months validity</li>
        <li>Comfortable walking shoes</li>
        <li>Light jacket for mountain areas</li>
        <li>Sunscreen and sunglasses</li>
        <li>Camera for stunning landscapes</li>
      </ul>
      
      <p><strong>Note:</strong> Nepal visa can be obtained on arrival at Kathmandu airport (USD 30 for 15 days).</p>
    `,
    paymentDeadlineDays: 30,
    isTourPackage: true,
    options: [
      {
        id: 'tour-1-1',
        title: 'Standard Package (3-Star Hotels)',
        duration: '10 days / 9 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Year-round departures every Monday and Thursday. Contact us for specific departure dates and group availability.',
        guide: 'English-speaking guide',
        price: 1299.00,
        slotsLeft: 12,
        availableDates: [], // Empty for tour packages
      },
      {
        id: 'tour-1-2',
        title: 'Deluxe Package (4-Star Hotels)',
        duration: '10 days / 9 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Year-round departures every Monday and Thursday. Upgraded accommodations with better amenities. Contact us for availability.',
        guide: 'English-speaking guide',
        price: 1799.00,
        offerPrice: 1599.00,
        slotsLeft: 8,
        availableDates: [], // Empty for tour packages
      },
    ],
    reviews: generateSampleReviews('tour-1'),
  },
  {
    id: 'tour-2',
    slug: 'malaysia-tour-package',
    title: 'Malaysia: 8 Days Kuala Lumpur, Penang & Langkawi Package',
    category: 'Tour Packages',
    destination: 'Malaysia',
    location: 'Kuala Lumpur, Penang, Langkawi - Malaysia',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Kuala+Lumpur+Malaysia',
    rating: 4.8,
    reviewCount: 2876,
    duration: '8 days / 7 nights',
    price: 1099.00,
    image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
    images: [
      'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=800',
      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
      'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Experience the diverse culture, cuisine, and landscapes of Malaysia. From the modern skyline of Kuala Lumpur to the heritage streets of Penang and the pristine beaches of Langkawi, this tour offers the perfect Malaysian adventure.</p>
      
      <h2>Itinerary Highlights</h2>
      <p><strong>Day 1-3: Kuala Lumpur</strong></p>
      <ul>
        <li>Visit iconic Petronas Twin Towers</li>
        <li>Explore Batu Caves temple</li>
        <li>Shopping at Bukit Bintang</li>
        <li>Visit KL Tower for panoramic views</li>
        <li>Experience vibrant street food at Jalan Alor</li>
      </ul>
      
      <p><strong>Day 4-5: Penang</strong></p>
      <ul>
        <li>George Town UNESCO Heritage Site walking tour</li>
        <li>Famous Penang street art and murals</li>
        <li>Kek Lok Si Temple visit</li>
        <li>Penang Hill funicular ride</li>
        <li>Local food tour (char kway teow, laksa, rojak)</li>
      </ul>
      
      <p><strong>Day 6-7: Langkawi</strong></p>
      <ul>
        <li>Island hopping tour (3 islands)</li>
        <li>Langkawi Cable Car and Sky Bridge</li>
        <li>Relaxation at Pantai Cenang beach</li>
        <li>Sunset cruise (optional)</li>
      </ul>
      
      <p><strong>Day 8: Departure</strong></p>
      <ul>
        <li>Free time for last-minute shopping</li>
        <li>Airport transfer</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>7 nights accommodation in selected hotels</li>
        <li>Daily breakfast</li>
        <li>All inter-city transfers (flights/bus)</li>
        <li>Private airport transfers</li>
        <li>English-speaking local guides</li>
        <li>All entrance fees as per itinerary</li>
        <li>Island hopping boat tour in Langkawi</li>
      </ul>
      
      <h2>Not Included</h2>
      <ul>
        <li>International flights</li>
        <li>Lunch and dinner (except mentioned)</li>
        <li>Personal expenses and tips</li>
        <li>Travel insurance</li>
      </ul>
      
      <h2>Best Time to Visit</h2>
      <p>Malaysia is a year-round destination. Best weather: December to February. Avoid monsoon season (November-January) for east coast destinations.</p>
    `,
    paymentDeadlineDays: 30,
    isTourPackage: true,
    options: [
      {
        id: 'tour-2-1',
        title: 'Standard Package',
        duration: '8 days / 7 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Daily departures available. Minimum 2 persons required. Contact us 7 days before preferred travel date.',
        guide: 'English-speaking guides',
        price: 1099.00,
        slotsLeft: 15,
        availableDates: [], // Empty for tour packages
      },
      {
        id: 'tour-2-2',
        title: 'Honeymoon Special Package',
        duration: '8 days / 7 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Daily departures. Includes romantic dinners, couple spa session, and beachfront room upgrades.',
        guide: 'English-speaking guides',
        price: 1499.00,
        offerPrice: 1299.00,
        slotsLeft: 6,
        availableDates: [], // Empty for tour packages
      },
    ],
    reviews: generateSampleReviews('tour-2'),
  },
  {
    id: 'tour-3',
    slug: 'thailand-tour-package',
    title: 'Thailand: 9 Days Bangkok, Chiang Mai & Phuket Package',
    category: 'Tour Packages',
    destination: 'Thailand',
    location: 'Bangkok, Chiang Mai, Phuket - Thailand',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Bangkok+Thailand',
    rating: 4.9,
    reviewCount: 4523,
    duration: '9 days / 8 nights',
    price: 1199.00,
    image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
    images: [
      'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800',
      'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
      'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800',
      'https://images.unsplash.com/photo-1537956965359-7573183d1f57?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Explore the Land of Smiles with this comprehensive Thailand tour. Experience the bustling streets of Bangkok, the cultural richness of Chiang Mai, and the tropical paradise of Phuket.</p>
      
      <h2>Itinerary Highlights</h2>
      <p><strong>Day 1-3: Bangkok</strong></p>
      <ul>
        <li>Grand Palace and Emerald Buddha Temple</li>
        <li>Wat Pho (Reclining Buddha)</li>
        <li>Long-tail boat ride through canals</li>
        <li>Chatuchak Weekend Market (if applicable)</li>
        <li>Khao San Road and Asiatique night market</li>
      </ul>
      
      <p><strong>Day 4-6: Chiang Mai</strong></p>
      <ul>
        <li>Doi Suthep Temple visit</li>
        <li>Ethical elephant sanctuary experience</li>
        <li>Old City temple tour</li>
        <li>Traditional Thai cooking class</li>
        <li>Night Bazaar shopping</li>
      </ul>
      
      <p><strong>Day 7-8: Phuket</strong></p>
      <ul>
        <li>Phi Phi Islands day tour by speedboat</li>
        <li>Patong Beach relaxation</li>
        <li>Optional: James Bond Island tour</li>
        <li>Beach clubs and sunset views</li>
        <li>Bangla Road nightlife experience</li>
      </ul>
      
      <p><strong>Day 9: Departure</strong></p>
      <ul>
        <li>Free time until airport transfer</li>
      </ul>
      
      <h2>What's Included</h2>
      <ul>
        <li>8 nights accommodation (3-4 star hotels)</li>
        <li>Daily breakfast</li>
        <li>Domestic flights (Bangkok-Chiang Mai-Phuket)</li>
        <li>All transfers and transportation</li>
        <li>English-speaking tour guides</li>
        <li>Entrance fees as per itinerary</li>
        <li>Phi Phi Islands speedboat tour</li>
        <li>Elephant sanctuary visit</li>
        <li>Thai cooking class</li>
      </ul>
      
      <h2>Not Included</h2>
      <ul>
        <li>International flights to/from Thailand</li>
        <li>Lunch and dinner (except specified)</li>
        <li>Personal expenses and optional tours</li>
        <li>Travel insurance</li>
        <li>Tips for guides and drivers</li>
      </ul>
      
      <h2>Important Notes</h2>
      <ul>
        <li>Modest dress required for temple visits</li>
        <li>Weather: Hot and humid year-round, rainy season May-October</li>
        <li>Visa: Many nationalities get 30-day visa exemption</li>
      </ul>
    `,
    paymentDeadlineDays: 30,
    isTourPackage: true,
    options: [
      {
        id: 'tour-3-1',
        title: 'Standard Package',
        duration: '9 days / 8 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Departures every Tuesday, Thursday, and Saturday. Minimum 2 persons. Book at least 10 days in advance.',
        guide: 'English-speaking guides',
        price: 1199.00,
        slotsLeft: 18,
        availableDates: [], // Empty for tour packages
      },
      {
        id: 'tour-3-2',
        title: 'Premium Package with Beach Resort',
        duration: '9 days / 8 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Daily departures. Includes 4-star beachfront resort in Phuket and additional island tours.',
        guide: 'English-speaking guides',
        price: 1699.00,
        offerPrice: 1499.00,
        slotsLeft: 10,
        availableDates: [], // Empty for tour packages
      },
    ],
    reviews: generateSampleReviews('tour-3'),
  },
  {
    id: 'tour-4',
    slug: 'vietnam-tour-package',
    title: 'Vietnam: 12 Days Hanoi, Halong Bay, Hoi An & Ho Chi Minh',
    category: 'Tour Packages',
    destination: 'Vietnam',
    location: 'Hanoi, Halong Bay, Hoi An, Ho Chi Minh - Vietnam',
    locationMapUrl: 'https://www.google.com/maps/search/?api=1&query=Hanoi+Vietnam',
    rating: 4.9,
    reviewCount: 3892,
    duration: '12 days / 11 nights',
    price: 1499.00,
    image: 'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
    images: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?w=800',
      'https://images.unsplash.com/photo-1555587751-b4c93da6e93f?w=800',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800',
      'https://images.unsplash.com/photo-1557750255-c76072a7aad1?w=800',
    ],
    details: `
      <h2>Overview</h2>
      <p>Discover the beauty, history, and culture of Vietnam from north to south. This comprehensive tour takes you through bustling cities, UNESCO World Heritage Sites, and stunning natural landscapes.</p>
      
      <h2>Itinerary Highlights</h2>
      <p><strong>Day 1-3: Hanoi</strong></p>
      <ul>
        <li>Old Quarter walking tour</li>
        <li>Hoan Kiem Lake and Ngoc Son Temple</li>
        <li>Ho Chi Minh Mausoleum and Museum</li>
        <li>Temple of Literature</li>
        <li>Water puppet show</li>
        <li>Street food tour</li>
      </ul>
      
      <p><strong>Day 4-5: Halong Bay</strong></p>
      <ul>
        <li>Overnight cruise on traditional junk boat</li>
        <li>Kayaking through limestone karsts</li>
        <li>Visit Sung Sot Cave</li>
        <li>Tai Chi on deck at sunrise</li>
        <li>Fresh seafood meals</li>
      </ul>
      
      <p><strong>Day 6-8: Hoi An</strong></p>
      <ul>
        <li>Ancient Town UNESCO Site</li>
        <li>Japanese Covered Bridge</li>
        <li>Lantern-making workshop</li>
        <li>Tailor-made clothing experience</li>
        <li>My Son Sanctuary day trip</li>
        <li>Evening lantern festival</li>
      </ul>
      
      <p><strong>Day 9-11: Ho Chi Minh City & Mekong Delta</strong></p>
      <ul>
        <li>War Remnants Museum</li>
        <li>Cu Chi Tunnels tour</li>
        <li>Notre-Dame Cathedral and Central Post Office</li>
        <li>Ben Thanh Market</li>
        <li>Mekong Delta boat tour</li>
        <li>Floating markets</li>
      </ul>
      
      <p><strong>Day 12: Departure</strong></p>
      
      <h2>What's Included</h2>
      <ul>
        <li>11 nights accommodation (hotels + 1 night cruise)</li>
        <li>Daily breakfast and selected meals</li>
        <li>Domestic flights (Hanoi-Da Nang, Hoi An-Ho Chi Minh)</li>
        <li>Overnight Halong Bay cruise</li>
        <li>All transfers and transportation</li>
        <li>English-speaking guides</li>
        <li>All entrance fees</li>
        <li>Water puppet show ticket</li>
      </ul>
      
      <h2>Best Time to Visit</h2>
      <p>March to May and September to November offer the best weather across Vietnam.</p>
    `,
    paymentDeadlineDays: 30,
    isTourPackage: true,
    options: [
      {
        id: 'tour-4-1',
        title: 'Standard Package',
        duration: '12 days / 11 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Weekly departures every Friday. Minimum 2 persons. Book 14 days in advance for best availability.',
        guide: 'English-speaking guides',
        price: 1499.00,
        slotsLeft: 14,
        availableDates: [], // Empty for tour packages
      },
      {
        id: 'tour-4-2',
        title: 'Deluxe Package',
        duration: '12 days / 11 nights',
        timeSlot: 'Flexible',
        description: 'Available dates: Daily departures. Upgraded 4-star hotels and luxury Halong Bay cruise with private balcony cabins.',
        guide: 'English-speaking guides',
        price: 2099.00,
        offerPrice: 1899.00,
        slotsLeft: 8,
        availableDates: [], // Empty for tour packages
      },
    ],
    reviews: generateSampleReviews('tour-4'),
  },
];

const initialState: ActivitiesState = {
  items: mockActivities,
  selectedActivity: null,
  loading: false,
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setSelectedActivity: (state, action: PayloadAction<string>) => {
      state.selectedActivity = state.items.find(item => item.slug === action.payload) || null;
    },
    clearSelectedActivity: (state) => {
      state.selectedActivity = null;
    },
  },
});

export const { setSelectedActivity, clearSelectedActivity } = activitiesSlice.actions;
export default activitiesSlice.reducer;