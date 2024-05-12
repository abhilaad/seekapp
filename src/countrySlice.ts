import { createSlice } from '@reduxjs/toolkit';

const countrySlice = createSlice({
  name: 'country',
  initialState: {
    value: [],
  },
  reducers: {
    setCountryData(state, {payload}) {      
      state.value = payload
    },    
  },
});

export const { setCountryData } = countrySlice.actions;

export default countrySlice.reducer;

