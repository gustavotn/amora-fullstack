'use client';

import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../../assets/img1.png';

const RelationshipPage = () => {
  return (
    <div className="bg-neutral-900 text-white min-h-screen p-5 font-sans text-center">
      <div className="italic flex items-center justify-center mb-2">
        💖Amora
      </div>

      <h3 className="font-normal my-2">
        Vamos para o segundo ano <br /> 
        <span className="font-bold">juntos</span>
      </h3>

      <div className="bg-neutral-800 rounded-lg p-2 my-5 inline-block">
        {/* Pode colocar um player real ou manter como ilustração */}
        <iframe 
          width="240" 
          height="150" 
          src="https://www.youtube.com/embed/WC-iBaKL59Q?autoplay=1&si=pb0PIzJCNwidt2--" 
          title="YouTube video player" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        ></iframe>
      </div>

      <div className="my-5">
        <Image 
          src={img1} 
          alt="Casal" 
          className="w-full max-w-[250px] rounded-xl my-5 mx-auto" 
        />
      </div>

      <div className="my-5 text-sm">
        Juntos há
        <div className="mt-1 font-bold">1 anos, 11 meses, 29 dias</div>
        <div className="font-bold">8 horas, 54 segundos</div>
      </div>

      <div className="flex justify-around mt-5">
        <div className="flex items-center border border-purple-500 rounded-lg p-2 text-sm">
          <FaCalendarAlt className="mr-1" />
          23/08/2022
        </div>
        <div className="flex items-center border border-purple-500 rounded-lg p-2 text-sm">
          <FaCalendarAlt className="mr-1" />
          23/08/2021
        </div>
      </div>
    </div>
  );
};

export default RelationshipPage;
