import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { CurrentUserProvider } from '../context/CurrentUserContext';
import { CurrentBuildingProvider } from '../context/CurrentBuildingContext';
import { SessionProvider } from 'next-auth/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <CurrentUserProvider>
          <CurrentBuildingProvider>
            <Component {...pageProps} />
          </CurrentBuildingProvider>
        </CurrentUserProvider>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
