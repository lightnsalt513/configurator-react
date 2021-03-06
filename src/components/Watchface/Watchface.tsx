import gsap, { Power3 } from 'gsap';
import s from './Watchface.module.scss';
import { BREAKPOINTS, MINHEIGHT_PC } from 'constant';
import { useSelectorTyped } from 'helpers/useSelectorType';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { debounce } from 'helpers/debounce';

const SETTINGS = {
  touchSensitivity: 20,
};

export const Watchface: React.FC = () => {
  const mainImagesRef = useRef<HTMLDivElement[]>([]);
  const watchfaceListRef = useRef<HTMLUListElement>(null);
  const watchfaceListWrapRef = useRef<HTMLDivElement>(null);
  const watchfaceAreaRef = useRef<HTMLDivElement>(null);

  const selectedWatch = useSelectorTyped((state) => state.products.selectedWatch);
  const selectedSize = selectedWatch?.data.size;
  const selectedStrap = useSelectorTyped((state) => state.products.selectedStrap);
  const category = selectedWatch?.data.category.engTxt.toLowerCase();
  const watchfaceList = useSelectorTyped((state) => {
    return category ? state.watchfaces.watchfaces[category] : null;
  });
  const targetDegs = watchfaceList?.map((item, i) => {
    return (360 / watchfaceList.length) * i * -1;
  });

  const currentIdx = useRef(0);
  const cycle = useRef(0);
  const wheelCount = useRef(0);
  const viewportType = useRef<'PC' | 'MO' | null>(null);
  const [currentIndex, setCurrentIndex] = useState(currentIdx.current);

  useEffect(() => {
    viewportType.current = window.innerWidth > BREAKPOINTS.MO ? 'PC' : 'MO';
    setRotateCircleSize();
    setWatchSize();

    window.addEventListener('wheel', onMouseWheel);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('wheel', onMouseWheel);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  const onResize = debounce(() => {
    if (window.innerWidth > BREAKPOINTS.MO) {
      if (viewportType.current !== 'PC') {
        viewportType.current = 'PC';
        resetLayout();
      }
    } else {
      if (viewportType.current !== 'MO') {
        viewportType.current = 'MO';
        resetLayout();
      }
    }
  }, 150);

  const resetLayout = (): void => {
    setTimeout(() => {
      setRotateCircleSize();
      setWatchSize();
    }, 500);
  };

  const onMouseWheel = useCallback(
    (e: WheelEvent, direction?: any): void => {
      e.stopPropagation();
      if (!watchfaceList || !targetDegs) return;
      const deltaY = direction ? null : e.deltaY;
      const listLength = watchfaceList.length;
      let newDirection: number;

      function applyRotateWatchface() {
        const targetIdx = currentIdx.current + newDirection;
        const newCycle =
          targetIdx < 0
            ? cycle.current - 1
            : targetIdx >= listLength
            ? cycle.current + 1
            : cycle.current;
        const newIdx = targetIdx < 0 ? listLength - 1 : targetIdx >= listLength ? 0 : targetIdx;
        rotateWatchface(newIdx, newCycle);
      }
      if (deltaY === null || Math.abs(deltaY) > 50) {
        newDirection = direction ? direction : Number(deltaY) < 0 ? 1 : -1;
        applyRotateWatchface();
      } else {
        wheelCount.current = wheelCount.current + deltaY;
        if (Math.abs(wheelCount.current) > SETTINGS.touchSensitivity) {
          newDirection = wheelCount.current < 0 ? 1 : -1;
          applyRotateWatchface();
          wheelCount.current = 0;
        }
      }
    },
    [currentIndex]
  );

  const onClickWatchface = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    if (!watchfaceListRef.current) return;
    let newCycle: number;
    const newIdx = Array.from(watchfaceListRef.current.children).indexOf(
      e.currentTarget.parentElement as HTMLElement
    );
    const mainWatchCenter =
      mainImagesRef.current[0]?.getBoundingClientRect().left +
      mainImagesRef.current[0]?.clientWidth / 2;
    const direction =
      e.currentTarget.getBoundingClientRect().left > mainWatchCenter ? 'right' : 'left';

    if (direction === 'right') {
      newCycle = newIdx < currentIndex ? cycle.current + 1 : cycle.current;
    } else {
      newCycle = newIdx > currentIndex ? cycle.current - 1 : cycle.current;
    }
    rotateWatchface(newIdx, newCycle);
  };

  const rotateWatchface = (targetIdx: number, newcycle: number): void => {
    if (!targetDegs) return;
    const rotateVal =
      newcycle !== 0 ? targetDegs[targetIdx] - 360 * newcycle : targetDegs[targetIdx];

    gsap.to(watchfaceListRef.current, {
      duration: 0.7,
      rotation: rotateVal,
      ease: Power3.easeOut,
    });

    cycle.current = newcycle;
    currentIdx.current = targetIdx;
    setCurrentIndex(targetIdx);
  };

  const setWatchSize = (): void => {
    const watchface = watchfaceListRef.current?.querySelector('a');
    if (!watchface || !selectedWatch) return;
    const computedStyle = window.getComputedStyle(watchface);
    const watchfaceWidth = parseInt(computedStyle.width);
    const watchfaceMinWidth = parseInt(computedStyle.minWidth);
    const watchfaceMaxWidth = parseInt(computedStyle.maxWidth);
    const diameter = selectedWatch.data.watchfaceImgRadius * 2;

    const minWidth = (watchfaceMinWidth * 100) / diameter;
    const maxWidth = (watchfaceMaxWidth * 100) / diameter;

    mainImagesRef.current.forEach((imgElem) => {
      if (!imgElem) return;
      if (viewportType.current === 'PC') {
        imgElem.style.minWidth = minWidth + 'px';
        imgElem.style.maxWidth = maxWidth + 'px';
        imgElem.style.width = (minWidth / MINHEIGHT_PC) * 100 + 'vh';
      } else {
        imgElem.style.minWidth = '';
        imgElem.style.maxWidth = '';
        imgElem.style.width = (watchfaceWidth * 100) / diameter + 'px';
      }
    });
  };

  const setRotateCircleSize = (): void => {
    if (!watchfaceListWrapRef.current || !watchfaceListRef.current || !watchfaceList) return;
    let edgeLength: number;
    let watchfaceAreaBaseHeight: number;
    if (viewportType.current === 'PC') {
      const watchfaceBaseWidth = Number(
        window
          .getComputedStyle(watchfaceListRef.current.querySelector('li a') as HTMLElement)
          .minWidth.replace('px', '')
      );
      edgeLength = watchfaceBaseWidth * 1.55;
      watchfaceAreaBaseHeight = Number(
        window.getComputedStyle(watchfaceAreaRef.current as HTMLElement).minHeight.replace('px', '')
      );
    } else {
      const watchfaceBaseWidth = Number(
        window
          .getComputedStyle(watchfaceListRef.current.querySelector('li a') as HTMLElement)
          .width.replace('px', '')
      );
      edgeLength = watchfaceBaseWidth * 1.53; // ?????? 1.37
      watchfaceAreaBaseHeight = Number(
        window.getComputedStyle(watchfaceAreaRef.current as HTMLElement).height.replace('px', '')
      );
    }
    const x = Math.PI / watchfaceList.length;
    const calculatedRadius = edgeLength / Math.sin(x) / 2;
    const radiusInPercentage = (calculatedRadius / watchfaceAreaBaseHeight) * 100;

    watchfaceListWrapRef.current.style.height = radiusInPercentage + '%';
  };

  if (!selectedWatch || !selectedStrap || !watchfaceList) return null;

  return (
    <div ref={watchfaceAreaRef} className={s.watchface}>
      <div className={s.watchface__area}>
        <div
          ref={(elem) => (mainImagesRef.current[0] = elem as HTMLDivElement)}
          className={s.watchface__main + ' type-back'}
        >
          <img src={selectedStrap.data.imgUrl.front[`size${selectedSize}`]} alt="" />
          <span className={s['el-bg-round']}></span>
        </div>
        <div ref={watchfaceListWrapRef} className={s.watchface__list}>
          <ul ref={watchfaceListRef}>
            {watchfaceList.map((watchface, i) => {
              const rotateDeg = (360 / watchfaceList.length) * i;
              return (
                <li key={i} style={{ transform: `rotate(${rotateDeg}deg)` }}>
                  <a
                    href="none"
                    role="button"
                    onClick={onClickWatchface}
                    className={s['el-watchface-item']}
                  >
                    <img src={watchface.imgUrl} alt={watchface.imgAlt} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          ref={(elem) => (mainImagesRef.current[1] = elem as HTMLDivElement)}
          className={s.watchface__main + ' type-front'}
        >
          <img src={selectedWatch.data.imgUrl.frontFrame} alt="" />
        </div>
      </div>
      <div className={s.watchface__text}>
        <p>
          Showcasing only. <br />
          Selected watchface won't be applied to your watch.
        </p>
      </div>
    </div>
  );
};
