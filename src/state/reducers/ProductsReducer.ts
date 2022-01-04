import { Reducer } from 'redux';
import {
  ProductsActionType,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  ProductsType,
  WatchType,
  StrapType,
  CHANGE_WATCH,
  CHANGE_STRAP,
} from 'state/actions/ProductsActionTypes';

interface InitialState {
  initialized: boolean;
  products: ProductsType | null;
  selectedWatch: {
    sku: string;
    data: WatchType;
  } | null;
  selectedStrap: {
    sku: string;
    data: StrapType;
  } | null;
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
      if (!state.products?.watches) return state;
      const watchData = state.products.watches[action.payload];
      return {
        ...state,
        selectedWatch: {
          sku: action.payload,
          data: watchData,
        },
      };
    case CHANGE_STRAP:
      if (!state.products?.straps) return state;
      const strapData = state.products.straps[action.payload];
      return {
        ...state,
        selectedStrap: {
          sku: action.payload,
          data: strapData,
        },
      };
    default:
      return state;
  }
};
