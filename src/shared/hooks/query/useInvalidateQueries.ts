import { useQueryClient } from '@tanstack/react-query';

const useInvalidateQueries = () => {
  const queryClient = useQueryClient();

  const invalidateAllQueries = () => {
    queryClient.invalidateQueries();
  };

  return { invalidateAllQueries };
};

export default useInvalidateQueries;
