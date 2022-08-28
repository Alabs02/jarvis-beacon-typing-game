import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AppThunk } from '@/store';

// DATA
import jsonData from '@/json/data.json';
import jsonAllowedKeys from '@/json/allowed-keys.json';

// TYPES
import { IQuoteState, IQuote } from './types';

const initialState: IQuoteState = {
  loading: false,
  payload: jsonData.data || [],
  allowedKeys: jsonAllowedKeys.keys || [],
  error: 'An error occurred, please try again!',
};

export const quoteSlice = createSlice({
  name: 'quote',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },

    setPayload: (state, { payload }: PayloadAction<Array<IQuote>>) => {
      state.payload = payload;
    },

    setError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export const quoteReducer = quoteSlice.reducer;

export const { setLoading, setPayload, setError } = quoteSlice.actions;
