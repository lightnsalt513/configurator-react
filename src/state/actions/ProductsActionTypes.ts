export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';
export const CHANGE_WATCH = 'CHANGE_WATCH';
export const CHANGE_STRAP = 'CHANGE_STRAP';

export type WatchType = {
  pdUrl: string;
  category: {
    engTxt: string;
    localTxt: string;
  };
  model: string;
  isMainView: boolean;
  familyByConnectivity: {
    SKU: string;
  }[];
  imgUrl: {
    front: string;
    frontFrame: string;
    charger: string;
  };
  watchfaceImgRadius: number;
  size: number;
  defaultStrap: string;
  selectableStraps: string[];
  connectivity: string;
  productModelName: string;
  isOutOfStock: boolean;
  price: {
    original: number;
    save: number;
    total: number;
  };
};

export type StrapType = {
  category: {
    engTxt: string;
    localTxt: string;
  };
  model: string;
  colorCode: string[];
  imgUrl: {
    front: {
      [key: string]: string;
    };
    summary: string;
  };
  productModelName: string;
  isOutOfStock: boolean;
  price: {
    original: number;
    save: number;
    total: number;
  };
};

export type ProductsType = {
  watches: { [key: string]: WatchType };
  straps: { [key: string]: StrapType };
};

interface fetchProductsSucessDispatch {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: ProductsType;
}

interface fetchProductsFailDispatch {
  type: typeof FETCH_PRODUCTS_FAIL;
}

export type FetchProductsDispatchType = fetchProductsSucessDispatch | fetchProductsFailDispatch;

export interface ChangeWatchDispatchType {
  type: typeof CHANGE_WATCH;
  payload: string;
}

export interface ChangeStrapDispatchType {
  type: typeof CHANGE_STRAP;
  payload: string;
}

export type ProductsActionType =
  | fetchProductsSucessDispatch
  | fetchProductsFailDispatch
  | ChangeWatchDispatchType
  | ChangeStrapDispatchType;
