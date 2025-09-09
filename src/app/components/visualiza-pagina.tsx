'use client';

import { FaCalendarAlt } from 'react-icons/fa';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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

  const date = new Date(isoString).toLocaleDateString('pt-BR', {
    timeZone: 'UTC'
  });
  
  return date;
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
    const [coupleImages, setCoupleImages] = useState<string[]>([]);
    const [message, setMessage] = useState<string>('');
  const [relationshipTime, setRelationshipTime] = useState<string>('');
  const [now, setNow] = useState(new Date());
    const [date1, setDate1] = useState<string>('');
    const [timeTogether, setTimeTogether] = useState<any>(null);

    useEffect(() => {
    fetch(`/api/pages/${slug}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setDate1(formatDate(data.startedAt));
        setMusic(data.musicUrl);
        setCoupleImages([
          data.coupleImage1Url,
          data.coupleImage2Url,
          data.coupleImage3Url,
          data.coupleImage4Url,
          data.coupleImage5Url,
        ].filter(Boolean));
        setRelationshipTime(data.startedAt);
        setMessage(data.message || '');
        // Calcule o tempo juntos
        const time = calculateTimeTogether(formatDate(data.startedAt));
        setTimeTogether(time);
      });
  }, [slug]);


  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
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
                {coupleImages.length > 0 ? (
                  <div style={{ width: 250, margin: 'auto' }}>
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop
                      className="carousel"
                    >
                      {coupleImages.map((src, idx) => (
                        <div key={idx}>
                          <img
                            src={src}
                            alt={`Foto ${idx + 1}`}
                            style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                ) : (
                  <div style={{ width: 250, margin: 'auto', height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222', borderRadius: 8 }}>
                    <span style={{ color: '#aaa' }}>Sem foto</span>
                  </div>
                )}
            </div>
            <div className="my-5 text-sm">
                {message}
            </div>
            <div className="my-5 text-sm">
                Juntos há
                {timeTogether ? (
                  <div className="mt-1 font-bold flex items-center justify-center gap-2">
                    {timeTogether.years} anos {timeTogether.months} meses {timeTogether.days} dias {now.getHours()}  horas, {now.getMinutes()} minutos, {now.getSeconds()} segundos 
                    <span style={{ marginLeft: 8, fontWeight: 'normal', fontSize: 14, color: '#aaa' }}>
                      {/* {now.getHours()} horas, {now.getMinutes()} minutos, {now.getSeconds()} segundos */}
                    </span>
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