'use client';

import { useState, useEffect } from 'react';
import { FaCalendarAlt, FaImage } from 'react-icons/fa';
import Image from 'next/image';
import img1 from '../../assets/users.svg';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
  const [music, setMusic] = useState('');
  const [timeTogether, setTimeTogether] = useState<{ years: number; months: number; days: number } | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<1 | 2>(1);
  
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [carouselIndex, setCarouselIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    const time = calculateTimeTogether(relationshipStart);
    setTimeTogether(time);
  }, [relationshipStart]);

  // Atualiza previews quando imagens mudam
  useEffect(() => {
    if (imageFiles.length === 0) {
      setImagePreviews([]);
      setCarouselIndex(0);
      return;
    }
    const readers = imageFiles.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });
    Promise.all(readers).then(setImagePreviews);
  }, [imageFiles]);

  // Handler para upload de imagens
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (selectedPlan === 2) {
      // até 5 imagens
      setImageFiles(prev => [...prev, ...files].slice(0, 5));
    } else {
      // só 1 imagem
      setImageFiles(files.slice(0, 1));
    }
  };

  const handleCoupleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const originalText = e.target.value;
    const formattedText = originalText.replace(/\s+/g, '-');
    setCoupleName(formattedText);
  };

  // Navegação do carrossel
  const nextImage = () => setCarouselIndex((prev) => (prev + 1) % imagePreviews.length);
  const prevImage = () => setCarouselIndex((prev) => (prev - 1 + imagePreviews.length) % imagePreviews.length);

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

  // Função para validar e-mail simples
  function validateEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  if (isMobile) {
    return (
      <div className="Page">
        <div className="Logo">💖Amora</div>

        <h2 className="Title">Compartilhe Seu<br /> AMOR</h2>

        <div className={`Card${selectedPlan === 1 ? ' Card--selected' : ''}`}
          onClick={() => {
            setSelectedPlan(1);
            setImagePreviews([]);
            setImageFiles([]); // Limpa as imagens ao mudar de plano
          }}
           >
          <p className='card-txt'>1 ano, 1 foto e sem música</p>
          <p className='price'>R$ 9,99</p>
        </div>

        <div className={`Card${selectedPlan === 2 ? ' Card--selected' : ''}`}
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
            multiple={selectedPlan === 2}
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
            onChange={handleCoupleNameChange}
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

        {selectedPlan === 2 && (
          <>
            <p className='section-text'>Link da musica (youtube)</p>
              <input
              type='text'
              placeholder="link da música"
              value={music}
              onChange={(e) => setMusic(e.target.value)}
              />
          </>
        )}

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
            {imagePreviews.length > 0 ? (
              <div style={{ width: 180, margin: 'auto' }}>
                <Carousel
                  showThumbs={false}
                  showStatus={false}
                  showArrows={false}
                  infiniteLoop
                  selectedItem={carouselIndex}
                  onChange={setCarouselIndex}
                  className='carousel'
                >
                  {imagePreviews.map((src, idx) => (
                    <div key={idx}>
                      <img
                        src={src}
                        alt={`Arte Preview ${idx + 1}`}
                        style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
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

        {/* Modal para confirmação de e-mail */}
        {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div
              style={{
                background: 'rgb(25 25 25)',
                padding: 32,
                borderRadius: 16,
                minWidth: 320,
                maxWidth: 360,
                boxShadow: '0 2px 16px #0002',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div className="Logo" style={{ fontSize: 32, marginBottom: 8, color: '#fff' }}>💖Amora</div>
              <h3 style={{ color: '#fff', marginBottom: 16, fontWeight: 700, fontSize: 20 }}>
                Digite seu e-mail
              </h3>
              <input
                type="email"
                placeholder="seu@email.com"
                value={inputEmail}
                onChange={e => {
                  setInputEmail(e.target.value);
                  setEmailError('');
                }}
                style={{
                  width: '90%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginBottom: 12,
                  fontSize: 16,
                  outline: 'none'
                }}
              />
              {emailError && (
                <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{emailError}</div>
              )}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                <button
                  className="Button"
                  style={{
                    background: '#ff2e9e',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: validateEmail(inputEmail) ? 'pointer' : 'not-allowed',
                    opacity: validateEmail(inputEmail) ? 1 : 0.7,
                    transition: 'opacity 0.2s'
                  }}
                  disabled={!validateEmail(inputEmail)}
                  onClick={async () => {
                    if (!validateEmail(inputEmail)) {
                      setEmailError('Digite um e-mail válido');
                      return;
                    }

                    // Monta os dados para enviar ao backend
                    const pageData = {
                      email: inputEmail,
                      title: coupleName,
                      message: message,
                      musicUrl: music,
                      startedAt: relationshipStart, // ajuste se necessário para o formato esperado
                      planId: selectedPlan.toString(),
                      paid: false
                    };

                    try {
                      // Chama o backend para criar a página
                      const response = await fetch('/api/pages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pageData)
                      });
                      const { pageId } = await response.json();

                      console.log('Página criada com sucesso:', pageId);

                      setShowModal(false);

                      // Agora chama o checkout com o id retornado
                      createMercadoPagoCheckout({
                        id: pageId.toString(),
                        email: inputEmail.toString(),
                        planId: selectedPlan.toString()
                      });
                    } catch (err) {
                      setEmailError('Erro ao criar página. Tente novamente.');
                    }
                  }}
                >
                  Continuar
                </button>
                <button
                  className="Button"
                  style={{
                    background: '#eee',
                    color: '#333',
                    padding: '10px 24px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          className="Button"
          style={{ background: '#ff2e9e', marginTop: '20px', width: '100%' }}
          onClick={() => setShowModal(true)}
        >
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
                <Image src={img1} alt="Upload" style={{ width: '45px', height: 'auto' }} />
                <div className='icone-adicionar-foto'>+</div>  
              </div>

              <input
              type="file"
              accept="image/*"
              multiple={selectedPlan === 2}
              onChange={handleImageChange}
              className="Button"
              style={{
                display: 'inline-block',
                width: '100%',
                textAlign: 'center',
                padding: '12px 12px',
                border: 'none',
                borderRadius: '8px',
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
                onChange={handleCoupleNameChange}
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
              </div>

              <p className='section-text'>Mensagem Fofa</p>
              <textarea
                placeholder="Mostre todo seu amor"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

               {selectedPlan === 2 && (
                  <>
                    <p className='section-text'>Link da musica (youtube)</p>
                      <input
                      type='text'
                      placeholder="link da música"
                      value={music}
                      onChange={(e) => setMusic(e.target.value)}
                      />
                  </>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

              <div style={{ width: '47%', cursor: 'pointer' }}
                className={`Card${selectedPlan === 1 ? ' Card--selected' : ''}`}
                onClick={() => setSelectedPlan(1)}
              >
                <p className='card-txt'>1 ano, 1 foto e sem música</p>
                <p className='price'>R$ 9,99</p>
              </div>

              <div style={{ width: '47%', cursor: 'pointer' }}
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
                {imagePreviews.length > 0 ? (
                  <div style={{ width: 180, margin: 'auto' }}>
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      // showArrows={false}
                      infiniteLoop
                      selectedItem={carouselIndex}
                      onChange={setCarouselIndex}
                      className='carousel'
                    >
                      {imagePreviews.map((src, idx) => (
                        <div key={idx}>
                          <img
                            src={src}
                            alt={`Arte Preview ${idx + 1}`}
                            style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
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

            {showModal && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000
            }}
          >
            <div
              style={{
                background: 'rgb(25 25 25)',
                padding: 32,
                borderRadius: 16,
                minWidth: 320,
                maxWidth: 360,
                boxShadow: '0 2px 16px #0002',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div className="Logo" style={{ fontSize: 32, marginBottom: 8, color: '#fff' }}>💖Amora</div>
              <h3 style={{ color: '#fff', marginBottom: 16, fontWeight: 700, fontSize: 20 }}>
                Digite seu e-mail
              </h3>
              <input
                type="email"
                placeholder="seu@email.com"
                value={inputEmail}
                onChange={e => {
                  setInputEmail(e.target.value);
                  setEmailError('');
                }}
                style={{
                  width: '90%',
                  padding: 12,
                  borderRadius: 8,
                  border: '1px solid #ccc',
                  marginBottom: 12,
                  fontSize: 16,
                  outline: 'none'
                }}
              />
              {emailError && (
                <div style={{ color: 'red', fontSize: 13, marginBottom: 8 }}>{emailError}</div>
              )}
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 12 }}>
                <button
                  className="Button"
                  style={{
                    background: '#ff2e9e',
                    color: '#fff',
                    padding: '10px 24px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: validateEmail(inputEmail) ? 'pointer' : 'not-allowed',
                    opacity: validateEmail(inputEmail) ? 1 : 0.7,
                    transition: 'opacity 0.2s'
                  }}
                  disabled={!validateEmail(inputEmail)}
                  onClick={async () => {
                    if (!validateEmail(inputEmail)) {
                      setEmailError('Digite um e-mail válido');
                      return;
                    }

                    // Monta os dados para enviar ao backend
                    const pageData = {
                      email: inputEmail,
                      title: coupleName,
                      message: message,
                      musicUrl: music,
                      startedAt: relationshipStart, // ajuste se necessário para o formato esperado
                      planId: selectedPlan.toString(),
                      paid: false
                    };

                    try {
                      // Chama o backend para criar a página
                      const response = await fetch('/api/pages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(pageData)
                      });
                      const { pageId } = await response.json();

                      console.log('Página criada com sucesso:', pageId);
                      setShowModal(false);

                      // Agora chama o checkout com o id retornado
                      createMercadoPagoCheckout({
                        id: pageId.toString(),
                        email: inputEmail.toString(),
                        planId: selectedPlan.toString()
                      });
                    } catch (err) {
                      setEmailError('Erro ao criar página. Tente novamente.');
                    }
                  }}
                >
                  Continuar
                </button>
                <button
                  className="Button"
                  style={{
                    background: '#eee',
                    color: '#333',
                    padding: '10px 24px',
                    borderRadius: 8,
                    border: 'none',
                    fontWeight: 600,
                    fontSize: 16,
                    cursor: 'pointer'
                  }}
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}

            <button
              className="Button"
              style={{ background: '#ff2e9e', width: '50%', margin: 'auto', marginTop: '1rem' }}
              onClick={() => setShowModal(true)}
            >
              CRIE MINHA PAGINA
            </button>
          </div>
        </div>
      </div>

    );
  }


};

export default LoveSharePage;
