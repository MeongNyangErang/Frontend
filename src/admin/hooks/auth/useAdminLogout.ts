import useAdminAuth from './useAdminAuth';

const useAdminLogout = () => {
  const { removeCurrentAdminUser } = useAdminAuth();

  const logoutAdminUser = async () => {
    removeCurrentAdminUser();
  };

  return { logoutAdminUser };
};

export default useAdminLogout;
