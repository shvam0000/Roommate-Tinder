import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const [userData, setUserData] = useState<any>();

  const id = localStorage.getItem(
    'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
  );

  useEffect(() => {
    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );
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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const area = e.target.area.value;
    const age = e.target.age.value;
    const minPrice = e.target.minPrice.value;
    const maxPrice = e.target.maxPrice.value;
    const interests = e.target.interests.value;
    const morningPerson = e.target.morningPerson.value;
    const eveningPerson = e.target.eveningPerson.value;
    const drinking = e.target.drinking.value;
    const smoking = e.target.smoking.value;
    const pets = e.target.pets.value;
    const messy = e.target.messy.value;
    const clean = e.target.clean.value;
    const mixedGender = e.target.mixedGender.value;
    const vegetarian = e.target.vegetarian.value;
    const gender = e.target.gender.value;

    const data = {
      firstName,
      lastName,
      area,
      age,
      minPrice,
      maxPrice,
      interests,
      morningPerson,
      eveningPerson,
      drinking,
      smoking,
      pets,
      messy,
      clean,
      mixedGender,
      vegetarian,
      gender,
    };

    if (
      (morningPerson === 'true' || morningPerson === 'false') &&
      (eveningPerson === 'true' || eveningPerson === 'false') &&
      (drinking === 'true' || drinking === 'false') &&
      (smoking === 'true' || smoking === 'false') &&
      (pets === 'true' || pets === 'false') &&
      (messy === 'true' || messy === 'false') &&
      (clean === 'true' || clean === 'false') &&
      (mixedGender === 'true' || mixedGender === 'false') &&
      (vegetarian === 'true' || vegetarian === 'false') &&
      (area === 'Manhattan' ||
        area === 'Brooklyn' ||
        area === 'Bronx' ||
        area === 'Queens') &&
      (gender === 'Male' || gender === 'Female') &&
      maxPrice > minPrice
    ) {
      try {
        const response = await fetch(
          `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/update-user?id=${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
        );

        if (response.ok) {
          console.log('Profile submitted successfully');
          // You can handle success, such as redirecting or showing a success message
          window.location.reload();
        } else {
          console.error('Failed to submit profile');
          // Handle error, show an error message, etc.
        }
      } catch (error) {
        console.error('Error submitting profile:', error);
      }
    } else {
      toast.error('Please enter correct schema');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              defaultValue={userData?.firstName}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
          <div className="px-5">
            <label htmlFor="lastName">Last Name</label>
            <input
              required
              type="text"
              id="lastName"
              name="lastName"
              defaultValue={userData?.lastName}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
          <div className="px-5">
            <label htmlFor="lastName">Gender</label>
            <input
              required
              type="text"
              id="gender"
              name="gender"
              defaultValue={userData?.gender}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="area">
              Area <br />
              <span className="text-xs text-gray-500">
                (Manhattan or Brooklyn or Bronx or Queens)
              </span>
            </label>
            <input
              required
              type="text"
              id="area"
              name="area"
              defaultValue={userData?.area}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>

          <div className="px-5">
            <label htmlFor="age">
              <br />
              Age
              <br />
              <span className="text-xs text-gray-500"> </span>
            </label>
            <input
              required
              type="number"
              id="age"
              name="age"
              defaultValue={userData?.age}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="min-price">Min Price</label>
            <input
              required
              type="number"
              id="min-price"
              name="minPrice"
              defaultValue={userData?.minPrice}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
          <div className="px-5">
            <label htmlFor="max-price">Max Price</label>
            <input
              required
              type="number"
              id="max-price"
              name="maxPrice"
              defaultValue={userData?.maxPrice}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="px-5 w-[85.5%]">
          <label htmlFor="interests">Interests</label>
          <input
            required
            type="text"
            id="interests"
            name="interests"
            defaultValue={userData?.interests}
            className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
          />
        </div>

        <div className="px-5 pt-2 flex">
          <div>
            <div className="py-1">
              <label htmlFor="area">
                Morning Person
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="morningPerson"
                name="morningPerson"
                defaultValue={userData?.morningPerson}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label>
                Evening Person
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="eveningPerson"
                name="eveningPerson"
                defaultValue={userData?.eveningPerson}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label>
                Drinking
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="drinking"
                name="drinking"
                defaultValue={userData?.drinking}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="pl-5">
            <div className="py-1">
              <label>
                Clean
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="clean"
                name="clean"
                defaultValue={userData?.clean}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label htmlFor="area">
                Mixed Gender
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="mixedGender"
                name="mixedGender"
                defaultValue={userData?.mixedGender}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label>
                Smoking
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="smoking"
                name="smoking"
                defaultValue={userData?.smoking}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
          <div className="pl-5">
            <div className="py-1">
              <label>
                Vegetarian
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="vegetarian"
                name="vegetarian"
                defaultValue={userData?.vegetarian}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label>
                Pets
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="pets"
                name="pets"
                defaultValue={userData?.pets}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
            <div className="py-1">
              <label>
                Messy
                <br />
                <span className="text-xs text-gray-500">(true or false)</span>
              </label>
              <input
                required
                type="text"
                id="messy"
                name="messy"
                defaultValue={userData?.messy}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-[#F65B5B] w-full text-white px-4 py-2 rounded-lg mt-5 ml-5"
          type="submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
