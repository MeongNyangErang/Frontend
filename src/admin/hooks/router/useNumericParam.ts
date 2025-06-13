import { useParams, useNavigate } from 'react-router-dom';

const useNumericParam = (param: string, fallbackRoute: string) => {
  const params = useParams();
  const numericParam = Number(params[`${param}`]);
  const navigate = useNavigate();

  if (!numericParam || Number.isNaN(numericParam)) {
    navigate(fallbackRoute);
    return null;
  }

  return numericParam;
};

export default useNumericParam;
