import React from 'react';
import man from '@/utils/images/man.png';
import Image from 'next/image';

const chat = [
  {
    name: 'Sam',
    imgUrl: man,
    lastMsg: 'Hey, how are you?',
  },
  {
    name: 'Sam1',
    imgUrl: man,
    lastMsg: 'Hey, how are you?',
  },
  {
    name: 'Sam2',
    imgUrl: man,
    lastMsg: 'Hey, how are you?',
  },
];

const ChatList = () => {
  return (
    <div className="w-3/12">
      <div className="bg-[#F65B5B] flex items-center">
        <figure>
          <Image src={man} alt="hero" height={100} width={100} />
        </figure>
        <h1 className="text-xl font-bold text-white px-5">My Profile</h1>
      </div>
      <div>
        {chat.map((chat) => (
          <div key={chat.name} className="flex justify-between p-5 border-b-2">
            <div className="flex">
              <figure>
                <Image src={chat.imgUrl} alt="hero" height={50} width={50} />
              </figure>
              <div className="pl-5">
                <h1 className="text-xl font-bold">{chat.name}</h1>
                <p>{chat.lastMsg}</p>
              </div>
            </div>
            <div className="flex">
              <p>2:30 PM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
