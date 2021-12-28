import React, { useEffect, useState } from 'react';
import s from './ThemePicker.module.scss';
import { IState as Props } from 'components/App';
import { useRef } from 'react';

interface IProps {
  theme: Props['theme'];
  setTheme: React.Dispatch<React.SetStateAction<Props['theme']>>;
}

export const ThemePicker: React.FC<IProps> = ({ theme, setTheme }) => {
  const [open, setOpen] = useState(false);
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener('click', handleEventOutside);
    document.addEventListener('focusout', handleEventOutside);
    return () => {
      document.removeEventListener('click', handleEventOutside);
      document.removeEventListener('focusout', handleEventOutside);
    };
  }, []);

  const handleEventOutside = (e: MouseEvent | FocusEvent): void => {
    let target: HTMLElement;
    if (e.type === 'click') {
      target = e.target as HTMLElement;
    } else {
      target = e.relatedTarget as HTMLElement;
    }
    if (!themeRef.current?.contains(target)) {
      setOpen(false);
    }
  };

  const onClickTheme = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const onClickOption = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const newTheme = e.currentTarget.getAttribute('data-theme') as IProps['theme'];
    if (theme !== newTheme) {
      setTheme(newTheme);
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className={s.theme} ref={themeRef}>
      <a
        href="none"
        onClick={onClickTheme}
        role="button"
        className={s.theme__btn}
        aria-expanded={open}
      >
        <span className="blind">Select colour theme</span>
        <span className={s.theme__palette}>
          <span className={s['el-palette'] + ' type-color'}></span>
          <span className={s['el-palette'] + ' type-white'}></span>
          <span className={s['el-palette'] + ' type-black'}></span>
        </span>
      </a>
      <div className={s.theme__menu + (open ? ' is-open' : '')}>
        <ul>
          <li className={theme === 'color' ? 'is-selected' : ''}>
            <a
              href="none"
              onClick={onClickOption}
              role="button"
              className={s['el-btn-theme-color']}
              data-theme="color"
            >
              Colour Match Theme
            </a>
          </li>
          <li className={theme === 'white' ? 'is-selected' : ''}>
            <a
              href="none"
              onClick={onClickOption}
              role="button"
              className={s['el-btn-theme-white']}
              data-theme="white"
            >
              White Theme
            </a>
          </li>
          <li className={theme === 'black' ? 'is-selected' : ''}>
            <a
              href="none"
              onClick={onClickOption}
              role="button"
              className={s['el-btn-theme-dark']}
              data-theme="black"
            >
              Black Theme
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
