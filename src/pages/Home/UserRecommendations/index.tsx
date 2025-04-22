import UserPetRecommendations from './UserPetRecommendations';
import MostViewedRecommendations from './MostViewedRecommendations';
import RecentReviews from './RecentReviews';

const UserRecommendations = () => {
  return (
    <>
      <UserPetRecommendations />
      <MostViewedRecommendations />
      <RecentReviews />
    </>
  );
};

export default UserRecommendations;
