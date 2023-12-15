//@ts-nocheck
import man2 from '@/utils/images/man2.png';
import Image from 'next/image';
import dislike from '@/utils/images/dislike.png';
import like from '@/utils/images/like.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Hero = () => {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(
      'https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/users'
    )
      .then((res) => {
        console.log(res.data.body);
        setUsers(res.data.body);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="p-10">
        {loading ? (
          <p>Loading...</p>
        ) : (
          users &&
          users?.map((user) => {
            return (
              <div key={user.id}>
                <div className="bg-[#f8caca] mx-auto p-10 rounded-lg">
                  <figure className="flex justify-center">
                    <Image src={man2} alt="man2" />
                  </figure>
                  <div className="flex justify-center">
                    <Link href="/match">
                      <figure className="px-2 py-2">
                        <Image src={dislike} alt="dislike" />
                      </figure>
                    </Link>
                    <Link href="/match">
                      <figure className="px-2 py-2">
                        <Image src={like} alt="like" />
                      </figure>
                    </Link>
                  </div>
                  <h1 className="text-2xl font-bold">
                    {user.firstName}, {user.age}, {user.gender}
                  </h1>
                  <ul className="text-lg font-medium">
                    <li className="list-disc">Interests: {user.interests}</li>
                    <li className="list-disc">
                      {user.smoking === 'false_smoking'
                        ? 'Non-Smoker'
                        : 'Smoker'}
                    </li>
                    <li className="list-disc">
                      {user.drinking !== 'false_drinking'
                        ? 'Drinker'
                        : 'Non-Drinker'}
                    </li>
                  </ul>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Hero;
