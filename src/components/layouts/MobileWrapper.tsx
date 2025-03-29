import styled from 'styled-components';

const MobileWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWrapper>
      <SContainer>
        {children}
        <div id="modal-root" />
      </SContainer>
    </SWrapper>
  );
};

export default MobileWrapper;

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.wrapBg};
`;

const SContainer = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.layouts.maxWidth};
  min-width: ${({ theme }) => theme.layouts.minWidth};
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
`;
