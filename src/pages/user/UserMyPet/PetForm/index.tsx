import { useCallback, useState } from 'react';
import { initialPetInfoState, PET_FORM_FIELDS } from '@constants/pet';
import { PetInfo, PetInfoState, PetInfoKey, PetInfoValue } from '@typings/pet';
import OptionSelector from '@components/common/OptionSelector';
import DropDownSelector from '@components/common/DropDownSelector';
import Button from '@components/common/Button';
import DatePicker from 'react-datepicker';
import {
  SPetFormGroup,
  SPetFormWrap,
  SPetFormTitle,
  SPetFormInput,
} from './styles';

interface PetFormProps {
  selectedPet: PetInfo | null;
}

const PetForm = ({ selectedPet }: PetFormProps) => {
  const [newInfo, setNewInfo] = useState<PetInfoState>(
    selectedPet || initialPetInfoState,
  );

  const onClickOption = useCallback(
    (key: PetInfoKey) => (value: PetInfoValue) => {
      setNewInfo((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const onChangeInput = (key: PetInfoKey, value: PetInfoValue) => {
    setNewInfo((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SPetFormWrap>
      <SPetFormTitle>반려동물 등록</SPetFormTitle>
      {PET_FORM_FIELDS.map((field) => {
        const { id, label } = field;

        return (
          <SPetFormGroup key={id}>
            <p>
              <span>{label}</span>
            </p>
            <div>
              {id === 'type' && (
                <OptionSelector
                  onClick={onClickOption(id)}
                  options={field.options}
                  $variant="square"
                  currentValue={[newInfo[id]]}
                />
              )}
              {id === 'name' && (
                <SPetFormInput
                  type="text"
                  value={newInfo[id]}
                  onChange={(e) => onChangeInput('name', e.target.value)}
                />
              )}
              {id === 'birthDate' && <DatePicker selected={new Date()} />}
              {(id === 'personality' || id === 'activityLevel') && (
                <DropDownSelector
                  onClick={onClickOption(id)}
                  value={newInfo[id]}
                  options={field.options}
                />
              )}
            </div>
          </SPetFormGroup>
        );
      })}
      <Button
        onClick={() => {
          console.log(newInfo);
        }}
        variant="main"
        fontSize="16px"
        fullWidth
        fixedHeight
      >
        등록하기
      </Button>
    </SPetFormWrap>
  );
};

export default PetForm;
