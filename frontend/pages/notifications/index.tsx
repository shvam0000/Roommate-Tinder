import { ProtectedRoute } from '@/components/auth';
import { Layout } from '@/layout';
import React from 'react';
import dislike from '@/utils/images/dislike.png';
import like from '@/utils/images/like.png';
import man2 from '@/utils/images/man2.png';
import Image from 'next/image';
import Link from 'next/link';

const Notifications = () => {
  return (
    <Layout>
      <ProtectedRoute>
        <div className="flex justify-center items-center">
          <div className="bg-[#f8caca] rounded-lg">
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
            <h1 className="text-2xl font-bold">Sam, 28</h1>
            <ul className="text-lg font-medium">
              <li className="list-disc">Student at Columbia University</li>
              <li className="list-disc">No Smoking, No Drinking</li>
              <li className="list-disc">No Pets</li>
              <li className="list-disc">Loves to Cook</li>
            </ul>
          </div>
        </div>
      </ProtectedRoute>
    </Layout>
  );
};

export default Notifications;
