import { useCallback, useState, useEffect } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import SubPageHeader from '@components/common/SubPageHeader';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import useWishlist from '@hooks/query/user/useWishlist';
import useInfiniteScroll from '@hooks/ui/useInfiniteScroll';
import { WishlistItem } from '@typings/wishlist';
import {
  SWishlistWrap,
  SWishItem,
  SThumbnailBox,
  SInfoBox,
  SWishButton,
  SWishlistBottom,
} from './styles';

const UserWishList = () => {
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

  const updateCurrentCursor = useCallback(() => {
    if (!nextCursor) return;
    console.log(nextCursor);
    setCurrentCusor(nextCursor);
  }, [nextCursor]);

  const observerTargetRef = useInfiniteScroll(
    updateCurrentCursor,
    !isLoading && !!hasNext && isFirstLoaded,
  );

  useEffect(() => {
    if (!content) return;
    setWishlist((prev) => [...prev, ...content]);
  }, [content]);

  useEffect(() => {
    if (!isLoading && !isFirstLoaded) {
      setIsFirstLoaded(true);
    }
  }, [isLoading, isFirstLoaded]);

  return (
    <>
      <SubPageHeader title="찜한 숙소" style="noButton" />
      {error && (
        <MessageBox>
          {error.message || '에러가 발생했습니다. 새로고침 해주세요.'}
        </MessageBox>
      )}
      {!error && isFirstLoaded && wishlist.length === 0 && (
        <MessageBox>찜한 숙소가 없습니다.</MessageBox>
      )}
      {!error && (
        <SWishlistWrap>
          {wishlist.map(
            ({
              wishlistId,
              accommodationId,
              accommodationName,
              petScore,
              userScore,
              thumbnailImageUrl,
              address,
            }) => (
              <SWishItem key={wishlistId}>
                <SThumbnailBox>
                  <img src={thumbnailImageUrl} alt={accommodationName} />
                </SThumbnailBox>
                <SInfoBox>
                  <h3>{accommodationName}</h3>
                  <p>{address}</p>
                </SInfoBox>
                <SWishButton>
                  <FaRegHeart />
                </SWishButton>
              </SWishItem>
            ),
          )}
        </SWishlistWrap>
      )}
      <SWishlistBottom ref={isFirstLoaded ? observerTargetRef : null}>
        {isLoading && <Loader loading size={8} color="grayBorder" />}
      </SWishlistBottom>
    </>
  );
};

export default UserWishList;
