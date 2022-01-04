import { Dispatch } from 'redux';
import { RootStateType } from 'state/reducers';
import { changeSelectedWatch, changeSelectedStrap } from './ProductsActions';
import { ChangeStrapDispatchType, ChangeWatchDispatchType } from './ProductsActionTypes';
import { changeCurrentIndex } from './StepsActions';
import { StepDispatchType } from './StepsActionTypes';

export const changeIndexAndSelectedProduct =
  (idx: number) =>
  (
    dispatch: Dispatch<StepDispatchType | ChangeWatchDispatchType | ChangeStrapDispatchType>,
    getState: () => RootStateType
  ) => {
    const state = getState();
    const currentState = state.steps.currentStep;

    changeCurrentIndex(idx)(dispatch);

    if (currentState === 'MODEL') {
      const stepInfo = state.steps.steps.find((step) => step.name === currentState);
      if (!stepInfo?.productOrder) return;
      const targetWatch = stepInfo.productOrder[idx];
      changeSelectedWatch(targetWatch)(dispatch);
      if (!state.products.products) return;
      const targetWatchData = state.products.products.watches[targetWatch];
      const targetStrap = targetWatchData.defaultStrap;
      changeSelectedStrap(targetStrap)(dispatch);
    } else {
      const stepInfo = state.steps.steps.find((step) => step.name === currentState);
      if (!stepInfo?.productOrder) return;
      const targetStrap = stepInfo.productOrder[idx];
      changeSelectedStrap(targetStrap)(dispatch);
    }
  };
