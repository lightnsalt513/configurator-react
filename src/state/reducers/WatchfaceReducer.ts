import { Reducer } from 'redux';
import {
  FETCH_WATCHFACES_FAIL,
  FETCH_WATCHFACES_SUCCESS,
  WatchfaceByCategoryType,
  WatchfaceDispatchType,
  WATCHFACE_ACTIVE,
  WATCHFACE_INACTIVE,
} from 'state/actions/WatchfaceActionTypes';

interface WatchfaceType {
  initialized: boolean;
  isActive: boolean;
  watchfaces: WatchfaceByCategoryType;
}

const inititalState: WatchfaceType = {
  initialized: false,
  isActive: false,
  watchfaces: {},
};

export const reducer: Reducer<WatchfaceType, WatchfaceDispatchType> = (
  state = inititalState,
  action
) => {
  switch (action.type) {
    case FETCH_WATCHFACES_SUCCESS:
      return { ...state, initialized: true, watchfaces: action.payload };
    case FETCH_WATCHFACES_FAIL:
      return { ...state, initialized: false };
    case WATCHFACE_ACTIVE:
      return { ...state, isActive: true };
    case WATCHFACE_INACTIVE:
      return { ...state, isActive: false };
    default:
      return state;
  }
};
