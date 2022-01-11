import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import s from './Modal.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';

interface IProps {
  onClose: () => void;
}

export const Modal: React.FC<IProps> = ({ onClose }) => {
  const [watchChecked, setWatchChecked] = useState(true);
  const [strapChecked, setStrapChecked] = useState(true);

  const straps = useSelectorTyped((state) => state.products.products?.straps);
  const selectedWatchObj = useSelectorTyped((state) => state.products.selectedWatch);
  const selectedStrapObj = useSelectorTyped((state) => state.products.selectedStrap);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  if (!straps || !selectedWatchObj || !selectedStrapObj) return null;

  const watchData = selectedWatchObj.data;
  const strapData = selectedStrapObj.data;
  const isDefaultStrap = selectedStrapObj.sku === watchData.defaultStrap;
  const mainWatchImg = watchData.imgUrl.front;
  const mainStrapImg = strapData.imgUrl.front[`size${watchData.size}`];
  const watchName = watchData.model;
  const strapName = isDefaultStrap ? '' : strapData.model;
  const isWatchOutOfStock = watchData.isOutOfStock;
  const isStrapOutOfStock = isDefaultStrap ? false : strapData.isOutOfStock;
  const watchThumbs = [
    watchData.imgUrl.front,
    straps[watchData.defaultStrap].imgUrl.front[`size${watchData.size}`],
    watchData.imgUrl.charger,
  ];
  let watchPrice = watchChecked && !isWatchOutOfStock ? watchData.price.total : null;
  let strapPrice =
    strapChecked && !isDefaultStrap && !isStrapOutOfStock ? strapData.price.total : null;
  let totalPrice = (watchPrice || 0) + (strapPrice || 0);

  const onChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.currentTarget.name === 'check_watch') {
      setWatchChecked(!watchChecked);
    } else if (e.currentTarget.name === 'check_strap') {
      setStrapChecked(!strapChecked);
    }
  };

  const onClickClose = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onClose();
  };

  return ReactDOM.createPortal(
    <div className={s.modal}>
      <div className={s.modal__dimmed}></div>
      <div className={s.modal__body} role="dialog">
        <div className={s['modal__body-wrapper']}>
          <div className={s.modal__title}>
            <strong>Selection Summary</strong>
          </div>
          <div className={s.modal__content}>
            <div className={s['modal__content-inner']}>
              <div className={s.modal__image}>
                <img src={mainStrapImg} alt={watchName} />
                <img src={mainWatchImg} alt={strapName} />
              </div>
              <div className={s.modal__product}>
                <div className={s['modal__product-item']}>
                  <div className={s['el-product']}>
                    <div className={s['el-product-image']}>
                      {watchThumbs.map((img, i) => (
                        <img key={i} src={img} alt="" />
                      ))}
                    </div>
                    {!isWatchOutOfStock && (
                      <div className={s['cm-checkbox']}>
                        <input
                          type="checkbox"
                          id="check_watch"
                          name="check_watch"
                          className={s['cm-checkbox__input']}
                          onChange={onChangeCheckbox}
                          checked={watchChecked}
                        />
                        <label htmlFor="check_watch" className={s['cm-checkbox__label']}>
                          <span className={s['s-box']}></span>
                          <span className={s['s-label']}>{watchName}</span>
                        </label>
                      </div>
                    )}
                  </div>
                  {!isWatchOutOfStock && <p className={s['el-product-title']}>Main Package</p>}
                </div>
                <div className={s['modal__product-item']}>
                  <div className={s['el-product']}>
                    <div className={s['el-product-image']}>
                      {!isDefaultStrap && <img src={mainStrapImg} alt="" />}
                    </div>
                    {!isDefaultStrap && !isStrapOutOfStock && (
                      <div className={s['cm-checkbox']}>
                        <input
                          type="checkbox"
                          id="check_strap"
                          name="check_strap"
                          className={s['cm-checkbox__input']}
                          onChange={onChangeCheckbox}
                          checked={strapChecked}
                        />
                        <label htmlFor="check_strap" className={s['cm-checkbox__label']}>
                          <span className={s['s-box']}></span>
                          <span className={s['s-label']}>{strapName}</span>
                        </label>
                      </div>
                    )}
                  </div>
                  {!isDefaultStrap && !isStrapOutOfStock && (
                    <p className={s['el-product-title']}>{strapName}</p>
                  )}
                </div>
              </div>
              <div className={s.modal__summary}>
                <ul>
                  <li className={s['el-summary-item']}>
                    <strong className={s['el-summary-title']}>{watchName}</strong>
                    <em className={s['el-summary-price']}>${watchPrice}</em>
                  </li>
                  {!isDefaultStrap && (
                    <li className={s['el-summary-item']}>
                      <strong className={s['el-summary-title']}>{strapName}</strong>
                      <em className={s['el-summary-price']}>${strapPrice}</em>
                    </li>
                  )}
                  <li className={s['el-summary-total']}>
                    <strong className={s['el-summary-title']}>Total</strong>
                    <em className={s['el-summary-price']}>${totalPrice}</em>
                  </li>
                </ul>
              </div>
              <div className={s.modal__cta}>
                <button
                  className={s['el-cta-pill'] + (totalPrice ? '' : ' is-disabled')}
                  title="Go to the shopping cart page"
                  disabled={Boolean(totalPrice)}
                >
                  <span>Add to basket</span>
                </button>
              </div>
            </div>
          </div>
          <div className={s.modal__close}>
            <button onClick={onClickClose}>
              <span className="blind">Close</span>
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal')!
  );
};
