import { useReducer } from 'react';
import {
  IShowSearchAction,
  IShowSearchState,
  ShowSearchContext,
  ShowSearchDispatchContext,
} from '../contexts/ShowSearchContext';
import { ToggleSearch } from '../models/ToggleSearchEnum';

const initialState: IShowSearchState = {
  isMenuOpen: false,
};

const ShowSearchReducer = (
  _state: IShowSearchState,
  action: IShowSearchAction
): IShowSearchState => {
  switch (action.type) {
    case ToggleSearch.OPENED: {
      return {
        isMenuOpen: true,
      };
    }
    case ToggleSearch.CLOSED: {
      return {
        isMenuOpen: false,
      };
    }
    default: {
      return initialState;
    }
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShowSearchProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(ShowSearchReducer, initialState);

  return (
    <ShowSearchContext.Provider value={{ state }}>
      <ShowSearchDispatchContext.Provider value={dispatch}>
        {children}
      </ShowSearchDispatchContext.Provider>
    </ShowSearchContext.Provider>
  );
};

export default ShowSearchProvider;
