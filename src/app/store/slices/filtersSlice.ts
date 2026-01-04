import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  destination: string;
  date: string;
  category: string;
  priceRange: [number, number];
  rating: number;
  duration: string;
  sortBy: 'popular' | 'price-low' | 'price-high' | 'rating';
}

const initialState: FiltersState = {
  destination: '',
  date: '',
  category: '',
  priceRange: [0, 200],
  rating: 0,
  duration: '',
  sortBy: 'popular',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDestination: (state, action: PayloadAction<string>) => {
      state.destination = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.priceRange = action.payload;
    },
    setRating: (state, action: PayloadAction<number>) => {
      state.rating = action.payload;
    },
    setDuration: (state, action: PayloadAction<string>) => {
      state.duration = action.payload;
    },
    setSortBy: (state, action: PayloadAction<FiltersState['sortBy']>) => {
      state.sortBy = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setDestination,
  setDate,
  setCategory,
  setPriceRange,
  setRating,
  setDuration,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
