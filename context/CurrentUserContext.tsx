import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext } from 'react';
import { User } from '../types/Users';

type CurrnetUserContextType = User | null;
type CurrnetUserUpdateContextType = Dispatch<SetStateAction<User | null>>;

export const CurrnetUserContext = createContext<CurrnetUserContextType>(null);
export const CurrnetUserUpdateContext = createContext<CurrnetUserUpdateContextType>(() => {});

export const CurrentUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <CurrnetUserUpdateContext.Provider value={setCurrentUser}>
      <CurrnetUserContext.Provider value={currentUser}>{children}</CurrnetUserContext.Provider>
    </CurrnetUserUpdateContext.Provider>
  );
};

export const useCurrentUser = (): CurrnetUserContextType => useContext(CurrnetUserContext);
export const useCurrentUserUpdate = (): CurrnetUserUpdateContextType => useContext(CurrnetUserUpdateContext);
