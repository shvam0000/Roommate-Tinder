import { useState } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');
  const [confirmpassword, setConfirmpassword] = useState<string>('');

  const signupHandler = () => {
    alert('Form Submitted');
  };

  return (
    <section className="pt-15 py-5">
      <form onSubmit={signupHandler}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F65B5B] md:text-2xl ">
                Create a new account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-[#F65B5B]">
                    Your Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-[#F65B5B]">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                    placeholder="name@company.com"
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
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-[#F65B5B]">
                    Confirm Password
                  </label>
                  <input
                    type="confirmpassword"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#F65B5B]  font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default SignUpForm;
