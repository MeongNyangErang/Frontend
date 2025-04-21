import { Swiper, SwiperSlide } from 'swiper/react';
import { FaStar } from 'react-icons/fa';
import { RecommendationsAccommodation } from '@typings/recommendations';
import ROUTES from '@constants/routes';
import { SItemLink, SImageArea, SDescArea } from './styles';

interface RecommendationSliderProps {
  recommendations: RecommendationsAccommodation[];
}

const RecommendationSlider = ({
  recommendations,
}: RecommendationSliderProps) => {
  return (
    <Swiper
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
      {recommendations.map(({ thumbnailUrl, name, id, totalRating, price }) => {
        const accommodationId = Number(id);
        return (
          <SwiperSlide key={accommodationId}>
            <SItemLink to={ROUTES.accommodationDetail.root(accommodationId)}>
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
      })}
    </Swiper>
  );
};

export default RecommendationSlider;
