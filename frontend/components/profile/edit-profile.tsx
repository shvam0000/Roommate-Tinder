import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditProfile = () => {
  const [area, setArea] = useState('');
  const [age, setAge] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [interests, setInterests] = useState('');
  const [userData, setUserData] = useState();

  const [morningPerson, setMorningPerson] = useState(false);
  const [eveningPerson, setEveningPerson] = useState(false);
  const [drinking, setDrinking] = useState(false);
  const [smoking, setSmoking] = useState(false);
  const [pets, setPets] = useState(false);
  const [messy, setMessy] = useState(false);
  const [clean, setClean] = useState(false);
  const [mixGender, setMixGender] = useState(false);
  const [vegetarian, setVegetarian] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      id,
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
      mixGender,
      vegetarian,
    };

    try {
      const response = await fetch(
        'https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/add-user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log('Profile submitted successfully');
        // You can handle success, such as redirecting or showing a success message
      } else {
        console.error('Failed to submit profile');
        // Handle error, show an error message, etc.
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-3/4 mx-auto">
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
          <div className="px-5">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="area">Area</label>
            <select
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600">
              <option value="">Select an area</option>
              <option value="Manhattan">Manhattan</option>
              <option value="Queens">Queens</option>
              <option value="Brooklyn">Brooklyn</option>
              <option value="Bronx">Bronx</option>
            </select>
          </div>

          <div className="px-5">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex py-2">
          <div className="px-5">
            <label htmlFor="min-price">Min Price</label>
            <input
              type="number"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
          <div className="px-5">
            <label htmlFor="max-price">Max Price</label>
            <input
              type="number"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
            />
          </div>
        </div>
        <div className="px-5 w-[85.5%]">
          <label htmlFor="interests">Interests</label>
          <input
            type="text"
            id="interests"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            className=" border sm:text-sm rounded-lg block w-full p-2.5 bg-white border-gray-600 placeholder-gray-400"
          />
        </div>

        <div className="px-5 pt-2 flex">
          <div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={morningPerson}
                  onChange={(e) => setMorningPerson(e.target.checked)}
                />
                <span className="pl-2">Morning Person</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={eveningPerson}
                  onChange={(e) => setEveningPerson(e.target.checked)}
                />
                <span className="pl-2">Evening Person</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={drinking}
                  onChange={(e) => setDrinking(e.target.checked)}
                />
                <span className="pl-2">Drinking</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={smoking}
                  onChange={(e) => setSmoking(e.target.checked)}
                />
                <span className="pl-2">Smoking</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={pets}
                  onChange={(e) => setPets(e.target.checked)}
                />
                <span className="pl-2">Pets</span>
              </label>
            </div>
          </div>
          <div className="pl-5">
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={messy}
                  onChange={(e) => setMessy(e.target.checked)}
                />
                <span className="pl-2">Messy</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={clean}
                  onChange={(e) => setClean(e.target.checked)}
                />
                <span className="pl-2">Clean</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={mixGender}
                  onChange={(e) => setMixGender(e.target.checked)}
                />
                <span className="pl-2">Mixed Gender</span>
              </label>
            </div>
            <div className="py-1">
              <label>
                <input
                  type="checkbox"
                  checked={vegetarian}
                  onChange={(e) => setVegetarian(e.target.checked)}
                />
                <span className="pl-2">Vegetarian</span>
              </label>
            </div>
          </div>
        </div>
        <button
          className="bg-[#F65B5B] text-white px-4 py-2 rounded-lg mt-5 ml-5"
          type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
