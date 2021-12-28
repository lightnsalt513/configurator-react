import { Reducer } from 'redux';
import {
  ProductsDispatchType,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  ProductsType,
} from 'state/actions/ProductsActionTypes';

interface InitialState {
  initialized: boolean;
  products: ProductsType | null;
}

const initialState: InitialState = {
  initialized: false,
  products: null,
};

export const reducer: Reducer<InitialState, ProductsDispatchType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, initialized: true, products: action.payload };
    case FETCH_PRODUCTS_FAIL:
      return { ...state, initialized: false };
    default:
      return state;
  }
};
