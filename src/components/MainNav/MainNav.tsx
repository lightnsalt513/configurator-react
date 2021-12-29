import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { gsap } from 'gsap';
import s from './MainNav.module.scss';
import { addStepMenus, changeStep } from 'state/actions/StepsActions';
import { StepNameType } from 'state/actions/StepsActionTypes';
import { useSelectorTyped } from 'helpers/useSelectorType';

export const MainNav: React.FC = () => {
  const menusRef = useRef<HTMLAnchorElement[] | null[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const currentStep = useSelectorTyped((state) => state.steps.currentStep);

  useEffect(() => {
    let targetMenu = menusRef.current[0];

    menusRef.current.forEach((menu) => {
      if (menu === null) return;
      const targetStep = menu.getAttribute('data-step');
      if (targetStep === currentStep) {
        menu.parentElement?.classList.add('is-selected');
        targetMenu = menu;
      } else {
        menu.parentElement?.classList.remove('is-selected');
      }
    });

    gsap.to(lineRef.current, {
      duration: 0.4,
      left: targetMenu?.offsetLeft,
      width: targetMenu?.clientWidth,
    });
    return () => {};
  }, [currentStep]);

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
