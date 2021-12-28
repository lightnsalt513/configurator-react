import React, { useEffect, useState } from 'react';
import s from './App.module.scss';
import { MainNav } from 'components/MainNav/MainNav';
import { SubNav } from 'components/SubNav/SubNav';
import { ProductSlider } from 'components/ProductSlider/ProductSlider';
import { ThemePicker } from './ThemePicker/ThemePicker';
import { fetchProducts } from 'state/actions/ProductsActions';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { useReduxDispatch } from 'helpers/useReduxDispatch';
import { addStepMenus } from 'state/actions/StepsActions';

export interface IState {
  theme: 'color' | 'white' | 'black';
  bg: string;
}

export const App: React.FC = () => {
  const dispatch = useReduxDispatch();

  const [theme, setTheme] = useState<IState['theme']>('color');

  const productsState = useSelectorTyped((state) => state.products);
  const stepState = useSelectorTyped((state) => state.steps);

  useEffect(() => {
    dispatch(fetchProducts()).then((res) => {
      let watchMenus: { [key: string]: string } = {};
      let strapMenus: { [key: string]: string } = {};

      for (let key in res.watches) {
        let categoryName = res.watches[key].category.localTxt;
        categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        if (watchMenus[categoryName]) continue;
        watchMenus[categoryName] = categoryName;
      }

      for (let key in res.straps) {
        let categoryName = res.straps[key].category.localTxt;
        categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
        if (strapMenus[categoryName]) continue;
        strapMenus[categoryName] = categoryName;
      }

      let watchMenusArray = Object.keys(watchMenus);
      let strapMenusArray = Object.keys(strapMenus);

      dispatch(addStepMenus('MODEL', watchMenusArray));
      dispatch(addStepMenus('STRAP', strapMenusArray));
    });

    return () => {
      // cleanup;
    };
  }, []);

  useEffect(() => {
    console.log(productsState);
    console.log(stepState);
    return () => {
      // cleanup;
    };
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
          <SubNav />
          <ProductSlider />
          Step: {stepState.currentStep.name} <br />
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
