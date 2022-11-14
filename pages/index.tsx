import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Spiner from '../components/nextComponents/spiner';
import { useCurrentUser } from '../context/CurrentUserContext';

const IndexPage: NextPage = () => {
  const { status } = useSession();
  const currentUser = useCurrentUser();

  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case 'loading':
        break;
      case 'authenticated':
        router.push(`/topPage/${currentUser!.companyId}`);
        break;
      default:
        router.push('/login');
    }
  }, [currentUser]);

  return <>{status === 'loading' || (status === 'unauthenticated' && <Spiner />)}</>;
};

export default IndexPage;
