import { useState, useEffect } from 'react';
import { getNoticeDetail } from '@admin/services/adminNotices';
import { NoticeDetail } from '@shared/typings/notices';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useNoticeDetail = (noticeId: number) => {
  const [data, setData] = useState<NoticeDetail | null>(null);
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError } = useError();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchNoticeDetail = async () => {
      startIsLoading();
      try {
        const res = await getNoticeDetail(noticeId);
        setData(res);
      } catch (error) {
        console.log(error);
        updateError('데이터를 불러오는데 실패했습니다.');
      } finally {
        endIsLoading();
      }
    };
    fetchNoticeDetail();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
};

export default useNoticeDetail;
