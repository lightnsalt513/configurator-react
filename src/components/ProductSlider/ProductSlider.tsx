import React, { useEffect, useState } from 'react';
import SwiperCore from 'swiper';
import { Navigation, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/lazy';
import s from './ProductSlider.module.scss';
import { useSelectorTyped } from 'helpers/useSelectorType';
import { useReduxDispatch } from 'helpers/useReduxDispatch';
import { changeIndexAndSelectedProduct } from 'state/actions/MultipleActions';
import { StrapType, WatchType } from 'state/actions/ProductsActionTypes';
import { ProductInfo } from './ProductInfo/ProductInfo';
import { Modal } from 'components/Modal/Modal';
import { debounce } from 'helpers/debounce';

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
  const defaultStrap = selectedWatchObj?.data.defaultStrap;
  const stateIdx = useSelectorTyped((state) => state.steps.currentIdx);
  const [swiperInstance, setSwiperInstance] = useState<SwiperCore>();

  const [currentIdx, setCurrentIdx] = useState(defaultIdx);
  const [isStrapDefault, setIsStrapDefault] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (swiperInstance && stateIdx !== currentIdx) {
      setCurrentIdx(stateIdx);
      swiperInstance.slideTo(stateIdx);
    }

    if (type === 'STRAP') {
      if (!productList) return;
      if (productList[stateIdx] === defaultStrap) {
        setIsStrapDefault(true);
      } else {
        setIsStrapDefault(false);
      }
    }
  }, [swiperInstance, stateIdx]);

  const changeSlide = (): void => {
    if (swiperInstance) {
      setCurrentIdx(swiperInstance.activeIndex);
      dispatch(changeIndexAndSelectedProduct(swiperInstance.activeIndex));
    }
  };

  const onResize = debounce(() => {
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.update();
      }, 500);
    }
  }, 150);

  const onClickSlide = (e: React.MouseEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    changeSlide();
  };

  const onClickControl = (e: React.MouseEvent): void => {
    if (!(e.currentTarget instanceof HTMLElement)) return;
    changeSlide();
  };

  const onClickDefaultStrap = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (swiperInstance) {
      swiperInstance.slideTo(defaultIdx);
    }
    changeSlide();
  };

  const onCloseModal = (): void => {
    setModalOpen(false);
  };

  const createSlide = (sku: string, i: number): JSX.Element | void => {
    if (!watches || !straps) return;
    let titleTxt: string = '';
    let watchImgUrl: string = '';
    let strapImgUrl: string = '';

    if (type === 'MODEL') {
      const strapSku = watches[sku].defaultStrap;
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
      const strapSku = sku;
      const watchSize = selectedWatchObj?.data.size;
      const strapData = straps[strapSku];
      strapImgUrl = strapData.imgUrl.front[`size${watchSize}`];
      titleTxt = type + ' ' + strapData.productModelName;
    }

    return (
      <SwiperSlide key={i} onClick={onClickSlide}>
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
                <img data-src={strapImgUrl} alt="" className="swiper-lazy" />
                {type === 'MODEL' && <img data-src={watchImgUrl} alt="" className="swiper-lazy" />}
                <div className="swiper-lazy-preloader"></div>
              </div>
            </a>
          );
        }}
      </SwiperSlide>
    );
  };

  const createProductInfo = (sku: string, i: number): JSX.Element | void => {
    if (watches === undefined || straps === undefined) return;

    let watchData: WatchType;
    let strapData: StrapType;

    let watchSku: string;
    let isDefaultStrap: boolean;
    let connectivities: {
      type: string;
      sku: string;
    }[] = [];

    if (type === 'MODEL') {
      watchData = watches[sku];
      strapData = straps[watchData.defaultStrap];

      watchSku = sku;
      isDefaultStrap = true;
    } else {
      if (!selectedWatchObj) return;
      watchData = selectedWatchObj?.data;
      strapData = straps[sku];

      watchSku = selectedWatchObj.sku;
      isDefaultStrap = sku === watchData.defaultStrap;
    }
    const isActive = currentIdx === i;
    const isWatchOutOfStock = watchData.isOutOfStock;
    const isStrapOutOfStock = isDefaultStrap ? false : strapData.isOutOfStock;
    const isOnSale = watchData.price.save + strapData.price.save > 0;
    const pdUrl = watchData.pdUrl;
    const connectivity = watchData.connectivity;
    const watchName = watchData.model;
    const strapName = strapData.model;
    const price = {
      original: watchData.price.original + (isDefaultStrap ? 0 : strapData.price.original),
      save: watchData.price.save + (isDefaultStrap ? 0 : strapData.price.save),
      total: watchData.price.total + (isDefaultStrap ? 0 : strapData.price.total),
    };

    watchData.familyByConnectivity.forEach((item) => {
      connectivities.push({
        type: watches[item.SKU].connectivity,
        sku: item.SKU,
      });
    });

    const data = {
      watchSku,
      isActive,
      isDefaultStrap,
      isWatchOutOfStock,
      isStrapOutOfStock,
      isOnSale,
      pdUrl,
      connectivity,
      connectivities,
      watchName,
      strapName,
      price,
    };

    return <ProductInfo key={i} data={data} />;
  };

  return (
    <div className={s.slider}>
      <div className={s.slider__swiper}>
        <div className={s.slider__swiperarea}>
          <Swiper
            modules={[Navigation, Lazy]}
            slidesPerView={'auto'}
            centeredSlides={true}
            watchSlidesProgress={true}
            preloadImages={false}
            lazy={{
              loadPrevNext: true,
              loadPrevNextAmount: 1,
              loadOnTransitionStart: true,
            }}
            initialSlide={defaultIdx}
            speed={700}
            slideToClickedSlide={true}
            navigation={{ prevEl: '.swiper-button-prev', nextEl: '.swiper-button-next' }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
            }}
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
          {type === 'STRAP' && (
            <>
              <div className={s['slider__strap-goto']}>
                <a
                  href="none"
                  onClick={onClickDefaultStrap}
                  role="button"
                  className={s['el-btn-goto'] + (isStrapDefault ? '' : ' is-active')}
                >
                  Go to default
                </a>
              </div>
              <div className={s['slider__strap-watch']}>
                <img src={selectedWatchObj?.data.imgUrl.front} alt="" />
              </div>
            </>
          )}
        </div>
        <div className={s.slider__product}>
          {productList &&
            productList.map((sku, i) => {
              return createProductInfo(sku, i);
            })}
        </div>
        <div className={s.slider__cta}>
          <a
            href="none"
            role="button"
            className={s['el-cta-choose']}
            title="Selection products summary layer"
            onClick={(e) => {
              e.preventDefault();
              setModalOpen(true);
            }}
          >
            <span>Buy now</span>
          </a>
          {modalOpen && <Modal onClose={onCloseModal} />}
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
