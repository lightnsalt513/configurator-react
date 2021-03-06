import { Dispatch } from 'redux';
import {
  StepDispatchType,
  StepType,
  STEP_CHANGE,
  STEP_ADD_MENU,
  STEP_CHANGE_IDX,
  ChangeProductOrderDispatch,
  CHANGE_WATCH_PRODUCT_ORDER,
} from './StepsActionTypes';
import { RootStateType } from 'state/reducers';

export const changeStep = (name: StepType['name']) => (dispatch: Dispatch<StepDispatchType>) => {
  dispatch({
    type: STEP_CHANGE,
    payload: name,
  });
};

export const addStepMenus =
  (name: StepType['name']) =>
  (dispatch: Dispatch<StepDispatchType>, getState: () => RootStateType) => {
    const state = getState().products;
    let stepObj: StepType;

    if (name === 'MODEL') {
      const watchData = state?.products?.watches;
      let watchList: StepType['productOrder'] = [];
      let menuList: string[] = [];
      let itemList: string[][] = [];
      let menuObj: { [key: string]: number } = {};

      for (let key in watchData) {
        if (watchData.hasOwnProperty(key)) {
          let categoryName = watchData[key].category.localTxt;
          categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
          if (menuObj[categoryName] === undefined) {
            menuObj[categoryName] = 0;
            menuList.push(categoryName);
            itemList[menuList.length - 1] = [];
          }
          if (menuList.length && watchData[key].isMainView) {
            itemList[menuList.length - 1].push(key);
          }
        }
      }

      itemList.reduce((sumIdx, itemArray, i) => {
        menuObj[menuList[i]] = sumIdx;
        return sumIdx + itemArray.length;
      }, 0);

      watchList = itemList.join().split(',');

      stepObj = {
        name: 'MODEL',
        menus: menuList.map((menu) => {
          return {
            name: menu,
            idx: menuObj[menu],
          };
        }),
        productOrder: watchList,
      };
    } else {
      const selectedWatch = state.selectedWatch?.sku;
      const strapData = state?.products?.straps;
      let strapList = selectedWatch && state.products?.watches[selectedWatch].selectableStraps;
      let menuList: string[] = [];
      let itemList: string[][] = [];
      let menuObj: { [key: string]: number } = {};

      if (!selectedWatch || !strapData || !strapList) return;

      strapList.forEach((item) => {
        const strap = strapData[item];
        let categoryName = strap.category.localTxt;
        categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        if (menuObj[categoryName] === undefined) {
          menuObj[categoryName] = 0;
          menuList.push(categoryName);
          itemList[menuList.length - 1] = [];
        }
        if (menuList.length) {
          itemList[menuList.length - 1].push(item);
        }
      });

      itemList.reduce((sumIdx, itemArray, i) => {
        menuObj[menuList[i]] = sumIdx;
        return sumIdx + itemArray.length;
      }, 0);

      strapList = itemList.join().split(',');

      stepObj = {
        name: 'STRAP',
        menus: menuList.map((menu) => {
          return {
            name: menu,
            idx: menuObj[menu],
          };
        }),
        productOrder: strapList,
      };
    }

    dispatch({
      type: STEP_ADD_MENU,
      payload: stepObj,
    });
  };

export const changeWatchProductOrder =
  (oldSku: string, sku: string) =>
  (dispatch: Dispatch<ChangeProductOrderDispatch>, getState: () => RootStateType) => {
    const state = getState().steps;
    const productOrder = state.steps.find((step) => step.name === 'MODEL')?.productOrder;
    if (!productOrder) return;
    const currentIdx = productOrder?.indexOf(oldSku);
    const newProductOrder = [...productOrder];
    newProductOrder[currentIdx] = sku;
    dispatch({
      type: CHANGE_WATCH_PRODUCT_ORDER,
      payload: newProductOrder,
    });
  };

export const changeCurrentIndex = (idx: number) => (dispatch: Dispatch<StepDispatchType>) => {
  dispatch({
    type: STEP_CHANGE_IDX,
    payload: idx,
  });
};
