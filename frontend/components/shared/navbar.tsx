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
                <button className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
                  Search Roommates
                </button>
              </Link>
              <Link href="/profile" className="px-2">
                <button className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
                  Profile
                </button>
              </Link>

              <button
                onClick={() => handleSingout()}
                className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth" className="px-2">
              <button className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
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
