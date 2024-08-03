

import Image from "next/image";

interface CardProps {
  background: {
    image: string;
    description: string;
    title: string;
    cta: string;
   tamplate: string;
  };
}

const Card: React.FC<CardProps> = ({ background }) => {
  const { image, description, title, cta, tamplate } = background;
  const width = 250; // Default width
  const height = 200; // Default height

  return (
    <div
      style={{ background: `url(${tamplate})` }}
      className="lg:h-[380px] h-[380px] bg-cover bg-center rounded-lg mx-2"
    >
      <div className="lg:flex lg:gap-24 lg:px-4 grid-cols-1">
        <div className="w-full lg:w-1/2 lg:mt-24">
          <h1
            className="text-center text-xl lg:text-2xl font-bold text-blue-800 bg-white py-3
             rounded-se-2xl px-2 shadow-gray-300 shadow-xl"
          >
            {title}
          </h1>
          <p className="py-6 text-xl lg:text-start text-center font-bold">
            {description}
          </p>
          <button
            className="px-3 py-1 ml-24 md:ml-32 lg:ml-0 lg:px-5 lg:py-2 rounded-xl 
            bg-gradient-to-r from-indigo-800 via-blue-600 to-blue-400 text-white"
          >
            {cta}
          </button>
        </div>
        <div className="lg:mt-20 mt-4 md:mt-3">
          <Image
            src={image}
            alt="image"
            width={width}
            height={height}
            className="rounded-e-badge shadow-2xl shadow-slate-600  border-gray-800 ml-20 md:ml-28 lg:ml-0 w-[170px] h-[150px]"
            
          />
        </div>
      </div>
    </div>
  );
};

export default Card;