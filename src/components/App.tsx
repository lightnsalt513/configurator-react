import React, { useEffect, useState } from 'react';
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

export interface IState {
  theme: 'color' | 'white' | 'black';
  bg: string;
}

export const App: React.FC = () => {
  const dispatch = useReduxDispatch();

  const productsState = useSelectorTyped((state) => state.products);
  const stepState = useSelectorTyped((state) => state.steps);

  const [theme, setTheme] = useState<IState['theme']>('color');

  useEffect(() => {
    dispatch(fetchProducts()).then((res) => {
      const watch = Object.keys(res.watches)[0];
      const strap = res.watches[watch].defaultStrap;
      dispatch(addStepMenus('MODEL'));
      dispatch(changeSelectedWatch(watch));
      dispatch(changeSelectedStrap(strap));
    });

    return () => {
      // cleanup;
    };
  }, []);

  useEffect(() => {
    // console.log(productsState);
    // console.log(stepState);
  }, [productsState]);

  return (
    <div
      className={
        s.app + (theme !== 'color' ? (theme === 'white' ? ' theme-white' : ' theme-black') : '')
      }
    >
      <div className={s.app__bg}>
        <span className={s['app__bg-default']}></span>
        <span className={s['app__bg-second']}></span>
      </div>
      <div className={s.app__inner}>
        <div className={s.app__head}>
          <h1 className={s.app__title}>
            <a href="https://www.samsung.com/no/watches">Galaxy Watch Mix-and-Match</a>
          </h1>
        </div>
        <div className={s.app__body}>
          <MainNav />
          {productsState.initialized && <SubNav />}
          {productsState.initialized && <ProductSlider />}
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
