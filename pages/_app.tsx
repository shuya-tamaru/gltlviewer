import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider
        theme={extendTheme({
          fonts: {
            body: "Noto Sans JP, sans-serif",
          },
        })}
      >
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
