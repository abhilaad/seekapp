import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import countryReducer from './countrySlice';

const store = configureStore({
  reducer: {
    country: countryReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof store.getState>