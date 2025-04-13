import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import GlobalStyle from '@components/styles/GlobalStyle';
import { theme } from '@components/styles/theme';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60, refetchOnWindowFocus: false, retry: 1 },
  },
});

const enableMocking = async () => {
  if (!import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    await worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
};

enableMocking().then(() => {
  const $root = document.getElementById('root');
  if (!$root) throw new Error('root element not found');

  createRoot($root).render(
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <App />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
        </QueryClientProvider>
      </RecoilRoot>
    </ThemeProvider>,
  );
});
