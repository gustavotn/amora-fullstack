'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaImage } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../../assets/users.svg';

import '../../styles/LoveShare.css';

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

const LoveSharePage = () => {
  const [coupleName, setCoupleName] = useState('');
  const [relationshipStart, setRelationshipStart] = useState('');
  const [message, setMessage] = useState('');
  const [timeTogether, setTimeTogether] = useState<{ years: number; months: number; days: number } | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const time = calculateTimeTogether(relationshipStart);
    setTimeTogether(time);
  }, [relationshipStart]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    setRelationshipStart(value);
  };

  return (
    <div className="Page">
      <div className="Logo">💖Amora</div>

      <h2 className="Title">Compartilhe Seu<br /> AMOR</h2>

      <div className="Card">
        <p className='card-txt'>1 ano, 1 foto e sem música</p>
        <p className='price'>R$ 9,99</p>
      </div>

      <div className="Card">
        <p className='card-txt'>Pra sempre, 5 fotos e com música</p>
        <p className='price'>R$ 29,99</p>
      </div>

      <div className="UploadBox">
        <div className="UploadIcon">
          {imagePreview ? (
            <img src={imagePreview} alt="Upload Preview" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
          ) : (
            <>
              <Image src={img1} alt="Upload" style={{ width: '45px', height: 'auto' }} />
              <div className='icone-adicionar-foto'>+</div>
            </>
          )}
        </div>
        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} id="fileInput" />
        <label htmlFor="fileInput">
          <button className="Button">Escolha a foto</button>
        </label>
      </div>

      <div className='section'>
        <p className='section-text'>Nome do casal</p>
        <input
          type='text'
          placeholder="Jorge e Jorgina (Sem Emojis)"
          value={coupleName}
          onChange={(e) => setCoupleName(e.target.value)}
        />

        <p className='section-text'>Início do Relacionamento</p>
        <div style={{ position: 'relative' }}>
          <input
            type='text'
            placeholder="dd/mm/aaaa"
            value={relationshipStart}
            onChange={handleDateChange}
            maxLength={10}
          />
          <FaCalendarAlt style={{ position: 'absolute', right: 10, top: 12 }} />
        </div>

        <p className='section-text'>Mensagem Fofa</p>
        <textarea
          placeholder="Mostre todo seu amor"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>

      <h4 className='titulo-4'>VEJA SUA OBRA DE ARTE</h4>

      <div className="PreviewCard">
        <div style={{ fontSize: '20px', marginBottom: '10px' }}>💕</div>

        <input
          className='arte-nomes'
          type='text'
          readOnly
          value={`amora.com-${coupleName.toLowerCase().replace(/\s+/g, '-')}`}
          placeholder="amora.com-jorge-e-jorgina"
        />

        <div className='preview-arte'>
          {imagePreview ? (
            <img src={imagePreview} alt="Arte Preview" style={{ width: '100px', height: '100px', borderRadius: '8px' }} />
          ) : (
            <FaImage size={48} />
          )}
        </div>

        <div>Juntos há</div>
        <div style={{ fontWeight: 'bold', margin: '10px 0', fontSize: '14px' }}>
          {timeTogether ? (
            <p>
              {timeTogether.years} anos, {timeTogether.months} meses, {timeTogether.days} dias
            </p>
          ) : (
            <p>--</p>
          )}
        </div>

        <hr className="Divider" />

        <div>{message ? message : '*Mensagem'}</div>
      </div>

      <button className="Button" style={{ background: '#ff2e9e', marginTop: '20px' }}>
        <a href="/visualizar-site" style={{ color: '#fff', textDecoration: 'none' }}>
          CRIE MINHA PAGINA
        </a>
      </button>
    </div>
  );
};

export default LoveSharePage;
