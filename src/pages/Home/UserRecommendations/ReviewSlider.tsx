import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RecentReview } from '@typings/recommendations';
import ROUTES from '@constants/routes';
import StarRating from '@components/common/StarRating';
import { oneLineStyle } from '@components/styles/mixins';
import { SSliderWrap, SNavigationButton } from '../RecommendationSlider/styles';

interface RecommendationSliderProps {
  reviews: RecentReview[];
}

const ReviewSlider = ({ reviews }: RecommendationSliderProps) => {
  const uniqueId = useMemo(() => uuidv4(), []);

  return (
    <SSliderWrap>
      <Swiper
        modules={[Navigation]}
        onInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== 'boolean'
          ) {
            swiper.params.navigation.prevEl = `.swiper-prev-button-${uniqueId}`;
            swiper.params.navigation.nextEl = `.swiper-next-button-${uniqueId}`;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        spaceBetween={12}
        slidesPerView={1}
        breakpoints={{
          600: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {reviews?.map(
          ({
            totalRating,
            nickname,
            content,
            accommodationId,
            accommodationName,
          }) => {
            return (
              <SwiperSlide key={accommodationId}>
                <SReviewItem
                  to={ROUTES.accommodationDetail.root(accommodationId)}
                >
                  <SReviewAccommodationNameBox>
                    {accommodationName}
                    <span>
                      숙소 보기
                      <FaChevronRight />
                    </span>
                  </SReviewAccommodationNameBox>
                  <SReviewNicknameBox>
                    <span>{nickname}</span>
                    <div>
                      <span>{totalRating}</span>
                      <StarRating rate={totalRating} size="16px" $readOnly />
                    </div>
                  </SReviewNicknameBox>
                  <SReviewContentBox>{content}</SReviewContentBox>
                </SReviewItem>
              </SwiperSlide>
            );
          },
        )}
      </Swiper>
      <SNavigationButton
        className={`swiper-prev-button swiper-prev-button-${uniqueId}`}
      >
        <FaChevronLeft />
      </SNavigationButton>
      <SNavigationButton
        className={`swiper-next-button swiper-next-button-${uniqueId}`}
      >
        <FaChevronRight />
      </SNavigationButton>
    </SSliderWrap>
  );
};

export default ReviewSlider;

const SReviewItem = styled(Link)`
  display: flex;
  flex-direction: column;
  padding: 10px 10px 16px;
  background-color: #fff;
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const SReviewAccommodationNameBox = styled.div`
  ${oneLineStyle}
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 6px;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray700};
  border-bottom: ${({ theme }) => `1px solid ${theme.colors.gray200}`};

  > span {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray600};
    svg {
      margin-top: 2px;
    }
  }
`;

const SReviewNicknameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;

  > span {
    ${oneLineStyle}
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
    font-weight: 500;
  }

  > div {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 13px;

    span {
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;

const SReviewContentBox = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 줄 수 제한 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 70px;
  font-size: 16px;
  word-break: break-all;
`;
