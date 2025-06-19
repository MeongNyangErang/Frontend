import { useEffect, useState } from 'react';

const IAMPORT_SDK_URL = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';

const useIamportScript = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (document.querySelector(`script[src="${IAMPORT_SDK_URL}"]`)) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = IAMPORT_SDK_URL;
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.log('포트원 SDK로드 실패');
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return isLoaded;
};

export default useIamportScript;
