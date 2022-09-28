import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { ChakraProvider } from '@chakra-ui/react';
import { CurrentUserProvider } from '../context/CurrentUserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <CurrentUserProvider>
        <Component {...pageProps} />
      </CurrentUserProvider>
    </ChakraProvider>
  );
}

export default MyApp;
