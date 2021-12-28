import { combineReducers } from 'redux';
import { reducer as steps } from './StepsReducer';
import { reducer as products } from './ProductsReducer';

export const reducers = combineReducers({
  steps,
  products,
});

export type RootStateType = ReturnType<typeof reducers>;
