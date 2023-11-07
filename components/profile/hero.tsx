import React from 'react';
import man from '@/utils/images/man.png';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="flex p-10 justify-around">
      <div>
        <h1 className="text-3xl font-bold pb-5">Welcome, John</h1>
        <Image src={man} alt="Profile" width={300} height={300} />
        <div className="py-4">
          <h1 className="text-xl font-medium py-3">
            Email:{' '}
            <span className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
              john@gmail.com
            </span>
          </h1>
          <h1 className="text-xl font-medium py-3">
            Username:{' '}
            <span className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
              JohnDoe
            </span>
          </h1>
          <h1 className="text-xl font-medium py-3">
            Gender:{' '}
            <span className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
              Male
            </span>
          </h1>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold pb-5">Interests/Preferences</h1>
        <div className="flex">
          <div>
            <label htmlFor="area">Area</label>
            <input
              type="text"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="Manhattan"
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input
              type="text"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="25"
            />
          </div>
        </div>
        <div>Price</div>
        <div className="flex">
          <div>
            <label htmlFor="minPrice">min</label>
            <input
              type="text"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="Manhattan"
            />
          </div>
          <div>
            <label htmlFor="age">max</label>
            <input
              type="text"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="25"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
