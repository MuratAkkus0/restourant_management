import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
};

export const appConfig = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {
    setIsMenuOpen(state, action) {
      state.isMenuOpen = action.payload ?? !state.isMenuOpen;
    },
  },
});

export const { setIsMenuOpen } = appConfig.actions;
export default appConfig.reducer;
