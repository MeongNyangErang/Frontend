import SearchBar from '@components/common/SearchBar/index';
import { SectionLayout } from '@components/layouts/SectionLayout';
import NonMemberRecommend from '@pages/Home/RecommendNonMember/index';
import MemberLastview from '@pages/Home/RecommendMember/LastView';
import MemberMostView from '@pages/Home/RecommendMember/MostView';
import MemberView from '@pages/Home/RecommendMember/index';

import useAuth from '@hooks/auth/useAuth';
const Home = () => {
  const {
    member: { data },
  } = useAuth();
  const isLoggedIn = !!data;

  return (
    <SectionLayout>
      <SearchBar />
      {isLoggedIn ? (
        <>
          <MemberView />
          <MemberLastview />
          <MemberMostView />
        </>
      ) : (
        <NonMemberRecommend />
      )}
    </SectionLayout>
  );
};

export default Home;
