import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../firebase/useFirebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { toast } from 'sonner';
import {
  EmailAuthInputObj,
  GoogleLoginInputObj,
  UserData,
} from '../../types/models/AuthModels';
import { FirebaseError } from 'firebase/app';
import { GoogleAuthProvider } from 'firebase/auth';

const initialState: UserData = {
  email: '',
  pass: '',
  errMessage: null,
  loading: false,
};
export const emailLogin = createAsyncThunk(
  'emailLogin',
  async (
    { email, pass, onSuccess }: EmailAuthInputObj,
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        pass
      );
      onSuccess();
      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      }
      return rejectWithValue('Login failed! An unknown error occurred');
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  'registerWithEmail',
  async (
    { email, pass, onSuccess }: EmailAuthInputObj,
    { rejectWithValue }
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pass
      );
      onSuccess();
      return userCredential.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        return rejectWithValue(error.code);
      }
      return rejectWithValue('Login failed! An unknown error occurred');
    }
  }
);

export const googleLogin = createAsyncThunk(
  'googleLogin',
  async ({ onSuccess }: GoogleLoginInputObj, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      onSuccess();
      return result.user;
    } catch (error) {
      if (error instanceof FirebaseError) {
        const errCode: string = error.code;
        return rejectWithValue(errCode);
      }
      return rejectWithValue('Login failed! An unknown error occurred');
    }
  }
);

export const authProcesses = createSlice({
  name: 'authProcesses',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.email = action.payload.email;
      state.pass = action.payload.pass;
      state.errMessage = action.payload.errMessage;
      state.loading = action.payload.loading;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(emailLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(emailLogin.fulfilled, (state) => {
      console.log(state);
      toast.success('Login successfull!.');
      state.loading = false;
    });
    builder.addCase(
      emailLogin.rejected,
      (state, action: PayloadAction<FirebaseError | unknown>) => {
        console.log(action.payload);
        toast.error('Login Failed! Invalid email or password.');
        state.loading = false;
      }
    );
    builder.addCase(googleLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(googleLogin.fulfilled, (state) => {
      toast.success('Login successfull!.');
      state.loading = false;
    });
    builder.addCase(
      googleLogin.rejected,
      (state, action: PayloadAction<FirebaseError | unknown>) => {
        console.log(action.payload);
        toast.error('Login Failed!. ' + action.payload);
        state.loading = false;
      }
    );
  },
});

export const { setUserData } = authProcesses.actions;
export default authProcesses.reducer;
