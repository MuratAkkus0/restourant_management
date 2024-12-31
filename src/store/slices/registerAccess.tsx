import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  access: false,
};

export const registerAccess = createSlice({
  name: 'registerAccess',
  initialState,
  reducers: {
    setAccess: (state, action: PayloadAction<boolean>) => {
      // !! makes str to boolean
      const confirmKeys = !!sessionStorage.getItem('access');
      console.log(typeof confirmKeys);
      if (confirmKeys === action.payload) {
        state.access = !!action.payload;
      } else {
        state.access = false;
        sessionStorage.setItem('access', 'false');
      }
      console.log(!!action.payload);
    },
  },
});

export const { setAccess } = registerAccess.actions;
export default registerAccess.reducer;
