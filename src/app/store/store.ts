import { configureStore } from '@reduxjs/toolkit';
import activitiesReducer from './slices/activitiesSlice';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import wishlistReducer from './slices/wishlistSlice';
import blogReducer from './slices/blogSlice';

export const store = configureStore({
  reducer: {
    activities: activitiesReducer,
    filters: filtersReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    blog: blogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;