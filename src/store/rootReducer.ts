import { combineReducers } from '@reduxjs/toolkit';

// REDUCERS
import { quoteReducer } from './slices/quote';
import { scoreReducer } from './slices/score';

const rootReducer = combineReducers({
  quote: quoteReducer,
  score: scoreReducer,
});

export { rootReducer as default };
