import { PET_SIZE_MAP } from '@constants/pet';
import { QUERY_KEYS } from '@constants/queryKeys';
import { SOptionSelectorWrap, SOptionSelectorButton } from './styles';

interface Props {
  $variant: 'square' | 'capsule';
  options: readonly string[];
  name?: string;
  currentValue: string[];
  onClick: (value: string) => void;
}

const OptionSelector = ({
  $variant,
  name,
  options,
  currentValue,
  onClick,
}: Props) => {
  const handleClick = (option: (typeof options)[number]) => {
    onClick(option);
  };

  return (
    <SOptionSelectorWrap $variant={$variant}>
      {options.map((option, i) => {
        const isSelected = currentValue.includes(option);
        return (
          <SOptionSelectorButton
            $variant={$variant}
            key={i}
            data-checked={String(isSelected)}
            onClick={() => handleClick(option)}
          >
            {option}
            {name === QUERY_KEYS.SEARCH.FILTER.PET_TYPE && (
              <span>{PET_SIZE_MAP[option as keyof typeof PET_SIZE_MAP]}</span>
            )}
          </SOptionSelectorButton>
        );
      })}
    </SOptionSelectorWrap>
  );
};

export default OptionSelector;
