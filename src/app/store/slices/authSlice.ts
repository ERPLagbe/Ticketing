import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Booking {
  id: string;
  activityTitle: string;
  date: string;
  travelers: number;
  price: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  image: string;
  location: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  bookings: Booking[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    activityTitle: 'Eiffel Tower: Skip-the-Line Tickets & Summit Access',
    date: '2025-01-15',
    travelers: 2,
    price: 91.98,
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400',
    location: 'Paris, France',
  },
  {
    id: '2',
    activityTitle: 'Colosseum & Roman Forum: Guided Tour',
    date: '2024-12-10',
    travelers: 3,
    price: 179.97,
    status: 'completed',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400',
    location: 'Rome, Italy',
  },
];

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      // Mock login
      state.user = {
        id: '1',
        name: 'John Doe',
        email: action.payload.email,
        bookings: mockBookings,
      };
      state.isAuthenticated = true;
    },
    register: (state, action: PayloadAction<{ name: string; email: string; password: string }>) => {
      // Mock registration
      state.user = {
        id: '1',
        name: action.payload.name,
        email: action.payload.email,
        bookings: [],
      };
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, register, logout } = authSlice.actions;
export default authSlice.reducer;
