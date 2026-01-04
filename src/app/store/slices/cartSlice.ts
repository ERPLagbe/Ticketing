import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  activityId: string;
  activityTitle: string;
  startDate: string;
  endDate: string;
  pickupTime: string;
  adults: number;
  children: number;
  infants: number;
  price: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
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
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
