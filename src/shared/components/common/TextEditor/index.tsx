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
          placeholder="내용을 입력해주세요."
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
