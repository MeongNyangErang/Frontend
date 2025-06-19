import { useEffect } from 'react';
import { IamportPaymentParams, IamportPaymentResponse } from '@typings/payment';
import useIamportScript from './useIamportScript';

const useIamportPayment = () => {
  const sdkLoaded = useIamportScript();

  useEffect(() => {
    if (sdkLoaded && window.IMP) {
      window.IMP.init(import.meta.env.VITE_IAMPORT_CODE);
    }
  }, [sdkLoaded]);

  const triggerPayment = (
    paymentParams: IamportPaymentParams,
  ): Promise<IamportPaymentResponse> => {
    return new Promise((resolve, reject) => {
      if (!window.IMP) {
        reject(new Error('아임포트 SDK가 로드되지 않았습니다.'));
        return;
      }

      window.IMP.request_pay(paymentParams, (res: IamportPaymentResponse) => {
        resolve(res);
      });
    });
  };

  return { triggerPayment };
};

export default useIamportPayment;
