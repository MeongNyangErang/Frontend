import { forwardRef, ForwardedRef } from 'react';

const DatePickerInput = forwardRef(
  ({ value, onClick }: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <input
        type="text"
        value={value}
        onClick={onClick}
        onChange={() => {}}
        ref={ref}
        placeholder="생일을 선택해주세요."
        style={{ cursor: 'pointer' }}
        readOnly
      />
    );
  },
);

export default DatePickerInput;
