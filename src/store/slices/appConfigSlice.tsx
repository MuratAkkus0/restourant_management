import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isMenuOpen: false,
  isLoading: false,
};

export const appConfigSlice = createSlice({
  name: 'appConfigSlice',
  initialState,
  reducers: {
    setIsMenuOpen(state, action) {
      state.isMenuOpen = action.payload ?? !state.isMenuOpen;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsMenuOpen, setIsLoading } = appConfigSlice.actions;
export default appConfigSlice.reducer;
