import { useState } from 'react';
import styled from 'styled-components';
import { inputStyle, inputVariantStyles } from '@components/styles/mixins';

interface NickNameEditFormProps {
  defaultValue: string;
}

const NickNameEditForm = ({ defaultValue }: NickNameEditFormProps) => {
  const [text, setText] = useState(defaultValue);

  return (
    <>
      <SInputWrap>
        <SInput />
      </SInputWrap>
    </>
  );
};

export default NickNameEditForm;

const SInputWrap = styled.div`
  width: 100%;
`;

const SInput = styled.input`
  ${inputStyle}
  ${inputVariantStyles.gray}
`;
