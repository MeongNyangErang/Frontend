import { ChangeEvent } from 'react';
import { STextEditorWrap, STextArea, STextLength } from './styles';

interface TextEditorProps {
  text: string;
  maxLength: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor = ({ text, maxLength, onChange }: TextEditorProps) => {
  return (
    <>
      <STextEditorWrap>
        <STextArea
          placeholder="반려동물과 함께한 숙소 이용 경험을 들려주세요."
          value={text}
          onChange={onChange}
        />
        <STextLength>
          <span>{text.length || 0}</span> / {maxLength}
        </STextLength>
      </STextEditorWrap>
    </>
  );
};

export default TextEditor;
