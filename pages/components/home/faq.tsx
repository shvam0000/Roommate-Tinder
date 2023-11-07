import React from 'react';

const faq = [
  {
    question: 'What is Roommate Tinder?',
    answer:
      'Roommate Tinder is a web app that allows you to find your perfect roommate match. We use a complex algorithm to match you with the best possible roommate.',
  },
  {
    question: 'How do I sign up?',
    answer:
      'Simply click the Sign Up button on the top right of the page. Then, fill out the form with your information.',
  },
  {
    question: 'How do I find a roommate?',
    answer:
      'Once you have signed up, you will be able to fill out a form with your preferences. We will then match you with the best possible roommate.',
  },
];

const Faq = () => {
  return (
    <div className="bg-[#F65B5B] p-16 text-white">
      <h1 className="text-3xl font-bold py-8">Frequently Asked Questions</h1>
      <div className="flex justify-around">
        {faq.map((item) => {
          return (
            <div key={item.answer} className="px-2 text-justify max-w-sm">
              <h2 className="font-bold text-xl pb-2">{item.question}</h2>
              <p>{item.answer}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faq;
