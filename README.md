<br />
<br />

1. [Overview](#overview)
2. [기술 스택](#techstack)
3. [주요 개발 스펙](#specification)

<br />
<br />

## 1. Overview <a id="overview"></a>
### 1) 프로젝트 개요
* 기존 jQuery 기반으로 작업해 보았던 프로젝트를 React와 TypeScript를 사용하여 재구현 시도
* 기존 프로젝트에서 포함되었던 Intro 비디오, 애니메이션, 웹접근성 및 글로벌 확장성 대응 등은 제외하고 데이터 처리에 대한 부분만 집중적으로 작업
* API 통신 없이 더미 데이터 활용 
> **Demo URL** : https://lightnsalt513.github.io/configurator-react

> **기존 프로젝트 README** : https://github.com/lightnsalt513/configurator-jquery    
> **기존 프로젝트 Live URL** : https://www.samsung.com/fr/watches/mix-and-match/ 

<br />
<br />

## 2. 기술 스택 <a id="techstack"></a>
### 주요 기술 스택
  * FE :
    * `React`
    * `TypeScript`
    * `Redux` (State관리)
    * `SASS`

&nbsp;
### 기타 주요 라이브러리
  * `redux` / `react-redux` / `redux-thunk`
  * `swiper`
  * `gsap`

<br />
<br />

## 3. 주요 개발 스펙 <a id="specification"></a>
> 기존 프로젝트 스펙과 유사하며 애니메이션, 접근성 등의 요건이 제외됨
* **메인 화면**:
  * 각 선택된 밴드의 컬러 코드를 배경색으로 노출
  * 하단 우측 버튼 클릭 시 배경 Theme 변경
  * Strap 메뉴에서 '기본밴드'로 이동 가능한 CTA 추가
  * 우측 'X' 버튼 클릭 시 되돌아가기 기능 구현
  * 각 상품 가격 밑의 CTA 클릭 시 팝업 노출
* **Watchface 화면**:
  * Watchface들이 마우스 휠 이벤트에 따라 회전할 수 있도록 구현
  * 메인 watch frame 이미지 사이즈 유동적으로 계산하여 노출    
    (각 상품별 알 사이즈가 다른 watch frame 대응을 위한 스펙)
  * Watchface의 개수에 따라 각 watchface 간의 간격을 유지할 수 있도록 watchface가 회전하는 원형의 사이즈를 유동적으로 계산하여 구현
