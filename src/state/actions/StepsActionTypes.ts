export const STEP_CHANGE = 'STEP_CHANGE';
export const STEP_ADD_MENU = 'STEP_ADD_MENU';

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

export type StepDispatchType = stepAddMenusDispatch | stepChangeDispatch;
