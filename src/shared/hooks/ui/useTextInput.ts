import { ChangeEvent, useCallback, useState } from 'react';

const useTextInput = (maxLength?: number, initialText?: string) => {
  const [text, setText] = useState(initialText || '');

  const onInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (maxLength && text.length >= maxLength - 1) return;
      setText(e.target.value);
    },
    [text],
  );

  return { text, onInputChange };
};

export default useTextInput;
