import { Reducer } from 'redux';
import {
  STEP_CHANGE,
  STEP_ADD_MENU,
  StepType,
  StepDispatchType,
} from 'state/actions/StepsActionTypes';

interface StepStateType {
  currentStep: StepType;
  steps: StepType[];
}

const initialState: StepStateType = {
  currentStep: {
    name: 'MODEL',
    menus: ['Galaxy Watch 3', 'Galaxy Watch Active2', 'Galaxy Watch Active'],
  },
  steps: [
    { name: 'MODEL', menus: ['Galaxy Watch 3', 'Galaxy Watch Active2', 'Galaxy Watch Active'] },
    { name: 'STRAP' },
  ],
};

export const reducer: Reducer<StepStateType, StepDispatchType> = (state = initialState, action) => {
  switch (action.type) {
    case STEP_CHANGE:
      const newStep = state.steps.find((step) => step.name === action.payload);
      if (newStep === undefined) {
        return state;
      } else {
        return { ...state, currentStep: newStep };
      }
    case STEP_ADD_MENU:
      const updatedSteps = state.steps.map((step) => {
        if (step.name === action.payload.name) {
          return { ...step, menus: action.payload.menus };
        } else {
          return step;
        }
      });
      return { ...state, steps: updatedSteps };
    default:
      return state;
  }
};
