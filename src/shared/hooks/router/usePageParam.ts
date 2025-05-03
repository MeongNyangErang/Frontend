import { useSearchParams } from 'react-router-dom';

const usePageParam = () => {
  const [param] = useSearchParams();
  const page = Number(param.get('page'));
  const currentPage = !Number.isNaN(page) && page >= 0 ? page : 0;

  return currentPage;
};

export default usePageParam;
