import { SButton } from './styles';
import Loader from '../Loader';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant: 'main' | 'grayBorder' | 'mainBorder' | 'accent';
  fontSize?: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  fixedHeight?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  disabledStyle?: boolean;
}

const Button = ({
  className,
  children,
  onClick,
  variant,
  fontSize = '13px',
  fullWidth,
  fixedHeight,
  disabled,
  isLoading = false,
  type = 'button',
  disabledStyle = true,
}: ButtonProps) => {
  return (
    <SButton
      className={className}
      type={type}
      onClick={onClick}
      $variant={variant}
      $fontSize={fontSize}
      $fullWidth={fullWidth}
      $fixedHeight={fixedHeight}
      $disabledStyle={disabledStyle}
      disabled={disabled}
    >
      {!isLoading && children}
      {isLoading && <Loader loading={isLoading} size={8} color={variant} />}
    </SButton>
  );
};

export default Button;
