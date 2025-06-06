'use client'

import React from 'react';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// SDK do Mercado Pago
import { MercadoPagoConfig, Preference } from 'mercadopago';
// Adicione credenciais
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7904086990453799-060520-980915c2e0612c660abca501bfa46b2f-352725852' });
// crie uma funcao para chamar o preference
// e criar uma preferência de pagamento
export const Main = async () => {
  const preference = new Preference(client);

 const response = await preference.create({
      body: {
        items: [
          {
            id: '1',
            title: 'Plano 1 foto',
            quantity: 1,
            unit_price: 9,
          },
          {
            id: '2',
            title: 'Plano 5 foto',
            quantity: 1,
            unit_price: 29,
          }
        ],
        back_urls: {
          success: 'https://amora-pi.vercel.app/',
          failure: 'https://amora-pi.vercel.app/',
          pending: 'https://amora-pi.vercel.app/'
        },
      }
    });
    // O id da preferência está em response.id
    return response;


}


// Inicialize o Mercado Pago com seu Public Key
initMercadoPago('APP_USR-e252c7a6-2061-4dc6-8387-ed1e69ccfa5e');
const a = Main()
console.log(a,"a")
const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
  
      <h1>Botão de Pagamento</h1>
      <p>Clique no botão para realizar o pagamento.</p>
      {/* Renderize o botão de pagamento */}
      <div style={{ width: '300px' }}>
        <Wallet initialization={{ preferenceId: '352725852-14ee85f8-1ce2-474f-97e3-285d1485b93c' }} />
      </div>
    </div>
  );
};

export default App;
