import { useState, useEffect } from 'react';

const KAKAO_SDK_URL = 'https://developers.kakao.com/sdk/js/kakao.js';
const KAKAO_JS_KEY = import.meta.env.VITE_KAKAO_AUTH_JS_KEY;

const useKakaoSDK = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.Kakao && window.Kakao.isInitialized?.()) {
      setIsLoaded(true);
      return;
    }

    const initKakao = () => {
      if (!window.Kakao.isInitialized?.()) window.Kakao.init(KAKAO_JS_KEY);
      setIsLoaded(true);
    };

    const initialScript = document.querySelector(
      `script[src='${KAKAO_SDK_URL}']`,
    );

    if (initialScript) {
      if (window.Kakao) {
        initKakao();
      } else {
        initialScript.addEventListener('load', () => {
          if (window.Kakao) initKakao();
        });
      }

      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.onload = () => {
      if (window.Kakao) initKakao();
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return { isLoaded };
};

export default useKakaoSDK;
