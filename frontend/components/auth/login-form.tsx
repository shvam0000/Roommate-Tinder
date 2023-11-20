import { AccountContext } from '@/context/account';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmSignup from '@/pages/auth/confirmSignup';

const AuthForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userConfirmed, setUserConfirmed] = useState(true);

  const router = useRouter();

  const handleAWSError = (err: any) => {
    if (err.code === 'NotAuthorizedException') {
      const errorMessage = err.message || 'An unknown error occurred.';
      // setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.error(errorMessage);
    }
    if (err.code === 'UserNotConfirmedException') {
      const errorMessage = err.message + 'Please verify your email.';
      // setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.error(errorMessage);
      setUserConfirmed(false);
    } else {
      console.error(err);
    }
  };

  const { authenticate } = useContext(AccountContext);

  const loginHandler = (event: React.FormEvent) => {
    event.preventDefault();

    authenticate(email, password)
      .then((data: any) => {
        console.log('data', data);
        router.replace('/profile');
        //! We need to get all the user data from the Dynamo DB
      })
      .catch((err: any) => {
        handleAWSError(err);
      });
  };

  return (
    <div>
      {userConfirmed ? (
        <section className="pt-20 py-5">
          <form onSubmit={(event) => loginHandler(event)}>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
              <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F65B5B] md:text-2xl ">
                    Sign in to your account
                  </h1>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-[#F65B5B]">
                        Your email
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-[#F65B5B]">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[#F65B5B]  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </section>
      ) : (
        <ConfirmSignup username={email} />
      )}
      <ToastContainer />
    </div>
  );
};

export default AuthForm;
