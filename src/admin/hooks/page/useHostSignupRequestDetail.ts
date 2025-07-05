import { useState, useEffect } from 'react';
import { HostRequestDetail } from '@admin/typings/adminHostSignup';
import { getHostSignupRequestDetail } from '@admin/services/adminHostApproval';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useHostSignupRequestDetail = (hostId: number) => {
  const [data, setData] = useState<HostRequestDetail | null>(null);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchDetailData = async () => {
      startIsLoading();
      try {
        const res = await getHostSignupRequestDetail(hostId);
        setData(res);
      } catch (error) {
        console.log(error);
        updateError('데이터를 불러오는데 실패했습니다.');
      } finally {
        endIsLoading();
      }
    };

    fetchDetailData();
  }, []);

  return { data, error, isLoading };
};

export default useHostSignupRequestDetail;
