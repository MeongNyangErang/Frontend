import useWishlist from '@hooks/query/user/useWishlist';
import useError from '@shared/hooks/ui/useError';
import useAuth from '@hooks/auth/useAuth';
import { addToWishlist, deleteFromWishlist } from '@services/wishlist';

const useSearchWish = () => {
  const { refreshWishlist } = useWishlist(0, false);
  const {
    error: wishError,
    updateError: updateWishError,
    resetError: resetWishError,
  } = useError();
  const { member } = useAuth();

  const handleClickWishButton = async (
    e: React.MouseEvent,
    accommodationId: number,
    wishlisted: boolean,
    onSuccess: (accommodationId: number) => void,
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (!member.data || member.data.role === 'HOST') {
      updateWishError('로그인한 사용자만 이용 할 수 있습니다.');
      return;
    }

    try {
      !wishlisted
        ? await addToWishlist(accommodationId)
        : await deleteFromWishlist(accommodationId);
      onSuccess(accommodationId);
      refreshWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return { wishError, resetWishError, handleClickWishButton };
};

export default useSearchWish;
