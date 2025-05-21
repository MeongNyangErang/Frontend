import { BrowserRouter } from 'react-router-dom';
import PortalRoots from '@components/layouts/PortalRoots';
import useLogout from '@hooks/auth/useLogout';
import AppRouter from './routes';

function App() {
  useLogout(); // setLogoutFn

  return (
    <BrowserRouter>
      <AppRouter />
      <PortalRoots />
    </BrowserRouter>
  );
}

export default App;
