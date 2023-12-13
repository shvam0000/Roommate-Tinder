import { AccountContext } from '@/context/account';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AccountContext);

  const router = useRouter();

  const handleSingout = () => {
    logout();
    router.push('/');
  };

  return (
    <div>
      <div className="flex justify-around py-10">
        <h1 className="text-3xl font-bold">
          <Link href="/">Roommate Tinder</Link>
        </h1>
        <div>
          {isAuthenticated ? (
            <div>
              <Link href="/match" className="px-2">
                <button className="mx-5 px-3 py-2 border-b-2 hover:border-[#F65B5B]  text-black text-md">
                  Search Roommates
                </button>
              </Link>
              <Link href="/profile" className="px-2">
                <button className="mx-5 px-3 py-2 border-b-2 hover:border-[#F65B5B]  text-black text-md">
                  Profile
                </button>
              </Link>

              <button
                onClick={() => handleSingout()}
                className="mx-5 py-2 px-3 border-b-2 hover:border-[#F65B5B] focus:border- text-black text-md">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="px-2">
              <button className="mx-5 py-2 px-3 border-b-2 hover:border-[#F65B5B] focus:border- text-black text-md">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
