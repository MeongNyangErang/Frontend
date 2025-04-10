import { memo } from 'react';
import { PET_SIZE_MAP } from '@constants/pet';
import { SOptionSelectorWrap, SOptionSelectorButton } from './styles';

interface Props {
  $variant: 'square' | 'capsule';
  options: readonly string[] | readonly { name: string; value: string }[];
  currentValue: string[];
  onClick: (value: string) => void;
}

const OptionSelector = ({
  $variant,
  options,
  currentValue,
  onClick,
}: Props) => {
  const handleClick = (option: (typeof options)[number]) => {
    onClick(typeof option === 'string' ? option : option.value);
  };

  return (
    <SOptionSelectorWrap $variant={$variant}>
      {options.map((option) => {
        const selected =
          typeof option === 'string'
            ? currentValue.includes(option)
            : currentValue.includes(option.value);

        return typeof option === 'string' ? (
          <SOptionSelectorButton
            $variant={$variant}
            key={option}
            data-checked={selected}
            onClick={() => handleClick(option)}
          >
            {option}
            {Object.keys(PET_SIZE_MAP).includes(option) && (
              <span>{PET_SIZE_MAP[option as keyof typeof PET_SIZE_MAP]}</span>
            )}
          </SOptionSelectorButton>
        ) : (
          <SOptionSelectorButton
            $variant={$variant}
            key={option.name}
            data-checked={selected}
            onClick={() => handleClick(option.value)}
          >
            {option.name}
            {Object.keys(PET_SIZE_MAP).includes(option.name) && (
              <span>
                {PET_SIZE_MAP[option.name as keyof typeof PET_SIZE_MAP]}
              </span>
            )}
          </SOptionSelectorButton>
        );
      })}
    </SOptionSelectorWrap>
  );
};

export default memo(OptionSelector);
