import { FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-[#F65B5B] py-16">
      <div className="flex justify-around">
        <h1 className="text-white text-xl">
          © 2023 Roommate Tinder. All Rights Reserved
        </h1>
        <div className="flex">
          <figure className="px-2 text-4xl text-blue-700">
            <FaFacebook />
          </figure>
          <figure className="px-2 text-4xl">
            <FaGithub />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default Footer;
