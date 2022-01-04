import React from 'react';
import s from './ProductInfo.module.scss';

export interface IProps {
  data: {
    isActive: boolean;
    isDefaultStrap: boolean;
    isWatchOutOfStock: boolean;
    isStrapOutOfStock: boolean;
    isOnSale: boolean;
    pdUrl: string;
    connectivity: string;
    connectivities: string[];
    watchName: string;
    strapName: string;
    price: {
      original: number;
      save: number;
      total: number;
    };
  };
}

export const ProductInfo: React.FC<IProps> = ({ data }) => {
  return (
    <div className={s.info}>
      <div
        className={
          s.info__detail +
          (data.isActive ? ' is-active' : '') +
          (data.isWatchOutOfStock || data.isStrapOutOfStock ? ' is-outofstock' : '') +
          (data.isOnSale ? ' is-onsale' : '')
        }
      >
        <ul className={s.info__experience}>
          <li>
            <a
              href="none"
              role="button"
              className={s['el-btn-watchface']}
              data-experience="WATCHFACE"
            >
              Watchface
            </a>
          </li>
          <li>
            <a
              href={data.pdUrl}
              className={s['el-btn-learnmore']}
              rel="noreferrer"
              target="_blank"
              title="Open new window: Learn more"
            >
              Learn More
            </a>
          </li>
        </ul>
        <div className={s.info__connectivity}>
          <ul>
            {data.connectivities.map((item) => (
              <li className={data.connectivity === item ? ' is-selected' : ''}>
                <a href="none" role="button" title="{titleTxt}" data-watch-sku="">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className={s.info__desc}>
          <div className={s.info__name}>
            <strong
              className={s['el-name-watch'] + (data.isWatchOutOfStock ? ' is-outofstock' : '')}
            >
              <span className={s['el-name-watch-model']}>{data.watchName}</span>
            </strong>
            <strong
              className={
                s['el-name-strap'] +
                (data.isStrapOutOfStock ? ' is-outofstock' : '') +
                (data.isDefaultStrap ? ' is-default' : '')
              }
            >
              <span className={s['el-name-connect']}>+</span>
              <span className={s['el-name-basic']}>Basic</span>
              <span className={s['el-name-strap-model']}>{data.strapName}</span>
            </strong>
          </div>
          <div className={s.info__price}>
            <div className={s['el-price-wrap']}>
              <div className={s['el-price-info']}>
                <strong className={s['el-price']}>{data.price.total}</strong>
                <span className={s['el-txt-outofstock']}>Out of Stock</span>
              </div>
              <div className={s['el-price-detail']}>
                <span className={s['el-price-original']}>{data.price.original}</span>
                <span className={s['el-price-save-text']}>Save</span>
                <span className={s['el-price-save']}>{data.price.save}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
