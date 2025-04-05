import { BrowserRouter } from 'react-router-dom';
import PortalRoots from '@components/layouts/PortalRoots';
import AppRouter from './routes';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
      <PortalRoots />
    </BrowserRouter>
  );
}

export default App;
