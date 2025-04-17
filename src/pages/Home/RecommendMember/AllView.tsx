import { useState, useEffect, useRef } from 'react';
import { fetchCall } from 'services/api';
import styled from 'styled-components';
import { FaRegHeart, FaStar } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';

interface Recommendation {
  id: number;
  name: string;
  price: number;
  totalRating: number;
  thumbnailUrl: string;
}

interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

const AllView = () => {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get('petId');

  const [recommendation, setRecommendations] = useState<Recommendation[]>([]);
  const filteredRenderOrder = recommendation;
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    page: 0,
    size: 20,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: false,
  });

  const fetchRecommendations = async (page: number = 0) => {
    try {
      const response = (await fetchCall(
        `/recommendations/user-pet/more?petId=${petId}&page=${page}&size=20`,
        'get',
      )) as any;

      setRecommendations(response);
      setPageInfo({
        page: response.page,
        size: response.size,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        first: response.first,
        last: response.last,
      });
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  useEffect(() => {
    if (petId) {
      fetchRecommendations();
    }
  }, [petId]);

  const handleLoadMore = () => {
    if (!pageInfo.last) {
      fetchRecommendations(pageInfo.page + 1);
    }
  };

  return (
    <div>
      <Containers>
        {recommendation.length > 0 ? (
          <>
            <All>
              <Real>내 반려동물을 위한 숙소</Real>
            </All>
            <Section>
              <SliderWrapper>
                <RecommendationContainer>
                  {recommendation.map((recommend) => (
                    <RecommendationCard key={recommend.id}>
                      <AccommodationThumbnail
                        src={recommend.thumbnailUrl}
                        alt={recommend.name}
                      />
                      <AccommodationDetails>
                        <All>
                          <AccommodationName>
                            {recommend.name}
                          </AccommodationName>
                          <AccommodationType>
                            <RegHeart />
                          </AccommodationType>
                        </All>
                        <ReviewCount>
                          <Star />
                          {recommend.totalRating.toFixed(1)}
                        </ReviewCount>
                        <AccommodationPrice>
                          {recommend.price.toLocaleString()}원 ~
                        </AccommodationPrice>
                      </AccommodationDetails>
                    </RecommendationCard>
                  ))}
                </RecommendationContainer>
              </SliderWrapper>
            </Section>
            {recommendation.length > 6 && !pageInfo.last && (
              <LoadMoreButton onClick={handleLoadMore}>더보기</LoadMoreButton>
            )}
          </>
        ) : (
          <p></p>
        )}
      </Containers>
    </div>
  );
};

export default AllView;
const Containers = styled.div`
  font-family: 'Noto Sans KR';
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  min-width: 320px;
`;

const Section = styled.div`
  padding: 5px;
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
  margin-top: 20px;
  margin-bottom: 10px;
  padding-left: 5px;
`;

const RecommendationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding-bottom: 10px;
`;

const RecommendationCard = styled.div`
  width: 320px;
  height: auto;
  border-radius: 10px;
  flex-shrink: 0;
  border: 1px solid #ddd;
  box-shadow: ${({ theme }) => theme.shadow.bottom};
`;

const AccommodationThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AccommodationDetails = styled.div`
  padding: 7px;
`;

const AccommodationName = styled.h4`
  font-size: 16px;
  font-weight: bold;
`;

const AccommodationPrice = styled.p`
  font-size: 18px;
  color: var(--gray-700);
  font-weight: bold;
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

const AccommodationType = styled.h4`
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

const LoadMoreButton = styled.button`
  width: 100%;
  margin: 5px auto 0;
  display: flex;
  justify-content: center;
  background-color: rgb(255, 212, 219);
  color: white;
  font-weight: bold;
  font-size: 18px;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    color: #ff7b92;
  }
`;
