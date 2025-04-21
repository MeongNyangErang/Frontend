import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
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
                <div>
                  <div>{name}</div>
                  <span>
                    <FaStar />
                    {totalRating}
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

const SItemLink = styled(Link)`
  &:hover {
    img {
      transform: scale(1.05);
    }
  }
`;

const SImageArea = styled.div`
  overflow: hidden;
  border-radius: 8px 8px 0 0;

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    transition: ${({ theme }) => theme.transition};
  }
`;

const SDescArea = styled.div`
  overflow: hidden;
  padding: 8px 12px 12px;
  border-radius: 0 0 8px 8px;
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadow.card};
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-top: none;

  > div {
    display: flex;
    align-items: center;
    gap: 6px;

    > div {
      ${oneLineStyle}
      flex: 1;
      margin-bottom: 6px;
      font-size: 16px;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.gray700};
    }

    > span {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 2px 8px;
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray600};
      background-color: ${({ theme }) => theme.colors.gray200};
      border-radius: 4px;

      svg {
        font-size: 14px;
        color: ${({ theme }) => theme.colors.starYellow};
      }
    }
  }

  > p {
    font-size: 16px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray800};

    span {
      font-size: 12px;
      color: ${({ theme }) => theme.colors.gray500};
    }
  }
`;
