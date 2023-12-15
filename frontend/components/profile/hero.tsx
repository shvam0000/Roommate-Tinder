import React, { useEffect, useState } from 'react';
import man from '@/utils/images/man.png';
import Image from 'next/image';
import { Edit } from '@/utils/icons';
import Modal from 'react-lean-modal';
import { EditProfile } from '.';

import axios from 'axios';

const Hero = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );

    const _email = localStorage.getItem('email');
    setEmail(_email);

    axios(
      `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/user?id=${id}`
    )
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex p-10 justify-around">
      <div>
        <h1 className="text-3xl font-bold pb-5">
          Welcome, {userData?.firstName}
        </h1>
        <Image src={man} alt="Profile" width={300} height={300} />
        <div className="py-4">
          <h1 className="text-xl font-medium py-3">
            Email:{' '}
            <span className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
              {email}
            </span>
          </h1>
          <h1 className="text-xl font-medium py-3">
            Username:{' '}
            <span className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
              {userData?.id}
            </span>
          </h1>
        </div>
      </div>
      <div>
        <div>
          <h1 className="text-3xl flex justify-start items-center font-bold pb-5 px-5">
            <span>User Details</span>
            <button
              onClick={() => setShowModal(!showModal)}
              className="pl-10 text-[#F65B5B] text-medium">
              <Edit />
            </button>
          </h1>
          <div className="flex">
            <div className="px-5">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="John"
                disabled
                value={userData.firstName}
              />
            </div>
            <div className="px-5">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="Doe"
                disabled
                value={userData.lastName}
              />
            </div>
            <div className="px-5">
              <label htmlFor="lname">Gender</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="Doe"
                disabled
                value={userData.gender}
              />
            </div>
          </div>
          <div className="flex">
            <div className="px-5">
              <label htmlFor="area">Area</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="Manhattan"
                disabled
                value={userData.area}
              />
            </div>
            <div className="px-5">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="25"
                disabled
                value={userData.age}
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
                value={userData.minPrice}
              />
            </div>
            <div className="px-5">
              <label htmlFor="age">Maximum Price</label>
              <input
                type="number"
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
                placeholder="$25"
                disabled
                value={userData.maxPrice}
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
                value={userData.interests}
              />
            </div>
          </div>
          <div>
            <div className="pl-5 pt-5">Preferences</div>
            <div className="flex items-center">
              {userData.morningPerson === 'true' && (
                <label
                  htmlFor="link-checkbox"
                  className="ml-6 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                  Morning Person
                </label>
              )}

              <div className="flex items-center">
                {userData.eveningPerson === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Evening Person
                  </label>
                )}
              </div>
              <div className="flex items-center">
                {userData.drinking === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Drinking
                  </label>
                )}
              </div>
              <div className="flex items-center">
                {userData.smoking === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Smoking
                  </label>
                )}
              </div>
              <div className="flex items-center">
                {userData.pets === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Pets
                  </label>
                )}
              </div>
            </div>
            <div className="pl-5">
              <div className="flex items-center">
                {userData.messy === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Messy
                  </label>
                )}
              </div>

              <div className="flex items-center">
                {userData.clean === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Clean
                  </label>
                )}
              </div>

              <div className="flex items-center">
                {userData.mixedGender === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Mixed Gender
                  </label>
                )}
              </div>
              <div className="flex items-center">
                {userData.vegetarian === 'true' && (
                  <label
                    htmlFor="link-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Vegetarian
                  </label>
                )}
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
