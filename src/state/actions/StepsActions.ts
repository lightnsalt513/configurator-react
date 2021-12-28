import { Dispatch } from 'redux';
import {
  StepDispatchType,
  StepType,
  StepNameType,
  STEP_CHANGE,
  STEP_ADD_MENU,
} from './StepsActionTypes';

export const changeStep = (name: StepNameType) => (dispatch: Dispatch<StepDispatchType>) => {
  dispatch({
    type: STEP_CHANGE,
    payload: name,
  });
};

export const addStepMenus =
  (name: StepNameType, menus: StepType['menus']) => (dispatch: Dispatch<StepDispatchType>) => {
    dispatch({
      type: STEP_ADD_MENU,
      payload: {
        name,
        menus,
      },
    });
  };
