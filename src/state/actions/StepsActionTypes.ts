export const STEP_CHANGE = 'STEP_CHANGE';
export const STEP_ADD_MENU = 'STEP_ADD_MENU';

export type StepNameType = 'MODEL' | 'STRAP';

export type StepType = {
  name: StepNameType;
  menus?: string[];
};

export interface stepAddMenusDispatch {
  type: typeof STEP_ADD_MENU;
  payload: StepType;
}

export interface stepChangeDispatch {
  type: typeof STEP_CHANGE;
  payload: StepNameType;
}

export type StepDispatchType = stepAddMenusDispatch | stepChangeDispatch;
