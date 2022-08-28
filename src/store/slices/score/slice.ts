import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '@/store';

// TYPES
import { IScore, IScoreState } from './types';

const initialState: IScoreState = {
  scorePayload: {
    lastScore: 0,
  },
};
export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    setPayload: (state, { payload }: PayloadAction<IScore>) => {
      state.scorePayload = payload;
    },
  },
});

export const updateScore =
  (scorePayload: IScore): AppThunk =>
  (dispatch) => {
    dispatch(setPayload(scorePayload));
  };

export const scoreReducer = scoreSlice.reducer;

export const { setPayload } = scoreSlice.actions;
