import SearchBar from '@components/common/SearchBar/index';
import { SectionLayout } from '@components/layouts/SectionLayout';
import NonMemberRecommend from '@pages/Home/RecommendNonMember/index';
import MemberLastview from '@pages/Home/RecommendMember/LastView';
import MemberMostView from '@pages/Home/RecommendMember/MostView';
import MemberView from '@pages/Home/RecommendMember/index';
import UserRecommendations from './UserRecommendations';
import GuestRecommendations from './GuestRecommendations';
import { SSearchBarArea, SSearchBarContainer } from './styles';

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
      <SectionLayout>
        {isUser ? <UserRecommendations /> : <GuestRecommendations />}
      </SectionLayout>
    </>
  );
};

export default Home;
