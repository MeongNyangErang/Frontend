import { BeatLoader } from 'react-spinners';

interface LoaderProps {
  loading: boolean;
  color: string;
  size: number;
}

const loaderColorMap = {
  main: '#fff',
  grayBorder: 'var(--gray-600)',
  mainBorder: 'var(--main-color)',
  accent: 'var(--info-text-color)',
};

const Loader = ({ loading, color, size }: LoaderProps) => {
  const loaderColor = Object.keys(loaderColorMap).includes(color)
    ? loaderColorMap[color as keyof typeof loaderColorMap]
    : color;

  return <BeatLoader loading={loading} size={size} color={loaderColor} />;
};

export default Loader;
