import { Dispatch } from 'redux';
import data from 'db.json';
import {
  ProductsDispatchType,
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_SUCCESS,
  ProductsType,
} from './ProductsActionTypes';

export const fetchProducts =
  () =>
  async (dispatch: Dispatch<ProductsDispatchType>): Promise<ProductsType> => {
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
