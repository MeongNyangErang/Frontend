import { useEffect, useState } from 'react';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_JS_KEY;
const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;

const useKakaoMapSDK = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsLoaded(true);
      return;
    }

    const loadKakaoMap = () => {
      window.kakao.maps.load(() => {
        setIsLoaded(true);
      });
    };

    const initialScript = document.querySelector<HTMLScriptElement>(
      `script[src='${KAKAO_SDK_URL}']`,
    );

    if (initialScript) {
      if ((initialScript as any).readyState === 'complete') {
        setIsLoaded(true);
      } else {
        initialScript.addEventListener('load', loadKakaoMap);
      }
      return;
    }

    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = false;
    script.onload = loadKakaoMap;
    document.head.appendChild(script);
  }, []);

  return isLoaded;
};

export default useKakaoMapSDK;
