import React from 'react';

export const formatSecondsToTime = (seconds: number) => {
  const hour = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const min = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const sec = String(seconds % 60).padStart(2, '0');
  return hour !== '00' ? `${hour}:${min}:${sec}` : `${min}:${sec}`;
};

export const parseNewLine = (text: string) => {
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
