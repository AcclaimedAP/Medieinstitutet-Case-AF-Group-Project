import { Dispatch, createContext } from 'react';
import IOccupations from './interfaces/IOccupations';

interface IAction {
    payload: IOccupations,
    type: string
}
interface IState {
    occupations: IOccupations | undefined
}
export const OccupationContext = createContext<{state: IState} | null>(null);
export const OccupationDispatchContext = createContext<Dispatch<IAction>>(() => {
    return;
});

