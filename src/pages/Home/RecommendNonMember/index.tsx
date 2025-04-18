import { useState, useEffect, useRef } from 'react';
import { fetchCall } from 'services/api';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

type RecommendationResponse = {
  LARGE_DOG: Recommendation[];
  MEDIUM_DOG: Recommendation[];
  SMALL_DOG: Recommendation[];
  CAT: Recommendation[];
};

interface Recommendation {
  id: number;
  name: string;
  price: number;
  totalRating: number;
  thumbnailUrl: string;
}

const renderOrder: (keyof RecommendationResponse)[] = [
  'LARGE_DOG',
  'MEDIUM_DOG',
  'SMALL_DOG',
  'CAT',
];

const animalTypeLabels: { [key in keyof RecommendationResponse]: string } = {
  LARGE_DOG: '대형견',
  MEDIUM_DOG: '중형견',
  SMALL_DOG: '소형견',
  CAT: '고양이',
};

const NonMember = () => {
  const containerRefs = useRef<
    Record<keyof RecommendationResponse, HTMLDivElement | null>
  >({
    LARGE_DOG: null,
    MEDIUM_DOG: null,
    SMALL_DOG: null,
    CAT: null,
  });
  const navigate = useNavigate();
  const [recommendation, setRecommendations] =
    useState<RecommendationResponse | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = (await fetchCall(
          `/recommendations/default`,
          'get',
        )) as any;
        setRecommendations(response);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  const handleSeeAll = (animalType: keyof RecommendationResponse) => {
    navigate(`recommendNonMember/allView?type=${animalType}`);
  };

  return (
    <div>
      <Containers>
        {recommendation &&
          renderOrder.map((key) => {
            const recList = recommendation[key];

            const scrollLeft = () => {
              containerRefs.current[key]?.scrollBy({
                left: -300,
                behavior: 'smooth',
              });
            };

            const scrollRight = () => {
              containerRefs.current[key]?.scrollBy({
                left: 300,
                behavior: 'smooth',
              });
            };

            if (!recList || recList.length === 0) return null;

            return (
              <div key={key}>
                <All>
                  <Real>{animalTypeLabels[key]} 추천 숙소</Real>
                  <SeeAllButton onClick={() => handleSeeAll(key)}>
                    더보기
                  </SeeAllButton>
                </All>
                <Section>
                  <SliderWrapper>
                    <NavButton onClick={scrollLeft} $position="left">
                      <GrFormPrevious />
                    </NavButton>

                    <RecommendationContainer
                      ref={(el) => {
                        containerRefs.current[key] = el;
                      }}
                    >
                      {recList.slice(0, 6).map((recommendations) => (
                        <RecommendationCard key={recommendations.id}>
                          <AccommodationThumbnail
                            src={recommendations.thumbnailUrl}
                            alt={recommendations.name}
                          />
                          <AccommodationDetails>
                            <All>
                              <AccommodationName>
                                {recommendations.name}
                              </AccommodationName>
                              <AccommodationType>
                                <RegHeart />
                              </AccommodationType>
                            </All>
                            <ReviewCount>
                              <Star />
                              {recommendations.totalRating}
                            </ReviewCount>
                            <AccommodationPrice>
                              {recommendations.price.toLocaleString()}원 ~
                            </AccommodationPrice>
                          </AccommodationDetails>
                        </RecommendationCard>
                      ))}
                    </RecommendationContainer>
                    <NavButton onClick={scrollRight} $position="right">
                      <GrFormNext />
                    </NavButton>
                  </SliderWrapper>
                </Section>
              </div>
            );
          })}
      </Containers>
    </div>
  );
};

export default NonMember;
const Containers = styled.div`
  font-family: 'Noto Sans KR';
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Section = styled.div`
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  padding-top: 5px;
  border-radius: 15px;
`;

const All = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Real = styled.p`
  font-size: 18px;
  color: var(--gray-700);
  font-weight: bold;
  margin-top: 20px;
  padding-left: 5px;
`;

const SeeAllButton = styled.button`
  color: #3a86ff;
  background: rgb(249, 252, 255);
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  margin-top: 30px;
  padding: 5px;
`;

const RecommendationContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: hidden;
  padding-bottom: 10px;
`;

const RecommendationCard = styled.div`
  width: 230px;
  height: auto;
  background: white;
  padding: 5px;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid #eeeeee;
  box-shadow: ${({ theme }) => theme.shadow.bottom};
`;

const AccommodationThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AccommodationDetails = styled.div`
  padding-top: 5px;
`;

const AccommodationName = styled.h4`
  font-size: 16px;
  font-weight: bold;
`;

const AccommodationPrice = styled.p`
  font-size: 18px;
  color: var(--gray-700);
  font-weight: bold;
  margin-bottom: 15px;
`;

const ReviewCount = styled.p`
  color: #f03e5e;
  border: 1px solid #f03e5e;
  background: white;
  padding: 2px 7px;
  font-size: 14px;
  display: inline-block;
  border-radius: 10px;
`;

const Star = styled(FaStar)`
  color: #f03e5e;
  margin-right: 3px;
`;

const AccommodationType = styled.button`
  background: #f5f5f5;
  border-radius: 20px;
  font-size: 14px;
  padding: 3px 5px;
`;

const RegHeart = styled(FaRegHeart)`
  color: #f03e5e;
  margin-top: 3px;
  font-size: 18px;
`;

const SliderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const NavButton = styled.button<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 45%;
  ${({ $position }) =>
    $position === 'left' ? 'left: -25px;' : 'right: -25px;'}
  transform: translateY(-50%);
  background: white;
  border: 1px solid #ddd;
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
  border-radius: 15px;
  padding: 7px;
  color: var(--gray-600);
  &:hover {
    background: var(--gray-100);
  }
`;
