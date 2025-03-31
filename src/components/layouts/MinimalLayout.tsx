import { Outlet } from 'react-router-dom';
import styled from 'styled-components';

const MinimalLayout = () => {
  return (
    <SWrap>
      <Outlet />
    </SWrap>
  );
};

export default MinimalLayout;

const SWrap = styled.div`
  overflow-y: auto;
  height: 100vh;
`;
