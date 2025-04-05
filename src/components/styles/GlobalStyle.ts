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
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  h1,h2,h3,h4,h5 {
    font-size: 1rem;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    all: unset;
    cursor: pointer;
    font-family: inherit;
    box-sizing: border-box;
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
    border: none;
    outline: none;
    background: none;
  }

  strong {
    font-weight: 400;
  }

/* ------------------ 전역 변수 (CSS 변수) ------------------ */
    :root {
    --main-color: #f03e5e;
    --sub-color: #F48E99;
    --light-color:rgb(253, 244, 245);
    --info-color: #E6F0FA;
    --info-text-color: #3178C6;
    --wrap-bg-color: #FFF2F4;
    --overlay-color: rgba(0,0,0,0.3);
    --gray-100: #f5f5f5;
    --gray-200: #eeeeee;
    --gray-300: #e0e0e0;
    --gray-400: #bdbdbd;
    --gray-500: #9e9e9e;
    --gray-600: #757575;
    --gray-700: #424242;
    --gray-800: #111111;
    --star-yellow: #ffc107;
  }


`;

export default GlobalStyle;
