import {
  approveHostSignupRequest,
  rejectHostSignupRequest,
} from '@admin/services/adminHostApproval';
import useIsLoading from '@shared/hooks/ui/useIsLoading';
import useError from '@shared/hooks/ui/useError';

const useHostSignupApproval = (hostId: number) => {
  const { isLoading, startIsLoading, endIsLoading } = useIsLoading();
  const { error, updateError, resetError } = useError();

  const handleClickButton = async (
    type: 'approve' | 'reject',
    onSuccess: () => void,
  ) => {
    const action =
      type === 'approve' ? approveHostSignupRequest : rejectHostSignupRequest;
    startIsLoading();
    try {
      await action(hostId);
      onSuccess();
    } catch (error) {
      console.log(error);
      updateError('에러가 발생했습니다. 다시 시도해주세요.');
    } finally {
      endIsLoading();
    }
  };

  return { isLoading, error, resetError, handleClickButton };
};

export default useHostSignupApproval;
