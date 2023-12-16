import { ProtectedRoute } from '@/components/auth';
import { Layout } from '@/layout';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Chat = () => {
  const [matchedUserProfiles, setMatchedUserProfiles] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );

    axios
      .get(
        `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/user?id=${id}`
      )
      .then((res) => {
        const matchUserIds = res.data.matches || [];
        // Fetch profiles of liked users
        return Promise.all(
          matchUserIds.map((userId) =>
            axios.get(
              `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/user?id=${userId}`
            )
          )
        );
      })
      .then((responses) => {
        const likedProfiles = responses.map((response) => response.data);
        console.log(likedProfiles);
        setMatchedUserProfiles(matchedUserProfiles); // Fix: set matchedUserProfiles instead of matchedUserProfiles
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Fix: Remove matchedUserProfiles from dependency array

  return (
    <Layout>
      <ProtectedRoute>
        {/* Display user profiles */}
        {matchedUserProfiles.map((profile) => (
          <div key={profile.id}>
            <h2>
              {profile.firstName} {profile.lastName}
            </h2>
            <p>Email: {profile.email}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </ProtectedRoute>
    </Layout>
  );
};

export default Chat;
