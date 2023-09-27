import { useReducer } from 'react';
import IOccupations from '../interfaces/IOccupations';
import {
  OccupationContext,
  OccupationDispatchContext,
} from '../contexts/OccupationsContext';

interface IAction {
  payload: {
    occupations?: IOccupations;
    headlineInput: string;
    textInput: string;
    currentPage?: string;
  };
  type: string;
}

interface IState {
  occupations: IOccupations | undefined;
  headlineInput: string;
  textInput: string;
  currentPage: string;
}

const initialState: IState = {
  occupations: undefined,
  headlineInput: '',
  textInput: '',
  currentPage: '0',
};

function OccupationReducer(_state: IState, action: IAction): IState {
  switch (action.type) {
    case 'updated': {
      return {
        ..._state,
        occupations: action.payload.occupations,
        headlineInput: action.payload.headlineInput,
        textInput: action.payload.textInput,
      };
    }
    case 'changePage': {
      return {
        ..._state,
        occupations: action.payload.occupations,
        headlineInput: action.payload.headlineInput,
        textInput: action.payload.textInput,
        currentPage: action.payload.currentPage || '1',
      };
    }
    case 'deleted': {
      return initialState;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function OccupationProvider({ children }: any) {
  const [state, dispatch] = useReducer(OccupationReducer, initialState);

  return (
    <OccupationContext.Provider value={{ state }}>
      <OccupationDispatchContext.Provider value={dispatch}>
        {children}
      </OccupationDispatchContext.Provider>
    </OccupationContext.Provider>
  );
}

export default OccupationProvider;
