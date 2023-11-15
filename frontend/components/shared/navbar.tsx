import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-around py-10">
        <h1 className="text-3xl font-bold">
          <Link href="/">Roommate Tinder</Link>
        </h1>
        <Link href="/auth">
          <button className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
