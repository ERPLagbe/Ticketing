import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  activityId: string;
  activityTitle: string;
  startDate: string;
  endDate: string;
  adults: number;
  children: number;
  infants: number;
  price: number;
  image: string;
  isTourPackage?: boolean; // Flag for tour packages
  packageOption?: {
    id: string;
    title: string;
    timeSlot: string;
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  isDrawerOpen: boolean;
}

const initialState: CartState = {
  items: [],
  total: 0,
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
      state.total = state.items.reduce((sum, item) => {
        const totalTravelers = item.adults + item.children + item.infants;
        return sum + (item.price * totalTravelers);
      }, 0);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.activityId !== action.payload);
      state.total = state.items.reduce((sum, item) => {
        const totalTravelers = item.adults + item.children + item.infants;
        return sum + (item.price * totalTravelers);
      }, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    },
    openCartDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeCartDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, openCartDrawer, closeCartDrawer } = cartSlice.actions;
export default cartSlice.reducer;