import { Dispatch, createContext } from 'react';
import { ToggleSearch } from '../models/ToggleSearchEnum';

export interface IShowSearchAction {
  type: ToggleSearch;
}

export interface IShowSearchState {
  isMenuOpen: boolean;
}

export const ShowSearchContext = createContext<{
  state: IShowSearchState;
} | null>(null);
export const ShowSearchDispatchContext = createContext<
  Dispatch<IShowSearchAction>
>(() => {
  return;
});
