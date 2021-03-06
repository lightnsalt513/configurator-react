export const STEP_CHANGE = 'STEP_CHANGE';
export const STEP_ADD_MENU = 'STEP_ADD_MENU';
export const CHANGE_WATCH_PRODUCT_ORDER = 'CHANGE_WATCH_PRODUCT_ORDER';
export const STEP_CHANGE_IDX = 'STEP_CHANGE_IDX';

export type StepNameType = 'MODEL' | 'STRAP';

interface MenuType {
  name: string;
  idx: number;
}

export type StepType = {
  name: StepNameType;
  menus?: MenuType[];
  productOrder?: string[];
};

interface stepAddMenusDispatch {
  type: typeof STEP_ADD_MENU;
  payload: StepType;
}

interface stepChangeDispatch {
  type: typeof STEP_CHANGE;
  payload: StepNameType;
}

export interface ChangeProductOrderDispatch {
  type: typeof CHANGE_WATCH_PRODUCT_ORDER;
  payload: StepType['productOrder'];
}

export interface StepChangeIndex {
  type: typeof STEP_CHANGE_IDX;
  payload: number;
}

export type StepDispatchType =
  | stepAddMenusDispatch
  | stepChangeDispatch
  | ChangeProductOrderDispatch
  | StepChangeIndex;
