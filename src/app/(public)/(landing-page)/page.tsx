'use client';

import { useState, useEffect } from 'react';
import '../../styles/AmoraLandingPage.css';
import iconeLapis from '../../assets/icone-lapis.png';
import iconeDinheiro from '../../assets/icone-dinheiro.png';
import iconeEmail from '../../assets/icone-email.png';
import iconePresente from '../../assets/icone-presente.png';
import imgQrcode from '../../assets/img-qrcode.png';
import imgCell from '../../assets/img-cell.png';
import Image from 'next/image';


const AmoraLandingPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="amora-container">
        <div className="amora-logo">
          <span role="img" aria-label="amor">💖</span> Amora
        </div>

        <h2 className="amora-title">
          UM PRESENTE<br />
          <span className="amora-highlight">INOVADOR</span><br />
          PARA SEU <span className="amora-highlight">AMOR</span>
        </h2>

        <p className="amora-description">
          Um site personalizado com o tempo do seu relacionamento, uma foto com seu amor e até uma música exclusiva.
        </p>

        <button className="amora-button">
           <a href="/Main" style={{ color: '#fff', textDecoration: 'none' }}>
            CRIE MINHA PAGINA
          </a>
        </button>

        <div className="amora-qrcode-section">
          <Image src={imgQrcode} alt="Upload" style={{ width: '200px', height: 'auto' }} />

          </div>

          <h2 className="amora-como-titulo">
            COMO FUNCIONA <span className="amora-como-seta">↷</span>
          </h2>

          <div className="amora-etapa">
            <Image src={iconeLapis} alt="Upload" style={{ width: '100px', height: 'auto' }} />

              <strong>CRIE</strong>
              <p>Informe os dados do seu relacionamento</p>
          </div>

          <div className="amora-etapa">
            <Image src={iconeDinheiro} alt="Upload" style={{ width: '100px', height: 'auto' }} />

              <strong>PAGUE</strong>
              <p>Pagamento simples via PIX</p>
          </div>

          <div className="amora-etapa">
            {/* <div className="amora-etapa-icone">📧</div> */}
             <Image src={iconeEmail} alt="Upload" style={{ width: '100px', height: 'auto' }} />
            
              <strong>RECEBA</strong>
              <p>Receba via e-mail um link exclusivo e um QR Code para acesso</p>
          </div>

          <div className="amora-etapa">
            <Image src={iconePresente} alt="Upload" style={{ width: '100px', height: 'auto' }} />

              <strong>PRESENTE</strong>
              <p>Encante seu amor da melhor forma</p>
          </div>
  
      </div>
    );
  } else {
    return (
      <div className="amora-hero-desktop">
        <header className="amora-header">
          {/* <div className="amora-social">
            <a href="#"><img src="/icons/instagram.svg" alt="Instagram" /></a>
            <a href="#"><img src="/icons/facebook.svg" alt="Facebook" /></a>
          </div> */}
          <h1 className="amora-logo">💝 Amora</h1>
        </header>

        <div className="amora-conteudo">
          <div className="amora-texto section1-desk">
            <h2>
              UM PRESENTE <span className="destaque">INOVADOR</span><br />
              PARA SEU <span className="destaque">AMOR</span>
            </h2>
            <button className="amora-btn-principal"> 
              <a href="/cadastro-infos" style={{ color: '#fff', textDecoration: 'none' }}>
            CRIE MINHA PAGINA
            </a>
            </button>
          </div>

          <div className="amora-imagem-centro section1-desk">
            <Image src={imgCell} alt="Upload" style={{ height: 'auto' }} />
          </div>

          <div className="amora-qr section1-desk">
            <Image src={imgQrcode} alt="Upload" style={{ height: 'auto' }} />
            <button className="amora-btn-secundario">COMO FUNCIONA</button>
          </div>
        </div>
      </div>
      )
      

  }
};

export default AmoraLandingPage;
