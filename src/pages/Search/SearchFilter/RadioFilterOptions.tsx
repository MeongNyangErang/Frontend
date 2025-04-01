import styled from 'styled-components';

interface Props {
  options: readonly string[];
  currentOption: string;
  onChange(option: string): void;
}

const RadioFilterOptions = ({ options, currentOption, onChange }: Props) => {
  return (
    <SRadioArea>
      {options.map((option) => {
        return (
          <SButton
            key={option}
            onClick={() => onChange(option)}
            data-checked={option === currentOption}
          >
            {option}
          </SButton>
        );
      })}
    </SRadioArea>
  );
};

export default RadioFilterOptions;

const SRadioArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 24px 0;
`;

const SButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${({ theme }) => theme.colors.gray700};

  &[data-checked='true']::before {
    background-color: ${({ theme }) => theme.colors.main};
    border-color: ${({ theme }) => theme.colors.main};
  }

  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
    border-radius: 9999px;
  }
`;
