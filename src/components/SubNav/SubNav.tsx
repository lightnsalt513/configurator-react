import React, { useState } from 'react';
import s from './SubNav.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';

export const SubNav: React.FC = () => {
  const menus = useSelectorTyped((state) => state.steps.currentStep.menus);
  const [selected, setSelected] = useState(0);

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
                <a href="none" role="button" data-view-idx="{dataViewIdx}">
                  {menu}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
