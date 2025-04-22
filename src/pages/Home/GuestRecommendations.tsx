import useGuestRecommendations from '@hooks/query/useGuestRecommendations';
import Loader from '@components/common/Loader';
import MessageBox from '@components/common/MessageBox';
import RecommendationSlider from './RecommendationSlider';
import { SSectionTitle, SSectionContainer, SSectionBox } from './styles';

const PetType = ['소형견', '중형견', '대형견', '고양이'] as const;

const GuestRecommendations = () => {
  const { data, isLoading, error } = useGuestRecommendations();

  return (
    <>
      {PetType.map((type) => {
        const content = data?.[type] || [];
        return (
          <SSectionContainer key={type}>
            <SSectionTitle>
              <span>
                <strong>{type}</strong>
              </span>
              추천 숙소
              <i></i>
            </SSectionTitle>
            {error && (
              <MessageBox variant="light">
                데이터를 불러오지 못했습니다.
              </MessageBox>
            )}
            {isLoading && (
              <SSectionBox>
                <Loader size={10} color="grayBorder" loading />
              </SSectionBox>
            )}
            {<RecommendationSlider recommendations={content} />}
          </SSectionContainer>
        );
      })}
    </>
  );
};

export default GuestRecommendations;
