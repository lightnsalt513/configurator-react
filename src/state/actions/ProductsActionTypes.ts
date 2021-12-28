export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAIL = 'FETCH_PRODUCTS_FAIL';

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
      size40: string;
      size41: string;
      size44: string;
      size45: string;
    };
    summary: string;
  };
  productModelName: string;
};

export type ProductsType = {
  watches: { [key: string]: WatchType };
  straps: { [key: string]: StrapType };
};

export interface fetchProductsSucessDispatch {
  type: typeof FETCH_PRODUCTS_SUCCESS;
  payload: ProductsType;
}

export interface fetchProductsFailDispatch {
  type: typeof FETCH_PRODUCTS_FAIL;
}

export type ProductsDispatchType = fetchProductsSucessDispatch | fetchProductsFailDispatch;
