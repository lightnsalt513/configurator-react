import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './App.module.scss';
import { MainNav } from 'components/MainNav/MainNav';
import { SubNav } from 'components/SubNav/SubNav';
import { ProductSlider } from 'components/ProductSlider/ProductSlider';
import { ThemePicker } from './ThemePicker/ThemePicker';
import { RootReducerType } from 'state/reducers';

export interface IState {
  step: 'MODEL' | 'STRAP';
  submenus: string[];
  theme: 'color' | 'white' | 'black';
  bg: string;
  selectedWatch: string;
  selectedStrap: string;
  selectedItemIdx: number;
}

export const App: React.FC = () => {
  const [theme, setTheme] = useState<IState['theme']>('color');

  const stepState = useSelector((state: RootReducerType) => state.steps);

  useEffect(() => {
    //
    return () => {
      // cleanup;
    };
  }, []);

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
