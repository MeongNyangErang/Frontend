import { SButton } from './styles';

interface ButtonProps {
  children: React.ReactNode;
  onClick(): void;
  color: 'main' | 'white';
  fontSize: string;
  fullWidth?: boolean;
}

const Button = ({
  children,
  onClick,
  color,
  fontSize,
  fullWidth,
}: ButtonProps) => {
  return (
    <SButton
      onClick={onClick}
      $color={color}
      $fontSize={fontSize}
      $fullWidth={fullWidth}
    >
      {children}
    </SButton>
  );
};

export default Button;
