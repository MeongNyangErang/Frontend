import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import { RecommendationsAccommodation } from '@typings/recommendations';

interface RecommendationSliderProps {
  recommendations: RecommendationsAccommodation[];
}

const RecommendationSlider = ({
  recommendations,
}: RecommendationSliderProps) => {
  return (
    <Swiper spaceBetween={16} slidesPerView={4}>
      {recommendations.map(({ thumbnailUrl, name, id, totalRating, price }) => (
        <SwiperSlide key={id}>
          <SItemWrap>
            <SImageArea>
              <img src={thumbnailUrl} alt={name} />
            </SImageArea>
            <SDescArea></SDescArea>
          </SItemWrap>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default RecommendationSlider;

const SItemWrap = styled.div``;
const SImageArea = styled.div``;
const SDescArea = styled.div``;
