import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RecoilRoot } from "recoil";

import "../styles/globals.css";
import Spiner from "../components/nextComponents/spiner";
import { CurrentUserProvider } from "../context/CurrentUserContext";

function Loading() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => url !== Router.asPath && setLoading(true);
    const handleComplete = (url: string) => url === Router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });
  return loading;
}

function MyApp({ Component, pageProps }: AppProps) {
  const loadingState = Loading();

  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ChakraProvider
          theme={extendTheme({
            fonts: {
              body: "Noto Sans JP, sans-serif",
            },
          })}
        >
          <RecoilRoot>
            <CurrentUserProvider>{loadingState ? <Spiner /> : <Component {...pageProps} />}</CurrentUserProvider>
          </RecoilRoot>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
