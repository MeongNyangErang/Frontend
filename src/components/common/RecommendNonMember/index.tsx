import { useState, useEffect } from 'react';
import { fetchCall } from 'services/api';
import StarRatings from 'react-star-ratings';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

interface Recommendation {
  accommodationId: number;
  type: string;
  name: string;
  price: number;
  totalRating: number;
  reviewCount: number;
  thumbnailUrl: string;
}

const NonMember = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const BASE_URL = import.meta.env.BASE_URL;

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetchCall(
          `${BASE_URL}/common/recommendnonmember`,
          'get',
        );
        setRecommendations(response);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  const handleAll = () => {
    navigate(`/accommodation`);
  };

  return (
    <div>
      <Real>대형견 인기 숙소</Real>
      <Section>
        {recommendations.length > 0 ? (
          <RecommendationContainer>
            {recommendations.map((recommendation) => (
              <RecommendationCard key={recommendation.accommodationId}>
                <AccommodationThumbnail
                  src={recommendation.thumbnailUrl}
                  alt={recommendation.name}
                />
                <AccommodationDetails>
                  <AccommodationName>{recommendation.name}</AccommodationName>
                  <AccommodationPrice>
                    {recommendation.price.toLocaleString()}원
                  </AccommodationPrice>
                  <StarRatings
                    rating={recommendation.totalRating}
                    starRatedColor="#f03e5e"
                    numberOfStars={5}
                    starDimension="17px"
                    starSpacing="1px"
                  />
                  <ReviewCount>
                    {recommendation.reviewCount}개의 리뷰
                  </ReviewCount>
                  <SeeAllButton onClick={handleAll}>더보기</SeeAllButton>
                </AccommodationDetails>
              </RecommendationCard>
            ))}
          </RecommendationContainer>
        ) : (
          <p>대형견 숙소가 없습니다.</p>
        )}
      </Section>
    </div>
  );
};

export default NonMember;

const Section = styled.div`
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 15px;
`;

const All = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Real = styled.h3`
  font-size: 16px;
  color: var(--gray-700);
  font-weight: bold;
  margin: 10px 5px;
`;

const SeeAllButton = styled.button`
  color: var(--gray-600);
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;
`;

const RecommendationContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecommendationCard = styled.div`
  width: 300px;
  background: #f5f5f5;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const AccommodationThumbnail = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
`;

const AccommodationDetails = styled.div`
  padding-top: 10px;
`;

const AccommodationName = styled.h4`
  font-size: 18px;
  font-weight: bold;
`;

const AccommodationPrice = styled.p`
  font-size: 16px;
  color: #f03e5e;
`;

const ReviewCount = styled.p`
  font-size: 14px;
  color: #666;
`;

const ReviewContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const ReviewCard = styled.div`
  background: #fff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const ReviewRatingWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ReviewContent = styled.div`
  font-size: 1rem;
  color: #666;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ReviewText = styled.p`
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;
