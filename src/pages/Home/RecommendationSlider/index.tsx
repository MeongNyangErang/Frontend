import { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import {
  FaChevronLeft,
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaStar,
  FaPlusCircle,
} from 'react-icons/fa';
import { RecommendationsAccommodation } from '@typings/recommendations';
import ROUTES from '@constants/routes';
import {
  SSliderWrap,
  SItemLink,
  SImageArea,
  SDescArea,
  SNavigationButton,
  SLoadMoreSlide,
  SLoadMoreButton,
} from './styles';

interface RecommendationSliderProps {
  recommendations: RecommendationsAccommodation[];
  onClickMore?: () => void;
  last?: boolean;
  isLoading?: boolean;
}

const RecommendationSlider = ({
  recommendations,
  onClickMore,
  last = true,
  isLoading = false,
}: RecommendationSliderProps) => {
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
          400: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {recommendations.map(
          ({ thumbnailUrl, name, id, totalRating, price }) => {
            const accommodationId = Number(id);
            return (
              <SwiperSlide key={accommodationId}>
                <SItemLink
                  to={ROUTES.accommodationDetail.root(accommodationId)}
                >
                  <SImageArea>
                    <img src={thumbnailUrl} alt={name} />
                  </SImageArea>
                  <SDescArea>
                    <div>
                      <div>{name}</div>
                      <span>
                        <FaStar />
                        {totalRating.toString().padEnd(3, '.0')}
                      </span>
                    </div>
                    <p>
                      <span>1박 / </span>
                      {price.toLocaleString()}원~
                    </p>
                  </SDescArea>
                </SItemLink>
              </SwiperSlide>
            );
          },
        )}

        {!last && (
          <SwiperSlide>
            <SLoadMoreSlide>
              <SLoadMoreButton onClick={onClickMore} disabled={isLoading}>
                {isLoading ? (
                  'loading...'
                ) : (
                  <>
                    <FaPlusCircle />더 보기
                  </>
                )}
              </SLoadMoreButton>
            </SLoadMoreSlide>
          </SwiperSlide>
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

export default RecommendationSlider;
