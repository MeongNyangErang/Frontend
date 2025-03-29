import { SButton } from './styles';
import { BeatLoader } from 'react-spinners';

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant: 'main' | 'grayBorder' | 'mainBorder' | 'accent';
  fontSize: string;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  fixedHeight?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({
  className,
  children,
  onClick,
  variant,
  fontSize,
  fullWidth,
  fixedHeight,
  disabled,
  isLoading,
  type = 'button',
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
      disabled={disabled}
    >
      {!isLoading && children}
      {isLoading && (
        <BeatLoader loading={true} size={10} color={loaderColor[variant]} />
      )}
    </SButton>
  );
};

export default Button;

const loaderColor = {
  main: '#fff',
  grayBorder: 'var(--gray-600)',
  mainBorder: 'var(--main-color)',
  accent: 'var(--info-text-color)',
};
