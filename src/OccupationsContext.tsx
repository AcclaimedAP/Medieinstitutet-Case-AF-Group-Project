import { Dispatch, createContext } from 'react';
import IOccupations from './interfaces/IOccupations';

interface IAction {
  payload: {
    occupations?: IOccupations;
    headlineInput: string;
    textInput: string;
  };
  type: string;
}

interface IState {
  occupations: IOccupations | undefined;
  headlineInput: string;
  textInput: string;
}

export const OccupationContext = createContext<{ state: IState } | null>(null);
export const OccupationDispatchContext = createContext<Dispatch<IAction>>(
  () => {
    return;
  }
);
