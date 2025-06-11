'use client';

import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../assets/img1.png';
import { useState, useEffect } from 'react';

function youtubeToEmbed(url: string): string {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
  }
  return '';
}

interface VisualizarPaginaProps {
    slug: string
}

const VisualizarPagina = ({ slug }: VisualizarPaginaProps) => {
    const [music, setMusic] = useState<string | null>(null);
    const [coupleImage, setCoupleImage] = useState<any>(img1);
    const [relationshipTime, setRelationshipTime] = useState<string>('');
    // const [relationshipHour, setRelationshipHour] = useState<string>('');
    const [date1, setDate1] = useState<string>('');
    // const [date2, setDate2] = useState<string>('');

    useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then(res => res.json())
      .then(data => {
        console.log('data', data);
        setMusic(data.musicUrl);
        setCoupleImage(data.coupleImage || img1);
        setRelationshipTime(data.startedAt);
        // setRelationshipHour(data.relationshipHour);
        // setDate1(data.date1);
        // setDate2(data.date2);
      });
  }, []);

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
                {music && (
                    <iframe
                        width="240"
                        height="150"
                        src={youtubeToEmbed(music)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                )}
            </div>

            <div className="my-5">
                <Image
                    src={coupleImage}
                    alt="Casal"
                    className="w-full max-w-[250px] rounded-xl my-5 mx-auto"
                />
            </div>

            <div className="my-5 text-sm">
                Juntos há
                <div className="mt-1 font-bold">{relationshipTime}</div>
                {/* <div className="font-bold">{relationshipHour}</div> */}
            </div>

            <div className="flex justify-around mt-5">
                <div className="flex items-center border border-purple-500 rounded-lg p-2 text-sm">
                    <FaCalendarAlt className="mr-1" />
                    {date1}
                </div>
                {/* <div className="flex items-center border border-purple-500 rounded-lg p-2 text-sm">
          <FaCalendarAlt className="mr-1" />
          {date2}
        </div> */}
            </div>
        </div>
    );
}

export default VisualizarPagina;