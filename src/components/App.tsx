import React, { useEffect, useRef, useState } from 'react';
import s from './App.module.scss';
import { MainNav } from 'components/MainNav/MainNav';
import { SubNav } from 'components/SubNav/SubNav';
import { ProductSlider } from 'components/ProductSlider/ProductSlider';
import { ThemePicker } from './ThemePicker/ThemePicker';
import {
  changeSelectedStrap,
  changeSelectedWatch,
  fetchProducts,
} from 'state/actions/ProductsActions';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { useReduxDispatch } from 'helpers/useReduxDispatch';
import { addStepMenus } from 'state/actions/StepsActions';
import { changeIndexAndSelectedProduct } from 'state/actions/MultipleActions';

export interface IState {
  theme: 'color' | 'white' | 'black';
  bg: string[];
  defaultIdx: number;
  isIdxReset: boolean;
}

export const App: React.FC = () => {
  const dispatch = useReduxDispatch();

  const productsState = useSelectorTyped((state) => state.products);
  const stepState = useSelectorTyped((state) => state.steps);
  const modelSliderRef = useRef(null);

  const [theme, setTheme] = useState<IState['theme']>('color');
  const [bg, setBg] = useState<IState['bg']>(['#fff']);
  const [defaultIdx, setDefaultIdx] = useState<IState['defaultIdx']>(0);
  const [isIdxReset, setIsIdxReset] = useState<IState['isIdxReset']>(false);

  useEffect(() => {
    dispatch(fetchProducts()).then((res) => {
      const watch = Object.keys(res.watches)[defaultIdx];
      const strap = res.watches[watch].defaultStrap;
      dispatch(addStepMenus(stepState.currentStep));
      dispatch(changeSelectedWatch(watch));
      dispatch(changeSelectedStrap(strap));
    });
  }, []);

  useEffect(() => {
    if (productsState.products && productsState.selectedStrap) {
      const strap = productsState.selectedStrap.sku;
      const colorCode = productsState.products.straps[strap].colorCode;
      setBg(colorCode);
    }
  }, [productsState.products, productsState.selectedStrap]);

  useEffect(() => {
    setIsIdxReset(false);
    if (stepState.currentStep === 'MODEL') {
      setDefaultIdx(0);
      dispatch(changeIndexAndSelectedProduct(0));

      if (!modelSliderRef.current) return;
      (modelSliderRef.current as HTMLDivElement).style.display = '';
    } else {
      const defaultStrapSku = productsState.selectedWatch?.data.defaultStrap;
      const idx = defaultStrapSku
        ? stepState.steps
            .find((step) => step.name === 'STRAP')
            ?.productOrder?.indexOf(defaultStrapSku)
        : null;
      if (idx) {
        setDefaultIdx(idx);
        dispatch(changeIndexAndSelectedProduct(idx));
      }

      if (!modelSliderRef.current) return;
      (modelSliderRef.current as HTMLDivElement).style.display = 'none';
    }
    setIsIdxReset(true);
  }, [stepState.currentStep]);

  return (
    <div
      className={
        s.app + (theme !== 'color' ? (theme === 'white' ? ' theme-white' : ' theme-black') : '')
      }
    >
      <div className={s.app__bg}>
        <span className={s['app__bg-default']} style={{ background: bg[0] }}></span>
        <span className={s['app__bg-second']} style={{ background: bg[1] }}></span>
      </div>
      <div className={s.app__inner}>
        <div className={s.app__head}>
          <h1 className={s.app__title}>
            <a href="https://www.samsung.com/no/watches">Galaxy Watch Mix-and-Match</a>
          </h1>
        </div>
        <div className={s.app__body}>
          <MainNav />
          {productsState.initialized && (
            <>
              <SubNav />
              <div ref={modelSliderRef}>
                <ProductSlider type="MODEL" defaultIdx={defaultIdx} />
              </div>
              {stepState.currentStep === 'STRAP' && isIdxReset && (
                <ProductSlider type="STRAP" defaultIdx={defaultIdx} />
              )}
            </>
          )}
          Step: {stepState.currentStep} <br />
          Theme: {theme}
        </div>
        <ThemePicker theme={theme} setTheme={setTheme} />
        <div className={s.app__cta}>
          <a href="none" role="button" className={s['app__cta-back']}>
            <span className="blind">Go to the previous page</span>
          </a>
          <a href="none" role="button" className={s['app__cta-experience-close']}>
            <span className="blind">Close</span>
          </a>
        </div>
      </div>
    </div>
  );
};
