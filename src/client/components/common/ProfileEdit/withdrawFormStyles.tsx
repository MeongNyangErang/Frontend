import styled from 'styled-components';

const SContentBox = styled.div`
  overflow-y: auto;
  padding: ${({ theme }) => theme.layouts.paddingX};
  margin-bottom: 8px;
  width: 100%;
  max-height: 400px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.gray600};
  border: ${({ theme }) => `1px solid ${theme.colors.gray300}`};
  border-radius: ${({ theme }) => theme.radius.sm};
`;

const SCheckboxArea = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  [type='checkbox'] {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    color: ${({ theme }) => theme.colors.gray600};
    cursor: pointer;

    &::after {
      content: '';
      display: block;
      width: 14px;
      height: 14px;
      border: ${({ theme }) => `1px solid ${theme.colors.gray500}`};
      border-radius: 2px;
      font-size: 10px;
      color: #fff;
      text-align: center;
    }

    &.is-active::after {
      content: '✔';
      border: none;
      background-color: ${({ theme }) => theme.colors.infoText};
    }
  }
`;

const SButtonBox = styled.div`
  margin-bottom: 6px;
  width: 100%;
`;

export { SContentBox, SCheckboxArea, SButtonBox };
