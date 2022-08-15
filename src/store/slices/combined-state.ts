import { IQuoteState } from './quote';
import { IScoreState } from './score';

export interface CombinedRootState {
  quote: IQuoteState;
  score: IScoreState;
}