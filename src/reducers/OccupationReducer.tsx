import { useReducer } from 'react';
import IOccupations from '../interfaces/IOccupations';
import { OccupationContext, OccupationDispatchContext } from '../OccupationsContext';

interface IAction {
    payload: IOccupations,
    type: string
}
interface IState {
    occupations: IOccupations | undefined
}
const initialState: IState = {occupations: undefined}


function OccupationReducer(_state: IState, action: IAction): IState {

    switch (action.type) {
        case 'updated': {
            return {occupations: action.payload};
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