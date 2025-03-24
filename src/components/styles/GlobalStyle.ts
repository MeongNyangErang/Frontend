import { createGlobalStyle } from 'styled-components';
import regularFont from '@assets/fonts/NotoSansKR-Regular.ttf';
import mediumFont from '@assets/fonts/NotoSansKR-Medium.ttf';
import boldFont from '@assets/fonts/NotoSansKR-Bold.ttf';

const GlobalStyle = createGlobalStyle`
/* ------------------ 폰트 정의 ------------------ */
@font-face {
    font-family: 'Noto Sans KR';
    font-style:normal;
    font-weight:400;
    src: url(${regularFont}) format('woff2');
}
@font-face {
    font-family: 'Noto Sans KR';
    font-style:normal;
    font-weight:500;
    src: url(${mediumFont}) format('woff2');
}
@font-face {
    font-family: 'Noto Sans KR';
    font-style:normal;
    font-weight:600;
    src: url(${boldFont}) format('woff2');
}

/* ------------------ Reset ------------------ */
*,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #222;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    all: unset;
    cursor: pointer;
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
    background: none;
  }

/* ------------------ 전역 변수 (CSS 변수) ------------------ */
    :root {
    --main-color: #f03e5e;
    --border-radius: 8px;
  }


`;

export default GlobalStyle;
