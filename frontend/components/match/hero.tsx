//@ts-nocheck
import man2 from '@/utils/images/man2.png';
import Image from 'next/image';
import dislike from '@/utils/images/dislike.png';
import like from '@/utils/images/like.png';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSpring, animated } from 'react-spring';

const Hero = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const fadeAnimation = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });

  const slideAnimation = useSpring({
    transform: 'translateX(0%)',
    from: { transform: 'translateX(-100%)' },
  });

  const handleLike = (userId) => {
    axios
      .post(
        'https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/like',
        {
          id: localStorage.getItem(
            'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
          ),
          likedUserId: userId,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success('Liked!');
        // Move to the next user
        setCurrentUserIndex((prevIndex) =>
          prevIndex + 1 < users.length ? prevIndex + 1 : prevIndex
        );
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  const handleDislike = (userId) => {
    axios
      .post(
        'https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/dislike',
        {
          id: localStorage.getItem(
            'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
          ),
          dislikedUserId: userId,
        }
      )
      .then((res) => {
        console.log(res.data);
        toast.success('Disliked!');
        // Move to the next user
        setCurrentUserIndex((prevIndex) =>
          prevIndex + 1 < users.length ? prevIndex + 1 : prevIndex
        );
      })
      .catch((err) => {
        toast.error(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem(
      'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
    );

    axios
      .post(
        `https://yclsvhn0s1.execute-api.us-east-1.amazonaws.com/roommate-tinder/allusers?id=${id}`,
        {
          queryStringParameters: {
            id: localStorage.getItem(
              'CognitoIdentityServiceProvider.va7i8r6ptmr6roqha7m6v09ke.LastAuthUser'
            ),
          },
        }
      )
      .then((res) => {
        setUsers(res.data.body.matches); // Updated to use res.data directly
        console.log(res.data.body.matches);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div className="p-10">
        {loading ? (
          <div className="h-screen w-screen flex justify-center items-center text-2xl">
            Loading...
          </div>
        ) : (
          users?.length > 0 && (
            <animated.div style={fadeAnimation}>
              <animated.div style={slideAnimation}>
                <div key={users[currentUserIndex].metadata.id}>
                  <div className="bg-[#f8caca] mx-auto p-10 rounded-lg">
                    <figure className="flex justify-center">
                      <Image src={man2} alt="man2" />
                    </figure>
                    <div className="flex justify-center">
                      <Link href="/match">
                        <figure
                          className="px-2 py-2"
                          onClick={() =>
                            handleDislike(users[currentUserIndex].metadata.id)
                          }>
                          <Image src={dislike} alt="dislike" />
                        </figure>
                      </Link>
                      <Link href="/match">
                        <figure
                          className="px-2 py-2"
                          onClick={() =>
                            handleLike(users[currentUserIndex].metadata.id)
                          }>
                          <Image src={like} alt="like" />
                        </figure>
                      </Link>
                    </div>
                    <h1 className="text-2xl font-bold">
                      {users[currentUserIndex].metadata.firstName},{' '}
                      {users[currentUserIndex].metadata.age},{' '}
                      {users[currentUserIndex].metadata.gender}
                    </h1>
                    <ul className="text-lg font-medium">
                      <li className="list-disc">
                        Interests: {users[currentUserIndex].metadata.interests}
                      </li>
                      <li className="list-disc">
                        MinPrice: ${users[currentUserIndex].metadata.minPrice}
                      </li>
                      <li className="list-disc">
                        MaxPrice: ${users[currentUserIndex].metadata.maxPrice}
                      </li>
                      <li className="list-disc">
                        Area: {users[currentUserIndex].metadata.area}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.morningPerson ===
                        'false'
                          ? 'Evening Person'
                          : 'Morning Person'}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.smoking === 'false'
                          ? 'Does not smoke'
                          : 'Smoker'}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.drinking !== 'false'
                          ? 'Drinker'
                          : 'Does not drink'}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.clean !== 'false'
                          ? 'Clean'
                          : 'Messy'}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.pets !== 'false'
                          ? 'Has pets'
                          : 'No pets'}
                      </li>
                      <li className="list-disc">
                        {users[currentUserIndex].metadata.vegetarian !== 'false'
                          ? 'Vegetarian'
                          : 'Non vegetarian'}
                      </li>
                    </ul>
                  </div>
                </div>
              </animated.div>
            </animated.div>
          )
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Hero;
