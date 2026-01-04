import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Activity {
  id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  category: string;
  price: number;
  rating: number;
  reviewCount: number;
  duration: string;
  image: string;
  highlights: string[];
  images: string[];
  isOriginal?: boolean;
  details?: string[];
  availability?: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
}

interface ActivitiesState {
  items: Activity[];
  selectedActivity: Activity | null;
  loading: boolean;
}

// Helper function to generate availability (all activities available for next 6 months)
const getAvailability = () => {
  const today = new Date();
  const sixMonthsFromNow = new Date();
  sixMonthsFromNow.setMonth(today.getMonth() + 6);
  
  return {
    startDate: today.toISOString().split('T')[0], // YYYY-MM-DD format
    endDate: sixMonthsFromNow.toISOString().split('T')[0],
  };
};

const mockActivities: Activity[] = [
  {
    id: '1',
    slug: 'paris-eiffel-tower-skip-line',
    title: 'Eiffel Tower: Skip-the-Line Tickets & Summit Access',
    description: 'Avoid the long lines at the Eiffel Tower with skip-the-line tickets. Take the elevator to the summit for incredible views of Paris.',
    location: 'Paris, France',
    category: 'Attractions & Museums',
    price: 45.99,
    rating: 4.6,
    reviewCount: 12847,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
    highlights: ['Skip the long ticket lines', 'Elevator to the summit', 'Breathtaking views of Paris', 'Audio guide included'],
    images: [
      'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '2',
    slug: 'rome-colosseum-tour',
    title: 'Colosseum & Roman Forum: Guided Tour',
    description: 'Explore ancient Rome with a knowledgeable guide. Visit the Colosseum, Roman Forum, and Palatine Hill.',
    location: 'Rome, Italy',
    category: 'Tours & Sightseeing',
    price: 59.99,
    rating: 4.8,
    reviewCount: 8654,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    highlights: ['Expert local guide', 'Skip-the-line access', 'Visit Colosseum, Forum & Palatine Hill', 'Small group tour'],
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '3',
    slug: 'barcelona-sagrada-familia',
    title: 'Sagrada Familia: Fast-Track Guided Tour',
    description: 'Discover Gaudí\'s masterpiece with an expert guide. Learn about the architecture and symbolism of this iconic basilica.',
    location: 'Barcelona, Spain',
    category: 'Attractions & Museums',
    price: 39.99,
    rating: 4.7,
    reviewCount: 15234,
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800',
    highlights: ['Fast-track entrance', 'Expert guide', 'Learn about Gaudí\'s architecture', 'Tower access optional'],
    images: [
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '4',
    slug: 'london-tower-bridge',
    title: 'Tower Bridge Exhibition & Glass Floor',
    description: 'Walk across the famous glass floor walkway and explore the Victorian engine rooms.',
    location: 'London, UK',
    category: 'Attractions & Museums',
    price: 32.50,
    rating: 4.5,
    reviewCount: 6789,
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
    highlights: ['Glass floor walkway', 'Victorian engine rooms', 'Panoramic city views', 'Self-guided tour'],
    images: [
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800',
      'https://images.unsplash.com/photo-1543832923-44667a44c804?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '5',
    slug: 'amsterdam-canal-cruise',
    title: 'Amsterdam Canal Cruise with Audio Guide',
    description: 'See the city from the water on a relaxing canal cruise with multilingual audio commentary.',
    location: 'Amsterdam, Netherlands',
    category: 'Cruises & Water Tours',
    price: 18.50,
    rating: 4.4,
    reviewCount: 9876,
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1584003573619-51f162c75e5c?w=800',
    highlights: ['Classic canal cruise', 'Audio guide in 19 languages', 'See famous landmarks', 'Open-air boat option'],
    images: [
      'https://images.unsplash.com/photo-1584003573619-51f162c75e5c?w=800',
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '6',
    slug: 'dubai-burj-khalifa',
    title: 'Burj Khalifa: 124th & 125th Floor Tickets',
    description: 'Experience the world\'s tallest building with tickets to the observation decks on floors 124 and 125.',
    location: 'Dubai, UAE',
    category: 'Attractions & Museums',
    price: 89.99,
    rating: 4.9,
    reviewCount: 18456,
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    highlights: ['World\'s tallest building', '360-degree views', 'Multimedia exhibits', 'High-speed elevator'],
    images: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '7',
    slug: 'new-york-statue-liberty',
    title: 'Statue of Liberty & Ellis Island: Ferry Tickets',
    description: 'Take the ferry to Liberty Island and Ellis Island. Explore the monuments and learn about immigration history.',
    location: 'New York City, USA',
    category: 'Attractions & Museums',
    price: 29.99,
    rating: 4.5,
    reviewCount: 11234,
    duration: '4 hours',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800',
    highlights: ['Ferry to both islands', 'Self-guided tours', 'Audio guide included', 'Immigration Museum access'],
    images: [
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '8',
    slug: 'venice-gondola-ride',
    title: 'Venice: Gondola Ride with Serenade',
    description: 'Experience the romance of Venice on a traditional gondola ride with live serenade music.',
    location: 'Venice, Italy',
    category: 'Cruises & Water Tours',
    price: 79.99,
    rating: 4.7,
    reviewCount: 7823,
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
    highlights: ['Traditional gondola', 'Live serenade music', 'Grand Canal route', 'Romantic experience'],
    images: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
      'https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=800',
      'https://images.unsplash.com/photo-1523906921802-b5d2d899e93b?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '9',
    slug: 'santorini-sunset-cruise',
    title: 'Santorini: Sunset Catamaran Cruise',
    description: 'Sail around Santorini on a luxury catamaran. Enjoy swimming, BBQ dinner, and breathtaking sunset views.',
    location: 'Santorini, Greece',
    category: 'Cruises & Water Tours',
    price: 95.00,
    rating: 4.9,
    reviewCount: 6542,
    duration: '5 hours',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
    highlights: ['Luxury catamaran', 'Swimming stops', 'BBQ dinner included', 'Sunset views'],
    images: [
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '10',
    slug: 'tokyo-food-tour',
    title: 'Tokyo: Street Food Walking Tour',
    description: 'Discover Tokyo\'s best street food with a local guide. Try authentic Japanese dishes and snacks.',
    location: 'Tokyo, Japan',
    category: 'Food & Drink',
    price: 68.00,
    rating: 4.8,
    reviewCount: 5234,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    highlights: ['Local food guide', '8+ food tastings', 'Hidden local spots', 'Small group tour'],
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '11',
    slug: 'sydney-opera-house',
    title: 'Sydney Opera House: Guided Tour',
    description: 'Go behind the scenes at the iconic Sydney Opera House with an expert guide.',
    location: 'Sydney, Australia',
    category: 'Attractions & Museums',
    price: 42.00,
    rating: 4.6,
    reviewCount: 9876,
    duration: '1 hour',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
    highlights: ['Behind-the-scenes access', 'Expert guide', 'Concert hall visit', 'Architecture insights'],
    images: [
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800',
      'https://images.unsplash.com/photo-1523059623039-a9ed027e7fad?w=800',
      'https://images.unsplash.com/photo-1545044896-b6dfaad8aaea?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '12',
    slug: 'thailand-elephant-sanctuary',
    title: 'Chiang Mai: Ethical Elephant Sanctuary Visit',
    description: 'Spend a day with rescued elephants in an ethical sanctuary. Feed, bathe, and learn about elephant conservation.',
    location: 'Chiang Mai, Thailand',
    category: 'Outdoor Activities',
    price: 85.00,
    rating: 5.0,
    reviewCount: 4321,
    duration: 'Full day',
    image: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c64?w=800',
    highlights: ['Ethical sanctuary', 'Feed & bathe elephants', 'Lunch included', 'Hotel pickup'],
    images: [
      'https://images.unsplash.com/photo-1564760055775-d63b17a55c64?w=800',
      'https://images.unsplash.com/photo-1494256997604-768d1f608cac?w=800',
      'https://images.unsplash.com/photo-1551244032-e58a2bc994e3?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional Paris Activities
  {
    id: '13',
    slug: 'paris-louvre-museum',
    title: 'Louvre Museum: Reserved Access & Guided Tour',
    description: 'Skip the line at the world\'s largest art museum. See the Mona Lisa, Venus de Milo, and thousands of masterpieces.',
    location: 'Paris, France',
    category: 'Attractions & Museums',
    price: 52.99,
    rating: 4.7,
    reviewCount: 18932,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
    highlights: ['Skip-the-line entry', 'Expert art historian guide', 'See the Mona Lisa', 'Explore 8 departments'],
    images: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
      'https://images.unsplash.com/photo-1566139939-a4ee0caf3e63?w=800',
      'https://images.unsplash.com/photo-1511882150382-421056c89033?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '14',
    slug: 'paris-seine-cruise',
    title: 'Paris: Seine River Dinner Cruise',
    description: 'Enjoy a romantic dinner cruise on the Seine River with stunning views of illuminated Paris landmarks.',
    location: 'Paris, France',
    category: 'Cruises & Water Tours',
    price: 89.00,
    rating: 4.8,
    reviewCount: 9234,
    duration: '2.5 hours',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    highlights: ['4-course French dinner', 'Live music', 'See Eiffel Tower lit up', 'Champagne option'],
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800',
      'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional Rome Activities
  {
    id: '15',
    slug: 'rome-vatican-museums',
    title: 'Vatican Museums & Sistine Chapel: Skip-the-Line Tour',
    description: 'Explore the Vatican Museums and admire Michelangelo\'s masterpiece in the Sistine Chapel with priority access.',
    location: 'Rome, Italy',
    category: 'Attractions & Museums',
    price: 67.50,
    rating: 4.9,
    reviewCount: 21453,
    duration: '3.5 hours',
    image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
    highlights: ['Skip long queues', 'Sistine Chapel access', 'Vatican Museums', 'Expert guide'],
    images: [
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800',
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '16',
    slug: 'rome-food-tour',
    title: 'Rome: Trastevere Food & Wine Walking Tour',
    description: 'Taste authentic Roman cuisine in the charming Trastevere neighborhood. Sample pasta, pizza, wine, and gelato.',
    location: 'Rome, Italy',
    category: 'Food & Drink',
    price: 75.00,
    rating: 4.8,
    reviewCount: 5621,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800',
    highlights: ['10+ food tastings', 'Local wine included', 'Trastevere district', 'Small group size'],
    images: [
      'https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=800',
      'https://images.unsplash.com/photo-1534939561126-855b8675edd7?w=800',
      'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional London Activities
  {
    id: '17',
    slug: 'london-eye-tickets',
    title: 'London Eye: Fast-Track Tickets',
    description: 'Experience London from 135 meters high in a glass capsule. See up to 40 kilometers in all directions.',
    location: 'London, UK',
    category: 'Attractions & Museums',
    price: 38.50,
    rating: 4.6,
    reviewCount: 14567,
    duration: '30 minutes',
    image: 'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800',
    highlights: ['360-degree views', 'Fast-track entry', 'See 55 landmarks', 'Climate-controlled capsule'],
    images: [
      'https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800',
      'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '18',
    slug: 'london-harry-potter-tour',
    title: 'Harry Potter Warner Bros Studio Tour with Transport',
    description: 'Visit the actual sets, props, and costumes from the Harry Potter films. Includes return transportation from London.',
    location: 'London, UK',
    category: 'Tours & Sightseeing',
    price: 95.00,
    rating: 4.9,
    reviewCount: 23876,
    duration: '7 hours',
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
    highlights: ['Original film sets', 'Butterbeer included', 'Return coach transport', 'Self-guided tour'],
    images: [
      'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
      'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800',
      'https://images.unsplash.com/photo-1526129318478-62ed807ebdf9?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional Barcelona Activities
  {
    id: '19',
    slug: 'barcelona-park-guell',
    title: 'Park Güell: Skip-the-Line Guided Tour',
    description: 'Explore Gaudí\'s colorful park with a knowledgeable guide. Discover the mosaics, architecture, and city views.',
    location: 'Barcelona, Spain',
    category: 'Attractions & Museums',
    price: 28.50,
    rating: 4.6,
    reviewCount: 11234,
    duration: '1.5 hours',
    image: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
    highlights: ['Skip-the-line access', 'Expert guide', 'Mosaic benches', 'Panoramic city views'],
    images: [
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800',
      'https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '20',
    slug: 'barcelona-tapas-tour',
    title: 'Barcelona: Tapas & Wine Walking Tour',
    description: 'Discover Barcelona\'s best tapas bars in the Gothic Quarter. Taste traditional Catalan dishes and local wines.',
    location: 'Barcelona, Spain',
    category: 'Food & Drink',
    price: 69.00,
    rating: 4.8,
    reviewCount: 7823,
    duration: '3 hours',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    highlights: ['7+ tapas tastings', 'Local wines & cava', 'Gothic Quarter tour', 'Local foodie guide'],
    images: [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      'https://images.unsplash.com/photo-1515443961218-a51367888e4b?w=800',
      'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional Dubai Activities
  {
    id: '21',
    slug: 'dubai-desert-safari',
    title: 'Dubai: Desert Safari with BBQ Dinner & Entertainment',
    description: 'Experience dune bashing, camel riding, and traditional entertainment. Enjoy a BBQ dinner under the stars.',
    location: 'Dubai, UAE',
    category: 'Outdoor Activities',
    price: 79.00,
    rating: 4.7,
    reviewCount: 16789,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    highlights: ['Dune bashing adventure', 'Camel riding', 'BBQ dinner buffet', 'Belly dance show'],
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '22',
    slug: 'dubai-marina-cruise',
    title: 'Dubai Marina: Luxury Dinner Cruise',
    description: 'Sail through Dubai Marina on a luxury dhow cruise. Enjoy an international buffet dinner with live entertainment.',
    location: 'Dubai, UAE',
    category: 'Cruises & Water Tours',
    price: 65.00,
    rating: 4.5,
    reviewCount: 8934,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
    highlights: ['Traditional dhow cruise', 'International buffet', 'Live music', 'See Dubai skyline'],
    images: [
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    ],
    availability: getAvailability(),
  },
  // Additional New York City Activities
  {
    id: '23',
    slug: 'new-york-central-park-bike',
    title: 'Central Park: Guided Bike Tour',
    description: 'Explore Central Park\'s highlights on a comfortable bike. See Bethesda Fountain, Bow Bridge, and Strawberry Fields.',
    location: 'New York City, USA',
    category: 'Tours & Sightseeing',
    price: 45.00,
    rating: 4.7,
    reviewCount: 9432,
    duration: '2 hours',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
    highlights: ['Bike & helmet included', 'Expert guide', 'See 20+ landmarks', 'Small group tour'],
    images: [
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800',
      'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800',
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '24',
    slug: 'new-york-broadway-show',
    title: 'Broadway Show: Premium Tickets',
    description: 'Experience the magic of Broadway with premium tickets to top shows. Choose from musicals and plays.',
    location: 'New York City, USA',
    category: 'Cultural & Theme Tours',
    price: 125.00,
    rating: 4.9,
    reviewCount: 15678,
    duration: '2.5 hours',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
    highlights: ['Premium seating', 'Top Broadway shows', 'Theater District', 'Digital tickets'],
    images: [
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800',
      'https://images.unsplash.com/photo-1514306191717-452ec28c7814?w=800',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=800',
    ],
    availability: getAvailability(),
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