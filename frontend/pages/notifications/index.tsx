//@ts-nocheck
import { ProtectedRoute } from '@/components/auth';
import { Layout } from '@/layout';
import React, { useEffect, useState } from 'react';
import dislike from '@/utils/images/dislike.png';
import like from '@/utils/images/like.png';
import man2 from '@/utils/images/man2.png';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const Notifications = () => {
  const [likedUserProfiles, setLikedUserProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );

    axios
      .get(
        `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/user?id=${id}`
      )
      .then((res) => {
        const likedUserIds = res.data.liked_user || [];
        // Fetch profiles of liked users
        return Promise.all(
          likedUserIds.map((userId) =>
            axios.get(
              `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/user?id=${userId}`
            )
          )
        );
      })
      .then((responses) => {
        const likedProfiles = responses.map((response) => response.data);
        setLikedUserProfiles(likedProfiles);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  return (
    <Layout>
      <ProtectedRoute>
        {/* Display loading screen while data is being fetched */}
        {loading && <div>Loading...</div>}

        {/* Loop through likedUserProfiles and display their profiles */}
        {!loading &&
          likedUserProfiles?.map((profile) => (
            <div
              key={profile.id}
              className="flex justify-center items-center bg-[#f8caca] w-fit mx-auto px-14 py-5 rounded-lg my-10">
              <div className="rounded-lg">
                <figure className="flex justify-center">
                  <Image src={man2} alt="man2" />
                </figure>
                {/* Add appropriate logic for dislike and like buttons for each profile */}
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
                <h1 className="text-2xl font-bold">{`${profile.firstName}, ${profile.age}`}</h1>
                <ul className="text-lg font-medium">
                  <li className="list-disc">
                    {profile.occupation === 'false_smoking'
                      ? 'Non Smoker'
                      : 'Smoker'}
                  </li>
                  <li className="list-disc">
                    {profile.occupation === 'false_drinking'
                      ? 'Non Drinker'
                      : 'Drinker'}
                  </li>
                  {/* Add other profile details as needed */}
                </ul>
              </div>
            </div>
          ))}
      </ProtectedRoute>
    </Layout>
  );
};

export default Notifications;
