import SearchBar from '@components/common/SearchBar/index';
import UserRecommendations from './UserRecommendations';
import GuestRecommendations from './GuestRecommendations';
import {
  SSearchBarArea,
  SSearchBarContainer,
  SRecommendationArea,
} from './styles';

import useAuth from '@hooks/auth/useAuth';
const Home = () => {
  const {
    member: { data },
  } = useAuth();
  const isUser = data?.role === 'USER';

  return (
    <>
      <SSearchBarArea>
        <SSearchBarContainer>
          <div>
            <SearchBar />
          </div>
        </SSearchBarContainer>
      </SSearchBarArea>
      <SRecommendationArea>
        {isUser ? <UserRecommendations /> : <GuestRecommendations />}
      </SRecommendationArea>
    </>
  );
};

export default Home;
