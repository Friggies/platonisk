import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface AnimationState {
  animationsActive: boolean;
}

const initialState: AnimationState = {
  animationsActive: true,
};

export const loadAnimationsState = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>('animation/loadAnimationsState', async (_, thunkAPI) => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('animationsActive');
    if (storedState !== null) {
      return JSON.parse(storedState) as boolean;
    } else {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      return !prefersReducedMotion;
    }
  }
  return true;
});

export const toggleAnimations = createAsyncThunk<
  boolean,
  void,
  { state: RootState }
>('animation/toggleAnimations', async (_, { getState }) => {
  const state = getState();
  const newAnimationsActive = !state.animation.animationsActive;

  if (typeof window !== 'undefined') {
    localStorage.setItem(
      'animationsActive',
      JSON.stringify(newAnimationsActive)
    );
  }

  return newAnimationsActive;
});

const animationSlice = createSlice({
  name: 'animation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadAnimationsState.fulfilled, (state, action) => {
        state.animationsActive = action.payload;
      })
      .addCase(toggleAnimations.fulfilled, (state, action) => {
        state.animationsActive = action.payload;
      });
  },
});

export default animationSlice.reducer;
