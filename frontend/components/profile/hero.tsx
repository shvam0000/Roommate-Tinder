import React, { useState } from 'react';
import man from '@/utils/images/man.png';
import Image from 'next/image';
import { Edit } from '@/utils/icons';
import Modal from 'react-lean-modal';
import { EditProfile } from '.';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
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
        <div>
          <h1 className="text-3xl flex justify-start items-center font-bold pb-5 px-5">
            <span>Interests/Preferences</span>
            <button
              onClick={() => setShowModal(!showModal)}
              className="pl-10 text-[#F65B5B] text-medium">
              <Edit />
            </button>
          </h1>
          <div className="flex">
            <div className="px-5">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="Manhattan"
                disabled
              />
            </div>
            <div className="px-5">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="25"
                disabled
              />
            </div>
          </div>

          <div className="flex pt-2">
            <div className="px-5">
              <label htmlFor="minPrice">Minimum Price</label>
              <input
                type="number"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="$0"
                disabled
              />
            </div>
            <div className="px-5">
              <label htmlFor="age">Maximum Price</label>
              <input
                type="number"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="$25"
                disabled
              />
            </div>
          </div>
          <div className="py-2">
            <div className="px-5">
              <label htmlFor="area">Interests</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="Playing Squash, Reading"
                disabled
              />
            </div>
          </div>
          <div>
            <div className="flex justify-start px-5 pt-5">
              <div>
                <div className="flex items-center">
                  <input
                    id="morning-checkbox"
                    type="checkbox"
                    disabled
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
                    id="evening-checkbox"
                    type="checkbox"
                    disabled
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
                    id="drinking-checkbox"
                    type="checkbox"
                    disabled
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
                    id="smoking-checkbox"
                    type="checkbox"
                    disabled
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
                    disabled
                    className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="pets-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Pets
                  </label>
                </div>
              </div>
              <div className="pl-5">
                <div className="flex items-center">
                  <input
                    id="messy-checkbox"
                    type="checkbox"
                    disabled
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
                    disabled
                    className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="clean-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Clean
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    disabled
                    className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="gender-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Mixed Gender
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="link-checkbox"
                    type="checkbox"
                    disabled
                    className="w-4 h-4 text-[#F65B5B] bg-gray-100 border-gray-300 rounded  focus:ring-[#F65B5B] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="food-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Vegetarian
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        enterAnimation="fade"
        exitAnimation="fade"
        timeout={250}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        titleElement={<h3>Preferences</h3>}>
        <EditProfile />
      </Modal>
    </div>
  );
};

export default Hero;
