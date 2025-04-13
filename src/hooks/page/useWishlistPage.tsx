import { useCallback, useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import useWishlist from '@hooks/query/user/useWishlist';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import useIsLoading from '@hooks/ui/useIsLoading';
import useError from '@hooks/ui/useError';
import { WishlistItem } from '@typings/wishlist';
import { deleteFromWishlist } from '@services/wishlist';

const useWishlistPage = () => {
  const [currentCursor, setCurrentCusor] = useState<undefined | number>(
    undefined,
  );

  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  const [isFirstLoaded, setIsFirstLoaded] = useState(false);

  const {
    data: { data: { content, nextCursor, hasNext } = {} } = {},
    isLoading,
    error,
    refreshWishlist,
  } = useWishlist(currentCursor);

  const {
    isLoading: isDeleteLoading,
    endIsLoading,
    startIsLoading,
  } = useIsLoading();

  const { error: deleteError, updateError, resetError } = useError();

  const updateCurrentCursor = useCallback(() => {
    if (!nextCursor) return;
    setCurrentCusor(nextCursor);
  }, [nextCursor]);

  const observerTargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && !!hasNext && isFirstLoaded,
  );

  const handleSuccessDeleteWishItem = () => {
    setCurrentCusor(undefined);
    setWishlist([]);
    refreshWishlist();
  };

  const handleDeleteWishItem = async (accommodationId: number) => {
    if (deleteError) resetError();
    startIsLoading();

    try {
      await deleteFromWishlist(accommodationId);
      handleSuccessDeleteWishItem();
    } catch (error) {
      if (error instanceof AxiosError) {
        updateError(error.message);
      } else {
        updateError('에러가 발생했습니다. 다시 시도해주세요.');
      }
    } finally {
      endIsLoading();
    }
  };

  useEffect(() => {
    if (!content) return;
    setWishlist((prev) => [...prev, ...content]);
  }, [content]);

  useEffect(() => {
    if (!isLoading && !isFirstLoaded) {
      setIsFirstLoaded(true);
    }
  }, [isLoading, isFirstLoaded]);

  return {
    currentCursor,
    wishlist,
    isLoading,
    isFirstLoaded,
    isDeleteLoading,
    error,
    deleteError,
    observerTargetRef,
    handleDeleteWishItem,
    resetError,
  };
};

export default useWishlistPage;
