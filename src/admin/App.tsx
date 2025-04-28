import { BrowserRouter } from 'react-router-dom';
import AdminRouter from './routes';

function App() {
  return (
    <BrowserRouter>
      <AdminRouter />
      <div id="modal-root" />
    </BrowserRouter>
  );
}

export default App;
