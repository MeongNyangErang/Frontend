import { useState, useEffect } from 'react';
import { HostRequestDetail } from '@admin/typings/adminHostSignup';
import { getHostSignupRequestDetail } from '@admin/services/adminHostApproval';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useHostSignupRequestDetail = (hostId: number) => {
  const [data, setData] = useState<HostRequestDetail | null>(null);
  const { startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchDetailData = async () => {
      startIsLoading();
      try {
        const { data } = await getHostSignupRequestDetail(hostId);
        setData(data);
      } catch (error) {
        updateError('데이터를 불러오는데 실패했습니다.');
      } finally {
        endIsLoading();
      }
    };

    fetchDetailData();
  }, []);

  return { data, error };
};

export default useHostSignupRequestDetail;
