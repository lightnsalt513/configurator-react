import { Reducer } from 'redux';
import {
  STEP_CHANGE,
  STEP_ADD_MENU,
  StepType,
  StepDispatchType,
  StepNameType,
  STEP_CHANGE_IDX,
  CHANGE_WATCH_PRODUCT_ORDER,
} from 'state/actions/StepsActionTypes';

interface StepStateType {
  currentStep: StepNameType;
  currentIdx: number;
  steps: StepType[];
}

const initialState: StepStateType = {
  currentStep: 'MODEL',
  currentIdx: 0,
  steps: [{ name: 'MODEL' }, { name: 'STRAP' }],
};

export const reducer: Reducer<StepStateType, StepDispatchType> = (state = initialState, action) => {
  switch (action.type) {
    case STEP_CHANGE:
      return { ...state, currentStep: action.payload };
    case STEP_ADD_MENU:
      const updatedSteps = state.steps.map((step) => {
        if (step.name === action.payload.name) {
          return {
            ...step,
            menus: action.payload.menus,
            productOrder: action.payload.productOrder,
          };
        } else {
          return { ...step };
        }
      });
      return { ...state, steps: updatedSteps };
    case CHANGE_WATCH_PRODUCT_ORDER:
      const newSteps = state.steps.map((step) => {
        if (step.name === 'MODEL') {
          return {
            ...step,
            productOrder: action.payload,
          };
        } else {
          return { ...step };
        }
      });
      return { ...state, steps: newSteps };
    case STEP_CHANGE_IDX:
      return { ...state, currentIdx: action.payload };
    default:
      return state;
  }
};
