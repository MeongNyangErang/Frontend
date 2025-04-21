import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RecommendationsAccommodation } from '@typings/recommendations';
import ROUTES from '@constants/routes';
import { oneLineStyle } from '@components/styles/mixins';

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
                <p>
                  {price.toLocaleString()}원~ / <span>1박박</span>
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

const SItemLink = styled(Link)``;

const SImageArea = styled.div`
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    transition: ${({ theme }) => theme.transition};

    :hover & {
      transform: scale(1.05);
    }
  }
`;

const SDescArea = styled.div`
  overflow: hidden;
  padding: 8px 12px;
  border-radius: 0 0 8px 8px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.card};

  > div {
    ${oneLineStyle}
    margin-bottom: 8px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray700};
  }

  > p {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray800};

    span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray600};
    }
  }
`;
