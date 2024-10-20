<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'; // Update the path if needed

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
=======
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice'; // Update the path if needed

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
>>>>>>> 1b425caee791463b3c48f72f255386d0a0db0adc
