import React from 'react';
import { Faq, Team } from '.';
import man from '@/utils/images/man.png';
import sec2 from '@/utils/images/sec2.png';
import Image from 'next/image';

const Hero = () => {
  return (
    <div>
      <div className="flex justify-around items-center py-10">
        <div>
          <h1 className="text-5xl font-bold mb-10">
            Find the Perfect Roommate
          </h1>
          <button className="bg-[#F65B5B] px-10 py-2 rounded-3xl text-white text-md">
            Get Started
          </button>
        </div>
        <figure>
          <Image src={man} alt="hero" className="w-full" />
        </figure>
      </div>
      <Faq />
      <Team />
    </div>
  );
};

export default Hero;
