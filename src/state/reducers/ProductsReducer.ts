import { Reducer } from 'redux';
import {
  ProductsActionType,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  ProductsType,
  CHANGE_WATCH,
  CHANGE_STRAP,
} from 'state/actions/ProductsActionTypes';

interface InitialState {
  initialized: boolean;
  products: ProductsType | null;
  selectedWatch: null | string;
  selectedStrap: null | string;
}

const initialState: InitialState = {
  initialized: false,
  products: null,
  selectedWatch: null,
  selectedStrap: null,
};

export const reducer: Reducer<InitialState, ProductsActionType> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case FETCH_PRODUCTS_SUCCESS:
      return { ...state, initialized: true, products: action.payload };
    case FETCH_PRODUCTS_FAIL:
      return { ...state, initialized: false };
    case CHANGE_WATCH:
      return { ...state, selectedWatch: action.payload };
    case CHANGE_STRAP:
      return { ...state, selectedStrap: action.payload };
    default:
      return state;
  }
};
