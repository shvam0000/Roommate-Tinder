import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AccountContext } from '../../context/account';

const ProtectedRoute = ({ children }: any) => {
  const { getSession } = useContext(AccountContext);
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        await getSession();
      } catch (error) {
        // If there is no active session, redirect to the login page
        router.replace('/auth');
      }
    };
    checkAuthentication();
  }, [getSession, router]);

  return <div>{children}</div>;
};

export default ProtectedRoute;
