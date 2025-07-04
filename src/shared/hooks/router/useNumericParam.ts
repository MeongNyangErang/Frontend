import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const useNumericParam = (param: string, fallbackRoute: string) => {
  const params = useParams();
  const numericParam = Number(params[`${param}`]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!numericParam || Number.isNaN(numericParam)) {
      navigate(fallbackRoute);
    }
  }, [numericParam]);

  if (!numericParam || Number.isNaN(numericParam)) {
    return null;
  }

  return numericParam;
};

export default useNumericParam;
