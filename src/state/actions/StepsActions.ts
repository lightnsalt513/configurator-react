import { Dispatch } from 'redux';
import { StepDispatchType, StepType, STEP_CHANGE, STEP_ADD_MENU } from './StepsActionTypes';

export const changeStep = (name: StepType['name']) => (dispatch: Dispatch<StepDispatchType>) => {
  dispatch({
    type: STEP_CHANGE,
    payload: name,
  });
};

export const addStepMenus =
  (name: StepType['name'], menus: StepType['menus']) => (dispatch: Dispatch<StepDispatchType>) => {
    dispatch({
      type: STEP_ADD_MENU,
      payload: {
        name,
        menus,
      },
    });
  };
