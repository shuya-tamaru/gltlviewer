import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext, useEffect } from 'react';
import { ReceavedData } from '../types/ReceavedData';

export type CurrnetIfameContextType = ReceavedData | null;
export type CurrnetIfameUpdateContextType = Dispatch<SetStateAction<ReceavedData | null>>;

export const CurrnetIframeStateContext = createContext<CurrnetIfameContextType>(null);
export const CurrnetIframeStateUpdateContext = createContext<CurrnetIfameUpdateContextType>(() => {});

export const CurrentIframeStateProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentIframeState, setCurrentIframeState] = useState<ReceavedData | null>(null);

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data) {
        setCurrentIframeState(event.data);
      }
    });
  }, []);

  return (
    <CurrnetIframeStateUpdateContext.Provider value={setCurrentIframeState}>
      <CurrnetIframeStateContext.Provider value={currentIframeState}>{children}</CurrnetIframeStateContext.Provider>
    </CurrnetIframeStateUpdateContext.Provider>
  );
};

export const useCurrentIframeState = (): CurrnetIfameContextType => useContext(CurrnetIframeStateContext);
export const useCurrentIframeStateUpdate = (): CurrnetIfameUpdateContextType =>
  useContext(CurrnetIframeStateUpdateContext);
