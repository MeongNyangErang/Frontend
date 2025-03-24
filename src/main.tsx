import { createRoot } from 'react-dom/client';
import App from './App';
import GlobalStyle from '@components/styles/GlobalStyle';

createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <App />
  </>,
);
