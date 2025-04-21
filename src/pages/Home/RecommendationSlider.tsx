import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RecommendationsAccommodation } from '@typings/recommendations';
import ROUTES from '@constants/routes';

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
                <div>{name}</div>
                <p>{price}원 부터</p>
              </SDescArea>
            </SItemLink>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default RecommendationSlider;

const SItemLink = styled(Link)``;
const SImageArea = styled.div`
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;
const SDescArea = styled.div``;
