import React from 'react';

const Navbar = () => {
  return (
    <div>
      <div className="flex justify-around py-10">
        <h1 className="text-3xl font-bold">Roommate Tinder</h1>
        <button className="bg-[#F65B5B] px-5 py-2 rounded-full text-white text-md">
          Login
        </button>
      </div>
    </div>
  );
};

export default Navbar;
