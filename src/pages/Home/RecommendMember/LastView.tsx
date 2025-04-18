import { useState, useEffect, useRef } from 'react';
import { fetchCall } from 'services/api';
import styled from 'styled-components';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';

interface MostData {
  id: number;
  name: string;
  price: number;
  totalRating: number;
  thumbnailUrl: string;
}

const MostView = () => {
  const [accommodation, setAccommodation] = useState<MostData[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = (await fetchCall(
          `recommendations/most-viewed`,
          'get',
        )) as any;
        setAccommodation(response);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({
      left: -300,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({
      left: 300,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <Containers>
        <div>
          <All>
            <Real>가장 많이 본 숙소</Real>
          </All>
          <Section>
            <SliderWrapper>
              <NavButton onClick={scrollLeft} $position="left">
                <GrFormPrevious />
              </NavButton>

              <RecommendationContainer ref={containerRef}>
                {Array.isArray(accommodation) &&
                  accommodation.slice(0, 10).map((accommodation) => (
                    <RecommendationCard key={accommodation.id}>
                      <AccommodationThumbnail
                        src={accommodation.thumbnailUrl}
                        alt={accommodation.name}
                      />
                      <AccommodationDetails>
                        <All>
                          <AccommodationName>
                            {accommodation.name}
                          </AccommodationName>
                          <AccommodationType>
                            <RegHeart />
                          </AccommodationType>
                        </All>
                        <ReviewCount>
                          <Star />
                          {accommodation.totalRating}
                        </ReviewCount>
                        <AccommodationPrice>
                          {accommodation.price.toLocaleString()}원 ~
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
      </Containers>
    </div>
  );
};

export default MostView;

const Containers = styled.div`
  font-family: 'Noto Sans KR';
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Section = styled.div`
  box-shadow: ${({ theme }) => theme.shadow.bottom};
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 15px;
`;

const All = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Real = styled.p`
  font-size: 20px;
  color: var(--gray-700);
  font-weight: bold;
  margin-top: 30px;
  padding-left: 5px;
`;

const RecommendationContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: hidden;
  padding-bottom: 10px;
`;

const RecommendationCard = styled.div`
  width: 250px;
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
  margin-top: 3px;
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
  font-size: 20px;
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
