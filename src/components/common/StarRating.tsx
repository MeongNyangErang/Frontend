import styled from 'styled-components';
import { memo } from 'react';
import Rating from '@mui/material/Rating';

interface Props {
  rate: number | string;
  readOnly?: boolean;
}

const StarRating = ({ rate, readOnly = false }: Props) => {
  const value = Number(rate);
  return (
    <StyledRating
      defaultValue={value}
      precision={0.5}
      sx={{ fontSize: 22 }}
      readOnly
    />
  );
};

export default memo(StarRating);

const StyledRating = styled(Rating)`
  font-size: 30px;
  & .MuiRating-iconFilled {
    color: ${({ theme }) => theme.colors.starYellow};
  }
  & .MuiRating-iconEmpty {
    color: ${({ theme }) => theme.colors.gray300};
  }
`;
