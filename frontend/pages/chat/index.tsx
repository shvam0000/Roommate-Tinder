//@ts-nocheck
import { ProtectedRoute } from '@/components/auth';
import { Layout } from '@/layout';
import React, { useCallback, useEffect, useState } from 'react';
import { Session } from '@talkjs/react';
import axios from 'axios';
import { Chatbox } from '@talkjs/react';
import Talk from 'talkjs';
import man2 from '@/utils/images/man2.png';

const Chat = () => {
  const [matchedUserProfiles, setMatchedUserProfiles] = useState([]);
  const [showChat, setShowChat] = useState(false);

  const chat = () => {
    setShowChat(!showChat);
  };

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
        setMatchedUserProfiles(likedProfiles); // Fix: set matchedUserProfiles instead of matchedUserProfiles
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const syncUser = useCallback(
    () =>
      new Talk.User({
        id: 'nina',
        name: 'Nina',
        email: 'nina@example.com',
        photoUrl: 'https://avatar.iran.liara.run/public?username=Jordan',
        welcomeMessage: 'Hi!',
        role: 'default',
      }),
    []
  );

  const syncConversation = useCallback((session) => {
    // JavaScript SDK code here
    const conversation = session.getOrCreateConversation('welcome');

    const other = new Talk.User({
      id: 'frank',
      name: 'Frank',
      email: 'frank@example.com',
      photoUrl: 'https://avatar.iran.liara.run/public?username=Jordan',
      welcomeMessage: 'Hey, how can I help?',
      role: 'default',
    });
    conversation.setParticipant(session.me);
    conversation.setParticipant(other);

    return conversation;
  }, []);

  return (
    <Layout>
      <ProtectedRoute>
        <div className="pb-10">
          <h1 className="flex justify-center items-center font-bold text-xl py-5">
            Matched Users
          </h1>
          {matchedUserProfiles.map((profile) => (
            <div key={profile.id}>
              <h2 className="pl-10">
                {profile.firstName} {profile.lastName}
              </h2>
              <button className="px-4 py-2 bg-[#F65B5B] m-5" onClick={chat}>
                Chat
              </button>
            </div>
          ))}
          {showChat && (
            <Session
              appId="t5KYzY48"
              userId="sample_user_alice"
              syncUser={syncUser}>
              <Chatbox
                syncConversation={syncConversation}
                conversationId="sample_conversation"
                style={{ width: '100%', height: '500px' }}></Chatbox>
            </Session>
          )}
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Chat;
