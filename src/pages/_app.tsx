import type { AppProps } from 'next/app';

import { DataProvider } from 'providers/data-provider';

import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}

export default MyApp;
