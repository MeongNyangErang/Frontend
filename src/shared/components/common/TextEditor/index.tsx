import { ChangeEvent, memo } from 'react';
import { STextEditorWrap, STextArea, STextLength } from './styles';

interface TextEditorProps {
  text: string;
  maxLength: number;
  $height?: number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextEditor = ({
  text,
  maxLength,
  $height = 200,
  onChange,
}: TextEditorProps) => {
  return (
    <>
      <STextEditorWrap $height={$height}>
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

export default memo(TextEditor);
