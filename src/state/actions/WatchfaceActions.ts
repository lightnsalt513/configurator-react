import { Dispatch } from 'redux';
import data from 'db.json';
import {
  WatchfaceFetchType,
  FETCH_WATCHFACES_SUCCESS,
  WatchfaceByCategoryType,
  WatchfaceActiveType,
  WATCHFACE_ACTIVE,
  WatchfaceInactiveType,
  WATCHFACE_INACTIVE,
} from './WatchfaceActionTypes';

export const fetchWatchfaces = () => (dispatch: Dispatch<WatchfaceFetchType>) => {
  let customPromise: Promise<WatchfaceByCategoryType> = new Promise((resolve, reject) => {
    setTimeout(() => {
      let watchfacesData = data.watchface;
      if (watchfacesData) {
        resolve(watchfacesData);
      } else {
        reject('Loading watchfaces data failed');
      }
    }, 500);
  });

  customPromise
    .then((res) => {
      dispatch({
        type: FETCH_WATCHFACES_SUCCESS,
        payload: res,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setWatchfaceActive = () => (dispatch: Dispatch<WatchfaceActiveType>) => {
  dispatch({
    type: WATCHFACE_ACTIVE,
  });
};

export const setWatchfaceInactive = () => (dispatch: Dispatch<WatchfaceInactiveType>) => {
  dispatch({
    type: WATCHFACE_INACTIVE,
  });
};
