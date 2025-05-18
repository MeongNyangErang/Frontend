import { useSearchParams } from 'react-router-dom';

const useSearchView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') === 'map' ? 'map' : 'list';

  const toggleSearchView = () => {
    setSearchParams((prev) => {
      prev.set('view', view === 'map' ? 'list' : 'map');
      return prev;
    });
  };

  return { view, toggleSearchView };
};

export default useSearchView;
