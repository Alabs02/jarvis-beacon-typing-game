export interface IQuote {
  quote: string;
  author: string;
}

export interface IQuoteState {
  loading: boolean;
  payload: Array<IQuote>;
  allowedKeys: Array<string>;
  error: string;
}
