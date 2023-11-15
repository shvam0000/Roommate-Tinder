import React, { useState } from 'react';
import { LoginForm, SignUpForm } from '.';

const Hero = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  return (
    <>
      <div>{isLogin ? <LoginForm /> : <SignUpForm />}</div>
      <div className="pb-10">
        <p className="text-sm flex justify-center font-light text-[#F65B5B]">
          New User?{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="pl-1 font-medium text-primary-600 hover:underline dark:text-primary-500">
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </>
  );
};

export default Hero;
