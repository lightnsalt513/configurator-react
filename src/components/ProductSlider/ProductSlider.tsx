import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/lazy';
import s from './ProductSlider.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { useReduxDispatch } from 'helpers/useReduxDispatch';
import { changeIndexAndSelectedProduct } from 'state/actions/MultipleActions';
import { changeSelectedStrap, changeSelectedWatch } from 'state/actions/ProductsActions';
import ProductInfo from './ProductInfo/ProductInfo';

interface IProps {
  type: string;
  defaultIdx: number;
}

export const ProductSlider: React.FC<IProps> = ({ type, defaultIdx }) => {
  const dispatch = useReduxDispatch();

  const watches = useSelectorTyped((state) => state.products.products?.watches);
  const straps = useSelectorTyped((state) => state.products.products?.straps);
  const stepObj = useSelectorTyped((state) => state.steps.steps).find((step) => step.name === type);
  const productList = stepObj?.productOrder;
  const selectedWatchObj = useSelectorTyped((state) => state.products.selectedWatch);
  const stateIdx = useSelectorTyped((state) => state.steps.currentIdx);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const [currentIdx, setCurrentIdx] = useState(defaultIdx);

  useEffect(() => {
    if (swiperInstance && stateIdx !== currentIdx) {
      setCurrentIdx(stateIdx);
      swiperInstance.slideTo(stateIdx);
    }
  }, [swiperInstance, stateIdx]);

  const changeSlide = (): void => {
    if (swiperInstance) {
      setCurrentIdx(swiperInstance.activeIndex);
      dispatch(changeIndexAndSelectedProduct(swiperInstance.activeIndex));
    }
  };

  const onClickSlide = (e: React.MouseEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    changeSlide();
  };

  const onClickControl = (e: React.MouseEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    changeSlide();
  };

  const createSlide = (sku: string, i: number): JSX.Element | void => {
    if (!watches || !straps) return;
    let watchSku: string = '';
    let strapSku: string = '';
    let titleTxt: string = '';
    let watchImgUrl: string = '';
    let strapImgUrl: string = '';

    if (type === 'MODEL') {
      watchSku = sku;
      strapSku = watches[sku].defaultStrap;

      const watchData = watches[sku];
      const watchSize = watchData.size;
      const strapData = straps[strapSku];
      watchImgUrl = watchData.imgUrl.front;
      strapImgUrl = strapData.imgUrl.front[`size${watchSize}`];
      titleTxt = watchData.category.localTxt + ' ' + watchData.productModelName;
    } else {
      if (!selectedWatchObj) {
        throw Error('Selected Watch data not available');
      }
      watchSku = selectedWatchObj?.sku;
      strapSku = sku;

      const watchSize = selectedWatchObj?.data.size;
      const strapData = straps[sku];
      strapImgUrl = strapData.imgUrl.front[`size${watchSize}`];
      titleTxt = type + ' ' + strapData.productModelName;
    }

    return (
      <SwiperSlide key={i} data-watch={watchSku} data-strap={strapSku} onClick={onClickSlide}>
        {({ isActive }) => {
          return (
            <a
              href="none"
              onClick={(e) => e.preventDefault()}
              tabIndex={isActive ? 0 : -1}
              role="button"
              title={titleTxt}
              aria-hidden={isActive ? false : true}
            >
              <div className="el-img-product">
                <img src={strapImgUrl} alt="" />
                {type === 'MODEL' && <img src={watchImgUrl} alt="" />}
              </div>
            </a>
          );
        }}
      </SwiperSlide>
    );
  };

  const createProductInfo = (sku: string, i: number): JSX.Element => {
    // let title: string;
    // let pdUrl: string;
    // let price: number;
    // let isOutofStock: boolean;
    // return <ProductInfo key={i} data={
    //   title: 'watch + strap'
    //   pdUrl: ''
    //   connectivity: ''
    //   price: {
    //     original: 120
    //     save: 20
    //     total: 100
    //   }
    //   isOutofStock: false
    // } />;
    return <div></div>;
  };

  return (
    <div className={s.slider}>
      <div className={s.slider__swiper}>
        <div className={s.slider__swiperarea}>
          <Swiper
            modules={[Navigation]}
            slidesPerView={'auto'}
            centeredSlides={true}
            watchSlidesProgress={true}
            updateOnWindowResize={true}
            initialSlide={defaultIdx}
            speed={700}
            slideToClickedSlide={true}
            navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
            // onSlideChange={() => console.log('slide change')}
          >
            {productList &&
              productList.map((sku, i) => {
                return createSlide(sku, i);
              })}
          </Swiper>
          {/* <div className="watch-configurator__watch-intro">
              <video id="watch-config-loader" muted playsinline poster="/etc/designs/smg/global/imgs/blank.png">
                  <source src="/content/dam/samsung/uk/watches/mix-and-match/intro_vid.mp4" type="video/mp4">
              </video>
          </div> */}
          {type !== 'MODEL' && (
            <>
              <div className={s['slider__strap-goto']}>
                <a href="none" role="button" className="el-btn-goto">
                  Go to default
                </a>
              </div>
              <div className={s['slider__strap-watch']}>
                <img src={selectedWatchObj?.data.imgUrl.front} alt="" />
              </div>
            </>
          )}
        </div>
        <div className="watch-configurator__product-info">
          <div className="watch-configurator__product-details">
            {productList &&
              productList.map((sku, i) => {
                return createProductInfo(sku, i);
              })}
          </div>
        </div>
        <div className="watch-configurator__cta-buy">
          <a
            href="none"
            role="button"
            className="el-cta-pill el-cta-choose js-layer-opener is-async"
            title="Selection products summary layer"
            data-layer-target="#addto-cart-layer"
          >
            <span>Buy now</span>
          </a>
        </div>
        <div className={s.slider__control}>
          <div className={s['slider__control-prev']}>
            <div className="swiper-button-prev" onClick={onClickControl}></div>
          </div>
          <div className={s['slider__control-next']}>
            <div className="swiper-button-next" onClick={onClickControl}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
