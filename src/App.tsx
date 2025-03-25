import { BrowserRouter } from 'react-router-dom';
import MobileWrapper from '@components/layouts/MobileWrapper';
import AppRouter from './routes';

function App() {
  return (
    <MobileWrapper>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </MobileWrapper>
  );
}

export default App;
