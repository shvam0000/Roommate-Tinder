import { Layout } from '@/layout';
import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const UserDetails = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [gender, setGender] = useState();
  const [age, setAge] = useState();
  const [area, setArea] = useState();
  const [interests, setIntetests] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [smoking, setSmoking] = useState();
  const [drinking, setDrinking] = useState();
  const [morningPerson, setMorningPerson] = useState();
  const [eveningPerson, setEveningPerson] = useState();
  const [clean, setClean] = useState();
  const [messy, setMessy] = useState();
  const [vegetarian, setVegetarian] = useState();
  const [mixedGender, setMixedGender] = useState();
  const [pets, setPets] = useState();

  const data = {
    firstName,
    lastName,
    gender,
    age,
    area,
    interests,
    minPrice,
    maxPrice,
    smoking,
    drinking,
    morningPerson,
    eveningPerson,
    clean,
    messy,
    vegetarian,
    mixedGender,
    pets,
  };
  const router = useRouter();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('data', data);

    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );

    axios
      .post(
        `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/add-user?id=${id}`,
        {
          queryStringParameters: {
            id: localStorage.getItem(
              'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
            ),
          },
          body: JSON.stringify(data),
        }
      )
      .then((res) => {
        console.log('res', res);
        router.replace('/');
      })
      .catch((err) => {
        console.log('err', err);
      });

    console.log('submit');
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
        <div className="flex justify-center items-center">
          Enter your details
        </div>
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="firstName">First Name</label>
            <input
              required
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e: any) => setFirstName(e.target.value)}
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
              value={lastName}
              onChange={(e: any) => setLastName(e.target.value)}
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
              value={gender}
              onChange={(e: any) => setGender(e.target.value)}
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
              value={area}
              onChange={(e: any) => setArea(e.target.value)}
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
              value={age}
              onChange={(e: any) => setAge(e.target.value)}
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
              value={minPrice}
              onChange={(e: any) => setMinPrice(e.target.value)}
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
              value={maxPrice}
              onChange={(e: any) => setMaxPrice(e.target.value)}
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
            value={interests}
            onChange={(e: any) => setIntetests(e.target.value)}
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
                value={morningPerson}
                onChange={(e: any) => setMorningPerson(e.target.value)}
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
                value={eveningPerson}
                onChange={(e: any) => setEveningPerson(e.target.value)}
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
                value={drinking}
                onChange={(e: any) => setDrinking(e.target.value)}
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
                value={clean}
                onChange={(e: any) => setClean(e.target.value)}
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
                value={mixedGender}
                onChange={(e: any) => setMixedGender(e.target.value)}
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
                value={smoking}
                onChange={(e: any) => setSmoking(e.target.value)}
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
                value={vegetarian}
                onChange={(e: any) => setVegetarian(e.target.value)}
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
                value={pets}
                onChange={(e: any) => setPets(e.target.value)}
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
                value={messy}
                onChange={(e: any) => setMessy(e.target.value)}
                className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
              />
            </div>
          </div>
        </div>
        <button
          className="bg-[#F65B5B] w-full text-white px-4 py-2 rounded-lg mt-5 ml-5 my-10"
          type="submit">
          Submit
        </button>
      </form>
      <ToastContainer />
    </Layout>
  );
};

export default UserDetails;
