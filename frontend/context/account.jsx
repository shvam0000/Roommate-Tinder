import React, { createContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import Pool from './user-pool/user-pool';

const AccountContext = createContext();

const Account = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientID, setClientID] = useState('');

  useEffect(() => {
    checkAuthentication();
  }, [isAuthenticated]);

  const checkAuthentication = async () => {
    try {
      const user = Pool.getCurrentUser();
      if (user) {
        await getSession(user);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject();
          } else {
            resolve(session);
          }
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          console.log('onSuccess: ', data.getAccessToken().payload.client_id);
          setClientID(data.getAccessToken().payload.client_id);
          console.log(clientID);
          sessionStorage.setItem('access_id', clientID);
          resolve(data);
          setIsAuthenticated(true);
        },
        onFailure: (err) => {
          console.error('onFailure: ', err);
          reject(err);
          setIsAuthenticated(false);
        },
        newPasswordRequired: (data) => {
          console.log('newPasswordRequired: ', data);
          alert('New password required, kindly change your password.');
        },
      });
    });
  };

  const logout = async () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      sessionStorage.clear();
      setIsAuthenticated(false);
    }
  };

  return (
    <AccountContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        getSession,
        logout,
      }}>
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
