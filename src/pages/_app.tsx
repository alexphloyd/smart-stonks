import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'src/store/store';
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import Layout from '@/components/Layout/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <ThemeProvider defaultTheme='dark' enableSystem disableTransitionOnChange>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </Provider>
  );
}
