import { Reducer } from 'redux';
import {
  STEP_CHANGE,
  STEP_ADD_MENU,
  StepType,
  StepDispatchType,
  StepNameType,
} from 'state/actions/StepsActionTypes';

interface StepStateType {
  currentStep: StepNameType;
  steps: StepType[];
}

const initialState: StepStateType = {
  currentStep: 'MODEL',
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
          return step;
        }
      });
      return { ...state, steps: updatedSteps };
    default:
      return state;
  }
};
