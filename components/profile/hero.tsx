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
        <div className="pt-2">Price</div>
        <div className="flex">
          <div>
            <label htmlFor="minPrice">min</label>
            <input
              type="number"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="$0"
            />
          </div>
          <div>
            <label htmlFor="age">max</label>
            <input
              type="number"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="$25"
            />
          </div>
        </div>
        <div className="py-2">
          <div>
            <label htmlFor="area">Interests</label>
            <input
              type="text"
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              placeholder="Playing Squash, Reading"
            />
          </div>
        </div>
        <div>
          <div className="flex justify-evenly pt-5">
            <div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Morning Person
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Evening Person
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Drinking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Smoking
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Pets
                </label>
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Messy
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Clean
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Mixed Gender
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="link-checkbox"
                  className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Vegetarian
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
