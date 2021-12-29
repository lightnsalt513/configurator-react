import { Dispatch } from 'redux';
import data from 'db.json';
import {
  FetchProductsDispatchType,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  ProductsType,
  CHANGE_WATCH,
  CHANGE_STRAP,
  ChangeWatchDispatchType,
  ChangeStrapDispatchType,
} from './ProductsActionTypes';

export const fetchProducts =
  () =>
  async (dispatch: Dispatch<FetchProductsDispatchType>): Promise<ProductsType> => {
    return new Promise((mainResolve, mainReject) => {
      let productPromise: Promise<ProductsType> = new Promise((resolve, reject) => {
        setTimeout(() => {
          const watchesData = data.watchProducts;
          const strapsData = data.strapProducts;
          let result = {
            watches: watchesData,
            straps: strapsData,
          };
          if (!Object.keys(watchesData).length && !Object.keys(strapsData).length) {
            reject('Data loading failed');
          } else {
            resolve(result);
          }
        }, 1000);
      });

      productPromise
        .then((res) => {
          dispatch({
            type: FETCH_PRODUCTS_SUCCESS,
            payload: res,
          });
          mainResolve(res);
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: FETCH_PRODUCTS_FAIL,
          });
          mainReject(err);
        });
    });
  };

export const changeSelectedWatch =
  (sku: string) => (dispatch: Dispatch<ChangeWatchDispatchType>) => {
    dispatch({
      type: CHANGE_WATCH,
      payload: sku,
    });
  };

export const changeSelectedStrap =
  (sku: string) => (dispatch: Dispatch<ChangeStrapDispatchType>) => {
    dispatch({
      type: CHANGE_STRAP,
      payload: sku,
    });
  };
