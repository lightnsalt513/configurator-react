import React, { useState, useEffect, useRef } from 'react';
import s from './SubNav.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { useReduxDispatch } from 'helpers/useReduxDispatch';
import { changeIndexAndSelectedProduct } from 'state/actions/MultipleActions';

export const SubNav: React.FC = () => {
  const dispatch = useReduxDispatch();

  const currentStep = useSelectorTyped((state) => state.steps.currentStep);
  const currentIdx = useSelectorTyped((state) => state.steps.currentIdx);
  const steps = useSelectorTyped((state) => state.steps.steps);
  let menus = steps.find((step) => step.name === currentStep)?.menus;
  const [selected, setSelected] = useState(0);

  const menuRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    menus = steps.find((step) => step.name === currentStep)?.menus;
    return () => {
      // cleanup;
    };
  }, [currentStep, steps]);

  useEffect(() => {
    for (let i = 0, max = menuRefs.current.length; i < max; i++) {
      const minIdx = menuRefs.current[i]?.getAttribute('data-view-idx');
      const maxIdx = menuRefs.current[i + 1]?.getAttribute('data-view-idx');

      if (typeof minIdx !== 'string' && typeof maxIdx !== 'string') return;
      if (currentIdx >= Number(minIdx)) {
        if (i === max - 1 || currentIdx < Number(maxIdx)) {
          setSelected(i);
          break;
        }
      }
    }
  }, [currentIdx]);

  const onClickMenu = (e: React.MouseEvent<HTMLLIElement>): void => {
    e.preventDefault();
    if (e.currentTarget.parentNode === null) return;
    const idx = Array.from(e.currentTarget.parentNode.children).indexOf(e.currentTarget);
    setSelected(idx);

    const targetIdx = Number(e.currentTarget.getAttribute('data-view-idx'));
    if (targetIdx !== null) {
      dispatch(changeIndexAndSelectedProduct(targetIdx));
    }
  };

  return (
    <div className={s.subnav}>
      <ul>
        {menus &&
          menus.map((menu, i) => {
            return (
              <li
                key={i}
                ref={(elem) => (menuRefs.current[i] = elem)}
                onClick={onClickMenu}
                className={i === selected ? 'is-selected' : ''}
                role="presentation"
                data-view-idx={menu.idx}
              >
                <a href="none" role="button">
                  {menu.name}
                </a>
              </li>
            );
          })}
      </ul>
    </div>
  );
};
