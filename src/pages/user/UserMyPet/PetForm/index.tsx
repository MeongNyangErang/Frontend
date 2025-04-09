import { memo } from 'react';
import DatePicker from 'react-datepicker';
import { PET_FORM_FIELDS } from '@constants/pet';
import { PetInfo } from '@typings/pet';
import OptionSelector from '@components/common/OptionSelector';
import DropDownSelector from '@components/common/DropDownSelector';
import Button from '@components/common/Button';
import DatePickerInput from './DatePickerInput';
import usePetForm from './usePetForm';
import {
  SPetFormGroup,
  SPetFormWrap,
  SPetFormTitle,
  SPetFormInput,
  SPetFormSubmitBox,
  SPetFormError,
} from './styles';

interface PetFormProps {
  selectedPet: PetInfo | null;
  onSuccess: () => void;
}

const PetForm = ({ selectedPet, onSuccess }: PetFormProps) => {
  const {
    newInfo,
    isLoading,
    error,
    handleChangeDate,
    handleSubmitPetForm,
    onChangeInput,
    onClickOption,
  } = usePetForm({ selectedPet, onSuccess });
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
                  onChange={(e) => onChangeInput('name', e.target.value.trim())}
                />
              )}
              {id === 'birthDate' && (
                <DatePicker
                  selected={
                    newInfo.birthDate ? new Date(newInfo.birthDate) : null
                  }
                  dateFormat="yyyy-MM-dd"
                  onChange={(date) => handleChangeDate(date)}
                  customInput={<DatePickerInput />}
                  maxDate={new Date()}
                />
              )}
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
      <SPetFormSubmitBox>
        <Button
          onClick={handleSubmitPetForm}
          disabled={Object.values(newInfo).some((v) => !v)}
          variant="main"
          fontSize="16px"
          type="submit"
          isLoading={isLoading}
          fullWidth
          fixedHeight
        >
          등록하기
        </Button>
        <SPetFormError>{error}</SPetFormError>
      </SPetFormSubmitBox>
    </SPetFormWrap>
  );
};

export default memo(PetForm);
