import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import { Navigation } from 'swiper/modules';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { RecommendationsAccommodation } from '@typings/recommendations';
import ROUTES from '@constants/routes';
import {
  SSliderWrap,
  SItemLink,
  SImageArea,
  SDescArea,
  SNavigationButton,
} from './styles';

interface RecommendationSliderProps {
  recommendations: RecommendationsAccommodation[];
}

const RecommendationSlider = ({
  recommendations,
}: RecommendationSliderProps) => {
  return (
    <SSliderWrap className="swiper-container-wrapper">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-next-button',
          prevEl: '.swiper-prev-button',
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          480: {
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
      </Swiper>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.swiper-next-button',
          prevEl: '.swiper-prev-button',
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          480: {
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
      </Swiper>
      <SNavigationButton className="swiper-prev-button">
        <FaChevronLeft />
      </SNavigationButton>
      <SNavigationButton className="swiper-next-button">
        <FaChevronRight />
      </SNavigationButton>
    </SSliderWrap>
  );
};

export default RecommendationSlider;
