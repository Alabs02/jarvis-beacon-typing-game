import { IQuote } from '@/store/slices/quote';

const getRandomQuote = (quotes: Array<IQuote>) => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};

export { getRandomQuote as default };
