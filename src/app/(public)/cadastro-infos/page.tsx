'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaImage } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../../assets/users.svg';

import '../../styles/LoveShare.css';
import useMercadoPago from '@/app/hooks/useMercadoPago';

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
  const [selectedPlan, setSelectedPlan] = useState<1 | 2>(1);

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();

    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) value = value.slice(0, 2) + '/' + value.slice(2);
    if (value.length > 5) value = value.slice(0, 5) + '/' + value.slice(5, 9);
    setRelationshipStart(value);
  };

  const { createMercadoPagoCheckout } = useMercadoPago()

  if (isMobile) {
    return (
      <div className="Page">
        <div className="Logo">💖Amora</div>

        <h2 className="Title">Compartilhe Seu<br /> AMOR</h2>

        {/* <div className="Card">
          <p className='card-txt'>1 ano, 1 foto e sem música</p>
          <p className='price'>R$ 9,99</p>
        </div>

        <div className="Card">
          <p className='card-txt'>Pra sempre, 5 fotos e com música</p>
          <p className='price'>R$ 29,99</p>
        </div> */}

        <div
          className={`Card${selectedPlan === 1 ? ' Card--selected' : ''}`}
          onClick={() => setSelectedPlan(1)} >
          <p className='card-txt'>1 ano, 1 foto e sem música</p>
          <p className='price'>R$ 9,99</p>
        </div>

        <div
          className={`Card${selectedPlan === 2 ? ' Card--selected' : ''}`}
          onClick={() => setSelectedPlan(2)} >
          <p className='card-txt'>Pra sempre, 5 fotos e com música</p>
          <p className='price'>R$ 29,99</p>
        </div>

        <div className="UploadBox">
          <div className="UploadIcon">
            {/* {imagePreview ? (
              <img src={imagePreview} alt="Upload Preview" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
            ) : ( */}
              <>
                <Image src={img1} alt="Upload" style={{ width: '45px', height: 'auto' }} />
                <div className='icone-adicionar-foto'>+</div>
              </>
            {/* )} */}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="Button"
            style={{
              display: 'inline-block',
              width: '100%',
              textAlign: 'center',
              padding: '12px 12px',
              border: 'none',
              borderRadius: '8px',
              // background: '#ff2e9e',
              color: '#fff',
              fontWeight: 600,
              fontSize: '16px',
              cursor: 'pointer'
            }}
          />
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
            {/* <FaCalendarAlt style={{ position: 'absolute', right: 10, top: 12 }} /> */}
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
              <img src={imagePreview} alt="Arte Preview" style={{ borderRadius: '8px' }} />
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

        <button
          className="Button"
          style={{ background: '#ff2e9e', marginTop: '20px', width: '100%' }}
          onClick={() => createMercadoPagoCheckout({
            id: 'gustavo.tn@outlook.com',
            email: 'gustavo.tn@outlook.com',
            items: [
              {
                id: '1',
                title: 'Plano 1 foto',
                quantity: 1,
                unit_price: 9.99,
              }
            ]
          })}
        >
          {/* <a href="/visualizar-site" style={{ color: '#fff', textDecoration: 'none' }}>
            CRIE MINHA PAGINA
          </a> */}
          CRIE MINHA PAGINA
        </button>
      </div>
    );
  }
  else {
    return (
      <div className='Page' style={{ padding: '2rem' }}>
        <div className="Logo">💖Amora</div>
        <h2 className="Title">Compartilhe Seu<br /> AMOR</h2>
        <div className="Page" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '3rem', padding: '20px' }}>
          <div className='sectionDesk' style={{ flex: 1 }}>

            <div className="UploadBox">
              <div className="UploadIcon">
                {/* {imagePreview ? (
                  <img src={imagePreview} alt="Upload Preview" style={{ width: '45px', height: '45px', borderRadius: '50%' }} />
                ) : ( */}
                  <>
                    <Image src={img1} alt="Upload" style={{ width: '45px', height: 'auto' }} />
                    <div className='icone-adicionar-foto'>+</div>
                  </>
                {/* )} */}
              </div>
              <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="Button"
              style={{
                display: 'inline-block',
                width: '100%',
                textAlign: 'center',
                padding: '12px 12px',
                border: 'none',
                borderRadius: '8px',
                // background: '#ff2e9e',
                color: '#fff',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer'
              }}
              />
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
              <div >
                <input
                  type='text'
                  placeholder="dd/mm/aaaa"
                  value={relationshipStart}
                  onChange={handleDateChange}
                // maxLength={10}
                />
                {/* <FaCalendarAlt style={{ position: 'absolute', right: 10, top: 12 }} /> */}
              </div>

              <p className='section-text'>Mensagem Fofa</p>
              <textarea
                placeholder="Mostre todo seu amor"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <div
                style={{ width: '47%', cursor: 'pointer' }}
                className={`Card${selectedPlan === 1 ? ' Card--selected' : ''}`}
                onClick={() => setSelectedPlan(1)}
              >
                <p className='card-txt'>1 ano, 1 foto e sem música</p>
                <p className='price'>R$ 9,99</p>
              </div>

              <div
                style={{ width: '47%', cursor: 'pointer' }}
                className={`Card${selectedPlan === 2 ? ' Card--selected' : ''}`}
                onClick={() => setSelectedPlan(2)}
              >
                <p className='card-txt'>Pra sempre, 5 fotos e com música</p>
                <p className='price'>R$ 29,99</p>
              </div>
            </div>



          </div>

          <div className='sectionDesk' style={{ flex: 1, display: 'flex', flexDirection: 'column', maxWidth: '30%' }}>
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
                  <img src={imagePreview} alt="Arte Preview" style={{  borderRadius: '8px' }} />
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

            <button
              className="Button"
              style={{ background: '#ff2e9e', width: '50%', margin: 'auto', marginTop: '1rem' }}
              onClick={() => createMercadoPagoCheckout({
                id: 'gustavo.tn@outlook.com',
                email: 'gustavo.tn@outlook.com',
                items: [
                  {
                    id: selectedPlan.toString(),
                    title: 'Plano 1 foto',
                    quantity: 1,
                    unit_price: 9.99,
                  }
                ]
              })}
            >
              CRIE MINHA PAGINA
              {/* <a href="/visualizar-site" style={{ color: '#fff', textDecoration: 'none' }}>
                      CRIE MINHA PAGINA
                    </a> */}
            </button>
          </div>
        </div>
      </div>

    );
  }


};

export default LoveSharePage;
