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

function formatDate(isoString: string | null): string {
  if (!isoString) return '';
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateTimeTogether(startDateStr: string) {
  if (!startDateStr) return null;

  const parts = startDateStr.split('/');
  if (parts.length !== 3) return null;

  const [day, month, year] = parts.map(Number);
  const startDate = new Date(year, month - 1, day);
  const now = new Date();

  if (isNaN(startDate.getTime())) return null;

  const diffMs = now.getTime() - startDate.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffYears = Math.floor(diffDays / 365);
  const diffMonths = Math.floor((diffDays % 365) / 30);
  const remainingDays = diffDays - diffYears * 365 - diffMonths * 30;

  return { years: diffYears, months: diffMonths, days: remainingDays };
}

interface VisualizarPaginaProps {
    slug: string
}

const VisualizarPagina = ({ slug }: VisualizarPaginaProps) => {
    const [title, setTitle] = useState<string | null>(null);
    const [music, setMusic] = useState<string | null>(null);
    const [coupleImage, setCoupleImage] = useState<any>(img1);
    const [message, setMessage] = useState<string>('');
    const [relationshipTime, setRelationshipTime] = useState<string>('');
    // const [relationshipHour, setRelationshipHour] = useState<string>('');
    const [date1, setDate1] = useState<string>('');
    // const [date2, setDate2] = useState<string>('');
    const [timeTogether, setTimeTogether] = useState<any>(null);
    const [seconds, setSeconds] = useState(1200);

    useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDate1(formatDate(data.startedAt));
        setMusic(data.musicUrl);
        setCoupleImage(data.coupleImage1Url || img1);
        setRelationshipTime(data.startedAt);
        setMessage(data.message || '');
        // Calcule o tempo juntos
        const time = calculateTimeTogether(formatDate(data.startedAt));
        setTimeTogether(time);
      });
  }, [slug]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

    return (
        <div className="bg-neutral-900 text-white min-h-screen p-5 font-sans text-center">
            <div className="italic flex items-center justify-center mb-2">
                💖Amora
            </div>

            <h1 style={{ fontSize: 24, fontWeight: 'bold' }} className="font-normal my-2">
                {title}
            </h1>
            {music && (
                <div className="bg-neutral-800 rounded-lg p-2 my-5 inline-block">
                    <iframe
                        width="240"
                        height="150"
                        src={youtubeToEmbed(music)}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    ></iframe>
                        
               </div>
            )}
            <div className="my-5">
                <Image
                    src={coupleImage}
                    alt="Casal"
                    unoptimized
                    width={400}
                    height={300}
                    className="w-full max-w-[250px] rounded-xl my-5 mx-auto"
                />
            </div>
            <div className="my-5 text-sm">
                {message}
            </div>
            <div className="my-5 text-sm">
                Juntos há
                {timeTogether ? (
              <div className="mt-1 font-bold flex items-center justify-center gap-2">
                {timeTogether.years} anos {timeTogether.months} meses {timeTogether.days} dias {seconds} segundos
              </div>
            ) : (
              <div className="mt-1 font-bold">--</div>
            )}
            </div>

            <div className="flex justify-around mt-5">
                <div className="flex items-center border border-purple-500 rounded-lg p-2 text-sm">
                    <FaCalendarAlt className="mr-1" />
                    {date1}
                </div>
            </div>

            
        </div>
    );
}

export default VisualizarPagina;