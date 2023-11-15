//@ts-nocheck
import userPool from '@/context/user-pool/user-pool';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassowrd] = useState<string>('');
  const [confirmpassword, setConfirmpassword] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [errorData, setErrorData] = useState<string>('');

  const handleAWSError = (err: any) => {
    if (err.code === 'InvalidPasswordException') {
      const errorMessage = err.message || 'An unknown error occurred.';
      setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.error(errorData);
    }
    if (err.code === 'UsernameExistsException') {
      const errorMessage = err.message || 'User already present.';
      setErrorData(errorMessage);
      //AWS error message with a toast message
      toast.success(errorData);
    } else {
      console.error(err);
    }
  };

  const signupHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      const loginData = {
        username,
        password,
      };
      const attribute = [
        {
          Name: 'name', // Add the required 'name' attribute
          Value: username,
        },
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'gender',
          Value: gender,
        },
        // Add other attributes as needed
      ];
      console.log(loginData);
      userPool.signUp(username, password, attribute, null, (err, data) => {
        if (err) {
          handleAWSError(err);
        } else {
          console.log(data);
          toast.success('User created successfully');
        }
      });
    }
  };

  return (
    <section className="pt-15 py-5">
      <form onSubmit={(event) => signupHandler(event)}>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
          <div className="w-full rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#F65B5B] md:text-2xl ">
                Create a new account
              </h1>
              <div className="space-y-4 md:space-y-6">
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
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    onChange={(event) => setPassowrd(event.target.value)}
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
                    type="password"
                    name="confirmpassword"
                    id="confirmpassword"
                    placeholder="••••••••"
                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                    value={confirmpassword}
                    onChange={(event) => setConfirmpassword(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmpassword"
                    className="block mb-2 text-sm font-medium text-[#F65B5B]">
                    Gender
                  </label>
                  <input
                    type="text"
                    name="gender"
                    id="gender"
                    placeholder="Male"
                    className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                    value={gender}
                    onChange={(event) => setGender(event.target.value)}
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
      <ToastContainer />
    </section>
  );
};

export default SignUpForm;
