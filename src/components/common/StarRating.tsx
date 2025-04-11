import styled from 'styled-components';
import { memo } from 'react';
import Rating from '@mui/material/Rating';

interface StarRatingProps {
  rate: number | string;
  $readOnly?: boolean;
  onChange?: (value: number) => void;
  size?: string;
  $mainColor?: boolean;
}

const StarRating = ({
  rate,
  $readOnly = false,
  onChange,
  size = '2em',
  $mainColor = false,
}: StarRatingProps) => {
  const value = Number(rate);
  const handleChange = (value: number | null) => {
    if (!onChange || !value) return;
    onChange(value);
  };
  return (
    <StyledRating
      $mainColor={$mainColor}
      value={value}
      onChange={(_, newValue) => handleChange(newValue)}
      precision={0.5}
      sx={{ fontSize: size }}
      readOnly={$readOnly}
    />
  );
};

export default memo(StarRating);

const StyledRating = styled(Rating)<{ $mainColor: boolean }>`
  & .MuiRating-iconFilled {
    color: ${({ theme, $mainColor }) =>
      $mainColor ? theme.colors.main : theme.colors.starYellow};
  }
  & .MuiRating-iconEmpty {
    color: ${({ theme }) => theme.colors.gray300};
  }
  & .MuiRating-iconHover,
  .MuiRating-iconFocus,
  .MuiRating-iconActive {
    transform: none !important;
    width: 1em !important;
    height: 1em !important;
  }
`;
