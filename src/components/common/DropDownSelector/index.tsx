import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import useClickOutside from '@hooks/ui/useClickOutside';
import {
  SDropDownSelectorWrap,
  SDropDownButton,
  SDropDownOptions,
  SDropDownOption,
} from './styles';

interface NameValueObject {
  name: string;
  value: string;
}

interface DropDownSelectorProps {
  options: readonly string[] | readonly NameValueObject[];
  value: string;
  onClick: (value: string) => void;
}

const DropDownSelector = ({
  value,
  options,
  onClick,
}: DropDownSelectorProps) => {
  const { isOpen, toggleIsOpen, targetRef } = useClickOutside();
  const isObject = typeof options[0] === 'object';

  const handleClickOption = (option: string) => {
    onClick(option);
    toggleIsOpen();
  };

  return (
    <SDropDownSelectorWrap ref={targetRef}>
      <SDropDownButton onClick={toggleIsOpen}>
        {!value && '옵션을 선택해주세요'}
        {value &&
          (isObject
            ? (options as NameValueObject[]).find(
                (option) => option.value === value,
              )?.name
            : value)}
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </SDropDownButton>
      {isOpen && (
        <SDropDownOptions>
          {options.map((option) => {
            const hasValue = typeof option !== 'string';
            return (
              <SDropDownOption
                key={hasValue ? option.value : option}
                onClick={() =>
                  handleClickOption(hasValue ? option.value : option)
                }
              >
                {hasValue ? option.name : option}
              </SDropDownOption>
            );
          })}
        </SDropDownOptions>
      )}
    </SDropDownSelectorWrap>
  );
};

export default DropDownSelector;
