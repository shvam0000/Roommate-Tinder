import React, { useState } from 'react';
import man from '@/utils/images/man.png';
import Image from 'next/image';

const Hero = () => {
  const [formData, setFormData] = useState({
    id:
      typeof window !== 'undefined'
        ? localStorage.getItem(
            'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
          ) || ''
        : '',
    area: '',
    age: '',
    minPrice: '',
    maxPrice: '',
    interests: '',
    morningPerson: false,
    eveningPerson: false,
    drinking: false,
    smoking: false,
    pets: false,
    messy: false,
    clean: false,
    mixedGender: false,
    vegetarian: false,
  });

  // useEffect(() => {
  //   // Fetch initial data for the form (if needed)
  //   // Example: Fetching user preferences from the backend
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await fetch('YOUR_API_ENDPOINT');
  //       if (response.ok) {
  //         const userData = await response.json();
  //         setFormData(userData);
  //       } else {
  //         console.error('Failed to fetch user data.');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []); // Empty dependency array means this effect runs once on component mount

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your backend API
      const response = await fetch('http://localhost:8080/user/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Failed to submit form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
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
      <form onSubmit={handleSubmit}>
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
                    id="morning-checkbox"
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
                    id="evening-checkbox"
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
                    id="drinking-checkbox"
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
                    id="smoking-checkbox"
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
                    htmlFor="pets-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Pets
                  </label>
                </div>
              </div>
              <div>
                <div className="flex items-center">
                  <input
                    id="messy-checkbox"
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
                    htmlFor="clean-checkbox"
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
                    htmlFor="gender-checkbox"
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
                    htmlFor="food-checkbox"
                    className="ml-2 text-sm font-medium text-[#F65B5B] pr-2 pl-0 py-2">
                    Vegetarian
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-[#F65B5B] text-white py-2 px-5 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Hero;
