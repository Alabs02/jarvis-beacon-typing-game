import { Dispatch, SetStateAction } from 'react';

export interface IStartChallengeActionsTypes {
  hasStarted: boolean;
  hasEnded: boolean;
  handleStart: () => void;
  setUserTime: Dispatch<SetStateAction<string>>;
  showField: boolean;
}