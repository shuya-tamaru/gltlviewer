import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { createContext, useState, Dispatch, SetStateAction, ReactNode, useContext, useEffect } from 'react';
import { User } from '../types/Users';

type CurrnetUserContextType = User | null;
type CurrnetUserUpdateContextType = Dispatch<SetStateAction<User | null>>;

export const CurrnetUserContext = createContext<CurrnetUserContextType>(null);
export const CurrnetUserUpdateContext = createContext<CurrnetUserUpdateContextType>(() => {});

export const CurrentUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  //check user login state
  useEffect(() => {
    if (status === 'loading') {
      return;
    } else if (status === 'authenticated') {
      const user = session.userData as User;
      user && setCurrentUser(user);
    } else {
      router.push('/login');
    }
  }, [status]);

  return (
    <CurrnetUserUpdateContext.Provider value={setCurrentUser}>
      <CurrnetUserContext.Provider value={currentUser}>{children}</CurrnetUserContext.Provider>
    </CurrnetUserUpdateContext.Provider>
  );
};

export const useCurrentUser = (): CurrnetUserContextType => useContext(CurrnetUserContext);
export const useCurrentUserUpdate = (): CurrnetUserUpdateContextType => useContext(CurrnetUserUpdateContext);
