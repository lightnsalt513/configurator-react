export const FETCH_WATCHFACES_SUCCESS = 'FETCH_WATCHFACES_SUCCESS';
export const FETCH_WATCHFACES_FAIL = 'FETCH_WATCHFACES_FAIL';
export const WATCHFACE_ACTIVE = 'WATCHFACE_ACTIVE';
export const WATCHFACE_INACTIVE = 'WATCHFACE_INACTIVE';

export interface WatchfaceType {
  imgUrl: string;
  imgAlt: string;
}

export interface WatchfaceByCategoryType {
  [key: string]: WatchfaceType[];
}

interface fetchWatchfaceSuccessType {
  type: typeof FETCH_WATCHFACES_SUCCESS;
  payload: WatchfaceByCategoryType;
}

interface fetchWatchfaceFailType {
  type: typeof FETCH_WATCHFACES_FAIL;
}

export type WatchfaceFetchType = fetchWatchfaceSuccessType | fetchWatchfaceFailType;

export interface WatchfaceActiveType {
  type: typeof WATCHFACE_ACTIVE;
}

export interface WatchfaceInactiveType {
  type: typeof WATCHFACE_INACTIVE;
}

export type WatchfaceDispatchType =
  | WatchfaceFetchType
  | WatchfaceActiveType
  | WatchfaceInactiveType;
