import { combineReducers } from 'redux';
import { reducer as steps } from './StepsReducer';
import { reducer as products } from './ProductsReducer';
import { reducer as watchfaces } from './WatchfaceReducer';

export const reducers = combineReducers({
  steps,
  products,
  watchfaces,
});

export type RootStateType = ReturnType<typeof reducers>;