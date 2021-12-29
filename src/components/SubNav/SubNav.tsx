import React, { useState, useEffect } from 'react';
import s from './SubNav.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { changeSelectedWatch } from 'state/actions/ProductsActions';

export const SubNav: React.FC = () => {
  const currentStep = useSelectorTyped((state) => state.steps.currentStep);
  const steps = useSelectorTyped((state) => state.steps.steps);
  let menus = steps.find((step) => step.name === currentStep)?.menus;

  const [selected, setSelected] = useState(0);

  useEffect(() => {
    menus = steps.find((step) => step.name === currentStep)?.menus;
    console.log(steps);
    return () => {
      // cleanup;
    };
  }, [currentStep, steps]);

  const onClickMenu = (e: React.MouseEvent<HTMLLIElement>): void => {
    e.preventDefault();
    if (e.currentTarget.parentNode === null) return;
    const idx = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
    setSelected(idx);
  };

  return (
    <div className={s.subnav}>
      <ul>
        {menus &&
          menus.map((menu, i) => {
            return (
              <li
                key={i}
                onClick={onClickMenu}
                className={i === selected ? 'is-selected' : ''}
                role="presentation"
              >
                <a href="none" role="button" data-view-idx={menu.idx}>
                  {menu.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
