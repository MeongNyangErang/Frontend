import { FaHeart } from 'react-icons/fa';
import SubPageHeader from '@components/common/SubPageHeader';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import StarRating from '@components/common/StarRating';
import Modal from '@components/common/Modal';
import ROUTES from '@constants/routes';
import { floorToHalf } from '@utils/formatter';
import useWishlistPage from '@hooks/page/useWishlistPage';
import {
  SWishlistWrap,
  SWishItem,
  SWishItemLink,
  SThumbnailBox,
  SInfoBox,
  SWishButton,
  SWishlistBottom,
} from './styles';

const UserWishList = () => {
  const {
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
  } = useWishlistPage();
  console.log(wishlist);
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
              accommodationId,
              accommodationName,
              totalRating,
              thumbnailImageUrl,
              address,
            }) => {
              const rating = Number.isNaN(totalRating) ? 0 : totalRating;
              return (
                <SWishItem key={Math.random().toString()}>
                  <SWishItemLink to={ROUTES.detail(accommodationId)}>
                    <SThumbnailBox>
                      <img src={thumbnailImageUrl} alt={accommodationName} />
                    </SThumbnailBox>
                    <SInfoBox>
                      <h3>{accommodationName}</h3>
                      <p>{address}</p>
                      <div>
                        <StarRating rate={rating} size="1.4em" $readOnly />
                        <em>{rating}</em>
                      </div>
                    </SInfoBox>
                  </SWishItemLink>
                  <SWishButton
                    onClick={() => handleDeleteWishItem(accommodationId)}
                    disabled={isDeleteLoading}
                  >
                    <FaHeart />
                  </SWishButton>
                </SWishItem>
              );
            },
          )}
        </SWishlistWrap>
      )}
      <SWishlistBottom ref={isFirstLoaded ? observerTargetRef : null}>
        {isLoading && <Loader loading size={8} color="grayBorder" />}
      </SWishlistBottom>
      <Modal
        isOpen={!!deleteError}
        variant="centered"
        closeType="none"
        onClose={resetError}
        role="alert"
      >
        {deleteError}
      </Modal>
    </>
  );
};

export default UserWishList;
