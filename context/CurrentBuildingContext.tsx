import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext } from 'react';
import { Building } from '../types/Buildings';

export type CurrnetBuildingContextType = Building | null;
export type CurrnetBuildingUpdateContextType = Dispatch<SetStateAction<Building | null>>;

export const CurrnetBuildingContext = createContext<CurrnetBuildingContextType>(null);
export const CurrnetBuildingUpdateContext = createContext<CurrnetBuildingUpdateContextType>(() => {});

export const CurrentBuildingProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentBuilding, setCurrentBuilding] = useState<Building | null>(null);

  return (
    <CurrnetBuildingUpdateContext.Provider value={setCurrentBuilding}>
      <CurrnetBuildingContext.Provider value={currentBuilding}>{children}</CurrnetBuildingContext.Provider>
    </CurrnetBuildingUpdateContext.Provider>
  );
};

export const useCurrentBuilding = (): CurrnetBuildingContextType => useContext(CurrnetBuildingContext);
export const useCurrentBuildingUpdate = (): CurrnetBuildingUpdateContextType =>
  useContext(CurrnetBuildingUpdateContext);
