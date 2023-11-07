const team = [
  {
    name: 'Shivam Shekhar',
    imgurl: 'https://avatars.githubusercontent.com/u/32397288?v=4',
  },
  {
    name: 'Shivam Shekhar',
    imgurl: 'https://avatars.githubusercontent.com/u/32397288?v=4',
  },
  {
    name: 'Shivam Shekhar',
    imgurl: 'https://avatars.githubusercontent.com/u/32397288?v=4',
  },
  {
    name: 'Shivam Shekhar',
    imgurl: 'https://avatars.githubusercontent.com/u/32397288?v=4',
  },
];

const Team = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h1 className="text-3xl font-bold py-5">Our Team</h1>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-4 gap-10 py-5">
          {team.map((member) => (
            <div
              key={member.name}
              className="flex flex-col justify-around items-center">
              <img
                className="rounded-full w-24 h-24"
                src={member.imgurl}
                alt={member.name}
              />
              <h1 className="text-lg font-bold">{member.name}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
