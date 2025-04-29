import React from 'react';

const parseNewLine = (text: string) => {
  const textArray = text.split('\n');
  return textArray.map((line, i) => {
    return (
      <React.Fragment key={i}>
        {line}
        {textArray.length - 1 !== i && <br />}
      </React.Fragment>
    );
  });
};

export { parseNewLine };
