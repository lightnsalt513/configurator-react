import { combineReducers } from 'redux';
import { reducer as steps } from './StepsReducer';

export const reducers = combineReducers({
  steps,
});

export type RootReducerType = ReturnType<typeof reducers>;
