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
  {
    id: '18',
    slug: 'london-harry-potter-tour',
    title: 'Harry Potter Warner Bros Studio Tour with Transport',
    description: 'Visit the actual sets, costumes, and props from the Harry Potter films. Includes round-trip transport from London.',
    location: 'London, UK',
    category: 'Entertainment & Shows',
    price: 115.00,
    rating: 4.9,
    reviewCount: 22456,
    duration: '7 hours',
    image: 'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
    highlights: ['Round-trip transport', 'Explore actual film sets', 'See props & costumes', 'Butterbeer included'],
    images: [
      'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=800',
      'https://images.unsplash.com/photo-1595769816263-9b910be24d5f?w=800',
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=800',
    ],
    availability: getAvailability(),
  },
  {
    id: '21',
    slug: 'dubai-desert-safari',
    title: 'Dubai: Desert Safari with BBQ Dinner & Entertainment',
    description: 'Experience the Arabian desert with dune bashing, camel rides, and a BBQ dinner under the stars.',
    location: 'Dubai, UAE',
    category: 'Adventure & Outdoor',
    price: 75.00,
    rating: 4.7,
    reviewCount: 13245,
    duration: '6 hours',
    image: 'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
    highlights: ['Dune bashing adventure', 'Camel riding', 'BBQ dinner & shows', 'Hotel pickup & drop-off'],
    images: [
      'https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800',
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800',
      'https://images.unsplash.com/photo-1513415564515-763d91423bdd?w=800',
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