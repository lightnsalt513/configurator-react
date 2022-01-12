import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import s from './MainNav.module.scss';
import { addStepMenus, changeStep } from 'state/actions/StepsActions';
import { StepNameType } from 'state/actions/StepsActionTypes';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { BREAKPOINTS } from 'constant';
import { debounce } from 'helpers/debounce';

export const MainNav: React.FC = () => {
  const dispatch = useDispatch();
  const menusRef = useRef<HTMLAnchorElement[] | null[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const currentStep = useSelectorTyped((state) => state.steps.currentStep);
  const currentStepRef = useRef(currentStep);
  const viewportType = useRef<'PC' | 'MO' | null>(null);

  useEffect(() => {
    currentStepRef.current = currentStep;
  });

  useEffect(() => {
    viewportType.current = window.innerWidth > BREAKPOINTS.MO ? 'PC' : 'MO';

    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    animateLine();
  }, [currentStep]);

  const animateLine = (): void => {
    let targetMenu = menusRef.current[0];

    menusRef.current.forEach((menu) => {
      if (menu === null) return;
      const targetStep = menu.getAttribute('data-step');
      if (targetStep === currentStepRef.current) {
        menu.parentElement?.classList.add('is-selected');
        targetMenu = menu;
      } else {
        menu.parentElement?.classList.remove('is-selected');
      }
    });

    setTimeout(() => {
      gsap.to(lineRef.current, {
        duration: 0.4,
        left: targetMenu?.offsetLeft,
        width: targetMenu?.clientWidth,
      });
    }, 100);
  };

  const onResize = debounce(() => {
    if (window.innerWidth > BREAKPOINTS.MO) {
      if (viewportType.current !== 'PC') {
        viewportType.current = 'PC';
        animateLine();
      }
    } else {
      if (viewportType.current !== 'MO') {
        viewportType.current = 'MO';
        animateLine();
      }
    }
  }, 150);

  const onClickMenu = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    const newStep = e.currentTarget.getAttribute('data-step') as StepNameType;
    if (newStep && currentStep !== newStep) {
      if (
        e.currentTarget.parentElement?.parentElement?.firstElementChild !==
        e.currentTarget.parentElement
      ) {
        dispatch(addStepMenus(newStep));
      }
      dispatch(changeStep(newStep));
    }
  };

  return (
    <div className={s.nav}>
      <div className={s.nav__inner}>
        <ul>
          <li className="is-selected">
            <a
              href="none"
              ref={(el) => (menusRef.current[0] = el)}
              onClick={onClickMenu}
              role="button"
              data-step="MODEL"
            >
              Model &amp; Size
            </a>
          </li>
          <li>
            <a
              href="none"
              ref={(el) => (menusRef.current[1] = el)}
              onClick={onClickMenu}
              role="button"
              data-step="STRAP"
            >
              Band
            </a>
          </li>
        </ul>
        <div className={s.nav__line}>
          <span
            ref={lineRef}
            className={s['nav__line-active']}
            style={{ left: 0, width: 0 }}
          ></span>
        </div>
      </div>
    </div>
  );
};
